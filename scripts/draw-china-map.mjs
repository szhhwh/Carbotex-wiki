// Draws a stylised map of China (provinces + South China Sea inset) as SVG.
// Usage: node scripts/draw-china-map.mjs [input.geojson] [output.svg]
// All output coordinates are in pt; the SVG's top-left sits at artboard (43, 2097) pt.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const inputPath =
  process.argv[2] ?? join(root, "activities/fermentation-map/data/china.json");
// Wiki artwork is no longer bundled from src/assets/, so the output path must
// be given explicitly (upload the SVG to static.igem.wiki afterwards).
const outputPath = process.argv[3];
if (!outputPath) {
  console.error(
    "Usage: node scripts/draw-china-map.mjs [input.geojson] <output.svg>",
  );
  process.exit(1);
}

// ---- layout (artboard pt) -------------------------------------------------
const ARTBOARD_ORIGIN = [43, 2097];
const VIEW_W = 295;
const VIEW_H = 219;
const MAIN_BOX = { x0: 44, y0: 2099.3, x1: 306.7, y1: 2308.3 }; // mainland fill bbox
const INSET_BOX = { x0: 290.7, y0: 2242.6, x1: 336.7, y1: 2314 };

// ---- style ----------------------------------------------------------------
const FILL = "#006752";
const LINE = "#009170";
const INSET_FILL = "#fbf0dd";
const OUTLINE_W = 1.9;
const BORDER_W = 1.7;
const INSET_FRAME_W = 0.9;
const INSET_LINE_W = 0.8;
const SIMPLIFY_TOL = 0.25; // pt
const MIN_RING_AREA = 1.2; // pt^2, drops specks (tiny islands) after projection
const MAIN_MIN_LAT = 18; // main map: drop island polygons entirely south of this
const INSET_REGION = { lon0: 105, lon1: 125, lat0: 3, lat1: 25 };

// ---- projection: Albers equal-area conic, parallels 25N/47N, meridian 105E --
const RAD = Math.PI / 180;
const PHI1 = 25 * RAD,
  PHI2 = 47 * RAD,
  LON0 = 105 * RAD;
const ALB_N = (Math.sin(PHI1) + Math.sin(PHI2)) / 2;
const ALB_C = Math.cos(PHI1) ** 2 + 2 * ALB_N * Math.sin(PHI1);
function albers([lon, lat]) {
  const rho = Math.sqrt(ALB_C - 2 * ALB_N * Math.sin(lat * RAD)) / ALB_N;
  const theta = ALB_N * (lon * RAD - LON0);
  return [rho * Math.sin(theta), rho * Math.cos(theta)]; // y grows downward (southward)
}

// ---- geometry helpers -------------------------------------------------------
const polygonsOf = (geom) =>
  geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates;
const ptKey = (p) => p[0] + "," + p[1];
const edgeKey = (a, b) => {
  const ka = ptKey(a),
    kb = ptKey(b);
  return ka < kb ? ka + "|" + kb : kb + "|" + ka;
};

function ringArea(pts) {
  let s = 0;
  for (let i = 0, n = pts.length; i < n; i++) {
    const a = pts[i],
      b = pts[(i + 1) % n];
    s += a[0] * b[1] - b[0] * a[1];
  }
  return Math.abs(s) / 2;
}

function bboxOf(points) {
  const b = [Infinity, Infinity, -Infinity, -Infinity];
  for (const [x, y] of points) {
    if (x < b[0]) b[0] = x;
    if (y < b[1]) b[1] = y;
    if (x > b[2]) b[2] = x;
    if (y > b[3]) b[3] = y;
  }
  return b;
}

function segDist2(p, a, b) {
  let dx = b[0] - a[0],
    dy = b[1] - a[1];
  const len2 = dx * dx + dy * dy;
  let t = len2 ? ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / len2 : 0;
  t = Math.max(0, Math.min(1, t));
  dx = a[0] + t * dx - p[0];
  dy = a[1] + t * dy - p[1];
  return dx * dx + dy * dy;
}

// Douglas–Peucker on an open polyline; endpoints are kept.
function douglasPeucker(pts, tol) {
  if (pts.length <= 2) return pts.slice();
  const keep = new Uint8Array(pts.length);
  keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  const tol2 = tol * tol;
  while (stack.length) {
    const [i0, i1] = stack.pop();
    let maxD = -1,
      idx = -1;
    for (let i = i0 + 1; i < i1; i++) {
      const d = segDist2(pts[i], pts[i0], pts[i1]);
      if (d > maxD) {
        maxD = d;
        idx = i;
      }
    }
    if (maxD > tol2) {
      keep[idx] = 1;
      stack.push([i0, idx], [idx, i1]);
    }
  }
  return pts.filter((_, i) => keep[i]);
}

// Sutherland–Hodgman clip of a closed ring against an axis-aligned rectangle.
function clipRingToRect(ring, r) {
  const edges = [
    [(p) => p[0] >= r.x0, (a, b) => lerpAt(a, b, 0, r.x0)],
    [(p) => p[0] <= r.x1, (a, b) => lerpAt(a, b, 0, r.x1)],
    [(p) => p[1] >= r.y0, (a, b) => lerpAt(a, b, 1, r.y0)],
    [(p) => p[1] <= r.y1, (a, b) => lerpAt(a, b, 1, r.y1)],
  ];
  let out = ring;
  for (const [inside, cut] of edges) {
    const src = out;
    out = [];
    for (let i = 0; i < src.length; i++) {
      const cur = src[i],
        prev = src[(i + src.length - 1) % src.length];
      if (inside(cur)) {
        if (!inside(prev)) out.push(cut(prev, cur));
        out.push(cur);
      } else if (inside(prev)) out.push(cut(prev, cur));
    }
    if (!out.length) break;
  }
  return out;
}
function lerpAt(a, b, axis, v) {
  const t = (v - a[axis]) / (b[axis] - a[axis]);
  return [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])];
}

// Liang–Barsky clip of an open polyline against a rectangle; returns pieces.
function clipPolylineToRect(line, r) {
  const pieces = [];
  let cur = null;
  for (let i = 0; i < line.length - 1; i++) {
    const seg = clipSegment(line[i], line[i + 1], r);
    if (!seg) {
      if (cur) {
        pieces.push(cur);
        cur = null;
      }
      continue;
    }
    const [a, b, aClipped, bClipped] = seg;
    if (!cur || aClipped) {
      if (cur) pieces.push(cur);
      cur = [a];
    }
    cur.push(b);
    if (bClipped) {
      pieces.push(cur);
      cur = null;
    }
  }
  if (cur) pieces.push(cur);
  return pieces.filter((p) => p.length >= 2);
}
function clipSegment(a, b, r) {
  const dx = b[0] - a[0],
    dy = b[1] - a[1];
  let t0 = 0,
    t1 = 1;
  const p = [-dx, dx, -dy, dy];
  const q = [a[0] - r.x0, r.x1 - a[0], a[1] - r.y0, r.y1 - a[1]];
  for (let k = 0; k < 4; k++) {
    if (p[k] === 0) {
      if (q[k] < 0) return null;
      continue;
    }
    const t = q[k] / p[k];
    if (p[k] < 0) {
      if (t > t1) return null;
      if (t > t0) t0 = t;
    } else {
      if (t < t0) return null;
      if (t < t1) t1 = t;
    }
  }
  return [
    [a[0] + t0 * dx, a[1] + t0 * dy],
    [a[0] + t1 * dx, a[1] + t1 * dy],
    t0 > 0,
    t1 < 1,
  ];
}

// ---- topology: shared borders are simplified once so neighbours stay glued --
// Every ring is split at vertices where the set of owning features changes;
// each run is simplified once (cached by its vertex sequence) and reused.
function buildTopology(features) {
  const owners = new Map(); // edgeKey -> Set(featureIndex)
  features.forEach((f, fi) => {
    for (const poly of f.polygons)
      for (const ring of poly) {
        for (let i = 0; i < ring.length - 1; i++) {
          const k = edgeKey(ring[i], ring[i + 1]);
          if (!owners.has(k)) owners.set(k, new Set());
          owners.get(k).add(fi);
        }
      }
  });
  return (a, b) =>
    [...owners.get(edgeKey(a, b))].sort((x, y) => x - y).join(",");
}

// Splits a closed ring (first == last) into runs of edges with the same owner class.
function splitRingIntoRuns(ring, edgeClass) {
  const n = ring.length - 1;
  const cls = [];
  for (let i = 0; i < n; i++) cls.push(edgeClass(ring[i], ring[i + 1]));
  let start = -1;
  for (let i = 0; i < n; i++)
    if (cls[i] !== cls[(i + n - 1) % n]) {
      start = i;
      break;
    }
  if (start < 0) {
    // Whole ring in one class: start at a canonical vertex so shared copies agree.
    let best = 0;
    for (let i = 1; i < n; i++)
      if (ptKey(ring[i]) < ptKey(ring[best])) best = i;
    const pts = [];
    for (let i = 0; i <= n; i++) pts.push(ring[(best + i) % n]);
    return [{ pts, cls: cls[0], closed: true }];
  }
  const runs = [];
  let cur = { pts: [ring[start]], cls: cls[start], closed: false };
  for (let s = 0; s < n; s++) {
    const i = (start + s) % n;
    if (cls[i] !== cur.cls) {
      runs.push(cur);
      cur = { pts: [ring[i]], cls: cls[i], closed: false };
    }
    cur.pts.push(ring[(i + 1) % n]);
  }
  runs.push(cur);
  return runs;
}

function makeRunSimplifier(project, tol) {
  const cache = new Map();
  return function simplifyRun(run) {
    const first = ptKey(run.pts[0]),
      last = ptKey(run.pts[run.pts.length - 1]);
    const forward = run.closed || first <= last;
    const canon = forward ? run.pts : run.pts.slice().reverse();
    const key = canon.length + ":" + canon.map(ptKey).join(";");
    let simplified = cache.get(key);
    if (!simplified) {
      const xy = canon.map(project);
      if (run.closed) {
        // Split the closed ring at the vertex farthest from its start.
        let far = 0,
          maxD = -1;
        xy.forEach((p, i) => {
          const d = (p[0] - xy[0][0]) ** 2 + (p[1] - xy[0][1]) ** 2;
          if (d > maxD) {
            maxD = d;
            far = i;
          }
        });
        const a = douglasPeucker(xy.slice(0, far + 1), tol);
        const b = douglasPeucker(xy.slice(far), tol);
        simplified = a.concat(b.slice(1));
      } else {
        simplified = douglasPeucker(xy, tol);
      }
      cache.set(key, simplified);
    }
    return forward ? simplified : simplified.slice().reverse();
  };
}

// ---- SVG path encoding (absolute first point, then relative, 1 decimal) -----
const tenth = (v) => Math.round(v * 10);
function fmt(t) {
  // t = integer tenths
  const s = (Math.abs(t) / 10).toString().replace(/^0\./, ".");
  return (t < 0 ? "-" : "") + s;
}
function joinNums(nums) {
  let out = "";
  for (const s of nums)
    out +=
      out && !(s[0] === "-") && !(s[0] === "." && /\.\d*$/.test(out))
        ? " " + s
        : s;
  return out;
}
function encodePath(lines, closed) {
  let d = "";
  for (const line of lines) {
    const pts = [];
    for (const [x, y] of line) {
      const p = [tenth(x), tenth(y)];
      const prev = pts[pts.length - 1];
      if (!prev || prev[0] !== p[0] || prev[1] !== p[1]) pts.push(p);
    }
    if (closed && pts.length > 1) {
      const a = pts[0],
        b = pts[pts.length - 1];
      if (a[0] === b[0] && a[1] === b[1]) pts.pop();
    }
    if (pts.length < (closed ? 3 : 2)) continue;
    d += "M" + joinNums([fmt(pts[0][0]), fmt(pts[0][1])]);
    const rel = [];
    for (let i = 1; i < pts.length; i++)
      rel.push(fmt(pts[i][0] - pts[i - 1][0]), fmt(pts[i][1] - pts[i - 1][1]));
    d += "l" + joinNums(rel);
    if (closed) d += "z";
  }
  return d;
}

// ---- load data ----------------------------------------------------------------
const geo = JSON.parse(readFileSync(inputPath, "utf8"));
const provinces = geo.features
  .filter((f) => f.properties.adchar !== "JD")
  .map((f) => ({
    name: f.properties.name,
    adcode: f.properties.adcode,
    polygons: polygonsOf(f.geometry),
  }));
const jdFeature = geo.features.find((f) => f.properties.adchar === "JD");
const edgeClass = buildTopology(provinces);

// ---- main map fit -------------------------------------------------------------
const isMainPolygon = (poly) => poly[0].some(([, lat]) => lat >= MAIN_MIN_LAT);
const mainBounds = bboxOf(
  provinces.flatMap((p) =>
    p.polygons.filter(isMainPolygon).flatMap((poly) => poly[0].map(albers)),
  ),
);
const targetW = MAIN_BOX.x1 - MAIN_BOX.x0,
  targetH = MAIN_BOX.y1 - MAIN_BOX.y0;
// Non-uniform fit: the reference silhouette is Albers stretched ~5% horizontally.
const mainScaleX = targetW / (mainBounds[2] - mainBounds[0]);
const mainScaleY = targetH / (mainBounds[3] - mainBounds[1]);
const mainOffX = MAIN_BOX.x0 - ARTBOARD_ORIGIN[0];
const mainOffY = MAIN_BOX.y0 - ARTBOARD_ORIGIN[1];
const projectMain = (p) => {
  const [x, y] = albers(p);
  return [
    mainOffX + (x - mainBounds[0]) * mainScaleX,
    mainOffY + (y - mainBounds[1]) * mainScaleY,
  ];
};

// ---- inset fit: dashes (except the one east of Taiwan) span the box width and
// the southernmost dash sits just above the bottom edge; same stretch as the main map.
const INSET_PAD_X = 0.6;
const INSET_PAD_BOTTOM = 1.2;
const inset = {
  x0: INSET_BOX.x0 - ARTBOARD_ORIGIN[0],
  y0: INSET_BOX.y0 - ARTBOARD_ORIGIN[1],
  w: INSET_BOX.x1 - INSET_BOX.x0,
  h: INSET_BOX.y1 - INSET_BOX.y0,
};
const jdPolygons = polygonsOf(jdFeature.geometry);
const insetFitPoints = jdPolygons
  .filter((poly) => poly[0].every(([, lat]) => lat < 23))
  .flatMap((poly) => poly[0].map(albers));
const insetBounds = bboxOf(insetFitPoints);
const insetScaleX =
  (inset.w - 2 * INSET_PAD_X) / (insetBounds[2] - insetBounds[0]);
const insetScaleY = (insetScaleX * mainScaleY) / mainScaleX;
const insetOffX = inset.x0 + INSET_PAD_X;
const insetOffY =
  inset.y0 +
  inset.h -
  INSET_PAD_BOTTOM -
  insetScaleY * (insetBounds[3] - insetBounds[1]);
const projectInset = (p) => {
  const [x, y] = albers(p);
  return [
    insetOffX + (x - insetBounds[0]) * insetScaleX,
    insetOffY + (y - insetBounds[1]) * insetScaleY,
  ];
};

// ---- build main map paths --------------------------------------------------------
const simplifyMain = makeRunSimplifier(projectMain, SIMPLIFY_TOL);
const provincePaths = [];
const outlineLines = [];
const seenOutlineRuns = new Set();
for (const prov of provinces) {
  const rings = [];
  for (const poly of prov.polygons) {
    if (!isMainPolygon(poly)) continue;
    poly.forEach((ring) => {
      const runs = splitRingIntoRuns(ring, edgeClass);
      const simplifiedRuns = runs.map(simplifyMain);
      const pts = [];
      for (const s of simplifiedRuns)
        pts.push(...(pts.length ? s.slice(1) : s));
      const isIsland = runs.every((run) => !run.cls.includes(","));
      if (isIsland && ringArea(pts) < MIN_RING_AREA) return;
      rings.push(pts);
      runs.forEach((run, k) => {
        if (run.cls.includes(",")) return; // shared with a neighbour → inner border
        const key =
          ptKey(run.pts[0]) +
          ">" +
          ptKey(run.pts[run.pts.length - 1]) +
          "#" +
          run.pts.length;
        if (seenOutlineRuns.has(key)) return;
        seenOutlineRuns.add(key);
        outlineLines.push(simplifiedRuns[k]);
      });
    });
  }
  if (rings.length)
    provincePaths.push({
      name: prov.name,
      adcode: prov.adcode,
      d: encodePath(rings, true),
    });
}

// ---- build inset paths --------------------------------------------------------------
const simplifyInset = makeRunSimplifier(projectInset, SIMPLIFY_TOL);
const insetClip = {
  x0: inset.x0 - 2,
  y0: inset.y0 - 2,
  x1: inset.x0 + inset.w + 2,
  y1: inset.y0 + inset.h + 2,
};
const inRegion = (poly) => {
  const [lon0, lat0, lon1, lat1] = bboxOf(poly[0]);
  return (
    lon1 >= INSET_REGION.lon0 &&
    lon0 <= INSET_REGION.lon1 &&
    lat1 >= INSET_REGION.lat0 &&
    lat0 <= INSET_REGION.lat1
  );
};
const insetCoastLines = [];
for (const prov of provinces) {
  for (const poly of prov.polygons) {
    if (!inRegion(poly)) continue;
    for (const ring of poly) {
      const runs = splitRingIntoRuns(ring, edgeClass);
      const simplifiedRuns = runs.map(simplifyInset);
      const whole = [];
      for (const s of simplifiedRuns)
        whole.push(...(whole.length ? s.slice(1) : s));
      if (
        runs.every((run) => !run.cls.includes(",")) &&
        ringArea(whole) < MIN_RING_AREA
      )
        continue;
      runs.forEach((run, k) => {
        if (run.cls.includes(",")) return; // only the outer coastline/border in the inset
        insetCoastLines.push(
          ...clipPolylineToRect(simplifiedRuns[k], insetClip),
        );
      });
    }
  }
}
const insetDashRings = jdPolygons
  .map((poly) =>
    clipRingToRect(
      douglasPeucker(poly[0].map(projectInset), SIMPLIFY_TOL / 2),
      insetClip,
    ),
  )
  .filter((r) => r.length >= 3);

// ---- write SVG ------------------------------------------------------------------------
const r1 = (v) => Math.round(v * 10) / 10;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW_W} ${VIEW_H}" width="${VIEW_W}" height="${VIEW_H}" role="img">
<title>Map of China</title>
<defs><clipPath id="china-map-inset-clip"><rect x="${r1(inset.x0)}" y="${r1(inset.y0)}" width="${r1(inset.w)}" height="${r1(inset.h)}"/></clipPath></defs>
<g id="provinces" fill="${FILL}" fill-rule="evenodd" stroke="${LINE}" stroke-width="${BORDER_W}" stroke-linejoin="round" stroke-linecap="round">
${provincePaths.map((p) => `<path data-name="${p.name}" data-adcode="${p.adcode}" d="${p.d}"/>`).join("\n")}
</g>
<path id="outline" fill="none" stroke="${LINE}" stroke-width="${OUTLINE_W}" stroke-linejoin="round" stroke-linecap="round" d="${encodePath(outlineLines, false)}"/>
<g id="south-china-sea-inset">
<rect x="${r1(inset.x0)}" y="${r1(inset.y0)}" width="${r1(inset.w)}" height="${r1(inset.h)}" fill="${INSET_FILL}"/>
<g clip-path="url(#china-map-inset-clip)" fill="none" stroke="${LINE}" stroke-width="${INSET_LINE_W}" stroke-linejoin="round" stroke-linecap="round">
<path d="${encodePath(insetCoastLines, false)}"/>
<path d="${encodePath(insetDashRings, true)}"/>
</g>
<rect x="${r1(inset.x0)}" y="${r1(inset.y0)}" width="${r1(inset.w)}" height="${r1(inset.h)}" fill="none" stroke="${LINE}" stroke-width="${INSET_FRAME_W}" stroke-linejoin="round"/>
</g>
</svg>
`;
writeFileSync(outputPath, svg);
console.log(
  `wrote ${outputPath}: ${svg.length} bytes, ${provincePaths.length} provinces, viewBox 0 0 ${VIEW_W} ${VIEW_H}, artboard origin ${ARTBOARD_ORIGIN.join(",")}`,
);

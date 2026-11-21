// Derives the cross sections along which the process-stage ribbons unfold.
//
// Each ribbon artwork is one filled outline running from its start (the
// brush tip) along one edge to its far end and back along the other edge.
// The two edges are paired point to point (dynamic time warping on their
// distance), giving a chain of cross sections from start to end. A mask
// polygon made of the first k sections reveals the ribbon exactly up to a
// cut across it, so the paint advances along the ribbon's own course.
//
// Usage: node scripts/ribbon-sweeps.mjs <dir with the uploaded SVGs>
// Writes src/components/home/process/ribbon-sweeps.ts.

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/** Shapes: file, path index, [start hint], [end hint], section count. */
const SHAPES = [
  ["malic", "malic-ribbon.svg", 0, [1301.85, 506.92], [1040, 2102], 220],
  ["bottleBack", "glue-bottle-ribbon.svg", 0, [296.68, 10], [72.19, 76.41], 40],
  ["bottleFront", "glue-bottle-ribbon.svg", 1, [72.19, 76.41], [0, 98], 16],
];
/** Each section is pushed this far past both edges (no anti-aliased rim). */
const BLEED = 3;

function parsePath(d) {
  const tokens = d.match(/[a-zA-Z]|-?(?:\d*\.\d+|\d+\.?)(?:e-?\d+)?/g);
  const pts = [];
  let i = 0;
  let cmd = "";
  let x = 0;
  let y = 0;
  let sx = 0;
  let sy = 0;
  let cx = 0;
  let cy = 0;
  const num = () => Number(tokens[i++]);
  const cubic = (x1, y1, x2, y2, x3, y3) => {
    for (let k = 1; k <= 48; k++) {
      const t = k / 48;
      const u = 1 - t;
      pts.push([
        u * u * u * x +
          3 * u * u * t * x1 +
          3 * u * t * t * x2 +
          t * t * t * x3,
        u * u * u * y +
          3 * u * u * t * y1 +
          3 * u * t * t * y2 +
          t * t * t * y3,
      ]);
    }
    cx = x2;
    cy = y2;
    x = x3;
    y = y3;
  };
  const line = (nx, ny) => {
    pts.push([nx, ny]);
    x = cx = nx;
    y = cy = ny;
  };
  while (i < tokens.length) {
    if (/[a-zA-Z]/.test(tokens[i])) cmd = tokens[i++];
    const rel = cmd === cmd.toLowerCase();
    const ox = rel ? x : 0;
    const oy = rel ? y : 0;
    switch (cmd.toUpperCase()) {
      case "M":
        x = cx = sx = num() + ox;
        y = cy = sy = num() + oy;
        pts.push([x, y]);
        cmd = rel ? "l" : "L";
        break;
      case "L":
        line(num() + ox, num() + oy);
        break;
      case "H":
        line(num() + ox, y);
        break;
      case "V":
        line(x, num() + oy);
        break;
      case "C":
        cubic(
          num() + ox,
          num() + oy,
          num() + ox,
          num() + oy,
          num() + ox,
          num() + oy,
        );
        break;
      case "S": {
        const x1 = 2 * x - cx;
        const y1 = 2 * y - cy;
        cubic(x1, y1, num() + ox, num() + oy, num() + ox, num() + oy);
        break;
      }
      case "Z":
        line(sx, sy);
        break;
      default:
        throw new Error(`unsupported path command ${cmd}`);
    }
  }
  return pts;
}

const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);

/** Resamples a polyline to points `step` apart along its length. */
function resample(pts, step) {
  const out = [pts[0]];
  let carry = 0;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const len = dist(a, b);
    let s = step - carry;
    while (s <= len) {
      const t = s / len;
      out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
      s += step;
    }
    carry = len - (s - step);
  }
  out.push(pts[pts.length - 1]);
  return out;
}

const nearest = (pts, p) =>
  pts.reduce((best, q, i) => (dist(q, p) < dist(pts[best], p) ? i : best), 0);

/** Monotone pairing of two edges minimising the summed section length. */
function pairEdges(a, b) {
  const n = a.length;
  const m = b.length;
  const cost = new Float64Array(n * m).fill(Infinity);
  cost[0] = dist(a[0], b[0]);
  for (let i = 0; i < n; i++)
    for (let j = 0; j < m; j++) {
      if (i === 0 && j === 0) continue;
      let best = Infinity;
      if (i > 0) best = Math.min(best, cost[(i - 1) * m + j]);
      if (j > 0) best = Math.min(best, cost[i * m + j - 1]);
      if (i > 0 && j > 0) best = Math.min(best, cost[(i - 1) * m + j - 1]);
      cost[i * m + j] = best + dist(a[i], b[j]);
    }
  const pairs = [];
  let i = n - 1;
  let j = m - 1;
  while (i > 0 || j > 0) {
    pairs.push([a[i], b[j]]);
    const diag = i > 0 && j > 0 ? cost[(i - 1) * m + j - 1] : Infinity;
    const up = i > 0 ? cost[(i - 1) * m + j] : Infinity;
    const left = j > 0 ? cost[i * m + j - 1] : Infinity;
    if (diag <= up && diag <= left) {
      i--;
      j--;
    } else if (up <= left) i--;
    else j--;
  }
  pairs.push([a[0], b[0]]);
  return pairs.reverse();
}

/** Picks `count` sections evenly spaced along the chain of section midpoints. */
function pickSections(pairs, count) {
  const mid = pairs.map(([a, b]) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]);
  const along = [0];
  for (let i = 1; i < mid.length; i++)
    along.push(along[i - 1] + dist(mid[i - 1], mid[i]));
  const total = along[along.length - 1];
  const out = [];
  let j = 0;
  for (let k = 0; k < count; k++) {
    const s = (total * k) / (count - 1);
    while (j < along.length - 2 && along[j + 1] < s) j++;
    out.push(pairs[j]);
  }
  out[count - 1] = pairs[pairs.length - 1];
  return out;
}

function sweep(file, index, startHint, endHint, count, dir) {
  const svg = readFileSync(join(dir, file), "utf8");
  const d = [...svg.matchAll(/ d="([^"]+)"/g)][index][1];
  const ring = resample(parsePath(d), 2).slice(0, -1);
  // Rotate the ring so it begins at the start hint.
  const s = nearest(ring, startHint);
  const loop = [...ring.slice(s), ...ring.slice(0, s)];
  const e = nearest(loop, endHint);
  const a = loop.slice(0, e + 1);
  const b = [loop[0], ...loop.slice(e).reverse()];
  return pickSections(pairEdges(a, b), count).flatMap(([p, q]) => {
    const len = dist(p, q) || 1;
    const ux = ((p[0] - q[0]) / len) * BLEED;
    const uy = ((p[1] - q[1]) / len) * BLEED;
    return [p[0] + ux, p[1] + uy, q[0] - ux, q[1] - uy].map(
      (v) => Math.round(v * 10) / 10,
    );
  });
}

const dir = process.argv[2];
if (!dir) throw new Error("usage: node scripts/ribbon-sweeps.mjs <svg dir>");
const body = SHAPES.map(
  ([name, file, index, start, end, count]) =>
    `  ${name}: [${sweep(file, index, start, end, count, dir).join(", ")}],`,
).join("\n");
writeFileSync(
  "src/components/home/process/ribbon-sweeps.ts",
  `// Generated by scripts/ribbon-sweeps.mjs from the uploaded ribbon artwork.
// Cross sections [ax, ay, bx, by, …] (artwork units) from start to end.

export const RIBBON_SWEEPS = {
${body}
} as const;
`,
);

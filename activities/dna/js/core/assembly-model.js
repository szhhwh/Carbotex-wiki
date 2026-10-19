// Geometry and pairing rules extracted from the supplied DNA activity.
import { fontFamily, t } from "../../../shared/js/i18n.js";
const BASE_TYPES = { A: "A", T: "T", G: "G", C: "C" };
const COMPLEMENT = {
  A: "T",
  T: "A",
  G: "C",
  C: "G",
};
const ROW_COUNT = 8,
  START_ROW = 3,
  PALETTE = {
    textPrimary: "#16334b",
    accent: "#2f6fd6",
    warning: "#d18a1f",
    phosphateFill: "#ffe0d6",
    phosphateStroke: "#9e4d3e",
    sugarFill: "#dff0ff",
    sugarStroke: "#2e6b98",
    connector: "#4b4f58",
    hydrogenBond: "#b85c5c",
  },
  BASE_COLORS = {
    [BASE_TYPES.A]: {
      fill: "#7bc96f",
      stroke: "#2f6f2b",
      text: "#173717",
    },
    [BASE_TYPES.T]: {
      fill: "#f28c6b",
      stroke: "#9c4627",
      text: "#421c12",
    },
    [BASE_TYPES.G]: {
      fill: "#f2c94c",
      stroke: "#9b6a00",
      text: "#3d2800",
    },
    [BASE_TYPES.C]: {
      fill: "#5dade2",
      stroke: "#1f6694",
      text: "#103147",
    },
  },
  RENDER_SETTINGS = {
    twoD: {
      baseRectScale: {
        compact: 1.08,
        full: 1.12,
      },
      baseLineWidth: {
        compact: 1.85,
        full: 2.15,
      },
      baseFontSize: {
        compact: 7.2,
        full: 8.6,
      },
      sugarBondWidth: 1.95,
      phosphateBondWidth: 2.05,
      doubleBondOffset: 2.15,
      sugarLabelSize: {
        small: 7.2,
        medium: 7.9,
        large: 8.7,
      },
      phosphateLabelSize: {
        small: 7.5,
        medium: 8.3,
        large: 9.1,
      },
      hydrogenBondWidth: 2.2,
      hydrogenBondDash: [4, 3],
      diagramBaseLetterSize: 19,
    },
  },
  PYRIMIDINE_BONDS = [
    {
      from: {
        x: 0.02,
        y: 0.5,
      },
      to: {
        x: 0.16,
        y: 0.5,
      },
    },
    {
      from: {
        x: 0.16,
        y: 0.5,
      },
      to: {
        x: 0.3,
        y: 0.24,
      },
    },
    {
      from: {
        x: 0.3,
        y: 0.24,
      },
      to: {
        x: 0.56,
        y: 0.24,
      },
      order: 2,
    },
    {
      from: {
        x: 0.56,
        y: 0.24,
      },
      to: {
        x: 0.7,
        y: 0.5,
      },
    },
    {
      from: {
        x: 0.7,
        y: 0.5,
      },
      to: {
        x: 0.56,
        y: 0.76,
      },
      order: 2,
    },
    {
      from: {
        x: 0.56,
        y: 0.76,
      },
      to: {
        x: 0.3,
        y: 0.76,
      },
    },
    {
      from: {
        x: 0.3,
        y: 0.76,
      },
      to: {
        x: 0.16,
        y: 0.5,
      },
      order: 2,
    },
  ],
  PURINE_BONDS = [
    {
      from: {
        x: 0.02,
        y: 0.5,
      },
      to: {
        x: 0.14,
        y: 0.5,
      },
    },
    {
      from: {
        x: 0.14,
        y: 0.5,
      },
      to: {
        x: 0.28,
        y: 0.22,
      },
    },
    {
      from: {
        x: 0.28,
        y: 0.22,
      },
      to: {
        x: 0.52,
        y: 0.22,
      },
      order: 2,
    },
    {
      from: {
        x: 0.52,
        y: 0.22,
      },
      to: {
        x: 0.66,
        y: 0.5,
      },
    },
    {
      from: {
        x: 0.66,
        y: 0.5,
      },
      to: {
        x: 0.52,
        y: 0.78,
      },
      order: 2,
    },
    {
      from: {
        x: 0.52,
        y: 0.78,
      },
      to: {
        x: 0.28,
        y: 0.78,
      },
    },
    {
      from: {
        x: 0.28,
        y: 0.78,
      },
      to: {
        x: 0.14,
        y: 0.5,
      },
      order: 2,
    },
    {
      from: {
        x: 0.52,
        y: 0.22,
      },
      to: {
        x: 0.74,
        y: 0.14,
      },
    },
    {
      from: {
        x: 0.74,
        y: 0.14,
      },
      to: {
        x: 0.9,
        y: 0.38,
      },
      order: 2,
    },
    {
      from: {
        x: 0.9,
        y: 0.38,
      },
      to: {
        x: 0.8,
        y: 0.66,
      },
    },
    {
      from: {
        x: 0.8,
        y: 0.66,
      },
      to: {
        x: 0.66,
        y: 0.5,
      },
      order: 2,
    },
    {
      from: {
        x: 0.66,
        y: 0.5,
      },
      to: {
        x: 0.52,
        y: 0.22,
      },
    },
  ],
  PURINE_RINGS = [
    [
      {
        x: 0.08,
        y: 0.5,
      },
      {
        x: 0.23,
        y: 0.2,
      },
      {
        x: 0.45,
        y: 0.28,
      },
      {
        x: 0.44,
        y: 0.62,
      },
      {
        x: 0.22,
        y: 0.74,
      },
    ],
    [
      {
        x: 0.4,
        y: 0.28,
      },
      {
        x: 0.63,
        y: 0.2,
      },
      {
        x: 0.86,
        y: 0.36,
      },
      {
        x: 0.82,
        y: 0.68,
      },
      {
        x: 0.58,
        y: 0.8,
      },
      {
        x: 0.38,
        y: 0.64,
      },
    ],
  ],
  PYRIMIDINE_RINGS = [
    [
      {
        x: 0.18,
        y: 0.5,
      },
      {
        x: 0.34,
        y: 0.22,
      },
      {
        x: 0.63,
        y: 0.22,
      },
      {
        x: 0.82,
        y: 0.5,
      },
      {
        x: 0.63,
        y: 0.78,
      },
      {
        x: 0.34,
        y: 0.78,
      },
    ],
  ],
  STRUCTURE_COLORS = BASE_COLORS,
  BASE_STRUCTURES = {
    A: {
      fillPolygons: PURINE_RINGS,
      bonds: [
        ...PURINE_BONDS,
        {
          from: {
            x: 0.72,
            y: 0.22,
          },
          to: {
            x: 0.78,
            y: 0.08,
          },
        },
      ],
      labels: [
        {
          text: "N",
          at: {
            x: 0.24,
            y: 0.16,
          },
          compact: false,
        },
        {
          text: "N",
          at: {
            x: 0.5,
            y: 0.82,
          },
          compact: false,
        },
        {
          text: "N",
          at: {
            x: 0.74,
            y: 0.54,
          },
          compact: false,
        },
        {
          text: "NH2",
          at: {
            x: 0.8,
            y: 0.08,
          },
          scale: 0.95,
        },
      ],
      pairAnchors: [
        {
          x: 0.78,
          y: 0.12,
        },
        {
          x: 0.8,
          y: 0.56,
        },
      ],
      sugarAnchor: {
        x: 0.06,
        y: 0.62,
      },
      glycosidicLabelAt: {
        x: 0.12,
        y: 0.52,
      },
      glycosidicFreeLabel: "HN",
    },
    T: {
      fillPolygons: PYRIMIDINE_RINGS,
      bonds: [
        ...PYRIMIDINE_BONDS,
        {
          from: {
            x: 0.44,
            y: 0.22,
          },
          to: {
            x: 0.36,
            y: 0.06,
          },
        },
        {
          from: {
            x: 0.63,
            y: 0.22,
          },
          to: {
            x: 0.79,
            y: 0.1,
          },
          order: 2,
        },
        {
          from: {
            x: 0.56,
            y: 0.78,
          },
          to: {
            x: 0.64,
            y: 0.92,
          },
          order: 2,
        },
      ],
      labels: [
        {
          text: "N",
          at: {
            x: 0.27,
            y: 0.28,
          },
          compact: false,
        },
        {
          text: "N",
          at: {
            x: 0.66,
            y: 0.72,
          },
          compact: false,
        },
        {
          text: "CH3",
          at: {
            x: 0.32,
            y: 0.04,
          },
          scale: 0.95,
        },
        {
          text: "O",
          at: {
            x: 0.84,
            y: 0.08,
          },
        },
        {
          text: "O",
          at: {
            x: 0.67,
            y: 0.95,
          },
        },
        {
          text: "HN",
          at: {
            x: 0.82,
            y: 0.5,
          },
          scale: 0.95,
        },
      ],
      pairAnchors: [
        {
          x: 0.8,
          y: 0.14,
        },
        {
          x: 0.82,
          y: 0.48,
        },
      ],
      sugarAnchor: {
        x: 0.14,
        y: 0.68,
      },
      glycosidicLabelAt: {
        x: 0.12,
        y: 0.52,
      },
      glycosidicFreeLabel: "HN",
    },
    G: {
      fillPolygons: PURINE_RINGS,
      bonds: [
        ...PURINE_BONDS,
        {
          from: {
            x: 0.72,
            y: 0.22,
          },
          to: {
            x: 0.82,
            y: 0.08,
          },
          order: 2,
        },
        {
          from: {
            x: 0.57,
            y: 0.78,
          },
          to: {
            x: 0.63,
            y: 0.92,
          },
        },
      ],
      labels: [
        {
          text: "N",
          at: {
            x: 0.24,
            y: 0.16,
          },
          compact: false,
        },
        {
          text: "N",
          at: {
            x: 0.5,
            y: 0.82,
          },
          compact: false,
        },
        {
          text: "O",
          at: {
            x: 0.87,
            y: 0.08,
          },
        },
        {
          text: "HN",
          at: {
            x: 0.8,
            y: 0.46,
          },
          scale: 0.95,
        },
        {
          text: "NH2",
          at: {
            x: 0.66,
            y: 0.95,
          },
          scale: 0.95,
        },
      ],
      pairAnchors: [
        {
          x: 0.81,
          y: 0.12,
        },
        {
          x: 0.79,
          y: 0.46,
        },
        {
          x: 0.68,
          y: 0.88,
        },
      ],
      sugarAnchor: {
        x: 0.06,
        y: 0.62,
      },
      glycosidicLabelAt: {
        x: 0.12,
        y: 0.52,
      },
      glycosidicFreeLabel: "HN",
    },
    C: {
      fillPolygons: PYRIMIDINE_RINGS,
      bonds: [
        ...PYRIMIDINE_BONDS,
        {
          from: {
            x: 0.63,
            y: 0.22,
          },
          to: {
            x: 0.79,
            y: 0.1,
          },
        },
        {
          from: {
            x: 0.56,
            y: 0.78,
          },
          to: {
            x: 0.64,
            y: 0.92,
          },
          order: 2,
        },
      ],
      labels: [
        {
          text: "N",
          at: {
            x: 0.27,
            y: 0.28,
          },
          compact: false,
        },
        {
          text: "N",
          at: {
            x: 0.66,
            y: 0.72,
          },
          compact: false,
        },
        {
          text: "NH2",
          at: {
            x: 0.84,
            y: 0.08,
          },
          scale: 0.95,
        },
        {
          text: "N",
          at: {
            x: 0.8,
            y: 0.48,
          },
        },
        {
          text: "O",
          at: {
            x: 0.67,
            y: 0.95,
          },
        },
      ],
      pairAnchors: [
        {
          x: 0.79,
          y: 0.12,
        },
        {
          x: 0.81,
          y: 0.48,
        },
        {
          x: 0.68,
          y: 0.88,
        },
      ],
      sugarAnchor: {
        x: 0.14,
        y: 0.68,
      },
      glycosidicLabelAt: {
        x: 0.12,
        y: 0.52,
      },
      glycosidicFreeLabel: "HN",
    },
  };
function projectPointOntoLine(e, t, n) {
  const s = n.x - t.x,
    o = n.y - t.y,
    i = s * s + o * o;
  if (i === 0) return t;
  const l = Math.max(0, Math.min(1, ((e.x - t.x) * s + (e.y - t.y) * o) / i));
  return {
    x: t.x + s * l,
    y: t.y + o * l,
  };
}
function resolveLabelCollision(e, t, n, s, o) {
  if (s.length === 0) return e;
  const i = Math.max(n * 0.4, t.length * n * 0.25),
    l = Math.max(n * 0.58, i) + 1.2;
  let c = e;
  for (let f = 0; f < 5; f += 1) {
    let g = Number.POSITIVE_INFINITY,
      u = null,
      h = null;
    for (const k of s) {
      const G = projectPointOntoLine(c, k.from, k.to),
        U = Math.hypot(c.x - G.x, c.y - G.y);
      U < g && ((g = U), (u = G), (h = k));
    }
    if (!u || !h || g >= l) return c;
    let S = c.x - u.x,
      w = c.y - u.y,
      D = Math.hypot(S, w);
    (D < 0.001 && o && ((S = o.x), (w = o.y), (D = Math.hypot(S, w))),
      D < 0.001 &&
        ((S = -(h.to.y - h.from.y)),
        (w = h.to.x - h.from.x),
        (D = Math.hypot(S, w) || 1)));
    const P = l - g + 0.4;
    c = {
      x: c.x + (S / D) * P,
      y: c.y + (w / D) * P,
    };
  }
  return c;
}
const SUPPLY_AREA = {
    x: 24,
    y: 88,
    w: 336,
    h: 540,
  },
  BOARD_AREA = {
    x: 376,
    y: 88,
    w: 400,
    h: 540,
  },
  SLOT_AREA = {
    x: 394,
    y: 140,
    w: 364,
  },
  METRICS = {
    baseWidth: 72,
    baseHeight: 34,
    endShapeWidth: 12,
    pentagonRadius: 20,
    phosphateRadius: 10,
    pentagonToBaseGap: 6,
    elbowOffsetY: 16,
    phosphateOffsetX: 18,
    phosphateOffsetY: 10,
    boardBaseOffsetX: 53,
    rowSpacing: 56,
  },
  TRAY_ITEM_TEMPLATES = [
    {
      id: "nuc-a",
      label: "dna.tray.label.a",
      nucleotideType: BASE_TYPES.A,
      rect: {
        x: 54,
        y: 150,
        w: 130,
        h: 190,
      },
    },
    {
      id: "nuc-t",
      label: "dna.tray.label.t",
      nucleotideType: BASE_TYPES.T,
      rect: {
        x: 200,
        y: 150,
        w: 130,
        h: 190,
      },
    },
    {
      id: "nuc-g",
      label: "dna.tray.label.g",
      nucleotideType: BASE_TYPES.G,
      rect: {
        x: 54,
        y: 360,
        w: 130,
        h: 190,
      },
    },
    {
      id: "nuc-c",
      label: "dna.tray.label.c",
      nucleotideType: BASE_TYPES.C,
      rect: {
        x: 200,
        y: 360,
        w: 130,
        h: 190,
      },
    },
  ];
function slotKey(e, t) {
  return `${e}-${t}`;
}
function parseSlotKey(e) {
  const [t, n] = e.split("-");
  return {
    strand: t,
    row: Number(n),
  };
}
function oppositeStrand(e) {
  return e === "left" ? "right" : "left";
}
function strandDirection(e) {
  return e === "right" ? 1 : -1;
}
function isPurine(e) {
  return e === BASE_TYPES.A || e === BASE_TYPES.G;
}
function baseRectAt(e) {
  return {
    x: e.x - METRICS.baseWidth / 2,
    y: e.y - METRICS.baseHeight / 2,
    w: METRICS.baseWidth,
    h: METRICS.baseHeight,
  };
}
function createNucleotideGeometry(e, t) {
  const n = strandDirection(t),
    s = t === "right" ? Math.PI / 2 : -Math.PI / 2,
    o = Math.PI / 10,
    i = {
      x:
        e.x +
        n *
          (METRICS.baseWidth / 2 +
            METRICS.pentagonToBaseGap +
            METRICS.pentagonRadius * Math.cos(o)),
      y: e.y - n * (METRICS.pentagonRadius * Math.sin(o)),
    },
    l = (S) => {
      const w = s + (Math.PI * 2 * S) / 5;
      return {
        x: i.x + METRICS.pentagonRadius * Math.cos(w),
        y: i.y + METRICS.pentagonRadius * Math.sin(w),
      };
    },
    c = l(1),
    f = l(3),
    g = l(4),
    u = {
      x: g.x,
      y: g.y + (t === "right" ? METRICS.elbowOffsetY : -16),
    },
    h = {
      x: u.x + (t === "right" ? METRICS.phosphateOffsetX : -18),
      y: u.y + (t === "right" ? METRICS.phosphateOffsetY : -10),
    };
  return {
    baseCenter: e,
    baseRect: baseRectAt(e),
    pentagonCenter: i,
    pentagonRotation: s,
    c1: c,
    c3: f,
    c4: g,
    elbow: u,
    phosphate: h,
  };
}
function nucleotideBounds(e, t, n = BASE_TYPES.A) {
  const s = createNucleotideGeometry(e, t);
  let o = s.baseRect.x,
    i = s.baseRect.x + s.baseRect.w;
  isPurine(n) &&
    (t === "left"
      ? (i += METRICS.endShapeWidth)
      : (o -= METRICS.endShapeWidth));
  const l = Math.min(
      s.baseRect.y,
      s.pentagonCenter.y - METRICS.pentagonRadius,
      s.phosphate.y - METRICS.phosphateRadius,
    ),
    c = Math.max(
      s.baseRect.y + s.baseRect.h,
      s.pentagonCenter.y + METRICS.pentagonRadius,
      s.phosphate.y + METRICS.phosphateRadius,
    );
  return (
    (o = Math.min(
      o,
      s.pentagonCenter.x - METRICS.pentagonRadius,
      s.phosphate.x - METRICS.phosphateRadius,
    )),
    (i = Math.max(
      i,
      s.pentagonCenter.x + METRICS.pentagonRadius,
      s.phosphate.x + METRICS.phosphateRadius,
    )),
    {
      x: o,
      y: l,
      w: i - o,
      h: c - l,
    }
  );
}
function createSlot(e, t, n = -1) {
  const s = createNucleotideGeometry(e, t);
  return {
    key: slotKey(t, n),
    row: n,
    strand: t,
    centerY: e.y,
    hitRect: expandRect(nucleotideBounds(e, t, BASE_TYPES.A), 12),
    ...s,
  };
}
function buildSlots(area, rowSpacing) {
  const e = [],
    t = area.x + area.w / 2,
    n = area.y + 16;
  for (let s = 0; s < ROW_COUNT; s += 1) {
    const o = n + s * rowSpacing,
      i = {
        x: t - METRICS.boardBaseOffsetX,
        y: o,
      },
      l = {
        x: t + METRICS.boardBaseOffsetX,
        y: o,
      };
    (e.push(createSlot(i, "left", s)), e.push(createSlot(l, "right", s)));
  }
  return e;
}
function rectContains(e, t, n = 0) {
  return (
    t.x >= e.x - n &&
    t.x <= e.x + e.w + n &&
    t.y >= e.y - n &&
    t.y <= e.y + e.h + n
  );
}
function distanceBetween(e, t) {
  return Math.hypot(e.x - t.x, e.y - t.y);
}
const clamp01 = (value) => Math.min(1, Math.max(0, value));
const easeOutCubic = (value) => 1 - (1 - value) ** 3;
// Slight overshoot, so placed nucleotides settle instead of just appearing.
const easeOutBack = (value) => {
  const c1 = 1.70158;
  return 1 + (c1 + 1) * (value - 1) ** 3 + c1 * (value - 1) ** 2;
};
function expandRect(e, t) {
  return {
    x: e.x - t,
    y: e.y - t,
    w: e.w + t * 2,
    h: e.h + t * 2,
  };
}

function drawTrayLabel(r, label, rect) {
  const all = String(label).split("\n");
  // Stacked tray cards on narrow screens only have room for the short name.
  const compact = rect.w < 150;
  const lines = compact ? all.slice(0, 1) : all;
  r.textAlign = "center";
  r.textBaseline = "middle";
  if (lines.length > 1) {
    const start = rect.y + rect.h - 42;
    lines.forEach((line, index) => {
      const wide = line.length > 12;
      r.font = `700 ${wide ? 10 : 13}px ${fontFamily()}`;
      r.fillText(line, rect.x + rect.w / 2, start + index * (wide ? 15 : 18));
    });
  } else {
    const size = compact
      ? Math.max(9, Math.min(13, (rect.w - 12) / (lines[0].length * 0.95)))
      : 13;
    r.font = `700 ${size}px ${fontFamily()}`;
    r.fillText(lines[0], rect.x + rect.w / 2, rect.y + rect.h - 16);
  }
  r.textAlign = "start";
  r.textBaseline = "alphabetic";
}
function drawCenteredText(e, t, n, s) {
  ((e.textAlign = "center"),
    (e.textBaseline = "middle"),
    e.fillText(t, n, s),
    (e.textAlign = "start"),
    (e.textBaseline = "alphabetic"));
}
function drawRoundedRect(e, t, n, s, o) {
  (e.beginPath(),
    e.roundRect(t.x, t.y, t.w, t.h, n),
    (e.fillStyle = s),
    e.fill(),
    o && ((e.strokeStyle = o), (e.lineWidth = 1), e.stroke()));
}
function traceRegularPolygon(e, t, n, s = -Math.PI / 2) {
  e.beginPath();
  for (let o = 0; o < 5; o += 1) {
    const i = s + (Math.PI * 2 * o) / 5,
      l = t.x + Math.cos(i) * n,
      c = t.y + Math.sin(i) * n;
    o === 0 ? e.moveTo(l, c) : e.lineTo(l, c);
  }
  e.closePath();
}
function createAssemblyModel(redraw, onNotice = () => {}) {
  const supplyArea = { ...SUPPLY_AREA };
  const boardArea = { ...BOARD_AREA };
  const slotArea = { ...SLOT_AREA };
  const trayItems = TRAY_ITEM_TEMPLATES.map((item) => ({
    ...item,
    rect: { ...item.rect },
  }));
  // Layout coordinates drive both SVG geometry and pointer hit testing.
  let layout = { width: 0, height: 0, showSupply: true, trayRow: false };
  let slots = [];
  let placedBases = new Map(),
    sceneMode = "board2d",
    viewMode = "diagram",
    pointerState = null,
    hoverTarget = null,
    selectedKey = null,
    messageTimeout = null;
  // Tween registry: every animation is a value eased towards a target and read
  // back while painting, so a finished tween costs nothing and the layers stay
  // the only drawing path.
  const motionQuery =
    typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;
  const tweens = new Map();
  const exitingBases = new Map();
  const rejections = [];
  const focusKeys = new Set();
  let frameHandle = null;
  let motionTick = 0;
  let motionAlive = true;

  function motionReduced() {
    return Boolean(motionQuery?.matches);
  }
  function motionActive() {
    return tweens.size > 0 || rejections.length > 0;
  }
  function tweenValue(key, target) {
    const tween = tweens.get(key);
    if (!tween) return target;
    const progress = (performance.now() - tween.start) / tween.duration;
    if (progress >= 1) {
      tweens.delete(key);
      return tween.to;
    }
    return tween.from + (tween.to - tween.from) * tween.ease(clamp01(progress));
  }
  function tweenTo(key, to, duration, ease = easeOutCubic, from = 0) {
    if (motionReduced() || duration <= 0) {
      tweens.delete(key);
      return;
    }
    tweens.set(key, {
      from: tweenValue(key, from),
      to,
      start: performance.now(),
      duration,
      ease,
    });
    scheduleFrames();
  }
  function scheduleFrames() {
    if (frameHandle !== null || !motionAlive) return;
    frameHandle = requestAnimationFrame(stepFrames);
  }
  function stepFrames() {
    frameHandle = null;
    pruneMotion();
    motionTick += 1;
    redraw();
    if (motionActive()) scheduleFrames();
  }
  function pruneMotion() {
    const now = performance.now();
    for (const [key, tween] of tweens)
      if (now - tween.start >= tween.duration) tweens.delete(key);
    for (const key of exitingBases.keys())
      if (!tweens.has(`exit:${key}`)) exitingBases.delete(key);
    for (let index = rejections.length - 1; index >= 0; index -= 1)
      if (now - rejections[index].start >= rejections[index].duration)
        rejections.splice(index, 1);
  }
  function stopMotion() {
    motionAlive = false;
    if (frameHandle !== null) cancelAnimationFrame(frameHandle);
    frameHandle = null;
    tweens.clear();
    exitingBases.clear();
    rejections.length = 0;
  }
  function trayCardId(target) {
    return target?.kind === "tray-part" ? target.template.id : null;
  }
  function hoveredBaseKey() {
    return hoverTarget?.kind === "dna-nucleotide" ? hoverTarget.key : null;
  }
  function pressedTrayCard() {
    return pointerState && !pointerState.moved
      ? trayCardId(pointerState.target)
      : null;
  }
  // Hovering a supply card lifts it and lets the other cards recede a little.
  function applyHover(next) {
    if (getTargetKey(next) === getTargetKey(hoverTarget)) return false;
    const previous = trayCardId(hoverTarget);
    hoverTarget = next;
    const current = trayCardId(next);
    if (previous !== current) {
      if (previous) tweenTo(`tray:${previous}`, 0, 170, easeOutCubic, 1);
      if (current) tweenTo(`tray:${current}`, 1, 190, easeOutCubic, 0);
      if (Boolean(previous) !== Boolean(current))
        tweenTo(
          "tray:focus",
          current ? 1 : 0,
          220,
          easeOutCubic,
          current ? 0 : 1,
        );
    }
    return true;
  }
  function pressTrayCard(id, pressed) {
    if (!id) return;
    tweenTo(
      `tray:${id}:press`,
      pressed ? 1 : 0,
      pressed ? 110 : 170,
      easeOutCubic,
      pressed ? 0 : 1,
    );
  }
  function releaseTrayPress() {
    pressTrayCard(pressedTrayCard(), false);
  }
  // Selection and hover share one focus value per nucleotide, so the ring, the
  // delete badge and the lift all move together.
  function syncFocus() {
    const next = new Set();
    const hovered = hoveredBaseKey();
    if (hovered) next.add(hovered);
    if (selectedKey) next.add(selectedKey);
    for (const key of focusKeys)
      if (!next.has(key)) tweenTo(`focus:${key}`, 0, 170, easeOutCubic, 1);
    for (const key of next)
      if (!focusKeys.has(key)) tweenTo(`focus:${key}`, 1, 190, easeOutCubic, 0);
    focusKeys.clear();
    for (const key of next) focusKeys.add(key);
  }
  function focusTarget(key) {
    return hoveredBaseKey() === key || selectedKey === key ? 1 : 0;
  }
  // A nucleotide dropped on the wrong slot arcs back to its supply card.
  function startRejection(type, point) {
    if (motionReduced()) return;
    const card = trayItems.find((item) => item.nucleotideType === type);
    rejections.push({
      type,
      from: { x: point.x, y: point.y },
      to: card
        ? {
            x: card.rect.x + card.rect.w / 2,
            y: card.rect.y + card.rect.h / 2,
          }
        : { x: point.x, y: point.y - 48 },
      start: performance.now(),
      duration: 480,
    });
    scheduleFrames();
  }
  function rejectionPose(rejection, now) {
    const raw = clamp01((now - rejection.start) / rejection.duration);
    const eased = easeOutCubic(raw);
    return {
      raw,
      point: {
        x: rejection.from.x + (rejection.to.x - rejection.from.x) * eased,
        y:
          rejection.from.y +
          (rejection.to.y - rejection.from.y) * eased -
          Math.sin(raw * Math.PI) * 30,
      },
    };
  }
  function setLayout(next) {
    if (
      layout.width === next.width &&
      layout.height === next.height &&
      layout.showSupply === next.showSupply &&
      layout.trayRow === next.trayRow
    )
      return;
    layout = { ...next };
    const trayRow = Boolean(layout.showSupply && layout.trayRow);
    const supplyWidth = layout.showSupply
      ? trayRow
        ? layout.width
        : Math.max(336, layout.width * 0.44)
      : 0;
    const supplyHeight = layout.showSupply
      ? trayRow
        ? Math.max(116, Math.min(184, layout.width * 0.34))
        : layout.height
      : 0;
    Object.assign(supplyArea, {
      x: 0,
      y: 0,
      w: supplyWidth,
      h: supplyHeight,
    });
    Object.assign(
      boardArea,
      trayRow
        ? {
            x: 0,
            y: supplyHeight,
            w: layout.width,
            h: layout.height - supplyHeight,
          }
        : {
            x: supplyWidth,
            y: 0,
            w: layout.width - supplyWidth,
            h: layout.height,
          },
    );
    Object.assign(slotArea, {
      x: boardArea.x + 18,
      y: boardArea.y + 64,
      w: boardArea.w - 36,
    });
    slots = buildSlots(slotArea, (boardArea.h - 160) / (ROW_COUNT - 1));
    if (layout.showSupply) {
      if (trayRow) {
        const gap = 10;
        const cardWidth = (supplyWidth - 40 - gap * 3) / 4;
        const cardHeight = supplyHeight - 36;
        trayItems.forEach((item, index) => {
          Object.assign(item.rect, {
            x: 20 + index * (cardWidth + gap),
            y: 18,
            w: cardWidth,
            h: cardHeight,
          });
        });
      } else {
        const cardWidth = (supplyWidth - 64) / 2;
        const cardHeight = (layout.height - 116) / 2;
        trayItems.forEach((item, index) => {
          Object.assign(item.rect, {
            x: 24 + (index % 2) * (cardWidth + 16),
            y: 72 + Math.floor(index / 2) * (cardHeight + 20),
            w: cardWidth,
            h: cardHeight,
          });
        });
      }
    }
    releaseTrayPress();
    applyHover(null);
    pointerState = null;
  }
  function $t(key) {
    return slots.find((slot) => slot.key === key);
  }
  setLayout({ width: 752, height: 552, showSupply: true, trayRow: false });
  function clearMessage() {
    if (messageTimeout !== null) window.clearTimeout(messageTimeout);
    messageTimeout = null;
  }
  function notify(message, level = "info", timeout) {
    onNotice(message, level);
    clearMessage();
    if (timeout)
      messageTimeout = window.setTimeout(() => {
        messageTimeout = null;
        redraw();
      }, timeout);
    redraw();
  }
  function toggleView() {
    viewMode = viewMode === "diagram" ? "structure" : "diagram";
    redraw();
  }
  function setSceneMode(mode) {
    if (sceneMode === mode) return;
    sceneMode = mode;
    releaseTrayPress();
    applyHover(null);
    pointerState = null;
    selectedKey = null;
    clearMessage();
    redraw();
  }
  function toggle3d() {
    if (sceneMode === "helix3d") setSceneMode("board2d");
    else if (placedBases.size) setSceneMode("helix3d");
  }
  function getSnapshot() {
    return {
      sceneMode,
      viewMode,
      nucleotides: Array.from(placedBases, ([key, type]) => ({
        ...parseSlotKey(key),
        type,
      })).sort((a, b) => a.row - b.row || a.strand.localeCompare(b.strand)),
    };
  }
  function destroy() {
    clearMessage();
    stopMotion();
  }
  function getOpenSlots() {
    if (placedBases.size === 0)
      return [
        {
          key: slotKey("left", START_ROW),
          row: START_ROW,
          strand: "left",
          requiredType: null,
        },
      ];
    const r = [];
    for (const a of slots) {
      if (placedBases.has(a.key)) continue;
      const p = placedBases.get(slotKey(oppositeStrand(a.strand), a.row));
      if (p) {
        r.push({
          key: a.key,
          row: a.row,
          strand: a.strand,
          requiredType: COMPLEMENT[p],
        });
        continue;
      }
      [a.row - 1, a.row + 1]
        .filter((x) => x >= 0 && x < ROW_COUNT)
        .some((x) => placedBases.has(slotKey(a.strand, x))) &&
        r.push({
          key: a.key,
          row: a.row,
          strand: a.strand,
          requiredType: null,
        });
    }
    return r;
  }
  function getSlotsForBase(r) {
    return getOpenSlots().filter(
      (a) => a.requiredType === null || a.requiredType === r,
    );
  }
  function findDropSlot(r, a) {
    return getSlotsForBase(r).find((p) => {
      const b = $t(p.key);
      return b ? rectContains(b.hitRect, a) : false;
    });
  }
  function canRemove(r) {
    if (!placedBases.has(r)) return false;
    const { row: a, strand: p } = parseSlotKey(r),
      b = a > 0 && placedBases.has(slotKey(p, a - 1)),
      x = a < ROW_COUNT - 1 && placedBases.has(slotKey(p, a + 1));
    return !(b && x);
  }
  function dropNucleotide(r) {
    const a = findDropSlot(r.type, r.point);
    if (a) {
      placedBases.set(a.key, r.type);
      tweenTo(`pop:${a.key}`, 1, 300, (value) => value, 0);
      if (placedBases.size === ROW_COUNT * 2)
        notify(t("dna.notice.complete"), "success", 1800);
      else notify(t("dna.notice.placed"), "success", 1200);
      return;
    }
    startRejection(r.type, r.point);
    notify(t("dna.notice.mismatch"), "warning", 1400);
  }
  function removeNucleotide(r) {
    const type = placedBases.get(r);
    if (!type) return;
    if (!canRemove(r)) {
      notify(t("dna.notice.onlyEnd"), "warning", 1400);
      return;
    }
    placedBases.delete(r);
    startExitAnimation(r, type);
    notify(t("dna.notice.removed"), "info", 1200);
  }
  // The removed nucleotide shrinks away instead of vanishing between frames.
  function startExitAnimation(key, type) {
    if (motionReduced()) return;
    exitingBases.set(key, type);
    tweenTo(`exit:${key}`, 1, 300, easeOutCubic, 0);
  }
  function getRemoveButtonBounds(r) {
    const size = 22;
    return {
      x: r.hitRect.x + r.hitRect.w - size / 2,
      y: r.hitRect.y - size / 2,
      w: size,
      h: size,
    };
  }
  function hitTest(r) {
    // The bench itself is inert: only supply cards, placed nucleotides and the
    // remove badge respond to the pointer.
    if (layout.showSupply) {
      const p = trayItems.find(({ rect: b }) => rectContains(b, r));
      if (p)
        return {
          kind: "tray-part",
          template: p,
        };
    }
    if (selectedKey) {
      const p = slots.find((b) => b.key === selectedKey);
      if (p && rectContains(getRemoveButtonBounds(p), r))
        return {
          kind: "remove-nucleotide",
          key: selectedKey,
        };
    }
    for (const p of slots)
      if (placedBases.has(p.key) && rectContains(p.hitRect, r, 4))
        return {
          kind: "dna-nucleotide",
          key: p.key,
        };
    return null;
  }
  function getTargetKey(r) {
    return r
      ? r.kind === "button"
        ? `button:${r.id}`
        : r.kind === "dna-nucleotide"
          ? `dna:${r.key}`
          : r.kind === "remove-nucleotide"
            ? `remove:${r.key}`
            : `tray:${r.template.id}`
      : "";
  }
  // Only supply cards start a drag; the board itself never moves.
  function createDrag(r, a) {
    return r?.kind === "tray-part"
      ? {
          kind: "nucleotide",
          type: r.template.nucleotideType,
          point: a,
        }
      : null;
  }
  function getCursor() {
    if (pointerState?.drag) return "grabbing";
    if (!hoverTarget) return "default";
    // Tray cards can only be dragged: no click-to-place affordance.
    if (hoverTarget.kind === "tray-part") return "grab";
    if (
      hoverTarget.kind === "button" ||
      hoverTarget.kind === "remove-nucleotide"
    )
      return "pointer";
    if (hoverTarget.kind === "dna-nucleotide")
      return selectedKey === hoverTarget.key || canRemove(hoverTarget.key)
        ? "pointer"
        : "not-allowed";
    return "default";
  }
  function j(r, a, p, b, x) {
    (r.save(),
      (r.fillStyle = x),
      (r.font = `700 ${b}px ${fontFamily()}`),
      drawCenteredText(r, a, p.x, p.y),
      r.restore());
  }
  function X(r, a, p) {
    return {
      x: r.x + (a.x - r.x) * p,
      y: r.y + (a.y - r.y) * p,
    };
  }
  function ee(r, a, p) {
    const b = r.x - a.x,
      x = r.y - a.y,
      v = Math.hypot(b, x) || 1;
    return {
      x: r.x + (b / v) * p,
      y: r.y + (x / v) * p,
    };
  }
  function q(r, a, p) {
    return {
      x: r.x + r.w * (p === "left" ? a.x : 1 - a.x),
      y: r.y + r.h * a.y,
    };
  }
  function ye(r, a = "full") {
    const p =
        a === "compact"
          ? RENDER_SETTINGS.twoD.baseRectScale.compact
          : RENDER_SETTINGS.twoD.baseRectScale.full,
      b = r.w * (p - 1),
      x = r.h * (p - 1);
    return {
      x: r.x - b / 2,
      y: r.y - x / 2,
      w: r.w + b,
      h: r.h + x,
    };
  }
  function ue(r, a, p, b, x, v = 1) {
    const M = (ze, Ke) => {
      (r.beginPath(), r.moveTo(ze.x, ze.y), r.lineTo(Ke.x, Ke.y), r.stroke());
    };
    if (
      (r.save(),
      (r.strokeStyle = b),
      (r.lineWidth = x),
      (r.lineCap = "round"),
      (r.lineJoin = "round"),
      v === 1)
    ) {
      (M(a, p), r.restore());
      return;
    }
    const m = p.x - a.x,
      C = p.y - a.y,
      H = Math.hypot(m, C) || 1,
      oe = RENDER_SETTINGS.twoD.doubleBondOffset,
      ne = (-C / H) * oe,
      je = (m / H) * oe;
    (M(
      {
        x: a.x + ne,
        y: a.y + je,
      },
      {
        x: p.x + ne,
        y: p.y + je,
      },
    ),
      M(
        {
          x: a.x - ne,
          y: a.y - je,
        },
        {
          x: p.x - ne,
          y: p.y - je,
        },
      ),
      r.restore());
  }
  function Le(r, a, p, b, x, v, M, m) {
    (ue(r, a, p, v, M, 1), j(r, x, b, m, v));
  }
  function Ue(r, a, p = 0.55) {
    return X(r, a, p);
  }
  function Ot(r, a, p, b, x, v, M = 0.55) {
    const m = Ue(a, p, M);
    return (ue(r, a, m, b, x, 1), ue(r, m, p, b, x, 1), j(r, "O", m, v, b), m);
  }
  function bn(r, a, p) {
    const b = Array.from(
        {
          length: 5,
        },
        (je, ze) => {
          const Ke = a + (Math.PI * 2 * ze) / 5;
          return {
            x: r.x + p * Math.cos(Ke),
            y: r.y + p * Math.sin(Ke),
          };
        },
      ),
      x = b[1],
      v = b[2],
      M = b[3],
      m = b[4],
      C = ee(x, r, p * 0.62),
      H = ee(v, r, p * 0.52),
      oe = ee(M, r, p * 0.58),
      ne = ee(m, r, p * 0.9);
    return {
      vertices: b,
      c1: x,
      c2: v,
      c3: M,
      c4: m,
      c5: X(m, ne, 0.48),
      c1Stub: X(x, C, 0.56),
      c2Stub: X(v, H, 0.56),
      c3Stub: X(M, oe, 0.56),
      c5Stub: X(m, ne, 0.48),
      c1Label: C,
      c2Label: H,
      c3Label: oe,
      c5Label: ne,
      ringOLabel: ee(b[0], r, 5),
    };
  }
  function Re(r, a) {
    return {
      top: {
        x: r.x,
        y: r.y - a * 1.5,
      },
      right: {
        x: r.x + a * 1.45,
        y: r.y - a * 0.1,
      },
      bottom: {
        x: r.x + a * 0.1,
        y: r.y + a * 1.45,
      },
      left: {
        x: r.x - a * 1.4,
        y: r.y - a * 0.12,
      },
    };
  }
  function Ve(r, a, p) {
    const b = Re(r, a),
      x = new Set();
    for (const v of p) {
      let M = null,
        m = Number.POSITIVE_INFINITY;
      for (const C of ["right", "bottom", "left"]) {
        if (x.has(C)) continue;
        const H = distanceBetween(b[C], v);
        H < m && ((M = C), (m = H));
      }
      M && x.add(M);
    }
    return x;
  }
  function Kn(r, a, p) {
    return q(ye(r, "full"), BASE_STRUCTURES[a].glycosidicLabelAt, p);
  }
  function Yn(r, a, p, b, x, v, M) {
    const m = BASE_STRUCTURES[p],
      C = STRUCTURE_COLORS[p],
      H = ye(a, v),
      oe = {
        x: H.x + H.w / 2,
        y: H.y + H.h / 2,
      },
      ne = x === PALETTE.accent || x === PALETTE.warning ? x : C.stroke,
      je = x === PALETTE.accent || x === PALETTE.warning ? x : C.text,
      ze =
        v === "compact"
          ? RENDER_SETTINGS.twoD.baseLineWidth.compact
          : RENDER_SETTINGS.twoD.baseLineWidth.full,
      Ke =
        v === "compact"
          ? RENDER_SETTINGS.twoD.baseFontSize.compact
          : RENDER_SETTINGS.twoD.baseFontSize.full,
      sn = m.bonds.map(($e) => ({
        from: q(H, $e.from, b),
        to: q(H, $e.to, b),
        order: $e.order ?? 1,
      })),
      Ro = [
        ...sn,
        {
          from: q(H, m.sugarAnchor, b),
          to: q(H, m.glycosidicLabelAt, b),
        },
      ];
    for (const $e of sn) ue(r, $e.from, $e.to, ne, ze, $e.order);
    for (const $e of m.labels) {
      if (v === "compact" && $e.compact === false) continue;
      const Mo = Ke * ($e.scale ?? 1),
        xs = q(H, $e.at, b),
        Zi = resolveLabelCollision(xs, $e.text, Mo, Ro, {
          x: xs.x - oe.x,
          y: xs.y - oe.y,
        });
      j(r, $e.text, Zi, Mo, je);
    }
    const Eo = M === "bound" ? "N" : m.glycosidicFreeLabel,
      ws = q(H, m.glycosidicLabelAt, b),
      Ji = resolveLabelCollision(ws, Eo, Ke * 0.95, Ro, {
        x: ws.x - oe.x,
        y: ws.y - oe.y,
      });
    j(r, Eo, Ji, Ke * 0.95, je);
  }
  function qt(r, a, p = PALETTE.connector, b = 2.6, x) {
    if (!(a.length < 2)) {
      (r.save(),
        (r.strokeStyle = p),
        (r.lineWidth = b),
        (r.lineCap = "round"),
        (r.lineJoin = "round"),
        r.beginPath(),
        r.moveTo(a[0].x, a[0].y));
      for (let v = 1; v < a.length; v += 1) r.lineTo(a[v].x, a[v].y);
      (r.stroke(), r.restore());
    }
  }
  function _o(r, a) {
    return viewMode === "structure" && a
      ? q(r.baseRect, BASE_STRUCTURES[a].sugarAnchor, r.strand)
      : {
          x:
            r.baseCenter.x +
            (r.strand === "right" ? METRICS.baseWidth / 2 : -72 / 2),
          y: r.baseCenter.y,
        };
  }
  function Hi(r, a, p, b) {
    const x = b === "right",
      v = a.x,
      M = a.y,
      m = a.w,
      C = a.h,
      H = 7;
    switch (
      (r.beginPath(),
      x
        ? (r.moveTo(v, M),
          r.lineTo(v + m - H, M),
          r.arcTo(v + m, M, v + m, M + H, H),
          r.lineTo(v + m, M + C - H),
          r.arcTo(v + m, M + C, v + m - H, M + C, H),
          r.lineTo(v, M + C))
        : (r.moveTo(v + m, M),
          r.lineTo(v + H, M),
          r.arcTo(v, M, v, M + H, H),
          r.lineTo(v, M + C - H),
          r.arcTo(v, M + C, v + H, M + C, H),
          r.lineTo(v + m, M + C)),
      p)
    ) {
      case BASE_TYPES.A:
        r.lineTo(
          x ? v - METRICS.endShapeWidth : v + m + METRICS.endShapeWidth,
          M + C / 2,
        );
        break;
      case BASE_TYPES.T:
        r.lineTo(
          x ? v + METRICS.endShapeWidth : v + m - METRICS.endShapeWidth,
          M + C / 2,
        );
        break;
      case BASE_TYPES.G:
        r.ellipse(
          x ? v : v + m,
          M + C / 2,
          METRICS.endShapeWidth,
          C / 2,
          0,
          Math.PI / 2,
          -Math.PI / 2,
          !x,
        );
        break;
      case BASE_TYPES.C:
        r.ellipse(
          x ? v : v + m,
          M + C / 2,
          METRICS.endShapeWidth,
          C / 2,
          0,
          Math.PI / 2,
          -Math.PI / 2,
          x,
        );
        break;
    }
    r.closePath();
  }
  function Qt(
    r,
    a,
    p = METRICS.phosphateRadius,
    b = PALETTE.phosphateFill,
    x = PALETTE.phosphateStroke,
    v = 2,
    M = {},
  ) {
    if (viewMode === "structure") {
      const m = Re(a, p),
        C = Math.max(v, RENDER_SETTINGS.twoD.phosphateBondWidth),
        H =
          p >= 12
            ? RENDER_SETTINGS.twoD.phosphateLabelSize.large
            : RENDER_SETTINGS.twoD.phosphateLabelSize.medium,
        oe =
          p >= 12
            ? RENDER_SETTINGS.twoD.phosphateLabelSize.medium
            : RENDER_SETTINGS.twoD.phosphateLabelSize.small,
        ne = RENDER_SETTINGS.twoD.phosphateLabelSize.small,
        je = p >= 12 ? 5.8 : 5.2,
        ze = M.esterTargets?.filter(Boolean) ?? [],
        Ke = Ve(a, p, ze);
      (ue(r, a, m.top, x, C, 2),
        j(r, "P", a, H, x),
        j(r, "O", ee(m.top, a, je), oe, x));
      for (const sn of ["right", "bottom", "left"])
        Ke.has(sn) ||
          (ue(r, a, m[sn], x, C, 1), j(r, "OH", ee(m[sn], a, je), ne, x));
      return;
    }
    (r.save(),
      r.beginPath(),
      (r.fillStyle = b),
      (r.strokeStyle = x),
      (r.lineWidth = v),
      r.arc(a.x, a.y, p, 0, Math.PI * 2),
      r.fill(),
      r.stroke(),
      r.restore());
  }
  function en(
    r,
    a,
    p,
    b = METRICS.pentagonRadius,
    x = PALETTE.sugarFill,
    v = PALETTE.sugarStroke,
    M = 2,
    m = {},
  ) {
    if (viewMode === "structure") {
      const C = bn(a, p, b),
        H = Math.max(M, RENDER_SETTINGS.twoD.sugarBondWidth),
        oe = RENDER_SETTINGS.twoD.sugarLabelSize.small,
        ne =
          b >= 20
            ? RENDER_SETTINGS.twoD.sugarLabelSize.medium
            : RENDER_SETTINGS.twoD.sugarLabelSize.small,
        je =
          b >= 20
            ? RENDER_SETTINGS.twoD.sugarLabelSize.large
            : RENDER_SETTINGS.twoD.sugarLabelSize.medium;
      for (let ze = 0; ze < C.vertices.length; ze += 1)
        ue(
          r,
          C.vertices[ze],
          C.vertices[(ze + 1) % C.vertices.length],
          v,
          H,
          1,
        );
      return (
        j(r, "O", C.ringOLabel, je, v),
        Le(r, C.c2, C.c2Stub, C.c2Label, "H", v, H, ne),
        m.baseTarget
          ? ue(r, C.c1, m.baseTarget, v, H, 1)
          : Le(r, C.c1, C.c1Stub, C.c1Label, "OH", v, H, ne),
        m.threePrimeTarget
          ? Ot(r, C.c3, m.threePrimeTarget, v, H, ne, 0.46)
          : Le(r, C.c3, C.c3Stub, C.c3Label, "OH", v, H, ne),
        ue(r, C.c4, C.c5, v, H, 1),
        j(r, m.fivePrimeTarget ? "CH2" : "HOCH2", C.c5Label, oe, v),
        m.fivePrimeTarget && Ot(r, C.c5, m.fivePrimeTarget, v, H, ne, 0.55),
        C
      );
    }
    (r.save(),
      (r.fillStyle = x),
      (r.strokeStyle = v),
      (r.lineWidth = M),
      traceRegularPolygon(r, a, b, p),
      r.fill(),
      r.stroke(),
      r.restore());
  }
  function Sn(
    r,
    a,
    p,
    b,
    x,
    v,
    M,
    m = 2,
    C,
    H = true,
    oe = "full",
    ne = "free",
  ) {
    if (viewMode === "structure") {
      if (!p || !H) return;
      Yn(r, a, p, b, v, oe, ne);
      return;
    }
    (r.save(),
      (r.fillStyle = x),
      (r.strokeStyle = v),
      (r.lineWidth = m),
      Hi(r, a, p, b),
      r.fill(),
      r.stroke(),
      r.restore(),
      !(!p || !H) &&
        ((r.fillStyle = M),
        (r.font = `700 ${Math.round(Math.min(RENDER_SETTINGS.twoD.diagramBaseLetterSize, a.h * 0.72))}px ${fontFamily()}`),
        drawCenteredText(
          r,
          p,
          a.x + a.w / 2 + baseLetterShift(p, b, a),
          a.y + a.h / 2 + 1,
        )));
  }
  // A and T add a pointed tip or a pointed notch, and G and C add or cut an
  // elliptical end, so the letter follows the silhouette's centre of area
  // instead of the plain rectangle centre.
  function baseLetterShift(p, b, a) {
    const e = METRICS.endShapeWidth,
      m = a.w,
      h = a.h,
      area = m * h;
    let piece, centre;
    switch (p) {
      case BASE_TYPES.A:
        ((piece = (h * e) / 2), (centre = m + e / 3));
        break;
      case BASE_TYPES.T:
        ((piece = -(h * e) / 2), (centre = m - e / 3));
        break;
      case BASE_TYPES.G:
        ((piece = (Math.PI * e * h) / 4),
          (centre = m + (4 * e) / (3 * Math.PI)));
        break;
      case BASE_TYPES.C:
        ((piece = -(Math.PI * e * h) / 4),
          (centre = m - (4 * e) / (3 * Math.PI)));
        break;
      default:
        return 0;
    }
    const shift = (piece * (centre - m / 2)) / (area + piece);
    return b === "left" ? shift : -shift;
  }
  function ki(r) {
    if (r.row < 0) return null;
    const a = r.strand === "left" ? r.row + 1 : r.row - 1;
    if (a < 0 || a >= ROW_COUNT) return null;
    const p = $t(slotKey(r.strand, a));
    return !p || !placedBases.has(p.key) ? null : p.phosphate;
  }
  function Fi(r) {
    if (r.row < 0) return null;
    const a = r.strand === "left" ? r.row - 1 : r.row + 1;
    if (a < 0 || a >= ROW_COUNT) return null;
    const p = $t(slotKey(r.strand, a));
    return !p || !placedBases.has(p.key)
      ? null
      : bn(p.pentagonCenter, p.pentagonRotation, METRICS.pentagonRadius).c3;
  }
  function xo(r, a, p, b) {
    const x = p ? BASE_COLORS[p] : null;
    let v;
    const M =
      p && b.showSugar && b.sugarHasBaseBond
        ? Kn(a.baseRect, p, a.strand)
        : void 0;
    if (
      (b.showSugar &&
        (v = en(
          r,
          a.pentagonCenter,
          a.pentagonRotation,
          METRICS.pentagonRadius,
          PALETTE.sugarFill,
          PALETTE.sugarStroke,
          2,
          {
            baseTarget: M,
            fivePrimeTarget: b.sugarFivePrimeTarget,
            threePrimeTarget: b.sugarThreePrimeTarget,
          },
        )),
      b.showPhosphate)
    ) {
      const m = [v?.c5, b.phosphateInboundTarget].filter((C) => !!C);
      Qt(
        r,
        a.phosphate,
        METRICS.phosphateRadius,
        PALETTE.phosphateFill,
        PALETTE.phosphateStroke,
        2,
        {
          esterTargets: m,
        },
      );
    }
    p &&
      x &&
      Sn(
        r,
        a.baseRect,
        p,
        a.strand,
        x.fill,
        b.emphasis ?? x.stroke,
        x.text,
        2,
        void 0,
        true,
        "full",
        b.sugarHasBaseBond ? "bound" : "free",
      );
  }
  function Ss(r, a, p, b, x = false) {
    const v = BASE_COLORS[p];
    if ((r.save(), x && (r.globalAlpha = 0.92), viewMode === "structure")) {
      (xo(r, a, p, {
        showPhosphate: true,
        showSugar: true,
        sugarHasBaseBond: true,
        sugarFivePrimeTarget: a.phosphate,
        sugarThreePrimeTarget: ki(a) ?? void 0,
        phosphateInboundTarget: Fi(a) ?? void 0,
        emphasis: b,
      }),
        r.restore());
      return;
    }
    (qt(r, [_o(a, p), a.c1]),
      qt(r, [a.c4, a.elbow, a.phosphate]),
      Qt(r, a.phosphate),
      en(r, a.pentagonCenter, a.pentagonRotation),
      Sn(r, a.baseRect, p, a.strand, v.fill, b ?? v.stroke, v.text),
      r.restore());
  }
  function slotCenter(slot) {
    return {
      x: slot.hitRect.x + slot.hitRect.w / 2,
      y: slot.hitRect.y + slot.hitRect.h / 2,
    };
  }
  // A dropped nucleotide eases gently into place and stays a touch larger while
  // it is hovered or selected.
  function drawPlacedBase(r, slot, type) {
    const pop = tweenValue(`pop:${slot.key}`, 1);
    const incoming = pop < 1;
    const focus = incoming
      ? 0
      : tweenValue(`focus:${slot.key}`, focusTarget(slot.key));
    const center = slotCenter(slot);
    const scale = incoming ? 0.92 + 0.08 * easeOutCubic(pop) : 1 + 0.04 * focus;
    r.save();
    if (incoming) {
      r.globalAlpha = clamp01(0.65 + 0.35 * pop);
      drawPlacementHalo(r, slot, type, pop);
    }
    r.translate(center.x, center.y);
    r.scale(scale);
    r.translate(-center.x, -center.y);
    Ss(r, slot, type);
    r.restore();
  }
  // A faint ring hugs the slot as the base lands, then fades out.
  function drawPlacementHalo(r, slot, type, progress) {
    const grown = 1 - (1 - progress) ** 2;
    const x = slot.hitRect.x - 2 - 4 * grown;
    const y = slot.hitRect.y - 2 - 4 * grown;
    const w = slot.hitRect.w + 4 + 8 * grown;
    const h = slot.hitRect.h + 4 + 8 * grown;
    r.save();
    r.globalAlpha = clamp01(r.globalAlpha) * 0.26 * (1 - progress);
    r.strokeStyle = BASE_COLORS[type].stroke;
    r.lineWidth = 1.2;
    r.beginPath();
    r.roundRect(x, y, w, h, 12);
    r.stroke();
    r.restore();
  }
  function drawExitingBase(r, slot, type) {
    const progress = tweenValue(`exit:${slot.key}`, 1);
    const center = slotCenter(slot);
    const scale = 1 - 0.4 * easeOutCubic(clamp01(progress));
    r.save();
    r.globalAlpha = clamp01(1 - progress) * 0.92;
    r.translate(center.x, center.y);
    r.scale(scale);
    r.translate(-center.x, -center.y);
    Ss(r, slot, type);
    r.restore();
  }
  function drawTrayCards(r) {
    if (!layout.showSupply) return;
    const pressed = pressedTrayCard();
    for (const item of trayItems) {
      const hovered =
        hoverTarget?.kind === "tray-part" &&
        hoverTarget.template.id === item.id;
      const color = BASE_COLORS[item.nucleotideType];
      const lift = tweenValue(`tray:${item.id}`, hovered ? 1 : 0);
      const press = tweenValue(
        `tray:${item.id}:press`,
        pressed === item.id ? 1 : 0,
      );
      const focus = tweenValue("tray:focus", trayCardId(hoverTarget) ? 1 : 0);
      const cardX = item.rect.x + item.rect.w / 2;
      const cardY = item.rect.y + item.rect.h / 2;
      r.save();
      // Siblings recede a little while any card is hovered.
      r.globalAlpha = Math.min(1, 1 - 0.14 * focus * (1 - lift));
      // Hover lifts the card off the deck and the press pushes it back down;
      r.translate(cardX, cardY - 7 * lift + 2 * press);
      r.scale(1 + 0.016 * lift - 0.03 * press);
      r.translate(-cardX, -cardY);
      r.shadow = lift > 0.02 ? "lift" : null;
      drawRoundedRect(
        r,
        item.rect,
        12,
        hovered ? "rgba(255, 255, 255, 0.98)" : "rgba(255, 255, 255, 0.88)",
        hovered ? color.fill : "rgba(100, 135, 160, 0.25)",
      );
      r.shadow = null;

      r.fillStyle = color.fill;
      r.beginPath();
      r.roundRect(
        item.rect.x,
        item.rect.y + 8 - 1.5 * lift,
        4 + 1.6 * lift,
        item.rect.h - 16 + 3 * lift,
        2,
      );
      r.fill();

      const gripX = item.rect.x + item.rect.w - 12;
      const gripY = item.rect.y + 20;
      r.fillStyle = "rgba(100, 135, 160, 0.4)";
      for (const dotY of [-8, 0, 8]) {
        r.beginPath();
        r.arc(gripX - 4, gripY + dotY, 1.2, 0, Math.PI * 2);
        r.arc(gripX, gripY + dotY, 1.2, 0, Math.PI * 2);
        r.fill();
      }

      const center = {
        x: item.rect.x + item.rect.w / 2,
        y: item.rect.y + item.rect.h * 0.38,
      };
      const bounds = expandRect(
        nucleotideBounds(center, "left", item.nucleotideType),
        viewMode === "structure" ? 14 : 2,
      );
      const scale = Math.min(
        (item.rect.w - 20) / bounds.w,
        112 / bounds.h,
        0.9,
      );
      const centerX = item.rect.x + item.rect.w / 2;
      const centerY = center.y;
      r.save();
      r.translate(
        centerX - (bounds.x + bounds.w / 2) * scale,
        centerY - (bounds.y + bounds.h / 2) * scale,
      );
      r.scale(scale);
      Ss(r, createSlot(center, "left"), item.nucleotideType);
      r.restore();

      r.fillStyle = PALETTE.textPrimary;
      drawTrayLabel(r, t(item.label), item.rect);
      r.restore();
    }
  }
  function drawCornerBrackets(
    r,
    rect,
    len = 8,
    color = "rgba(47, 111, 214, 0.35)",
    width = 1.5,
  ) {
    r.save();
    r.strokeStyle = color;
    r.lineWidth = width;
    r.beginPath();
    r.moveTo(rect.x, rect.y + len);
    r.lineTo(rect.x, rect.y);
    r.lineTo(rect.x + len, rect.y);
    r.moveTo(rect.x + rect.w - len, rect.y);
    r.lineTo(rect.x + rect.w, rect.y);
    r.lineTo(rect.x + rect.w, rect.y + len);
    r.moveTo(rect.x, rect.y + rect.h - len);
    r.lineTo(rect.x, rect.y + rect.h);
    r.lineTo(rect.x + len, rect.y + rect.h);
    r.moveTo(rect.x + rect.w - len, rect.y + rect.h);
    r.lineTo(rect.x + rect.w, rect.y + rect.h);
    r.lineTo(rect.x + rect.w, rect.y + rect.h - len);
    r.stroke();
    r.restore();
  }
  function Ni(r, a, openSlot) {
    const rect = a.baseRect;
    r.save();
    if (!openSlot) {
      r.fillStyle = "rgba(255, 255, 255, 0.45)";
      r.beginPath();
      r.roundRect(rect.x, rect.y, rect.w, rect.h, 8);
      r.fill();
      r.strokeStyle = "rgba(110, 145, 170, 0.20)";
      r.lineWidth = 1;
      r.setLineDash([3, 3]);
      r.stroke();
      r.setLineDash([]);

      r.strokeStyle = "rgba(110, 145, 170, 0.25)";
      r.beginPath();
      r.moveTo(a.baseCenter.x - 4, a.baseCenter.y);
      r.lineTo(a.baseCenter.x + 4, a.baseCenter.y);
      r.moveTo(a.baseCenter.x, a.baseCenter.y - 4);
      r.lineTo(a.baseCenter.x, a.baseCenter.y + 4);
      r.stroke();

      const rowX =
        a.strand === "left" ? boardArea.x + 16 : boardArea.x + boardArea.w - 16;
      r.font = `600 10px monospace`;
      r.fillStyle = "rgba(100, 135, 160, 0.40)";
      r.textAlign = "center";
      r.textBaseline = "middle";
      r.fillText(String(a.row + 1).padStart(2, "0"), rowX, a.baseCenter.y);
    } else {
      // Every open slot is hinted the same way: the base that fits is left for
      // the learner to work out, and the hint itself stays pale.
      const isStart =
        placedBases.size === 0 && a.key === slotKey("left", START_ROW);
      r.fillStyle = "rgba(47, 111, 214, 0.06)";
      r.beginPath();
      r.roundRect(rect.x, rect.y, rect.w, rect.h, 9);
      r.fill();

      // A slow breath marks the slot as the live drop target without shouting.
      r.animation = "dna-slot-breathe";
      r.strokeStyle = "rgba(47, 111, 214, 0.32)";
      r.lineWidth = 1.2;
      r.setLineDash([4, 3]);
      r.stroke();
      r.animation = null;
      r.setLineDash([]);

      r.fillStyle = "rgba(47, 111, 214, 0.55)";
      r.font = `600 11px ${fontFamily()}`;
      drawCenteredText(
        r,
        t(isStart ? "dna.bench.startSlot" : "dna.bench.openSlot"),
        a.baseCenter.x,
        a.baseCenter.y,
      );

      r.fillStyle = "rgba(47, 111, 214, 0.05)";
      r.strokeStyle = "rgba(47, 111, 214, 0.22)";
      r.lineWidth = 1;
      r.setLineDash([2, 2]);
      traceRegularPolygon(
        r,
        a.pentagonCenter,
        METRICS.pentagonRadius * 0.95,
        a.pentagonRotation,
      );
      r.fill();
      r.stroke();
      r.beginPath();
      r.arc(
        a.phosphate.x,
        a.phosphate.y,
        METRICS.phosphateRadius * 0.95,
        0,
        Math.PI * 2,
      );
      r.fill();
      r.stroke();
      r.setLineDash([]);

      const rowX =
        a.strand === "left" ? boardArea.x + 16 : boardArea.x + boardArea.w - 16;
      r.font = `700 10px monospace`;
      r.fillStyle = "rgba(100, 135, 160, 0.45)";
      r.textAlign = "center";
      r.textBaseline = "middle";
      r.fillText(String(a.row + 1).padStart(2, "0"), rowX, a.baseCenter.y);
    }
    r.restore();
  }
  function vo(r, a) {
    const p = ye(r.baseRect, "full");
    return BASE_STRUCTURES[a].pairAnchors.map((b) => q(p, b, r.strand));
  }
  function To(r, a) {
    return r.strand === "left"
      ? isPurine(a)
        ? r.baseRect.x + r.baseRect.w + METRICS.endShapeWidth
        : r.baseRect.x + r.baseRect.w - METRICS.endShapeWidth
      : isPurine(a)
        ? r.baseRect.x - METRICS.endShapeWidth
        : r.baseRect.x + METRICS.endShapeWidth;
  }
  function ji(r, a) {
    return COMPLEMENT[r] !== a
      ? 0
      : r === BASE_TYPES.A || r === BASE_TYPES.T
        ? 2
        : 3;
  }
  function zi(r, a, p, b, x) {
    const v = ji(p, x);
    if (v === 0) return;
    if (
      (r.save(),
      (r.strokeStyle = PALETTE.hydrogenBond),
      (r.lineWidth = RENDER_SETTINGS.twoD.hydrogenBondWidth),
      r.setLineDash([...RENDER_SETTINGS.twoD.hydrogenBondDash]),
      viewMode === "structure")
    ) {
      const C = vo(a, p),
        H = vo(b, x),
        oe = Math.min(v, C.length, H.length);
      for (let ne = 0; ne < oe; ne += 1)
        (r.beginPath(),
          r.moveTo(C[ne].x, C[ne].y),
          r.lineTo(H[ne].x, H[ne].y),
          r.stroke());
      r.restore();
      return;
    }
    const M = (a.baseCenter.y + b.baseCenter.y) / 2,
      m = v === 2 ? [-5, 5] : [-9, 0, 9];
    for (const C of m) {
      const H = M + C;
      const x1 = To(a, p);
      const x2 = To(b, x);
      r.beginPath();
      r.moveTo(x1, H);
      r.lineTo(x2, H);
      r.stroke();
      r.save();
      r.fillStyle = PALETTE.hydrogenBond;
      r.beginPath();
      r.arc(x1, H, 1.8, 0, Math.PI * 2);
      r.arc(x2, H, 1.8, 0, Math.PI * 2);
      r.fill();
      r.restore();
    }
    r.restore();
  }

  function Gi(r, a) {
    return createSlot(r, a);
  }
  function Ui(r) {
    const a = slotArea.x + slotArea.w / 2;
    return r.x >= a ? "right" : "left";
  }
  function _s(r, a, p) {
    r.save();
    r.shadowColor = p;
    r.shadowBlur = 8;
    r.strokeStyle = p;
    r.lineWidth = 1.8;
    r.beginPath();
    r.roundRect(a.x - 2, a.y - 2, a.w + 4, a.h + 4, 14);
    r.stroke();
    drawCornerBrackets(
      r,
      { x: a.x - 4, y: a.y - 4, w: a.w + 8, h: a.h + 8 },
      8,
      p,
      2,
    );
    r.restore();
  }
  function Vi(r, a, p) {
    const cx = a.x + a.w / 2,
      cy = a.y + a.h / 2,
      radius = a.w / 2;
    r.save();
    r.shadowColor = "rgba(220, 53, 69, 0.35)";
    r.shadowBlur = 6;
    r.shadowOffsetY = 2;
    r.beginPath();
    r.arc(cx, cy, radius, 0, Math.PI * 2);
    r.fillStyle = p ? "#b02a37" : "#dc3545";
    r.fill();
    r.strokeStyle = "#ffffff";
    r.lineWidth = 1.5;
    r.stroke();

    const arm = radius * 0.42;
    r.beginPath();
    r.moveTo(cx - arm, cy - arm);
    r.lineTo(cx + arm, cy + arm);
    r.moveTo(cx + arm, cy - arm);
    r.lineTo(cx - arm, cy + arm);
    r.strokeStyle = "#ffffff";
    r.lineWidth = 1.8;
    r.lineCap = "round";
    r.stroke();
    r.restore();
  }
  function drawBackground(r) {
    const bg = r.createLinearGradient(0, 0, layout.width, layout.height);
    bg.addColorStop(0, "#fbfcfd");
    bg.addColorStop(1, "#f3f6f8");
    r.fillStyle = bg;
    r.fillRect(0, 0, layout.width, layout.height);
    r.save();
    if (layout.showSupply) {
      // The supply deck sits left of the bench, or above it on narrow screens.
      const row = Boolean(layout.trayRow);
      const deckWidth = row ? layout.width : supplyArea.w;
      const deckHeight = row ? supplyArea.h : layout.height;
      const deck = r.createLinearGradient(0, 0, deckWidth, deckHeight);
      deck.addColorStop(0, "rgba(236, 244, 249, 0.75)");
      deck.addColorStop(1, "rgba(243, 248, 252, 0.45)");
      r.fillStyle = deck;
      r.fillRect(0, 0, deckWidth, deckHeight);

      r.strokeStyle = "rgba(142, 175, 189, 0.35)";
      r.lineWidth = 1;
      r.beginPath();
      if (row) {
        r.moveTo(0, deckHeight);
        r.lineTo(layout.width, deckHeight);
      } else {
        r.moveTo(deckWidth, 0);
        r.lineTo(deckWidth, layout.height);
      }
      r.stroke();
    }

    r.fillStyle = "rgba(70, 110, 140, 0.08)";
    for (let x = 20; x < layout.width; x += 60) {
      for (let y = 20; y < layout.height; y += 60) {
        if (
          layout.showSupply &&
          (layout.trayRow
            ? Math.abs(y - supplyArea.h) < 26
            : Math.abs(x - supplyArea.w) < 30)
        )
          continue;
        r.fillRect(x - 1, y - 1, 2, 2);
      }
    }
    r.restore();
  }
  function drawTrayWorkbench(r, area) {
    // The stacked tray strip on narrow screens has no room for its own title.
    if (layout.trayRow) return;
    r.save();
    const titleX = area.x + 18;
    // Align the supply heading with the assembly board's polarity header row.
    const titleY = area.y + 26;

    // Small active indicator dot
    r.fillStyle = "#2f6fd6";
    r.beginPath();
    r.arc(titleX + 4, titleY + 2, 3.5, 0, Math.PI * 2);
    r.fill();

    // Section Title
    r.fillStyle = PALETTE.textPrimary;
    r.font = `700 13px ${fontFamily()}`;
    r.textAlign = "left";
    r.textBaseline = "middle";
    r.fillText(t("dna.bench.supply"), titleX + 14, titleY + 2);

    // Operation cue / subtitle
    r.font = `500 11px ${fontFamily()}`;
    r.fillStyle = "rgba(22, 51, 75, 0.55)";
    r.fillText(t("dna.bench.supplyHint"), titleX + 14, titleY + 20);
    r.restore();
  }
  function drawAssemblyWorkbench(r, area) {
    // The polarity header row keeps a clear margin from the bench's top edge.
    const topY = area.y + 26;
    // Hydrogen Bonding Center Axis
    const centerX = slotArea.x + slotArea.w / 2;
    r.save();
    r.strokeStyle = "rgba(120, 155, 180, 0.28)";
    r.lineWidth = 1;
    r.setLineDash([2, 4]);
    r.beginPath();
    r.moveTo(centerX, topY + 22);
    r.lineTo(centerX, area.y + area.h - 30);
    r.stroke();
    r.setLineDash([]);
    r.restore();

    // Continuous Sugar-Phosphate Backbone Guide Tracks
    r.save();
    r.strokeStyle = "rgba(90, 130, 160, 0.16)";
    r.lineWidth = 1.2;
    r.setLineDash([3, 4]);
    const firstL = $t(slotKey("left", 0));
    const lastL = $t(slotKey("left", ROW_COUNT - 1));
    const firstR = $t(slotKey("right", 0));
    const lastR = $t(slotKey("right", ROW_COUNT - 1));
    if (firstL && lastL && firstR && lastR) {
      r.beginPath();
      r.moveTo(firstL.phosphate.x, firstL.phosphate.y - 12);
      r.lineTo(lastL.phosphate.x, lastL.phosphate.y + 12);
      r.moveTo(firstR.phosphate.x, firstR.phosphate.y - 12);
      r.lineTo(lastR.phosphate.x, lastR.phosphate.y + 12);
      r.stroke();
    }
    r.restore();

    // Top Polarity Headers
    r.save();
    const leftCenter = centerX - 102;
    const rightCenter = centerX + 102;

    // Left badge: 5' ➔ 3' 链 I
    r.fillStyle = "rgba(47, 111, 214, 0.08)";
    r.strokeStyle = "rgba(47, 111, 214, 0.28)";
    r.lineWidth = 1;
    r.beginPath();
    r.roundRect(leftCenter - 48, topY - 8, 96, 20, 10);
    r.fill();
    r.stroke();
    r.font = `700 11px ${fontFamily()}`;
    r.fillStyle = "#2256a4";
    r.textAlign = "center";
    r.textBaseline = "middle";
    r.fillText(t("dna.bench.strandI"), leftCenter, topY + 2);

    // Right badge: 3' ➔ 5' 链 II
    r.fillStyle = "rgba(165, 110, 80, 0.09)";
    r.strokeStyle = "rgba(165, 110, 80, 0.30)";
    r.lineWidth = 1;
    r.beginPath();
    r.roundRect(rightCenter - 48, topY - 8, 96, 20, 10);
    r.fill();
    r.stroke();
    r.font = `700 11px ${fontFamily()}`;
    r.fillStyle = "#8a4f2a";
    r.textAlign = "center";
    r.textBaseline = "middle";
    r.fillText(t("dna.bench.strandII"), rightCenter, topY + 2);

    // Center Axis Label
    r.font = `600 9px ${fontFamily()}`;
    r.fillStyle = "rgba(90, 125, 150, 0.65)";
    r.fillText(t("dna.bench.axis"), centerX, topY + 2);

    // Bottom Polarity Labels
    const botY = area.y + area.h - 18;
    r.font = `700 10px ${fontFamily()}`;
    r.fillStyle = "rgba(47, 111, 214, 0.7)";
    r.fillText(t("dna.bench.end", { prime: "3'" }), leftCenter, botY);
    r.fillStyle = "rgba(165, 110, 80, 0.7)";
    r.fillText(t("dna.bench.end", { prime: "5'" }), rightCenter, botY);
    r.restore();
  }
  function render(r, layer) {
    if (layer === "static") {
      drawBackground(r);
      if (layout.showSupply) drawTrayWorkbench(r, supplyArea);
      drawAssemblyWorkbench(r, boardArea);
    }
    if (layer === "tray") drawTrayCards(r);
    if (layer === "assembly") {
      if (viewMode !== "structure")
        for (const m of ["left", "right"])
          for (let C = 0; C < ROW_COUNT - 1; C += 1) {
            const H = $t(slotKey(m, C)),
              oe = $t(slotKey(m, C + 1));
            !H ||
              !oe ||
              !placedBases.has(H.key) ||
              !placedBases.has(oe.key) ||
              (m === "left"
                ? qt(r, [H.c3, oe.phosphate], "#386180", 3.2)
                : qt(r, [oe.c3, H.phosphate], "#386180", 3.2));
          }
      const M = new Map(getOpenSlots().map((m) => [m.key, m]));
      for (const m of slots) {
        const C = placedBases.get(m.key);
        if (C) drawPlacedBase(r, m, C);
        else if (exitingBases.has(m.key))
          drawExitingBase(r, m, exitingBases.get(m.key));
        else Ni(r, m, M.get(m.key));
      }
      for (let m = 0; m < ROW_COUNT; m += 1) {
        const C = placedBases.get(slotKey("left", m)),
          H = placedBases.get(slotKey("right", m));
        if (!C || !H) continue;
        const oe = $t(slotKey("left", m)),
          ne = $t(slotKey("right", m));
        oe && ne && zi(r, oe, C, ne, H);
      }
    }
    if (layer === "interaction") {
      for (const slot of slots) {
        if (!placedBases.has(slot.key)) continue;
        const focus = tweenValue(`focus:${slot.key}`, focusTarget(slot.key));
        if (focus <= 0.01) continue;
        r.save();
        r.globalAlpha = focus;
        _s(
          r,
          slot.hitRect,
          canRemove(slot.key) ? PALETTE.accent : PALETTE.warning,
        );
        if (selectedKey === slot.key && canRemove(slot.key)) {
          Vi(
            r,
            getRemoveButtonBounds(slot),
            hoverTarget?.kind === "remove-nucleotide",
          );
        }
        r.restore();
      }
    }
    if (layer === "snap" && pointerState?.drag) {
      const slot = findDropSlot(
        pointerState.drag.type,
        pointerState.drag.point,
      );
      const target = slot && $t(slot.key);
      if (target) {
        r.animation = "dna-snap-pulse";
        _s(r, target.baseRect, BASE_COLORS[pointerState.drag.type].fill);
        r.animation = null;
        r.save();
        r.globalAlpha = 0.45;
        Ss(r, target, pointerState.drag.type);
        r.restore();
      }
    }
    if (layer === "drag") {
      const drag = pointerState?.drag;
      if (drag) {
        const pop = tweenValue("drag:pop", 1);
        const scale = pop < 1 ? 0.68 + 0.32 * easeOutBack(pop) : 1;
        r.save();
        r.globalAlpha = pop < 1 ? 0.5 + 0.5 * clamp01(pop) : 1;
        r.shadow = "lift";
        if (scale !== 1) {
          r.translate(drag.point.x, drag.point.y);
          r.scale(scale);
          r.translate(-drag.point.x, -drag.point.y);
        }
        Ss(r, Gi(drag.point, Ui(drag.point)), drag.type);
        r.restore();
      }
      // A rejected drop arcs back to its supply card as a doomed ghost.
      const now = performance.now();
      for (const rejection of rejections) {
        const pose = rejectionPose(rejection, now);
        r.save();
        r.globalAlpha = Math.max(0, 1 - pose.raw * 1.1);
        r.shadow = "lift";
        Ss(r, Gi(pose.point, Ui(pose.point)), rejection.type);
        r.restore();
      }
    }
  }
  return {
    setLayout,
    getSnapshot,
    getRenderState() {
      syncFocus();
      const drag = pointerState?.drag;
      const motion = motionActive() ? String(motionTick) : "";
      return {
        layout: `${layout.width}:${layout.height}:${layout.showSupply}:${layout.trayRow}`,
        tray: `${trayCardId(hoverTarget) ?? ""}:${pressedTrayCard() ?? ""}:${motion}`,
        assembly: `${JSON.stringify([...placedBases])}:${[...exitingBases.keys()].join(",")}:${motion}`,
        interaction: `${getTargetKey(hoverTarget)}:${selectedKey}:${motion}`,
        drag:
          drag?.kind === "nucleotide"
            ? {
                type: drag.type,
                point: { ...drag.point },
                strand: Ui(drag.point),
                snap: findDropSlot(drag.type, drag.point)?.key ?? null,
              }
            : null,
        snap: `${drag?.kind === "nucleotide" ? (findDropSlot(drag.type, drag.point)?.key ?? "") : ""}:${motion}:${rejections.length}`,
      };
    },
    setSceneMode,
    render,
    destroy,
    getCursor,
    handlePointerDown(r) {
      const a = hitTest(r);
      if (!a) {
        selectedKey = null;
        applyHover(null);
        redraw();
        return;
      }
      pointerState = {
        start: r,
        target: a,
        moved: false,
        drag: createDrag(a, r),
      };
      if (pointerState.drag?.kind === "nucleotide")
        tweenTo("drag:pop", 1, 280, (value) => value, 0);
      pressTrayCard(trayCardId(a), true);
      applyHover(pointerState.drag ? null : a);
      redraw();
    },
    handlePointerMove(r) {
      if (!pointerState) {
        if (applyHover(hitTest(r))) redraw();
        return;
      }
      if (!pointerState.moved && distanceBetween(pointerState.start, r) > 5)
        pointerState.moved = true;
      if (pointerState.drag) {
        // Dragging a supply card: follow the pointer and clear hover states.
        releaseTrayPress();
        pointerState.drag.point = r;
        applyHover(null);
        redraw();
        return;
      }
      if (applyHover(hitTest(r))) redraw();
    },
    handlePointerUp(r) {
      if (!pointerState) return;
      // Tray cards are drag-only: tapping one places nothing and reports
      // nothing, so the pale slot hints stay the only guidance.
      const trayTap =
        pointerState.target.kind === "tray-part" && !pointerState.moved;
      if (pointerState.drag && !trayTap) {
        pointerState.drag.point = r;
        selectedKey = null;
        dropNucleotide(pointerState.drag);
      } else if (!pointerState.drag && !pointerState.moved) {
        const target = hitTest(r);
        if (
          target &&
          getTargetKey(target) === getTargetKey(pointerState.target)
        ) {
          if (target.kind === "dna-nucleotide") {
            if (selectedKey === target.key) selectedKey = null;
            else if (canRemove(target.key)) selectedKey = target.key;
            else {
              selectedKey = null;
              notify(t("dna.notice.onlyEnd"), "warning", 1400);
            }
          } else {
            if (target.kind === "remove-nucleotide")
              removeNucleotide(target.key);
            selectedKey = null;
          }
        }
      }
      pressTrayCard(pressedTrayCard(), false);
      pointerState = null;
      applyHover(hitTest(r));
      redraw();
    },
    handlePointerLeave() {
      if (pointerState) return;
      if (applyHover(null)) redraw();
    },
    handlePointerCancel() {
      pressTrayCard(pressedTrayCard(), false);
      pointerState = null;
      applyHover(null);
      redraw();
    },
    toggleView,
    toggle3d,
  };
}
export { createAssemblyModel, BASE_COLORS, BASE_STRUCTURES, COMPLEMENT };

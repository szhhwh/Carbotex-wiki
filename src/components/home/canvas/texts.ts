/**
 * Live text of the canvas. Positions are artboard pt measured from
 * wiki_home_final.ai: `x` is the anchor of every line (left edge, centre or
 * right edge), `lines[i].y` the baseline. Copy follows the home-page brief
 * verbatim.
 */

export interface Run {
  t: string;
  bold?: boolean;
  /** Font weight override. */
  weight?: number;
  color?: string;
  /** Font size override (pt). */
  size?: number;
}

export interface TextLine {
  y: number;
  runs: readonly (string | Run)[];
}

export interface TextBlock {
  id: string;
  anchor: "start" | "middle" | "end";
  x: number;
  size: number;
  color: string;
  weight?: number;
  lines: readonly TextLine[];
}

export const GREEN = "#194524";
export const DEEP = "#1B4526";
export const TEAL = "#02B186";
export const ORANGE = "#FF9241";

export const P1_COPY: TextBlock = {
  id: "p1-copy",
  anchor: "end",
  x: 1265.2,
  size: 32,
  color: "#FFFFFF",
  lines: [
    {
      y: 1103.5,
      runs: [
        "Over ",
        { t: "5 billion tonnes", bold: true },
        " of crop residues are generated globally each year.",
      ],
    },
    {
      y: 1153.5,
      runs: [
        "Yet much of this renewable carbon remains ",
        { t: "outside manufacturing", bold: true },
        ".",
      ],
    },
  ],
};

export const P2_HEADING: TextBlock = {
  id: "p2-heading",
  anchor: "end",
  x: 1266.6,
  size: 32,
  color: GREEN,
  lines: [
    {
      y: 1848.8,
      runs: [
        "In China, approximately ",
        { t: "870 million tonnes", bold: true },
        " of crop straw were",
      ],
    },
    {
      y: 1904.8,
      runs: ["generated in 2024, with 730 million tonnes collectable."],
    },
  ],
};

export const P2_NOTE: TextBlock = {
  id: "p2-note",
  anchor: "start",
  x: 947.1,
  size: 24,
  color: GREEN,
  lines: [
    { y: 2015.8, runs: ["More than 88% of collectable"] },
    { y: 2057.8, runs: ["straw is already utilized."] },
    {
      y: 2122.8,
      runs: [
        "Yet only ",
        { t: "0.7%", bold: true, color: ORANGE },
        " entered the",
      ],
    },
    {
      y: 2164.8,
      runs: [{ t: "raw-material route", bold: true, color: ORANGE }, "."],
    },
  ],
};

export const P2_FOOTER: TextBlock = {
  id: "p2-footer",
  anchor: "end",
  x: 1060.5,
  size: 32,
  color: GREEN,
  lines: [
    { y: 2403.3, runs: ["Most straw is used"] },
    { y: 2459.3, runs: ["\u2014 but little becomes industrial material."] },
  ],
};

export const P3_LITERATURE: TextBlock = {
  id: "p3-literature",
  anchor: "start",
  x: 50.4,
  size: 25.6,
  color: DEEP,
  lines: [
    {
      y: 2747.8,
      runs: [
        "Literature shows that ",
        { t: "lignin and polysaccharides", bold: true },
        " in straw, rich in",
      ],
    },
    {
      y: 2778.4,
      runs: [
        { t: "phenolic hydroxyl and hydroxyl groups", bold: true, color: ORANGE },
        ", naturally possess",
      ],
    },
    {
      y: 2809,
      runs: [{ t: "intermolecular interaction and adhesive potential.", bold: true }],
    },
  ],
};

/** The pill behind P3_WONDER: [x, y, width, height]. */
export const P3_WONDER_PILL = [36.9, 2867.6, 591.5, 66.85] as const;

export const P3_WONDER: TextBlock = {
  id: "p3-wonder",
  anchor: "start",
  x: 66,
  size: 34.15,
  color: DEEP,
  weight: 700,
  lines: [{ y: 2914.1, runs: ["This led us to wonder:"] }],
};

export const P3_QUESTION: TextBlock = {
  id: "p3-question",
  anchor: "start",
  x: 50.4,
  size: 25.6,
  color: DEEP,
  lines: [
    {
      y: 3023.6,
      runs: ["Can ", { t: "biomanufacturing", bold: true }, " unlock new applications"],
    },
    { y: 3053.6, runs: ["of straw in adhesives, broadening its raw-material"] },
    {
      y: 3084.2,
      runs: [
        "utilization pathways to ",
        { t: "turn waste into value", bold: true, color: ORANGE },
        "?",
      ],
    },
  ],
};

export const P4_HEADER: TextBlock = {
  id: "p4-header",
  anchor: "start",
  x: 324.4,
  size: 32,
  color: "#FFFFFF",
  lines: [
    {
      y: 3542.6,
      runs: [
        "To turn straw into an adhesive, a ",
        { t: "key problem", bold: true },
        " must be solved first.",
      ],
    },
  ],
};

export const P4_BODY: TextBlock = {
  id: "p4-body",
  anchor: "middle",
  x: 946.8,
  size: 24,
  color: GREEN,
  lines: [
    { y: 3642.7, runs: ["Straw hydrolysis produces a mixed sugar stream of"] },
    {
      y: 3684.7,
      runs: [{ t: "glucose and xylose", bold: true }, ", but most industrial"],
    },
    {
      y: 3726.7,
      runs: [
        "microorganisms have ",
        { t: "very weak xylose utilization", bold: true, color: TEAL },
        ",",
      ],
    },
    { y: 3768.7, runs: ["leaving a large portion of the carbon source"] },
    { y: 3810.7, runs: ["underutilized."] },
  ],
};

export const P5_TITLE: TextBlock = {
  id: "p5-title",
  anchor: "middle",
  x: 683.8,
  size: 32,
  color: DEEP,
  weight: 700,
  lines: [{ y: 4323.9, runs: ["To address this bottleneck, we developed"] }],
};

export const P5_CAPTION: TextBlock = {
  id: "p5-caption",
  anchor: "middle",
  x: 683,
  size: 24,
  color: DEEP,
  lines: [
    {
      y: 4763.8,
      runs: [
        "\u2014\u2014 an ",
        { t: "adhesive production", bold: true, color: TEAL, size: 36 },
        " project",
      ],
    },
    {
      y: 4826.8,
      runs: [
        "based on a ",
        { t: "two-stage", bold: true, color: TEAL, size: 36 },
        " fermentation system.",
      ],
    },
  ],
};

/** P2 ring segments, clockwise from the largest share. */
export const RING_SEGMENTS = [
  { id: "fertilizer", value: "54.6 %", label: "Fertilizer", raw: false },
  { id: "feed", value: "24.4 %", label: "Feed", raw: false },
  { id: "energy", value: "8.0 %", label: "Energy", raw: false },
  { id: "substrate", value: "0.7 %", label: "Substrate", raw: false },
  { id: "raw", value: "0.7 %", label: "Raw materials", raw: true },
] as const;

/**
 * Angular span of each segment at rest (degrees, 0° = east, clockwise),
 * measured from the exported ring.
 */
export const RING_SPANS: Record<(typeof RING_SEGMENTS)[number]["id"], [number, number]> = {
  energy: [18, 51.1],
  substrate: [51.1, 54.1],
  raw: [54.1, 57.25],
  fertilizer: [57.25, 279],
  feed: [279, 378],
};

/** Ring rotation centre on the artboard (pt). */
export const RING_CENTRE = [180.5, 2193.7] as const;

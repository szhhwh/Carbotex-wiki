import { staticHomeAsset } from "../../../utils/staticAsset";

/** Uploaded artwork: flat files in the wiki's home/ upload folder. */
const glucoseBeige = staticHomeAsset("glucose-beige.svg");
const glucoseGold = staticHomeAsset("glucose-gold.svg");
const glucoseGreen = staticHomeAsset("glucose-green.svg");
const glucoseOrange = staticHomeAsset("glucose-orange.svg");
const xyloseBeige = staticHomeAsset("xylose-beige.svg");
const xyloseGold = staticHomeAsset("xylose-gold.svg");
const xyloseGreen = staticHomeAsset("xylose-green.svg");
const xyloseOrange = staticHomeAsset("xylose-orange.svg");

/**
 * Geometry of the P7 straw field, in haystacks.svg units (1936 × 544).
 * Every field child is positioned in percentages of this box, so the same
 * data serves the desktop and the mobile field size.
 */
export const FIELD_WIDTH = 1936;
export const FIELD_HEIGHT = 544;
/** Haystack bases sit at y ≈ 497 in haystacks.svg. */
export const HAYSTACK_BASE = 497;
export const YEAST_COUNT = 5;

/** Non-overlapping column ranges of the stacks inside haystacks.svg. */
export const HAYSTACK_CLUSTERS = [
  { x0: 33, x1: 320, sugars: 2 },
  { x0: 504, x1: 810, sugars: 2 },
  { x0: 841, x1: 988, sugars: 1 },
  { x0: 1125, x1: 1317, sugars: 1 },
  { x0: 1420, x1: 1902, sugars: 3 },
] as const;

interface SugarKind {
  src: string;
  /** Native width in field units. */
  size: number;
  /** Large sugars are the orange hydrolysis products; small ones decorate. */
  large: boolean;
}

const LARGE_SUGARS: SugarKind[] = [
  { src: glucoseOrange, size: 109, large: true },
  { src: xyloseOrange, size: 100, large: true },
];
const SMALL_SUGARS: SugarKind[] = [
  { src: glucoseGold, size: 44, large: false },
  { src: xyloseGold, size: 42, large: false },
  { src: glucoseGreen, size: 31, large: false },
  { src: xyloseGreen, size: 32, large: false },
  { src: glucoseBeige, size: 32, large: false },
  { src: xyloseBeige, size: 32, large: false },
];

export interface FieldSugar {
  id: string;
  src: string;
  large: boolean;
  cluster: number;
  /** Yeast slot that eats this sugar in the second stage. */
  yeast: number;
  /** Layout box in percent of the field box. */
  left: number;
  top: number;
  width: number;
  /** Resting rotation (deg) and fall order (0–1). */
  rotate: number;
  fallOrder: number;
  /** Floating drift (fraction of the field height). */
  drift: number;
}

/** Small deterministic PRNG so the scatter is identical on every render. */
function mulberry32(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function scatterSugars(): FieldSugar[] {
  const random = mulberry32(710);
  const placed: { cx: number; cy: number; r: number }[] = [];
  const sugars: FieldSugar[] = [];

  const place = (kind: SugarKind, cluster: number, index: number) => {
    const { x0, x1 } = HAYSTACK_CLUSTERS[cluster];
    const minY = kind.large ? 250 : 210;
    const maxY = kind.large ? 470 : 530;
    let best: { x: number; y: number; gap: number } = {
      x: x0,
      y: minY,
      gap: -Infinity,
    };
    for (let attempt = 0; attempt < 40; attempt += 1) {
      const x = x0 - 50 + random() * Math.max(1, x1 - x0 + 100 - kind.size);
      const clampedX = Math.min(Math.max(x, 12), FIELD_WIDTH - kind.size - 12);
      const y = minY + random() * (maxY - minY - kind.size);
      const cx = clampedX + kind.size / 2;
      const cy = y + kind.size / 2;
      const gap = placed.reduce(
        (min, other) =>
          Math.min(min, Math.hypot(other.cx - cx, other.cy - cy) - other.r),
        Infinity,
      );
      if (gap > best.gap) best = { x: clampedX, y, gap };
      if (gap > kind.size * 0.75 + 18) break;
    }
    const cx = best.x + kind.size / 2;
    placed.push({ cx, cy: best.y + kind.size / 2, r: kind.size / 2 });
    sugars.push({
      id: `${cluster}-${index}`,
      src: kind.src,
      large: kind.large,
      cluster,
      yeast: Math.min(
        YEAST_COUNT - 1,
        Math.floor((cx / FIELD_WIDTH) * YEAST_COUNT),
      ),
      left: (best.x / FIELD_WIDTH) * 100,
      top: (best.y / FIELD_HEIGHT) * 100,
      width: (kind.size / FIELD_WIDTH) * 100,
      rotate: Math.round(random() * 60 - 30),
      fallOrder: random(),
      drift: 0.03 + random() * 0.05,
    });
  };

  HAYSTACK_CLUSTERS.forEach((cluster, clusterIndex) => {
    let index = 0;
    for (let i = 0; i < cluster.sugars; i += 1) {
      place(LARGE_SUGARS[(clusterIndex + i) % 2], clusterIndex, index++);
    }
    const smallCount = 3 + cluster.sugars * 2;
    for (let i = 0; i < smallCount; i += 1) {
      place(
        SMALL_SUGARS[Math.floor(random() * SMALL_SUGARS.length)],
        clusterIndex,
        index++,
      );
    }
  });
  return sugars;
}

export const FIELD_SUGARS = scatterSugars();

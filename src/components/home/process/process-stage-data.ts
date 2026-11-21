import { staticHomeAsset } from "../../../utils/staticAsset";
import { RIBBON_SWEEPS } from "./ribbon-sweeps";

/**
 * Scroll choreography in time units (1 unit = 100svh of scroll). The master
 * timeline runs from the track entering the viewport ("top bottom", t = 0)
 * to the end of the sticky stage; the stage pins at t = 1.
 */
export const TIME = {
  pin: 1,
  hydrolysis: 1.25,
  fall: 3,
  yeastHold: 4.35,
  painter: 5.6,
  ribbon: 6.1,
  bottle: 8.1,
  bag: 10.3,
  end: 11.7,
} as const;
/**
 * Scroll the ribbon takes to unfold from the brush to its tail. The camera
 * holds on the painter while the fan opens, then follows the tip down.
 */
export const RIBBON_SPAN = 3.4;
/** Ribbon progress over which its tail crosses in front of the bottle. */
export const BOTTLE_CROSSING = [0.84, 0.91] as const;
/** The camera keeps the ribbon tip this far down the viewport. */
export const RIBBON_TIP_VIEW = 0.62;
export const RIBBON_HEIGHT = 2102.57;

const yeastLeftUrl = staticHomeAsset("yeast-left.svg");
const yeastProneUrl = staticHomeAsset("yeast-prone.svg");
const yeastRestUrl = staticHomeAsset("yeast-rest.svg");
const yeastRightUrl = staticHomeAsset("yeast-right.svg");

/** Yeast poses in the order each cell cycles through while eating. */
export const YEAST_POSES = [
  { src: yeastLeftUrl, width: 266.53, height: 238.65 },
  { src: yeastRestUrl, width: 229.07, height: 238.63 },
  { src: yeastRightUrl, width: 266.45, height: 238.67 },
  { src: yeastProneUrl, width: 260.96, height: 182.93 },
] as const;
/** Starting pose per slot, matching the design row (left, rest, right, prone, left). */
export const YEAST_INITIAL_POSE = [0, 1, 2, 3, 0] as const;
export const YEAST_BEATS = [3.55, 3.95, 4.5, 4.85, 5.2] as const;

export const BOTTLE_RIBBON_SWEEPS = [
  RIBBON_SWEEPS.bottleBack,
  RIBBON_SWEEPS.bottleFront,
] as const;
export const MALIC_SWEEPS = [RIBBON_SWEEPS.malic] as const;

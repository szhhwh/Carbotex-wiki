import { createContext, useContext } from "react";
import gsap from "gsap";
import { STRAW_INFO, type StrawKey } from "../geometry";
import type { CanvasFrame } from "./director";

/** Order in which the scroll-drawn straw is laid down (hero → P5 top). */
export const PEN_ORDER: readonly StrawKey[] = [
  "front",
  "s2a",
  "s2b",
  "s2c",
  "s2d",
  "p3",
  "s3",
  "link",
];

/** The pen tip trails this far down the viewport (fraction of its height). */
const LEAD = 0.74;

/** Fraction of `key`'s length whose running max y stays above `y`. */
function reach(key: StrawKey, y: number) {
  const t = STRAW_INFO[key].ymax;
  if (y < t[0]) return 0;
  if (y >= t[t.length - 1]) return 1;
  let low = 0;
  let high = t.length - 1;
  while (low + 1 < high) {
    const middle = Math.floor((low + high) / 2);
    if (t[middle] <= y) low = middle;
    else high = middle;
  }
  const span = t[high] - t[low];
  return (low + (y - t[low]) / span) / (t.length - 1);
}

/**
 * Draws the straw that threads through the canvas. Every straw piece is a
 * path with pathLength = 1 (a stroke, or the mask stroke revealing an
 * exported straw); the pen lays them down in PEN_ORDER as one continuous
 * line whose tip follows the scroll position.
 */
export class StrawPenController {
  private paths = new Map<StrawKey, Set<SVGPathElement>>();
  private lengths = new Map<StrawKey, number>();
  private target = 0;
  private shown = 0;
  private applied = new Map<StrawKey, number>();
  private running = false;
  private visible = true;

  register(key: StrawKey, path: SVGPathElement) {
    let set = this.paths.get(key);
    if (!set) this.paths.set(key, (set = new Set()));
    set.add(path);
    if (!this.lengths.has(key)) this.lengths.set(key, path.getTotalLength());
    this.applied.delete(key);
    this.apply(true);
    return () => {
      set.delete(path);
    };
  }

  private total() {
    let sum = 0;
    for (const key of PEN_ORDER) sum += this.lengths.get(key) ?? 0;
    return sum;
  }

  setFrame(frame: CanvasFrame) {
    const entered = frame.visible && !this.visible;
    this.visible = frame.visible;
    if (frame.reduced) {
      this.dispose();
      this.target = this.shown = this.total();
      this.apply(false);
      return;
    }
    const tip = Math.max(frame.cam + frame.view * LEAD, frame.tip);
    let sum = 0;
    for (const key of PEN_ORDER) {
      const len = this.lengths.get(key) ?? 0;
      const p = reach(key, tip);
      sum += len * p;
      if (p < 1) break;
    }
    this.target = sum;
    if (entered) this.apply(false);
    if (!this.running && Math.abs(this.target - this.shown) > 0.1) {
      this.running = true;
      gsap.ticker.add(this.tick);
    }
  }

  private tick = (_time: number, deltaMs: number) => {
    const dt = Math.min(deltaMs, 64) / 1000;
    const diff = this.target - this.shown;
    const step = Math.min(
      Math.abs(diff),
      Math.max(Math.abs(diff) * dt * 4.5, 520 * dt),
    );
    this.shown += Math.sign(diff) * step;
    if (this.visible) this.apply(false);
    if (Math.abs(this.target - this.shown) <= 0.1) {
      this.shown = this.target;
      if (this.visible) this.apply(false);
      gsap.ticker.remove(this.tick);
      this.running = false;
    }
  };

  private apply(force: boolean) {
    let start = 0;
    for (const key of PEN_ORDER) {
      const len = this.lengths.get(key) ?? 0;
      const p =
        len > 0 ? Math.min(Math.max((this.shown - start) / len, 0), 1) : 0;
      start += len;
      const prev = this.applied.get(key);
      if (!force && prev !== undefined && Math.abs(prev - p) < 1e-4) continue;
      this.applied.set(key, p);
      for (const path of this.paths.get(key) ?? []) {
        path.style.strokeDashoffset = String(1 - p);
        path.style.visibility = p > 0 ? "visible" : "hidden";
      }
    }
  }

  dispose() {
    gsap.ticker.remove(this.tick);
    this.running = false;
  }
}

export const StrawPenContext = createContext<StrawPenController | null>(null);

export function useStrawPen() {
  const pen = useContext(StrawPenContext);
  if (!pen) throw new Error("useStrawPen outside StrawPen");
  return pen;
}

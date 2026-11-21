import { createContext, useContext, useLayoutEffect, useRef } from "react";

/**
 * Scroll state of the illustrated canvas, in artboard pt.
 *
 * The canvas is a single 1366 × 5063 pt artboard scaled to the viewport
 * width (`u` CSS px per pt) and moved under a sticky viewport like a camera.
 */
export interface CanvasFrame {
  /** Artboard y at the top edge of the viewport. */
  cam: number;
  /** Viewport height in pt. */
  view: number;
  /** Height of the fixed site navbar over the viewport top, in pt. */
  nav: number;
  /** CSS px per pt. */
  u: number;
  /** Progress 0 → 1 of every page's rest stop (see HomeCanvas STOPS). */
  stops: Readonly<Record<StopId, number>>;
  /**
   * Artboard y the straw pen must have reached at least: while the camera
   * rests on a page, the pen keeps drawing that page's straw to its end.
   */
  tip: number;
  /** True for narrow (mobile) viewports. */
  compact: boolean;
  /** prefers-reduced-motion. */
  reduced: boolean;
}

export type StopId = "hero" | "p1" | "p2" | "p3" | "p4" | "p5";

export const NO_STOPS: Readonly<Record<StopId, number>> = {
  hero: 0,
  p1: 0,
  p2: 0,
  p3: 0,
  p4: 0,
  p5: 0,
};

type FrameListener = (frame: CanvasFrame) => void;

export class CanvasDirector {
  frame: CanvasFrame = {
    cam: 0,
    view: 900,
    nav: 72,
    u: 1,
    stops: NO_STOPS,
    tip: 0,
    compact: false,
    reduced: false,
  };
  private listeners = new Set<FrameListener>();

  subscribe(listener: FrameListener) {
    this.listeners.add(listener);
    listener(this.frame);
    return () => {
      this.listeners.delete(listener);
    };
  }

  publish(frame: CanvasFrame) {
    this.frame = frame;
    for (const listener of this.listeners) listener(frame);
  }
}

export const DirectorContext = createContext<CanvasDirector | null>(null);

export function useDirector() {
  const director = useContext(DirectorContext);
  if (!director) throw new Error("useDirector outside HomeCanvas");
  return director;
}

/** Subscribes `listener` to every canvas frame (latest closure is used). */
export function useFrame(listener: FrameListener) {
  const director = useDirector();
  const ref = useRef(listener);
  useLayoutEffect(() => {
    ref.current = listener;
  });
  useLayoutEffect(
    () => director.subscribe((frame) => ref.current(frame)),
    [director],
  );
}

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/** 0 → 1 as `v` moves from `a` to `b`, eased with smoothstep. */
export function ramp(v: number, a: number, b: number) {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
}

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
  visible: boolean;
  viewportTop: number;
  viewportBottom: number;
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
  ambientStart: number | null = null;
  frame: CanvasFrame = {
    cam: 0,
    view: 900,
    nav: 72,
    u: 1,
    stops: NO_STOPS,
    tip: 0,
    compact: false,
    reduced: false,
    visible: false,
    viewportTop: 0,
    viewportBottom: 900,
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

  startAmbientClock(canvas: HTMLElement) {
    let disposed = false;
    const frame = requestAnimationFrame(() => {
      const first = canvas
        .getAnimations({ subtree: true })
        .find(
          (animation) =>
            animation instanceof CSSAnimation &&
            animation.playState === "running",
        );
      const fallback = performance.now();
      const setStart = (animation?: Animation) => {
        if (!disposed) {
          this.ambientStart =
            typeof animation?.startTime === "number"
              ? animation.startTime
              : fallback;
        }
      };
      if (first) void first.ready.then(setStart, () => setStart());
      else setStart();
    });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
    };
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

export function useCanvasProgress<const Values extends readonly unknown[]>(
  select: (frame: CanvasFrame) => Values,
  apply: (values: NoInfer<Values>) => void,
) {
  const previous = useRef<Values | null>(null);
  useFrame((frame) => {
    const values = select(frame);
    if (previous.current?.every((value, index) => value === values[index])) {
      return;
    }
    previous.current = values;
    apply(values);
  });
}

const pausedCss = new WeakMap<HTMLElement, Map<CSSAnimation, number | null>>();

function animationClockTime() {
  const time = document.timeline.currentTime;
  return typeof time === "number" ? time : performance.now();
}

export function captureIdleAnimations(
  root: HTMLElement,
  pausedAt: number | null = animationClockTime(),
) {
  if (!root.hasAttribute("data-idle-paused")) return;
  let animations = pausedCss.get(root);
  if (!animations) {
    animations = new Map();
    pausedCss.set(root, animations);
  }
  for (const animation of root.getAnimations({ subtree: true })) {
    if (animation instanceof CSSAnimation && !animations.has(animation)) {
      animations.set(animation, pausedAt);
    }
  }
}

export function useCanvasIdle(
  top: number,
  bottom: number,
  onActive?: (active: boolean) => void,
) {
  const director = useDirector();
  const root = useRef<HTMLDivElement>(null);
  useCanvasProgress(
    (frame) => [
      frame.visible &&
        !frame.reduced &&
        frame.cam + frame.viewportTop < bottom &&
        frame.cam + frame.viewportBottom > top,
      frame.reduced,
    ],
    ([active, reduced]) => {
      const scene = root.current;
      if (!scene) return;
      if (active) {
        const now = animationClockTime();
        pausedCss.get(scene)?.forEach((pausedAt, animation) => {
          if (typeof animation.currentTime === "number") {
            animation.currentTime +=
              now - (pausedAt ?? director.ambientStart ?? now);
          }
        });
        pausedCss.delete(scene);
      }
      scene.toggleAttribute("data-idle-paused", !active);
      if (reduced) pausedCss.delete(scene);
      else if (!active) {
        captureIdleAnimations(
          scene,
          director.ambientStart === null ? null : animationClockTime(),
        );
      }
      onActive?.(active);
    },
  );
  return root;
}

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/** 0 → 1 as `v` moves from `a` to `b`, eased with smoothstep. */
export function ramp(v: number, a: number, b: number) {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
}

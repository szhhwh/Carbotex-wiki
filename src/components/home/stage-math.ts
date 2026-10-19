import type { ComponentType, RefObject } from "react";
import type Lenis from "lenis";

// `gsap.core.Timeline` below resolves to gsap's UMD global namespace, which
// is allowed in type position inside modules.

/**
 * Shared coordinate system for the home scroll stage.
 *
 * One time unit = 100svh of scroll. Every scrub timeline on the stage uses the
 * same trigger (the stage element, "top top" → "bottom bottom") and the same
 * pinned total duration D, so timeline time t maps to the absolute scroll
 * position `stageTop + t / D × S` under any refresh/resize. Acts never compute
 * pixel start/end values; they place their tweens on their own time window.
 */

/** Scroll length (in viewport heights) consumed by one act cross-fade. */
export const ACT_CROSSFADE = 0.5;

/** Same breakpoint as the act CSS media queries. */
export const MOBILE_BREAKPOINT = "(max-width: 640px)";

export type ScrollLength = number | { base: number; mobile: number };

export interface HomeStageApi {
  stageRef: RefObject<HTMLElement | null>;
  /**
   * Lenis is created in the parent's effect, which runs *after* the acts'
   * effects — so acts receive the ref container and read it lazily (e.g. on
   * click), never the instance itself.
   */
  lenisRef: RefObject<Lenis | null>;
  reducedMotion: boolean;
  /** D = Σ scroll lengths; the pinned duration of every stage timeline. */
  totalScrollLength: number;
  getActWindow(actIndex: number): ActWindow;
  scrollToAct(actIndex: number): void;
}

export interface HomeActProps {
  actIndex: number;
  isFirst: boolean;
  isLast: boolean;
  stage: HomeStageApi;
}

export interface HomeActDef {
  /** Stable key for the act wrapper (data-act attribute) — also handy as an anchor. */
  id: string;
  /**
   * Scroll length billed to this act, in viewport heights. The cross-fade
   * consumes ACT_CROSSFADE and is paid from the *following* act's head, so a
   * real content act should ask for its desired performance length plus 0.5.
   */
  scrollLength: ScrollLength;
  Component: ComponentType<HomeActProps>;
}

/** Time window of one act on the master timeline (units: 100svh of scroll). */
export interface ActWindow {
  /** Where the act starts billing (the previous act's boundary). */
  enterStart: number;
  /** Cross-fade complete; the act fully owns the viewport from here. */
  perfStart: number;
  /** End of the act's billed window (the next act's boundary). */
  perfEnd: number;
  /** Pixel length of the performance window; recomputed on each refresh. */
  perfPixels(): number;
  /** Absolute scroll position where the act is fully settled. */
  settledScroll(): number;
}

const NOOP = { v: 0 };

/**
 * Pin a scrub timeline's duration to `total`. Without this, a timeline whose
 * last act has no exit tween (or whose first tween starts after 0) reports a
 * shorter automatic duration, and scrubbing compresses the whole schedule.
 */
export function ensureScrubDuration(
  timeline: gsap.core.Timeline,
  total: number,
): void {
  timeline.set(NOOP, {}, Math.max(total - 1e-4, 0));
}

export function resolveLength(length: ScrollLength, isMobile: boolean): number {
  return typeof length === "number"
    ? length
    : isMobile
      ? length.mobile
      : length.base;
}

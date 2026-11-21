import { createContext, useContext } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export interface HomeFrame {
  scroll: number;
  reduced: boolean;
  hidden: boolean;
  layoutChanged: boolean;
}

type FrameListener = (frame: HomeFrame) => void;

export class HomeMotion {
  readonly preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  private listeners = new Set<FrameListener>();
  private lenis: Lenis | null = null;
  private layoutChanged = true;
  private ticking = false;
  private lastScroll = NaN;

  read(layoutChanged = false): HomeFrame {
    return {
      scroll: window.scrollY,
      reduced: this.preference.matches,
      hidden: document.hidden,
      layoutChanged,
    };
  }

  subscribe(listener: FrameListener) {
    this.listeners.add(listener);
    listener(this.read(true));
    return () => {
      this.listeners.delete(listener);
    };
  }

  observeLayout(...elements: Element[]) {
    const observer = new ResizeObserver(this.refresh);
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }

  refresh = () => {
    this.layoutChanged = true;
    this.schedule();
  };

  private schedule = () => {
    if (this.ticking) return;
    this.ticking = true;
    gsap.ticker.add(this.tick);
  };

  private publish(frame: HomeFrame) {
    this.lastScroll = frame.scroll;
    this.listeners.forEach((listener) => listener(frame));
  }

  private tick = (time: number) => {
    this.lenis?.raf(time * 1000);
    const layoutChanged = this.layoutChanged;
    this.layoutChanged = false;
    if (layoutChanged || window.scrollY !== this.lastScroll) {
      this.publish(this.read(layoutChanged));
    }
    if (layoutChanged) {
      this.lenis?.resize();
      ScrollTrigger.refresh();
    }
    if (!this.lenis && !this.layoutChanged) this.stopTicker();
  };

  private stopTicker() {
    gsap.ticker.remove(this.tick);
    this.ticking = false;
  }

  private updatePreference = () => {
    this.lenis?.destroy();
    this.lenis = this.preference.matches
      ? null
      : new Lenis({ lerp: 0.11, wheelMultiplier: 0.9, autoResize: false });
    this.lenis?.on("scroll", ScrollTrigger.update);
    this.refresh();
  };

  private updateVisibility = () => this.publish(this.read());

  private scrollToTop = (event: Event) => {
    if (!this.lenis) return;
    event.preventDefault();
    this.lenis.scrollTo(0);
  };

  start() {
    const stopObserving = this.observeLayout(document.body);
    gsap.ticker.lagSmoothing(0);
    window.addEventListener("scroll", this.schedule, { passive: true });
    window.addEventListener("resize", this.refresh);
    document.addEventListener("visibilitychange", this.updateVisibility);
    document.addEventListener("wiki:request-scroll-top", this.scrollToTop);
    this.preference.addEventListener("change", this.updatePreference);
    this.updatePreference();
    return () => {
      stopObserving();
      window.removeEventListener("scroll", this.schedule);
      window.removeEventListener("resize", this.refresh);
      document.removeEventListener("visibilitychange", this.updateVisibility);
      document.removeEventListener("wiki:request-scroll-top", this.scrollToTop);
      this.preference.removeEventListener("change", this.updatePreference);
      this.stopTicker();
      this.lenis?.destroy();
      this.lenis = null;
      gsap.ticker.lagSmoothing(500, 33);
    };
  }
}

export const HomeMotionContext = createContext<HomeMotion | null>(null);

export function useHomeMotion() {
  const motion = useContext(HomeMotionContext);
  if (!motion) throw new Error("useHomeMotion outside HomePage");
  return motion;
}

export class MotionClock {
  private startedAt: number | null = null;

  constructor(private elapsed = 0) {}

  get time() {
    return this.startedAt === null
      ? this.elapsed
      : this.elapsed + gsap.ticker.time - this.startedAt;
  }

  setActive(active: boolean) {
    if (active && this.startedAt === null) this.startedAt = gsap.ticker.time;
    if (!active && this.startedAt !== null) {
      this.elapsed = this.time;
      this.startedAt = null;
    }
  }
}

export function syncAmbientPlayback(
  animation: gsap.core.Animation,
  visible: boolean,
  clock: MotionClock,
) {
  if (visible === !animation.paused()) return;
  if (visible) animation.totalTime(clock.time, true).resume();
  else animation.pause();
}

export function observeVisibility(
  targets: ReadonlyMap<Element, (visible: boolean) => void>,
) {
  const visible = new Set<Element>();
  const sync = (target: Element) =>
    targets.get(target)?.(!document.hidden && visible.has(target));
  const observer = new IntersectionObserver((entries) => {
    for (const { target, isIntersecting } of entries) {
      if (isIntersecting) visible.add(target);
      else visible.delete(target);
      sync(target);
    }
  });
  const syncPage = () => targets.forEach((_, target) => sync(target));
  targets.forEach((_, target) => observer.observe(target));
  document.addEventListener("visibilitychange", syncPage);
  return () => {
    observer.disconnect();
    document.removeEventListener("visibilitychange", syncPage);
  };
}

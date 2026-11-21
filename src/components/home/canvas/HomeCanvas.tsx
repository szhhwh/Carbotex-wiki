import { useLayoutEffect, useMemo, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ARTBOARD, STRAW_INFO } from "../geometry";
import {
  CanvasDirector,
  DirectorContext,
  NO_STOPS,
  ramp,
  type StopId,
} from "./director";
import { useLenis } from "../lenis";
import { Hero } from "./Hero";
import { PageOneBase, PageOneTop } from "./PageOne";
import { PageTwo } from "./PageTwo";
import { PageThree } from "./PageThree";
import { PageFour } from "./PageFour";
import { PageFive } from "./PageFive";
import { StrawPen } from "./Straw";
import s from "./canvas.module.css";

/** Scroll spent easing into / out of every rest stop, in viewport heights. */
const HOLD_RAMP = 0.35;
/** Pen lead: the straw tip runs this far down the viewport (see straw-pen). */
const LEAD = 0.74;

/** Breathing room kept between a framed page and the navbar / viewport edge (pt). */
const FRAME_MARGIN = 28;

interface StopDef {
  id: StopId;
  /**
   * Artboard y range [top, bottom] of the page's content. The camera centres
   * it in the viewport area below the fixed navbar; when it does not fit,
   * its top sits FRAME_MARGIN below the navbar. "top" pins the canvas top.
   */
  frame: readonly [number, number] | "top";
  /** Scroll spent resting, in viewport heights. */
  hold: number;
  /** Artboard y the straw pen reaches by the end of the rest. */
  end: number;
}

/**
 * Every page rests for a while: the camera eases to a stop, the page's
 * scroll-driven animation (and its straw) plays to the end, then the
 * camera eases on to the next page.
 */
const STOPS: readonly StopDef[] = [
  { id: "hero", frame: "top", hold: 0.45, end: 0 },
  // Copy + scene buttons down to the earth on the wave.
  { id: "p1", frame: [1068, 1680], hold: 0.9, end: 1605 },
  // Heading, ring and note down to the footer line.
  { id: "p2", frame: [1812, 2520], hold: 0.9, end: 2632 },
  // Literature copy, the yeast's idea and the sugars.
  { id: "p3", frame: [2715, 3370], hold: 1.1, end: 3425 },
  // Header bar, lamp light and the microbes on the glucose.
  { id: "p4", frame: [3490, 4165], hold: 1.1, end: 4120 },
  // Title, taiji / Carbotex bubble and the caption below it.
  {
    id: "p5",
    frame: [4292, 4855],
    hold: 0.8,
    end: STRAW_INFO.link.bbox[3] + 1,
  },
];

interface Stop {
  ids: StopId[];
  /** Plateau camera position (px). */
  c: number;
  /** Plateau length (px). */
  L: number;
  /** Scroll consumed by earlier stops (px). */
  off: number;
  /** Pen target (pt). */
  end: number;
}

interface Layout {
  u: number;
  vh: number;
  nav: number;
  travel: number;
  ramp: number;
  stops: Stop[];
  compact: boolean;
  reduced: boolean;
}

interface Shot {
  cam: number;
  stops: Record<StopId, number>;
  tip: number;
}

/**
 * Camera position for a scroll offset `y`: linear between stops; at each
 * stop its velocity eases to zero, rests for `L`, then eases back to one.
 */
function camera(y: number, l: Layout): Shot {
  const r = l.ramp;
  const stops = { ...NO_STOPS };
  let tip = 0;
  let cam = y;
  let resolved = false;
  for (const stop of l.stops) {
    const yl = y - stop.off;
    const a = stop.c + r / 2;
    const h = Math.min(
      Math.max((yl - (a - r * 0.5)) / (stop.L + r * 0.5), 0),
      1,
    );
    for (const id of stop.ids) stops[id] = h;
    if (h > 0) {
      const from = (stop.c + l.vh * LEAD) / l.u;
      tip = Math.max(
        tip,
        from + (Math.max(stop.end, from) - from) * ramp(h, 0.04, 0.82),
      );
    }
    if (resolved) continue;
    if (yl < a - r) cam = yl;
    else if (yl < a) {
      const t = (yl - (a - r)) / r;
      cam = yl - r * (t ** 3 - t ** 4 / 2);
    } else if (yl < a + stop.L) cam = a - r / 2;
    else if (yl < a + stop.L + r) {
      const t = (yl - (a + stop.L)) / r;
      cam = yl - r / 2 - stop.L - r * (t - t ** 3 + t ** 4 / 2);
    } else {
      cam = yl - stop.L - r;
      continue;
    }
    resolved = true;
  }
  return { cam: Math.min(Math.max(cam, 0), l.travel), stops, tip };
}

/** Camera position (px) framing `def` below a navbar `nav` px tall. */
function frameCamera(def: StopDef, u: number, vh: number, nav: number) {
  if (def.frame === "top") return 0;
  const [top, bottom] = def.frame;
  const room = vh - nav;
  const need = (bottom - top + FRAME_MARGIN * 2) * u;
  return need <= room
    ? ((top + bottom) / 2) * u - nav - room / 2
    : (top - FRAME_MARGIN) * u - nav;
}

/** Lays the stops out for the current viewport, merging any that crowd. */
function planStops(
  u: number,
  vh: number,
  nav: number,
  travel: number,
  r: number,
): Stop[] {
  const out: Stop[] = [];
  for (const def of STOPS) {
    const c = Math.min(Math.max(frameCamera(def, u, vh, nav), 0), travel);
    const L = def.hold * vh;
    const prev = out[out.length - 1];
    if (prev && c < prev.c + r) {
      prev.ids.push(def.id);
      prev.L += L;
      prev.end = Math.max(prev.end, def.end);
      continue;
    }
    out.push({ ids: [def.id], c, L, off: 0, end: def.end });
  }
  let off = 0;
  for (const stop of out) {
    stop.off = off;
    off += stop.L + r;
  }
  return out;
}

export function HomeCanvas() {
  const wrapper = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLDivElement>(null);
  const navProbe = useRef<HTMLDivElement>(null);
  const director = useMemo(() => new CanvasDirector(), []);
  const lenis = useLenis();

  useLayoutEffect(() => {
    const wrap = wrapper.current!;
    const view = stage.current!;
    const board = canvas.current!;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let layout: Layout;
    let lastY = -1;

    const measure = () => {
      const w = view.clientWidth;
      const vh = view.clientHeight;
      const nav = navProbe.current?.offsetHeight ?? 0;
      const u = w / ARTBOARD.width;
      const reduced = motion.matches;
      const travel = Math.max(0, ARTBOARD.height * u - vh);
      const r = reduced ? 0 : HOLD_RAMP * vh;
      const stops = reduced ? [] : planStops(u, vh, nav, travel, r);
      layout = {
        u,
        vh,
        nav,
        travel,
        ramp: r,
        stops,
        compact: w < 760,
        reduced,
      };
      const rest = stops.reduce((sum, stop) => sum + stop.L + r, 0);
      board.style.setProperty("--u", `${u}px`);
      wrap.style.height = `${travel + rest + vh}px`;
      lastY = -1;
    };

    const update = () => {
      const y = window.scrollY - wrap.offsetTop;
      if (y === lastY) return;
      lastY = y;
      const { cam, stops, tip } = camera(y, layout);
      board.style.transform = `translate3d(0, ${-cam}px, 0)`;
      director.publish({
        cam: cam / layout.u,
        view: layout.vh / layout.u,
        nav: layout.nav / layout.u,
        u: layout.u,
        stops,
        tip,
        compact: layout.compact,
        reduced: layout.reduced,
      });
    };

    const relayout = () => {
      measure();
      update();
      ScrollTrigger.refresh();
    };

    measure();
    update();
    const ro = new ResizeObserver(relayout);
    ro.observe(view);
    motion.addEventListener("change", relayout);
    window.addEventListener("scroll", update, { passive: true });
    const off = lenis?.on("scroll", update);
    return () => {
      ro.disconnect();
      motion.removeEventListener("change", relayout);
      window.removeEventListener("scroll", update);
      off?.();
    };
  }, [director, lenis]);

  return (
    <DirectorContext.Provider value={director}>
      <section
        ref={wrapper}
        className={s.wrapper}
        aria-label="Carbotex: from straw to a green bioadhesive"
        data-home-canvas
      >
        <div ref={stage} className={s.stage}>
          <div ref={navProbe} className={s.navProbe} aria-hidden />
          <div ref={canvas} className={s.canvas}>
            <StrawPen>
              <Hero />
              <PageOneBase />
              <PageTwo />
              <PageOneTop />
              <PageThree />
              <PageFour />
              <PageFive />
            </StrawPen>
          </div>
        </div>
      </section>
    </DirectorContext.Provider>
  );
}

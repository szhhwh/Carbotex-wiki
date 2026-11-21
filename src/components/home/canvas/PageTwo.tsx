import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ART } from "../geometry";
import { Art, Layer } from "./art";
import { artUrl, rectStyle } from "./assets";
import { CanvasText } from "./CanvasText";
import { ramp, useCanvasIdle, useCanvasProgress } from "./director";
import { useHomeMotion } from "../motion";
import { STRAW_WIDTH, StrawStroke } from "./Straw";
import {
  P2_FOOTER,
  P2_HEADING,
  P2_NOTE,
  RING_CENTRE,
  RING_SEGMENTS,
  RING_SPANS,
} from "./texts";
import s from "./page-two.module.css";
import c from "./canvas.module.css";

type SegmentId = (typeof RING_SEGMENTS)[number]["id"];

/** Segment crossing the ring's horizontal axis on the right at rotation φ. */
function segmentAt(phi: number): SegmentId {
  const theta = ((-phi % 360) + 360) % 360;
  for (const seg of RING_SEGMENTS) {
    const [a, b] = RING_SPANS[seg.id];
    if ((theta >= a && theta < b) || (theta + 360 >= a && theta + 360 < b))
      return seg.id;
  }
  return "feed";
}

/** Ring slides in from the left while P2 enters (camera bottom, pt). */
const ENTER: [number, number] = [1870, 2170];
/** Wheel distance (px) that steps the ring on by one segment. */
const WHEEL_STEP = 50;
/** Drag distance (px) that steps the ring on by one segment. */
const DRAG_STEP = 40;
/** After a step, further wheel input is ignored for this long (ms), so one
 * flick (or a trackpad's inertia) cannot skip past the thin segments. */
const STEP_LOCK = 320;

/** Angle (θ, as in segmentAt) at the middle of every segment. */
const MIDS = RING_SEGMENTS.map(({ id }) => {
  const [a, b] = RING_SPANS[id];
  return { id, theta: ((a + b) / 2) % 360 };
});

/**
 * Rotation (deg, sign = direction) from ring angle `angle` to the middle of
 * the neighbouring segment: +1 steps on (θ decreasing), −1 steps back.
 * Every segment gets one stop, however thin it is.
 */
function stepDelta(angle: number, dir: 1 | -1) {
  const theta = ((-angle % 360) + 360) % 360;
  const current = segmentAt(angle);
  let best = Infinity;
  for (const mid of MIDS) {
    if (mid.id === current) continue;
    // Distance travelled in `dir` (θ falls as the angle grows).
    const d =
      (((dir === 1 ? theta - mid.theta : mid.theta - theta) % 360) + 360) % 360;
    if (d < best) best = d;
  }
  return dir * best;
}

export function PageTwo() {
  const gradId = useId().replace(/:/g, "");
  const { preference } = useHomeMotion();
  const root = useCanvasIdle(2290, 2380);
  const group = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLImageElement>(null);
  const tag = useRef<HTMLDivElement>(null);
  const data = useRef<SVGSVGElement>(null);
  const user = useRef({ angle: 0 });
  const entry = useRef(0);
  const [segment, setSegment] = useState<SegmentId>(() => segmentAt(0));
  const segRef = useRef(segment);
  /** Steps the ring one segment on (+1) or back (−1); set by the effect. */
  const stepRef = useRef<(dir: 1 | -1) => void>(() => {});

  const applyRing = useCallback(() => {
    const q = entry.current;
    const phi = user.current.angle - (1 - q) * 210;
    if (ring.current)
      ring.current.style.transform = `rotate(${phi.toFixed(2)}deg)`;
    const next = segmentAt(phi);
    if (next !== segRef.current) {
      segRef.current = next;
      setSegment(next);
    }
  }, []);

  useCanvasProgress(
    (frame) => {
      const q = frame.reduced
        ? 1
        : ramp(frame.cam + frame.view, ENTER[0], ENTER[1]);
      return [q, (-(1 - q) * 620 * frame.u).toFixed(2)] as const;
    },
    ([q, slide]) => {
      entry.current = q;
      if (group.current) {
        group.current.style.transform = `translate3d(${slide}px, 0, 0)`;
      }
      const reveal = ramp(q, 0.78, 1);
      if (tag.current) tag.current.style.opacity = String(reveal);
      if (data.current) data.current.style.opacity = String(reveal);
      applyRing();
    },
  );

  // Wheel (and drag on touch screens) over the tag spins the ring.
  useEffect(() => {
    const el = tag.current;
    if (!el) return;
    const target = { angle: user.current.angle };
    const spin = gsap.quickTo(user.current, "angle", {
      duration: 0.6,
      ease: "power3.out",
      onUpdate: applyRing,
    });
    const settle = () => {
      spin.tween.pause();
      user.current.angle = target.angle;
      applyRing();
    };
    const onPreference = () => {
      if (preference.matches) settle();
    };
    const step = (dir: 1 | -1) => {
      target.angle += stepDelta(target.angle, dir);
      if (preference.matches) settle();
      else spin(target.angle);
    };
    stepRef.current = step;
    let wheel = 0;
    let lockedUntil = 0;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.timeStamp < lockedUntil) return;
      wheel += e.deltaMode === 1 ? e.deltaY * 32 : e.deltaY;
      if (Math.abs(wheel) < WHEEL_STEP) return;
      step(wheel > 0 ? 1 : -1);
      wheel = 0;
      lockedUntil = e.timeStamp + STEP_LOCK;
    };
    let lastY: number | null = null;
    let drag = 0;
    const onDown = (e: PointerEvent) => {
      lastY = e.clientY;
      drag = 0;
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (lastY === null) return;
      drag += e.clientY - lastY;
      lastY = e.clientY;
      if (Math.abs(drag) < DRAG_STEP) return;
      step(drag > 0 ? 1 : -1);
      drag = 0;
    };
    const onUp = () => {
      lastY = null;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    preference.addEventListener("change", onPreference);
    return () => {
      spin.tween.kill();
      preference.removeEventListener("change", onPreference);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, [applyRing, preference]);

  // The data label swaps instantly, with a tiny pop.
  useLayoutEffect(() => {
    const el = data.current?.querySelector("[data-label]");
    if (!el) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        el,
        { scale: 1.06 },
        {
          scale: 1,
          duration: 0.25,
          ease: "power2.out",
          transformOrigin: "50% 50%",
        },
      );
    });
    return () => media.revert();
  }, [segment]);

  const seg = RING_SEGMENTS.find((x) => x.id === segment)!;
  const ringRect = ART["p2/ring"];
  const origin = `${((RING_CENTRE[0] - ringRect[0]) / ringRect[2]) * 100}% ${((RING_CENTRE[1] - ringRect[1]) / ringRect[3]) * 100}%`;
  const tagRect = ART["p2/scroll-tag"];
  const dt = ART["p2/data-tag"];

  return (
    <div ref={root} className={c.scene} data-idle-paused="">
      <div
        ref={tag}
        className={`${c.box} ${c.interactive} ${s.tag}`}
        style={rectStyle(tagRect)}
        data-lenis-prevent
        role="slider"
        tabIndex={0}
        aria-label="Rotate the straw-use ring: scroll the mouse wheel here"
        aria-valuetext={`${seg.value} ${seg.label}`}
        aria-valuenow={Math.round(user.current.angle)}
        onKeyDown={(e) => {
          if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
          e.preventDefault();
          stepRef.current(e.key === "ArrowDown" ? 1 : -1);
        }}
      >
        <img
          src={artUrl("p2/scroll-tag")}
          alt=""
          aria-hidden
          draggable={false}
        />
        <svg viewBox={tagRect.join(" ")} aria-hidden className={s.tagText}>
          <text
            className={c.display}
            fontSize={18}
            fill="#BC9C75"
            textAnchor="middle"
          >
            <tspan x={568.4} y={2330.8}>
              Move mouse here
            </tspan>
            <tspan x={568.4} y={2356.8}>
              Scroll wheel
            </tspan>
          </text>
        </svg>
      </div>
      <StrawStroke
        k="s2c"
        width={STRAW_WIDTH}
        paint={`url(#g${gradId})`}
        defs={
          <linearGradient
            id={`g${gradId}`}
            x1="452"
            y1="2004"
            x2="430"
            y2="2062"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#f2a530" />
            <stop offset="0.55" stopColor="#f2a530" />
            <stop offset="1" stopColor="#ffc647" />
          </linearGradient>
        }
      />
      <div ref={group} className={s.group}>
        <Art
          k="p2/ring"
          className={s.ring}
          style={{ transformOrigin: origin }}
          ref={ring}
        />
        <Art k="p2/straw-bundle" />
        <Art k="p2/china-map" alt="Map of China" />
      </div>
      {/* s2d leaves from under s2b's lowest bend (the "Y" below the loop). */}
      <StrawStroke k="s2d" width={STRAW_WIDTH} />
      {/* Butt cap: s2b's end is the fold into the shaded s2c behind the ring. */}
      <StrawStroke k="s2b" width={STRAW_WIDTH} cap="butt" />
      <Art k="p2/note-box" />
      <CanvasText block={P2_NOTE} />
      <Layer
        ref={data}
        box={dt}
        className={`${c.visible} ${s.data}`}
        label={`${seg.value} ${seg.label}`}
      >
        <image
          href={artUrl("p2/data-tag")}
          x={dt[0]}
          y={dt[1]}
          width={dt[2]}
          height={dt[3]}
        />
        {seg.raw && (
          <rect
            x={dt[0] + 2.93}
            y={dt[1] + 54.02}
            width={264.86}
            height={89.83}
            rx={18.25}
            fill="#fff"
            stroke="#F77D2B"
            strokeWidth={5.86}
          />
        )}
        <g data-label className={c.display}>
          <text
            x={624.2}
            y={2070.8}
            fontSize={30}
            fill="#FFFFFF"
            textAnchor="middle"
          >
            {seg.value}
          </text>
          <text
            x={686.3}
            y={2144.5}
            fontSize={36}
            fill={seg.raw ? "#F77D2B" : "#0A473B"}
            textAnchor="middle"
          >
            {seg.label}
          </text>
        </g>
      </Layer>
      <CanvasText block={P2_HEADING} />
      <CanvasText block={P2_FOOTER} />
    </div>
  );
}

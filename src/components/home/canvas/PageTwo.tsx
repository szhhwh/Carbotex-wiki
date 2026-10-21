import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ART } from "../geometry";
import { Art, Layer } from "./art";
import { artUrl, rectStyle } from "./assets";
import { CanvasText } from "./CanvasText";
import { ramp, useDirector, useFrame } from "./director";
import { StrawStroke } from "./Straw";
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
  const theta = (((-phi % 360) + 360) % 360);
  for (const seg of RING_SEGMENTS) {
    const [a, b] = RING_SPANS[seg.id];
    if ((theta >= a && theta < b) || (theta + 360 >= a && theta + 360 < b)) return seg.id;
  }
  return "feed";
}

/** Ring slides in from the left while P2 enters (camera bottom, pt). */
const ENTER: [number, number] = [1870, 2170];
/** Degrees of ring rotation per wheel pixel. */
const WHEEL_DEG = 0.12;

export function PageTwo() {
  const gradId = useId().replace(/:/g, "");
  const director = useDirector();
  const group = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLImageElement>(null);
  const tag = useRef<HTMLDivElement>(null);
  const data = useRef<SVGSVGElement>(null);
  const user = useRef({ angle: 0 });
  const entry = useRef(0);
  const [segment, setSegment] = useState<SegmentId>(() => segmentAt(0));
  const segRef = useRef(segment);

  const applyRing = () => {
    const q = entry.current;
    const phi = user.current.angle - (1 - q) * 210;
    if (ring.current) ring.current.style.transform = `rotate(${phi.toFixed(2)}deg)`;
    const next = segmentAt(phi);
    if (next !== segRef.current) {
      segRef.current = next;
      setSegment(next);
    }
  };

  useFrame((f) => {
    const q = f.reduced ? 1 : ramp(f.cam + f.view, ENTER[0], ENTER[1]);
    entry.current = q;
    if (group.current) {
      group.current.style.transform = `translate3d(${(-(1 - q) * 620 * f.u).toFixed(2)}px, 0, 0)`;
    }
    const reveal = f.reduced ? 1 : ramp(q, 0.78, 1);
    if (tag.current) tag.current.style.opacity = String(reveal);
    if (data.current) data.current.style.opacity = String(reveal);
    applyRing();
  });

  // Wheel (and drag on touch screens) over the tag spins the ring.
  useEffect(() => {
    const el = tag.current;
    if (!el) return;
    const target = { angle: user.current.angle };
    const spin = gsap.quickTo(user.current, "angle", {
      duration: director.frame.reduced ? 0.01 : 0.55,
      ease: "power3.out",
      onUpdate: applyRing,
    });
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const dy = e.deltaMode === 1 ? e.deltaY * 32 : e.deltaY;
      target.angle += Math.max(-40, Math.min(40, dy * WHEEL_DEG));
      spin(target.angle);
    };
    let lastY: number | null = null;
    const onDown = (e: PointerEvent) => {
      lastY = e.clientY;
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (lastY === null) return;
      target.angle += (e.clientY - lastY) * 0.6;
      lastY = e.clientY;
      spin(target.angle);
    };
    const onUp = () => {
      lastY = null;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, [director]);

  // The data label swaps instantly, with a tiny pop.
  useLayoutEffect(() => {
    const el = data.current?.querySelector("[data-label]");
    if (!el || director.frame.reduced) return;
    const tween = gsap.fromTo(
      el,
      { scale: 1.06 },
      { scale: 1, duration: 0.25, ease: "power2.out", transformOrigin: "50% 50%" },
    );
    return () => {
      tween.kill();
    };
  }, [segment, director]);

  const seg = RING_SEGMENTS.find((x) => x.id === segment)!;
  const ringRect = ART["p2/ring"];
  const origin = `${((RING_CENTRE[0] - ringRect[0]) / ringRect[2]) * 100}% ${((RING_CENTRE[1] - ringRect[1]) / ringRect[3]) * 100}%`;
  const tagRect = ART["p2/scroll-tag"];
  const dt = ART["p2/data-tag"];

  return (
    <>
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
          const step = e.key === "ArrowDown" ? 15 : -15;
          gsap.to(user.current, { angle: `+=${step}`, duration: 0.4, onUpdate: applyRing });
        }}
      >
        <img src={artUrl("p2/scroll-tag")} alt="" aria-hidden draggable={false} />
        <svg viewBox={tagRect.join(" ")} aria-hidden className={s.tagText}>
          <text className={c.display} fontSize={18} fill="#BC9C75" textAnchor="middle">
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
        width={33}
        paint={`url(#g${gradId})`}
        defs={
          <linearGradient id={`g${gradId}`} x1="452" y1="2004" x2="430" y2="2062" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#f2a530" />
            <stop offset="0.55" stopColor="#f2a530" />
            <stop offset="1" stopColor="#ffc647" />
          </linearGradient>
        }
      />
      <div ref={group} className={s.group}>
        <Art k="p2/ring" className={s.ring} style={{ transformOrigin: origin }} ref={ring} />
        <Art k="p2/straw-bundle" />
        <Art k="p2/china-map" alt="Map of China" />
      </div>
      <StrawStroke k="s2b" width={33} />
      <StrawStroke k="s2d" width={33} />
      <Art k="p2/note-box" />
      <CanvasText block={P2_NOTE} />
      <Layer ref={data} box={dt} className={`${c.visible} ${s.data}`} label={`${seg.value} ${seg.label}`}>
        <image href={artUrl("p2/data-tag")} x={dt[0]} y={dt[1]} width={dt[2]} height={dt[3]} />
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
          <text x={624.2} y={2070.8} fontSize={30} fill="#FFFFFF" textAnchor="middle">
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
    </>
  );
}

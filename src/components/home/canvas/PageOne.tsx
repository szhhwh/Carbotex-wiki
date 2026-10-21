import { useCallback, useId, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ART, SHAPES, type ArtKey } from "../geometry";
import { Art, Layer } from "./art";
import { artUrl, rectStyle } from "./assets";
import { CanvasText } from "./CanvasText";
import { useDirector } from "./director";
import { StrawArt, STRAW_WIDTH, StrawStroke } from "./Straw";
import { GREEN, P1_COPY } from "./texts";
import s from "./page-one.module.css";
import c from "./canvas.module.css";

const HEADLINE = "Weaving Ecological Agri-waste into Valued Ecopolymers";
/** Initials set in Black; the rest of the headline is Regular. */
const INITIALS = new Set([0, 8, 19, 35, 42]);
/** Baseline extensions before the first and after the last glyph (pt). */
const LEAD_IN = 60;
const LEAD_OUT = 45;
/** Advance of the final "s" at 30 pt. */
const LAST_ADVANCE = 13.2;

/** P1 band with its curved headline (path text along the band's top). */
function Band() {
  const id = useId().replace(/:/g, "");
  const textPath = useRef<SVGTextPathElement>(null);
  const baseline = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    const path = baseline.current;
    const text = textPath.current;
    if (!path || !text) return;
    // Span the glyphs exactly from the first to the last glyph origin + the
    // advance of the final "s" — the spacing of the artboard.
    const length = path.getTotalLength() - LEAD_IN - LEAD_OUT;
    text.setAttribute("textLength", String(length + LAST_ADVANCE));
  }, []);

  return (
    <Layer box={[380, 600, 1006, 330]} className={`${c.text} ${s.band}`}>
      <defs>
        <path id={`b${id}`} ref={baseline} d={SHAPES.bandBaseline} />
      </defs>
      <path d={SHAPES.band} fill="#fff" />
      <text
        fontSize={30}
        fill={GREEN}
        aria-label={HEADLINE}
        className={s.headline}
        style={{ whiteSpace: "pre" }}
      >
        <textPath
          ref={textPath}
          href={`#b${id}`}
          startOffset={LEAD_IN}
          lengthAdjust="spacing"
        >
          {Array.from(HEADLINE).map((ch, i) => (
            <tspan key={i} fontWeight={INITIALS.has(i) ? 900 : 400}>
              {ch}
            </tspan>
          ))}
        </textPath>
      </text>
    </Layer>
  );
}

/** Translucent smoke drifting up from the burning field (code drawn). */
function Smoke() {
  const id = useId().replace(/:/g, "");
  const d =
    "M585 1330 C540 1270 545 1205 610 1170 C680 1132 800 1150 850 1110 C900 1068 820 1032 720 1026 C600 1018 470 1022 330 1012 C210 1004 90 990 -30 996";
  return (
    <Layer box={[-40, 940, 1000, 420]} className={s.smoke}>
      <defs>
        <filter id={`f${id}`} x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <linearGradient id={`g${id}`} x1="600" y1="1330" x2="0" y2="1000" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#d9f5e8" stopOpacity="0.13" />
          <stop offset="0.55" stopColor="#bfe9d6" stopOpacity="0.09" />
          <stop offset="1" stopColor="#bfe9d6" stopOpacity="0.035" />
        </linearGradient>
      </defs>
      <g filter={`url(#f${id})`} fill="none" stroke={`url(#g${id})`} strokeLinecap="round">
        <path d={d} strokeWidth={88} className={s.puffSlow} />
        <path d={d} strokeWidth={54} className={s.puff} />
        <path d={d} strokeWidth={26} className={s.puffFast} />
      </g>
    </Layer>
  );
}

type Scene = "burning" | "tilling" | "transport";
const SCENES: { key: Scene; art: ArtKey; label: string; drop: number }[] = [
  { key: "burning", art: "p1/burning", label: "Straw burning in the field", drop: 640 },
  { key: "tilling", art: "p1/tilling", label: "Straw tilled back into the soil", drop: 520 },
  { key: "transport", art: "p1/transport", label: "Straw bales hauled away", drop: 470 },
];
const SCENE_BUTTONS: Record<Scene, number> = { burning: 1, tilling: 2, transport: 3 };

/** Interactive P1 illustrations, rising from the foot of the page. */
const sceneEvents = new EventTarget();

export function PageOneBase() {
  const maskId = useId().replace(/:/g, "");
  const root = useRef<HTMLDivElement>(null);
  const director = useDirector();
  const current = useRef<{ key: Scene; tl: gsap.core.Timeline } | null>(null);

  const play = useCallback(
    (key: Scene) => {
      const scene = SCENES.find((x) => x.key === key)!;
      const el = root.current?.querySelector<SVGGElement>(`[data-scene="${key}"]`);
      const overhang = root.current?.querySelector<SVGRectElement>("[data-overhang]");
      if (!el || !overhang) return;
      const reduced = director.frame.reduced;
      const prev = current.current;
      const tl = gsap.timeline({
        onComplete: () => {
          if (current.current?.tl === tl) current.current = null;
          sceneEvents.dispatchEvent(new CustomEvent("active", { detail: null }));
        },
      });
      if (prev) {
        prev.tl.kill();
        const pe = root.current!.querySelector(`[data-scene="${prev.key}"]`);
        const ps = SCENES.find((x) => x.key === prev.key)!;
        tl.to(overhang, { attr: { height: 0 }, duration: 0.12 }, 0);
        tl.to(pe, { y: ps.drop, duration: 0.32, ease: "power2.in" }, 0);
        tl.set(pe, { autoAlpha: 0 });
      }
      current.current = { key, tl };
      sceneEvents.dispatchEvent(new CustomEvent("active", { detail: key }));
      const hold = reduced ? 2.4 : 1.7;
      tl.set(el, { autoAlpha: 1, y: reduced ? 0 : scene.drop });
      if (!reduced) tl.to(el, { y: 0, duration: 0.95, ease: "back.out(1.15)" });
      if (key === "tilling") tl.to(overhang, { attr: { height: 150 }, duration: 0.35, ease: "power2.out" }, "-=0.25");
      tl.to({}, { duration: hold });
      if (key === "tilling") tl.to(overhang, { attr: { height: 0 }, duration: 0.15, ease: "power1.in" });
      if (!reduced) tl.to(el, { y: scene.drop, duration: 0.45, ease: "power3.in" });
      tl.set(el, { autoAlpha: 0 });
    },
    [director],
  );

  useLayoutEffect(() => {
    const onPlay = (e: Event) => play((e as CustomEvent<Scene>).detail);
    sceneEvents.addEventListener("play", onPlay);
    const ctx = gsap.context(() => {
      gsap.set("[data-scene]", { autoAlpha: 0 });
    }, root);
    return () => {
      sceneEvents.removeEventListener("play", onPlay);
      current.current?.tl.kill();
      ctx.revert();
    };
  }, [play]);

  const burning = ART["p1/burning"];
  const tilling = ART["p1/tilling"];
  const transport = ART["p1/transport"];
  return (
    <div ref={root} className={s.page}>
      <Band />
      <Layer box={[-20, 700, 1406, 1100]}>
        <path d={SHAPES.p1Backdrop} fill="#0a473b" />
      </Layer>
      <Layer box={[-20, 700, 1406, 300]}>
        <path d={SHAPES.tealTop} fill="#02b186" />
      </Layer>
      <Smoke />
      <Layer box={[burning[0], burning[1], burning[2], burning[3] + 700]} className={s.sceneLayer}>
        <g data-scene="burning" className={s.fire}>
          <image href={artUrl("p1/burning")} x={burning[0]} y={burning[1]} width={burning[2]} height={burning[3]} />
        </g>
      </Layer>
      <StrawStroke k="s2a" width={STRAW_WIDTH} />
      <Art k="p1/earth" className={s.earth} />
      <Layer box={[-20, 1480, 1406, 1140]}>
        <path d={SHAPES.bottomWave} fill="#02b186" />
        <path d={SHAPES.p2Paper} fill="#fbf0dd" />
      </Layer>
      <Layer box={[250, 1250, 800, 600]} className={s.sceneLayer}>
        <defs>
          <mask id={`m${maskId}`} maskUnits="userSpaceOnUse" x="250" y="1250" width="800" height="600">
            <path d={`M-20 700H1386V2620H-20Z ${SHAPES.p2Paper}`} fill="#fff" fillRule="evenodd" />
            <rect data-overhang x={tilling[0]} y={1660} width={tilling[2]} height={0} fill="#fff" />
          </mask>
        </defs>
        <g mask={`url(#m${maskId})`}>
          <g data-scene="transport">
            <image href={artUrl("p1/transport")} x={transport[0]} y={transport[1]} width={transport[2]} height={transport[3]} />
          </g>
          <g data-scene="tilling">
            <image href={artUrl("p1/tilling")} x={tilling[0]} y={tilling[1]} width={tilling[2]} height={tilling[3]} />
          </g>
        </g>
      </Layer>
    </div>
  );
}

/** Straw row, the P1 straw (front of the earth), copy and the buttons. */
export function PageOneTop() {
  const [active, setActive] = useState<Scene | null>(null);
  useLayoutEffect(() => {
    const on = (e: Event) => setActive((e as CustomEvent<Scene | null>).detail);
    sceneEvents.addEventListener("active", on);
    return () => sceneEvents.removeEventListener("active", on);
  }, []);
  return (
    <>
      <Art k="p1/straw-row" className={s.row} />
      <StrawArt k="front" art="p1/straw-front" reveal={46} />
      <CanvasText block={P1_COPY} />
      {SCENES.map((scene, i) => (
        <button
          key={scene.key}
          type="button"
          className={`${c.box} ${c.interactive} ${s.button}`}
          style={rectStyle([1017.1 + i * 91.8, 1191.9, 67.04, 42.49], {
            backgroundImage: `url(${JSON.stringify(artUrl("p1/button-frame"))})`,
          })}
          aria-label={`${SCENE_BUTTONS[scene.key]}: ${scene.label}`}
          aria-pressed={active === scene.key}
          data-active={active === scene.key || undefined}
          onClick={() => sceneEvents.dispatchEvent(new CustomEvent("play", { detail: scene.key }))}
        >
          <span>{SCENE_BUTTONS[scene.key]}</span>
        </button>
      ))}
    </>
  );
}

import { useCallback, useId, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ART, CARBOTEX_WIPE, type ArtKey } from "../geometry";
import { Art } from "./art";
import { artUrl, rectStyle } from "./assets";
import { CanvasText } from "./CanvasText";
import { useDirector } from "./director";
import { StrawArt, StrawStroke } from "./Straw";
import { P5_CAPTION, P5_TITLE } from "./texts";
import s from "./page-five.module.css";
import c from "./canvas.module.css";

/**
 * Similarity transforms (taiji-local pt) that lay each opened half back onto
 * the closed taiji: p_taiji = t + scale · R(rot) · p_half. Measured by
 * feature-matching the exported halves against the closed artwork.
 */
const CLOSED: Record<
  "yeast" | "thermo",
  { scale: number; rot: number; t: [number, number] }
> = {
  yeast: { scale: 0.5871, rot: -69.42, t: [-53.97, 334.11] },
  thermo: { scale: 0.5495, rot: -87.1, t: [15.05, 253.91] },
};
const HALF_ART: Record<"yeast" | "thermo", ArtKey> = {
  yeast: "p5/taiji-yeast",
  thermo: "p5/taiji-thermo",
};

function rotationOf(el: Element) {
  const m = getComputedStyle(el).transform;
  if (!m || m === "none") return 0;
  const [a, b] = m
    .slice(m.indexOf("(") + 1, -1)
    .split(",")
    .map(Number);
  return (Math.atan2(b, a) * 180) / Math.PI;
}

export function PageFive() {
  const id = useId().replace(/:/g, "");
  const director = useDirector();
  const root = useRef<HTMLDivElement>(null);
  const taiji = useRef<HTMLImageElement>(null);
  const halves = useRef<Record<string, HTMLImageElement | null>>({});
  const pen = useRef<SVGPathElement | null>(null);
  const tail = useRef<SVGPathElement | null>(null);
  const wipe = useRef<SVGRectElement>(null);
  const bubble = useRef<HTMLImageElement>(null);
  const caption = useRef<HTMLDivElement>(null);
  const captionText = useRef<HTMLDivElement>(null);
  const [opened, setOpened] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([`.${s.half}`, `.${s.bubble}`, `.${s.caption}`], {
        autoAlpha: 0,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const open = useCallback(() => {
    if (opened) return;
    setOpened(true);
    const reduced = director.frame.reduced;
    const tj = ART["p5/taiji"];
    const centre: [number, number] = [tj[0] + tj[2] / 2, tj[1] + tj[3] / 2];
    const phi = taiji.current ? rotationOf(taiji.current) : 0;
    const rad = (phi * Math.PI) / 180;
    const tl = gsap.timeline();

    // 1 · The taiji turns, grows and opens into its two halves.
    (["yeast", "thermo"] as const).forEach((half, i) => {
      const el = halves.current[half];
      if (!el) return;
      const { scale, rot, t } = CLOSED[half];
      const box = ART[HALF_ART[half]];
      const px = tj[0] + t[0] - centre[0];
      const py = tj[1] + t[1] - centre[1];
      // Transform about the half's own centre (so it spins in place while
      // it travels): T' = T − c + s·R·c, with T the corner-origin offset.
      const r0 = ((phi + rot) * Math.PI) / 180;
      const cx = box[2] / 2;
      const cy = box[3] / 2;
      const state = {
        x:
          centre[0] +
          px * Math.cos(rad) -
          py * Math.sin(rad) -
          box[0] -
          cx +
          scale * (cx * Math.cos(r0) - cy * Math.sin(r0)),
        y:
          centre[1] +
          px * Math.sin(rad) +
          py * Math.cos(rad) -
          box[1] -
          cy +
          scale * (cx * Math.sin(r0) + cy * Math.cos(r0)),
        rot: phi + rot,
        scale,
      };
      const end = Math.ceil((state.rot + 200 + i * 40) / 360) * 360;
      const apply = () => {
        const u = director.frame.u;
        el.style.transform = `translate(${state.x * u}px, ${state.y * u}px) rotate(${state.rot}deg) scale(${state.scale})`;
      };
      apply();
      gsap.set(el, { autoAlpha: 1 });
      if (reduced) {
        Object.assign(state, { x: 0, y: 0, rot: 0, scale: 1 });
        apply();
        return;
      }
      tl.to(
        state,
        {
          x: 0,
          y: 0,
          rot: end,
          scale: 1,
          duration: 2.7,
          ease: "power2.inOut",
          onUpdate: apply,
        },
        0,
      );
    });
    if (taiji.current) tl.set(taiji.current, { autoAlpha: 0 }, 0);
    tl.to(
      `.${s.click}`,
      { scale: 0.6, autoAlpha: 0, duration: 0.35, ease: "back.in(2)" },
      0,
    );

    // 2 · "Carbotex" is written left → right; the bubble grows with it.
    const path = pen.current;
    const total = path?.getTotalLength() ?? 1;
    const write = { p: reduced ? 1 : 0 };
    const draw = () => {
      if (!path) return;
      path.style.strokeDashoffset = String(1 - write.p);
      path.style.visibility = write.p > 0 ? "visible" : "hidden";
      const k = write.p * (CARBOTEX_WIPE.length - 1);
      const i = Math.min(Math.floor(k), CARBOTEX_WIPE.length - 2);
      const edge =
        CARBOTEX_WIPE[i] +
        (CARBOTEX_WIPE[i + 1] - CARBOTEX_WIPE[i]) * (k - i) -
        14;
      wipe.current?.setAttribute("width", String(Math.max(0, edge - 300)));
      const tip = path.getPointAtLength(total * write.p);
      const b = ART["p5/carbotex-bubble"];
      const reach = write.p >= 1 ? 120 : ((tip.x + 70 - b[0]) / b[2]) * 100;
      bubble.current?.style.setProperty("--reach", `${Math.max(0, reach)}%`);
    };
    gsap.set(bubble.current, { autoAlpha: 1 });
    draw();
    if (!reduced) {
      tl.fromTo(
        bubble.current,
        { scale: 0.92 },
        { scale: 1, duration: 2.4, ease: "elastic.out(1, 0.6)" },
        0.15,
      );
      tl.to(
        write,
        { p: 1, duration: 2.1, ease: "sine.inOut", onUpdate: draw },
        0.15,
      );
    }

    // 3 · The straw runs on to the foot of the page as the halves land.
    const run = { p: reduced ? 1 : 0 };
    const drawTail = () => {
      if (!tail.current) return;
      tail.current.style.strokeDashoffset = String(1 - run.p);
      tail.current.style.visibility = run.p > 0 ? "visible" : "hidden";
    };
    drawTail();
    if (!reduced)
      tl.to(
        run,
        { p: 1, duration: 0.6, ease: "power1.out", onUpdate: drawTail },
        2.1,
      );

    // 4 · The caption settles under the word.
    tl.fromTo(
      [caption.current, captionText.current],
      { autoAlpha: 0, y: reduced ? 0 : 24 * director.frame.u },
      {
        autoAlpha: 1,
        y: 0,
        duration: reduced ? 0 : 0.7,
        ease: "power3.out",
        stagger: 0.12,
      },
      reduced ? 0 : 2.75,
    );
    tl.add(() => root.current?.setAttribute("data-open", ""));
  }, [director, opened]);

  const click = ART["p5/click-box"];
  return (
    <div ref={root} className={s.page}>
      <Art k="p5/carbotex-bubble" ref={bubble} className={s.bubble} />
      <div ref={caption} className={s.caption}>
        <Art k="p5/caption-box" />
      </div>
      {(["thermo", "yeast"] as const).map((half) => (
        <div key={half} className={`${s.float} ${s[half]}`}>
          <Art
            k={HALF_ART[half]}
            className={s.half}
            ref={(el) => {
              halves.current[half] = el;
            }}
          />
        </div>
      ))}
      <StrawArt
        k="carbotex"
        art="p5/carbotex-straw"
        reveal={40}
        managed={false}
        pathRef={(el) => {
          pen.current = el;
        }}
        extraMask={
          <rect
            ref={wipe}
            x={300}
            y={4323}
            width={0}
            height={500}
            fill="#fff"
          />
        }
      />
      <StrawStroke
        k="s5"
        width={28}
        managed={false}
        box={[660, 4763, 340, 300]}
        paint={`url(#t${id})`}
        defs={
          <linearGradient
            id={`t${id}`}
            x1="0"
            y1="4973"
            x2="0"
            y2="5063"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#ffc647" />
            <stop offset="1" stopColor="#ffc647" stopOpacity="0.15" />
          </linearGradient>
        }
        pathRef={(el) => {
          tail.current = el;
        }}
      />
      <div ref={captionText} className={s.caption}>
        <CanvasText block={P5_CAPTION} scrollFade={false} />
      </div>
      <Art k="p5/taiji" ref={taiji} className={s.taiji} />
      <button
        type="button"
        className={`${c.box} ${c.interactive} ${s.click}`}
        style={rectStyle(click, {
          backgroundImage: `url(${JSON.stringify(artUrl("p5/click-box"))})`,
        })}
        onClick={open}
        disabled={opened}
        aria-label="Click to open: reveal Carbotex"
      >
        <svg viewBox={click.join(" ")} className={s.clickText} aria-hidden>
          <text
            className={c.display}
            x={684.6}
            y={4582}
            fontSize={48.2}
            fill="#D1967C"
            textAnchor="middle"
          >
            Click !
          </text>
        </svg>
      </button>
      <CanvasText block={P5_TITLE} as="h2" />
    </div>
  );
}

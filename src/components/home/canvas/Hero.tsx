import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import type { ArtKey } from "../geometry";
import { Art, Frame } from "./art";
import { useCanvasIdle, useCanvasProgress } from "./director";
import { onOpeningReveal } from "../../routing/onOpeningReveal";
import { createSplash } from "./splash";
import s from "./hero.module.css";
import c from "./canvas.module.css";

/**
 * Depth layers of the opening scene, back to front, with their parallax
 * factor: pt of extra downward drift per pt of camera travel through the
 * hero (positive = lags behind = far, negative = rushes ahead = near).
 */
const LAYERS: readonly { keys: ArtKey[]; depth: number }[] = [
  { keys: ["hero/cloud-left", "hero/cloud-right"], depth: 0.2 },
  { keys: ["hero/far-hills"], depth: 0.13 },
  { keys: ["hero/mountains"], depth: 0.075 },
  { keys: ["hero/meadow"], depth: 0 },
  { keys: ["hero/wheat-left", "hero/wheat-right"], depth: 0 },
  { keys: ["hero/field-left", "hero/field-right"], depth: -0.06 },
];

const HERO_H = 768;
/** The floating title lags at most this far (keeps clear of the P1 band). */
const TITLE_DRIFT = 86;
const DROPS = 22;

export function Hero() {
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const title = useRef<HTMLDivElement>(null);
  const titleArt = useRef<HTMLImageElement>(null);
  const blob = useRef<HTMLImageElement>(null);
  const splash = useRef<HTMLDivElement>(null);
  const active = useRef(false);
  const dropsPlayback = useRef<ReturnType<typeof createSplash> | null>(null);
  const root = useCanvasIdle(0, HERO_H, (visible) => {
    active.current = visible;
    dropsPlayback.current?.setActive(visible);
  });
  const introduced = useRef(false);

  useCanvasProgress(
    (frame) => [
      Math.min(frame.cam, HERO_H),
      (frame.reduced ? 0 : frame.compact ? 0.5 : 1) * frame.u,
    ],
    ([travel, scale]) => {
      LAYERS.forEach((layer, index) => {
        const el = layerRefs.current[index];
        if (el)
          el.style.transform = `translate3d(0, ${(travel * layer.depth * scale).toFixed(2)}px, 0)`;
      });
      if (title.current) {
        const drift = Math.min(travel * 0.16, TITLE_DRIFT) * scale;
        title.current.style.transform = `translate3d(0, ${drift.toFixed(2)}px, 0)`;
      }
    },
  );

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add(
      {
        reduce: "(prefers-reduced-motion: reduce)",
        animate: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        if (context.conditions?.reduce) {
          introduced.current = true;
          return;
        }
        const drops = gsap.utils.toArray<HTMLElement>(
          `.${s.drop}`,
          splash.current,
        );
        const playback = createSplash(drops);
        dropsPlayback.current = playback;
        playback.setActive(active.current);

        const intro = introduced.current
          ? null
          : gsap.timeline({
              paused: true,
              defaults: { ease: "power3.out" },
              onComplete: () => {
                introduced.current = true;
              },
            });
        intro
          ?.from(
            blob.current,
            {
              scale: 0.6,
              autoAlpha: 0,
              duration: 1.3,
              ease: "elastic.out(1, 0.55)",
            },
            0.75,
          )
          .fromTo(
            titleArt.current,
            { clipPath: "inset(0 100% 0 0)", yPercent: 10, scale: 0.94 },
            {
              clipPath: "inset(0 0% 0 0)",
              yPercent: 0,
              scale: 1,
              duration: 1.5,
              ease: "power2.inOut",
              immediateRender: true,
            },
            0.15,
          );

        const cancelReveal = onOpeningReveal(() => intro?.play());
        return () => {
          cancelReveal();
          dropsPlayback.current = null;
          playback.dispose();
        };
      },
      root,
    );
    return () => media.revert();
  }, [root]);

  return (
    <div ref={root} className={c.scene} data-idle-paused="">
      <Frame box={[0, 0, 1366, HERO_H + 260]} className={c.sky} />
      {LAYERS.map((layer, i) => (
        <div
          key={i}
          ref={(el) => {
            layerRefs.current[i] = el;
          }}
          className={s.layer}
        >
          {layer.keys.map((k) => (
            <Art key={k} k={k} />
          ))}
        </div>
      ))}
      <div ref={title} className={s.layer}>
        <div className={s.float}>
          <Art k="hero/title-blob" className={s.blob} ref={blob} />
          <div ref={splash} data-home-splash="" aria-hidden>
            {Array.from({ length: DROPS }, (_, i) => (
              <span key={i} className={`${c.box} ${s.drop}`} />
            ))}
          </div>
          <Art k="hero/title" ref={titleArt} data-title-reveal />
        </div>
      </div>
      <h1 className="visually-hidden">Carbotex</h1>
    </div>
  );
}

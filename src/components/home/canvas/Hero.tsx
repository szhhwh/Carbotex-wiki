import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SPLASH_ANCHORS, type ArtKey } from "../geometry";
import { Art, Frame } from "./art";
import { useDirector, useFrame } from "./director";
import { onOpeningReveal } from "../../routing/onOpeningReveal";
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
  const director = useDirector();
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const title = useRef<HTMLDivElement>(null);
  const splash = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);

  useFrame((f) => {
    const travel = Math.min(Math.max(f.cam, 0), HERO_H);
    const k = f.reduced ? 0 : f.compact ? 0.5 : 1;
    LAYERS.forEach((layer, i) => {
      const el = layerRefs.current[i];
      if (el) el.style.transform = `translate3d(0, ${(travel * layer.depth * k * f.u).toFixed(2)}px, 0)`;
    });
    if (title.current) {
      const drift = Math.min(travel * 0.16, TITLE_DRIFT) * k;
      title.current.style.transform = `translate3d(0, ${(drift * f.u).toFixed(2)}px, 0)`;
    }
  });

  // Entrance once the opening screen has gone, then the endless splash.
  useLayoutEffect(() => {
    const reduced = director.frame.reduced;
    let cancelReveal = () => {};
    const ctx = gsap.context(() => {
      const drops = gsap.utils.toArray<HTMLElement>(`.${s.drop}`, splash.current);
      gsap.set(drops, { autoAlpha: 0 });
      if (reduced) return;

      const intro = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
      intro
        .from(`.${s.depth0} img`, { yPercent: -18, autoAlpha: 0, duration: 1.6, stagger: 0.12 }, 0)
        .from(`.${s.depth1}`, { yPercent: 14, autoAlpha: 0, duration: 1.3 }, 0.1)
        .from(`.${s.depth2}`, { yPercent: 16, autoAlpha: 0, duration: 1.3 }, 0.2)
        .from(`.${s.depth3}`, { yPercent: 10, duration: 1.2 }, 0.3)
        .from(`.${s.depth4}`, { yPercent: 18, duration: 1.2 }, 0.38)
        .from(`.${s.depth5}`, { yPercent: 24, duration: 1.25 }, 0.46)
        .from(`.${s.blob}`, { scale: 0.6, autoAlpha: 0, duration: 1.3, ease: "elastic.out(1, 0.55)" }, 0.75)
        .fromTo(
          `.${s.titleArt}`,
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

      // Play under the opening's fade (or at once when there is none).
      cancelReveal = onOpeningReveal(() => intro.play());

      // Liquid splash: droplets spring off the blob edge and fade.
      drops.forEach((drop, i) => {
        const spawn = () => {
          const a = SPLASH_ANCHORS[Math.floor(Math.random() * SPLASH_ANCHORS.length)];
          const size = gsap.utils.random(5, 15);
          const out = gsap.utils.random(6, 26);
          gsap.set(drop, {
            "--x": a[0] + a[2] * out - size / 2,
            "--y": a[1] + a[3] * out - size / 2,
            "--w": size,
            "--h": size,
            scale: 0.2,
            autoAlpha: 0,
          });
          gsap
            .timeline({ onComplete: spawn, delay: gsap.utils.random(0, 2.4) })
            .to(drop, { autoAlpha: 1, scale: 1, duration: 0.45, ease: "back.out(2.4)" })
            .to(drop, {
              "--x": `+=${a[2] * gsap.utils.random(4, 12)}`,
              "--y": `+=${a[3] * gsap.utils.random(4, 12)}`,
              duration: gsap.utils.random(1.2, 2.2),
              ease: "sine.out",
            }, "<")
            .to(drop, { autoAlpha: 0, scale: 0.4, duration: 0.6, ease: "power1.in" }, "-=0.6");
        };
        gsap.delayedCall(1.6 + i * 0.12, spawn);
      });
    }, root);
    return () => {
      cancelReveal();
      ctx.revert();
    };
  }, [director]);

  return (
    <div ref={root} className={s.hero}>
      <Frame box={[0, 0, 1366, HERO_H + 260]} className={c.sky} />
      {LAYERS.map((layer, i) => (
        <div
          key={i}
          ref={(el) => {
            layerRefs.current[i] = el;
          }}
          className={`${s.layer} ${s[`depth${i}` as keyof typeof s]}`}
        >
          {layer.keys.map((k) => (
            <Art key={k} k={k} />
          ))}
        </div>
      ))}
      <div ref={title} className={s.layer}>
        <div className={s.float}>
          <Art k="hero/title-blob" className={s.blob} />
          <div ref={splash} aria-hidden>
            {Array.from({ length: DROPS }, (_, i) => (
              <span key={i} className={`${c.box} ${s.drop}`} />
            ))}
          </div>
          <Art k="hero/title" className={s.titleArt} data-title-reveal />
        </div>
      </div>
      <h1 className="visually-hidden">Carbotex</h1>
    </div>
  );
}

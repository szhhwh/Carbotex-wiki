import {
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { staticHomeAsset } from "../../../utils/staticAsset";
import {
  MotionClock,
  observeVisibility,
  syncAmbientPlayback,
  useHomeMotion,
} from "../motion";
import { StrokeRevealImage, type RevealStroke } from "./StrokeRevealImage";
import styles from "./process-comparison.module.css";

/** Uploaded artwork: flat files in the wiki's home/ upload folder. */
const arrowUrl = staticHomeAsset("arrow.svg");
const checkUrl = staticHomeAsset("check.svg");
const cycleUrl = staticHomeAsset("cycle.svg");
const hexagonUrl = staticHomeAsset("hexagon.svg");
const leafUrl = staticHomeAsset("leaf.svg");
const lineWaveUrl = staticHomeAsset("line-wave.svg");
const pentagonLargeUrl = staticHomeAsset("pentagon-large.svg");
const pentagonSmallUrl = staticHomeAsset("pentagon-small.svg");
const shieldUrl = staticHomeAsset("shield.svg");

type CardKey = "higher" | "greener" | "safer";

interface ComparisonCard {
  key: CardKey;
  title: string;
  /** Bullet points as [bold lead word, rest of the line]. */
  points: readonly (readonly [string, string])[];
}

const CARDS: readonly ComparisonCard[] = [
  {
    key: "higher",
    title: "Higher",
    points: [
      ["Better", " xylose use"],
      ["More", " straw carbon"],
      ["Enhanced", " synthesis"],
    ],
  },
  {
    key: "greener",
    title: "Greener",
    points: [
      ["Renewable", " straw"],
      ["Mild", " fermentation"],
      ["Degradable", " product"],
    ],
  },
  {
    key: "safer",
    title: "Safer",
    points: [
      ["No", " petroleum"],
      ["No", " formaldehyde"],
      ["Low", " health risk"],
    ],
  },
];

/** Bottom → top centre line of arrow.svg (shaft, then head). */
const ARROW_STROKES: readonly RevealStroke[] = [
  { d: "M5,228 L33,-4", width: 60 },
];
/** Short arm then long arm of check.svg. */
const CHECK_STROKES: readonly RevealStroke[] = [
  { d: "M20,76 L56,128 L152,4", width: 48 },
];

/** Positions in card px (536 × 806 card). */
function placed(x: number, y: number, w: number) {
  return { "--x": x, "--y": y, "--w": w } as CSSProperties;
}

function Art({
  src,
  style,
  hook,
  width,
  height,
}: {
  src: string;
  style: CSSProperties;
  hook: string;
  width: number;
  height: number;
}) {
  return (
    <span className={styles.art} style={style} data-art={hook}>
      <img src={src} width={width} height={height} alt="" draggable={false} />
    </span>
  );
}

function CardArt({ card }: { card: CardKey }): ReactNode {
  if (card === "higher") {
    return (
      <>
        <Art
          src={hexagonUrl}
          width={176.55}
          height={203.86}
          style={placed(86, 290, 176.55)}
          hook="float"
        />
        <Art
          src={pentagonLargeUrl}
          width={89.57}
          height={85.67}
          style={placed(242, 236, 89.57)}
          hook="float"
        />
        <Art
          src={pentagonSmallUrl}
          width={71.94}
          height={68.8}
          style={placed(322, 366, 71.94)}
          hook="float"
        />
        <span className={styles.art} style={placed(414, 264, 48.4)}>
          <StrokeRevealImage
            className={styles.drawn}
            src={arrowUrl}
            width={48.4}
            height={224.79}
            strokes={ARROW_STROKES}
          />
          <span
            className={clsx(styles.shine, styles.arrowShine)}
            style={{ "--shine-mask": `url("${arrowUrl}")` } as CSSProperties}
          >
            <span className={styles.arrowLight} data-arrow-shine="" />
          </span>
        </span>
      </>
    );
  }
  if (card === "greener") {
    return (
      <>
        <Art
          src={cycleUrl}
          width={290.31}
          height={275.52}
          style={placed(134, 230, 290.31)}
          hook="cycle"
        />
        <Art
          src={leafUrl}
          width={101.62}
          height={75.83}
          style={placed(220, 330, 101.62)}
          hook="leaf"
        />
      </>
    );
  }
  return (
    <>
      <Art
        src={shieldUrl}
        width={252.75}
        height={312.19}
        style={placed(144, 222, 252.75)}
        hook="shield"
      />
      <span
        className={styles.art}
        style={placed(188, 293, 170.55)}
        data-check=""
      >
        <StrokeRevealImage
          className={styles.drawn}
          src={checkUrl}
          width={170.55}
          height={149.32}
          strokes={CHECK_STROKES}
        />
        <span
          className={clsx(styles.shine, styles.checkShine)}
          style={{ "--shine-mask": `url("${checkUrl}")` } as CSSProperties}
          data-check-shine=""
        />
      </span>
    </>
  );
}

export function ProcessComparison() {
  const rootRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const motion = useHomeMotion();
  const hoverEffects = useRef<Partial<Record<CardKey, () => void>>>({});

  // Rest stop before the footer: the cards stick where they are framed
  // (centred below the navbar, or bottom-aligned when taller than the
  // viewport) for the section's hold padding, like the canvas pages.
  useLayoutEffect(() => {
    const root = rootRef.current;
    const inner = innerRef.current;
    if (!root || !inner) return;
    const navbar = document.querySelector("header");
    const unsubscribe = motion.subscribe(({ layoutChanged }) => {
      if (!layoutChanged) return;
      const vh = window.innerHeight;
      const nav = navbar?.offsetHeight ?? 0;
      const h = inner.offsetHeight;
      const top = h <= vh - nav ? nav + (vh - nav - h) / 2 : vh - h;
      root.style.setProperty("--hold-top", `${Math.round(top)}px`);
    });
    const stopObserving = motion.observeLayout(inner);
    return () => {
      stopObserving();
      unsubscribe();
    };
  }, [motion]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const q = (selector: string) =>
        root.querySelector(selector) as HTMLElement;
      const all = (selector: string) =>
        Array.from(root.querySelectorAll<HTMLElement>(selector));
      const slots = all("[data-card-slot]");
      const shapes = all("[data-art='float']");
      const arrowStroke = q("[data-card='higher'] [data-reveal-stroke]");
      const arrowShine = q("[data-arrow-shine]");
      const cycle = q("[data-art='cycle']");
      const leaf = q("[data-art='leaf']");
      const shield = q("[data-art='shield']");
      const check = q("[data-check]");
      const checkStroke = q("[data-check] [data-reveal-stroke]");
      const checkShine = q("[data-check-shine]");
      const higher = q("[data-card='higher']");
      const greener = q("[data-card='greener']");
      const safer = q("[data-card='safer']");

      gsap.set(slots, { autoAlpha: 0, y: 20 });
      gsap.set(shapes, { autoAlpha: 0, yPercent: 14, scale: 0.78 });
      gsap.set(cycle, { autoAlpha: 0, rotation: -42, scale: 0.86 });
      gsap.set(leaf, { autoAlpha: 0, yPercent: 12, scale: 0.72 });
      gsap.set(shield, { autoAlpha: 0, scale: 0.92 });
      gsap.set([arrowStroke, checkStroke], { strokeDashoffset: 1 });

      const flash = gsap
        .timeline({ paused: true })
        .fromTo(
          checkShine,
          { opacity: 0 },
          { opacity: 0.9, duration: 0.14, ease: "power1.out" },
        )
        .to(checkShine, { opacity: 0, duration: 0.4, ease: "power1.in" })
        .fromTo(
          check,
          { scale: 1 },
          {
            scale: 1.1,
            duration: 0.14,
            repeat: 1,
            yoyo: true,
            ease: "power1.out",
          },
          0,
        );

      const arrowLoop = gsap
        .timeline({ paused: true, repeat: -1, repeatDelay: 2.6 })
        .fromTo(
          arrowShine,
          { yPercent: 0 },
          {
            yPercent: -200 / 3,
            duration: 1.1,
            ease: "power1.inOut",
          },
        );
      const hoverShine = gsap.fromTo(
        arrowShine,
        { yPercent: 0 },
        {
          yPercent: -200 / 3,
          duration: 0.9,
          ease: "power1.inOut",
          paused: true,
        },
      );
      const higherClock = new MotionClock();
      const greenerClock = new MotionClock();
      const arrowClock = new MotionClock();
      let sectionActive = false;
      let entranceDone = false;
      let higherArtEntered = false;
      let greenerArtEntered = false;
      let arrowHovered = false;
      let higherVisible = false;
      let greenerVisible = false;
      let saferVisible = false;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.querySelector("[data-cards]"),
            start: "top 80%",
            toggleActions: "play none none none",
          },
          onComplete: () => {
            entranceDone = true;
            syncLoops();
          },
        })
        .to(slots, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.13,
        })
        .to(
          arrowStroke,
          { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" },
          0.4,
        )
        .to(
          shield,
          { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(1.6)" },
          0.55,
        )
        .to(
          checkStroke,
          { strokeDashoffset: 0, duration: 0.5, ease: "power2.inOut" },
          0.95,
        )
        .add(() => flash.restart(), 1.5);

      const higherLoop = gsap.timeline({ paused: true });
      all("[data-art='float'] img").forEach((shape, index) => {
        higherLoop.fromTo(
          shape,
          { y: 0, rotation: 0 },
          {
            y: index % 2 ? 8 : -10,
            rotation: index % 2 ? -6 : 5,
            duration: 2.4 + index * 0.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          },
          index * 0.4,
        );
      });
      const greenerLoop = gsap.timeline({ paused: true });
      greenerLoop
        .to(
          q("[data-art='cycle'] img"),
          { rotation: 360, duration: 10, ease: "none", repeat: -1 },
          0,
        )
        .fromTo(
          q("[data-art='leaf'] img"),
          { scale: 1 },
          {
            scale: 1.12,
            duration: 1.1,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          },
          0,
        );
      const syncLoops = () => {
        const higherActive = sectionActive && higherArtEntered;
        const greenerActive = sectionActive && greenerArtEntered;
        const arrowActive = sectionActive && entranceDone && !arrowHovered;
        higherClock.setActive(higherActive);
        greenerClock.setActive(greenerActive);
        arrowClock.setActive(arrowActive);
        syncAmbientPlayback(
          higherLoop,
          higherActive && higherVisible,
          higherClock,
        );
        syncAmbientPlayback(
          greenerLoop,
          greenerActive && greenerVisible,
          greenerClock,
        );
        syncAmbientPlayback(
          arrowLoop,
          arrowActive && higherVisible,
          arrowClock,
        );
      };

      gsap
        .timeline({
          scrollTrigger: { trigger: higher, start: "top 80%", once: true },
          onComplete: () => {
            higherArtEntered = true;
            syncLoops();
          },
        })
        .to(
          shapes,
          {
            autoAlpha: 1,
            yPercent: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.09,
            ease: "back.out(1.4)",
          },
          0.16,
        );

      gsap
        .timeline({
          scrollTrigger: { trigger: greener, start: "top 80%", once: true },
          onComplete: () => {
            greenerArtEntered = true;
            syncLoops();
          },
        })
        .to(
          cycle,
          {
            autoAlpha: 1,
            rotation: 0,
            scale: 1,
            duration: 0.7,
            ease: "power2.out",
          },
          0.22,
        )
        .to(
          leaf,
          {
            autoAlpha: 1,
            yPercent: 0,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.5)",
          },
          0.39,
        );

      const updateSection = (trigger: ScrollTrigger) => {
        sectionActive = Boolean(trigger.isActive);
        syncLoops();
      };
      ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onToggle: updateSection,
        onRefresh: updateSection,
      });
      const stopObserving = observeVisibility(
        new Map<Element, (visible: boolean) => void>([
          [
            higher,
            (visible) => {
              higherVisible = visible;
              syncLoops();
            },
          ],
          [
            greener,
            (visible) => {
              greenerVisible = visible;
              syncLoops();
            },
          ],
          [
            safer,
            (visible) => {
              saferVisible = visible;
            },
          ],
        ]),
      );

      hoverEffects.current = {
        higher: () => {
          if (!higherVisible) return;
          arrowHovered = true;
          syncLoops();
          hoverShine.restart();
        },
        safer: () => {
          if (saferVisible) flash.restart();
        },
      };
      return () => {
        stopObserving();
        hoverEffects.current = {};
      };
    });

    return () => media.revert();
  }, []);

  return (
    <section ref={rootRef} className={styles.comparison}>
      <div ref={innerRef} className={styles.inner}>
        <img
          className={styles.lineWave}
          src={lineWaveUrl}
          width={2298.57}
          height={960.42}
          alt=""
          draggable={false}
        />
        <p className={styles.intro}>
          Compared with other straw-based biomanufacturing routes and chemical
          manufacturing:
        </p>
        <ul className={styles.cards} data-cards="">
          {CARDS.map((card) => (
            <li key={card.key} className={styles.cardSlot} data-card-slot="">
              <article
                className={styles.card}
                data-card={card.key}
                onPointerEnter={() => hoverEffects.current[card.key]?.()}
              >
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <CardArt card={card.key} />
                  <ul className={styles.points}>
                    {card.points.map(([lead, rest]) => (
                      <li key={lead + rest}>
                        <strong>{lead}</strong>
                        {rest}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { RadialColorReveal } from "./RadialColorReveal";
import { ensureScrubDuration, type HomeActProps } from "./stage-math";
import styles from "./act-landing.module.css";

/**
 * Opening act of the home stage: the Carbotex vector landscape.
 *
 * The illustration and its animation metadata stay together (each SVG group
 * declares its own data-depth), so the terrain can be redrawn without
 * touching the animation code. Entrance runs on mount; the in-act scrub
 * (parallax, title drift, cue fade) is scheduled on the stage's shared time
 * axis via this act's time window.
 */
export function ActLanding({ actIndex, stage }: HomeActProps) {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (stage.reducedMotion) return;
    const root = rootRef.current;

    if (!root) return;

    // Refs attach bottom-up (children before ancestors), so stageRef.current
    // is still null while this child effect runs — resolve the stage element
    // from the live DOM instead.
    const stageElement = root.closest<HTMLElement>("[data-home-stage]");
    const titleMask = root.querySelector<HTMLElement>("[data-title-mask]");

    if (!stageElement || !titleMask) return;

    titleMask.setAttribute("data-revealing", "");

    const context = gsap.context(() => {
      gsap
        .timeline({
          defaults: { ease: "power4.out" },
          onComplete: () => titleMask.removeAttribute("data-revealing"),
        })
        .fromTo(
          "[data-title-reveal]",
          { yPercent: 125 },
          { yPercent: 0, duration: 1.6, stagger: 0.16 },
        )
        .fromTo(
          "[data-scroll-cue]",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 1 },
          0.75,
        );

      const win = stage.getActWindow(actIndex);
      const windowLength = win.perfEnd - win.perfStart;
      const act = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          // Same trigger window as the stage master timeline: time t maps to
          // a fixed fraction of the total scroll, immune to resize.
          trigger: stageElement,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      gsap.utils.toArray<SVGElement>("[data-depth]", root).forEach((layer) => {
        const depth = Number(layer.dataset.depth ?? 0);

        act.to(
          layer,
          { y: () => -win.perfPixels() * depth, duration: windowLength },
          win.perfStart,
        );
      });

      act
        .to(
          "[data-title-motion]",
          { y: () => -win.perfPixels() * 0.85, duration: windowLength },
          win.perfStart,
        )
        .to(
          "[data-scroll-cue]",
          { y: () => -win.perfPixels(), autoAlpha: 0, duration: windowLength },
          win.perfStart,
        );

      ensureScrubDuration(act, stage.totalScrollLength);
    }, root);

    return () => {
      context.revert();
      titleMask.removeAttribute("data-revealing");
    };
  }, [stage, actIndex]);

  return (
    <section
      ref={rootRef}
      className={styles.scene}
      aria-labelledby="carbotex-title"
    >
      <svg
        className={styles.landscape}
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="Layered green hills and distant mountains"
      >
        <defs>
          <linearGradient id="carbotex-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d9f5e8" />
            <stop offset="0.72" stopColor="#c9eddb" />
            <stop offset="1" stopColor="#bde5d2" />
          </linearGradient>
          <linearGradient id="carbotex-mountain" x1="0" y1="0" x2="0.72" y2="1">
            <stop offset="0" stopColor="#f5f8c9" />
            <stop offset="1" stopColor="#bce6ca" />
          </linearGradient>
          <linearGradient id="carbotex-mid-hill" x1="0" y1="0" x2="1" y2="0.8">
            <stop offset="0" stopColor="#b4e5c6" />
            <stop offset="1" stopColor="#8fd3ae" />
          </linearGradient>
          <linearGradient id="carbotex-near-hill" x1="0" y1="0" x2="0.8" y2="1">
            <stop offset="0" stopColor="#96c968" />
            <stop offset="1" stopColor="#58a858" />
          </linearGradient>
          <pattern
            id="carbotex-fibres-light"
            width="22"
            height="22"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-18)"
          >
            <path
              d="M 0 2 H 22 M 0 13 H 22"
              stroke="#f7f8cf"
              strokeWidth="1.4"
              opacity="0.16"
            />
          </pattern>
          <pattern
            id="carbotex-fibres-dark"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(14)"
          >
            <path
              d="M 0 4 H 28 M 0 19 H 28"
              stroke="#d8ef9b"
              strokeWidth="1.5"
              opacity="0.12"
            />
          </pattern>
        </defs>

        <g id="carbotex-landscape-artwork">
          <rect width="1600" height="1000" fill="url(#carbotex-sky)" />

          <g data-depth="0.2" className={styles.layer}>
            <path
              d="M-100 575 115 410 305 245 456 391 612 302 777 449 974 326 1157 457 1396 267 1700 454V1280H-100Z"
              fill="url(#carbotex-mountain)"
            />
            <path
              d="m115 410 190-165 151 146-60-34-83-54-96 115Zm497-108 165 147-75-34-86-76-79 26Zm545 155 239-190 304 187-171-93-116-43-97 76Z"
              fill="#e9f5b9"
              opacity="0.82"
            />
            <path
              d="M-100 575 115 410 305 245 456 391 612 302 777 449 974 326 1157 457 1396 267 1700 454V1280H-100Z"
              fill="url(#carbotex-fibres-light)"
            />
          </g>

          <g data-depth="0.2" className={styles.layer}>
            <path
              d="M-120 590C120 505 322 492 510 535c230 53 358 47 554-22 197-70 390-77 656 38v752H-120Z"
              fill="url(#carbotex-mid-hill)"
            />
            <path
              d="M-120 628c258-86 487-49 657-15 201 40 366 12 535-53 197-76 401-69 648 29"
              fill="none"
              stroke="#d1efbc"
              strokeWidth="21"
              opacity="0.55"
            />
            <path
              d="M-120 590C120 505 322 492 510 535c230 53 358 47 554-22 197-70 390-77 656 38v752H-120Z"
              fill="url(#carbotex-fibres-light)"
            />
          </g>

          <g data-depth="0.3" className={styles.layer}>
            <path
              d="M-130 764c199-119 389-193 586-167 191 24 284 165 473 125 189-41 272-170 477-187 111-9 220 12 334 61v735H-130Z"
              fill="url(#carbotex-near-hill)"
            />
            <path
              d="M-130 809c222-130 410-181 588-152 185 31 288 163 477 113 180-47 279-161 469-179 121-11 226 8 336 52"
              fill="none"
              stroke="#c3de78"
              strokeWidth="26"
              opacity="0.38"
            />
            <path
              d="M-130 764c199-119 389-193 586-167 191 24 284 165 473 125 189-41 272-170 477-187 111-9 220 12 334 61v735H-130Z"
              fill="url(#carbotex-fibres-dark)"
            />
          </g>

          <g data-depth="0.6" className={styles.layer}>
            <path
              d="M-160 882c238-32 382-1 568 48 222 58 400 44 579-17 198-67 392-91 773-42v560H-160Z"
              fill="#075a4d"
            />
            <path
              d="M-160 909c238-32 390 5 572 49 216 53 390 39 573-20 205-67 406-80 775-41"
              fill="none"
              stroke="#24935c"
              strokeWidth="34"
              opacity="0.72"
            />
            <path
              d="M-160 882c238-32 382-1 568 48 222 58 400 44 579-17 198-67 392-91 773-42v560H-160Z"
              fill="url(#carbotex-fibres-dark)"
            />
          </g>
        </g>

        <RadialColorReveal
          artworkId="carbotex-landscape-artwork"
          centerX={800}
          centerY={500}
          endRadius={1100}
        />
      </svg>

      <div className={styles.titleMotion} data-title-motion>
        <div className={styles.titleGroup}>
          <div className={styles.titleMask} data-title-mask>
            <h1 id="carbotex-title" className={styles.title} data-title-reveal>
              Carbotex
            </h1>
          </div>
          <div className={styles.subtitleMask}>
            <p className={styles.subtitle} data-title-reveal>
              Weaving Ecological Agri-waste into Valued Ecopolymers
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        className={styles.scrollCue}
        data-scroll-cue
        onClick={() => stage.scrollToAct(1)}
        aria-label="Scroll to the next act"
      >
        <span>Scroll</span>
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path d="M24 5v34M11 27l13 13 13-13" />
        </svg>
      </button>
    </section>
  );
}

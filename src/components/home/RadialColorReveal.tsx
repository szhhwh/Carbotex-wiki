import { useId, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

interface RadialColorRevealProps {
  /** The id of an SVG element containing the full-colour artwork. */
  artworkId: string;
  centerX: number;
  centerY: number;
  /** Radius, in the parent SVG's viewBox units, that covers every corner. */
  endRadius: number;
  /** Width of the soft reveal edge in the parent SVG's viewBox units. */
  feather?: number;
  duration?: number;
}

const completedArtworkIds = new Set<string>();

/**
 * Places a greyscale copy over an existing SVG artwork, then removes it from
 * the centre outwards once the window's resources have loaded.
 *
 * The artwork is referenced with <use>, so later illustration edits remain a
 * single-source change. The overlay is removed after its one-shot animation
 * to avoid keeping an SVG filter in the rendering pipeline.
 */
export function RadialColorReveal({
  artworkId,
  centerX,
  centerY,
  endRadius,
  feather = 24,
  duration = 2,
}: RadialColorRevealProps) {
  const circleRef = useRef<SVGCircleElement>(null);
  const overlayRef = useRef<SVGUseElement>(null);
  const instanceId = useId().replace(/:/g, "");
  const greyscaleFilterId = `radial-reveal-greyscale-${instanceId}`;
  const featherFilterId = `radial-reveal-feather-${instanceId}`;
  const maskId = `radial-reveal-mask-${instanceId}`;
  const maskPadding = feather * 4;
  const maskStart = {
    x: centerX - endRadius - maskPadding,
    y: centerY - endRadius - maskPadding,
  };
  const maskSize = (endRadius + maskPadding) * 2;

  useLayoutEffect(() => {
    const circle = circleRef.current;
    const overlay = overlayRef.current;

    if (!circle || !overlay) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || completedArtworkIds.has(artworkId)) {
      gsap.set(overlay, { display: "none" });
      return;
    }

    let cancelled = false;
    let frameId: number | undefined;
    let revealTween: gsap.core.Tween | undefined;

    const play = () => {
      frameId = window.requestAnimationFrame(() => {
        if (cancelled) return;

        revealTween = gsap.fromTo(
          circle,
          { attr: { r: 0 } },
          {
            attr: { r: endRadius },
            duration,
            ease: "power2.inOut",
            onComplete: () => {
              completedArtworkIds.add(artworkId);
              gsap.set(overlay, { display: "none" });
            },
          },
        );
      });
    };

    if (document.readyState === "complete") {
      play();
    } else {
      window.addEventListener("load", play, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", play);

      if (frameId !== undefined) {
        window.cancelAnimationFrame(frameId);
      }

      revealTween?.kill();
    };
  }, [artworkId, duration, endRadius]);

  return (
    <>
      <defs>
        <filter
          id={greyscaleFilterId}
          colorInterpolationFilters="sRGB"
          x="-10%"
          y="-10%"
          width="120%"
          height="120%"
        >
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <filter
          id={featherFilterId}
          filterUnits="userSpaceOnUse"
          x={maskStart.x}
          y={maskStart.y}
          width={maskSize}
          height={maskSize}
        >
          <feGaussianBlur stdDeviation={feather} />
        </filter>
        <mask
          id={maskId}
          maskUnits="userSpaceOnUse"
          x={maskStart.x}
          y={maskStart.y}
          width={maskSize}
          height={maskSize}
        >
          <rect
            x={maskStart.x}
            y={maskStart.y}
            width={maskSize}
            height={maskSize}
            fill="white"
          />
          <circle
            ref={circleRef}
            cx={centerX}
            cy={centerY}
            r="0"
            fill="black"
            filter={`url(#${featherFilterId})`}
          />
        </mask>
      </defs>

      <use
        ref={overlayRef}
        href={`#${artworkId}`}
        filter={`url(#${greyscaleFilterId})`}
        mask={`url(#${maskId})`}
        pointerEvents="none"
        aria-hidden="true"
      />
    </>
  );
}

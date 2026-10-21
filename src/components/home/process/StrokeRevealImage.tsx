import { useId } from "react";

export interface RevealStroke {
  /** Centre line of the region revealed, in the image's own units. */
  d: string;
  width: number;
}

interface StrokeRevealImageProps {
  src: string;
  width: number;
  height: number;
  strokes: readonly RevealStroke[];
  className?: string;
}

/**
 * Draws a filled illustration as if it were a stroke: the image is masked by
 * wide centre-line paths whose `stroke-dashoffset` GSAP animates from 1 to 0
 * (`pathLength` is 1). The art stays an `<img>`-style URL reference so the
 * exported SVG's global `<style>` rules are never inlined into the page.
 * Animation hooks: every mask path carries `data-reveal-stroke`.
 */
export function StrokeRevealImage({
  src,
  width,
  height,
  strokes,
  className,
}: StrokeRevealImageProps) {
  const maskId = `stroke-reveal-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      focusable="false"
    >
      <mask
        id={maskId}
        maskUnits="userSpaceOnUse"
        x={-width * 0.1}
        y={-height * 0.1}
        width={width * 1.2}
        height={height * 1.2}
      >
        {strokes.map((stroke) => (
          <path
            key={stroke.d}
            data-reveal-stroke=""
            d={stroke.d}
            fill="none"
            stroke="#fff"
            strokeWidth={stroke.width}
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray="1 1"
            strokeDashoffset={0}
          />
        ))}
      </mask>
      <image
        href={src}
        width={width}
        height={height}
        preserveAspectRatio="none"
        mask={`url(#${maskId})`}
      />
    </svg>
  );
}

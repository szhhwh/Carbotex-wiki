import { useId } from "react";
import { sweepPath, type Sweep } from "./sweep";

interface SweepRevealImageProps {
  src: string;
  width: number;
  height: number;
  /** One sweep per separate piece of the artwork. */
  sweeps: readonly Sweep[];
  className?: string;
  /** Animation hooks (e.g. `data-bottle-ribbon`) set on the `<svg>`. */
  [data: `data-${string}`]: string;
}

/**
 * A filled ribbon illustration revealed along its course: each mask path
 * (`data-sweep`) is an outline from `sweepPath`, rewritten as GSAP advances
 * the progress. Renders fully revealed (the reduced-motion state).
 */
export function SweepRevealImage({
  src,
  width,
  height,
  sweeps,
  className,
  ...data
}: SweepRevealImageProps) {
  const maskId = `sweep-reveal-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      aria-hidden="true"
      focusable="false"
      {...data}
    >
      <mask
        id={maskId}
        maskUnits="userSpaceOnUse"
        x={-width * 0.1}
        y={-height * 0.1}
        width={width * 1.2}
        height={height * 1.2}
      >
        {sweeps.map((sweep, index) => (
          <path
            key={index}
            data-sweep={index}
            d={sweepPath(sweep, 1)}
            fill="#fff"
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

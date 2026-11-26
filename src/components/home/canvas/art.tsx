import { forwardRef, type CSSProperties, type ReactNode } from "react";
import clsx from "clsx";
import { ART, type ArtKey } from "../geometry";
import { artUrl, rectStyle, type Rect } from "./assets";
import s from "./canvas.module.css";

interface ArtProps {
  k: ArtKey;
  className?: string;
  style?: CSSProperties;
  /** Decorative art is hidden from assistive technology. */
  alt?: string;
  /** Marks the title artwork for the opening-screen hand-off. */
  "data-title-reveal"?: boolean;
}

/** An exported SVG placed at its artboard rectangle. */
export const Art = forwardRef<HTMLImageElement, ArtProps>(function Art(
  { k, className, style, alt = "", ...data },
  ref,
) {
  return (
    <img
      {...data}
      ref={ref}
      src={artUrl(k)}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      draggable={false}
      decoding="async"
      className={clsx(s.box, className)}
      style={rectStyle(ART[k], style)}
    />
  );
});

interface LayerProps {
  box: Rect;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  label?: string;
}

/** An inline SVG whose user space is artboard pt, clipped to `box`. */
export const Layer = forwardRef<SVGSVGElement, LayerProps>(function Layer(
  { box, className, style, children, label },
  ref,
) {
  return (
    <svg
      ref={ref}
      className={clsx(s.box, className)}
      style={rectStyle(box, style)}
      viewBox={box.join(" ")}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      focusable="false"
    >
      {children}
    </svg>
  );
});

/** Plain absolutely positioned div at an artboard rectangle. */
export const Frame = forwardRef<
  HTMLDivElement,
  {
    box: Rect;
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
  }
>(function Frame({ box, className, style, children }, ref) {
  return (
    <div
      ref={ref}
      className={clsx(s.box, className)}
      style={rectStyle(box, style)}
    >
      {children}
    </div>
  );
});

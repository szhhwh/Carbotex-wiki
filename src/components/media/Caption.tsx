/**
 * Caption — shared renderer used by every media surface so caption typography
 * has exactly one source of truth. Renders nothing when both slots are empty.
 *
 * Intentionally not exported through any barrel — it is an internal building
 * block for media components and custom media figures.
 */
import type { ReactNode } from "react";
import clsx from "clsx";
import styles from "./caption.module.css";

export interface CaptionProps {
  /** Caption body; supports rich ReactNode. */
  children?: ReactNode;
  /** Prefix slot, e.g. `Figure 1.` — styled separately for consistent numbering. */
  prefix?: ReactNode;
  /** Use a div when the caption is outside a semantic figure element. */
  as?: "figcaption" | "div";
  className?: string;
}

/** Falsy slots (`false`/`""`/`null`/`undefined`) count as absent — `caption={cond && "…"}` stays clean. */
function isSlotEmpty(value: ReactNode): boolean {
  return value == null || value === false || value === "";
}

export function Caption({
  children,
  prefix,
  as: Element = "figcaption",
  className,
}: CaptionProps) {
  if (isSlotEmpty(children) && isSlotEmpty(prefix)) return null;
  return (
    <Element className={clsx(styles.caption, className)}>
      {!isSlotEmpty(prefix) && (
        <>
          <span className={styles.captionPrefix} data-caption-prefix>
            {prefix}
          </span>{" "}
        </>
      )}
      {children}
    </Element>
  );
}

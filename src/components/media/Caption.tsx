/**
 * Caption — shared <figcaption> renderer used by Figure and VideoEmbed so
 * caption typography has exactly one source of truth (the design pass tunes
 * one file, not two). Renders nothing when both slots are empty.
 *
 * Intentionally not exported through any barrel — it is an internal building
 * block for media components; pages should use Figure/VideoEmbed directly.
 */
import type { ReactNode } from "react";
import clsx from "clsx";
import styles from "./caption.module.css";

export interface CaptionProps {
  /** Caption body; supports rich ReactNode. */
  children?: ReactNode;
  /** Prefix slot, e.g. `Figure 1.` — styled separately for consistent numbering. */
  prefix?: ReactNode;
  className?: string;
}

/** Falsy slots (`false`/`""`/`null`/`undefined`) count as absent — `caption={cond && "…"}` stays clean. */
function isSlotEmpty(value: ReactNode): boolean {
  return value == null || value === false || value === "";
}

export function Caption({ children, prefix, className }: CaptionProps) {
  if (isSlotEmpty(children) && isSlotEmpty(prefix)) return null;
  return (
    <figcaption className={clsx(styles.caption, className)}>
      {!isSlotEmpty(prefix) && (
        <span className={styles.captionPrefix}>{prefix}</span>
      )}
      {children}
    </figcaption>
  );
}

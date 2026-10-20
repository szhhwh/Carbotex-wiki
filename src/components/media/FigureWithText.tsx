/**
 * FigureWithText pairs a data figure with the prose that interprets it.
 *
 * On wide screens the figure and prose share one row; below the layout
 * breakpoint they return to the normal stacked document flow.
 */
import type { ReactNode } from "react";
import clsx from "clsx";
import { Figure, type FigureProps } from "./Figure";
import styles from "./figure-with-text.module.css";

export type FigureWithTextProps = FigureProps & {
  children: ReactNode;
  mediaPosition?: "start" | "end";
  /** Slightly narrow the figure so adjacent prose stays readable. */
  compactMedia?: boolean;
  stacked?: boolean;
  layoutClassName?: string;
  textClassName?: string;
};

export function FigureWithText({
  children,
  mediaPosition = "start",
  compactMedia = false,
  stacked = false,
  layoutClassName,
  textClassName,
  ...figureProps
}: FigureWithTextProps) {
  return (
    <div
      className={clsx(
        styles.layout,
        mediaPosition === "end" && styles.mediaEnd,
        compactMedia && styles.compactMedia,
        stacked && styles.stacked,
        layoutClassName,
      )}
      data-figure-with-text=""
      data-media-position={mediaPosition}
      data-compact-media={compactMedia ? "true" : undefined}
      data-stacked={stacked ? "true" : undefined}
    >
      <Figure
        {...figureProps}
        className={clsx(styles.figure, figureProps.className)}
      />
      <div className={clsx(styles.text, textClassName)}>{children}</div>
    </div>
  );
}

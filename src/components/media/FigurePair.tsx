import type { ReactNode } from "react";
import clsx from "clsx";
import styles from "./figure-pair.module.css";

export function FigurePair({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx(styles.pair, className)} data-figure-pair="">
      {children}
    </div>
  );
}

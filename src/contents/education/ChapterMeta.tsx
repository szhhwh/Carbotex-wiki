import type { ReactNode } from "react";
import styles from "../education.module.css";

export function ChapterMeta({
  kind,
  children,
}: {
  kind: "audience" | "activity";
  children: ReactNode;
}) {
  return (
    <p
      className={`${styles.chapterMeta} ${
        kind === "audience"
          ? styles.chapterMetaAudience
          : styles.chapterMetaActivity
      }`}
    >
      <span className={styles.chapterMetaLabel}>
        {kind === "audience" ? "Audience" : "Activity"}
      </span>
      <span className={styles.srOnly}>: </span>
      <span className={styles.chapterMetaValue}>{children}</span>
    </p>
  );
}

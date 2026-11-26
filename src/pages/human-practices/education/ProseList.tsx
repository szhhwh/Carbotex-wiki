import type { ReactNode } from "react";
import styles from "../education.module.css";

export function ProseList({ children }: { children: ReactNode }) {
  return <ul className={styles.proseList}>{children}</ul>;
}

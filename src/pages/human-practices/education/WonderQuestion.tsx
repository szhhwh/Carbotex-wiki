import type { ReactNode } from "react";
import styles from "../education.module.css";

export function WonderQuestion({ children }: { children: ReactNode }) {
  return <p className={styles.wonderQuestion}>{children}</p>;
}

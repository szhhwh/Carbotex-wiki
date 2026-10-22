import type { ReactNode } from "react";
import styles from "./template-page-frame.module.css";

export function TemplatePageFrame({ children }: { children: ReactNode }) {
  return <div className={styles.pageFrame}>{children}</div>;
}

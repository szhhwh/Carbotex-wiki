import type { ReactNode } from "react";
import styles from "../education.module.css";

type ObjectiveStatementProps = {
  as?: "p" | "h5";
  children: ReactNode;
};

export function ObjectiveStatement({
  as: Tag = "p",
  children,
}: ObjectiveStatementProps) {
  return <Tag className={styles.objectiveStatement}>{children}</Tag>;
}

import { useId, type ReactNode } from "react";
import styles from "./experiment-widgets.module.css";

export interface ComparisonRow {
  comparison: ReactNode;
  groups: ReactNode;
  measurements: ReactNode;
}

export function ComparisonMatrix({
  caption,
  rows,
}: {
  caption: string;
  rows: ComparisonRow[];
}) {
  const captionId = useId();

  return (
    <div className={`${styles.widget} ${styles.matrix}`}>
      <div
        className={styles.matrixScroller}
        role="region"
        tabIndex={0}
        aria-labelledby={captionId}
      >
        <table className={styles.matrixTable}>
          <caption id={captionId}>{caption}</caption>
          <thead>
            <tr>
              <th scope="col">Comparison</th>
              <th scope="col">Strain groups</th>
              <th scope="col">Main measurements</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <th scope="row">{row.comparison}</th>
                <td>{row.groups}</td>
                <td>{row.measurements}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

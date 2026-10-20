import { useId, type ReactNode } from "react";
import tableStyles from "../article/article-table.module.css";
import { Caption } from "../media/Caption";

export interface ComparisonRow {
  comparison: ReactNode;
  groups: ReactNode;
  measurements: ReactNode;
}

export function ComparisonMatrix({
  captionPrefix,
  caption,
  rows,
}: {
  captionPrefix: string;
  caption: string;
  rows: ComparisonRow[];
}) {
  const captionId = useId();
  const hintId = useId();

  return (
    <figure className={tableStyles.tableFigure} aria-labelledby={captionId}>
      <p id={hintId} className={tableStyles.tableHint}>
        Swipe horizontally to view all columns. The first column stays visible.
      </p>
      <div
        className={tableStyles.tableScroller}
        role="region"
        tabIndex={0}
        aria-labelledby={captionId}
        aria-describedby={hintId}
      >
        <table aria-labelledby={captionId}>
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
      <Caption id={captionId} prefix={captionPrefix}>
        {caption}
      </Caption>
    </figure>
  );
}

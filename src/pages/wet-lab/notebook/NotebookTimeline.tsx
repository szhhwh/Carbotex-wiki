import type { ReactNode } from "react";
import styles from "./notebook-timeline.module.css";

export interface NotebookEntry {
  id: string;
  date: string;
  title: ReactNode;
  content: ReactNode;
}

export function NotebookTimeline({ entries }: { entries: NotebookEntry[] }) {
  return (
    <ol className={styles.timeline}>
      {entries.map((entry) => (
        <li className={styles.item} data-notebook-entry key={entry.id}>
          <span className={styles.marker} aria-hidden="true" />
          <p className={styles.date}>{entry.date}</p>
          <article
            className={styles.entry}
            aria-labelledby={`${entry.id}-title`}
          >
            <h3 className={styles.title} id={`${entry.id}-title`}>
              {entry.title}
            </h3>
            <div className={styles.body}>{entry.content}</div>
          </article>
        </li>
      ))}
    </ol>
  );
}

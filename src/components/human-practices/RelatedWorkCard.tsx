import { ArrowRight, FlaskConical } from "lucide-react";
import type { ReactNode } from "react";
import styles from "./related-work-card.module.css";

export function RelatedWorkCard({
  title,
  href,
  linkLabel,
  children,
}: {
  title: string;
  href?: string;
  linkLabel?: string;
  children: ReactNode;
}) {
  return (
    <aside className={styles.card} aria-label={`Related team work: ${title}`}>
      <header className={styles.header}>
        <span className={styles.icon} aria-hidden="true">
          <FlaskConical size={17} />
        </span>
        <div>
          <h4>{title}</h4>
        </div>
      </header>
      <div className={styles.body}>{children}</div>
      {href && linkLabel && (
        <a className={styles.link} href={href}>
          {linkLabel}
          <ArrowRight size={15} aria-hidden="true" />
        </a>
      )}
    </aside>
  );
}

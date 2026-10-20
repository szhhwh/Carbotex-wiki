import { useId, type ReactNode } from "react";
import { ArrowUpRight, BookOpen, FileText } from "lucide-react";
import styles from "./handbook-resource.module.css";

export interface HandbookResourceProps {
  title: string;
  /** Published PDF URL. Leave undefined until the actual resource is available. */
  href?: string;
  children: ReactNode;
  actionLabel?: string;
  headingAs?: "h3" | "h4";
}

export function HandbookResource({
  title,
  href,
  children,
  actionLabel = "Open handbook",
  headingAs: Heading = "h3",
}: HandbookResourceProps) {
  const id = useId();
  const resourceHref =
    href?.trim() && !/\{\{(?:LINK|URL):/.test(href) ? href.trim() : undefined;

  return (
    <section className={styles.resource} aria-labelledby={`${id}-title`}>
      <div className={styles.cover} aria-hidden="true">
        <BookOpen size={46} strokeWidth={1.25} />
        <span>Handbook</span>
        <span className={styles.coverRule} />
        <span className={styles.coverFormat}>PDF</span>
      </div>
      <div className={styles.body}>
        <Heading id={`${id}-title`} className={styles.title}>
          {title}
        </Heading>
        <div className={styles.copy}>{children}</div>
        <div className={styles.footer}>
          {resourceHref ? (
            <>
              <a
                className={styles.action}
                href={resourceHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-describedby={`${id}-format`}
              >
                {actionLabel}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <span id={`${id}-format`} className={styles.format}>
                <FileText size={16} aria-hidden="true" />
                PDF · Opens in a new tab
              </span>
            </>
          ) : (
            <p className={styles.unavailable}>
              Resource link not yet available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

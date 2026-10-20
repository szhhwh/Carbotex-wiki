import { useId } from "react";
import { ExternalLink } from "lucide-react";
import styles from "./experiment-widgets.module.css";

export interface ProtocolLink {
  number: string;
  title: string;
  href: string;
}

export function ProtocolLinks({
  links,
  label = "Related protocols",
}: {
  links: ProtocolLink[];
  label?: string;
}) {
  const headingId = useId();

  return (
    <aside
      className={`${styles.widget} ${styles.protocols}`}
      aria-labelledby={headingId}
    >
      <h4 className={styles.widgetTitle} id={headingId}>
        {label}
      </h4>
      <ul className={styles.protocolList}>
        {links.map((link) => (
          <li key={`${link.number}-${link.href}`}>
            <a
              className={styles.protocolLink}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              data-protocol-link=""
            >
              <span className={styles.protocolNumber}>{link.number}</span>
              <span className={styles.protocolTitle}>{link.title}</span>
              <ExternalLink size={17} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

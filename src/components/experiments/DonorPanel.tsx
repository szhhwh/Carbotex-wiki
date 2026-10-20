import { useId } from "react";
import styles from "./experiment-widgets.module.css";

export interface PycDonor {
  code: string;
  source: string;
  note: string;
}

export function DonorPanel({ donors }: { donors: PycDonor[] }) {
  const headingId = useId();

  return (
    <section
      className={`${styles.widget} ${styles.donors}`}
      aria-labelledby={headingId}
    >
      <div className={styles.donorHeader}>
        <h4 className={styles.widgetTitle} id={headingId}>
          PYC candidates and source labels
        </h4>
        <span>At and ZW both refer to ZW03-4</span>
      </div>
      <ul className={styles.donorGrid}>
        {donors.map((donor) => (
          <li key={donor.code}>
            <span className={styles.donorCode}>{donor.code}</span>
            <strong>{donor.source}</strong>
            <p>{donor.note}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

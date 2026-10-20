import { useId } from "react";
import styles from "./experiment-widgets.module.css";

interface Standard {
  concentration: string;
  level: number;
}

export function HydrolysisPanel({ standards }: { standards: Standard[] }) {
  const headingId = useId();

  return (
    <section
      className={`${styles.widget} ${styles.basis}`}
      aria-labelledby={headingId}
    >
      <div className={styles.basisHeader}>
        <h4 className={styles.widgetTitle} id={headingId}>
          Hydrolysis volume and reporting basis
        </h4>
        <span>No paired non-hydrolysed measurement</span>
      </div>
      <dl className={styles.equation}>
        <div>
          <dt>Supernatant</dt>
          <dd>800 μL</dd>
        </div>
        <div>
          <dt>Sulfuric acid</dt>
          <dd>200 μL</dd>
        </div>
        <div>
          <dt>Final volume</dt>
          <dd>1.60 mL</dd>
        </div>
      </dl>
      <p>
        After cooling, water brings the preparation to 1.60 mL. No further
        dilution is performed before injection. Injected concentrations are
        therefore multiplied by 1.60/0.800 = 2 to report malic acid equivalents
        on the original-supernatant basis.
      </p>
      <ul className={styles.standards} aria-label="Malic acid standards">
        {standards.map((standard) => (
          <li key={standard.concentration}>
            <span className={styles.standardTrack} aria-hidden="true">
              <span style={{ width: `${standard.level}%` }} />
            </span>
            <strong>{standard.concentration}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}

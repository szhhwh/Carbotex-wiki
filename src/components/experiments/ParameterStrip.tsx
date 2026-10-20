import type { ReactNode } from "react";
import styles from "./experiment-widgets.module.css";

export interface ExperimentParameter {
  label: string;
  value: ReactNode;
  detail?: ReactNode;
}

export function ParameterStrip({
  label,
  items,
}: {
  label: string;
  items: ExperimentParameter[];
}) {
  return (
    <section
      className={`${styles.widget} ${styles.parameters}`}
      aria-label={label}
    >
      <p className={styles.parameterLabel}>{label}</p>
      <dl className={styles.parameterGrid}>
        {items.map((item) => (
          <div className={styles.parameterItem} key={item.label}>
            <dt>{item.label}</dt>
            <dd>
              {item.value}
              {item.detail ? <small>{item.detail}</small> : null}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

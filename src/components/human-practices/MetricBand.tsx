import type { IhpMetricsPart } from "./ihp-types";
import styles from "./metric-band.module.css";

export function MetricBand({ label, items }: IhpMetricsPart) {
  return (
    <section className={styles.band} aria-label={label}>
      <span className={styles.label}>{label}</span>
      <div className={styles.items}>
        {items.map((item) => (
          <div className={styles.item} key={`${item.label}-${item.value}`}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
            {item.detail && <small>{item.detail}</small>}
          </div>
        ))}
      </div>
    </section>
  );
}

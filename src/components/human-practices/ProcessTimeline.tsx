import styles from "./process-timeline.module.css";

const STEPS = [
  { label: "Activation", hours: 1 },
  { label: "Dopamine coupling", hours: 24 },
  { label: "Dialysis", hours: 48 },
  { label: "Prefreezing", hours: 1 },
  { label: "Freeze-drying", hours: 48 },
];

export function ProcessTimeline() {
  return (
    <section
      className={styles.timeline}
      aria-label="Elapsed PMA-DA preparation time"
    >
      <div className={styles.heading}>
        <h4>
          <span>Laboratory preparation sequence</span>
          <strong>122 hours</strong>
        </h4>
        <span>
          Elapsed time, excluding upstream hydrolysate and fermentation
        </span>
      </div>
      <ol className={styles.steps}>
        {STEPS.map((step) => (
          <li key={step.label}>
            <div className={styles.stepHeading}>
              <span className={styles.label}>{step.label}</span>
              <strong>{step.hours} h</strong>
            </div>
            <span className={styles.meter} aria-hidden="true">
              <span style={{ width: `${(step.hours / 48) * 100}%` }} />
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

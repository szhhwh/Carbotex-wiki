import styles from "./experiment-widgets.module.css";

export interface ExperimentStep {
  title: string;
  detail?: string;
}

export function StepSequence({
  label,
  steps,
}: {
  label: string;
  steps: ExperimentStep[];
}) {
  return (
    <section className={`${styles.widget} ${styles.steps}`} aria-label={label}>
      <ol className={styles.stepList}>
        {steps.map((step, index) => (
          <li key={`${step.title}-${index}`}>
            <span className={styles.stepNumber} aria-hidden="true">
              {index + 1}
            </span>
            <div className={styles.stepBody}>
              <strong>{step.title}</strong>
              {step.detail ? <p>{step.detail}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

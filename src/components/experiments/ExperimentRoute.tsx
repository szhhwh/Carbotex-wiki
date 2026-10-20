import { useId } from "react";
import styles from "./experiment-widgets.module.css";

export interface ExperimentQuestion {
  title: string;
  detail: string;
}

export interface ExperimentModule {
  number: string;
  title: string;
}

export function ExperimentRoute({
  questions,
  modules,
}: {
  questions: ExperimentQuestion[];
  modules: ExperimentModule[];
}) {
  const headingId = useId();

  return (
    <section
      className={`${styles.widget} ${styles.route}`}
      aria-labelledby={headingId}
    >
      <div className={styles.routeHeader}>
        <div>
          <span className={styles.eyebrow}>Experimental route</span>
          <h3 className={styles.widgetTitle} id={headingId}>
            Four questions, one connected workflow
          </h3>
        </div>
        <p>
          The modules progress from strain preparation and feedstock
          conditioning to xylose and PYC engineering, product measurement, and
          adhesive evaluation.
        </p>
      </div>
      <ol className={styles.questionList}>
        {questions.map((question, index) => (
          <li key={question.title}>
            <span className={styles.questionNumber}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <strong>{question.title}</strong>
            <p>{question.detail}</p>
          </li>
        ))}
      </ol>
      <ol className={styles.moduleRail} aria-label="Experiment modules">
        {modules.map((module) => (
          <li key={module.number}>
            <span>{module.number}</span>
            <strong>{module.title}</strong>
          </li>
        ))}
      </ol>
    </section>
  );
}

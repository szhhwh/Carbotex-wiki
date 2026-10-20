import { useId } from "react";
import styles from "./experiment-widgets.module.css";

export interface FeedRatio {
  label: string;
  value: string;
}

export interface ReactionStep {
  duration: string;
  detail: string;
}

export function ReactionSchedule({
  ratios,
  steps,
}: {
  ratios: FeedRatio[];
  steps: ReactionStep[];
}) {
  const headingId = useId();

  return (
    <section
      className={`${styles.widget} ${styles.reaction}`}
      aria-labelledby={headingId}
    >
      <div className={styles.feed}>
        <h4 className={styles.widgetTitle} id={headingId}>
          Molar feed and reaction schedule
        </h4>
        <dl className={styles.feedList}>
          {ratios.map((ratio) => (
            <div key={ratio.label}>
              <dt>{ratio.label}</dt>
              <dd>{ratio.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <ol className={styles.reactionSteps} aria-label="Preparation steps">
        {steps.map((step, index) => (
          <li key={`${step.duration}-${index}`}>
            <strong>{step.duration}</strong>
            <span>{step.detail}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

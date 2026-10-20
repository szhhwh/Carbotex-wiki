import { RotateCcw } from "lucide-react";
import { useState } from "react";
import styles from "./sdg-flip-cards.module.css";

const CARDS = [
  {
    goal: "9",
    title: "Industry, innovation and infrastructure",
    focus: "The pathway from laboratory innovation to reliable production.",
    front:
      "What would it take to move beyond a successful experiment toward reproducible production?",
    question:
      "Which process controls, evidence records, and validation steps would make the pathway reliable?",
  },
  {
    goal: "12",
    title: "Responsible consumption and production",
    focus: "Process inputs and resource use.",
    front: "Which inputs and downstream steps dominate the material pathway?",
    question:
      "How can coupling reagents, water, dialysis, drying, and material recovery be used more deliberately?",
  },
  {
    goal: "13",
    title: "Climate action",
    focus:
      "Environmental motivation is not the same as a verified environmental benefit.",
    front:
      "What evidence would show that renewable carbon leads to a better process?",
    question:
      "Which resource inputs, emissions, and trade-offs would a future life-cycle assessment need to measure?",
  },
];

export function SdgFlipCards() {
  const [flipped, setFlipped] = useState<Set<number>>(() => new Set());

  const toggle = (index: number) => {
    setFlipped((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <section className={styles.wrapper} aria-label="Three SDG lenses">
      <div className={styles.cards}>
        {CARDS.map((card, index) => {
          const isFlipped = flipped.has(index);
          return (
            <article
              className={styles.card}
              data-flipped={isFlipped ? "true" : "false"}
              key={card.goal}
            >
              <button
                type="button"
                className={styles.flipButton}
                aria-pressed={isFlipped}
                aria-label={`SDG ${card.goal}: ${card.title}. ${
                  isFlipped ? card.question : card.front
                } ${isFlipped ? "Show context" : "Reveal the evaluation question"}.`}
                onClick={() => toggle(index)}
              >
                <span className={styles.inner}>
                  <span className={styles.face} aria-hidden={isFlipped}>
                    <span className={styles.goal}>{card.goal}</span>
                    <span className={styles.title}>{card.title}</span>
                    <span className={styles.focus}>{card.focus}</span>
                    <span className={styles.prompt}>{card.front}</span>
                    <span className={styles.action}>Reveal the question</span>
                  </span>
                  <span
                    className={`${styles.face} ${styles.back}`}
                    aria-hidden={!isFlipped}
                  >
                    <span className={styles.backLabel}>
                      Evaluation question
                    </span>
                    <span className={styles.question}>{card.question}</span>
                    <span className={styles.action}>
                      <RotateCcw size={14} aria-hidden="true" />
                      Return
                    </span>
                  </span>
                </span>
              </button>
            </article>
          );
        })}
      </div>
      <p className={styles.note}>
        These cards use SDGs 9, 12, and 13 as evaluation questions, not as
        claims of verified impact. See the{" "}
        <a href="https://sdgs.un.org/goals">
          United Nations Sustainable Development Goals
        </a>
        .
      </p>
    </section>
  );
}

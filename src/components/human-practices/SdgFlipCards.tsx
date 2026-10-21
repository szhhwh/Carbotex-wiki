import { RotateCcw } from "lucide-react";
import { useState } from "react";
import styles from "./sdg-flip-cards.module.css";

const CARDS = [
  {
    goal: "9",
    title: "Industry, Innovation and Infrastructure",
    icon: "https://static.igem.wiki/teams/6147/wiki/sdg-9-icon.avif",
    iconAlt: "SDG 9: Industry, Innovation and Infrastructure",
    focus: "Promotes sustainable industrial development and innovation.",
    front:
      "Our PMA production research explores biological innovation, while future manufacturing requires stable and scalable processes.",
    question:
      "How can laboratory achievements become reliable manufacturing processes?",
  },
  {
    goal: "12",
    title: "Responsible Consumption and Production",
    icon: "https://static.igem.wiki/teams/6147/wiki/sdg-12-icon.avif",
    iconAlt: "SDG 12: Responsible Consumption and Production",
    focus: "Encourages responsible resource use and sustainable production.",
    front:
      "Using straw-derived carbon creates opportunities, but chemical reagents, water, energy, and downstream processing must also be considered.",
    question:
      "How can we reduce resource consumption and unnecessary waste throughout production?",
  },
  {
    goal: "13",
    title: "Climate Action",
    icon: "https://static.igem.wiki/teams/6147/wiki/sdg-13-icon.avif",
    iconAlt: "SDG 13: Climate Action",
    focus: "Calls for action to address climate change and its impacts.",
    front:
      "Renewable carbon motivates our project, but lower emissions cannot be assumed without examining the full production pathway.",
    question:
      "What life-cycle evidence is needed to evaluate potential climate benefits?",
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
                } ${isFlipped ? "Show overview" : "Reveal details"}.`}
                onClick={() => toggle(index)}
              >
                <span className={styles.inner}>
                  <span
                    className={`${styles.face} ${styles.front}`}
                    aria-hidden={isFlipped}
                  >
                    <img
                      className={styles.frontIcon}
                      src={card.icon}
                      alt={card.iconAlt}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className={styles.action}>Reveal details</span>
                  </span>
                  <span
                    className={`${styles.face} ${styles.back}`}
                    aria-hidden={!isFlipped}
                  >
                    <span className={styles.backLabel}>SDG {card.goal}</span>
                    <span className={styles.backTitle}>{card.title}</span>
                    <span className={styles.focus}>{card.focus}</span>
                    <span className={styles.backField}>
                      <span className={styles.backFieldLabel}>
                        Connection to Carbotex
                      </span>
                      <span className={styles.prompt}>{card.front}</span>
                    </span>
                    <span className={styles.backField}>
                      <span className={styles.backFieldLabel}>
                        Our Question
                      </span>
                      <span className={styles.question}>{card.question}</span>
                    </span>
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
        <em>
          SDG icons and information:{" "}
          <strong>
            <a href="https://www.un.org/sustainabledevelopment">
              United Nations Sustainable Development Goals ↗
            </a>
          </strong>
          . See the{" "}
          <strong>
            <a href="https://www.un.org/sustainabledevelopment/wp-content/uploads/2023/09/E_SDG_Guidelines_Sep20238.pdf">
              UN SDG Icon Guidelines ↗
            </a>
          </strong>
          .
        </em>
      </p>
    </section>
  );
}

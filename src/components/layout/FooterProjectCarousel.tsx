import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  FOOTER_CARD_OFFSETS,
  footerCards,
  getFooterCardIndex,
} from "./footer-data";
import { useProjectCarousel } from "./useProjectCarousel";
import styles from "./footer.module.css";

const getVisibleCardCount = (
  mobile = window.matchMedia("(max-width: 650px)"),
  tablet = window.matchMedia("(max-width: 1100px)"),
) => {
  return mobile.matches ? 1 : tablet.matches ? 2 : 3;
};

function useVisibleCardCount() {
  const [visibleCount, setVisibleCount] = useState(getVisibleCardCount);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 650px)");
    const tablet = window.matchMedia("(max-width: 1100px)");
    const update = () => setVisibleCount(getVisibleCardCount(mobile, tablet));
    mobile.addEventListener("change", update);
    tablet.addEventListener("change", update);
    return () => {
      mobile.removeEventListener("change", update);
      tablet.removeEventListener("change", update);
    };
  }, []);

  return visibleCount;
}

export function FooterProjectCarousel() {
  const { rootRef, trackRef, index, manualMoving, autoRunning, move } =
    useProjectCarousel(footerCards.length);
  const visibleCount = useVisibleCardCount();

  return (
    <section
      ref={rootRef}
      className={styles.explore}
      aria-labelledby="footer-explore-heading"
    >
      <div className={styles.heading}>
        <h2 id="footer-explore-heading">Explore our project</h2>
        <div className={styles.controls}>
          <button
            type="button"
            aria-label="Previous project cards"
            aria-controls="footer-project-carousel"
            aria-disabled={manualMoving}
            onClick={() => move(-1)}
          >
            <ArrowLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next project cards"
            aria-controls="footer-project-carousel"
            aria-disabled={manualMoving}
            onClick={() => move(1)}
          >
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>
      <div
        id="footer-project-carousel"
        className={styles.viewport}
        data-lenis-prevent-wheel
        role="region"
        aria-roledescription="carousel"
        aria-label="Project stories"
      >
        <div ref={trackRef} className={styles.track}>
          {FOOTER_CARD_OFFSETS.map((offset) => {
            const cardIndex = getFooterCardIndex(index + offset);
            const card = footerCards[cardIndex];
            const Icon = card.icon;
            const exposed = offset >= -1 && offset <= visibleCount;
            return (
              <Link
                key={offset}
                to={card.path}
                className={styles.card}
                data-tone={cardIndex % 3}
                tabIndex={offset >= 0 && offset < visibleCount ? 0 : -1}
                aria-hidden={!exposed || undefined}
                inert={!exposed}
                aria-label={`${card.title} ${card.page}`}
              >
                <div className={styles.cardTop}>
                  <span>{card.group}</span>
                  <ArrowRight className={styles.cardArrow} aria-hidden="true" />
                </div>
                <div className={styles.illustration}>
                  <Icon aria-hidden="true" strokeWidth={1.35} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </Link>
            );
          })}
        </div>
      </div>
      <span
        className={styles.srOnly}
        role="status"
        aria-live={autoRunning ? "off" : "polite"}
      >
        Project card {index + 1} of {footerCards.length}:{" "}
        {footerCards[index].title}
      </span>
    </section>
  );
}

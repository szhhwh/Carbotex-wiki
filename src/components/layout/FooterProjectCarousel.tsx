import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  FOOTER_CARD_OFFSETS,
  type FooterCard,
  footerCards,
  getFooterCardIndex,
} from "./footer.data";
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

function FooterCardContent({ card }: { card: FooterCard }) {
  const Icon = card.icon;

  return (
    <>
      <div className={styles.cardTop}>
        <span className={styles.cardPage}>{card.page}</span>
      </div>
      <div className={styles.illustration}>
        <Icon aria-hidden="true" strokeWidth={1.35} />
      </div>
      <h3>{card.title}</h3>
      <p>{card.copy}</p>
      <span className={styles.cardAction} aria-hidden="true">
        <ArrowUpRight />
      </span>
    </>
  );
}

export function FooterProjectCarousel() {
  const {
    rootRef,
    trackRef,
    index,
    manualMoving,
    autoRunning,
    autoPaused,
    motionReduced,
    move,
    toggleAuto,
    resumeAuto,
  } = useProjectCarousel(footerCards.length);
  const visibleCount = useVisibleCardCount();
  const { pathname } = useLocation();
  // The router has already stripped the deployment base from `pathname`.
  const isHome = pathname === "/";

  // A pause chosen on an inner page must not alter the home carousel.
  useEffect(() => {
    if (isHome) resumeAuto();
  }, [isHome, resumeAuto]);

  return (
    <section
      ref={rootRef}
      className={styles.explore}
      aria-labelledby="footer-explore-heading"
    >
      <div className={styles.heading}>
        <h2 id="footer-explore-heading">Explore our project</h2>
        <div className={styles.controls}>
          {!isHome && (
            <button
              type="button"
              aria-label={
                motionReduced
                  ? "Automatic rotation disabled because reduced motion is enabled"
                  : autoPaused
                    ? "Resume automatic project card rotation"
                    : "Pause automatic project card rotation"
              }
              aria-pressed={autoPaused}
              data-auto-rotation-control
              disabled={motionReduced}
              onClick={toggleAuto}
            >
              {autoPaused ? (
                <Play aria-hidden="true" />
              ) : (
                <Pause aria-hidden="true" />
              )}
            </button>
          )}
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
                aria-label={`Explore ${card.page}: ${card.title}`}
              >
                <FooterCardContent card={card} />
              </Link>
            );
          })}
        </div>
        <div className={styles.measure} aria-hidden="true">
          {footerCards.map((card, cardIndex) => (
            <div
              className={styles.card}
              data-tone={cardIndex % 3}
              key={card.path}
            >
              <FooterCardContent card={card} />
            </div>
          ))}
        </div>
      </div>
      <span
        className="visually-hidden"
        role="status"
        aria-live={autoRunning ? "off" : "polite"}
      >
        Project card {index + 1} of {footerCards.length}:{" "}
        {footerCards[index].title}
      </span>
    </section>
  );
}

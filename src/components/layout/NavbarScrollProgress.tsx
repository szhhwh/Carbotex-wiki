import { useEffect, useRef } from "react";
import { NavbarArtwork } from "./NavbarArtwork";
import styles from "./navbar-scroll-progress.module.css";

const getScrollProgress = () => {
  const scrollableHeight = Math.max(
    document.documentElement.scrollHeight - window.innerHeight,
    0,
  );

  if (scrollableHeight === 0) return 0;

  return Math.min(Math.max(window.scrollY / scrollableHeight, 0), 1);
};

export function NavbarScrollProgress() {
  const fillRef = useRef<HTMLSpanElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fill = fillRef.current;
    const marker = markerRef.current;
    if (!fill || !marker) return;

    let frame = 0;

    const updatePosition = () => {
      frame = 0;

      const track = marker.closest("header");
      const trackWidth = track?.clientWidth ?? window.innerWidth;
      const travelDistance = Math.max(
        trackWidth - marker.offsetLeft - marker.offsetWidth,
        0,
      );
      const travel = getScrollProgress() * travelDistance;
      const markerCenter = marker.offsetLeft + marker.offsetWidth / 2 + travel;

      marker.style.setProperty("--nav-progress-distance", `${travel}px`);
      fill.style.setProperty("--nav-progress-fill", `${markerCenter}px`);
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updatePosition);
    };

    updatePosition();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(document.documentElement);
    resizeObserver.observe(document.body);
    void document.fonts.ready.then(scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <>
      <span
        ref={fillRef}
        className={styles.fill}
        data-nav-progress-fill
        aria-hidden="true"
      />
      <span
        ref={markerRef}
        className={styles.marker}
        data-nav-scroll-marker
        aria-hidden="true"
      >
        <NavbarArtwork className={styles.artwork} />
      </span>
    </>
  );
}

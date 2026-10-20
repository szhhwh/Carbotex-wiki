import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import clsx from "clsx";
import { Caption } from "./Caption";
import { Figure } from "./Figure";
import type { MediaImage } from "./MediaImage";
import styles from "./image-gallery.module.css";

export interface ImageGalleryProps {
  images: MediaImage[];
  /** Accessible name for the complete evidence set. */
  label: string;
  layout?: "grid" | "strip";
  columns?: 2 | 3 | 4;
  /** Grid galleries stack on mobile by default; strips always scroll. */
  mobileLayout?: "stack" | "swipe";
  /** Optional common display ratio; contain preserves the complete image. */
  ratio?: string;
  captionPrefix?: ReactNode;
  caption?: ReactNode;
  id?: string;
  className?: string;
}

export function ImageGallery({
  images,
  label,
  layout = "grid",
  columns = 2,
  mobileLayout = "stack",
  ratio,
  captionPrefix,
  caption,
  id,
  className,
}: ImageGalleryProps) {
  const generatedId = useId();
  const trackId = `${id ?? generatedId}-track`;
  const scrollHintId = `${id ?? generatedId}-scroll-hint`;
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState({
    overflow: false,
    start: true,
    end: true,
  });
  const scrollable = layout === "strip" || mobileLayout === "swipe";

  const updateScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const remaining = track.scrollWidth - track.clientWidth;
    const next = {
      overflow: remaining > 2,
      start: track.scrollLeft <= 2,
      end: track.scrollLeft >= remaining - 2,
    };
    setScrollState((previous) =>
      previous.overflow === next.overflow &&
      previous.start === next.start &&
      previous.end === next.end
        ? previous
        : next,
    );
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateScroll();
    const observer = new ResizeObserver(updateScroll);
    observer.observe(track);
    Array.from(track.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [images.length, layout, mobileLayout, columns]);

  const move = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({
      left: direction * track.clientWidth * 0.85,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (
      event.target !== event.currentTarget ||
      !scrollState.overflow ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey
    )
      return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      move(event.key === "ArrowRight" ? 1 : -1);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      trackRef.current?.scrollTo({
        left: event.key === "Home" ? 0 : trackRef.current.scrollWidth,
        behavior: "instant",
      });
    }
  };

  if (images.length === 0) return null;

  return (
    <div
      id={id}
      className={clsx(styles.gallery, className)}
      role="group"
      aria-label={label}
      data-layout={layout}
      data-mobile-layout={mobileLayout}
      style={{ "--gallery-columns": columns } as CSSProperties}
    >
      <div
        className={styles.track}
        id={trackId}
        ref={trackRef}
        tabIndex={scrollable ? 0 : undefined}
        role={scrollable ? "group" : undefined}
        aria-label={scrollable ? `${label}: scrollable images` : undefined}
        aria-describedby={scrollState.overflow ? scrollHintId : undefined}
        onScroll={updateScroll}
        onKeyDown={onKeyDown}
      >
        {images.map((image, index) => {
          const figure: MediaImage = ratio ? { ...image, ratio } : image;
          return (
            <Figure
              {...figure}
              key={image.id ?? `${index}-${image.src}`}
              className={clsx(styles.item, image.className)}
              mediaClassName={clsx(styles.frame, image.mediaClassName)}
              mediaSurface="gallery"
              fallback={image.fallback ?? "Image unavailable."}
            />
          );
        })}
      </div>
      {scrollState.overflow && (
        <div className={styles.controls}>
          <span id={scrollHintId}>Scroll to explore</span>
          <button
            type="button"
            aria-label={`Scroll ${label} backward`}
            aria-controls={trackId}
            disabled={scrollState.start}
            onClick={() => move(-1)}
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={`Scroll ${label} forward`}
            aria-controls={trackId}
            disabled={scrollState.end}
            onClick={() => move(1)}
          >
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      )}
      <Caption as="div" className={styles.caption} prefix={captionPrefix}>
        {caption}
      </Caption>
    </div>
  );
}

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import gsap from "gsap";
import clsx from "clsx";
import { Caption } from "./Caption";
import { Figure } from "./Figure";
import type { MediaImage } from "./MediaImage";
import styles from "./image-carousel.module.css";

export interface ImageCarouselProps {
  images: MediaImage[];
  label: string;
  autoPlay?: boolean;
  /** Milliseconds per slide, clamped to at least five seconds. */
  interval?: number;
  loop?: boolean;
  /** One frame ratio for the entire set keeps mixed-size images stable. */
  ratio?: string;
  captionPrefix?: ReactNode;
  caption?: ReactNode;
  id?: string;
  className?: string;
}

export function ImageCarousel({
  images,
  label,
  autoPlay = true,
  interval = 5000,
  loop = true,
  ratio = "4 / 3",
  captionPrefix,
  caption,
  id,
  className,
}: ImageCarouselProps) {
  const generatedId = useId();
  const carouselId = id ?? `carousel-${generatedId}`;
  const rootRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const gesture = useRef<{
    id: number;
    x: number;
    y: number;
    dragging: boolean;
  } | null>(null);
  const suppressClick = useRef(false);
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [rotationEnabled, setRotationEnabled] = useState(
    () => autoPlay && !reducedMotion,
  );
  const [hovered, setHovered] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(
    () => document.visibilityState === "visible",
  );
  const [previewOpen, setPreviewOpen] = useState(false);
  const [touching, setTouching] = useState(false);
  const count = images.length;
  const hasImages = count > 0;
  const current = Math.min(index, Math.max(0, count - 1));
  const atEnd = !loop && current === count - 1;
  const rotating =
    count > 1 &&
    rotationEnabled &&
    !focusPaused &&
    !hovered &&
    !previewOpen &&
    !touching &&
    inView &&
    pageVisible &&
    !atEnd;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onPreference = () => {
      setReducedMotion(preference.matches);
      if (preference.matches) setRotationEnabled(false);
    };
    const onVisibility = () =>
      setPageVisible(document.visibilityState === "visible");
    preference.addEventListener("change", onPreference);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      preference.removeEventListener("change", onPreference);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [hasImages]);

  useEffect(() => {
    if (!rotating) return;
    const delay = Number.isFinite(interval) ? Math.max(5000, interval) : 5000;
    const timer = window.setTimeout(() => {
      setIndex((previous) => {
        const next = Math.min(previous, count - 1) + 1;
        return loop ? next % count : Math.min(next, count - 1);
      });
    }, delay);
    return () => window.clearTimeout(timer);
  }, [rotating, interval, count, loop, current]);

  useEffect(() => {
    const slide = slidesRef.current?.children[current];
    if (!slide || reducedMotion) return;
    const animation = gsap.context(() => {
      gsap.fromTo(slide, { opacity: 0 }, { opacity: 1, duration: 0.28 });
    });
    return () => animation.revert();
  }, [current, reducedMotion]);

  const moveTo = (next: number) =>
    setIndex(
      loop
        ? ((next % count) + count) % count
        : Math.max(0, Math.min(next, count - 1)),
    );

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (
      count < 2 ||
      previewOpen ||
      event.defaultPrevented ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      target.closest("a, input, textarea, select, [contenteditable=true]")
    )
      return;
    const next =
      event.key === "ArrowRight"
        ? current + 1
        : event.key === "ArrowLeft"
          ? current - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? count - 1
              : undefined;
    if (next === undefined) return;
    event.preventDefault();
    setRotationEnabled(false);
    moveTo(next);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (
      previewOpen ||
      event.pointerType === "mouse" ||
      !event.isPrimary ||
      count < 2
    )
      return;
    suppressClick.current = false;
    gesture.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      dragging: false,
    };
    setTouching(true);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const start = gesture.current;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (!start.dragging && Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy)) {
      start.dragging = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  };

  const onPointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    const start = gesture.current;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (start.dragging) {
      suppressClick.current = true;
      if (
        event.type === "pointerup" &&
        Math.abs(dx) >= 50 &&
        Math.abs(dx) > Math.abs(dy)
      ) {
        setRotationEnabled(false);
        moveTo(current + (dx < 0 ? 1 : -1));
      }
    }
    gesture.current = null;
    setTouching(false);
  };

  if (count === 0) return null;

  return (
    <div
      className={clsx(styles.carousel, className)}
      id={carouselId}
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      aria-describedby={`${carouselId}-help`}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onFocusCapture={(event) => {
        setFocusPaused(true);
        if (!(event.target as HTMLElement).closest("[data-rotation-control]"))
          setRotationEnabled(false);
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          setFocusPaused(false);
      }}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setHovered(false);
      }}
      data-playing={rotating}
    >
      {count > 1 && (
        <div className={styles.toolbar}>
          <span className={styles.label}>{label}</span>
          <button
            type="button"
            className={styles.rotation}
            data-rotation-control
            aria-label={
              rotationEnabled && !atEnd ? "Pause slideshow" : "Start slideshow"
            }
            onClick={() => {
              if (rotationEnabled && !atEnd) setRotationEnabled(false);
              else {
                if (atEnd) moveTo(0);
                setRotationEnabled(true);
                setFocusPaused(false);
              }
            }}
          >
            {rotationEnabled && !atEnd ? (
              <Pause size={15} aria-hidden="true" />
            ) : (
              <Play size={15} aria-hidden="true" />
            )}
            {rotationEnabled && !atEnd ? "Pause" : "Play"}
          </button>
        </div>
      )}
      <div
        id={`${carouselId}-slides`}
        className={styles.slides}
        ref={slidesRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onClickCapture={(event) => {
          if (!suppressClick.current) return;
          suppressClick.current = false;
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        {images.map((image, slideIndex) => (
          <div
            key={image.id ?? `${slideIndex}-${image.src}`}
            id={`${carouselId}-slide-${slideIndex + 1}`}
            className={styles.slide}
            data-active={slideIndex === current}
            role="group"
            aria-roledescription="slide"
            aria-label={`${slideIndex + 1} of ${count}`}
            aria-hidden={slideIndex !== current}
            inert={slideIndex !== current}
          >
            <Figure
              {...image}
              ratio={ratio}
              className={clsx(styles.figure, image.className)}
              mediaClassName={clsx(styles.frame, image.mediaClassName)}
              mediaSurface="carousel"
              fallback={image.fallback ?? "Image unavailable."}
              onPreviewChange={setPreviewOpen}
            />
          </div>
        ))}
      </div>
      {count > 1 && (
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Previous slide"
            aria-controls={`${carouselId}-slides`}
            disabled={!loop && current === 0}
            onClick={() => moveTo(current - 1)}
          >
            <ArrowLeft size={19} aria-hidden="true" />
          </button>
          <div
            className={styles.pagination}
            role="group"
            aria-label="Choose slide"
          >
            {images.map((image, slideIndex) => (
              <button
                key={image.id ?? `${slideIndex}-${image.src}`}
                type="button"
                className={styles.dot}
                aria-label={`Show slide ${slideIndex + 1} of ${count}`}
                aria-controls={`${carouselId}-slide-${slideIndex + 1}`}
                aria-current={slideIndex === current ? "true" : undefined}
                onClick={() => moveTo(slideIndex)}
              >
                <span />
              </button>
            ))}
          </div>
          <button
            type="button"
            className={styles.arrow}
            aria-label="Next slide"
            aria-controls={`${carouselId}-slides`}
            disabled={atEnd}
            onClick={() => moveTo(current + 1)}
          >
            <ArrowRight size={19} aria-hidden="true" />
          </button>
        </div>
      )}
      <div className={styles.footer}>
        <span
          className={styles.count}
          aria-live={rotating ? "off" : "polite"}
          aria-atomic="true"
        >
          {current + 1} / {count}
        </span>
        <span id={`${carouselId}-help`} className={styles.help}>
          {count > 1
            ? "Use arrow keys or swipe to explore. Select an image to enlarge."
            : "Select the image to enlarge."}
        </span>
      </div>
      <Caption as="div" className={styles.caption} prefix={captionPrefix}>
        {caption}
      </Caption>
    </div>
  );
}

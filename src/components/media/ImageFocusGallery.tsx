import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import clsx from "clsx";
import { Caption } from "./Caption";
import { ImageViewer } from "./ImageViewer";
import type { MediaImage } from "./MediaImage";
import styles from "./image-focus-gallery.module.css";

export interface ImageFocusGalleryProps {
  images: MediaImage[];
  /** Accessible name for the complete image set. */
  label: string;
  /** Caption for the complete set, rendered through the shared Caption. */
  caption?: ReactNode;
  /** Prefix slot, e.g. `Figure 5.` */
  captionPrefix?: ReactNode;
  /** Show each image's caption when the gallery has no set-level caption. */
  showSlideCaptions?: boolean;
  id?: string;
  className?: string;
}

type Position = "center" | "left" | "right" | "hidden";

/** Reads a numeric width / height from the shared MediaImage dimensions. */
function readRatio(image: MediaImage): number {
  const match = image.ratio?.match(/^\s*([\d.]+)\s*\/\s*([\d.]+)\s*$/);
  if (match) return Number(match[1]) / Number(match[2]);
  if (image.intrinsicWidth && image.intrinsicHeight)
    return image.intrinsicWidth / image.intrinsicHeight;
  return 4 / 3;
}

/** Signed, wrapped distance from the centre image: -1 is the left neighbour. */
function relativeOffset(index: number, current: number, count: number) {
  let offset = index - current;
  if (offset > count / 2) offset -= count;
  else if (offset < -count / 2) offset += count;
  return offset;
}

function positionOf(offset: number): Position {
  if (offset === 0) return "center";
  if (offset === -1) return "left";
  if (offset === 1) return "right";
  return "hidden";
}

/**
 * Focus (coverflow) gallery after the Heidelberg 2025 education page: the
 * selected image sits enlarged in the middle, its neighbours are smaller and
 * faded. Selecting a neighbour moves it to the middle; selecting the middle
 * image opens the shared ImageViewer.
 */
export function ImageFocusGallery({
  images,
  label,
  caption,
  captionPrefix,
  showSlideCaptions = true,
  id,
  className,
}: ImageFocusGalleryProps) {
  const generatedId = useId();
  const stageId = `${id ?? generatedId.replace(/:/g, "")}-stage`;
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const focusAfterMove = useRef(false);
  const [current, setCurrent] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const [preview, setPreview] = useState<{ src: string; alt: string } | null>(
    null,
  );
  const count = images.length;
  const active = Math.min(current, Math.max(0, count - 1));
  // Set-level captions always render; per-slide notes are opt-in.
  const activeCaption = showSlideCaptions
    ? (caption ?? images[active]?.caption)
    : caption;

  useEffect(() => {
    if (!focusAfterMove.current) return;
    focusAfterMove.current = false;
    buttons.current[active]?.focus();
  }, [active]);

  if (count === 0) return null;

  const moveTo = (next: number) => setCurrent(((next % count) + count) % count);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (count < 2 || preview || event.altKey || event.ctrlKey || event.metaKey)
      return;
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    focusAfterMove.current = true;
    moveTo(active + (event.key === "ArrowRight" ? 1 : -1));
  };

  return (
    <div
      id={id}
      className={clsx(styles.gallery, className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={onKeyDown}
      onPointerEnter={() => setEngaged(true)}
      onFocusCapture={() => setEngaged(true)}
      onTouchStart={() => setEngaged(true)}
    >
      <div className={styles.stage} id={stageId}>
        {images.map((image, index) => {
          const offset = relativeOffset(index, active, count);
          const position = positionOf(offset);
          const center = position === "center";
          return (
            <div
              key={image.id ?? `${index}-${image.src}`}
              className={styles.item}
              data-position={position}
              style={
                {
                  "--focus-offset": Math.max(-2, Math.min(2, offset)),
                  "--focus-ratio": readRatio(image),
                } as CSSProperties
              }
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}`}
              aria-hidden={position === "hidden" || undefined}
              inert={position === "hidden"}
            >
              <button
                type="button"
                ref={(element) => {
                  buttons.current[index] = element;
                }}
                className={styles.hit}
                data-focus-slide
                tabIndex={center ? 0 : -1}
                aria-label={
                  center
                    ? `Enlarge image: ${image.alt}`
                    : `Show image ${index + 1} of ${count}: ${image.alt}`
                }
                aria-haspopup={center ? "dialog" : undefined}
                onClick={(event) => {
                  if (!center) return moveTo(index);
                  const img = event.currentTarget.querySelector("img");
                  setPreview({
                    src: img?.currentSrc || image.src,
                    alt: image.alt,
                  });
                }}
              >
                <img
                  className={styles.image}
                  src={image.src}
                  alt={image.alt}
                  width={image.intrinsicWidth}
                  height={image.intrinsicHeight}
                  // Clipped slides never intersect the viewport, so preload
                  // the nearest ones once the reader engages.
                  loading={engaged && Math.abs(offset) <= 2 ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                />
              </button>
            </div>
          );
        })}
      </div>
      <Caption as="div" prefix={captionPrefix}>
        {activeCaption}
      </Caption>
      {preview && (
        <ImageViewer
          src={preview.src}
          alt={preview.alt}
          onClose={() => setPreview(null)}
        />
      )}
    </div>
  );
}

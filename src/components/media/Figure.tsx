/**
 * Figure — image + caption skeleton.
 *
 * Semantics: renders a real <figure>/<figcaption> pair so captions are
 * announced by screen readers and the whole thing is linkable via `id`
 * (`<a href="#fig-1">see Fig. 1</a>`).
 *
 * Images are expected to live on static.igem.wiki (project rule: no external
 * CDNs) — but any URL works, so placeholders during drafting are fine too.
 */
import {
  useEffect,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
  type SyntheticEvent,
} from "react";
import clsx from "clsx";
import { Caption } from "./Caption";
import { ImageViewer } from "./ImageViewer";
import { Maximize2 } from "lucide-react";
import styles from "./figure.module.css";

/** One <source> entry for responsive / art-directed images (renders inside <picture>). */
export interface FigureSource {
  srcSet: string;
  /** Native dimensions reserve the selected responsive source before it loads. */
  intrinsicWidth: number;
  intrinsicHeight: number;
  media?: string;
  type?: string;
}

interface FigureBaseProps {
  /** Image URL (static.igem.wiki in production). */
  src: string;
  /** Required image description for screen readers. */
  alt: string;
  /** Caption content shown below the image; supports rich ReactNode. */
  caption?: ReactNode;
  /** Prefix slot in the caption, e.g. `Figure 1.` — styled separately for consistent numbering. */
  captionPrefix?: ReactNode;
  /** Responsive <source> list; when present the <img> is wrapped in <picture>. */
  sources?: FigureSource[];
  /** Fixed width for the figure box (default: fill parent up to `maxWidth`). */
  width?: CSSProperties["width"];
  maxWidth?: CSSProperties["maxWidth"];
  /** Limit the media preview height; use contain to keep the full image visible. */
  maxHeight?: CSSProperties["maxHeight"];
  /** Horizontal alignment inside the parent (default "center"). */
  align?: "start" | "center" | "end";
  /** Use "none" to place the media directly in prose without the article frame. */
  frame?: "article" | "none";
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  loading?: "lazy" | "eager";
  decoding?: "async" | "sync" | "auto";
  /** Anchor / reference target, e.g. "fig-binding-model". */
  id?: string;
  className?: string;
  mediaClassName?: string;
  captionClassName?: string;
  style?: CSSProperties;
  /** Replacement content when the image fails to load (e.g. migration-safe placeholder). */
  fallback?: ReactNode;
  onError?: (event: SyntheticEvent<HTMLImageElement, Event>) => void;
  /** Lets a containing slideshow pause while the image viewer is open. */
  onPreviewChange?: (open: boolean) => void;
  /** Tells the shared article shell which component owns the media chrome. */
  mediaSurface?: "figure" | "gallery" | "carousel";
}

/** Supply real native dimensions or an intentional, fixed display ratio. */
export type FigureProps = FigureBaseProps &
  (
    | {
        intrinsicWidth: number;
        intrinsicHeight: number;
        ratio?: string;
      }
    | {
        ratio: string;
        intrinsicWidth?: never;
        intrinsicHeight?: never;
      }
  );

export function Figure({
  src,
  alt,
  caption,
  captionPrefix,
  sources,
  ratio,
  intrinsicWidth,
  intrinsicHeight,
  width,
  maxWidth,
  maxHeight,
  align = "center",
  frame = "article",
  objectFit = "contain",
  loading = "lazy",
  decoding = "async",
  id,
  className,
  mediaClassName,
  captionClassName,
  style,
  fallback,
  onError,
  onPreviewChange,
  mediaSurface = "figure",
}: FigureProps) {
  const [failed, setFailed] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const nativeRatio = `${intrinsicWidth} / ${intrinsicHeight}`;
  // Match art-directed source dimensions before any image request completes.
  // Format alternatives at the same breakpoint should share the same crop.
  const readRatio = () => {
    if (ratio) return ratio;
    const source = sources?.find(
      (candidate) =>
        !candidate.media || window.matchMedia(candidate.media).matches,
    );
    return source
      ? `${source.intrinsicWidth} / ${source.intrinsicHeight}`
      : nativeRatio;
  };
  const reservedRatio = useSyncExternalStore(
    (notify) => {
      const queries = sources
        ?.filter((source) => source.media)
        .map((source) => window.matchMedia(source.media!));
      queries?.forEach((query) => query.addEventListener("change", notify));
      return () => {
        queries?.forEach((query) =>
          query.removeEventListener("change", notify),
        );
      };
    },
    readRatio,
    () => ratio ?? nativeRatio,
  );

  // A failed load must not poison the component across src swaps (tabbed
  // figures, galleries) — reset and retry with the new URL.
  useEffect(() => {
    setFailed(false);
    setPreviewSrc(null);
  }, [src]);

  useEffect(() => {
    if (!previewSrc) return;
    onPreviewChange?.(true);
    return () => onPreviewChange?.(false);
  }, [previewSrc, onPreviewChange]);

  const handleError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    setFailed(true);
    onError?.(event);
  };

  const image = (
    <img
      className={styles.image}
      style={{ objectFit }}
      src={src}
      alt={alt}
      width={intrinsicWidth}
      height={intrinsicHeight}
      loading={loading}
      decoding={decoding}
      onLoad={() => setFailed(false)}
      onError={handleError}
      // Keep the same image box on failure: removing it would shift the page.
      aria-hidden={failed && fallback !== undefined ? true : undefined}
      data-failed={failed && fallback !== undefined ? "true" : undefined}
    />
  );

  return (
    <figure
      id={id}
      className={clsx(styles.figure, styles[align], className)}
      style={{ width, maxWidth, ...style }}
      data-media-surface={mediaSurface}
      data-media-kind="image"
      data-media-frame={frame}
    >
      <div
        className={clsx(styles.media, mediaClassName)}
        style={{ aspectRatio: reservedRatio, maxHeight }}
        data-media-surface={mediaSurface}
        data-media-kind="image"
      >
        {sources && sources.length > 0 ? (
          <picture className={styles.picture}>
            {sources.map((source, index) => (
              <source
                key={index}
                srcSet={source.srcSet}
                width={source.intrinsicWidth}
                height={source.intrinsicHeight}
                media={source.media}
                type={source.type}
              />
            ))}
            {image}
          </picture>
        ) : (
          image
        )}
        {!failed && (
          <button
            type="button"
            className={styles.previewTrigger}
            aria-label={`Enlarge image: ${alt}`}
            aria-haspopup="dialog"
            onClick={(event) => {
              const image =
                event.currentTarget.parentElement?.querySelector("img");
              setPreviewSrc(image?.currentSrc || src);
            }}
          >
            <span
              className={styles.previewHint}
              data-media-preview-hint
              aria-hidden="true"
            >
              <Maximize2 size={16} /> View image
            </span>
          </button>
        )}
        {failed && fallback !== undefined && (
          <div
            className={styles.fallback}
            data-media-fallback
            role="img"
            aria-label={`${alt} — image unavailable`}
          >
            {fallback}
          </div>
        )}
      </div>
      {previewSrc && (
        <ImageViewer
          key={src}
          src={previewSrc}
          alt={alt}
          onClose={() => setPreviewSrc(null)}
        />
      )}
      <Caption className={captionClassName} prefix={captionPrefix}>
        {caption}
      </Caption>
    </figure>
  );
}

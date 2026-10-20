/**
 * VideoEmbed — iframe video wrapper.
 *
 * Provider handling (`provider="auto"`, default):
 * - `video.igem.org/videos/watch/<id>` URLs are rewritten to the PeerTube
 *   `/videos/embed/<id>` form automatically, and the autoplay/loop/muted/
 *   controls props are mapped onto PeerTube's query params
 *   (`autoplay`, `loop`, `muted`, `controlBar`).
 * - Anything else (already-embed URLs, other hosts) passes through untouched;
 *   use `embedParams` for provider-specific query extras.
 * `provider="raw"` skips all rewriting — what you pass is what renders.
 *
 * iGEM rule reminder: competition videos must be hosted on iGEM servers
 * (video.igem.org); local `.mp4` files are NOT allowed. This component is
 * therefore iframe-only by design.
 */
import { type CSSProperties, type ReactNode } from "react";
import clsx from "clsx";
import { Caption } from "./Caption";
import styles from "./video-embed.module.css";

type QueryValue = string | number | boolean | undefined | null;

export interface VideoEmbedProps {
  /** Video URL — watch or embed form for video.igem.org, embed URL elsewhere. */
  src: string;
  /** Required iframe title (screen readers announce it). */
  title: string;
  /** Aspect ratio to reserve the layout box, e.g. "16 / 9" (default). Avoids CLS. */
  ratio?: string;
  maxWidth?: CSSProperties["maxWidth"];
  provider?: "auto" | "raw";
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  /** Show player controls (default true). */
  controls?: boolean;
  /** iframe `allow` list. Default covers fullscreen + PiP. */
  allow?: string;
  /** iframe sandbox policy, when the provider supplies one. */
  sandbox?: string;
  /** Default true. */
  allowFullscreen?: boolean;
  loading?: "lazy" | "eager";
  caption?: ReactNode;
  captionPrefix?: ReactNode;
  /** Provider-specific query passthrough, e.g. `{ p2p: 0, warningTitle: 0 }`. */
  embedParams?: Record<string, QueryValue>;
  className?: string;
  frameClassName?: string;
  captionClassName?: string;
  style?: CSSProperties;
}

const IGEM_VIDEO_HOST = /(^|\.)video\.igem\.org$/;

function setParam(url: URL, key: string, value: QueryValue): void {
  if (value !== undefined && value !== null)
    url.searchParams.set(key, value ? "1" : "0");
}

function buildEmbedSrc(
  src: string,
  provider: "auto" | "raw",
  autoplay?: boolean,
  loop?: boolean,
  muted?: boolean,
  controls?: boolean,
  embedParams?: Record<string, QueryValue>,
): string {
  if (provider === "raw") return src;

  let url: URL;
  try {
    url = new URL(src);
  } catch {
    return src; // relative or malformed — render as-is
  }

  if (IGEM_VIDEO_HOST.test(url.hostname)) {
    // PeerTube watch → embed
    if (url.pathname.startsWith("/videos/watch/")) {
      url.pathname = url.pathname.replace("/videos/watch/", "/videos/embed/");
    }
    setParam(url, "autoplay", autoplay);
    setParam(url, "loop", loop);
    setParam(url, "muted", muted);
    setParam(url, "controlBar", controls ?? true);
  }

  for (const [key, value] of Object.entries(embedParams ?? {})) {
    if (value === undefined || value === null) continue;
    // PeerTube (video.igem.org) booleans must be 0/1 — "true"/"false" are
    // silently ignored by the embed player.
    url.searchParams.set(
      key,
      typeof value === "boolean" ? (value ? "1" : "0") : String(value),
    );
  }
  return url.toString();
}

export function VideoEmbed({
  src,
  title,
  ratio = "16 / 9",
  maxWidth,
  provider = "auto",
  autoplay,
  loop,
  muted,
  controls = true,
  allow = "fullscreen; picture-in-picture",
  sandbox,
  allowFullscreen = true,
  loading = "lazy",
  caption,
  captionPrefix,
  embedParams,
  className,
  frameClassName,
  captionClassName,
  style,
}: VideoEmbedProps) {
  const embedSrc = buildEmbedSrc(
    src,
    provider,
    autoplay,
    loop,
    muted,
    controls,
    embedParams,
  );

  return (
    <figure
      className={clsx(styles.embed, className)}
      style={{ maxWidth, ...style }}
      data-media-surface="video"
      data-media-kind="video"
    >
      <div
        className={clsx(styles.frame, frameClassName)}
        style={{ aspectRatio: ratio }}
        data-media-surface="video"
        data-media-kind="video"
      >
        <iframe
          src={embedSrc}
          title={title}
          className={styles.iframe}
          allow={allow}
          sandbox={sandbox}
          allowFullScreen={allowFullscreen}
          loading={loading}
        />
      </div>
      <Caption className={captionClassName} prefix={captionPrefix}>
        {caption}
      </Caption>
    </figure>
  );
}

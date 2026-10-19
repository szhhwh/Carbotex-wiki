import type { ReactNode } from "react";
import { FileText, Play, type LucideIcon } from "lucide-react";
import { ImageGallery } from "../../components/media/ImageGallery";
import type { MediaImage } from "../../components/media/MediaImage";
import styles from "../education.module.css";

export function ChapterGallery({
  images,
  label,
  columns = 3,
}: {
  images: MediaImage[];
  label: string;
  columns?: 2 | 3 | 4;
}) {
  return (
    <ImageGallery
      className={styles.actionGallery}
      columns={columns}
      images={images}
      label={label}
      mobileLayout="swipe"
    />
  );
}

export interface ResourceItem {
  title: string;
  eyebrow: string;
  description?: string;
  href: string;
}

function iconForHref(href: string): LucideIcon {
  return /(?:youtube\.com|video\.igem\.org)/i.test(href) ? Play : FileText;
}

function actionForHref(href: string): string {
  if (/\.pdf(?:$|[?#])/i.test(href)) return "Open PDF";
  if (/[?&]activity=/.test(href)) return "Launch activity";
  if (/(?:youtube\.com|video\.igem\.org)/i.test(href)) return "Watch video";
  return "Open resource";
}

export function ResourceCard({
  title,
  eyebrow,
  description,
  href,
}: ResourceItem) {
  const Icon = iconForHref(href);
  const external = /^https?:\/\//i.test(href);

  return (
    <a
      className={styles.resourceCard}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className={styles.resourceIcon} aria-hidden="true">
        <Icon size={18} strokeWidth={1.8} />
      </span>
      <span className={styles.resourceCopy}>
        <small>{eyebrow}</small>
        <strong>{title}</strong>
        {description && <span>{description}</span>}
      </span>
      <span className={styles.resourceAction} aria-hidden="true">
        {actionForHref(href)}
        <span>↗</span>
      </span>
    </a>
  );
}

export function ResourceGrid({ children }: { children: ReactNode }) {
  return <div className={styles.resourceGrid}>{children}</div>;
}

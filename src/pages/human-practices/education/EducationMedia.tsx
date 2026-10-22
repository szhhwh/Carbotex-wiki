import { ArrowUpRight } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { ImageFocusGallery } from "../../../components/media/ImageFocusGallery";
import type { MediaImage } from "../../../components/media/MediaImage";
import styles from "../education.module.css";

export function ChapterGallery({
  images,
  label,
  caption,
  captionPrefix,
}: {
  images: MediaImage[];
  label: string;
  caption?: ReactNode;
  captionPrefix?: ReactNode;
}) {
  return (
    <ImageFocusGallery
      caption={caption}
      captionPrefix={captionPrefix}
      className={styles.actionGallery}
      images={images}
      label={label}
      showSlideCaptions={false}
    />
  );
}

export interface ResourceItem {
  title: string;
  eyebrow: string;
  description?: string;
  href: string;
  actionLabel?: string;
}

export interface EducationResourceAudience {
  id: string;
  label: string;
  filterLabel?: string;
}

export interface EducationResource {
  id: string;
  title: string;
  description?: ReactNode;
  audiences?: EducationResourceAudience[];
  href: string;
}

export interface EducationResourceGroup {
  id: string;
  title: string;
  resources: EducationResource[];
}

function actionForHref(href: string): string {
  if (/\.pdf(?:$|[?#])/i.test(href)) return "Open PDF";
  if (/\.(?:avif|gif|jpe?g|png|webp)(?:$|[?#])/i.test(href))
    return "View image";
  if (/[?&]activity=/.test(href)) return "Launch activity";
  if (/(?:youtube\.com|video\.igem\.org)/i.test(href)) return "Watch video";
  return "Open resource";
}

export function ResourceCard({
  title,
  eyebrow,
  description,
  href,
  actionLabel,
}: ResourceItem) {
  const external = /^https?:\/\//i.test(href);

  return (
    <a
      className={styles.resourceCard}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className={styles.resourceCopy}>
        <small>{eyebrow}</small>
        <strong>{title}</strong>
        {description && <span>{description}</span>}
      </span>
      <span className={styles.resourceAction}>
        {actionLabel ?? actionForHref(href)}
      </span>
    </a>
  );
}

export function ResourceGrid({ children }: { children: ReactNode }) {
  return <div className={styles.resourceGrid}>{children}</div>;
}

export function ResourceLibrary({
  groups,
  label = "Resource library",
}: {
  groups: EducationResourceGroup[];
  label?: string;
}) {
  const [activeAudience, setActiveAudience] = useState("all");
  const libraryId = useId().replace(/:/g, "");
  const filterLabelId = `${libraryId}-filter-label`;
  const resourceListId = `${libraryId}-resources`;

  const audienceOptions = Array.from(
    new Map(
      groups
        .flatMap((group) => group.resources)
        .flatMap((resource) => resource.audiences ?? [])
        .map((audience) => [audience.id, audience] as const),
    ).values(),
  );

  const matchesAudience = (resource: EducationResource) =>
    activeAudience === "all" ||
    resource.audiences?.some((audience) => audience.id === activeAudience);

  const totalResources = groups.reduce(
    (total, group) => total + group.resources.length,
    0,
  );
  const visibleResources = groups.reduce(
    (total, group) => total + group.resources.filter(matchesAudience).length,
    0,
  );

  const countForAudience = (audienceId: string) =>
    groups.reduce(
      (total, group) =>
        total +
        group.resources.filter(
          (resource) =>
            audienceId === "all" ||
            resource.audiences?.some((audience) => audience.id === audienceId),
        ).length,
      0,
    );

  return (
    <section className={styles.resourceLibrary} aria-label={label}>
      {audienceOptions.length > 0 && (
        <div className={styles.resourceLibraryToolbar}>
          <div className={styles.resourceAudienceFilter}>
            <span className={styles.resourceFilterLabel} id={filterLabelId}>
              Filter by audience
            </span>
            <div
              className={styles.resourceFilterButtons}
              role="group"
              aria-labelledby={filterLabelId}
            >
              <button
                aria-label={`All audiences, ${totalResources} resources`}
                aria-controls={resourceListId}
                aria-pressed={activeAudience === "all"}
                className={styles.resourceFilterButton}
                onClick={() => setActiveAudience("all")}
                type="button"
              >
                All
                <span aria-hidden="true">{totalResources}</span>
              </button>
              {audienceOptions.map((audience) => {
                const audienceCount = countForAudience(audience.id);
                return (
                  <button
                    aria-label={`${audience.label}, ${audienceCount} ${
                      audienceCount === 1 ? "resource" : "resources"
                    }`}
                    aria-controls={resourceListId}
                    aria-pressed={activeAudience === audience.id}
                    className={styles.resourceFilterButton}
                    key={audience.id}
                    onClick={() => setActiveAudience(audience.id)}
                    type="button"
                  >
                    {audience.filterLabel ?? audience.label}
                    <span aria-hidden="true">{audienceCount}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className={styles.resourceGroups} id={resourceListId}>
        {groups.map((group, groupIndex) => {
          const visibleGroupResources = group.resources.filter(matchesAudience);
          if (visibleGroupResources.length === 0) return null;

          const headingId = `${libraryId}-${group.id}-title`;
          return (
            <section
              className={styles.resourceGroup}
              data-resource-category={group.id}
              aria-labelledby={headingId}
              key={group.id}
            >
              <header className={styles.resourceGroupHeader}>
                <span className={styles.resourceGroupIndex} aria-hidden="true">
                  {String(groupIndex + 1).padStart(2, "0")}
                </span>
                <h6 id={headingId}>{group.title}</h6>
                <span className={styles.resourceGroupCount}>
                  {visibleGroupResources.length}{" "}
                  {visibleGroupResources.length === 1
                    ? "resource"
                    : "resources"}
                </span>
              </header>
              <ul className={styles.resourceEntries}>
                {visibleGroupResources.map((resource) => {
                  const external = /^https?:\/\//i.test(resource.href);
                  return (
                    <li key={resource.id}>
                      <a
                        className={`${styles.resourceEntry} ${
                          resource.audiences?.length
                            ? styles.resourceEntryWithAudiences
                            : styles.resourceEntryWithoutAudiences
                        }`}
                        data-resource-audience={resource.audiences
                          ?.map((audience) => audience.id)
                          .join(" ")}
                        href={resource.href}
                        {...(external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {resource.audiences?.length ? (
                          <span className={styles.resourceAudiences}>
                            {resource.audiences.map((audience) => (
                              <span
                                className={styles.resourceAudience}
                                key={audience.id}
                              >
                                {audience.label}
                              </span>
                            ))}
                          </span>
                        ) : null}
                        <span className={styles.resourceEntryCopy}>
                          <strong>{resource.title}</strong>
                          {resource.description && (
                            <span>{resource.description}</span>
                          )}
                        </span>
                        <span className={styles.resourceEntryAction}>
                          {actionForHref(resource.href)}
                          <ArrowUpRight aria-hidden="true" size={17} />
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}

        {visibleResources === 0 && (
          <p className={styles.resourceEmpty}>
            No resources are available for this audience yet.
          </p>
        )}
      </div>
    </section>
  );
}

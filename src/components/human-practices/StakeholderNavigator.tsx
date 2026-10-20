import { useEffect, useId, useState, type CSSProperties } from "react";
import { ArrowUpRight, UserRound } from "lucide-react";
import type { IhpStakeholder, IhpStakeholderGroup } from "./ihp-types";
import { stakeholderGroupId } from "./ihp-links";
import styles from "./stakeholder-navigator.module.css";

type GroupTheme = CSSProperties & {
  "--group-accent": string;
  "--group-header-ink": string;
  "--group-surface": string;
  "--group-border": string;
};

const GROUP_THEMES: GroupTheme[] = [
  {
    "--group-accent": "#006b52",
    "--group-header-ink": "#ffffff",
    "--group-surface": "#e6f2ed",
    "--group-border": "#79b7a4",
  },
  {
    "--group-accent": "#1f7a5c",
    "--group-header-ink": "#ffffff",
    "--group-surface": "#dff1e9",
    "--group-border": "#83bea9",
  },
  {
    "--group-accent": "#a8d58e",
    "--group-header-ink": "#003f34",
    "--group-surface": "#eef6df",
    "--group-border": "#9dbf84",
  },
  {
    "--group-accent": "#b85213",
    "--group-header-ink": "#ffffff",
    "--group-surface": "#fff0e2",
    "--group-border": "#dc9668",
  },
  {
    "--group-accent": "#f0bd3d",
    "--group-header-ink": "#003f34",
    "--group-surface": "#fff3ce",
    "--group-border": "#dbb45f",
  },
  {
    "--group-accent": "#087aa3",
    "--group-header-ink": "#ffffff",
    "--group-surface": "#e4f4fa",
    "--group-border": "#72bad5",
  },
];

function getGroupTheme(index: number) {
  return GROUP_THEMES[index % GROUP_THEMES.length];
}

function stakeholderSlug(stakeholder: IhpStakeholder) {
  return stakeholder.storyHref.replace(/^#/, "");
}

function storyNumber(value: number) {
  return String(value).padStart(2, "0");
}

function StakeholderCard({
  stakeholder,
  number,
  open,
  onToggle,
  detailsId,
}: {
  stakeholder: IhpStakeholder;
  number: number;
  open: boolean;
  onToggle: () => void;
  detailsId: string;
}) {
  const [failedPortrait, setFailedPortrait] = useState<string | null>(null);
  const slug = stakeholderSlug(stakeholder);
  const headingId = `stakeholder-heading-${slug}`;
  const triggerId = `stakeholder-trigger-${slug}`;

  return (
    <article
      className={styles.card}
      aria-labelledby={headingId}
      data-open={open}
      data-stakeholder-card
    >
      <span className={styles.cardNumber} aria-hidden="true">
        {storyNumber(number)}
      </span>
      <div className={styles.portrait}>
        {failedPortrait === stakeholder.portrait ? (
          <span
            className={styles.portraitFallback}
            role="img"
            aria-label={`Portrait unavailable: ${stakeholder.name}`}
          >
            <UserRound size={28} aria-hidden="true" />
            <span>Portrait unavailable</span>
          </span>
        ) : (
          <img
            src={stakeholder.portrait}
            alt={`Stakeholder portrait: ${stakeholder.name}`}
            data-logo={/\.svg(?:[?#]|$)/i.test(stakeholder.portrait)}
            loading="lazy"
            decoding="async"
            onError={() => setFailedPortrait(stakeholder.portrait)}
          />
        )}
      </div>
      <div className={styles.cardSummary}>
        <h4 id={headingId}>{stakeholder.name}</h4>
        <button
          type="button"
          id={triggerId}
          className={styles.detailsTrigger}
          aria-expanded={open}
          aria-controls={detailsId}
          onClick={onToggle}
        >
          <span>{open ? "Hide details" : "View details"}</span>
          <span className={styles.srOnly}> for {stakeholder.name}</span>
        </button>
      </div>
    </article>
  );
}

function AdditionalCollaborators({
  group,
  headingId,
}: {
  group: IhpStakeholderGroup;
  headingId: string;
}) {
  const additional = group.additionalCollaborators;
  if (!additional) return null;

  return (
    <div
      className={styles.additionalCollaborators}
      data-additional-collaborators
    >
      <h4 id={`${headingId}-additional`} className={styles.additionalTitle}>
        {additional.title}
      </h4>
      <div className={styles.additionalList}>
        {additional.items.map((item) => (
          <a className={styles.additionalCard} href={item.href} key={item.name}>
            <span className={styles.additionalCopy}>
              <strong>{item.name}</strong>
              {item.identity && <span>{item.identity}</span>}
            </span>
            <ArrowUpRight
              className={styles.additionalArrow}
              size={15}
              aria-hidden="true"
            />
          </a>
        ))}
      </div>
    </div>
  );
}

function StakeholderGroupSection({
  group,
  index,
  startNumber,
  openStory,
  onToggle,
  detailsId,
}: {
  group: IhpStakeholderGroup;
  index: number;
  startNumber: number;
  openStory: string | null;
  onToggle: (slug: string) => void;
  detailsId: string;
}) {
  const id = useId();
  const headingId = `${id}-${index}`;
  const descriptionId = `${headingId}-description`;

  return (
    <section
      className={styles.column}
      id={stakeholderGroupId(group.title)}
      aria-labelledby={headingId}
      aria-describedby={descriptionId}
      style={getGroupTheme(index)}
    >
      <header className={styles.groupHeading} data-stakeholder-heading>
        <h3 id={headingId}>{group.title}</h3>
        <p className={styles.srOnly} id={descriptionId}>
          {group.description}
        </p>
      </header>
      <div className={styles.cardStack}>
        {group.stakeholders.map((stakeholder, stakeholderIndex) => {
          const slug = stakeholderSlug(stakeholder);
          return (
            <StakeholderCard
              key={stakeholder.storyHref}
              stakeholder={stakeholder}
              number={startNumber + stakeholderIndex}
              open={openStory === slug}
              detailsId={detailsId}
              onToggle={() => onToggle(slug)}
            />
          );
        })}
      </div>
      <AdditionalCollaborators group={group} headingId={headingId} />
    </section>
  );
}

export function StakeholderNavigator({
  groups,
}: {
  groups: IhpStakeholderGroup[];
}) {
  const id = useId();
  const detailsId = `${id}-details`;
  const [openStory, setOpenStory] = useState<{
    groupIndex: number;
    slug: string;
  } | null>(null);

  let nextNumber = 1;
  const groupStartNumbers = groups.map((group) => {
    const startNumber = nextNumber;
    nextNumber += group.stakeholders.length;
    return startNumber;
  });

  const expandedGroup = openStory ? groups[openStory.groupIndex] : undefined;
  const expanded = expandedGroup?.stakeholders.find(
    (stakeholder) => stakeholderSlug(stakeholder) === openStory?.slug,
  );
  const expandedIndex =
    expandedGroup && openStory
      ? expandedGroup.stakeholders.findIndex(
          (stakeholder) => stakeholderSlug(stakeholder) === openStory.slug,
        )
      : -1;
  const expandedNumber =
    openStory && expandedIndex >= 0
      ? groupStartNumbers[openStory.groupIndex] + expandedIndex
      : null;

  useEffect(() => {
    if (!openStory) return;
    const panel = document.getElementById(detailsId);
    if (!panel) return;

    panel.focus({ preventScroll: true });
    panel.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }, [detailsId, openStory]);

  const closeDetails = () => {
    const triggerId = openStory
      ? `stakeholder-trigger-${openStory.slug}`
      : undefined;
    setOpenStory(null);
    if (triggerId) {
      requestAnimationFrame(() => document.getElementById(triggerId)?.focus());
    }
  };

  return (
    <div className={styles.navigator} data-stakeholder-navigator>
      <div
        className={styles.detailsPanel}
        id={detailsId}
        role="region"
        aria-labelledby={`${detailsId}-title`}
        tabIndex={-1}
        hidden={!expanded}
        data-stakeholder-details
        style={openStory ? getGroupTheme(openStory.groupIndex) : undefined}
      >
        {expanded && expandedNumber && (
          <>
            <div className={styles.detailsHeading}>
              <div>
                <span className={styles.detailsKicker}>
                  Stakeholder perspective {storyNumber(expandedNumber)}
                </span>
                <h4 id={`${detailsId}-title`}>{expanded.name}</h4>
                <p>{expanded.identity}</p>
              </div>
              <button type="button" onClick={closeDetails}>
                Close
                <span className={styles.srOnly}>
                  {" "}
                  details for {expanded.name}
                </span>
              </button>
            </div>
            <dl className={styles.detailsList}>
              {[
                ["Why we reached out", expanded.why],
                ["What we heard", expanded.heard],
                ["What we did with it", expanded.changed],
                ["Where it led", expanded.led],
              ].map(([label, value]) => (
                <div className={styles.detailItem} key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <a href={expanded.storyHref} className={styles.storyLink}>
              Read the full TRACE story <span aria-hidden="true">↓</span>
            </a>
          </>
        )}
      </div>
      <div className={styles.columns} data-stakeholder-columns>
        {groups.map((group, index) => (
          <StakeholderGroupSection
            key={group.title}
            group={group}
            index={index}
            startNumber={groupStartNumbers[index]}
            openStory={openStory?.groupIndex === index ? openStory.slug : null}
            detailsId={detailsId}
            onToggle={(slug) =>
              setOpenStory((current) =>
                current?.groupIndex === index && current.slug === slug
                  ? null
                  : { groupIndex: index, slug },
              )
            }
          />
        ))}
      </div>
    </div>
  );
}

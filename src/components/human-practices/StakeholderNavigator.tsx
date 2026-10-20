import { useEffect, useId, useState, type CSSProperties } from "react";
import { UserRound } from "lucide-react";
import type { IhpStakeholder, IhpStakeholderGroup } from "./ihp-types";
import { stakeholderGroupId } from "./ihp-links";
import styles from "./stakeholder-navigator.module.css";

export type Stakeholder = IhpStakeholder;
export type StakeholderGroup = IhpStakeholderGroup & { flow?: string };

const GROUP_ACCENTS = [
  ["var(--hardware-green)", "var(--hardware-card-mint)"],
  ["var(--hardware-royal)", "var(--hardware-pale-yellow)"],
  ["var(--hardware-navy)", "var(--hardware-mint)"],
  ["var(--hardware-green)", "var(--hardware-pale-yellow)"],
  ["var(--hardware-royal)", "var(--hardware-card-mint)"],
  ["var(--hardware-navy)", "var(--hardware-mint)"],
];

function stakeholderSlug(stakeholder: Stakeholder) {
  return stakeholder.storyHref.replace(/^#/, "");
}

function StakeholderCard({
  stakeholder,
  open,
  onToggle,
  detailsId,
}: {
  stakeholder: Stakeholder;
  open: boolean;
  onToggle: () => void;
  detailsId: string;
}) {
  const [failedPortrait, setFailedPortrait] = useState<string | null>(null);
  const headingId = `stakeholder-heading-${stakeholderSlug(stakeholder)}`;
  const triggerId = `stakeholder-trigger-${stakeholderSlug(stakeholder)}`;
  return (
    <article className={styles.card} aria-labelledby={headingId}>
      <div className={styles.portrait}>
        {failedPortrait === stakeholder.portrait ? (
          <span
            className={styles.fallback}
            role="img"
            aria-label={`Portrait unavailable: ${stakeholder.name}`}
          >
            <UserRound size={32} aria-hidden="true" />
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
      <div className={styles.summary}>
        <h4 id={headingId}>{stakeholder.name}</h4>
        <p className={styles.identity}>{stakeholder.identity}</p>
        <dl>
          <dt>Question</dt>
          <dd>{stakeholder.question}</dd>
          <dt>Impact</dt>
          <dd className={styles.impact}>{stakeholder.impact}</dd>
        </dl>
      </div>
      <button
        type="button"
        id={triggerId}
        className={styles.detailsTrigger}
        aria-expanded={open}
        aria-controls={detailsId}
        onClick={onToggle}
      >
        <span>{open ? "Collapse" : "Expand"} details</span>
        <span className={styles.srOnly}> for {stakeholder.name}</span>
      </button>
    </article>
  );
}

function StakeholderGroupSection({
  group,
  index,
}: {
  group: StakeholderGroup;
  index: number;
}) {
  const id = useId();
  const [openStory, setOpenStory] = useState<string | null>(null);
  const [accent, tint] = GROUP_ACCENTS[index % GROUP_ACCENTS.length];
  const expanded = group.stakeholders.find(
    (stakeholder) => stakeholderSlug(stakeholder) === openStory,
  );
  const detailsId = `${id}-details`;

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
      ? `stakeholder-trigger-${openStory}`
      : undefined;
    setOpenStory(null);
    if (triggerId) {
      requestAnimationFrame(() => document.getElementById(triggerId)?.focus());
    }
  };

  return (
    <section
      id={stakeholderGroupId(group.title)}
      aria-labelledby={`${id}-${index}`}
      style={
        {
          "--group-accent": accent,
          "--group-tint": tint,
        } as CSSProperties
      }
    >
      <header className={styles.groupHeading}>
        <div>
          <h3 id={`${id}-${index}`}>{group.title}</h3>
          <p>{group.description}</p>
          {group.flow && <p className={styles.flow}>{group.flow}</p>}
        </div>
        <span className={styles.count}>
          {group.stakeholders.length} perspectives
        </span>
      </header>
      <div className={styles.grid} data-count={group.stakeholders.length}>
        {group.stakeholders.map((stakeholder) => {
          const slug = stakeholderSlug(stakeholder);
          return (
            <StakeholderCard
              key={stakeholder.storyHref}
              stakeholder={stakeholder}
              open={openStory === slug}
              detailsId={detailsId}
              onToggle={() =>
                setOpenStory((current) => (current === slug ? null : slug))
              }
            />
          );
        })}
      </div>
      <div
        className={styles.detailsPanel}
        id={detailsId}
        role="region"
        aria-labelledby={
          openStory ? `stakeholder-heading-${openStory}` : undefined
        }
        tabIndex={-1}
        hidden={!expanded}
      >
        {expanded && openStory && (
          <>
            <div className={styles.detailsHeading}>
              <strong>{expanded.name}</strong>
              <button type="button" onClick={closeDetails}>
                Close
                <span className={styles.srOnly}>
                  {" "}
                  details for {expanded.name}
                </span>
              </button>
            </div>
            <dl className={styles.detailsList}>
              <dt>Why we reached out</dt>
              <dd>{expanded.why}</dd>
              <dt>What we heard</dt>
              <dd>{expanded.heard}</dd>
              <dt>What we did with it</dt>
              <dd>{expanded.changed}</dd>
              <dt>Where it led</dt>
              <dd>{expanded.led}</dd>
            </dl>
            <a href={expanded.storyHref} className={styles.story}>
              Read the full TRACE story ↓
            </a>
          </>
        )}
      </div>
    </section>
  );
}

export function StakeholderNavigator({
  groups,
}: {
  groups: StakeholderGroup[];
}) {
  return (
    <div className={styles.navigator}>
      {groups.map((group, index) => (
        <StakeholderGroupSection
          key={group.title}
          group={group}
          index={index}
        />
      ))}
    </div>
  );
}

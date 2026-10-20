import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type AnimationEvent,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, UserRound, X } from "lucide-react";
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

function twoDigit(value: number) {
  return String(value).padStart(2, "0");
}

function StakeholderCard({
  stakeholder,
  number,
  open,
  dense,
  onToggle,
  detailsId,
}: {
  stakeholder: IhpStakeholder;
  number: number;
  open: boolean;
  dense: boolean;
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
      data-dense={dense}
      data-stakeholder-card
    >
      <span className={styles.cardNumber} aria-hidden="true">
        {twoDigit(number)}
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
      </div>
      <button
        type="button"
        id={triggerId}
        className={styles.cardTrigger}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={detailsId}
        onClick={onToggle}
      >
        <span className={styles.srOnly}>
          {open ? "Hide details" : "View details"} for {stakeholder.name}
        </span>
      </button>
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
              size={14}
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
  const dense = group.stakeholders.length > 4;
  const cardCount =
    group.stakeholders.length + (group.additionalCollaborators ? 1 : 0);

  return (
    <section
      className={styles.stage}
      id={stakeholderGroupId(group.title)}
      aria-labelledby={headingId}
      style={getGroupTheme(index)}
      data-stakeholder-stage
    >
      <header className={styles.groupHeading} data-stakeholder-heading>
        <h3 id={headingId}>{group.title}</h3>
      </header>
      <div
        className={styles.cardGrid}
        data-count={cardCount}
        data-dense={dense}
        data-stakeholder-card-grid
      >
        {group.stakeholders.map((stakeholder, stakeholderIndex) => {
          const slug = stakeholderSlug(stakeholder);
          return (
            <StakeholderCard
              key={stakeholder.storyHref}
              stakeholder={stakeholder}
              number={startNumber + stakeholderIndex}
              open={openStory === slug}
              dense={dense}
              detailsId={detailsId}
              onToggle={() => onToggle(slug)}
            />
          );
        })}
        <AdditionalCollaborators group={group} headingId={headingId} />
      </div>
    </section>
  );
}

function StakeholderDetailsDialog({
  detailsId,
  stakeholder,
  number,
  groupIndex,
  onClose,
}: {
  detailsId: string;
  stakeholder: IhpStakeholder;
  number: number;
  groupIndex: number;
  onClose: (restoreFocus?: boolean) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closingRef = useRef(false);
  const restoreFocusRef = useRef(true);
  const [closing, setClosing] = useState(false);
  const [failedPortrait, setFailedPortrait] = useState(false);
  const titleId = `${detailsId}-title`;

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.showModal();

    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  const close = (restoreFocus = true) => {
    const dialog = dialogRef.current;
    if (!dialog || closingRef.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      dialog.close();
      onClose(restoreFocus);
      return;
    }

    closingRef.current = true;
    restoreFocusRef.current = restoreFocus;
    setClosing(true);
  };

  const finishClose = (event: AnimationEvent<HTMLElement>) => {
    if (!closingRef.current || event.target !== event.currentTarget) return;

    dialogRef.current?.close();
    onClose(restoreFocusRef.current);
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      className={styles.detailsDialog}
      data-closing={closing || undefined}
      aria-labelledby={titleId}
      data-stakeholder-details
      style={getGroupTheme(groupIndex)}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <section className={styles.detailsPanel} onAnimationEnd={finishClose}>
        <button
          type="button"
          className={styles.detailsClose}
          onClick={() => close()}
          aria-label={`Close details for ${stakeholder.name}`}
          autoFocus
        >
          <X aria-hidden="true" />
        </button>

        <div className={styles.detailsScroller} data-stakeholder-scroller>
          <header className={styles.detailsHeader}>
            <div className={styles.detailsPortrait}>
              {failedPortrait ? (
                <span
                  className={styles.detailsPortraitFallback}
                  role="img"
                  aria-label={`Portrait unavailable: ${stakeholder.name}`}
                >
                  <UserRound size={38} aria-hidden="true" />
                </span>
              ) : (
                <img
                  src={stakeholder.portrait}
                  alt={`Stakeholder portrait: ${stakeholder.name}`}
                  data-logo={/\.svg(?:[?#]|$)/i.test(stakeholder.portrait)}
                  decoding="async"
                  onError={() => setFailedPortrait(true)}
                />
              )}
            </div>
            <div className={styles.detailsIdentity}>
              <span className={styles.detailsKicker}>
                Stakeholder perspective {twoDigit(number)}
              </span>
              <h2 id={titleId}>{stakeholder.name}</h2>
              <p>{stakeholder.identity}</p>
            </div>
          </header>

          <dl className={styles.detailsList}>
            {[
              ["Why we reached out", stakeholder.why],
              ["What we heard", stakeholder.heard],
              ["What we did with it", stakeholder.changed],
              ["Where it led", stakeholder.led],
            ].map(([label, value]) => (
              <div className={styles.detailItem} key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <a
            href={stakeholder.storyHref}
            className={styles.storyLink}
            onClick={() => close(false)}
          >
            Read the full TRACE story <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
    </dialog>,
    document.body,
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

  const closeDetails = (restoreFocus = true) => {
    const triggerId = openStory
      ? `stakeholder-trigger-${openStory.slug}`
      : undefined;
    const storyTargetId = expanded?.storyHref.replace(/^#/, "");
    setOpenStory(null);
    if (restoreFocus && triggerId) {
      requestAnimationFrame(() => document.getElementById(triggerId)?.focus());
    } else if (storyTargetId) {
      requestAnimationFrame(() =>
        document.getElementById(storyTargetId)?.focus({ preventScroll: true }),
      );
    }
  };

  return (
    <div className={styles.navigator} data-stakeholder-navigator>
      <div className={styles.stages} data-stakeholder-stages>
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
      {openStory && expanded && expandedNumber && (
        <StakeholderDetailsDialog
          detailsId={detailsId}
          stakeholder={expanded}
          number={expandedNumber}
          groupIndex={openStory.groupIndex}
          onClose={closeDetails}
        />
      )}
    </div>
  );
}

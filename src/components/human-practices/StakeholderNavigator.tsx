import { useId, useState } from "react";
import { UserRound } from "lucide-react";
import { Collapse } from "../ui/Collapse";
import styles from "./stakeholder-navigator.module.css";

export interface Stakeholder {
  name: string;
  portrait: string;
  identity: string;
  question: string;
  impact: string;
  why: string;
  heard: string;
  changed: string;
  led: string;
  storyHref: string;
}

export interface StakeholderGroup {
  title: string;
  description: string;
  flow?: string;
  stakeholders: Stakeholder[];
}

export function StakeholderCard({ stakeholder }: { stakeholder: Stakeholder }) {
  const [open, setOpen] = useState(false);
  const [failedPortrait, setFailedPortrait] = useState<string | null>(null);
  const headingId = useId();
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
            alt={stakeholder.name}
            loading="lazy"
            decoding="async"
            onError={() => setFailedPortrait(stakeholder.portrait)}
          />
        )}
      </div>
      <div className={styles.summary}>
        <h5 id={headingId}>{stakeholder.name}</h5>
        <p className={styles.identity}>{stakeholder.identity}</p>
        <dl>
          <dt>Question</dt>
          <dd>{stakeholder.question}</dd>
          <dt>Impact</dt>
          <dd className={styles.impact}>{stakeholder.impact}</dd>
        </dl>
      </div>
      <Collapse
        variant="plain"
        headerAs="div"
        open={open}
        onToggle={setOpen}
        className={styles.details}
        headerClassName={styles.trigger}
        header={
          <span>
            {open ? "Collapse" : "Expand"}
            <span className={styles.srOnly}>: {stakeholder.name}</span>
          </span>
        }
      >
        <dl>
          <dt>Why we reached out</dt>
          <dd>{stakeholder.why}</dd>
          <dt>What we heard</dt>
          <dd>{stakeholder.heard}</dd>
          <dt>What we did with it</dt>
          <dd>{stakeholder.changed}</dd>
          <dt>Where it led</dt>
          <dd>{stakeholder.led}</dd>
        </dl>
        <a href={stakeholder.storyHref} className={styles.story}>
          Read the full TRACE story ↓
        </a>
      </Collapse>
    </article>
  );
}

export function StakeholderNavigator({
  groups,
}: {
  groups: StakeholderGroup[];
}) {
  const id = useId();
  return (
    <div className={styles.navigator}>
      {groups.map((group, index) => (
        <section key={group.title} aria-labelledby={`${id}-${index}`}>
          <header className={styles.groupHeading}>
            <span className={styles.number}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h4 id={`${id}-${index}`}>{group.title}</h4>
              <p>{group.description}</p>
              {group.flow && <p className={styles.flow}>{group.flow}</p>}
            </div>
          </header>
          <div className={styles.grid}>
            {group.stakeholders.map((stakeholder) => (
              <StakeholderCard
                key={stakeholder.storyHref}
                stakeholder={stakeholder}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

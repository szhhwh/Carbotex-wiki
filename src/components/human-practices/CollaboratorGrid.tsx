import { ArrowRight } from "lucide-react";
import type { IhpCollaborator } from "./ihp-types";
import styles from "./collaborator-grid.module.css";

export function CollaboratorGrid({
  collaborators,
  stakeholderCount,
}: {
  collaborators: IhpCollaborator[];
  stakeholderCount: number;
}) {
  return (
    <section
      className={styles.section}
      aria-labelledby="ihp-collaborators-title"
    >
      <header className={styles.header}>
        <h3 id="ihp-collaborators-title">
          Additional Teams &amp; Collaborators
        </h3>
        <p>
          Peer exchanges, shared discussions, event organizers, and co-created
          outreach. These cards are distinct from the {stakeholderCount}{" "}
          interview / stakeholder cards.
        </p>
      </header>
      <div className={styles.list}>
        {collaborators.map((collaborator) => (
          <a
            className={styles.item}
            href={collaborator.href}
            key={collaborator.name}
          >
            <span className={styles.name}>{collaborator.name}</span>
            <span className={styles.description}>
              {collaborator.description}
            </span>
            <span className={styles.link}>
              Read the related story
              <ArrowRight size={15} aria-hidden="true" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

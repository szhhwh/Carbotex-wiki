import type { ReactNode } from "react";
import styles from "./parts-sections.module.css";

export interface PartRecord {
  id: string;
  name: ReactNode;
  description: ReactNode;
}

function registryUrl(part: PartRecord) {
  return `https://registry.igem.org/parts/${part.id
    .toLowerCase()
    .replace(/_/g, "-")}`;
}

function RegistryLink({ part }: { part: PartRecord }) {
  return (
    <a
      className={styles.registryLink}
      href={registryUrl(part)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${part.id} in the iGEM Registry`}
    >
      <span>{part.id}</span>
    </a>
  );
}

type PartHeadingLevel = 3 | 4;

function PartCard({
  part,
  headingLevel,
}: {
  part: PartRecord;
  headingLevel: PartHeadingLevel;
}) {
  const Heading = `h${headingLevel}` as const;

  return (
    <article className={styles.partCard} data-part-card>
      <Heading className={styles.partName}>{part.name}</Heading>
      <p className={styles.partDescription}>{part.description}</p>
      <div className={styles.partFooter}>
        <RegistryLink part={part} />
      </div>
    </article>
  );
}

export function PartCollection({
  parts,
  headingLevel = 3,
}: {
  parts: PartRecord[];
  headingLevel?: PartHeadingLevel;
}) {
  return (
    <div className={styles.partsCollection}>
      <ul className={styles.partsGrid}>
        {parts.map((part) => (
          <li className={styles.partItem} key={part.id}>
            <PartCard part={part} headingLevel={headingLevel} />
          </li>
        ))}
      </ul>
    </div>
  );
}

import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import styles from "./parts-sections.module.css";

const REGISTRY_COLLECTION_URL =
  "https://registry.igem.org/collections/4e32e74e-e8d6-4539-8bc4-11eddbf2edf8";

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

export function RegistryCollectionCta() {
  return (
    <a
      className={styles.collectionCta}
      data-registry-collection-cta
      href={REGISTRY_COLLECTION_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>Explore the Registry Collection</span>
      <ArrowUpRight size={19} aria-hidden="true" />
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

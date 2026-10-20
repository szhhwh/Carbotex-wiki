import { Fragment, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import styles from "./parts-sections.module.css";

export interface PartRecord {
  id: string;
  name: ReactNode;
  role: ReactNode;
  type: string;
}

export interface CorePartPair {
  regulator: PartRecord;
  construct: PartRecord;
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

type PartLayout =
  | "pair"
  | "backbone"
  | "regulator"
  | "xylose"
  | "donor"
  | "tool";

function PartBody({ part, layout }: { part: PartRecord; layout: PartLayout }) {
  const title = <h4 className={styles.partName}>{part.name}</h4>;
  const type = <span className={styles.typeTag}>{part.type}</span>;
  const role = <p className={styles.partRole}>{part.role}</p>;
  const link = <RegistryLink part={part} />;

  if (layout === "pair") {
    return (
      <div className={styles.partBody}>
        {title}
        {role}
        <div className={styles.partMeta}>
          {type}
          {link}
        </div>
      </div>
    );
  }

  if (layout === "regulator" || layout === "tool") {
    return (
      <div className={styles.partBody}>
        {title}
        {role}
        <div className={styles.partFooter}>
          {type}
          {link}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.partBody}>
      <div className={styles.partHeading}>
        {title}
        {type}
      </div>
      {role}
      {link}
    </div>
  );
}

function PartCard({
  part,
  className,
  layout,
}: {
  part: PartRecord;
  className: string;
  layout: PartLayout;
}) {
  return (
    <article className={`${styles.partCard} ${className}`} data-part-card>
      <PartBody part={part} layout={layout} />
    </article>
  );
}

/**
 * Core records are shown as regulator/construct pairs so their relationship
 * is visible without another undifferentiated card grid.
 */
export function CorePartPairs({ pairs }: { pairs: CorePartPair[] }) {
  return (
    <div className={styles.corePairs}>
      {pairs.map((pair) => (
        <article className={styles.corePair} key={pair.regulator.id}>
          <div className={styles.pairBody}>
            <PartCard
              part={pair.regulator}
              className={styles.coreRegulator}
              layout="pair"
            />
            <span className={styles.pairArrow} aria-hidden="true">
              <ArrowRight size={20} strokeWidth={2.2} />
            </span>
            <PartCard
              part={pair.construct}
              className={styles.coreConstruct}
              layout="pair"
            />
          </div>
        </article>
      ))}
    </div>
  );
}

/** Backbone resources read as a stack of structural rows, not product cards. */
export function BackboneStack({ parts }: { parts: PartRecord[] }) {
  return (
    <div className={styles.backboneStack}>
      {parts.map((part) => (
        <PartCard
          part={part}
          className={styles.backboneRow}
          layout="backbone"
          key={part.id}
        />
      ))}
    </div>
  );
}

/**
 * The first two records form the regulatory core; the four xylose-associated
 * genes read as a compact expression panel beside it.
 */
export function MetabolismBoard({ parts }: { parts: PartRecord[] }) {
  const regulators = parts.slice(0, 2);
  const panel = parts.slice(2);

  return (
    <div className={styles.metabolismBoard}>
      <section
        className={styles.regulatorColumn}
        aria-labelledby="parts-regulator-group"
      >
        <div className={styles.groupHeader}>
          <h3 className={styles.groupTitle} id="parts-regulator-group">
            Regulator genes
          </h3>
        </div>
        <div className={styles.regulatorStack}>
          {regulators.map((part) => (
            <PartCard
              part={part}
              className={styles.regulatorCard}
              layout="regulator"
              key={part.id}
            />
          ))}
        </div>
      </section>

      <section
        className={styles.xylosePanel}
        aria-labelledby="parts-xylose-group"
      >
        <div className={styles.panelHeader}>
          <h3 className={styles.groupTitle} id="parts-xylose-group">
            Xylose panel
          </h3>
        </div>
        <ul className={styles.xyloseList}>
          {panel.map((part) => (
            <li className={styles.xyloseListItem} key={part.id}>
              <PartCard
                part={part}
                className={styles.xyloseItem}
                layout="xylose"
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/** Donor records use ledger rows so source comparisons stay scannable. */
export function DonorLedger({ parts }: { parts: PartRecord[] }) {
  return (
    <section
      className={styles.donorSection}
      aria-labelledby="parts-pyc-donor-heading"
    >
      <div className={styles.ledgerHeader}>
        <h3 className={styles.bandTitle} id="parts-pyc-donor-heading">
          PYC donor candidates
        </h3>
      </div>
      <ul className={styles.donorLedger}>
        {parts.map((part) => (
          <li className={styles.donorListItem} key={part.id}>
            <PartCard part={part} className={styles.donorRow} layout="donor" />
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Constructs read like an index: name and role share one wide technical row. */
export function ConstructCatalog({ parts }: { parts: PartRecord[] }) {
  return (
    <section
      className={styles.donorSection}
      aria-labelledby="parts-construct-index-heading"
    >
      <div className={styles.ledgerHeader}>
        <h3 className={styles.bandTitle} id="parts-construct-index-heading">
          Expression construct index
        </h3>
      </div>
      <ul className={styles.donorLedger}>
        {parts.map((part) => (
          <li className={styles.donorListItem} key={part.id}>
            <PartCard part={part} className={styles.donorRow} layout="donor" />
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Two tool records are connected to show that their roles are complementary. */
export function ToolFlow({ parts }: { parts: PartRecord[] }) {
  return (
    <section
      className={styles.toolSection}
      aria-labelledby="parts-tool-heading"
    >
      <div className={styles.toolHeader}>
        <h3 className={styles.toolTitle} id="parts-tool-heading">
          Two complementary tool roles
        </h3>
      </div>
      <div className={styles.toolFlow}>
        {parts.map((part, index) => (
          <Fragment key={part.id}>
            {index > 0 ? (
              <span className={styles.toolConnector} aria-hidden="true">
                <ArrowRight size={20} strokeWidth={2.2} />
              </span>
            ) : null}
            <PartCard part={part} className={styles.toolCard} layout="tool" />
          </Fragment>
        ))}
      </div>
    </section>
  );
}

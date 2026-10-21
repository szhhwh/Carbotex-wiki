import { Caption } from "../media/Caption";
import styles from "./stakeholder-ecosystem-map.module.css";

export function StakeholderEcosystemMap({
  figureNumber = 3,
}: {
  figureNumber?: number;
}) {
  return (
    <figure className={styles.figure}>
      <div
        className={styles.placeholder}
        role="img"
        aria-label="Stakeholder Ecosystem Map — image asset pending"
      >
        Stakeholder Ecosystem Map — image URL to be supplied
      </div>
      <Caption prefix={`Figure ${figureNumber}.`}>
        Carbotex stakeholder ecosystem map.
      </Caption>
    </figure>
  );
}

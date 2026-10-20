import { ArrowRight, UsersRound } from "lucide-react";
import { Caption } from "../media/Caption";
import type { IhpStakeholderGroup } from "./ihp-types";
import { stakeholderGroupId } from "./ihp-links";
import styles from "./stakeholder-ecosystem-map.module.css";

export function StakeholderEcosystemMap({
  groups,
  figureNumber = 3,
}: {
  groups: IhpStakeholderGroup[];
  figureNumber?: number;
}) {
  return (
    <figure className={styles.figure}>
      <div className={styles.map}>
        <div className={styles.mapHeader}>
          <strong>Carbotex stakeholder ecosystem</strong>
          <span className={styles.mapNote}>
            Stakeholders are grouped by the IHP question their perspective
            informed.
          </span>
        </div>
        <ol className={styles.stages}>
          {groups.map((group) => {
            const count = group.stakeholders.length;
            return (
              <li key={group.title}>
                <a href={`#${stakeholderGroupId(group.title)}`}>
                  <span className={styles.stageTitle}>{group.title}</span>
                  <span className={styles.stageMeta}>
                    <UsersRound size={14} aria-hidden="true" />
                    {count} {count === 1 ? "stakeholder" : "stakeholders"}
                  </span>
                  <ArrowRight
                    className={styles.direction}
                    size={18}
                    aria-hidden="true"
                  />
                </a>
              </li>
            );
          })}
        </ol>
      </div>
      <Caption prefix={`Figure ${figureNumber}.`}>
        Stakeholder ecosystem map across the six stages of the Carbotex IHP
        journey.
      </Caption>
    </figure>
  );
}

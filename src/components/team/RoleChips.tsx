import { roleMeta } from "./member-meta";
import type { TeamMember } from "./types";
import styles from "./team-members.module.css";

export function RoleChips({ member }: { member: TeamMember }) {
  return (
    <div className={styles.roleChips} role="group" aria-label="Roles">
      {member.roles.map((role) => {
        const { label, icon: Icon } = roleMeta[role];

        return (
          <span key={role} className={styles.roleChip} data-role={role}>
            <Icon aria-hidden="true" />
            {label}
          </span>
        );
      })}
    </div>
  );
}

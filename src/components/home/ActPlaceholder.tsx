import type { HomeActProps } from "./stage-math";
import styles from "./act-placeholder.module.css";

/**
 * Skeleton act for the home stage. Enter/exit cross-fades are driven entirely
 * by the stage's master timeline on the wrapper; when real content replaces
 * this component, in-act scrub animations are scheduled on the act's time
 * window (see ActLanding) and `scrollLength` should grow to fit.
 */
export function ActPlaceholder({ actIndex }: HomeActProps) {
  return (
    <div className={styles.scene}>
      <p className={styles.kicker}>Act {actIndex + 1}</p>
      <h2 className={styles.title}>Placeholder</h2>
      <p className={styles.note}>
        This act is reserved for upcoming content — the wrapper cross-fade is
        already wired up by the scroll stage.
      </p>
    </div>
  );
}

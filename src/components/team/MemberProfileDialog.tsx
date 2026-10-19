import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type AnimationEvent,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { MemberPortrait } from "./MemberPortrait";
import { RoleChips } from "./RoleChips";
import type { TeamMember } from "./types";
import styles from "./team-members.module.css";

export function MemberProfileDialog({
  member,
  onClose,
}: {
  member: TeamMember;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closingRef = useRef(false);
  const titleId = useId();
  const [closing, setClosing] = useState(false);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.showModal();

    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  const close = () => {
    const dialog = dialogRef.current;
    if (!dialog || closingRef.current) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      dialog.close();
      onClose();
      return;
    }

    closingRef.current = true;
    setClosing(true);
  };

  const finishClose = (event: AnimationEvent<HTMLElement>) => {
    if (!closingRef.current || event.target !== event.currentTarget) return;

    dialogRef.current?.close();
    onClose();
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      className={`${styles.profileDialog} ${styles.theme}`}
      data-closing={closing || undefined}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <section className={styles.profilePanel} onAnimationEnd={finishClose}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={close}
          aria-label="Close profile"
          autoFocus
        >
          <X aria-hidden="true" />
        </button>

        <div className={styles.profileScroller} data-profile-scroller>
          <header className={styles.profileHeader}>
            <MemberPortrait
              member={member}
              className={styles.profilePortrait}
              fallbackClassName={styles.portraitFallback}
              alt={`${member.name} portrait`}
            />
            <div className={styles.profileIdentity}>
              <h2 id={titleId}>{member.name}</h2>
              <p className={styles.profileMajor}>{member.major}</p>
              <RoleChips member={member} />
            </div>
          </header>

          <dl className={styles.profileFacts}>
            {member.facts.map((fact) => (
              <div key={fact.question} className={styles.profileFact}>
                <dt>{fact.question}</dt>
                <dd>{fact.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </dialog>,
    document.body,
  );
}

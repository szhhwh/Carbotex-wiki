import { MoveHorizontal, MousePointer2 } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import styles from "../education.module.css";

export function InteractionHint({
  id,
  children,
}: {
  id?: string;
  children: ReactNode;
}) {
  return (
    <p className={styles.interactionHint} id={id} role="note">
      <MousePointer2 aria-hidden="true" size={16} />
      <span>{children}</span>
    </p>
  );
}

export function OverflowHint({
  targetId,
  children,
}: {
  targetId: string;
  children: ReactNode;
}) {
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const update = () => {
      setIsOverflowing(target.scrollWidth > target.clientWidth + 1);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(target);

    const content = target.firstElementChild;
    if (content) observer.observe(content);

    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [targetId]);

  if (!isOverflowing) return null;

  return (
    <p className={styles.interactionHint} role="note">
      <MoveHorizontal aria-hidden="true" size={16} />
      <span>{children}</span>
    </p>
  );
}

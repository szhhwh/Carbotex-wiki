/**
 * Collapse — single expandable panel (header + hidden content).
 *
 * Motion policy (project convention): all animation goes through GSAP; when
 * `prefers-reduced-motion: reduce` is set every toggle lands instantly on its
 * end state. `duration: 0` disables animation per-instance as well.
 *
 * Accessibility: the trigger is a real <button aria-expanded> inside a heading
 * element, and the panel is a labelled region. Closed panels are
 * `display: none`, so collapsed content is fully removed from the a11y tree
 * and tab order.
 */
import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import styles from "./collapse.module.css";

// Keep both directions on the same temporal curve so toggling reads smoothly.
const COLLAPSE_EASE = "power2.inOut";

type CollapseVariant = "card" | "plain";

interface CollapseProps {
  /** Header row content: plain text or arbitrary ReactNode. */
  header: ReactNode;
  /** Collapsible body. */
  children: ReactNode;
  /** Controlled open state (leave undefined for uncontrolled usage). */
  open?: boolean;
  /** Initial state for uncontrolled usage (default false). */
  defaultOpen?: boolean;
  /** Fired on user toggle with the *next* state; switch to controlled by also passing `open`. */
  onToggle?: (nextOpen: boolean) => void;
  disabled?: boolean;
  /** Heading level that wraps the trigger button (default "h3"). */
  headerAs?: ElementType;
  /** Custom indicator node (the wrapper rotates with the panel); `false` hides it. Default: chevron. */
  indicator?: ReactNode | false;
  /** Optional visible action copy beside the indicator, keyed by panel state. */
  actionLabel?: {
    open: ReactNode;
    closed: ReactNode;
  };
  indicatorPosition?: "end" | "start";
  /** Tween duration in seconds; `0` = instant. Default 0.35. */
  duration?: number;
  /** Anchor / aria id; auto-generated when omitted. */
  id?: string;
  /** Theming variant; literal union keeps values backed by collapse.module.css. */
  variant?: CollapseVariant;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  style?: CSSProperties;
}

export function Collapse({
  header,
  children,
  open,
  defaultOpen = false,
  onToggle,
  disabled = false,
  headerAs,
  indicator,
  actionLabel,
  indicatorPosition = "end",
  duration = 0.35,
  id,
  variant,
  className,
  headerClassName,
  contentClassName,
  style,
}: CollapseProps) {
  const generatedId = useId();
  const panelId = id ?? `collapse-${generatedId}`;
  const triggerId = `${panelId}-trigger`;
  // aria-controls must reference the element that actually hides — the
  // collapsible region — not the always-visible root wrapper.
  const contentId = `${panelId}-content`;

  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open ?? internalOpen;

  const contentRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const mountedRef = useRef(false);

  // Dep on definedness, not node identity: a custom indicator element gets a
  // fresh object every parent render and would restart tweens mid-flight (and
  // postpone the closing display:none, keeping closed content tab-focusable).
  const hasIndicator = indicator !== false;

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const firstRun = !mountedRef.current;
    mountedRef.current = true;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const dur = firstRun || reducedMotion || duration <= 0 ? 0 : duration;

    // Focus rescue: closing a panel that contains focus would silently drop
    // it to <body> once display:none lands — hand it back to the trigger.
    const releaseFocus = () => {
      if (el.contains(document.activeElement)) triggerRef.current?.focus();
    };

    // Indicator rotation rides the same timeline policy as the height tween.
    if (indicatorRef.current && hasIndicator) {
      gsap.to(indicatorRef.current, {
        rotate: isOpen ? 180 : 0,
        duration: dur,
        ease: COLLAPSE_EASE,
        overwrite: true,
      });
    }

    if (isOpen) {
      if (dur === 0) {
        gsap.set(el, { height: "auto", display: "block" });
      } else {
        gsap.set(el, { display: "block" });
        gsap.to(el, {
          height: "auto",
          duration: dur,
          ease: COLLAPSE_EASE,
          overwrite: true,
        });
      }
    } else {
      if (dur === 0) {
        releaseFocus();
        gsap.set(el, { height: 0, display: "none" });
      } else {
        gsap.to(el, {
          height: 0,
          duration: dur,
          ease: COLLAPSE_EASE,
          overwrite: true,
          onComplete: () => {
            releaseFocus();
            gsap.set(el, { display: "none" });
          },
        });
      }
    }

    return () => {
      gsap.killTweensOf(el);
    };
  }, [isOpen, duration, hasIndicator]);

  const requestToggle = () => {
    if (disabled) return;
    const next = !isOpen;
    if (open === undefined) setInternalOpen(next);
    onToggle?.(next);
  };

  const Heading = headerAs ?? "h3";
  const indicatorNode = indicator !== false && (
    <span className={styles.indicator} ref={indicatorRef} aria-hidden="true">
      {indicator === undefined ? <ChevronDown size={18} /> : indicator}
    </span>
  );
  const affordanceNode = actionLabel ? (
    <span className={styles.actionAffordance} aria-hidden="true">
      <span className={styles.actionLabel}>
        {isOpen ? actionLabel.open : actionLabel.closed}
      </span>
      {indicatorNode}
    </span>
  ) : (
    indicatorNode
  );

  return (
    <div
      id={panelId}
      className={clsx(styles.collapse, variant && styles[variant], className)}
      style={style}
    >
      <Heading className={clsx(styles.heading, headerClassName)}>
        <button
          type="button"
          id={triggerId}
          ref={triggerRef}
          className={styles.trigger}
          aria-expanded={isOpen}
          aria-controls={contentId}
          disabled={disabled}
          onClick={requestToggle}
        >
          {indicatorPosition === "start" && affordanceNode}
          <span className={styles.headerText}>{header}</span>
          {indicatorPosition === "end" && affordanceNode}
        </button>
      </Heading>
      <div
        ref={contentRef}
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        className={clsx(styles.content, contentClassName)}
      >
        <div className={styles.contentInner}>{children}</div>
      </div>
    </div>
  );
}

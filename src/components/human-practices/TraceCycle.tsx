import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";
import type { IhpPart, TraceStageId } from "./ihp-types";
import styles from "./trace-cycle.module.css";

const STAGES: Array<{
  id: TraceStageId;
  label: string;
  icon: string;
}> = [
  {
    id: "trigger",
    label: "Trigger",
    icon: "https://static.igem.wiki/teams/6147/wiki/01-trigger.svg",
  },
  {
    id: "reach-out",
    label: "Reach Out",
    icon: "https://static.igem.wiki/teams/6147/wiki/02-reach-out.svg",
  },
  {
    id: "analyze",
    label: "Analyze",
    icon: "https://static.igem.wiki/teams/6147/wiki/03-analyze.svg",
  },
  {
    id: "change",
    label: "Change",
    icon: "https://static.igem.wiki/teams/6147/wiki/04-change.svg",
  },
  {
    id: "evaluate",
    label: "Evaluate",
    icon: "https://static.igem.wiki/teams/6147/wiki/05-evaluate.svg",
  },
];

interface TraceCycleContextValue {
  isOpen: (cycle: number) => boolean;
  toggleCycle: (cycle: number) => void;
}

const TraceCycleContext = createContext<TraceCycleContextValue | null>(null);

function cycleId(number: number) {
  return `ihp-trace-${number}`;
}

function cyclePanelId(number: number) {
  return `${cycleId(number)}-content`;
}

function cycleTitleId(number: number) {
  return `${cycleId(number)}-title`;
}

function stageId(number: number, stage: TraceStageId) {
  return `${cycleId(number)}-${stage}`;
}

function stageTitleId(number: number, stage: TraceStageId) {
  return `${stageId(number, stage)}-title`;
}

function decodedHash(hash: string) {
  try {
    return decodeURIComponent(hash.replace(/^#/, ""));
  } catch {
    return hash.replace(/^#/, "");
  }
}

function fragmentCycleTarget(hash: string) {
  const id = decodedHash(hash);
  if (!id) return null;

  const target = document.getElementById(id);
  const cycle = target?.closest<HTMLElement>("[data-trace-cycle]") ?? null;
  if (!target || !cycle) return null;

  const number = Number(cycle.dataset.traceCycle);
  return Number.isFinite(number) ? { cycle, number, target } : null;
}

export function TraceCycleProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [openCycles, setOpenCycles] = useState<Set<number>>(() => new Set());
  const pendingFragment = useRef<string | null>(null);

  const setCycleOpen = useCallback((cycle: number, open: boolean) => {
    setOpenCycles((current) => {
      if (current.has(cycle) === open) return current;
      const next = new Set(current);
      if (open) {
        next.add(cycle);
      } else {
        next.delete(cycle);
      }
      return next;
    });
  }, []);

  const toggleCycle = useCallback((cycle: number) => {
    setOpenCycles((current) => {
      const next = new Set(current);
      if (next.has(cycle)) {
        next.delete(cycle);
      } else {
        next.add(cycle);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const target = fragmentCycleTarget(location.hash);
    pendingFragment.current = target ? location.hash : null;
    if (target) setCycleOpen(target.number, true);
  }, [location.hash, setCycleOpen]);

  useEffect(() => {
    const fragment = fragmentCycleTarget(location.hash);
    if (
      !fragment ||
      pendingFragment.current !== location.hash ||
      !openCycles.has(fragment.number)
    ) {
      return;
    }
    const root = document.getElementById("root");

    const focusTarget = () => {
      if (
        pendingFragment.current !== location.hash ||
        root?.hasAttribute("inert") ||
        decodedHash(location.hash) !== fragment.target.id
      ) {
        return false;
      }
      fragment.target.focus({ preventScroll: true });
      pendingFragment.current = null;
      return true;
    };
    const scrollTarget = () => {
      if (decodedHash(location.hash) !== fragment.target.id) return;
      fragment.target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    };

    const frame = requestAnimationFrame(() => {
      scrollTarget();
      focusTarget();
    });
    const focusTimer = window.setTimeout(focusTarget, 350);
    const observer =
      root?.hasAttribute("inert") && fragment.target.isConnected
        ? new MutationObserver(() => {
            if (!root.hasAttribute("inert") && focusTarget()) {
              scrollTarget();
              observer?.disconnect();
            }
          })
        : null;
    if (observer && root) {
      observer.observe(root, { attributes: true, attributeFilter: ["inert"] });
    }

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(focusTimer);
      observer?.disconnect();
    };
  }, [location.hash, openCycles]);

  const value = useMemo<TraceCycleContextValue>(
    () => ({
      isOpen: (cycle) => openCycles.has(cycle),
      toggleCycle,
    }),
    [openCycles, toggleCycle],
  );

  return (
    <TraceCycleContext.Provider value={value}>
      {children}
    </TraceCycleContext.Provider>
  );
}

function useTraceCycles() {
  const context = useContext(TraceCycleContext);
  if (!context) {
    throw new Error("TRACE cycles must be rendered inside TraceCycleProvider.");
  }
  return context;
}

export function TraceCycle({
  number,
  title,
  triggerSummary,
  impactSummary,
  stages,
  outro,
  renderParts,
}: {
  number: number;
  title: string;
  triggerSummary?: string;
  impactSummary?: string;
  stages: Array<{ stage: TraceStageId; label?: string; parts: IhpPart[] }>;
  outro?: IhpPart[];
  renderParts: (parts: IhpPart[]) => ReactNode;
}) {
  const byId = new Map(stages.map((stage) => [stage.stage, stage]));
  const { isOpen, toggleCycle } = useTraceCycles();
  const open = isOpen(number);
  const id = cycleId(number);
  const titleId = cycleTitleId(number);
  const panelId = cyclePanelId(number);

  return (
    <section
      id={id}
      className={styles.cycle}
      aria-label={`TRACE cycle ${number}`}
      data-trace-cycle={number}
      data-open={open ? "true" : "false"}
      tabIndex={-1}
    >
      <header className={styles.cycleHeader}>
        <div className={styles.cycleHeading}>
          <h3 id={titleId} className={styles.cycleTitle} tabIndex={-1}>
            <button
              type="button"
              className={styles.cycleToggle}
              aria-expanded={open}
              aria-controls={panelId}
              aria-label={`${open ? "Collapse" : "Expand"} TRACE cycle ${number}: ${title}`}
              onClick={() => toggleCycle(number)}
              onKeyDown={(event) => {
                if (event.key !== "Escape" || !open) return;
                event.preventDefault();
                toggleCycle(number);
              }}
            >
              <span>{title}</span>
              <span className={styles.cycleToggleState}>
                {open ? "Collapse" : "Expand"}
              </span>
              <ChevronDown
                className={styles.cycleChevron}
                data-open={open ? "true" : "false"}
                size={20}
                aria-hidden="true"
              />
            </button>
          </h3>
          <div className={styles.cyclePreview}>
            {triggerSummary && (
              <p className={styles.previewItem}>
                <span className={styles.previewLabel}>Trigger</span>
                <span className={styles.previewText} data-trace-preview>
                  {triggerSummary}
                </span>
              </p>
            )}
            {impactSummary && (
              <p className={styles.previewItem}>
                <span className={styles.previewLabel}>Impact</span>
                <span className={styles.previewText} data-trace-preview>
                  {impactSummary}
                </span>
              </p>
            )}
          </div>
        </div>
      </header>
      <div className={styles.cycleBody}>
        <div
          className={styles.cycleBodyInner}
          id={panelId}
          inert={!open}
          aria-hidden={!open}
        >
          <ol className={styles.stages}>
            {STAGES.map((stage) => {
              const content = byId.get(stage.id);
              if (!content?.parts.length) return null;
              // Keep source copy visible in the collapsed summary without
              // repeating the same sentence in the expanded stage heading.
              const descriptorRepeatedInSummary =
                content.label !== undefined &&
                (content.label === triggerSummary ||
                  content.label === impactSummary);
              return (
                <li
                  id={stageId(number, stage.id)}
                  className={styles.stage}
                  key={stage.id}
                  data-stage={stage.id}
                  tabIndex={-1}
                >
                  <h4
                    id={stageTitleId(number, stage.id)}
                    className={styles.stageHeading}
                    tabIndex={-1}
                  >
                    <img
                      src={stage.icon}
                      alt=""
                      aria-hidden="true"
                      width={170}
                      height={74}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className={styles.stageLabel}>{stage.label}</span>
                    {content.label && !descriptorRepeatedInSummary && (
                      <span className={styles.stageDescriptor}>
                        {content.label}
                      </span>
                    )}
                  </h4>
                  <div className={styles.stageBody}>
                    {renderParts(content.parts)}
                  </div>
                </li>
              );
            })}
          </ol>
          {outro?.length ? (
            <div className={styles.cycleOutro}>{renderParts(outro)}</div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

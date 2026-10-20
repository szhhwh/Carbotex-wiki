import {
  ChevronLeft,
  ChevronRight,
  Hammer,
  Lightbulb,
  Microscope,
  Route,
  type LucideIcon,
} from "lucide-react";
import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import clsx from "clsx";
import styles from "./engineering.module.css";

export type WetEngineeringPhase = "Design" | "Build" | "Test" | "Learn";

export interface WetEngineeringCycleData {
  id: string;
  title: string;
  phases: Record<WetEngineeringPhase, ReactNode>;
  methods: ReactNode;
}

const RING_SIZE = 360;
const RING_CENTER = RING_SIZE / 2;
const INNER_RADIUS = 92;
const OUTER_RADIUS = 158;

const phases: Array<{
  key: WetEngineeringPhase;
  icon: LucideIcon;
  start: number;
  shiftX: number;
  shiftY: number;
}> = [
  {
    key: "Design",
    icon: Route,
    start: -135,
    shiftX: 0,
    shiftY: -18,
  },
  {
    key: "Build",
    icon: Hammer,
    start: -45,
    shiftX: 18,
    shiftY: 0,
  },
  {
    key: "Test",
    icon: Microscope,
    start: 45,
    shiftX: 0,
    shiftY: 18,
  },
  {
    key: "Learn",
    icon: Lightbulb,
    start: 135,
    shiftX: -18,
    shiftY: 0,
  },
];

const SECTOR_DEGREES = 90;

function polar(radius: number, degrees: number) {
  const radians = (degrees * Math.PI) / 180;
  return {
    x: RING_CENTER + radius * Math.cos(radians),
    y: RING_CENTER + radius * Math.sin(radians),
  };
}

function sectorPath(start: number, end: number) {
  const outerStart = polar(OUTER_RADIUS, start);
  const outerEnd = polar(OUTER_RADIUS, end);
  const innerEnd = polar(INNER_RADIUS, end);
  const innerStart = polar(INNER_RADIUS, start);
  const largeArc = end - start > 180 ? 1 : 0;

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${INNER_RADIUS} ${INNER_RADIUS} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");
}

export function WetEngineeringCycle({
  cycles,
}: {
  cycles: WetEngineeringCycleData[];
}) {
  const headingId = useId();
  const [cycleIndex, setCycleIndex] = useState(0);
  const [phase, setPhase] = useState<WetEngineeringPhase>("Design");
  const panelRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeCycle = cycles[cycleIndex];

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (panel) panel.scrollTop = 0;
  }, [cycleIndex, phase]);

  if (!activeCycle) return null;

  const selectCycle = (index: number) => {
    setCycleIndex(index);
    setPhase("Design");
  };

  const moveCycle = (direction: -1 | 1) => {
    const next = (cycleIndex + direction + cycles.length) % cycles.length;
    selectCycle(next);
  };

  const selectAdjacentCycle = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (
      event.key !== "ArrowLeft" &&
      event.key !== "ArrowRight" &&
      event.key !== "Home" &&
      event.key !== "End"
    ) {
      return;
    }
    event.preventDefault();
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? cycles.length - 1
          : (index + (event.key === "ArrowRight" ? 1 : -1) + cycles.length) %
            cycles.length;
    selectCycle(next);
    requestAnimationFrame(() => {
      tabRefs.current[next]?.focus();
    });
  };

  return (
    <section
      className={styles.console}
      aria-labelledby={headingId}
      data-wet-engineering-console
    >
      <div
        className={styles.cycleTabs}
        role="tablist"
        aria-label="Engineering cycles"
      >
        {cycles.map((cycle, index) => (
          <button
            id={`${headingId}-cycle-${index}`}
            className={styles.cycleTab}
            type="button"
            role="tab"
            key={cycle.id}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            aria-selected={index === cycleIndex}
            aria-controls={`${headingId}-panel`}
            tabIndex={index === cycleIndex ? 0 : -1}
            onClick={() => selectCycle(index)}
            onKeyDown={(event) => selectAdjacentCycle(event, index)}
          >
            Cycle {index + 1}
          </button>
        ))}
      </div>

      <div className={styles.consoleGrid}>
        <div className={styles.ringColumn}>
          <div
            className={styles.ring}
            role="group"
            aria-label="Design, Build, Test and Learn stages"
          >
            <svg
              className={styles.ringSvg}
              viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
              aria-hidden="true"
              focusable="false"
            >
              <circle
                className={styles.ringTrack}
                cx={RING_CENTER}
                cy={RING_CENTER}
                r={(INNER_RADIUS + OUTER_RADIUS) / 2}
              />
              {phases.map((item) => (
                <g
                  className={clsx(
                    styles.sectorGroup,
                    phase === item.key && styles.sectorActive,
                  )}
                  data-phase={item.key}
                  key={item.key}
                  style={
                    {
                      "--sector-x": `${item.shiftX}px`,
                      "--sector-y": `${item.shiftY}px`,
                    } as CSSProperties
                  }
                  onClick={() => setPhase(item.key)}
                >
                  <path
                    className={styles.sector}
                    d={sectorPath(
                      item.start + 1.5,
                      item.start + SECTOR_DEGREES - 1.5,
                    )}
                  />
                </g>
              ))}
            </svg>

            {phases.map((item) => {
              const Icon = item.icon;
              const point = polar(
                (INNER_RADIUS + OUTER_RADIUS) / 2,
                item.start + SECTOR_DEGREES / 2,
              );

              return (
                <button
                  className={styles.phaseButton}
                  data-phase={item.key}
                  style={
                    {
                      "--point-x": `${(point.x / RING_SIZE) * 100}%`,
                      "--point-y": `${(point.y / RING_SIZE) * 100}%`,
                    } as CSSProperties
                  }
                  type="button"
                  key={item.key}
                  aria-pressed={phase === item.key}
                  onClick={() => setPhase(item.key)}
                >
                  <Icon size={19} strokeWidth={1.7} aria-hidden="true" />
                  <span>{item.key}</span>
                </button>
              );
            })}

            <div className={styles.iterationControl}>
              <button
                type="button"
                aria-label="Previous cycle"
                onClick={() => moveCycle(-1)}
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <span>
                Cycle {cycleIndex + 1} of {cycles.length}
              </span>
              <button
                type="button"
                aria-label="Next cycle"
                onClick={() => moveCycle(1)}
              >
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div
          className={styles.contentPanel}
          id={`${headingId}-panel`}
          ref={panelRef}
          role="tabpanel"
          data-phase={phase}
          aria-labelledby={`${headingId}-cycle-${cycleIndex}`}
          tabIndex={0}
        >
          <header className={styles.contentHeader}>
            <h3 id={headingId}>{activeCycle.title}</h3>
            <h4 aria-live="polite">
              Cycle {cycleIndex + 1} of {cycles.length} · {phase}
            </h4>
          </header>
          <div className={styles.phaseContent}>{activeCycle.phases[phase]}</div>
          <footer className={styles.methods}>{activeCycle.methods}</footer>
        </div>
      </div>
    </section>
  );
}

import { useId, type ReactNode } from "react";
import clsx from "clsx";
import {
  Check,
  ChevronRight,
  FlaskConical,
  Hammer,
  Lightbulb,
  Microscope,
  Route,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import styles from "./engineering-sections.module.css";

export function EngineeringBrief({
  core,
  goal,
  integration,
  objectives,
}: {
  core: ReactNode;
  goal: ReactNode;
  integration: ReactNode;
  objectives: string[];
}) {
  const headingId = useId();
  const briefItems = [
    { icon: FlaskConical, label: "Core approach", text: core },
    { icon: Workflow, label: "Design goal", text: goal },
    { icon: Route, label: "Integration target", text: integration },
  ];

  return (
    <section
      className={clsx(styles.scope, styles.brief)}
      aria-labelledby={headingId}
    >
      <h3 id={headingId}>Engineering brief</h3>
      <div className={styles.briefGrid}>
        {briefItems.map(({ icon: Icon, label, text }) => (
          <div className={styles.briefItem} key={label}>
            <span className={styles.briefIcon} aria-hidden="true">
              <Icon size={20} strokeWidth={1.6} />
            </span>
            <div>
              <h4>{label}</h4>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.objectiveHeading}>
        <span>Key objectives</span>
      </div>
      <ul className={styles.objectiveList}>
        {objectives.map((objective) => (
          <li key={objective}>
            <Check size={15} aria-hidden="true" />
            {objective}
          </li>
        ))}
      </ul>
    </section>
  );
}

export interface CycleSummaryItem {
  id: string;
  title: string;
  focus: string;
  achievement: string;
}

export function CycleJourney({ items }: { items: CycleSummaryItem[] }) {
  return (
    <nav
      className={clsx(styles.scope, styles.cycleJourney)}
      aria-label="Engineering cycle shortcuts"
    >
      <span className={styles.journeyLabel}>DBTL cycle map</span>
      <ol className={styles.journeyTrack} data-cols={items.length}>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>
              <span className={styles.journeyCopy}>
                <strong>{item.title}</strong>
                <small>{item.focus}</small>
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export type DbtlPhase = "Design" | "Build" | "Test" | "Learn";

export interface DbtlPhaseContent {
  phase: DbtlPhase;
  content: ReactNode;
}

export interface BuildManifestItem {
  name: string;
  detail: string;
}

export function BuildManifest({ items }: { items: BuildManifestItem[] }) {
  return (
    <ul className={styles.manifest}>
      {items.map((item) => (
        <li key={item.name}>
          <span aria-hidden="true">
            <Check size={13} />
          </span>
          <div>
            <strong>{item.name}</strong>
            <p>{item.detail}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export interface Finding {
  title: string;
  text: string;
}

export function FindingList({
  items,
  tone = "neutral",
}: {
  items: Finding[];
  tone?: "neutral" | "outcome";
}) {
  return (
    <ul
      className={clsx(
        styles.findings,
        tone === "outcome" && styles.findingsPositive,
      )}
    >
      {items.map((item) => (
        <li key={item.title}>
          <span className={styles.findingMark} aria-hidden="true">
            {tone === "outcome" && <Check size={13} />}
          </span>
          <div>
            <strong>{item.title}</strong>
            <p>{item.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export interface LoopItem {
  name: string;
  fluid: string;
  detail: string;
}

export function LoopCards({ items }: { items: LoopItem[] }) {
  return (
    <div className={styles.loopCards}>
      {items.map((item) => (
        <div className={styles.loopItem} key={item.name}>
          <span>{item.fluid}</span>
          <h4>{item.name}</h4>
          <p>{item.detail}</p>
        </div>
      ))}
    </div>
  );
}

export interface ProcessStep {
  label: string;
  detail?: string;
}

export function ProcessSequence({
  steps,
}: {
  steps: Array<string | ProcessStep>;
}) {
  const detailed = steps.some((step) => typeof step !== "string");

  return (
    <ol className={clsx(styles.sequence, detailed && styles.sequenceDetailed)}>
      {steps.map((step, index) => {
        const item = typeof step === "string" ? { label: step } : step;
        return (
          <li key={`${item.label}-${index}`}>
            <span aria-hidden={detailed || undefined}>
              {detailed ? index + 1 : item.label}
            </span>
            {detailed && (
              <div>
                <strong>{item.label}</strong>
                {item.detail && <small>{item.detail}</small>}
              </div>
            )}
            {!detailed && index < steps.length - 1 && (
              <ChevronRight size={15} aria-hidden="true" />
            )}
          </li>
        );
      })}
    </ol>
  );
}

export interface Subsystem {
  title: string;
  text: string;
}

export function SubsystemGrid({ items }: { items: Subsystem[] }) {
  return (
    <div className={styles.subsystems}>
      {items.map((item) => (
        <div className={styles.subsystemItem} key={item.title}>
          <span className={styles.subsystemMark} aria-hidden="true" />
          <h4>{item.title}</h4>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
}

const phaseIcons: Record<DbtlPhase, LucideIcon> = {
  Design: Route,
  Build: Hammer,
  Test: Microscope,
  Learn: Lightbulb,
};

function PhaseHeader({ phase }: { phase: DbtlPhase }) {
  const Icon = phaseIcons[phase];

  return (
    <header className={styles.phaseHeader}>
      <span aria-hidden="true">
        <Icon size={18} strokeWidth={1.7} />
      </span>
      <h3>{phase}</h3>
    </header>
  );
}

function CyclePhase({
  phase,
  content,
  className,
  children,
}: {
  phase: DbtlPhase;
  content: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <section
      className={clsx(styles.phase, styles[`phase_${phase}`], className)}
      aria-label={`${phase} phase`}
      data-phase={phase}
    >
      <PhaseHeader phase={phase} />
      <div className={styles.phaseBody}>{content}</div>
      {children}
    </section>
  );
}

function CycleInsight({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <aside className={clsx(styles.insight, className)}>
      <Lightbulb size={19} strokeWidth={1.7} aria-hidden="true" />
      <div>
        <span>Key insight</span>
        <p>{children}</p>
      </div>
    </aside>
  );
}

function CycleBubbles({ className }: { className?: string }) {
  return (
    <svg
      className={clsx(styles.cycleBubbles, className)}
      viewBox="0 0 180 100"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="30" cy="70" r="9" />
      <circle cx="52" cy="45" r="16" />
      <circle cx="75" cy="67" r="24" />
      <circle cx="99" cy="39" r="12" />
      <circle cx="119" cy="64" r="20" />
      <circle cx="143" cy="43" r="9" />
      <circle cx="164" cy="68" r="14" />
      <circle cx="20" cy="35" r="6" />
      <circle cx="126" cy="87" r="11" />
    </svg>
  );
}

function phaseContent(phases: DbtlPhaseContent[], phase: DbtlPhase) {
  return phases.find((candidate) => candidate.phase === phase);
}

export function DbtlCycle({
  number,
  title,
  focus,
  phases,
  media,
  mediaAfter = "Learn",
  insight,
}: {
  number: number;
  title: string;
  focus: string;
  phases: DbtlPhaseContent[];
  media?: ReactNode;
  mediaAfter?: DbtlPhase;
  insight: ReactNode;
}) {
  const design = phaseContent(phases, "Design");
  const build = phaseContent(phases, "Build");
  const test = phaseContent(phases, "Test");
  const learn = phaseContent(phases, "Learn");
  const articleLabel = `Cycle ${number}: ${title} phases`;

  if (!design || !build || !test || !learn) {
    return null;
  }

  return (
    <article
      className={clsx(styles.scope, styles.cycle)}
      aria-label={articleLabel}
      data-cycle={number}
    >
      <header className={styles.cycleIntro}>
        <p className={styles.cycleFocus}>{focus}</p>
        <CycleBubbles className={styles.cycleBubbles} />
      </header>
      <div className={styles.phaseFlow}>
        {phases.map(({ phase, content }) => (
          <CyclePhase key={phase} phase={phase} content={content}>
            {media && phase === mediaAfter && (
              <div className={styles.phaseMedia}>{media}</div>
            )}
            {phase === "Learn" && <CycleInsight>{insight}</CycleInsight>}
          </CyclePhase>
        ))}
      </div>
    </article>
  );
}

export function EngineeringSummary({ items }: { items: CycleSummaryItem[] }) {
  const headingId = useId();

  return (
    <section
      className={clsx(styles.scope, styles.summary)}
      aria-labelledby={headingId}
    >
      <div className={styles.summaryHeader}>
        <h3 id={headingId}>From manual column to connected platform</h3>
      </div>
      <ol>
        {items.map((item) => (
          <li key={item.id}>
            <span>{item.focus}</span>
            <h4>{item.title}</h4>
            <p>{item.achievement}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

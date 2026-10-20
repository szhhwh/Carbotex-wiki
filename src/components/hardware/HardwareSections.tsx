import { useId, useState, type CSSProperties, type ReactNode } from "react";
import clsx from "clsx";
import {
  Activity,
  ArrowRight,
  Beaker,
  Box,
  Check,
  ChevronDown,
  CircuitBoard,
  Cloud,
  Cpu,
  Droplets,
  FileSearch,
  FlaskConical,
  Gauge,
  Radio,
  RotateCcw,
  ShieldCheck,
  Thermometer,
  Timer,
  TriangleAlert,
  VideoOff,
  Waves,
  Wifi,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Caption } from "../media/Caption";
import styles from "./hardware-sections.module.css";

type TakeawayIcon = "exchange" | "cost" | "iot" | "validation";
type CatalogGroupId =
  | "fluidic"
  | "chemistry"
  | "structure"
  | "sensing"
  | "control";
type SensorIcon = "ph" | "temperature" | "turbidity" | "level";

const takeawayIcons: Record<TakeawayIcon, LucideIcon> = {
  exchange: Droplets,
  cost: Wallet,
  iot: Radio,
  validation: ShieldCheck,
};

const catalogIcons: Record<CatalogGroupId, LucideIcon> = {
  fluidic: Droplets,
  chemistry: FlaskConical,
  structure: Box,
  sensing: Gauge,
  control: Cpu,
};

const sensorIcons: Record<SensorIcon, LucideIcon> = {
  ph: Beaker,
  temperature: Thermometer,
  turbidity: Waves,
  level: Activity,
};

export interface HardwareTakeaway {
  metric: string;
  title: string;
  text: string;
  icon: TakeawayIcon;
}

export function HardwareTakeaways({ items }: { items: HardwareTakeaway[] }) {
  const headingId = useId();

  return (
    <section
      className={clsx(styles.scope, styles.takeaways)}
      aria-labelledby={headingId}
    >
      <h3 id={headingId}>Platform at a glance</h3>
      <div className={styles.takeawayGrid}>
        {items.map((item) => {
          const Icon = takeawayIcons[item.icon];
          return (
            <article className={styles.takeawayCard} key={item.title}>
              <div className={styles.takeawayMetric}>
                <Icon size={26} strokeWidth={1.8} aria-hidden="true" />
                <strong>{item.metric}</strong>
              </div>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export interface FlowLane {
  id: "fluid" | "data";
  title: string;
  steps: string[];
}

const laneIcons: Record<FlowLane["id"], LucideIcon> = {
  fluid: Droplets,
  data: Cpu,
};

export function SystemFlowMap({ lanes }: { lanes: FlowLane[] }) {
  const headingId = useId();

  return (
    <section
      className={clsx(styles.scope, styles.flowMap)}
      aria-labelledby={headingId}
    >
      <div className={styles.flowMapHeader}>
        <h3 id={headingId}>System map</h3>
      </div>
      <div className={styles.lanes}>
        {lanes.map((lane) => {
          const Icon = laneIcons[lane.id];
          return (
            <div
              className={clsx(styles.lane, styles[`lane_${lane.id}`])}
              key={lane.id}
            >
              <div className={styles.laneHeading}>
                <span className={styles.laneIcon} aria-hidden="true">
                  <Icon size={20} strokeWidth={1.7} />
                </span>
                <div>
                  <strong>{lane.title}</strong>
                </div>
              </div>
              <ol className={styles.flowSteps}>
                {lane.steps.map((step, index) => (
                  <li key={step}>
                    <span>{step}</span>
                    {index < lane.steps.length - 1 && (
                      <ArrowRight
                        className={styles.flowArrow}
                        size={16}
                        aria-hidden="true"
                      />
                    )}
                  </li>
                ))}
              </ol>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export interface CatalogPart {
  name: string;
  specification: string;
  function: string;
}

export interface CatalogGroup {
  id: CatalogGroupId;
  label: string;
  parts: CatalogPart[];
}

function splitCatalogGroups(groups: CatalogGroup[]) {
  const entries = groups.map((group, index) => ({ group, index }));
  const midpoint =
    entries.reduce((sum, { group }) => sum + group.parts.length + 1, 0) / 2;
  let bestMask = 1;
  let bestDistance = Number.POSITIVE_INFINITY;

  // Balance projected card heights while keeping the first family visually
  // first. Each family has one header and one row per part.
  for (let mask = 1; mask < 1 << entries.length; mask += 2) {
    const weight = entries.reduce(
      (sum, { group }, index) =>
        sum + (mask & (1 << index) ? 0 : group.parts.length + 1),
      0,
    );
    const distance = Math.abs(weight - midpoint);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestMask = mask;
    }
  }

  return [
    entries.filter((_, index) => bestMask & (1 << index)),
    entries.filter((_, index) => !(bestMask & (1 << index))),
  ];
}

export function ComponentCatalog({ groups }: { groups: CatalogGroup[] }) {
  const headingId = useId();
  const columns = splitCatalogGroups(groups);
  const accessibleOrder = groups
    .map((group) => `catalog-group-${group.id}`)
    .join(" ");

  return (
    <section
      className={clsx(styles.scope, styles.catalog)}
      aria-labelledby={headingId}
    >
      <div className={styles.catalogHeader}>
        <div>
          <h3 id={headingId}>Five component families</h3>
        </div>
      </div>
      <div className={styles.catalogGrid} aria-owns={accessibleOrder}>
        {columns.map((column, columnIndex) => (
          <div
            className={styles.catalogColumn}
            key={columnIndex}
            data-catalog-column={columnIndex + 1}
          >
            {column.map(({ group, index }) => {
              const Icon = catalogIcons[group.id];
              return (
                <article
                  id={`catalog-group-${group.id}`}
                  className={clsx(
                    styles.catalogCard,
                    styles[`group_${group.id}`],
                  )}
                  key={group.id}
                  data-catalog-group={group.id}
                  style={{ "--catalog-order": index } as CSSProperties}
                >
                  <header className={styles.catalogCardHeader}>
                    <span className={styles.catalogIcon} aria-hidden="true">
                      <Icon size={22} strokeWidth={1.6} />
                    </span>
                    <h4>{group.label}</h4>
                  </header>
                  <ul className={styles.partList}>
                    {group.parts.map((part) => (
                      <li key={part.name}>
                        <div className={styles.partTopline}>
                          <strong>{part.name}</strong>
                          <span className={styles.partSpecification}>
                            {part.specification}
                          </span>
                        </div>
                        <p>{part.function}</p>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}

export interface OperationStep {
  phase: string;
  title: string;
  detail: string;
}

export function OperationLoop({ steps }: { steps: OperationStep[] }) {
  const headingId = useId();

  return (
    <section
      className={clsx(styles.scope, styles.operationLoop)}
      aria-labelledby={headingId}
    >
      <div className={styles.operationHeader}>
        <div>
          <h3 id={headingId}>Automatic operation</h3>
        </div>
        <span className={styles.loopBadge}>
          <RotateCcw size={16} aria-hidden="true" />
          Repeats after wash
        </span>
      </div>
      <ol className={styles.operationSteps}>
        {steps.map((step, index) => (
          <li key={step.title} data-operation-step={index + 1}>
            <div className={styles.operationLabel}>
              <span className={styles.operationPhase}>{step.phase}</span>
              <h4>{step.title}</h4>
            </div>
            <p>{step.detail}</p>
            {index < steps.length - 1 && (
              <span className={styles.operationConnector} aria-hidden="true">
                <ArrowRight size={24} strokeWidth={2} />
              </span>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

export interface FailureMode {
  risk: string;
  consequence: string;
  mitigation: string;
}

export function FailureMatrix({ items }: { items: FailureMode[] }) {
  const headingId = useId();
  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set([0]));

  const toggleItem = (index: number) => {
    setOpenItems((previous) => {
      const next = new Set(previous);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <section
      className={clsx(styles.scope, styles.failureMatrix)}
      aria-labelledby={headingId}
    >
      <div className={styles.failureHeader}>
        <span className={styles.failureSymbol} aria-hidden="true">
          <TriangleAlert size={20} strokeWidth={1.7} />
        </span>
        <div>
          <h3 id={headingId}>What can fail, and what happens next</h3>
        </div>
      </div>
      <div className={styles.failureList}>
        {items.map((item, index) => {
          const open = openItems.has(index);
          const panelId = `${headingId}-failure-${index + 1}`;
          return (
            <div
              className={styles.failureItem}
              key={item.risk}
              data-failure-item={index + 1}
              data-open={open}
            >
              <button
                type="button"
                className={styles.failureSummary}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggleItem(index)}
              >
                <span className={styles.failureRisk}>{item.risk}</span>
                <span className={styles.failureConsequence}>
                  {item.consequence}
                </span>
                <span className={styles.failureChevron} aria-hidden="true">
                  <ChevronDown size={20} />
                </span>
              </button>
              <div
                className={styles.failureDisclosure}
                id={panelId}
                aria-hidden={!open}
                data-failure-panel
              >
                <div className={styles.failureBody}>
                  <div className={styles.failureBodyInner}>
                    <span>Mitigation</span>
                    <p>{item.mitigation}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function ValidationSnapshot({ signals }: { signals: string[] }) {
  return (
    <aside className={clsx(styles.scope, styles.validation)}>
      <div>
        <strong>Validated with anaerobic fermentation effluent</strong>
      </div>
      <ul>
        {signals.map((signal) => (
          <li key={signal}>
            <Check size={20} aria-hidden="true" />
            {signal}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export interface IoTNodeGroup {
  label: string;
  nodes: string[];
  detail?: string;
}

const iotGroupIcons: LucideIcon[] = [Gauge, Cpu, Cloud];

export function IoTSystemMap({ groups }: { groups: IoTNodeGroup[] }) {
  const headingId = useId();

  return (
    <section
      className={clsx(styles.scope, styles.iotMap)}
      aria-labelledby={headingId}
    >
      <div className={styles.iotHeader}>
        <div>
          <h3 id={headingId}>From the board to the cloud</h3>
        </div>
        <span className={styles.iotProtocol}>
          <Wifi size={16} aria-hidden="true" />
          OneNET · MQTT-style
        </span>
      </div>
      <div className={styles.iotChain}>
        {groups.map((group, index) => {
          const Icon = iotGroupIcons[index] ?? CircuitBoard;
          return (
            <div className={styles.iotGroup} key={group.label} data-iot-group>
              <div className={styles.iotGroupTitle}>
                <span aria-hidden="true">
                  <Icon size={24} strokeWidth={1.8} />
                </span>
                <strong>{group.label}</strong>
              </div>
              <ul>
                {group.nodes.map((node) => (
                  <li key={node}>{node}</li>
                ))}
              </ul>
              {group.detail && <p>{group.detail}</p>}
              {index < groups.length - 1 && (
                <span className={styles.iotConnector} aria-hidden="true">
                  <ArrowRight size={24} />
                </span>
              )}
            </div>
          );
        })}
      </div>
      <p className={styles.iotFootnote}>
        <CircuitBoard size={16} aria-hidden="true" />
        pH and turbidity are used in experiments and displayed in the user
        application, while the compact development board itself carries the
        DHT11 sensor, OLED, ESP8266, and controller.
      </p>
    </section>
  );
}

export interface CalibrationEntry {
  sensor: string;
  method: string;
  accuracy: string;
  response: string;
  icon: SensorIcon;
}

export function CalibrationGrid({ entries }: { entries: CalibrationEntry[] }) {
  const headingId = useId();

  return (
    <section
      className={clsx(styles.scope, styles.calibration)}
      aria-labelledby={headingId}
    >
      <div className={styles.calibrationHeader}>
        <h3 id={headingId}>Measured accuracy and response</h3>
      </div>
      <div className={styles.calibrationGrid}>
        {entries.map((entry) => {
          const Icon = sensorIcons[entry.icon];
          return (
            <article
              className={styles.calibrationCard}
              key={entry.sensor}
              data-calibration={entry.icon}
            >
              <header>
                <span aria-hidden="true">
                  <Icon size={20} strokeWidth={1.7} />
                </span>
                <h4>{entry.sensor}</h4>
              </header>
              <dl>
                <div>
                  <dt>Accuracy</dt>
                  <dd>{entry.accuracy}</dd>
                </div>
                <div>
                  <dt>Response</dt>
                  <dd>
                    <Timer size={19} aria-hidden="true" />
                    {entry.response}
                  </dd>
                </div>
              </dl>
              <p>{entry.method}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export interface Safeguard {
  title: string;
  detail: string;
}

export function SafeguardGrid({ items }: { items: Safeguard[] }) {
  return (
    <div className={clsx(styles.scope, styles.safeguards)}>
      {items.map((item) => (
        <article key={item.title}>
          <ShieldCheck size={26} strokeWidth={1.8} aria-hidden="true" />
          <h4>{item.title}</h4>
          <p>{item.detail}</p>
        </article>
      ))}
    </div>
  );
}

export interface OutlookStage {
  horizon: string;
  title: string;
  text: string;
}

export function OutlookRoadmap({ stages }: { stages: OutlookStage[] }) {
  return (
    <ol className={clsx(styles.scope, styles.outlook)}>
      {stages.map((stage) => (
        <li key={stage.title}>
          <span className={styles.outlookNode} aria-hidden="true" />
          <span>{stage.horizon}</span>
          <h3>{stage.title}</h3>
          <p>{stage.text}</p>
        </li>
      ))}
    </ol>
  );
}

export type BudgetGroupId = CatalogGroupId;

export interface BudgetItem {
  number: number;
  name: string;
  quantity: number;
  unitCost: number;
  cost: number;
  group: BudgetGroupId;
}

const budgetGroups: Array<{ id: BudgetGroupId; label: string }> = [
  { id: "structure", label: "Structure" },
  { id: "control", label: "Control" },
  { id: "sensing", label: "Sensing" },
  { id: "fluidic", label: "Fluidic" },
  { id: "chemistry", label: "Resin" },
];

export function BudgetExplorer({ items }: { items: BudgetItem[] }) {
  const [activeGroup, setActiveGroup] = useState<BudgetGroupId | "all">("all");
  const headingId = useId();
  const listId = useId();
  const total = items.reduce((sum, item) => sum + item.cost, 0);
  const visibleItems =
    activeGroup === "all"
      ? items
      : items.filter((item) => item.group === activeGroup);
  const visibleTotal = visibleItems.reduce((sum, item) => sum + item.cost, 0);
  const groupTotals = budgetGroups.map((group) => ({
    ...group,
    total: items
      .filter((item) => item.group === group.id)
      .reduce((sum, item) => sum + item.cost, 0),
    count: items.filter((item) => item.group === group.id).length,
  }));
  const activeLabel =
    activeGroup === "all"
      ? "all subsystems"
      : budgetGroups.find((group) => group.id === activeGroup)?.label;

  return (
    <section
      className={clsx(styles.scope, styles.budget)}
      aria-labelledby={headingId}
    >
      <div className={styles.budgetSummary}>
        <div>
          <h3 id={headingId}>Device budget</h3>
        </div>
        <div
          className={styles.budgetTotal}
          data-budget-total={total.toFixed(2)}
        >
          <span>Total hardware cost</span>
          <strong>${total.toFixed(2)}</strong>
        </div>
      </div>

      <div
        className={styles.budgetBar}
        aria-label="Spend by subsystem"
        role="img"
      >
        {groupTotals.map((group) => (
          <span
            key={group.id}
            className={clsx(
              styles[`bar_${group.id}`],
              activeGroup !== "all" &&
                activeGroup !== group.id &&
                styles.barMuted,
            )}
            style={
              {
                "--budget-share": `${(group.total / total) * 100}%`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div
        className={styles.budgetFilters}
        role="group"
        aria-label="Filter budget by subsystem"
      >
        <button
          type="button"
          aria-pressed={activeGroup === "all"}
          aria-controls={listId}
          onClick={() => setActiveGroup("all")}
          data-budget-filter="all"
        >
          <span>All</span>
          <strong>${total.toFixed(2)}</strong>
        </button>
        {groupTotals.map((group) => (
          <button
            key={group.id}
            type="button"
            aria-pressed={activeGroup === group.id}
            aria-controls={listId}
            onClick={() => setActiveGroup(group.id)}
            data-budget-filter={group.id}
          >
            <span>
              <i
                className={styles[`budgetDot_${group.id}`]}
                aria-hidden="true"
              />
              {group.label}
            </span>
            <strong>${group.total.toFixed(2)}</strong>
          </button>
        ))}
      </div>

      <div className={styles.budgetListHeader}>
        <p aria-live="polite" role="status">
          Showing {visibleItems.length} of {items.length} items for{" "}
          {activeLabel}
        </p>
        <strong data-budget-visible-total>${visibleTotal.toFixed(2)}</strong>
      </div>

      <ol className={styles.budgetList} id={listId}>
        {visibleItems.map((item) => (
          <li
            key={item.number}
            value={item.number}
            data-budget-item={item.number}
          >
            <span className={styles.budgetNumber} aria-hidden="true">
              {String(item.number).padStart(2, "0")}
            </span>
            <div>
              <strong>{item.name}</strong>
              <span>
                {item.quantity} × ${item.unitCost.toFixed(2)}
              </span>
            </div>
            <strong className={styles.budgetCost}>
              ${item.cost.toFixed(2)}
            </strong>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function MediaPair({ children }: { children: ReactNode }) {
  return <div className={clsx(styles.scope, styles.mediaPair)}>{children}</div>;
}

export function PendingMedia({
  label,
  file,
  captionPrefix,
  caption,
}: {
  label: string;
  file: string;
  captionPrefix: string;
  caption: string;
}) {
  return (
    <figure className={clsx(styles.scope, styles.pendingMedia)}>
      <div className={styles.pendingFrame}>
        <div className={styles.pendingContent}>
          <FileSearch size={30} strokeWidth={1.6} aria-hidden="true" />
          <strong>{label}</strong>
          <span>{file}</span>
          <small>Source asset awaiting a working upload</small>
        </div>
      </div>
      <Caption prefix={captionPrefix}>{caption}</Caption>
    </figure>
  );
}

export function UnavailableVideo({
  label,
  source,
  captionPrefix,
  caption,
}: {
  label: string;
  source: string;
  captionPrefix: string;
  caption: string;
}) {
  return (
    <figure
      className={clsx(
        styles.scope,
        styles.pendingMedia,
        styles.videoUnavailable,
      )}
      data-video-state="unavailable"
    >
      <div className={styles.pendingFrame}>
        <div className={styles.pendingContent}>
          <VideoOff size={30} strokeWidth={1.6} aria-hidden="true" />
          <strong>{label}</strong>
          <span>{source}</span>
          <small>Public playback is unavailable from the iGEM media host</small>
        </div>
      </div>
      <Caption prefix={captionPrefix}>{caption}</Caption>
    </figure>
  );
}

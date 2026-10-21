import { Cpu, FlaskConical, Network, type LucideIcon } from "lucide-react";
import styles from "./engineering.module.css";

export type EngineeringMode = "hardware" | "wetlab" | "model";

const modes: Array<{
  value: EngineeringMode;
  label: string;
  icon: LucideIcon;
}> = [
  { value: "hardware", label: "Hardware", icon: Cpu },
  { value: "wetlab", label: "Wet Lab", icon: FlaskConical },
  { value: "model", label: "Model", icon: Network },
];

export function EngineeringModeSwitch({
  value,
  onChange,
}: {
  value: EngineeringMode;
  onChange: (mode: EngineeringMode) => void;
}) {
  return (
    <div className={styles.modeSwitchRow}>
      <div
        className={styles.modeSwitch}
        role="group"
        style={{
          gridTemplateColumns: `repeat(${modes.length}, minmax(0, 1fr))`,
        }}
        aria-label="Engineering pathway"
        data-active={value}
        data-engineering-mode-switch
      >
        <span
          className={styles.modeIndicator}
          style={{
            width: `calc((100% - var(--mode-switch-pad) * 2) / ${modes.length})`,
            transform: `translateX(${modes.findIndex((mode) => mode.value === value) * 100}%)`,
          }}
          data-mode-indicator
          aria-hidden="true"
        />
        {modes.map((mode) => {
          const Icon = mode.icon;

          return (
            <button
              className={styles.modeButton}
              type="button"
              style={{
                flexWrap: "wrap",
                columnGap: "0.3rem",
                rowGap: "0.25rem",
              }}
              key={mode.value}
              aria-pressed={value === mode.value}
              aria-controls="article-body"
              data-mode={mode.value}
              onClick={() => onChange(mode.value)}
            >
              <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
              <span>{mode.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

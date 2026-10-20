import { Cpu, FlaskConical, type LucideIcon } from "lucide-react";
import styles from "./engineering.module.css";

export type EngineeringMode = "hardware" | "wetlab";

const modes: Array<{
  value: EngineeringMode;
  label: string;
  icon: LucideIcon;
}> = [
  { value: "hardware", label: "Hardware", icon: Cpu },
  { value: "wetlab", label: "Wet Lab", icon: FlaskConical },
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
        aria-label="Engineering pathway"
        data-active={value}
        data-engineering-mode-switch
      >
        <span
          className={styles.modeIndicator}
          data-mode-indicator
          aria-hidden="true"
        />
        {modes.map((mode) => {
          const Icon = mode.icon;

          return (
            <button
              className={styles.modeButton}
              type="button"
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

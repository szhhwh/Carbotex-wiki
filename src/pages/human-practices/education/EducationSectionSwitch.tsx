import styles from "./education-section-switch.module.css";

export type EducationSectionMode =
  | "overview"
  | "activity"
  | "resource-reuse"
  | "conclusion";

const sections: Array<{ value: EducationSectionMode; label: string }> = [
  { value: "overview", label: "Overview" },
  { value: "activity", label: "Activity" },
  { value: "resource-reuse", label: "Resource Reuse" },
  { value: "conclusion", label: "Conclusion" },
];

export function EducationSectionSwitch({
  value,
  onChange,
}: {
  value: EducationSectionMode;
  onChange: (mode: EducationSectionMode) => void;
}) {
  return (
    <div
      className={styles.switch}
      role="group"
      aria-label="Education sections"
      data-education-section-switch
    >
      {sections.map((section) => (
        <button
          className={styles.button}
          type="button"
          key={section.value}
          aria-pressed={value === section.value}
          aria-controls="article-body"
          onClick={() => onChange(section.value)}
        >
          <span>{section.label}</span>
        </button>
      ))}
    </div>
  );
}

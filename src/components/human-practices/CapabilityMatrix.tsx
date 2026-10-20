import { CircleDot, MoveRight } from "lucide-react";
import styles from "./capability-matrix.module.css";

const ROWS = [
  {
    area: "Fermentation",
    explored:
      "Engineered A08 strains, fermentation under different sugar conditions, and PMA concentration measurements",
    next: "Production stability, batch consistency, and process control",
  },
  {
    area: "Process integration",
    explored:
      "Laboratory fermentation, PMA functionalization, and downstream preparation; modular pretreatment explored in Hardware design",
    next: "Compatibility between process steps, material transfer, and processing efficiency",
  },
  {
    area: "Research evidence",
    explored:
      "Experimental and modeling records; PMA–DA case demonstrations using WetFlow",
    next: "Consistent documentation, cross-module evidence review, and traceability",
  },
  {
    area: "Engineering iteration",
    explored: "Successive rounds of biological and material experimentation",
    next: "Standardized conditions, reproducible evaluation, and systematic feedback into future designs",
  },
];

export function CapabilityMatrix() {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <caption className={styles.srOnly}>
          Carbotex work explored to date and questions for future development
        </caption>
        <thead>
          <tr>
            <th scope="col">Area</th>
            <th scope="col">
              <span className={styles.headLabel}>
                <CircleDot size={14} aria-hidden="true" />
                Work currently explored
              </span>
            </th>
            <th scope="col">
              <span className={styles.headLabel}>
                <MoveRight size={14} aria-hidden="true" />
                Questions for future development
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.area}>
              <th scope="row">
                <span>{row.area}</span>
              </th>
              <td data-label="Work currently explored">{row.explored}</td>
              <td data-label="Questions for future development">{row.next}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

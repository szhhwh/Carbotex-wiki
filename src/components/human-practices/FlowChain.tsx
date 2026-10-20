import { ArrowRight } from "lucide-react";
import styles from "./flow-chain.module.css";

export function FlowChain({ steps }: { steps: string[] }) {
  return (
    <div className={styles.chain} role="group" aria-label="Pathway">
      {steps.map((step, index) => (
        <span className={styles.group} key={`${step}-${index}`}>
          {index > 0 && <ArrowRight size={16} aria-hidden="true" />}
          <span className={styles.step}>{step}</span>
        </span>
      ))}
    </div>
  );
}

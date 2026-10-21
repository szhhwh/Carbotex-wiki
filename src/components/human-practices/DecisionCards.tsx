import { ArrowRight } from "lucide-react";
import styles from "./decision-cards.module.css";

const DECISIONS = [
  {
    area: "Feedstock",
    from: "Abundant straw",
    to: "Practically available feedstock",
    body: "Engagement with local agricultural stakeholders made us distinguish regional straw abundance from the fraction that could realistically be collected, stored, transported, and used.",
    href: "#ihp-local-authority",
    link: "Explore the Feedstock TRACE",
  },
  {
    area: "Carbon utilization",
    from: "A metabolic bottleneck",
    to: "A regulatory question",
    body: "Researcher feedback shifted our attention from individual metabolic steps toward upstream regulation of mixed-sugar utilization.",
    href: "#ihp-nan-hao",
    link: "Explore the regulatory-engineering TRACE",
  },
  {
    area: "Carbon flow",
    from: "More uptake",
    to: "Where the carbon goes",
    body: "We stopped treating improved substrate consumption as equivalent to improved PMA production and began considering carbon allocation and precursor supply.",
    href: "#ihp-weihui-wu",
    link: "Explore the carbon-flow TRACE",
  },
  {
    area: "Material design",
    from: "A fermentation product",
    to: "A functionalizable material platform",
    body: "Stakeholder input pushed us beyond simply producing PMA toward asking how its chemistry could support downstream material design and independent performance evaluation.",
    href: "#ihp-liu-ya",
    link: "Explore the material TRACE",
  },
  {
    area: "Responsible implementation",
    from: "Renewable",
    to: "Not automatically sustainable",
    body: "Sustainability, scale-up, and biosafety became questions to evaluate rather than benefits to assume.",
    href: "#ihp-eva",
    link: "Explore the sustainability TRACE",
  },
];

export function DecisionCards() {
  return (
    <div className={styles.list}>
      {DECISIONS.map((decision, index) => (
        <article
          className={styles.entry}
          data-decision-card
          key={decision.area}
        >
          <div className={styles.areaBlock}>
            <span className={styles.areaIndex} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className={styles.area}>{decision.area}</h3>
          </div>
          <div className={styles.shift}>
            <span>{decision.from}</span>
            <ArrowRight size={18} aria-hidden="true" />
            <strong>{decision.to}</strong>
          </div>
          <p>{decision.body}</p>
          <a href={decision.href}>
            {decision.link}
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        </article>
      ))}
    </div>
  );
}

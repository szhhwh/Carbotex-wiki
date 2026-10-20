import styles from "./reflection-cards.module.css";

const CHANGES = [
  {
    title: "From abundant straw to a feasible feedstock",
    body: "Our initial interest in crop residues was driven by the carbon they contain. Conversations with agricultural stakeholders helped us look beyond regional abundance and consider how straw is collected, stored, transported, and already used. This changed the way we framed our starting material: a renewable resource must also be practically accessible, and any new use needs to be considered alongside existing agricultural needs.",
  },
  {
    title: "From a sugar-utilization problem to a question of regulation",
    body: "When we examined PMA production from lignocellulosic sugars, the challenge was not simply whether the production strain could encounter xylose. Discussions with researchers encouraged us to consider how mixed-sugar utilization is regulated in Aureobasidium melanogenum A08. This helped direct our attention toward regulatory factors such as AraR and XlnR and gave our engineering work a more focused biological question.",
  },
  {
    title:
      "From consuming more carbon to directing carbon toward the desired product",
    body: "Further expert exchanges encouraged us to distinguish substrate utilization from PMA production. Better access to carbon would matter only if the cell could also channel it effectively into the desired biosynthetic route. This brought precursor supply, carbon allocation, and metabolic analysis into our engineering considerations. Our follow-up discussions helped us revisit the problem as new experimental and modeling questions emerged.",
  },
  {
    title: "From a fermentation product to a functional material",
    body: "Conversations about polymer properties and potential applications pushed us to think beyond PMA yield. PMA's modifiable structure suggested a route toward dopamine-functionalized PMA-DA, and our subsequent work explored adhesion on glass, stainless steel, and ex vivo porcine skin, together with behavior in aqueous environments and preliminary cell-response assessments. Human Practices helped connect our interest in microbial production with a clearer question: what useful material could that production enable?",
  },
  {
    title: "From technical promise to responsible implementation",
    body: "Discussions about sustainability, manufacturing, commercialization, and biosafety changed the criteria by which we evaluated progress. The CCiC commercialization exchange prompted us to revisit the production pathway and conduct a preliminary cost estimate. For one preparation scenario beginning with approximately 3.6 g of PMA, the selected priced material inputs amounted to about RMB 194–232, directing our attention toward dopamine consumption and downstream processing. At Grand APiC, feedback about horizontal gene transfer led us to reconsider genetic-element management and the responsibilities associated with preparing the final adhesive. Laboratory safety guidance further reinforced the importance of careful everyday experimental practice.",
  },
];

const UNRESOLVED = [
  {
    title: "Defining and validating an application",
    body: "Our tests have explored different substrates, wet-environment behavior, and preliminary biological responses. The next step is to identify a specific application with clear user requirements and test PMA-DA against appropriate existing materials under comparable conditions. Direct engagement with potential users will be essential for understanding what levels of adhesion, stability, convenience, and cost would make the material valuable.",
  },
  {
    title: "Understanding manufacturing and environmental performance",
    body: "Our current cost model identifies important reagent and process inputs, but a meaningful unit production cost requires the actual mass of recovered freeze-dried PMA-DA, complete material and utility records, and more representative upstream hydrolysate costs. Future work should also examine the environmental implications of the whole process, including pretreatment, resource consumption, and the existing uses of agricultural residues. We want to evaluate renewable-carbon manufacturing through measured performance rather than through feedstock origin alone.",
  },
  {
    title: "Developing an application-specific safety pathway",
    body: "Our next steps include clarifying the genetic composition of the production strain, examining the separation of microbial components and functionalization-related residues, and expanding material characterization and biological evaluation according to the intended use. Once a particular application is defined, engagement with relevant safety and regulatory specialists can help us understand the evidence and standards that would apply.",
  },
];

export function ReflectionCards({ kind }: { kind: "changes" | "unresolved" }) {
  const items = kind === "changes" ? CHANGES : UNRESOLVED;

  return (
    <div className={styles.grid} data-kind={kind}>
      {items.map((item) => (
        <article className={styles.card} key={item.title}>
          <span className={styles.title}>{item.title}</span>
          <span className={styles.body}>{item.body}</span>
        </article>
      ))}
    </div>
  );
}

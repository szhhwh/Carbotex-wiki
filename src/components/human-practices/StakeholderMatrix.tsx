import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Collapse } from "../ui/Collapse";
import styles from "./stakeholder-matrix.module.css";

type DimensionKey = "affectedness" | "influence" | "expertise";
type RatingLevel = "High" | "Medium" | "Low-Med" | "Med-High";
type BarState = "full" | "partial" | "empty";

interface StakeholderGroup {
  title: string;
  description: string;
  ratings: Record<DimensionKey, RatingLevel>;
  why: string;
  question: string;
}

const DIMENSIONS: Array<{
  key: DimensionKey;
  label: string;
  question: string;
}> = [
  {
    key: "affectedness",
    label: "Affectedness",
    question: "Who may experience the effects of the project?",
  },
  {
    key: "influence",
    label: "Influence",
    question: "Who can shape design or implementation?",
  },
  {
    key: "expertise",
    label: "Expertise",
    question: "Who holds relevant practical or specialist knowledge?",
  },
];

const RATING_BARS: Record<RatingLevel, readonly BarState[]> = {
  High: ["full", "full", "full"],
  Medium: ["full", "full", "empty"],
  "Low-Med": ["full", "partial", "empty"],
  "Med-High": ["full", "full", "partial"],
};

const GROUP_RATINGS: Record<string, Record<DimensionKey, RatingLevel>> = {
  "Feedstock & Agriculture": {
    affectedness: "High",
    influence: "Medium",
    expertise: "High",
  },
  "Biomanufacturing & Research": {
    affectedness: "Low-Med",
    influence: "Med-High",
    expertise: "High",
  },
  "Materials & Applications": {
    affectedness: "Medium",
    influence: "Medium",
    expertise: "High",
  },
  "Industry & Scale-up": {
    affectedness: "Medium",
    influence: "High",
    expertise: "High",
  },
  "Sustainability, Policy & Governance": {
    affectedness: "Med-High",
    influence: "High",
    expertise: "High",
  },
  "Society, Communication & Peer Community": {
    affectedness: "Medium",
    influence: "Medium",
    expertise: "Med-High",
  },
};

const STAKEHOLDER_GROUPS: StakeholderGroup[] = [
  {
    title: "Feedstock & Agriculture",
    description: "Farmers, cooperatives, agricultural experts, planting bases",
    ratings: GROUP_RATINGS["Feedstock & Agriculture"],
    why: "Farmers, cooperatives and agricultural partners brought first-hand knowledge of how straw is used, collected, stored and supplied. Their perspectives helped us distinguish resource abundance from practical feedstock availability.",
    question: "What makes straw a reliable and suitable input for Carbotex?",
  },
  {
    title: "Biomanufacturing & Research",
    description:
      "Synthetic biology researchers, fermentation specialists, research platforms",
    ratings: GROUP_RATINGS["Biomanufacturing & Research"],
    why: "Researchers and fermentation specialists helped us examine A08's mixed-sugar utilization, regulatory engineering and precursor supply. Their expertise connected biological questions with testable engineering directions.",
    question:
      "Which biological constraints should guide our next design iteration?",
  },
  {
    title: "Materials & Applications",
    description:
      "Materials experts, characterization platforms, biomimicry-related researchers",
    ratings: GROUP_RATINGS["Materials & Applications"],
    why: "Materials researchers and application specialists encouraged us to consider PMA as a functionalizable polymer, with adhesive performance and characterization as important downstream questions.",
    question: "How can PMA become a material with measurable function?",
  },
  {
    title: "Industry & Scale-up",
    description:
      "Biomanufacturing companies, material companies, fermentation industries, automation companies",
    ratings: GROUP_RATINGS["Industry & Scale-up"],
    why: "Manufacturing and infrastructure perspectives broadened our view from individual laboratory steps to reproducibility, process integration, automation and future scale-up.",
    question:
      "What would a practical biomanufacturing process need to address?",
  },
  {
    title: "Sustainability, Policy & Governance",
    description:
      "Sustainability experts, environmental authorities, agricultural authorities, local governments",
    ratings: GROUP_RATINGS["Sustainability, Policy & Governance"],
    why: "Agricultural authorities and sustainability perspectives connected the project with existing resource systems, environmental trade-offs and responsible implementation.",
    question:
      "How should resource use and sustainability inform future decisions?",
  },
  {
    title: "Society, Communication & Peer Community",
    description:
      "iGEM teams, international HP communities, science communicators, artistic collaborators",
    ratings: GROUP_RATINGS["Society, Communication & Peer Community"],
    why: "iGEM peers, science communicators and collaborators brought feedback from outside our core team, challenging assumptions and helping Carbotex communicate its goals more clearly.",
    question:
      "How can dialogue reshape the way we design and explain Carbotex?",
  },
];

const METHOD_STEPS = [
  "Map the project ecosystem",
  "Identify complementary perspectives",
  "Bring insights into TRACE",
];

const RUBRIC = [
  {
    dimension: "Affectedness",
    low: "Limited direct impact",
    medium: "Possible or indirect effects",
    high: "Directly connected to consequences of the proposed system",
  },
  {
    dimension: "Influence",
    low: "Limited ability to shape decisions",
    medium: "Can inform part of the project",
    high: "Can shape essential design or implementation considerations",
  },
  {
    dimension: "Expertise",
    low: "Limited question-specific knowledge",
    medium: "Relevant understanding of some aspects",
    high: "Essential technical, contextual or lived experience",
  },
];

function Rating({
  dimension,
  level,
}: {
  dimension: (typeof DIMENSIONS)[number];
  level: RatingLevel;
}) {
  return (
    <span className={styles.rating} data-dimension={dimension.key}>
      <span className="visually-hidden">{dimension.label}: </span>
      <span className={styles.mobileLabel} aria-hidden="true">
        {dimension.label}
      </span>
      <span className={styles.meter} aria-hidden="true">
        {RATING_BARS[level].map((state, index) => (
          <span
            className={styles.bar}
            data-state={state}
            key={`${level}-${index}`}
          />
        ))}
      </span>
      <span className={styles.grade}>{level.replace("-", "\u2013")}</span>
    </span>
  );
}

export function StakeholderMatrix() {
  const id = useId();
  const [openGroups, setOpenGroups] = useState<Set<string>>(() => new Set());
  const titleId = `${id}-title`;
  const introId = `${id}-intro`;
  const figureLabelId = `${id}-figure-label`;
  const rubricId = `${id}-rubric`;

  const toggleGroup = (title: string, nextOpen: boolean) => {
    setOpenGroups((current) => {
      const next = new Set(current);
      if (nextOpen) next.add(title);
      else next.delete(title);
      return next;
    });
  };

  return (
    <section
      className={styles.section}
      aria-labelledby={titleId}
      aria-describedby={introId}
      data-stakeholder-matrix
    >
      <h4 className={styles.title} id={titleId}>
        Stakeholder Matrix
      </h4>
      <p className={styles.intro} id={introId}>
        Carbotex connects agricultural biomass, microbial engineering and
        material development. To understand the people and systems involved, we
        mapped potential stakeholders into six groups and considered three
        qualitative dimensions: <strong>Affectedness</strong>,{" "}
        <strong>Influence</strong> and <strong>Expertise</strong>. Together,
        these perspectives helped us identify whose experiences and knowledge
        were relevant to decisions at different stages of the project.
      </p>

      <ul className={styles.lenses} aria-label="Three qualitative dimensions">
        {DIMENSIONS.map((dimension) => (
          <li className={styles.lens} key={dimension.key}>
            <span className={styles.lensTag}>{dimension.label}</span>
            <p>{dimension.question}</p>
          </li>
        ))}
      </ul>

      <figure className={styles.figure} aria-labelledby={figureLabelId}>
        <div className={styles.matrixFrame}>
          <div className={styles.figureHeader}>
            <strong id={figureLabelId}>Stakeholder Matrix</strong>
          </div>
          <div className={styles.columnHead} aria-hidden="true">
            <span>Stakeholder group</span>
            {DIMENSIONS.map((dimension) => (
              <span key={dimension.key}>{dimension.label}</span>
            ))}
          </div>
          <div className={styles.rows}>
            {STAKEHOLDER_GROUPS.map((group, index) => {
              const isOpen = openGroups.has(group.title);

              return (
                <div
                  className={styles.rowGroup}
                  data-stakeholder-matrix-group
                  data-open={isOpen ? "true" : undefined}
                  key={group.title}
                >
                  <Collapse
                    className={styles.row}
                    headerClassName={styles.rowHeading}
                    contentClassName={styles.rowContent}
                    headerAs="h5"
                    variant="plain"
                    duration={0.32}
                    indicator={<ChevronDown size={18} />}
                    open={isOpen}
                    onToggle={(nextOpen) => toggleGroup(group.title, nextOpen)}
                    header={
                      <span className={styles.summaryGrid}>
                        <span className={styles.nameCell}>
                          <span className={styles.index} aria-hidden="true">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className={styles.nameBox}>
                            <span className={styles.groupName}>
                              {group.title}
                            </span>
                            <span className={styles.groupDescription}>
                              {group.description}
                            </span>
                          </span>
                        </span>
                        {DIMENSIONS.map((dimension) => (
                          <Rating
                            dimension={dimension}
                            level={group.ratings[dimension.key]}
                            key={dimension.key}
                          />
                        ))}
                      </span>
                    }
                  >
                    <div className={styles.expanded}>
                      <div>
                        <span className={styles.microhead}>
                          Why this perspective mattered
                        </span>
                        <p>{group.why}</p>
                      </div>
                      <div className={styles.question}>
                        <span className={styles.microhead}>
                          Question we explored
                        </span>
                        <p>{group.question}</p>
                      </div>
                    </div>
                  </Collapse>
                </div>
              );
            })}
          </div>
        </div>
      </figure>

      <div className={styles.method}>
        <h5 className={styles.methodTitle}>From Mapping to Engagement</h5>
        <ol className={styles.steps} aria-label="Approach">
          {METHOD_STEPS.map((step, index) => (
            <li key={step}>
              <span aria-hidden="true">{index + 1}</span>
              {step}
            </li>
          ))}
        </ol>
        <p className={styles.outro}>
          The matrix guided us toward complementary perspectives rather than a
          numerical ranking. As Carbotex moved from straw collection and
          mixed-sugar metabolism to material development and responsible
          implementation, different questions called for different voices. Our
          22 stakeholder profiles bring these perspectives into one journey,
          while{" "}
          <strong>
            TRACE — Trigger, Reach Out, Analyze, Change and Evaluate
          </strong>{" "}
          — shows how feedback returned to project decisions and reflection.
        </p>
      </div>

      <Collapse
        id={rubricId}
        className={styles.rubric}
        headerClassName={styles.rubricHeading}
        contentClassName={styles.rubricContent}
        headerAs="h5"
        variant="plain"
        duration={0.32}
        indicator={<ChevronDown size={18} />}
        header="How we interpret Low, Medium and High"
      >
        <div className={styles.rubricBody}>
          <p className={styles.rubricIntro}>
            Each dimension captures a different relationship with Carbotex.
          </p>
          <p className={styles.tableHint}>
            Swipe horizontally to view all three levels.
          </p>
          <div
            className={styles.tableScroller}
            tabIndex={0}
            role="region"
            aria-label="Low, Medium and High interpretation rubric"
          >
            <table className={styles.rubricTable}>
              <thead>
                <tr>
                  <th scope="col">Dimension</th>
                  <th scope="col">Low</th>
                  <th scope="col">Medium</th>
                  <th scope="col">High</th>
                </tr>
              </thead>
              <tbody>
                {RUBRIC.map((row) => (
                  <tr key={row.dimension}>
                    <th scope="row">{row.dimension}</th>
                    <td>{row.low}</td>
                    <td>{row.medium}</td>
                    <td>{row.high}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.rubricNote}>
            Combined labels reflect variation within a stakeholder group. The
            dimensions are considered side by side, without a numerical total.
          </p>
        </div>
      </Collapse>
    </section>
  );
}

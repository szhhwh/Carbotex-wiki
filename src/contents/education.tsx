import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { ArrowDownRight, ArrowUpRight, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { ActivityViewer } from "../components/activities/ActivityViewer";
import {
  ArticlePage,
  type ArticleSection,
} from "../components/article/ArticlePage";
import { Figure } from "../components/media/Figure";
import { ACTIVITIES } from "./activityCatalog";
import { media, mediaRoot } from "./education/EducationAssets";
import {
  ChapterGallery,
  ResourceLibrary,
  type EducationResourceGroup,
} from "./education/EducationMedia";
import { chapter06Figure6Composite } from "./education/EducationFigures";
import { Chapter01Content } from "./education/Chapter01Content";
import { Chapter02Content } from "./education/Chapter02Content";
import { Chapter03Content } from "./education/Chapter03Content";
import { Chapter04PreCardsContent } from "./education/Chapter04PreCardsContent";
import { Chapter04PostCardsContent } from "./education/Chapter04PostCardsContent";
import { Chapter05PreWorkflowContent } from "./education/Chapter05PreWorkflowContent";
import { Chapter05PostWorkflowContent } from "./education/Chapter05PostWorkflowContent";
import { Chapter06PreEscapeContent } from "./education/Chapter06PreEscapeContent";
import { Chapter06VerifyContent } from "./education/Chapter06VerifyContent";
import { Chapter06SdgsContent } from "./education/Chapter06SdgsContent";
import { Chapter07Content } from "./education/Chapter07Content";
import { Chapter08Content } from "./education/Chapter08Content";
import { ChapterMeta } from "./education/ChapterMeta";
import { InteractionHint } from "./education/InteractionHint";
import { ResourceReuseContent } from "./education/ResourceReuseContent";
import {
  OverviewInclusiveAccess,
  OverviewIntro,
  OverviewPublicUnderstanding,
  OverviewSocialResponsibility,
  OverviewTapestry,
  OverviewTranslating,
} from "./education/OverviewContent";
import { ObjectiveStatement } from "./education/ObjectiveStatement";
import { PrincipleIntroContent } from "./education/PrincipleIntroContent";
import styles from "./education.module.css";

const chapterLinks = [
  ["chapter-01", "Mapping the Blueprint", "The Public"],
  ["chapter-02", "Unlocking Cellular Systems", "Kindergarten Children"],
  ["chapter-03", "Rewriting Biological Parts", "Primary school students"],
  ["chapter-04", "Natural Living Factories", "Primary school students"],
  [
    "chapter-05",
    "Tracing Back from Downstream Processing",
    "High School Students",
  ],
  [
    "chapter-06",
    "Innovate for Shared Society",
    "Children within the community, High school students, College students, Team members",
  ],
  [
    "chapter-07",
    "Empowering Future Voices",
    "Children in under-resourced regions",
  ],
  [
    "chapter-08",
    "Bringing Synbio and Biomanufacturing Closer",
    "The General Public",
  ],
];

function moveTabFocus(
  event: KeyboardEvent<HTMLButtonElement>,
  setActiveIndex: (index: number) => void,
) {
  const tabs = Array.from(
    event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
      '[role="tab"]',
    ) ?? [],
  );
  const currentIndex = tabs.indexOf(event.currentTarget);
  if (currentIndex < 0 || tabs.length === 0) return;

  let nextIndex: number | undefined;
  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    nextIndex = (currentIndex + 1) % tabs.length;
  } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
  } else if (event.key === "Home") {
    nextIndex = 0;
  } else if (event.key === "End") {
    nextIndex = tabs.length - 1;
  }

  if (nextIndex === undefined) return;
  event.preventDefault();
  setActiveIndex(nextIndex);
  tabs[nextIndex]?.focus();
}

function trapDialogFocus(event: KeyboardEvent<HTMLDialogElement>) {
  if (event.key !== "Tab") return;

  const focusable = Array.from(
    event.currentTarget.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => element.getClientRects().length > 0);
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function ActivityTimeline() {
  return (
    <nav className={styles.activityTimeline} aria-label="Education activities">
      <div className={styles.timelineRule} aria-hidden="true" />
      {chapterLinks.map(([id, title, audience]) => (
        <a className={styles.timelineItem} href={`#${id}`} key={id}>
          <span>
            <em>{title}</em>
            <small>{audience}</small>
          </span>
        </a>
      ))}
    </nav>
  );
}

const weaveStages = [
  [
    "wonder",
    "W",
    "Wonder",
    "Why do we design this activity?",
    "Drawing on our project and feedback from previous activities, we consider whom we intend to reach, why we seek to reach them, and why we focus on a particular topic. By identifying participants’ educational needs, questions, and knowledge gaps, we establish the purpose and direction of each activity.",
  ],
  [
    "explore",
    "E",
    "Explore",
    "How can we design for meaningful learning?",
    "We employ an objective-driven design approach to determine how scientific content, communication methods, and interactive formats can be adapted to suit different age groups.",
  ],
  [
    "action",
    "A",
    "Action",
    "How do we bring the design to life?",
    "We translate our objectives into practical actions, both online and offline.",
  ],
  [
    "verify",
    "V",
    "Verify",
    "What did participants gain?",
    "Through participant feedback and other forms of evaluation, we assess whether the activity achieved its intended objectives and what participants gained from it.",
  ],
  [
    "echo",
    "E",
    "Echo",
    "What can we improve next?",
    "Driven by a Feedback–Reflection–Evolution cycle, we gather participant feedback, assess the limitations of our outreach, and translate these insights into actionable adjustments—implementing, evaluating, and refining them across subsequent iterations.",
  ],
] as const;

function WeaveFramework() {
  const [activeId, setActiveId] = useState("wonder");

  return (
    <div className={styles.weaveLayout}>
      <div className={styles.weaveShape} aria-hidden="true">
        <span className={`${styles.weaveBand} ${styles.weaveBandOne}`} />
        <span className={`${styles.weaveBand} ${styles.weaveBandTwo}`} />
        <span className={`${styles.weaveBand} ${styles.weaveBandThree}`} />
        <span className={`${styles.weaveBand} ${styles.weaveBandFour}`} />
        <span className={`${styles.weaveBand} ${styles.weaveBandFive}`} />
        <div className={styles.weaveCore}>
          <strong>WEAVE</strong>
          <small>the thread between activities</small>
        </div>
      </div>
      <div className={styles.weaveControls}>
        <InteractionHint id="education-weave-interaction-hint">
          Follow the five stitches. Each one opens a short account of how the
          education program moves from intention to iteration.
        </InteractionHint>
        <div
          aria-describedby="education-weave-interaction-hint"
          className={styles.weaveTabs}
          role="tablist"
          aria-label="WEAVE stages"
        >
          {weaveStages.map(([id, letter, title]) => (
            <button
              aria-controls={`weave-panel-${id}`}
              aria-selected={activeId === id}
              className={styles.weaveTab}
              id={`weave-tab-${id}`}
              key={id}
              onClick={() => setActiveId(id)}
              onKeyDown={(event) =>
                moveTabFocus(event, (index) =>
                  setActiveId(weaveStages[index][0]),
                )
              }
              role="tab"
              tabIndex={activeId === id ? 0 : -1}
              type="button"
            >
              <span>{letter}</span>
              {title}
            </button>
          ))}
        </div>
        {weaveStages.map(([id, letter, title, question, body]) => (
          <div
            className={styles.weavePanel}
            aria-labelledby={`weave-tab-${id}`}
            data-active={activeId === id}
            hidden={activeId !== id}
            id={`weave-panel-${id}`}
            key={id}
            role="tabpanel"
          >
            <span className={styles.panelLetter}>{letter}</span>
            <div>
              <h3>{title}</h3>
              <h4>{question}</h4>
              <p>{body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EvolutionLinks() {
  return (
    <div className={styles.evolutionRail}>
      <p className={styles.evolutionLead}>
        Echo carries the thread forward into later activities.
      </p>
      <div className={styles.evolutionGrid}>
        <a href="#chapter-06-3-1">
          <span>Evolution I</span>
          <strong>
            <em>17-C: The Lab Mystery</em> Escape-room Challenge
          </strong>
          <small>
            Concept cheat-cards turn explanation into investigation.
          </small>
        </a>
        <a href="#chapter-02-2">
          <span>Evolution II</span>
          <strong>Hands-on clay modeling</strong>
          <small>Lecture becomes explanation plus creation.</small>
        </a>
        <a href="#chapter-05-2-2">
          <span>Evolution III</span>
          <strong>
            <em>The Microscopic Factory of Adhesives</em>
          </strong>
          <small>Laboratory images make research processes concrete.</small>
        </a>
      </div>
    </div>
  );
}

const magicCards: Array<{
  front: string;
  backTitle: string;
  back: ReactNode;
}> = [
  {
    front: "The Magician’s Profile",
    backTitle: "Microbial characteristics",
    back: (
      <>
        <p>
          We translated complex biological traits into a relatable character
          profile.
        </p>
        <ul>
          <li>Morphology → “True Form”</li>
          <li>Taxonomy → “Family Identity”</li>
          <li>
            Temp Constraints → “Strengths &amp; Weaknesses and Will the Magic
            Work?”
          </li>
          <li>Ecology → “Hiding Places and Migration in Nature”</li>
        </ul>
      </>
    ),
  },
  {
    front: "Casting Magical Spells",
    backTitle: "Fermentation process",
    back: (
      <>
        <p>
          We transformed abstract metabolic processes into an exciting series of
          magical spells enabling them to better understand and remember related
          information.
        </p>
        <ul>
          <li>Substrate Utilization → “Spell 1: Consuming Sugar for Energy”</li>
          <li>
            Metabolism: Carbon Dioxide Production → “Spell 2: Exhaling Magic
            Bubbles”
          </li>
          <li>
            Metabolism: Alcohol &amp; Flavor Production → “Spell 3: Producing
            Magic Aroma”
          </li>
          <li>Aerobic vs. Anaerobic Pathways → “Is Oxygen Necessary?”</li>
        </ul>
      </>
    ),
  },
  {
    front: "Magic Masters and Humans",
    backTitle: "Biomanufacturing in reality",
    back: (
      <>
        <p>
          We bridged theory with practical applications, illustrating how humans
          harness microbes to create products.
        </p>
        <ul>
          <li>
            Raw Material Preparation → “Step 1: Summoning Magic Materials”
          </li>
          <li>Strain Activation → “Step 2: Awakening the Sleeping Master”</li>
          <li>
            Macroscopic Bioprocessing → “Step 3: The Dough's Fattening Magic”
          </li>
          <li>
            Microbial Diversity &amp; Biosafety → “Are all Magic Masters
            friendly to humans?”
          </li>
        </ul>
      </>
    ),
  },
];

function MagicCards() {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(
    () => new Set(),
  );
  const frontButtons = useRef<Array<HTMLButtonElement | null>>([]);
  const backPanels = useRef<Array<HTMLDivElement | null>>([]);
  const pendingFocus = useRef<{
    index: number;
    face: "front" | "back";
  } | null>(null);

  useEffect(() => {
    const target = pendingFocus.current;
    if (!target) return;

    const element =
      target.face === "back"
        ? backPanels.current[target.index]
        : frontButtons.current[target.index];
    element?.focus();
    pendingFocus.current = null;
  }, [flippedCards]);

  const flipCard = (index: number) => {
    pendingFocus.current = { index, face: "back" };
    setFlippedCards((current) => {
      const next = new Set(current);
      next.add(index);
      return next;
    });
  };

  const returnCard = (index: number) => {
    pendingFocus.current = { index, face: "front" };
    setFlippedCards((current) => {
      const next = new Set(current);
      next.delete(index);
      return next;
    });
  };

  return (
    <div className={styles.magicSection}>
      <div className={styles.magicGrid}>
        {magicCards.map(({ front, backTitle, back }, index) => {
          const isFlipped = flippedCards.has(index);
          return (
            <div
              className={`${styles.magicCard} ${isFlipped ? styles.magicCardFlipped : ""}`}
              key={front}
            >
              <div className={styles.magicCardInner}>
                <div aria-hidden={isFlipped} className={styles.magicFace}>
                  <strong>{front}</strong>
                  <span className={styles.flipHint}>
                    Flip card
                    <ArrowUpRight aria-hidden="true" size={16} />
                  </span>
                  <button
                    aria-label={`Flip card: ${front}`}
                    className={styles.magicFlipTarget}
                    onClick={() => flipCard(index)}
                    ref={(element) => {
                      frontButtons.current[index] = element;
                    }}
                    tabIndex={isFlipped ? -1 : 0}
                    type="button"
                  />
                </div>
                <div
                  aria-hidden={!isFlipped}
                  className={`${styles.magicFace} ${styles.magicBack}`}
                >
                  <strong className={styles.magicBackTitle}>{backTitle}</strong>
                  <div
                    aria-label={`${front}: card content`}
                    className={styles.magicBackScroll}
                    ref={(element) => {
                      backPanels.current[index] = element;
                    }}
                    role="region"
                    tabIndex={isFlipped ? 0 : -1}
                  >
                    <span className={styles.magicBackContent}>{back}</span>
                  </div>
                  <button
                    className={styles.backHint}
                    onClick={() => returnCard(index)}
                    tabIndex={isFlipped ? 0 : -1}
                    type="button"
                  >
                    Return to front
                    <ArrowUpRight aria-hidden="true" size={15} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const workflowNodes: Array<[string, string, ReactNode, string | undefined]> = [
  [
    "adhesives",
    "Final Products: Adhesives",
    <>
      <p className={styles.workflowLabel}>Scattered points of textbooks</p>
      <p>
        <strong>
          Point 1: Biological macromolecules and molecular structures
        </strong>
        . Biological macromolecules are built from smaller molecular units, and
        their structures are closely related to their functions.
      </p>
      <p>
        <strong>
          Point 2: Functional groups and intermolecular interactions
        </strong>
        . This involved understanding how molecular structures and functional
        groups influence interactions between molecules.
      </p>
      <p className={styles.workflowLabel}>How we merged it in activity</p>
      <p>
        By exploring why adhesives are sticky, we connected students' prior
        knowledge of polymer structures and functional groups with
        intermolecular interactions. Using Velcro as an analogy, we further
        illustrated how numerous weak interactions at the material interface can
        collectively give rise to macroscopic adhesion.
      </p>
      <p className={styles.workflowLabel}>Building the next connection</p>
      <p>
        We transitioned our focus from analyzing the material's adhesive
        properties to generating these kinds of materials with engineered
        microbes. We therefore traced the engineering process back and connected
        the knowledge they learned.
      </p>
    </>,
    "5-2-1-production.avif",
  ],
  [
    "chassis",
    "Chassis Selection",
    <>
      <p className={styles.workflowLabel}>Scattered points of textbooks</p>
      <p>
        <strong>Point 1: Metabolic pathways and key intermediates</strong>.{" "}
        Metabolic pathways generate key intermediates that can serve as building
        blocks for the synthesis of other molecules.
      </p>
      <p>
        <strong>
          Point 2: Cellular life and microbial functional diversity
        </strong>
        . Cells are the basic units of life. Through evolution, microorganisms
        have developed diverse metabolic capabilities that enable them to
        synthesize different substances.
      </p>
      <p className={styles.workflowLabel}>How we merged it in activity</p>
      <p>
        The two knowledge points were connected through a real biomanufacturing
        task. Metabolic intermediates guided the selection of a bio-based
        monomer, while microbial functional diversity guided the selection of a
        suitable microbial producer. Together, they linked “what to produce”
        with “who can produce it.”
      </p>
      <p className={styles.workflowLabel}>Building the next connection</p>
      <p>
        Finding a natural producer tells us who can make PMA naturally, but not
        yet how to make it efficiently. To improve PMA production, we now need
        to redesign the microbial cell factory.
      </p>
    </>,
    "5-2-1-chassis-selection.avif",
  ],
  [
    "redesign",
    "Redesign",
    <>
      <p className={styles.workflowLabel}>Scattered points of textbooks</p>
      <p>
        <strong>Point 1: Polymerase chain reaction (PCR)</strong>. PCR uses
        specific primers and repeated cycles of denaturation, annealing, and
        extension to selectively amplify the target DNA sequence for subsequent
        genetic manipulation.
      </p>
      <p>
        <strong>Point 2: Plasmid structure and vector construction</strong>.{" "}
        Plasmids can serve as engineered delivery vehicles equipped with
        essential functional elements, including promoters, multiple cloning
        sites (MCS), selectable markers, and terminators.
      </p>
      <p className={styles.workflowLabel}>How we merged it in activity</p>
      <p>
        We integrated PCR and plasmid construction into the process of
        redesigning a microbial cell factory. PCR provides the target PYC gene,
        while plasmid construction enables its introduction and expression in
        the chassis cell.
      </p>
      <p className={styles.workflowLabel}>Building the next connection</p>
      <p>
        To produce PMA, the redesigned cells must be cultivated with suitable
        nutrients so that their metabolic network can continuously convert raw
        materials into the target product. This shifted students' focus from
        cell-factory redesign to fermentation.
      </p>
    </>,
    "5-2-1-redesign.avif",
  ],
  [
    "fermentation",
    "Fermentation",
    <>
      <p className={styles.workflowLabel}>Scattered points of textbooks</p>
      <p>
        <strong>Cellular metabolism</strong>. Cells convert nutrients through
        interconnected metabolic pathways into substances required for growth
        and biosynthesis.
      </p>
      <p className={styles.workflowLabel}>How we merged it in activity</p>
      <p>
        We transferred students' understanding of cellular metabolism into a
        biomanufacturing context. Instead of viewing metabolic pathways only as
        processes that sustain cellular life, students now considered them as a
        production network where nutrients were supplied to the redesigned
        microorganism and metabolically converted toward PMA synthesis during
        fermentation.
      </p>
      <p className={styles.workflowLabel}>Building the next connection</p>
      <p>
        The PMA produced from fermentation remained mixed with cells, water, and
        other components of the fermentation system. Therefore, the next step
        was to separate, purify, and process the target product into a usable
        material during downstream processing.
      </p>
    </>,
    undefined,
  ],
  [
    "downstream",
    "Downstream Processing",
    <>
      <p className={styles.workflowLabel}>Scattered points of textbooks</p>
      <p>
        <strong>Point 1: Centrifugation and separation</strong>. Mixtures can be
        separated by exploiting differences in the physical properties of their
        components. For instance, via centrifugation, components can be
        separated based on their sedimentation behaviors under centrifugal
        force.
      </p>
      <p>
        <strong>Point 2: Diffusion across a semipermeable membrane</strong>.{" "}
        Molecules move by diffusion from regions of higher concentration to
        lower concentration, while selectively permeable membranes allow some
        substances to pass through more readily than others.
      </p>
      <p className={styles.workflowLabel}>How we merged it in activity</p>
      <p>
        <strong>
          The concept of mixture separation via centrifugation was linked to the
          removal of suspended components from the PMA-containing fermentation
          liquid.
        </strong>{" "}
        However, since centrifugation alone could not achieve purification at
        the molecular level,{" "}
        <strong>
          it formed a natural bridge to the concepts of diffusion and selective
          permeability via dialysis.
        </strong>{" "}
        In this way, the two concepts became sequential solutions to different
        stages of the same downstream-processing problem.
      </p>
    </>,
    undefined,
  ],
];

function WorkflowEntryPoint() {
  return (
    <div
      className={styles.workflowEntryPoint}
      aria-label="Workflow entry point"
      role="group"
    >
      <span>Entry point</span>
      <div className={styles.workflowEntryLine} aria-hidden="true" />
      <strong>Final Products: Adhesives</strong>
    </div>
  );
}

function WorkflowExplorer({ describedBy }: { describedBy?: string }) {
  const [activeId, setActiveId] = useState("adhesives");
  const active =
    workflowNodes.find(([id]) => id === activeId) ?? workflowNodes[0];

  return (
    <div
      aria-describedby={describedBy}
      className={styles.workflow}
      role="group"
    >
      <WorkflowEntryPoint />
      <div className={styles.workflowNodes}>
        {workflowNodes.map(([id, title], index) => (
          <button
            aria-pressed={active[0] === id}
            className={`${styles.workflowNode} ${active[0] === id ? styles.workflowNodeActive : ""}`}
            key={id}
            onClick={() => setActiveId(id)}
            type="button"
          >
            <strong>{title}</strong>
            <small>
              {index === 0
                ? "Why does the material stick?"
                : index === 1
                  ? "Who can produce it?"
                  : index === 2
                    ? "How can the cell factory improve?"
                    : index === 3
                      ? "How does the cell factory produce?"
                      : "How does the product become usable?"}
            </small>
            {index < workflowNodes.length - 1 && (
              <ArrowDownRight aria-hidden="true" size={18} />
            )}
          </button>
        ))}
      </div>
      <div className={styles.workflowPanel}>
        <div className={styles.panelReveal} key={active[0]}>
          <h6>{active[1]}</h6>
          {active[3] && (
            <Figure
              alt={`${active[1]} activity design`}
              className={styles.workflowFigure}
              ratio="16 / 9"
              src={`${mediaRoot}/${active[3]}`}
              fallback={<span>Image unavailable.</span>}
            />
          )}
          {active[2]}
        </div>
      </div>
    </div>
  );
}

function MilestoneCard({
  title,
  detail,
  href,
}: {
  title: string;
  detail: ReactNode;
  href?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!closing) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      dialog.close();
      setClosing(false);
    };
    const onAnimationEnd = (event: AnimationEvent) => {
      if (event.target === dialog) finish();
    };
    dialog.addEventListener("animationend", onAnimationEnd);
    const fallback = window.setTimeout(finish, 260);

    return () => {
      window.clearTimeout(fallback);
      dialog.removeEventListener("animationend", onAnimationEnd);
    };
  }, [closing]);

  const closeDialog = () => {
    const dialog = dialogRef.current;
    if (!dialog?.open || closing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      dialog.close();
      return;
    }
    setClosing(true);
  };

  return (
    <>
      <div className={styles.milestoneCard}>
        <button
          aria-haspopup="dialog"
          onClick={() => {
            setClosing(false);
            dialogRef.current?.showModal();
          }}
          ref={openerRef}
          type="button"
        >
          <strong>{title}</strong>
          <ArrowDownRight aria-hidden="true" size={18} />
        </button>
      </div>
      <dialog
        aria-labelledby={titleId}
        className={styles.milestoneDialog}
        data-closing={closing || undefined}
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onClose={() => openerRef.current?.focus()}
        onKeyDown={trapDialogFocus}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeDialog();
        }}
        ref={dialogRef}
      >
        <div className={styles.milestoneDialogInner}>
          <div className={styles.milestoneDialogHeader}>
            <h6 id={titleId}>{title}</h6>
            <button
              aria-label="Close dialog"
              className={styles.milestoneDialogClose}
              onClick={closeDialog}
              type="button"
            >
              <X aria-hidden="true" size={20} />
            </button>
          </div>
          <div className={styles.milestoneDetail}>
            {detail}
            {href && (
              <a
                className={styles.dialogResourceAction}
                href={href}
                rel="noopener noreferrer"
                target="_blank"
              >
                Open the supplied resource{" "}
                <ArrowUpRight aria-hidden="true" size={15} />
              </a>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}

function MilestoneStaticCard({
  step,
  title,
  detail,
}: {
  step: string;
  title: string;
  detail: ReactNode;
}) {
  return (
    <article className={styles.milestoneStaticCard}>
      <span className={styles.milestoneStep}>{step}</span>
      <h6>{title}</h6>
      <div className={styles.milestoneDetail}>{detail}</div>
    </article>
  );
}

const milestoneResourceGroups = [
  {
    id: "whole-activity",
    title: "The whole activity",
    resources: [
      {
        id: "escape-room-handbook",
        title: "17-C: The Lab Mystery Escape-room Challenge Handbook",
        description:
          "To introduce the storyline, explain the game rules, and guide participants through the investigation.",
        href: `${mediaRoot}/6-3-1-17-c-handbook-2.pdf`,
      },
      {
        id: "activity-poster",
        title: "Activity Poster",
        description:
          "To promote the activity, spark public curiosity, and encourage active participation.",
        href: `${mediaRoot}/6-3-1-activity-poster.avif`,
      },
    ],
  },
  {
    id: "scenario-1",
    title: "Scenario 1",
    resources: [
      {
        id: "initial-investigation-dossier",
        title: "Initial Investigation Dossier",
        description:
          "To provide students with the background information needed to begin their investigation.",
        href: `${mediaRoot}/6-3-1-initial-investigation-dossier.pdf`,
      },
      {
        id: "dr-shen-research-notebook",
        title: "Dr Shen Research Notebook",
        description:
          "This research notebook provides students with scientific clues to test the sample displayed.",
        href: `${mediaRoot}/6-3-1-dr-shen-research-notebook.pdf`,
      },
      {
        id: "strain-profiles",
        title: "Strain Profiles & Reference pH Data",
        description:
          "To help students figure out results from their differences.",
        href: `${mediaRoot}/6-3-1-strain-profiles-and-reference-ph-data.pdf`,
      },
    ],
  },
  {
    id: "scenario-2",
    title: "Scenario 2",
    resources: [
      {
        id: "dna-extraction-challenge",
        title: "DNA Extraction Challenge (Clue Card Game)",
        description:
          "Through the Concept Cheat Cards, participants learn the principles of DNA extraction and apply this knowledge to arrange the reagents in the correct sequence, ultimately unlocking β-17’s genetic dossier to investigate potential problems with the strain.",
        href: `${mediaRoot}/6-3-1-dna-extraction-challenge-clue-card-game.pdf`,
      },
      {
        id: "rna-worksheet",
        title: "RNA Transcription & Secondary Structure Worksheet",
        description:
          "To help participants understand transcription and RNA folding, gradually revealing how RNA secondary structure can enable the safe shutdown of β-17.",
        href: `${mediaRoot}/6-3-1-rna-worsheet.avif`,
      },
    ],
  },
] satisfies EducationResourceGroup[];

const milestones: Array<[string, string, ReactNode]> = [
  [
    "format-exploration",
    "Format Exploration",
    <>
      <InteractionHint id="chapter-06-format-card-hint">
        Click each card to learn more!
      </InteractionHint>
      <div
        aria-describedby="chapter-06-format-card-hint"
        className={`${styles.milestoneCards} ${styles.milestoneCardsTwo}`}
        role="group"
      >
        <MilestoneCard
          title="OUC-Haide Initial Ideas"
          detail={
            <>
              <p>
                <strong>Design Principle:</strong> Embed synthetic biology into
                tasks and choices, rather than explain everything first.
              </p>
              <p>
                <strong>Format Explored:</strong> We proposed various activity
                formats (
                <strong>
                  role-playing, card games, and escape-room activities
                </strong>
                ).
              </p>
            </>
          }
          href={`${mediaRoot}/6-3-1-milestone-01-ouc-haide-initial-ideas.pdf`}
        />
        <MilestoneCard
          title="Qingdao Academy Initial Ideas"
          detail={
            <>
              <p>
                <strong>Design Principle:</strong> Turn high school students
                from <strong>passive listeners</strong> into{" "}
                <strong>active participants</strong>.
              </p>
              <p>
                <strong>Peer-Informed Scientific Depth:</strong> From a peer
                perspective, their activity design emphasized an appropriate
                level of scientific depth for high school learners while
                identifying potential explanation gaps.
              </p>
            </>
          }
        />
      </div>
      <svg
        aria-hidden="true"
        className={styles.choiceConnector}
        preserveAspectRatio="none"
        viewBox="0 0 600 80"
      >
        <path
          className={styles.choiceLine}
          d="M150 0C150 38 300 38 300 72"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className={styles.choiceLine}
          d="M450 0C450 38 300 38 300 72"
          vectorEffect="non-scaling-stroke"
        />
        <circle className={styles.choiceNode} cx="300" cy="74" r="5" />
      </svg>
      <div className={styles.milestoneChoice}>
        <span>Our choice</span>
        <h6>An immersive Escape Room Activity</h6>
        <p>
          Among the formats we explored, the escape-room activity emerged as a
          natural fit for our high school audience.
        </p>
        <ol>
          <li>
            Abstract biology concepts were translated into clues and reasoning
            tasks, making the science more attractive at an accessible level for
            our audience.
          </li>
          <li>
            Participants had to actively interpret evidence, solve problems, and
            complete these tasks to move the story forward, turning them from
            passive listeners into active “detectives”.
          </li>
        </ol>
      </div>
    </>,
  ],
  [
    "storyline-design",
    "Shaping the Storyline and Activity Design",
    <>
      <InteractionHint id="chapter-06-storyline-card-hint">
        Click each card to learn more!
      </InteractionHint>
      <div
        aria-describedby="chapter-06-storyline-card-hint"
        className={styles.milestoneCards}
        role="group"
      >
        <MilestoneCard
          title="OUC-Haide 01: A Safety-Centered Mystery"
          detail={
            <>
              <p>
                <strong>Story Setting:</strong> The event was based on a
                full-fledged synthetic biology process, namely the DBTL cycle.
                In this narrative, a fictional biomanufacturing company iterates
                engineered strains through DBTL. Its latest strain, β-17,
                achieves outstanding production performance but fails a critical
                safety test. When a stop signal is given, the system continues
                to operate.
              </p>
              <p>
                <strong>Activity Idea:</strong> Much like a traditional
                escape-room experience, players uncover the truth using provided
                clues and logical reasoning as they move through interconnected
                rooms.
              </p>
            </>
          }
          href={`${mediaRoot}/6-3-1-milestone-02-a-safety-centered-mystery.pdf`}
        />
        <MilestoneCard
          title="Qingdao Academy: A Project-Linked Biomanufacturing Journey"
          detail={
            <>
              <p>
                <strong>Story Setting:</strong> Drawing upon the shared
                waste-to-value essence of our two projects, this concept
                followed a biomanufacturing pathway in which underused biomass,
                such as straw and algal materials, was biologically processed
                and ultimately converted into higher-value products.
              </p>
              <p>
                <strong>Activity Idea:</strong> Players will progress through a
                series of tasks designed around a biomanufacturing workflow.
              </p>
            </>
          }
        />
        <MilestoneCard
          title="OUC-Haide 02: A Lab-Based Biosensors"
          detail={
            <>
              <p>
                <strong>Story Setting:</strong> The scenario depicts a typical
                school emergency. Students develop symptoms after lunch, and a
                team must rebuild a synthetic biosensor to quickly identify the
                suspected pathogen before conventional testing can provide
                results.
              </p>
              <p>
                <strong>Activity Idea:</strong> Traditional escape-room
                reasoning was extended into laboratory-like tasks, including DNA
                extraction, mutation analysis, gene-circuit assembly, and
                control experiments. The four stages followed the logic of
                constructing and validating a biosensor.
              </p>
            </>
          }
          href={`${mediaRoot}/6-3-1-milestone-01-a-lab-based-biosensors.pdf`}
        />
      </div>
      <div className={styles.retainedGrid}>
        <div>
          <span>From the first proposal</span>
          <p>
            The completed narrative backbone and an ideal storyline for engaging
            students to learn to{" "}
            <strong>
              make responsible choices when confronted with its potential risks
            </strong>
            .
          </p>
        </div>
        <div>
          <span>From the second proposal</span>
          <p>
            The project-linked biomanufacturing context combined with the
            first’s storyline.
          </p>
        </div>
        <div>
          <span>From the third proposal</span>
          <p>Simplified laboratory integrated into the escape-room gameplay.</p>
        </div>
      </div>
      <div className={styles.milestoneChoice}>
        <span>Our initial activity design</span>
        <p>
          By integrating these elements, we developed our initial escape-room
          design,{" "}
          <strong>
            consisting of a storyline with a conflict between technological
            performance and biosafety, allowing students to experience the
            complexity of responsible decision-making in synthetic biology
          </strong>{" "}
          and four connected activity scenes that combined evidence-driven
          reasoning with simplified laboratory practices.{" "}
          <strong>Here is storyline:</strong>
        </p>
        <p>
          High-performing β-17 → Safety test failed → Students investigate
          evidence → Performance versus safety dilemma → Responsible choice
        </p>
      </div>
    </>,
  ],
  [
    "testing-and-refining",
    "Testing and Refining the Activity Design",
    <>
      <p>
        After developing our initial design, the activity lead from Qingdao
        Academy tested the experimental components in advance to determine
        whether they could reliably support the intended gameplay and learning
        objectives.{" "}
        <strong>
          This pre-testing revealed a practical limitation in Scene 1, prompting
          another iteration before implementation.
        </strong>
      </p>
      <div
        className={`${styles.milestoneCards} ${styles.milestoneCardsStacked}`}
      >
        <MilestoneStaticCard
          step="Initial design: scene one"
          title="Fluorescence-based testing"
          detail={
            <p>
              In our initial design, players would distinguish β-16 from β-17 by
              comparing their reporter signals. They would test prepared
              simulated samples, measure their fluorescence intensity, and
              compare the results with experimental records to determine the
              true identity of the displayed sample.
            </p>
          }
        />
        <MilestoneStaticCard
          step="Pre-implementation test"
          title="A practical limitation"
          detail={
            <p>
              Before implementation, the activity lead from Qingdao Academy
              tested the experimental component of our initial design to
              evaluate whether it could reliably produce the intended efficacy.
              During this test, we found that the fluorescence-based method
              could not generate a sufficiently clear and controllable
              distinction between the simulated samples, making it difficult to
              reliably support the intended storyline progression.
            </p>
          }
        />
        <MilestoneStaticCard
          step="Refined design: scene one"
          title="pH-Based Identification"
          detail={
            <p>
              Therefore, we redesigned the activity to enhance the audience’s
              experimental experience. During our discussion with the Qingdao
              Academy team, they pointed out that their laboratory was equipped
              with digital pH meters, providing us with a feasible alternative
              detection method. Based on this feedback, we replaced the original
              fluorescence-based identification with pH-based measurement. In
              the refined design, participants would use digital pH meters to
              measure the samples and compare their results with the reference
              ranges of β-16 and β-17, allowing them to follow the same
              evidence-based reasoning process while making the experiment more
              accessible and practical.
            </p>
          }
        />
      </div>
    </>,
  ],
  [
    "final-design",
    "Final Design",
    <>
      <p>
        Based on these iterations, we finalized the four-scene activity.{" "}
        <strong>
          OUC-Haide developed the overarching storyline and designed Scenarios 1
          and 2, while Qingdao Academy designed Scenarios 3 and 4
        </strong>
        . The Resource Library below therefore presents only the materials
        developed by OUC-Haide for our part of the activity.
      </p>
      <p className={styles.resourceListHeading}>
        Resource Library from OUC-Haide
      </p>
      <p>
        (Resources for Scenario 3 and Scenario 4 can be accessed through our
        partner’s wiki, Qingdao Academy)
      </p>
      <ResourceLibrary
        groups={milestoneResourceGroups}
        label="Resource library from OUC-Haide"
      />
    </>,
  ],
];

function MilestoneExplorer({ describedBy }: { describedBy?: string }) {
  const [activeId, setActiveId] = useState("format-exploration");
  const active = milestones.find(([id]) => id === activeId) ?? milestones[0];
  const panelId = useId();

  return (
    <div className={styles.milestoneExplorer}>
      <div
        className={styles.milestoneNav}
        role="tablist"
        aria-label="Design milestones"
        aria-describedby={describedBy}
      >
        {milestones.map(([id, title]) => (
          <button
            aria-controls={panelId}
            aria-selected={active[0] === id}
            className={styles.milestoneNavItem}
            id={`${panelId}-tab-${id}`}
            key={id}
            onClick={() => setActiveId(id)}
            onKeyDown={(event) =>
              moveTabFocus(event, (index) => setActiveId(milestones[index][0]))
            }
            role="tab"
            tabIndex={active[0] === id ? 0 : -1}
            type="button"
          >
            <strong>{title}</strong>
          </button>
        ))}
      </div>
      <div
        aria-labelledby={`${panelId}-tab-${active[0]}`}
        className={styles.milestoneDisplay}
        id={panelId}
        role="tabpanel"
      >
        <div className={styles.milestoneHeading}>
          <h6>{active[1]}</h6>
        </div>
        <div className={styles.milestoneBody} key={active[0]}>
          {active[2]}
        </div>
      </div>
    </div>
  );
}

const iterations: Array<{
  label: string;
  observation: ReactNode;
  revisionTitle: string;
  reflection: ReactNode;
  future: ReactNode;
}> = [
  {
    label: "Iteration I",
    revisionTitle: "Reflection & Real-time Revision",
    observation: (
      <>
        During the first round, we introduced the mechanism behind β-17 failure
        by explaining how the riboswitch and its regulatory process contributed
        to the loss of control.{" "}
        <strong>
          However, we observed that when presenting detailed theoretical
          mechanisms, participants' attention decreased, and this explanation
          stage occupied a significant amount of activity time.
        </strong>
      </>
    ),
    reflection: (
      <>
        The additional information meant to make the safety point more
        convincing for the audience, however, imposed extra cognitive load on
        them. Therefore,
        <strong> in the following rounds</strong>, we replaced the detailed
        explanation of the riboswitch mechanism with a single analogy—a brake.
        Participants were led to the single takeaway “β-17 relies on such a
        brake, and if it fails, the system can no longer be switched off”.
      </>
    ),
    future: (
      <>
        <p>
          <strong>
            Following the four rounds of activities, we reflected on our
            in-process adjustments and outlined our outlook.
          </strong>
        </p>
        <ol>
          <li>
            <strong>For high school students</strong>, while we use analogies to
            avoid overwhelming them with technical burdens, we still want to
            expose them to some related knowledge visually. To achieve this,{" "}
            <strong>
              we plan to use short, animated models in the next activity after
              Jamboree
            </strong>
            . Participants can watch, pause, and replay these animations,
            allowing them to take away the core message while gaining a
            preliminary understanding of deeper biological knowledge.
          </li>
          <li>
            When we first told people that this activity would be held,{" "}
            <strong>our peers</strong> majoring in biotechnology also asked to
            join. This made us realize its unique educational value for those
            students. As future scientists, this is not only about hitting the
            books. It is also about fostering the awareness of biosafety,
            ethics, and social responsibility.{" "}
            <strong>
              We therefore hope to extend this activity into a training ground
              where future biotech professionals cultivate responsible
              innovation and evidence-based decision-making.
            </strong>{" "}
            <strong>
              For them, the detailed molecular mechanisms we streamlined for
              younger audiences are not a burden, but a perfect fit.
            </strong>
          </li>
        </ol>
      </>
    ),
  },
  {
    label: "Iteration II",
    revisionTitle: "Reflection & Revision",
    observation:
      "At the post-activity debriefing session, we observed that one participant was able to reconstruct the entire storyline and reflected on underlying scientific concepts.",
    reflection: (
      <>
        This made us reconsider our original assumption that the game master and
        facilitator should always come from the design team.{" "}
        <strong>
          Although we knew every step of activities, she knew where her peers
          might encounter difficulties.
        </strong>{" "}
        Thus, <strong>we invited her to host Round 4</strong> and offered hints
        in the moment as her peers worked through the scenarios.
      </>
    ),
    future: (
      <p>
        Moving forward, we plan to recruit high-performing participants in this
        activity as student game masters. We will{" "}
        <strong>create a quick onboarding guide for them</strong> based on past
        observations and{" "}
        <strong>invited them to jointly write this guide</strong> from their
        perspectives. This allows them to step into facilitator roles with
        insider knowledge, offering more empathetic, in-the-moment guidance
        while{" "}
        <strong>
          helping our core team scale the escape-room activities to more schools
          and students.
        </strong>
      </p>
    ),
  },
];

function IterationExplorer({ describedBy }: { describedBy?: string }) {
  const [activeId, setActiveId] = useState(0);
  const active = iterations[activeId];
  const panelId = useId();
  const columns: Array<[string, ReactNode]> = [
    ["Observation", active.observation],
    [active.revisionTitle, active.reflection],
    ["Future Adaptation", active.future],
  ];

  return (
    <div className={styles.iterationExplorer}>
      <div
        className={styles.iterationNodes}
        role="tablist"
        aria-label="Activity iterations"
        aria-describedby={describedBy}
      >
        {iterations.map(({ label }, index) => (
          <button
            aria-controls={panelId}
            aria-selected={activeId === index}
            className={styles.iterationNode}
            id={`${panelId}-tab-${index}`}
            key={label}
            onClick={() => setActiveId(index)}
            onKeyDown={(event) => moveTabFocus(event, setActiveId)}
            role="tab"
            tabIndex={activeId === index ? 0 : -1}
            type="button"
          >
            <span />
            <strong>{label}</strong>
          </button>
        ))}
      </div>
      <div
        aria-labelledby={`${panelId}-tab-${activeId}`}
        className={styles.iterationColumns}
        id={panelId}
        key={activeId}
        role="tabpanel"
      >
        {columns.map(([title, body]) => (
          <article key={title}>
            <span>{title}</span>
            {typeof body === "string" ? <p>{body}</p> : body}
          </article>
        ))}
      </div>
    </div>
  );
}

const sections: ArticleSection[] = [
  {
    id: "overview",
    title: "Overview",
    content: <OverviewIntro />,
    subsections: [
      {
        id: "overview-tapestry",
        title: "The Tapestry of Science Education",
        content: <OverviewTapestry />,
      },
      {
        id: "overview-translating",
        title:
          "Translating Synthetic Biology Through the Biomanufacturing Workflow",
        content: <OverviewTranslating />,
      },
      {
        id: "overview-social-responsibility",
        title: "Fostering Social and Ethical Responsibility",
        content: <OverviewSocialResponsibility />,
      },
      {
        id: "overview-inclusive-access",
        title:
          "Expanding Access for Inclusive Participation and Future Decision-Making",
        content: <OverviewInclusiveAccess />,
      },
      {
        id: "overview-public-understanding",
        title:
          "Building Public Understanding for Synthetic biology and Biomanufacturing",
        content: (
          <>
            <OverviewPublicUnderstanding />
            <ActivityTimeline />
          </>
        ),
      },
    ],
  },
  {
    id: "principle",
    title: "Stitching Technique: Our Principle",
    content: (
      <>
        <PrincipleIntroContent />
        <WeaveFramework />
        <EvolutionLinks />
      </>
    ),
  },
  {
    id: "activities",
    title: "Activities",
    content: (
      <p className={styles.activityLead}>
        Each activity follows the same thread while adapting its language,
        format, and level of participation to a different audience.
      </p>
    ),
    subsections: [
      {
        id: "chapter-01",
        title: "Mapping the Blueprint",
        content: <Chapter01Content />,
      },
      {
        id: "chapter-02",
        title: "Unlocking Cellular Systems",
        content: <Chapter02Content />,
      },
      {
        id: "chapter-03",
        title: "Rewriting Biological Parts",
        content: <Chapter03Content />,
      },
      {
        id: "chapter-04",
        title: "Natural Living Factories",
        content: (
          <>
            <Chapter04PreCardsContent />
            <MagicCards />
            <Chapter04PostCardsContent
              actionGallery={
                <ChapterGallery
                  images={[
                    media(
                      "chapter-04-1",
                      "4-3-action-01.avif",
                      "Fermentation Magic Lab 1",
                    ),
                    media(
                      "chapter-04-2",
                      "4-3-action-02.avif",
                      "Fermentation Magic Lab 2",
                    ),
                    media(
                      "chapter-04-3",
                      "4-3-action-03.avif",
                      "Fermentation Magic Lab 3",
                    ),
                  ]}
                  label="Chapter 04 Fermentation Magic Lab photographs"
                />
              }
            />
          </>
        ),
      },
      {
        id: "chapter-05",
        title: "Tracing Back from Downstream Processing",
        content: (
          <>
            <Chapter05PreWorkflowContent />
            <WorkflowExplorer describedBy="chapter-05-workflow-interaction-hint" />
            <Chapter05PostWorkflowContent
              actionGallery={
                <ChapterGallery
                  images={[
                    media(
                      "chapter-05-1",
                      "5-3-action-01.avif",
                      "Microscopic Factory of Adhesives 1",
                    ),
                    media(
                      "chapter-05-2",
                      "5-3-action-02.avif",
                      "Microscopic Factory of Adhesives 2",
                    ),
                    media(
                      "chapter-05-3",
                      "5-3-action-03.avif",
                      "Microscopic Factory of Adhesives 3",
                    ),
                    media(
                      "chapter-05-4",
                      "5-3-action-04.avif",
                      "Microscopic Factory of Adhesives 4",
                    ),
                  ]}
                  label="Chapter 05 Microscopic Factory of Adhesives photographs"
                />
              }
            />
          </>
        ),
      },
      {
        id: "chapter-06",
        title: "Innovate for Shared Society",
        content: (
          <>
            <Chapter06PreEscapeContent />
            <h4>
              6.3 Activity II: 17-C: The Lab Mystery Escape-room Challenge
            </h4>
            <ChapterMeta kind="audience">High school students</ChapterMeta>
            <h5 id="chapter-06-3-1">6.3.1 Explore Objective-driven Design</h5>
            <div className={styles.designIntro}>
              <ObjectiveStatement>
                <strong>Objective:</strong> We aimed to help them understand
                that technological development requires not only high
                performance but also{" "}
                <strong>careful consideration of potential risks</strong> and{" "}
                <strong>responsible decision-making</strong> before practical
                deployment.
              </ObjectiveStatement>
              <p>
                <strong>Design:</strong> Across{" "}
                <strong>three rounds of exploration and refinement</strong>, we
                continually formed the <strong>activity format</strong>, the{" "}
                <strong>storyline</strong>, and the{" "}
                <strong>detailed interactions for individual scenarios</strong>.
                We also developed{" "}
                <strong>
                  a series of reproducible educational toolkits from
                  non-hazardous, low-cost materials
                </strong>
                , so that other teams and schools can run the same activities
                without specialized equipment.
              </p>
              <p>
                Tip: While some original ideas were not included in our final
                deployment, we hope sharing our early brainstorming and design
                pathways{" "}
                <strong>offers fresh inspiration to other teams</strong>.
              </p>
            </div>
            <InteractionHint id="chapter-06-milestone-interaction-hint">
              Click a milestone to explore how our design evolved!
            </InteractionHint>
            <MilestoneExplorer describedBy="chapter-06-milestone-interaction-hint" />
            <h5>6.3.2 Action</h5>
            <p>
              We conducted four rounds of activity, each one feeding into the
              next. Participants’ feedback and in-session reactions in every
              round reshaped how we ran the activities,{" "}
              <strong>
                making the whole sequence dynamically adjusted and iterative
                rather than a fixed one.
              </strong>
            </p>
            <InteractionHint id="chapter-06-iteration-interaction-hint">
              Click a dot to explore each iteration through three perspectives:
              Observation, Reflection &amp; Real-time Revision, and Future
              Adaptation.
            </InteractionHint>
            <IterationExplorer describedBy="chapter-06-iteration-interaction-hint" />
            <div className={styles.actionRecord}>
              <p>
                <strong>
                  Note: Safety Considerations and Experimental Adaptations
                </strong>
              </p>
              <p>
                To ensure participant safety,{" "}
                <strong>all equipment was disinfected before use</strong>.
                Rather than following conventional laboratory procedures, the
                sample-spotting activity was{" "}
                <strong>simplified using agarose gel cups</strong>. Solutions
                with different pH values were prepared using safe, non-toxic
                materials. These adaptations allowed participants to explore the
                scientific principles through a safe, simulated experiment.
              </p>
              <Figure
                {...chapter06Figure6Composite}
                caption={
                  <>
                    <strong>Record of the Activity:</strong>
                    <br />
                    (A) Participants read the{" "}
                    <strong>Initial Investigation Dossier</strong> to understand
                    the background of the case; (B) Participants examined the
                    displayed samples to determine whether they were the real{" "}
                    <strong>β-17</strong>; (C) Participants obtained the genetic
                    dossier through the card game; (D) Participants identified
                    the problem with <strong>β-17</strong> through the RNA
                    deduction worksheet; (E) Participants conducted a simulated
                    safe experiment to search for the suspect; (F) Participants
                    made their final decision; (G){" "}
                    <strong>
                      A Player from the previous round served as MC
                    </strong>{" "}
                    to lead the debriefing for the current round.
                  </>
                }
                captionPrefix="Figure 6."
                className={styles.compositeFigure}
              />
            </div>
            <Chapter06VerifyContent />
            <Chapter06SdgsContent />
          </>
        ),
      },
      {
        id: "chapter-07",
        title: "Empowering Future Voices",
        content: <Chapter07Content />,
      },
      {
        id: "chapter-08",
        title: "Bringing Synbio and Biomanufacturing Closer",
        content: <Chapter08Content />,
      },
    ],
  },
  {
    id: "resource-reuse",
    title: "Resource Reuse",
    content: <ResourceReuseContent />,
  },
  {
    id: "conclusion",
    title: "Conclusion",
    content: (
      <div className={styles.conclusion}>
        <p>
          Guided by our <strong>WEAVE framework</strong>, our educational
          journey continually evolved through practice and reflection.{" "}
          <strong>
            In turn, these real-world practices validated the feasibility of our
            principles
          </strong>
          . We developed <strong>Lecture + X</strong> not merely as a
          pedagogical model, but as <strong>another stitching technique</strong>{" "}
          for our tapestry. While the foundational lecture provides the
          essential structural thread, the <strong>'+ X'</strong> adds rich
          textures and vibrant patterns. By intertwining this core with hands-on
          experiments, interactive 3D models, and gamified learning, this
          diverse stitching technique allows us to tailor our approach to each
          audience.
        </p>
        <p>
          Our educational tapestry includes <strong>5000+</strong> threads
          (participants), from kindergarten children and school students to
          university peers, older adults, and the broader public, drawn from{" "}
          <strong>20+</strong> provincial-level regions in China and supported
          by <strong>180+</strong> student volunteers.
        </p>
        <p>
          Along the journey of weaving an expanding tapestry,{" "}
          <strong>
            we developed 20+ reusable educational resources and educational
            plugin for resource reuse,
          </strong>{" "}
          spanning age-adapted teaching materials, experimental worksheets,
          interactive digital tools, educational games, and activity toolkits.
          By sharing these resources alongside the reflections and adjustments
          behind them,{" "}
          <strong>
            we hope our experiences may inspire other iGEM teams and educators
            as they explore and refine their own approaches.
          </strong>
        </p>
        <p>
          <strong>
            Echo, the final stage of our WEAVE framework, reflects the two-way
            communication at the heart of our educational work.
          </strong>{" "}
          Audiences <strong>challenged our assumptions</strong>, pushing us
          beyond simplified metaphors toward the science they were ready to
          encounter, and in doing so, they redrew the boundaries of what we
          thought our content could be. They also{" "}
          <strong>became co-creators</strong>. Within our activities, the roles
          of <strong>audience and educator were no longer fixed</strong>, as
          participants stepped forward to guide their peers{" "}
          <strong>
            in ways we could never have designed from outside—a model we now
            intend to scale
          </strong>
          . We also learned alongside those we taught, joining our peers as
          learners to ask not only what biotechnology can achieve, but whose
          needs it should serve, prompting us to become more responsible
          researchers.
        </p>
        <p>
          <strong>Our tapestry does not end here</strong>.{" "}
          <strong>
            Instead, we hand the needle to the next generation of innovators and
            the public.
          </strong>{" "}
          All participants we engaged serve as vital threads in our project's
          foundation and{" "}
          <strong>will soon take up the needle themselves</strong>. After this
          iGEM season, we hope to invite the global scientific community to{" "}
          <strong>
            weave their own discoveries into this collaborative effort!
          </strong>
        </p>
      </div>
    ),
  },
];

export function Education() {
  const [searchParams] = useSearchParams();
  const selected = ACTIVITIES.find(
    (activity) => activity.id === searchParams.get("activity"),
  );

  useEffect(() => {
    if (selected) window.scrollTo(0, 0);
  }, [selected]);

  if (selected) {
    return <ActivityViewer activity={selected} key={selected.id} />;
  }

  return (
    <div className={styles.pageShell}>
      <ArticlePage
        heroImage={{
          src: "https://static.igem.wiki/teams/6147/wiki/education/edu-igem-collagen.webp",
          alt: "Collage of OUC-Haide education activities and participants around the WEAVE programme mark.",
        }}
        sections={sections}
        stickyMobileOutline
        title="Education"
        references
      />
    </div>
  );
}

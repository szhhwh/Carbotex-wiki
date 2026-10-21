import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { MousePointerClick } from "lucide-react";
import { useLocation } from "react-router-dom";
import inclusiveAccessImage from "../../assets/education/puzzle/inclusive-access.svg";
import publicUnderstandingImage from "../../assets/education/puzzle/public-understanding.svg";
import socialResponsibilityImage from "../../assets/education/puzzle/social-responsibility.svg";
import translatingImage from "../../assets/education/puzzle/translating.svg";
import { Cite } from "../../components/article/References";
import styles from "../education.module.css";
import { PrincipleDisc } from "./PrincipleDisc";
import { PrincipleIntroContent } from "./PrincipleIntroContent";
import { WeaveFramework } from "./WeaveFramework";

export function OverviewIntro() {
  return (
    <>
      <p>
        In our project, synthetic biology serves as a needle, weaving diverse
        carbon streams into bio-based adhesives. As this technology moves from
        laboratories into everyday life, public understanding and participation
        become increasingly important. A Japanese survey found that{" "}
        <strong>78.9% </strong>of respondents held intermediate attitudes toward
        synthetic biology,{" "}
        <strong>
          meaning many people reserve judgment until sufficient supporting
          reasons become available
          <Cite k="hibino2019ambiguity" />
        </strong>
        . Meanwhile, a Chinese study found that public attitudes{" "}
        <strong>
          frequently shifted following group discussions
          <Cite k="jin2024drivers" />
        </strong>
        .
      </p>
      <p>
        These findings
        <strong>
          {" "}
          highlight the importance of accessible scientific education and
          meaningful dialogue
        </strong>{" "}
        to equip people with the knowledge and opportunities to participate in{" "}
        <strong>public discussions</strong> and <strong>decision-making</strong>
        , and even to contribute{" "}
        <strong>to responsible innovation in synthetic biology</strong>.
      </p>
      <p>
        With a <strong>needle </strong>in hand, we brought together audiences of
        diverse ages and backgrounds, like <strong>threads</strong> scattered
        across a vast canvas, using the{" "}
        <strong>carefully chosen stitching technique</strong> to weave them into
        an ever-expanding tapestry of scientific understanding.
      </p>
    </>
  );
}

type PuzzlePieceId =
  | "translating"
  | "social-responsibility"
  | "public-understanding"
  | "inclusive-access"
  | "principle";

type PuzzlePiece = {
  id: PuzzlePieceId;
  label: string;
  className: string;
  image?: string;
  title: string;
  content: ReactNode;
  anchorId?: string;
};

function OverviewTimeline({ children }: { children: ReactNode }) {
  return <ol className={styles.overviewTimeline}>{children}</ol>;
}

export function OverviewTranslating() {
  return (
    <>
      <p>
        Rooted in our lab workflow within the framework of synthetic biology,
        spanning <strong>chassis selection</strong>,{" "}
        <strong>genetic redesign,</strong> <strong>fermentation</strong>, and{" "}
        <strong>downstream processing</strong>, we structured our educational
        initiatives <strong>around each technical stage</strong> to help
        participants of different ages and backgrounds explore our project’s
        biomanufacturing journey with age-appropriate content and format.
      </p>
      <OverviewTimeline>
        <li>
          <p>
            The “
            <em>
              <a href="#chapter-01">
                Science Outreach Campaign—Decoding Genes, Empowering via Synbio
              </a>
            </em>
            ” recruited and trained{" "}
            <strong>interdisciplinary undergraduate students</strong> as
            speakers, while making the fundamentals of synthetic biology
            accessible to <strong>diverse audiences</strong> and preparing them
            for the subsequent activities.
          </p>
          <p>
            Based on the stage of <strong>chassis selection</strong>,{" "}
            <strong>
              <em>
                <a href="#chapter-02">early-childhood activities</a>
              </em>
            </strong>{" "}
            introduced kindergarten children to the cell as a coordinated system
            through clay modeling and collage-making.
          </p>
        </li>
        <li>
          <p>
            <strong>
              <em>
                <a href="#chapter-03">“Exploring the Code of Life—DNA”</a>
              </em>
            </strong>{" "}
            and{" "}
            <strong>
              <em>
                <a href="#chapter-03">“Sensors Inside the Cell”</a>
              </em>
            </strong>{" "}
            guided primary school students from{" "}
            <strong>exploring genetic information</strong> to{" "}
            <strong>
              envisioning biological components designed to address specific
              needs.
            </strong>
          </p>
        </li>
        <li>
          <p>
            In{" "}
            <strong>
              <em>
                <a href="#chapter-04">“Fermentation Magic Lab,”</a>
              </em>
            </strong>{" "}
            primary school students learned{" "}
            <strong>
              how microorganisms convert raw materials into useful products
            </strong>{" "}
            through yeast experiments, connecting biological redesign to the
            production stage of our project.
          </p>
        </li>
        <li>
          <p>
            <strong>
              <em>
                <a href="#chapter-05">“The Microscopic Factory of Adhesives”</a>
              </em>
            </strong>{" "}
            integrated high school students’ existing knowledge into the network
            of our work and helped them connect scattered biological points
            while leveraging them to gain insight into synthetic biology and
            biomanufacturing.
          </p>
        </li>
      </OverviewTimeline>
    </>
  );
}

export function OverviewSocialResponsibility() {
  return (
    <>
      <p>
        Synthetic biology and other technologies do not evolve separately from
        society. Societal needs and values can influence the direction of
        technological development, while advances in technology, in turn, affect
        how resources are utilized and how benefits and risks are shared within
        society. This mutual relationship underscores the importance of guiding
        technological innovation with consideration for its broader societal
        implications. Therefore, we believe that biomanufacturing education
        should go beyond simply imparting scientific knowledge.
      </p>
      <OverviewTimeline>
        <li>
          <p>
            <strong>Children in the local community </strong>experienced the
            societal value of technology through the{" "}
            <strong>
              <em>
                <a href="#chapter-06-2">traditional craft workshop</a>
              </em>
            </strong>
            , learning how practical applications can transform waste into
            community and environmental benefits.
          </p>
        </li>
        <li>
          <p>
            <strong>High School Students</strong> acquired knowledge and{" "}
            <strong>ethical decision-making skills</strong> through{" "}
            <em>
              <a href="#chapter-06-3-1">
                “ <strong>17-C: The Lab Mystery</strong>{" "}
                <strong>Escape-room Challenge</strong>”
              </a>
            </em>
            .
          </p>
        </li>
        <li>
          <p>
            During the{" "}
            <strong>
              <em>
                <a href="#chapter-06-4">
                  workshop based on the Sustainable Development Goals (SDGs)
                </a>
              </em>
            </strong>
            , we not only encouraged <strong>our peers </strong>to explore how
            biotechnology can address real-world societal needs but also{" "}
            <strong>
              participated as learners ourselves. Our peers and team members
            </strong>{" "}
            reflected on our responsibilities as future scientists to look
            beyond laboratory achievements, pursue responsible innovation, and
            make evidence-based decisions.
          </p>
        </li>
      </OverviewTimeline>
    </>
  );
}

export function OverviewInclusiveAccess() {
  return (
    <>
      <p>
        <strong>
          However, opportunities to engage in discussions about responsible
          innovation are not equally accessible
        </strong>
        . For children in under-resourced regions, limited access to basic
        science education can make it harder to understand emerging technologies
        and participate in conversations about their future. To
        <strong> promote</strong> inclusivity in scientific decision-making, we
        extended our outreach to{" "}
        <strong>Luchun County, Yunnan Province,</strong>{" "}
        <strong>
          helping children build the scientific knowledge needed for future
          participation.
        </strong>
      </p>
    </>
  );
}

export function OverviewPublicUnderstanding() {
  return (
    <>
      <p>
        When products enter society, limited familiarity with synthetic biology
        and concerns regarding genetic modification may give rise to public
        uncertainty or hesitation. For scientific innovations to be integrated
        into society, individuals should have opportunities to understand the
        underlying technologies and develop informed perspectives.
      </p>
      <p>
        Although our project has not yet reached real-world application,{" "}
        <strong>
          we believe public engagement should begin well before a product enters
          everyday life.
        </strong>{" "}
        We therefore established our <strong>WeChat Official Account</strong> as
        an ongoing science communication platform and developed{" "}
        <strong>science-themed merchandise</strong> to bring synthetic biology
        closer to the public
      </p>
    </>
  );
}

const puzzlePieces: PuzzlePiece[] = [
  {
    id: "translating",
    label:
      "Translating Synthetic Biology Through the Biomanufacturing Workflow",
    className: styles.puzzlePieceTopLeft,
    image: translatingImage,
    title:
      "Translating Synthetic Biology Through the Biomanufacturing Workflow",
    content: <OverviewTranslating />,
  },
  {
    id: "social-responsibility",
    label: "Fostering Social and Ethical Responsibility",
    className: styles.puzzlePieceTopRight,
    image: socialResponsibilityImage,
    title: "Fostering Social and Ethical Responsibility",
    content: <OverviewSocialResponsibility />,
  },
  {
    id: "public-understanding",
    label:
      "Building Public Understanding for Synthetic biology and Biomanufacturing",
    className: styles.puzzlePieceBottomLeft,
    image: publicUnderstandingImage,
    title:
      "Building Public Understanding for Synthetic biology and Biomanufacturing",
    content: <OverviewPublicUnderstanding />,
  },
  {
    id: "inclusive-access",
    label:
      "Expanding Access for Inclusive Participation and Future Decision-Making",
    className: styles.puzzlePieceBottomRight,
    image: inclusiveAccessImage,
    title:
      "Expanding Access for Inclusive Participation and Future Decision-Making",
    content: <OverviewInclusiveAccess />,
  },
  {
    id: "principle",
    label: "Stitching Technique: Our Principle",
    className: styles.puzzlePieceCenter,
    title: "Stitching Technique: Our Principle",
    content: (
      <>
        <PrincipleIntroContent />
        <WeaveFramework />
      </>
    ),
    anchorId: "principle",
  },
];

function movePuzzleFocus(
  event: KeyboardEvent<HTMLButtonElement>,
  selectPiece: (id: PuzzlePieceId) => void,
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
  selectPiece(puzzlePieces[nextIndex].id);
  tabs[nextIndex]?.focus();
}

export function OverviewTapestry() {
  const [activeId, setActiveId] = useState<PuzzlePieceId>("translating");
  const [liftedId, setLiftedId] = useState<PuzzlePieceId | null>(null);
  const { hash } = useLocation();
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const activePiece =
    puzzlePieces.find(({ id }) => id === activeId) ?? puzzlePieces[0];
  const getTabId = (id: PuzzlePieceId) => `${panelId}-tab-${id}`;
  const titleId = `${panelId}-title`;
  const PanelTitle = activePiece.anchorId ? "h3" : "h4";
  const selectPiece = (id: PuzzlePieceId) => {
    setActiveId(id);
    setLiftedId(id);
  };
  const selectAndRevealPiece = (id: PuzzlePieceId) => {
    selectPiece(id);
    requestAnimationFrame(() => {
      panelRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    });
  };

  useEffect(() => {
    if (hash === "#principle" || hash === "#principle-heading") {
      setActiveId("principle");
    }
  }, [hash]);

  return (
    <div className={styles.puzzleExplorer}>
      <p className={styles.puzzleTagline}>
        <strong>Needle: Biological Knowledge; Thread: Participants</strong>
      </p>
      <p className={styles.puzzleInstruction}>
        <MousePointerClick aria-hidden="true" size={17} />
        <span>Click each puzzle to learn more.</span>
      </p>
      <div className={styles.puzzleLayout}>
        <div className={styles.puzzleBoardColumn}>
          <div
            aria-label="Science education theme puzzle"
            className={styles.puzzleBoard}
            role="tablist"
          >
            {puzzlePieces.map((piece, index) => {
              const isActive = activeId === piece.id;
              return (
                <button
                  aria-controls={panelId}
                  aria-selected={isActive}
                  className={`${styles.puzzlePiece} ${piece.className}`}
                  data-lifted={liftedId === piece.id ? "true" : undefined}
                  id={getTabId(piece.id)}
                  key={piece.id}
                  onClick={() => selectAndRevealPiece(piece.id)}
                  onKeyDown={(event) => movePuzzleFocus(event, selectPiece)}
                  role="tab"
                  style={
                    {
                      "--puzzle-delay": `${index * 70}ms`,
                    } as CSSProperties
                  }
                  tabIndex={isActive ? 0 : -1}
                  type="button"
                >
                  {piece.id === "principle" ? (
                    <PrincipleDisc className={styles.puzzlePieceImage} />
                  ) : (
                    <img
                      alt=""
                      aria-hidden="true"
                      className={styles.puzzlePieceImage}
                      draggable="false"
                      height="223"
                      src={piece.image}
                      width="223"
                    />
                  )}
                  <span className={styles.srOnly}>{piece.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div
          aria-labelledby={getTabId(activePiece.id)}
          className={styles.puzzlePanel}
          id={panelId}
          ref={panelRef}
          role="tabpanel"
          tabIndex={0}
        >
          <div className={styles.puzzlePanelInner} key={activePiece.id}>
            <div className={styles.puzzlePanelAnchor} id={activePiece.anchorId}>
              <PanelTitle
                className={`${styles.puzzlePanelTitle} ${
                  activePiece.anchorId ? styles.puzzlePanelTitlePrinciple : ""
                }`}
                id={
                  activePiece.anchorId
                    ? `${activePiece.anchorId}-heading`
                    : titleId
                }
                tabIndex={-1}
              >
                {activePiece.title}
              </PanelTitle>
            </div>
            <div className={styles.puzzlePanelBody}>{activePiece.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

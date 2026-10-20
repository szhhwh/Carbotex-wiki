import styles from "../education.module.css";
import { Collapse } from "../../components/ui/Collapse";
import { ChapterMeta } from "./ChapterMeta";
import { media, mediaRoot } from "./EducationAssets";
import {
  ChapterGallery,
  ResourceCard,
  ResourceLibrary,
  type EducationResourceGroup,
} from "./EducationMedia";
import { chapter03Figure5 } from "./EducationFigures";
import { OverflowHint } from "./InteractionHint";
import { ObjectiveStatement } from "./ObjectiveStatement";
import { ProseList } from "./ProseList";
import { WonderQuestion } from "./WonderQuestion";

const chapter03ResourceGroups = [
  {
    id: "activity-1",
    title: "Activity I",
    resources: [
      {
        id: "dna-presentation",
        title: "“Exploring the Code of Life-DNA” Presentation",
        href: `${mediaRoot}/3-1-activity-1-prensentation.pdf`,
      },
      {
        id: "dna-record-sheet",
        title: "DNA Experiment Record Sheet",
        href: `${mediaRoot}/3-1-activity-1-dna-extraction-record-sheet.pdf`,
      },
      {
        id: "dna-model",
        title: "3D DNA Model",
        href: "/ouc-haide/education?activity=dna",
      },
    ],
  },
  {
    id: "activity-2",
    title: "Activity II",
    resources: [
      {
        id: "sensor-presentation",
        title: "“Sensors Inside the Cell” Presentation",
        href: `${mediaRoot}/3-1-activity-2-presentation.pdf`,
      },
      {
        id: "sensor-worksheet",
        title: "Biological Sensor Design Worksheet",
        href: `${mediaRoot}/3-1-activity-2-design-worksheet.pdf`,
      },
    ],
  },
] satisfies EducationResourceGroup[];

export function Chapter03Content() {
  return (
    <>
      <ChapterMeta kind="audience">Primary school students</ChapterMeta>
      <h4>3.1 Wonder</h4>
      <WonderQuestion>
        Why did we focus on the part of redesigning?
      </WonderQuestion>
      <p>
        <strong>Echo 01 from “The Sticky Magic in Nature”</strong> encouraged us
        to bring the relevant knowledge of biological part redesign into the
        subsequent activities.{" "}
        <strong>
          Moreover, in our project, this idea is reflected in two engineering
          strategies
        </strong>
        , including overexpressing relevant transcription factors to enhance
        xylose utilization by our chassis, and PYC to redirect metabolic flux
        toward malic acid production.
      </p>
      <WonderQuestion>
        Why did we reach out to primary school students?
      </WonderQuestion>
      <p>
        Building on our kindergarten outreach, we wanted to take young learners{" "}
        <strong>
          from recognizing biological structures and functions to exploring the
          principles behind them
        </strong>
        . Primary school students' developing reasoning and communication skills
        offered an opportunity to introduce more abstract concepts while
        retaining engaging, hands-on learning experiences. By reaching out to
        this age group, we hoped to help students move beyond simply
        understanding how biological components work and begin imagining{" "}
        <strong>
          how they could be redesigned to address real-world needs
        </strong>
        .
      </p>
      <h4>3.2 Explore Objective-Driven Design</h4>
      <ObjectiveStatement>
        <strong>Objective:</strong> To help primary school students 1){" "}
        <strong>
          recognize DNA as the carrier of genetic information and understand its
          basic structure
        </strong>
        ; 2){" "}
        <strong>
          build an initial understanding of how biological components function
          and can be redesigned to meet specific needs, a key idea in synthetic
          biology.
        </strong>
      </ObjectiveStatement>
      <p>
        <strong>For the educational content,</strong> we selected
        age-appropriate scientific concepts from our project’s process,
        preserving its scientific logic while adapting the depth to primary
        school students.
      </p>
      <p>
        <strong>For the outreach approach</strong>, feedback from our
        kindergarten activities became the starting point for a new round of
        activities. As students’ cognitive and literacy skills developed, so did{" "}
        the way <strong>we presented scientific content</strong>,{" "}
        <strong>forms of interaction</strong>, and{" "}
        <strong>methods of verification</strong>.
      </p>
      <h5>3.2.1 Educational Content Design</h5>
      <p>
        Making such concepts accessible to students required us to select an
        appropriate scientific medium. Drawing from our project design, we found
        that transcription factors provide a clearer way to illustrate the
        relationship between biological parts and their functions than the
        complex metabolic pathways. Furthermore, as proteins encoded by genetic
        information, they naturally connect these functions to their underlying
        genetic basis.
      </p>
      <h6>Activity I: Exploring the Code of Life-DNA</h6>
      <ol type="1">
        <li>
          <p>
            <strong>
              Three relatable clues prepared to explain that DNA carries genetic
              information
            </strong>
          </p>
        </li>
      </ol>
      <ProseList>
        <li>
          <p>
            Clue 1—The Architectural Blueprint: Just like a blueprint holds the
            design for a skyscraper, DNA holds the design for you.
          </p>
        </li>
        <li>
          <p>
            Clue 2—The Trait Decider: It is the hidden item that dictates your
            visible traits, from eye color to height.
          </p>
        </li>
        <li>
          <p>
            Clue 3—The Instruction Manual: Tells different parts of your body
            what to do
          </p>
        </li>
      </ProseList>
      <ol start={2} type="1">
        <li>
          <p>
            <strong>
              “Spiraling Staircase” vividly illustrate the real structure of DNA
            </strong>
          </p>
        </li>
      </ol>
      <ProseList>
        <li>
          <p>
            The outer <strong>sugar-phosphate backbone</strong> was designed to
            be understood <strong>as the "handrails" of the ladder.</strong>
          </p>
        </li>
        <li>
          <p>
            The inner <strong>base pairs (A-T and G-C)</strong> were introduced
            as the <strong>connecting "rungs"</strong>.
          </p>
        </li>
      </ProseList>
      <h6>Activity II: Sensors Inside the Cell</h6>
      <p>
        Transcription factors served as sensors within cells due to their
        capability to recognize environmental signals, enabling students to gain
        a glimpse into how a sensor could be altered to recognize a different
        signal and the basic idea of redesigning biological functions at the DNA
        level.
      </p>
      <h5>3.2.2 Approach Design</h5>
      <OverflowHint targetId="chapter-03-approach-table">
        Swipe or scroll horizontally to compare all four columns.
      </OverflowHint>
      <div
        className={styles.tableScroller}
        id="chapter-03-approach-table"
        role="region"
        aria-label="Approach design comparison"
        tabIndex={0}
      >
        <table>
          <colgroup>
            <col style={{ width: "17%" }} />
            <col style={{ width: "36%" }} />
            <col style={{ width: "4%" }} />
            <col style={{ width: "41%" }} />
          </colgroup>
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Dimension</th>
              <th style={{ textAlign: "center" }}>Kindergarten</th>
              <th style={{ textAlign: "center" }}>
                <span className={styles.srOnly}>Change</span>
              </th>
              <th style={{ textAlign: "center" }}>Primary School</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ textAlign: "center" }}>Scientific Depth</td>
              <td style={{ textAlign: "center" }}>
                Structures &amp; Functions
              </td>
              <td style={{ textAlign: "center" }}>→</td>
              <td style={{ textAlign: "center" }}>
                <strong>Underlying Principles &amp; Rules</strong>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>
                <p>Language</p>
                <p>Style</p>
              </td>
              <td style={{ textAlign: "center" }}>
                Personification &amp; Familiar Analogies Based on Facts
              </td>
              <td style={{ textAlign: "center" }}>→</td>
              <td style={{ textAlign: "center" }}>
                Engaging language &amp; <strong>Scientific Terminology</strong>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>Verification</td>
              <td style={{ textAlign: "center" }}>
                Verbal &amp; Behavioral Responses
              </td>
              <td style={{ textAlign: "center" }}>→</td>
              <td style={{ textAlign: "center" }}>
                Verbal &amp; Behavioral Responses{" "}
                <strong>with Written &amp; Design Outputs</strong>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>Interaction</td>
              <td style={{ textAlign: "center" }}>Hands-on Creation</td>
              <td style={{ textAlign: "center" }}>→</td>
              <td style={{ textAlign: "center" }}>
                Diverse Interactive Formats
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h6>Scientific Depth</h6>
      <p>
        At the kindergarten stage, we focused on observable biological
        phenomena, helping children connect what they could see and experience
        with basic biological structures and functions. At the primary school
        stage, we went a step further, encouraging students to explore the
        relationships and scientific rules behind these structures.
      </p>
      <Collapse
        className={styles.inlineCollapse}
        header="Scientific Depth details"
        headerAs="h6"
        variant="card"
      >
        <ProseList>
          <li>
            <p>
              <strong>“Exploring the Code of Life-DNA”</strong>: Investigated
              the structural principles of the DNA double helix, including the{" "}
              <strong>sugar-phosphate backbone</strong> and{" "}
              <strong>A–T / G–C base pairing</strong>.
            </p>
          </li>
          <li>
            <p>
              <strong>“Sensors Inside the Cell”</strong>: Introduced how{" "}
              <strong>
                ligand binding induces conformational changes in transcription
                factors
              </strong>{" "}
              following the logic of sensors:{" "}
              <strong>
                “signal recognition → information processing → response
              </strong>
              ”.
            </p>
          </li>
        </ProseList>
      </Collapse>
      <h6>Language Style</h6>
      <p>
        During kindergarten, we made complex biology easy to grasp through
        personification and familiar real-life scenarios. For primary school
        students, we kept this engaging language as a gateway to abstract ideas,
        while introducing some terminology.
      </p>
      <Collapse
        className={styles.inlineCollapse}
        header="Language Style details"
        headerAs="h6"
        variant="card"
      >
        <p>
          <strong>"Sensors Inside the Cell":</strong> Various cellular
          organelles and proteins are listed using scientific terminology rather
          than the way we described in kindergarten to guide the students in
          discovering which component could act as a sensor.
        </p>
      </Collapse>
      <h6>Verification Aids</h6>
      <p>
        <strong>
          As our audience progressed from kindergarten to primary school, we
          adapted how we evaluated learning.
        </strong>{" "}
        For kindergarten children, we mainly relied on their{" "}
        <strong>verbal responses and behavioral observations</strong> to assess
        their understanding. For primary school students, we introduced{" "}
        <strong>related worksheets,</strong> allowing their understanding and
        application of the concepts to become more directly visible.
      </p>
      <Collapse
        className={styles.inlineCollapse}
        header="Verification Aids details"
        headerAs="h6"
        variant="card"
      >
        <ProseList>
          <li>
            <p>
              <strong>“Exploring the Code of Life-DNA”:</strong> Students were
              required to document their observations and reflections on{" "}
              <strong>experiment record sheets</strong> while testing their
              understanding of DNA structure and base-pairing rules to{" "}
              <strong>
                assemble a DNA model on an interactive web platform
              </strong>
              .
            </p>
          </li>
          <li>
            <p>
              <strong>“Sensors Inside the Cell”:</strong>{" "}
              <strong>A design worksheet was developed</strong> to make
              students’ application of knowledge visible by guiding them from a
              self-identified real-life problem to the signal to be detected and
              the working process of their proposed sensor.
            </p>
          </li>
        </ProseList>
      </Collapse>
      <h6>Interaction</h6>
      <p>
        Hands-on engagement expanded to various interactive form including
        web-based puzzles, manipulable 3D DNA models, and science experiments.
      </p>
      <h6>Resource Library</h6>
      <ResourceLibrary
        groups={chapter03ResourceGroups}
        label="Chapter 3 resource library"
      />
      <h4>3.3 Action</h4>
      <h5>Activity I: Exploring the Code of Life-DNA</h5>
      <ChapterGallery
        images={[
          media("chapter-03-dna-1", "3-3-activity-1-01.avif", "DNA activity 1"),
          media("chapter-03-dna-2", "3-3-activity-1-02.avif", "DNA activity 2"),
          media("chapter-03-dna-3", "3-3-activity-1-03.avif", "DNA activity 3"),
          media("chapter-03-dna-4", "3-3-activity-1-04.avif", "DNA activity 4"),
          media("chapter-03-dna-5", "3-3-activity-1-05.avif", "DNA activity 5"),
          media("chapter-03-dna-6", "3-3-activity-1-06.avif", "DNA activity 6"),
        ]}
        label="Chapter 03 DNA activity photographs"
      />
      <h5>Activity II: Sensors inside the cell</h5>
      <ChapterGallery
        images={[
          media(
            "chapter-03-sensor-1",
            "3-3-activity-2-01.avif",
            "Sensors Inside the Cell activity 1",
          ),
          media(
            "chapter-03-sensor-2",
            "3-3-activity-2-02.avif",
            "Sensors Inside the Cell activity 2",
          ),
          media(
            "chapter-03-sensor-3",
            "3-3-activity-2-03.avif",
            "Sensors Inside the Cell activity 3",
          ),
          media(
            "chapter-03-sensor-4",
            "3-3-activity-2-04.avif",
            "Sensors Inside the Cell activity 4",
          ),
        ]}
        label="Chapter 03 Sensors Inside the Cell photographs"
      />
      <h4>3.4 Verify</h4>
      <p>
        <strong>
          (1) Validated the understanding of DNA’s function and structure from
          in-time actions
        </strong>
      </p>
      <p>
        <strong>
          As the clues we had prepared gradually appeared on the slides,
          students excitedly exclaimed, “DNA is the code of life!”
        </strong>{" "}
        This spontaneous response suggested that they started to connect DNA
        with genetic information.
      </p>
      <p>
        In the following DNA assembly task, students eagerly stepped up to the
        screen and applied the A–T and G–C base-pairing rules to complete the
        model, then observed its double-helix structure through an animated 3D
        visualization.
      </p>
      <p>
        <strong>
          Their immediate reactions evidenced that they had begun to establish
          an initial understanding of what we intended to deliver, which was in
          line with our learning objectives.
        </strong>
      </p>
      <ChapterGallery
        caption="Records of Our DNA Learning Activity: (A) Students identifying DNA as the “code of life” through progressively revealed clues; (B) Students participating in the DNA assembly task using complementary base-pairing rules."
        captionPrefix="Figure 5."
        images={chapter03Figure5}
        label="Records of our DNA learning activity"
      />
      <p>
        <strong>
          (2) Verified the recognition of the sensor mechanism and redesign in
          their work as a participant of synthetic biology
        </strong>
      </p>
      <p>
        Starting from real-world problems they wanted to address, students{" "}
        <strong>
          first identified the external signals their cells would need to detect
        </strong>
        . They <strong>then used drawings and text</strong> to illustrate how
        transcription factors recognize and bind specific signals, using
        complementary shapes to represent specificity. They further depicted
        conformational changes upon signal binding and connected these changes
        to downstream signaling and responses.
      </p>
      <p>
        These designs showed how students applied the biological mechanisms
        studied in class to their own ideas,{" "}
        <strong>
          not simply knowing how biological components work but redesigning
          their functions for specific needs.
        </strong>
      </p>
      <p>
        <strong>Activity I DNA Experiment Record Sheet</strong>
      </p>
      <ResourceCard
        eyebrow="Activity I · Verification"
        title="DNA Experiment Record Sheet"
        href={`${mediaRoot}/3-4-activity-1.pdf`}
      />
      <p>
        <strong>Activity II Art Gallery</strong>
      </p>
      <ResourceCard
        eyebrow="Activity II · Art gallery"
        title="Student sensor designs"
        href={`${mediaRoot}/3-4-activity-2.pdf`}
      />
      <h4>3.5 Echo</h4>
      <p>
        <strong>Feedback:</strong>
      </p>
      <p>
        (1) In their post-activity reflections, students described the DNA
        extraction experiment as “fun” and “amazing,” and expressed interest in
        participating in more experiment-based activities. Some also shared that
        seeing the almost untouchable DNA via own effort further sparked their
        curiosity about biological science.
      </p>
      <p>
        (2) During the session, students also actively engaged in all the
        interactive activities we offered.
      </p>
      <p>
        <strong>Reflection:</strong>
      </p>
      <p>
        These observations suggested that those interactions, particularly basic
        science experiments, were well suited to young learners. From{" "}
        <strong>“Lecture + Hands-on”</strong> in our kindergarten activities to{" "}
        <strong>
          Lecture combined with more diverse forms of interaction in primary
          school
        </strong>
        ,{" "}
        <strong>
          we gradually began to identify a broader pattern in our educational
          approach.
        </strong>
      </p>
      <p>
        <strong>Evolution:</strong>
      </p>
      <p>
        We summarized this gradually formed <strong>educational pattern</strong>{" "}
        as <strong>“Lecture + X”</strong> and continued to refine and verify it
        in subsequent activities. Later, in the{" "}
        <strong>“Fermentation Magic Lab”</strong> activity for primary school
        students, we retained the <strong>science experiments</strong> they had
        favored, using gas produced during fermentation to inflate a balloon and
        make otherwise invisible microbial activity directly observable.
      </p>
    </>
  );
}

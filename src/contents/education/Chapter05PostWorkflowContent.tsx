import type { ReactNode } from "react";
import styles from "../education.module.css";
import { mediaRoot } from "./EducationAssets";
import { ResourceCard } from "./EducationMedia";

export function Chapter05PostWorkflowContent({
  actionGallery,
}: {
  actionGallery: ReactNode;
}) {
  return (
    <>
      <h5 id="chapter-05-2-2">5.2.2 Format Design</h5>
      <p>
        Students have learned experimental principles and procedures from
        textbooks but have limited opportunities to conduct them in real
        laboratory.{" "}
        <strong>We therefore incorporated videos from the internet</strong>,
        including PCR and tensile testing to connect theories with real
        experimental practice and show how a scientific idea progresses from
        laboratory operation to product application and performance evaluation.
      </p>
      <h5 id="chapter-05-2-3">
        5.2.3 Verification Aid: Interactive Biological Pitch-Pot Game
      </h5>
      <p>
        To verify whether students had connected existing biological concepts
        with each other, and gained a glimpse of synthetic biology and
        biomanufacturing, we extracted a key design choice directly from our
        project. During the lecture, students learned the cytoplasmic
        non-oxidative pathway and the gene we rationally chose to engineer.
        Based on this, we designed an interactive Pitch-Pot Game.
      </p>
      <p className={styles.tableHint}>
        The full game design is shown below. On narrow screens the rows wrap so
        every element and its biological concept stay visible.
      </p>
      <div
        className={styles.tableScroller}
        role="region"
        aria-label="Biological Pitch-Pot Game design"
        tabIndex={0}
      >
        <table>
          <colgroup>
            <col style={{ width: "10%" }} />
            <col style={{ width: "32%" }} />
            <col style={{ width: "57%" }} />
          </colgroup>
          <thead>
            <tr>
              <th colSpan={2} style={{ textAlign: "center" }}>
                Game Elements
              </th>
              <th style={{ textAlign: "center" }}>
                Corresponding Biological Concepts
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan={2} style={{ textAlign: "center" }}>
                Pots
              </td>
              <td style={{ textAlign: "center" }}>Pot A</td>
              <td style={{ textAlign: "center" }}>
                Mitochondrial Oxidative TCA Pathway
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>Pot B</td>
              <td style={{ textAlign: "center" }}>
                Non-oxidative Pathway for generation Malic acid
              </td>
            </tr>
            <tr>
              <td rowSpan={2} style={{ textAlign: "center" }}>
                Arrows
              </td>
              <td style={{ textAlign: "center" }}>Normal Arrows (5)</td>
              <td style={{ textAlign: "center" }}>
                Carbon Sources: Represents the carbon source that can be used in
                both pathways. (+1 point)
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "center" }}>
                Arrows with red sticker (3)
              </td>
              <td style={{ textAlign: "center" }}>
                Genetic Engineering Tool: Symbolizes the specific capability of{" "}
                <em>PYC</em> gene overexpression
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        This game functioned as a practical engineering simulation. Rather than
        simply recalling biological terms, students had to act as metabolic
        engineers.{" "}
        <strong>
          They needed to strategically apply series of knowledge of carbon
          allocation and pathway choice
        </strong>{" "}
        to direct the engineering tool (the red arrows) into the correct pot
        (pathway) to achieve greater PMA production (+2 points), while avoiding
        the "metabolic burden" penalty (-1 point) caused by misdirected
        overexpression.
      </p>
      <ResourceCard
        eyebrow="Design presentation"
        title="The Microscopic Factory of Adhesives"
        description="Workflow, classroom format, and the biological Pitch-Pot Game."
        href={`${mediaRoot}/5-2-design-presentation.pdf`}
      />
      <h4>5.3 Action</h4>
      {actionGallery}
      <h4>5.4 Verify</h4>
      <p>
        We observed that when students received a red arrow representing a gene
        overexpression tool, they paused to think before making their next
        decision. This behavior suggests that they are actively drawing on and
        connecting their prior knowledge to analyze possible modification
        pathways. More importantly, this deliberate “targeting”{" "}
        <strong>
          vividly demonstrates their understanding of the concept of directional
          modification in synthetic biology.
        </strong>
      </p>
      <h4>5.5 Echo</h4>
      <p>
        <strong>Feedback:</strong>
      </p>
      <p>
        After watching videos,{" "}
        <strong>
          some students expressed interest in trying the experiments shown in
          those themselves
        </strong>
        .
      </p>
      <p>
        <strong>Reflection:</strong>
      </p>
      <p>
        Their responses made us reconsider the role we had given students.
        Rather than simply observing scientific practice, we realized that they
        could actively participate in it through simplified and safe laboratory
        experiments.
      </p>
      <p>
        <strong>Evolution:</strong>
      </p>
      <p>
        We therefore incorporated hands-on procedures, such as pH testing and
        sample spotting, into our later 17-C: The Lab Mystery Escape-room
        Challenge.
      </p>
    </>
  );
}

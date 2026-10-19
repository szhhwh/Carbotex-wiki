import styles from "../education.module.css";
import { ChapterMeta } from "./ChapterMeta";

export function Chapter05PreWorkflowContent() {
  return (
    <>
      <ChapterMeta kind="audience">High School Students</ChapterMeta>
      <ChapterMeta kind="activity">
        The Microscopic Factory of Adhesives
      </ChapterMeta>
      <h4>5.1 Wonder</h4>
      <p>
        <strong>· Why we reached out to high school students?</strong>
      </p>
      <p>
        High school represents a crucial stage where students begin{" "}
        <strong>
          building systematic and interconnected knowledge frameworks
        </strong>{" "}
        in biology. Within this evolving cognitive landscape, synthetic biology
        and biomanufacturing workflow serve as an ideal bridge connecting
        fundamental biological principles with real-world innovation.
      </p>
      <p>
        At the same time, following our project's biomanufacturing workflow, our
        educational journey reached its final stages-
        <strong>downstream processing and final products</strong>, which links
        the laboratory research and potential real-world applications.
      </p>
      <h4>5.2 Explore Objective-driven Design</h4>
      <p>
        <strong>
          Objective: Through this activity, we aimed at enabling students to
          better understand their existing knowledge and leverage it to gain an
          insight into synthetic biology and biomanufacturing.
        </strong>
      </p>
      <h5>
        5.2.1 Content Design: Constructing a loop with emerging existing
        knowledge
      </h5>
      <p className={styles.instruction}>Click to learn more!</p>
    </>
  );
}

import { ChapterMeta } from "./ChapterMeta";
import { InteractionHint } from "./InteractionHint";
import { ObjectiveStatement } from "./ObjectiveStatement";
import { WonderQuestion } from "./WonderQuestion";

export function Chapter05PreWorkflowContent() {
  return (
    <>
      <ChapterMeta kind="audience">High School Students</ChapterMeta>
      <ChapterMeta kind="activity">
        The Microscopic Factory of Adhesives
      </ChapterMeta>
      <h4>5.1 Wonder</h4>
      <WonderQuestion>
        Why did we reach out to high school students?
      </WonderQuestion>
      <p>
        High school represents a crucial stage where students begin{" "}
        <strong>
          building systematic and interconnected knowledge frameworks
        </strong>{" "}
        in biology. Within this evolving cognitive landscape, synthetic biology
        and the biomanufacturing workflow serve as an ideal bridge connecting
        fundamental biological principles with real-world innovation.
      </p>
      <p>
        At the same time, following our project's biomanufacturing workflow, our
        educational journey reached its final stages—downstream processing and
        final products, <strong>which link</strong> laboratory research to
        potential real-world applications.
      </p>
      <h4>5.2 Explore Objective-Driven Design</h4>
      <ObjectiveStatement>
        Objective: This activity aimed to help students better understand their
        existing knowledge and use it to develop insights into synthetic biology
        and biomanufacturing.
      </ObjectiveStatement>
      <h5>
        5.2.1 Content Design: Constructing a loop with emerging existing
        knowledge
      </h5>
      <InteractionHint id="chapter-05-workflow-interaction-hint">
        Click to learn more!
      </InteractionHint>
    </>
  );
}

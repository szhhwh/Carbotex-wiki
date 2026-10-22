import type { ReactNode } from "react";
import { mediaRoot } from "./education-assets.data";
import { ResourceCard } from "./EducationMedia";

export function Chapter04PostCardsContent({
  actionGallery,
}: {
  actionGallery: ReactNode;
}) {
  return (
    <>
      <p>
        By designing the learning experience from the students' perspective, we
        intended to help them understand that it is this microbial activity that
        allows the "Redesign" for a specific need they learned about in the
        previous activities to become true.
      </p>
      <h5>4.2.2 Activity Format Design</h5>
      <p>
        <strong>
          (1) Yeast Fermentation Experiment: Witnessing Biomanufacturing
        </strong>
      </p>
      <p>
        Inspired by students' enthusiasm for hands-on experiments in previous
        activities, we decided to solidify our "Lecture + X" pattern by enabling
        them to witness the process of biomanufacturing firsthand through active
        exploration. Therefore, alongside our theoretical lectures, we
        incorporated a yeast fermentation experiment, transforming the invisible
        cellular activities of microbes into tangible, macroscopic material
        changes they could witness.
      </p>
      <p>
        <strong>
          (2) The Atlas of Chinese Fermented Gastronomy: Extending Exploration
          Beyond the Classroom
        </strong>
      </p>
      <p>
        <strong>
          However, we didn't want their exploration to stop at a single
          experiment
        </strong>
        . Thus, we developed an{" "}
        <strong>
          interactive webpage, “The Atlas of Chinese Fermented Gastronomy.”
        </strong>{" "}
        Instead of passively introducing various fermentation examples in a
        traditional classroom setting,{" "}
        <strong>
          this map hands the initiative of discovery directly over to the
          students.
        </strong>{" "}
        By navigating the map, they can see{" "}
        <strong>
          how these microbial "factories" are deeply woven into the rich,
          real-world context of their everyday lives and traditional culinary
          culture.
        </strong>
      </p>
      <ResourceCard
        eyebrow="Design presentation"
        title="Fermentation Magic Lab"
        description="The activity design, fermentation experiment, and classroom flow."
        href={`${mediaRoot}/4-2-design-presentation.pdf`}
        actionLabel="View our presentation!"
      />
      <h4>4.3 Action</h4>
      {actionGallery}
      <h4>4.4 Verify</h4>
      <p>
        Through students’ classroom interactions and behaviors during the
        experiments, we were able to see how our activities shaped their
        understanding and the way they engaged with the scientific concepts.{" "}
        <strong>
          We found that students have evolved from simply observing the results
          of fermentation to recognizing the process and underlying principles
        </strong>
        . They grasped that this biological conversion is the exact mechanism
        bringing our rational designs into the real world.
      </p>
      <p>
        <strong>
          (1) Verification from interactions: Grasping the Conditions of Yeast
          Fermentation
        </strong>
      </p>
      <p>
        By incorporating interactive questioning during the introduction of the
        experiment, we encouraged students to apply theoretical knowledge to
        practical steps. Questions like{" "}
        <em>"What happens if we use cold water?"</em> and{" "}
        <em>"Is oxygen strictly necessary?"</em> prompted them to connect
        environmental variables with metabolic outcomes.{" "}
        <strong>
          Their accurate responses confirmed a deep, intuitive understanding of
          yeast fermentation conditions.
        </strong>
      </p>
      <p>
        <strong>
          (2) Verification from experiment: Mastering and Validating the
          mechanism of fermentation
        </strong>
      </p>
      <p>
        The students <strong>independently followed the protocols</strong> to
        conduct a controlled experiment, establishing one group with sugar and a
        control group without it. Intriguingly, after observing the lack of
        reaction in the sugar-free group,{" "}
        <strong>
          some students spontaneously added sugar back into the mixture to
          observe the subsequent changes.
        </strong>{" "}
        This revealed that alongside understanding the mechanics of
        fermentation, they actively adjusted conditions beyond our preset
        procedures to test and verify the scientific concepts we had delivered.
      </p>
      <h4>4.5 Echo</h4>
      <p>
        <strong>Feedback:</strong>
      </p>
      <p>
        After the control experiment, some students spontaneously added sugar
        back to the sugar-free group and continued observing what would happen.
        This unplanned “add-back” experiment indicates that students were
        considering manipulating experimental conditions and testing their newly
        acquired understanding <strong>through further observation.</strong>
      </p>
      <p>
        <strong>Reflection:</strong>
      </p>
      <p>
        This led us to ponder:{" "}
        <em>
          “If students were already beginning to modify one condition on their
          own, what else might they explore if they were given the freedom to
          manipulate more variables involved in fermentation?”
        </em>
      </p>
      <p>
        <strong>Evolution:</strong>
      </p>
      <p>
        In response, we developed a{" "}
        <strong>virtual fermentation laboratory</strong> that extends the
        student-initiated exploration we observed in the physical classroom into
        a broader experimental space. Students can change multiple variables,
        including{" "}
        <strong>
          sugar concentration, yeast amount, temperature, reaction time, oxygen
          conditions, and pH
        </strong>{" "}
        at the same time and explore how different conditions affect the
        fermentation process.
      </p>
      <ResourceCard
        eyebrow="Interactive extension"
        title="The Atlas of Chinese Fermented Gastronomy"
        description="Explore fermented foods across China in the interactive fermentation map."
        href="/ouc-haide/education?activity=fermentation"
      />
    </>
  );
}

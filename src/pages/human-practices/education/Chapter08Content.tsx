import { Figure } from "../../../components/media/Figure";
import styles from "../education.module.css";
import { ChapterMeta } from "./ChapterMeta";
import {
  chapter08Figure15Composite,
  chapter08Figure16Composite,
} from "./education-figures.data";

export function Chapter08Content() {
  return (
    <>
      <ChapterMeta emphasizeValue kind="audience">
        The General Public
      </ChapterMeta>
      <p>
        For the general public, synthetic biology often feels distant,
        impenetrable, or surrounded by misconceptions about genetic modification
        and bio-industrial processes. Without everyday channels to explore these
        technologies, people rarely have the chance to genuinely understand
        them. We recognized that dispelling misunderstandings requires meeting
        people where they are.
      </p>
      <h4>Social Media: Extending Science Communication Beyond Events</h4>
      <Figure
        {...chapter08Figure15Composite}
        caption="Examples of the content we shared on social media."
        captionPrefix="Figure 15."
        className={styles.compositeFigure}
      />
      <p>
        To expand our outreach beyond physical venues, we leveraged our{" "}
        <strong>WeChat Official Account</strong> as a{" "}
        <strong>primary online outreach hub</strong>, integrating our science
        communication into people’s daily online experiences. This online
        channel broke <strong>geographic barriers and time constraints</strong>,
        providing an accessible gateway for remote audiences while{" "}
        <strong>
          ensuring educational resources remained permanently available for
          on-demand learning and sharing
        </strong>
        .
      </p>
      <p>
        To date, we have published <strong>8 posts</strong>, covering an{" "}
        <strong>introduction to our project</strong>,{" "}
        <strong>accessible explanations of synthetic biology</strong> for the
        general public, and{" "}
        <strong>updates on our team's practical investigations</strong> and{" "}
        <strong>educational outreach activities</strong>. We also launched a
        dedicated <strong>“Joint Journey” column</strong> to share our
        collaborations with other iGEM teams, highlighting how different teams
        connect and learn from one another. At the same time, we enriched our
        posts with <strong>illustrations</strong>,{" "}
        <strong>activity photos</strong>, and{" "}
        <strong>links to interactive educational resources</strong>,
        transforming complex scientific content into a visually engaging and
        accessible experience.
      </p>
      <p>
        Our commitment to this platform{" "}
        <strong>extends beyond the competition season,</strong> and we will
        continue to publish accessible science communication to{" "}
        <strong>ensure a lasting educational impact</strong>.
      </p>
      <h4>Project Merchandise: Making Scientific Concepts Visible</h4>
      <Figure
        {...chapter08Figure16Composite}
        caption={
          <>
            Merchandise designed around our project's visual identity.{" "}
            <strong>(A)</strong> Cartoon illustrations of the fermentation
            vessels used in our project. <strong>(B)</strong> Team logo.{" "}
            <strong>(C)</strong> Original cartoon characters built from project
            elements, including our team mascot. <strong>(D)</strong> These
            designs were made into acrylic badges and keychains.
          </>
        }
        captionPrefix="Figure 16."
        className={styles.compositeFigure}
      />
      <p>
        To bridge the gap between abstract biotechnology and tangible
        experience, we translated our core biomanufacturing themes into a visual
        language, featuring <strong>fermentation vessels</strong>,{" "}
        <strong>biomass-inspired motifs</strong>, and friendly{" "}
        <strong>cartoon IPs</strong>. We brought these visual elements to life
        as <strong>practical artifacts</strong>, creating a{" "}
        <strong>team badge</strong> and a{" "}
        <strong>custom-shaped acrylic “shaker” keychain</strong>.
      </p>
      <p>
        The team badge highlights our official logo and IP mascot, serving as an
        easily recognizable team insignia for daily wear and peer recognition.
        In addition, the shaker keychain models an industrial fermentation tank,
        featuring external pipework, support structures, and an enclosed
        chamber. Inside the chamber, pieces, including our strain mascot,
        micro-illustrations, and project emblems, move and collide freely when
        shaken.{" "}
        <strong>
          This interaction playfully mimics the dynamic environment within a
          bioreactor, illustrating the mixing of microorganisms and nutrient
          feedstocks during fermentation.
        </strong>
      </p>
      <p>
        In our public outreach, this tactile merchandise transformed science
        communication from passive listening into active curiosity. The playful
        mascot and movable shaker immediately caught the public's attention,
        prompting people of all ages to ask what the tank represented and how it
        worked. By turning industrial fermentation into an approachable handheld
        object, we created an inviting entry point to explain our project
        without relying on complex jargon.
      </p>
    </>
  );
}

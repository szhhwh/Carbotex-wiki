import styles from "../education.module.css";
import { Collapse } from "../../components/ui/Collapse";
import { ChapterMeta } from "./ChapterMeta";
import { media, mediaRoot } from "./EducationAssets";
import { ChapterGallery, ResourceCard, ResourceGrid } from "./EducationMedia";
import { sdgsWorkshopGuide } from "./EducationFigures";
import { ObjectiveStatement } from "./ObjectiveStatement";
import { WonderQuestion } from "./WonderQuestion";

const detailsActionLabel = {
  closed: "Show details",
  open: "Hide details",
};

export function Chapter06SdgsContent() {
  return (
    <>
      <h4 id="chapter-06-4">6.4 Activity III: SDGs-based workshop</h4>
      <ChapterMeta kind="audience">
        Undergraduate biotechnology students and Haide iGEMers
      </ChapterMeta>
      <WonderQuestion>Why we reached out to our peers?</WonderQuestion>
      <p>
        Specifically, for our peers majoring in biotechnology, the future
        drivers of scientific research, the need for{" "}
        <strong>learning responsible innovation</strong> is even more pressing.{" "}
        <strong>
          Most undergraduate training focuses heavily on technical mastery
          inside the lab, yet rarely prompts students to ask: What is the
          ultimate purpose of research? And who does it truly serve?
        </strong>{" "}
        Therefore, we aimed to bridge the gap between laboratory innovation and
        real-world impact{" "}
        <strong>with a structured workshop based on SDGs</strong>, where our
        peers were{" "}
        <strong>
          guided to identify real-world problems and ultimately develop feasible
          solutions using biotechnology-related approaches.
        </strong>
      </p>
      <WonderQuestion>Why we also joined the workshop?</WonderQuestion>
      <p>
        <strong>
          As Haide iGEMers and future researchers ourselves, we also joined the
          workshop as learners.
        </strong>{" "}
        We recognized that the responsibility to consider societal needs,
        potential impacts, and practical feasibility applies equally to our own
        research. By exploring these questions alongside our peers, we hoped to{" "}
        <strong>
          develop the same responsible, evidence-based decision-making mindset
          that we sought to foster in others
        </strong>
        .
      </p>
      <h5>6.4.1 Explore Objective-Driven Design</h5>
      <ObjectiveStatement>
        <strong>Objective</strong>: Our goal was to engage both our peers and us
        as future scientists in reflecting on the intersection of biology and
        social responsibility in addressing real-world societal needs. Through
        the workshop focused on the Sustainable Development Goals (SDGs), we
        aimed to enhance our ability to conduct evidence-based analysis,
        critically evaluate information, and make responsible decisions. By
        doing so, we seek to propose viable biotechnology innovations that
        contribute positively to sustainable development and social well-being.
      </ObjectiveStatement>
      <p>
        <strong>
          How did we integrate social responsibility throughout the whole
          workshop?
        </strong>
      </p>
      <p>
        Our workshop was designed around the framework of{" "}
        <strong>
          “starting from concrete real-world problems to explore feasible and
          socially responsible biotechnological intervention strategies.”
        </strong>{" "}
        We structured the process into{" "}
        <strong>three interlocking stages</strong> that follow an “
        <strong>identification–analysis–evaluation</strong>” logic, ensuring
        that social responsibility was embedded at every step.
      </p>
      <h6>Identification: Starting from social needs</h6>
      <p>
        We designed the workshop to begin with an{" "}
        <strong>introductory session</strong> led by an{" "}
        <strong>
          <a href="/ouc-haide/human-practices#ihp-eva">
            <u>invited educator</u>
          </a>
        </strong>
        , who helped participants understand the SDGs and their relevance to
        socially responsible innovation. Building on this foundation,
        participants identified specific social needs and challenges based on
        the detailed SDG targets.
      </p>
      <h6>Analysis: Mapping causal relationships and developing a solution</h6>
      <p>
        We structured this stage around <strong>problem trees</strong> and{" "}
        <strong>solution trees</strong>, guiding participants to systematically
        unpack causal relationships. By integrating{" "}
        <strong>evidence from the literature</strong>, they were led to identify
        key nodes in the causal chains where biology could effectively
        contribute and to develop corresponding technical solutions.
      </p>
      <h6>Evaluation: Assessing feasibility and social responsibility</h6>
      <p>
        In the last phase, <strong>an evaluation process</strong> was required
        in which participants assessed the promising solutions and then{" "}
        <strong>presented their proposals and their values</strong> in a{" "}
        <strong>mock proposal session</strong>, using posters as visual aids to
        communicate <strong>their objectives</strong>,{" "}
        <strong>proposed actions,</strong>{" "}
        <strong>implementation timelines</strong>,{" "}
        <strong>stakeholder roles</strong>, <strong>cost allocation</strong>,
        and <strong>methods for quantitatively evaluating success.</strong>
      </p>
      <ResourceGrid>
        <ResourceCard
          description="Facilitator guidance for running the three-stage identification–analysis–evaluation workshop."
          eyebrow="Facilitator guidance · PDF"
          href={sdgsWorkshopGuide}
          title="SDGs-Based Workshop Guide"
        />
      </ResourceGrid>
      <h5>6.4.2 Action</h5>
      <ChapterGallery
        images={[
          media(
            "chapter-06-sdgs-action-1",
            "6-4-2-action-01.avif",
            "Students collaborating during the SDGs-based workshop",
          ),
          media(
            "chapter-06-sdgs-action-2",
            "6-4-2-action-02.avif",
            "Students presenting their workshop ideas",
          ),
          media(
            "chapter-06-sdgs-action-3",
            "6-4-2-action-03.avif",
            "SDGs-based workshop poster presentations",
          ),
        ]}
        label="Chapter 06 SDGs workshop photographs"
      />
      <h5>6.4.3 Verify</h5>
      <p>
        <strong>(1) Verification I: Interviewing our peers</strong>
      </p>
      <p>
        To understand what our peers learned from the SDGs-based workshop we
        designed, we collected their feedback. Their feedback suggested that our
        workshop encouraged peers to approach <strong>biotechnology</strong>{" "}
        through a more needs-driven, analytical, and{" "}
        <strong>socially responsible perspective</strong>.
      </p>
      <Collapse
        actionLabel={detailsActionLabel}
        className={styles.inlineCollapse}
        header="Read our peers' feedback"
        headerAs="h6"
        variant="card"
      >
        <p>
          "I used to think about what biotechnology could do first and then look
          for problems it might solve. But this workshop made me realize that{" "}
          <strong>we should start by asking what people actually need</strong>,
          rather than assuming every problem needs a biotechnological solution."
          ——Dalinda
        </p>
        <p>
          "The <strong>problem tree</strong> was really helpful. At first, I
          thought we had already identified the problem, but as we broke it
          down, I realized there were several underlying causes.{" "}
          <strong>
            It made me think more carefully about where biotechnology could
            actually make a difference
          </strong>
          ." ——Coco
        </p>
        <p>
          "When we started considering the{" "}
          <strong>costs, stakeholders, and implementation timeline</strong>, I
          found that having a promising scientific idea isn't enough. We also
          need to think about whether people can{" "}
          <strong>realistically use it</strong> and{" "}
          <strong>how we know if it actually works</strong>." ——Effie
        </p>
      </Collapse>
      <p>
        <strong>(2) Verification II: Sharing from our members</strong>
      </p>
      <p>
        After the SDGs-based workshop,{" "}
        <strong>
          Haide iGEMers came together for a reflection session to share
        </strong>{" "}
        what we had learned and how our perspectives on technological innovation
        and social responsibility had evolved.
      </p>
      <Collapse
        actionLabel={detailsActionLabel}
        className={styles.inlineCollapse}
        header="Read our members' reflections"
        headerAs="h6"
        variant="card"
      >
        <p>
          "In the lab, I often focus on whether an experiment works or how to
          improve it, but the workshop made me realize I seldom consider why we
          develop certain technologies and who benefits. Moving forward, I want
          to prioritize these questions in my research." ——Yiming Wang, wet lab
          member
        </p>
        <p>
          "
          <strong>
            We talk to a lot of stakeholders in iHP, but this workshop made me
            think more about what happens after those conversations
          </strong>
          . Are we really using what people tell us to shape our project, or are
          we just collecting feedback? I think that's something we need to keep
          asking ourselves."
        </p>
        <p>——Zhibo Yang, iHP member</p>
      </Collapse>
      <p>
        <strong>(3) Verification III: Poster Output</strong>
      </p>
      <h6>Art Gallery</h6>
      <ResourceCard
        eyebrow="Verification III · Poster output"
        title="SDGs-based workshop poster gallery"
        href={`${mediaRoot}/6-4-3-art-gallery.pdf`}
      />
      <h4>6.5 Echo</h4>
      <p>
        <strong>Feedback:</strong> Across our three activities, we observed{" "}
        <strong>meaningful learning outcomes</strong> among different age
        groups. Primary school students began recognizing the social value of
        technology, high school students learned to consider potential risks and
        make responsible choices, while our peers and team members reflected on
        responsible innovation and decision-making as future scientists.
      </p>
      <p>
        <strong>Reflection:</strong> These outcomes also reminded us that{" "}
        <strong>
          social responsibility cannot be fully developed through a single
          educational activity or at a particular stage of life
        </strong>
        .
      </p>
      <p>
        <strong>Evolution:</strong> Thus, we developed{" "}
        <strong>The Commons</strong>,{" "}
        <strong>
          an online strategy game inspired by the{" "}
          <em>tragedy of the commons</em>
        </strong>
        . Players take on different roles and make decisions between economic
        growth and environmental protection, experiencing how individual choices
        affect shared resources and collective well-being. Through this game, we
        hope to encourage learners to{" "}
        <strong>
          continually reflect on the balance between development,
          sustainability, and social responsibility
        </strong>
        .
      </p>
      <ResourceGrid>
        <ResourceCard
          eyebrow="Game resource"
          title="The Commons · Rulebook"
          href={`${mediaRoot}/6-5-rulebook.pdf`}
        />
        <ResourceCard
          eyebrow="Interactive activity"
          title="The Commons · Online strategy game"
          description="Play the embedded round-based game about shared resources and collective decisions."
          href="/ouc-haide/education?activity=esg"
        />
      </ResourceGrid>
    </>
  );
}

import type { ReactNode } from "react";
import styles from "../education.module.css";
import { Figure } from "../../components/media/Figure";
import { ChapterMeta } from "./ChapterMeta";
import { media, mediaRoot } from "./EducationAssets";
import {
  ChapterGallery,
  ResourceLibrary,
  type EducationResourceGroup,
} from "./EducationMedia";
import { ObjectiveStatement } from "./ObjectiveStatement";
import { ProseList } from "./ProseList";
import { WonderQuestion } from "./WonderQuestion";
import {
  chapter01Figure2Composite,
  chapter01Figure3Composite,
  chapter01Figure4Composite,
} from "./EducationFigures";

const chapter01ResourceGroups = [
  {
    id: "presentations",
    title: "Presentations",
    resources: [
      {
        id: "slides-children",
        title: "Synthetic Biology Outreach Slides",
        audiences: [{ id: "children", label: "Children" }],
        href: `${mediaRoot}/synthetic-biology-outreach-slides-kindergarten.pdf`,
      },
      {
        id: "slides-high-school",
        title: "Synthetic Biology Outreach Slides",
        audiences: [
          {
            id: "high-school-students",
            label: "High school students",
            filterLabel: "High school",
          },
        ],
        href: `${mediaRoot}/synthetic-biology-outreach-slides-high-school.pdf`,
      },
      {
        id: "slides-older-adults",
        title: "Synthetic Biology Outreach Slides",
        audiences: [{ id: "older-adults", label: "Older adults" }],
        href: `${mediaRoot}/synthetic-biology-outreach-slides-older-adults.pdf`,
      },
    ],
  },
  {
    id: "verification-aids",
    title: "Verification Aids",
    resources: [
      {
        id: "evaluation-questionnaire",
        title: "Evaluation Questionnaire",
        audiences: [
          {
            id: "high-school-students",
            label: "High school students",
            filterLabel: "High school",
          },
          { id: "other-cohorts", label: "Other cohorts" },
        ],
        href: `${mediaRoot}/science-outreach-evaluation-questionnaire.pdf`,
      },
      {
        id: "summary-table-chinese",
        title: "Questionnaire Summary Table",
        description: "Chinese version",
        audiences: [
          { id: "speakers-team-members", label: "Speakers & team members" },
        ],
        href: `${mediaRoot}/questionnaire-summary-table-chinese.pdf`,
      },
      {
        id: "summary-table-english",
        title: "Questionnaire Summary Table",
        description: "English version",
        audiences: [
          { id: "speakers-team-members", label: "Speakers & team members" },
        ],
        href: `${mediaRoot}/questionnaire-summary-table-english.pdf`,
      },
      {
        id: "oral-feedback-questions",
        title: "Child-Friendly Oral Feedback Questions",
        audiences: [{ id: "children", label: "Children" }],
        href: `${mediaRoot}/child-friendly-oral-feedback-questions.pdf`,
      },
    ],
  },
] satisfies EducationResourceGroup[];

function EchoCard({
  number,
  feedback,
  reflection,
  evolution,
}: {
  number: string;
  feedback: ReactNode;
  reflection: ReactNode;
  evolution: ReactNode;
}) {
  return (
    <article className={styles.echoCard} aria-label={`Echo ${number}`}>
      <span className={styles.echoCardNumber} aria-hidden="true">
        {number}
      </span>
      <div className={styles.echoCardBody}>
        <div className={styles.echoCardSection}>
          <p className={styles.echoCardLabel}>
            <strong>Feedback {number}:</strong>
          </p>
          <p>{feedback}</p>
        </div>
        <div className={styles.echoCardSection}>
          <p className={styles.echoCardLabel}>
            <strong>Reflection {number}:</strong>
          </p>
          <p>{reflection}</p>
        </div>
        <div className={styles.echoCardSection}>
          <p className={styles.echoCardLabel}>
            <strong>Evolution {number}:</strong>
          </p>
          <p>{evolution}</p>
        </div>
      </div>
    </article>
  );
}

export function Chapter01Content() {
  return (
    <>
      <ChapterMeta kind="audience">The Public</ChapterMeta>
      <ChapterMeta kind="activity">
        The Science Outreach Campaign—“Decoding Genes, Empowering via Synbio”
      </ChapterMeta>
      <h4>1.1 Wonder</h4>
      <WonderQuestion>Why does this activity matter?</WonderQuestion>
      <p>
        This year, our project focuses on converting agricultural waste into
        high-value resources through synthetic biology. We view{" "}
        <strong>synthetic biology</strong> as more than a technique; it provides
        the scientific framework for our entire endeavor. Its core principles
        involve understanding and engineering fundamental building blocks, such
        as genes, enzymes, and cells, to achieve complex biological functions.
      </p>
      <p>
        However, <strong>we encountered a practical challenge</strong>: for most
        of the general public, "synthetic biology" remains an unfamiliar
        concept. Introducing our complex technical roadmap without first
        providing context would likely confuse the audience, as they lack the
        foundational knowledge needed to understand the connections among the
        project's various modules.{" "}
        <strong>
          To address this gap, we launched this campaign as an essential first
          step before presenting our specific wet-lab design
        </strong>
        . By explaining the core principles and real-world applications of
        synthetic biology, we hoped to establish a foundation for the tailored
        educational initiatives that followed.
      </p>
      <h4>1.2 Explore Objective-Driven Design</h4>
      <ObjectiveStatement as="h5">
        <strong>Objective</strong> I: Making Synthetic Biology Accessible Across
        Diverse Age Groups
      </ObjectiveStatement>
      <p>
        To achieve this goal, we recognized that an effective science outreach
        activity requires more than a one-size-fits-all curriculum. While a
        basic introduction to the iGEM competition is accessible to a broad
        audience, synthetic biology involves a range of specialized concepts and
        technical content. A standardized presentation format may impede
        understanding for audiences with different backgrounds. We therefore
        adapted our content and interaction section along three dimensions to
        meet the distinct needs of different audiences.
      </p>
      <h6>(1) Adaptation of Visual Language</h6>
      <ProseList>
        <li>
          <p>
            <strong>For Young Children:</strong> Considering that young children
            have{" "}
            <strong>
              limited reading abilities and process information more easily
              through brightly colored images
            </strong>
            , we designed a vibrant "underwater playground" in our presentation
            featuring bright marine backgrounds, adorable big-eyed "gene
            monsters," and a smiling DNA strand.
          </p>
        </li>
        <li>
          <p>
            <strong>For elderly people:</strong> Interactions with our elderly
            family members revealed that{" "}
            <strong>
              what discourages them from receiving new information through
              reading is the visual fatigue caused by small fonts, rather than a
              lack of curiosity
            </strong>
            . Thus, we substantially <strong>enlarged key text</strong> across
            our slides and <strong>added related illustrations</strong> to
            ensure effortless comprehension.
          </p>
        </li>
      </ProseList>
      <h6>(2) Adaptation of Concept Translation</h6>
      <ProseList>
        <li>
          <p>
            <strong>For High School Students:</strong> Although high school
            students already possess a foundational knowledge of biology, they
            remain unfamiliar with synthetic biology. Therefore, in our
            activity, on the one hand, we{" "}
            <strong>
              retained biological terminology such as 'cells' and 'gene editing'
            </strong>
            ; on the other hand, to make the unfamiliar engineering mindset of
            synthetic biology accessible for them, we{" "}
            <strong>
              introduced vivid analogies like 'bio-programming' and 'Lego-brick
              assembly' to explain the DBTL (Design-Build-Test-Learn) cycle
            </strong>
            .
          </p>
        </li>
        <li>
          <p>
            <strong>For Young Children:</strong> Tailored to kindergarten
            children who are still at an early developmental stage, our outreach
            employed <strong>fairytale narratives and personification</strong>.{" "}
            <strong>We creatively framed</strong> 'gene editing' as{" "}
            <strong>biologists using a 'magic wand' to work wonders</strong>,
            while representing traits like 'yield enhancement and pest
            resistance' simply as plants <strong>'growing stronger.'</strong>
          </p>
        </li>
        <li>
          <p>
            <strong>For elderly people:</strong> Elders possess rich life
            experience. Therefore, to vividly illustrate the DBTL engineering
            framework of synthetic biology, we introduced the down-to-earth
            analogy of <strong>'developing recipes and home cooking'</strong>:
            from <strong>'deciding on the target dish' (Design)</strong>, to{" "}
            <strong>
              'gathering ingredients (genes), controlling the heat (culture
              conditions)
            </strong>
            , and <strong>setting up the stove (chassis cells)'</strong> (
            <strong>Build</strong>), through to{" "}
            <strong>'tasting the flavor and refining the recipe'</strong> (
            <strong>Test–Learn</strong>). This relatable culinary metaphor
            effectively transformed abstract engineering concepts into
            understandable knowledge.
          </p>
        </li>
      </ProseList>
      <h6>(3) Adaptation of Content: Special information for Older Adults</h6>
      <p>
        Nowadays, seniors are frequently misled by pseudo-scientific wellness
        advice on short-video platforms and social media. Aiming to help the
        elderly discover biological truths, we introduced the 'Bio-MythBusters'
        section. In debunking the pervasive dogma surrounding the{" "}
        <strong>'inherent toxicity of GM food,'</strong> we conveyed the
        established science: the engineered gene in consumed food is fully
        hydrolyzed into safe elements during digestion,{" "}
        <strong>
          precluding any possibility of modifying the human genome
        </strong>
        .
      </p>
      <ObjectiveStatement as="h5">
        <strong>Objective</strong> II: Evaluating Lecture Format Efficacy Across
        Generations
      </ObjectiveStatement>
      <p>
        As the first step in our science outreach efforts, we chose in-person
        lectures as the format for our inaugural activity. We chose this format
        because it is adaptable, accessible, and easy to implement, requiring no
        specialized venues or equipment. To guide iteration of our future
        educational activities, we aimed to quantitatively evaluate the efficacy
        and universality of this format across diverse age cohorts.
      </p>
      <p>
        <strong>For high school students and older adults</strong>, we
        administered <strong>questionnaires</strong> to assess changes in their
        understanding of synthetic biology before and after the activity, their
        perspectives on using synthetic biology to modify straw, and their
        suggestions for improving future educational activities.{" "}
        <strong>For children</strong>, who may have had difficulty completing a
        written questionnaire, we used{" "}
        <strong>age-appropriate oral questions</strong> to assess their basic
        understanding of the concepts introduced and to gather immediate
        feedback on their engagement and responses.
      </p>
      <h5>Resource Library</h5>
      <ResourceLibrary groups={chapter01ResourceGroups} />
      <h4>1.3 Action</h4>
      <p>
        We empowered <strong>171</strong> students from{" "}
        <strong>
          life sciences, STEM, humanities, social sciences, and management
        </strong>{" "}
        to become science communicators. As <strong>58.5%</strong> of the
        volunteers lacked a background in biology, we hosted a{" "}
        <strong>targeted training session</strong> to help them translate
        complex biological jargon into audience-friendly language, ensuring
        highly impactful science communication. Subsequently, our members and
        volunteer presenters traveled to various provinces across China to
        conduct educational outreach, either individually or in teams.
      </p>
      <Figure
        {...chapter01Figure2Composite}
        caption="Training and Academic Backgrounds of Volunteer Science Communicators: (A) Pre-outreach training sessions preparing speakers for the science outreach campaign; (B) Academic background distribution of the 171 volunteer speakers."
        captionPrefix="Figure 2."
        className={styles.compositeFigure}
      />
      <ChapterGallery
        images={[
          media(
            "chapter-01-outreach-01",
            "1-3-action-01.avif",
            "Volunteer speakers delivering a science outreach session",
          ),
          media(
            "chapter-01-outreach-02",
            "1-3-action-02.avif",
            "Students participating in a science outreach session",
          ),
          media(
            "chapter-01-outreach-03",
            "1-3-action-03.avif",
            "A volunteer explaining a synthetic biology concept",
          ),
          media(
            "chapter-01-outreach-04",
            "1-3-action-04.avif",
            "An outreach presentation in a classroom",
          ),
          media(
            "chapter-01-outreach-05",
            "1-3-action-05.avif",
            "Volunteers facilitating a public science activity",
          ),
          media(
            "chapter-01-outreach-06",
            "1-3-action-06.avif",
            "Participants engaging with the science outreach activity",
          ),
        ]}
        label="Chapter 01 science outreach photographs"
      />
      <h4>1.4 Verify</h4>
      <h5>1.4.1 Verified Reach and Inclusivity</h5>
      <Figure
        {...chapter01Figure3Composite}
        caption={
          <>
            <strong>
              Geographic Reach and Audience Demographics of Our Science
              Outreach:
            </strong>{" "}
            (A) Geographic coverage of our outreach activities across China; (B)
            Age distribution of the audience; (C) Occupational composition of
            the audience; (D) Gender distribution of the audience.
          </>
        }
        captionPrefix="Figure 3."
        className={styles.compositeFigure}
        maxWidth="46rem"
      />
      <p>
        Like dandelion seeds, our speakers spread across <strong>22</strong>{" "}
        provinces in China, successfully engaging <strong>4,926</strong>{" "}
        individuals (based on valid surveys). By analyzing our valid survey
        data, we achieved key milestones in inclusivity and education:
      </p>
      <p>
        (1) <strong>Empowering the Next Generation</strong>: Students made up{" "}
        <strong>93.8%</strong> of our audience, with <strong>75.5%</strong>{" "}
        under the age of 18, demonstrating our strong impact on youth STEM
        enlightenment.
      </p>
      <p>
        (2) <strong>Broad Social Inclusivity</strong>: Our audience broke age
        and occupational barriers, reaching{" "}
        <strong>community residents (4.5%)</strong> and encompassing demographic
        groups up to <strong>seniors over 60</strong>.
      </p>
      <p>
        (3) <strong>Championing Gender Equality</strong>: A highly balanced
        gender distribution <strong>(54.1% male, 46.0% female)</strong>{" "}
        underscores our dedication to equal-opportunity science education.
      </p>
      <h5>1.4.2 Verified Educational Impact</h5>
      <Figure
        {...chapter01Figure4Composite}
        caption={
          <>
            <strong>
              Survey-Based Evaluation of Our Science Outreach Outcomes:
            </strong>{" "}
            (A) Audience understanding of synthetic biology before the lecture
            and self-reported improvement afterward; (B) Audience-reported
            learning outcomes across different aspects of synthetic biology; (C)
            Audience perceptions of the contributions of synthetic biology to
            society.
          </>
        }
        captionPrefix="Figure 4."
        className={styles.compositeFigure}
      />
      <p>
        Quantitative analysis of the validated surveys demonstrates that our
        science communication initiative delivered measurable, high-impact
        outcomes across core areas:
      </p>
      <ol className={styles.numberedFindings}>
        <li>
          <p>
            <strong>
              From Unfamiliarity to Initial Understanding: Enhanced Awareness of
              Synthetic Biology
            </strong>
          </p>
          <p>
            This outreach played a positive role in{" "}
            <strong>
              helping the audience establish foundational concepts and lowering
              the barrier to understanding synthetic biology.
            </strong>
          </p>
        </li>
        <li>
          <p>
            <strong>
              From a Single Perspective to a Multifaceted Understanding:
              Broadening Knowledge of Synthetic Biology
            </strong>
          </p>
          <p>
            The results indicate that our outreach activities supported public
            understanding of synthetic biology across multiple dimensions.
            Participants reported a better understanding of its application
            prospects (85.9%), technical features (78.5%), and core concepts
            (78.4%), while 70.5% also learned about the basic operation and
            scientific spirit of the iGEM competition.
          </p>
        </li>
        <li>
          <p>
            <strong>
              From Acceptance to Value Recognition: Deepening Appreciation of
              the Social Significance of Synthetic Biology
            </strong>
          </p>
          <p>
            The dissemination of knowledge was further translated into positive
            public recognition of the social value of synthetic biology. Our
            presentation content and communication format effectively connected
            knowledge delivery, value guidance, and audience experience.
          </p>
        </li>
      </ol>
      <h4>1.5 Echo</h4>
      <p>
        This activity was a <strong>two-way</strong> <strong>dialogue.</strong>{" "}
        Through <strong>participants' feedback</strong>,{" "}
        <strong>observations of classroom interactions</strong>, and{" "}
        <strong>conversations with educators</strong>,{" "}
        <strong>we also learned from our audiences</strong>.
      </p>
      <h5>1.5.1 Echo 01 - Feedback reshaping how we taught</h5>
      <div className={styles.echoCardGrid}>
        <EchoCard
          number="I"
          feedback={
            <>
              Although we incorporated many everyday analogies and adapted the
              content to different cohorts,{" "}
              <strong>
                participants reported that they still faced difficulties in
                understanding the large volume of synthetic biology knowledge
              </strong>
              .
            </>
          }
          reflection={
            <>
              Science communication should extend beyond simplifying language
              and actively create more engaging and effective learning
              experiences for its audience.
            </>
          }
          evolution={
            <>
              In the subsequent{" "}
              <a className={styles.evolutionLink} href="#chapter-06-3-1">
                <em>
                  <strong>17-C: The Lab Mystery</strong>
                </em>{" "}
                <strong>Escape-room Challenge</strong>
              </a>
              , we made targeted improvements in this area. We distributed
              visual <strong>“Concept Cheat-Cards”</strong> before the session
              that summarized the key information participants would need,
              helping them establish a basic understanding of the core concepts
              in advance and actively apply their knowledge while solving
              puzzles, creating a more coherent and immersive learning
              experience.
            </>
          }
        />
        <EchoCard
          number="II"
          feedback={
            <>
              We found that{" "}
              <strong>
                interaction was largely limited to one-way, speaker-led lectures
                and Q&amp;A sessions
              </strong>
              , which may reduce participants' attention, engagement, and
              learning effectiveness over time. Similarly,{" "}
              <strong>during activities at welfare homes</strong>, some children
              experienced cognitive or comprehension difficulties.{" "}
              <strong>
                Discussions with educators of welfare homes also suggested that
                children, especially younger audiences, may struggle with
                extended oral lectures.
              </strong>
            </>
          }
          reflection="We realized that a purely lecture-based format has clear limitations for diverse audiences."
          evolution={
            <>
              To address these limitations, we initially paired a short lecture
              with{" "}
              <a className={styles.evolutionLink} href="#chapter-02-2">
                hands-on clay modeling
              </a>
              , allowing children to engage with cellular concepts through both
              explanation and creation.
            </>
          }
        />
        <EchoCard
          number="III"
          feedback={
            <>
              Existing outreach content primarily focused on theoretical
              knowledge of synthetic biology{" "}
              <strong>
                without the integration of actual research experiences and
                experimental processes.
              </strong>{" "}
              We observed that audiences might find it difficult to understand
              how such knowledge is applied in real-world research.
            </>
          }
          reflection={
            <>
              We realized that effective science communication should not only
              convey technical knowledge but also{" "}
              <strong>draw on speakers' firsthand research experiences</strong>,
              making the content more authentic, concrete, and engaging.
            </>
          }
          evolution={
            <>
              In the subsequent outreach for{" "}
              <a className={styles.evolutionLink} href="#chapter-05-2-2">
                <em>
                  <strong>“The Microscopic Factory of Adhesives,”</strong>
                </em>
              </a>{" "}
              we integrated videos and images from our team's hands-on
              laboratory work.{" "}
              <strong>
                We walked audiences through our experimental design, operational
                procedures, and the specific challenges we encountered alongside
                their solutions.
              </strong>
            </>
          }
        />
      </div>
      <h5>1.5.2 Echo 02-Curiosity guiding our next step</h5>
      <p>
        <strong>Feedback</strong>: In response to “
        <strong>what suggestions do you have for us</strong>?” some participants
        expressed an interest in{" "}
        <strong>
          learning more about the technical principles behind synthetic biology
        </strong>
        .
      </p>
      <p>
        Reflection &amp; Evolution: This key piece of feedback inspired the next
        stage of our educational activities.{" "}
        <strong>
          Starting from the technologies involved in our own project,
        </strong>{" "}
        we aimed to systematically deconstruct the{" "}
        <strong>
          underlying knowledge into different levels of complexity and tailor
          each level to the knowledge backgrounds of different audiences
        </strong>
        , thereby making our science communication more targeted and accessible.
      </p>
    </>
  );
}

import styles from "../education.module.css";
import { Cite } from "../../components/article/References";
import { ChapterMeta } from "./ChapterMeta";
import { media, mediaRoot } from "./EducationAssets";
import { ChapterGallery, ResourceCard } from "./EducationMedia";
import { cellTownStorybook, chapter02ActivityTwo } from "./EducationFigures";
import { ObjectiveStatement } from "./ObjectiveStatement";
import { WonderQuestion } from "./WonderQuestion";

export function Chapter02Content() {
  return (
    <>
      <ChapterMeta kind="audience">Kindergarten Children</ChapterMeta>
      <h4>2.1 Wonder</h4>
      <WonderQuestion>
        Why did we focus on unlocking cellular systems?
      </WonderQuestion>
      <p>
        <strong>
          To clearly explain the core technical principles to the public
        </strong>
        , we started from our wet-lab experiments. In our project, poly (malic
        acid) (PMLA) serves as a crucial bridge connecting "agricultural waste
        upcycling" with "subsequent material construction”. Therefore, the first
        step in biomanufacturing is selecting a chassis cell that meets
        production demands. For instance, the A08 strain chosen for our project
        was selected because of its natural capacity to synthesize PMLA, laying
        the foundation for our subsequent engineering.
      </p>
      <p>
        <strong>
          Therefore, we extracted our first core concept from this initial
          engineering step
        </strong>
        : a cell is not a mere collection of isolated parts, but{" "}
        <strong>an integrated living system</strong> functioning through mutual
        collaboration.{" "}
        <strong>
          This microscopic synergy ultimately gives rise to specific macroscopic
          biological functions
        </strong>
        , which further translate into the robust 'manufacturing capabilities'
        of chassis cells in biomanufacturing.
      </p>
      <WonderQuestion>
        Why did we reach out to kindergarten children?
      </WonderQuestion>
      <p>
        <strong>
          Research on cognitive development provides the developmental context
          <Cite k="piaget1964" />. Research on early childhood systems thinking
          indicates that young children are at a golden stage for developing
          'part-connection-whole' cognitive relationships
          <Cite k="sweeney2012" />.
        </strong>{" "}
        Thus, interpreting the cell as a “coordinated system” not only perfectly
        aligns with the cognitive foundation of this age group, but also
        provides an opportunity to cultivate their early systems thinking while
        sparking their biological enlightenment.
      </p>
      <p>
        <strong>
          Guided by this educational philosophy, we designed a two-stage science
          outreach program tailored for early-childhood audiences.
        </strong>
      </p>
      <WonderQuestion>
        Why we designed a two-stage learning journey?
      </WonderQuestion>
      <p>
        We hoped to guide the children from understanding “how different parts
        work together within a cell” toward exploring “what functions these
        microscopic biological activities can ultimately give rise to.”
        Therefore, in <strong>Activity I</strong>, the children would learn that
        a cell is not simply a collection of individual parts, but an integrated
        living system in which different components work together to generate
        its overall function. Then in <strong>Activity II</strong>, we would
        extend this understanding beyond the cell, exploring how microscopic
        coordination gives rise to biological functions that children can
        observe and experience.
      </p>
      <h4 id="chapter-02-2">
        2.2 Activity I: Cell Town Adventure—How Parts Work Together Within a
        Cell
      </h4>
      <h5>2.2.1 Explore Objective-Driven Design</h5>
      <ObjectiveStatement>
        <strong>Objective I: Understanding Cellular Components</strong>
      </ObjectiveStatement>
      <p>
        <strong>Design:</strong> To maximize accessibility for children, we
        replaced complex biological terminology with a{" "}
        <strong>relatable "Cell Town"</strong> analogy. Framed within a sci-fi
        adventure narrative, the curriculum guided children through the cellular
        architecture from the inside out.{" "}
        <strong>
          We mapped core biological functions to intuitive concepts
        </strong>
        : the cell membrane served as a border-guarding "Bubble Wall," the
        nucleus acted as the coordinating "Mayor Walnut," and the mitochondria
        functioned as the energy-producing "Sausage Power Plant."{" "}
        <strong>
          This progressive, story-driven approach enabled students to
          internalize scientific principles through an immersive exploration.
        </strong>
      </p>
      <ObjectiveStatement>
        <strong>Objective II: Cultivating Systems Thinking</strong>
      </ObjectiveStatement>
      <p>
        <strong>Design:</strong> To elevate the learning experience from
        separate functional knowledge to holistic systems thinking,{" "}
        <strong>
          we concluded the adventure with a scenario-based inquiry: "What would
          happen to the town if Mayor Walnut disappeared?"
        </strong>{" "}
        By introducing this scenario, we hoped to prompt the children to look
        beyond isolated structures and analyze the interdependencies between
        components.
      </p>
      <ObjectiveStatement>
        <strong>
          Objective III: Grasping Concepts via Hands-on Creation &amp;
          Validating the Iteration
        </strong>
      </ObjectiveStatement>
      <p>
        <strong>Design:</strong> Based on feedback from our previous outreach, a
        lecture-only format struggles to sustain the attention of younger
        children. To address this, we introduced a{" "}
        <strong>"Craft Your Own Clay Cell" session</strong>, transitioning our
        educational approach to{" "}
        <strong>an iterated "Lecture + Hands-on" model.</strong>
      </p>
      <p>
        We specifically utilized this design to{" "}
        <strong>facilitate tactile comprehension of organelle shapes</strong>,
        help children{" "}
        <strong>tangibly visualize the integrated biological 'system'</strong>{" "}
        through the physical assembly of components, and{" "}
        <strong>
          practically validate the feasibility and engagement of our new
          pedagogy.
        </strong>
      </p>
      <ResourceCard
        eyebrow="Activity I · Presentation"
        title="Cell Town Adventure"
        description="Slides for the kindergarten cell-system activity."
        href={`${mediaRoot}/2-2-1-presentation.pdf`}
        actionLabel="View our presentation!"
      />
      <h5>2.2.2 Action</h5>
      <ChapterGallery
        images={[
          media(
            "chapter-02-action-2",
            "2-2-action-2.avif",
            "Cell Town activity 2",
          ),
          media("chapter-02-4", "2-2-action-4.avif", "Cell Town activity 4"),
          media("chapter-02-5", "2-2-action-5.avif", "Cell Town activity 5"),
          media("chapter-02-1", "2-2-action-1.avif", "Cell Town activity 1"),
          media("chapter-02-3", "2-2-action-3.avif", "Cell Town activity 3"),
        ]}
        label="Chapter 02 Cell Town activity photographs"
      />
      <h5>2.2.3 Verify</h5>
      <p>
        Considering that traditional tests and questionnaires are unsuitable for
        children, we adopted qualitative indicators, specifically behavioral
        observation and verbal feedback, to evaluate our educational impact.
      </p>
      <ol type="1">
        <li>
          <p>
            <strong>
              Verified Understanding of Component Function from Verbal and
              Behavioral Response
            </strong>
          </p>
        </li>
      </ol>
      <p>
        <strong>Verbal:</strong> During the hands-on session, when we asked the
        children about the round piece of clay they were holding, they didn't
        just confidently <strong>name it "Mayor Walnut"</strong> but accurately{" "}
        <strong>explained</strong> that its job is to "command the entire cell”
        as well. Similarly, other children <strong>eagerly showed off</strong>{" "}
        their "Sausage Power Plant" and <strong>explained</strong> that it
        provides energy for the cell's activities.
      </p>
      <p>
        <strong>Behavioral:</strong> After we introduced plant cells through a{" "}
        <strong>"spot the difference"</strong> game, the children{" "}
        <strong>successfully built</strong> accurate plant cell models,
        deliberately adding the unique structures.
      </p>
      <p>
        <strong>Summary:</strong> This{" "}
        <strong>spontaneous verbal feedback</strong> and{" "}
        <strong>task completion</strong> proved that the children had moved
        beyond simple memorization and{" "}
        <strong>
          genuinely understood the content we delivered and actively applied it
          to a firsthand task.
        </strong>
      </p>
      <ol start={2} type="1">
        <li>
          <p>
            <strong>Verified Systems thinking through Shared Reasoning</strong>
          </p>
        </li>
      </ol>
      <p>
        When posed with the question, "What would happen to the town without
        'Mayor Walnut'?", the children initially resisted the idea, insisting
        that a town without a mayor was impossible. We then offered a further
        prompt: "If there were no instructions from the mayor, affecting the
        Sausage Power Plant, what would happen next?" The children quickly
        continued reasoning along this line: "Without energy, the Packaging
        Station wouldn't be able to work either."
      </p>
      <p>
        <strong>Summary:</strong> Rather than simply telling them the complete
        logic, we co-constructed this causal chain with the children.{" "}
        <strong>
          Through this shared process, they successfully transitioned from
          understanding structures in isolation to grasping their
          interdependency, realizing how a localized change impacts the entire
          cellular system
        </strong>
      </p>
      <ol start={3} type="1">
        <li>
          <p>
            <strong>Verified the efficacy of “Lecture+Hands-on”</strong>
          </p>
        </li>
      </ol>
      <p>
        After introducing a hands-on clay activity alongside the lecture, we
        observed a noticeable change in the children’s engagement. While
        building their own “Cell Towns,” they remained actively engaged and
        involved in discussions about the functions of different cellular
        components. Instead of passively receiving information, they began to
        learn through creating, explaining, and interacting.
      </p>
      <p>
        <strong>
          Summary: These observations provided initial support for our iterated
          child-centered design approach.
        </strong>{" "}
        The lecture provides the essential knowledge foundation, while the
        hands-on activity creates an interactive experience aligned with the
        learning objectives.
      </p>
      <h6>Art Gallery</h6>
      <ChapterGallery
        images={[
          media(
            "chapter-02-art-1",
            "2-2-4-art-gallery-01.avif",
            "Cell Town art gallery 1",
          ),
          media(
            "chapter-02-art-2",
            "2-2-4-art-gallery-02.avif",
            "Cell Town art gallery 2",
          ),
          media(
            "chapter-02-art-3",
            "2-2-4-art-gallery-03.avif",
            "Cell Town art gallery 3",
          ),
          media(
            "chapter-02-art-4",
            "2-2-4-art-gallery-04.avif",
            "Cell Town art gallery 4",
          ),
          media(
            "chapter-02-art-5",
            "2-2-4-art-gallert-05.avif",
            "Cell Town art gallery 5",
          ),
          media(
            "chapter-02-art-6",
            "2-2-4-art-gallery-06.avif",
            "Cell Town art gallery 6",
          ),
          media(
            "chapter-02-art-7",
            "2-2-4-art-gallery-07.avif",
            "Cell Town art gallery 7",
          ),
          media(
            "chapter-02-art-8",
            "2-2-4-art-gallery-08.avif",
            "Cell Town art gallery 8",
          ),
        ]}
        label="Chapter 02 Cell Town art gallery"
      />
      <h5>2.2.4 Echo</h5>
      <h6>2.2.4.1 Echo 01- Thinking Beyond Hands-on</h6>
      <p>
        <strong>Feedback:</strong> The outcomes of Activity I{" "}
        <strong>
          demonstrated to us the value of combining Lecture + Hands-on for young
          learners
        </strong>
        . Based on these observations, we carried this design approach forward
        into <strong>Activity II</strong>, adapting the hands-on component to
        its new learning objectives.
      </p>
      <p>
        <strong>Reflection:</strong> However, this also raised a broader
        question: “
        <strong>
          Would hands-on activities be equally suitable for different age groups
          and learning objectives?”
        </strong>
      </p>
      <p>
        <strong>Evolution:</strong> We realized that hands-on activities might
        not always be the most appropriate form of engagement. What we wanted to
        retain was not one specific activity, but the principle behind it:{" "}
        <strong>
          a stable knowledge foundation combined with an interactive component
          adapted to the audience and learning objective.
        </strong>
      </p>
      <p>
        <strong>
          Therefore, we began to explore how different forms of interaction
          could be matched with different learning objectives and learners and
          examined this following the principle of “WEAVE”. Two examples
          illustrate this approach:
        </strong>
      </p>
      <ol type="1">
        <li>
          <p>
            <strong>For primary students</strong> (
            <a className={styles.evolutionLink} href="#chapter-03">
              <em>Exploring the Code of Life: DNA</em>
            </a>
            ), we combined DNA extraction with an interactive 3D DNA model.
          </p>
        </li>
        <li>
          <p>
            <strong>For high school students</strong> (
            <a className={styles.evolutionLink} href="#chapter-05-2-2">
              <em>The Microscopic Factory of Adhesives</em>
            </a>
            ), we incorporated <strong>videos</strong> of experiments and{" "}
            <a className={styles.evolutionLink} href="#chapter-05-2-3">
              <strong>the biological Pitch-Pot Game</strong>
            </a>
            .
          </p>
        </li>
      </ol>
      <h6>2.2.4.2 Echo 02-Visualizing Connections for Systems Understanding</h6>
      <p>
        <strong>Feedback:</strong>
      </p>
      <p>
        After the activity, several children shared that{" "}
        <strong>
          they wanted to learn more about biology through drawings and
          illustrations
        </strong>
        .{" "}
        <strong>
          This feedback prompted us to revisit our original design.
        </strong>{" "}
        In the original activity, these connections became apparent after we
        guided the children through a verbal causal chain. Once given the first
        link, they were able to continue the reasoning themselves. While
        characters and clay models helped make individual cellular components
        more intuitive and visible,{" "}
        <strong>
          our approach to helping children understand the cell as an integrated
          system still relied largely on verbal guidance.
        </strong>
      </p>
      <p>
        <strong>Reflection:</strong>
      </p>
      <p>
        This led us to consider whether{" "}
        <strong>
          visualizing the invisible connections within a cell could help
          children develop a more intuitive understanding of how different
          cellular components work together as an integrated system.
        </strong>
      </p>
      <p>
        <strong>Evolution:</strong>
      </p>
      <p>
        Building on this reflection, we developed the original “Cell Town”
        concept into a picture book.
      </p>
      <p>
        The story retains familiar characters such as the{" "}
        <strong>“Walnut Mayor,”</strong> but moves beyond introducing the
        functions of individual cellular components. By following how the Walnut
        Mayor passes information to other parts of the town, we translated the
        abstract process of <strong>gene expression</strong> into{" "}
        <strong>
          a visual narrative accessible to kindergarten-aged children
        </strong>
        , allowing them to see more intuitively how information can influence
        different activities within the cell.
      </p>
      <p>
        <strong>
          Through this extension, we aimed to visualize how information connects
          different cellular components, helping children see the cell more
          intuitively as an interconnected and coordinated system while
          addressing the gap we identified in the original activity.
        </strong>
      </p>
      <ResourceCard
        description="The illustrated Cell Town storybook extends the activity beyond the classroom."
        eyebrow="Echo 02 · Storybook · PDF"
        href={cellTownStorybook}
        title="Cell Town storybook"
      />
      <h4>2.3 Activity II: The Sticky Magic in Nature</h4>
      <h5>2.3.1 Explore Objective-Driven Design</h5>
      <ObjectiveStatement>
        <strong>
          Objective I: Guide kids to recognize that intracellular coordination
          can give rise to observable functions.
        </strong>
      </ObjectiveStatement>
      <p>
        Based on our previous experience, we learned that children build
        understanding more easily through concrete, observable, and tangible
        phenomena. Therefore, we needed a tangible carrier to demonstrate the
        relationship between “Micro-Synergy” and “Macro-Function.” This
        naturally brought us back to our project’s bio-based adhesive, where we
        drew inspiration from mussel adhesion to enhance its adhesive
        performance.
      </p>
      <p>
        <strong>
          With this in mind, we chose “stickiness,” something children could see
          and feel firsthand, to establish the accessible link between
          microscopic cellular coordination and biological function. Starting
          with mussel adhesion, we then broadened their exploration to other
          examples of adhesion in nature.
        </strong>
      </p>
      <ObjectiveStatement>
        <strong>
          Objective II: Help kids recognize how these biological functions apply
          to reality
        </strong>
      </ObjectiveStatement>
      <p>
        <strong>
          The “Lecture + Hands-on” approach validated in Activity I also shaped
          this activity. We took adhesion beyond explanation and placed it
          directly in children’s hands
        </strong>{" "}
        through a series of experiences that allowed them to create and apply it
        themselves.
      </p>
      <p>
        <strong>First,</strong> we designed{" "}
        <strong>“Sticky Magic from Okra,”</strong> in which children made their
        own natural glue. Since real mussel materials were impractical for the
        classroom, we chose <strong>okra</strong>, a safe and accessible
        material with distinctive natural mucilage, rather than attempting to
        replicate mussel adhesion.{" "}
        <strong>
          The following activity, “Piecing Together Life’s Colors”
        </strong>
        , moved from experiencing stickiness to applying it. Using homemade okra
        glue, glue sticks, and double-sided tape, children selected suitable
        adhesives for petals, leaves, fabric flowers, and other materials,
        experiencing biological functions through making and exploring how
        different properties suit different applications.
      </p>
      <ResourceCard
        eyebrow="Activity II · Presentation"
        title="The Sticky Magic in Nature"
        description="Slides for the okra-glue and nature-adhesion activity."
        href={`${mediaRoot}/2-3-1-presentations.pdf`}
        actionLabel="View our Presentation!"
      />
      <h5>2.3.2 Action</h5>
      <ChapterGallery
        images={chapter02ActivityTwo}
        label="Chapter 02 Sticky Magic activity photographs"
      />
      <h5>2.3.3 Verify</h5>
      <p>
        <strong>
          (1) Verified the Understanding of Functions Arising from cellular
          coordination
        </strong>
      </p>
      <p>
        After learning how mussels rely on coordinated cellular functions to
        secrete adhesive proteins that help them remain firmly attached to rocks
        even in wet and wave-exposed environments, we asked the children what
        scientists might learn from this natural strategy. Their answers
        reflected the connection they had made between microscopic processes and
        observable functions.{" "}
        <strong>
          Some suggested “making waterproof glue,” while others imagined
          “letting the little glue spirits hold hands so the glue becomes sticki
        </strong>
        er.”
      </p>
      <p>
        <strong>
          These responses showed that the children had recognized two observable
          features arising from the cellular coordination introduced in the
          lesson (adhesion and its effectiveness in wet environments) and were
          able to translate them into their own ideas.
        </strong>
      </p>
      <p>
        <strong>
          (2) Verified the recognition of utilizing biological functions through
          hands-on interactions
        </strong>
      </p>
      <p>
        During hands-on activities, they fully engaged in chopping and mashing
        okra, extracting its mucilage, and using the resulting glue in their own
        creations. Through touching, smelling, making, and applying, the
        abstract idea of adhesion became a tangible experience. Their active
        participation throughout the process showed that the “Lecture +
        Hands-on” format successfully encouraged them to move from understanding
        adhesion to experiencing and applying it themselves.
      </p>
      <h6>Art Gallery</h6>
      <ChapterGallery
        images={[
          media(
            "chapter-02-sticky-art-1",
            "2-3-4-art-gallery-01.avif",
            "Sticky Magic art gallery 1",
          ),
          media(
            "chapter-02-sticky-art-2",
            "2-3-4-art-gallery-02.avif",
            "Sticky Magic art gallery 2",
          ),
          media(
            "chapter-02-sticky-art-3",
            "2-3-4-art-gallery-03.avif",
            "Sticky Magic art gallery 3",
          ),
          media(
            "chapter-02-sticky-art-4",
            "2-3-4-art-gallery-04.avif",
            "Sticky Magic art gallery 4",
          ),
          media(
            "chapter-02-sticky-art-5",
            "2-3-4-art-gallery-05.avif",
            "Sticky Magic art gallery 5",
          ),
        ]}
        label="Chapter 02 Sticky Magic art gallery"
      />
      <h5>2.3.4 Echo</h5>
      <p>
        Children's questions and curiosity inspired us to take our educational
        activities further.
      </p>
      <h6>Echo 01-Rethinking scientific depth for young audiences.</h6>
      <p>
        <strong>Feedback:</strong>
      </p>
      <p>
        During the "Piecing Together Life's Colors" collage activity, the
        children shared some remarkable insights. They noticed that traditional
        double-sided tape worked best for securing fabric flowers, whereas the
        natural okra glue was far superior for delicate petals and leaves,
        providing a firm hold without damaging the plant tissues.{" "}
        <strong>
          This observation showed they were actively comparing material
          properties and learning to match specific adhesives to the right
          applications.
        </strong>
      </p>
      <p>
        More importantly, this realization sparked an imaginative question from
        the kids:{" "}
        <strong>
          "But is there one kind of glue that can stick petals, fabric flowers,
          and plastic buttons all at the same time? Can we invent something like
          that?"
        </strong>
      </p>
      <p>
        <strong>Reflection:</strong>
      </p>
      <p>
        Their curiosity demonstrated a natural engineering mindset.{" "}
        <strong>
          It proved to us that complex topics like biological redesign and
          BioBrick optimization
        </strong>{" "}
        should not be kept out of reach of younger audiences.
      </p>
      <p>
        <strong>Evolution:</strong>
      </p>
      <p>
        We then conducted the{" "}
        <a className={styles.evolutionLink} href="#chapter-03">
          <strong>“Sensors Inside the Cell”</strong>
        </a>{" "}
        activity for primary school students, introducing transcription factors
        as biological parts and encouraging them to design transcription factors
        with desired functions based on the problems they wanted to solve.
      </p>
      <h6>Echo 02-Connecting engaging analogies with scientific principles</h6>
      <p>
        <strong>Feedback:</strong>
      </p>
      <p>
        During the class, <strong>several children questioned</strong> the
        anthropomorphic mussel shown on our slides: “But real mussels don’t have
        eyes! And they don’t have feet like that either. So what are these
        really?”
      </p>
      <p>
        <strong>Reflection:</strong>
      </p>
      <p>
        <strong>
          This prompted us to reconsider the role of anthropomorphism in science
          education.
        </strong>{" "}
        As their understanding developed, engaging metaphors can still capture
        their interest, but they are no longer sufficient on their own.{" "}
        <strong>
          Their growing curiosity also calls for the real scientific principles
          behind them.
        </strong>
      </p>
      <p>
        <strong>Evolution:</strong> Before moving on to{" "}
        <a className={styles.evolutionLink} href="#chapter-03">
          <strong>“Sensors Inside the Cell”</strong>
        </a>{" "}
        and introducing the redesign of transcription factors, we first
        conducted{" "}
        <a className={styles.evolutionLink} href="#chapter-03">
          <strong>“Exploring the Code of Life: DNA”</strong>
        </a>{" "}
        to{" "}
        <strong>
          provide the basic scientific principles behind the redesign of
          biological parts
        </strong>
        . Via this activity, we hoped to help children understand the molecular
        foundation of redesign.
      </p>
    </>
  );
}

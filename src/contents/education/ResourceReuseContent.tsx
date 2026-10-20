import { Link } from "react-router-dom";

export function ResourceReuseContent() {
  return (
    <>
      <h3>Education × Model: Education Plugin</h3>
      <h4>1. Challenges of Resource Reuse</h4>
      <h5>
        1.1 Challenge I: Inefficient Retrieval Due to Scattered Educational
        Resources
      </h5>
      <p>
        While the iGEM community has accumulated a wealth of practical education
        experience, these materials remain scattered across various teams’ wiki
        pages, with no unified system for searching and organizing.{" "}
        <strong>
          Educators are forced to spend excessive time searching, filtering, and
          reorganizing these materials to finally turn existing experiences into
          actionable teaching plans.
        </strong>{" "}
        This lack of streamlined <strong>retrieval and reuse</strong>{" "}
        significantly <strong>increases the time cost and workload</strong> for
        educators aiming to leverage past community achievements.
      </p>
      <h5>
        1.2 Challenge II: High Adaptation Costs When Relying on Manual Redesign
        or General AI
      </h5>
      <p>
        Educational activities are typically tailored to specific audience
        demographics and teaching conditions. When variables such as{" "}
        <strong>student age</strong>, <strong>cultural background</strong>,{" "}
        <strong>educational themes</strong>, <strong>course duration</strong>,
        or <strong>available teaching materials</strong> change, educators must
        adjust the activity content, teaching methods, and curriculum structure
        accordingly. Whether through manual redesign or{" "}
        <strong>repeated prompt refinement with general-purpose AI</strong>,
        adapting educational activities often takes considerable time and
        effort, limiting the efficient reuse of existing materials across
        different teaching <strong>contexts.</strong>
      </p>
      <h5>
        1.3 Challenge III: The Reliability Gap in General AI-Driven Educational
        Design
      </h5>
      <p>
        During the educational activity design process, we explored using
        general AI tools for inspiration and found that while it can quickly
        generate creative ideas,{" "}
        <strong>the resulting lesson plans may lack traceable sources.</strong>{" "}
        Additionally, these plans may rely on AI-generated ideas{" "}
        <strong>
          rather than clear pedagogical frameworks tested and refined through
          repeated educational practice
        </strong>
        . As a result, they may <strong>lack sessions</strong> to assess
        learning outcomes, collect feedback, and guide future improvements.
      </p>
      <h4>2. Our Solution: Education × Model Collaboration—Education Plugin</h4>
      <p>
        In response to these challenges, we aim to{" "}
        <strong>establish a more efficient and reliable approach</strong> to
        reusing educational resources from our team and the broader iGEM
        community. Based on target audiences, teaching contexts, course
        duration, and available teaching materials, this approach is expected to
        quickly generate reference activity plans with clear pedagogical
        frameworks, learning-
        <strong>outcome assessments, and feedback-iteration mechanisms.</strong>
      </p>
      <p>
        Meanwhile, the Model team is developing <strong>WetFlow Agent</strong>,{" "}
        <strong>
          a system featuring document management, knowledge retrieval, and
          evidence traceability.
        </strong>{" "}
        It can retrieve relevant information from existing materials and provide
        traceable reference sources for generated content.{" "}
        <strong>
          We realized that these capabilities align perfectly with Education's
          needs in resource integration, pedagogical adaptation, and content
          reliability.
        </strong>
      </p>
      <p>
        Therefore, we initiated a{" "}
        <strong>cross-group collaboration with the Model team</strong>. Building
        upon the existing capabilities of <strong>WetFlow Agent</strong> and
        integrating the educational experience of our team and the iGEM
        community along with the WEAVE pedagogical framework, we jointly
        developed the <strong>Education plugin</strong> for educational activity
        planning. This endeavor aims to transform fragmented educational
        resources into teaching plans that are <strong>easy to access</strong>,{" "}
        <strong>flexibly adaptable</strong>, and{" "}
        <strong>supported by clear design rationales</strong>.
      </p>
      <h4>3. Features of Education plugin</h4>
      <h5>
        3.1 Efficient Retrieval and Traceability of Previous Educational
        Resources
      </h5>
      <p>
        The <strong>Education plugin</strong> organizes our team's and the iGEM
        community's existing educational experiences into a searchable database.
        Powered by WetFlow's retrieval and evidence citation features, educators
        can more easily access relevant cases, trace their original sources to
        enhance credibility, and reduce the workload of repeatedly collecting
        and organizing information.
      </p>
      <h5>
        3.2 Rapid Generation of Context-Adapted Activity Plans for Reference
      </h5>
      <p>
        By simply providing basic conditions such as target audience, learning
        objectives, course duration, and available teaching materials, educators
        can use the plugin to generate tailored reference activity plans based
        on retrieved cases,{" "}
        <strong>
          reducing the burden of manual redesign and repeated prompt tuning.
        </strong>
      </p>
      <h5>3.3 Structured Educational Design Guided by WEAVE</h5>
      <p>
        The plugin adopts our team's <strong>WEAVE</strong> framework for
        activity planning, systematically progressing through activity needs (
        <strong>W</strong>onder), instructional design (<strong>E</strong>
        xplore), activity implementation (<strong>A</strong>ction), learning
        outcome verification (<strong>V</strong>erify), and feedback-driven
        improvement (<strong>E</strong>cho). This structured approach ensures
        the generated plans have a clear design rationale and support subsequent
        evaluation and continuous iteration.
      </p>
      <p>
        For more details on the{" "}
        <strong>plugin's technical implementation</strong>,{" "}
        <strong>tool execution process</strong>, and the{" "}
        <strong>complete DNA structure activity planning case</strong>, please
        refer to the <strong>Education Plugin</strong> section of our{" "}
        <strong>
          <Link to="/model">Model Wiki</Link>
        </strong>
        .
      </p>
      <h4>4. Limitations and Future Improvements</h4>
      <h5>4.1 Limitations</h5>
      <p>
        Although the plugin offers several advantages,{" "}
        <strong>we acknowledge its limitations</strong>. The current knowledge
        base contains <strong>a limited selection of educational cases</strong>,
        which may restrict the diversity of topics and teaching contexts it can
        support. Moreover, although the plugin incorporates learning assessments
        and feedback mechanisms into activity planning, we have not yet
        implemented and evaluated the generated plans in actual classrooms.
        Therefore, their educational effectiveness remains to be verified.
      </p>
      <h5>4.2 Future Improvements</h5>
      <p>
        In future work, we hope to expand the knowledge base with more
        educational experiences from the iGEM community and invite other iGEM
        teams and educators to try the Education plugin in their own educational
        contexts. By collecting feedback from educators and audiences, we can
        further refine the generated activity plans, improve the plugin’s
        adaptability, and evaluate its usefulness in real educational settings.
      </p>
      <p>
        At the same time, we recognize that the activity plans generated by the
        Education plugin are intended to serve as references and sources of
        inspiration rather than ready-to-use lesson plans.{" "}
        <strong>
          Educators still need to review, adapt, and refine these plans
          according to their specific teaching needs.
        </strong>{" "}
        Through this project, we want to explore a more effective and
        responsible way for AI and educators to collaborate:{" "}
        <strong>
          Technology can make educational design more accessible and expand its
          possibilities, but education must always remain human-centered.
        </strong>
      </p>
    </>
  );
}

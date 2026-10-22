/* eslint-disable react-refresh/only-export-components */

import type { ReactNode } from "react";
import { type ArticleSection } from "../../components/article/ArticlePage";
import tableStyles from "../../components/article/article-table.module.css";
import { Figure } from "../../components/media/Figure";

function ContributionTable({
  id,
  label,
  columns,
  rows,
}: {
  id: string;
  label: string;
  columns: ReactNode[];
  rows: ReactNode[][];
}) {
  const hintId = `${id}-hint`;

  return (
    <figure className={tableStyles.tableFigure} aria-label={label}>
      <p id={hintId} className={tableStyles.tableHint}>
        Swipe horizontally to view all columns. The first column stays visible.
      </p>
      <div
        className={tableStyles.tableScroller}
        role="region"
        aria-label={`${label} table`}
        aria-describedby={hintId}
        tabIndex={0}
      >
        <table aria-label={label}>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th scope="col" key={index}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <th scope="row">{row[0]}</th>
                {row.slice(1).map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

export const sections: ArticleSection[] = [
  {
    id: "contribution-wet-lab",
    title: "1. Wet Lab — Genetic Parts and Experimental Protocols",
    content: (
      <p>
        Our Wet Lab contribution brings together{" "}
        <strong>
          genetic parts for <em>Aureobasidium melanogenum</em> A08 engineering
        </strong>{" "}
        and a <strong>22-document experimental protocol library</strong>. By
        sharing both molecular components and the workflows used with them, we
        hope to provide future teams with a more practical starting point for
        constructing and evaluating production strains.
      </p>
    ),
    subsections: [
      {
        id: "contribution-wet-lab-parts",
        title: "1.1 Genetic Parts for A08 Engineering",
        content: (
          <>
            <p>
              We organized an A08-centered collection of transcriptional
              regulators, expression constructs, a knockout-plasmid framework,
              and a Cre recombinase sequence resource. The collection
              distinguishes gene sequences from vectors and other design
              components so that future teams can select the resources
              appropriate to their experiments.
            </p>
            <ContributionTable
              id="contribution-parts"
              label="Genetic parts for A08 engineering"
              columns={[
                "Part or resource",
                "Registry entry",
                "Potential reuse",
              ]}
              rows={[
                [
                  <>
                    A08 <em>xlnR</em> gene
                  </>,
                  <a href="https://registry.igem.org/parts/bba-26x6m2g5">
                    BBa_26X6M2G5
                  </a>,
                  "XlnR functional studies and expression design",
                ],
                [
                  <>
                    A08 <em>araR</em> gene
                  </>,
                  <a href="https://registry.igem.org/parts/bba-26k4gkdm">
                    BBa_26K4GKDM
                  </a>,
                  "AraR functional studies and comparison with XlnR",
                ],
                [
                  "pNAT-LoxP-rDNA-xlnR",
                  <a href="https://registry.igem.org/parts/bba-265vc540">
                    BBa_265VC540
                  </a>,
                  <>
                    <em>xlnR</em> overexpression in an A08-compatible framework
                  </>,
                ],
                [
                  "pNAT-LoxP-rDNA-araR",
                  <a href="https://registry.igem.org/parts/bba-26by6bju">
                    BBa_26BY6BJU
                  </a>,
                  <>
                    <em>araR</em> overexpression in an A08-compatible framework
                  </>,
                ],
                [
                  "fl4a-hpt-loxp",
                  <a href="https://registry.igem.org/parts/bba-260ok570">
                    BBa_260OK570
                  </a>,
                  "Knockout-donor framework requiring target-specific homology arms",
                ],
                [
                  "Cre recombinase sequence",
                  <a href="https://registry.igem.org/parts/bba-261mmq1l">
                    BBa_261MMQ1L
                  </a>,
                  "Sequence resource for future Cre–lox marker-recycling designs",
                ],
              ]}
            />
            <p>
              The <em>xlnR</em> and <em>araR</em> expression designs build on
              the{" "}
              <strong>
                pNAT-LoxP-rDNA backbone documented by OUC-China 2025
              </strong>
              , which we credit as the prior resource. In the knockout
              framework, selection elements and target-specific homology arms
              play different roles and must be adapted for the intended locus.{" "}
              <strong>
                Cre–lox marker recycling remains a future design direction, not
                a validated outcome of this project.
              </strong>
            </p>
            <p>
              Our wider catalogue also includes xylose-associated resources
              labeled <em>XYR</em>, <em>XDH</em>, <em>XKI</em>, and <em>XI</em>,
              as well as <em>PYC</em> genes and expression designs. The PYC
              candidates include endogenous A08 <em>pyc</em> and genes from{" "}
              <em>Aureobasidium thailandense</em> ZW03-4,{" "}
              <em>Yarrowia lipolytica</em>, and{" "}
              <em>Saccharomyces cerevisiae</em>. These resources can help future
              teams plan comparisons of regulatory engineering, pentose
              metabolism, and precursor-supply strategies.
            </p>
          </>
        ),
      },
      {
        id: "contribution-wet-lab-protocols",
        title: "1.2 A Workflow-Based Protocol Library",
        content: (
          <>
            <p>
              We compiled <strong>22 experimental protocols</strong> covering
              the major workflows used in our project, from DNA preparation and
              construct assembly through transformant screening, cultivation,
              and analytical evaluation. The collection includes experimental
              conditions, kit information, analytical procedures, and the
              relevant literature or manufacturer sources.
            </p>
            <p>
              By organizing the methods according to experimental tasks, the
              library allows other teams to follow a connected workflow rather
              than reconstruct it from scattered notes. Protocols involving
              instruments, host strains, or commercial kits should still be
              checked and adapted for the new experimental context.
            </p>
            <p>
              <strong>Resources:</strong>{" "}
              <a href="https://2026.igem.wiki/ouc-haide/parts">
                Explore our Genetic Parts
              </a>{" "}
              ·{" "}
              <a href="https://2026.igem.wiki/ouc-haide/protocols">
                Browse the Protocol Library
              </a>
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: "contribution-model",
    title:
      "2. Model — From Metabolic Networks to Research Workflows and Molecular Interactions",
    content: (
      <p>
        Our Model group contributes a{" "}
        <strong>multi-scale computational approach</strong> spanning
        strain-level metabolic engineering, a supervised laboratory research
        workbench, and molecular-dynamics analysis of PMA–dopamine chemistry.
        These three components address different questions, but share an
        emphasis on evidence-guided, reusable research methods.
      </p>
    ),
    subsections: [
      {
        id: "contribution-model-metabolic",
        title: "2.1 Genome-Scale Metabolic Modeling for Non-Model Fungi",
        content: (
          <>
            <p>
              For organisms without a well-curated metabolic model, moving from
              a sequenced genome to rational engineering targets can be
              difficult. We documented a workflow that:
            </p>
            <ol>
              <li>
                Benchmarks deep-learning gene predictors using reference fungi.
              </li>
              <li>
                Builds a draft metabolic network using a{" "}
                <strong>Yeast9 template</strong>, protein-language-model
                homology mapping, and consensus from multiple enzyme-annotation
                tools.
              </li>
              <li>
                Revises subcellular assignments using{" "}
                <strong>TargetP 2.0</strong> and <strong>DeepLoc 2.1</strong>,
                then addresses network gaps through a minimum-set gap-filling
                strategy.
              </li>
              <li>
                Uses <strong>FSEOF overexpression scanning</strong> and joint
                knockouts of homologous gene groups to prioritize candidate
                engineering targets.
              </li>
            </ol>
            <p>
              This pipeline provides a methodological reference for teams
              investigating other non-model chassis. Its predictions remain{" "}
              <strong>candidates for experimental validation</strong>, rather
              than guaranteed improvements in a new host.
            </p>
          </>
        ),
      },
      {
        id: "contribution-model-wetflow",
        title: "2.2 WetFlow — A Human-in-the-Loop Research Workbench",
        content: (
          <>
            <p>
              We also developed <strong>WetFlow</strong>, a supervised research
              workbench based on the{" "}
              <strong>Cordis dependency-injection framework</strong>, to help
              researchers organize experimental records and supporting evidence.
            </p>
            <p>
              WetFlow divides work into stages. Moving to another stage requires
              researcher approval, and stage-skipping is restricted. Source
              retrieval is scoped to the active project, while measurements
              undergo checks of numerical values and units before recording.
              Additional capabilities, including literature retrieval through{" "}
              <strong>Europe PMC, arXiv, and NCBI GEO</strong> and numerical
              modeling, can be incorporated as plugins.
            </p>
            <p>
              This modular architecture also supports an{" "}
              <strong>Education Plugin</strong>, developed with our Education
              group, that connects documented educational cases with
              activity-design suggestions. Teams working on other projects can
              adapt the underlying approach by organizing their own protocols,
              source notes, and measurement records and selecting appropriate
              capabilities.
            </p>
            <p>
              <strong>
                WetFlow is presented as a human-supervised research workflow,
                not a substitute for researcher verification.
              </strong>
            </p>
          </>
        ),
      },
      {
        id: "contribution-model-molecular-dynamics",
        title: "2.3 Molecular Dynamics of Dopamine Functionalization",
        content: (
          <>
            <p>
              At the molecular scale, we investigated a trend reported in
              published PMA–dopamine chemistry: increasing the
              dopamine-to-carboxyl feed ratio from <strong>1.00 to 1.25</strong>{" "}
              was accompanied by a decrease in the reported dopamine content of
              the recovered product.
            </p>
            <p>
              Using explicit-solvent all-atom simulations with{" "}
              <strong>OpenMM, GAFF2 parameters, and TIP3P water</strong>, we
              examined the geometric approaches of dopamine to activated PMA
              sites. Under our baseline model assumptions, the higher-feed
              condition produced similar overall near-contact counts but a
              smaller proportion of approaches within a selected potentially
              reactive angle range.
            </p>
            <p>
              This result offers{" "}
              <strong>
                one possible molecular interpretation of the published
                observation
              </strong>
              . It does <strong>not</strong> directly measure grafting
              efficiency in our own PMA-DA samples, nor did it determine our
              earlier experimental formulations. Future teams studying EDC/NHS
              coupling may adapt the geometric analysis as a
              hypothesis-generating method and test its predictions
              experimentally.
            </p>
            <p>
              <strong>Resource:</strong>{" "}
              <a href="https://2026.igem.wiki/ouc-haide/model#model-overview">
                Explore our Model Work
              </a>
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: "contribution-hardware",
    title:
      "3. Hardware — Modular Pretreatment and Reusable Engineering Methods",
    content: (
      <p>
        Our Hardware contribution combines a documented{" "}
        <strong>modular fluid-treatment prototype</strong>, an iterative
        development record, and simulation methods that other teams can adapt to
        their own biomanufacturing systems.
      </p>
    ),
    subsections: [
      {
        id: "contribution-hardware-design",
        title: "3.1 Modular Hardware Design",
        content: (
          <>
            <p>
              We documented a component-level design for automated
              ammonia-nitrogen removal from anaerobic fermentation effluent. The
              source bill of materials contains <strong>20 components</strong>,
              with an estimated total of <strong>USD 124.89</strong> for the
              listed items.
            </p>
            <p>The design includes:</p>
            <ul>
              <li>
                A <strong>snap-in adsorption-column cartridge</strong>, allowing
                adsorbent materials to be changed and cartridges to be serviced.
              </li>
              <li>
                A <strong>multi-way-valve fluid circuit</strong> designed around
                adsorption, washing, and regeneration steps.
              </li>
              <li>
                An <strong>STM32-based monitoring architecture</strong> for pH,
                temperature, and turbidity, with <strong>ESP8266/MQTT</strong>,
                a <strong>WeChat mini-program</strong>, and{" "}
                <strong>OneNET</strong> as described interface components.
              </li>
              <li>
                A standardized data interface designed to support integration
                with the project’s <strong>OpenClaw</strong> control system.
              </li>
            </ul>
            <p>
              These components offer practical reference designs, although
              implementation details and procurement costs must be adjusted to
              another team’s apparatus, materials, and operating environment.
            </p>
          </>
        ),
      },
      {
        id: "contribution-hardware-dbtl",
        title: "3.2 Four DBTL Cycles and Experimental Records",
        content: (
          <>
            <p>
              We documented <strong>four Design–Build–Test–Learn cycles</strong>{" "}
              showing how feedback from testing informed successive hardware
              revisions. This record provides a reusable example of how to
              identify mechanical or operational limitations, translate them
              into design requirements, and reassess a revised prototype.
            </p>
            <p>
              We also documented measurements from anaerobic fermentation
              effluent and ion-exchange treatment, including{" "}
              <strong>
                pH trajectories and turbidity data before and after treatment
              </strong>
              . These records can inform experimental planning for similar
              pretreatment systems, while not by themselves establishing
              industrial-scale readiness.
            </p>
          </>
        ),
      },
      {
        id: "contribution-hardware-cfd",
        title: "3.3 CFD-Guided Adsorption-Column Design",
        content: (
          <>
            <p>
              Our Computational Fluid Dynamics (<strong>CFD</strong>) work
              explores internal flow-path design in the ion-exchange column.
              Reusable design questions include{" "}
              <strong>inlet diffuser angle</strong>,{" "}
              <strong>outlet collector configuration</strong>, and{" "}
              <strong>resin-bed height-to-diameter ratio</strong>.
            </p>
            <p>
              By sharing these considerations alongside prototype iterations, we
              hope other hardware teams can use simulation not merely to
              illustrate a device but to define and investigate engineering
              trade-offs.
            </p>
            <p>
              The original hardware contribution credits{" "}
              <strong>Zhuochen Wang</strong> and <strong>Xingyue Deng</strong>{" "}
              for the documented design, testing, monitoring, and optimization
              work.
            </p>
            <p>
              <strong>Resource:</strong>{" "}
              <a href="https://2026.igem.wiki/ouc-haide/hardware">
                Explore our Hardware
              </a>
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: "contribution-ihp",
    title:
      "4. Integrated Human Practices — TRACE and Stakeholder-Informed Decision-Making",
    content: (
      <p>
        We share <strong>TRACE</strong>, a structured engagement framework,
        together with our{" "}
        <strong>
          Stakeholder Matrix, Stakeholder Navigator, IHP Journey, and TRACE
          Handbook
        </strong>
        . These materials are intended to help future iGEM teams connect
        stakeholder insights with research decisions, rather than treating Human
        Practices as a list of interviews.
      </p>
    ),
    subsections: [
      {
        id: "contribution-ihp-trace",
        title: "4.1 TRACE: Linking Engagement with DBTL",
        content: (
          <>
            <p>
              <strong>
                TRACE — Trigger, Reach Out, Analyze, Change, and Evaluate
              </strong>{" "}
              — provides five connected prompts for integrating Human Practices
              into an iterative project:
            </p>
            <ContributionTable
              id="contribution-trace"
              label="TRACE stages and questions for future teams"
              columns={["TRACE stage", "Question for future teams"]}
              rows={[
                [
                  <strong>Trigger</strong>,
                  "Which project assumption or uncertainty needs to be examined?",
                ],
                [
                  <strong>Reach Out</strong>,
                  "Whose experience, expertise, or interests are relevant?",
                ],
                [
                  <strong>Analyze</strong>,
                  "What did we learn, and which assumptions should be reconsidered?",
                ],
                [
                  <strong>Change</strong>,
                  "What decision, experiment, evaluation criterion, or plan should change?",
                ],
                [
                  <strong>Evaluate</strong>,
                  "What did the response achieve, and what remains unresolved?",
                ],
              ]}
            />
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/ihp.svg"
              alt="Carbotex TRACE framework linked with the DBTL cycle"
              intrinsicWidth={594}
              intrinsicHeight={596}
              frame="none"
              maxWidth="48.75rem"
              maxHeight="470px"
              caption="TRACE connects stakeholder engagement with iterative project development."
            />
          </>
        ),
      },
      {
        id: "contribution-ihp-stakeholders",
        title: "4.2 Stakeholder Mapping and the Navigator",
        content: (
          <>
            <p>
              We identified relevant groups across the agricultural, scientific,
              industrial, environmental, and social contexts of Carbotex. Our
              mapping considered three qualitative dimensions:{" "}
              <strong>Affectedness</strong>, <strong>Influence</strong>, and{" "}
              <strong>Expertise</strong>.
            </p>
            <p>
              We used the <strong>Stakeholder Navigator</strong> to connect each
              stakeholder’s relevance with the team’s question, the feedback
              received, and its documented impact. Future teams can reuse this
              approach to distinguish <strong>stakeholder statements</strong>,{" "}
              <strong>team interpretation</strong>, and{" "}
              <strong>changes that actually occurred</strong>.
            </p>
            <p>
              The complementary{" "}
              <a href="https://static.igem.wiki/teams/6147/wiki/mapmap.svg">
                Stakeholder Ecosystem Map
              </a>{" "}
              visualizes these perspectives around TRACE; the detailed mapping
              and Navigator are presented on our IHP page.
            </p>
          </>
        ),
      },
      {
        id: "contribution-ihp-lessons",
        title: "4.3 Five Transferable Lessons",
        content: (
          <>
            <p>
              Our engagement records also illustrate how real conversations can
              reshape a project’s questions:
            </p>
            <ContributionTable
              id="contribution-ihp-lessons"
              label="Five transferable lessons from engagement"
              columns={["Area", "Transferable lesson", "Case"]}
              rows={[
                [
                  <strong>Feedstock</strong>,
                  "Regional resource abundance is not the same as practical availability; investigate existing uses, collection, storage, and supply.",
                  <a href="https://2026.igem.wiki/ouc-haide/human-practices#ihp-local-authority">
                    Agricultural stakeholders
                  </a>,
                ],
                [
                  <strong>Carbon utilization</strong>,
                  "Consider system-level regulation as well as individual metabolic steps.",
                  <a href="https://2026.igem.wiki/ouc-haide/human-practices#ihp-nan-hao">
                    Regulatory engineering
                  </a>,
                ],
                [
                  <strong>Carbon flow</strong>,
                  "Greater substrate use does not necessarily mean greater target-product formation.",
                  <a href="https://2026.igem.wiki/ouc-haide/human-practices#ihp-weihui-wu">
                    Carbon allocation
                  </a>,
                ],
                [
                  <strong>Material design</strong>,
                  "Producing a polymer and demonstrating application-specific functionality are distinct tasks.",
                  <a href="https://2026.igem.wiki/ouc-haide/human-practices#ihp-liu-ya">
                    Material development
                  </a>,
                ],
                [
                  <strong>Responsible implementation</strong>,
                  "Renewable feedstocks do not remove the need to evaluate costs, reliability, purification, safety, and environmental impacts.",
                  <a href="https://2026.igem.wiki/ouc-haide/human-practices#ihp-eva">
                    Sustainability
                  </a>,
                ],
              ]}
            />
            <p>
              These cases illustrate methods of inquiry,{" "}
              <strong>
                not universal solutions or claims of full technological
                readiness
              </strong>
              .
            </p>
          </>
        ),
      },
      {
        id: "contribution-ihp-resources",
        title: "4.4 Reusable IHP Resources",
        content: (
          <>
            <ul>
              <li>
                <strong>
                  <a href="https://static.igem.wiki/teams/6147/wiki/trace-20handbook.pdf">
                    TRACE Handbook (PDF)
                  </a>
                  :
                </strong>{" "}
                A reusable guide to applying stakeholder engagement iteratively.
              </li>
              <li>
                <strong>
                  <a href="https://static.igem.wiki/teams/6147/wiki/ihp.svg">
                    TRACE Framework (SVG)
                  </a>
                  :
                </strong>{" "}
                A visual reference connecting TRACE to DBTL.
              </li>
              <li>
                <strong>
                  <a href="https://static.igem.wiki/teams/6147/wiki/mapmap.svg">
                    Stakeholder Ecosystem Map (SVG)
                  </a>
                  :
                </strong>{" "}
                A visual overview of stakeholder perspectives.
              </li>
              <li>
                <strong>
                  <a href="https://static.igem.wiki/teams/6147/wiki/journey.avif">
                    IHP Journey (AVIF)
                  </a>
                  :
                </strong>{" "}
                A roadmap of engagement, decisions, evaluation, and reflection.
              </li>
              <li>
                <strong>
                  <a href="https://2026.igem.wiki/ouc-haide/human-practices">
                    Integrated Human Practices Page
                  </a>
                  :
                </strong>{" "}
                Stakeholder Navigator, full TRACE cases, and remaining
                limitations.
              </li>
            </ul>
            <p>
              We encourage future teams to document not only which advice was
              incorporated, but also{" "}
              <strong>
                what evidence supported the decision, which suggestions were not
                adopted, and which questions remain unanswered
              </strong>
              .
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: "contribution-education",
    title:
      "5. Education — Reusable Frameworks, Activities, and Learning Resources",
    content: (
      <p>
        Our Education group contributes two adaptable approaches for educational
        practice, a collection of teaching and activity resources, and an
        Education Plugin developed with the Model group.
      </p>
    ),
    subsections: [
      {
        id: "contribution-education-frameworks",
        title: "5.1 WEAVE and Lecture+X",
        content: (
          <>
            <p>
              <strong>WEAVE</strong> supports educational planning,
              implementation, evaluation, and feedback-driven improvement. Its
              emphasis on <strong>two-way communication</strong> encourages
              educators to treat learners’ questions and perspectives as inputs
              that can reshape future activities. In particular, the{" "}
              <strong>Echo</strong> stage highlights feedback, reflection, and
              mutual growth.
            </p>
            <p>
              <strong>Lecture+X</strong> is a flexible activity-design pattern:
              a <strong>Lecture</strong> introduces key scientific concepts, and{" "}
              <strong>X</strong> is an interactive element adapted to the
              audience and setting. Depending on learners’ needs, X might
              involve a hands-on craft, demonstration, experiment, game, or
              collaborative challenge.
            </p>
            <p>
              Together, the frameworks offer future teams both{" "}
              <strong>
                a way to improve an educational activity over time
              </strong>{" "}
              and{" "}
              <strong>
                a practical method for choosing an appropriate activity format
              </strong>
              .
            </p>
          </>
        ),
      },
      {
        id: "contribution-education-resources",
        title: "5.2 Adaptable Education Resources",
        content: (
          <>
            <p>
              We organized our resources into three categories. The audiences
              listed below reflect our team’s activity experience; future teams
              should adapt the materials to their own learning contexts.
            </p>
            <p>
              <strong>Teaching materials</strong>
            </p>
            <ContributionTable
              id="contribution-education-teaching"
              label="Teaching materials"
              columns={["Audience", "Examples of resources"]}
              rows={[
                [
                  "Kindergarten children",
                  "Age-adapted synthetic biology presentations",
                ],
                [
                  "Primary school students",
                  "DNA and cellular-sensor presentations; fermentation and DNA-extraction worksheets",
                ],
                [
                  "High school students",
                  <>
                    <em>The Microscopic Factory of Adhesives</em> presentations
                  </>,
                ],
                [
                  "Older adults",
                  "Age-adapted synthetic biology presentations and bio-MythBusters materials",
                ],
              ]}
            />
            <p>
              <strong>Interactive learning tools</strong>
            </p>
            <ContributionTable
              id="contribution-education-interactive"
              label="Interactive learning tools"
              columns={["Audience", "Examples of resources"]}
              rows={[
                ["Students and the general public", "Interactive 3D DNA model"],
                [
                  "Students and the general public",
                  "Virtual fermentation laboratory",
                ],
                [
                  "Students and the general public",
                  <>
                    <em>The Atlas of Chinese Fermented Gastronomy</em>
                  </>,
                ],
                [
                  "Students and the general public",
                  <>
                    <em>The Commons</em> ESG game
                  </>,
                ],
              ]}
            />
            <p>
              <strong>Activity toolkits</strong>
            </p>
            <ContributionTable
              id="contribution-education-toolkits"
              label="Activity toolkits"
              columns={["Audience", "Examples of resources"]}
              rows={[
                [
                  "High school and university biology students",
                  <>
                    <strong>17-C: The Lab Mystery Escape-room Challenge</strong>{" "}
                    — activity handbook, clue cards, and investigation materials
                  </>,
                ],
                [
                  "Workshop participants",
                  <>
                    <strong>SDGs Workshop</strong> guide
                  </>,
                ],
                [
                  "Primary school students",
                  <>
                    <strong>Traditional Papermaking Workshop</strong> plan and
                    instructions
                  </>,
                ],
              ]}
            />
          </>
        ),
      },
      {
        id: "contribution-education-plugin",
        title: "5.3 Education Plugin Built on WetFlow",
        content: (
          <>
            <p>
              In collaboration with the Model group, we developed an{" "}
              <strong>Education Plugin</strong> based on the{" "}
              <strong>WetFlow</strong> architecture described in{" "}
              <a href="#contribution-model-wetflow">Section 2.2</a>. Using
              selected educational cases from Carbotex and the wider iGEM
              community, the plugin helps users find relevant examples and
              develop activity suggestions based on{" "}
              <strong>
                target audience, learning objectives, time, and available
                materials
              </strong>
              , with references to the original cases.
            </p>
            <p>
              The plugin complements the teaching resources above. Its purpose
              is to help future teams{" "}
              <strong>
                find, compare, and adapt documented educational practices
              </strong>
              , while leaving final educational decisions to the people
              designing and delivering the activities.
            </p>
            <p>
              <strong>Resource:</strong>{" "}
              <a href="https://2026.igem.wiki/ouc-haide/education">
                Explore our Education Work
              </a>
            </p>
          </>
        ),
      },
    ],
  },
];

export const intro = (
  <>
    <p>
      <em>Sharing methods, materials, and lessons beyond Carbotex</em>
    </p>
    <p>
      Our project brings together biological engineering, computational
      modeling, hardware development, stakeholder engagement, and education.
      Along the way, we documented{" "}
      <strong>
        reusable genetic parts, experimental protocols, computational workflows,
        engineering methods, and practical frameworks
      </strong>{" "}
      that future iGEM teams can study and adapt.
    </p>
    <p>
      The contributions below are organized by{" "}
      <strong>
        Wet Lab, Model (including Software), Hardware, Integrated Human
        Practices, and Education
      </strong>
      . We distinguish documented resources from future possibilities and
      identify where validation in a new context is still necessary.
    </p>
    <p>
      <strong>Explore:</strong> <a href="#contribution-wet-lab">Wet Lab</a> ·{" "}
      <a href="#contribution-model">Model</a> ·{" "}
      <a href="#contribution-hardware">Hardware</a> ·{" "}
      <a href="#contribution-ihp">IHP</a> ·{" "}
      <a href="#contribution-education">Education</a>
    </p>
  </>
);

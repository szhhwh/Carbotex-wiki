import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import {
  ArticleFramework,
  ArticlePage,
  type ArticleSection,
} from "../components/article/ArticlePage";
import { MathInline } from "../components/article/Math";
import { Cite } from "../components/article/References";
import { Caption } from "../components/media/Caption";
import { Figure } from "../components/media/Figure";
import { VideoEmbed } from "../components/media/VideoEmbed";
import tableStyles from "../components/article/article-table.module.css";
import sharedStyles from "./model-shared.module.css";

const sections: ArticleSection[] = [
  {
    id: "sw-en-sec-1",
    title: "Overview & Architecture",
    content: (
      <>
        <p>
          As agents increasingly assist wet-lab research, we found that
          conventional Coding Agents designed primarily for programming tasks
          (such as OpenCode and Claude Code) struggle to handle complex biological
          experimental workflows directly. In our exploration, they provided
          limited built-in support for biological materials, measurement units,
          experimental records, and researcher approval at laboratory
          checkpoints. Conversely, building a separate agent for every
          experimental step leads to tightly coupled code and repeated
          engineering when tools cannot be reused across tasks. Our attempts to
          use general Coding Agents for biological wet-lab support highlighted
          two central tensions:
        </p>
        <ul>
          <li>
            <strong>Controlled experimental progression</strong>: Wet-lab
            experiments follow physical cycles with high trial-and-error costs;
            completing a code or tool call does not by itself show that a result
            can be accepted or that an experiment should advance. Measurement
            writes must pass numerical and unit validation before being saved as
            formal records, while experimental stage progression and operations
            flagged as requiring approval must be reviewed and approved by a
            researcher.
          </li>
          <li>
            <strong>Decoupled, reusable scientific toolchains</strong>: Sample
            preparation, molecular characterization, and education outreach
            require distinct capabilities. If tools are wired directly into the
            main program or supplied as ad hoc Python scripts, switching
            experimental contexts requires substantial effort to reconnect them.
            Wet-lab work needs a unified modular architecture that lets teams
            attach tools on demand while reusing shared project data and
            evidence services.
          </li>
        </ul>
        <p>
          To address this, we developed <strong>WetFlow</strong>, a modular
          agent workbench for biological research that evolved across two
          engineering iterations to combine controlled workflow services with
          the Cordis plugin architecture, connecting scientific tools,
          experimental materials, and researcher decisions (final system
          architecture shown in Figure 1). WetFlow initially served our team's
          PMA–dopamine underwater bioadhesive project and, as the architecture
          matured, expanded smoothly to our education and science communication
          group.
        </p>
        <Figure
          src="https://static.igem.wiki/teams/6147/wiki/model/fig-1-1-wetflow-architecture.svg"
          alt="Figure 1: WetFlow modular system architecture and researcher-controlled workflow"
          ratio="16 / 9"
          objectFit="contain"
          captionPrefix="Figure 1:"
          caption={
            <>
              {" "}
              WetFlow modular system architecture and researcher-controlled
              workflow{" "}
            </>
          }
        />
      </>
    ),
  },
  {
    id: "sw-en-sec-2",
    title: "Part I: Controlled Experimental Workflow",
    content: null,
    subsections: [
      {
        id: "sw-en-sec-3",
        title: "1.1 Three Controlled Safeguards",
        content: (
          <>
            <p>
              In practical wet-lab workflows, our adhesive team needed to keep
              our own experimental conditions, reference synthesis routes from
              the literature, and operator notes distinct, while strictly
              governing which numbers enter formal measurement records and when
              an experiment advances to the next stage. We organized biological
              workflows into six standard stages and established three core
              controls around <strong>Project Evidence Isolation</strong>,{" "}
              <strong>Measurement Write Validation</strong>, and{" "}
              <strong>Stage Progression Approval</strong>.
            </p>
            <ArticleFramework title="Six Biological Experimental Stages & Review Checkpoints">
              <div
                className={tableStyles.tableScroller}
                role="region"
                tabIndex={0}
                aria-label="Scientific Stage; Core Research Activity; Context Carried Forward to Next Stage"
              >
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Scientific Stage</th>
                      <th scope="col">Core Research Activity</th>
                      <th scope="col">Context Carried Forward to Next Stage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Design</strong>
                      </td>
                      <td>
                        Review literature and protocols to define the scientific
                        question and reaction conditions.
                      </td>
                      <td>
                        Proposed experimental design and supporting literature
                        sources.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Build</strong>
                      </td>
                      <td>
                        Construct and verify the experimental system or
                        engineered strain.
                      </td>
                      <td>
                        Constructs, host chassis, and verification records.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Culture</strong>
                      </td>
                      <td>
                        Prepare seed material and run fermentation cultures.
                      </td>
                      <td>
                        Strain, fermentation batch, and culture conditions.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Assay</strong>
                      </td>
                      <td>
                        Measure physicochemical or adhesion metrics and check
                        data quality.
                      </td>
                      <td>
                        Formal measurement records and associated experimental
                        conditions.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Analyze</strong>
                      </td>
                      <td>
                        Fit mathematical models and compare simulation with
                        experimental results.
                      </td>
                      <td>
                        Analysis inputs, computational outputs, and linked
                        evidence.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Decide</strong>
                      </td>
                      <td>
                        Review stage findings and determine the next
                        experimental action.
                      </td>
                      <td>
                        Recorded approval decisions and supporting evidence.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <ul>
                <li>
                  Within these stages, detailed checkpoints cover design review,
                  build verification, seed preparation, fermentation, assay,
                  analysis, and decision logging. The workflow advances along
                  allowed paths only after researcher approval; rejection
                  retains the current stage.
                </li>
              </ul>
            </ArticleFramework>
            <h4 id="sw-en-sec-4">Project Evidence Isolation</h4>
            <ul>
              <li>
                <strong>Challenge &amp; Design Choice</strong>: Different
                projects may contain identically named{" "}
                <code>CULTURE-SOP.md</code> files specifying very different
                culture conditions. If all projects were searched together, the
                agent would have to disentangle mixed excerpts after retrieval.
                WetFlow scopes retrieval strictly to the active project inside
                the project service layer before text excerpts reach the agent,
                preventing cross-project document mixing at the source.
              </li>
              <li>
                <strong>Verification</strong>: We created two independent test
                projects, A and B, imported <code>CULTURE-SOP.md</code> files
                with distinct culture conditions, and ran the same{" "}
                <code>evidence_search</code> query across the sequence "Project
                A <MathInline tex={String.raw`\to`} /> Project B{" "}
                <MathInline tex={String.raw`\to`} /> back to Project A". Project
                A returned <code>culture-A (30 °C, 24 h)</code>, Project B
                returned <code>culture-B (37 °C, 12 h)</code>, and switching
                back to Project A restored Project A's original excerpt and
                source citation (Figure 2).
              </li>
              <li>
                <strong>Practical Benefit</strong>: Researchers do not need to
                remind the agent in every prompt to ignore other projects' SOPs,
                and within our adhesive project each document's provenance (team
                protocol vs. literature route) remains clearly separated.
              </li>
            </ul>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/model/fig-1-2-project-evidence.avif"
              alt="Figure 2: Project Evidence Isolation verification. The same query returns each active project's own protocol in Project A and Project B, and switching back to Project A restores the original source citation."
              ratio="16 / 9"
              objectFit="contain"
              captionPrefix="Figure 2:"
              caption={
                <> Project-scoped evidence retrieval isolation verification </>
              }
            />
            <h4 id="sw-en-sec-5">Measurement Write Validation</h4>
            <ul>
              <li>
                <strong>Challenge &amp; Design Choice</strong>: Literature
                reference temperatures, target SOP values, and new operator
                readings play distinct roles; numbers mentioned in chat
                responses should not be saved automatically as formal
                experimental measurements. WetFlow requires explicit numerical
                values for measurement writes and enforces data-type and unit
                checks before database insertion.
              </li>
              <li>
                <strong>Verification</strong>: After defining the standard unit
                of culture parameter <code>TEMP</code> as <code>°C</code>, we
                submitted three consecutive write requests: (1){" "}
                <code>TEMP = 30 K</code> was rejected due to unit mismatch
                (record count remained 0); (2) <code>TEMP = 30 °C</code> passed
                validation and was saved (record count became 1); and (3) a{" "}
                <code>TEMP</code> request missing a numerical value was rejected
                (record count remained 1), as shown in Figure 3.
              </li>
              <li>
                <strong>Practical Benefit</strong>: Invalid entries never
                pollute project records, and reference values appearing only in
                retrieved text do not trigger accidental writes. If a valid-unit
                reading falls outside the expected range, the system saves the
                observation with an automatic review flag, cleanly
                distinguishing rejected malformed inputs, accepted normal
                measurements, and flagged out-of-range observations.
              </li>
            </ul>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/model/fig-1-3-measurement-checks.avif"
              alt="Figure 3: Measurement write unit and format validation results"
              ratio="16 / 9"
              objectFit="contain"
              captionPrefix="Figure 3:"
              caption={
                <> Measurement write unit and format validation results </>
              }
            />
            <h4 id="sw-en-sec-6">Stage Progression Approval</h4>
            <ul>
              <li>
                <strong>Challenge &amp; Design Choice</strong>: Even after the
                agent explains a protocol or logs a measurement, researchers
                must judge whether an experiment is ready to advance. We
                embedded stage-approval rules directly into the workflow state
                machine: every transition request generates a pending proposal
                requiring explicit researcher approval, and skipping
                intermediate checkpoints is blocked.
              </li>
              <li>
                <strong>Verification</strong>: In a fresh test run, a direct
                jump request from <code>Draft</code> to <code>Assay</code> was
                blocked; when the agent requested advancement to the next stage,
                the system created a pending proposal while holding the stage at{" "}
                <code>Draft</code>; researcher approval advanced the run to{" "}
                <code>Design Review</code>, whereas rejecting the next proposal
                kept the run safely in its current stage (Figure 4).
              </li>
              <li>
                <strong>Practical Benefit</strong>: Proposals and
                approval/rejection decisions are persisted with the run record,
                so researchers never have to reconstruct current experimental
                status from chat history.
              </li>
            </ul>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/model/fig-1-4-researcher-approval.avif"
              alt="Figure 4: Researcher stage-progression approval and jump-blocking verification"
              ratio="16 / 9"
              objectFit="contain"
              captionPrefix="Figure 4:"
              caption={
                <>
                  {" "}
                  Researcher stage-progression approval and jump-blocking
                  verification{" "}
                </>
              }
            />
          </>
        ),
      },
      {
        id: "sw-en-sec-7",
        title: "1.2 Adhesive Preparation Workflow",
        content: (
          <>
            <ul>
              <li>
                <strong>Research Question</strong>: After obtaining poly(malic
                acid) (PMA) from <em>Aureobasidium melanogenum</em> A08
                fermentation, our wet-lab team needed a step-by-step preparation
                workflow for wet bioadhesives tested on glass, stainless steel,
                and porcine skin, while comparing our preparation schedule
                against the published reference method of Tang et al.{" "}
                <Cite k="Tang2020PMLADA" />.
              </li>
              <li>
                <strong>WetFlow Execution</strong>: The workbench launched a
                background Europe PMC search while retrieving our imported team
                protocol and Tang et al. synthesis notes from the active
                project, integrating literature retrieval, local evidence
                extraction, and operator clarifications into a structured
                five-step protocol.
              </li>
              <li>
                <strong>Delivered Result</strong>: The resulting five-step route
                covers activation, dopamine coupling, dialysis, freeze-drying,
                and aqueous reconstitution (Figure 5), explains how
                NHS-activated PMA carboxyl sites form amide bonds with
                dopamine's primary amine while leaving catechol groups free for
                interfacial adhesion, contrasts our "1 h activation + 24 h
                coupling" schedule against the literature "6 h activation + 3 d
                reaction", and keeps the operator's follow-up note
                ("reconstitute in distilled water at 0.5 g lyophilized gel per 1
                mL water [logged in operator notes as 50% w/v], 2 h wait after
                application") clearly distinguished from the initial draft (PBS
                buffer, 50 wt%).
              </li>
            </ul>
            <ArticleFramework title="Five-Step PMA–Dopamine Bioadhesive Preparation Table">
              <div
                className={tableStyles.tableScroller}
                role="region"
                tabIndex={0}
                aria-label="Preparation Step; Operating Conditions & Provenance Consolidated by WetFlow"
              >
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Preparation Step</th>
                      <th scope="col">
                        Operating Conditions &amp; Provenance Consolidated by
                        WetFlow
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>1. Activate</strong>
                      </td>
                      <td>
                        Add EDC/NHS at 2× the initial COOH molar amount each;
                        react for 1 h
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>2. Couple</strong>
                      </td>
                      <td>
                        Add dopamine (DA); react for 24 h protected from light
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>3. Purify</strong>
                      </td>
                      <td>
                        Dialyze for 48 h; change deionized water at least every
                        12 h
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>4. Dry</strong>
                      </td>
                      <td>
                        Pre-freeze at{" "}
                        <MathInline
                          tex={String.raw`-80\text{ }^\circ\text{C}`}
                        />{" "}
                        for 1 h; freeze-dry for 48 h
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>5. Reconstitute</strong>
                      </td>
                      <td>
                        Operator clarification: reconstitute in distilled water
                        at 0.5 g lyophilized gel per 1 mL water (logged as 50%
                        w/v); wait 2 h after application
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ArticleFramework>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/model/fig-1-3-preparation-illustration.avif"
              alt="Figure 5: Five-step PMA–dopamine adhesive preparation workflow consolidated by WetFlow"
              ratio="16 / 9"
              objectFit="contain"
              captionPrefix="Figure 5:"
              caption={
                <>
                  {" "}
                  Five-step PMA–dopamine adhesive preparation workflow
                  consolidated by WetFlow{" "}
                </>
              }
            />
            <p>
              The live workbench demonstration video below shows the end-to-end
              interaction in WetFlow for adhesive literature search, feed-ratio
              comparison, and source provenance inspection:
            </p>
            <div id="wetflow-demo">
              <VideoEmbed
                src="https://video.igem.org/videos/embed/37K7KgMio7nF7yfyv2ezFE"
                title="OUC-Haide 2026: WetFlow, A PMA–Dopamine Adhesive Case"
                provider="raw"
                ratio="16 / 9"
                allow="fullscreen"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                captionPrefix="Video 1:"
                caption={
                  <>
                    {" "}
                    Live demonstration of adhesive protocol retrieval and
                    feed-ratio verification in WetFlow{" "}
                  </>
                }
              />
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "sw-en-sec-8",
    title: "Part II: Cordis Modular Plugin Architecture",
    content: null,
    subsections: [
      {
        id: "sw-en-sec-9",
        title: "2.1 Plugin Architecture & Hot-Swap Verification",
        content: (
          <>
            <p>
              Moving from protocol preparation to quantitative modeling requires
              domain-specific computational tools, while cross-team
              collaboration (such as education outreach) requires tailored
              toolsets. We organized WetFlow around the{" "}
              <strong>Cordis plugin architecture</strong>{" "}
              <Cite k="Shi2026Cordis" />: each plugin declares its registered
              tools, required shared services (such as project storage and
              evidence search), and cleanup logic upon disposal, sharing a
              unified action–observation agent loop <Cite k="Yao2023ReAct" />{" "}
              across Web UI, CLI, and API surfaces (Figure 6).
            </p>
            <ArticleFramework title="Five Core Plugin Modules & Cordis Integration Comparison">
              <div
                className={tableStyles.tableScroller}
                role="region"
                tabIndex={0}
                aria-label="Plugin Module; Core Capabilities & Resources; Typical Research Use Case"
              >
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Plugin Module</th>
                      <th scope="col">Core Capabilities &amp; Resources</th>
                      <th scope="col">Typical Research Use Case</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Evidence</strong>
                      </td>
                      <td>
                        Local protocols, source-linked text excerpts, and
                        citation tags
                      </td>
                      <td>
                        Retrieve experimental steps, culture conditions, and
                        protocol version differences.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Research</strong>
                      </td>
                      <td>
                        Europe PMC, arXiv, NCBI GEO, and project literature
                        library
                      </td>
                      <td>
                        Search public papers, inspect abstracts/full texts, and
                        archive local literature records.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Modeling</strong>
                      </td>
                      <td>
                        Growth curve fitting, Monod batch simulation, and
                        external MD report import
                      </td>
                      <td>
                        Run built-in numerical kinetics tasks or connect
                        external simulation summaries.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Experiment</strong>
                      </td>
                      <td>
                        Parameter definitions, unit-checked measurement writes,
                        and linked records
                      </td>
                      <td>
                        Save wet-lab observations as structured records for
                        comparison with models and papers.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Education</strong>
                      </td>
                      <td>
                        Attributed outreach case cards, audience resource
                        checks, and WEAVE briefs
                      </td>
                      <td>
                        Turn team research and past outreach experience into
                        audience-specific lesson plans.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                className={tableStyles.tableScroller}
                role="region"
                tabIndex={0}
                aria-label="Integration Dimension; Direct Hardcoded Host Integration; Modular Cordis Plugin Management"
              >
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Integration Dimension</th>
                      <th scope="col">Direct Hardcoded Host Integration</th>
                      <th scope="col">Modular Cordis Plugin Management</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Adding a new tool</strong>
                      </td>
                      <td>
                        Modify host core code and manually coordinate
                        registration
                      </td>
                      <td>
                        Encapsulate and declaratively register inside an
                        independent plugin module
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Reusing shared services</strong>
                      </td>
                      <td>
                        Explicitly pass and manually maintain service references
                      </td>
                      <td>Declare shared services via dependency injection</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Unloading / hot removal</strong>
                      </td>
                      <td>
                        Track down call sites and manually release resources
                      </td>
                      <td>
                        Disposing the plugin automatically cleans up all
                        registered tools and side effects
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Project context continuity</strong>
                      </td>
                      <td>Tightly coupled inside the host runtime</td>
                      <td>
                        Shared project service persists across plugin loads and
                        unloads without losing sessions
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ArticleFramework>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/model/fig-1-2-case-workflow.avif"
              alt="Figure 6: Multi-step tool workflow for the feed-ratio investigation in WetFlow"
              ratio="16 / 9"
              objectFit="contain"
              captionPrefix="Figure 6:"
              caption={
                <>
                  {" "}
                  Multi-step tool workflow for the feed-ratio investigation in
                  WetFlow{" "}
                </>
              }
            />
            <ul>
              <li>
                <strong>Dynamic Plugin Removal &amp; Restoration</strong>: The
                built-in <code>Modeling</code> plugin registers 9 modeling
                tools. As shown in Animation 1, dynamically unloading{" "}
                <code>Modeling</code> reduces the agent's available tool count
                from 35 to 26 and takes all 9 modeling tools offline immediately
                while leaving <code>Evidence</code>, <code>Research</code>,{" "}
                <code>Experiment</code>, and the active project session intact;
                reloading the plugin immediately restores all 35 tools and the
                modeling method list.
              </li>
            </ul>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/model/wetflow-plugin-remove-restore.webp"
              alt="Animation 1: Dynamic unloading and restoration of the Modeling plugin"
              ratio="16 / 9"
              objectFit="contain"
              captionPrefix="Animation 1:"
              caption={
                <> Dynamic unloading and restoration of the Modeling plugin </>
              }
            />
            <ArticleFramework title="Tool Registry Verification Across Plugin Load, Unload, and Reload">
              <div
                className={tableStyles.tableScroller}
                role="region"
                tabIndex={0}
                aria-label="Plugin Lifecycle State; Total Agent Tools; Modeling Tools; Modeling Service Status; Result of Calling modeling_methods"
              >
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Plugin Lifecycle State</th>
                      <th scope="col">Total Agent Tools</th>
                      <th scope="col">Modeling Tools</th>
                      <th scope="col">Modeling Service Status</th>
                      <th scope="col">
                        Result of Calling <code>modeling_methods</code>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Before load (initial)</strong>
                      </td>
                      <td>26</td>
                      <td>0</td>
                      <td>Unavailable</td>
                      <td>Tool unregistered; call rejected</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>After initial load</strong>
                      </td>
                      <td>35</td>
                      <td>9</td>
                      <td>Available</td>
                      <td>Returns list of available modeling methods</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>After dynamic unload</strong>
                      </td>
                      <td>26</td>
                      <td>0</td>
                      <td>Unavailable</td>
                      <td>Tools cleaned up; call rejected</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>After reload</strong>
                      </td>
                      <td>35</td>
                      <td>9</td>
                      <td>Available</td>
                      <td>Restores all 9 tools and returns method list</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ArticleFramework>
          </>
        ),
      },
      {
        id: "sw-en-sec-10",
        title: "2.2 Molecular Simulation Plugins",
        content: (
          <>
            <h4 id="sw-en-sec-11">
              Feed-Comparison Plugin <code>md_compare_feeds</code>
            </h4>
            <ul>
              <li>
                <strong>Challenge &amp; Design Choice</strong>: Molecular
                dynamics (MD) simulations produced contact summaries across
                multiple feed ratios. Rigorously comparing two feed conditions
                in an adhesive discussion requires reading and checking the
                summary report's declared{" "}
                <strong>
                  polymer carboxyl activation assumption (50%) and shared
                  trajectory analysis window (3–5 ns)
                </strong>
                , as well as checking consistency between orientation-compatible
                contacts and total close contacts. We packaged these domain
                checks and calculations into the Cordis plugin tool{" "}
                <code>md_compare_feeds</code> rather than relying on ad hoc
                prompt instructions (Animation 2).
              </li>
              <li>
                <strong>Verification</strong>: When pointed to the main-model
                summary report and called with{" "}
                <code>
                  md_compare_feeds(baselineFeed=1.00, comparisonFeed=1.25)
                </code>
                , the tool automatically read and verified the report's declared
                50% activation level and shared 3–5 ns window and returned:{" "}
                <strong>
                  an orientation-compatible contact fraction of{" "}
                  <MathInline tex={String.raw`122 / 485 = 25.2\%`} /> at feed
                  1.00 versus <MathInline tex={String.raw`24 / 462 = 5.2\%`} />{" "}
                  at feed 1.25 (a net drop of{" "}
                  <MathInline tex={String.raw`20.0`} /> percentage points)
                </strong>
                .
              </li>
            </ul>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/model/wetflow-plugin-load-call.webp"
              alt="Animation 2: Loading the modeling plugin and invoking registered tools in WetFlow"
              ratio="16 / 9"
              objectFit="contain"
              captionPrefix="Animation 2:"
              caption={
                <>
                  {" "}
                  Loading the modeling plugin and invoking registered tools in
                  WetFlow{" "}
                </>
              }
            />
            <ArticleFramework title="FeedComparisonPlugin Registration, Execution, and Disposal Code">
              <pre>
                <code>
                  {
                    "const plugin = await ctx.plugin(FeedComparisonPlugin, { summaryPath });\nconst result = await ctx.wetflow.tools.get('md_compare_feeds').execute({\n  baselineFeed: 1.00, comparisonFeed: 1.25\n});\nawait plugin.dispose();"
                  }
                </code>
              </pre>
            </ArticleFramework>
            <h4 id="sw-en-sec-12">High-Feed Dopamine Decline</h4>
            <ul>
              <li>
                <strong>Research Question</strong>: Intuitively, adding more
                dopamine during synthesis should put more dopamine onto the PMA
                backbone, yet published UV-absorbance measurements by Tang et
                al. <Cite k="Tang2020PMLADA" /> peak at{" "}
                <strong>21.3 wt%</strong> under equimolar feed (100%) and drop
                to <strong>19.2 wt%</strong> at 125% feed (Table 1). Our team
                needed the literature rationale for our 1:1 starting condition
                and a clear molecular hypothesis for the high-feed decline.
              </li>
              <li>
                <strong>WetFlow Execution</strong>: The agent retrieved Tang et
                al.'s five-feed series, distinguished three easily confused
                quantities (see collapsible card below), and confirmed that 1:1
                equimolar feed achieves the highest reported product dopamine
                content (21.3 wt%) in the published series to support our team's
                1:1 starting formulation; next, by reading the already-generated
                MD contact summary report via <code>md_compare_feeds</code>,
                WetFlow brought the existing MD results back into our
                formulation discussion—confirming that total close contacts
                are nearly unchanged between feeds 1.00 and 1.25 (485 vs. 462)
                while{" "}
                <strong>
                  the orientation-compatible fraction drops from 25.2% to 5.2%
                </strong>{" "}
                (Figure 7)—and clarified follow-up analysis questions.
              </li>
            </ul>
            <figure className={tableStyles.tableFigure}>
              <div
                className={tableStyles.tableScroller}
                role="region"
                tabIndex={0}
                aria-label="DA:COOH Molar Feed Ratio; Purified Product Dopamine Content (wt%); Trend Across Published Experimental Series"
              >
                <table>
                  <thead>
                    <tr>
                      <th scope="col">DA:COOH Molar Feed Ratio</th>
                      <th scope="col">
                        Purified Product Dopamine Content (wt%)
                      </th>
                      <th scope="col">
                        Trend Across Published Experimental Series
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>25%</strong>
                      </td>
                      <td>8.9 wt%</td>
                      <td>
                        Low product incorporation under sub-stoichiometric feed
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>50%</strong>
                      </td>
                      <td>14.3 wt%</td>
                      <td>
                        Product content rises markedly with increased feed
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>75%</strong>
                      </td>
                      <td>20.6 wt%</td>
                      <td>Product content approaches a plateau</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>100% (1:1 Equimolar)</strong>
                      </td>
                      <td>
                        <strong>21.3 wt%</strong>
                      </td>
                      <td>
                        <strong>
                          Series peak; selected as our team's 1:1 starting
                          formulation
                        </strong>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>125% (Excess Feed)</strong>
                      </td>
                      <td>
                        <strong>19.2 wt%</strong>
                      </td>
                      <td>
                        <strong>
                          Anomalous 2.1 percentage-point decline under excess
                          feed
                        </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Caption prefix="Table 1:">
                Five DA:COOH feed ratios and purified product dopamine weight
                percentages reported by Tang et al. (2020)
              </Caption>
            </figure>
            <ArticleFramework title="Distinguishing Three Easily Confused Quantities (Feed Ratio, Grafted-Site Fraction, and Product wt%)">
              <div
                className={tableStyles.tableScroller}
                role="region"
                tabIndex={0}
                aria-label="Quantity; Rigorous Definition & Experimental/Simulation Level in This Study"
              >
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Quantity</th>
                      <th scope="col">
                        Rigorous Definition &amp; Experimental/Simulation Level
                        in This Study
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>DA:COOH Feed Ratio</strong>
                      </td>
                      <td>
                        Molar ratio of dopamine added at the start of coupling
                        relative to initial polymer carboxyl groups.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Grafted-Site Fraction</strong>
                      </td>
                      <td>
                        Fraction of polymer carboxyl sites covalently coupled to
                        dopamine via amide bonds in theory or simulation.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Product Dopamine Content (wt%)</strong>
                      </td>
                      <td>
                        Weight percentage of dopamine in purified dry polymer
                        measured by UV absorbance by Tang et al.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ArticleFramework>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/model/fig-1-4-feed-illustration.avif"
              alt="Figure 7: Illustration of WetFlow's response, integrating the five published feed-ratio values from Tang et al. (2020) with the 1:1 starting formulation recommendation."
              ratio="16 / 9"
              objectFit="contain"
              captionPrefix="Figure 7:"
              caption={
                <>
                  {" "}
                  WetFlow analysis output integrating the five published feed
                  ratios and the 1:1 starting formulation{" "}
                </>
              }
            />
            <h4 id="sw-en-sec-13">
              Molecular Function Breakdown &amp; Substrate Modeling Plan
            </h4>
            <ul>
              <li>
                <strong>Research Question</strong>: After testing hydrogel
                adhesion on glass, stainless steel, and porcine skin, our
                experimental group wanted to clarify the functional division of
                labor across PMA–dopamine components and plan follow-up
                molecular simulations.
              </li>
              <li>
                <strong>WetFlow Execution</strong>: Combining synthesis
                protocols with mechanical test records, the agent organized the
                three molecular components and their modeling questions (Table
                2), used <code>md_compare_feeds</code> to bring the generated
                coupling-stage MD summary back into formulation discussion and
                clarify follow-up trajectory analysis questions (radial distance
                distributions, approach-angle distributions, and hydration
                shells), and outlined surface models for glass (hydroxylated
                amorphous{" "}
                <MathInline tex={String.raw`\text{SiO}_2`} />
                ), stainless steel (passivated metal-oxide layer), and porcine
                skin (hydrated stratum corneum tissue) (Figure 8).
              </li>
            </ul>
            <figure className={tableStyles.tableFigure}>
              <div
                className={tableStyles.tableScroller}
                role="region"
                tabIndex={0}
                aria-label="Molecular Component; Physicochemical Role in Wet Adhesion; Follow-Up Molecular Modeling Question"
              >
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Molecular Component</th>
                      <th scope="col">Physicochemical Role in Wet Adhesion</th>
                      <th scope="col">Follow-Up Molecular Modeling Question</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>PMA Polymer Backbone</strong>
                      </td>
                      <td>
                        Provides bulk hydrogel cohesion through chain
                        entanglement and interchain association.
                      </td>
                      <td>
                        How do backbone conformation, packing, and hydration
                        shells vary with feed ratio?
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Covalent Amide Linkage</strong>
                      </td>
                      <td>
                        Stably couples NHS-activated PMA carboxyl sites to
                        dopamine primary amines (
                        <MathInline tex={String.raw`-\text{NH}_2`} />
                        ).
                      </td>
                      <td>
                        What active-ester activation level and grafting degree
                        should product models assume?
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Free Catechol Groups</strong>
                      </td>
                      <td>
                        Supply interfacial H-bonding, electrostatic, and
                        metal-coordination adhesion sites.
                      </td>
                      <td>
                        How do catechol orientation accessibility and local
                        noncovalent interactions affect coupling and adhesion?
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Caption prefix="Table 2:">
                Functional roles and modeling questions across PMA–dopamine
                components
              </Caption>
            </figure>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/model/fig-1-5-design-illustration.avif"
              alt="Figure 8: Molecular design brief generated by WetFlow across three components and three substrates"
              ratio="16 / 9"
              objectFit="contain"
              captionPrefix="Figure 8:"
              caption={
                <>
                  {" "}
                  Molecular design brief generated by WetFlow across three
                  components and three substrates{" "}
                </>
              }
            />
          </>
        ),
      },
      {
        id: "sw-en-sec-14",
        title: "2.3 Kinetics & Education Plugins",
        content: (
          <>
            <h4 id="sw-en-sec-15">Built-In Monod Growth Simulation</h4>
            <ul>
              <li>
                <strong>Function Design</strong>: Beyond importing external MD
                reports, the <code>Modeling</code> plugin runs built-in
                microbial growth kinetics simulations and persists the solver
                method, initial biomass (
                <MathInline tex={String.raw`0.1\text{ g/L}`} />
                ), initial substrate (
                <MathInline tex={String.raw`1.0\text{ g/L}`} />
                ), maximum specific growth rate (
                <MathInline tex={String.raw`1.0\text{ h}^{-1}`} />
                ), half-saturation constant (
                <MathInline tex={String.raw`0.1\text{ g/L}`} />
                ), yield (<MathInline tex={String.raw`0.5\text{ g/g}`} />
                ), and 41 time-point trajectories inside the project record
                (Figure 9) for traceable inspection.
              </li>
            </ul>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/model/monod-task-preview.avif"
              alt="Figure 9: Four-hour biomass growth and substrate consumption curves (in g/L) saved by WetFlow's built-in Monod growth simulation."
              ratio="16 / 9"
              objectFit="contain"
              captionPrefix="Figure 9:"
              caption={
                <>
                  {" "}
                  Four-hour biomass growth and substrate consumption curves from
                  WetFlow's Monod simulation{" "}
                </>
              }
            />
            <h4 id="sw-en-sec-16">
              Education Plugin &amp; WEAVE Lesson Design
            </h4>
            <ul>
              <li>
                <strong>Function Design</strong>: To help our education outreach
                group turn archived materials into structured lesson plans, we
                built the <code>Education</code> plugin on top of the shared{" "}
                <code>Evidence</code> service (expanding total tools from 35 to
                37). It provides <code>education_search_cases</code> (searching
                attributed outreach cards by audience and topic) and{" "}
                <code>education_make_brief</code> (checking resource
                compatibility and structuring a lesson brief around our team's{" "}
                <strong>
                  five-step WEAVE cycle: Wonder{" "}
                  <MathInline tex={String.raw`\to`} /> Explore{" "}
                  <MathInline tex={String.raw`\to`} /> Action{" "}
                  <MathInline tex={String.raw`\to`} /> Verify{" "}
                  <MathInline tex={String.raw`\to`} /> Echo
                </strong>
                ). We specifically fixed an early flaw that split classroom
                minutes mechanically across all five stages: classroom time (30
                min) is now allocated exclusively to <code>Action</code>, while{" "}
                <code>Verify</code> and <code>Echo</code> are marked as awaiting
                post-class evidence and iteration.
              </li>
              <li>
                <strong>WetFlow Execution</strong>: Given a request to design a
                30-minute introductory DNA structure lesson for primary-school
                students using paper, colored pens, clay, a laptop, and a
                projector, WetFlow retrieved our team's <code>DNA Builder</code>{" "}
                tool card and BUCT's drawing/clay outreach card, checked
                audience compatibility, and generated a complete WEAVE brief
                (Figure 10).
              </li>
            </ul>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/model/fig-1-9-education-weave.avif"
              alt="Figure 10: Primary-school DNA outreach lesson brief generated by the Education plugin"
              ratio="16 / 9"
              objectFit="contain"
              captionPrefix="Figure 10:"
              caption={
                <>
                  {" "}
                  Primary-school DNA outreach lesson brief generated by the
                  Education plugin{" "}
                </>
              }
            />
            <ArticleFramework title="WEAVE Five-Stage Lesson Highlights & 30-Minute Classroom Action Schedule">
              <ul>
                <li>
                  <strong>Wonder</strong>: Help primary-school students grasp
                  double-stranded complementary base pairing through hands-on
                  clay modeling and "build-then-explain"; remind educators to
                  confirm exact age group, prior knowledge, and facilitator
                  ratio beforehand.
                </li>
                <li>
                  <strong>Explore</strong>: Combine a projected{" "}
                  <code>DNA Builder</code> demonstration with colored-pen
                  drawing and clay modeling; explicitly note that the referenced
                  BUCT clay activity originally targeted special-education
                  children, so adapting it to a general primary-school class is
                  a new adaptation requiring educator review.
                </li>
                <li>
                  <strong>Verify &amp; Echo</strong>: Define two post-class
                  verification checks (whether students can point out the two
                  strands and one complementary base pair, plus facilitator
                  notes on confusion points) and specify concrete next-round
                  adjustments (such as adding a pairing concept card if base
                  pairing remains unclear).
                </li>
              </ul>
              <div
                className={tableStyles.tableScroller}
                role="region"
                tabIndex={0}
                aria-label="Classroom Action Segment; Proposed 30-Minute Activity Plan"
              >
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Classroom Action Segment</th>
                      <th scope="col">Proposed 30-Minute Activity Plan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>0–4 min</strong>
                      </td>
                      <td>
                        Project the DNA pairing model and pose an engaging
                        opening question.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>4–10 min</strong>
                      </td>
                      <td>
                        Guide students to sketch two backbones and matching base
                        shapes on paper.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>10–20 min</strong>
                      </td>
                      <td>
                        Build simple complementary clay models in small groups
                        with facilitator support.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>20–26 min</strong>
                      </td>
                      <td>
                        Have students explain the two strands and base-pairing
                        rule in their own models.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>26–30 min</strong>
                      </td>
                      <td>
                        Share representative student models and recap
                        double-stranded DNA complementarity.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </ArticleFramework>
          </>
        ),
      },
    ],
  },
  {
    id: "sw-en-sec-17",
    title: "Part III: System Benchmark Evaluation",
    content: null,
    subsections: [
      {
        id: "sw-en-sec-18",
        title: "3.1 Evidence Judgment Benchmark",
        content: (
          <>
            <p>
              Across six design validations and four applications, WetFlow
              demonstrated end-to-end governance from controlled wet-lab records
              to modular cross-domain extensions (Table 3). We further
              constructed an internal{" "}
              <strong>
                30-question biological evidence development benchmark
              </strong>{" "}
              (built from synthetic test documents kept separate from real
              wet-lab records; the public bundle includes all 30 benchmark
              questions and all 66 initial and wording-clarified prompt-response
              records) to compare the full <strong>WetFlow</strong>{" "}
              configuration against the general coding agent{" "}
              <strong>OpenCode</strong> baseline setup (both running{" "}
              <code>DeepSeek Flash</code> within their respective native tool
              and sandbox environments) on judging scientific claims (
              <code>SUPPORT</code>, <code>REFUTE</code>, or <code>NEI</code> —
              10 questions each) against experimental documents (Table 4).
            </p>
            <figure className={tableStyles.tableFigure}>
              <div
                className={tableStyles.tableScroller}
                role="region"
                tabIndex={0}
                aria-label="Core Architectural Choice; Verified Engineering & Scientific Benefit; Validated by"
              >
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Core Architectural Choice</th>
                      <th scope="col">
                        Verified Engineering &amp; Scientific Benefit
                      </th>
                      <th scope="col">Validated by</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Project-scoped retrieval isolation</strong>
                      </td>
                      <td>
                        Automatically isolates and restores project-specific
                        SOPs and source citations across workspace switches.
                      </td>
                      <td>Project Evidence Isolation</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Unit-checked measurement recording</strong>
                      </td>
                      <td>
                        Enforces value and unit checks, blocks invalid writes,
                        and flags out-of-range readings.
                      </td>
                      <td>Measurement Write Validation</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Researcher stage-transition approval</strong>
                      </td>
                      <td>
                        Requires a formal proposal and explicit researcher
                        approval before advancing stages; blocks stage skipping.
                      </td>
                      <td>Stage Progression Approval</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Modular Cordis plugin integration</strong>
                      </td>
                      <td>
                        Dynamically loads/unloads domain-checked computational
                        tools while preserving project sessions.
                      </td>
                      <td>Feed-Comparison Plugin</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Persisted numerical kinetics runs</strong>
                      </td>
                      <td>
                        Saves Monod solver methods, parameters, units, and
                        time-series trajectories inside project records.
                      </td>
                      <td>Built-In Monod Growth Simulation</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Cross-plugin shared evidence service</strong>
                      </td>
                      <td>
                        Reuses underlying document and citation services to
                        power WEAVE education lesson planning.
                      </td>
                      <td>Education Plugin</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Caption prefix="Table 3:">
                Summary of WetFlow's six core architectural choices and their
                corresponding validations
              </Caption>
            </figure>
            <figure className={tableStyles.tableFigure}>
              <div
                className={tableStyles.tableScroller}
                role="region"
                tabIndex={0}
                aria-label="Evaluated System (Both Using DeepSeek Flash); Correct Judgments (out of 30); Overall Accuracy; Breakdown of Label Errors & Execution Failures"
              >
                <table>
                  <thead>
                    <tr>
                      <th scope="col">
                        Evaluated System (Both Using DeepSeek Flash)
                      </th>
                      <th scope="col">Correct Judgments (out of 30)</th>
                      <th scope="col">Overall Accuracy</th>
                      <th scope="col">
                        Breakdown of Label Errors &amp; Execution Failures
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>
                          WetFlow (Modular Workbench in This Study)
                        </strong>
                      </td>
                      <td>
                        <strong>28 / 30</strong>
                      </td>
                      <td>
                        <strong>93.3%</strong>
                      </td>
                      <td>
                        <strong>0 execution failures</strong>; 2 incorrect label
                        judgments
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>
                          OpenCode (General Coding Agent Baseline)
                        </strong>
                      </td>
                      <td>21 / 30</td>
                      <td>70.0%</td>
                      <td>
                        6 execution failures without a valid label; 3 incorrect
                        label judgments
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Caption prefix="Table 4:">
                Quantitative comparison between WetFlow and OpenCode on the
                30-question biological evidence benchmark
              </Caption>
            </figure>
            <ArticleFramework title="30-Question Benchmark Design & Analysis of Representative Shared Error A-24">
              <ul>
                <li>
                  <strong>Benchmark Construction &amp; Scoring</strong>: The 30
                  questions were built from four synthetic experimental
                  documents (a literature excerpt, a fermentation batch record,
                  an instrument export, and a laboratory SOP; all numbers are
                  standalone software-test data, and the public bundle includes
                  all 30 benchmark questions together with all 66 raw and
                  wording-clarified prompt-response records). Each system was
                  required
                  to output <code>SUPPORT</code>, <code>REFUTE</code>, or{" "}
                  <code>NEI</code> on the first line; missing labels and
                  execution failures counted as errors against a fixed
                  denominator of 30 (the saved summary combines 27 initial test
                  records with 3 wording-clarified items [A-02, A-03, and A-13,
                  while initial items such as A-01 remained unedited] that both
                  systems answered correctly upon rerun; because each system ran
                  under its own native tool and sandbox configuration, the
                  scores reflect end-to-end configuration performance rather
                  than isolated model reasoning ability alone).
                </li>
                <li>
                  <strong>
                    Shared Error A-24 (<code>NEI</code> vs. <code>REFUTE</code>{" "}
                    on Unrecorded Confirmation)
                  </strong>
                  : Claim A-24 stated that "the 21.4 g/L measurement was
                  confirmed by a second method." The batch record reported a
                  single HPLC injection without mentioning replicates or a
                  second assay. The gold label is <code>NEI</code> (absence of a
                  recorded confirmation is not a disproof), yet both systems
                  predicted <code>REFUTE</code>, highlighting the importance of
                  separating a measured value, its assay method, and independent
                  verification in future reasoning refinements.
                </li>
              </ul>
            </ArticleFramework>
          </>
        ),
      },
      {
        id: "sw-en-sec-19",
        title: "3.2 Summary & Outlook",
        content: (
          <>
            <ul>
              <li>
                <strong>Summary of Contributions</strong>: Built on the Cordis
                plugin framework <Cite k="Shi2026Cordis" />, WetFlow unifies
                project-scoped
                retrieval, unit-checked measurement logging, researcher stage
                approval, and hot-swappable scientific plugins into a single
                biological research workbench. In our adhesive project, it
                connected preparation route comparison, high-feed decline
                diagnosis, and three-substrate interfacial modeling planning; in
                outreach, it reused the same evidence service to generate WEAVE
                lesson plans.
              </li>
              <li>
                <strong>How Other iGEM Teams Can Reuse WetFlow</strong>: Any
                iGEM team working on a different organism, metabolic pathway, or
                biomaterial can use our open-source WetFlow package (released
                under the Apache-2.0 License), create a project, and import their
                own SOPs, literature notes, and measurement tables to immediately
                use Europe PMC / arXiv / NCBI GEO search, unit-validated
                experiment records, and
                modular modeling plugins.
              </li>
              <li>
                <strong>From Adhesive Formulation to the MD Module</strong>: The
                high-feed dopamine decline bridges WetFlow and our molecular
                simulations—our team synthesis uses a 1:1 dopamine-to-carboxyl
                feed ratio, whereas Tang et al.'s series shows an anomalous drop
                in product dopamine content when feed increases from 1.00 to
                1.25. WetFlow organized the protocol and composition records,
                brought the generated MD summary results back into our
                formulation discussions, and helped clarify follow-up analysis
                questions; the{" "}
                <Link to="/model/md">Molecular Dynamics Simulation module</Link>{" "}
                presents the full all-atom trajectories and geometric analysis
                of how excess dopamine behaves around activated PMA.
              </li>
            </ul>
          </>
        ),
      },
    ],
  },
];

export function ModelSoftware() {
  return (
    <ArticlePage
      title="WetFlow"
      titleId="body-wetflow-en"
      heroImage={{
        src: "https://static.igem.wiki/teams/6147/wiki/model-header/hero-wetflow.avif",
        alt: "WETFLOW",
      }}
      intro={
        <div className={sharedStyles.backBar}>
          <Link to="/model" className={sharedStyles.backBtn}>
            <ArrowLeft size={16} strokeWidth={2.4} aria-hidden="true" />
            <span>Back to Model Overview</span>
          </Link>
          <span className={sharedStyles.stagePill}>
            02 · MIDSTREAM WORKBENCH · WETFLOW AGENT
          </span>
        </div>
      }
      sections={sections}
      references
      referenceOrder={["Tang2020PMLADA", "Shi2026Cordis", "Yao2023ReAct"]}
    />
  );
}

import { Check } from "lucide-react";
import type { ArticleSection } from "../components/article/ArticlePage";
import { MathInline } from "../components/article/Math";
import { Cite } from "../components/article/References";
import {
  CycleJourney,
  DbtlCycle,
  EngineeringBrief,
  type CycleSummaryItem,
} from "../components/hardware/EngineeringSections";
import sectionStyles from "../components/hardware/engineering-sections.module.css";
import tableStyles from "../components/article/article-table.module.css";
import { Caption } from "../components/media/Caption";
import { Figure } from "../components/media/Figure";
import { FigurePair } from "../components/media/FigurePair";
export const modelEngineeringReferenceOrder = [
  "zhang2024yeast9",
  "qi2021pmla",
  "qi2022highmwpolymalate",
  "wang2020pmla",
  "annevo2026",
  "gabriel2024tiberius",
  "stiehler2020helixer",
  "holst2025helixer",
  "huang2023compleasm",
  "manni2021busco",
  "han2026alphagem",
  "rives2021esm1b",
  "liu2024plmsearch",
  "cantalapiedra2021eggnog",
  "yu2023clean",
  "kim2023deepectransformer",
  "bansal2022rhea",
  "odum2024deeploc21",
  "almagro2019targetp2",
  "camacho2009blast",
  "orth2010fba",
  "lewis2010pfba",
  "Lieven2020MEMOTE",
  "Kim2010Spombe",
  "choi2010fseof",
  "buchfink2021diamond",
  "Tian2003Enzyme",
  "ebrahim2013cobrapy",
  "huangfu2018highs",
  "feng2018pycmodel",
  "Tang2020PMLADA",
  "Shi2026Cordis",
  "Rodriguez2023Approach",
  "Eastman2017OpenMM",
  "Jakalian2002AM1BCC",
];

const modelCycleSummaries: CycleSummaryItem[] = [
  {
    id: "dbtl-en-c1",
    title: "Localization-Calibrated GEM",
    focus: "Correct cross-species template compartment transfer",
    achievement:
      "Established a two-channel reconstruction and proteome-wide localization calibration workflow for the unannotated fungus A08, eliminating the 1.29 mmol·gDW⁻¹·h⁻¹ pathway detour caused by inherited yeast organelle labels and raising theoretical PMA flux from 1.430 to 1.500 mmol·gDW⁻¹·h⁻¹.",
  },
  {
    id: "dbtl-en-c2",
    title: "Orthogonal Group Screening",
    focus: "Overcome paralog masking in a duplicated genome",
    achievement:
      "Shifted target screening from individual genes to homologous isozyme groups and intersected FSEOF overexpression push with joint group-knockout essentiality — filtering out bypassable cyMDH (−4.7% loss) and isolating cytosolic PYC (Rank 4 FSEOF, Rank 1 group KO at −58.6% loss) to provide genome-scale mechanistic support for our PYC overexpression engineering.",
  },
  {
    id: "dbtl-en-c3",
    title: "Service-Layer Guardrails",
    focus: "Replace fragile prompts with architectural constraints",
    achievement:
      "Moved experimental safety rules from prompt instructions into SQLite and state-machine service guardrails — enforcing project-isolated SOP retrieval, unit-validated measurement logging, and researcher-gated transitions to reach 28/30 (93.3%) benchmark accuracy versus 21/30 (70.0%) for OpenCode.",
  },
  {
    id: "dbtl-en-c4",
    title: "Hot-Swappable Domain Plugins",
    focus: "Decouple specialized analytics from the core host",
    achievement:
      "Extended the workbench via dependency-injected Cordis plugins that hot-swap cleanly without polluting core state — automating baseline-verified adhesive coupling checks and source-cited 30-minute WEAVE classroom lesson generation.",
  },
  {
    id: "dbtl-en-c5",
    title: "Pre-Reaction Orientation Analysis",
    focus: "Decouple spatial proximity from attack geometry",
    achievement:
      "Formulated a testable pre-reaction geometric hypothesis in which shallow-angle side-on association (<60°) reduces orientation-compatible contacts from 25.2% (1.00) to 5.2% (1.25) under the 50%-activation baseline, while 75%-activation sensitivity runs revealed coupled ordering reversal (5.25% vs. 10.72%).",
  },
];

export const modelEngineeringSections: ArticleSection[] = [
  {
    id: "dbtl-en-overview",
    title: "Overview",
    content: (
      <>
        <p>
          Engineering the non-model black yeast{" "}
          <em>Aureobasidium melanogenum</em> A08 to convert agricultural straw
          sugars into poly(β-L-malic acid) (PMA, also abbreviated PMLA) and conjugating it
          with dopamine (DA) into an underwater bioadhesive (PMA–DA) exposed
          three
          methodological bottlenecks: unannotated fungal genetics with extensive
          paralog redundancy, error-prone multi-stage laboratory record
          management, and unobservable pre-reaction polymer–dopamine coupling
          geometry. Our Model team developed five progressive computational and
          software methodologies across the DBTL cycles to guide pathway
          engineering, safeguard experimental execution, and formulate testable
          bioadhesive design rules.
        </p>
        <EngineeringBrief
          core={
            <>
              Localization-calibrated genome-scale metabolic modeling (GEM) and
              isozyme-group orthogonal screening for A08, a service-guardrailed
              and plugin-extensible experimental workbench (WetFlow), and
              orientation-resolved all-atom molecular dynamics (MD).
            </>
          }
          goal={
            <>
              Establish generalizable dry-lab methodologies that resolve
              cross-species template distortion and paralog masking in metabolic
              models, replace fragile prompt rules with architectural software
              guardrails, and decouple spatial encounter from reactive
              orientation in polymer conjugation.
            </>
          }
          integration={
            <>
              Five linked DBTL cycles connect our entire biomanufacturing pipeline:
              localization-calibrated A08 GEM → isozyme-group bottleneck
              screening → guardrailed protocol and data management → modular
              formulation and outreach plugins → pre-reaction coupling geometry
              simulation.
            </>
          }
          objectives={[
            "Establish a two-channel reconstruction and proteome-wide localization calibration method to eliminate template-induced pathway breaks in non-model fungi",
            "Formulate an isozyme-group orthogonal screening paradigm (FSEOF push × joint group-knockout essentiality) to isolate true metabolic bottlenecks amidst paralog compensation",
            "Enforce service-layer guardrails and hot-swappable Cordis domain plugins in WetFlow so experimental safety and specialized extensions never corrupt core laboratory records",
            "Decouple spatial proximity from nucleophilic attack orientation via all-atom MD to formulate a testable pre-reaction hypothesis for PMA–DA formulation",
          ]}
        />
        <p>
          Organized as five linked DBTL engineering cycles across our dry-lab
          work, each cycle addressed a distinct methodological challenge:
        </p>
        <CycleJourney items={modelCycleSummaries} />
      </>
    ),
  },
  {
    id: "dbtl-en-c1",
    title:
      "Cycle 1: Building a First-Generation Metabolic Model for an Unannotated Fungal Chassis",
    content: (
      <DbtlCycle
        number={1}
        title="Building a First-Generation Metabolic Model for an Unannotated Fungal Chassis"
        focus="Two-channel de novo reconstruction and proteome-wide localization calibration to eliminate cross-species template compartment artifacts"
        phases={[
          {
            phase: "Design",
            content: (
              <>
                <p>
                  Reconstructing a genome-scale metabolic model (GEM) for{" "}
                  <em>Aureobasidium melanogenum</em> A08 from an unannotated
                  genome assembly exposed a fundamental methodological flaw in
                  standard template-based modeling: transferring homology
                  mappings from model yeasts (<Cite k="zhang2024yeast9" />) onto
                  a distantly related fungus blindly copies template organelle
                  labels, even when key enzymes have evolved different
                  subcellular localizations. Because{" "}
                  <em>Aureobasidium</em> synthesizes PMA via a cytosolic
                  reductive pathway from pyruvate through oxaloacetate to
                  L-malate{" "}
                  <Cite
                    k={["qi2021pmla", "qi2022highmwpolymalate", "wang2020pmla"]}
                  />
                  , we designed a reconstruction methodology combining de novo
                  deep-learning gene prediction, dual-channel reaction assembly,
                  and proteome-wide subcellular localization calibration (Img.1)
                  so that compartment topology is governed by A08&apos;s own
                  signal sequences rather than yeast defaults.
                </p>
                <div className={sectionStyles.phaseMedia}>
                  <Figure
                    src="https://static.igem.wiki/teams/6147/wiki/model/01-carbotex-workflow-overview.svg"
                    alt="End-to-end technical workflow from A08 genome assembly to metabolic model reconstruction and target prioritization"
                    intrinsicWidth={2402}
                    intrinsicHeight={1106}
                    captionPrefix="Img.1"
                    caption={
                      <>
                        {" "}
                        End-to-end technical workflow for A08 metabolic model
                        reconstruction and genetic target prioritization{" "}
                      </>
                    }
                  />
                </div>
              </>
            ),
          },
          {
            phase: "Build",
            content: (
              <>
                <p>
                  We implemented this reconstruction methodology in three
                  modular stages:
                </p>
                <ul className={sectionStyles.manifest}>
                  <li>
                    <span aria-hidden="true">
                      <Check size={13} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>Ab initio fungal proteome prediction</strong>
                      <p>
                        Benchmarking ab initio predictors across reference
                        fungal genomes established ANNEVO{" "}
                        <Cite k="annevo2026" /> as matching Tiberius{" "}
                        <Cite k="gabriel2024tiberius" /> in accuracy at nearly
                        10-fold higher speed while outperforming Helixer{" "}
                        <Cite k={["stiehler2020helixer", "holst2025helixer"]} />
                        , predicting 20,089 A08 proteins (99.82% Dothideomycetes
                        completeness{" "}
                        <Cite k={["huang2023compleasm", "manni2021busco"]} />)
                        while retaining all multi-copy homologs.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span aria-hidden="true">
                      <Check size={13} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>Dual-channel draft network assembly</strong>
                      <p>
                        Following AlphaGEM <Cite k="han2026alphagem" />, we
                        intersected protein-language-model template mapping{" "}
                        <Cite
                          k={[
                            "rives2021esm1b",
                            "liu2024plmsearch",
                            "zhang2024yeast9",
                          ]}
                        />{" "}
                        with a four-tool enzyme functional ensemble{" "}
                        <Cite
                          k={[
                            "cantalapiedra2021eggnog",
                            "yu2023clean",
                            "kim2023deepectransformer",
                            "bansal2022rhea",
                          ]}
                        />{" "}
                        to capture both conserved eukaryotic backbone pathways
                        and template-independent fungal reactions.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span aria-hidden="true">
                      <Check size={13} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>
                        Proteome-wide localization calibration &amp; curation
                      </strong>
                      <p>
                        We audited N-terminal targeting peptides and subcellular
                        localization across the entire A08 proteome using
                        DeepLoc 2.1 <Cite k="odum2024deeploc21" /> and TargetP
                        2.0 <Cite k="almagro2019targetp2" /> to re-anchor 15
                        central-carbon and dicarboxylate reactions, followed by
                        homology rescue <Cite k="camacho2009blast" /> and
                        minimal-medium gap-filling.
                      </p>
                    </div>
                  </li>
                </ul>
              </>
            ),
          },
          {
            phase: "Test",
            content: (
              <>
                <p>
                  Comparing parsimonious flux balance analysis (pFBA){" "}
                  <Cite k={["orth2010fba", "lewis2010pfba"]} /> before and after
                  localization calibration exposed the template artifact and
                  verified our methodological fix (Img.2):
                </p>
                <ul className={sectionStyles.findings}>
                  <li>
                    <span
                      className={sectionStyles.findingMark}
                      aria-hidden="true"
                    ></span>
                    <div>
                      <strong>
                        Template-inherited compartment labels severed cytosolic
                        malate synthesis
                      </strong>
                      <p>
                        Inheriting default yeast mitochondrial labels left the
                        uncalibrated draft without cytosolic malate
                        dehydrogenase (cyMDH), forcing oxaloacetate from
                        cytosolic pyruvate carboxylase (PYC) through an
                        artificial{" "}
                        <MathInline
                          tex={String.raw`1.29\text{ mmol}\cdot\text{gDW}^{-1}\cdot\text{h}^{-1}`}
                        />{" "}
                        transamination and fumarate hydration detour (Img.2,
                        left).
                      </p>
                    </div>
                  </li>
                  <li>
                    <span
                      className={sectionStyles.findingMark}
                      aria-hidden="true"
                    ></span>
                    <div>
                      <strong>
                        Localization calibration restored native cytosolic flux
                      </strong>
                      <p>
                        Dual-tool localization supported that A08 cyMDH paralogs
                        lack mitochondrial transit peptides and reside in the
                        cytosol. Re-anchoring the 15 calibrated reactions
                        eliminated the{" "}
                        <MathInline
                          tex={String.raw`1.29\text{ mmol}\cdot\text{gDW}^{-1}\cdot\text{h}^{-1}`}
                        />{" "}
                        detour, restored direct cytosolic oxaloacetate
                        reduction, and raised theoretical PMA flux from{" "}
                        <MathInline tex={String.raw`1.430`} /> to{" "}
                        <MathInline
                          tex={String.raw`1.500\text{ mmol}\cdot\text{gDW}^{-1}\cdot\text{h}^{-1}`}
                        />{" "}
                        (Img.2, right), while passing MEMOTE{" "}
                        <Cite k="Lieven2020MEMOTE" /> and <em>S. pombe</em>{" "}
                        knockout benchmarks <Cite k="Kim2010Spombe" />.
                      </p>
                    </div>
                  </li>
                </ul>
                <div className={sectionStyles.phaseMedia}>
                  <Figure
                    src="https://static.igem.wiki/teams/6147/wiki/model/03b-localization-15-pulled-and-pmla-pathway.svg"
                    alt="Pathway flux before versus after localization calibration"
                    intrinsicWidth={2964}
                    intrinsicHeight={1654}
                    captionPrefix="Img.2"
                    caption={
                      <>
                        {" "}
                        Cytosolic malate pathway flux and maximum PMA flux
                        before and after localization calibration{" "}
                      </>
                    }
                  />
                </div>
              </>
            ),
          },
          {
            phase: "Learn",
            content: (
              <>
                <p>
                  Cycle 1 established a core methodological rule for non-model
                  eukaryotic GEM reconstruction: homology mapping transfers
                  catalytic function but must never blindly transfer template
                  organelle labels without proteome-wide localization auditing.
                  However, retaining all multi-copy homologs from A08&apos;s
                  duplicated genome meant that paralogous isozymes compensated
                  for one another during single-gene deletions — rendering
                  standard single-gene knockout screens blind to rate-limiting
                  steps and motivating Cycle 2.
                </p>
              </>
            ),
          },
        ]}
        insight={
          <>
            Proteome-wide localization calibration resolved the template
            compartment artifact, but multi-copy isozyme redundancy still masked
            single-gene knockouts across the network. Overcoming paralog backup
            to find the true PMA bottleneck became the priority for Cycle 2.
          </>
        }
      />
    ),
  },
  {
    id: "dbtl-en-c2",
    title:
      "Cycle 2: Pinpointing the Rate-Limiting Genetic Target in a Redundant Metabolic Network",
    content: (
      <DbtlCycle
        number={2}
        title="Pinpointing the Rate-Limiting Genetic Target in a Redundant Metabolic Network"
        focus="Isozyme-group orthogonal screening (FSEOF push × joint group-knockout essentiality) to overcome paralog compensation and bypass routes"
        phases={[
          {
            phase: "Design",
            content: (
              <>
                <p>
                  In a duplicated fungal genome{" "}
                  <Cite k="qi2022highmwpolymalate" />, conventional
                  single-metric target screens fail from two opposite directions:
                  single-gene knockouts yield false negatives because unmutated
                  paralogs buffer flux, whereas FSEOF overexpression scanning{" "}
                  <Cite k="choi2010fseof" /> yields false positives by ranking
                  terminal reactions high even when alternative cross-compartment
                  routes can bypass them. To overcome both failure modes, we
                  elevated the unit of screening from individual genes to{" "}
                  <strong>homologous isozyme groups</strong> and intersected two
                  orthogonal criteria: FSEOF overexpression sensitivity (
                  <MathInline tex={String.raw`\beta_f`} />, measuring{" "}
                  <em>flux push</em>) and joint isozyme-group knockout loss (
                  <MathInline tex={String.raw`\Delta Y_f`} />, measuring{" "}
                  <em>topological irreplaceability</em>).
                </p>
              </>
            ),
          },
          {
            phase: "Build",
            content: (
              <>
                <p>
                  We implemented the group-level orthogonal screening pipeline in
                  two stages:
                </p>
                <ul className={sectionStyles.manifest}>
                  <li>
                    <span aria-hidden="true">
                      <Check size={13} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>Homologous isozyme-group consolidation</strong>
                      <p>
                        All-vs-all sequence clustering{" "}
                        <Cite k={["buchfink2021diamond", "Tian2003Enzyme"]} />{" "}
                        grouped multi-copy paralogs across the A08 proteome and
                        filtered out growth-essential and transport reactions to
                        define 1,102 non-essential candidate enzyme groups.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span aria-hidden="true">
                      <Check size={13} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>
                        Orthogonal FSEOF &amp; joint group-knockout solvers
                      </strong>
                      <p>
                        Using COBRApy <Cite k="ebrahim2013cobrapy" /> and HiGHS{" "}
                        <Cite k="huangfu2018highs" />, we paired a 10-step FSEOF
                        solver (quantifying monotonic flux-response slope{" "}
                        <MathInline tex={String.raw`\beta_f`} />) with a joint
                        group-knockout solver that disables all paralogs in a
                        cluster simultaneously to measure PMA flux drop{" "}
                        <MathInline tex={String.raw`\Delta Y_f`} />{" "}
                        <Cite k="feng2018pycmodel" />.
                      </p>
                    </div>
                  </li>
                </ul>
              </>
            ),
          },
          {
            phase: "Test",
            content: (
              <>
                <p>
                  Evaluating all 1,102 candidate enzyme groups across both
                  dimensions resolved four distinct metabolic control regimes
                  matching the scatter classification and exposed the limitation
                  of single-metric ranking (Tab.1; Img.3):
                </p>
                <figure className={tableStyles.tableFigure}>
                  <div
                    className={tableStyles.tableScroller}
                    role="region"
                    aria-label="Three metabolic control regimes resolved by dual-metric screening across 1,102 candidate isozyme groups."
                    tabIndex={0}
                  >
                    <table>
                      <thead>
                        <tr>
                          <th scope="col">Candidate Enzyme Group</th>
                          <th scope="col">
                            FSEOF Slope <MathInline tex={String.raw`\beta_f`} />
                          </th>
                          <th scope="col">
                            Knockout PMA Loss{" "}
                            <MathInline tex={String.raw`\Delta Y_f`} />
                          </th>
                          <th scope="col">
                            Metabolic Role &amp; Screening Outcome
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <strong>Cytosolic MDH</strong> (<code>cyMDH</code>)
                          </td>
                          <td>1.013 (Rank 1)</td>
                          <td>−4.7% (Rank 10)</td>
                          <td>
                            Terminal reduction step; bypassed by
                            cross-compartment malate routes upon deletion
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Upper Glycolysis &amp; PPP</strong>
                            <br />
                            <small>PFK, FBA, G6PDH, PGL, RPI, RPE</small>
                          </td>
                          <td>Non-monotonic (NA)</td>
                          <td>−23.8% to −30.2% (Ranks 2–7)</td>
                          <td>
                            KO-only upstream supply; essential for carbon entry
                            but non-monotonic under enforced PMA push
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Lower Glycolytic Backbone</strong>
                            <br />
                            <small>PYK, ENO, PGM, PGK, GAPDH</small>
                          </td>
                          <td>0.479 to 0.553 (Ranks 6–10)</td>
                          <td>−4.7% to −11.5% (Ranks 8–10)</td>
                          <td>
                            Dual-responsive glycolytic trunk; moderate knockout
                            impact due to glycolytic/bypass buffering
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>
                              Cytosolic <code>PYC</code>
                            </strong>
                          </td>
                          <td>
                            <strong>0.687 (Rank 4)</strong>
                          </td>
                          <td>
                            <strong>−58.6% (Rank 1)</strong>
                          </td>
                          <td>
                            <strong>
                              Primary C3→C4 anaplerotic bottleneck; sole group
                              in the dual-optimal quadrant
                            </strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <Caption prefix="Tab.1">
                    Four metabolic control regimes resolved by dual-metric
                    screening across 1,102 candidate isozyme groups.
                  </Caption>
                </figure>
                <div className={sectionStyles.phaseMedia}>
                  <Figure
                    src="https://static.igem.wiki/teams/6147/wiki/model/04-candidate-family-funnel-and-pyc-dual-rankings.svg"
                    alt="Two-dimensional target prioritization across candidate isozyme groups"
                    intrinsicWidth={2923}
                    intrinsicHeight={1832}
                    captionPrefix="Img.3"
                    caption={
                      <>
                        {" "}
                        FSEOF overexpression slope versus joint-knockout PMA
                        flux loss across 1,102 candidate enzyme groups{" "}
                      </>
                    }
                  />
                </div>
              </>
            ),
          },
          {
            phase: "Learn",
            content: (
              <>
                <p>
                  Cycle 2 demonstrated why metabolic target discovery in
                  duplicated eukaryotic genomes requires intersecting group-level
                  overexpression push with joint knockout essentiality: FSEOF
                  alone would have misdirected wet-lab cloning toward cyMDH,
                  whose deletion is buffered by cross-compartment bypasses.
                  Isolating cytosolic PYC as the sole target in the dual-optimal
                  quadrant provided genome-scale mechanistic support for our
                  team&apos;s ongoing PYC overexpression engineering and defined
                  enzyme-constrained modeling as our next refinement step.
                </p>
              </>
            ),
          },
        ]}
        insight={
          <>
            Combining FSEOF sensitivity with joint isozyme-group knockout
            bypassed paralog masking and supported cytosolic PYC as the primary
            anaplerotic target. In parallel, as wet-lab fermentation and
            adhesive experiments scaled up, preventing cross-project protocol
            and data errors motivated the WetFlow workbench in Cycle 3.
          </>
        }
      />
    ),
  },
  {
    id: "dbtl-en-c3",
    title:
      "Cycle 3: Safeguarding Multi-Stage Biomanufacturing Protocols and Experimental Records",
    content: (
      <DbtlCycle
        number={3}
        title="Safeguarding Multi-Stage Biomanufacturing Protocols and Experimental Records"
        focus="Shifting experimental agent safety from fragile prompt instructions to architectural service-layer guardrails"
        phases={[
          {
            phase: "Design",
            content: (
              <>
                <p>
                  When we deployed general-purpose coding agents (OpenCode and
                  Claude Code) to coordinate A08
                  fermentation and PMA–DA synthesis records, we uncovered a
                  structural limitation of prompt-only LLM workflows: conversational
                  instructions cannot prevent an agent from mixing SOPs across
                  projects, overwriting wet-lab measurements with literature
                  values, or skipping human review.
                  We therefore designed <strong>WetFlow</strong> around a
                  service-layer guardrail methodology — shifting safety
                  enforcement out of fragile prompts and into database and
                  state-machine constraints (Img.4).
                </p>
                <div className={sectionStyles.phaseMedia}>
                  <Figure
                    src="https://static.igem.wiki/teams/6147/wiki/model/fig-1-1-wetflow-architecture.svg"
                    alt="WetFlow modular architecture and researcher-controlled workflow"
                    intrinsicWidth={3130}
                    intrinsicHeight={1514}
                    captionPrefix="Img.4"
                    caption={
                      <>
                        {" "}
                        WetFlow modular system architecture and
                        researcher-controlled workflow{" "}
                      </>
                    }
                  />
                </div>
              </>
            ),
          },
          {
            phase: "Build",
            content: (
              <>
                <p>
                  We embedded three hard guardrails directly into the core
                  service layer:
                </p>
                <ul className={sectionStyles.manifest}>
                  <li>
                    <span aria-hidden="true">
                      <Check size={13} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>Context-isolated evidence store</strong>
                      <p>
                        A SQLite store partitions imported SOPs into
                        project-scoped, source-tagged chunks so retrieval queries
                        can never leak protocols across experiments.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span aria-hidden="true">
                      <Check size={13} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>Dimension-checked measurement logger</strong>
                      <p>
                        Database write schemas enforce explicit physical units
                        and plausible bounds at the storage boundary, rejecting
                        valueless or unit-mismatched agent writes before they
                        reach disk.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span aria-hidden="true">
                      <Check size={13} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>Researcher-gated workflow state machine</strong>
                      <p>
                        Across the six experimental stages (Design through
                        Decide), state transitions pause as pending proposals
                        until explicitly approved by a researcher.
                      </p>
                    </div>
                  </li>
                </ul>
              </>
            ),
          },
          {
            phase: "Test",
            content: (
              <>
                <p>
                  We tested these architectural guardrails against both
                  adversarial write injections and a 30-question
                  biological-evidence benchmark:
                </p>
                <ul
                  className={[
                    sectionStyles.findings,
                    sectionStyles.findingsPositive,
                  ].join(" ")}
                >
                  <li>
                    <span
                      className={sectionStyles.findingMark}
                      aria-hidden="true"
                    >
                      <Check size={13} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>
                        Zero cross-project leakage and 100% invalid-write
                        interception
                      </strong>
                      <p>
                        Round-trip project switching preserved exact
                        project-scoped SOP citations without cross-contamination,
                        unit-mismatched or valueless measurement writes were
                        100% blocked at the schema boundary, and unapproved
                        multi-stage jumps were rejected by the state machine
                        (Img.5).
                      </p>
                    </div>
                  </li>
                </ul>
                <div className={sectionStyles.phaseMedia}>
                  <Figure
                    src="https://static.igem.wiki/teams/6147/wiki/model/fig-1-3-measurement-checks.avif"
                    alt="Sequential measurement write validation tests"
                    intrinsicWidth={2880}
                    intrinsicHeight={1180}
                    captionPrefix="Img.5"
                    caption={
                      <>
                        {" "}
                        Measurement write unit and format validation
                        results{" "}
                      </>
                    }
                  />
                </div>
                <ul
                  className={[
                    sectionStyles.findings,
                    sectionStyles.findingsPositive,
                  ].join(" ")}
                >
                  <li>
                    <span
                      className={sectionStyles.findingMark}
                      aria-hidden="true"
                    >
                      <Check size={13} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>
                        Eliminating execution failures on the 30-question
                        evidence benchmark
                      </strong>
                      <p>
                        WetFlow cleanly separated our wet lab&apos;s rapid
                        PMA–DA schedule from Tang et al.&apos;s literature
                        reference protocol <Cite k="Tang2020PMLADA" /> and
                        achieved 28/30 (93.3%) benchmark accuracy with zero
                        execution failures, outperforming the OpenCode baseline
                        at 21/30 (70.0%) under the identical model backend
                        (Tab.2).
                      </p>
                    </div>
                  </li>
                </ul>
                <figure className={tableStyles.tableFigure}>
                  <div
                    className={tableStyles.tableScroller}
                    role="region"
                    aria-label="WetFlow versus OpenCode baseline on the 30-question biological-evidence benchmark"
                    tabIndex={0}
                  >
                    <table>
                      <thead>
                        <tr>
                          <th scope="col">System</th>
                          <th scope="col">Accuracy</th>
                          <th scope="col">Score</th>
                          <th scope="col">
                            Execution &amp; Classification Breakdown
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <strong>WetFlow</strong>
                          </td>
                          <td>
                            <strong>93.3%</strong>
                          </td>
                          <td>
                            <strong>28 / 30</strong>
                          </td>
                          <td>0 execution failures, 2 label errors</td>
                        </tr>
                        <tr>
                          <td>OpenCode</td>
                          <td>70.0%</td>
                          <td>21 / 30</td>
                          <td>6 execution failures, 3 label errors</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <Caption prefix="Tab.2">
                    WetFlow versus OpenCode baseline on the 30-question
                    biological-evidence benchmark
                  </Caption>
                </figure>
              </>
            ),
          },
          {
            phase: "Learn",
            content: (
              <>
                <p>
                  Cycle 3 proved that reliable laboratory AI requires enforcing
                  context isolation, unit validation, and human approval at the
                  service layer rather than in conversational prompts, while a
                  shared benchmark miss taught us to separate measured values,
                  assay methods, and verification status in the schema. With the
                  core host secured, our formulation and outreach teams needed
                  specialized domain tools without bloating the core kernel,
                  motivating Cycle 4.
                </p>
              </>
            ),
          },
        ]}
        insight={
          <>
            Service-layer guardrails secured core SOP retrieval and measurement
            logging, but hardcoding team-specific analytics into the host risked
            database coupling. We needed a hot-swappable plugin architecture to
            support formulation verification and classroom outreach in Cycle 4.
          </>
        }
      />
    ),
  },
  {
    id: "dbtl-en-c4",
    title:
      "Cycle 4: Scaling the Workbench to Adhesive Recipe Verification and Classroom Outreach",
    content: (
      <DbtlCycle
        number={4}
        title="Scaling the Workbench to Adhesive Recipe Verification and Classroom Outreach"
        focus="Microkernel host and hot-swappable Cordis domain plugins decoupling specialized analytics from core laboratory state"
        phases={[
          {
            phase: "Design",
            content: (
              <>
                <p>
                  As our formulation and education teams requested specialized
                  capabilities—auditing multi-ratio PMA–DA coupling summaries
                  and generating primary-school outreach lesson plans—hardcoding
                  task-specific scripts into the core workbench risked
                  duplicating database connections and polluting global state.
                  Built on the Cordis dependency-injection framework{" "}
                  <Cite k="Shi2026Cordis" />
                  , we designed a microkernel-and-plugin methodology: each
                  domain workflow mounts as an isolated, hot-swappable plugin
                  that consumes the shared evidence service and cleanly unmounts
                  its tools without disturbing active laboratory sessions.
                </p>
              </>
            ),
          },
          {
            phase: "Build",
            content: (
              <>
                <p>
                  On top of the four core workbench services (Evidence,
                  Research, Modeling, and Experiment), we built two
                  dependency-injected domain plugins:
                </p>
                <ul className={sectionStyles.manifest}>
                  <li>
                    <span aria-hidden="true">
                      <Check size={13} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>Baseline-locked formulation audit plugin</strong>
                      <p>
                        Verifies that already-generated multi-ratio MD summary
                        reports share an identical carboxyl activation baseline
                        and trajectory window before comparing contact
                        fractions, bringing completed MD results back into
                        formulation discussions.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span aria-hidden="true">
                      <Check size={13} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>Evidence-bound WEAVE outreach plugin</strong>
                      <p>
                        Queries structured outreach experience cards in the
                        shared evidence store to assemble primary-school lesson
                        briefs around our five-step WEAVE pedagogy (Wonder,
                        Explore, Action, Verify, and Echo).
                      </p>
                    </div>
                  </li>
                </ul>
              </>
            ),
          },
          {
            phase: "Test",
            content: (
              <>
                <p>
                  Runtime lifecycle testing confirmed lossless hot-swapping
                  (unloading and restoring domain tools with zero session drop;
                  Img.6) and accurate formulation baseline checks, while our
                  first primary-school DNA lesson test exposed two design flaws
                  in the outreach generator:
                </p>
                <ul className={sectionStyles.findings}>
                  <li>
                    <span
                      className={sectionStyles.findingMark}
                      aria-hidden="true"
                    ></span>
                    <div>
                      <strong>
                        Unbound activity citations in generated lesson briefs
                      </strong>
                      <p>
                        Early generated lesson briefs lacked consistent source
                        citations for retrieved outreach cases and activity
                        adaptations, making it harder for educators to trace
                        pedagogical provenance.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span
                      className={sectionStyles.findingMark}
                      aria-hidden="true"
                    ></span>
                    <div>
                      <strong>
                        Rigid five-stage time slicing in a 30-minute class
                      </strong>
                      <p>
                        Mechanically splitting 30 minutes across all five WEAVE
                        stages compressed classroom implementation time,
                        conflicting with our pedagogy where Verify and Echo
                        occur post-class.
                      </p>
                    </div>
                  </li>
                </ul>
                <div className={sectionStyles.phaseMedia}>
                  <Figure
                    src="https://static.igem.wiki/teams/6147/wiki/model/wetflow-plugin-remove-restore.webp"
                    alt="Dynamic plugin removal and restoration"
                    intrinsicWidth={640}
                    intrinsicHeight={478}
                    captionPrefix="Img.6"
                    caption={
                      <>
                        {" "}
                        Dynamic unloading and restoration of the Modeling
                        plugin{" "}
                      </>
                    }
                  />
                </div>
              </>
            ),
          },
          {
            phase: "Learn",
            content: (
              <>
                <p>
                  Because the outreach logic was isolated inside a hot-swappable
                  plugin, we fixed both defects without touching the core host
                  (Img.7): we provided accurate source citations for retrieved
                  outreach cases and generated lesson briefs, and dedicated the
                  30-minute window to full classroom implementation while
                  keeping Verify and Echo as post-class assessment modules.
                  Meanwhile, to investigate the molecular mechanism behind the
                  coupling summaries audited in the workbench, Cycle 5 details
                  our explicit-solvent MD simulations of PMA–DA conjugation.
                </p>
                <div className={sectionStyles.phaseMedia}>
                  <Figure
                    src="https://static.igem.wiki/teams/6147/wiki/model/fig-1-9-education-weave.avif"
                    alt="Output of the refined Education plugin"
                    intrinsicWidth={3600}
                    intrinsicHeight={2125}
                    captionPrefix="Img.7"
                    caption={
                      <>
                        {" "}
                        Refined Education plugin primary-school DNA outreach
                        lesson brief{" "}
                      </>
                    }
                  />
                </div>
              </>
            ),
          },
        ]}
        insight={
          <>
            Modular Cordis plugins equipped our formulation and outreach teams
            with traceable tools while keeping the core workbench lightweight.
            To examine the atomic-scale interactions underlying the coupling
            summaries audited by our formulation plugin, Cycle 5 details our
            all-atom MD investigation of PMA–dopamine conjugation.
          </>
        }
      />
    ),
  },
  {
    id: "dbtl-en-c5",
    title:
      "Cycle 5: Investigating High-Dosing Coupling Loss to Guide Bioadhesive Formulation",
    content: (
      <DbtlCycle
        number={5}
        title="Investigating High-Dosing Coupling Loss to Guide Bioadhesive Formulation"
        focus="Pre-reaction geometric analysis decoupling spatial encounter frequency from Bürgi–Dunitz attack orientation in explicit-solvent MD"
        phases={[
          {
            phase: "Design",
            content: (
              <>
                <p>
                  In Tang et al.&apos;s published EDC/NHS coupling series of PMA
                  with dopamine, grafted dopamine content in the purified
                  product peaked at <strong>21.3 wt% at equimolar 1.00</strong>{" "}
                  but <strong>dropped to 19.2 wt% at 1.25</strong>{" "}
                  <Cite k="Tang2020PMLADA" /> (whereas our wet-lab team
                  synthesized broth-derived PMA–DA at a 1:1 baseline ratio).
                  Conventional collision-frequency intuition cannot explain why
                  adding more nucleophile lowers
                  yield, because amide bond formation requires not just spatial
                  proximity (
                  <MathInline tex={String.raw`d_{\text{N–C}} < 4\text{ Å}`} />)
                  but also a Bürgi–Dunitz nucleophilic attack angle near{" "}
                  <MathInline tex={String.raw`107^\circ`} />{" "}
                  <Cite k="Rodriguez2023Approach" />. We therefore designed an
                  explicit-solvent all-atom MD methodology that decouples{" "}
                  <strong>spatial encounter frequency</strong> from{" "}
                  <strong>reaction-compatible orientation</strong> across five
                  molar ratios and three carboxyl-activation levels (Img.8) to
                  formulate a testable pre-reaction molecular hypothesis.
                </p>
                <div className={sectionStyles.phaseMedia}>
                  <Figure
                    src="https://static.igem.wiki/teams/6147/wiki/model/fig-3-2-md-workflow.svg"
                    alt="Five-ratio aqueous simulation setup and pre-reactive approach geometry schematic"
                    intrinsicWidth={2926}
                    intrinsicHeight={2052}
                    captionPrefix="Img.8"
                    caption={
                      <>
                        {" "}
                        Five-ratio aqueous simulation setup and pre-reactive
                        nucleophilic approach geometry schematic{" "}
                      </>
                    }
                  />
                </div>
              </>
            ),
          },
          {
            phase: "Build",
            content: (
              <>
                <p>
                  Our pre-reaction geometric analysis pipeline comprised two
                  modules:
                </p>
                <ul className={sectionStyles.manifest}>
                  <li>
                    <span aria-hidden="true">
                      <Check size={13} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>
                        Controlled multi-ratio &amp; activation-sensitivity boxes
                      </strong>
                      <p>
                        Using OpenMM <Cite k="Eastman2017OpenMM" /> with GAFF2
                        and AM1-BCC charges{" "}
                        <Cite k="Jakalian2002AM1BCC" />,
                        we constructed explicit TIP3P water boxes across all
                        five experimental dopamine-to-carboxyl molar ratios (0.25
                        to 1.25) at a shared 50% NHS-ester activation baseline,
                        paired with 25% and 75% activation sensitivity runs.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span aria-hidden="true">
                      <Check size={13} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>
                        Three-tier pre-reaction geometric classifier
                      </strong>
                      <p>
                        Rather than counting raw collisions, our classifier
                        decomposes every close contact (
                        <MathInline
                          tex={String.raw`d_{\text{N–C}} < 4\text{ Å}`}
                        />
                        ) into reaction-compatible attack windows (
                        <MathInline tex={String.raw`95^\circ\text{–}125^\circ`} />
                        ) versus shallow side-on states (
                        <MathInline tex={String.raw`<60^\circ`} />), tallies
                        amine–carbonyl hydrogen-bond candidate geometries, and
                        computes Lennard-Jones (LJ) angular projections.
                      </p>
                    </div>
                  </li>
                </ul>
              </>
            ),
          },
          {
            phase: "Test",
            content: (
              <>
                <ul
                  className={[
                    sectionStyles.findings,
                    sectionStyles.findingsPositive,
                  ].join(" ")}
                >
                  <li>
                    <span
                      className={sectionStyles.findingMark}
                      aria-hidden="true"
                    >
                      <Check size={13} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>
                        Decoupling proximity from attack orientation under the
                        50%-activation baseline
                      </strong>
                      <p>
                        Between molar ratios 1.00 and 1.25, total close-contact
                        encounters remained nearly unchanged, yet
                        orientation-compatible contacts dropped nearly five-fold
                        from 25.2% to 5.2% as 82.7% of close contacts at 1.25
                        shifted into the{" "}
                        <MathInline tex={String.raw`<60^\circ`} /> shallow
                        side-on regime (Img.9A–D).
                      </p>
                    </div>
                  </li>
                  <li>
                    <span
                      className={sectionStyles.findingMark}
                      aria-hidden="true"
                    >
                      <Check size={13} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>
                        Local side-on trapping versus bulk aggregation
                      </strong>
                      <p>
                        Representative 3D conformational poses (Img.10A–B) and
                        local interaction statistics (Img.10C–D) showed that at
                        1.25, dopamine shifts from an open attack pose (
                        <MathInline tex={String.raw`112.1^\circ`} />) to a
                        side-on pose (<MathInline tex={String.raw`46.3^\circ`} />
                        ), while a sign-reversed catechol-OH Lennard-Jones
                        angular projection (
                        <MathInline
                          tex={String.raw`+6.54 \to -5.73\text{ kJ}\cdot\text{mol}^{-1}\cdot\text{rad}^{-1}`}
                        />
                        ) and higher amine–carbonyl hydrogen-bond candidate
                        geometry (32.9% vs. 17.5%) oppose rotation into the{" "}
                        <MathInline tex={String.raw`95^\circ\text{–}125^\circ`} />{" "}
                        attack window, whereas bulk dopamine self-clustering
                        (~4.5%) and site saturation remained low within this
                        single-trajectory classical window.
                      </p>
                    </div>
                  </li>
                </ul>
                <FigurePair>
                  <Figure
                    src="https://static.igem.wiki/teams/6147/wiki/model/fig-3-3-a.svg"
                    alt="Total close contacts and orientation-compatible contacts across five molar ratios"
                    intrinsicWidth={384}
                    intrinsicHeight={303}
                    captionPrefix="Img.9A"
                    caption={
                      <>
                        {" "}
                        Total close contacts (
                        <MathInline tex={String.raw`<4\text{ Å}`} />) and
                        orientation-compatible contacts (
                        <MathInline
                          tex={String.raw`95^\circ\text{–}125^\circ`}
                        />
                        ) across five molar ratios{" "}
                      </>
                    }
                  />
                  <Figure
                    src="https://static.igem.wiki/teams/6147/wiki/model/fig-3-3-b.svg"
                    alt="Orientation-compatible fraction across five molar ratios"
                    intrinsicWidth={378}
                    intrinsicHeight={303}
                    captionPrefix="Img.9B"
                    caption={
                      <>
                        {" "}
                        Orientation-compatible fraction (%) of close contacts
                        across five molar ratios{" "}
                      </>
                    }
                  />
                </FigurePair>
                <FigurePair>
                  <Figure
                    src="https://static.igem.wiki/teams/6147/wiki/model/fig-3-3-c.svg"
                    alt="Distance–angle scatter distribution of individual close-contact pair-frames"
                    intrinsicWidth={392}
                    intrinsicHeight={303}
                    captionPrefix="Img.9C"
                    caption={
                      <>
                        {" "}
                        Distance–angle scatter distribution of individual
                        close-contact pair-frames at molar ratios 1.00 and
                        1.25{" "}
                      </>
                    }
                  />
                  <Figure
                    src="https://static.igem.wiki/teams/6147/wiki/model/fig-3-3-d.svg"
                    alt="Distribution of approach-angle regimes across molar ratios"
                    intrinsicWidth={385}
                    intrinsicHeight={303}
                    captionPrefix="Img.9D"
                    caption={
                      <>
                        {" "}
                        Distribution of approach-angle regimes across{" "}
                        <MathInline tex={String.raw`<60^\circ`} />,
                        intermediate, and{" "}
                        <MathInline
                          tex={String.raw`95^\circ\text{–}125^\circ`}
                        />{" "}
                        windows{" "}
                      </>
                    }
                  />
                </FigurePair>
                <FigurePair>
                  <Figure
                    src="https://static.igem.wiki/teams/6147/wiki/model/fig-3-4-a.svg"
                    alt="Representative pre-reactive 3D approach pose at molar ratio 1.00"
                    intrinsicWidth={342}
                    intrinsicHeight={404}
                    captionPrefix="Img.10A"
                    caption={
                      <>
                        {" "}
                        Representative pre-reactive 3D approach pose at molar
                        ratio 1.00 (
                        <MathInline tex={String.raw`4.06\text{ ns}`} />,{" "}
                        <MathInline
                          tex={String.raw`d_{\text{N–C}}\approx 3.8\text{ Å}`}
                        />
                        , <MathInline tex={String.raw`112.1^\circ`} />){" "}
                      </>
                    }
                  />
                  <Figure
                    src="https://static.igem.wiki/teams/6147/wiki/model/fig-3-4-b.svg"
                    alt="Representative pre-reactive 3D side-on pose at molar ratio 1.25"
                    intrinsicWidth={335}
                    intrinsicHeight={404}
                    captionPrefix="Img.10B"
                    caption={
                      <>
                        {" "}
                        Representative pre-reactive 3D side-on pose at molar
                        ratio 1.25 (
                        <MathInline tex={String.raw`4.16\text{ ns}`} />,{" "}
                        <MathInline
                          tex={String.raw`d_{\text{N–C}}\approx 3.8\text{ Å}`}
                        />
                        , <MathInline tex={String.raw`46.3^\circ`} />){" "}
                      </>
                    }
                  />
                </FigurePair>
                <FigurePair>
                  <Figure
                    src="https://static.igem.wiki/teams/6147/wiki/model/fig-3-5-b.svg"
                    alt="Functional-group Lennard-Jones generalized angular projections in shallow-angle contacts"
                    intrinsicWidth={385}
                    intrinsicHeight={303}
                    captionPrefix="Img.10C"
                    caption={
                      <>
                        {" "}
                        Functional-group Lennard-Jones generalized angular
                        projections in shallow-angle contacts (
                        <MathInline tex={String.raw`<60^\circ`} />){" "}
                      </>
                    }
                  />
                  <Figure
                    src="https://static.igem.wiki/teams/6147/wiki/model/fig-3-5-d.svg"
                    alt="Local amine-carbonyl H-bond candidate fraction and bulk dopamine self-clustering"
                    intrinsicWidth={385}
                    intrinsicHeight={303}
                    captionPrefix="Img.10D"
                    caption={
                      <>
                        {" "}
                        Local amine–carbonyl H-bond candidate fraction and bulk
                        dopamine self-clustering at molar ratios 1.00 and
                        1.25{" "}
                      </>
                    }
                  />
                </FigurePair>
              </>
            ),
          },
          {
            phase: "Learn",
            content: (
              <>
                <p>
                  Cycle 5 established a pre-reaction geometric methodology that
                  generates a <strong>testable conditional hypothesis</strong>{" "}
                  rather than an unverified causal claim: under the
                  50%-activation baseline, backbone-mediated side-on association
                  biases excess dopamine away from the Bürgi–Dunitz attack
                  cone, whereas 75%-activation sensitivity runs reversed the
                  compatible-contact ordering between ratios 1.00 and 1.25
                  (5.25% versus 10.72%). Because this single-trajectory
                  classical model is non-reactive, discovering that carboxyl
                  activation fraction and dopamine dosing are coupled variables
                  directly guides our next dry–wet iteration to co-measure actual
                  NHS-ester conversion, conjugation degree, and underwater
                  lap-shear adhesion.
                </p>
              </>
            ),
          },
        ]}
        insight={
          <>
            Pre-reactive orientation—governed jointly by carboxyl activation
            fraction and dopamine dosing—provides a testable molecular
            hypothesis for the equimolar 1:1 coupling peak. Co-measuring actual
            NHS-ester conversion, conjugation degree, and lap-shear adhesion
            defines our next dry–wet iteration.
          </>
        }
      />
    ),
  },
  {
    id: "dbtl-en-summary",
    title: "Engineering Cycle Summary",
    content: (
      <>
        <p>
          Across five DBTL iterations, our dry-lab engineering progressed by
          replacing ad hoc trial-and-error with five generalizable methodologies
          spanning metabolic reconstruction, target prioritization, laboratory
          AI safety, modular software architecture, and pre-reactive molecular
          simulation:
        </p>
        <section
          className={[sectionStyles.scope, sectionStyles.summary].join(" ")}
        >
          <div className={sectionStyles.summaryHeader}>
            <h3>
              Five methodological paradigms connecting A08 chassis modeling,
              safe laboratory execution, and bioadhesive formulation
            </h3>
          </div>
          <ol>
            <li>
              <span>Correct cross-species template compartment transfer</span>
              <h4>Cycle 1: Localization-Calibrated GEM</h4>
              <p>
                Established a two-channel reconstruction and proteome-wide
                localization calibration workflow for the unannotated fungus
                A08, eliminating the 1.29 mmol·gDW⁻¹·h⁻¹ pathway detour caused
                by inherited yeast organelle labels and raising theoretical PMA
                flux from 1.430 to 1.500 mmol·gDW⁻¹·h⁻¹.
              </p>
            </li>
            <li>
              <span>Overcome paralog masking in a duplicated genome</span>
              <h4>Cycle 2: Orthogonal Group Screening</h4>
              <p>
                Shifted target screening from individual genes to homologous
                isozyme groups and intersected FSEOF overexpression push with
                joint group-knockout essentiality — filtering out bypassable
                cyMDH (−4.7% loss) and isolating cytosolic PYC (Rank 4 FSEOF,
                Rank 1 group KO at −58.6% loss) to support our PYC
                overexpression engineering.
              </p>
            </li>
            <li>
              <span>Replace fragile prompts with architectural constraints</span>
              <h4>Cycle 3: Service-Layer Guardrails</h4>
              <p>
                Moved experimental safety rules from prompt instructions into
                SQLite and state-machine service guardrails — enforcing
                project-isolated SOP retrieval, unit-validated measurement
                logging, and researcher-gated transitions to reach 28/30 (93.3%)
                benchmark accuracy versus 21/30 (70.0%) for OpenCode.
              </p>
            </li>
            <li>
              <span>Decouple specialized analytics from the core host</span>
              <h4>Cycle 4: Hot-Swappable Domain Plugins</h4>
              <p>
                Extended the workbench via dependency-injected Cordis plugins
                that hot-swap cleanly without polluting core state — automating
                baseline-verified adhesive coupling checks and source-cited
                30-minute WEAVE classroom lesson generation.
              </p>
            </li>
            <li>
              <span>Decouple spatial proximity from attack geometry</span>
              <h4>Cycle 5: Pre-Reaction Orientation Analysis</h4>
              <p>
                Formulated a testable pre-reaction geometric hypothesis in which
                shallow-angle side-on association (&lt;60°) reduces
                orientation-compatible contacts from 25.2% (1.00) to 5.2% (1.25)
                under the 50%-activation baseline, while 75%-activation
                sensitivity runs revealed coupled ordering reversal (5.25% vs.
                10.72%).
              </p>
            </li>
          </ol>
        </section>
      </>
    ),
  },
];

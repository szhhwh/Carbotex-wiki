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

export const modelEngineeringReferenceOrder = [
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
  "zhang2024yeast9",
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
  "OpenCodeDocs",
  "ClaudeCodeOverview",
  "Tang2020PMLADA",
  "DeepSeekHarnessArchitecture",
  "cordisFramework",
  "Shi2026Cordis",
  "Rodriguez2023Approach",
  "Eastman2017OpenMM",
  "AmberForceFields",
  "Jakalian2002AM1BCC",
];

const modelCycleSummaries: CycleSummaryItem[] = [
  {
    id: "dbtl-en-c1",
    title: "First-Generation Fungal GEM",
    focus: "Reconstruct A08 network to guide pathway design",
    achievement:
      "Selected ANNEVO for 10-fold faster fungal gene prediction to build a 3,500-reaction draft model, uncovered a 1.29 mmol·gDW⁻¹·h⁻¹ detour caused by inherited Yeast9 organelle labels, and calibrated 15 reactions via DeepLoc 2.1 and TargetP 2.0 to restore direct cytosolic malate synthesis and raise theoretical PMLA flux from 1.430 to 1.500 mmol·gDW⁻¹·h⁻¹ — establishing a reliable in silico chassis to guide wet-lab strain engineering.",
  },
  {
    id: "dbtl-en-c2",
    title: "Rate-Limiting Target Screen",
    focus: "Isolate bottleneck amidst isozyme redundancy",
    achievement:
      "Demonstrated that top-FSEOF candidate cyMDH loses only 4.7% PMLA flux upon group deletion due to alternative pathways, whereas cytosolic PYC uniquely occupies the dual-optimal quadrant with FSEOF Rank #4 and candidate knockout Rank #1 at −58.6% flux loss — providing our wet-lab team with a high-confidence overexpression target.",
  },
  {
    id: "dbtl-en-c3",
    title: "Protocol & Record Guardrails",
    focus: "Prevent SOP mix-ups and invalid data writes",
    achievement:
      "Eliminated cross-project SOP mix-ups, unit-mismatched database writes, and unapproved workflow jumps while achieving 28/30 or 93.3% accuracy on the biological-evidence benchmark versus 21/30 for the OpenCode baseline — safeguarding daily fermentation and bioadhesive synthesis records.",
  },
  {
    id: "dbtl-en-c4",
    title: "Modular Domain Plugins",
    focus: "Equip formulation and outreach workflows",
    achievement:
      "Verified lossless 26 to 35 tool hot-swapping and automated coupling-ratio checks, while restoring document-chunk citation traceability and dedicating the full 30-minute classroom schedule to hands-on Action — empowering both our formulation and education teams without disrupting core record management.",
  },
  {
    id: "dbtl-en-c5",
    title: "Bioadhesive Coupling Simulation",
    focus: "Investigate high-dosing loss to guide recipe",
    achievement:
      "Formulated a conditional pre-reaction hypothesis under the 50%-activation main model where reaction-compatible contacts drop from 25.2% at equimolar 1.00 to 5.2% at 1.25 due to shallow-angle side-on association, while 75%-activation sensitivity runs revealed a coupled relationship between carboxyl activation and dopamine dosing — helping our wet-lab team interpret the 1:1 dosing optimum and design next-stage adhesive formulation experiments.",
  },
];

export const modelEngineeringSections: ArticleSection[] = [
  {
    id: "dbtl-en-overview",
    title: "Overview",
    content: (
      <>
        <p>
          In the biomanufacturing of poly(β-L-malic acid) (PMLA) from
          agricultural straw sugars using the non-model black yeast{" "}
          <em>Aureobasidium melanogenum</em> A08 and its downstream chemical
          conjugation with dopamine (DA) into an underwater bioadhesive
          (PMLA–DA), relying on trial-and-error laboratory experiments alone
          faces unannotated fungal genetics, error-prone multi-stage protocols,
          and unobservable molecular interactions. Our Model team task was to
          build an integrated computational and software system that guides
          high-yield microbial pathway engineering, safeguards laboratory
          protocol and measurement management, and optimizes downstream
          bioadhesive synthesis.
        </p>
        <EngineeringBrief
          core={
            <>
              De novo genome-scale metabolic modeling reconstructs intracellular
              carbon flux in <em>Aureobasidium melanogenum</em> A08, a
              guardrail-enforced software workbench manages experimental
              protocols and data, and all-atom molecular dynamics simulates
              pre-reaction polymer–dopamine coupling.
            </>
          }
          goal={
            <>
              Build a predictive fungal metabolic model, a scientist-supervised
              experimental workbench, and an atomic-scale reaction simulation —
              to guide wet-lab metabolic engineering for higher PMLA yield,
              eliminate protocol and data-recording errors, and optimize
              underwater bioadhesive synthesis.
            </>
          }
          integration={
            <>
              A unified computational and software framework connects all
              dry-lab modules to support our experimental pipeline across the
              entire workflow: A08 metabolic network modeling → genetic target
              screening → controlled fermentation and protocol execution →
              PMLA–DA bioadhesive formulation.
            </>
          }
          objectives={[
            "Reconstruct and calibrate a metabolic model of the unannotated fungus A. melanogenum A08 to guide wet-lab pathway engineering for PMLA biosynthesis",
            "Screen homologous enzyme groups across the A08 metabolic network to identify the primary rate-limiting genetic target and avoid wasted cloning on redundant genes",
            "Enforce project-isolated SOP retrieval, unit-validated measurement logging, and modular plugin extensions in WetFlow to ensure reliable experimental execution and science outreach",
            "Simulate five dopamine-to-carboxyl molar ratios via all-atom molecular dynamics to formulate a pre-reaction hypothesis for high-dosing coupling loss and guide wet-lab bioadhesive formulation",
          ]}
        />
        <p>
          We followed the iGEM Engineering Cycle framework — Design, Build,
          Test, Learn (DBTL) — across five iterations. Each cycle addressed
          specific limitations identified in the previous one, progressively
          building an end-to-end dry-lab platform that reconstructs the A08
          metabolic network, pinpoints the primary genetic target for PMLA
          overproduction, enforces reliable experimental record management, and
          guides the rational formulation of our PMLA–DA underwater
          bioadhesive.{" "}
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
        focus="De novo metabolic network reconstruction and subcellular localization calibration from the unannotated A. melanogenum A08 genome"
        phases={[
          {
            phase: "Design",
            content: (
              <>
                <p>
                  To guide metabolic engineering for higher PMLA yield in{" "}
                  <em>Aureobasidium melanogenum</em> A08, we first needed a
                  genome-scale metabolic model (GEM) to simulate intracellular
                  carbon flux. At the start of modeling, only a raw genome
                  assembly was available, with no curated gene annotation,
                  RNA-seq data, or existing metabolic network for this non-model
                  fungus. Because <em>Aureobasidium</em> synthesizes PMLA
                  monomers via a cytosolic reductive pathway from pyruvate
                  through oxaloacetate to L-malate{" "}
                  <Cite
                    k={["qi2021pmla", "qi2022highmwpolymalate", "wang2020pmla"]}
                  />
                  , we designed a de novo reconstruction workflow combining
                  deep-learning gene prediction, multi-copy homolog retention{" "}
                  <Cite k="qi2022highmwpolymalate" />, and proteome-wide
                  localization auditing (Img.1) — to establish an accurate
                  metabolic model that reliably guides wet-lab pathway
                  engineering.
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
                  The initial A08 metabolic model and localization audit were
                  built in three modules:
                </p>
                <ul className={sectionStyles.manifest}>
                  <li>
                    <span aria-hidden="true">
                      <Check size={13} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>De novo A08 proteome prediction</strong>
                      <p>
                        Across 13 reference fungal genomes, ANNEVO{" "}
                        <Cite k="annevo2026" /> matched Tiberius{" "}
                        <Cite k="gabriel2024tiberius" /> in top accuracy while
                        running nearly 10-fold faster (133 s versus 1,270 s per
                        genome) and outperforming Helixer{" "}
                        <Cite k={["stiehler2020helixer", "holst2025helixer"]} />
                        . Achieving 64.5% to 76.4% near-exact full-length
                        protein recall (
                        <MathInline tex={String.raw`\ge 95\%`} /> sequence
                        similarity) across{" "}
                        <MathInline tex={String.raw`\ge 200\text{ aa}`} />{" "}
                        length bins, ANNEVO predicted 20,089 A08 proteins with
                        99.82% Dothideomycetes core completeness{" "}
                        <Cite k={["huang2023compleasm", "manni2021busco"]} />.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span aria-hidden="true">
                      <Check size={13} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>Two-channel draft metabolic network</strong>
                      <p>
                        Following the AlphaGEM framework{" "}
                        <Cite k="han2026alphagem" />, we combined
                        protein-language-model homology mapping{" "}
                        <Cite k={["rives2021esm1b", "liu2024plmsearch"]} />{" "}
                        against the Yeast9 template <Cite k="zhang2024yeast9" />{" "}
                        (3,066 reactions) with a four-tool weighted enzyme
                        annotation ensemble{" "}
                        <Cite
                          k={[
                            "cantalapiedra2021eggnog",
                            "yu2023clean",
                            "kim2023deepectransformer",
                            "bansal2022rhea",
                          ]}
                        />{" "}
                        (434 reactions) to assemble a 3,500-reaction draft
                        model.
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
                        Using DeepLoc 2.1 <Cite k="odum2024deeploc21" /> and
                        TargetP 2.0 <Cite k="almagro2019targetp2" /> across all
                        20,089 A08 proteins, we audited compartment assignments
                        for 15 central-carbon and dicarboxylate reactions,
                        followed by genomic sequence rescue{" "}
                        <Cite k="camacho2009blast" />, minimal-medium
                        gap-filling, and PMLA demand addition to complete the
                        3,549-reaction A08 GEM.
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
                  Testing intracellular flux distribution via parsimonious flux
                  balance analysis (pFBA){" "}
                  <Cite k={["orth2010fba", "lewis2010pfba"]} /> before and after
                  localization calibration revealed a critical template
                  distortion and validated its repair (Img.2):
                </p>
                <ul className={sectionStyles.findings}>
                  <li>
                    <span
                      className={sectionStyles.findingMark}
                      aria-hidden="true"
                    ></span>
                    <div>
                      <strong>
                        Severed cytosolic malate pathway in the uncalibrated
                        draft
                      </strong>
                      <p>
                        Because the initial homology channel inherited default
                        yeast organelle labels, all A08 malate dehydrogenase
                        genes were assigned exclusively to the mitochondrion,
                        leaving the cytosol without malate dehydrogenase
                        (cyMDH). At 90% enforced PMLA production, oxaloacetate
                        generated by cytosolic pyruvate carboxylase (PYC) at{" "}
                        <MathInline
                          tex={String.raw`1.33\text{ mmol}\cdot\text{gDW}^{-1}\cdot\text{h}^{-1}`}
                        />{" "}
                        was forced through a multi-step transamination and
                        fumarate hydration detour carrying{" "}
                        <MathInline
                          tex={String.raw`1.29\text{ mmol}\cdot\text{gDW}^{-1}\cdot\text{h}^{-1}`}
                        />{" "}
                        (Img.2, left).
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
                        Pathway restoration after localization calibration
                      </strong>
                      <p>
                        Dual-tool localization confirmed that both A08 cyMDH
                        paralogs lack mitochondrial transit peptides (TargetP
                        probability 0.985) and reside in the cytosol (DeepLoc
                        probability 0.806). Restoring cytosolic cyMDH across the
                        15 calibrated reactions eliminated the{" "}
                        <MathInline
                          tex={String.raw`1.29\text{ mmol}\cdot\text{gDW}^{-1}\cdot\text{h}^{-1}`}
                        />{" "}
                        detour, re-established direct cytosolic oxaloacetate
                        reduction (
                        <MathInline
                          tex={String.raw`1.35\text{ mmol}\cdot\text{gDW}^{-1}\cdot\text{h}^{-1}`}
                        />
                        ), and raised maximum theoretical PMLA flux from{" "}
                        <MathInline tex={String.raw`1.430`} /> to{" "}
                        <MathInline
                          tex={String.raw`1.500\text{ mmol}\cdot\text{gDW}^{-1}\cdot\text{h}^{-1}`}
                        />{" "}
                        (Img.2, right), while the curated model passed MEMOTE
                        quality checks <Cite k="Lieven2020MEMOTE" /> and{" "}
                        <em>S. pombe</em> knockout validation{" "}
                        <Cite k="Kim2010Spombe" />.
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
                        Cytosolic malate pathway flux and maximum PMLA flux
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
                  Cycle 1 demonstrated that transferring default yeast organelle
                  labels onto a distantly related non-model fungus silently
                  severs its native cytosolic production pathway, making
                  proteome-wide localization auditing indispensable during de
                  novo model reconstruction. However, while the calibrated A08
                  GEM accurately captured wild-type pathway topology, retaining
                  all multi-copy homologs from A08&apos;s duplicated genome
                  meant that paralogous isozymes compensated for one another
                  during single-gene deletions — preventing conventional
                  single-gene knockout screens from identifying the
                  rate-limiting genetic target and motivating Cycle 2.
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
            to find the true PMLA bottleneck became the priority for Cycle 2.
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
        focus="Dual-metric screening across 1,102 homologous enzyme groups to overcome multi-copy isozyme compensation and guide genetic engineering"
        phases={[
          {
            phase: "Design",
            content: (
              <>
                <p>
                  With the A08 metabolic network calibrated, our central
                  question was which among more than two thousand metabolic
                  genes represents the primary bottleneck for PMLA
                  overproduction. Standard single-metric computational screens
                  failed for two reasons: multi-copy isozymes retained from
                  A08's duplicated genome <Cite k="qi2022highmwpolymalate" />{" "}
                  compensate for one another and mask single-gene knockouts,
                  whereas FSEOF overexpression scanning{" "}
                  <Cite k="choi2010fseof" /> alone favors terminal reactions
                  that co-vary with product flux even when alternative
                  intracellular routes can bypass them. We therefore designed a
                  dual-metric screen over{" "}
                  <strong>homologous isozyme groups</strong> combining 10-step
                  FSEOF overexpression sensitivity (
                  <MathInline tex={String.raw`\beta_f`} />) with joint
                  isozyme-group knockout flux loss (
                  <MathInline tex={String.raw`\Delta Y_f`} />) — to provide our
                  wet-lab team with a high-confidence genetic engineering target
                  and avoid wasted cloning effort on redundant or bypassable
                  enzymes.
                </p>
              </>
            ),
          },
          {
            phase: "Build",
            content: (
              <>
                <p>
                  The dual-metric target prioritization pipeline was implemented
                  in two stages:
                </p>
                <ul className={sectionStyles.manifest}>
                  <li>
                    <span aria-hidden="true">
                      <Check size={13} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>Homologous isozyme-group funnel</strong>
                      <p>
                        All-vs-all protein sequence alignment{" "}
                        <Cite k={["buchfink2021diamond", "Tian2003Enzyme"]} /> (
                        <MathInline tex={String.raw`\ge 70\%`} /> identity,{" "}
                        <MathInline tex={String.raw`\ge 80\%`} /> coverage)
                        grouped the A08 proteome into homologous clusters;
                        filtering out 17 growth-essential clusters and 214
                        transport clusters defined 1,102 non-essential candidate
                        enzyme groups in the GEM.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span aria-hidden="true">
                      <Check size={13} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>
                        Orthogonal FSEOF &amp; joint-knockout solvers
                      </strong>
                      <p>
                        Using COBRApy <Cite k="ebrahim2013cobrapy" /> and HiGHS{" "}
                        <Cite k="huangfu2018highs" />, the FSEOF solver stepped
                        enforced PMLA production from 9% to 90% of maximum
                        theoretical flux to compute sensitivity slopes{" "}
                        <MathInline tex={String.raw`\beta_f`} /> for strictly
                        monotonic reactions, while the joint-knockout solver
                        disabled all member genes of each group simultaneously
                        to quantify the PMLA flux drop{" "}
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
                  dimensions resolved three distinct metabolic control regimes
                  and exposed the limitation of single-metric ranking (Tab.1;
                  Img.3):
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
                          <th scope="col" style={{ whiteSpace: "nowrap" }}>
                            Candidate Enzyme Group
                          </th>
                          <th scope="col" style={{ whiteSpace: "nowrap" }}>
                            FSEOF Slope <MathInline tex={String.raw`\beta_f`} />
                          </th>
                          <th scope="col" style={{ whiteSpace: "nowrap" }}>
                            Knockout PMLA Loss{" "}
                            <MathInline tex={String.raw`\Delta Y_f`} />
                          </th>
                          <th scope="col">
                            Metabolic Role &amp; Screening Outcome
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ whiteSpace: "nowrap" }}>
                            Cytosolic MDH (cyMDH)
                          </td>
                          <td style={{ whiteSpace: "nowrap" }}>
                            1.013 (Rank #1)
                          </td>
                          <td style={{ whiteSpace: "nowrap" }}>
                            −4.7% (Rank #10)
                          </td>
                          <td>
                            Terminal reduction step; bypassed by
                            cross-compartment malate routes upon deletion
                          </td>
                        </tr>
                        <tr>
                          <td style={{ whiteSpace: "nowrap" }}>
                            Glycolytic &amp; PPP enzymes
                          </td>
                          <td style={{ whiteSpace: "nowrap" }}>
                            Non-monotonic
                          </td>
                          <td style={{ whiteSpace: "nowrap" }}>
                            −23.8% to −30.2% (Ranks #2–7)
                          </td>
                          <td>
                            Upstream carbon trunk; expanding capacity alone does
                            not redirect flux into C4 acids
                          </td>
                        </tr>
                        <tr>
                          <td style={{ whiteSpace: "nowrap" }}>
                            <strong>Cytosolic PYC</strong>
                          </td>
                          <td style={{ whiteSpace: "nowrap" }}>
                            <strong>0.687 (Rank #4)</strong>
                          </td>
                          <td style={{ whiteSpace: "nowrap" }}>
                            <strong>−58.6% (Rank #1)</strong>
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
                    Three metabolic control regimes resolved by dual-metric
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
                        FSEOF overexpression slope versus joint-knockout PMLA
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
                  Cycle 2 proved that in a duplicated fungal genome, neither
                  overexpression correlation nor single-gene deletion alone can
                  reliably isolate a true metabolic bottleneck: FSEOF alone
                  would have misdirected wet-lab cloning toward cyMDH, whose
                  group deletion is buffered by cross-compartment bypasses.
                  Combining FSEOF with joint group knockout uniquely isolated
                  cytosolic PYC in the dual-optimal quadrant across all
                  clustering thresholds, providing the strain-specific
                  mechanistic basis for our wet lab&apos;s PYC overexpression
                  construction while defining enzyme-constrained modeling as our
                  next refinement step.
                </p>
              </>
            ),
          },
        ]}
        insight={
          <>
            Combining FSEOF sensitivity with joint isozyme-group knockout
            bypassed paralog masking and anchored cytosolic PYC for wet-lab
            overexpression. As strain construction and adhesive experiments
            scaled up, preventing cross-project protocol and data errors
            motivated the WetFlow workbench in Cycle 3.
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
        focus="Service-layer guardrails enforcing project-isolated SOP retrieval, unit-validated measurement logging, and researcher-approved stage transitions"
        phases={[
          {
            phase: "Design",
            content: (
              <>
                <p>
                  To coordinate A08 fermentation and PMLA–DA bioadhesive
                  synthesis, we initially tested general-purpose coding agents
                  (OpenCode <Cite k="OpenCodeDocs" /> and Claude Code{" "}
                  <Cite k="ClaudeCodeOverview" />) to manage experimental
                  protocols and laboratory records. However, three failure modes
                  threatened daily wet-lab work: protocols from different
                  projects were mixed during retrieval, literature reference
                  values <Cite k="Tang2020PMLADA" /> could overwrite actual
                  experimental measurements, and workflow stages could advance
                  without human review. We therefore designed the{" "}
                  <strong>WetFlow</strong> workbench around three service-layer
                  guardrails—project-isolated retrieval, unit-validated
                  measurement logging, and researcher-approved stage transitions
                  (Img.4) — to prevent protocol mix-ups and database corruption
                  across multi-stage experiments.
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
                  The core WetFlow workbench was built around three
                  service-layer modules:
                </p>
                <ul className={sectionStyles.manifest}>
                  <li>
                    <span aria-hidden="true">
                      <Check size={13} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>Project-isolated evidence store</strong>
                      <p>
                        A SQLite store segments imported SOPs and laboratory
                        notes into source-tagged chunks restricted strictly to
                        the active project context.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span aria-hidden="true">
                      <Check size={13} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>Unit-validated measurement logger</strong>
                      <p>
                        Each registered parameter requires an explicit physical
                        unit (°C or g/L), blocking valueless or unit-mismatched
                        writes while flagging out-of-range readings for review.
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
                        Across the six experimental stages (Design, Build,
                        Culture, Assay, Analyze, and Decide), stage transitions
                        pause as pending proposals until explicitly approved by
                        a researcher.
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
                  We evaluated the workbench on synthetic guardrail test cases
                  and our team's real PMLA–DA synthesis records:
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
                      <strong>Service-level guardrail verification</strong>
                      <p>
                        Switching repeatedly between two projects with different
                        culture conditions (30 °C for 24 h versus 37 °C for 12
                        h) restored the exact project-specific protocols and
                        citations on every round trip. Submitting Kelvin values
                        or valueless entries to a Celsius temperature channel
                        was 100% blocked while valid 30 °C readings were saved,
                        and unapproved multi-stage workflow jumps were rejected
                        by the state machine (Img.5).
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
                        Adhesive protocol compilation and 30-question evidence
                        benchmark
                      </strong>
                      <p>
                        Applied to our PMLA–DA synthesis records, WetFlow
                        cleanly separated our wet lab's 1 h activation and 24 h
                        coupling schedule (50% w/v in distilled water) from Tang
                        et al.'s 6 h activation and 3 d reference protocol{" "}
                        <Cite k="Tang2020PMLADA" /> (50 wt% in PBS). On a
                        30-question biological-evidence benchmark, WetFlow
                        achieved <strong>28/30 (93.3%)</strong> accuracy with
                        zero execution failures, outperforming the OpenCode
                        baseline at <strong>21/30 (70.0%)</strong> under the
                        same model backend (Tab.2).
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
                  Cycle 3 confirmed that moving safety rules from fragile prompt
                  instructions into service-layer guardrails eliminates
                  cross-project SOP mix-ups and invalid measurement writes;
                  meanwhile, analyzing a shared benchmark miss taught us to
                  store measured values, assay methods, and independent
                  verification status as separate fields. With the core
                  workbench operational, our adhesive formulation and education
                  outreach teams needed specialized domain tools without
                  bloating the core host, motivating Cycle 4.
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
        focus="Hot-swappable Cordis plugins extending the workbench to multi-ratio coupling verification and 30-minute primary-school WEAVE lesson generation"
        phases={[
          {
            phase: "Design",
            content: (
              <>
                <p>
                  To support downstream formulation analysis and science
                  education without cluttering the core workbench, we needed two
                  domain-specific capabilities: verifying archived multi-ratio
                  PMLA–dopamine coupling summaries for our formulation team, and
                  generating structured primary-school lesson briefs for our
                  education team. Hardcoding task-specific scripts into the core
                  host would duplicate database connections and risk cross-task
                  interference. Drawing on DSH and the Cordis modular plugin
                  framework{" "}
                  <Cite
                    k={[
                      "DeepSeekHarnessArchitecture",
                      "cordisFramework",
                      "Shi2026Cordis",
                    ]}
                  />
                  , we designed each capability as an independent, hot-swappable
                  plugin that reuses the shared evidence service and cleans up
                  its registered tools upon unloading — to equip our formulation
                  and education teams with dedicated analytical tools without
                  disrupting core laboratory record management.
                </p>
              </>
            ),
          },
          {
            phase: "Build",
            content: (
              <>
                <p>
                  Building on the four core services (Evidence, Research,
                  Modeling, and Experiment; 35 registered tools), we developed
                  two domain plugins:
                </p>
                <ul className={sectionStyles.manifest}>
                  <li>
                    <span aria-hidden="true">
                      <Check size={13} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>Adhesive coupling comparison plugin</strong>
                      <p>
                        Reads archived five-ratio molecular dynamics summaries
                        and verifies a shared 50% carboxyl activation baseline
                        and 3–5 ns trajectory window before returning contact
                        ratios, preventing accidental re-simulations.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span aria-hidden="true">
                      <Check size={13} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>WEAVE outreach lesson plugin</strong>
                      <p>
                        Queries 7 structured experience cards distilled from 6
                        iGEM outreach sources in the shared evidence database to
                        generate lesson briefs around our five-step WEAVE
                        framework (Wonder, Explore, Action, Verify, and Echo).
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
                  We tested both plugins on real formulation and outreach
                  workflows, confirming lossless hot-swapping between 26 and 35
                  active tools with the project session intact (Img.6) and
                  accurate contact-ratio verification between molar ratios 1.00
                  (25.2%) and 1.25 (5.2%). Meanwhile, our first test generating
                  a 30-minute primary-school DNA lesson plan exposed two
                  practical defects:
                </p>
                <ul className={sectionStyles.findings}>
                  <li>
                    <span
                      className={sectionStyles.findingMark}
                      aria-hidden="true"
                    ></span>
                    <div>
                      <strong>
                        Incomplete source traceability in generated lesson
                        briefs
                      </strong>
                      <p>
                        Several classroom activity suggestions lacked exact
                        document paragraph identifiers, preventing teachers from
                        tracing recommendations back to the underlying outreach
                        records.
                      </p>
                    </div>
                  </li>
                  <li>
                    <span
                      className={sectionStyles.findingMark}
                      aria-hidden="true"
                    ></span>
                    <div>
                      <strong>Misallocated 30-minute classroom schedule</strong>
                      <p>
                        The initial generator mechanically divided the 30-minute
                        class across all five WEAVE stages, conflicting with our
                        education workflow in which Verify and Echo are
                        conducted after class through empirical feedback.
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
                  We resolved both outreach defects within Cycle 4 (Img.7) by
                  binding every generated activity directly to its evidence
                  paragraph identifier and allocating the full 30-minute
                  classroom schedule to hands-on Action while keeping Verify and
                  Echo as post-class assessment plans. With upstream metabolic
                  target discovery and midstream workflow management complete,
                  Cycle 5 turns to downstream chemical coupling to investigate
                  why excess dopamine dosing reduces polymer conjugation and to
                  guide our wet-lab bioadhesive formulation.
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
            With upstream strain targets and midstream data management in place,
            Cycle 5 investigated why excess dopamine lowers downstream
            bioadhesive conjugation.
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
        focus="Explicit-solvent all-atom molecular dynamics decoupling spatial encounter frequency from nucleophilic attack orientation across five molar ratios"
        phases={[
          {
            phase: "Design",
            content: (
              <>
                <p>
                  In the final stage of our biomanufacturing route,
                  A08-fermented PMLA is functionalized with dopamine via
                  EDC/NHS-mediated amide coupling to form the underwater
                  bioadhesive. Across five dopamine-to-carboxyl molar dosing
                  ratios (0.25, 0.50, 0.75, 1.00, and 1.25){" "}
                  <Cite k="Tang2020PMLADA" />, conjugated dopamine content in
                  the purified polymer rose from 8.9 wt% at 0.25 to a peak of{" "}
                  <strong>21.3 wt% at equimolar 1.00</strong>, but{" "}
                  <strong>dropped to 19.2 wt% at 1.25</strong>. Because bulk
                  wet-lab assays cannot observe how free dopamine approaches
                  activated polymer sites prior to bond formation—where
                  nucleophilic substitution requires both close contact (
                  <MathInline tex={String.raw`d_{\text{N–C}} < 4\text{ Å}`} />)
                  and a Bürgi–Dunitz attack angle near{" "}
                  <MathInline tex={String.raw`107^\circ`} />{" "}
                  <Cite k="Rodriguez2023Approach" />
                  —we designed an explicit-solvent all-atom molecular dynamics
                  (MD) study across all five molar ratios to decouple spatial
                  encounter frequency from reaction-compatible orientation
                  (Img.8), formulating a pre-reaction molecular hypothesis to
                  help our wet-lab team optimize the PMLA–DA bioadhesive recipe.
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
                  The explicit-solvent simulation and geometric analysis
                  pipeline comprised two modules:
                </p>
                <ul className={sectionStyles.manifest}>
                  <li>
                    <span aria-hidden="true">
                      <Check size={13} aria-hidden="true" />
                    </span>
                    <div>
                      <strong>Five-ratio explicit water box construction</strong>
                      <p>
                        Using CUDA-accelerated OpenMM{" "}
                        <Cite k="Eastman2017OpenMM" /> with GAFF2 and AM1-BCC
                        charges{" "}
                        <Cite k={["AmberForceFields", "Jakalian2002AM1BCC"]} />,
                        we built five TIP3P water boxes matching the
                        experimental molar ratios (0.25 to 1.25) around a{" "}
                        <MathInline tex={String.raw`\sim 12\text{ kDa}`} />{" "}
                        <MathInline tex={String.raw`\beta`} />
                        -PMLA chain (104 carboxyls) at a shared{" "}
                        <strong>
                          50% NHS-ester activation baseline (52 active sites)
                        </strong>
                        , plus sensitivity boxes at 25% and 75% activation.
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
                        Across 5 ns production trajectories (analyzing the
                        equilibrated 3–5 ns window), we classified every
                        dopamine–ester pair frame-by-frame across close contact
                        (
                        <MathInline
                          tex={String.raw`d_{\text{N–C}} < 4\text{ Å}`}
                        />
                        ), reaction-compatible attack orientation (
                        <MathInline tex={String.raw`95^\circ\text{–}125^\circ`} />{" "}
                        versus <MathInline tex={String.raw`<60^\circ`} />{" "}
                        shallow side-on approach), and local hydrogen-bond /
                        Lennard-Jones (LJ) angular torque projections.
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
                        Decoupling proximity from attack orientation at excess
                        dopamine dosing
                      </strong>
                      <p>
                        Within the 3–5 ns analysis window of the 50%-activation
                        main model, total close-contact pair-frames were nearly
                        identical between molar ratios 1.00 and 1.25 (485 versus
                        462), yet orientation-compatible contacts plunged from
                        122 to 24 (25.2% to 5.2%), while 82.7% of close contacts
                        at 1.25 accumulated in the{" "}
                        <MathInline tex={String.raw`<60^\circ`} /> shallow-angle
                        side-on regime (Img.9A–D). Under the 50%-activation
                        baseline, this geometric shift provides a candidate
                        pre-reaction explanation for why excess dopamine beyond
                        the 1:1 equimolar ratio fails to increase productive
                        pre-reactive encounters.
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
                        Noncovalent driving forces of side-on trapping
                      </strong>
                      <p>
                        Three-dimensional conformational snapshots (Img.10A–B)
                        and Lennard-Jones (LJ) angular torque projections showed
                        that at molar ratio 1.25, local amine–carbonyl
                        hydrogen-bond candidates nearly doubled (17.5% to
                        32.9%), the catechol-OH LJ angular torque reversed sign
                        from <MathInline tex={String.raw`+6.54`} /> to{" "}
                        <MathInline
                          tex={String.raw`-5.73\text{ kJ}\cdot\text{mol}^{-1}\cdot\text{rad}^{-1}`}
                        />{" "}
                        to oppose rotation into the attack window, and the top
                        three recurring pairs accounted for 60.8% of
                        close-contact frames with zero compatible frames.
                        Meanwhile, bulk dopamine self-clustering (~4.5%) and
                        active-site occupancy (&lt;0.5%) stayed low, indicating
                        that neither large-scale self-clustering nor site
                        saturation was observed within this single-trajectory
                        3–5 ns classical window and focusing our formulation
                        team's attention on local polymer–dopamine orientation.
                      </p>
                    </div>
                  </li>
                </ul>
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
              </>
            ),
          },
          {
            phase: "Learn",
            content: (
              <>
                <p>
                  Cycle 5 formulated a conditional pre-reaction molecular
                  hypothesis under the 50%-activation baseline: raising dopamine
                  dosing past equimolar 1:1 does not automatically increase
                  productive nucleophilic approaches because aromatic
                  dispersion, local hydrogen bonding, and opposing catechol
                  torque bias excess dopamine toward shallow-angle side-on
                  association along the polymer backbone. Equally important,
                  75%-activation sensitivity runs reversed the
                  compatible-contact ordering between molar ratios 1.00 and 1.25
                  (5.25% versus 10.72%), demonstrating within this
                  single-trajectory non-reactive model that carboxyl activation
                  fraction and dopamine dosing ratio are coupled variables —
                  helping our wet-lab team interpret the 1:1 dosing optimum and
                  guiding next-stage experiments to co-measure NHS-ester
                  conversion, conjugation degree, and underwater lap-shear
                  adhesion.
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
          Across five progressive DBTL iterations, our dry-lab engineering
          advanced from de novo fungal metabolic network reconstruction and
          rate-limiting genetic target discovery to guardrail-enforced
          experimental record management, modular plugin extensions, and
          atomic-scale molecular simulation for bioadhesive formulation:
        </p>
        <section
          className={[sectionStyles.scope, sectionStyles.summary].join(" ")}
        >
          <div className={sectionStyles.summaryHeader}>
            <h3>
              From A08 metabolic modeling to controlled experimental workflows
              and bioadhesive formulation
            </h3>
          </div>
          <ol>
            <li>
              <span>Reconstruct A08 network to guide pathway design</span>
              <h4>Cycle 1: First-Generation Fungal GEM</h4>
              <p>
                Selected ANNEVO for 10-fold faster fungal gene prediction to
                build a 3,500-reaction draft model, uncovered a 1.29
                mmol·gDW⁻¹·h⁻¹ detour caused by inherited Yeast9 organelle
                labels, and calibrated 15 reactions via DeepLoc 2.1 and TargetP
                2.0 to restore direct cytosolic malate synthesis and raise
                theoretical PMLA flux from 1.430 to 1.500 mmol·gDW⁻¹·h⁻¹ —
                establishing a reliable in silico chassis to guide wet-lab
                strain engineering.
              </p>
            </li>
            <li>
              <span>Isolate bottleneck amidst isozyme redundancy</span>
              <h4>Cycle 2: Rate-Limiting Target Screen</h4>
              <p>
                Demonstrated that top-FSEOF candidate cyMDH loses only 4.7% PMLA
                flux upon group deletion due to alternative pathways, whereas
                cytosolic PYC uniquely occupies the dual-optimal quadrant with
                FSEOF Rank #4 and candidate knockout Rank #1 at −58.6% flux loss
                — providing our wet-lab team with a high-confidence
                overexpression target.
              </p>
            </li>
            <li>
              <span>Prevent SOP mix-ups and invalid data writes</span>
              <h4>Cycle 3: Protocol &amp; Record Guardrails</h4>
              <p>
                Eliminated cross-project SOP mix-ups, unit-mismatched database
                writes, and unapproved workflow jumps while achieving 28/30 or
                93.3% accuracy on the biological-evidence benchmark versus 21/30
                for the OpenCode baseline — safeguarding daily fermentation and
                bioadhesive synthesis records.
              </p>
            </li>
            <li>
              <span>Equip formulation and outreach workflows</span>
              <h4>Cycle 4: Modular Domain Plugins</h4>
              <p>
                Verified lossless 26 to 35 tool hot-swapping and automated
                coupling-ratio checks, while restoring document-chunk citation
                traceability and dedicating the full 30-minute classroom
                schedule to hands-on Action — empowering both our formulation
                and education teams without disrupting core record management.
              </p>
            </li>
            <li>
              <span>Investigate high-dosing loss to guide recipe</span>
              <h4>Cycle 5: Bioadhesive Coupling Simulation</h4>
              <p>
                Formulated a conditional pre-reaction hypothesis under the
                50%-activation main model where reaction-compatible contacts
                drop from 25.2% at equimolar 1.00 to 5.2% at 1.25 due to
                shallow-angle side-on association, while 75%-activation
                sensitivity runs revealed a coupled relationship between
                carboxyl activation and dopamine dosing — helping our wet-lab
                team interpret the 1:1 dosing optimum and design next-stage
                adhesive formulation experiments.
              </p>
            </li>
          </ol>
        </section>
      </>
    ),
  },
];

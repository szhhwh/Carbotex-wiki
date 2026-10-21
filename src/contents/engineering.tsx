import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArticlePage,
  type ArticleSection,
} from "../components/article/ArticlePage";
import { Cite } from "../components/article/References";
import {
  BuildManifest,
  CycleJourney,
  DbtlCycle,
  EngineeringBrief,
  EngineeringSummary,
  FindingList,
  LoopCards,
  ProcessSequence,
  SubsystemGrid,
  type CycleSummaryItem,
} from "../components/hardware/EngineeringSections";
import {
  EngineeringModeSwitch,
  type EngineeringMode,
} from "../components/hardware/EngineeringModeSwitch";
import {
  WetEngineeringCycle,
  type WetEngineeringCycleData,
} from "../components/hardware/WetEngineeringCycle";
import engineeringStyles from "../components/hardware/engineering.module.css";
import { Figure } from "../components/media/Figure";
import {
  modelEngineeringReferenceOrder,
  modelEngineeringSections,
} from "./model-engineering";

const cycleSummaries: CycleSummaryItem[] = [
  {
    id: "engineering-cycle-1",
    title: "Initial Filtration",
    focus: "Validate ion exchange",
    achievement:
      "Validated the core concept and exposed flow distribution, regeneration, and monitoring gaps.",
  },
  {
    id: "engineering-cycle-2",
    title: "Optimized Cartridge",
    focus: "Fix flow distribution",
    achievement:
      "A CFD-optimized adjustable cartridge solved flow distribution; snap-in modules added flexibility.",
  },
  {
    id: "engineering-cycle-3",
    title: "Multi-way Valve",
    focus: "Enable regeneration",
    achievement:
      "A multi-way valve circuit enabled continuous in-situ resin regeneration and closed-loop operation.",
  },
  {
    id: "engineering-cycle-4",
    title: "IoT Integration",
    focus: "Automate the platform",
    achievement:
      "Monitoring, automated control, a mini-program, and OpenClaw integration completed the platform.",
  },
];

const wetEngineeringReferenceOrder = [
  "liu2023cornbioconversion",
  "zhao2026amxlnr",
  "battaglia2011pentose",
  "ouc2025pnat",
  "feng2018pycmodel",
  "Tang2020PMLADA",
  "livak2001relative",
];

const wetEngineeringCycles: WetEngineeringCycleData[] = [
  {
    id: "wet-engineering-regulator",
    title: "Regulator Engineering — Select a Production Background",
    phases: {
      Design: (
        <p>
          We compared complementary interventions: single and combined deletion
          to examine growth phenotypes, and single and combined overexpression
          to evaluate production. The overexpression panel retained WT, OE-XlnR,
          OE-AraR and OE-XlnR+AraR so that the combination could be evaluated
          alongside each individual intervention.
        </p>
      ),
      Build: (
        <p>
          Expression constructs used pNAT-LoxP-rDNA, documented by OUC-China
          2025; knockout donors used fl4a-hpt-loxp with target-specific homology
          arms. <Cite k="ouc2025pnat" /> PCR, DNA purification, assembly and
          DH5α cloning supplied constructs for A08 protoplast transformation.
          Antibiotic rescreening and target-specific molecular checks supported
          candidate selection.
        </p>
      ),
      Test: (
        <>
          <p>
            The knockouts showed clear sugar-dependent phenotypes. Deleting{" "}
            <em>xlnR</em> hurt xylose growth the most, while deleting{" "}
            <em>araR</em> had a bigger impact on arabinose. The double knockout
            struggled to grow on both pentoses.
          </p>
          <p>
            For the overexpression panel, OE-XlnR+AraR clearly performed the
            best in xylose-containing formulations. When we tested it in the
            actual corn-stover hydrolysate, it reached 18.63 ± 0.14 g/L,
            compared to 15.87 ± 0.38 g/L for WT—a 17.4% increase. This proved
            our strategy worked outside of defined sugars. RT-qPCR also showed
            that <em>XYR</em>, <em>XDH</em>, <em>XKI</em>, <em>XI</em>, and{" "}
            <em>PMA</em> were all upregulated to about 1.59–1.76 times WT
            levels.
          </p>
        </>
      ),
      Learn: (
        <p>
          This production data gave us a clear winner: we kept OE-XlnR+AraR as
          our base strain for the next steps. The knockout data showed us the
          distinct roles each regulator plays, and the qPCR gave us a glimpse
          into the transcriptional changes. We were careful not to treat growth,
          mRNA levels, and PMA titer as interchangeable—they each tell a
          different part of the story.
        </p>
      ),
    },
    methods: (
      <p>
        Methods:{" "}
        <a
          href="https://static.igem.wiki/teams/6147/wiki/wet-protocol/p10-protoplast-transformation.pdf"
          target="_blank"
          rel="noreferrer"
        >
          protoplast transformation
        </a>{" "}
        and{" "}
        <a
          href="https://static.igem.wiki/teams/6147/wiki/wet-protocol/18-xylose-related-gene-expression-en.pdf"
          target="_blank"
          rel="noreferrer"
        >
          RT-qPCR
        </a>
        .
      </p>
    ),
  },
  {
    id: "wet-engineering-pyc",
    title: "PYC Engineering — Establish and Compare Candidate Combinations",
    phases: {
      Design: (
        <p>
          Pyruvate carboxylase (PYC) converts pyruvate to oxaloacetate, making
          it a great candidate for boosting precursor supply. Previous work in{" "}
          <em>Aureobasidium pullulans</em> gave us a solid precedent.{" "}
          <Cite k="feng2018pycmodel" /> We assembled a panel of PYC
          candidates—native A08 pyc, along with heterologous ones from{" "}
          <em>A. thailandense</em> ZW03-4 (ZW), <em>Y. lipolytica</em> (YL), and{" "}
          <em>S. cerevisiae</em> (SC, specifically <em>PYC1</em>)—all built into
          the OE-XlnR+AraR background.
        </p>
      ),
      Build: (
        <p>
          We tried to overexpress the native A08 pyc using both electroporation
          and protoplast transformation, but unfortunately, neither method
          yielded a verified strain. We suspect endogenous multi-copy expression
          might be toxic or require specific chromatin contexts. This forced us
          to pivot, and we successfully introduced the heterologous ZW, YL, and
          SC constructs into the dual-regulator background instead.
        </p>
      ),
      Test: (
        <>
          <p>
            We compared WT against the three heterologous combinations. SC had
            the highest production value in this panel and provided sample for
            our HPLC analysis.
          </p>
          <p>
            <em>Just to be transparent here</em>: we didn't have a same-batch
            parental control (OE-XlnR+AraR without PYC) in this exact run. We
            had data from an earlier separate experiment, so we didn't pool them
            together to avoid batch effects.
          </p>
        </>
      ),
      Learn: (
        <p>
          The native <em>pyc</em> failure was frustrating but taught us a real
          lesson about host constraints, shifting our focus to the heterologous
          panel. The successful outcome of this phase was simply establishing
          and testing this combination panel. To actually isolate how much PYC
          contributed, we know we need a strictly matched, no-PYC parent in the
          exact same batch next time. That, along with enzyme activity data, is
          our next logical step
        </p>
      ),
    },
    methods: (
      <p>
        Methods:{" "}
        <a
          href="https://static.igem.wiki/teams/6147/wiki/wet-protocol/11electroporation-protocol-en.pdf"
          target="_blank"
          rel="noreferrer"
        >
          electroporation
        </a>
        ,{" "}
        <a
          href="https://static.igem.wiki/teams/6147/wiki/wet-protocol/p10-protoplast-transformation.pdf"
          target="_blank"
          rel="noreferrer"
        >
          protoplast transformation
        </a>
        , and{" "}
        <a
          href="https://static.igem.wiki/teams/6147/wiki/wet-protocol/19-new-a-pma-acid-hydrolysis-and-hplc-three-standards-new.pdf"
          target="_blank"
          rel="noreferrer"
        >
          acid hydrolysis and HPLC
        </a>
        .
      </p>
    ),
  },
  {
    id: "wet-engineering-materials",
    title: "Materials Engineering — One DBTL Cycle for Formulation Selection",
    phases: {
      Design: (
        <p>
          Following discussions with instructor Ya Liu, we chose to develop an
          adhesive. Published PMA–dopamine research gave us the EDC/NHS coupling
          protocol. <Cite k="Tang2020PMLADA" /> We decided to vary two inputs:
          the material concentration and the dopamine:COOH molar feed ratio.
          Note that these percentage labels are just our synthesis inputs, not
          the measured grafting degrees.
        </p>
      ),
      Build: (
        <>
          <p>
            We skipped the PMA isolation step entirely and used the cell-removed
            broth directly. We activated for 1 hour, reacted with dopamine for
            24 hours in the dark, dialyzed for 48 hours, and then freeze-dried
            it. This gave us a solid we could weigh, dissolve in water, and
            test.
          </p>
          <p>
            We tested the DA:COOH = 100% material at 100, 300, 500, 700, and
            1000 mg/mL. We also compared 25%, 50%, and 100% DA:COOH formulations
            on glass, stainless steel, and ex vivo porcine skin, using a 0.5 cm²
            bonded area.
          </p>
        </>
      ),
      Test: (
        <>
          <p>
            At 100% dopamine feed, 700 mg/mL was the sweet spot: 640.57 kPa on
            glass, 56 kPa on steel, and 102 kPa on porcine skin. When we pushed
            it to 1000 mg/mL, the strength dropped—likely because the material
            became too viscous to spread and wet the surface properly.
          </p>
          <p>
            The feed-ratio comparison gave us an interesting surprise. For steel
            at 1000 mg/mL, the 50% feed group actually beat the 100% group
            (103.6 kPa vs 50 kPa). On pig skin at 700 mg/mL, the 100% group
            reached 102 kPa, while the 25% and 50% groups only got 14.0 and 4.4
            kPa. So, dumping more dopamine in doesn't always make it stick
            better.
          </p>
          <p>
            We also soaked preformed joints in water for 24 hours and tested
            L929 cell viability over 24, 48, and 72 hours. The cells stayed at
            roughly 85%–110% viability, meaning the material isn't cytotoxic.
          </p>
        </>
      ),
      Learn: (
        <>
          <p>
            There is no single "best" recipe here. 700 mg/mL with 100% dopamine
            is great for glass and skin, but steel actually prefers the 50% feed
            at 1000 mg/mL.
          </p>
          <p>
            We successfully made a broth-derived adhesive that actually holds
            things together, and we have the data to explain why. However, these
            mechanical tests treat the material as a whole—we still need to
            verify the specific chemical coupling in the future. The next step
            is to test independently prepared batches to ensure this is
            reproducible.
          </p>
        </>
      ),
    },
    methods: (
      <p>
        Methods:{" "}
        <a
          href="https://static.igem.wiki/teams/6147/wiki/wet-protocol/21-pma-dopamine-adhesive-preparation-en.pdf"
          target="_blank"
          rel="noreferrer"
        >
          adhesive preparation
        </a>{" "}
        and{" "}
        <a
          href="https://static.igem.wiki/teams/6147/wiki/wet-protocol/22-l929-cck8-cytotoxicity-material-extracts-en.pdf"
          target="_blank"
          rel="noreferrer"
        >
          L929 extract assay
        </a>
        .
      </p>
    ),
  },
];

const hardwareSections: ArticleSection[] = [
  {
    id: "engineering-overview",
    title: "Overview",
    content: (
      <>
        <p>
          During anaerobic fermentation, microbial metabolism generates ammonia
          nitrogen (NH₄⁺) as a byproduct. If left untreated, this ammonia
          nitrogen inhibits downstream aerobic fermentation strains, reducing
          overall process efficiency. Our hardware engineering task was to build
          a system that removes ammonia nitrogen from anaerobic fermentation
          effluent so it can be reused in subsequent fermentation stages.
        </p>
        <EngineeringBrief
          core="H⁺/Na⁺ cation exchange resin selectively captures NH₄⁺ ions from the fermentation broth through ion exchange, releasing H⁺ or Na⁺ into the solution."
          goal="Achieve fully automated operation — resin adsorption, fluid circulation, and data monitoring — to eliminate manual sampling errors and provide data for downstream sugar solution concentration."
          integration="A standardized data interface connects to our project's OpenClaw control system, enabling intelligent coordination across the entire workflow: anaerobic fermentation → ammonia removal → aerobic fermentation → product concentration."
          objectives={[
            "Remove ammonia nitrogen from anaerobic fermentation effluent using cation exchange resin",
            "Enable continuous resin reuse through in-situ regeneration without physical replacement",
            "Integrate real-time monitoring (pH, temperature) with automated valve control",
            "Provide a standardized data interface for OpenClaw system integration",
          ]}
        />
        <Figure
          id="engineering-figure-1"
          src="https://static.igem.wiki/teams/6147/wiki/fig1-overview.avif"
          intrinsicWidth={2848}
          intrinsicHeight={1600}
          alt="Overview of the four engineering cycles. Each cycle follows the Design-Build-Test-Learn (DBTL) framework, with every iteration addressing limitations identified in the previous cycle."
          captionPrefix="Figure 1."
          caption="Overview of the four engineering cycles. Each cycle follows the Design-Build-Test-Learn (DBTL) framework, with every iteration addressing limitations identified in the previous cycle."
          fallback={<p>Image unavailable.</p>}
        />
        <p>
          We followed the iGEM Engineering Cycle framework — Design, Build,
          Test, Learn — across four iterations. Each cycle addressed specific
          limitations identified in the previous one, progressively transforming
          a simple filtration column into a fully automated, IoT‑enabled
          ammonia‑nitrogen removal platform.
        </p>
        <CycleJourney items={cycleSummaries} />
      </>
    ),
  },
  {
    id: "engineering-cycle-1",
    title: "Cycle 1: Initial Filtration System",
    content: (
      <DbtlCycle
        number={1}
        title="Initial Filtration System"
        focus="Simple gravity-fed ion exchange column — validating the core concept"
        phases={[
          {
            phase: "Design",
            content: (
              <>
                <p>
                  The core challenge was removing ammonia nitrogen (NH₄⁺) from
                  anaerobic fermentation effluent. Our initial design concept
                  was straightforward: pass the fermentation effluent through a
                  bed of H⁺/Na⁺ cation exchange resin, which would selectively
                  capture NH₄⁺ ions through ion exchange.
                </p>
                <p>
                  We selected a strong acid cation exchange resin in H⁺/Na⁺
                  form, chosen for its high selectivity toward ammonium ions and
                  compatibility with fermentation broth conditions. The hardware
                  setup consisted of a single cylindrical column packed with
                  resin beads, connected to a peristaltic pump for fluid
                  delivery. Fermentation effluent would enter from the top of
                  the column, percolate through the resin bed, and exit from the
                  bottom as treated effluent.
                </p>
              </>
            ),
          },
          {
            phase: "Build",
            content: (
              <>
                <p>
                  The first prototype was assembled using off-the-shelf
                  components:
                </p>
                <BuildManifest
                  items={[
                    {
                      name: "Transparent acrylic cylindrical column",
                      detail: "Houses the cation exchange resin bed",
                    },
                    {
                      name: "H⁺/Na⁺ cation exchange resin",
                      detail: "Captures NH₄⁺ ions from fermentation effluent",
                    },
                    {
                      name: "Peristaltic pump",
                      detail: "Drives fluid through the column",
                    },
                    {
                      name: "Silicone tubing",
                      detail:
                        "Connects effluent reservoir to column inlet and outlet to collection vessel",
                    },
                  ]}
                />
                <p>
                  No sensors, no valves, and no automation were included in this
                  initial build. The system was operated entirely manually.
                </p>
              </>
            ),
          },
          {
            phase: "Test",
            content: (
              <>
                <p>
                  The system successfully adsorbed ammonia nitrogen from the
                  fermentation effluent, confirming the basic feasibility of the
                  ion exchange approach. However, several critical issues were
                  identified during testing:
                </p>
                <FindingList
                  items={[
                    {
                      title: "Non-uniform flow distribution",
                      text: "The simple column design resulted in channeling effects and dead zones within the resin bed. Portions of the resin remained unused while preferential flow paths developed, reducing adsorption efficiency and resin utilization.",
                    },
                    {
                      title: "No regeneration capability",
                      text: "Once the resin reached saturation, it had to be manually removed from the column and replaced with fresh resin. This made continuous operation impractical for extended biomanufacturing runs.",
                    },
                    {
                      title: "Lack of monitoring",
                      text: "Without sensors, operators could not identify when to stop pump feeding and mark the end of the adsorption phase. This led to either premature termination (wasting available resin capacity) or breakthrough events (contaminated effluent reaching downstream processes).",
                    },
                  ]}
                />
              </>
            ),
          },
          {
            phase: "Learn",
            content: (
              <>
                <p>
                  The initial prototype validated the core concept of ion
                  exchange for ammonia nitrogen removal but revealed three key
                  areas for improvement:
                </p>
                <FindingList
                  items={[
                    {
                      title: "Flow optimization",
                      text: "The filter cartridge geometry needed redesigning to ensure uniform flow distribution across the entire resin bed, minimizing dead volume and channeling effects.",
                    },
                    {
                      title: "Regeneration mechanism",
                      text: "A system for in-situ resin regeneration without disassembly was essential for practical continuous operation.",
                    },
                    {
                      title: "Monitoring integration",
                      text: "Real-time sensors were needed to track system status and trigger regeneration cycles automatically.",
                    },
                  ]}
                />
              </>
            ),
          },
        ]}
        media={
          <Figure
            id="engineering-figure-2"
            src="https://static.igem.wiki/teams/6147/wiki/fig2-cycle1-design.avif"
            intrinsicWidth={2304}
            intrinsicHeight={1728}
            alt="Cycle 1 design schematic — a simple ion exchange column with peristaltic pump. Fermentation effluent enters from the top, passes through the resin bed, and exits as treated effluent."
            captionPrefix="Figure 2."
            caption="Cycle 1 design schematic — a simple ion exchange column with peristaltic pump. Fermentation effluent enters from the top, passes through the resin bed, and exits as treated effluent."
            fallback={<p>Image unavailable.</p>}
          />
        }
        mediaAfter="Build"
        insight="Physical optimization of the filter cartridge was the most immediate bottleneck. Flow distribution issues directly impacted adsorption efficiency and resin utilization, making it the priority for Cycle 2."
      />
    ),
  },
  {
    id: "engineering-cycle-2",
    title: "Cycle 2: Optimized Filter Cartridge",
    content: (
      <DbtlCycle
        number={2}
        title="Optimized Filter Cartridge"
        focus="Adjustable-spacing modular design with CFD-guided flow optimization"
        phases={[
          {
            phase: "Design",
            content: (
              <>
                <p>
                  To address the flow distribution issues identified in Cycle 1,
                  we redesigned the filter cartridge with three key innovations:
                </p>
                <FindingList
                  items={[
                    {
                      title: "Adjustable spacing mechanism",
                      text: "The new cartridge featured an adjustable internal spacing system, allowing the operator to modify the resin bed height and compaction level. This accommodates different resin types and flow rates, ensuring optimal contact between the fermentation effluent and the resin beads under varying operating conditions.",
                    },
                    {
                      title: "Snap-in modular filter-cartridge design",
                      text: "The cartridge was designed as a modular, snap-in unit that could be easily inserted and removed from the main housing. This enables rapid replacement of different adsorbent materials without disassembling the entire system, providing flexibility for testing different resin configurations.",
                    },
                    {
                      title: "CFD-optimized internal geometry",
                      text: "We employed Computational Fluid Dynamics (CFD) simulation to model and optimize the internal flow paths within the cartridge. The simulation identified dead zones, evaluated flow uniformity across the resin bed, and guided the design of internal flow distributors to minimize pressure drop while maximizing resin utilization.",
                    },
                  ]}
                />
              </>
            ),
          },
          {
            phase: "Build",
            content: (
              <>
                <p>The redesigned filter cartridge was fabricated with:</p>
                <BuildManifest
                  items={[
                    {
                      name: "Adjustable-spacing housing",
                      detail:
                        "Internal flow distributors at the inlet and outlet",
                    },
                    {
                      name: "CFD-validated internal geometry",
                      detail:
                        "Optimized inlet/outlet configurations eliminate dead zones",
                    },
                    {
                      name: "Snap-in modular interface",
                      detail: "Tool-free cartridge replacement",
                    },
                    {
                      name: "Peristaltic pump",
                      detail: "Improved flow control for consistent delivery",
                    },
                  ]}
                />
                <p>
                  CFD simulation was performed to model the fluid flow through
                  the resin bed under various flow rates. The simulation results
                  guided the design of internal flow distributors and the
                  optimization of the cartridge geometry, including inlet
                  diffuser angle, outlet collector configuration, and resin bed
                  height-to-diameter ratio.
                </p>
              </>
            ),
          },
          {
            phase: "Test",
            content: (
              <>
                <p>
                  The optimized cartridge showed significant improvements over
                  Cycle 1:
                </p>
                <FindingList
                  tone="outcome"
                  items={[
                    {
                      title: "Flow distribution",
                      text: "CFD simulation confirmed that the redesigned internal geometry eliminated major dead zones and achieved more uniform flow distribution across the resin bed. The simulated velocity field showed consistent flow rates throughout the resin bed, with minimal channeling compared to the Cycle 1 design.",
                    },
                    {
                      title: "Modular functionality",
                      text: "The snap-in design allowed for quick cartridge replacement, enabling rapid testing with different resin types and bed configurations without system downtime.",
                    },
                    {
                      title: "Adjustable spacing",
                      text: "The adjustable mechanism provided flexibility in resin bed height, allowing optimization for different flow rates and ammonia nitrogen concentrations in the fermentation effluent.",
                    },
                  ]}
                />
                <p>
                  However, the core limitation from Cycle 1 remained: the system
                  still lacked in-situ regeneration capability. Resin still
                  needed to be manually replaced after saturation, although the
                  snap-in modular design made this process significantly faster.
                </p>
              </>
            ),
          },
          {
            phase: "Learn",
            content: (
              <p>
                Cycle 2 successfully solved the physical flow distribution
                problem through CFD-guided design optimization. The modular and
                adjustable features added significant operational flexibility.
                However, the fundamental challenge of continuous operation
                remained — without automated resin regeneration, the system
                could not run unattended for extended periods.
              </p>
            ),
          },
        ]}
        media={
          <Figure
            id="engineering-figure-3"
            src="https://static.igem.wiki/teams/6147/wiki/fig3-cycle2-cfd.avif"
            intrinsicWidth={2304}
            intrinsicHeight={1728}
            alt="Cycle 2 design — optimized filter cartridge with adjustable spacing and CFD-validated internal geometry. The simulation overlay shows fluid velocity distribution, demonstrating improved flow uniformity compared to Cycle 1."
            captionPrefix="Figure 3."
            caption="Cycle 2 design — optimized filter cartridge with adjustable spacing and CFD-validated internal geometry. The simulation overlay shows fluid velocity distribution, demonstrating improved flow uniformity compared to Cycle 1."
            fallback={<p>Image unavailable.</p>}
          />
        }
        mediaAfter="Design"
        insight="Physical optimization alone was insufficient. We needed to integrate a fluid switching mechanism that could redirect flow between different operational loops — adsorption, washing, and regeneration — without manual intervention. This insight directly led to the multi-way valve design in Cycle 3."
      />
    ),
  },
  {
    id: "engineering-cycle-3",
    title: "Cycle 3: Multi-way Valve Regeneration System",
    content: (
      <DbtlCycle
        number={3}
        title="Multi-way Valve Regeneration System"
        focus="Two multi-way valves enabling continuous in-situ resin regeneration"
        phases={[
          {
            phase: "Design",
            content: (
              <>
                <p>
                  The breakthrough in Cycle 3 was the integration of two
                  multi-way valves to create a fully switchable fluid circuit
                  system. This enabled three distinct operational loops within a
                  single hardware setup, allowing the resin to be regenerated in
                  place without physical removal:
                </p>
                <LoopCards
                  items={[
                    {
                      name: "Adsorption",
                      fluid: "Fermentation effluent",
                      detail:
                        "NH₄⁺ ions captured by resin; treated effluent exits for downstream aerobic fermentation",
                    },
                    {
                      name: "Washing",
                      fluid: "Clean water",
                      detail:
                        "Flushes residual fermentation broth from resin bed before and after regeneration",
                    },
                    {
                      name: "Regeneration",
                      fluid: "Regeneration solution (acid)",
                      detail:
                        "Strips adsorbed NH₄⁺ from resin, recovering it as concentrated solution; resin restored for next cycle",
                    },
                  ]}
                />
                <p>
                  By switching the multi-way valves, the system seamlessly
                  transitions between these three loops, enabling continuous
                  resin reuse. The operational cycle becomes:
                </p>
                <ProcessSequence
                  steps={[
                    "Adsorption",
                    "Washing",
                    "Regeneration",
                    "Washing",
                    "Adsorption",
                    "Repeat",
                  ]}
                />
              </>
            ),
          },
          {
            phase: "Build",
            content: (
              <>
                <p>
                  The multi-way valve system was constructed with the following
                  components integrated with the optimized filter cartridge from
                  Cycle 2:
                </p>
                <BuildManifest
                  items={[
                    {
                      name: "Two multi-way valves (V1, V2)",
                      detail:
                        "Positioned at the inlet and outlet of the resin column, controlling fluid routing",
                    },
                    {
                      name: "Three fluid pathways",
                      detail:
                        "Connect the valves to fermentation effluent, clean water, and regeneration solution reservoirs",
                    },
                    {
                      name: "Automated circulating pipeline",
                      detail:
                        "Connects all components into a closed-loop system",
                    },
                    {
                      name: "Peristaltic pump",
                      detail:
                        "Delivers consistent flow through all three loops",
                    },
                    {
                      name: "Optimized filter cartridge",
                      detail:
                        "Carried forward from Cycle 2 as the core adsorption unit",
                    },
                  ]}
                />
                <p>
                  The valve switching sequence was initially controlled
                  manually, with the operator determining when to transition
                  between loops based on visual inspection and timed intervals.
                </p>
              </>
            ),
          },
          {
            phase: "Test",
            content: (
              <>
                <p>
                  The multi-way valve system successfully achieved continuous
                  resin regeneration:
                </p>
                <FindingList
                  tone="outcome"
                  items={[
                    {
                      title: "Adsorption efficiency",
                      text: "The resin effectively captured NH₄⁺ from fermentation effluent during the adsorption phase, producing treated effluent suitable for downstream aerobic fermentation.",
                    },
                    {
                      title: "Regeneration effectiveness",
                      text: "The regeneration solution successfully stripped adsorbed NH₄⁺ from the resin, restoring its adsorption capacity for subsequent cycles. The recovered ammonia nitrogen solution was collected as a concentrated byproduct.",
                    },
                    {
                      title: "Loop switching reliability",
                      text: "The two multi-way valves reliably switched between the three operational loops without cross-contamination between fluid streams. The valve positions clearly isolated each loop during operation.",
                    },
                    {
                      title: "Continuous operation",
                      text: "Multiple adsorption-regeneration cycles were completed without manual resin replacement, validating the closed-loop design. The system could operate for extended periods with only periodic refilling of reservoirs.",
                    },
                  ]}
                />
                <p>
                  However, the system still required manual valve switching and
                  operator monitoring to determine when to transition between
                  loops. Without sensors, the timing of loop transitions was
                  based on time estimates rather than real-time data, risking
                  premature regeneration or resin breakthrough.
                </p>
              </>
            ),
          },
          {
            phase: "Learn",
            content: (
              <p>
                Cycle 3 solved the critical problem of continuous resin reuse
                through the multi-way valve system. The closed-loop design —
                adsorption, washing, regeneration, washing, repeat — eliminated
                the need for physical resin replacement, making the system
                practical for extended biomanufacturing operations. Two
                multi-way valves were sufficient to handle all fluid routing
                requirements.
              </p>
            ),
          },
        ]}
        media={
          <Figure
            id="engineering-figure-4"
            src="https://static.igem.wiki/teams/6147/wiki/fig4-cycle3-valves.avif"
            intrinsicWidth={2304}
            intrinsicHeight={1728}
            alt="Cycle 3 design — multi-way valve system with three fluid loops. Two multi-way valves (V1, V2) switch between adsorption (blue), washing (green), and regeneration (orange) loops, enabling continuous resin reuse without physical replacement."
            captionPrefix="Figure 4."
            caption="Cycle 3 design — multi-way valve system with three fluid loops. Two multi-way valves (V1, V2) switch between adsorption (blue), washing (green), and regeneration (orange) loops, enabling continuous resin reuse without physical replacement."
            fallback={<p>Image unavailable.</p>}
          />
        }
        mediaAfter="Design"
        insight="The remaining challenge was automation. The system needed to monitor its own status (pH, temperature, flow rate) and automatically switch between operational loops based on real-time sensor data, rather than relying on manual intervention and timed estimates. This drove the IoT integration in Cycle 4."
      />
    ),
  },
  {
    id: "engineering-cycle-4",
    title: "Cycle 4: IoT Integration & Mini-Program Control",
    content: (
      <DbtlCycle
        number={4}
        title="IoT Integration & Mini-Program Control"
        focus="Real-time monitoring, automated valve control, and remote operation via WeChat mini-program"
        phases={[
          {
            phase: "Design",
            content: (
              <>
                <p>
                  Cycle 4 transformed the hardware from a manually-operated
                  system into a fully automated, remotely monitored platform.
                  The design integrated six key subsystems:
                </p>
                <SubsystemGrid
                  items={[
                    {
                      title: "Sensor array",
                      text: "pH and temperature sensors were installed at critical points in the fluid circuit. The pH sensor tracks the ion exchange process — when effluent pH shifts, it indicates resin saturation and triggers the regeneration cycle. The temperature sensor ensures optimal operating conditions for both adsorption and regeneration.",
                    },
                    {
                      title: "Main controller",
                      text: "A microcontroller serves as the central processing unit, collecting sensor data, controlling the peristaltic pump and multi-way valves, and managing the automated operation workflow. The controller executes the cycle logic based on sensor thresholds rather than timed intervals.",
                    },
                    {
                      title: "Cloud communication (MQTT)",
                      text: "MQTT protocol was implemented for real-time data transmission to a cloud server. All sensor readings, valve states, and system status are continuously streamed to the cloud, enabling remote monitoring and historical data analysis.",
                    },
                    {
                      title: "WeChat mini-program",
                      text: "A custom WeChat mini-program provides the user interface for remote monitoring and control. It displays real-time sensor data, system status, and operational history, and allows the operator to remotely adjust parameters, start/stop the system, and receive alerts.",
                    },
                    {
                      title: "OLED local display",
                      text: "A local OLED screen provides on-site visual feedback, displaying key parameters and system status without requiring a mobile device.",
                    },
                    {
                      title: "OpenClaw integration",
                      text: "The hardware system exposes a standardized data interface that connects to our project's OpenClaw control system. This enables full-process intelligent linkage — OpenClaw coordinates the entire workflow from anaerobic fermentation through ammonia nitrogen removal to aerobic fermentation and product concentration, using real-time data from the hardware system to optimize the overall biomanufacturing process.",
                    },
                  ]}
                />
              </>
            ),
          },
          {
            phase: "Build",
            content: (
              <>
                <p>
                  The complete IoT system was assembled with the following
                  components integrated with the hardware platform from Cycle 3:
                </p>
                <BuildManifest
                  items={[
                    {
                      name: "pH and temperature sensors",
                      detail:
                        "Integrated into the fluid circuit at the column outlet",
                    },
                    {
                      name: "Main controller (MCU)",
                      detail:
                        "GPIO connections to sensors, peristaltic pump, and both multi-way valves",
                    },
                    {
                      name: "OLED display module",
                      detail: "Local real-time visualization",
                    },
                    {
                      name: "WiFi module",
                      detail: "MQTT cloud communication",
                    },
                    {
                      name: "WeChat mini-program",
                      detail: "Mobile monitoring and control",
                    },
                    {
                      name: "Standardized data interface",
                      detail: "OpenClaw integration",
                    },
                  ]}
                />
                <p>
                  The automated operation logic was programmed into the
                  controller as follows:
                </p>
                <ProcessSequence
                  steps={[
                    {
                      label: "Adsorption",
                      detail:
                        "Pump drives effluent through the resin while the pH sensor monitors saturation.",
                    },
                    {
                      label: "Washing",
                      detail:
                        "Valves switch to the clean-water loop for a preset flush duration.",
                    },
                    {
                      label: "Regeneration",
                      detail:
                        "Valves route regeneration solution through the column; pH confirms completion.",
                    },
                    {
                      label: "Final wash",
                      detail:
                        "Clean water flushes residual regeneration solution from the cartridge.",
                    },
                    {
                      label: "Return to adsorption",
                      detail: "The cycle repeats automatically.",
                    },
                  ]}
                />
              </>
            ),
          },
          {
            phase: "Test",
            content: (
              <>
                <p>The integrated IoT system achieved all design objectives:</p>
                <FindingList
                  tone="outcome"
                  items={[
                    {
                      title: "Real-time monitoring",
                      text: "pH and temperature data were continuously streamed to both the OLED display and the cloud server. The WeChat mini-program provided remote visibility into system status, with data updates at regular intervals.",
                    },
                    {
                      title: "Automated operation",
                      text: "The system successfully executed multiple adsorption-regeneration cycles without manual intervention. Valve switching was triggered automatically by sensor thresholds — when the pH sensor detected resin saturation during adsorption, the controller initiated the washing and regeneration sequence without operator input.",
                    },
                    {
                      title: "Remote control",
                      text: "The WeChat mini-program enabled remote parameter adjustment (flow rate, pH thresholds, washing duration) and system start/stop commands, with real-time feedback confirming each action.",
                    },
                    {
                      title: "OpenClaw integration",
                      text: "The standardized data interface successfully transmitted hardware status data to the OpenClaw control system. OpenClaw was able to coordinate the hardware system's operation with the upstream anaerobic fermentation and downstream aerobic fermentation processes, demonstrating full-process intelligent linkage.",
                    },
                  ]}
                />
              </>
            ),
          },
          {
            phase: "Learn",
            content: (
              <>
                <p>
                  Cycle 4 completed the hardware engineering journey,
                  transforming the system from a simple filtration column into a
                  fully automated, IoT-enabled ammonia-nitrogen removal
                  platform. The integration of sensors, automated valve control,
                  cloud communication, and the WeChat mini-program eliminated
                  the need for manual monitoring and intervention, achieving the
                  project's hardware goals:
                </p>
                <FindingList
                  tone="outcome"
                  items={[
                    {
                      title: "Removal",
                      text: "Automated ammonia nitrogen removal from anaerobic fermentation effluent",
                    },
                    {
                      title: "Monitoring",
                      text: "Real-time monitoring replacing manual sampling and detection",
                    },
                    {
                      title: "Reuse",
                      text: "Continuous resin reuse through automated regeneration cycles",
                    },
                    {
                      title: "Interface",
                      text: "Standardized data interface for OpenClaw system integration",
                    },
                    {
                      title: "Linkage",
                      text: "Full-process intelligent linkage across the biomanufacturing workflow",
                    },
                  ]}
                />
              </>
            ),
          },
        ]}
        media={
          <Figure
            id="engineering-figure-5"
            src="https://static.igem.wiki/teams/6147/wiki/fig5-cycle4-iot.avif"
            intrinsicWidth={2848}
            intrinsicHeight={1600}
            alt="Cycle 4 design — IoT system architecture. Sensors feed data to the main controller, which manages valve/pump operation and transmits data via MQTT to the cloud. The WeChat mini-program provides remote monitoring and control, while a standardized interface enables OpenClaw integration for full-process coordination."
            captionPrefix="Figure 5."
            caption="Cycle 4 design — IoT system architecture. Sensors feed data to the main controller, which manages valve/pump operation and transmits data via MQTT to the cloud. The WeChat mini-program provides remote monitoring and control, while a standardized interface enables OpenClaw integration for full-process coordination."
            fallback={<p>Image unavailable.</p>}
          />
        }
        mediaAfter="Design"
        insight="The four DBTL cycles yielded a complete hardware system that addresses all initial requirements — from the core ion exchange function to automated operation, real-time monitoring, and system-level integration. The iterative approach ensured that each cycle's learnings directly informed the next cycle's design, resulting in a robust and practical platform for biomanufacturing ammonia-nitrogen removal."
      />
    ),
  },
  {
    id: "engineering-summary",
    title: "Engineering Cycle Summary",
    content: (
      <>
        <p>
          Across four DBTL cycles, the hardware system evolved from a simple
          manual filtration column into a fully automated, IoT-integrated
          platform. Each cycle addressed specific limitations identified in the
          previous iteration:
        </p>
        <EngineeringSummary items={cycleSummaries} />
        <p>
          The engineering process demonstrates how the DBTL framework guides
          systematic hardware development: each cycle's Test phase revealed
          concrete limitations, the Learn phase translated them into design
          priorities, and the next cycle's Design phase addressed them directly.
          This iterative approach ensured that the final system was not merely a
          collection of features, but a coherent solution where each component
          evolved in response to real operational challenges.
        </p>
      </>
    ),
  },
];

const wetEngineeringSections: ArticleSection[] = [
  {
    id: "wet-engineering",
    title: "Engineering from Agricultural Sugars to a Broth-Derived Adhesive",
    content: (
      <div className={engineeringStyles.source}>
        <p>
          Carbotex links A08 strain engineering with the use of corn-stover
          sugars and the development of an adhesive formulation. Over this
          project, we built a dual-regulator background that boosted PMA
          production, obtained a panel of heterologous PYC combinations, and
          mapped out how adhesive concentration and dopamine input affect
          different substrates.
        </p>
        <p>
          Below, we break down the Design, Build, Test, and Learn phases of our
          work.
        </p>

        <h3 className={engineeringStyles.sourceHeading}>
          Design Basis — Define the Production Challenge
        </h3>
        <p>
          We obtained the PMA-producing strain Aureobasidium melanogenum A08
          from our lab's strain collection and established its cultivation and
          identification protocols. The raw corn-stover hydrolysate from Yajun
          Liu's lab connected our chassis to real agricultural waste. Because
          this crude hydrolysate contains fermentation inhibitors that can
          impair microbial conversion, we couldn&apos;t just use it directly.
          Adapting the published conditioning workflow{" "}
          <Cite k="liu2023cornbioconversion" />—using activated carbon
          adsorption, ion exchange, and vacuum concentration—we standardized the
          sugar load to 140 g/L to obtain a clean, reproducible feedstock for
          A08.
        </p>
        <p>
          A08 grew fine on glucose, xylose, and arabinose, but we quickly
          realized that good growth didn't mean good production. Our
          xylose-loading and mixed-sugar experiments revealed a clear
          sugar-dependent bottleneck. Based on this, and inspired by published
          work on AmXlnR and AraR/XlnR, we decided to test the endogenous xlnR
          and araR genes as engineering targets. We saw regulatory intervention
          as a practical strategy to test, rather than assuming it was the only
          explanation for the substrate issue.{" "}
          <Cite k={["zhao2026amxlnr", "battaglia2011pentose"]} />
        </p>
        <p>
          Methods:{" "}
          <a
            href="https://static.igem.wiki/teams/6147/wiki/wet-protocol/17-a08-carbon-source-and-strain-fermentation-en-corrected.pdf"
            target="_blank"
            rel="noreferrer"
          >
            carbon-source fermentation
          </a>{" "}
          and{" "}
          <a
            href="https://static.igem.wiki/teams/6147/wiki/wet-protocol/15-corn-stover-hydrolysate-conditioning-en.pdf"
            target="_blank"
            rel="noreferrer"
          >
            hydrolysate conditioning
          </a>
          .
        </p>

        <WetEngineeringCycle cycles={wetEngineeringCycles} />
      </div>
    ),
  },
  {
    id: "wet-engineering-outcomes",
    title: "Engineering Outcomes",
    content: (
      <p>
        We delivered three connected outputs: a selected dual-regulator strain,
        a tested panel of heterologous PYC combinations, and a formulation study
        that connects preparation variables to substrate-specific adhesion.
        These outputs give us a very concrete roadmap for our next experiments,
        while keeping what we actually finished strictly separate from what we
        plan to redesign.
      </p>
    ),
  },
];

const wetEngineeringIds = new Set(
  wetEngineeringSections.map((section) => section.id),
);

function engineeringModeFromLocation(
  search: string,
  hash: string,
): EngineeringMode {
  const explicitMode = new URLSearchParams(search).get("mode");
  if (
    explicitMode === "model" ||
    explicitMode === "hardware" ||
    explicitMode === "wetlab"
  ) {
    return explicitMode;
  }
  const target = hash.slice(1);
  if (target.startsWith("dbtl-en-")) return "model";
  return wetEngineeringIds.has(target) ||
    target.startsWith("wet-engineering-") ||
    target === "references" ||
    /^ref-\d+$/.test(target)
    ? "wetlab"
    : "hardware";
}

export function Engineering() {
  const location = useLocation();
  const navigate = useNavigate();
  const mode = engineeringModeFromLocation(location.search, location.hash);
  const isWetLab = mode === "wetlab";
  const isModel = mode === "model";

  // Keep native fragment links and browser history in sync with Router navigation.
  useEffect(() => {
    const syncHash = () => {
      navigate(
        `${location.pathname}${window.location.search}${window.location.hash}`,
        { replace: true, preventScrollReset: true },
      );
    };
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (!isModel) return;
    const params = new URLSearchParams(location.search);
    params.set("mode", "model");
    let hash = location.hash;
    if (hash === "#dbtl-en-references") hash = "#references";
    const reference = hash.match(/^#dbtl-en-ref-(\d+)$/);
    if (
      reference &&
      Number(reference[1]) >= 1 &&
      Number(reference[1]) <= modelEngineeringReferenceOrder.length
    ) {
      hash = `#ref-${Number(reference[1])}`;
    }
    const search = `?${params.toString()}`;
    if (search !== location.search || hash !== location.hash) {
      navigate(
        { pathname: location.pathname, search, hash },
        { replace: true, preventScrollReset: true },
      );
    }
  }, [isModel, location.pathname, location.search, location.hash, navigate]);

  const selectMode = (nextMode: EngineeringMode) => {
    if (nextMode === mode) return;
    const params = new URLSearchParams(location.search);
    if (nextMode === "model") params.set("mode", "model");
    else params.delete("mode");
    const sectionId =
      nextMode === "model"
        ? "dbtl-en-overview"
        : nextMode === "wetlab"
          ? "wet-engineering"
          : "engineering-overview";
    navigate(
      {
        pathname: location.pathname,
        search: params.toString(),
        hash: `#${sectionId}`,
      },
      { replace: true, preventScrollReset: true },
    );
  };

  return (
    <ArticlePage
      title="Engineering Success"
      heroImage={{
        src: "https://static.igem.wiki/teams/6147/wiki/dbtl.webp",
        alt: "Illustration of the Design, Build, Test, and Learn engineering cycle with arrows, drafting tools, and engineering icons.",
        intrinsicWidth: 1672,
        intrinsicHeight: 941,
      }}
      sections={
        isModel
          ? modelEngineeringSections
          : isWetLab
            ? wetEngineeringSections
            : hardwareSections
      }
      contentControls={
        <EngineeringModeSwitch value={mode} onChange={selectMode} />
      }
      contentKey={mode}
      references={isWetLab || isModel}
      referencesAnchorId={isModel ? "dbtl-en-references" : undefined}
      referenceOrder={
        isModel
          ? modelEngineeringReferenceOrder
          : isWetLab
            ? wetEngineeringReferenceOrder
            : []
      }
      stickyMobileOutline
    />
  );
}

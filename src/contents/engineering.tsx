import {
  ArticlePage,
  type ArticleSection,
} from "../components/article/ArticlePage";
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
import { Figure } from "../components/media/Figure";

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

const sections: ArticleSection[] = [
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

export function Engineering() {
  return (
    <ArticlePage
      title="Engineering Success"
      lead="Four cycles of DBTL-driven development of an automated ammonia-nitrogen removal system for anaerobic fermentation effluent."
      sections={sections}
      stickyMobileOutline
    />
  );
}

import {
  ArticlePage,
  type ArticleSection,
} from "../components/article/ArticlePage";
import { Figure } from "../components/media/Figure";
import { Cite } from "../components/article/References";

// Content supplied in received/wiki-materials/engineering/hardware-iteration/page.md.
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
        <ul>
          <li>
            <strong>Core approach:</strong> H⁺/Na⁺ cation exchange resin
            selectively captures NH₄⁺ ions from the fermentation broth through
            ion exchange, releasing H⁺ or Na⁺ into the solution.
          </li>
          <li>
            <strong>Design goal:</strong> Achieve fully automated operation —
            resin adsorption, fluid circulation, and data monitoring — to
            eliminate manual sampling errors and provide data for downstream
            sugar solution concentration.
          </li>
          <li>
            <strong>Integration target:</strong> A standardized data interface
            connects to our project's OpenClaw control system, enabling
            intelligent coordination across the entire workflow: anaerobic
            fermentation → ammonia removal → aerobic fermentation → product
            concentration.
          </li>
          <li>
            <strong>Key objectives:</strong>
            <ul>
              <li>
                Remove ammonia nitrogen from anaerobic fermentation effluent
                using cation exchange resin
              </li>
              <li>
                Enable continuous resin reuse through in-situ regeneration
                without physical replacement
              </li>
              <li>
                Integrate real-time monitoring (pH, temperature) with automated
                valve control
              </li>
              <li>
                Provide a standardized data interface for OpenClaw system
                integration
              </li>
            </ul>
          </li>
        </ul>
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
          Test, Learn — across four iterations <Cite k="igem2024engineering" />.
          Each cycle addressed specific limitations identified in the previous
          one, progressively transforming a simple filtration column into a
          fully automated, IoT-enabled ammonia-nitrogen removal platform.
        </p>
      </>
    ),
  },
  {
    id: "engineering-cycle-1",
    title: "Cycle 1: Initial Filtration System",
    content: (
      <>
        <p>
          <em>
            Simple gravity-fed ion exchange column — validating the core concept
          </em>
        </p>
        <h3>Design</h3>
        <p>
          The core challenge was removing ammonia nitrogen (NH₄⁺) from anaerobic
          fermentation effluent. Our initial design concept was straightforward:
          pass the fermentation effluent through a bed of H⁺/Na⁺ cation exchange
          resin, which would selectively capture NH₄⁺ ions through ion exchange.
        </p>
        <p>
          We selected a strong acid cation exchange resin in H⁺/Na⁺ form, chosen
          for its high selectivity toward ammonium ions and compatibility with
          fermentation broth conditions. The hardware setup consisted of a
          single cylindrical column packed with resin beads, connected to a
          peristaltic pump for fluid delivery. Fermentation effluent would enter
          from the top of the column, percolate through the resin bed, and exit
          from the bottom as treated effluent.
        </p>
        <h3>Build</h3>
        <p>The first prototype was assembled using off-the-shelf components:</p>
        <div
          className="table-responsive"
          role="region"
          aria-label="Initial filtration system components"
          tabIndex={0}
        >
          <table>
            <thead>
              <tr>
                <th scope="col">Component</th>
                <th scope="col">Function</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Transparent acrylic cylindrical column</th>
                <td>Houses the cation exchange resin bed</td>
              </tr>
              <tr>
                <th scope="row">H⁺/Na⁺ cation exchange resin</th>
                <td>Captures NH₄⁺ ions from fermentation effluent</td>
              </tr>
              <tr>
                <th scope="row">Peristaltic pump</th>
                <td>Drives fluid through the column</td>
              </tr>
              <tr>
                <th scope="row">Silicone tubing</th>
                <td>
                  Connects effluent reservoir to column inlet and outlet to
                  collection vessel
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          No sensors, no valves, and no automation were included in this initial
          build. The system was operated entirely manually.
        </p>
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
        <h3>Test</h3>
        <p>
          The system successfully adsorbed ammonia nitrogen from the
          fermentation effluent, confirming the basic feasibility of the ion
          exchange approach. However, several critical issues were identified
          during testing:
        </p>
        <ol>
          <li>
            <strong>Non-uniform flow distribution:</strong> The simple column
            design resulted in channeling effects and dead zones within the
            resin bed. Portions of the resin remained unused while preferential
            flow paths developed, reducing adsorption efficiency and resin
            utilization.
          </li>
          <li>
            <strong>No regeneration capability:</strong> Once the resin reached
            saturation, it had to be manually removed from the column and
            replaced with fresh resin. This made continuous operation
            impractical for extended biomanufacturing runs.
          </li>
          <li>
            <strong>Lack of monitoring:</strong> Without sensors, the operator
            had no way to determine when the resin was approaching saturation.
            This led to either premature replacement (wasting resin capacity) or
            breakthrough events (contaminated effluent reaching downstream
            processes).
          </li>
        </ol>
        <h3>Learn</h3>
        <p>
          The initial prototype validated the core concept of ion exchange for
          ammonia nitrogen removal but revealed three key areas for improvement:
        </p>
        <ul>
          <li>
            <strong>Flow optimization:</strong> The filter cartridge geometry
            needed redesigning to ensure uniform flow distribution across the
            entire resin bed, minimizing dead volume and channeling effects.
          </li>
          <li>
            <strong>Regeneration mechanism:</strong> A system for in-situ resin
            regeneration without disassembly was essential for practical
            continuous operation.
          </li>
          <li>
            <strong>Monitoring integration:</strong> Real-time sensors were
            needed to track system status and trigger regeneration cycles
            automatically.
          </li>
        </ul>
        <p>
          <strong>Key insight:</strong> Physical optimization of the filter
          cartridge was the most immediate bottleneck. Flow distribution issues
          directly impacted adsorption efficiency and resin utilization, making
          it the priority for Cycle 2.
        </p>
      </>
    ),
  },
  {
    id: "engineering-cycle-2",
    title: "Cycle 2: Optimized Filter Cartridge",
    content: (
      <>
        <p>
          <em>
            Adjustable-spacing modular design with CFD-guided flow optimization
          </em>
        </p>
        <h3>Design</h3>
        <p>
          To address the flow distribution issues identified in Cycle 1, we
          redesigned the filter cartridge with three key innovations:
        </p>
        <ul>
          <li>
            <strong>Adjustable spacing mechanism:</strong> The new cartridge
            featured an adjustable internal spacing system, allowing the
            operator to modify the resin bed height and compaction level. This
            accommodates different resin types and flow rates, ensuring optimal
            contact between the fermentation effluent and the resin beads under
            varying operating conditions.
          </li>
          <li>
            <strong>Snap-in modular filter-cartridge design:</strong> The
            cartridge was designed as a modular, snap-in unit that could be
            easily inserted and removed from the main housing. This enables
            rapid replacement of different adsorbent materials without
            disassembling the entire system, providing flexibility for testing
            different resin configurations.
          </li>
          <li>
            <strong>CFD-optimized internal geometry:</strong> We employed
            Computational Fluid Dynamics (CFD) simulation to model and optimize
            the internal flow paths within the cartridge. The simulation
            identified dead zones, evaluated flow uniformity across the resin
            bed, and guided the design of internal flow distributors to minimize
            pressure drop while maximizing resin utilization.
          </li>
        </ul>
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
        <h3>Build</h3>
        <p>The redesigned filter cartridge was fabricated with:</p>
        <ul>
          <li>
            Adjustable-spacing housing with internal flow distributors at the
            inlet and outlet
          </li>
          <li>
            CFD-validated internal geometry with optimized inlet/outlet
            configurations to eliminate dead zones
          </li>
          <li>Snap-in modular interface for tool-free cartridge replacement</li>
          <li>
            Peristaltic pump with improved flow control for consistent delivery
          </li>
        </ul>
        <p>
          CFD simulation was performed to model the fluid flow through the resin
          bed under various flow rates. The simulation results guided the design
          of internal flow distributors and the optimization of the cartridge
          geometry, including inlet diffuser angle, outlet collector
          configuration, and resin bed height-to-diameter ratio.
        </p>
        <h3>Test</h3>
        <p>
          The optimized cartridge showed significant improvements over Cycle 1:
        </p>
        <ul>
          <li>
            <strong>Flow distribution:</strong> CFD simulation confirmed that
            the redesigned internal geometry eliminated major dead zones and
            achieved more uniform flow distribution across the resin bed. The
            simulated velocity field showed consistent flow rates throughout the
            resin bed, with minimal channeling compared to the Cycle 1 design.
          </li>
          <li>
            <strong>Modular functionality:</strong> The snap-in design allowed
            for quick cartridge replacement, enabling rapid testing with
            different resin types and bed configurations without system
            downtime.
          </li>
          <li>
            <strong>Adjustable spacing:</strong> The adjustable mechanism
            provided flexibility in resin bed height, allowing optimization for
            different flow rates and ammonia nitrogen concentrations in the
            fermentation effluent.
          </li>
        </ul>
        <p>
          However, the core limitation from Cycle 1 remained: the system still
          lacked in-situ regeneration capability. Resin still needed to be
          manually replaced after saturation, although the snap-in modular
          design made this process significantly faster.
        </p>
        <h3>Learn</h3>
        <p>
          Cycle 2 successfully solved the physical flow distribution problem
          through CFD-guided design optimization. The modular and adjustable
          features added significant operational flexibility. However, the
          fundamental challenge of continuous operation remained — without
          automated resin regeneration, the system could not run unattended for
          extended periods.
        </p>
        <p>
          <strong>Key insight:</strong> Physical optimization alone was
          insufficient. We needed to integrate a fluid switching mechanism that
          could redirect flow between different operational loops — adsorption,
          washing, and regeneration — without manual intervention. This insight
          directly led to the multi-way valve design in Cycle 3.
        </p>
      </>
    ),
  },
  {
    id: "engineering-cycle-3",
    title: "Cycle 3: Multi-way Valve Regeneration System",
    content: (
      <>
        <p>
          <em>
            Two multi-way valves enabling continuous in-situ resin regeneration
          </em>
        </p>
        <h3>Design</h3>
        <p>
          The breakthrough in Cycle 3 was the integration of two multi-way
          valves to create a fully switchable fluid circuit system. This enabled
          three distinct operational loops within a single hardware setup,
          allowing the resin to be regenerated in place without physical
          removal:
        </p>
        <div
          className="table-responsive"
          role="region"
          aria-label="Multi-way valve operational loops"
          tabIndex={0}
        >
          <table>
            <thead>
              <tr>
                <th scope="col">Loop</th>
                <th scope="col">Fluid</th>
                <th scope="col">Function</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Adsorption</th>
                <td>Fermentation effluent</td>
                <td>
                  NH₄⁺ ions captured by resin; treated effluent exits for
                  downstream aerobic fermentation
                </td>
              </tr>
              <tr>
                <th scope="row">Washing</th>
                <td>Clean water</td>
                <td>
                  Flushes residual fermentation broth from resin bed before and
                  after regeneration
                </td>
              </tr>
              <tr>
                <th scope="row">Regeneration</th>
                <td>Regeneration solution (acid/base)</td>
                <td>
                  Strips adsorbed NH₄⁺ from resin, recovering it as concentrated
                  solution; resin restored for next cycle
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          By switching the multi-way valves, the system seamlessly transitions
          between these three loops, enabling continuous resin reuse. The
          operational cycle becomes:
        </p>
        <p>
          <em>
            Adsorption → Washing → Regeneration → Washing → Adsorption →
            (repeat)
          </em>
        </p>
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
        <h3>Build</h3>
        <p>
          The multi-way valve system was constructed with the following
          components integrated with the optimized filter cartridge from Cycle
          2:
        </p>
        <ul>
          <li>
            Two multi-way valves (V1, V2) positioned at the inlet and outlet of
            the resin column, controlling fluid routing
          </li>
          <li>
            Three fluid pathways connecting the valves to respective reservoirs:
            fermentation effluent reservoir, clean water reservoir, and
            regeneration solution reservoir
          </li>
          <li>
            Automated circulating pipeline connecting all components into a
            closed-loop system
          </li>
          <li>
            Peristaltic pump for consistent fluid delivery through all three
            loops
          </li>
          <li>
            Optimized filter cartridge from Cycle 2 serving as the core
            adsorption unit
          </li>
        </ul>
        <p>
          The valve switching sequence was initially controlled manually, with
          the operator determining when to transition between loops based on
          visual inspection and timed intervals.
        </p>
        <h3>Test</h3>
        <p>
          The multi-way valve system successfully achieved continuous resin
          regeneration:
        </p>
        <ol>
          <li>
            <strong>Adsorption efficiency:</strong> The resin effectively
            captured NH₄⁺ from fermentation effluent during the adsorption
            phase, producing treated effluent suitable for downstream aerobic
            fermentation.
          </li>
          <li>
            <strong>Regeneration effectiveness:</strong> The regeneration
            solution successfully stripped adsorbed NH₄⁺ from the resin,
            restoring its adsorption capacity for subsequent cycles. The
            recovered ammonia nitrogen solution was collected as a concentrated
            byproduct.
          </li>
          <li>
            <strong>Loop switching reliability:</strong> The two multi-way
            valves reliably switched between the three operational loops without
            cross-contamination between fluid streams. The valve positions
            clearly isolated each loop during operation.
          </li>
          <li>
            <strong>Continuous operation:</strong> Multiple
            adsorption-regeneration cycles were completed without manual resin
            replacement, validating the closed-loop design. The system could
            operate for extended periods with only periodic refilling of
            reservoirs.
          </li>
        </ol>
        <p>
          However, the system still required manual valve switching and operator
          monitoring to determine when to transition between loops. Without
          sensors, the timing of loop transitions was based on time estimates
          rather than real-time data, risking premature regeneration or resin
          breakthrough.
        </p>
        <h3>Learn</h3>
        <p>
          Cycle 3 solved the critical problem of continuous resin reuse through
          the multi-way valve system. The closed-loop design — adsorption,
          washing, regeneration, washing, repeat — eliminated the need for
          physical resin replacement, making the system practical for extended
          biomanufacturing operations. Two multi-way valves were sufficient to
          handle all fluid routing requirements.
        </p>
        <p>
          <strong>Key insight:</strong> The remaining challenge was automation.
          The system needed to monitor its own status (pH, temperature, flow
          rate) and automatically switch between operational loops based on
          real-time sensor data, rather than relying on manual intervention and
          timed estimates. This drove the IoT integration in Cycle 4.
        </p>
      </>
    ),
  },
  {
    id: "engineering-cycle-4",
    title: "Cycle 4: IoT Integration & Mini-Program Control",
    content: (
      <>
        <p>
          <em>
            Real-time monitoring, automated valve control, and remote operation
            via WeChat mini-program
          </em>
        </p>
        <h3>Design</h3>
        <p>
          Cycle 4 transformed the hardware from a manually-operated system into
          a fully automated, remotely monitored platform. The design integrated
          six key subsystems:
        </p>
        <ol>
          <li>
            <strong>Sensor array:</strong> pH and temperature sensors were
            installed at critical points in the fluid circuit. The pH sensor
            tracks the ion exchange process — when effluent pH shifts, it
            indicates resin saturation and triggers the regeneration cycle. The
            temperature sensor ensures optimal operating conditions for both
            adsorption and regeneration.
          </li>
          <li>
            <strong>Main controller:</strong> A microcontroller serves as the
            central processing unit, collecting sensor data, controlling the
            peristaltic pump and multi-way valves, and managing the automated
            operation workflow. The controller executes the cycle logic based on
            sensor thresholds rather than timed intervals.
          </li>
          <li>
            <strong>Cloud communication (MQTT):</strong> MQTT protocol was
            implemented for real-time data transmission to a cloud server. All
            sensor readings, valve states, and system status are continuously
            streamed to the cloud, enabling remote monitoring and historical
            data analysis.
          </li>
          <li>
            <strong>WeChat mini-program:</strong> A custom WeChat mini-program
            provides the user interface for remote monitoring and control. It
            displays real-time sensor data, system status, and operational
            history, and allows the operator to remotely adjust parameters,
            start/stop the system, and receive alerts.
          </li>
          <li>
            <strong>OLED local display:</strong> A local OLED screen provides
            on-site visual feedback, displaying key parameters and system status
            without requiring a mobile device.
          </li>
          <li>
            <strong>OpenClaw integration:</strong> The hardware system exposes a
            standardized data interface that connects to our project's OpenClaw
            control system. This enables full-process intelligent linkage —
            OpenClaw coordinates the entire workflow from anaerobic fermentation
            through ammonia nitrogen removal to aerobic fermentation and product
            concentration, using real-time data from the hardware system to
            optimize the overall biomanufacturing process.
          </li>
        </ol>
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
        <h3>Build</h3>
        <p>
          The complete IoT system was assembled with the following components
          integrated with the hardware platform from Cycle 3:
        </p>
        <ul>
          <li>
            pH sensor and temperature sensor integrated into the fluid circuit
            at the column outlet
          </li>
          <li>
            Main controller (MCU) with GPIO connections to sensors, peristaltic
            pump, and both multi-way valves
          </li>
          <li>OLED display module for local real-time visualization</li>
          <li>WiFi module for MQTT cloud communication</li>
          <li>
            WeChat mini-program developed for mobile monitoring and control
          </li>
          <li>Standardized data interface module for OpenClaw integration</li>
        </ul>
        <p>
          The automated operation logic was programmed into the controller as
          follows:
        </p>
        <ol>
          <li>
            <strong>Adsorption:</strong> pump drives effluent through resin; pH
            sensor monitors saturation
          </li>
          <li>
            <strong>Washing:</strong> valves switch to clean water loop; flush
            duration preset
          </li>
          <li>
            <strong>Regeneration:</strong> valves switch to regeneration
            solution; pH confirms completion
          </li>
          <li>
            <strong>Final wash:</strong> clean water flushes residual
            regeneration solution
          </li>
          <li>
            <strong>Return to adsorption</strong> — cycle repeats automatically
          </li>
        </ol>
        <h3>Test</h3>
        <p>The integrated IoT system achieved all design objectives:</p>
        <ul>
          <li>
            <strong>Real-time monitoring:</strong> pH and temperature data were
            continuously streamed to both the OLED display and the cloud server.
            The WeChat mini-program provided remote visibility into system
            status, with data updates at regular intervals.
          </li>
          <li>
            <strong>Automated operation:</strong> The system successfully
            executed multiple adsorption-regeneration cycles without manual
            intervention. Valve switching was triggered automatically by sensor
            thresholds — when the pH sensor detected resin saturation during
            adsorption, the controller initiated the washing and regeneration
            sequence without operator input.
          </li>
          <li>
            <strong>Remote control:</strong> The WeChat mini-program enabled
            remote parameter adjustment (flow rate, pH thresholds, washing
            duration) and system start/stop commands, with real-time feedback
            confirming each action.
          </li>
          <li>
            <strong>OpenClaw integration:</strong> The standardized data
            interface successfully transmitted hardware status data to the
            OpenClaw control system. OpenClaw was able to coordinate the
            hardware system's operation with the upstream anaerobic fermentation
            and downstream aerobic fermentation processes, demonstrating
            full-process intelligent linkage.
          </li>
        </ul>
        <h3>Learn</h3>
        <p>
          Cycle 4 completed the hardware engineering journey, transforming the
          system from a simple filtration column into a fully automated,
          IoT-enabled ammonia-nitrogen removal platform. The integration of
          sensors, automated valve control, cloud communication, and the WeChat
          mini-program eliminated the need for manual monitoring and
          intervention, achieving the project's hardware goals:
        </p>
        <ul>
          <li>
            Automated ammonia nitrogen removal from anaerobic fermentation
            effluent
          </li>
          <li>Real-time monitoring replacing manual sampling and detection</li>
          <li>Continuous resin reuse through automated regeneration cycles</li>
          <li>Standardized data interface for OpenClaw system integration</li>
          <li>
            Full-process intelligent linkage across the biomanufacturing
            workflow
          </li>
        </ul>
        <p>
          <strong>Outcome:</strong> The four DBTL cycles yielded a complete
          hardware system that addresses all initial requirements — from the
          core ion exchange function to automated operation, real-time
          monitoring, and system-level integration. The iterative approach
          ensured that each cycle's learnings directly informed the next cycle's
          design, resulting in a robust and practical platform for
          biomanufacturing ammonia-nitrogen removal.
        </p>
      </>
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
        <div
          className="table-responsive"
          role="region"
          aria-label="Engineering cycle summary"
          tabIndex={0}
        >
          <table>
            <thead>
              <tr>
                <th scope="col">Cycle</th>
                <th scope="col">Focus</th>
                <th scope="col">Key Achievement</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Initial Filtration</td>
                <td>
                  Validated ion exchange concept; identified flow distribution,
                  regeneration, and monitoring gaps
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Optimized Cartridge</td>
                <td>
                  CFD-optimized adjustable cartridge solved flow distribution;
                  snap-in modular design added flexibility
                </td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Multi-way Valve</td>
                <td>
                  Multi-way valve system enabled continuous in-situ resin
                  regeneration; closed-loop operation achieved
                </td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>IoT Integration</td>
                <td>
                  IoT monitoring, automated control, mini-program, and OpenClaw
                  integration completed the platform
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
      title="Engineering"
      lead="Four cycles of DBTL-driven development of an automated ammonia-nitrogen removal system for anaerobic fermentation effluent."
      sections={sections}
      references
    />
  );
}

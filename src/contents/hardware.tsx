import {
  ArticlePage,
  ArticleNote,
  type ArticleSection,
} from "../components/article/ArticlePage";
import { Figure } from "../components/media/Figure";
import { Cite } from "../components/article/References";
import { VideoEmbed } from "../components/media/VideoEmbed";

// Content supplied in received/wiki-materials/dry-lab/hardware/page.md.
const sections: ArticleSection[] = [
  {
    id: "hardware-overview",
    title: "Overview",
    content: (
      <>
        <p>
          This page documents the design, component selection, operation, and
          testing of our modular hardware platform for automated
          ammonia-nitrogen removal from anaerobic fermentation effluent. The
          platform integrates two submodules: (1) a fluidic ion-exchange
          deammonification unit and (2) an IoT monitoring and control system.
          The system was validated using real anaerobic fermentation effluent
          produced by our wet-lab team. Key engineering metrics — including
          sensor calibration, system reliability, and failure-mode handling —
          are reported in the corresponding sections below.
        </p>
        <p>
          <strong>Key Takeaways:</strong>
        </p>
        <ul>
          <li>
            The platform removes ammonium waste from anaerobic fermentation
            broth using cation exchange resin, enabling downstream aerobic
            malate biosynthesis.
          </li>
          <li>
            The total hardware cost is $171.54, using only commercially
            available components.
          </li>
          <li>
            The IoT system provides real-time monitoring of pH, temperature,
            turbidity, and liquid level via STM32 + ESP8266 cloud connectivity.
          </li>
          <li>
            The system was tested with real fermentation effluent and includes
            fail-safe mechanisms for pump, valve, and sensor failures.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "hardware-introduction",
    title: "Part 1. Introduction",
    content: (
      <>
        <p>
          Anaerobic fermentation is a core upstream bioprocess for our malate
          biosynthesis pathway. However, ammonia nitrogen accumulates as a
          metabolic byproduct during the anaerobic stage. This waste ammonia not
          only suppresses the activity of anaerobic microbes, but also carries
          over into the subsequent aerobic fermentation. Residual ammonium
          interferes with the growth of engineered strains and impairs the
          production of malic acid and poly-malate in downstream steps.
        </p>
        <p>
          To tackle this problem, we constructed a modular hardware platform
          containing two submodules: an ammonia-nitrogen removal fluidic module
          and an IoT monitoring &amp; control system. This hardware takes
          anaerobic fermentation effluent as the inlet stream and removes
          ammonium waste before the broth enters downstream units. Our hardware
          tightly integrates wet-lab experiments and computational models. It
          monitors fermentation broth parameters in real time and automatically
          performs ion-exchange deammonification. The treated liquid with low
          ammonia concentration can then go through sugar concentration and
          aerobic xylose fermentation for malate and poly-malate production.
          Separating waste removal from biosynthesis reduces manual operation
          workload and experimental error.
        </p>
      </>
    ),
  },
  {
    id: "hardware-structure",
    title: "Part 2. Structure Overview",
    content: (
      <>
        <p>
          The hardware platform adopts a modular architecture, divided into the
          ammonia-nitrogen removal fluidic unit and the IoT control unit.
        </p>
        <h3>2.1 Fluid stream</h3>
        <p>
          Effluent from the anaerobic bioreactor is delivered by peristaltic
          pumps into our ion-exchange adsorption column. Ammonium waste is
          captured by cation exchange resin. The ammonia-depleted fermentation
          liquid exits the column and flows to downstream processes. The broth
          then undergoes sugar concentration, followed by aerobic xylose
          fermentation to produce malic acid and poly-malate. Multi-way valves
          are integrated to switch pipelines among adsorption, washing and resin
          regeneration modes.
        </p>
        <Figure
          id="hardware-figure-2-1"
          src="https://static.igem.wiki/teams/6147/wiki/figure2-1-fluent-system.avif"
          intrinsicWidth={3276}
          intrinsicHeight={870}
          alt="Fluid stream"
          captionPrefix="Figure 2-1."
          caption="Fluid stream"
          fallback={<p>Image unavailable.</p>}
        />
        <h3>2.2 Data stream</h3>
        <p>
          Sensors measure the pH and temperature of the anaerobic effluent. The
          main controller collects sensor readings, displays data locally on an
          OLED screen, and transmits data to the cloud via the MQTT protocol.
          Users can remotely monitor system status and adjust operational
          parameters through mobile applications or WeChat mini programs. A
          system overview diagram visualizes the fluid routing and data flow
          between modules, illustrating how our hardware fits into the full
          biomanufacturing workflow.
        </p>
        <Figure
          id="hardware-figure-2-2"
          src="https://static.igem.wiki/teams/6147/wiki/figure2-2-data-stream-overview-drawio.avif"
          intrinsicWidth={1353}
          intrinsicHeight={2217}
          maxHeight="min(65svh, 640px)"
          alt="Data stream overview"
          captionPrefix="Figure 2-2."
          caption="Data stream overview"
          fallback={<p>Image unavailable.</p>}
        />
      </>
    ),
  },
  {
    id: "hardware-components",
    title: "Part 3. Hardware Component Selection",
    content: (
      <>
        <p>
          Our hardware platform integrates fluidic, structural, sensing, and
          electronic components selected to meet the functional requirements of
          automated ammonia-nitrogen removal and IoT monitoring. The selection
          criteria emphasize chemical compatibility with fermentation broth,
          cost-effectiveness, and ease of assembly. Key components are organized
          by subsystem below.
        </p>
        <h3>3.1 Fluidic Components</h3>
        <p>
          The fluidic circuit drives fermentation effluent through the
          ion-exchange column and switches between adsorption, washing, and
          regeneration loops. Peristaltic pumps were chosen over centrifugal or
          syringe pumps for their chemical inertness with fermentation broth,
          self-priming capability, and easy tubing replacement for
          sterilization. The WK4A four-way valve enables automated loop
          switching without manual reconfiguration, which is critical for
          unattended operation.
        </p>
        <div
          className="table-responsive"
          role="region"
          aria-label="3.1 Fluidic Components"
          tabIndex={0}
        >
          <table>
            <thead>
              <tr>
                <th scope="col">Component</th>
                <th scope="col">Specification</th>
                <th scope="col">Function</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Motor RS-380SA (Peristaltic Pump)</th>
                <td>DC motor, 10 units</td>
                <td>Drives fluid through the column and tubing circuit</td>
              </tr>
              <tr>
                <th scope="row">WK4A Four-Way Switch</th>
                <td>4-way valve, 1 unit</td>
                <td>
                  Switches fluid routing among adsorption, washing, and
                  regeneration loops
                </td>
              </tr>
              <tr>
                <th scope="row">Check Valve (8 mm)</th>
                <td>20 units</td>
                <td>Prevents backflow within the fluidic circuit</td>
              </tr>
              <tr>
                <th scope="row">Silicone Tube (ID 3 mm, OD 5 mm)</th>
                <td>5 m</td>
                <td>
                  Connects all fluidic components; chemically inert and flexible
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3>3.2 Adsorbent Materials</h3>
        <p>
          Two types of cation exchange resin are used to capture NH₄⁺ ions from
          anaerobic fermentation effluent. Both resins were selected over
          activated carbon and zeolite alternatives because ion exchange resins
          provide higher selectivity for NH₄⁺ and are regenerable, reducing
          long-term cost and waste.
        </p>
        <div
          className="table-responsive"
          role="region"
          aria-label="3.2 Adsorbent Materials"
          tabIndex={0}
        >
          <table>
            <thead>
              <tr>
                <th scope="col">Component</th>
                <th scope="col">Specification</th>
                <th scope="col">Function</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Sodium-Type Cation Exchange Resin</th>
                <td>2 units</td>
                <td>Na⁺ form resin for selective NH₄⁺ capture</td>
              </tr>
              <tr>
                <th scope="row">Strong-Acid Cation Exchange Resin</th>
                <td>1 unit</td>
                <td>
                  H⁺ form resin for high-capacity ammonium adsorption and
                  regeneration
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3>3.3 Structural Components</h3>
        <p>
          The mechanical housing and support structure are fabricated from
          3D-printed and off-the-shelf parts.
        </p>
        <div
          className="table-responsive"
          role="region"
          aria-label="3.3 Structural Components"
          tabIndex={0}
        >
          <table>
            <thead>
              <tr>
                <th scope="col">Component</th>
                <th scope="col">Specification</th>
                <th scope="col">Function</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Bambu Lab PLA Basic Filament</th>
                <td>6 spools</td>
                <td>3D-printed structural housing and custom mounts</td>
              </tr>
              <tr>
                <th scope="row">Double-Sided Perforated Board (9×15)</th>
                <td>1 unit</td>
                <td>Prototyping board for electronic component mounting</td>
              </tr>
              <tr>
                <th scope="row">Perforated Board Kit</th>
                <td>1 kit</td>
                <td>Additional mounting and wiring substrate</td>
              </tr>
              <tr>
                <th scope="row">M3 Copper Standoffs (8/15/20 mm)</th>
                <td>1 set</td>
                <td>Spacers for stacking and securing PCB layers</td>
              </tr>
              <tr>
                <th scope="row">M2 &amp; M3 Screws</th>
                <td>1 set</td>
                <td>Fasteners for mechanical assembly</td>
              </tr>
              <tr>
                <th scope="row">Cable Ties (3.6 mm × 30 cm)</th>
                <td>200 pcs</td>
                <td>Cable management and tubing securing</td>
              </tr>
              <tr>
                <th scope="row">Foam Adhesive Tape (20 mm × 3 m)</th>
                <td>2 rolls</td>
                <td>Vibration dampening and component cushioning</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3>3.4 Sensing Components</h3>
        <p>
          Sensors monitor real-time fermentation parameters to trigger automated
          valve switching and regeneration cycles. The pH sensor was selected as
          the primary indicator of resin saturation because NH₄⁺ capture
          releases H⁺/Na⁺, causing a measurable pH shift in the effluent stream.
          Turbidity and liquid-level sensors serve as secondary indicators for
          process integrity and leak detection.
        </p>
        <div
          className="table-responsive"
          role="region"
          aria-label="3.4 Sensing Components"
          tabIndex={0}
        >
          <table>
            <thead>
              <tr>
                <th scope="col">Component</th>
                <th scope="col">Specification</th>
                <th scope="col">Function</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">NTC Temperature Sensor</th>
                <td>4 units</td>
                <td>Monitors fermentation broth temperature</td>
              </tr>
              <tr>
                <th scope="row">
                  pH Sensor (Module + Electrode + Calibration)
                </th>
                <td>2 units</td>
                <td>
                  Tracks ion exchange progress; pH shift indicates resin
                  saturation
                </td>
              </tr>
              <tr>
                <th scope="row">AZDM01 Turbidity Sensor</th>
                <td>2 units</td>
                <td>Measures broth turbidity for process monitoring</td>
              </tr>
              <tr>
                <th scope="row">Flexible Liquid-Level Sensor</th>
                <td>5 units</td>
                <td>Detects fluid levels in reservoirs and column</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3>3.5 Electronic and Control Components</h3>
        <p>
          The control architecture is centered around an STM32 microcontroller
          with Wi-Fi connectivity for cloud communication. The STM32F103C8T6 was
          chosen over Arduino Uno and ESP32 alternatives for its higher I/O
          count, lower power consumption, and native support for real-time
          control tasks required by multi-sensor sampling and valve actuation.
          The ESP8266 module provides cost-effective cloud connectivity via MQTT
          and is widely documented in the DIY IoT community, reducing the
          barrier for replication.
        </p>
        <div
          className="table-responsive"
          role="region"
          aria-label="3.5 Electronic and Control Components"
          tabIndex={0}
        >
          <table>
            <thead>
              <tr>
                <th scope="col">Component</th>
                <th scope="col">Specification</th>
                <th scope="col">Function</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">STM32F103C8T6 Development Kit</th>
                <td>1 unit</td>
                <td>
                  Main controller; collects sensor data and drives
                  pump/valve/OLED
                </td>
              </tr>
              <tr>
                <th scope="row">ESP8266 Wi-Fi Image-Transmission Module</th>
                <td>1 unit</td>
                <td>Cloud connectivity via MQTT to OneNET platform</td>
              </tr>
              <tr>
                <th scope="row">
                  IoT Component Kit (Expansion Board, Modules, ST-LINK)
                </th>
                <td>1 kit</td>
                <td>Programmer, expansion board, and peripheral modules</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The total hardware cost is <strong>171.54 USD</strong> (detailed
          breakdown in Part 8). The complete bill of materials ensures that the
          system can be replicated from commercially available components at low
          cost, supporting the project's goal of accessible, open-source
          biomanufacturing hardware.
        </p>
      </>
    ),
  },
  {
    id: "hardware-ammonia-removal",
    title: "Part 4. Ammonia-Nitrogen Removal System",
    content: (
      <>
        <p>
          This is our primary hardware block. After anaerobic fermentation
          finishes, the effluent contains high concentrations of ammonium waste.
          If left untreated, ammonium inhibits the engineered strains used in
          subsequent aerobic xylose fermentation and hinders malate and
          poly-malate synthesis. We use H⁺/Na⁺ cation exchange resin to
          selectively trap ammonium ions. A custom resin adsorption column
          paired with peristaltic pumps and multi-way valves forms an automatic
          circulating pipeline to remove ammonia waste from the anaerobic broth.
        </p>
        <h3>Principle Interpretation</h3>
        <p>
          We use cation exchange resin as the adsorbent. NH₄⁺ from anaerobic
          fermentation effluent binds to the resin's functional groups via ion
          exchange, releasing H⁺ or Na⁺ into the liquid phase. Once saturated,
          the resin can be regenerated through elution to recover its adsorption
          capacity for repeated use <Cite k="bernstein2007ionexchange" />. After
          this treatment, the ammonia nitrogen concentration of the broth drops
          to a sufficiently low level, and the liquid can be sent to downstream
          sugar concentration and aerobic fermentation.
        </p>
        <Figure
          id="hardware-figure-4-1"
          src="https://static.igem.wiki/teams/6147/wiki/fig4-cycle3-valves.avif"
          intrinsicWidth={2304}
          intrinsicHeight={1728}
          alt="Elution and Regeneration of Ammonia Nitrogen"
          captionPrefix="Figure 4-1."
          caption="Elution and Regeneration of Ammonia Nitrogen"
          fallback={<p>Image unavailable.</p>}
        />
        <h3>Mechanical &amp; Fluid Circuit Design</h3>
        <p>
          We designed a snap-in modular filter-cartridge adsorption column.
          Cartridges can be filled with different adsorbents and replaced on
          demand. CFD simulation is applied to optimize internal fluid pathways,
          minimizing dead volume and ensuring uniform flow distribution across
          the resin bed <Cite k="rahimi2021cfd" />. Multi-way valves switch
          pipelines between the adsorption loop, washing loop and resin
          regeneration loop to enable resin reuse.
        </p>
        <ArticleNote label="Image pending upload">
          <p>
            <strong>Figure 4-2.</strong> Fluid Optimization
          </p>
        </ArticleNote>
        <ArticleNote label="Video pending upload">
          <p>
            <strong>Video 4-1.</strong> Fluid Simulation
          </p>
        </ArticleNote>
        <h3>Automatic Operation Workflow</h3>
        <p>
          The workflow runs automatically as follows: The system samples
          anaerobic fermentation effluent. When ammonia nitrogen exceeds the
          preset threshold, peristaltic pumps start and feed the broth into the
          adsorption column for ammonium capture.
        </p>
        <p>
          Ammonia-depleted liquid flows out of the column and proceeds to
          downstream sugar concentration and aerobic xylose fermentation for
          malate and poly-malate production.
        </p>
        <p>
          When the resin approaches saturation, valves switch to regeneration
          mode. Regenerant flows through the column to elute trapped ammonium
          waste.
        </p>
        <p>
          After washing, the resin cartridge is ready for another adsorption
          cycle.
        </p>
        <ArticleNote label="Image pending upload">
          <p>
            <strong>Figure 4-3.</strong> Hardware Diagram
          </p>
        </ArticleNote>
        <ArticleNote label="Video pending upload">
          <p>
            <strong>Video 4-2.</strong> Working Condition
          </p>
        </ArticleNote>
        <h3>4.1 Failure Mode and Safety Design</h3>
        <p>
          To ensure safe unattended operation, we analyzed critical failure
          modes and implemented corresponding safeguards:
        </p>
        <div
          className="table-responsive"
          role="region"
          aria-label="4.1 Failure Mode and Safety Design"
          tabIndex={0}
        >
          <table>
            <thead>
              <tr>
                <th scope="col">Failure Mode</th>
                <th scope="col">Consequence</th>
                <th scope="col">Mitigation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Pump failure / power loss</th>
                <td>
                  Fluid stops circulating; fermentation broth stalls in column
                </td>
                <td>
                  System detects pump inactivity via current sensor; triggers
                  audible alarm and sends cloud notification
                </td>
              </tr>
              <tr>
                <th scope="row">Sensor drift (pH)</th>
                <td>
                  Incorrect saturation detection; resin overflows or
                  under-regenerates
                </td>
                <td>
                  Two pH sensors deployed in parallel for cross-validation;
                  system enters safe-hold mode if readings diverge beyond
                  threshold
                </td>
              </tr>
              <tr>
                <th scope="row">Valve stuck</th>
                <td>
                  Fluid routed to wrong loop; potential cross-contamination
                </td>
                <td>
                  Valve position feedback via limit switches; system halts if
                  expected position not confirmed within timeout
                </td>
              </tr>
              <tr>
                <th scope="row">ESP8266 disconnects</th>
                <td>Remote monitoring lost; local control continues</td>
                <td>
                  OLED displays local data independently; pump/valve control
                  runs autonomously on STM32 without cloud dependency
                </td>
              </tr>
              <tr>
                <th scope="row">Resin saturation undetected</th>
                <td>Ammonia breakthrough into downstream</td>
                <td>
                  Liquid-level sensor at column outlet detects flow
                  interruption; pH trend analysis triggers regeneration cycle
                  automatically
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The system is designed to fail safe: in the event of any sensor or
          communication failure, the STM32 defaults to stopping all pumps and
          valves, preventing untreated effluent from entering downstream
          processes. The modular snap-in cartridge design allows rapid manual
          replacement of failed components without disassembling the fluidic
          circuit.
        </p>
        <h3>4.2 Real-Environment Validation</h3>
        <p>
          The ammonia-nitrogen removal system was tested with real anaerobic
          fermentation effluent produced by our wet-lab team. The effluent was
          obtained from anaerobic fermentation cultures and contained ammonium
          concentrations representative of actual process conditions. Testing
          validated that the ion-exchange column effectively reduces ammonia
          nitrogen to levels compatible with downstream aerobic fermentation.
          The peristaltic pumps and multi-way valves operated continuously for
          multiple adsorption-regeneration cycles without mechanical failure,
          confirming the reliability of the fluidic circuit under real
          fermentation broth conditions.
        </p>
      </>
    ),
  },
  {
    id: "hardware-iot",
    title: "Part 5. IoT Monitoring and Control System",
    content: (
      <>
        <h3>5.1 System Overview</h3>
        <p>
          To support the anaerobic-aerobic two-stage fermentation process and
          address ammonia-nitrogen toxicity inhibition during the anaerobic
          stage, we developed an integrated IoT monitoring and control system.
          This system enables real-time tracking of key environmental parameters
          and remote control capabilities, ensuring stable operation of the
          biological ammonia-nitrogen removal process{" "}
          <Cite k="wang2020iotbioprocess" />.
        </p>
        <p>
          The hardware platform is built on a single development board centered
          around an STM32 microcontroller. It integrates a DHT11 temperature and
          humidity sensor, a 0.96-inch OLED display for local monitoring, an
          ESP8266 Wi-Fi module for cloud connectivity, and a tactile button for
          manual LED control. While the physical board does not include pH and
          turbidity sensors due to space constraints, these sensors are actively
          used in the experiments and their data are displayed in the user
          application.
        </p>
        <Figure
          id="hardware-figure-5-1"
          src="https://static.igem.wiki/teams/6147/wiki/fig5-1-system-arch.avif"
          intrinsicWidth={2048}
          intrinsicHeight={1030}
          alt="System architecture of the IoT monitoring and control module. A DHT11 sensor feeds temperature and humidity to the STM32 microcontroller, which drives the OLED display, buttons, and LED locally, and uploads data to the OneNET platform via the ESP8266 Wi-Fi module for remote access from the mobile app and PC console."
          captionPrefix="Figure 5-1."
          caption="System architecture of the IoT monitoring and control module. A DHT11 sensor feeds temperature and humidity to the STM32 microcontroller, which drives the OLED display, buttons, and LED locally, and uploads data to the OneNET platform via the ESP8266 Wi-Fi module for remote access from the mobile app and PC console."
          fallback={<p>Image unavailable.</p>}
        />
        <Figure
          id="hardware-figure-5-2"
          src="https://static.igem.wiki/teams/6147/wiki/20261009-145147.avif"
          intrinsicWidth={1824}
          intrinsicHeight={2008}
          alt="Photograph of the integrated development board. An ST-LINK V2 programmer, STM32 minimal system, OLED display, ESP8266 Wi-Fi module, and DHT11 temperature/humidity sensor are wired together for the ammonia-nitrogen removal monitoring system."
          captionPrefix="Figure 5-2."
          caption="Photograph of the integrated development board. An ST-LINK V2 programmer, STM32 minimal system, OLED display, ESP8266 Wi-Fi module, and DHT11 temperature/humidity sensor are wired together for the ammonia-nitrogen removal monitoring system."
          fallback={<p>Image unavailable.</p>}
        />
        <h3>5.2 Data Acquisition and Remote Monitoring</h3>
        <p>
          The system continuously monitors temperature, relative humidity, pH,
          and turbidity during the fermentation process. Sensor data are
          processed by the STM32 and transmitted via the ESP8266 module to the
          China Mobile OneNET IoT platform using an MQTT-style publish-subscribe
          protocol. The ESP8266 connects to a mobile-phone hotspot in AP mode,
          allowing the board, the user's phone, and the PC to share the same
          network for seamless data relay.
        </p>
        <p>
          The OLED screen provides real-time local display of sensor readings
          and also serves a diagnostic function during system initialization.
          Upon power-up, the OLED displays the network connection sequence as
          the ESP8266 executes AT commands (AT, AT+CWMODE, AT+CWDHCP, AT+CWJAP)
          to connect to the hotspot, allowing operators to verify the
          communication setup visually.
        </p>
        <VideoEmbed
          src="https://video.igem.org/videos/embed/qTd67URK3G5zPEptrTrRsQ"
          title="HARDWARE video5-1"
          captionPrefix="Video 5-1."
          caption="OLED display showing the boot initialization sequence of the ESP8266 network connection."
        />
        <h3>5.3 User-Side Application</h3>
        <p>
          A mobile application developed with HBuilderX (also deployable as a
          WeChat Mini Program) provides a user-friendly interface for remote
          monitoring and control. The app displays real-time values of all
          monitored parameters (temperature, humidity, pH, turbidity) and
          includes a toggle switch to control the on-board LED, demonstrating
          end-to-end remote control capability. The same monitoring and control
          functions are also accessible through the OneNET cloud platform
          console.
        </p>
        <Figure
          id="hardware-figure-5-3"
          src="https://static.igem.wiki/teams/6147/wiki/20261009-145155.avif"
          intrinsicWidth={1058}
          intrinsicHeight={1216}
          alt="Mobile application interface. The HBuilderX-built app (also deployable as a WeChat Mini Program) displays real-time temperature, humidity, pH, and turbidity values and offers remote LED control, demonstrating end-to-end remote monitoring and control."
          captionPrefix="Figure 5-3."
          caption="Mobile application interface. The HBuilderX-built app (also deployable as a WeChat Mini Program) displays real-time temperature, humidity, pH, and turbidity values and offers remote LED control, demonstrating end-to-end remote monitoring and control."
          fallback={<p>Image unavailable.</p>}
        />
        <VideoEmbed
          src="https://video.igem.org/videos/embed/u6pTEWPWtHFk3WeDh5oU8t"
          title="HARDWARE video5-2"
          captionPrefix="Video 5-2."
          caption="Mobile application interface showing real-time sensor data and LED control."
        />
        <Figure
          id="hardware-figure-5-4"
          src="https://static.igem.wiki/teams/6147/wiki/fig5-4-onenet.avif"
          intrinsicWidth={2048}
          intrinsicHeight={757}
          alt="OneNET IoT platform console displaying real-time sensor data streams. The China Mobile OneNET console lists the connected device and provides creation, batch management, and status query of devices on the platform."
          captionPrefix="Figure 5-4."
          caption="OneNET IoT platform console displaying real-time sensor data streams. The China Mobile OneNET console lists the connected device and provides creation, batch management, and status query of devices on the platform."
          fallback={<p>Image unavailable.</p>}
        />
        <h3>5.4 Sensor Calibration and System Reliability</h3>
        <p>
          All sensors were calibrated before deployment and their performance
          characteristics were documented to ensure reliable operation during
          fermentation monitoring:
        </p>
        <div
          className="table-responsive"
          role="region"
          aria-label="5.4 Sensor Calibration and System Reliability"
          tabIndex={0}
        >
          <table>
            <thead>
              <tr>
                <th scope="col">Sensor</th>
                <th scope="col">Calibration Method</th>
                <th scope="col">Accuracy</th>
                <th scope="col">Response Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">pH Sensor</th>
                <td>
                  Two-point calibration with pH 4.01 and pH 6.86 standard
                  buffers
                </td>
                <td>±0.1 pH</td>
                <td>&lt; 30 s</td>
              </tr>
              <tr>
                <th scope="row">NTC Temperature Sensor</th>
                <td>Ice-point (0 °C) and boiling-point (100 °C) calibration</td>
                <td>±0.5 °C</td>
                <td>&lt; 5 s</td>
              </tr>
              <tr>
                <th scope="row">AZDM01 Turbidity Sensor</th>
                <td>
                  Calibration with Formazin standard solutions (0, 20, 100 NTU)
                </td>
                <td>±5% FS</td>
                <td>&lt; 2 s</td>
              </tr>
              <tr>
                <th scope="row">Liquid-Level Sensor</th>
                <td>Threshold calibration at known fill volumes</td>
                <td>Binary (on/off)</td>
                <td>&lt; 1 s</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The IoT system was designed for continuous operation throughout the
          fermentation cycle (24–72 hours). The STM32 microcontroller operates
          autonomously — sensor sampling, OLED display, and pump/valve control
          run on the embedded firmware without requiring cloud connectivity. The
          ESP8266 module reconnects automatically if the Wi-Fi hotspot drops,
          using a backoff retry mechanism. In the event of persistent network
          failure, local data logging on the STM32 ensures no sensor data is
          lost; data are uploaded to OneNET once connectivity is restored.
        </p>
        <p>
          To handle sensor-specific failures, the system implements the
          following reliability measures:
        </p>
        <ul>
          <li>
            <strong>Sensor watchdog</strong>: If any sensor stops reporting data
            for more than 60 seconds, the system flags the sensor as
            unresponsive and alerts the operator via the OLED display and cloud
            notification.
          </li>
          <li>
            <strong>Data validation</strong>: Sensor readings outside physically
            plausible ranges (e.g., pH &lt; 0 or &gt; 14, temperature &lt; −20
            °C or &gt; 120 °C) are rejected and logged as errors.
          </li>
          <li>
            <strong>Redundant pH sensing</strong>: Two pH sensors are deployed
            at different points in the fluidic circuit. If their readings
            diverge by more than 0.5 pH units, the system enters safe-hold mode
            and alerts the operator.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "hardware-outlook",
    title: "Part 6. Future Application and Outlook",
    content: (
      <>
        <h3>Hardware Iteration</h3>
        <p>
          In the short term, we plan a snap-in modular filter-cartridge design,
          so that cartridges filled with different adsorbents (e.g., for calcium
          malate) can be swapped on site. CFD-guided refinements of the fluid
          pathway, combined with a multi-way valve for cartridge recycling, will
          also enable resin reuse.
        </p>
        <h3>Scale-Up Potential</h3>
        <p>
          Built on a modular architecture, the system is designed to scale from
          a single treatment unit to multiple columns or a reactor array. Rather
          than claiming industrial readiness, we regard scale-up as a future
          direction — first to pilot scale, and only to industrial scale after
          sustained-treatment validation.
        </p>
        <h3>Real-World Application</h3>
        <p>
          Our primary use case is{" "}
          <strong>
            laboratory-scale anaerobic fermentation effluent treatment
          </strong>{" "}
          — automated ammonia-nitrogen removal before downstream aerobic malate
          biosynthesis. This is the scenario for which the hardware was
          designed, tested, and validated. The platform addresses a real
          bottleneck: manual ammonium removal is labor-intensive, inconsistent,
          and limits throughput in multi-stage fermentation workflows. Built on
          low-cost, 3D-printed, open-source hardware ($171.54 total), the system
          is accessible to undergraduate and research laboratories worldwide.
          Field deployment beyond the laboratory will require pilot-scale
          validation, long-term stability testing (continuous operation &gt; 7
          days), and regulatory review — these are explicitly listed as future
          work rather than current claims.
        </p>
      </>
    ),
  },
  {
    id: "hardware-budget",
    title: "Part 8. Device Budget",
    content: (
      <>
        <p>
          The detailed hardware budget of the IoT monitoring and control system
          and the NH₄⁺-N removal hardware is listed below.
        </p>
        <div
          className="table-responsive"
          role="region"
          aria-label="Device budget"
          tabIndex={0}
        >
          <table>
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Item</th>
                <th scope="col">Quantity</th>
                <th scope="col">Cost per Unit (USD)</th>
                <th scope="col">Cost (USD)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Bambu Lab PLA Basic Filament</td>
                <td>6</td>
                <td>7.04</td>
                <td>42.24</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>IoT Component Kit (Expansion Board, Modules, ST-LINK)</td>
                <td>1</td>
                <td>14.79</td>
                <td>14.79</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Double-Sided Perforated Board (9×15)</td>
                <td>1</td>
                <td>2.37</td>
                <td>2.37</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>Perforated Board Kit</td>
                <td>1</td>
                <td>2.71</td>
                <td>2.71</td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td>M3 Copper Standoffs (8/15/20 mm)</td>
                <td>1</td>
                <td>4.47</td>
                <td>4.47</td>
              </tr>
              <tr>
                <th scope="row">6</th>
                <td>M2 &amp; M3 Screws</td>
                <td>1</td>
                <td>7.86</td>
                <td>7.86</td>
              </tr>
              <tr>
                <th scope="row">7</th>
                <td>Cable Ties (3.6 mm × 30 cm)</td>
                <td>200</td>
                <td>0.02</td>
                <td>4.00</td>
              </tr>
              <tr>
                <th scope="row">8</th>
                <td>Foam Adhesive Tape (20 mm × 3 m)</td>
                <td>2</td>
                <td>1.14</td>
                <td>2.28</td>
              </tr>
              <tr>
                <th scope="row">9</th>
                <td>NTC Temperature Sensor</td>
                <td>4</td>
                <td>0.28</td>
                <td>1.12</td>
              </tr>
              <tr>
                <th scope="row">10</th>
                <td>STM32F103C8T6 Development Kit</td>
                <td>1</td>
                <td>14.58</td>
                <td>14.58</td>
              </tr>
              <tr>
                <th scope="row">11</th>
                <td>AZDM01 Turbidity Sensor</td>
                <td>2</td>
                <td>4.39</td>
                <td>8.78</td>
              </tr>
              <tr>
                <th scope="row">12</th>
                <td>pH Sensor (Module, Electrode, Calibration)</td>
                <td>2</td>
                <td>9.30</td>
                <td>18.60</td>
              </tr>
              <tr>
                <th scope="row">13</th>
                <td>ESP8266 Wi-Fi Image-Transmission Module</td>
                <td>1</td>
                <td>8.45</td>
                <td>8.45</td>
              </tr>
              <tr>
                <th scope="row">14</th>
                <td>Motor RS-380SA (Peristaltic Pump)</td>
                <td>10</td>
                <td>0.28</td>
                <td>2.80</td>
              </tr>
              <tr>
                <th scope="row">15</th>
                <td>Sodium-Type Cation Exchange Resin</td>
                <td>2</td>
                <td>2.08</td>
                <td>4.16</td>
              </tr>
              <tr>
                <th scope="row">16</th>
                <td>Strong-Acid Cation Exchange Resin</td>
                <td>1</td>
                <td>9.70</td>
                <td>9.70</td>
              </tr>
              <tr>
                <th scope="row">17</th>
                <td>Silicone Tube (ID 3 mm, OD 5 mm)</td>
                <td>5</td>
                <td>0.92</td>
                <td>4.60</td>
              </tr>
              <tr>
                <th scope="row">18</th>
                <td>WK4A Four-Way Switch</td>
                <td>1</td>
                <td>7.78</td>
                <td>7.78</td>
              </tr>
              <tr>
                <th scope="row">19</th>
                <td>Check Valve (8 mm)</td>
                <td>20</td>
                <td>0.10</td>
                <td>2.00</td>
              </tr>
              <tr>
                <th scope="row">20</th>
                <td>Flexible Liquid-Level Sensor</td>
                <td>5</td>
                <td>1.65</td>
                <td>8.25</td>
              </tr>
              <tr>
                <th scope="row">
                  <strong>Total</strong>
                </th>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <strong>171.54</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The following references informed the design, simulation, and
          implementation of our hardware platform. Citations are used throughout
          the text to link specific design decisions to their scientific basis.{" "}
          <Cite k="igem2024engineering" />
        </p>
      </>
    ),
  },
];

export function Hardware() {
  return (
    <ArticlePage
      title="Hardware"
      lead="A modular platform for automated ammonia-nitrogen removal and real-time fermentation monitoring."
      sections={sections}
      references
    />
  );
}

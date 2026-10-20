import {
  ArticleNote,
  ArticlePage,
  type ArticleSection,
} from "../components/article/ArticlePage";
import { Cite } from "../components/article/References";
import {
  BudgetExplorer,
  CalibrationGrid,
  ComponentCatalog,
  FailureMatrix,
  HardwareTakeaways,
  IoTSystemMap,
  MediaPair,
  OperationLoop,
  OutlookRoadmap,
  SafeguardGrid,
  ValidationSnapshot,
  type BudgetItem,
  type CalibrationEntry,
  type CatalogGroup,
  type FailureMode,
  type HardwareTakeaway,
  type IoTNodeGroup,
  type OperationStep,
  type OutlookStage,
  type Safeguard,
} from "../components/hardware/HardwareSections";
import { Figure } from "../components/media/Figure";
import { VideoEmbed } from "../components/media/VideoEmbed";
import styles from "./hardware.module.css";

const takeaways: HardwareTakeaway[] = [
  {
    metric: "Cation exchange",
    title: "Waste ammonium becomes a removable stream",
    text: "Resin removes ammonium from anaerobic fermentation broth so the treated liquid can continue to aerobic malate biosynthesis.",
    icon: "exchange",
  },
  {
    metric: "$171.54",
    title: "Built from commercially available parts",
    text: "The complete platform uses off-the-shelf components and a detailed, replicable bill of materials.",
    icon: "cost",
  },
  {
    metric: "STM32 + ESP8266",
    title: "Local control with cloud visibility",
    text: "The IoT layer monitors pH, temperature, turbidity, and liquid level through real-time cloud connectivity.",
    icon: "iot",
  },
  {
    metric: "Fail-safe",
    title: "Tested with real fermentation effluent",
    text: "Pump, valve, and sensor failures are covered by explicit safeguards, with local operation independent of the cloud.",
    icon: "validation",
  },
];

const componentGroups: CatalogGroup[] = [
  {
    id: "fluidic",
    label: "Fluidic Components",
    parts: [
      {
        name: "Motor RS-380SA (Peristaltic Pump)",
        specification: "DC motor, 10 units",
        function: "Drives fluid through the column and tubing circuit",
      },
      {
        name: "WK4A Four-Way Switch",
        specification: "4-way valve, 1 unit",
        function:
          "Switches fluid routing among adsorption, washing, and regeneration loops",
      },
      {
        name: "Check Valve (8 mm)",
        specification: "20 units",
        function: "Prevents backflow within the fluidic circuit",
      },
      {
        name: "Silicone Tube (ID 3 mm, OD 5 mm)",
        specification: "5 m",
        function:
          "Connects all fluidic components; chemically inert and flexible",
      },
    ],
  },
  {
    id: "chemistry",
    label: "Adsorbent Materials",
    parts: [
      {
        name: "Sodium-Type Cation Exchange Resin",
        specification: "2 units",
        function: "Na⁺ form resin for selective NH₄⁺ capture",
      },
      {
        name: "Strong-Acid Cation Exchange Resin",
        specification: "1 unit",
        function:
          "H⁺ form resin for high-capacity ammonium adsorption and regeneration",
      },
    ],
  },
  {
    id: "structure",
    label: "Structural Components",
    parts: [
      {
        name: "Bambu Lab PLA Basic Filament",
        specification: "6 spools",
        function: "3D-printed structural housing and custom mounts",
      },
      {
        name: "Double-Sided Perforated Board (9×15)",
        specification: "1 unit",
        function: "Prototyping board for electronic component mounting",
      },
      {
        name: "Perforated Board Kit",
        specification: "1 kit",
        function: "Additional mounting and wiring substrate",
      },
      {
        name: "M3 Copper Standoffs (8/15/20 mm)",
        specification: "several sets",
        function: "Spacers for stacking and securing PCB layers",
      },
      {
        name: "M2 & M3 Screws",
        specification: "several sets",
        function: "Fasteners for mechanical assembly",
      },
      {
        name: "Cable Ties (3.6 mm × 30 cm)",
        specification: "several pcs",
        function: "Cable management and tubing securing",
      },
      {
        name: "Foam Adhesive Tape (20 mm × 3 m)",
        specification: "1 rolls",
        function: "Vibration dampening and component cushioning",
      },
    ],
  },
  {
    id: "sensing",
    label: "Sensing Components",
    parts: [
      {
        name: "NTC Temperature Sensor",
        specification: "4 units",
        function: "Monitors fermentation broth temperature",
      },
      {
        name: "pH Sensor",
        specification: "2 units",
        function:
          "Tracks ion exchange progress; pH shift indicates resin saturation",
      },
      {
        name: "AZDM01 Turbidity Sensor",
        specification: "2 units",
        function: "Measures broth turbidity for process monitoring",
      },
      {
        name: "Flexible Liquid-Level Sensor",
        specification: "5 units",
        function: "Detects fluid levels in reservoirs and column",
      },
    ],
  },
  {
    id: "control",
    label: "Electronic and Control Components",
    parts: [
      {
        name: "STM32F103C8T6 Development Kit",
        specification: "1 unit",
        function:
          "Main controller; collects sensor data and drives pump/valve/OLED",
      },
      {
        name: "ESP8266 Wi-Fi Image-Transmission Module",
        specification: "1 unit",
        function: "Cloud connectivity via MQTT to OneNET platform",
      },
      {
        name: "IoT Component Kit (Expansion Board, Modules, ST-LINK)",
        specification: "1 kit",
        function: "Programmer, expansion board, and peripheral modules",
      },
    ],
  },
];

const operationSteps: OperationStep[] = [
  {
    phase: "Trigger",
    title: "Sample and threshold",
    detail:
      "The system samples anaerobic effluent. When ammonia nitrogen exceeds the preset threshold, the pumps start.",
  },
  {
    phase: "Adsorb",
    title: "Capture ammonium",
    detail:
      "Broth enters the column and NH₄⁺ binds to the resin while eluate pH is tracked.",
  },
  {
    phase: "Deliver",
    title: "Send treated liquid downstream",
    detail:
      "Ammonia-depleted liquid proceeds to sugar concentration and aerobic xylose fermentation.",
  },
  {
    phase: "Regenerate",
    title: "Switch at saturation",
    detail:
      "A constant eluate pH marks saturation. Valves switch and regenerant elutes the captured ammonium.",
  },
  {
    phase: "Repeat",
    title: "Wash and re-enter service",
    detail:
      "After washing, the cartridge is ready for another adsorption cycle.",
  },
];

const failureModes: FailureMode[] = [
  {
    risk: "Pump failure / power loss",
    consequence: "Fluid stops circulating; fermentation broth stalls in column",
    mitigation:
      "System detects pump inactivity via current sensor; triggers audible alarm and sends cloud notification",
  },
  {
    risk: "Sensor drift (pH)",
    consequence:
      "Incorrect saturation detection; resin overflows or under-regenerates",
    mitigation:
      "Two pH sensors deployed in parallel for cross-validation; system enters safe-hold mode if readings diverge beyond threshold",
  },
  {
    risk: "Valve stuck",
    consequence: "Fluid routed to wrong loop; potential cross-contamination",
    mitigation:
      "Valve position feedback via limit switches; system halts if expected position not confirmed within timeout",
  },
  {
    risk: "ESP8266 disconnects",
    consequence: "Remote monitoring lost; local control continues",
    mitigation:
      "OLED displays local data independently; pump/valve control runs autonomously on STM32 without cloud dependency",
  },
  {
    risk: "Resin saturation undetected",
    consequence: "Ammonia breakthrough into downstream",
    mitigation:
      "Liquid-level sensor at column outlet detects flow interruption; pH trend analysis triggers regeneration cycle automatically",
  },
];

const iotGroups: IoTNodeGroup[] = [
  {
    label: "Sense + control",
    nodes: ["DHT11", "STM32F103C8T6", "Tactile button"],
    detail: "Local sampling, control logic, and on-board interaction.",
  },
  {
    label: "Local interface",
    nodes: ["0.96-inch OLED", "LED"],
    detail: "Readings and network diagnostics remain visible on site.",
  },
  {
    label: "Cloud + user",
    nodes: ["ESP8266", "OneNET", "Mobile app", "PC console"],
    detail: "Data are relayed through a shared hotspot for remote access.",
  },
];

const calibrationEntries: CalibrationEntry[] = [
  {
    sensor: "pH Sensor",
    method: "Two-point calibration with pH 4.01 and pH 6.86 standard buffers",
    accuracy: "±0.1 pH",
    response: "< 30 s",
    icon: "ph",
  },
  {
    sensor: "NTC Temperature Sensor",
    method: "Ice-point (0 °C) and boiling-point (100 °C) calibration",
    accuracy: "±0.5 °C",
    response: "< 5 s",
    icon: "temperature",
  },
  {
    sensor: "AZDM01 Turbidity Sensor",
    method: "Calibration with Formazin standard solutions (0, 20, 100 NTU)",
    accuracy: "±5% FS",
    response: "< 2 s",
    icon: "turbidity",
  },
  {
    sensor: "Liquid-Level Sensor",
    method: "Threshold calibration at known fill volumes",
    accuracy: "Binary (on/off)",
    response: "< 1 s",
    icon: "level",
  },
];

const safeguards: Safeguard[] = [
  {
    title: "Sensor watchdog",
    detail:
      "If any sensor stops reporting data for more than 60 seconds, the system flags the sensor as unresponsive and alerts the operator via the OLED display and cloud notification.",
  },
  {
    title: "Data validation",
    detail:
      "Sensor readings outside physically plausible ranges (e.g., pH < 0 or > 14, temperature < −20 °C or > 120 °C) are rejected and logged as errors.",
  },
  {
    title: "Redundant pH sensing",
    detail:
      "Two pH sensors are deployed at different points in the fluidic circuit. If their readings diverge by more than 0.5 pH units, the system enters safe-hold mode and alerts the operator.",
  },
];

const outlookStages: OutlookStage[] = [
  {
    horizon: "Near term",
    title: "Hardware iteration",
    text: "A snap-in modular filter cartridge will let us swap adsorbents, such as media for calcium malate, on site. CFD-guided refinements and a multi-way valve for cartridge recycling will support resin reuse.",
  },
  {
    horizon: "Next",
    title: "Scale-up potential",
    text: "The modular architecture can scale from a single treatment unit to multiple columns or a reactor array. We regard pilot scale as the next step, with industrial scale only after sustained-treatment validation.",
  },
  {
    horizon: "Boundary",
    title: "Real-world application",
    text: "Our primary use case is laboratory-scale anaerobic fermentation effluent treatment, with automated ammonia-nitrogen removal before downstream aerobic malate biosynthesis. The platform was designed, tested, and validated for this scenario. It addresses a real bottleneck: manual ammonium removal is labor-intensive, inconsistent, and limits throughput in multi-stage fermentation workflows. At $171.54 total, the low-cost, 3D-printed, open-source system is accessible to undergraduate and research laboratories worldwide. Field deployment beyond the laboratory will require pilot-scale validation, long-term stability testing beyond 7 days of continuous operation, and regulatory review. These remain future work rather than current claims.",
  },
];

const budgetItems: BudgetItem[] = [
  {
    number: 1,
    name: "Bambu Lab PLA Basic Filament",
    quantity: 6,
    unitCost: 7.04,
    cost: 42.24,
    group: "structure",
  },
  {
    number: 2,
    name: "IoT Component Kit (Expansion Board, Modules, ST-LINK)",
    quantity: 1,
    unitCost: 14.79,
    cost: 14.79,
    group: "control",
  },
  {
    number: 3,
    name: "Double-Sided Perforated Board (9×15)",
    quantity: 1,
    unitCost: 2.37,
    cost: 2.37,
    group: "structure",
  },
  {
    number: 4,
    name: "Perforated Board Kit",
    quantity: 1,
    unitCost: 2.71,
    cost: 2.71,
    group: "structure",
  },
  {
    number: 5,
    name: "M3 Copper Standoffs (8/15/20 mm)",
    quantity: 1,
    unitCost: 4.47,
    cost: 4.47,
    group: "structure",
  },
  {
    number: 6,
    name: "M2 & M3 Screws",
    quantity: 1,
    unitCost: 7.86,
    cost: 7.86,
    group: "structure",
  },
  {
    number: 7,
    name: "Cable Ties (3.6 mm × 30 cm)",
    quantity: 200,
    unitCost: 0.02,
    cost: 4,
    group: "structure",
  },
  {
    number: 8,
    name: "Foam Adhesive Tape (20 mm × 3 m)",
    quantity: 2,
    unitCost: 1.14,
    cost: 2.28,
    group: "structure",
  },
  {
    number: 9,
    name: "NTC Temperature Sensor",
    quantity: 4,
    unitCost: 0.28,
    cost: 1.12,
    group: "sensing",
  },
  {
    number: 10,
    name: "STM32F103C8T6 Development Kit",
    quantity: 1,
    unitCost: 14.58,
    cost: 14.58,
    group: "control",
  },
  {
    number: 11,
    name: "AZDM01 Turbidity Sensor",
    quantity: 2,
    unitCost: 4.39,
    cost: 8.78,
    group: "sensing",
  },
  {
    number: 12,
    name: "pH Sensor (Module, Electrode, Calibration)",
    quantity: 2,
    unitCost: 9.3,
    cost: 18.6,
    group: "sensing",
  },
  {
    number: 13,
    name: "ESP8266 Wi-Fi Image-Transmission Module",
    quantity: 1,
    unitCost: 8.45,
    cost: 8.45,
    group: "control",
  },
  {
    number: 14,
    name: "Motor RS-380SA (Peristaltic Pump)",
    quantity: 10,
    unitCost: 0.28,
    cost: 2.8,
    group: "fluidic",
  },
  {
    number: 15,
    name: "Sodium-Type Cation Exchange Resin",
    quantity: 2,
    unitCost: 2.08,
    cost: 4.16,
    group: "chemistry",
  },
  {
    number: 16,
    name: "Strong-Acid Cation Exchange Resin",
    quantity: 1,
    unitCost: 9.7,
    cost: 9.7,
    group: "chemistry",
  },
  {
    number: 17,
    name: "Silicone Tube (ID 3 mm, OD 5 mm)",
    quantity: 5,
    unitCost: 0.92,
    cost: 4.6,
    group: "fluidic",
  },
  {
    number: 18,
    name: "WK4A Four-Way Switch",
    quantity: 1,
    unitCost: 7.78,
    cost: 7.78,
    group: "fluidic",
  },
  {
    number: 19,
    name: "Check Valve (8 mm)",
    quantity: 20,
    unitCost: 0.1,
    cost: 2,
    group: "fluidic",
  },
  {
    number: 20,
    name: "Flexible Liquid-Level Sensor",
    quantity: 5,
    unitCost: 1.65,
    cost: 8.25,
    group: "sensing",
  },
];

const referenceKeys = [
  "zhang2021ammonium",
  "versteeg2007cfd",
  "gargalo2020smart",
  "igem2024engineering",
];

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
        <HardwareTakeaways items={takeaways} />
      </>
    ),
  },
  {
    id: "hardware-introduction",
    eyebrow: "Part 1",
    title: "Introduction",
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
    eyebrow: "Part 2",
    title: "Structure Overview",
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
        <div className={styles.dataStream}>
          <div>
            <h3>2.2 Data stream</h3>
            <p>
              Sensors measure the pH and temperature of the anaerobic effluent.
              The main controller collects sensor readings, displays data
              locally on an OLED screen, and transmits data to the cloud via the
              MQTT protocol. Users can remotely monitor system status and adjust
              operational parameters through mobile applications or WeChat mini
              programs. A system overview diagram visualizes the fluid routing
              and data flow between modules, illustrating how our hardware fits
              into the full biomanufacturing workflow.
            </p>
          </div>
          <Figure
            id="hardware-figure-2-2"
            src="https://static.igem.wiki/teams/6147/wiki/figure2-2-data-stream-overview.avif"
            intrinsicWidth={1353}
            intrinsicHeight={2217}
            maxHeight="min(75svh, 680px)"
            alt="Data stream overview"
            captionPrefix="Figure 2-2."
            caption="Data stream overview"
            fallback={<p>Image unavailable.</p>}
          />
        </div>
      </>
    ),
  },
  {
    id: "hardware-components",
    eyebrow: "Part 3",
    title: "Hardware Component Selection",
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
        <h3>3.2 Adsorbent Materials</h3>
        <p>
          Two types of cation exchange resin are used to capture NH₄⁺ ions from
          anaerobic fermentation effluent. Both resins were selected over
          activated carbon and zeolite alternatives because ion exchange resins
          provide higher selectivity for NH₄⁺ and are regenerable, reducing
          long-term cost and waste.
        </p>
        <h3>3.3 Structural Components</h3>
        <p>
          The mechanical housing and support structure are fabricated from
          3D-printed and off-the-shelf parts.
        </p>
        <h3>3.4 Sensing Components</h3>
        <p>
          Sensors monitor real-time fermentation parameters to trigger automated
          valve switching and regeneration cycles. The pH sensor was selected as
          the primary indicator of resin saturation because NH₄⁺ capture
          releases H⁺/Na⁺, causing a measurable pH shift in the effluent stream.
          Turbidity and liquid-level sensors serve as secondary indicators for
          process integrity and leak detection.
        </p>
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
        <ComponentCatalog groups={componentGroups} />
        <p>
          The total hardware cost is <strong>171.54 USD</strong> (detailed
          breakdown in the device budget). The complete bill of materials
          ensures that the system can be replicated from commercially available
          components at low cost, supporting the project's goal of accessible,
          open-source biomanufacturing hardware.
        </p>
      </>
    ),
  },
  {
    id: "hardware-ammonia-removal",
    eyebrow: "Part 4",
    title: "Ammonia-Nitrogen Removal System",
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
          capacity for repeated use
          <Cite k="zhang2021ammonium" />. After this treatment, the ammonia
          nitrogen concentration of the broth drops to a sufficiently low level,
          and the liquid can be sent to downstream sugar concentration and
          aerobic fermentation.
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
          the resin bed <Cite k="versteeg2007cfd" />. Multi-way valves switch
          pipelines between the adsorption loop, washing loop and resin
          regeneration loop to enable resin reuse.
        </p>
        <MediaPair>
          <Figure
            id="hardware-figure-4-2"
            src="https://static.igem.wiki/teams/6147/wiki/fluid-simulation-contour.avif"
            intrinsicWidth={825}
            intrinsicHeight={477}
            alt="Fluid simulation contour showing velocity distribution"
            captionPrefix="Figure 4-2."
            caption="Fluid Residual Plot"
            fallback={<p>Image unavailable.</p>}
          />
          <Figure
            id="hardware-figure-4-3"
            src="https://static.igem.wiki/teams/6147/wiki/fig3-cycle2-cfd.avif"
            intrinsicWidth={2304}
            intrinsicHeight={1728}
            alt="Fluid simulation contour showing velocity distribution"
            captionPrefix="Figure 4-3."
            caption="Fluid Simulation Contour"
            fallback={<p>Image unavailable.</p>}
          />
        </MediaPair>
        <h3>Automatic Operation Workflow</h3>
        <p>The workflow runs automatically as follows:</p>
        <p>
          The system samples anaerobic fermentation effluent. When ammonia
          nitrogen exceeds the preset threshold, peristaltic pumps start and
          feed the broth into the adsorption column for ammonium capture. At the
          same time, eluate pH is tracked. Its pH will drop as ion exchange
          proceeds. A constant eluate pH signifies resin saturation.
        </p>
        <p>
          Ammonia-depleted liquid flows out of the column and proceeds to
          downstream sugar concentration and aerobic xylose fermentation for
          malate and poly-malate production. When the resin approaches
          saturation, valves switch to regeneration mode. Regenerant flows
          through the column to elute trapped ammonium waste. After washing, the
          resin cartridge is ready for another adsorption cycle.
        </p>
        <OperationLoop steps={operationSteps} />
        <Figure
          id="hardware-figure-4-4"
          src="https://static.igem.wiki/teams/6147/wiki/hardware-diagram.avif"
          intrinsicWidth={1068}
          intrinsicHeight={781}
          alt="Hardware diagram labeling the peristaltic pumps, multi-way valve, ion-exchange column, and pretreatment bottles"
          captionPrefix="Figure 4-4."
          caption="Hardware Diagram"
          fallback={<p>Image unavailable.</p>}
        />
        <ArticleNote theme="hardware" label="Video 4-1 · upload pending">
          <p>
            <strong>Working Condition.</strong> The supplied static MP4 is not
            yet available from the iGEM host.
          </p>
        </ArticleNote>
        <h3>4.1 Failure Mode and Safety Design</h3>
        <p>
          To ensure safe unattended operation, we analyzed critical failure
          modes and implemented corresponding safeguards:
        </p>
        <FailureMatrix items={failureModes} />
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
        <ValidationSnapshot
          signals={[
            "Real anaerobic fermentation effluent",
            "Multiple adsorption-regeneration cycles",
            "No mechanical failure observed",
          ]}
        />
      </>
    ),
  },
  {
    id: "hardware-iot",
    eyebrow: "Part 5",
    title: "IoT Monitoring and Control System",
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
          <Cite k="gargalo2020smart" />.
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
        <IoTSystemMap groups={iotGroups} />
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
          maxHeight="min(72svh, 720px)"
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
          title="HARDWARE video 5-1"
          provider="raw"
          allow="fullscreen"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
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
          maxHeight="min(72svh, 680px)"
          alt="Mobile application interface. The HBuilderX-built app (also deployable as a WeChat Mini Program) displays real-time temperature, humidity, pH, and turbidity values and offers remote LED control, demonstrating end-to-end remote monitoring and control."
          captionPrefix="Figure 5-3."
          caption="Mobile application interface. The HBuilderX-built app (also deployable as a WeChat Mini Program) displays real-time temperature, humidity, pH, and turbidity values and offers remote LED control, demonstrating end-to-end remote monitoring and control."
          fallback={<p>Image unavailable.</p>}
        />
        <VideoEmbed
          src="https://video.igem.org/videos/embed/u6pTEWPWtHFk3WeDh5oU8t"
          title="HARDWARE video 5-2"
          provider="raw"
          allow="fullscreen"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
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
        <CalibrationGrid entries={calibrationEntries} />
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
        <SafeguardGrid items={safeguards} />
      </>
    ),
  },
  {
    id: "hardware-outlook",
    eyebrow: "Part 6",
    title: "Future Application and Outlook",
    content: <OutlookRoadmap stages={outlookStages} />,
  },
  {
    id: "hardware-budget",
    eyebrow: "Part 7",
    title: "Device Budget",
    content: (
      <>
        <p>
          The detailed hardware budget of the IoT monitoring and control system
          and the NH₄⁺-N removal hardware is listed below. The ledger groups the
          source line items by subsystem so the cost structure can be inspected
          without losing the exact purchase quantities.
        </p>
        <BudgetExplorer items={budgetItems} />
      </>
    ),
  },
];

export function Hardware() {
  return (
    <ArticlePage
      title="Hardware"
      lead="This page documents the design, component selection, operation, and testing of our modular hardware platform for automated ammonia-nitrogen removal from anaerobic fermentation effluent."
      sections={sections}
      references
      referencesIntro="The following references informed the design, simulation, and implementation of our hardware platform. Citations are used throughout the text to link specific design decisions to their scientific basis."
      referenceOrder={referenceKeys}
      stickyMobileOutline
      theme="hardware"
    />
  );
}

import { type ArticleSection } from "../../components/article/ArticlePage";
import { Cite } from "../../components/article/References";
import { Figure } from "../../components/media/Figure";
import { sitePath } from "../../utils/sitePath";
import styles from "./description.module.css";

export const referenceOrder = [
  "Smerald2023CerealResidues",
  "MOA2025StrawUtilization",
  "Li2024NatureInspiredAdhesives",
  "Huang2022PolymalicAcid",
  "Wu2021CN110694099B",
  "liu2023cornbioconversion",
  "zhao2026amxlnr",
];

export const sections: ArticleSection[] = [
  {
    id: "overview",
    title: "Overview",
    content: (
      <>
        <p>
          Agricultural straw is a renewable lignocellulosic resource, but making
          practical use of it requires more than recognizing its abundance. In{" "}
          <strong>Carbotex</strong>, we explored a pathway that connects{" "}
          <strong>straw-derived fermentable sugars</strong>,{" "}
          <strong>
            microbial poly(malic acid) (PMA, also referred to as PMLA)
            production
          </strong>
          , and <strong>dopamine-functionalized PMA (PMA-DA)</strong> as a
          candidate bio-based adhesive.
        </p>
        <p>
          Our main experimental work focused on engineering{" "}
          <em>Aureobasidium melanogenum</em> A08 for PMA production from mixed
          sugars and preparing PMA-DA for material testing.{" "}
          <strong>Modeling</strong> supplied complementary perspectives on
          metabolic targets, research workflows, and molecular
          functionalization; <strong>Hardware</strong> explored automated
          ammonia-nitrogen treatment of anaerobic liquid streams. Meanwhile,{" "}
          <strong>Integrated Human Practices and Education</strong> helped us
          connect our decisions and activities with stakeholder perspectives and
          public understanding.
        </p>
        <p>
          This Description follows that development path, beginning with the Wet
          Lab and then introducing the closely connected contributions of Model,
          Hardware, and Human Practices.
        </p>
      </>
    ),
  },
  {
    id: "description-wet",
    title: "1. Wet Lab — From Straw-Derived Sugars to PMA-DA",
    content: <></>,
    subsections: [
      {
        id: "description-wet-straw",
        title: "1.1 Why Start with Agricultural Straw?",
        content: (
          <>
            <p>
              Crop straw contains{" "}
              <strong>cellulose, hemicellulose, and lignin</strong>. The
              carbohydrate fractions can be processed into sugars suitable for
              microbial fermentation, creating an opportunity to explore
              high-value products from agricultural residues.
            </p>
            <p>
              A global cereal-residue dataset estimated approximately{" "}
              <strong>3.9 billion tonnes of cereal residues in 2020</strong> and
              described multiple existing uses, including retention in fields
              and livestock-related uses <Cite k="Smerald2023CerealResidues" />.
              In China, an official report estimated approximately{" "}
              <strong>
                870 million tonnes of crop straw generated in 2024
              </strong>
              , with about <strong>730 million tonnes collectable</strong> and
              an overall utilization rate above <strong>88%</strong>{" "}
              <Cite k="MOA2025StrawUtilization" />. Industrial feedstock use
              represented a relatively small share of that reported utilization.
            </p>
            <p>
              These figures show why straw-derived materials are worth
              exploring, but they do <strong>not</strong> mean that all straw is
              freely available for industrial processing. Existing agricultural
              uses, collection, and local supply conditions must also be
              considered.
            </p>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/d1.avif"
              alt="Global cereal-residue production and utilization chart"
              intrinsicWidth={2414}
              intrinsicHeight={1230}
              captionPrefix="Figure 1."
              caption={
                <>
                  Global cereal-residue production and use (based on Smerald et
                  al., 2023 <Cite k="Smerald2023CerealResidues" />
                  ).
                </>
              }
              fallback={<p>Image unavailable.</p>}
            />
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/d2.avif"
              alt="China crop straw generation and utilization chart"
              intrinsicWidth={3500}
              intrinsicHeight={1329}
              captionPrefix="Figure 2."
              caption={
                <>
                  Crop straw generation and utilization in China (2024 data{" "}
                  <Cite k="MOA2025StrawUtilization" />
                  ).
                </>
              }
              fallback={<p>Image unavailable.</p>}
            />
          </>
        ),
      },
      {
        id: "description-wet-hydrolysate",
        title: "1.2 From Straw to Fermentable Hydrolysate",
        content: (
          <>
            <p>
              To connect this feedstock with microbial production, our project
              used <strong>corn-stover-derived hydrolysate</strong> supplied
              through collaboration with{" "}
              <strong>Prof. Yajun Liu's research team</strong>. Their work on{" "}
              <strong>consolidated bio-saccharification (CBS)</strong> provides
              a research basis for releasing fermentable sugars from
              lignocellulosic biomass <Cite k="liu2023cornbioconversion" />. We
              then focused on using this mixed-sugar substrate for downstream
              PMA production.
            </p>
            <p>
              Importantly, the published CBS conditions describe a reference
              process; they should not be taken as a complete record of every
              batch of hydrolysate used in our fermentation experiments.
            </p>
            <p>
              The liquid-processing challenges associated with anaerobic
              bioconversion also motivated a separate investigation into
              ammonia-nitrogen management. Our <strong>Hardware group</strong>{" "}
              developed a laboratory-scale pretreatment prototype for that
              purpose, discussed in{" "}
              <a href="#description-hardware">Section 3</a>; it has not been
              established as a fully integrated industrial production line.
            </p>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/d3.avif"
              alt="Carbotex process schematic: corn stover to PMA-DA"
              intrinsicWidth={2706}
              intrinsicHeight={996}
              captionPrefix="Figure 3."
              caption="The proposed Carbotex pathway from corn stover to a testable adhesive."
              fallback={<p>Image unavailable.</p>}
            />
          </>
        ),
      },
      {
        id: "description-wet-a08",
        title: "1.3 Engineering A08 for PMA Biosynthesis",
        content: (
          <>
            <p>
              Mixed-sugar hydrolysates commonly contain{" "}
              <strong>glucose and xylose</strong>. Because xylose utilization
              was relatively limited in our A08 production system, we explored
              transcriptional regulation as one way to improve its response to
              the mixed carbon source.
            </p>
            <p>
              We investigated the regulators <strong>XlnR and AraR</strong> and
              constructed a co-overexpression background to examine changes in
              carbon-source utilization and PMA production. This direction was
              informed by published research on XlnR-related regulation of xylan
              degradation and pentose metabolism in <em>A. melanogenum</em>{" "}
              <Cite k="zhao2026amxlnr" />. That study examined{" "}
              <strong>pullulan production</strong>, not PMA production.
            </p>
            <p>
              We also explored <strong>pyruvate carboxylase (PYC)</strong> as a
              potential target associated with upstream precursor supply. After
              comparing PYC genes from different sources, our best-performing
              tested combined-engineering strain expressed{" "}
              <strong>
                <em>Saccharomyces cerevisiae</em> PYC1
              </strong>{" "}
              in the <strong>OE-XlnR+AraR</strong> background. It achieved
              approximately <strong>26 g/L PMA</strong> in corn-stover
              hydrolysate under the reported comparison conditions.
            </p>
            <p>
              This result supports the potential of combining regulatory and
              metabolic engineering, but does not isolate the additional effect
              of PYC1 overexpression or directly demonstrate increased
              intracellular precursor availability. The Model group's
              genome-scale analysis provided a{" "}
              <strong>complementary computational perspective</strong> on the
              PYC target; its full workflow appears in{" "}
              <a href="#description-model">Section 2</a>.
            </p>
          </>
        ),
      },
      {
        id: "description-wet-adhesive",
        title: "1.4 Turning PMA into an Adhesive Material",
        content: (
          <>
            <p>
              PMA is a microbially producible polyester whose side-chain{" "}
              <strong>carboxyl groups</strong> make it suitable for further
              chemical modification <Cite k="Huang2022PolymalicAcid" />. We
              chose to explore <strong>dopamine functionalization</strong>,
              drawing on the use of catechol chemistry in nature-inspired
              adhesion <Cite k="Li2024NatureInspiredAdhesives" /> and previously
              reported PMA-based adhesive chemistry{" "}
              <Cite k="Wu2021CN110694099B" />.
            </p>
            <p>
              After fermentation and cell separation, we used an{" "}
              <strong>EDC/NHS coupling system</strong> to introduce
              dopamine-derived catechol groups into the PMA-based material,
              followed by purification and recovery steps such as dialysis and
              freeze-drying.
            </p>
            <p>
              This created <strong>PMA-DA</strong>, a candidate adhesive whose
              performance could be examined on different interfaces. The
              biological production and chemical modification stages are
              connected parts of the project, rather than evidence that a
              commercially ready adhesive manufacturing process has already been
              established.
            </p>
          </>
        ),
      },
      {
        id: "description-wet-testing",
        title: "1.5 Testing Adhesive Performance",
        content: (
          <>
            <p>
              To move beyond polymer production alone, we evaluated PMA-DA on{" "}
              <strong>glass, stainless steel, and ex vivo porcine skin</strong>,
              including mechanical response under the selected test conditions.
              We also explored performance under aqueous conditions and
              conducted preliminary material-response investigations, including
              L929 cell-based testing.
            </p>
            <p>
              These experiments allowed us to compare substrate-dependent
              adhesive behavior and consider formulation questions. They are{" "}
              <strong>early-stage material evaluations</strong> and do not
              establish medical suitability, complete biosafety, or
              industrial-scale performance.
            </p>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/66666666.avif"
              alt="PMA-DA preparation and adhesive testing"
              intrinsicWidth={1706}
              intrinsicHeight={1279}
              captionPrefix="Figure 4."
              caption="Preliminary PMA-DA preparation and adhesion evaluation."
              fallback={<p>Image unavailable.</p>}
            />
            <p>
              The Wet Lab therefore established the experimental connection
              between{" "}
              <strong>
                mixed-sugar utilization, PMA production, and material evaluation
              </strong>
              . The following sections introduce complementary tools that help
              investigate the underlying system and processing challenges in
              greater detail.
            </p>
            <p>
              <a href={sitePath("/results")}>
                <strong>Explore Wet Lab Experiments and Results →</strong>
              </a>
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: "description-model",
    title: "2. Model — Understanding the System at Multiple Scales",
    content: (
      <p>
        Our Model group supported Carbotex at three levels:{" "}
        <strong>
          the A08 production strain, the research workflow, and the adhesive
          material
        </strong>
        . These activities offered computational and organizational support
        without replacing experimental validation.
      </p>
    ),
    subsections: [
      {
        id: "description-model-gem",
        title: "2.1 The A08 Genome-Scale Metabolic Model",
        content: (
          <>
            <p>
              Our chassis strain, <em>A. melanogenum</em> A08, had a genome
              assembly but no established genome-scale metabolic model for the
              project. We reconstructed an{" "}
              <strong>A08 genome-scale metabolic model</strong> and used
              simulated overexpression and knockout analyses to screen{" "}
              <strong>more than one thousand candidate enzyme groups</strong>{" "}
              for their predicted relationship to PMA production.
            </p>
            <p>
              <strong>
                PYC ranked among the leading candidates in both screens
              </strong>
              , providing computational support for the target the Wet Lab had
              already selected. These are model-derived priorities, rather than
              proof of increased metabolite flux or product formation in vivo.
            </p>
          </>
        ),
      },
      {
        id: "description-model-wetflow",
        title: "2.2 WetFlow: Supporting the Research Workflow",
        content: (
          <>
            <p>
              We developed <strong>WetFlow</strong>, a research-agent workbench
              based on the <strong>Cordis plugin architecture</strong>, to help
              organize the steps and supporting evidence of laboratory research.
            </p>
            <p>
              WetFlow keeps materials from different projects separate,
              validates recorded measurements, and requires researcher approval
              before advancing through key workflow stages. Its plugin structure
              allows relevant tools to be added for different tasks, including
              research and educational activities.
            </p>
            <p>
              This work connects the Wet Lab and Education teams through a
              shared, <strong>human-supervised approach</strong> to organizing
              information and research decisions.
            </p>
          </>
        ),
      },
      {
        id: "description-model-md",
        title: "2.3 Molecular Dynamics of PMA–Dopamine Functionalization",
        content: (
          <>
            <p>
              PMA-based catechol-functionalized adhesives have previously been
              described in patent literature <Cite k="Wu2021CN110694099B" />. To
              explore how dopamine feeding conditions might affect the
              functionalization process, our Model team performed{" "}
              <strong>
                all-atom molecular-dynamics simulations at five feed ratios
              </strong>
              , examining how dopamine approached activated PMA sites.
            </p>
            <p>
              Under the chosen model assumptions, the simulations suggested that
              association with the polymer chain could influence the share of
              close contacts within a selected potentially reactive orientation
              range. This provided a{" "}
              <strong>hypothesis for future functionalization studies</strong>,
              not a direct measurement of grafting efficiency in our PMA-DA
              samples or a basis for our earlier Wet Lab formulation.
            </p>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/description-model-workflow-final.avif"
              alt="Diagram connecting the A08 metabolic model, WetFlow research workbench, and PMA-DA molecular-dynamics modeling"
              intrinsicWidth={3200}
              intrinsicHeight={1844}
              captionPrefix="Figure 5."
              caption="Computational support across the Carbotex workflow."
              fallback={<p>Image unavailable.</p>}
            />
            <p>
              <a href={sitePath("/model#model-overview")}>
                <strong>Explore Our Model Work →</strong>
              </a>
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: "description-hardware",
    title: "3. Hardware — Automated Liquid Pretreatment",
    content: <></>,
    subsections: [
      {
        id: "description-hardware-system",
        title: "3.1 A Modular Ammonia-Nitrogen Removal System",
        content: (
          <>
            <p>
              Ammonia-nitrogen accumulation can be a challenge in anaerobic
              fermentation effluents. To explore how such streams might be
              treated before subsequent use, our Hardware team developed an{" "}
              <strong>
                automated liquid-pretreatment prototype based on cation-exchange
                resin
              </strong>
              .
            </p>
            <p>
              The system combines <strong>peristaltic pumps</strong>, a{" "}
              <strong>modular adsorption column</strong>, and{" "}
              <strong>multi-way valves</strong> designed to switch fluid paths
              between adsorption, washing, and regeneration. This modular
              structure provides a practical basis for studying how the
              adsorbent can be handled and reused with less manual intervention.
            </p>
          </>
        ),
      },
      {
        id: "description-hardware-testing",
        title: "3.2 Sensing, Control, and Testing",
        content: (
          <>
            <p>
              The monitoring design centers on an{" "}
              <strong>STM32 microcontroller</strong> and includes sensors for{" "}
              <strong>pH, temperature, turbidity, and liquid level</strong>. An{" "}
              <strong>ESP8266 Wi-Fi module</strong> supports data transmission
              to a connected monitoring interface.
            </p>
            <p>
              The team tested ammonia-nitrogen removal using{" "}
              <strong>real anaerobic fermentation effluent</strong>, providing
              an experimental reference for the prototype's operation. These
              results support further development of the pretreatment system;
              they do not by themselves demonstrate continuous integration into
              A08 production or validate downstream aerobic-fermentation
              performance at scale.
            </p>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/hd.avif"
              alt="Hardware modular ammonia-nitrogen removal and monitoring system"
              intrinsicWidth={1469}
              intrinsicHeight={825}
              captionPrefix="Figure 6."
              caption="Modular ammonia-nitrogen removal and monitoring system."
              fallback={<p>Image unavailable.</p>}
            />
            <p>
              The Hardware work complements Carbotex's biological manufacturing
              research by examining{" "}
              <strong>process operability and monitoring</strong>, while
              remaining a distinct prototype-development effort.
            </p>
            <p>
              <a href={sitePath("/hardware")}>
                <strong>Explore Hardware Design and Testing →</strong>
              </a>
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: "description-human-practices",
    title: "4. Human Practices — Connecting Science with People",
    content: (
      <p>
        Carbotex was shaped not only by experiments and models, but also by the
        questions and experiences of people beyond the laboratory. Our Human
        Practices work therefore includes two complementary directions:{" "}
        <strong>Integrated Human Practices</strong>, which connects stakeholder
        feedback with project decisions, and <strong>Education</strong>, which
        makes scientific ideas more accessible and encourages dialogue about
        responsible innovation.
      </p>
    ),
    subsections: [
      {
        id: "description-ihp",
        title: "4.1 Integrated Human Practices (IHP)",
        content: (
          <>
            <h4>4.1.1 Our TRACE Framework</h4>
            <div className={styles.mediaFeature} data-image-position="right">
              <div className={styles.mediaCopy}>
                <p>
                  To integrate stakeholder perspectives throughout Carbotex, we
                  developed{" "}
                  <strong>
                    TRACE — Trigger, Reach Out, Analyze, Change, and Evaluate
                  </strong>
                  .
                </p>
                <p>
                  Rather than treating Human Practices as a series of
                  independent interviews, TRACE connects real-world questions,
                  stakeholder feedback, and project decisions with our{" "}
                  <strong>Design–Build–Test–Learn (DBTL) cycle</strong>. Through
                  this iterative framework, we aimed to ensure that Human
                  Practices did not simply accompany our research, but actively
                  contributed to shaping its direction.
                </p>
              </div>
              <Figure
                className={styles.mediaFigure}
                mediaClassName={styles.mediaCanvas}
                frame="none"
                src="https://static.igem.wiki/teams/6147/wiki/ihp.svg"
                alt="Carbotex TRACE framework linked to the DBTL cycle"
                intrinsicWidth={594}
                intrinsicHeight={596}
                captionPrefix="Figure 7."
                caption="TRACE connects stakeholder engagement with project development."
                fallback={<p>Image unavailable.</p>}
              />
            </div>
            <h4>4.1.2 Shaping Carbotex Through Human Practices</h4>
            <p>
              Throughout Carbotex, we engaged with{" "}
              <strong>
                farmers, researchers, material specialists, industry
                representatives, and the iGEM community
              </strong>{" "}
              to understand our project from multiple perspectives.
            </p>
            <p>
              Their insights helped us reconsider the practical availability of
              agricultural straw, explore approaches to PMA biomanufacturing,
              evaluate PMA-DA as a functional adhesive, and identify important
              considerations for manufacturing, safety, and future applications.
            </p>
            <p>
              <strong>
                Through these interactions, Carbotex became a project
                increasingly informed by real-world needs, practical
                constraints, and responsible innovation.
              </strong>
            </p>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/igem-collage-1.webp"
              alt="Collage of Carbotex stakeholder meetings and collaborative activities"
              intrinsicWidth={1706}
              intrinsicHeight={1279}
              captionPrefix="Figure 8."
              caption="Stakeholder engagement and collaboration across Carbotex."
              fallback={<p>Image unavailable.</p>}
            />
            <p>
              <a href={sitePath("/human-practices")}>
                <strong>Explore Our Integrated Human Practices →</strong>
              </a>
            </p>
          </>
        ),
      },
      {
        id: "description-education",
        title: "4.2 Education",
        content: (
          <>
            <h4>4.2.1 Project-Based Science Education</h4>
            <p>
              We designed educational activities closely tied to our
              biomanufacturing workflow, covering stages from{" "}
              <strong>
                chassis selection and genetic redesign to fermentation and
                downstream processing
              </strong>
              . By translating key research processes into accessible learning
              experiences, we helped participants understand how synthetic
              biology connects scientific concepts with practical applications.
            </p>
            <h4>4.2.2 Multi-Level Education and Outreach</h4>
            <div className={styles.mediaFeature}>
              <div className={styles.mediaCopy}>
                <p>
                  Guided by the <strong>WEAVE framework</strong>, we developed
                  multi-level educational activities tailored to audiences of
                  different ages and backgrounds. Through this process, we
                  established and refined <strong>Lecture + X</strong>, a
                  flexible approach that combines clear scientific explanations
                  with age-appropriate interactive experiences, enabling
                  learners to engage with synthetic biology in ways that match
                  their prior knowledge and interests.
                </p>
              </div>
              <Figure
                className={styles.mediaFigure}
                mediaClassName={styles.mediaCanvas}
                frame="none"
                src="https://static.igem.wiki/teams/6147/wiki/education/edu-1.svg"
                alt="Carbotex WEAVE educational framework"
                intrinsicWidth={420}
                intrinsicHeight={429}
                captionPrefix="Figure 9."
                caption="WEAVE guides iterative, audience-aware education."
                fallback={<p>Image unavailable.</p>}
              />
            </div>
            <h4>4.2.3 Inclusive Community and Public Engagement</h4>
            <p>
              We sought to expand access to science education for communities in
              under-resourced regions. By integrating language support rooted in
              local culture with interactive activities, we helped participants
              overcome communication barriers and take a more active role in
              scientific exploration. Beyond formal settings, we also used
              online platforms and science-themed materials to bring synthetic
              biology closer to everyday life, extending public engagement
              across geographical and age boundaries.
            </p>
            <h4>4.2.4 Education for Responsible Innovation</h4>
            <p>
              Our educational efforts extended beyond scientific knowledge to
              encourage reflection on the{" "}
              <strong>societal impacts of technology</strong>. Participants
              explored topics such as{" "}
              <strong>biosafety and responsible decision-making</strong>, while
              also examining real-world challenges through the lens of the{" "}
              <strong>Sustainable Development Goals (SDGs)</strong>. These
              activities helped both students and our team reflect on the
              responsibilities that come with developing biotechnological
              solutions.
            </p>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/hp-description.avif"
              alt="Carbotex Human Practices and Education outreach activities"
              intrinsicWidth={3721}
              intrinsicHeight={3721}
              captionPrefix="Figure 10."
              caption="Science education, dialogue, and responsible innovation."
              fallback={<p>Image unavailable.</p>}
            />
            <p>
              <a href={sitePath("/education")}>
                <strong>Explore Our Education Activities →</strong>
              </a>
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: "looking-ahead",
    title: "Looking Ahead",
    content: (
      <p>
        By connecting{" "}
        <strong>
          straw-derived sugars, A08 engineering, PMA-DA material development,
          complementary modeling, and process-oriented hardware
        </strong>
        , Carbotex offers an experimental route for exploring
        agricultural-residue-derived functional materials. We will continue
        examining fermentation efficiency, material recovery and performance,
        process requirements, safety, and application-specific needs before
        drawing stronger conclusions about scale-up or sustainability.
      </p>
    ),
  },
];

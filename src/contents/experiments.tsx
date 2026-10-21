import {
  ArticleNote,
  ArticlePage,
  type ArticleSection,
} from "../components/article/ArticlePage";
import { Cite } from "../components/article/References";
import {
  ComparisonMatrix,
  DonorPanel,
  ExperimentRoute,
  HydrolysisPanel,
  ParameterStrip,
  ProtocolLinks,
  ReactionSchedule,
  StepSequence,
  type ComparisonRow,
  type ProtocolLink,
  type PycDonor,
} from "../components/experiments";
import { Figure } from "../components/media/Figure";
import { FigurePair } from "../components/media/FigurePair";

// Content supplied in processed/experiment/Experiments_final.md.

const a08Protocols: ProtocolLink[] = [
  {
    number: "01",
    title: "A08 cultivation",
    href: "https://static.igem.wiki/teams/6147/wiki/wet-protocol/1-a08-plate-and-seed-cultivation-en.pdf",
  },
  {
    number: "02",
    title: "Genomic DNA extraction",
    href: "https://static.igem.wiki/teams/6147/wiki/wet-protocol/2-a-pyc-genomic-dna-extraction.pdf",
  },
  {
    number: "06",
    title: "ITS sequencing and phylogeny",
    href: "https://static.igem.wiki/teams/6147/wiki/wet-protocol/6-a08-its-nanopore-sequencing-and-mega-phylogeny-en.pdf",
  },
];

const constructProtocols: ProtocolLink[] = [
  {
    number: "03",
    title: "PCR amplification",
    href: "https://static.igem.wiki/teams/6147/wiki/wet-protocol/3-pcr-amplification-en.pdf",
  },
  {
    number: "04",
    title: "Agarose-gel electrophoresis",
    href: "https://static.igem.wiki/teams/6147/wiki/wet-protocol/4-agarose-gel-electrophoresis-en.pdf",
  },
  {
    number: "05",
    title: "DNA cleanup and gel extraction",
    href: "https://static.igem.wiki/teams/6147/wiki/wet-protocol/5-pcr-product-cleanup-and-gel-extraction-en.pdf",
  },
  {
    number: "07",
    title: "Single-fragment seamless assembly",
    href: "https://static.igem.wiki/teams/6147/wiki/wet-protocol/7-single-fragment-seamless-assembly-en.pdf",
  },
  {
    number: "08",
    title: "DH5α heat-shock transformation",
    href: "https://static.igem.wiki/teams/6147/wiki/wet-protocol/8-dh5alpha-heat-shock-transformation-en.pdf",
  },
  {
    number: "09",
    title: "DH5α plasmid miniprep",
    href: "https://static.igem.wiki/teams/6147/wiki/wet-protocol/9-dh5alpha-plasmid-miniprep-en.pdf",
  },
];

const transformationProtocols: ProtocolLink[] = [
  {
    number: "10",
    title: "A08 protoplast transformation",
    href: "https://static.igem.wiki/teams/6147/wiki/wet-protocol/p10-protoplast-transformation.pdf",
  },
  {
    number: "12",
    title: "A08 NAT rescreening and culture",
    href: "https://static.igem.wiki/teams/6147/wiki/wet-protocol/12-a08-nat-rescreening-and-culture-en.pdf",
  },
  {
    number: "13",
    title: "A08 hygromycin B rescreening and culture",
    href: "https://static.igem.wiki/teams/6147/wiki/wet-protocol/13-a08-hygromycinb-rescreening-and-culture-en.pdf",
  },
];

const saccharificationProtocols: ProtocolLink[] = [
  {
    number: "14",
    title: "Corn-stover structural carbohydrates and lignin",
    href: "https://static.igem.wiki/teams/6147/wiki/wet-protocol/14-corn-stover-structural-carbohydrates-and-lignin-nrel-en.pdf",
  },
  {
    number: "15",
    title: "Corn-stover hydrolysate conditioning",
    href: "https://static.igem.wiki/teams/6147/wiki/wet-protocol/15-corn-stover-hydrolysate-conditioning-en.pdf",
  },
  {
    number: "16",
    title: "Monosaccharide HPLC",
    href: "https://static.igem.wiki/teams/6147/wiki/wet-protocol/16-hplc-monosaccharides-in-hydrolysate-and-a08-broth-en.pdf",
  },
];

const xyloseComparisonProtocols: ProtocolLink[] = [
  {
    number: "17",
    title: "Carbon-source and strain fermentation comparisons",
    href: "https://static.igem.wiki/teams/6147/wiki/wet-protocol/17-a08-carbon-source-and-strain-fermentation-en-corrected.pdf",
  },
];

const expressionProtocols: ProtocolLink[] = [
  {
    number: "18",
    title: "Xylose-related gene expression",
    href: "https://static.igem.wiki/teams/6147/wiki/wet-protocol/18-xylose-related-gene-expression-en.pdf",
  },
];

const pycDeliveryProtocols: ProtocolLink[] = [
  {
    number: "11",
    title: "Electroporation",
    href: "https://static.igem.wiki/teams/6147/wiki/wet-protocol/11electroporation-protocol-en.pdf",
  },
  {
    number: "10",
    title: "A08 protoplast transformation",
    href: "https://static.igem.wiki/teams/6147/wiki/wet-protocol/p10-protoplast-transformation.pdf",
  },
];

const hydrolysisProtocols: ProtocolLink[] = [
  {
    number: "19A",
    title: "PMA acid hydrolysis and HPLC with three standards",
    href: "https://static.igem.wiki/teams/6147/wiki/wet-protocol/19a-pma-acid-hydrolysis-and-hplc-en.pdf",
  },
];

const integrationProtocols: ProtocolLink[] = [
  {
    number: "20",
    title: "HPLC integration and malate calibration",
    href: "https://static.igem.wiki/teams/6147/wiki/wet-protocol/20-hplc-summed-peak-area-calibration-en.pdf",
  },
];

const adhesiveProtocols: ProtocolLink[] = [
  {
    number: "21",
    title: "PMA–dopamine adhesive preparation",
    href: "https://static.igem.wiki/teams/6147/wiki/wet-protocol/21-pma-dopamine-adhesive-preparation-en.pdf",
  },
];

const cytotoxicityProtocols: ProtocolLink[] = [
  {
    number: "22",
    title: "L929 CCK-8 material-extract assay",
    href: "https://static.igem.wiki/teams/6147/wiki/wet-protocol/22-l929-cck8-cytotoxicity-material-extracts-en.pdf",
  },
];

const comparisonRows: ComparisonRow[] = [
  {
    comparison: "Baseline carbon-source response",
    groups: "WT on glucose, xylose or arabinose",
    measurements: (
      <>
        OD<sub>600</sub> growth time courses
      </>
    ),
  },
  {
    comparison: "Regulator loss of function",
    groups: (
      <>
        WT, Δ<em>xlnR</em>, Δ<em>araR</em>, Δ<em>xlnR</em> Δ<em>araR</em>
      </>
    ),
    measurements: "Growth on xylose and arabinose",
  },
  {
    comparison: "Single and combined overexpression",
    groups: "WT, OE-XlnR, OE-AraR, OE-XlnR+AraR",
    measurements: "Growth and production across glucose–xylose formulations",
  },
  {
    comparison: "Hydrolysate application",
    groups: "The same four overexpression-comparison strains",
    measurements: "Production using conditioned corn-stover hydrolysate",
  },
  {
    comparison: "Transcript comparison",
    groups: "WT and OE-XlnR+AraR",
    measurements: "Relative expression of selected metabolic targets",
  },
];

const pycDonors: PycDonor[] = [
  {
    code: "A08",
    source: "Aureobasidium melanogenum A08",
    note: "Native pyc donor.",
  },
  {
    code: "ZW / At",
    source: "Aureobasidium thailandense ZW03-4",
    note: "Heterologous donor; both labels identify ZW03-4.",
  },
  {
    code: "YL",
    source: "Yarrowia lipolytica",
    note: "Heterologous donor.",
  },
  {
    code: "SC",
    source: "Saccharomyces cerevisiae PYC1",
    note: "Heterologous donor.",
  },
];

const sections: ArticleSection[] = [
  {
    id: "experiments-overview",
    title: "Experimental Overview",
    content: (
      <>
        <p>
          Our wet-lab experiments connect corn-stover-derived hydrolysate with
          poly(malic acid) (PMA) production and a fermentation broth-derived
          adhesive. The work addresses four questions: how to prepare the
          supplied hydrolysate for fermentation, how XlnR and AraR engineering
          affects pentose utilization, how different pyruvate carboxylase (PYC)
          candidates perform in a shared engineered background, and whether the
          fermentation product can serve as an adhesive precursor.
        </p>
        <p>
          This page explains the experimental comparisons and measurements. The{" "}
          <a href="/ouc-haide/protocols">linked protocols</a> provide operating
          procedures; the <a href="/ouc-haide/notebook">Notebook</a> records the
          progression of the work, and <a href="/ouc-haide/results">Results</a>{" "}
          presents the observations and quantitative outcomes.
        </p>
        <ExperimentRoute
          questions={[
            {
              title:
                "How should the supplied hydrolysate be prepared for fermentation?",
              detail:
                "Clarification, activated-carbon conditioning and sugar standardization.",
            },
            {
              title:
                "How do XlnR and AraR engineering affect pentose utilization?",
              detail:
                "Regulator loss-of-function and overexpression comparisons across defined sugar formulations.",
            },
            {
              title:
                "How do different PYC candidates perform in a shared engineered background?",
              detail:
                "Native and heterologous candidates assessed in the OE-XlnR+AraR background.",
            },
            {
              title:
                "Can the fermentation product serve as an adhesive precursor?",
              detail:
                "Broth-derived PMA–dopamine preparation, lap-shear testing and L929 viability assessment.",
            },
          ]}
          modules={[
            { number: "01", title: "Chassis workflows" },
            { number: "02", title: "Saccharification" },
            { number: "03", title: "Xylose regulation" },
            { number: "04", title: "PYC candidates" },
            { number: "05", title: "Malate analysis" },
            { number: "06", title: "Adhesive testing" },
          ]}
        />
      </>
    ),
  },
  {
    id: "experiments-chassis-preparation",
    title: "Chassis Preparation and Shared Genetic Workflows",
    eyebrow: "Module 01",
    content: <></>,
    subsections: [
      {
        id: "experiments-a08-cultivation-and-identification",
        title: "A08 Cultivation and Identification",
        content: (
          <>
            <p>
              To investigate PMA production from biomass-derived sugars, we
              obtained the PMA-producing strain{" "}
              <em>Aureobasidium melanogenum</em> A08 from our laboratory's
              strain collection. Its earlier isolation and screening were
              performed by our laboratory. Unmodified A08 is designated wild
              type (WT) throughout the project.
            </p>
            <p>
              A08 was maintained on YPD plates at 28 °C. Single colonies were
              transferred into 5 mL YPD broth and cultured at 28 °C and 180 rpm
              for 24 h to prepare seed cultures. Colony photographs and
              microscopic observations documented the starting culture.
            </p>
            <p>
              For molecular identification, genomic DNA was prepared, the
              internal transcribed spacer (ITS) region was amplified, and
              purified amplicons underwent Nanopore sequencing. The resulting
              sequence was compared with reference sequences, aligned and
              analyzed in MEGA.
            </p>
            <ProtocolLinks links={a08Protocols} />
          </>
        ),
      },
      {
        id: "experiments-dna-amplification-and-construct-preparation",
        title: "DNA Amplification and Construct Preparation",
        content: (
          <>
            <p>
              The xylose and PYC modules shared a molecular-cloning workflow.
              Target fragments were amplified by PCR, examined by agarose-gel
              electrophoresis, and purified directly or recovered from the
              target gel band. The electrophoresis method used 1% agarose in 1×
              TAE. DNA cleanup and gel extraction used the Trelief DLN801 kit.
            </p>
            <StepSequence
              label="Shared construct-preparation workflow"
              steps={[
                {
                  title: "Amplify and inspect target fragments",
                  detail:
                    "PCR products were examined by 1% agarose-gel electrophoresis in 1× TAE.",
                },
                {
                  title: "Purify or recover DNA",
                  detail:
                    "Fragments were purified directly or recovered from the target gel band with the Trelief DLN801 kit.",
                },
                {
                  title: "Assemble the expression or knockout construct",
                  detail:
                    "The xylose and PYC modules used the same molecular-cloning framework.",
                },
                {
                  title: "Transform chemically competent E. coli DH5α",
                  detail:
                    "Assembly or ligation products were introduced by heat shock.",
                },
                {
                  title: "Select and verify candidates",
                  detail:
                    "LB agar contained 100 μg/mL ampicillin; incubation was at 37 °C for 12–16 h, followed by colony PCR, gel examination and sequencing.",
                },
                {
                  title: "Prepare plasmid DNA",
                  detail:
                    "Selected clones were processed with the SparkJade AD0101 miniprep kit.",
                },
              ]}
            />
            <p>
              Expression constructs used pNAT-LoxP-rDNA, an existing backbone
              documented by OUC-China 2025 as BBa_25QPWVAX.{" "}
              <Cite k="ouc2025pnat" /> The A08 <em>xlnR</em> and <em>araR</em>{" "}
              genes were used as regulatory targets. Target-specific knockout
              donors used the fl4a-hpt-loxp backbone with upstream and
              downstream homology arms for the corresponding genomic locus.
            </p>
            <p>
              Assembly or ligation products were introduced into chemically
              competent <em>Escherichia coli</em> DH5α by heat shock. Candidates
              were selected on LB agar containing 100 μg/mL ampicillin at 37 °C
              for 12–16 h. Colony PCR, gel examination and sequencing were used
              for construct verification. Plasmid DNA was prepared from selected
              clones with the SparkJade AD0101 miniprep kit.
            </p>
            <ProtocolLinks links={constructProtocols} />
            <Figure
              id="experiments-figure-1"
              src="https://static.igem.wiki/teams/6147/wiki/wet-experiment/48f64100fde9af20539396a0a3c884fc.avif"
              intrinsicWidth={4000}
              intrinsicHeight={3000}
              alt="A team member loading DNA samples into an agarose-gel electrophoresis tank."
              captionPrefix="Figure 1."
              caption="Member of the wet group is performing the electrophoresis method."
              fallback={<p>Image unavailable.</p>}
            />
          </>
        ),
      },
      {
        id: "experiments-a08-transformation-and-candidate-verification",
        title: "A08 Transformation and Candidate Verification",
        content: (
          <>
            <p>
              Regulator constructs were introduced into A08 using enzymatic
              protoplast preparation. Candidate overexpression transformants
              were rescreened on YPD containing 100 μg/mL nourseothricin (NAT);
              HPT-marked knockout candidates were rescreened on YPD containing
              100 μg/mL hygromycin B. Rescreening plates were incubated at 28 °C
              for 24 h.
            </p>
            <ParameterStrip
              label="A08 candidate rescreening"
              items={[
                {
                  label: "Overexpression selection",
                  value: "100 μg/mL NAT",
                },
                {
                  label: "Knockout selection",
                  value: "100 μg/mL hygromycin B",
                },
                {
                  label: "Plate incubation",
                  value: "28 °C",
                  detail: "24 h",
                },
              ]}
            />
            <p>
              Individual colonies were expanded in 5 mL antibiotic-free YPD at
              28 °C and 180 rpm for 24 h.
            </p>
            <ProtocolLinks links={transformationProtocols} />
          </>
        ),
      },
    ],
  },
  {
    id: "experiments-saccharification",
    title: "Saccharification Module",
    eyebrow: "Module 02",
    content: <></>,
    subsections: [
      {
        id: "experiments-feedstock-source-and-composition",
        title: "Feedstock Source and Composition",
        content: (
          <>
            <p>
              The laboratory of our instructor, Yajun Liu, supplied corn-stover
              hydrolysate prepared by consolidated bio-saccharification (CBS).
              The published CBS system uses engineered{" "}
              <em>Clostridium thermocellum</em> ΔpyrF::P₂₆₃₈-BGL to release
              fermentable sugars from pretreated corn biomass.{" "}
              <Cite k="liu2023cornbioconversion" /> Our team's work began with
              the supplied hydrolysate and focused on its characterization,
              conditioning and downstream use in A08 fermentation.
            </p>
            <p>
              Corn-stover structural carbohydrates and lignin were analyzed
              using the NREL two-stage sulfuric-acid procedure. Acid-insoluble
              and acid-soluble lignin were assessed separately.{" "}
              <Cite k="sluiter2012structural" />.
            </p>
          </>
        ),
      },
      {
        id: "experiments-hydrolysate-conditioning-and-sugar-analysis",
        title: "Hydrolysate Conditioning and Sugar Analysis",
        content: (
          <>
            <p>
              The received hydrolysate was clarified, then treated with 0.3%
              (w/v) activated carbon at 90 °C with shaking for 1 h. Carbon was
              removed by filtration before the filtrate passed through the
              hardware group's ion-exchange columns for removal of excess
              ammonia. The starting pH was matched to routine A08 production
              medium, approximately pH 5.5. Activated-carbon treatment and
              reduced-pressure concentration followed the literature-based
              conditioning method. <Cite k="liu2023cornbioconversion" />
            </p>
            <StepSequence
              label="Hydrolysate conditioning sequence"
              steps={[
                {
                  title: "Clarify the received hydrolysate",
                },
                {
                  title: "Treat with activated carbon",
                  detail:
                    "0.3% (w/v) activated carbon at 90 °C with shaking for 1 h.",
                },
                {
                  title: "Remove carbon by filtration",
                },
                {
                  title: "Pass through ion-exchange columns",
                  detail:
                    "The hardware group's columns removed excess ammonia.",
                },
                {
                  title: "Match the starting pH",
                  detail:
                    "The target was approximately pH 5.5, consistent with routine A08 production medium.",
                },
                {
                  title: "Concentrate and standardize",
                  detail:
                    "The concentrated stock was adjusted to 140 g/L reducing sugars expressed as glucose equivalents.",
                },
              ]}
            />
            <p>
              The concentrated hydrolysate stock was standardized to 140 g/L
              reducing sugars expressed as glucose equivalents by the DNS assay.
              Individual glucose and xylose concentrations were measured
              separately by HPLC with external standards. DNS glucose
              equivalents were not substituted for the HPLC-measured
              concentration of any individual sugar.
            </p>
            <ParameterStrip
              label="Hydrolysate preparation checkpoints"
              items={[
                {
                  label: "Carbon loading",
                  value: "0.3% (w/v)",
                  detail: "90 °C, shaking, 1 h",
                },
                {
                  label: "Starting pH",
                  value: "≈ 5.5",
                },
                {
                  label: "Reducing sugars",
                  value: "140 g/L",
                  detail: "Glucose equivalents by DNS",
                },
                {
                  label: "Individual sugars",
                  value: "HPLC",
                  detail: "External glucose and xylose standards",
                },
              ]}
            />
            <ProtocolLinks links={saccharificationProtocols} />
          </>
        ),
      },
    ],
  },
  {
    id: "experiments-xylose",
    title: "Xylose Module",
    eyebrow: "Module 03",
    content: <></>,
    subsections: [
      {
        id: "experiments-carbon-source-and-regulatory-comparisons",
        title: "Carbon-Source and Regulatory Comparisons",
        content: (
          <>
            <p>
              Baseline WT growth was followed by OD<sub>600</sub> measurements
              on glucose, xylose and arabinose. Production experiments then
              examined xylose loading and glucose–xylose mixtures. The xylose
              concentration series comprised 80, 100, 120, 140, 160 and 180 g/L.
              The mixed-sugar series used glucose/xylose recipe concentrations
              of 100/0, 75/25, 50/50, 25/75 and 0/100 g/L, maintaining 100 g/L
              total sugar before inoculation.
            </p>
            <p>
              The regulator experiments compared loss of function with single
              and combined overexpression. The deletion series addressed
              sugar-dependent growth, while the overexpression series examined
              growth and PMA-production performance. The four
              overexpression-comparison strains were also tested with
              conditioned corn-stover hydrolysate.
            </p>
            <ComparisonMatrix
              captionPrefix="Table E1."
              caption="Comparisons in the xylose module"
              rows={comparisonRows}
            />
            <p>
              For the defined-medium fermentation comparisons, each 250 mL flask
              received{" "}
              <strong>50 mL production medium and 5 mL seed culture</strong>,
              giving a <strong>55 mL final culture volume</strong>. The inoculum
              was therefore 10% of the pre-inoculation medium volume. Three
              independent flasks were used per strain–formulation combination,
              with incubation at 28 °C and 180 rpm for 120 h.
            </p>
            <ParameterStrip
              label="Defined-medium fermentation setup"
              items={[
                {
                  label: "Medium",
                  value: "50 mL",
                },
                {
                  label: "Seed culture",
                  value: "5 mL",
                },
                {
                  label: "Final volume",
                  value: "55 mL",
                },
                {
                  label: "Inoculum",
                  value: "10%",
                  detail: "Of pre-inoculation medium",
                },
                {
                  label: "Replication",
                  value: "3 flasks",
                  detail: "Per strain–formulation",
                },
                {
                  label: "Incubation",
                  value: "28 °C · 180 rpm",
                  detail: "120 h",
                },
              ]}
            />
            <ProtocolLinks links={xyloseComparisonProtocols} />
          </>
        ),
      },
      {
        id: "experiments-relative-gene-expression",
        title: "Relative Gene Expression by RT-qPCR",
        content: (
          <>
            <p>
              WT and OE-XlnR+AraR were cultured in 50 mL YPD-derived medium in
              which xylose replaced glucose at equal mass. After 24 h at 28 °C
              and 180 rpm, 5 mL culture was collected at 8,000 rpm for 5 min.
              The harvested cells were ground under liquid nitrogen, RNA was
              extracted with the SparkJade AC0305 kit, and cDNA was prepared
              using a Vazyme reverse-transcription kit.
            </p>
            <p>
              The experiments measured <em>XYR</em>, <em>XDH</em>, <em>XKI</em>,{" "}
              <em>XI</em> and <em>PMA</em>, with <em>actin</em> as the reference
              gene and WT as the calibrator. Reactions used Vazyme ChamQ
              Universal SYBR qPCR Master Mix on the Rotor-Gene Q. Each 10 μL
              reaction contained 0.4 μL of each 10 μM primer working solution.
              Four technical reactions were assigned to each sample–assay
              combination, and amplification comprised 35 cycles followed by
              melting analysis.
            </p>
            <ParameterStrip
              label="RT-qPCR reaction and analysis"
              items={[
                {
                  label: "Sample collection",
                  value: "5 mL",
                  detail: "After 24 h; 8,000 rpm for 5 min",
                },
                {
                  label: "Reaction volume",
                  value: "10 μL",
                },
                {
                  label: "Primer input",
                  value: "0.4 μL each",
                  detail: "10 μM working solution",
                },
                {
                  label: "Technical reactions",
                  value: "4",
                  detail: "Per sample–assay combination",
                },
                {
                  label: "Amplification",
                  value: "35 cycles",
                  detail: "Followed by melting analysis",
                },
                {
                  label: "Quantification",
                  value: "2−ΔΔCt",
                  detail: "WT calibrator; actin reference",
                },
              ]}
            />
            <p>
              Amplification and melting curves were reviewed in Rotor-Gene Q
              software version 2.0.2. Accepted technical-replicate Ct values
              were averaged within each sample before calculating ΔCt and ΔΔCt.
              Relative expression was calculated by the 2<sup>−ΔΔCt</sup>{" "}
              method, with the WT mean ΔCt as the calibrator; values were
              multiplied by 100 for plots displaying WT as the 100% reference.{" "}
              <Cite k="livak2001relative" />
            </p>
            <ArticleNote label="Sample scope">
              <p>
                These measurements compare transcript abundance in the two
                strain backgrounds. Four technical reactions from one culture
                remain measurements of that culture, rather than four
                independent biological samples.
              </p>
            </ArticleNote>
            <ProtocolLinks links={expressionProtocols} />
          </>
        ),
      },
    ],
  },
  {
    id: "experiments-pyc",
    title: "PYC Module",
    eyebrow: "Module 04",
    content: <></>,
    subsections: [
      {
        id: "experiments-candidate-constructs-and-dna-delivery",
        title: "Candidate Constructs and DNA Delivery",
        content: (
          <>
            <p>
              The PYC panel included the native A08 <em>pyc</em> gene and
              candidates from <em>Aureobasidium thailandense</em> ZW03-4,{" "}
              <em>Yarrowia lipolytica</em> and <em>Saccharomyces cerevisiae</em>
              . The heterologous donors are labeled ZW, YL and SC; the SC
              candidate is <em>PYC1</em>. The labels At and ZW refer to the same
              ZW03-4 donor.
            </p>
            <DonorPanel donors={pycDonors} />
            <p>
              Candidates used the shared pNAT-LoxP-rDNA expression framework.
              Native A08 <em>pyc</em> was amplified from genomic DNA, and
              construct preparation followed the shared PCR, DNA purification,
              assembly, DH5α screening and plasmid-isolation workflow.
            </p>
            <p>
              Electroporation and protoplast transformation were investigated as
              separate native-<em>pyc</em> delivery routes. The heterologous
              constructs were introduced into OE-XlnR+AraR through protoplast
              transformation and NAT-based candidate screening.
            </p>
            <ProtocolLinks links={pycDeliveryProtocols} />
            <Figure
              id="experiments-figure-2"
              src="https://static.igem.wiki/teams/6147/wiki/wet-experiment/0ff31401863da7d3b888a4328a207902.avif"
              intrinsicWidth={1706}
              intrinsicHeight={1279}
              alt="A laboratory instrument and microcentrifuge set up for the PYC gene-delivery work."
              captionPrefix="Figure 2."
              caption="Electroporation apparatus."
              fallback={<p>Image unavailable.</p>}
            />
          </>
        ),
      },
      {
        id: "experiments-pyc-fermentation-comparisons",
        title: "Fermentation Comparisons",
        content: (
          <>
            <p>
              The production panel comprised WT, OE-XlnR+AraR+ZW,
              OE-XlnR+AraR+YL and OE-XlnR+AraR+SC(<em>PYC1</em>), using
              corn-stover hydrolysate as the feedstock. The three donor groups
              compare PYC-engineering combinations in the same dual-regulator
              background; WT supplies the unmodified-chassis reference.
            </p>
            <p>This panel evaluates the combined-engineering phenotype.</p>
            <Figure
              id="experiments-figure-3"
              src="https://static.igem.wiki/teams/6147/wiki/wet-experiment/ed875bcf76d394bfd7ec67f86b067653.avif"
              intrinsicWidth={2279}
              intrinsicHeight={1279}
              alt="Rows of fermentation flasks containing corn-stover hydrolysate on a laboratory bench."
              captionPrefix="Figure 3."
              caption="Fermentation experiment."
              fallback={<p>Image unavailable.</p>}
            />
          </>
        ),
      },
    ],
  },
  {
    id: "experiments-acid-hydrolysis-and-hplc",
    title: "Acid Hydrolysis and HPLC Product Analysis",
    eyebrow: "Module 05",
    content: <></>,
    subsections: [
      {
        id: "experiments-hydrolysis-and-external-standards",
        title: "Hydrolysis and External Standards",
        content: (
          <>
            <p>
              Fermentation supernatant was analyzed after acid hydrolysis. The
              preparation used{" "}
              <strong>800 μL supernatant plus 200 μL sulfuric acid</strong>,
              incubated at <strong>80 °C for 12 h</strong>, then cooled and
              brought to a <strong>1.60 mL final total volume</strong> with
              water. The three malic acid standards were{" "}
              <strong>1.25, 3.75 and 15 mg/mL</strong>; they supplied the
              external calibration and did not undergo PMA hydrolysis. Standards
              and sample used matching HPLC conditions and injection volumes.
            </p>
            <HydrolysisPanel
              standards={[
                { concentration: "1.25 mg/mL", level: 8.33 },
                { concentration: "3.75 mg/mL", level: 25 },
                { concentration: "15 mg/mL", level: 100 },
              ]}
            />
            <p>
              The method does not include a paired non-hydrolyzed supernatant
              measurement. Its immediate analytical result is malic acid
              measured after hydrolysis, without subtraction of pre-existing
              free malic acid. This concentration basis is retained when
              interpreting PMA-related measurements.
            </p>
            <ProtocolLinks links={hydrolysisProtocols} />
            <Figure
              id="experiments-figure-4"
              src="https://static.igem.wiki/teams/6147/wiki/wet-experiment/12c6d888e3400642709402cf40515901.avif"
              intrinsicWidth={1702}
              intrinsicHeight={1276}
              alt="A high-performance liquid chromatography system on a laboratory bench."
              captionPrefix="Figure 4."
              caption="HPLC instrument."
              fallback={<p>Image unavailable.</p>}
            />
          </>
        ),
      },
      {
        id: "experiments-peak-integration-and-calibration",
        title: "Peak Integration and Calibration",
        content: (
          <>
            <p>
              Numerical analysis used the original retention-time and signal
              coordinates. P1 and P2 were integrated separately, each against a
              straight baseline joining its measured endpoints. The
              baseline-subtracted observations were integrated by the signed
              composite trapezoidal rule using the actual time intervals.
            </p>
            <p>
              For the sample, P1 covered <strong>9.208229–13.808230 min</strong>
              {", and P2 covered "}
              <strong>14.608230–18.184900 min</strong>. P1 ended before the
              small intermediate response around 14.03156 min. This response and
              all observations outside the two integration intervals were
              excluded from the quantitative sum.
            </p>
            <p>
              Python and NumPy calculated the two baseline-relative areas. For
              each standard and the sample, the response was{" "}
              <strong>A_total = A_P1 + A_P2</strong>. The three standard inputs
              and their previously recorded integration boundaries were retained
              unchanged. GraphPad Prism 11.0.1 fitted their total areas by
              unweighted ordinary least-squares linear regression with a freely
              estimated intercept. Sample concentration was obtained by
              substituting its measured total area into the fitted equation. The
              sample was not included as a calibration point.
            </p>
            <ProtocolLinks links={integrationProtocols} />
          </>
        ),
      },
    ],
  },
  {
    id: "experiments-adhesive",
    title: "Adhesive Module",
    eyebrow: "Module 06",
    content: <></>,
    subsections: [
      {
        id: "experiments-pma-dopamine-preparation",
        title: "PMA–Dopamine Preparation",
        content: (
          <>
            <p>
              Cells were removed from PMA-containing fermentation broth, which
              was used directly without a separate PMA-isolation step before
              reaction. Published PMA–dopamine preparation provided the EDC/NHS
              coupling precedent. <Cite k="Tang2020PMLADA" /> Our preparation
              used the broth-derived starting material and the reaction schedule
              below.
            </p>
            <p>
              Reagent inputs were calculated from estimated pendant PMA
              carboxyl-group amounts. The baseline dopamine:carboxyl molar feed
              ratio was 1:1, with EDC·HCl and NHS each added at two molar
              equivalents relative to carboxyl groups.
            </p>
            <ReactionSchedule
              ratios={[
                { label: "Dopamine : carboxyl", value: "1 : 1" },
                { label: "EDC·HCl : carboxyl", value: "2 : 1" },
                { label: "NHS : carboxyl", value: "2 : 1" },
              ]}
              steps={[
                {
                  duration: "1 h",
                  detail:
                    "Activate with magnetic stirring and protection from light.",
                },
                {
                  duration: "24 h",
                  detail: "Add dopamine and stir with protection from light.",
                },
                {
                  duration: "48 h",
                  detail:
                    "Dialyze against water, changing the water at least every 12 h.",
                },
                {
                  duration: "1 h",
                  detail:
                    "Cast the dialyzed formulation into small dishes and prefreeze at −80 °C.",
                },
                {
                  duration: "48 h",
                  detail: "Freeze-dry the preparation.",
                },
              ]}
            />
            <p>
              Activation proceeded for 1 h with magnetic stirring and protection
              from light, followed by dopamine addition and 24 h of
              light-protected stirring.
            </p>
            <p>
              Dialysis tubing was boiled for 30 min before use. The mixture was
              dialyzed against water for 48 h, with water changes at least every
              12 h. The dialyzed formulation was cast into small dishes,
              prefrozen at −80 °C for 1 h and freeze-dried for 48 h. The
              synthesis feed ratio was recorded separately from any measurement
              of dopamine substitution.
            </p>
            <ProtocolLinks links={adhesiveProtocols} />
            <FigurePair>
              <Figure
                id="experiments-figure-5"
                src="https://static.igem.wiki/teams/6147/wiki/wet-experiment/45f29ee99dac6ae9a9704677604b0521.avif"
                intrinsicWidth={3000}
                intrinsicHeight={4000}
                alt="A freeze dryer with a cylindrical glass drying chamber."
                captionPrefix="Figure 5."
                caption="Freeze dryer."
                fallback={<p>Image unavailable.</p>}
              />
              <Figure
                id="experiments-figure-6"
                src="https://static.igem.wiki/teams/6147/wiki/wet-experiment/0552d48e4f5784947aa7d25b3010ba4d.avif"
                intrinsicWidth={4000}
                intrinsicHeight={2367}
                alt="Prepared adhesive samples and substrate strips arranged on a black laboratory bench."
                captionPrefix="Figure 6."
                caption="Materials pending testing."
                fallback={<p>Image unavailable.</p>}
              />
            </FigurePair>
          </>
        ),
      },
      {
        id: "experiments-lap-shear-and-water-immersion",
        title: "Lap-Shear Testing and Water-Immersion Comparison",
        content: (
          <>
            <p>
              Lap-shear testing was performed on an electronic universal testing
              machine with reference to ASTM D1002 (ASTM International, 2019).
              Samples prepared with glass, stainless steel and <em>ex vivo</em>{" "}
              porcine skin were tested using a CTM2050S universal testing
              machine to record load–displacement responses. Formulation
              comparisons examined changes in material concentration and
              dopamine input.
            </p>
            <p>
              For the water-immersion comparison, assembled joints were left
              undisturbed for 2 h and then immersed in water for 24 h before
              adhesive-force testing. Non-immersed joints provided the
              corresponding comparison under matched test geometry and loading
              conditions. This experiment assesses preformed joints after
              immersion, rather than demonstrating that the adhesive was applied
              and cured underwater.
            </p>
            <FigurePair>
              <Figure
                id="experiments-figure-7"
                src="https://static.igem.wiki/teams/6147/wiki/wet-experiment/1a190973472946be28f7b17660080a8b.avif"
                intrinsicWidth={4000}
                intrinsicHeight={3000}
                alt="A universal testing machine with a lap-shear sample mounted between its grips."
                captionPrefix="Figure 7."
                caption="Representative photograph of testing."
                fallback={<p>Image unavailable.</p>}
              />
              <Figure
                id="experiments-figure-8"
                src="https://static.igem.wiki/teams/6147/wiki/wet-experiment/2a9fb7bcf0fd6681b552101e71df60f7.avif"
                intrinsicWidth={3000}
                intrinsicHeight={4000}
                alt="A second view of the universal testing machine during lap-shear measurement."
                captionPrefix="Figure 8."
                caption="Representative photograph of testing."
                fallback={<p>Image unavailable.</p>}
              />
            </FigurePair>
          </>
        ),
      },
      {
        id: "experiments-l929-cell-response",
        title: "L929 Cell Response to Material Extracts",
        content: (
          <>
            <p>
              L929 mouse fibroblasts were cultured in high-glucose DMEM complete
              medium at 37 °C with 5% CO<sub>2</sub>. Each cell well received
              100 μL diluted cell suspension and 100 μL complete medium. After
              attachment and growth to approximately 85% confluence, the medium
              was replaced with 100 μL prepared material extract or matched
              material-free extraction vehicle. Separate wells were assigned to
              the 24, 48 and 72 h exposure endpoints.
            </p>
            <ParameterStrip
              label="L929 CCK-8 assay conditions"
              items={[
                {
                  label: "Cell suspension",
                  value: "100 μL",
                },
                {
                  label: "Complete medium",
                  value: "100 μL",
                },
                {
                  label: "Treatment",
                  value: "100 μL",
                  detail: "Material extract or matched vehicle",
                },
                {
                  label: "Exposure endpoints",
                  value: "24 · 48 · 72 h",
                  detail: "Separate wells",
                },
                {
                  label: "CCK-8 working reagent",
                  value: "100 μL",
                  detail: "CCK-8:medium = 1:10",
                },
                {
                  label: "Incubation before reading",
                  value: "2 h",
                },
                {
                  label: "Absorbance",
                  value: "450 nm",
                },
                {
                  label: "Normalization",
                  value: "Same endpoint",
                  detail: "Corrected cell-control signal",
                },
              ]}
            />
            <p>
              At each endpoint, the treatment liquid was replaced with 100 μL
              fresh CCK-8 working reagent, prepared at a CCK-8:complete-medium
              volume ratio of 1:10. After 2 h incubation, absorbance was
              measured at 450 nm. Corresponding no-cell material and vehicle
              blanks supplied background corrections, and corrected treatment
              signals were normalized to corrected cell-control signals from the
              same endpoint.
            </p>
            <p>
              Material-batch and extraction records define the exposure
              associated with each cell result. The assay reports relative L929
              cell viability under those exposure conditions; it is distinct
              from direct material-contact testing.
            </p>
            <ProtocolLinks links={cytotoxicityProtocols} />
          </>
        ),
      },
    ],
  },
];

export function Experiments() {
  return (
    <ArticlePage
      title="Experiments"
      heroImage={{
        src: "https://static.igem.wiki/teams/6147/wiki/wet-header/header-experiments.avif",
        alt: "Illustration of microscopes, laboratory instruments, and gel electrophoresis.",
        intrinsicWidth: 4000,
        intrinsicHeight: 1334,
        backgroundColor: "#e7f2f4",
        objectFit: "contain",
      }}
      sections={sections}
      references
      referencesIntro="Sources cited in the experimental descriptions."
    />
  );
}

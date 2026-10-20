import {
  ArticlePage,
  type ArticleSection,
} from "../components/article/ArticlePage";
import {
  BackboneStack,
  ConstructCatalog,
  CorePartPairs,
  DonorLedger,
  MetabolismBoard,
  type PartRecord,
  ToolFlow,
} from "../components/parts/PartsSections";

const coreParts: PartRecord[] = [
  {
    id: "BBa_26X6M2G5",
    type: "Regulator gene",
    name: (
      <>
        A08 <em>xlnR</em> gene
      </>
    ),
    role: (
      <>
        Provides the native XlnR regulator gene for functional studies and
        expression-construct development.
      </>
    ),
  },
  {
    id: "BBa_26K4GKDM",
    type: "Regulator gene",
    name: (
      <>
        A08 <em>araR</em> gene
      </>
    ),
    role: (
      <>
        Provides the native AraR regulator gene for individual studies and
        comparisons with <em>xlnR</em>.
      </>
    ),
  },
  {
    id: "BBa_265VC540",
    type: "Expression construct",
    name: "pNAT-LoxP-rDNA-xlnR",
    role: (
      <>
        Places the A08 <em>xlnR</em> gene in the shared TEF-promoter expression
        framework for XlnR-overexpression studies.
      </>
    ),
  },
  {
    id: "BBa_26BY6BJU",
    type: "Expression construct",
    name: "pNAT-LoxP-rDNA-araR",
    role: (
      <>
        Places the A08 <em>araR</em> gene in the same expression framework for
        AraR-overexpression studies.
      </>
    ),
  },
];

const supportingBackbones: PartRecord[] = [
  {
    id: "BBa_25QPWWAX",
    type: "Shared backbone",
    name: "pNAT-LoxP-rDNA",
    role: (
      <>
        Reused expression backbone providing the translation elongation factor
        (TEF) promoter, nourseothricin-resistance (NAT) selection framework, and
        ribosomal DNA (rDNA) homology regions. It is the parent backbone for
        both regulator-expression designs.
      </>
    ),
  },
  {
    id: "BBa_260OK570",
    type: "Knockout backbone",
    name: "fl4a-hpt-loxp",
    role: (
      <>
        Supporting knockout backbone containing the hygromycin B
        phosphotransferase (HPT) selection interval and flanking lox sites.
        Adding a separate pair of target-specific homology arms produces the
        corresponding <em>xlnR</em> or <em>araR</em> knockout-donor design.
      </>
    ),
  },
];

const metabolismParts: PartRecord[] = [
  {
    id: "BBa_26X6M2G5",
    type: "Regulatory gene",
    name: (
      <>
        A08 <em>xlnR</em>
      </>
    ),
    role: (
      <>
        Native XlnR transcriptional regulator gene for investigating
        pentose-associated regulation and overexpression strategies.
      </>
    ),
  },
  {
    id: "BBa_26K4GKDM",
    type: "Regulatory gene",
    name: (
      <>
        A08 <em>araR</em>
      </>
    ),
    role: (
      <>
        Native AraR transcriptional regulator gene for investigating
        pentose-associated regulation, individually and together with{" "}
        <em>xlnR</em>.
      </>
    ),
  },
  {
    id: "BBa_26JGAV43",
    type: "Xylose panel",
    name: (
      <>
        A08 <em>XYR</em>
      </>
    ),
    role: (
      <>
        Annotated as encoding a putative xylose reductase, with the expected
        conversion of D-xylose to xylitol. Included in the gene-expression
        panel.
      </>
    ),
  },
  {
    id: "BBa_26E5B9VX",
    type: "Xylose panel",
    name: (
      <>
        A08 <em>XDH</em>
      </>
    ),
    role: (
      <>
        A xylose-metabolism-related cDNA sequence included in transcript-level
        comparisons.
      </>
    ),
  },
  {
    id: "BBa_26ICD9HH",
    type: "Xylose panel",
    name: (
      <>
        A08 <em>XKI</em>
      </>
    ),
    role: (
      <>
        Annotated as encoding a putative xylulokinase, with the expected
        phosphorylation of D-xylulose to D-xylulose-5-phosphate. Included in the
        gene-expression panel.
      </>
    ),
  },
  {
    id: "BBa_26ECUEKG",
    type: "Xylose panel",
    name: (
      <>
        A08 <em>XI</em>
      </>
    ),
    role: (
      <>
        A xylose-associated gene included in the expression panel for comparing
        WT and regulator-engineered A08.
      </>
    ),
  },
];

const pycDonorParts: PartRecord[] = [
  {
    id: "BBa_26IU3R0X",
    type: "PYC donor",
    name: "A08 pyruvate carboxylase gene",
    role: (
      <>
        Endogenous PYC candidate included in the donor panel for
        precursor-supply engineering.
      </>
    ),
  },
  {
    id: "BBa_26K3KXDO",
    type: "PYC donor",
    name: (
      <>
        <em>Aureobasidium thailandense</em> ZW03-4 pyruvate carboxylase gene
      </>
    ),
    role: (
      <>Same-genus PYC candidate intended for heterologous expression in A08.</>
    ),
  },
  {
    id: "BBa_26B5K9XJ",
    type: "PYC donor",
    name: (
      <>
        <em>Yarrowia lipolytica</em> pyruvate carboxylase gene
      </>
    ),
    role: (
      <>
        Heterologous PYC gene retaining its native intron; expression of the
        expected protein requires correct transcript splicing.
      </>
    ),
  },
  {
    id: "BBa_267N41A9",
    type: "PYC donor",
    name: (
      <>
        <em>Saccharomyces cerevisiae PYC1</em>
      </>
    ),
    role: (
      <>
        Gene encoding pyruvate carboxylase 1, included as a heterologous donor
        for precursor-supply engineering.
      </>
    ),
  },
];

const expressionParts: PartRecord[] = [
  {
    id: "BBa_265VC540",
    type: "Regulator construct",
    name: "pNAT-LoxP-rDNA-xlnR",
    role: (
      <>
        Expression design for A08 <em>xlnR</em>.
      </>
    ),
  },
  {
    id: "BBa_26BY6BJU",
    type: "Regulator construct",
    name: "pNAT-LoxP-rDNA-araR",
    role: (
      <>
        Expression design for A08 <em>araR</em>.
      </>
    ),
  },
  {
    id: "BBa_26WPAP5Y",
    type: "PYC construct",
    name: "pNAT-LoxP-rDNA-A08pyc",
    role: (
      <>
        Endogenous PYC expression design for the dual-regulator A08 background.
      </>
    ),
  },
  {
    id: "BBa_26BVWV01",
    type: "PYC construct",
    name: "pNAT-LoxP-rDNA-ZWpyc",
    role: (
      <>
        Expression design for the ZW03-4 PYC candidate in the dual-regulator A08
        background.
      </>
    ),
  },
  {
    id: "BBa_26603AT5",
    type: "PYC construct",
    name: "pNAT-LoxP-rDNA-SCpyc",
    role: (
      <>
        Expression design for <em>S. cerevisiae PYC1</em> in the dual-regulator
        A08 background.
      </>
    ),
  },
  {
    id: "BBa_26KHWZ9J",
    type: "PYC construct",
    name: "pNAT-LoxP-rDNA-YLpyc",
    role: (
      <>
        Expression design for the <em>Y. lipolytica</em> PYC gene in the
        dual-regulator A08 background.
      </>
    ),
  },
];

const toolParts: PartRecord[] = [
  {
    id: "BBa_260OK570",
    type: "Knockout tool",
    name: "fl4a-hpt-loxp",
    role: (
      <>
        HPT-containing backbone for constructing target-specific knockout
        donors, with flanking lox sites for marker-recycling designs.
      </>
    ),
  },
  {
    id: "BBa_261MMQ1L",
    type: "Recombination tool",
    name: "Cre recombinase sequence resource",
    role: (
      <>
        Resource for Cre-mediated recombination between compatible lox sites;
        directly oriented sites support excision of the intervening DNA.
      </>
    ),
  },
];

const sections: ArticleSection[] = [
  {
    id: "parts-pentose-regulation",
    title: "Pentose-Regulation Part Collection",
    content: (
      <p>
        We developed the Pentose-Regulation Part Collection to connect
        transcription-factor function with pentose utilization and poly(malic
        acid) (PMA) production in <em>Aureobasidium melanogenum</em> A08. The
        collection centres on the native <em>xlnR</em> and <em>araR</em> genes
        and their corresponding expression constructs. Together with a shared
        expression backbone and a supporting knockout backbone, these parts
        provide complementary ways to investigate the two regulators and compare
        individual and combined engineering strategies.
      </p>
    ),
    subsections: [
      {
        id: "parts-core-parts",
        title: "Core Parts",
        content: (
          <>
            <p>
              The four core parts comprise two regulator genes and two
              expression-plasmid designs.
            </p>
            <CorePartPairs
              pairs={[
                {
                  regulator: coreParts[0],
                  construct: coreParts[2],
                },
                {
                  regulator: coreParts[1],
                  construct: coreParts[3],
                },
              ]}
            />
          </>
        ),
      },
      {
        id: "parts-supporting-backbones",
        title: "Supporting Backbones",
        content: (
          <>
            <p>
              Two backbone resources support the expression and knockout
              designs. They are listed separately from the four core parts.
            </p>
            <BackboneStack parts={supportingBackbones} />
          </>
        ),
      },
      {
        id: "parts-work-together",
        title: "How the Parts Work Together",
        content: (
          <>
            <p>
              The regulator genes define the sequences under investigation,
              while the paired expression constructs provide a common framework
              for increased-expression studies. Using the constructs separately
              or in the same A08 background supports comparisons of XlnR alone,
              AraR alone, and their combined application. The knockout framework
              addresses the complementary question of how loss of either
              regulator, or both regulators, affects the host. Each knockout
              target requires its own genomic homology arms; the shared backbone
              does not determine the target locus.
            </p>
            <p>
              This organization links functional analysis with production-strain
              engineering. Single- and double-knockout comparisons examine
              regulator contributions to growth on pentoses. Single- and
              combined-overexpression comparisons examine sugar utilization and
              PMA production. RT-qPCR measurements of selected xylose-associated
              genes compare the transcriptional response of WT and OE-XlnR+AraR.
              Mixed-sugar and corn-stover hydrolysate fermentations extend the
              comparison to biomass-derived carbon sources.
            </p>
          </>
        ),
      },
      {
        id: "parts-reuse-beyond-a08",
        title: "Reuse Beyond A08",
        content: (
          <p>
            Other teams can reuse the regulator genes individually or together
            to investigate pentose regulation in another fungal host.
            A08-derived XlnR and AraR also provide candidates for heterologous
            transcription-factor studies: host-adapted expression can test their
            effects on metabolic-gene expression, sugar utilization, and
            production of the chosen product. Such work requires expression and
            selection elements compatible with the recipient. Adapting the
            knockout framework additionally requires homology arms matching the
            new target genome.
          </p>
        ),
      },
    ],
  },
  {
    id: "parts-pentose-regulation-metabolism",
    title: "Pentose Regulation and Metabolism",
    content: (
      <>
        <p>
          The native regulator genes <em>xlnR</em> and <em>araR</em> are the
          focus of our regulator-engineering module. XYR, XDH, XKI, and XI form
          the associated gene-expression panel used to examine transcriptional
          responses in A08.
        </p>
        <MetabolismBoard parts={metabolismParts} />
      </>
    ),
  },
  {
    id: "parts-pyc-donor-genes",
    title: "Pyruvate Carboxylase Donor Genes",
    content: (
      <>
        <p>
          Pyruvate carboxylase (PYC) catalyzes the ATP-dependent carboxylation
          of pyruvate to oxaloacetate. Our four donor genes provide a panel for
          comparing endogenous and heterologous candidates within the PYC
          engineering module.
        </p>
        <DonorLedger parts={pycDonorParts} />
      </>
    ),
  },
  {
    id: "parts-expression-designs",
    title: "Expression Plasmid Designs",
    content: (
      <>
        <p>
          The following entries describe expression designs based on the shared
          pNAT-LoxP-rDNA backbone,{" "}
          <a
            href="https://registry.igem.org/parts/bba-25qpwwax"
            target="_blank"
            rel="noopener noreferrer"
          >
            BBa_25QPWWAX
          </a>
          . The regulator constructs are designed for A08. The PYC constructs
          are designed for the OE-XlnR+AraR A08 background, connecting regulator
          engineering with precursor-supply engineering.
        </p>
        <ConstructCatalog parts={expressionParts} />
      </>
    ),
  },
  {
    id: "parts-knockout-marker-recycling",
    title: "Knockout and Marker Recycling Tools",
    content: (
      <>
        <p>
          Targeted gene disruption and selectable-marker recycling serve
          different purposes. The fl4a-hpt-loxp backbone provides a framework
          for constructing knockout donors with target-specific homology arms.
          Cre recombinase is supplied separately to mediate recombination
          between compatible lox sites.
        </p>
        <ToolFlow parts={toolParts} />
      </>
    ),
  },
  {
    id: "parts-connect",
    title: "How the Parts Connect",
    content: (
      <>
        <p>
          Within this catalogue, the A08 pentose-regulation set centres on{" "}
          <em>xlnR</em> and <em>araR</em>. Their gene entries and expression
          designs connect regulator identity with increased-expression studies,
          while the knockout backbone supports complementary loss-of-function
          designs after the addition of target-specific homology arms. The four
          xylose-associated genes provide a transcript-level readout of the
          regulatory response. The PYC donor panel extends the engineering
          question from carbon utilization to precursor supply.
        </p>
        <p>
          Other teams can select individual genes for functional studies or
          adapt the expression and disruption frameworks to their own hosts.
          Testing A08 XlnR or AraR in another fungus offers a way to investigate
          heterologous regulation of pentose metabolism. Such adaptation
          requires host-compatible regulatory and selection elements,
          appropriate targeting sequences where integration is intended, and
          functional testing in the new host.
        </p>
      </>
    ),
  },
];

export function Parts() {
  return (
    <ArticlePage
      title="Parts"
      lead={
        <>
          Carbotex investigates pentose utilization and poly(malic acid) (PMA)
          production in <em>Aureobasidium melanogenum</em> A08. The catalogue
          contains 24 part records covering 19 unique iGEM Registry entries:
          pentose-associated genes, pyruvate carboxylase donor genes,
          expression-plasmid designs, and genetic-engineering tools. Every entry
          links directly to its Registry record.
        </>
      }
      sections={sections}
      stickyMobileOutline
    />
  );
}

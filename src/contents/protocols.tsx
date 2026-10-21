import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import {
  ArticlePage,
  type ArticleSection,
} from "../components/article/ArticlePage";
import styles from "./protocols.module.css";

interface ProtocolDocument {
  number: string;
  title: string;
  summary: ReactNode;
  pdfUrl: string;
}

type ProtocolLayout =
  | "notes"
  | "split"
  | "sequence"
  | "ledger"
  | "compare"
  | "pair";

interface ProtocolGroup {
  id: string;
  layout: ProtocolLayout;
  title: string;
  description: string;
  protocols: ProtocolDocument[];
}

const protocolGroups: ProtocolGroup[] = [
  {
    id: "strain-cultivation-and-identification",
    layout: "notes",
    title: "Strain Cultivation and Identification",
    description:
      "Three protocols cover routine A08 cultivation, genomic DNA preparation and ITS-based identification.",
    protocols: [
      {
        number: "1",
        title: "A08 Plate Cultivation and Seed Culture",
        summary: (
          <>
            Cultivation of <em>Aureobasidium melanogenum</em> A08 on YPD plates
            and preparation of liquid seed cultures for subsequent experiments.
          </>
        ),
        pdfUrl:
          "https://static.igem.wiki/teams/6147/wiki/wet-protocol/1-a08-plate-and-seed-cultivation-en.pdf",
      },
      {
        number: "2",
        title: "Genomic DNA Extraction for pyc Amplification",
        summary: (
          <>
            Enzymatic cell-wall digestion, cell lysis, extraction and DNA
            precipitation to prepare genomic templates for <em>pyc</em>{" "}
            amplification.
          </>
        ),
        pdfUrl:
          "https://static.igem.wiki/teams/6147/wiki/wet-protocol/2-a-pyc-genomic-dna-extraction.pdf",
      },
      {
        number: "6",
        title: "A08 ITS Amplification, Nanopore Sequencing and MEGA Phylogeny",
        summary:
          "ITS amplification and purification, Nanopore sequencing, reference-sequence alignment and phylogenetic analysis in MEGA for A08 identification.",
        pdfUrl:
          "https://static.igem.wiki/teams/6147/wiki/wet-protocol/6-a08-its-nanopore-sequencing-and-mega-phylogeny-en.pdf",
      },
    ],
  },
  {
    id: "molecular-cloning",
    layout: "split",
    title: "Molecular Cloning",
    description:
      "Six protocols describe DNA amplification, electrophoresis, purification, assembly, bacterial transformation and plasmid isolation.",
    protocols: [
      {
        number: "3",
        title: "PCR Amplification of DNA Fragments",
        summary:
          "Preparation of PCR reactions and use of the recorded thermocycler program to amplify target DNA fragments.",
        pdfUrl:
          "https://static.igem.wiki/teams/6147/wiki/wet-protocol/3-pcr-amplification-en.pdf",
      },
      {
        number: "4",
        title: "Agarose Gel Electrophoresis",
        summary:
          "Separation and examination of DNA fragments using agarose gels, with lane records and imaging for downstream fragment recovery.",
        pdfUrl:
          "https://static.igem.wiki/teams/6147/wiki/wet-protocol/4-agarose-gel-electrophoresis-en.pdf",
      },
      {
        number: "5",
        title: "PCR Product Cleanup and DNA Gel Extraction",
        summary:
          "Direct PCR-product purification or recovery of a target DNA band using the Trelief DLN801 kit.",
        pdfUrl:
          "https://static.igem.wiki/teams/6147/wiki/wet-protocol/5-pcr-product-cleanup-and-gel-extraction-en.pdf",
      },
      {
        number: "7",
        title: "Single-Fragment Seamless Assembly",
        summary:
          "Assembly of an insert carrying homologous overlaps with a linearized vector using the Spark HiFi Seamless Cloning Kit.",
        pdfUrl:
          "https://static.igem.wiki/teams/6147/wiki/wet-protocol/7-single-fragment-seamless-assembly-en.pdf",
      },
      {
        number: "8",
        title: "DH5α Heat-Shock Transformation and Clone Screening",
        summary: (
          <>
            T4 ligation, heat-shock transformation of <em>Escherichia coli</em>{" "}
            DH5α, ampicillin selection and verification of candidate recombinant
            clones.
          </>
        ),
        pdfUrl:
          "https://static.igem.wiki/teams/6147/wiki/wet-protocol/8-dh5alpha-heat-shock-transformation-en.pdf",
      },
      {
        number: "9",
        title: "Plasmid Miniprep from DH5α",
        summary:
          "Spin-column isolation of plasmid DNA from DH5α cultures using the SparkJade AD0101 kit.",
        pdfUrl:
          "https://static.igem.wiki/teams/6147/wiki/wet-protocol/9-dh5alpha-plasmid-miniprep-en.pdf",
      },
    ],
  },
  {
    id: "a08-transformation-and-transformant-screening",
    layout: "sequence",
    title: "A08 Transformation and Transformant Screening",
    description:
      "Four protocols cover protoplast transformation, electroporation and antibiotic rescreening of candidate A08 transformants.",
    protocols: [
      {
        number: "10",
        title: "Protoplast Transformation",
        summary:
          "Enzymatic protoplast preparation, PEG-mediated DNA delivery and cell-wall regeneration before transformant screening.",
        pdfUrl:
          "https://static.igem.wiki/teams/6147/wiki/wet-protocol/p10-protoplast-transformation.pdf",
      },
      {
        number: "11",
        title: "Electroporation",
        summary:
          "Cell pretreatment, DNA addition, electrical-pulse delivery, recovery and selection in the A08 electroporation workflow.",
        pdfUrl:
          "https://static.igem.wiki/teams/6147/wiki/wet-protocol/11electroporation-protocol-en.pdf",
      },
      {
        number: "12",
        title: "A08 Nourseothricin Rescreening and Seed Culture",
        summary:
          "Rescreening of candidate colonies on nourseothricin-containing YPD plates, followed by seed cultivation in antibiotic-free YPD.",
        pdfUrl:
          "https://static.igem.wiki/teams/6147/wiki/wet-protocol/12-a08-nat-rescreening-and-culture-en.pdf",
      },
      {
        number: "13",
        title: "A08 Hygromycin B Rescreening and Seed Culture",
        summary:
          "Hygromycin B rescreening of HPT-marked candidate knockout transformants and preparation of antibiotic-free liquid cultures for verification.",
        pdfUrl:
          "https://static.igem.wiki/teams/6147/wiki/wet-protocol/13-a08-hygromycinb-rescreening-and-culture-en.pdf",
      },
    ],
  },
  {
    id: "corn-stover-hydrolysate-preparation-and-sugar-analysis",
    layout: "ledger",
    title: "Corn-Stover Hydrolysate Preparation and Sugar Analysis",
    description:
      "Three protocols cover corn-stover composition, hydrolysate conditioning and monosaccharide measurement.",
    protocols: [
      {
        number: "14",
        title: "Structural Carbohydrates and Lignin in Corn Stover",
        summary:
          "NREL two-stage sulfuric-acid analysis of structural carbohydrates and acid-insoluble and acid-soluble lignin, with dry-mass and sugar-recovery corrections.",
        pdfUrl:
          "https://static.igem.wiki/teams/6147/wiki/wet-protocol/14-corn-stover-structural-carbohydrates-and-lignin-nrel-en.pdf",
      },
      {
        number: "15",
        title: "Corn-Stover Hydrolysate Conditioning",
        summary:
          "Hydrolysate clarification, activated-carbon treatment, carbon removal, ion-exchange processing, pH adjustment and concentration before fermentation.",
        pdfUrl:
          "https://static.igem.wiki/teams/6147/wiki/wet-protocol/15-corn-stover-hydrolysate-conditioning-en.pdf",
      },
      {
        number: "16",
        title: "HPLC Measurement of Monosaccharides",
        summary:
          "Sample preparation, HPLC analysis, external calibration and concentration calculation for glucose, xylose and arabinose in hydrolysate and A08 broth.",
        pdfUrl:
          "https://static.igem.wiki/teams/6147/wiki/wet-protocol/16-hplc-monosaccharides-in-hydrolysate-and-a08-broth-en.pdf",
      },
    ],
  },
  {
    id: "fermentation-and-gene-expression-analysis",
    layout: "compare",
    title: "Fermentation and Gene Expression Analysis",
    description:
      "Four protocols describe fermentation comparisons, transcript measurements and malic-acid analysis after PMA hydrolysis.",
    protocols: [
      {
        number: "17",
        title: "A08 Carbon-Source and Strain Fermentation Comparisons",
        summary:
          "Flask fermentation comparisons of glucose–xylose formulations and WT, OE-XlnR, OE-AraR and OE-XlnR+AraR strains, using independent culture replicates.",
        pdfUrl:
          "https://static.igem.wiki/teams/6147/wiki/wet-protocol/17-a08-carbon-source-and-strain-fermentation-en-corrected.pdf",
      },
      {
        number: "18",
        title: "Xylose-Related Gene Expression by RT-qPCR",
        summary: (
          <>
            RNA extraction, reverse transcription and relative-expression
            analysis in xylose-grown WT and OE-XlnR+AraR, using <em>actin</em>{" "}
            as the reference gene.
          </>
        ),
        pdfUrl:
          "https://static.igem.wiki/teams/6147/wiki/wet-protocol/18-xylose-related-gene-expression-en.pdf",
      },
      {
        number: "19A",
        title: "PMA Acid Hydrolysis and HPLC Measurement",
        summary:
          "Acid hydrolysis of fermentation supernatant and HPLC measurement of malic acid using standards at 1.25, 3.75 and 15 mg/mL for external calibration.",
        pdfUrl:
          "https://static.igem.wiki/teams/6147/wiki/wet-protocol/19a-pma-acid-hydrolysis-and-hplc-three-standards-en.pdf",
      },
      {
        number: "20",
        title: "HPLC Integration and External Malate Calibration",
        summary:
          "Selection of integration boundaries, construction of endpoint baselines, numerical peak integration, standard-curve fitting and dilution correction for acquired chromatograms.",
        pdfUrl:
          "https://static.igem.wiki/teams/6147/wiki/wet-protocol/20-hplc-integration-and-malate-calibration-expanded-en.pdf",
      },
    ],
  },
  {
    id: "adhesive-preparation-and-cell-response",
    layout: "pair",
    title: "Adhesive Preparation and Cell Response",
    description:
      "Two protocols cover PMA–dopamine adhesive preparation and the L929 cell-response assay.",
    protocols: [
      {
        number: "21",
        title: "PMA–Dopamine Adhesive Preparation",
        summary:
          "EDC/NHS-mediated activation and dopamine coupling of fermentation-derived PMA, followed by dialysis, prefreezing and freeze-drying.",
        pdfUrl:
          "https://static.igem.wiki/teams/6147/wiki/wet-protocol/21-pma-dopamine-adhesive-preparation-en.pdf",
      },
      {
        number: "22",
        title: "L929 CCK-8 Assay with Material Extracts",
        summary:
          "L929 cell seeding, exposure to prepared material extracts for 24, 48 and 72 h, CCK-8 absorbance measurement and background-corrected relative cell-viability calculation.",
        pdfUrl:
          "https://static.igem.wiki/teams/6147/wiki/wet-protocol/22-l929-cck8-cytotoxicity-material-extracts-en.pdf",
      },
    ],
  },
];

const protocolCount = protocolGroups.reduce(
  (total, group) => total + group.protocols.length,
  0,
);

const protocolOverview = (
  <>
    Our wet-lab protocols cover strain preparation, molecular cloning, A08
    transformation, corn-stover hydrolysate processing, fermentation analysis
    and PMA–dopamine adhesive preparation. The {protocolCount} protocols are
    grouped below by experimental workflow. Select a protocol title to open its
    PDF.
  </>
);

const protocolSections: ArticleSection[] = [
  {
    id: "protocol-library",
    title: "Protocol library",
    content: (
      <>
        <div className={styles.libraryIntro}>
          <p>{protocolOverview}</p>
        </div>

        <nav className={styles.groupIndex} aria-label="Protocol workflows">
          {protocolGroups.map((group) => (
            <a
              className={styles.groupIndexLink}
              href={`#${group.id}`}
              key={group.id}
            >
              <span className={styles.indexTitle}>{group.title}</span>
              <span className={styles.indexCount}>
                {group.protocols.length} PDFs
              </span>
            </a>
          ))}
        </nav>
      </>
    ),
    subsections: protocolGroups.map((group) => ({
      id: group.id,
      title: group.title,
      content: (
        <>
          <p className={styles.groupDescription}>{group.description}</p>
          <div
            className={styles.protocolField}
            data-protocol-layout={group.layout}
          >
            {group.protocols.map(({ number, title, summary, pdfUrl }) => (
              <article
                className={styles.document}
                data-protocol-record
                data-protocol-number={number}
                key={number}
              >
                <div className={styles.documentHeading}>
                  <h4 className={styles.documentTitle}>
                    <a
                      className={styles.titleLink}
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className={styles.srOnly}>Protocol {number}: </span>
                      {title}
                    </a>
                  </h4>
                </div>

                <p className={styles.summary}>{summary}</p>

                <a
                  className={styles.documentAction}
                  href={pdfUrl}
                  aria-label={`Open protocol ${number}, ${title}, as a PDF in a new tab`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Open PDF</span>
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </>
      ),
    })),
  },
];

export function Protocols() {
  return (
    <ArticlePage
      title="Protocols"
      heroImage={{
        src: "https://static.igem.wiki/teams/6147/wiki/wet-header/header-protocols.avif",
        alt: "Illustration of a laboratory checklist, pipetting, and petri dishes.",
        intrinsicWidth: 4000,
        intrinsicHeight: 1334,
        backgroundColor: "#e7f2f4",
        objectFit: "contain",
      }}
      sections={protocolSections}
      stickyMobileOutline
      theme="hardware"
    />
  );
}

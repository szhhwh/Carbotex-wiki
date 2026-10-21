import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import {
  ArticleFramework,
  ArticlePage,
  type ArticleSection,
} from "../components/article/ArticlePage";
import { MathBlock, MathInline } from "../components/article/Math";
import { Cite } from "../components/article/References";
import { Caption } from "../components/media/Caption";
import { Figure } from "../components/media/Figure";
import tableStyles from "../components/article/article-table.module.css";
import sharedStyles from "./model-shared.module.css";

// Keep the source bibliography order, including entries only cited in frameworks.
const referenceOrder = [
  "qi2021pmla",
  "wang2020pmla",
  "qi2022highmwpolymalate",
  "gabriel2024tiberius",
  "annevo2026",
  "stiehler2020helixer",
  "holst2025helixer",
  "huang2023compleasm",
  "manni2021busco",
  "han2026alphagem",
  "zhang2024yeast9",
  "rives2021esm1b",
  "liu2024plmsearch",
  "cantalapiedra2021eggnog",
  "yu2023clean",
  "kim2023deepectransformer",
  "bansal2022rhea",
  "almagro2019targetp2",
  "odum2024deeploc21",
  "camacho2009blast",
  "ebrahim2013cobrapy",
  "huangfu2018highs",
  "Lieven2020MEMOTE",
  "Kim2010Spombe",
  "buchfink2021diamond",
  "Tian2003Enzyme",
  "orth2010fba",
  "lewis2010pfba",
  "choi2010fseof",
  "feng2018pycmodel",
];

const sections: ArticleSection[] = [
  {
    id: "gem-sec-1",
    title: "Overview & Technical Route",
    content: (
      <>
        <p>
          Poly(β-L-malic acid) (PMA, also abbreviated PMLA in metabolic literature
          and reaction IDs) is a biodegradable biopolyester polymerized from
          L-malate monomers. Our team uses the industrial black yeast{" "}
          <em>Aureobasidium melanogenum</em> strain A08 as a fermentation
          chassis to produce PMA and functionalizes it with dopamine to prepare
          an underwater biomedical bioadhesive.
        </p>
        <p>
          However, A08 is a non-model industrial fungus that entered our project
          with only a raw genome assembly—lacking a curated reference
          annotation, strain-specific transcriptomic data, or a pre-existing
          genome-scale metabolic model (GEM). To resolve intracellular carbon
          bottlenecks governing PMA biosynthesis at the genome scale and
          systematically prioritize metabolic engineering targets to guide
          wet-lab strain construction, we organized our metabolic modeling work
          into two connected parts (Figure 1):
        </p>
        <ul>
          <li>
            <strong>
              Part I · A08 Genome-Scale Metabolic Model Reconstruction &amp;
              Quality Benchmarking
            </strong>
            : Starting from the A08 genome DNA sequence, we benchmarked
            deep-learning <em>ab initio</em> gene predictors across 13 reference
            fungi to predict the whole-genome A08 proteome, combined
            protein-language-model homology mapping, four-tool enzyme consensus
            annotation, subcellular localization calibration, and minimum-set
            gap-filling to reconstruct the A08 GEM, and evaluated pipeline
            reliability via MEMOTE standardized quality testing and fission
            yeast (<em>Schizosaccharomyces pombe</em>) single-gene knockout
            phenotype benchmarking.
          </li>
          <li>
            <strong>
              Part II · Dual-Dimensional Target Prioritization for PMA
              Overproduction
            </strong>
            : Addressing paralog compensation arising from full retention of
            multi-copy homologous genes during network reconstruction, we
            combined sequence-homolog family clustering and single-gene growth
            essentiality filtering with Flux Scanning based on Enforced
            Objective Flux (FSEOF) and homologous-group joint knockout
            simulations across 1,102 non-essential in-scope candidate enzyme
            groups to identify the primary non-compensable metabolic bottleneck
            for wet-lab overexpression.
          </li>
        </ul>
        <Figure
          src="https://static.igem.wiki/teams/6147/wiki/model/01-carbotex-workflow-overview.svg"
          alt="Figure 1: End-to-end technical route from the A08 genome assembly to genome-scale metabolic model reconstruction and dual-dimensional PMA target prioritization"
          ratio="2402 / 1106"
          captionPrefix="Figure 1:"
          caption={
            <>
              {" "}
              End-to-end technical route from the A08 genome assembly to
              genome-scale metabolic model reconstruction and dual-dimensional
              PMA target prioritization
            </>
          }
        />
      </>
    ),
  },
  {
    id: "gem-sec-2",
    title: "Part I: A08 Genome-Scale Metabolic Model Reconstruction",
    content: <></>,
    subsections: [
      {
        id: "gem-sec-3",
        title: "1.1 Benchmarking & Selecting the Ab Initio Gene Predictor",
        content: (
          <>
            <p>
              <em>A. melanogenum</em> A08 belongs to the class Dothideomycetes
              (phylum Ascomycota). Without strain-specific RNA-seq data, the
              first modeling step is predicting protein-coding genes directly
              from genomic DNA. To select the most suitable transcriptome-free
              deep-learning predictor among Tiberius{" "}
              <Cite k="gabriel2024tiberius" />, ANNEVO <Cite k="annevo2026" />,
              and Helixer <Cite k="stiehler2020helixer" />
              <Cite k="holst2025helixer" />, we benchmarked five hierarchical
              accuracy metrics and per-genome runtime across 13 NCBI RefSeq
              reference fungal species spanning 7 fungal classes, including the
              Dothideomycetes relative <em>Baudoinia panamericana</em>:
            </p>
            <ul>
              <li>
                <strong>L1 Locus F1</strong>: Fraction of coding gene loci
                detected at the correct chromosomal strand and overlapping
                coordinates;
              </li>
              <li>
                <strong>L2 Exon Boundary F1</strong>: Fraction of individual
                coding exons with exact 5' and 3' boundary coordinate matches;
              </li>
              <li>
                <strong>L3 Near-Exact Protein F1</strong>: Fraction of predicted
                proteins achieving <MathInline tex={String.raw`\ge 95\%`} />{" "}
                full-length normalized edit similarity to the reference protein;
              </li>
              <li>
                <strong>L4 Exact Protein F1</strong>: Fraction of predicted
                proteins with 100% identical full-length amino-acid sequences to
                the reference protein;
              </li>
              <li>
                <strong>BUSCO Completeness</strong>: Complete detection rate
                using BUSCO <Cite k="manni2021busco" /> against the 758
                conserved single-copy fungal benchmark genes in OrthoDB (
                <code>fungi_odb10</code>).
              </li>
            </ul>
            <ArticleFramework title="Architectures of the Three Deep-Learning Gene Predictors & Definitions of the Five Evaluation Metrics">
              <figure className={tableStyles.tableFigure}>
                <p className={tableStyles.tableHint}>
                  Swipe horizontally to explore the table.
                </p>
                <div
                  className={tableStyles.tableScroller}
                  role="region"
                  aria-label="Metabolic model data table"
                  tabIndex={0}
                >
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">
                          <em>Ab Initio</em> Predictor
                        </th>
                        <th scope="col">
                          Core Neural Network &amp; Sequence Decoding
                          Architecture
                        </th>
                        <th scope="col">Reference</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>ANNEVO</strong>
                        </td>
                        <td>
                          Mixture-of-Experts (MoE) genomic language model
                          combining convolutions and Transformers to capture
                          long-range sequence context, decoded into complete
                          gene structures via Viterbi decoding.
                        </td>
                        <td>
                          <Cite k="annevo2026" />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Tiberius</strong>
                        </td>
                        <td>
                          End-to-end integration of convolutional neural
                          networks (CNNs), bidirectional long short-term memory
                          networks (BiLSTMs), and a differentiable hidden Markov
                          model (HMM) layer.
                        </td>
                        <td>
                          <Cite k="gabriel2024tiberius" />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Helixer</strong>
                        </td>
                        <td>
                          Combines CNNs and BiLSTMs for base-wise gene-structure
                          class prediction, followed by an independent HMM
                          post-processor (HelixerPost) to assemble primary gene
                          models.
                        </td>
                        <td>
                          <Cite k="stiehler2020helixer" />
                          <Cite k="holst2025helixer" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </figure>

              <figure className={tableStyles.tableFigure}>
                <p className={tableStyles.tableHint}>
                  Swipe horizontally to explore the table.
                </p>
                <div
                  className={tableStyles.tableScroller}
                  role="region"
                  aria-label="Metabolic model data table"
                  tabIndex={0}
                >
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">Evaluation Metric</th>
                        <th scope="col">
                          Statistical Criterion &amp; Calculation Method
                        </th>
                        <th scope="col">13-Species Reference Denominator</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>L1 Gene Locus</strong>
                        </td>
                        <td>
                          Same-strand positive coding overlap matched 1-to-1
                          greedily by overlap length; per-species{" "}
                          <MathInline tex={String.raw`\text{F1} = 2PR/(P+R)`} />
                        </td>
                        <td>128,503 reference coding genes</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>L2 Exon Boundary</strong>
                        </td>
                        <td>
                          Evaluated via <code>gffcompare</code> as the fraction
                          of single coding exons with exact start and end
                          coordinates
                        </td>
                        <td>13-species RefSeq coding exon set</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>L3 Near-Exact Protein</strong>
                        </td>
                        <td>
                          Longest representative isoform full-length normalized
                          edit similarity{" "}
                          <MathInline
                            tex={String.raw`1 - d_{\text{edit}}/\max(L_{\text{pred}}, L_{\text{ref}}) \ge 95\%`}
                          />
                        </td>
                        <td>128,503 reference representative proteins</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>L4 Exact Protein</strong>
                        </td>
                        <td>
                          100% identical full-length amino-acid sequence between
                          predicted and reference representative proteins
                        </td>
                        <td>
                          128,503 reference proteins (length-stratified
                          micro-average recall denominator: 120,570 complete-ORF
                          proteins)
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>BUSCO Completeness</strong>
                        </td>
                        <td>
                          Evaluated with BUSCO v5.8.0{" "}
                          <Cite k="manni2021busco" /> against the OrthoDB v10
                          fungal conserved single-copy benchmark set{" "}
                          <code>fungi_odb10</code>
                        </td>
                        <td>758 core benchmark genes per species</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </figure>
            </ArticleFramework>

            <p>
              As shown in Table 1 and Figure 2, Tiberius and ANNEVO tied in the
              top accuracy tier across all five metrics—differing by less than
              0.5 percentage points in 13-species arithmetic
              macro-averages—while consistently outperforming Helixer. Across
              the four structural tiers, macro-average F1 rose from{" "}
              <MathInline tex={String.raw`\sim 57\%`} /> at L4 to{" "}
              <MathInline tex={String.raw`\sim 66\%`} /> at L3,{" "}
              <MathInline tex={String.raw`\sim 74\%`} /> at L2, and{" "}
              <MathInline tex={String.raw`\sim 90\%`} /> at L1, indicating that
              many predicted proteins that miss 100% full-length identity are
              nonetheless accurately localized and recovered at{" "}
              <MathInline tex={String.raw`\ge 95\%`} /> full-length sequence
              similarity.
            </p>
            <figure className={tableStyles.tableFigure}>
              <p className={`${tableStyles.tableHint} ${sharedStyles.wideTableHint}`}>
                ↔ Scroll horizontally to view all columns.
              </p>
              <div
                className={`${tableStyles.tableScroller} ${sharedStyles.wideTable}`}
                role="region"
                aria-label="Table 1: Accuracy and per-genome runtime comparison of three ab initio gene predictors across 13 reference fungi"
                tabIndex={0}
              >
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Reference Species</th>
                      <th scope="col">Fungal Class</th>
                      <th scope="col" className={sharedStyles.numCol}>
                        L1 Locus F1<br />ANN / TIB / HEL
                      </th>
                      <th scope="col" className={sharedStyles.numCol}>
                        L2 Exon F1<br />ANN / TIB / HEL
                      </th>
                      <th scope="col" className={sharedStyles.numCol}>
                        L3 Near-95% F1<br />ANN / TIB / HEL
                      </th>
                      <th scope="col" className={sharedStyles.numCol}>
                        L4 Exact F1<br />ANN / TIB / HEL
                      </th>
                      <th scope="col" className={sharedStyles.numCol}>
                        BUSCO %<br />ANN / TIB / HEL
                      </th>
                      <th scope="col" className={sharedStyles.numCol}>
                        Runtime (s)<br />ANN / TIB / HEL
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <em>L. lanzarotensis</em>
                      </td>
                      <td>Saccharomycetes</td>
                      <td>
                        97.7 / <strong>98.0</strong> / 96.1
                      </td>
                      <td>
                        89.4 / <strong>89.8</strong> / 79.3
                      </td>
                      <td>
                        93.8 / <strong>94.1</strong> / 88.5
                      </td>
                      <td>
                        89.9 / <strong>90.3</strong> / 83.0
                      </td>
                      <td>
                        <strong>98.5</strong> / <strong>98.5</strong> / 97.5
                      </td>
                      <td>
                        <strong>60</strong> / 481 / 317
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <em>S. eubayanus</em>
                      </td>
                      <td>Saccharomycetes</td>
                      <td>
                        <strong>96.8</strong> / <strong>96.8</strong> / 95.2
                      </td>
                      <td>
                        <strong>83.2</strong> / 83.1 / 77.5
                      </td>
                      <td>
                        <strong>92.6</strong> / 92.4 / 89.7
                      </td>
                      <td>
                        84.5 / <strong>84.9</strong> / 82.1
                      </td>
                      <td>
                        <strong>96.6</strong> / <strong>96.6</strong> / 96.4
                      </td>
                      <td>
                        <strong>64</strong> / 498 / 372
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <em>T. asperellum</em>
                      </td>
                      <td>Sordariomycetes</td>
                      <td>
                        <strong>92.6</strong> / 92.5 / 90.6
                      </td>
                      <td>
                        <strong>85.3</strong> / 85.0 / 79.6
                      </td>
                      <td>
                        <strong>81.2</strong> / 80.8 / 75.3
                      </td>
                      <td>
                        <strong>76.0</strong> / 75.9 / 68.9
                      </td>
                      <td>
                        99.7 / <strong>99.9</strong> / <strong>99.9</strong>
                      </td>
                      <td>
                        <strong>138</strong> / 1360 / 1095
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <em>A. ingoldii</em>
                      </td>
                      <td>Exobasidiomycetes</td>
                      <td>
                        94.8 / <strong>95.0</strong> / 94.0
                      </td>
                      <td>
                        <strong>81.5</strong> / 81.0 / 76.2
                      </td>
                      <td>
                        <strong>74.7</strong> / 74.2 / 69.5
                      </td>
                      <td>
                        <strong>66.9</strong> / 65.6 / 58.6
                      </td>
                      <td>
                        <strong>95.3</strong> / <strong>95.3</strong> / 94.9
                      </td>
                      <td>
                        <strong>106</strong> / 794 / 593
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <em>D. childiae</em>
                      </td>
                      <td>Sordariomycetes</td>
                      <td>
                        90.6 / <strong>90.9</strong> / 87.0
                      </td>
                      <td>
                        77.3 / <strong>78.1</strong> / 68.4
                      </td>
                      <td>
                        72.5 / <strong>73.1</strong> / 66.1
                      </td>
                      <td>
                        65.9 / <strong>66.9</strong> / 54.7
                      </td>
                      <td>
                        98.3 / <strong>98.4</strong> / 98.2
                      </td>
                      <td>
                        <strong>159</strong> / 1544 / 1126
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <em>R. graminis</em>
                      </td>
                      <td>Microbotryomycetes</td>
                      <td>
                        93.7 / <strong>94.0</strong> / 87.7
                      </td>
                      <td>
                        <strong>82.2</strong> / <strong>82.2</strong> / 74.3
                      </td>
                      <td>
                        <strong>66.3</strong> / 65.9 / 50.9
                      </td>
                      <td>
                        <strong>57.4</strong> / 57.3 / 41.6
                      </td>
                      <td>
                        95.4 / <strong>95.8</strong> / 95.0
                      </td>
                      <td>
                        <strong>101</strong> / 774 / 678
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <em>B. panamericana</em>
                      </td>
                      <td>
                        <strong>Dothideomycetes · Same Class as A08</strong>
                      </td>
                      <td>
                        88.2 / <strong>88.3</strong> / 88.0
                      </td>
                      <td>
                        <strong>67.2</strong> / 67.0 / 57.7
                      </td>
                      <td>
                        61.3 / <strong>61.5</strong> / 56.1
                      </td>
                      <td>
                        53.0 / <strong>53.3</strong> / 43.6
                      </td>
                      <td>
                        99.2 / <strong>99.3</strong> / 99.2
                      </td>
                      <td>
                        <strong>97</strong> / 871 / 671
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <em>A. niger</em>
                      </td>
                      <td>Eurotiomycetes</td>
                      <td>
                        85.1 / <strong>85.5</strong> / 85.2
                      </td>
                      <td>
                        59.5 / <strong>60.0</strong> / 53.0
                      </td>
                      <td>
                        58.0 / <strong>58.1</strong> / 54.5
                      </td>
                      <td>
                        44.8 / <strong>45.4</strong> / 37.1
                      </td>
                      <td>
                        96.2 / <strong>96.4</strong> / 96.2
                      </td>
                      <td>
                        <strong>170</strong> / 1248 / 967
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <em>A. terreus</em>
                      </td>
                      <td>Eurotiomycetes</td>
                      <td>
                        92.3 / <strong>92.9</strong> / 91.4
                      </td>
                      <td>
                        66.9 / <strong>67.8</strong> / 55.9
                      </td>
                      <td>
                        58.7 / <strong>59.7</strong> / 54.8
                      </td>
                      <td>
                        46.0 / <strong>47.1</strong> / 34.2
                      </td>
                      <td>
                        <strong>99.5</strong> / 99.3 / 99.1
                      </td>
                      <td>
                        <strong>131</strong> / 1162 / 832
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <em>C. parasitica</em>
                      </td>
                      <td>Sordariomycetes</td>
                      <td>
                        <strong>90.3</strong> / 90.0 / 86.9
                      </td>
                      <td>
                        <strong>60.6</strong> / 60.2 / 54.6
                      </td>
                      <td>
                        <strong>53.3</strong> / 52.8 / 46.8
                      </td>
                      <td>
                        <strong>41.8</strong> / 41.6 / 35.1
                      </td>
                      <td>
                        <strong>99.7</strong> / <strong>99.7</strong> / 99.6
                      </td>
                      <td>
                        <strong>177</strong> / 1532 / 1204
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <em>R. emersonii</em>
                      </td>
                      <td>Eurotiomycetes</td>
                      <td>
                        86.1 / <strong>86.6</strong> / 77.4
                      </td>
                      <td>
                        60.3 / <strong>61.9</strong> / 48.7
                      </td>
                      <td>
                        50.8 / <strong>52.7</strong> / 42.7
                      </td>
                      <td>
                        39.1 / <strong>41.2</strong> / 29.2
                      </td>
                      <td>
                        96.2 / <strong>96.3</strong> / 88.0
                      </td>
                      <td>
                        <strong>123</strong> / 1938 / 779
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <em>P. carnosa</em>
                      </td>
                      <td>Agaricomycetes</td>
                      <td>
                        80.7 / <strong>82.4</strong> / 77.9
                      </td>
                      <td>
                        70.3 / <strong>71.3</strong> / 56.7
                      </td>
                      <td>
                        45.7 / <strong>47.5</strong> / 37.1
                      </td>
                      <td>
                        35.6 / <strong>37.3</strong> / 18.8
                      </td>
                      <td>
                        <strong>97.6</strong> / 97.0 / 97.0
                      </td>
                      <td>
                        <strong>222</strong> / 2758 / 1575
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <em>S. lacrymans</em>
                      </td>
                      <td>Agaricomycetes</td>
                      <td>
                        <strong>76.8</strong> / 74.9 / 72.0
                      </td>
                      <td>
                        70.5 / <strong>70.7</strong> / 56.9
                      </td>
                      <td>
                        <strong>44.3</strong> / 43.9 / 33.3
                      </td>
                      <td>
                        <strong>35.4</strong> / <strong>35.4</strong> / 18.9
                      </td>
                      <td>
                        <strong>98.5</strong> / 97.6 / 98.2
                      </td>
                      <td>
                        <strong>183</strong> / 1551 / 1443
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>13-Species Macro-Average</strong>
                      </td>
                      <td>
                        <strong>Spanning 7 Fungal Classes</strong>
                      </td>
                      <td>
                        89.67 / <strong>89.82</strong> / 86.88
                      </td>
                      <td>
                        73.41 / <strong>73.70</strong> / 64.52
                      </td>
                      <td>
                        65.63 / <strong>65.89</strong> / 58.87
                      </td>
                      <td>
                        56.64 / <strong>57.10</strong> / 46.60
                      </td>
                      <td>
                        <strong>97.75</strong> / 97.70 / 96.86
                      </td>
                      <td>
                        <strong>133</strong> / 1270 / 896
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Caption prefix="Table 1:">
                {" "}
                Accuracy and per-genome runtime comparison of three{" "}
                <em>ab initio</em> gene predictors across 13 reference fungi
              </Caption>
            </figure>

            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/model/02b-1-13species-strict-vs-near95.svg"
              alt="Figure 2: Species-by-species F1 comparison across 13 reference fungi at four evaluation tiers"
              ratio="880.544086 / 569.835594"
              captionPrefix="Figure 2:"
              caption={
                <>
                  {" "}
                  Species-by-species F1 comparison across 13 reference fungi at
                  L1 locus, L2 exon, L3 near-exact protein, and L4 exact protein
                  tiers
                </>
              }
            />

            <p>
              While matching Tiberius in prediction accuracy, ANNEVO ran nearly
              10× faster on the same NVIDIA RTX 5090 GPU test hardware,
              averaging <strong>133 s</strong> per genome versus 1,270 s for
              Tiberius and 896 s for Helixer (Figure 3), placing ANNEVO in the
              high-accuracy, low-runtime Pareto-optimal regime. Pooling all
              128,503 reference proteins across the 13 species into
              length-stratified bins further revealed that overall recall is
              pulled down primarily by short proteins (
              <MathInline tex={String.raw`<200\text{ aa}`} />
              ); across the <MathInline
                tex={String.raw`200\text{–}400`}
              />, <MathInline tex={String.raw`400\text{–}800`} />, and{" "}
              <MathInline tex={String.raw`\ge 800\text{ aa}`} /> bins, ANNEVO's
              L3 near-exact recall (solid lines) rose to{" "}
              <strong>64.5%, 72.8%, and 76.4%</strong>, substantially exceeding
              L4 exact recall (dashed lines) (Figure 4). Meanwhile,{" "}
              <strong>91.3%</strong> (1,044/1,143) of metabolic enzymes in the{" "}
              <em>S. cerevisiae</em> consensus model Yeast9{" "}
              <Cite k="zhang2024yeast9" /> are{" "}
              <MathInline tex={String.raw`\ge 200\text{ aa}`} /> (median{" "}
              <MathInline tex={String.raw`445\text{ aa}`} />, shaded region in
              Figure 4), confirming ANNEVO's suitability for metabolic model
              reconstruction.
            </p>
              <Figure
                src="https://static.igem.wiki/teams/6147/wiki/model/02a-v7-gene-prediction-selection-summary.svg"
                alt="Figure 3: Per-genome runtime versus L3 near-exact protein F1 and L4 exact protein F1 across 13 reference fungi"
                ratio="808.62636 / 334.468734"
                captionPrefix="Figure 3:"
                caption={
                  <>
                    {" "}
                    Per-genome runtime versus L3 near-exact and L4 exact protein
                    F1 across 13 reference fungi
                  </>
                }
              />

              <Figure
                src="https://static.igem.wiki/teams/6147/wiki/model/02c-2-protein-length-recall.svg"
                alt="Figure 4: Length-stratified L3 near-exact protein and L4 exact protein micro-average recall across 13 reference fungi"
                ratio="578.029375 / 362.369122"
                captionPrefix="Figure 4:"
                caption={
                  <>
                    {" "}
                    Length-stratified L3 and L4 protein micro-average recall
                    curves across 13 reference fungi
                  </>
                }
              />
          </>
        ),
      },
      {
        id: "gem-sec-4",
        title: "1.2 A08 Proteome Prediction & Quality Control",
        content: (
          <>
            <p>
              Applying ANNEVO to the A08 whole-genome sequence predicted{" "}
              <strong>20,089 representative protein sequences</strong> in 227.7
              s. For a non-model fungus without a strain-specific reference
              annotation, we conducted reference-free quality control across
              multi-lineage conserved core gene completeness and protein length
              distributions (Figure 5):
            </p>
            <ul>
              <li>
                <strong>Multi-Lineage OrthoDB Completeness</strong>: Evaluated
                via compleasm <Cite k="huang2023compleasm" /> and BUSCO{" "}
                <Cite k="manni2021busco" /> against OrthoDB v10 conserved
                single-copy benchmark sets across three taxonomic levels (Figure
                5, left), the predicted A08 proteome achieved{" "}
                <strong>99.61%</strong> completeness in Eukaryota (255 markers),{" "}
                <strong>96.70%</strong> in Fungi (758 markers), and{" "}
                <strong>99.82%</strong> in Dothideomycetes (3,786 markers), with
                zero missing core eukaryotic or fungal benchmark genes.
              </li>
              <li>
                <strong>
                  ORF Integrity &amp; In-Model Protein Length Distribution
                </strong>
                : All 20,089 predicted proteins start with methionine and
                contain no internal stop codons (Figure 5, right); the whole
                proteome has a median length of{" "}
                <MathInline tex={String.raw`404\text{ aa}`} /> (
                <MathInline tex={String.raw`12.5\%`} />{" "}
                <MathInline tex={String.raw`\ge 800\text{ aa}`} />
                ), while the 2,473 A08 proteins mapped into the final GEM have a
                median length of <MathInline tex={String.raw`472\text{ aa}`} />,
                with <strong>95.8%</strong> (2,368/2,473) falling in the
                high-recall <MathInline tex={String.raw`\ge 200\text{ aa}`} />{" "}
                regime.
              </li>
            </ul>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/model/02e-a08-proteome-prediction-and-qc.svg"
              alt="Figure 5: Multi-lineage OrthoDB completeness and protein length distributions of the predicted A08 proteome"
              ratio="764.241867 / 365.602188"
              captionPrefix="Figure 5:"
              caption={
                <>
                  {" "}
                  Multi-lineage OrthoDB completeness (left) and length
                  distributions of the whole proteome versus mapped in-model
                  proteins (right)
                </>
              }
            />

            <ArticleFramework title="Multi-Copy Homolog Duplication in A08 & Our Two-Stage Strategy (“Retain All in Reconstruction, Group in Screening”)">
              <p>
                Published studies report that high-PMA-producing{" "}
                <em>A. melanogenum</em> strains underwent a whole-genome
                duplication event <Cite k="qi2022highmwpolymalate" />. In our
                OrthoDB evaluation, over 91% of core benchmark markers in both
                the A08 genome assembly and the predicted proteome exhibited{" "}
                <MathInline tex={String.raw`\ge 2`} /> complete homologous hits.
                To handle widespread multi-copy paralogs rigorously, we adopted
                distinct strategies during network reconstruction versus target
                prioritization:
              </p>
              <figure className={tableStyles.tableFigure}>
                <p className={tableStyles.tableHint}>
                  Swipe horizontally to explore the table.
                </p>
                <div
                  className={tableStyles.tableScroller}
                  role="region"
                  aria-label="Metabolic model data table"
                  tabIndex={0}
                >
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">Modeling Stage</th>
                        <th scope="col">
                          Handling of Multi-Copy Homologous Sequences
                        </th>
                        <th scope="col">Core Engineering Rationale</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>Part I · Network Reconstruction</strong>
                        </td>
                        <td>
                          <strong>Retain all 20,089 predicted proteins</strong>{" "}
                          without pre-reconstruction sequence deduplication
                        </td>
                        <td>
                          ①{" "}
                          <strong>
                            Preserve subcellular localization differences
                          </strong>
                          : Paralogs with similar core sequences often differ in
                          N/C-terminal targeting signals; premature
                          deduplication risks dropping cytosolic copies such as
                          cytosolic <code>cyMDH</code> (Section 1.4).
                          <br />②{" "}
                          <strong>
                            Preserve enzyme annotation &amp; GPR links
                          </strong>
                          : Retaining all copies avoids missing candidate
                          reactions and records complete gene–protein–reaction
                          (GPR) associations.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Part II · Target Prioritization</strong>
                        </td>
                        <td>
                          <strong>
                            Cluster homologous proteins into 11,453 homologous
                            groups
                          </strong>{" "}
                          for joint group knockout evaluation
                        </td>
                        <td>
                          Under boolean <code>OR</code> GPR rules, single-gene
                          knockouts are masked by retained paralogs within the
                          same isozyme family; joint group knockouts reveal the
                          true topological contribution of each enzymatic step
                          to maximum PMA flux.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </figure>
            </ArticleFramework>
          </>
        ),
      },
      {
        id: "gem-sec-5",
        title: "1.3 Dual-Track Draft Network Reconstruction",
        content: (
          <>
            <p>
              From the predicted A08 proteome, we built the initial draft
              metabolic network using the yeast metabolic modeling pipeline
              AlphaGEM <Cite k="han2026alphagem" /> with the{" "}
              <em>S. cerevisiae</em> community consensus model Yeast9 (v9.0.1){" "}
              <Cite k="zhang2024yeast9" /> as the reference template across two
              complementary channels (Table 2):
            </p>
            <ul>
              <li>
                <strong>
                  Track 1 · Protein-Language-Model Homology Mapping
                </strong>
                : Extracts deep sequence representations via ESM-1b{" "}
                <Cite k="rives2021esm1b" />, retrieves remote homolog candidates
                via PLMSearch <Cite k="liu2024plmsearch" /> (
                <MathInline tex={String.raw`\text{identity} \ge 30\%`} />,{" "}
                <MathInline tex={String.raw`\text{coverage} \ge 60\%`} />,{" "}
                <MathInline tex={String.raw`\text{PLMSearch score} \ge 0.8`} />
                ), and enforces <MathInline tex={String.raw`\ge 80\%`} />{" "}
                subunit coverage for multi-subunit complexes, contributing{" "}
                <strong>3,066 core metabolic reactions</strong>.
              </li>
              <li>
                <strong>
                  Track 2 · Four-Tool Consensus Annotation for Unmapped Proteins
                </strong>
                : Evaluates the remaining 16,545 proteins in parallel with
                eggNOG-mapper <Cite k="cantalapiedra2021eggnog" /> (
                <MathInline tex={String.raw`w=0.3`} />
                ), CLEAN <Cite k="yu2023clean" /> (
                <MathInline tex={String.raw`w=0.2`} />
                ), DeepECtransformer <Cite k="kim2023deepectransformer" /> (
                <MathInline tex={String.raw`w=0.2`} />
                ), and PLMSearch-Rhea <Cite k="liu2024plmsearch" />
                <Cite k="bansal2022rhea" /> (
                <MathInline tex={String.raw`w=0.1`} />
                ), enforcing a weighted consensus threshold{" "}
                <MathInline tex={String.raw`\sum w_i \ge 0.4`} /> (requiring
                support from at least two independent tools) followed by
                mass/charge balance and conflict checks to add{" "}
                <strong>434 reactions</strong>, yielding a{" "}
                <strong>3,500-reaction initial draft</strong> (mapping 2,468 A08
                proteins across 2,476 draft gene entries).
              </li>
            </ul>
            <ArticleFramework title="Summary of Dual-Track Reconstruction Tools & Enzyme Annotation Methods">
              <figure className={tableStyles.tableFigure}>
                <p className={tableStyles.tableHint}>
                  Swipe horizontally to explore the table.
                </p>
                <div
                  className={tableStyles.tableScroller}
                  role="region"
                  aria-label="Metabolic model data table"
                  tabIndex={0}
                >
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">Module / Tool</th>
                        <th scope="col">
                          Methodological Principle &amp; Role in This Study
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>AlphaGEM Pipeline</strong>{" "}
                          <Cite k="han2026alphagem" />
                        </td>
                        <td>
                          Fungal metabolic reconstruction framework integrating
                          protein-language-model homology search, multi-tool
                          enzyme consensus annotation, Rhea reaction mapping,
                          and minimum-set gap-filling.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>ESM-1b + PLMSearch</strong>{" "}
                          <Cite k="rives2021esm1b" />
                          <Cite k="liu2024plmsearch" />
                        </td>
                        <td>
                          Extracts protein language model embeddings via ESM-1b
                          and predicts structural similarity via PLMSearch to
                          identify remote homologs, combined with sequence
                          identity/coverage filtering to migrate template
                          reactions.
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>eggNOG-mapper</strong>{" "}
                          <Cite k="cantalapiedra2021eggnog" />
                        </td>
                        <td>
                          Maps query proteins to KEGG metabolic reactions and EC
                          numbers via evolutionary orthologous groups (consensus
                          weight <MathInline tex={String.raw`w = 0.3`} />
                          ).
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>CLEAN</strong> <Cite k="yu2023clean" />
                        </td>
                        <td>
                          Uses contrastive learning supervised by four-digit EC
                          labels to train a function-aware embedding space for
                          EC prediction (consensus weight{" "}
                          <MathInline tex={String.raw`w = 0.2`} />
                          ).
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>DeepECtransformer</strong>{" "}
                          <Cite k="kim2023deepectransformer" />
                        </td>
                        <td>
                          Uses deep Transformer self-attention layers to detect
                          catalytic motifs and predict four-digit EC numbers
                          directly from amino-acid sequences (consensus weight{" "}
                          <MathInline tex={String.raw`w = 0.2`} />
                          ).
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>PLMSearch-Rhea</strong>{" "}
                          <Cite k="liu2024plmsearch" />
                          <Cite k="bansal2022rhea" />
                        </td>
                        <td>
                          Matches query proteins against precomputed Swiss-Prot
                          enzyme embeddings linked to the international
                          biochemical reaction database Rhea (consensus weight{" "}
                          <MathInline tex={String.raw`w = 0.1`} />
                          ).
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </figure>
            </ArticleFramework>

            <figure className={tableStyles.tableFigure}>
              <p className={`${tableStyles.tableHint} ${sharedStyles.wideTableHint}`}>
                ↔ Scroll horizontally to view all columns.
              </p>
              <div
                className={`${tableStyles.tableScroller} ${sharedStyles.wideTable}`}
                role="region"
                aria-label="Table 2: Dual-track parameters and reaction contributions for the A08 initial draft metabolic network"
                tabIndex={0}
              >
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Reconstruction Channel &amp; Module</th>
                      <th scope="col">Core Filtering Rules &amp; Parameters</th>
                      <th scope="col">Input Proteins</th>
                      <th scope="col">Matched Scale</th>
                      <th scope="col">Net Reactions &amp; Share</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Track 1: ESM + PLMSearch Homology</strong>
                      </td>
                      <td>
                        Identity <MathInline tex={String.raw`\ge 30\%`} />,
                        coverage <MathInline tex={String.raw`\ge 60\%`} />,
                        PLMSearch score <MathInline tex={String.raw`\ge 0.8`} />
                      </td>
                      <td>20,089</td>
                      <td>
                        3,544 A08 proteins mapped to 670 yeast template genes
                      </td>
                      <td>
                        <strong>3,063</strong> · 87.51%
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Track 1: Multi-Subunit Complex Filter</strong>
                      </td>
                      <td>
                        Logical <code>AND</code> complex subunit coverage{" "}
                        <MathInline tex={String.raw`\ge 80\%`} />
                      </td>
                      <td>—</td>
                      <td>
                        164 candidate complex reactions audited; 3 complete
                        complexes retained
                      </td>
                      <td>
                        <strong>+3</strong> · 0.09%
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Track 2: eggNOG-mapper</strong>
                      </td>
                      <td>
                        Ortholog group KEGG &amp; EC mapping; weight{" "}
                        <MathInline tex={String.raw`w = 0.3`} />
                      </td>
                      <td>16,545</td>
                      <td>
                        1,413 proteins hit; 1,121 records / 1,121 unique pairs
                        in consensus pool
                      </td>
                      <td>—</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Track 2: CLEAN EC Prediction</strong>
                      </td>
                      <td>
                        Contrastive-learning EC embedding; weight{" "}
                        <MathInline tex={String.raw`w = 0.2`} />
                      </td>
                      <td>16,545</td>
                      <td>
                        1,430 proteins hit; 1,423 records / 1,396 unique pairs
                        in consensus pool
                      </td>
                      <td>—</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Track 2: DeepECtransformer</strong>
                      </td>
                      <td>
                        Deep Transformer four-digit EC prediction; weight{" "}
                        <MathInline tex={String.raw`w = 0.2`} />
                      </td>
                      <td>16,545</td>
                      <td>
                        3,324 proteins hit; 1,575 records / 1,548 unique pairs
                        in consensus pool
                      </td>
                      <td>—</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Track 2: PLMSearch-Rhea</strong>
                      </td>
                      <td>
                        Swiss-Prot &amp; Rhea embedding search; weight{" "}
                        <MathInline tex={String.raw`w = 0.1`} />
                      </td>
                      <td>16,545</td>
                      <td>
                        2,500 proteins hit; 1,184 records / 1,177 unique pairs
                        in consensus pool
                      </td>
                      <td>—</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Track 2: Consensus &amp; Balance QC</strong>
                      </td>
                      <td>
                        <MathInline tex={String.raw`\sum w_i \ge 0.4`} /> (
                        <MathInline tex={String.raw`\ge 2`} /> tools) +
                        mass/charge balance check
                      </td>
                      <td>16,545</td>
                      <td>
                        Out of 507 candidates: 33 merged, 26 conflict-skipped,
                        13 imbalanced, 1 missing
                      </td>
                      <td>
                        <strong>+434</strong> · 12.40%
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Combined Initial Draft GEM</strong>
                      </td>
                      <td>
                        Track 1 homology trunk (3,066) + Track 2 consensus (434)
                      </td>
                      <td>
                        <strong>20,089</strong>
                      </td>
                      <td>
                        <strong>
                          2,468 predicted A08 proteins mapped (2,476 draft gene
                          entries)
                        </strong>
                      </td>
                      <td>
                        <strong>3,500 · 100.0%</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Caption prefix="Table 2:">
                {" "}
                Dual-track parameters and reaction contributions for the A08
                initial draft metabolic network
              </Caption>
            </figure>
          </>
        ),
      },
      {
        id: "gem-sec-6",
        title: "1.4 Proteome-Wide Subcellular Localization Calibration",
        content: (
          <>
            <p>
              Biochemical studies establish that <em>Aureobasidium</em>{" "}
              synthesizes PMA monomers in the cytosol via the{" "}
              <strong>
                cytosolic reductive oxaloacetate (rTCA) malate pathway
              </strong>{" "}
              (comprising two cytosolic steps: pyruvate carboxylation to
              oxaloacetate by <code>PYC</code> and direct reduction of
              oxaloacetate to L-malate by cytosolic malate dehydrogenase{" "}
              <code>cyMDH</code>) <Cite k="qi2021pmla" />
              <Cite k="qi2022highmwpolymalate" />. However, inspecting our
              initial draft network revealed that because homology mapping
              inherited Yeast9's default organelle assignments, A08 malate
              dehydrogenase genes were placed exclusively in the mitochondrion,
              leaving the cytosol without <code>cyMDH</code>. To systematically
              calibrate organelle assignments across the proteome, we integrated
              dual-tool subcellular localization prediction into our pipeline:
            </p>
            <ul>
              <li>
                <strong>Whole-Proteome Subcellular Localization</strong>: We
                annotated all 20,089 A08 proteins with DeepLoc 2.1{" "}
                <Cite k="odum2024deeploc21" /> and cross-checked N-terminal
                targeting peptides with TargetP 2.0{" "}
                <Cite k="almagro2019targetp2" />. Across the 20,089 proteins
                (Figure 6), cytoplasm (32.8%, 6,596 proteins) and nucleus
                (27.5%, 5,523 proteins) were the largest primary compartments,
                while mitochondrial proteins accounted for 9.1% (1,819
                proteins). As shown in Table 3, <code>mMDH</code> carries a
                high-probability N-terminal mitochondrial transit peptide (
                <MathInline tex={String.raw`\text{mTP} = 0.998`} />
                ), whereas{" "}
                <strong>
                  <code>cyMDH</code> has no mitochondrial transit peptide (
                  <MathInline tex={String.raw`\text{noTP} = 0.985`} />,{" "}
                  <MathInline tex={String.raw`\text{mTP} = 0.006`} />) and is
                  assigned primarily to the cytosol by DeepLoc 2.1 (
                  <MathInline tex={String.raw`0.806/0.221`} />)
                </strong>{" "}
                alongside cytosolic <code>PYC</code>.
              </li>
              <li>
                <strong>
                  Cross-Compartment Calibration &amp; Pathway Restoration
                </strong>
                : Calibrating 15 high-confidence central-carbon and
                dicarboxylate pathway reactions into their predicted target
                compartments (including 4 reactions reassigned directly to the
                cytosol alongside associated transport and mitochondrial steps)
                restored cytosolic <code>cyMDH</code>. Under 90% enforced PMA
                production (Figure 7; method in{" "}
                <a href="#gem-sec-11">Section 2.2</a>), the uncalibrated draft
                forced oxaloacetate formed by cytosolic <code>PYC</code> (
                <MathInline
                  tex={String.raw`1.33\text{ mmol}\cdot\text{gDW}^{-1}\cdot\text{h}^{-1}`}
                />
                ) through a multi-step amino-acid/organic-acid bypass carrying{" "}
                <MathInline
                  tex={String.raw`1.29\text{ mmol}\cdot\text{gDW}^{-1}\cdot\text{h}^{-1}`}
                />
                ; after restoring cytosolic <code>cyMDH</code>, the bypass
                dropped below{" "}
                <MathInline
                  tex={String.raw`0.01\text{ mmol}\cdot\text{gDW}^{-1}\cdot\text{h}^{-1}`}
                />
                , oxaloacetate was directly reduced to L-malate in the cytosol
                at{" "}
                <MathInline
                  tex={String.raw`1.35\text{ mmol}\cdot\text{gDW}^{-1}\cdot\text{h}^{-1}`}
                />{" "}
                (with <code>PYC</code> carrying{" "}
                <MathInline
                  tex={String.raw`1.43\text{ mmol}\cdot\text{gDW}^{-1}\cdot\text{h}^{-1}`}
                />
                ), and maximum theoretical specific PMA flux rose from{" "}
                <MathInline tex={String.raw`1.430`} /> to{" "}
                <strong>
                  <MathInline
                    tex={String.raw`1.500\text{ mmol}\cdot\text{gDW}^{-1}\cdot\text{h}^{-1}`}
                  />
                </strong>
                .
              </li>
            </ul>
            <figure className={tableStyles.tableFigure}>
              <p className={`${tableStyles.tableHint} ${sharedStyles.wideTableHint}`}>
                ↔ Scroll horizontally to view all columns.
              </p>
              <div
                className={`${tableStyles.tableScroller} ${sharedStyles.wideTable}`}
                role="region"
                aria-label="Table 3: Dual-tool subcellular localization probabilities for key PMA pathway enzyme paralogs in A08"
                tabIndex={0}
              >
                <table>
                  <thead>
                    <tr>
                      <th scope="col" className={sharedStyles.wrapCol}>Key Enzyme &amp; Gene IDs</th>
                      <th scope="col">A08 Paralogs</th>
                      <th scope="col" className={sharedStyles.wrapCol}>Catalyzed Reaction</th>
                      <th scope="col" className={sharedStyles.wrapCol}>Initial Template Compartment</th>
                      <th scope="col" className={sharedStyles.wrapCol}>TargetP 2.0: noTP / mTP</th>
                      <th scope="col" className={sharedStyles.wrapCol}>
                        DeepLoc 2.1 Multi-Label: Cytosol / Mitochondrion
                      </th>
                      <th scope="col" className={sharedStyles.wrapCol}>Calibrated Compartment &amp; Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className={sharedStyles.wrapCol}>
                        <strong>
                          Cytosolic Malate Dehydrogenase <code>cyMDH</code>
                        </strong>
                        <br />
                        <code>ANV010130</code> / <code>ANV010759</code>
                      </td>
                      <td>2 paralogs</td>
                      <td className={sharedStyles.wrapCol}>
                        Oxaloacetate <MathInline tex={String.raw`+`} /> NADH{" "}
                        <MathInline tex={String.raw`\leftrightarrow`} />{" "}
                        L-Malate <MathInline tex={String.raw`+`} />{" "}
                        <MathInline tex={String.raw`\text{NAD}^+`} />
                      </td>
                      <td className={sharedStyles.wrapCol}>
                        Mitochondrion <code>[m]</code> only
                      </td>
                      <td className={sharedStyles.wrapCol}>
                        <strong>No transit peptide: 0.985 / 0.006</strong>
                      </td>
                      <td className={sharedStyles.wrapCol}>
                        <strong>
                          Cytosol primary: 0.806 / 0.222 &amp; 0.806 / 0.220
                          (mean 0.806 / 0.221)
                        </strong>
                        <br />
                        <em>Peroxisomal score mean: 0.135</em>
                      </td>
                      <td className={sharedStyles.wrapCol}>
                        <strong>
                          Restored into cytosol <code>[c]</code>, completing
                          direct cytosolic malate reduction
                        </strong>
                      </td>
                    </tr>
                    <tr>
                      <td className={sharedStyles.wrapCol}>
                        <strong>
                          Mitochondrial Malate Dehydrogenase <code>mMDH</code>
                        </strong>
                        <br />
                        <code>ANV008085</code> / <code>ANV005681</code>
                      </td>
                      <td>2 paralogs</td>
                      <td className={sharedStyles.wrapCol}>Mitochondrial malate–oxaloacetate redox step</td>
                      <td className={sharedStyles.wrapCol}>
                        Mitochondrion <code>[m]</code>
                      </td>
                      <td className={sharedStyles.wrapCol}>
                        Mitochondrial peptide: 0.002 / <strong>0.998</strong>
                      </td>
                      <td className={sharedStyles.wrapCol}>
                        Mitochondrion primary: 0.159 / 0.951 &amp; 0.160 / 0.951
                        (mean 0.160 / <strong>0.951</strong>)
                      </td>
                      <td className={sharedStyles.wrapCol}>
                        Retained in mitochondrion <code>[m]</code> to sustain
                        TCA cycle
                      </td>
                    </tr>
                    <tr>
                      <td className={sharedStyles.wrapCol}>
                        <strong>
                          Pyruvate Carboxylase <code>PYC</code>
                        </strong>
                        <br />
                        <code>ANV006176</code> / <code>ANV019425</code>
                      </td>
                      <td>2 paralogs</td>
                      <td className={sharedStyles.wrapCol}>
                        Pyruvate <MathInline tex={String.raw`+`} />{" "}
                        <MathInline tex={String.raw`\text{HCO}_3^-`} />{" "}
                        <MathInline tex={String.raw`+`} /> ATP{" "}
                        <MathInline tex={String.raw`\to`} /> Oxaloacetate{" "}
                        <MathInline tex={String.raw`+`} /> ADP{" "}
                        <MathInline tex={String.raw`+`} /> Pi
                      </td>
                      <td className={sharedStyles.wrapCol}>
                        Cytosol <code>[c]</code>
                      </td>
                      <td className={sharedStyles.wrapCol}>
                        No transit peptide: <strong>0.9999</strong> / 0.0001
                      </td>
                      <td className={sharedStyles.wrapCol}>
                        Cytosol primary: <strong>0.635</strong> / 0.200
                        <br />
                        <em>Paralogs: 0.631/0.206 &amp; 0.640/0.194</em>
                      </td>
                      <td className={sharedStyles.wrapCol}>
                        Maintained in cytosol <code>[c]</code> as C3
                        <MathInline tex={String.raw`\to`} />
                        C4 anaplerotic entry
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Caption prefix="Table 3:">
                {" "}
                Dual-tool subcellular localization probabilities for key PMA
                pathway enzyme paralogs in A08
              </Caption>
            </figure>

              <Figure
                src="https://static.igem.wiki/teams/6147/wiki/model/03a-a08-proteome-localization-20089.svg"
                alt="Figure 6: Whole-proteome subcellular localization distribution of 20,089 A08 proteins"
                ratio="790.7625 / 345.347625"
                captionPrefix="Figure 6:"
                caption={
                  <>
                    {" "}
                    DeepLoc 2.1 subcellular compartment distribution of all
                    20,089 A08 proteins and key PMA enzymes
                  </>
                }
              />

              <Figure
                src="https://static.igem.wiki/teams/6147/wiki/model/03b-localization-15-pulled-and-pmla-pathway.svg"
                alt="Figure 7: Pathway flux before versus after localization calibration"
                ratio="711.520625 / 396.606984"
                captionPrefix="Figure 7:"
                caption={
                  <>
                    {" "}
                    Cytosolic malate pathway flux and maximum theoretical PMA
                    flux before and after localization calibration
                  </>
                }
              />
          </>
        ),
      },
      {
        id: "gem-sec-7",
        title: "1.5 Network Gap-Filling & PMA Biosynthetic Module Integration",
        content: (
          <>
            <p>
              Following subcellular localization calibration, we recovered
              unannotated genomic enzymes, filled minimal-medium growth gaps,
              and integrated the PMA polymerization module:
            </p>
            <ul>
              <li>
                <strong>
                  Genomic <code>tblastn</code> Recovery &amp; Minimum-Set
                  Gap-Filling
                </strong>
                : Using six-frame <code>tblastn</code> (NCBI BLAST+{" "}
                <Cite k="camacho2009blast" />) searches directly against the A08
                genome DNA, we recovered{" "}
                <strong>11 sequence-supported enzymatic reactions</strong>{" "}
                (bringing in 5 additional mapped A08 proteins, raising mapped
                proteins from 2,468 to 2,473), followed by minimum-set
                gap-filling on minimal medium to add{" "}
                <strong>21 connectivity reactions</strong> required to sustain{" "}
                <MathInline tex={String.raw`\ge 50\%`} /> wild-type growth (32
                backbone reactions added in total).
              </li>
              <li>
                <strong>PMA Polymerization Module</strong>: Based on the
                non-ribosomal peptide synthetase (NRPS)-like catalytic mechanism
                of <em>A. melanogenum</em> PMA synthetase{" "}
                <Cite k="wang2020pmla" />, we introduced the mass- and
                charge-balanced cytosolic polymerization step alongside an
                intracellular demand sink (<code>EX_pmla_c</code>):
                <MathBlock
                  tex={String.raw`\text{L-Malate}_{[\text{c}]} + \text{ATP}_{[\text{c}]} \longrightarrow \text{PMLA-monomer}_{[\text{c}]} + \text{AMP}_{[\text{c}]} + \text{PPi}_{[\text{c}]}`}
                />
              </li>
            </ul>
            <p>
              The finalized A08 GEM comprises{" "}
              <strong>
                3,549 reactions, 2,951 compartmentalized metabolites, and 2,481
                GPR-referenced gene entries
              </strong>{" "}
              (mapping 2,473 predicted A08 representative proteins; 2,563 total
              gene entries; 2,111 reactions with explicit boolean GPR rules)
              across 14 cellular compartments.
            </p>
          </>
        ),
      },
      {
        id: "gem-sec-8",
        title:
          "1.6 Standardized Quality Control (MEMOTE) & Phenotype Benchmarking",
        content: (
          <>
            <p>
              Before proceeding to target prioritization, we evaluated model
              quality along two complementary axes—compliance with community
              SBML standards via <strong>MEMOTE (v0.17.0)</strong>{" "}
              <Cite k="Lieven2020MEMOTE" /> and single-gene knockout phenotype
              prediction on the model fission yeast{" "}
              <strong>
                <em>Schizosaccharomyces pombe</em>
              </strong>{" "}
              <Cite k="Kim2010Spombe" /> (Figures 8 and 9):
            </p>
            <ul>
              <li>
                <strong>MEMOTE Standardized Quality Assessment</strong>: As
                shown in Figure 8, the finalized A08 GEM achieved a weighted
                MEMOTE total score of <strong>59.7%</strong>, matching the{" "}
                <strong>61.5%</strong> score of the reference <em>S. pombe</em>{" "}
                GEM reconstructed with the same pipeline. Across 3,274 internal
                reactions, A08 reached <strong>98.3% charge balance</strong> and{" "}
                <strong>93.3% mass balance</strong>, with every reaction along
                the cytosolic malate–PMA biosynthetic pathway verified to be
                strictly mass- and charge-balanced.
              </li>
              <li>
                <strong>Fission Yeast Single-Gene Knockout Benchmark</strong>:
                Evaluated against experimental deletion viability labels across{" "}
                <strong>840</strong> <em>S. pombe</em> genes{" "}
                <Cite k="Kim2010Spombe" /> (Figure 9), the pipeline achieved{" "}
                <strong>87.6% viable specificity</strong> and{" "}
                <strong>77.1% overall accuracy</strong> (
                <MathInline tex={String.raw`\text{MCC} = +0.359`} />), confirming
                that the reconstruction workflow reliably separates viable from
                lethal gene deletions prior to A08 target screening.
              </li>
            </ul>
              <Figure
                src="https://static.igem.wiki/teams/6147/wiki/model/03d-gem-memote-quality-profile.svg"
                alt="Figure 8: MEMOTE standardized quality scores and stoichiometric/GPR coverage rates for A08 and S. pombe"
                ratio="805.515156 / 376.646281"
                captionPrefix="Figure 8:"
                caption={
                  <>
                    {" "}
                    MEMOTE standardized quality scores for the A08 and{" "}
                    <em>S. pombe</em> metabolic models
                  </>
                }
              />

              <Figure
                src="https://static.igem.wiki/teams/6147/wiki/model/03c-spombe-ko-phenotype-benchmark.svg"
                alt="Figure 9: Single-gene knockout phenotype prediction metrics on the S. pombe benchmark"
                ratio="770.972344 / 366.572578"
                captionPrefix="Figure 9:"
                caption={
                  <>
                    {" "}
                    Single-gene knockout phenotype prediction metrics on the 854
                    all-scored and 840 explicit-label <em>S. pombe</em> gene
                    sets
                  </>
                }
              />
          </>
        ),
      },
    ],
  },
  {
    id: "gem-sec-9",
    title: "Part II: Dual-Dimensional PMA Target Prioritization",
    content: <></>,
    subsections: [
      {
        id: "gem-sec-10",
        title: "2.1 Homologous Group Clustering & Candidate Filtering",
        content: (
          <>
            <p>
              Because over 90% of core genes in A08 have multi-copy paralogs
              linked by logical <code>OR</code> rules in GPR associations,
              single-gene knockouts are masked by paralogous isozyme
              compensation <Cite k="qi2022highmwpolymalate" />; meanwhile,
              wet-lab strain engineering must exclude growth-essential genes
              whose deletion is lethal. Prior to target ranking, we executed a
              five-step candidate filtering funnel (Figure 10):
            </p>
            <ul>
              <li>
                <strong>Sequence-Homolog Enzyme Group Clustering</strong>:
                All-vs-all <code>DIAMOND blastp</code>{" "}
                <Cite k="buchfink2021diamond" /> alignment across the 20,089 A08
                proteins (<MathInline tex={String.raw`E \le 10^{-10}`} />,
                sequence identity <MathInline tex={String.raw`\ge 70\%`} />{" "}
                providing a safety margin above the{" "}
                <MathInline tex={String.raw`>60\%`} /> threshold required for{" "}
                <MathInline tex={String.raw`\ge 90\%`} /> four-digit EC
                conservation <Cite k="Tian2003Enzyme" />, and bidirectional
                coverage <MathInline tex={String.raw`\ge 80\%`} /> ensuring
                full-length domain architecture consistency{" "}
                <Cite k="buchfink2021diamond" />) grouped the proteome into{" "}
                <strong>11,453 homologous clusters</strong>, of which{" "}
                <strong>1,333 clusters</strong> mapped into the finalized GEM.
              </li>
              <li>
                <strong>
                  Single-Gene Essentiality Filtering &amp; Candidate Set Locking
                </strong>
                : Simulating single-gene knockouts on minimal medium across all
                2,563 model gene entries identified{" "}
                <strong>17 lethal essential genes</strong> (
                <MathInline tex={String.raw`\ge 50\%`} /> growth loss relative
                to wild-type{" "}
                <MathInline
                  tex={String.raw`\mu_{\max} = 0.0857\text{ h}^{-1}`}
                />
                , where all 17 dropped to{" "}
                <MathInline tex={String.raw`\mu_{\text{KO}} = 0`} /> while the
                remaining 2,546 genes retained{" "}
                <MathInline tex={String.raw`98.3\%\text{–}100\%`} /> growth)
                spanning <strong>17 clusters</strong>. Removing these 17
                essential clusters and 214 non-substrate/product transport
                clusters locked{" "}
                <strong>
                  1,102 non-essential in-scope candidate enzyme groups
                </strong>{" "}
                (1,046 catalytic enzyme groups and 56 substrate/product
                transport groups).
              </li>
            </ul>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/model/04a-candidate-screening-and-essentiality.svg"
              alt="Figure 10: Candidate homologous group filtering funnel"
              ratio="672.84 / 335.952"
              captionPrefix="Figure 10:"
              caption={
                <>
                  {" "}
                  Five-stage filtering funnel from 20,089 predicted A08 proteins
                  to 1,102 candidate homologous enzyme groups
                </>
              }
            />

            <ArticleFramework title="Three-Tier Clustering Hyperparameter Sensitivity & the 17 Single-Gene Essential Clusters">
              <figure className={tableStyles.tableFigure}>
                <p className={`${tableStyles.tableHint} ${sharedStyles.wideTableHint}`}>
                  ↔ Scroll horizontally to view all columns.
                </p>
                <div
                  className={`${tableStyles.tableScroller} ${sharedStyles.wideTable}`}
                  role="region"
                  aria-label="Metabolic model data table"
                  tabIndex={0}
                >
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">Clustering Tier</th>
                        <th scope="col">E-value Cutoff</th>
                        <th scope="col">Sequence Identity</th>
                        <th scope="col">Bidirectional Coverage</th>
                        <th scope="col">Total Proteome Clusters</th>
                        <th scope="col">
                          Representative Candidate Group (<code>C_00083</code>)
                          Clustering &amp; FSEOF Slope
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>Loose Tier</strong>
                        </td>
                        <td>
                          <MathInline tex={String.raw`E \le 10^{-10}`} />
                        </td>
                        <td>
                          <MathInline tex={String.raw`\ge 50\%`} />
                        </td>
                        <td>
                          <MathInline tex={String.raw`\ge 70\%`} />
                        </td>
                        <td>10,816 clusters</td>
                        <td>
                          Co-clustered; FSEOF slope{" "}
                          <MathInline tex={String.raw`\beta_f = 0.6867`} />{" "}
                          unchanged
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Default Tier · Adopted</strong>
                        </td>
                        <td>
                          <strong>
                            <MathInline tex={String.raw`E \le 10^{-10}`} />
                          </strong>
                        </td>
                        <td>
                          <strong>
                            <MathInline tex={String.raw`\ge 70\%`} />
                          </strong>
                        </td>
                        <td>
                          <strong>
                            <MathInline tex={String.raw`\ge 80\%`} />
                          </strong>
                        </td>
                        <td>
                          <strong>11,453 clusters</strong>
                        </td>
                        <td>
                          <strong>
                            Co-clustered as <code>FAM04209</code> (
                            <code>ANV006176</code> + <code>ANV019425</code>,
                            98.1% identity, 100% coverage)
                          </strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Strict Tier</strong>
                        </td>
                        <td>
                          <MathInline tex={String.raw`E \le 10^{-10}`} />
                        </td>
                        <td>
                          <MathInline tex={String.raw`\ge 80\%`} />
                        </td>
                        <td>
                          <MathInline tex={String.raw`\ge 90\%`} />
                        </td>
                        <td>11,963 clusters</td>
                        <td>
                          Co-clustered; FSEOF slope{" "}
                          <MathInline tex={String.raw`\beta_f = 0.6867`} />{" "}
                          unchanged
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </figure>
            </ArticleFramework>
          </>
        ),
      },
      {
        id: "gem-sec-11",
        title: "2.2 Dual-Metric Target Screening Methodology",
        content: (
          <>
            <p>
              To isolate non-compensable bottlenecks whose flux scales strongly
              with enforced PMA production and whose joint family deletion
              severely reduces maximum PMA capacity, using COBRApy{" "}
              <Cite k="ebrahim2013cobrapy" /> and the HiGHS linear programming
              solver <Cite k="huangfu2018highs" />, we combined FBA{" "}
              <Cite k="orth2010fba" />, pFBA (
              <MathInline tex={String.raw`\alpha = 0.999999`} />){" "}
              <Cite k="lewis2010pfba" />, 10-step FSEOF scanning{" "}
              <Cite k="choi2010fseof" />, and homologous-group joint knockout
              simulations <Cite k="qi2022highmwpolymalate" /> under standard
              minimal medium (D-glucose uptake bound{" "}
              <MathInline
                tex={String.raw`1.0\text{ mmol}\cdot\text{gDW}^{-1}\cdot\text{h}^{-1}`}
              />
              , NGAM{" "}
              <MathInline
                tex={String.raw`0.7\text{ mmol}\cdot\text{gDW}^{-1}\cdot\text{h}^{-1}`}
              />
              ) (Table 4):
            </p>
            <figure className={tableStyles.tableFigure}>
              <p className={tableStyles.tableHint}>
                Swipe horizontally to explore the table.
              </p>
              <div
                className={tableStyles.tableScroller}
                role="region"
                aria-label="Table 4: Four computational flux-analysis methods used for A08 network characterization and PMA target screening"
                tabIndex={0}
              >
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Analytical Method</th>
                      <th scope="col">
                        Mathematical &amp; Biophysical Principle
                      </th>
                      <th scope="col">Objective in This Study</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Flux Balance Analysis (FBA)</strong>{" "}
                        <Cite k="orth2010fba" />
                      </td>
                      <td>
                        Maximizes target steady-state specific flux under
                        mass-balance constraints{" "}
                        <MathInline
                          tex={String.raw`\mathbf{S}\cdot\mathbf{v}=\mathbf{0}`}
                        />{" "}
                        and uptake bounds.
                      </td>
                      <td>
                        Determines wild-type maximum specific growth rate{" "}
                        <MathInline
                          tex={String.raw`\mu_{\max} = 0.0857\text{ h}^{-1}`}
                        />{" "}
                        and max PMA flux{" "}
                        <MathInline
                          tex={String.raw`v_{\text{PMLA}}^{\max} = 1.500\text{ mmol}\cdot\text{gDW}^{-1}\cdot\text{h}^{-1}`}
                        />
                        .
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Parsimonious FBA (pFBA)</strong>{" "}
                        <Cite k="lewis2010pfba" />
                      </td>
                      <td>
                        Minimizes total absolute flux{" "}
                        <MathInline
                          tex={String.raw`\min \sum_j \lvert v_j \rvert`}
                        />{" "}
                        while retaining{" "}
                        <MathInline tex={String.raw`\ge 99.9999\%`} /> of
                        optimal objective value.
                      </td>
                      <td>
                        Compares pathway routing before/after localization
                        calibration and computes low-redundancy flux
                        distributions at each FSEOF step.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>
                          Enforced Objective Flux Scanning (FSEOF)
                        </strong>{" "}
                        <Cite k="choi2010fseof" />
                      </td>
                      <td>
                        Steps enforced PMA lower bound across 10 levels (9% to
                        90% of{" "}
                        <MathInline tex={String.raw`v_{\text{PMLA}}^{\max}`} />:{" "}
                        <MathInline tex={String.raw`0.135 \to 1.350`} />
                        ), maximizing biomass and solving pFBA at each step.
                      </td>
                      <td>
                        Quantifies the endpoint overexpression sensitivity slope{" "}
                        <MathInline tex={String.raw`\beta_f`} /> for strictly
                        monotonically increasing candidate enzyme groups.
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Homologous-Group Joint Knockout</strong>{" "}
                        <Cite k="qi2022highmwpolymalate" />
                      </td>
                      <td>
                        Simultaneously zeroes all member genes{" "}
                        <MathInline tex={String.raw`g \in \mathcal{G}_f`} />{" "}
                        within homologous group{" "}
                        <MathInline tex={String.raw`f`} />, closes unsupported
                        GPR reactions, and computes relative max PMA flux
                        change <MathInline tex={String.raw`\Delta Y_f`} />.
                      </td>
                      <td>
                        Overcomes boolean <code>OR</code> paralog compensation
                        to measure each homologous group's true topological
                        contribution to PMA capacity.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Caption prefix="Table 4:">
                {" "}
                Four computational flux-analysis methods used for A08 network
                characterization and PMA target screening
              </Caption>
            </figure>

            <MathBlock
              tex={String.raw`\beta_r = \frac{\left\lvert v_r^{(10)} \right\rvert - \left\lvert v_r^{(1)} \right\rvert}{v_{\text{PMLA}}^{(10)} - v_{\text{PMLA}}^{(1)}}, \qquad \beta_g = \frac{1}{\lvert \mathcal{R}_g \rvert} \sum_{r \in \mathcal{R}_g} \beta_r, \qquad \beta_f = \max_{g \in \mathcal{G}_f} \beta_g, \qquad \Delta Y_f = \frac{v_{\text{PMLA}}^{\text{KO}(f)} - v_{\text{PMLA}}^{\max}}{v_{\text{PMLA}}^{\max}} \times 100\%`}
            />
          </>
        ),
      },
      {
        id: "gem-sec-12",
        title: "2.3 Locking the Primary Anaplerotic Target PYC",
        content: (
          <>
            <p>
              Across all 1,102 candidate homologous enzyme groups,{" "}
              <strong>11 groups</strong> passed the strict 10-step monotonic
              FSEOF overexpression filter (the remaining 1,091 groups recorded
              as <code>NA</code>), and <strong>15 groups</strong> reduced
              maximum PMA flux upon joint group knockout (union = 18 responsive
              groups; intersection = 8 dual-responsive groups: <code>PYC</code>,{" "}
              <code>cyMDH</code>, <code>PGK</code>, <code>GAPDH</code>,{" "}
              <code>ENO</code>, <code>PGM</code>, <code>PYK</code>, and{" "}
              <code>TPI</code>) (Table 5 and Figure 11).
            </p>
            <figure className={tableStyles.tableFigure}>
              <p className={`${tableStyles.tableHint} ${sharedStyles.wideTableHint}`}>
                ↔ Scroll horizontally to view all columns.
              </p>
              <div
                className={`${tableStyles.tableScroller} ${sharedStyles.wideTable}`}
                role="region"
                aria-label="Table 5: Side-by-side comparison of Top 11 FSEOF overexpression-responsive groups and Top 15 joint-knockout PMA reduction groups"
                tabIndex={0}
              >
                <table>
                  <thead>
                    <tr>
                      <th scope="col">FSEOF Rank</th>
                      <th scope="col">Overexpression Top 11 Group</th>
                      <th scope="col" className={sharedStyles.wrapCol}>Catalytic Function &amp; Module</th>
                      <th scope="col">
                        Slope <MathInline tex={String.raw`\beta_f`} />
                      </th>
                      <th scope="col">KO Rank</th>
                      <th scope="col">Joint-Knockout Top 15 Group</th>
                      <th scope="col" className={sharedStyles.wrapCol}>Catalytic Function &amp; Module</th>
                      <th scope="col">
                        Flux Change <MathInline tex={String.raw`\Delta Y_f`} />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>1</strong>
                      </td>
                      <td>
                        <strong>
                          <code>cyMDH</code>
                        </strong>{" "}
                        <code>FAM06110</code>
                      </td>
                      <td className={sharedStyles.wrapCol}>
                        <strong>
                          Cytosolic malate dehydrogenase · Direct OAA reduction
                        </strong>
                      </td>
                      <td>
                        <strong>1.013</strong>
                      </td>
                      <td>
                        <strong>★ 1</strong>
                      </td>
                      <td>
                        <strong>
                          <code>PYC</code>
                        </strong>{" "}
                        <code>FAM04209</code>
                      </td>
                      <td className={sharedStyles.wrapCol}>
                        <strong>
                          Pyruvate carboxylase · C3
                          <MathInline tex={String.raw`\to`} />
                          C4 anaplerotic entry
                        </strong>
                      </td>
                      <td>
                        <strong>−58.6%</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>2=</td>
                      <td>
                        <code>ADK</code> I <code>FAM04315</code>
                      </td>
                      <td className={sharedStyles.wrapCol}>Adenylate kinase · AMP energy recycling</td>
                      <td>0.697</td>
                      <td>2=</td>
                      <td>
                        <code>PFK</code> <code>FAM04976</code>
                      </td>
                      <td className={sharedStyles.wrapCol}>6-Phosphofructokinase · Upper glycolysis</td>
                      <td>−30.2%</td>
                    </tr>
                    <tr>
                      <td>2=</td>
                      <td>
                        <code>ADK</code> II <code>FAM07259</code>
                      </td>
                      <td className={sharedStyles.wrapCol}>Adenylate kinase · AMP energy recycling</td>
                      <td>0.697</td>
                      <td>2=</td>
                      <td>
                        <code>FBA</code> <code>FAM05638</code>
                      </td>
                      <td className={sharedStyles.wrapCol}>Fructose-bisphosphate aldolase · Upper glycolysis</td>
                      <td>−30.2%</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>★ 4</strong>
                      </td>
                      <td>
                        <strong>
                          <code>PYC</code>
                        </strong>{" "}
                        <code>FAM04209</code>
                      </td>
                      <td className={sharedStyles.wrapCol}>
                        <strong>
                          Pyruvate carboxylase · C3
                          <MathInline tex={String.raw`\to`} />
                          C4 anaplerotic entry
                        </strong>
                      </td>
                      <td>
                        <strong>0.687</strong>
                      </td>
                      <td>4=</td>
                      <td>
                        <code>G6PDH</code> <code>FAM04047</code>
                      </td>
                      <td className={sharedStyles.wrapCol}>Glucose-6-phosphate dehydrogenase · PPP</td>
                      <td>−23.8%</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>
                        <code>CA</code> <code>FAM06806</code>
                      </td>
                      <td className={sharedStyles.wrapCol}>
                        Carbonic anhydrase ·{" "}
                        <MathInline tex={String.raw`\text{HCO}_3^-`} /> supply
                      </td>
                      <td>0.607</td>
                      <td>4=</td>
                      <td>
                        <code>PGL</code> <code>FAM07497</code>
                      </td>
                      <td className={sharedStyles.wrapCol}>6-Phosphogluconolactonase · PPP</td>
                      <td>−23.8%</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>
                        <code>PYK</code> <code>FAM01390</code>
                      </td>
                      <td className={sharedStyles.wrapCol}>Pyruvate kinase · Lower glycolysis</td>
                      <td>0.553</td>
                      <td>4=</td>
                      <td>
                        <code>RPI</code> <code>FAM02172</code>
                      </td>
                      <td className={sharedStyles.wrapCol}>Ribose-5-phosphate isomerase · PPP</td>
                      <td>−23.8%</td>
                    </tr>
                    <tr>
                      <td>7=</td>
                      <td>
                        <code>ENO</code> <code>FAM01769</code>
                      </td>
                      <td className={sharedStyles.wrapCol}>Enolase · Lower glycolysis</td>
                      <td>0.520</td>
                      <td>4=</td>
                      <td>
                        <code>RPE</code> <code>FAM04398</code>
                      </td>
                      <td className={sharedStyles.wrapCol}>Ribulose-phosphate 3-epimerase · PPP</td>
                      <td>−23.8%</td>
                    </tr>
                    <tr>
                      <td>7=</td>
                      <td>
                        <code>PGM</code> <code>FAM06555</code>
                      </td>
                      <td className={sharedStyles.wrapCol}>Phosphoglycerate mutase · Lower glycolysis</td>
                      <td>0.520</td>
                      <td>8=</td>
                      <td>
                        <code>PGK</code> <code>FAM04922</code>
                      </td>
                      <td className={sharedStyles.wrapCol}>Phosphoglycerate kinase · Lower glycolysis</td>
                      <td>−11.5%</td>
                    </tr>
                    <tr>
                      <td>9=</td>
                      <td>
                        <code>PGK</code> <code>FAM04922</code>
                      </td>
                      <td className={sharedStyles.wrapCol}>Phosphoglycerate kinase · Lower glycolysis</td>
                      <td>0.479</td>
                      <td>8=</td>
                      <td>
                        <code>GAPDH</code> <code>FAM07215</code>
                      </td>
                      <td className={sharedStyles.wrapCol}>Glyceraldehyde-3-phosphate dehydrogenase</td>
                      <td>−11.5%</td>
                    </tr>
                    <tr>
                      <td>9=</td>
                      <td>
                        <code>GAPDH</code> <code>FAM07215</code>
                      </td>
                      <td className={sharedStyles.wrapCol}>Glyceraldehyde-3-phosphate dehydrogenase</td>
                      <td>0.479</td>
                      <td>10=</td>
                      <td>
                        <code>PGM</code> / <code>ENO</code>
                      </td>
                      <td className={sharedStyles.wrapCol}>Mutase &amp; enolase · Lower glycolysis</td>
                      <td>−4.7%</td>
                    </tr>
                    <tr>
                      <td>11</td>
                      <td>
                        <code>TPI</code> <code>FAM05642</code>
                      </td>
                      <td className={sharedStyles.wrapCol}>Triosephosphate isomerase · Triose split</td>
                      <td>0.320</td>
                      <td>
                        <strong>10=</strong>
                      </td>
                      <td>
                        <strong>
                          <code>cyMDH</code>
                        </strong>{" "}
                        <code>FAM06110</code>
                      </td>
                      <td className={sharedStyles.wrapCol}>
                        <strong>
                          Cytosolic malate dehydrogenase · Terminal step
                        </strong>
                      </td>
                      <td>
                        <strong>−4.7%</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>—</td>
                      <td>
                        <em>Remaining 1,091 groups</em>
                      </td>
                      <td className={sharedStyles.wrapCol}>
                        <em>
                          Failed 10-step strict monotonicity filter (
                          <code>NA</code>)
                        </em>
                      </td>
                      <td>
                        <code>NA</code>
                      </td>
                      <td>10= / 14 / 15</td>
                      <td>
                        <code>PYK</code> / <code>GPI</code> / <code>TPI</code>
                      </td>
                      <td className={sharedStyles.wrapCol}>
                        Pyruvate kinase (−4.7%), isomerases (−3.2%, −0.3%)
                      </td>
                      <td>−4.7% to −0.3%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Caption prefix="Table 5:">
                {" "}
                Side-by-side comparison of Top 11 FSEOF
                overexpression-responsive groups and Top 15 joint-knockout PMA
                reduction groups
              </Caption>
            </figure>

            <p>
              As shown in Table 5 and Figure 11, cytosolic pyruvate carboxylase{" "}
              <strong>
                <code>PYC</code>
              </strong>{" "}
              (<code>FAM04209</code>, pairing paralogs <code>ANV006176</code>{" "}
              and <code>ANV019425</code>) is the{" "}
              <strong>
                only candidate group among all 1,102 non-essential in-scope
                groups that occupies the upper-right dual-optimal quadrant
              </strong>
              —ranking{" "}
              <strong>
                #4 in overexpression sensitivity (
                <MathInline tex={String.raw`\beta_f = 0.687`} />)
              </strong>{" "}
              and{" "}
              <strong>
                #1 in candidate joint-knockout PMA reduction (
                <MathInline tex={String.raw`-58.6\%`} />, dropping max specific
                PMA flux from <MathInline tex={String.raw`1.500`} /> to{" "}
                <MathInline
                  tex={String.raw`0.621\text{ mmol}\cdot\text{gDW}^{-1}\cdot\text{h}^{-1}`}
                />
                )
              </strong>
              . By contrast, although <code>cyMDH</code> (<code>FAM06110</code>)
              ranks #1 in FSEOF slope (
              <MathInline tex={String.raw`\beta_f = 1.013`} />
              ), its joint deletion reduces max PMA flux by only{" "}
              <MathInline tex={String.raw`4.7\%`} /> because cross-compartment
              malate routes buffer the terminal reduction step. Controlling the
              C3-to-C4 anaplerotic entry that fixes{" "}
              <MathInline tex={String.raw`\text{HCO}_3^-`} /> onto pyruvate to
              form cytosolic oxaloacetate, <code>PYC</code> is thus confirmed at
              the whole-network level as the primary target for PMA
              overproduction <Cite k="feng2018pycmodel" />.
            </p>
            <Figure
              src="https://static.igem.wiki/teams/6147/wiki/model/04-candidate-family-funnel-and-pyc-dual-rankings.svg"
              alt="Figure 11: Two-dimensional target prioritization across 1,102 candidate groups"
              ratio="701.323437 / 438.908516"
              captionPrefix="Figure 11:"
              caption={
                <>
                  {" "}
                  Two-dimensional target prioritization across 1,102 candidate
                  homologous enzyme groups (FSEOF slope{" "}
                  <MathInline tex={String.raw`\beta_f`} /> vs. joint-knockout
                  PMA loss <MathInline tex={String.raw`-\Delta Y_f`} />)
                </>
              }
            />
          </>
        ),
      },
    ],
  },
  {
    id: "gem-sec-13",
    title: "Summary & Outlook",
    content: <></>,
    subsections: [
      {
        id: "gem-sec-14",
        title: "Summary",
        content: (
          <>
            <p>
              Starting from the unannotated genome assembly of the non-model
              industrial fungus <em>Aureobasidium melanogenum</em> strain A08,
              we benchmarked three deep-learning <em>ab initio</em> eukaryotic
              gene predictors across 13 reference fungi, selected ANNEVO{" "}
              <Cite k="annevo2026" /> (~10× faster than Tiberius) to predict
              20,089 A08 proteins (99.82% Dothideomycetes OrthoDB completeness),
              reconstructed a 14-compartment genome-scale metabolic model
              containing 3,549 reactions, 2,951 metabolites, and 2,481
              GPR-referenced gene entries via AlphaGEM{" "}
              <Cite k="han2026alphagem" /> and Yeast9{" "}
              <Cite k="zhang2024yeast9" />, calibrated 15 cross-compartment
              reactions via DeepLoc 2.1 <Cite k="odum2024deeploc21" /> and
              TargetP 2.0 <Cite k="almagro2019targetp2" /> to restore the
              cytosolic reductive oxaloacetate pathway, verified model quality
              via MEMOTE (59.7%) <Cite k="Lieven2020MEMOTE" /> and{" "}
              <em>S. pombe</em> knockout benchmarking (77.1% accuracy, 87.6%
              viable specificity) <Cite k="Kim2010Spombe" />, and isolated
              cytosolic <code>PYC</code> (<code>FAM04209</code>) as the sole
              dual-optimal target across 1,102 candidate homologous enzyme
              groups.
            </p>
          </>
        ),
      },
      {
        id: "gem-sec-15",
        title: "Further Discussion",
        content: (
          <>
            <ol>
              <li>
                <strong>
                  Integration of Proteomics &amp; Enzyme Kinetic Constraints
                </strong>
                : Stoichiometric FBA and FSEOF capture steady-state flux-demand
                co-variation without enzyme turnover numbers (
                <MathInline tex={String.raw`k_{\text{cat}}`} />) or
                intracellular protein allocation bounds; integrating
                quantitative proteomics into an enzyme-constrained model (ecGEM)
                will enable direct quantitative prediction of
                post-overexpression yield gains.
              </li>
              <li>
                <strong>
                  Transcriptional Regulatory Network Mapping for Xylose
                  Assimilation
                </strong>
                : Extending target prediction upstream to transcription factors
                (TFs) governing lignocellulosic xylose assimilation requires a
                curated species-specific TF–target gene regulatory map for{" "}
                <em>A. melanogenum</em>, which represents an important future
                multi-omics direction.
              </li>
              <li>
                <strong>Chronological Alignment with Wet-Lab Cycles</strong>:
                Following the modeling group's July 2026 participation in
                initial <code>PYC</code> target screening and the wet-lab team's
                August 2026 initiation of <code>PYC</code> overexpression vector
                construction, our September–October 2026 strain-specific A08 GEM
                reconstruction and dual-metric screening across 1,102 homologous
                groups provide rigorous genome-scale mechanistic verification
                and a reusable priority leaderboard for combinatorial metabolic
                engineering.
              </li>
            </ol>
          </>
        ),
      },
      {
        id: "gem-sec-16",
        title: "Outlook",
        content: (
          <>
            <p>
              Bridging raw genome assemblies to actionable metabolic engineering
              targets in non-model industrial eukaryotes requires chaining{" "}
              <em>ab initio</em> gene prediction, multi-tool enzyme annotation,
              subcellular localization calibration, gap-filling, and
              paralog-aware target screening. In future work, we envision
              encapsulating this end-to-end reconstruction and dual-metric
              screening pipeline into our team's modular agent workbench{" "}
              <strong>
                <Link to="/model/software">WetFlow</Link>
              </strong>
              , turning genome-scale metabolic modeling from a static, open-loop
              analysis into an automated, closed-loop wet-dry discovery
              platform.
            </p>
            <ArticleFramework title="Summary of Software Tools & Database Versions Across the Pipeline">
              <figure className={tableStyles.tableFigure}>
                <p className={tableStyles.tableHint}>
                  Swipe horizontally to explore the table.
                </p>
                <div
                  className={tableStyles.tableScroller}
                  role="region"
                  aria-label="Metabolic model data table"
                  tabIndex={0}
                >
                  <table>
                    <thead>
                      <tr>
                        <th scope="col">Modeling Stage</th>
                        <th scope="col">Software Tools &amp; Databases</th>
                        <th scope="col">Version</th>
                        <th scope="col">Core Function in Pipeline</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>
                            <em>Ab Initio</em> Gene Prediction
                          </strong>
                        </td>
                        <td>ANNEVO / Tiberius / Helixer</td>
                        <td>
                          ANNEVO v2.3.3 <Cite k="annevo2026" />; Tiberius v2.0.7{" "}
                          <Cite k="gabriel2024tiberius" />; Helixer v0.3.7{" "}
                          <Cite k="stiehler2020helixer" />
                          <Cite k="holst2025helixer" />
                        </td>
                        <td>
                          13-species fungal benchmark and whole-genome A08
                          protein prediction
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Proteome Quality Control</strong>
                        </td>
                        <td>compleasm / BUSCO / OrthoDB</td>
                        <td>
                          compleasm v0.2.9 <Cite k="huang2023compleasm" />;
                          BUSCO v5.8.0 <Cite k="manni2021busco" />; OrthoDB v10
                        </td>
                        <td>
                          Multi-lineage conserved single-copy core gene
                          completeness evaluation
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Track 1 Homology Mapping</strong>
                        </td>
                        <td>AlphaGEM / Yeast9 / ESM / PLMSearch</td>
                        <td>
                          AlphaGEM v1.0 <Cite k="han2026alphagem" />; Yeast-GEM
                          v9.0.1 / v9.1.0 <Cite k="zhang2024yeast9" />; ESM-1b{" "}
                          <Cite k="rives2021esm1b" />; PLMSearch{" "}
                          <Cite k="liu2024plmsearch" />
                        </td>
                        <td>
                          Protein-language-model remote homology search and core
                          metabolic trunk migration
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Track 2 Consensus Annotation</strong>
                        </td>
                        <td>
                          eggNOG-mapper / CLEAN / DeepECtransformer / Rhea
                        </td>
                        <td>
                          eggNOG-mapper v2.1.12{" "}
                          <Cite k="cantalapiedra2021eggnog" />; CLEAN v1.0{" "}
                          <Cite k="yu2023clean" />; DeepECtransformer v1.0{" "}
                          <Cite k="kim2023deepectransformer" />; Rhea rel. 135{" "}
                          <Cite k="bansal2022rhea" />
                        </td>
                        <td>
                          Four-tool weighted consensus EC and biochemical
                          reaction annotation
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Subcellular Localization</strong>
                        </td>
                        <td>DeepLoc / TargetP</td>
                        <td>
                          DeepLoc v2.1 <Cite k="odum2024deeploc21" />; TargetP
                          v2.0 <Cite k="almagro2019targetp2" />
                        </td>
                        <td>
                          Whole-proteome localization prediction and N-terminal
                          transit peptide verification
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Gap-Filling &amp; Flux Solving</strong>
                        </td>
                        <td>BLAST+ / DIAMOND / COBRApy / HiGHS / MEMOTE</td>
                        <td>
                          BLAST+ v2.16.0+ <Cite k="camacho2009blast" />; DIAMOND
                          v2.1.10 <Cite k="buchfink2021diamond" />; COBRApy
                          v0.29.1 <Cite k="ebrahim2013cobrapy" />; highspy
                          v1.15.1 <Cite k="huangfu2018highs" />; MEMOTE v0.17.0{" "}
                          <Cite k="Lieven2020MEMOTE" />
                        </td>
                        <td>
                          Genomic <code>tblastn</code> recovery, gap-filling,
                          homolog clustering, MEMOTE QC, and FBA/pFBA/FSEOF/KO
                          LP solving
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </figure>
            </ArticleFramework>
          </>
        ),
      },
    ],
  },
];

export function ModelGem() {
  return (
    <ArticlePage
      title="Metabolic Model"
      heroImage={{
        src: "https://static.igem.wiki/teams/6147/wiki/model-header/hero-metabolic-model.avif",
        alt: "Metabolic model",
        intrinsicWidth: 2400,
        intrinsicHeight: 1000,
      }}
      intro={
        <div className={sharedStyles.backBar}>
          <Link to="/model" className={sharedStyles.backBtn}>
            <ArrowLeft size={16} strokeWidth={2.4} aria-hidden="true" />
            <span>Back to Model Overview</span>
          </Link>
          <span className={sharedStyles.stagePill}>
            01 · UPSTREAM CHASSIS · A08 METABOLIC MODEL
          </span>
        </div>
      }
      sections={sections}
      references
      referencesAnchorId="gem-sec-17"
      referenceOrder={referenceOrder}
    />
  );
}

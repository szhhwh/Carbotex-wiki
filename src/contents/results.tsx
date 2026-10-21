import {
  ArticleFramework,
  ArticlePage,
  type ArticleSection,
} from "../components/article/ArticlePage";
import { Cite } from "../components/article/References";
import { Figure } from "../components/media/Figure";
import { FigurePair } from "../components/media/FigurePair";
import { FigureWithText } from "../components/media/FigureWithText";
import styles from "./results.module.css";

// Content supplied in processed/wetlab_result/wet_results.md.
const itsSequence = `>A08_ITS
CTAAAAAGATTTAAGGGGTGGCTTCAGCGCCCGACCTCCAACCCTTTGTTGTTAAAACTA
CCTTGTTGCTTTGGCGGGACCGCTCGGTCTCGAGCCGCTGGGGATTCGTCCCAGGCGAGC
GCCCGCCAGAGTTAAACCAAACTCTTGTTATCAAACCGGTCGTCTGAGTTAAAATTTTGA
ATAAATCAAAACTTTCAACAACGGATCTCTTGGTTCTCGCATCGATGAAGAACGCAGCGA
AATGCGATAAGTAATGTGAATTGCAGAATTCAGTGAATCATCGAATCTTTGAACGCACAT
TGCGCCCCTTGGTATTCCGAGGGGCATGCCTGTTCGAGCGTCATTACACCACTCAAGCTA
TGCTTGGTATTGGGTGCCGTCCTTAGTTGGGCGCGCCTTAAAGACCTCGGCGAGGCCTCA
CCGGCTTTAGGCGTAGTAGAATTTATTCGAACGTCTGTCAAAGGAGAGGACTTCTGCCGA
CTGAAACCTTTATTTTTCTAGGTTGACCTCGGATCAGGTAGGGATACCCGCTGAACTTAA
GCATATCAATAAAGCGGAGGA`;

const sections: ArticleSection[] = [
  {
    id: "results-strain-and-pma",
    title: "1 Identification of strain A08 and PMA production",
    content: <></>,
    subsections: [
      {
        id: "results-morphology-phylogeny",
        title: "1.1 Morphology and phylogeny of A08",
        content: (
          <>
            <Figure
              id="results-figure-1"
              src="https://static.igem.wiki/teams/6147/wiki/wet-result-20261020/fig01-a08-colony-cell-morphology.avif"
              intrinsicWidth={4000}
              intrinsicHeight={1762}
              alt="Colony morphology of strain A08 on a streak plate and a light micrograph of A08 cells"
              captionPrefix="Figure 1."
              caption="Colony and cell morphology of strain A08. a, Colonies of A08 on a streak plate; b, light micrograph of A08 cells."
              fallback={<p>Image unavailable.</p>}
            />
            <p>
              To confirm the identity of the starting strain, we first examined
              the colony and cell morphology of A08 (Figure 1). On a streak
              plate, A08 formed a continuous lawn in the initial streak and
              well-separated single colonies in later streaks; single colonies
              were circular with entire margins, smooth, moist and glossy,
              slightly raised, and creamy white to pale yellowish white (Figure
              1a). Under light microscopy, cells were ovoid to ellipsoidal
              (length-to-width ratio approximately 1.3–2.0) and occurred mostly
              singly, with budding cells still attached to their daughter cells
              in some cases; prominent vacuoles and granular inclusions were
              visible in the cytoplasm (Figure 1b). Both colony and cell
              morphology closely match the yeast-like growth characteristic of{" "}
              <em>Aureobasidium</em>; to confirm the species-level identity, we
              further performed phylogenetic analysis.
            </p>
            <div className={styles.wideFigureFrame}>
              <p id="results-figure-2-hint" className={styles.figureHint}>
                Swipe horizontally to inspect the branch labels. Select the
                figure to open the full-screen zoom viewer.
              </p>
              <div
                className={styles.figureScroller}
                role="region"
                aria-label="Figure 2. ITS-based phylogenetic tree of strain A08 and related Aureobasidium species."
                aria-describedby="results-figure-2-hint"
                tabIndex={0}
              >
                <Figure
                  id="results-figure-2"
                  src="https://static.igem.wiki/teams/6147/wiki/wet-result-20261020/fig02-a08-its-phylogenetic-tree.avif"
                  intrinsicWidth={4000}
                  intrinsicHeight={2135}
                  alt="ITS-based phylogenetic tree of strain A08 and related Aureobasidium species"
                  captionPrefix="Figure 2."
                  caption="ITS-based phylogenetic tree of A08 constructed with MEGA after sequencing. Scale bar, 0.02 substitutions per site."
                  fallback={<p>Image unavailable.</p>}
                />
              </div>
            </div>
            <p>
              The internal transcribed spacer (ITS) region of A08 was sequenced,
              yielding a 561-bp ITS sequence, and a phylogenetic tree was
              constructed with MEGA. A08 clustered in the same terminal clade as{" "}
              <em>Aureobasidium melanogenum</em> CBS 105.22, with the shortest
              branch separation in the tree, while <em>A. leucospermi</em> CBS
              130593 formed the nearest sister lineage. <em>A. bupleuri</em> and{" "}
              <em>A. mangrovei</em> joined successively outside this clade,
              whereas <em>A. planticola</em>, <em>Pseudoseptoria</em>,{" "}
              <em>Hormonema</em>, <em>Saccothecium</em> and{" "}
              <em>Pseudosydowia</em> occupied more distant branches, with{" "}
              <em>Neocelosporium eucalypti</em> as the outgroup. Together with
              its morphology, A08 was identified as <em>A. melanogenum</em>,
              providing a defined taxonomic background for subsequent PMA
              production and engineering.
            </p>
            <div className={styles.sequenceCard}>
              <ArticleFramework title="ITS sequence of A08 (561 bp, 5′→3′)">
                <pre
                  className={styles.sequence}
                  role="region"
                  tabIndex={0}
                  aria-label="ITS sequence of A08, 561 base pairs"
                >
                  <code>{itsSequence}</code>
                </pre>
              </ArticleFramework>
            </div>
          </>
        ),
      },
      {
        id: "results-sugar-conditions-and-engineering",
        title: "1.2 Sugar conditions, regulator engineering and PMA production",
        content: (
          <>
            <Figure
              id="results-figure-3"
              src="https://static.igem.wiki/teams/6147/wiki/wet-result-20261020/fig03-a08-growth-sugars.avif"
              intrinsicWidth={1540}
              intrinsicHeight={882}
              alt="Growth curves of A08 in cultures containing glucose, xylose or arabinose"
              captionPrefix="Figure 3."
              caption="Growth of A08 under different sugar conditions."
              fallback={<p>Image unavailable.</p>}
            />
            <p>
              To establish a growth baseline across sugar conditions, we
              monitored the OD<sub>600</sub> of A08 in cultures containing
              glucose, xylose, or arabinose. All three conditions showed their
              main increase at approximately 10–22 h and approached a plateau
              after about 24 h. At 48 h, OD<sub>600</sub> reached 6.38±0.41,
              6.65±0.03, and 6.90±0.03, respectively. These observations show
              growth under both pentose conditions and provide a phenotypic
              baseline for subsequent comparisons of PMA production.
            </p>
            <FigurePair className={styles.figurePair}>
              <Figure
                id="results-figure-4"
                src="https://static.igem.wiki/teams/6147/wiki/wet-result-20261020/fig04-pma-titer-xylose-concentration.avif"
                intrinsicWidth={1218}
                intrinsicHeight={1004}
                alt="PMA titer at six xylose concentrations from 80 to 180 grams per litre"
                captionPrefix="Figure 4."
                caption="PMA titer across xylose concentrations."
                fallback={<p>Image unavailable.</p>}
              />
              <Figure
                id="results-figure-5"
                src="https://static.igem.wiki/teams/6147/wiki/wet-result-20261020/fig05-pma-titer-glucose-xylose-ratio.avif"
                intrinsicWidth={825}
                intrinsicHeight={956}
                alt="PMA titer across different glucose and xylose mixture ratios"
                captionPrefix="Figure 5."
                caption="PMA titer across glucose/xylose ratios."
                fallback={<p>Image unavailable.</p>}
              />
            </FigurePair>
            <p>
              To identify a xylose concentration range for further optimization,
              we compared six concentrations from 80 to 180 g/L. Mean PMA titer
              increased from 9.70±0.52 g/L at 80 g/L xylose to 12.20±0.28 g/L at
              120 g/L, before decreasing to 10.54–11.10 g/L at 140–180 g/L.
              Thus, 120 g/L was the optimal xylose concentration within the
              tested range, 25.8% above the titer at 80 g/L, and was selected
              for subsequent optimization.
            </p>
            <p>
              To evaluate the effect of sugar ratio on PMA accumulation, we
              compared different glucose/xylose formulations. The 75%
              glucose/25% xylose and equal-ratio mixtures produced titers of
              15.39±0.96 and 14.08±0.69 g/L, respectively, both higher than the
              xylose-only group at 11.61±0.70 g/L (Dunnett-adjusted p=0.0011 and
              0.0135). The 25% glucose/75% xylose mixture produced 12.29±0.81
              g/L, with no significant difference detected relative to xylose
              alone (p=0.6168). The glucose-only group shown in the figure
              reached 19.00±2.65 g/L. Higher glucose proportions were associated
              with higher mean PMA titers, defining the production performance
              under xylose conditions that subsequent engineering sought to
              improve.
            </p>
            <p>
              To construct the regulator-engineered strains, we first defined
              the candidate XlnR and AraR coding sequences. The candidate XlnR
              sequence (g3332.t1) is 2,802 bp long with a GC content of 53.39%,
              and the candidate AraR sequence (g13480.t1) is 2,316 bp long with
              a GC content of 51.90%. Both sequences begin with ATG and end with
              an in-frame TAG codon, with no internal in-frame stop codon
              detected in the supplied reading frame; their theoretical
              translation products are 933 aa and 771 aa, respectively.
            </p>
            <Figure
              id="results-figure-6"
              src="https://static.igem.wiki/teams/6147/wiki/wet-result-20261020/fig06-pcr-verification-2.avif"
              intrinsicWidth={4000}
              intrinsicHeight={2406}
              alt="PCR verification gels for XlnR, AraR and PYC overexpression and deletion constructs"
              captionPrefix="Figure 6."
              caption="PCR verification of XlnR-, AraR- and PYC-related constructs. Each panel shows a DNA size marker and the corresponding sample lanes. Arrows indicate the principal bands and the fragment sizes labelled in the figure."
              fallback={<p>Image unavailable.</p>}
            />
            <p>
              We then verified each engineered strain by PCR (Figure 6). The
              principal band in the OE-AraR lane was at 2,513 bp; the OE-XlnR
              and OE-XlnR+AraR lanes each showed a principal band at 2,902 bp;
              the ΔAraR lane showed a principal band at 1,976 bp, and the ΔXlnR
              and ΔXlnR+AraR lanes each showed a principal band at 2,039 bp. For
              the PYC-related constructs, the OE-AtPYC, OE-YlPYC and OE-ScPYC
              lanes each showed a clear principal band, labelled 4,272 bp, 3,845
              bp and 3,638 bp, respectively. No control lane (WT or the parental
              strains OE-AraR and ΔAraR) showed a band of comparable intensity
              at these positions. These results confirm that the overexpression
              and deletion constructs were successfully introduced into A08,
              providing a reliable strain basis for the subsequent
              growth-phenotype and PMA-production analyses.
            </p>
            <Figure
              id="results-figure-7"
              src="https://static.igem.wiki/teams/6147/wiki/wet-result-20261020/fig07-deletion-growth-xylose.avif"
              intrinsicWidth={1638}
              intrinsicHeight={885}
              alt="Growth of A08, single-deletion and double-deletion strains under xylose conditions"
              captionPrefix="Figure 7."
              caption="Regulator-deletion phenotypes under xylose conditions."
              fallback={<p>Image unavailable.</p>}
            />
            <p>
              To examine the effects of XlnR and AraR on growth under xylose
              conditions, we compared A08, the two single-deletion strains, and
              the double-deletion strain. At 39 h, OD<sub>600</sub> was
              3.90±0.07, 2.93±0.09, 3.49±0.05, and 1.27±0.05, respectively. The
              double-deletion strain was 67.6% below A08. Its stronger phenotype
              relative to either single deletion suggests a greater effect of
              combined deletion on growth under xylose conditions.
            </p>
            <Figure
              id="results-figure-8"
              src="https://static.igem.wiki/teams/6147/wiki/wet-result-20261020/fig08-deletion-growth-arabinose.avif"
              intrinsicWidth={1638}
              intrinsicHeight={885}
              alt="Growth of A08, single-deletion and double-deletion strains under arabinose conditions"
              captionPrefix="Figure 8."
              caption="Regulator-deletion phenotypes under arabinose conditions."
              fallback={<p>Image unavailable.</p>}
            />
            <p>
              To examine whether deletion effects varied with the sugar
              condition, we compared the same strains under arabinose
              conditions. At 48 h, OD<sub>600</sub> reached 3.39±0.24 for A08,
              3.22±0.05 for ΔXlnR, 1.15±0.10 for ΔAraR, and 1.10±0.08 for the
              double-deletion strain. ΔAraR and the double deletion were 66.0%
              and 67.5% below A08, respectively, whereas the change in ΔXlnR was
              smaller. This phenotype suggests that AraR deletion is associated
              with a greater reduction in growth than XlnR deletion under the
              arabinose condition tested.
            </p>
            <Figure
              id="results-figure-9"
              src="https://static.igem.wiki/teams/6147/wiki/wet-result-20261020/fig09-overexpression-growth.avif"
              intrinsicWidth={1694}
              intrinsicHeight={886}
              alt="Growth profiles of A08, OE-XlnR, OE-AraR and the co-overexpression strain"
              captionPrefix="Figure 9."
              caption="Growth profiles of overexpression strains."
              fallback={<p>Image unavailable.</p>}
            />
            <p>
              To assess whether overexpression was accompanied by a clear change
              in growth, we monitored OD<sub>600</sub> in A08, OE-XlnR, OE-AraR,
              and the co-overexpression strain. All four groups showed their
              main increase at approximately 15–30 h and subsequently reached
              similar plateau ranges. At 48 h, OD<sub>600</sub> was 6.46±0.14,
              6.45±0.25, 6.30±0.17, and 6.31±0.11, respectively. Overexpression
              did not impair growth, and the four strains reached comparable
              biomass; the subsequent marked increase in PMA titer therefore
              reflects enhanced per-cell synthetic capacity rather than higher
              biomass.
            </p>
            <Figure
              id="results-figure-10"
              src="https://static.igem.wiki/teams/6147/wiki/wet-result-20261020/fig10-overexpression-pma-titer.avif"
              intrinsicWidth={1714}
              intrinsicHeight={982}
              alt="PMA titers of four strains across five glucose and xylose formulations"
              captionPrefix="Figure 10."
              caption="Overexpression increases PMA titer in xylose-containing formulations."
              fallback={<p>Image unavailable.</p>}
            />
            <p>
              To test the effect of XlnR/AraR overexpression on PMA production,
              we compared four strains across five glucose/xylose formulations.
              At xylose proportions of 25%, 50%, 75%, and 100%, the
              co-overexpression strain produced 17.75±0.15, 16.33±0.60,
              14.63±0.46, and 13.86±0.08 g/L PMA, respectively. These titers
              exceeded the corresponding A08 controls by 16.4%, 21.6%, 32.1%,
              and 38.0% (all four Šídák-adjusted p values &lt;0.0001). Under the
              glucose-only condition, titers were 19.48±0.90 g/L for
              co-overexpression and 19.08±0.68 g/L for A08, with no significant
              difference detected (p=0.9983). The strain-by-formulation
              interaction was significant (p=0.000990), supporting a
              formulation-dependent effect in which the relative gain from
              co-overexpression increased with the xylose proportion.
            </p>
            <Figure
              id="results-figure-11"
              src="https://static.igem.wiki/teams/6147/wiki/wet-result-20261020/fig11-corn-stover-composition.avif"
              intrinsicWidth={3347}
              intrinsicHeight={686}
              alt="Composition of corn stover and the glucose and xylose fractions of its hydrolysate"
              captionPrefix="Figure 11."
              caption="Composition of corn stover and its hydrolysate. a, Major components of corn stover (CS); b, glucose and xylose fractions of the CS-derived sugar (hydrolysate)."
              fallback={<p>Image unavailable.</p>}
            />
            <p>
              To characterize corn stover and its hydrolysate, we analyzed the
              major components of CS and CS-derived sugar separately. Corn
              stover (CS) contained 62.13±0.83% glucan, 24.93±1.17% xylan, and
              2.07±0.25% lignin, with other components accounting for 10.9%.
              Glucan and xylan were the predominant feedstock components,
              providing the basis for obtaining a hydrolysate containing glucose
              and xylose. In the hydrolysate sugar fraction (CS-derived sugar),
              glucose and xylose accounted for 80.33±2.08% and 19.67±2.08%,
              respectively. The resulting sugar fraction was therefore
              predominantly glucose, with xylose representing approximately one
              fifth. This composition defines the mixed-sugar character of the
              feedstock used for subsequent PMA fermentation and provides
              context for evaluating the XlnR/AraR-engineered strains in this
              hydrolysate.
            </p>
            <FigureWithText
              id="results-figure-12"
              src="https://static.igem.wiki/teams/6147/wiki/wet-result-20261020/fig12-hydrolysate-pma-titer.avif"
              intrinsicWidth={860}
              intrinsicHeight={1014}
              alt="PMA titers of A08, OE-XlnR, OE-AraR and the co-overexpression strain in corn stover hydrolysate"
              captionPrefix="Figure 12."
              caption="PMA production by engineered strains in hydrolysate."
              fallback={<p>Image unavailable.</p>}
              mediaPosition="end"
              compactMedia
              layoutClassName={styles.figureWithText}
            >
              <p>
                To test whether the engineering effect extended to the
                agricultural-residue hydrolysate examined here, we compared PMA
                titers of the four strains in corn stover hydrolysate. A08,
                OE-XlnR, OE-AraR, and the co-overexpression strain reached
                15.87±0.38, 16.96±0.61, 17.19±0.34, and 18.63±0.14 g/L,
                respectively. The engineered strains exceeded A08 by 6.8%, 8.3%,
                and 17.4%, with Dunnett-adjusted p values of 0.0272, 0.0098, and
                &lt;0.0001. Co-overexpression gave the highest titer, a 17.4%
                gain, demonstrating that the XlnR/AraR engineering strategy is
                effective in real corn stover hydrolysate and laying the
                groundwork for straw-based PMA biomanufacturing.
              </p>
            </FigureWithText>
            <Figure
              id="results-figure-13"
              src="https://static.igem.wiki/teams/6147/wiki/wet-result-20261020/fig13-relative-transcript-levels.avif"
              intrinsicWidth={1795}
              intrinsicHeight={799}
              alt="Relative transcript levels of XYR, XDH, XKI, XI and PMA genes in the co-overexpression strain"
              captionPrefix="Figure 13."
              caption="Relative transcript levels in the co-overexpression strain."
              fallback={<p>Image unavailable.</p>}
            />
            <p>
              To explore transcriptional changes associated with the PMA
              production phenotype, we compared normalized expression of five
              genes between A08 and the co-overexpression strain. With A08 set
              to 100%, XYR, XDH, XKI, XI, and PMA reached 159.33±3.51%,
              162.67±8.39%, 160.00±2.00%, 169.67±14.29%, and 175.67±9.07%,
              respectively, approximately 1.59–1.76 times the reference. All
              five genes were upregulated, indicating that XlnR/AraR
              co-overexpression coordinately activated the xylose-utilisation
              pathway (XYR, XDH, XKI, XI) and PMA synthesis-related genes,
              providing transcriptional support for the increased PMA titer.
            </p>
            <FigureWithText
              id="results-figure-14"
              src="https://static.igem.wiki/teams/6147/wiki/wet-result-20261020/fig14-pyc-source-comparison.avif"
              intrinsicWidth={1876}
              intrinsicHeight={1611}
              alt="Comparison of PMA titers obtained with pyruvate carboxylase genes from different sources"
              captionPrefix="Figure 14."
              caption="Supplementary comparison of PYC sources."
              fallback={<p>Image unavailable.</p>}
              layoutClassName={styles.figureWithText}
            >
              <p>
                As a further engineering direction, we compared the effects of
                expressing pyruvate carboxylase (PYC) from different sources.
                Expression of <em>Saccharomyces cerevisiae</em>-derived PYC (SC
                group) in the OE-XlnR+AraR background gave the highest PMA titer
                of this study, approximately 26 g/L, an increase of about 36.8%
                over the wild-type control. By enhancing the carboxylation of
                pyruvate to oxaloacetate, the direct precursor of malate, on top
                of regulator engineering, PYC expression further unlocked the
                PMA-synthesis potential of A08.
              </p>
            </FigureWithText>
          </>
        ),
      },
      {
        id: "results-hplc-quantification",
        title:
          "1.3 HPLC quantification of malic acid equivalents in acid-hydrolysed PMA",
        content: (
          <>
            <p>
              Acid-hydrolysed fermentation broth from OE-XlnR+AraR+SC(pyc1) was
              analysed by HPLC using DL-malic acid standards at 1.25, 3.75 and
              15 mg/mL. The standards showed two principal peaks, designated P1
              and P2. P1 retention times were 10.445, 9.998 and 9.999 min,
              respectively; the sample showed corresponding peaks at 10.072 and
              15.962 min. Both peaks were integrated separately, and P1 + P2
              total area was used consistently for standards and sample,
              excluding smaller responses outside the selected intervals.
            </p>
            <Figure
              id="results-figure-15"
              src="https://static.igem.wiki/teams/6147/wiki/wet-result-20261020/fig15-new.avif"
              intrinsicWidth={1280}
              intrinsicHeight={996}
              alt="HPLC chromatograms of three DL-malic acid standards and the acid-hydrolysed sample, with P1 and P2 indicated"
              captionPrefix="Figure 15."
              caption="Chromatograms of the three DL-malic acid standards and the acid-hydrolysed sample, with P1 and P2 indicated."
              fallback={<p>Image unavailable.</p>}
            />
            <p>
              The DL-malic acid standards exhibited two principal peaks,
              designated P1 and P2. P1 retention times were 10.445, 9.998 and
              9.999 min for the three standards and 10.072 min for
              OE-XlnR+AraR+SC(pyc1). The sample also showed a second principal
              peak at 15.962 min, corresponding to the second-peak region of the
              standards. Both peaks were integrated separately against their
              respective endpoint baselines, and their areas were summed for
              external calibration.
            </p>
            <div className={styles.tableCard}>
              <p id="results-table-1-caption" className={styles.tableCaption}>
                Table 1. Summed peak areas and calibration residuals. Each
                concentration represents one chromatogram; residual = observed −
                fitted area.
              </p>
              <p id="results-table-1-hint" className={styles.tableHint}>
                Swipe horizontally to inspect all values. The first column stays
                visible.
              </p>
              <div
                className={styles.tableScroller}
                role="region"
                aria-labelledby="results-table-1-caption"
                aria-describedby="results-table-1-hint"
                tabIndex={0}
              >
                <table aria-labelledby="results-table-1-caption">
                  <thead>
                    <tr>
                      <th scope="col">Standard (mg/mL)</th>
                      <th scope="col">P1 + P2 area (mAU·min)</th>
                      <th scope="col">Residual (mAU·min)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1.25</td>
                      <td>44.046</td>
                      <td>+1.288</td>
                    </tr>
                    <tr>
                      <td>3.75</td>
                      <td>129.580</td>
                      <td>−1.574</td>
                    </tr>
                    <tr>
                      <td>15</td>
                      <td>529.224</td>
                      <td>+0.286</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <FigurePair className={styles.figurePair}>
              <Figure
                id="results-figure-16"
                src="https://static.igem.wiki/teams/6147/wiki/wet-result-20261020/fig16-new.avif"
                intrinsicWidth={2548}
                intrinsicHeight={1956}
                alt="External calibration using the summed areas of P1 and P2 from DL-malic acid standards"
                captionPrefix="Figure 16."
                caption="External calibration using the summed areas of P1 and P2 from DL-malic acid standards at 1.25, 3.75 and 15 mg/mL."
                fallback={<p>Image unavailable.</p>}
              />
              <Figure
                id="results-figure-17"
                src="https://static.igem.wiki/teams/6147/wiki/wet-result-20261020/fig17-new.avif"
                intrinsicWidth={2548}
                intrinsicHeight={1956}
                alt="Residuals of the summed-area calibration"
                captionPrefix="Figure 17."
                caption="Residuals of the summed-area calibration, calculated as observed minus fitted peak area."
                fallback={<p>Image unavailable.</p>}
              />
            </FigurePair>
            <p>
              Peak boundaries were selected manually, and each peak was
              integrated against its own straight endpoint baseline using signed
              composite trapezoids in Python 3.12/NumPy 2.3, without smoothing
              or shifting <Cite k="numpytrapezoid" />. Unweighted,
              free-intercept linear regression in GraphPad Prism 11.0.1 gave A =
              35.3586C − 1.4401, with R² = 0.999969, where A is summed area and
              C is standard concentration in mg/mL <Cite k="graphpadols" />.
            </p>
            <p>
              The sample P1 and P2 areas were 372.058 and 82.781 mAU·min, giving
              a total of 454.839 mAU·min and an injected-solution concentration
              of 12.90 mg/mL, within the calibration range. Applying the
              preparation-volume correction of 1.60/0.800 = 2 gave 25.81 g/L
              malic acid equivalents on the original-supernatant basis.
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: "results-pma-da-bioadhesive",
    title: "2 Module IV results: PMA–DA bioadhesive (6.4)",
    content: <></>,
    subsections: [
      {
        id: "results-functionalisation-material-formation",
        title: "6.4.1 Functionalisation and material formation",
        content: (
          <>
            <p>
              The PMA used to prepare the adhesive had a molecular weight of 390
              kDa, a high-molecular-weight polymer above the chemically
              synthesised PMA (about 12 kDa) used by Tang et al.{" "}
              <Cite k="tang2020pmadaadhesive" />, with Mw/Mn = 1.0 and a narrow
              molecular-weight distribution. After EDC/NHS-mediated dopamine
              conjugation, dialysis, casting and freeze-drying, PMA–DA was
              obtained as a grey, fluffy, sponge-like solid (Figure 18) that
              could be isolated intact, weighed and handled, demonstrating its
              feasibility as an end-use material. Before use, PMA–DA is
              redissolved in distilled water, typically at about 0.5 g per 1 mL;
              this ratio is not fixed and can be adjusted freely to suit the
              application — using less distilled water gives a more viscous
              adhesive.
            </p>
            <Figure
              id="results-figure-18"
              src="https://static.igem.wiki/teams/6147/wiki/wet-result-20261020/fig18-pma-da-freeze-dried-material.avif"
              intrinsicWidth={1702}
              intrinsicHeight={1276}
              alt="Freeze-dried PMA–DA obtained as a grey, fluffy, sponge-like solid"
              captionPrefix="Figure 18."
              caption="Macroscopic PMA–DA material obtained after dialysis, casting, pre-freezing and lyophilisation."
              fallback={<p>Image unavailable.</p>}
            />
            <p>
              To examine the microstructure of the adhesive backbone,
              A08-derived PMA was imaged by transmission electron microscopy
              (TEM) before dopamine conjugation. At the 100 nm scale, continuous
              filamentous structures were visible: individual filaments followed
              curved paths that could be traced over several hundred nanometres
              and crossed or overlapped one another, forming a loosely
              interwoven network, with filament widths of approximately 5 nm.
              Panel b shows the same field after background flattening and
              band-pass filtering, applied only to improve filament visibility
              without altering their position or shape. This continuous
              nanoscale network is consistent with entanglement and inter-chain
              interactions of the long PMA chains, showing that the PMA backbone
              itself forms a continuous chain network; this provides direct
              morphological support for the design rationale that longer chains
              increase bulk cohesion and a structural basis for subsequent
              dopamine functionalisation.
            </p>
            <Figure
              id="results-figure-19"
              src="https://static.igem.wiki/teams/6147/wiki/wet-result-20261020/fig19-pma-tem.avif"
              intrinsicWidth={3260}
              intrinsicHeight={1700}
              alt="Transmission electron micrographs of A08-derived PMA filaments before dopamine conjugation"
              captionPrefix="Figure 19."
              caption="TEM of A08-derived PMA before dopamine conjugation. a, original image (scale bar, 100 nm); b, the same field after background flattening and band-pass filtering to highlight the continuous filamentous network."
              fallback={<p>Image unavailable.</p>}
            />
            <p>
              In an underwater test, two glass slides bonded with PMA–DA
              retained high bond strength after immersion in water at room
              temperature for 24 h, showing that the adhesive layer prevented
              water ingress into the bonded area over a prolonged period and
              that PMA–DA has good water resistance and underwater adhesion.
            </p>
          </>
        ),
      },
      {
        id: "results-mechanical-adhesive-performance",
        title: "6.4.2 Mechanical and adhesive performance",
        content: (
          <>
            <FigureWithText
              id="results-figure-20"
              src="https://static.igem.wiki/teams/6147/wiki/wet-result-20261020/fig20-lap-shear-substrates.avif"
              intrinsicWidth={3360}
              intrinsicHeight={3120}
              alt="Maximum lap-shear stress of PMA–DA on glass, stainless steel and porcine skin"
              captionPrefix="Figure 20."
              caption="Maximum lap-shear stress of PMA–DA on different substrates (first test round; each bar is a single record; for steel only the stronger record is shown). Broken y-axis."
              fallback={<p>Image unavailable.</p>}
              mediaPosition="end"
              compactMedia
              layoutClassName={styles.figureWithText}
            >
              <p>
                Lap-shear testing was performed on an electronic universal
                testing machine with reference to ASTM D1002{" "}
                <Cite k="astm2019d1002" />; maximum lap-shear stress was
                calculated as the recorded peak load divided by the bonded area
                recorded by the instrument. In the first round of tests, PMA–DA
                formed effective bonds on all three substrates: the maximum
                stress was 604.168 kPa on stainless steel and 17.928 kPa on
                porcine skin, a soft-tissue model, exceeding the 12.7 kPa
                reported for the catechol-modified PEO hydrogel cP15 on
                decellularised porcine dermis{" "}
                <Cite k="barrett2013tissueadhesives" />; the highest strength,
                12.168 MPa, was obtained on glass slides, reflecting a very
                robust bond.
              </p>
            </FigureWithText>
            <FigureWithText
              id="results-figure-21"
              src="https://static.igem.wiki/teams/6147/wiki/wet-result-20261020/fig21-stress-strain-curves.avif"
              intrinsicWidth={4000}
              intrinsicHeight={2259}
              alt="Stress–strain curves of PMA–DA on glass, steel and porcine skin"
              captionPrefix="Figure 21."
              caption="Stress–strain curves of PMA–DA on glass, steel and porcine skin from the first test round."
              fallback={<p>Image unavailable.</p>}
              compactMedia
              layoutClassName={styles.figureWithText}
            >
              <p>
                The stress–strain curves indicate different failure modes. Steel
                specimens peaked at about 0.1% strain and unloaded within 2.5%
                strain, typical of brittle interfacial debonding; glass
                specimens loaded progressively up to about 15% strain before
                gradual failure, indicating substantial deformation and energy
                dissipation; porcine skin peaked at about 18 kPa near 1% strain
                and then peeled progressively, retaining a few kPa beyond 40%
                strain.
              </p>
            </FigureWithText>
            <h4 className={styles.subheading}>Effect of concentration.</h4>
            <p>
              At a dopamine feed ratio of DA:COOH = 100% and a bonded area of
              0.5 cm², we compared five PMA–DA concentrations from 100 to 1000
              mg/mL. All three substrates showed the same trend: adhesion
              strength increased from 100 to 700 mg/mL (glass 303 → 640.57 kPa;
              steel 25 → 56 kPa; porcine skin 35.736 → 102 kPa) and decreased at
              1000 mg/mL (538, 50 and 81 kPa, respectively). This rise-then-fall
              trend is consistent with the design: higher concentration supplies
              more interfacial catechol groups and more entangling polymer
              chains, increasing both interfacial binding and bulk cohesion,
              whereas at very high concentration the increased viscosity impairs
              spreading and wetting, reducing the effective contact area{" "}
              <Cite
                k={[
                  "jenkins2013molecularweight",
                  "siebert2019molecularweight",
                  "yu2020gallol",
                ]}
              />
              . Within the tested range, 700 mg/mL was therefore the optimal
              concentration. At this concentration, adhesion to porcine skin
              reached 102 kPa, 5.7-fold the first-round value.
            </p>
            <Figure
              id="results-figure-22"
              src="https://static.igem.wiki/teams/6147/wiki/wet-result-20261020/fig22-lap-shear-concentration.avif"
              intrinsicWidth={4000}
              intrinsicHeight={1323}
              alt="Lap-shear strength of PMA–DA at five concentrations on glass, steel and porcine skin"
              captionPrefix="Figure 22."
              caption="Lap-shear strength of PMA–DA at different concentrations on glass, steel and porcine skin (DA:COOH = 100%)."
              fallback={<p>Image unavailable.</p>}
            />
            <h4 className={styles.subheading}>Effect of grafting ratio.</h4>
            <p>
              We further compared PMA–DA prepared at DA:COOH feed ratios of 25%,
              50% and 100% across concentrations. The bonded area was uniformly
              0.5 cm². On porcine skin, the 100% group was highest at every
              matched concentration (e.g., 102, 14.0 and 4.4 kPa for 100%, 25%
              and 50% at 700 mg/mL), and the 25% group (7.8–18.1 kPa) was higher
              than the 50% group (4.4–12.7 kPa) at most matched concentrations.
              On steel, the 100% group was highest at 100–500 mg/mL (45 kPa at
              500 mg/mL vs 17.6±4.2 kPa for 25% and 11.8±2.3 kPa for 50%),
              whereas at 700 and 1000 mg/mL the 50% group gave higher means
              (60.9±35.2 kPa, n=2; 103.6 kPa) than the 100% group (56 and 50
              kPa). On glass, the 100% group was highest at 100, 300 and 700
              mg/mL (640.57 kPa at 700 mg/mL vs 327.1±33.2 kPa for 25% and 61.3
              kPa for 50%), whereas at 500 mg/mL the 25% group averaged
              448.6±66.4 kPa (n=2), above both the 100% (401.7 kPa) and 50%
              (137.9±165.9 kPa, n=2) groups; at 1000 mg/mL the 50% group
              averaged 455.1±230.6 kPa (n=4), comparable to the 538 kPa of the
              100% group, with a single-test maximum of 729.4 kPa. Overall, the
              100% dopamine feed ratio gave the highest adhesion on soft tissue
              and under most glass conditions, consistent with catechol-mediated
              interfacial hydrogen bonding, coordination and oxidative
              crosslinking <Cite k="lee2011musseladhesives" />; on steel, the
              50% group reached 103.6 kPa at high concentration, suggesting that
              a moderate catechol density suffices for strong bonding to metal.
              Adhesion of PMA–DA can therefore be tailored to the target
              substrate by tuning the dopamine grafting ratio and concentration.
            </p>
            <Figure
              id="results-figure-23"
              src="https://static.igem.wiki/teams/6147/wiki/wet-result-20261020/fig23-lap-shear-grafting-ratio-2.avif"
              intrinsicWidth={4000}
              intrinsicHeight={1371}
              alt="Peak lap-shear stress of PMA–DA at three dopamine feed ratios and different concentrations"
              captionPrefix="Figure 23."
              caption="Peak lap-shear stress of PMA–DA prepared at DA:COOH feed ratios of 25%, 50% and 100% at different concentrations. Bars show means; error bars show sample SD when n ≥ 2; dots are individual tests; n.t., not tested (the 50% group was not tested at 100 mg/mL)."
              fallback={<p>Image unavailable.</p>}
            />
          </>
        ),
      },
      {
        id: "results-cytocompatibility",
        title: "6.4.3 Cytocompatibility",
        content: (
          <>
            <p>
              Free dopamine readily autoxidises to quinones and reactive oxygen
              species (ROS) that damage proteins, lipids and DNA and induce
              apoptosis; in PMA–DA, dopamine is amide-linked to the PMA backbone
              and is no longer free, which is expected to reduce this risk{" "}
              <Cite k="tang2020pmadaadhesive" />. To test this, we evaluated the
              cytocompatibility of PMA–DA prepared at DA:COOH feed ratios of
              25%–125% with L929 mouse fibroblasts. At 24, 48 and 72 h, relative
              viability of all treatment groups remained within approximately
              85%–110% without a progressive decline over time. The 25% and 50%
              groups were close to the control (approximately 99%–107%),
              viability decreased slightly with increasing feed ratio, and the
              125% group was lowest (approximately 85%–91%). All groups remained
              above the 70% viability threshold for cytotoxicity defined in ISO
              10993-5 <Cite k="iso2009cytotoxicity" />, indicating good
              cytocompatibility with no cytotoxicity under the conditions
              tested.
            </p>
            <Figure
              id="results-figure-24"
              src="https://static.igem.wiki/teams/6147/wiki/wet-result-20261020/fig24-l929-cytocompatibility.avif"
              intrinsicWidth={3321}
              intrinsicHeight={1631}
              alt="Relative viability of L929 mouse fibroblasts exposed to PMA–DA at different dopamine feed ratios for 24, 48 and 72 hours"
              captionPrefix="Figure 24."
              caption="Relative viability of L929 cells exposed to PMA–DA prepared at different DA:COOH feed ratios for 24, 48 and 72 h."
              fallback={<p>Image unavailable.</p>}
            />
          </>
        ),
      },
      {
        id: "results-learning-application-scope",
        title: "6.4.4 Learning and application scope",
        content: (
          <p>
            This module converted high-molecular-weight PMA from A08
            fermentation into a dopamine-functionalised adhesive material that
            could be processed into a solid. The PMA backbone forms a continuous
            nanoscale filamentous network under TEM, and the resulting adhesive
            produced strong bonds on glass (12.168 MPa), steel (604.168 kPa) and
            porcine skin (up to 102 kPa), retained high bond strength after 24 h
            of immersion, remained bonded for up to 3 d and kept L929 viability
            above approximately 85% without cytotoxicity. Adhesion was highest
            at 700 mg/mL on all three substrates, the 100% dopamine feed ratio
            markedly favoured soft-tissue adhesion, and adhesion could be
            tailored to different substrates through formulation. Together,
            these results establish a route from microbial fermentation and
            product analysis to functional-material validation. Because both PMA
            and dopamine are biocompatible and catechol groups promote
            interfacial adhesion in wet environments{" "}
            <Cite k={["ahn2015musseladhesives", "ji2016softtissue"]} />, PMA–DA
            is a promising candidate for underwater operations and soft-tissue
            adhesion, where formulations can be tuned to balance adhesion with
            compliance and benign removal <Cite k="chen2020bioadhesive" />.
          </p>
        ),
      },
    ],
  },
];

export function Results() {
  return (
    <ArticlePage
      title="Results — PMA production and PMA–DA bioadhesive"
      titleId="results-page-title"
      heroImage={{
        src: "https://static.igem.wiki/teams/6147/wiki/wet-header/header-results.avif",
        alt: "Illustration of chromatograms, bar charts, and gel electrophoresis results.",
        intrinsicWidth: 4000,
        intrinsicHeight: 1334,
        backgroundColor: "#e7f2f4",
        objectFit: "contain",
      }}
      sections={sections}
      references
      referencesIntro={
        <>
          Reference entries cited on this page are stored in the accompanying{" "}
          <code>references.bib</code>; the website generates the reference list
          automatically from the citation keys.
        </>
      }
      stickyMobileOutline
    />
  );
}

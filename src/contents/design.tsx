import {
  ArticlePage,
  type ArticleSection,
} from "../components/article/ArticlePage";
import tableStyles from "../components/article/article-table.module.css";
import { Cite } from "../components/article/References";
import { Caption } from "../components/media/Caption";
import { Figure, type FigureProps } from "../components/media/Figure";
import styles from "./design.module.css";

function DiagramFigure(props: FigureProps) {
  const label = [props.captionPrefix, props.caption]
    .filter((value): value is string => typeof value === "string")
    .join(" ");

  return (
    <div
      className={styles.diagramScroller}
      role="region"
      aria-label={`Diagram: ${label}`.trim()}
      tabIndex={0}
    >
      <Figure {...props} />
    </div>
  );
}

// Content supplied in processed/wetlab_design/wet_design.md.
const sections: ArticleSection[] = [
  {
    id: "design-overview",
    title: "Overview",
    content: <></>,
    subsections: [
      {
        id: "design-overview-production-of-poly-malic-acid-and-bio-based-adhesive",
        title: "Production of Poly(malic acid) and Bio-Based Adhesive",
        content: (
          <>
            <p>
              Our wet-lab work addresses a central question: how can the carbon
              in agricultural residues be converted into a microbial polymer for
              material manufacturing and subsequently given adhesive
              functionality?
            </p>
            <p>
              We organized the project into four interconnected modules, with
              poly(malic acid) (PMA) production and material application as the
              main lines:
            </p>
            <ol className={styles.moduleRoute}>
              <li>
                <strong>Saccharification Module:</strong>{" "}
                <span className={styles.moduleCopy}>
                  Releases fermentable sugars from straw
                </span>
              </li>
              <li>
                <strong>Xylose Module:</strong>{" "}
                <span className={styles.moduleCopy}>
                  Improves the chassis's use of mixed sugars in the corn-stover
                  hydrolysate supplied by the preceding module.
                </span>
              </li>
              <li>
                <strong>PYC Module:</strong>{" "}
                <span className={styles.moduleCopy}>
                  Tests genes encoding pyruvate carboxylase (PYC) to enhance
                  malate precursor supply for poly(malic acid) (PMA) production.
                </span>
              </li>
              <li>
                <strong>Adhesive Module:</strong>{" "}
                <span className={styles.moduleCopy}>
                  Converts PMA into a functional adhesive material
                </span>
              </li>
            </ol>
            <p>
              Together, these modules define a route from agricultural residues
              to adhesive materials. Saccharification supplies fermentable
              sugars, while xylose-utilization engineering and PYC engineering
              are combined in our chassis to support PMA production. The
              PMA-containing fermentation broth is then used for adhesive
              preparation.
            </p>
            <DiagramFigure
              id="design-figure-1"
              src="https://static.igem.wiki/teams/6147/wiki/wet-design/correct-this-overview-while-retaining-restrained-native-biorender-styling-and-th.avif"
              intrinsicWidth={4000}
              intrinsicHeight={1943}
              alt="Overview diagram of the wet-project path from corn stover through hydrolysate preparation and A08 fermentation, with engineered xylose and PYC modules supporting PMA production before dopamine functionalization into a PMA-based adhesive."
              captionPrefix="Figure 1."
              caption="Overall wet-project path"
              fallback={<p>Image unavailable.</p>}
            />
          </>
        ),
      },
      {
        id: "design-overview-poly-malic-acid",
        title: "Poly(malic acid)",
        content: (
          <>
            <p>
              PMA is a biodegradable polyester composed of malic acid units. Its
              water solubility and pendant carboxyl groups provide a basis for
              functionalization. PMA derivatives have been investigated for drug
              delivery, PMA–calcium-phosphate hybrids have been explored for
              bone tissue engineering, and malic-acid-based copolyesters have
              been studied as rheology modifiers in aqueous formulations{" "}
              <Cite
                k={["ding2011pmla", "hara2025pmatcp", "picken2025rheology"]}
              />
              . These studies illustrate the applications of PMA and related
              materials. Our project builds on{" "}
              <em>Aureobasidium melanogenum</em> A08's existing ability to
              produce PMA, using strain engineering to improve production and
              exploring material applications of the fermentation product.
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: "design-chassis-selection",
    title: "Chassis Selection",
    content: <></>,
    subsections: [
      {
        id: "design-chassis-selection-why-a08",
        title: "Why A08?",
        content: (
          <>
            <p>
              <em>Aureobasidium melanogenum</em> A08 (A08) was isolated from a
              mangrove ecosystem and is a marine-derived yeast-like fungus. We
              selected <em>Aureobasidium melanogenum</em> A08, supplied by our
              laboratory, as the PMA-producing chassis. A08 comes from the
              laboratory’s established strain collection, and its initial
              acquisition and screening were performed by the laboratory. The
              principal reason for choosing <em>Aureobasidium melanogenum</em>{" "}
              A08 is its ability to produce high-molecular-weight PMA, providing
              a polymer foundation for downstream functionalization. Building on
              this capability, we designed two connected engineering strategies:
              AraR and XlnR regulatory engineering to improve xylose and
              mixed-sugar utilization, and engineering of PYC-encoding genes to
              enhance malate precursor supply. A08 therefore connects upstream
              sugar utilization with PMA biosynthesis and downstream adhesive
              development.
            </p>
            <p>
              The strain's origin and PMA-producing capability are
              laboratory-provided background information. Our own
              chassis-characterization work comprises morphology observation and
              internal transcribed spacer (ITS) sequence-based identification.
              These observations support the taxonomic assignment of A08 and
              provide a traceable starting point for engineering.
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: "design-genetic-parts-and-construct-design",
    title: "Genetic Parts and Construct Design",
    content: (
      <>
        <p>
          Our genetic design connects two engineering goals: improving sugar
          utilization through transcriptional regulation and enhancing precursor
          supply through PYC engineering. The xylose module targets AraR and
          XlnR, while the PYC module further evaluates the genes from different
          donors based on this. These constructs are combined in{" "}
          <em>Aureobasidium melanogenum</em> A08 to investigate their effects on
          PMA production.
        </p>
        <p>
          We distinguish three genetic operations: target-gene expression using
          pNAT-LoxP-rDNA, transcription-factor knockout using fl4a-hpt-loxp, and
          marker recycling using separately supplied Cre enzyme.
        </p>
      </>
    ),
    subsections: [
      {
        id: "design-genetic-parts-and-construct-design-the-pnat-loxp-rdna-backbone",
        title: "The pNAT-LoxP-rDNA Backbone",
        content: (
          <>
            <p>
              We use pNAT-LoxP-rDNA as the common expression backbone for the
              xylose and PYC modules. OUC-China 2025 lists this backbone as
              BBa_25QPWVAX <Cite k="ouc2025pnat" />. The supplied sequence is
              5,455 base pairs (bp) long and contains components for bacterial
              plasmid replication, fungal selection, and ribosomal DNA
              (rDNA)-associated integration. This framework allows different
              target genes to use the same vector design.
            </p>
            <h4 className={styles.sectionLabel}>Backbone modules</h4>
            <div className={styles.constructMap}>
              <div className={styles.constructSegment}>
                <p className={styles.constructSegmentLabel}>
                  Plasmid propagation
                </p>
                <ul>
                  <li>
                    <strong>Ampicillin-resistance marker</strong>
                    <span>
                      Supports selection of recombinant plasmids in{" "}
                      <em>Escherichia coli</em>
                    </span>
                  </li>
                  <li>
                    <strong>ColE1 origin</strong>
                    <span>
                      Supports plasmid replication in <em>E. coli</em>
                    </span>
                  </li>
                </ul>
              </div>
              <div className={styles.constructSegment}>
                <p className={styles.constructSegmentLabel}>
                  Genome integration
                </p>
                <ul>
                  <li>
                    <strong>18S and 26S rDNA regions</strong>
                    <span>
                      Provide homologous sequences for the rDNA integration
                      design
                    </span>
                  </li>
                </ul>
              </div>
              <div className={styles.constructSegment}>
                <p className={styles.constructSegmentLabel}>
                  Expression cassette
                </p>
                <ul>
                  <li>
                    <strong>TEF regulatory region</strong>
                    <span>
                      The translation elongation factor (TEF) promoter was
                      selected to support high-level, constitutive expression of
                      the inserted target genes{" "}
                      <Cite k={["vanden1997tefgfp", "zhao2026amxlnr"]} />.
                    </span>
                  </li>
                </ul>
              </div>
              <div className={styles.constructSegment}>
                <p className={styles.constructSegmentLabel}>
                  Selection and recycling
                </p>
                <ul>
                  <li>
                    <strong>
                      Nourseothricin-resistance selection cassette (NAT)
                    </strong>
                    <span>
                      Provides nourseothricin resistance for A08 selection; the
                      cassette includes a phosphoglycerate kinase
                      (PGK)-annotated regulatory region
                    </span>
                  </li>
                  <li>
                    <strong>lox71 and lox66 sites</strong>
                    <span>
                      The sequence-identified mutant lox sites flank the NAT
                      selection interval and provide recognition sites for
                      Cre-mediated marker recycling
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <DiagramFigure
              id="design-figure-2"
              src="https://static.igem.wiki/teams/6147/wiki/wet-design/rdnanew.svg"
              intrinsicWidth={1010}
              intrinsicHeight={565}
              alt="Circular map of the pNAT-LoxP-rDNA plasmid showing the expression cassette, NAT marker, lox sites, bacterial elements, and 18S and 26S rDNA homology regions."
              captionPrefix="Figure 2."
              caption="pNAT-LoxP-rDNA"
              fallback={<p>Image unavailable.</p>}
            />
          </>
        ),
      },
      {
        id: "design-genetic-parts-and-construct-design-the-fl4a-hpt-loxp-knockout-backbone",
        title: "The fl4a-hpt-loxp Knockout Backbone",
        content: (
          <>
            <p>
              We use fl4a-hpt-loxp to construct targeted knockouts of{" "}
              <em>xlnR</em> and <em>araR</em> in{" "}
              <em>Aureobasidium melanogenum</em> A08. For each target gene, we
              design a separate pair of upstream and downstream homology arms
              matching the genomic sequences flanking the interval selected for
              removal. Homologous recombination at both arms is designed to
              replace this interval with the selection cassette, disrupting the
              target gene. The homology arms therefore specify both the target
              locus and the boundaries of the intended replacement. This
              strategy follows the established principle of homology-directed
              gene disruption <Cite k="rothstein1983disruption" />. The
              hygromycin B phosphotransferase (HPT) cassette enables selection
              with hygromycin B, while the directly oriented lox71 and lox66
              sites allow subsequent marker excision by separately supplied Cre
              recombinase. Marker excision removes the HPT-containing interval
              without restoring the deleted target-gene region.
            </p>
            <h4 className={styles.sectionLabel}>Knockout construct roles</h4>
            <dl className={styles.assemblyRows}>
              <div>
                <dt>Target-specific homology arms</dt>
                <dd>
                  Match the genomic regions flanking <em>xlnR</em> or{" "}
                  <em>araR</em> and define the intended replacement interval.
                </dd>
              </div>
              <div>
                <dt>HPT selection cassette</dt>
                <dd>
                  Enables hygromycin B selection of candidate transformants.
                </dd>
              </div>
              <div>
                <dt>Directly oriented lox71 and lox66 sites</dt>
                <dd>
                  Flank the HPT-containing interval for subsequent Cre-mediated
                  marker recycling.
                </dd>
              </div>
              <div>
                <dt>Ampicillin-resistance marker and ColE1 origin</dt>
                <dd>
                  Support bacterial selection and plasmid propagation during
                  construct assembly.
                </dd>
              </div>
            </dl>
            <DiagramFigure
              id="design-figure-3"
              src="https://static.igem.wiki/teams/6147/wiki/wet-design/fl4a-hpt-loxp2.svg"
              intrinsicWidth={1010}
              intrinsicHeight={565}
              alt="Circular map of the fl4a-hpt-loxp knockout backbone showing the HPT cassette, lox sites, bacterial elements, and multiple cloning sites for introducing homology arms."
              captionPrefix="Figure 3."
              caption="fl4a-hpt-loxp"
              fallback={<p>Image unavailable.</p>}
            />
            <DiagramFigure
              id="design-figure-4"
              src="https://static.igem.wiki/teams/6147/wiki/wet-design/knock.svg"
              intrinsicWidth={1800}
              intrinsicHeight={1110}
              alt="Two-panel schematic showing the fl4a-hpt-loxp backbone combined with xlnR or araR homology arms, followed by homologous replacement of the target-gene interval and target disruption."
              captionPrefix="Figure 4."
              caption="Homologous recombination knockout"
              fallback={<p>Image unavailable.</p>}
            />
          </>
        ),
      },
      {
        id: "design-genetic-parts-and-construct-design-pyc-expression-constructs",
        title: "PYC Expression Constructs",
        content: (
          <>
            <p>
              For the PYC module, the same backbone is used to carry
              PYC-encoding sequences from <em>Aureobasidium melanogenum</em>{" "}
              A08, <em>Aureobasidium thailandense</em> ZW03-4,{" "}
              <em>Yarrowia lipolytica</em>, and{" "}
              <em>Saccharomyces cerevisiae</em>. The donor labels ZW(At), YL,
              and SC refer to these three heterologous sources, respectively.
              PYC (pyruvate carboxylase) denotes the enzyme; the corresponding
              gene is italicized as <em>pyc</em> unless an established
              donor-specific symbol applies. The SC candidate specifically uses{" "}
              <em>S. cerevisiae</em> <em>PYC1</em>. The donor-selection
              rationale is described in the PYC module.
            </p>
          </>
        ),
      },
      {
        id: "design-genetic-parts-and-construct-design-pentose-regulation-part-collection",
        title: "Pentose-Regulation Part Collection",
        content: (
          <>
            <p>
              We developed the Pentose-Regulation Part Collection to investigate
              and improve xylose utilization and poly(malic acid) (PMA)
              production in <em>Aureobasidium melanogenum</em> A08. The
              collection connects the endogenous regulator genes <em>xlnR</em>{" "}
              and <em>araR</em> with expression constructs and supporting
              knockout tools. These components serve a common purpose:
              identifying the contribution of each regulator and selecting
              expression strategies that improve pentose-based production.
            </p>
            <p>
              The collection contains four core parts: two genes and their
              corresponding constructs—supported by a shared expression backbone
              and a knockout backbone.
            </p>
            <figure
              className={tableStyles.tableFigure}
              aria-labelledby="design-table-components-caption"
            >
              <p
                id="design-table-components-hint"
                className={tableStyles.tableHint}
              >
                Swipe horizontally to view all columns. The first column stays
                visible.
              </p>
              <div
                className={tableStyles.tableScroller}
                role="region"
                aria-labelledby="design-table-components-caption"
                aria-describedby="design-table-components-hint"
                tabIndex={0}
              >
                <table aria-labelledby="design-table-components-caption">
                  <thead>
                    <tr>
                      <th scope="col">Part</th>
                      <th scope="col">
                        Composition and role in the collection
                      </th>
                      <th scope="col">Registry ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        A08 <em>xlnR</em> gene
                      </th>
                      <td>
                        The endogenous A08 gene corresponding to g3332.t1.
                        Encodes the transcription factor XlnR and provides the
                        gene sequence for functional studies and expression
                        constructs.
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <th scope="row">
                        A08 <em>araR</em> gene
                      </th>
                      <td>
                        The endogenous A08 gene corresponding to g13480.t1.
                        Encodes the transcription factor AraR and provides the
                        gene sequence for functional studies and expression
                        constructs.
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <th scope="row">
                        A08 <em>xlnR</em> expression construct
                      </th>
                      <td>
                        An 8,251-base-pair (bp) pNAT-LoxP-rDNA-derived plasmid
                        carrying the A08 <em>xlnR</em> gene sequence under the
                        translation elongation factor (TEF) promoter. Used for
                        the XlnR-overexpression intervention.
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <th scope="row">
                        A08 <em>araR</em> expression construct
                      </th>
                      <td>
                        A 7,765-bp pNAT-LoxP-rDNA-derived plasmid carrying the
                        A08 <em>araR</em> gene sequence under the TEF promoter.
                        Used for the AraR-overexpression intervention.
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <th scope="row">pNAT-LoxP-rDNA expression backbone</th>
                      <td>
                        The existing parent backbone shared by both expression
                        constructs. Provides the expression framework,
                        nourseothricin-resistance (NAT) selection, and ribosomal
                        DNA (rDNA) homology regions.
                      </td>
                      <td>BBa_25QPWVAX</td>
                    </tr>
                    <tr>
                      <th scope="row">fl4a-hpt-loxp knockout backbone</th>
                      <td>
                        The supporting backbone for target-specific knockout
                        constructs. Target-specific homology arms adapt the
                        backbone for <em>xlnR</em> or <em>araR</em> disruption.
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Caption id="design-table-components-caption" prefix="Table D1.">
                Components of the A08 Pentose-Regulation Part Collection.
              </Caption>
            </figure>
            <p>
              The components support complementary genetic comparisons. The
              knockout backbone, combined with a separate pair of homology arms
              for each target, enables loss-of-function studies. The two
              expression constructs allow each regulator to be overexpressed
              individually or both to be overexpressed in the same recipient.
              These comparisons connect the study of regulator function with the
              selection of useful engineering strategies.
            </p>
            <p>
              Characterization in A08 follows this organization. Single- and
              double-knockout comparisons examine the individual and combined
              contributions of the regulators to growth on pentoses. Single and
              combined overexpression are evaluated through sugar consumption
              and PMA production, while selected metabolic transcripts are
              compared between wild-type A08 and OE-XlnR+AraR. Mixed-sugar and
              corn-stover hydrolysate fermentations assess performance under
              conditions relevant to biomass conversion.
            </p>
            <p>
              The collection also offers a route for work beyond A08. Other
              teams can select individual regulator genes for host-adapted
              expression, use the expression constructs in compatible
              recipients, or adapt the knockout framework to investigate
              corresponding genes in other <em>Aureobasidium</em> strains. The
              A08-derived <em>xlnR</em> and <em>araR</em> genes also provide
              candidates for heterologous expression in other fungal hosts.
              Expressing these genes individually or together would allow other
              teams to investigate whether their regulatory functions extend
              beyond A08 and how they influence pentose-metabolism gene
              expression and sugar utilization in a new host. This application
              requires host-compatible expression elements and functional
              validation. For knockout-based transfer, genome-matched homology
              arms and compatible selection elements are also required. Knockout
              and overexpression comparisons can then establish the contribution
              of each regulator before single or combined overexpression is
              selected for improving pentose utilization. Such
              recipient-specific testing is important because AraR and XlnR do
              not necessarily have identical regulatory roles across fungal
              hosts <Cite k="battaglia2011regulatorydifferences" />. Where
              beneficial effects are established, the corresponding expression
              strategy could then be developed further for pentose-based
              production.
            </p>
            <p>
              By linking regulator sequences, expression constructs, and
              knockout tools, the collection supports a progression from
              functional analysis to production-strain engineering. Other teams
              can reuse individual components or adapt the complete comparison
              framework to identify regulatory strategies for converting
              biomass-derived pentoses into their chosen products.
            </p>
            <p>
              Characterization addresses different levels of the collection:
              single and double knockouts examine functional differences, single
              and combined overexpression evaluate engineering performance, and
              mixed-sugar and corn-stover hydrolysate fermentation test
              application conditions. Each part's sequence, structure, and test
              background are described individually, while combined-strain
              results characterize the combination. The Experiments page
              presents the study design, the Results page provides the evidence,
              and the Protocols page supplies methods. The registry collection
              and individual-part documentation provide resources for other
              teams to find and reuse the tools.
            </p>
          </>
        ),
      },
      {
        id: "design-genetic-parts-and-construct-design-cre-lox-mediated-marker-recycling",
        title: "Cre\u2013lox-Mediated Marker Recycling",
        content: (
          <>
            <p>
              To enable the reuse of selectable markers in successive
              engineering cycles, we incorporated Cre–lox-mediated marker
              recycling into our plasmid designs. This strategy has been
              previously demonstrated for sequential gene deletion and
              expression in <em>Aureobasidium melanogenum</em>{" "}
              <Cite k="zhang2019crelox" />. As shown in Figures 5 and 6, the
              directly oriented mutant lox sites (lox71 and lox66) flank the
              selection cassettes. Cre recombinase catalyzes DNA strand cleavage
              and exchange between these paired sites{" "}
              <Cite k="hoess1985cremechanism" />. This recombination excises the
              marker cassette (NAT or HPT) and leaves a double-mutant lox72 scar
              in the genome, which has reduced responsiveness to Cre and
              minimizes unwanted recombination in future cycles{" "}
              <Cite k="yan2008lox" />.
            </p>
            <p>
              <strong>Design Status:</strong> While the backbones containing the
              sequenced lox71/66 sites have been successfully constructed, and
              the Cre recombinase sequence was prepared and submitted as a
              biological part, the in vivo Cre-mediated marker excision assay
              (e.g., PCR amplification and sequencing of the excision junction)
              has not yet been performed due to project timeline constraints.
              This section presents the validated theoretical design framework
              intended for future sequential engineering in A08.
            </p>
            <DiagramFigure
              id="design-figure-5"
              src="https://static.igem.wiki/teams/6147/wiki/wet-design/exec-6f4baabd-88ff-4a36-903f-ae1d029439c3.avif"
              intrinsicWidth={1506}
              intrinsicHeight={1044}
              alt="Schematic comparing Cre–lox marker recycling in expression and knockout constructs, showing the retained genomic loci and excised circles containing NAT or HPT."
              captionPrefix="Figure 5."
              caption="Cre-mediated marker recycling"
              fallback={<p>Image unavailable.</p>}
            />
            <p>The system supports two applications:</p>
            <div
              className={styles.recyclingMatrix}
              role="group"
              aria-label="Marker recycling outcomes for expression and knockout constructs"
            >
              <div className={styles.recyclingColumn}>
                <p className={styles.recyclingColumnLabel}>
                  Expression constructs
                </p>
                <p>
                  Excision removes the nourseothricin-resistance (NAT) interval
                  while retaining the translation elongation factor (TEF)
                  promoter and target gene located outside it. The expression
                  region is therefore preserved for subsequent strain
                  engineering.
                </p>
              </div>
              <div className={styles.recyclingColumn}>
                <p className={styles.recyclingColumnLabel}>
                  Knockout constructs
                </p>
                <p>
                  Excision removes the hygromycin B phosphotransferase (HPT)
                  interval while retaining the target-gene deletion or
                  disruption established by homologous recombination. Removing
                  the marker does not restore the original target gene.
                </p>
              </div>
            </div>
            <DiagramFigure
              id="design-figure-6"
              src="https://static.igem.wiki/teams/6147/wiki/wet-design/cre2.avif"
              intrinsicWidth={4000}
              intrinsicHeight={2800}
              alt="Detailed schematic of Cre recognition at lox sites and marker removal from expression and knockout loci, with native loxP and residual lox72 sites."
              captionPrefix="Figure 6."
              caption="Cre's two applications"
              fallback={<p>Image unavailable.</p>}
            />
          </>
        ),
      },
    ],
  },
  {
    id: "design-saccharification-module",
    title: "Saccharification Module",
    content: (
      <>
        <p>
          The saccharification module connects agricultural lignocellulosic
          residues with downstream biomanufacturing through consolidated
          bio-saccharification (CBS). Liu et al. (2023) demonstrated that
          engineered <em>Clostridium thermocellum</em> ΔpyrF::P₂₆₃₈-BGL can
          saccharify alkali-pretreated agricultural residues, including corn
          stover and corncob residues. In this system, the cellulosome
          participates in lignocellulose degradation, while β-glucosidase (BGL)
          converts cellobiose into glucose and alleviates cellobiose inhibition.
          The resulting hydrolysates contain glucose and xylose, providing
          fermentable sugars for subsequent microbial production{" "}
          <Cite k="liu2023cornbioconversion" />.
        </p>
        <p>
          In our project, corn-stover hydrolysate is selected as a
          representative agricultural-residue-derived carbon source for
          evaluating A08 fermentation and PMA production. The hydrolysate is
          supplied by our instructor, Yajun Liu, and prepared by the
          collaborating laboratory using the CBS system described in that study.
          Our team focuses on its downstream utilization, linking
          lignocellulosic sugar supply with the xylose and PYC modules.
        </p>
        <h3 className={styles.sectionLabel}>Catalytic exchange</h3>
        <dl className={styles.exchangeBands}>
          <div>
            <dt>β-Glucosidase (BGL)</dt>
            <dd>
              Converts cellobiose into glucose and helps alleviate cellobiose
              inhibition during saccharification.
            </dd>
          </div>
          <div>
            <dt>
              Engineered <em>C. thermocellum</em> ΔpyrF::P₂₆₃₈-BGL
            </dt>
            <dd>Whole-cell catalyst for CBS</dd>
          </div>
        </dl>
        <p>
          The experimental design of this module focuses on connecting
          corn-stover hydrolysate provided by our instructor, Yajun Liu, with
          downstream fermentation. The hydrolysate is prepared and supplied by
          our instructor’s laboratory. Our team analyzes its composition, with
          particular emphasis on the sugar composition, and evaluates its
          suitability as a carbon source for A08 fermentation.
        </p>
        <div className={styles.exchangeOutput}>
          <p className={styles.exchangeOutputLabel}>Hydrolysate output</p>
          <p>
            The output is a glucose–xylose mixed-sugar hydrolysate, which
            becomes the carbon source for the xylose and PYC modules.
          </p>
        </div>
        <DiagramFigure
          id="design-figure-7"
          src="https://static.igem.wiki/teams/6147/wiki/wet-design/cbs.avif"
          intrinsicWidth={4000}
          intrinsicHeight={2800}
          alt="Consolidated bio-saccharification workflow and subsequent HPLC-based sugar-composition analysis of the mixed-sugar corn-stover hydrolysate."
          captionPrefix="Figure 7."
          caption="Saccharification Module"
          fallback={<p>Image unavailable.</p>}
        />
      </>
    ),
  },
  {
    id: "design-xylose-module",
    title: "Xylose Module",
    content: (
      <>
        <p>
          The xylose module addresses pentose utilization in corn-stover
          hydrolysate. Because this feedstock contains both glucose and xylose,
          glucose-only production measurements cannot establish its suitability.
          We use growth and PMA production on different carbon sources as the
          starting point for AraR and XlnR regulatory engineering, investigating
          ways to improve xylose and mixed-sugar utilization.
        </p>
      </>
    ),
    subsections: [
      {
        id: "design-xylose-module-why-arar-and-xlnr",
        title: "Why AraR and XlnR?",
        content: (
          <>
            <p>
              By combining A08 genome annotation with literature review, we
              selected endogenous <em>xlnR</em> (g3332.t1) and <em>araR</em>{" "}
              (g13480.t1) as engineering targets. Transcription-factor
              engineering provides a pathway-level approach to investigate
              connections between sugar metabolism and PMA production.
            </p>
            <p>
              <strong>
                XlnR — a regulator connecting xylose utilization and polymer
                production.
              </strong>{" "}
              In <em>A. melanogenum</em> TN2-1-2, AmXlnR regulates xylan
              degradation and pentose catabolism, and its overexpression
              improves pullulan production from xylose. This same-species
              evidence supports investigating XlnR-mediated regulation for PMA
              production in A08 <Cite k="zhao2026amxlnr" />.
            </p>
            <p>
              <strong>
                AraR — a complementary regulator of shared pentose-metabolism
                steps.
              </strong>{" "}
              AraR is closely associated with arabinose utilization and also
              participates in steps shared by arabinose and xylose catabolism.
              In <em>Aspergillus niger</em>, AraR and XlnR regulate{" "}
              <em>xdhA</em> and <em>xkiA</em>, encoding enzymes that convert
              xylitol to D-xylulose and D-xylulose to D-xylulose-5-phosphate,
              respectively. Their overlapping but distinct functions support
              evaluating the candidates individually and examining combined
              overexpression <Cite k="battaglia2011pentose" />.
            </p>
            <p>
              We therefore designed single-gene deletion, double-gene deletion,
              single-regulator overexpression, and combined-overexpression
              experiments. Growth on different sugars, PMA production, and
              related gene expression allow us to evaluate the regulators and
              select a recipient background for subsequent PYC engineering.
            </p>
            <p>
              We also used published XlnR-recognition motifs to examine promoter
              sequences of relevant A08 genes <Cite k="zhao2026amxlnr" />. Our
              analysis identified matching sequences in the promoters of genes
              annotated as PMA synthases, <em>PMA-1</em> and <em>PMA-2</em>, and
              in key glycolytic gene promoters: hexokinase (<em>HK</em>),
              phosphofructokinase (<em>PFK</em>), glyceraldehyde-3-phosphate
              dehydrogenase (<em>GAPDH</em>), and <em>PGK</em>. These sequence
              predictions provide a basis for examining how XlnR regulation
              could connect xylose metabolism, glycolysis, and PMA synthesis.
              Direct XlnR binding to these A08 promoters has not been
              experimentally measured.
            </p>
            <h4 className={styles.sectionLabel}>Regulator and chassis roles</h4>
            <dl className={styles.roleTable}>
              <div>
                <dt>AraR</dt>
                <dd>
                  The project's candidate transcriptional regulator associated
                  with pentose metabolism.
                </dd>
              </div>
              <div>
                <dt>XlnR</dt>
                <dd>
                  A candidate supported by same-species pentose-regulation
                  research.
                </dd>
              </div>
              <div>
                <dt>A08</dt>
                <dd>
                  The common chassis for comparing deletion,
                  single-overexpression, and combined-overexpression strategies.
                </dd>
              </div>
            </dl>
          </>
        ),
      },
      {
        id: "design-xylose-module-experimental-design",
        title: "Experimental Design",
        content: (
          <>
            <p>
              We first compare A08 growth on glucose, xylose, and arabinose,
              then examine PMA production at different xylose concentrations and
              glucose–xylose ratios to establish the carbon-source conditions
              for subsequent comparisons. Single- and double-gene deletions are
              used to examine the contribution of each regulator to pentose
              utilization. Single- and combined-overexpression strains are then
              compared to identify a suitable strategy for PMA production. The
              expression strategies are further evaluated in the supplied
              corn-stover hydrolysate, and the combined-overexpression strain
              provides the recipient background for subsequent PYC engineering.
            </p>
            <p>
              PMA concentration and growth are used to evaluate production
              performance and carbon-source utilization. To examine the
              transcriptional changes associated with combined overexpression,
              we use reverse transcription–quantitative polymerase chain
              reaction (RT-qPCR) to compare unmodified A08 with OE-XlnR+AraR.
              The measured targets are the xylose-metabolism-related genes{" "}
              <em>XYR</em>, <em>XDH</em>, <em>XKI</em>, and <em>XI</em>,
              together with the PMA synthase gene <em>PMA</em>. Relative
              transcript levels are normalized to the reference gene{" "}
              <em>actin</em>, with A08 serving as the comparison baseline.
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: "design-pyc-module",
    title: "PYC Module",
    content: <></>,
    subsections: [
      {
        id: "design-pyc-module-why-pyc",
        title: "Why PYC?",
        content: (
          <>
            <p>
              Malate is the monomer precursor for PMA, making precursor supply a
              relevant engineering target. Pyruvate carboxylase (PYC) catalyzes
              the adenosine triphosphate (ATP)-dependent carboxylation of
              pyruvate to oxaloacetate:
            </p>
            <p>
              ATP + pyruvate + HCO₃⁻ → adenosine diphosphate (ADP) + inorganic
              phosphate + oxaloacetate <Cite k="iubmbpyruvatecarboxylase" />.
            </p>
            <p>
              The oxaloacetate formed can then be reduced to malate by malate
              dehydrogenase, consuming NADH and producing NAD⁺{" "}
              <Cite k="iubmbmalatedehydrogenase" />. PYC engineering therefore
              targets precursor formation; polymer synthesis is a downstream
              biosynthetic process.
            </p>
            <p>
              Feng et al. (2018) combined metabolome analysis and genome-scale
              modeling to identify <em>pyc</em> as a PMA-production engineering
              target. In a 5 L fermentation comparison with{" "}
              <em>Aureobasidium pullulans</em>, the overexpression strain's PMA
              titer was 15.1% higher than that of the wild type. Because this
              result comes from another species in the same genus, it supports
              testing PYC engineering in A08 <Cite k="feng2018pycmodel" />.
            </p>
            <p>
              Our modelling group also used A08 genomic resources to prioritize
              candidate genes, which provided independent support for this
              target choice (see Model). We therefore included PYC in our
              engineering strategy. We compared candidates from different
              sources to test whether this precursor-supply strategy contributes
              to PMA production.
            </p>
          </>
        ),
      },
      {
        id: "design-pyc-module-why-these-pyc-candidates",
        title: "Why These PYC Candidates?",
        content: (
          <>
            <p>
              After identifying PYC as the metabolic target, the next design
              question is which donor candidates are worth evaluating in A08.
              Our candidate set combines an endogenous reference with a
              congeneric donor and two yeast donors with different metabolic
              research backgrounds. It is a targeted, literature-supported set
              assembled within the project's available resources, not the result
              of an exhaustive search for the best PYC. Our candidate panel
              includes the native PYC-encoding gene from A08 and three
              heterologous PYC-encoding candidates.
            </p>
            <div className={styles.candidatePanel}>
              <p className={styles.candidatePanelLabel}>PYC candidate panel</p>
              <dl className={styles.candidateRows}>
                <div>
                  <dt>Native A08</dt>
                  <dd>A reference for endogenous overexpression.</dd>
                </div>
                <div>
                  <dt>
                    <em>Aureobasidium thailandense</em> ZW03-4
                  </dt>
                  <dd>
                    A closely related donor with a laboratory-observed
                    organic-acid phenotype.
                  </dd>
                </div>
                <div>
                  <dt>
                    <em>Yarrowia lipolytica</em>
                  </dt>
                  <dd>
                    A yeast donor with an established foundation in high-level
                    organic acid production.
                  </dd>
                </div>
                <div>
                  <dt>
                    <em>Saccharomyces cerevisiae</em>
                  </dt>
                  <dd>
                    A model-yeast candidate with demonstrated applications in
                    malate production.
                  </dd>
                </div>
              </dl>
            </div>
            <p>
              The native <em>pyc</em> candidate from{" "}
              <em>Aureobasidium melanogenum</em> A08 provides the host’s own
              sequence background and allows us to evaluate whether increasing
              expression of the endogenous gene can improve PMA production.
              Including this candidate enables comparison between two
              strategies: increasing production of the native enzyme and
              introducing a gene encoding a heterologous enzyme. This comparison
              helps assess whether changing the PYC source offers an advantage.
            </p>
            <p>
              Preliminary work in our laboratory identified{" "}
              <em>A. thailandense</em> ZW03-4 as a strain capable of
              accumulating substantial amounts of fumaric acid. Fumarate and
              malate are connected intermediates in C4-dicarboxylic acid
              metabolism and can be interconverted through a fumarase-catalyzed
              reaction <Cite k="iubmbfumarase" />. The fumarate-accumulating
              phenotype of ZW03-4 therefore motivated us to investigate its
              associated precursor-supply pathways. In addition, ZW03-4 belongs
              to the same genus as A08, providing a candidate for comparing PYC
              from different sources within <em>Aureobasidium</em>. Based on its
              acid-producing phenotype and donor background, we selected PYC
              from ZW03-4 to evaluate its potential to improve PMA production in
              A08.
            </p>
            <p>
              The fumarate-accumulation observation is unpublished laboratory
              background. It supports donor inclusion, but does not identify PYC
              as the sole cause of that phenotype. A separate feasibility
              precedent is the overexpression of the <em>PYC1</em> gene from{" "}
              <em>Aureobasidium</em> sp. P6 in <em>A. melanogenum</em>,
              supporting PYC-encoding gene transfer within the genus{" "}
              <Cite k="tang2018pyc" />.
            </p>
            <p>
              <em>Yarrowia lipolytica</em> is a widely studied chassis for
              organic acid biomanufacturing and has been engineered to produce
              succinic, citric, and isocitric acids. We selected its PYC not
              only because of this established acid-production background, but
              also because the relevant engineered pathways are closely
              connected to malate precursor supply.
            </p>
            <p>
              Cui et al. (2023) reconfigured the reductive tricarboxylic acid
              (TCA) pathway and applied multiple engineering modifications to
              achieve a succinic acid titer of 111.9 g/L in pilot-scale
              fermentation. Their pathway engineering also included the
              endogenous pyruvate carboxylase YlPyc, providing an application
              precedent directly relevant to our candidate. In the reductive
              succinate-production branch, oxaloacetate is converted to
              succinate through malate and fumarate, establishing a clear
              connection to the malate precursor supply targeted in our project{" "}
              <Cite k="cui2023succinate" />. The final succinate titer reflects
              a multi-engineered strain, not the effect of YlPyc alone.
            </p>
            <p>
              Furthermore, Rzechonek et al. (2019) reported that engineered{" "}
              <em>Y. lipolytica</em> produced citric and isocitric acids from
              crude glycerol, reaching a combined concentration of 75.9 ± 1.8
              g/L. This further demonstrates the yeast’s value as an organic
              acid production chassis <Cite k="rzechonek2019citrate" />.
            </p>
            <p>
              Based on these studies, we included PYC from{" "}
              <em>Y. lipolytica</em> to investigate whether an enzyme source
              with this organic acid engineering background can improve PMA
              production in A08.
            </p>
            <p>
              The <em>S. cerevisiae</em> <em>PYC1</em> and <em>PYC2</em> genes
              have been extensively characterized and applied in metabolic
              engineering for malate production. Kang et al. combined their
              overexpression with engineering of malate dehydrogenase, malate
              transport, and by-product pathways in a xylose-assimilating{" "}
              <em>S. cerevisiae</em> strain, ultimately achieving an L-malic
              acid titer of 61.2 g/L. This study directly connects PYC-mediated
              precursor supply with malate production from xylose, aligning with
              our objectives for sugar utilization and PMA precursor supply. We
              therefore selected <em>S. cerevisiae</em> <em>PYC1</em> as the
              candidate to evaluate its application potential in A08{" "}
              <Cite k="kang2022malate" />. The reported malate production
              reflects the combined pathway-engineering strategy, not{" "}
              <em>PYC1</em> overexpression alone.
            </p>
            <h4 className={styles.componentHeading}>Key components:</h4>
            <ul className={styles.componentGrid}>
              <li>
                <strong>PYC-encoding candidates</strong> — the native A08
                candidate and the ZW, YL, and SC heterologous candidates; SC
                uses <em>PYC1</em>.
              </li>
              <li>
                <strong>pNAT-LoxP-rDNA</strong> — the common expression
                backbone, with NAT selection for transformants.
              </li>
              <li>
                <strong>OE-XlnR+AraR</strong> — the shared recipient background
                connecting pentose regulation and precursor-supply engineering.
              </li>
              <li>
                <strong>A08</strong> — the PMA-producing chassis.
              </li>
            </ul>
            <DiagramFigure
              id="design-figure-8"
              src="https://static.igem.wiki/teams/6147/wiki/wet-design/pyc.avif"
              intrinsicWidth={4000}
              intrinsicHeight={2800}
              alt="PYC candidate panel from A08, Aureobasidium thailandense ZW03-4, Yarrowia lipolytica, and Saccharomyces cerevisiae PYC1, showing their role in precursor supply to PMA."
              captionPrefix="Figure 8."
              caption="PYC candidate and precursor supply"
              fallback={<p>Image unavailable.</p>}
            />
          </>
        ),
      },
      {
        id: "design-pyc-module-experimental-design",
        title: "Experimental Design",
        content: (
          <>
            <p>
              We evaluate whether introducing an additional pyruvate carboxylase
              (PYC)-encoding gene can further improve poly(malic acid) (PMA)
              production in the dual-regulator-overexpression strain
              OE-XlnR+AraR. The candidate panel includes the native A08{" "}
              <em>pyc</em> gene and genes from{" "}
              <em>Aureobasidium thailandense</em> ZW03-4 (ZW),{" "}
              <em>Yarrowia lipolytica</em> (YL), and{" "}
              <em>Saccharomyces cerevisiae</em> (SC). The SC candidate is{" "}
              <em>PYC1</em>. Each candidate is constructed using the common
              pNAT-LoxP-rDNA backbone for introduction into the same
              OE-XlnR+AraR recipient background.
            </p>
            <p>
              Following construct and transformant verification, the resulting
              strains are compared under corn stover hydrolysate conditions. PMA
              concentration is the main production readout, while biomass
              measurements help distinguish changes in production from
              differences in growth. Comparing the donor candidates in the same
              regulatory background allows us to identify the better-performing
              PYC-engineering combination under the tested conditions.
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: "design-adhesive-module",
    title: "Adhesive Module",
    content: (
      <>
        <p>
          The adhesive module explores how fermentation-derived poly(malic acid)
          (PMA) can be developed into a functional material. While the xylose
          and PYC modules focus on sugar utilization and PMA production, this
          module examines the downstream application of the fermentation
          product.
        </p>
        <p>
          PMA's pendant carboxyl groups allow functional molecules to be
          attached, as illustrated by its use in drug-delivery research{" "}
          <Cite k="ding2011pmla" />. Following discussions with our instructor,
          Ya Liu, we selected adhesive development as the application direction
          and investigated dopamine functionalization of PMA-containing broth.
        </p>
        <DiagramFigure
          id="design-figure-9"
          src="https://static.igem.wiki/teams/6147/wiki/wet-design/all-route.avif"
          intrinsicWidth={4000}
          intrinsicHeight={1033}
          alt="Chemical route for coupling dopamine to PMA through EDC and NHS activation to form PMA-DA."
          captionPrefix="Figure 9."
          caption="PMA-DA route"
          fallback={<p>Image unavailable.</p>}
        />
      </>
    ),
    subsections: [
      {
        id: "design-adhesive-module-why-dopamine-and-pma",
        title: "Why Dopamine and PMA?",
        content: (
          <>
            <p>
              We selected dopamine to introduce adhesive functionality onto
              fermentation-derived PMA. Its amino group can couple to PMA's
              pendant carboxyl groups through amide bonds, leaving the catechol
              group available for interactions with substrate surfaces.
              Depending on the substrate and reaction conditions, these
              interactions can involve hydrogen bonding, metal coordination, and
              oxidation-related reactions <Cite k="lee2011musseladhesives" />.
            </p>
            <p>
              We observed that A08 is capable of producing high-molecular-weight
              PMA, which further supports its selection as the polymer source.
              Longer chains may improve cohesion through chain entanglement, but
              increased viscosity can hinder spreading and surface contact. Our
              design therefore considers the balance between interfacial
              adhesion, material cohesion, and processability, rather than
              assuming that higher molecular weight always improves bonding{" "}
              <Cite
                k={["jenkins2013molecularweight", "siebert2019molecularweight"]}
              />
              .
            </p>
            <p>
              Tang et al. prepared a dopamine-functionalized PMA adhesive
              through amide coupling using
              1-ethyl-3-(3-dimethylaminopropyl)carbodiimide hydrochloride
              (EDC·HCl) and N-hydroxysuccinimide (NHS). Their study provides a
              chemical precedent for our coupling strategy and dopamine
              feed-ratio selection <Cite k="Tang2020PMLADA" />. We adapt this
              approach to PMA-containing fermentation broth.
            </p>
            <h3 className={styles.componentHeading}>Key components:</h3>
            <ul className={styles.componentGrid}>
              <li>
                <strong>PMA-containing broth</strong> — A08 fermentation
                supernatant after cell removal, used as the starting material
                for functionalization.
              </li>
              <li>
                <strong>Dopamine</strong> — provides the amino group for
                coupling and catechol functionality for interfacial
                interactions.
              </li>
              <li>
                <strong>
                  1-Ethyl-3-(3-dimethylaminopropyl)carbodiimide hydrochloride
                  (EDC·HCl)
                </strong>{" "}
                — activates carboxyl groups for carboxyl-to-amine coupling.
              </li>
              <li>
                <strong>N-Hydroxysuccinimide (NHS)</strong> — used with EDC·HCl
                for amide coupling.
              </li>
              <li>
                <strong>PMA-DA formulation</strong> — the broth-derived adhesive
                material obtained through coupling, dialysis, and subsequent
                shaping.
              </li>
            </ul>
          </>
        ),
      },
      {
        id: "design-adhesive-module-experimental-design",
        title: "Experimental Design",
        content: (
          <>
            <p>
              Preparation starts with cell-removed PMA-containing broth. PMA
              concentration determined by high-performance liquid chromatography
              (HPLC) is used to estimate carboxyl-group amounts and calculate
              reagent inputs. The baseline formulation uses a
              dopamine-to-carboxyl molar feed ratio of 1:1, with EDC·HCl and NHS
              each added at two equivalents relative to estimated PMA carboxyl
              groups. Activation is followed by dopamine addition, reaction,
              dialysis, shaping, and freeze-drying. The chemical goal is
              carboxyl-to-amine amide formation while retaining catechol
              functionality.
            </p>
            <p>The evaluation addresses the following questions:</p>
            <ul className={styles.applicationGrid}>
              <li>
                <strong>Can the formulation bond different substrates?</strong>{" "}
                Bonded specimens prepared from glass, stainless steel, and{" "}
                <em>ex vivo</em> porcine skin are tested under tensile loading
                to evaluate substrate-dependent adhesion. These measurements
                describe the bonded joints rather than the tensile strength of
                the adhesive alone.
              </li>
              <li>
                <strong>How does the formulation affect adhesion?</strong>{" "}
                Comparisons of material concentration and dopamine-to-carboxyl
                input ratio examine how preparation conditions influence
                adhesive performance. Underwater tests further assess adhesion
                in wet conditions.
              </li>
              <li>
                <strong>
                  How does the material behave in a biological or aqueous
                  environment?
                </strong>{" "}
                An L929 cell-compatibility assessment evaluates the cellular
                response to the formulation. Mass-loss measurements in
                phosphate-buffered saline (PBS) examine its stability in an
                aqueous environment.
              </li>
            </ul>
            <p>
              Together, these experiments connect material preparation with
              chemical characterization, adhesion testing, and biological
              evaluation. The intended outcome is a bio-based adhesive
              prototype, with wet-surface and soft-tissue adhesion as directions
              for further development.
            </p>
            <DiagramFigure
              id="design-figure-10"
              src="https://static.igem.wiki/teams/6147/wiki/wet-design/adhensive.avif"
              intrinsicWidth={4000}
              intrinsicHeight={2800}
              alt="PMA-DA adhesive preparation workflow, including EDC/NHS activation, dopamine coupling, dialysis, freeze-drying, and schematic evaluation targets for adhesive-joint performance, underwater adhesion, and L929 cell response."
              captionPrefix="Figure 10."
              caption="Adhesive Module"
              fallback={<p>Image unavailable.</p>}
            />
          </>
        ),
      },
    ],
  },
  {
    id: "design-evaluation-across-the-four-modules",
    title: "Evaluation Across the Four Modules",
    content: (
      <>
        <p>
          Each module addresses a specific question along the
          corn-stover-to-adhesive route. Hydrolysate analysis defines the
          fermentation input, xylose experiments support selection of a
          regulatory background, PYC comparisons assess combined engineering,
          and material tests examine the function of the broth-derived
          formulation.
        </p>
        <figure
          className={tableStyles.tableFigure}
          aria-labelledby="design-table-evaluation-caption"
        >
          <p
            id="design-table-evaluation-hint"
            className={tableStyles.tableHint}
          >
            Swipe horizontally to view all columns. The first column stays
            visible.
          </p>
          <div
            className={tableStyles.tableScroller}
            role="region"
            aria-labelledby="design-table-evaluation-caption"
            aria-describedby="design-table-evaluation-hint"
            tabIndex={0}
          >
            <table aria-labelledby="design-table-evaluation-caption">
              <thead>
                <tr>
                  <th scope="col">Module</th>
                  <th scope="col">Design question</th>
                  <th scope="col">Main evaluation</th>
                  <th scope="col">Decision supported</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Saccharification</th>
                  <td>
                    Is the supplied corn-stover hydrolysate suitable for A08
                    fermentation?
                  </td>
                  <td>
                    Feedstock and hydrolysate composition, sugar profile, and
                    hydrolysate fermentation performance.
                  </td>
                  <td>Define the downstream feedstock conditions.</td>
                </tr>
                <tr>
                  <th scope="row">Xylose</th>
                  <td>
                    Which regulatory strategy supports growth and PMA production
                    on pentose-containing substrates?
                  </td>
                  <td>
                    Growth on different sugars, deletion and overexpression
                    phenotypes, PMA concentration, and related transcripts.
                  </td>
                  <td>Select the recipient background for PYC engineering.</td>
                </tr>
                <tr>
                  <th scope="row">PYC</th>
                  <td>
                    Which PYC construct performs better in the dual-regulator
                    background?
                  </td>
                  <td>
                    Construct and strain identity, PMA concentration under
                    matched conditions, and biomass.
                  </td>
                  <td>
                    Select a better-performing tested combination;
                    matched-parent comparisons evaluate the added PYC
                    contribution.
                  </td>
                </tr>
                <tr>
                  <th scope="row">Adhesive</th>
                  <td>
                    Can PMA-containing broth be developed into a functional
                    adhesive material?
                  </td>
                  <td>
                    Material and joint testing, formulation comparisons,
                    underwater performance, cellular responses, and aqueous
                    stability.
                  </td>
                  <td>
                    Select formulations and define evidence-supported
                    application directions.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Caption id="design-table-evaluation-caption" prefix="Table D2.">
            Design questions, evaluation readouts, and subsequent decisions for
            the four modules.
          </Caption>
        </figure>
      </>
    ),
  },
];

export function Design() {
  return (
    <ArticlePage
      title="Design"
      heroImage={{
        src: "https://static.igem.wiki/teams/6147/wiki/wet-header/header-design.avif",
        alt: "Illustration of genetic design, cell engineering, and molecular building blocks.",
        backgroundColor: "#e7f2f4",
        objectFit: "contain",
      }}
      sections={sections}
      references
      stickyMobileOutline
    />
  );
}

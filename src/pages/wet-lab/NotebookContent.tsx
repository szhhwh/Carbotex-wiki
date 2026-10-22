import { type ArticleSection } from "../../components/article/ArticlePage";
import { Cite } from "../../components/article/References";
import {
  NotebookTimeline,
  type NotebookEntry,
} from "./notebook/NotebookTimeline";

const februaryEntries: NotebookEntry[] = [
  {
    id: "notebook-feb-10-15",
    date: "February 10–15",
    title: (
      <>
        Obtaining <em>Aureobasidium melanogenum</em> A08
      </>
    ),
    content: (
      <p>
        To investigate the microbial production of poly(malic acid) (PMA) from
        biomass-derived sugars, we first needed a PMA-producing chassis. We
        therefore obtained <em>Aureobasidium melanogenum</em> A08 from the
        laboratory’s strain collection. Its earlier isolation and screening had
        been performed by our laboratory. Work began with examination and
        documentation of the received culture.
      </p>
    ),
  },
  {
    id: "notebook-feb-16-22",
    date: "February 16–22",
    title: "Colony and microscopic observations",
    content: (
      <p>
        Colony appearance and microscopic morphology were examined and
        photographed to document the starting A08 culture. Morphological
        observations were combined with molecular identification to establish
        the chassis used in subsequent experiments.
      </p>
    ),
  },
  {
    id: "notebook-feb-23-28",
    date: "February 23–28",
    title: "ITS analysis and strain identification",
    content: (
      <p>
        Genomic DNA was extracted from A08, and the internal transcribed spacer
        (ITS) region was amplified by polymerase chain reaction (PCR) using
        ITS-specific primers <Cite k="schoch2012its" />. The amplified product
        was sequenced, and the resulting ITS sequence was aligned with reference
        sequences. A phylogenetic tree was then constructed using Molecular
        Evolutionary Genetics Analysis (MEGA) software. A08 clustered close to{" "}
        <em>A. melanogenum</em> CBS 105.22, supporting its identification as{" "}
        <em>A. melanogenum</em>.
      </p>
    ),
  },
];

const marchEntries: NotebookEntry[] = [
  {
    id: "notebook-mar-1-8",
    date: "March 1–8",
    title: "Connecting saccharification with fermentation",
    content: (
      <p>
        The laboratory of our instructor Yajun Liu used the consolidated
        bio-saccharification (CBS) system to prepare the hydrolysate of corn
        stover. We received the corn stover hydrolysate provided by instructor
        Yajun Liu. Before it was received, the hydrolysate had undergone
        sterilization treatment. The system used{" "}
        <em>Clostridium thermocellum</em> Δ<em>pyrF</em>
        ::P₂₆₃₈-BGL to saccharify the corn stover{" "}
        <Cite k="liu2023cornbioconversion" />. The focus of our team's
        experiment was to characterize this fermentation input and apply it to
        A08 fermentation. It did not involve the modification of{" "}
        <em>Clostridium thermocellum</em> or the saccharification treatment of
        the stover. The wet experiment plan used corn stover as an example of
        agricultural residue.
      </p>
    ),
  },
  {
    id: "notebook-mar-9-15",
    date: "March 9–15",
    title: "Feedstock composition and hydrolysate processing",
    content: (
      <p>
        Corn-stover composition was examined using the National Renewable Energy
        Laboratory (NREL) two-step sulfuric-acid hydrolysis method{" "}
        <Cite k="sluiter2012structural" />. Hydrolysate glucose and xylose were
        measured by high-performance liquid chromatography (HPLC). Glucan and
        xylan were major structural carbohydrate fractions, and glucose and
        xylose were the principal sugars in the hydrolysate.
      </p>
    ),
  },
  {
    id: "notebook-mar-16-22",
    date: "March 16–22",
    title: "Growth on glucose, xylose, and arabinose",
    content: (
      <>
        <p>
          To check A08 growth on different carbon sources, we cultured the
          strain in glucose, xylose, and arabinose, respectively. Growth was
          tracked by measuring OD₆₀₀ and plotted as growth curves.
        </p>
        <p>
          A08 grew well on all three sugars, showing it can utilize all of them.
          However, good growth doesn't guarantee good PMA production. We still
          needed to check how these different carbon sources affect PMA yield.
        </p>
      </>
    ),
  },
  {
    id: "notebook-mar-23-31",
    date: "March 23–31",
    title: "PMA production at different xylose concentrations",
    content: (
      <>
        <p>
          A08 fermentation was compared at initial xylose concentrations of 80,
          100, 120, 140, 160, and 180 g/L. PMA concentration was measured for
          each group to test whether increasing xylose loading improved
          production.
        </p>
        <p>
          The highest mean in this series was 12.20 g/L PMA at 120 g/L initial
          xylose. Higher xylose concentrations did not further increase the
          observed mean, directing attention from substrate loading toward
          strain engineering.
        </p>
      </>
    ),
  },
];

const aprilEntries: NotebookEntry[] = [
  {
    id: "notebook-apr-1-7",
    date: "April 1–7",
    title: "Production on glucose–xylose mixtures",
    content: (
      <>
        <p>
          PMA production was compared at glucose:xylose mass ratios of 100:0,
          75:25, 50:50, 25:75, and 0:100, using a total sugar formulation of 100
          g/L. Production cultures were prepared in 250 mL flasks with a final
          culture volume of 50 mL, comprising 45 mL medium and 5 mL seed
          culture. Three independent flasks were used per group, with incubation
          at 28 °C and 180 revolutions per minute (rpm) for 120 h.
        </p>
        <p>
          Mean PMA concentration decreased as the xylose fraction increased.
          Together with the growth observations, this indicated a difference
          between growth on xylose and PMA production under xylose-containing
          conditions. Transcriptional regulation of pentose metabolism was
          selected for the next engineering comparison.
        </p>
      </>
    ),
  },
  {
    id: "notebook-apr-8-14",
    date: "April 8–14",
    title: "Selecting AraR and XlnR",
    content: (
      <p>
        In the hydrolysate component analysis, xylose also accounted for a
        significant portion, and we needed to improve production under
        xylose-available conditions. Through a review of pentose-regulation
        literature, <em>xlnR</em> and <em>araR</em> were identified as
        transcriptional regulators of pentose utilisation{" "}
        <Cite k="battaglia2011pentose" />. From the internal annotation records
        of A08, they were selected as engineering targets. Based on this, we
        initially designed comparative experiments involving single deletion,
        double deletion, single overexpression, and combined overexpression,
        aiming to investigate the effects of each regulatory factor on the
        growth of the strain and the production of PMA.
      </p>
    ),
  },
  {
    id: "notebook-apr-15-21",
    date: "April 15–21",
    title: "XlnR promoter-motif analysis",
    content: (
      <>
        <p>
          We used XlnR-recognition motifs reported in the literature to examine
          the relevant A08 promoter sequences <Cite k="zhao2026amxlnr" />. The
          analysis included the PMA-synthesis-associated targets labeled{" "}
          <em>PMA-1</em> and <em>PMA-2</em>, together with the glycolytic
          targets <em>HK</em> (hexokinase), <em>PFK</em> (phosphofructokinase),{" "}
          <em>GAPDH</em> (glyceraldehyde-3-phosphate dehydrogenase), and{" "}
          <em>PGK</em> (phosphoglycerate kinase).
        </p>
        <p>
          The sequence analysis predicted XlnR-binding sites in these promoter
          regions. This finding informed the regulator-engineering experiments,
          which examined growth, PMA production, and related transcript levels.
        </p>
      </>
    ),
  },
  {
    id: "notebook-apr-22-30",
    date: "April 22–30",
    title: "A08 genomic DNA and construct preparation",
    content: (
      <>
        <p>
          Genomic deoxyribonucleic acid (DNA) was prepared from A08 for
          amplification of endogenous targets. The <em>xlnR</em> and{" "}
          <em>araR</em> genes were used for expression constructs, and
          target-specific homology arms were prepared for the deletion strategy.
        </p>
        <p>
          The expression framework was pNAT-LoxP-rDNA, documented by OUC-China
          2025 <Cite k="ouc2025pnat" />. The supplied backbone sequence was
          5,455 base pairs (bp) long, and its ribosomal DNA (rDNA) regions
          provided the homology framework for the integration design. The
          fl4a-hpt-loxp backbone was used to prepare transcription-factor
          knockout donors.
        </p>
      </>
    ),
  },
];

const mayEntries: NotebookEntry[] = [
  {
    id: "notebook-may-1-7",
    date: "May 1–7",
    title: "Target amplification and agarose gel electrophoresis",
    content: (
      <p>
        Endogenous targets were amplified from A08 genomic DNA by polymerase
        chain reaction (PCR). Amplification products were examined by agarose
        gel electrophoresis before purification and assembly.
      </p>
    ),
  },
  {
    id: "notebook-may-8-14",
    date: "May 8–14",
    title: "Vector digestion, DNA purification, and gel extraction",
    content: (
      <p>
        The expression backbone was prepared by restriction digestion and
        examined on agarose gels. PCR products and vector fragments were
        purified, and the required bands were recovered by gel extraction. The
        prepared inserts and backbone were then used for construct assembly.
      </p>
    ),
  },
  {
    id: "notebook-may-15-21",
    date: "May 15–21",
    title: "DH5α heat-shock transformation and screening",
    content: (
      <p>
        Assembly products were introduced into chemically competent{" "}
        <em>Escherichia coli</em> DH5α by heat shock. Candidates were selected
        on Luria–Bertani (LB) agar containing 100 μg/mL ampicillin and incubated
        at 37 °C for 12–16 h. Colonies were screened by PCR, and the screening
        products were examined on agarose gels before clones were selected for
        plasmid preparation.
      </p>
    ),
  },
  {
    id: "notebook-may-22-31",
    date: "May 22–31",
    title: "Plasmid preparation",
    content: (
      <p>
        Screened DH5α clones were cultured, and plasmid DNA was extracted for
        A08 transformation. The extraction kit and operating steps are described
        in the corresponding Protocol.
      </p>
    ),
  },
];

const juneEntries: NotebookEntry[] = [
  {
    id: "notebook-jun-1-7",
    date: "June 1–7",
    title: "Regulator knockout-donor preparation",
    content: (
      <>
        <p>
          Target-specific homology arms were combined with the fl4a-hpt-loxp
          knockout backbone to prepare donors for disruption of <em>xlnR</em>{" "}
          and <em>araR</em>. The replacement interval was flanked by sequences
          homologous to the target locus. The HPT label identified the
          hygromycin B phosphotransferase resistance marker used in the
          selection design.
        </p>
        <p>
          The knockout approach complemented the overexpression strategy:
          deletion tested the consequences of regulator loss, whereas
          overexpression tested whether increasing regulator expression improved
          production.
        </p>
      </>
    ),
  },
  {
    id: "notebook-jun-8-15",
    date: "June 8–15",
    title: "A08 transformation and transformant screening",
    content: (
      <>
        <p>
          Protoplast transformation was used to obtain the regulator-engineering
          strains. The deletion series comprised WT, Δ<em>xlnR</em>, Δ
          <em>araR</em>, and Δ<em>xlnR</em> Δ<em>araR</em>. The overexpression
          series comprised WT, OE-XlnR, OE-AraR, and OE-XlnR+AraR.
        </p>
        <p>
          Deletion transformants were screened on yeast extract–peptone–dextrose
          (YPD) agar containing 100 μg/mL hygromycin B, whereas overexpression
          transformants were screened on YPD agar containing 100 μg/mL
          nourseothricin (NAT). Plates were incubated at 28 °C for 24 h. For the
          overexpression strains, single colonies were transferred to 5 mL
          NAT-free YPD broth and cultured at 28 °C and 180 rpm for 24 h.
          Candidate engineered strains were examined by polymerase chain
          reaction (PCR), followed by agarose gel electrophoresis. Amplification
          patterns were compared with the corresponding control strains.
        </p>
      </>
    ),
  },
  {
    id: "notebook-jun-16-23",
    date: "June 16–23",
    title: "Pentose growth of regulator-deletion strains",
    content: (
      <>
        <p>
          WT and the deletion strains were compared on xylose and arabinose
          using OD₆₀₀ time courses. On xylose, the double-deletion strain showed
          the greatest growth impairment, and Δ<em>xlnR</em> showed a larger
          reduction than Δ<em>araR</em>. On arabinose, Δ<em>araR</em> and the
          double-deletion strain were strongly impaired, whereas Δ<em>xlnR</em>{" "}
          remained closer to WT.
        </p>
        <p>
          The sugar-dependent differences supported evaluating AraR and XlnR
          separately as well as in combination.
        </p>
      </>
    ),
  },
  {
    id: "notebook-jun-24-30",
    date: "June 24–30",
    title: "Growth of regulator-overexpression strains",
    content: (
      <p>
        Growth was compared among WT, OE-XlnR, OE-AraR, and OE-XlnR+AraR. The
        four-strain series was retained for the production experiments so that
        single-regulator interventions could be compared with the combination.
      </p>
    ),
  },
];

const julyEntries: NotebookEntry[] = [
  {
    id: "notebook-jul-1-7",
    date: "July 1–7",
    title: "PMA production by regulator-overexpression strains",
    content: (
      <>
        <p>
          The four strains were compared across the five glucose–xylose
          formulations. OE-XlnR+AraR had the highest mean PMA concentration in
          each xylose-containing formulation. In the xylose-only comparison, its
          mean was 13.86 g/L, compared with 10.04 g/L for the matched A08
          control, an increase of approximately 38.0%.
        </p>
        <p>
          The response was stronger in xylose-containing groups than on glucose
          alone. Based on the results of this experiment, we wanted to
          investigate its performance in the hydrolysate of corn straw.
        </p>
      </>
    ),
  },
  {
    id: "notebook-jul-8-14",
    date: "July 8–14",
    title: "PMA production in corn-straw hydrolysate",
    content: (
      <>
        <p>
          The corn-stover hydrolysate was treated with 0.3% (w/v) activated
          carbon at 90 °C with shaking for 1 h, followed by passage through the
          hardware group’s ion-exchange columns to remove excess ammonia; the pH
          was adjusted to the fermentation starting condition, and the
          hydrolysate was then concentrated. The four regulator-comparison
          strains were fermented using the treated corn-stover hydrolysate. Mean
          PMA concentration was 18.63 g/L for OE-XlnR+AraR and 15.87 g/L for WT,
          an increase of approximately 17.4%.
        </p>
        <p>
          OE-XlnR+AraR again had the highest mean. It was selected as the
          recipient background for the PYC module.
        </p>
      </>
    ),
  },
  {
    id: "notebook-jul-15-21",
    date: "July 15–21",
    title: "RNA extraction and reverse transcription",
    content: (
      <>
        <p>
          WT and OE-XlnR+AraR were cultured in 50 mL yeast extract–peptone
          medium in which xylose replaced glucose. Cultures were incubated at 28
          °C and 180 rpm for 24 h. A 5 mL aliquot was centrifuged at 8,000 rpm
          for 5 min, and the collected cells were ground under liquid nitrogen.
        </p>
        <p>
          Ribonucleic acid (RNA) was extracted with the SparkJade kit, catalog
          no. AC0305. Complementary DNA (cDNA) was prepared with the Vazyme
          reverse-transcription kit for the subsequent transcript comparison.
        </p>
      </>
    ),
  },
  {
    id: "notebook-jul-22-28",
    date: "July 22–28",
    title: "RT-qPCR of metabolic targets",
    content: (
      <>
        <p>
          Reverse-transcription quantitative PCR (RT-qPCR) compared the
          xylose-metabolism-related targets labeled <em>XYR</em> (g2474.t1),{" "}
          <em>XDH</em> (g10080.t1), <em>XKI</em> (g15854.t1), and <em>XI</em>{" "}
          (g15160.t1), together with the PMA-synthesis-associated target labeled{" "}
          <em>PMA</em>.
        </p>
        <p>
          Reactions used Vazyme ChamQ Universal SYBR qPCR Master Mix on a
          Rotor-Gene Q instrument, with <em>actin</em> as the reference gene and
          35 amplification cycles. Each reaction contained 0.4 μL each of the 10
          μM forward and reverse primer working solutions. Each sample was
          measured four times. Amplification and melting curves were analyzed
          using Rotor-Gene Q software, version 2.0.2, to obtain threshold-cycle
          (Ct) values.
        </p>
      </>
    ),
  },
  {
    id: "notebook-jul-29-31",
    date: "July 29–31",
    title: "Relative-expression comparison",
    content: (
      <>
        <p>
          Relative expression was calculated using the 2<sup>−ΔΔCt</sup> method.
          For each target, ΔCt was the target Ct minus the <em>actin</em> Ct,
          and ΔΔCt was the engineered-strain ΔCt minus the WT reference ΔCt{" "}
          <Cite k="livak2001relative" />. Each target was displayed relative to
          a WT value of 100%.
        </p>
        <p>
          All five targets had higher mean relative expression in OE-XlnR+AraR,
          approximately 1.59- to 1.76-fold of WT. The transcript increases
          accompanied the higher PMA production observed in the fermentation
          comparisons.
        </p>
        <p>
          The next intervention addressed precursor supply. PYC converts
          pyruvate to oxaloacetate, which can be reduced to malate. A published
          metabolome and genome-scale model study in{" "}
          <em>Aureobasidium pullulans</em> supported investigating <em>pyc</em>{" "}
          for PMA production <Cite k="feng2018pycmodel" />. This literature and
          the Model team's prioritization informed the donor comparison.
        </p>
      </>
    ),
  },
];

const augustEntries: NotebookEntry[] = [
  {
    id: "notebook-aug-1-7",
    date: "August 1–7",
    title: "PYC donor sequences and expression constructs",
    content: (
      <p>
        Four candidates were prepared within the common pNAT-LoxP-rDNA
        framework. Native A08 <em>pyc</em> and an{" "}
        <em>Aureobasidium thailandense</em> ZW03-4 candidate were two of them. A
        third was from <em>Yarrowia lipolytica</em> <Cite k="ncbiylpyc" />. The
        fourth was <em>Saccharomyces cerevisiae PYC1</em>{" "}
        <Cite k="ncbiscpyc1" />. The three heterologous sources were labeled ZW,
        YL, and SC, respectively. The native A08 target was amplified from A08
        genomic DNA.
      </p>
    ),
  },
  {
    id: "notebook-aug-8-14",
    date: "August 8–14",
    title: "PYC construct assembly and clone screening",
    content: (
      <p>
        PYC-encoding fragments were assembled with the prepared backbone. The
        products were introduced into DH5α by heat shock, followed by ampicillin
        selection and colony-PCR screening. Screening products were examined on
        agarose gels, and plasmid DNA was extracted from selected clones for A08
        transformation.
      </p>
    ),
  },
  {
    id: "notebook-aug-15-21",
    date: "August 15–21",
    title: (
      <>
        Native A08 <em>pyc</em> transformation attempts
      </>
    ),
    content: (
      <p>
        Electroporation and protoplast transformation were both attempted with
        the native A08 <em>pyc</em> expression construct. Neither approach
        yielded an established, verified native-<em>pyc</em> overexpression
        strain. This candidate was therefore not included in the fermentation
        comparison of the obtained strains.
      </p>
    ),
  },
  {
    id: "notebook-aug-22-28",
    date: "August 22–28",
    title: "Establishing PYC strains in the dual-regulator background",
    content: (
      <p>
        The YL, SC, and ZW expression constructs were introduced into
        OE-XlnR+AraR by protoplast transformation. The resulting groups combined
        the two-regulator background with a heterologous PYC-encoding gene.
      </p>
    ),
  },
  {
    id: "notebook-aug-29-31",
    date: "August 29–31",
    title: "Selecting the adhesive application",
    content: (
      <>
        <p>
          An adhesive application was selected following discussions with
          instructor Ya Liu. Published PMA–dopamine research provided the
          coupling reference <Cite k="Tang2020PMLADA" />.
        </p>
        <p>
          The preparation used PMA-containing fermentation broth after cell
          removal, without a separate PMA-isolation step before reaction. This
          approach tested whether the fermentation output could be used directly
          as a material precursor.
        </p>
      </>
    ),
  },
];

const septemberEntries: NotebookEntry[] = [
  {
    id: "notebook-sep-1-7",
    date: "September 1–7",
    title: "Combined-engineering groups for fermentation",
    content: (
      <>
        <p>
          The fermentation comparison included the YL, SC, and ZW groups in the
          shared OE-XlnR+AraR background, with WT as the unmodified A08
          reference. SC carried <em>S. cerevisiae PYC1</em>; YL and ZW carried
          the corresponding donor candidates. The labels At and ZW in the source
          plot referred to the same <em>A. thailandense</em> ZW03-4 donor.
        </p>
        <p>
          This series compared the combined-engineering strategies with WT and
          with one another.
        </p>
      </>
    ),
  },
  {
    id: "notebook-sep-8-14",
    date: "September 8–14",
    title: "Fermentation of PYC-engineered strains",
    content: (
      <>
        <p>
          SC had the highest recorded mean among the tested donor groups and was
          selected as the best-performing combination in this comparison.
        </p>
      </>
    ),
  },
  {
    id: "notebook-sep-15-17",
    date: "September 15–17",
    title: "Broth preparation, activation, and dopamine addition",
    content: (
      <>
        <p>
          Cells were removed from PMA-containing fermentation broth before
          adhesive preparation. Routine batches used 200 mL broth, and a larger
          batch used 1 L. We used 200 mL of fermentation broth for the first
          time, and the concentration of the product in it was 25.81 g/L.
        </p>
        <p>
          Reagent inputs were calculated from the estimated molar amount of PMA
          carboxyl groups (–COOH). Dopamine was added at a dopamine:carboxyl
          molar ratio of 1:1. The coupling reagents,
          1-ethyl-3-(3-dimethylaminopropyl)carbodiimide hydrochloride (EDC·HCl)
          and N-hydroxysuccinimide (NHS), were each added at two molar
          equivalents relative to these carboxyl groups. The intended reaction
          coupled PMA carboxyl groups to the dopamine amino group; the feed
          ratio was not a measured degree of grafting.
        </p>
        <p>
          Activation was carried out for 1 h on a temperature-controlled
          magnetic stirrer with protection from light. Dopamine was then added,
          followed by a further 24 h of stirring under light-protected
          conditions. The broth-derived formulation was designated PMA–dopamine
          (PMA-DA).
        </p>
      </>
    ),
  },
  {
    id: "notebook-sep-18-21",
    date: "September 18–21",
    title: "Dialysis of the reaction mixture",
    content: (
      <p>
        Dialysis tubing was boiled for 30 min before use. The reaction mixture
        was dialyzed against water for 48 h, with the external water changed at
        least every 12 h. The dialyzed formulation was collected for shaping and
        freeze-drying.
      </p>
    ),
  },
  {
    id: "notebook-sep-22-28",
    date: "September 22–28",
    title: "Shaping, prefreezing, freeze-drying, and reconstitution",
    content: (
      <>
        <p>
          The dialyzed formulation was poured into small dishes, prefrozen at
          −80 °C for 1 h, and freeze-dried for 48 h. A gray solid was recovered.
        </p>
        <p>
          For adhesive testing, 0.5 g of the dried material was added to 1 mL
          water.
        </p>
      </>
    ),
  },
  {
    id: "notebook-sep-29-30",
    date: "September 29–30",
    title: "Mechanical adhesion testing",
    content: (
      <p>
        Bonded specimens were prepared using glass slides, stainless-steel
        plates, and <em>ex vivo</em> porcine skin. A CTM2050S universal testing
        machine recorded load–displacement responses.
      </p>
    ),
  },
];

const octoberEntries: NotebookEntry[] = [
  {
    id: "notebook-oct-1-3",
    date: "October 1–3",
    title: "Concentration and functionalization-series comparisons",
    content: (
      <p>
        Adhesion was compared using formulations with different material
        concentrations and dopamine inputs to examine how the preparation
        affected performance.
      </p>
    ),
  },
  {
    id: "notebook-oct-4-5",
    date: "October 4–5",
    title: "Adhesion testing under aqueous conditions",
    content: (
      <p>
        Additional adhesion tests were carried out under aqueous conditions to
        examine performance in a wet environment. These experiments extended the
        initial substrate comparisons to the proposed wet-interface application.
      </p>
    ),
  },
  {
    id: "notebook-oct-6-9",
    date: "October 6–9",
    title: "cell-compatibility experiments",
    content: (
      <p>
        L929 cells were used to examine the cellular response to the adhesive
        formulation, adding a cell-based evaluation to the mechanical tests.
      </p>
    ),
  },
  {
    id: "notebook-oct-10-13",
    date: "October 10–13",
    title: "Data analysis and preparation of the Wiki materials",
    content: (
      <p>
        Growth curves, PMA-production comparisons, transcript measurements,
        cloning gels, transformation outcomes, and material-testing records were
        compiled. Scientific names, gene symbols, units, strain labels, and
        figure descriptions were checked across the Wiki pages.
      </p>
    ),
  },
  {
    id: "notebook-oct-14-15",
    date: "October 14–15",
    title: "Documentation endpoint",
    content: (
      <p>
        No additional experiments or repeat measurements were performed during
        this interval. October 15, 2026, was the cutoff for this notebook.
      </p>
    ),
  },
];

export const sections: ArticleSection[] = [
  {
    id: "notebook-february-2026",
    title: "February 2026",
    content: <NotebookTimeline entries={februaryEntries} />,
  },
  {
    id: "notebook-march-2026",
    title: "March 2026",
    content: <NotebookTimeline entries={marchEntries} />,
  },
  {
    id: "notebook-april-2026",
    title: "April 2026",
    content: <NotebookTimeline entries={aprilEntries} />,
  },
  {
    id: "notebook-may-2026",
    title: "May 2026",
    content: <NotebookTimeline entries={mayEntries} />,
  },
  {
    id: "notebook-june-2026",
    title: "June 2026",
    content: <NotebookTimeline entries={juneEntries} />,
  },
  {
    id: "notebook-july-2026",
    title: "July 2026",
    content: <NotebookTimeline entries={julyEntries} />,
  },
  {
    id: "notebook-august-2026",
    title: "August 2026",
    content: <NotebookTimeline entries={augustEntries} />,
  },
  {
    id: "notebook-september-2026",
    title: "September 2026",
    content: <NotebookTimeline entries={septemberEntries} />,
  },
  {
    id: "notebook-october-2026",
    title: "October 2026",
    content: <NotebookTimeline entries={octoberEntries} />,
  },
];

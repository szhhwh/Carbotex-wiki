import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ArticlePage } from "../components/article/ArticlePage";
import type { ArticleSection } from "../components/article/ArticlePage";
import { MathInline } from "../components/article/Math";
import styles from "./model-shared.module.css";
const sections: ArticleSection[] = [
  {
    id: "ov-en-sec-1",
    title: "Model overview",
    content: (
      <>
        <p>
          To turn agricultural straw sugars into a dopamine-functionalized
          poly(β-L-malic acid) (PMA, also abbreviated PMLA; PMA–DA) underwater bioadhesive,
          our dry-lab framework resolves three core questions along the
          biomanufacturing
          chain: <strong>which gene limits PMA synthesis in an unannotated fungus</strong>,{" "}
          <strong>how to prevent protocol and measurement errors across multi-stage experiments</strong>, and{" "}
          <strong>why excess dopamine dosing lowers polymer grafting efficiency</strong>.
        </p>
        <ul aria-label="Model sub-pages" className={styles.hubGrid}>
          <li className={styles.hubItem}>
            <Link to="/model/gem" className={styles.hubCard}>
              <div>
                <span className={styles.hubStage}>01 · UPSTREAM CHASSIS</span>
                <strong className={styles.hubTitle}>
                  Metabolic Model (GEM)
                </strong>
                <span className={styles.hubDesc}>
                  De novo <em>A. melanogenum</em> A08 metabolic reconstruction
                  &amp; dual-metric target prioritization for PMA biosynthesis
                </span>
              </div>
              <span className={styles.hubCta}>
                <span>Open Metabolic Model</span>
                <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
              </span>
            </Link>
          </li>
          <li className={styles.hubItem}>
            <Link to="/model/software" className={styles.hubCard}>
              <div>
                <span className={styles.hubStage}>02 · MIDSTREAM WORKBENCH</span>
                <strong className={styles.hubTitle}>WetFlow Workbench</strong>
                <span className={styles.hubDesc}>
                  Researcher-supervised agent workbench enforcing project
                  isolation, unit checks &amp; stage gates
                </span>
              </div>
              <span className={styles.hubCta}>
                <span>Open WetFlow Workbench</span>
                <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
              </span>
            </Link>
          </li>
          <li className={styles.hubItem}>
            <Link to="/model/md" className={styles.hubCard}>
              <div>
                <span className={styles.hubStage}>03 · DOWNSTREAM COUPLING</span>
                <strong className={styles.hubTitle}>
                  Molecular Dynamics (MD)
                </strong>
                <span className={styles.hubDesc}>
                  Explicit-solvent all-atom simulations of pre-reaction
                  PMA–dopamine coupling across five ratios
                </span>
              </div>
              <span className={styles.hubCta}>
                <span>Open Molecular Dynamics</span>
                <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
              </span>
            </Link>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "ov-en-sec-2",
    title: "1. A08 Genome-Scale Metabolic Model & Target Prioritization",
    content: (
      <>
        <p>
          Starting from the unannotated genome of{" "}
          <em>Aureobasidium melanogenum</em> A08, we reconstructed its de novo
          genome-scale metabolic network and calibrated enzyme subcellular
          localization to restore the native cytosolic malate pathway (raising
          theoretical PMA flux from 1.430 to 1.500 mmol·gDW<sup>−1</sup>·h
          <sup>−1</sup>). Dual-metric screening combining FSEOF overexpression
          sensitivity with homologous isozyme-group knockouts across 1,102
          candidate enzyme groups isolated cytosolic{" "}
          <strong>pyruvate carboxylase (PYC)</strong> as the sole
          non-compensable bottleneck (overexpression Rank 4, slope{" "}
          <MathInline tex="0.687" />; knockout Rank 1,{" "}
          <MathInline tex={String.raw`-58.6\%`} /> flux loss), providing
          genome-scale mechanistic support for our PYC overexpression
          engineering.
        </p>
        <div className={styles.sectionAction}>
          <Link to="/model/gem" className={styles.actionBtn}>
            <span>Read Full Metabolic Model (GEM) Documentation</span>
            <ArrowRight size={18} strokeWidth={2.4} aria-hidden="true" />
          </Link>
        </div>
      </>
    ),
  },
  {
    id: "ov-en-sec-3",
    title: "2. WetFlow: Modular Agent Workbench for Biological Research",
    content: (
      <>
        <p>
          To prevent cross-project protocol mix-ups and unverified data writes
          when using general-purpose coding agents, we built{" "}
          <strong>WetFlow</strong>, a researcher-supervised laboratory workbench
          on the Cordis modular plugin framework. WetFlow enforces service-layer
          project retrieval isolation, physical unit validation, and human
          stage-gate approval across six experimental stages while supporting
          hot-swappable domain plugins for adhesive recipe verification and
          WEAVE classroom lesson planning—achieving{" "}
          <strong>93.3% (28/30)</strong> accuracy on our biological-evidence
          benchmark versus <strong>70.0% (21/30)</strong> for the OpenCode
          baseline.
        </p>
        <div className={styles.sectionAction}>
          <Link to="/model/software" className={styles.actionBtn}>
            <span>Read Full WetFlow Workbench Documentation</span>
            <ArrowRight size={18} strokeWidth={2.4} aria-hidden="true" />
          </Link>
        </div>
      </>
    ),
  },
  {
    id: "ov-en-sec-4",
    title:
      "3. All-Atom Molecular Dynamics (MD) Simulation of PMA–Dopamine Coupling",
    content: (
      <>
        <p>
          In downstream EDC/NHS coupling of PMA with dopamine, published
          grafted dopamine content peaks at an equimolar{" "}
          <strong>1.00:1 molar ratio (21.3 wt%)</strong> but drops to{" "}
          <strong>19.2 wt%</strong> at <strong>1.25:1</strong>. Using
          explicit-solvent all-atom OpenMM simulations across five molar ratios,
          we decoupled spatial proximity (
          <MathInline tex={String.raw`d_{\text{N–C}} < 4.0\text{ Å}`} />) from
          Bürgi–Dunitz nucleophilic attack orientation (
          <MathInline tex={String.raw`95^\circ\text{–}125^\circ`} />
          ). Under the <MathInline tex={String.raw`50\%`} />
          -activation main model, reaction-compatible contacts plunged from{" "}
          <strong>25.2%</strong> at <MathInline tex="1.00" /> to{" "}
          <strong>5.2%</strong> at <MathInline tex="1.25" /> as local
          hydrogen-bond candidate geometry and catechol angular projections
          retained excess dopamine in shallow-angle (
          <MathInline tex={String.raw`<60^\circ`} />) side-on
          association—providing a conditional pre-reaction hypothesis for the{" "}
          <MathInline tex="1:1" /> dosing optimum while identifying carboxyl
          activation as a coupled variable for next-stage verification.
        </p>
        <div className={styles.sectionAction}>
          <Link to="/model/md" className={styles.actionBtn}>
            <span>Read Full Molecular Dynamics (MD) Documentation</span>
            <ArrowRight size={18} strokeWidth={2.4} aria-hidden="true" />
          </Link>
        </div>
      </>
    ),
  },
];

export function Model() {
  return (
    <ArticlePage
      title="Model"
      titleId="model-overview"
      intro={<span id="body-overview-en"><span id="pane-overview" /></span>}
      heroImage={{
        src: "https://static.igem.wiki/teams/6147/wiki/model-header/hero-model-overview.avif",
        alt: "MODEL",
      }}
      sections={sections}
    />
  );
}

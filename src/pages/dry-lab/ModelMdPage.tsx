import { ArticlePage } from "../../components/article/ArticlePage";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { sections } from "./ModelMdContent";
import sharedStyles from "./model-shared.module.css";

export function ModelMdPage() {
  return (
    <ArticlePage
      title="Molecular Dynamics"
      titleId="body-md-en"
      heroImage={{
        src: "https://static.igem.wiki/teams/6147/wiki/model-header/hero-molecular-dynamics.avif",
        alt: "MOLECULAR DYNAMICS",
      }}
      intro={
        <div className={sharedStyles.backBar}>
          <Link to="/model" className={sharedStyles.backBtn}>
            <ArrowLeft size={16} strokeWidth={2.4} aria-hidden="true" />
            <span>Back to Model Overview</span>
          </Link>
          <span className={sharedStyles.stagePill}>
            03 · DOWNSTREAM COUPLING · MOLECULAR DYNAMICS (MD)
          </span>
        </div>
      }
      sections={sections}
      references
      referencesAnchorId="md-en-references"
      referenceOrder={[
        "Tang2020PMLADA",
        "Eastman2017OpenMM",
        "Jakalian2002AM1BCC",
        "Rodriguez2023Approach",
      ]}
    />
  );
}

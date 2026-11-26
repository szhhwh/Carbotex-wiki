import { ArticlePage } from "../../components/article/ArticlePage";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { sections } from "./ModelSoftwareContent";
import sharedStyles from "./model-shared.module.css";

export function ModelSoftwarePage() {
  return (
    <ArticlePage
      title="WetFlow"
      titleId="body-wetflow-en"
      heroImage={{
        src: "https://static.igem.wiki/teams/6147/wiki/model-header/hero-wetflow.avif",
        alt: "WETFLOW",
      }}
      intro={
        <div className={sharedStyles.backBar}>
          <Link to="/model" className={sharedStyles.backBtn}>
            <ArrowLeft size={16} strokeWidth={2.4} aria-hidden="true" />
            <span>Back to Model Overview</span>
          </Link>
          <span className={sharedStyles.stagePill}>
            02 · MIDSTREAM WORKBENCH · WETFLOW AGENT
          </span>
        </div>
      }
      sections={sections}
      references
      referenceOrder={["Tang2020PMLADA", "Shi2026Cordis", "Yao2023ReAct"]}
    />
  );
}

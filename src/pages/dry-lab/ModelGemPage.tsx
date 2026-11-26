import { ArticlePage } from "../../components/article/ArticlePage";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { sections, referenceOrder } from "./ModelGemContent";
import sharedStyles from "./model-shared.module.css";

export function ModelGemPage() {
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

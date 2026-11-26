import { ArticlePage } from "../../components/article/ArticlePage";
import { sections } from "./ModelContent";

export function ModelPage() {
  return (
    <ArticlePage
      title="Model"
      titleId="model-overview"
      intro={
        <span id="body-overview-en">
          <span id="pane-overview" />
        </span>
      }
      heroImage={{
        src: "https://static.igem.wiki/teams/6147/wiki/model-header/hero-model-overview.avif",
        alt: "MODEL",
      }}
      sections={sections}
    />
  );
}

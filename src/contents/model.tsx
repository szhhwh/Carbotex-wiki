import {
  ArticleFramework,
  ArticleNote,
  ArticlePage,
  type ArticleSection,
} from "../components/article/ArticlePage";
import { Figure } from "../components/media/Figure";
import { MathBlock, MathInline } from "../components/article/Math";
import { VideoEmbed } from "../components/media/VideoEmbed";

// Component preview. The example media comes from Heidelberg 2025; it is not
// OUC-Haide project evidence and should be replaced with team-owned material.
const sections: ArticleSection[] = [
  {
    id: "model-overview",
    title: "Model overview",
    eyebrow: "The reasoning first",
    content: (
      <>
        <p>
          Models can help a team describe a system, test assumptions and
          interpret results. A model page should explain the question, inputs,
          method and limits in an order that readers can follow.
        </p>
        <ArticleNote label="Template preview">
          <p>
            The mathematical expression, figure and video below demonstrate the
            page components. They are examples, not OUC-Haide findings.
          </p>
        </ArticleNote>
      </>
    ),
  },
  {
    id: "model-visuals",
    title: "Equations & figures",
    eyebrow: "Show the mechanism",
    content: (
      <>
        <p>
          Inline math such as <MathInline tex="K_d = k_{off}/k_{on}" /> can sit
          within an explanation. A longer equation can be displayed with a label
          and number:
        </p>
        <MathBlock
          label="Example transcription dynamics"
          tex="\frac{d[mRNA]}{dt} = k_{tx}\,[DNA] - \delta_{mRNA}\,[mRNA]"
          tag="(1)"
        />
        <Figure
          src="https://static.igem.wiki/teams/5775/images/model/plots/free-energy-profile.svg"
          alt="Example free energy profile along a pulling coordinate"
          caption="Example free energy profile from Heidelberg 2025; shown here only to preview image and caption layout."
          captionPrefix="Figure 1."
          intrinsicWidth={758}
          intrinsicHeight={519}
          maxWidth="720px"
        />
      </>
    ),
  },
  {
    id: "model-details",
    title: "Expandable details",
    eyebrow: "For readers who want more",
    content: (
      <>
        <p>
          Keep the main argument visible and place supporting assumptions,
          derivations or parameter tables in expandable panels when they would
          interrupt the reading flow.
        </p>
        <ArticleFramework title="Underlying assumptions">
          <p>
            Describe each assumption, its source, and its effect on the
            interpretation of the model.
          </p>
        </ArticleFramework>
        <ArticleFramework title="Parameters and validation">
          <p>
            Use this space for verified parameter tables, checks against data,
            and limitations.
          </p>
        </ArticleFramework>
      </>
    ),
  },
  {
    id: "model-motion",
    title: "Motion & explanation",
    eyebrow: "A closer look",
    content: (
      <>
        <p>
          Video can support a model explanation when a static image cannot show
          the change over time. Include a descriptive title and caption.
        </p>
        <VideoEmbed
          src="https://video.igem.org/videos/watch/qD5GdhXi3zBT9mVihrsnL7"
          title="Example coarse-grained molecular dynamics simulation from Heidelberg 2025"
          caption="Example simulation from Heidelberg 2025; shown only to preview the video layout."
          captionPrefix="Video 1."
          maxWidth="720px"
          embedParams={{ p2p: false, warningTitle: false }}
        />
      </>
    ),
  },
];

export function Model() {
  return <ArticlePage title="Model" sections={sections} />;
}

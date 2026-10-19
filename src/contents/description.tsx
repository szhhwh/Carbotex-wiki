import {
  ArticleNote,
  ArticlePage,
  type ArticleSection,
} from "../components/article/ArticlePage";
import { Cite } from "../components/article/References";

// This page demonstrates the article template with editorial prompts. Replace
// the prompts with verified team content before the wiki is published.
const sections: ArticleSection[] = [
  {
    id: "overview",
    title: "The story at a glance",
    eyebrow: "Start with the question",
    content: (
      <>
        <p>
          A strong project description lets a reader understand the problem, why
          it matters, and what the team set out to do before introducing
          technical detail. Open with the real context that motivated the work.
        </p>
        <ArticleNote label="Writing cue">
          <p>
            State the problem in one clear paragraph, then connect it to the
            people or systems it affects. Use your team’s own evidence and
            sources.
          </p>
        </ArticleNote>
        <p>
          The sections below show how long-form text, supporting material and
          citations can share a consistent reading rhythm. They are editorial
          prompts for this template, not claims about the OUC-Haide project.
        </p>
      </>
    ),
  },
  {
    id: "motivation",
    title: "Why this direction",
    eyebrow: "Context & motivation",
    content: (
      <>
        <p>
          Explain the inspiration behind the project and the reasons for
          choosing this particular approach. Introduce relevant scientific
          background in the order a new reader needs it.
        </p>
        <h3>Questions worth answering</h3>
        <ul>
          <li>
            What problem did the team observe, and where did that information
            come from?
          </li>
          <li>
            Which alternatives were considered, and what shaped the choice?
          </li>
          <li>
            How does the proposed work connect to existing research or practice?
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "approach",
    title: "From idea to approach",
    eyebrow: "Make the logic visible",
    content: (
      <>
        <p>
          Give readers a concise summary of the project’s goals and objectives.
          A diagram, process image or short table can sit alongside the text
          when it makes the reasoning easier to follow. Use the shared Figure
          component for images, with a descriptive alternative text and caption.
        </p>
        <ArticleNote label="Reading principle">
          <p>
            Let headings carry the main argument. Use figures for relationships
            that are difficult to explain in prose, and put source details close
            to the claim they support.
          </p>
        </ArticleNote>
      </>
    ),
  },
  {
    id: "documentation",
    title: "Document the evidence",
    eyebrow: "Traceable sources",
    content: (
      <>
        <p>
          Cite relevant research and distinguish the team’s own results from
          published work. The following paragraph only previews citation
          formatting and is unrelated to this project.
        </p>
        <p>
          In a published example, Cas9 was programmed with a guide RNA to cut a
          chosen DNA sequence <Cite k="jinek2012" />. Later work demonstrated
          genome engineering in human cells <Cite k="mali2013" />. The sources
          are collected automatically at the end of the article.
        </p>
      </>
    ),
  },
];

export function Description() {
  return (
    <ArticlePage
      chapter="Project / Description"
      title="Description"
      lead="A clear route through the question, the motivation and the evidence behind a project."
      sections={sections}
      references
    />
  );
}

import {
  ArticlePage,
  type ArticleSection,
} from "../components/article/ArticlePage";
import styles from "./template-pages.module.css";
import { TemplatePageFrame } from "./template-pages";

const sections: ArticleSection[] = [
  {
    id: "bronze-medal-criterion",
    title: "Bronze Medal Criterion #3",
    content: (
      <div className={styles.requirementCard}>
        <p>
          Visit the{" "}
          <a href="https://competition.igem.org/judging/awards/medals">
            Medals page
          </a>{" "}
          for more information.
        </p>
      </div>
    ),
  },
  {
    id: "page-contents",
    title: "What Should this Page Contain?",
    content: (
      <>
        <div className={styles.promptCard}>
          <p>
            Teams must document their contribution and explain why their effort
            is a contribution to fellow iGEMers. There is no single definition
            of what a contribution should be. We invite teams to be creative and
            generous in the knowledge, data or tools they may provide to the
            community.
          </p>
          <p>A few examples of contributions are:</p>
        </div>
        <ul className={styles.checklist}>
          <li>
            Creating a new BioBrick part or significantly improving an existing
            one in the iGEM Registry.
          </li>
          <li>
            Developing software, tools, or resources that can considerably
            assist future iGEM teams.
          </li>
          <li>
            Sharing optimized protocols, experimental techniques, or
            methodologies.
          </li>
          <li>
            Any other contributions that provide a clear benefit to future iGEM
            teams.
          </li>
        </ul>
      </>
    ),
  },
];

export function Contribution() {
  return (
    <TemplatePageFrame>
      <ArticlePage title="Contribution" sections={sections} />
    </TemplatePageFrame>
  );
}

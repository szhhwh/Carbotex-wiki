import {
  ArticlePage,
  type ArticleSection,
} from "../components/article/ArticlePage";
import {
  IhpParts,
  type StoryMeta,
} from "../components/human-practices/IhpContent";
import { TraceCycleProvider } from "../components/human-practices/TraceCycle";
import {
  collaborators,
  ihpSections,
  stakeholderGroups,
} from "../data/ihp-content";
import styles from "./human-practices.module.css";

const stories = new Map<string, StoryMeta>();

for (const group of stakeholderGroups) {
  for (const stakeholder of group.stakeholders) {
    stories.set(stakeholder.storyHref.replace(/^#/, ""), {
      group: group.title,
      impact: stakeholder.impact,
    });
  }
}

const sections: ArticleSection[] = ihpSections.map((section) => ({
  id: section.id,
  title: section.title,
  content: (
    <IhpParts
      parts={section.parts}
      groups={stakeholderGroups}
      collaborators={collaborators}
      stories={stories}
      labelLevel={3}
      traceFallbackTitle={section.title}
    />
  ),
  subsections: section.subsections.map((subsection) => ({
    id: subsection.id,
    title: subsection.title,
    content: (
      <IhpParts
        parts={subsection.parts}
        groups={stakeholderGroups}
        collaborators={collaborators}
        stories={stories}
        labelLevel={4}
        traceFallbackTitle={subsection.title}
      />
    ),
  })),
}));

export function HumanPractices() {
  return (
    <div className={styles.page}>
      <TraceCycleProvider>
        <ArticlePage
          title="Integrated Human Practices"
          heroImage={{
            src: "https://static.igem.wiki/teams/6147/wiki/igem-collage-1.webp",
            alt: "Collage of OUC-Haide team members during stakeholder meetings, laboratory work, and iGEM presentations.",
          }}
          sections={sections}
          references
          stickyMobileOutline
        />
      </TraceCycleProvider>
    </div>
  );
}

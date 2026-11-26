import { type ArticleSection } from "../../components/article/ArticlePage";
import {
  IhpParts,
  type StoryMeta,
} from "../../components/human-practices/IhpContent";
import {
  collaborators,
  ihpSections,
  stakeholderGroups,
} from "../../data/ihp-content.data";

const stories = new Map<string, StoryMeta>();

for (const group of stakeholderGroups) {
  for (const stakeholder of group.stakeholders) {
    stories.set(stakeholder.storyHref.replace(/^#/, ""), {
      group: group.title,
      impact: stakeholder.impact,
    });
  }
}

export const sections: ArticleSection[] = ihpSections.map((section) => ({
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

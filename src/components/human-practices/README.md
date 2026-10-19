# IHP components

`ArticleSection.subsections` supplies direct child sections. `ArticlePage`
renders their numbered titles as H3 headings and uses their IDs for nested
outline links and scroll highlighting. Numeric prefixes are omitted only in
the child outline labels. Existing flat sections remain supported.

```tsx
import {
  ArticlePage,
  type ArticleSection,
} from "../components/article/ArticlePage";
import { StakeholderNavigator } from "../components/human-practices/StakeholderNavigator";

const sections: ArticleSection[] = [
  {
    id: "journey",
    title: "Our IHP Journey",
    content: <StakeholderNavigator groups={stakeholderGroups} />,
    subsections: [
      {
        id: "feedstock",
        title: "2.1 Understanding the Problem & Feedstock",
        content: <FeedstockStory />,
      },
    ],
  },
];
```

`StakeholderNavigator` accepts groups with a title, description, optional flow,
and stakeholder records. `StakeholderCard` can also be used individually.
Cards expand independently through `Collapse`, retain their summaries, and
link to `storyHref`. Keep the corresponding story IDs in the article body.
Use descriptive portrait alt text and an explicit fallback for unavailable images.

Supply stakeholder groups from the page's content. Preserve the source
summaries, portrait mappings, outcomes, and caveats when populating the records.

## Handbook resource

`HandbookResource` presents a PDF resource with a title, fully visible
explanatory copy, and an obvious link. `children` accepts article paragraphs,
`actionLabel` names the action, and `headingAs` selects H3 (default) or H4 to
match the surrounding hierarchy.

```tsx
import { HandbookResource } from "../components/human-practices/HandbookResource";

<HandbookResource
  title="TRACE Handbook"
  href="https://static.igem.wiki/teams/6147/wiki/trace-handbook.pdf"
  actionLabel="Open TRACE Handbook"
>
  {handbookExplanation}
</HandbookResource>;
```

Supply the explanatory paragraphs from the page's content. Keep this resource
near Final Reflection, after the practical cases. The book graphic is
decorative, not a claimed reproduction of the PDF cover.

The link opens the PDF in a new tab, with a visible and accessible notice.
There is no `download` attribute: a cross-origin PDF is opened through normal
browser navigation, and readers can save it from the PDF viewer. The component
does not fetch or embed the entire file while the article loads.

If the URL is missing or still uses `{{LINK:...}}` / `{{URL:...}}`, the block
keeps its copy and displays "Resource link not yet available." without a
clickable placeholder. This is separate from a published server returning an
error; published URLs still need to be checked before deployment.

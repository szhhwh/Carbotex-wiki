# Components

Components are grouped by responsibility. Keep each component's CSS Module and
supporting types beside it. Page content and data belong in `src/contents/`.

| Directory          | Responsibility                                          | Components                                                                                                                              |
| ------------------ | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `layout/`          | Shared site chrome                                      | `Navbar`, `Header`, `Footer`                                                                                                            |
| `routing/`         | Route loading, errors, and scroll restoration           | `PageLoadBoundary`, `PageLoading`, `NotFound`, `RouteScrollManager`, `RouteContentReady`                                                |
| `article/`         | Article structure, citations, and mathematical notation | `ArticlePage`, `ArticleNote`, `ArticleFramework`, `References`, `Cite`, `ReferencesProvider`, `MathInline`, `MathBlock`, `Inspirations` |
| `media/`           | Images, captions, galleries, carousels, and video       | `Figure`, `Caption`, `ImageViewer`, `ImageGallery`, `ImageCarousel`, `VideoEmbed`, `MediaImage`                                         |
| `ui/`              | General interaction primitives                          | `Collapse`, `Accordion`                                                                                                                 |
| `activities/`      | Educational activity index and isolated activity viewer | `ActivityViewer`                                                                                                                        |
| `human-practices/` | Human Practices presentation                            | `StakeholderNavigator`, `StakeholderCard`, `HandbookResource`                                                                           |
| `home/`            | Home scroll stage, acts, and animation helpers          | `HomeStage`, `ActLanding`, `ActPlaceholder`, `RadialColorReveal`, `stage-math`                                                          |

Import directly from the component's module:

```tsx
import { ArticlePage } from "../components/article/ArticlePage";
import { Figure } from "../components/media/Figure";
import { Collapse } from "../components/ui/Collapse";
```

Use `import type` for interfaces and types. Avoid a shared barrel that pulls
unrelated page components into consumers.

See the [media guide](media/README.md) for gallery and carousel behavior, and the
[Human Practices guide](human-practices/README.md) for stakeholder and handbook
usage.

# Image galleries

`ImageGallery` accepts `MediaImage[]`, using the same image properties as
`Figure`: `src`, `alt`, caption, native dimensions or a display ratio, responsive
sources, and failure fallback. Assets must use the team's iGEM hosting.

## Figure and interpreting text

Use `FigureWithText` when a compact data figure and the paragraph that
interprets it should form one reading unit. On wide screens they sit side by
side; below 1180px the layout stacks with the caption still attached to the
figure. Alternate `mediaPosition="end"` with the default `"start"` to avoid a
run of identical image-left layouts. Set `compactMedia` for especially square
figures, or `stacked` when the pair is nested inside `FigurePair`.

```tsx
import { FigureWithText } from "../components/media/FigureWithText";

<FigureWithText
  src="https://static.igem.wiki/teams/6147/wiki/example.avif"
  intrinsicWidth={1200}
  intrinsicHeight={1000}
  alt="Example data chart"
  captionPrefix="Figure 1."
  caption="Example result."
>
  <p>The paragraph describing and interpreting the chart.</p>
</FigureWithText>;
```

Use `FigurePair` for two compact figures that benefit from direct comparison.
Put only the figures in the pair; keep the explanatory prose in its normal
document order after the pair.

```tsx
import { FigurePair } from "../components/media/FigurePair";

<FigurePair>
  <Figure {...leftFigure} />
  <Figure {...rightFigure} />
</FigurePair>;
<p>Interpretation of both figures.</p>;
```

```tsx
import { ImageGallery } from "../components/media/ImageGallery";
import type { MediaImage } from "../components/media/MediaImage";

const images: MediaImage[] = [
  {
    src: "https://static.igem.wiki/teams/6147/wiki/ihp-reach-out-local-authority-01.avif",
    alt: "Local stakeholder visit during the feedstock Reach Out stage",
    ratio: "4 / 3",
    caption: "Local authority visit on straw utilization and handling.",
  },
  // Add the remaining images in their intended order.
];

<ImageGallery images={images} label="Local authority visit" columns={2} />;
<ImageGallery
  images={images}
  label="Process evidence"
  columns={3}
  mobileLayout="swipe"
  ratio="4 / 3"
/>;
<ImageGallery images={images} label="Visit photographs" layout="strip" />;
```

## Gallery

- `layout="grid"` (default): 2, 3 or 4 desktop columns via `columns`, two
  columns below 900px, one below 600px.
- `mobileLayout="stack"` (default) keeps comparisons visible together;
  `"swipe"` turns the grid into a horizontal strip below 600px.
- `layout="strip"` scrolls horizontally at every width. Native scrolling,
  previous/next controls, and ArrowLeft/ArrowRight/Home/End are available.
- Images keep their own dimensions unless a common `ratio` is supplied.
- `caption` describes the complete set; individual image captions stay attached.

Keep diagrams static with `Figure`, and keep evidence sets next to their cases.

## Interaction checks

Check desktop and narrow widths, image enlargement and closing, gallery
scrolling, keyboard navigation, and image failures.

# Image galleries and carousels

Both components accept `MediaImage[]`, using the same image properties as
`Figure`: `src`, `alt`, caption, native dimensions or a display ratio, responsive
sources, and failure fallback. Assets must use the team's iGEM hosting.

```tsx
import { ImageGallery } from "../components/media/ImageGallery";
import { ImageCarousel } from "../components/media/ImageCarousel";
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
<ImageCarousel images={images} label="Local authority visit" />;
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

## Carousel

- `autoPlay` defaults to `true`. Reduced motion starts with rotation disabled.
  Readers can explicitly start it with Play; transitions remain instant.
- `interval` defaults to 5000ms and is clamped to at least 5000ms.
- Hover temporarily pauses rotation. Keyboard focus stops it until Play is
  selected. Opening the image viewer, leaving the viewport, touching the frame,
  or hiding the browser tab also pauses it.
- Previous/next buttons, pagination, ArrowLeft/ArrowRight/Home/End and horizontal
  touch/pen swipes navigate manually. Vertical touch scrolling remains available.
- `loop` defaults to `true`. With `false`, end controls are disabled and
  autoplay stops at the last image; Play restarts from the first.
- `ratio` defaults to `"4 / 3"` for a stable frame. All slide captions reserve
  space, including inactive ones, so long captions do not move later content.
- Inactive slides are hidden from assistive technology and cannot receive focus.
- Empty sets render nothing; single-image sets omit rotation/navigation controls.

Keep diagrams static with `Figure`, and keep evidence sets next to their cases.

## Interaction checks

Check desktop and narrow widths, image enlargement and closing, gallery scrolling,
carousel arrows/dots/keyboard/swipes, hover/focus pause, Play/Pause, reduced
motion, offscreen and hidden-tab pause, empty/single sets and image failures.

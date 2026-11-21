# Notes for AI assistants

Read **[README.md](README.md)** first — it covers the stack, where to edit
(`src/pages/*`, `src/app/routes.ts`), the `yarn` commands, and the iGEM asset rules
(images via the uploads tool, videos from iGEM servers, no external CDNs).

## Responsible & honest use

@.claude/RESPONSIBLE_AI_USE.md

## Guardrails

- Don't change `LICENSE` or the `Footer` component's license notice + GitLab
  repository link (both required on every page for judging).
- `.gitlab-ci.yml` works as-is; change it only if you know what you're doing —
  any build/deploy issues that result are the team's responsibility.

## Commands

- `yarn dev` — dev server (base path `/ouc-haide/`)
- `yarn codegen` — regenerate derived TypeScript from source assets
- `yarn codegen:check` — verify generated files are current without writing
- `yarn build` — `yarn codegen && tsc && vite build`; generate, type-check and
  bundle, must pass before committing
- `yarn lint` — eslint (`--max-warnings 0`, zero tolerance)
- `yarn format` — prettier across the project
- `git commit` is intercepted by the Claude Code PreToolUse hook, which runs
  `prettier --check` + `eslint` and blocks the commit on failure (run
  `yarn format` first)

## Architecture

- `src/app/routes.ts` — data-driven page registry: **both the Navbar and the routes
  are generated from it**; adding or adjusting pages only touches this file
  - `Page.layout` is required: `"article"` for content pages (each renders
    its own hero via `ArticlePage`), `"fullscreen"` for Home (`App.tsx`
    toggles `fullscreen-page` on `<body>`, dropping the fixed navbar's 56px
    offset)
- `src/containers/App/App.tsx` — global layout: Navbar + layout-branched
  routes + Footer. Always read the current path from `useLocation()`, **never
  bare `location.pathname`** (SPA navigation does not re-render the component,
  so the body class and document title would go stale)
- `src/pages/HomePage.tsx` mounts the homepage from `src/components/home/`.
  Route pages are grouped below `src/pages/` by site section.
- `src/components/home/` contains the illustrated canvas, the process stage,
  and the comparison cards.
  - `motion.ts` owns Lenis, publishes one scroll snapshot per frame, and
    batches layout refreshes. Scenes register their own animation cleanup.
  - `canvas/HomeCanvas.tsx` computes the artboard camera and rest stops.
    Canvas scenes subscribe to changing progress through `director.ts`.
  - `process/ProcessStage.tsx` renders the process artwork. The layout module
    measures geometry at refresh, and the timeline module assembles hydrolysis,
    fermentation, and product reveal on one ScrollTrigger timeline.
    One timeline unit corresponds to `100svh` of scroll.
- `src/components/` is grouped by responsibility.
  `layout/` (Navbar/Footer), `routing/` (loading/errors/scroll),
  `article/` (article structure/citations/math), `media/` (images/video),
  `ui/` (shared interaction primitives), `human-practices/` (page-specific
  presentation), and `home/` (the home stage and animations)

## Conventions

- **Animation**: GSAP 3.15 (ScrollTrigger/SplitText/DrawSVG are all bundled;
  no extra plugins needed). The homepage shares one GSAP ticker with Lenis.
  Use the home motion controller for layout refreshes. Pause ambient animation
  when its scene is offscreen or the document is hidden, and honor changes to
  `prefers-reduced-motion` while the page is open. Keep scroll motion,
  entrances, and ambient motion on distinct elements when they animate the
  same property.
- **Styling**: CSS Modules (`*.module.css`) + custom properties as design tokens;
  keep selectors flat and group responsive rules in explicit media/container
  blocks. Bootstrap/react-bootstrap is for content-page typography only — the
  home visual is fully custom
- **Media captions**: All image and video captions must render through
  `src/components/media/Caption.tsx` and use the shared
  `src/components/media/caption.module.css` typography. This includes custom
  figures, galleries, carousels, pending-media states, and team photo captions.
  Page-specific styles may control layout or decoration,
  but must not override the shared caption or caption-prefix color, font,
  font-size, line-height, or weight.
- **echarts**: on-demand imports (`echarts/core` + register only the chart
  types used); never import the full package
- **three**: plain `three` (no react-three-fiber) — WebGL scenes live in
  dedicated components; their render loops hook into the
  shared `gsap.ticker` and GSAP tweens THREE object props directly. Never
  spin up a second rAF/animation loop, and dispose geometry/material/renderer
  on unmount
- **SVG**: `import Art from "./x.svg?react"` yields a React component (GSAP
  can animate its paths); without the `?react` suffix it is a URL reference
- **Static assets**: fonts/images must be uploaded to static.igem.wiki and
  referenced from there (no Google Fonts or other CDNs); npm dependencies are
  bundled locally and are exempt from this rule
- **vite.config.ts** may only import zero-dependency leaf modules (e.g.
  `src/utils/stringToSlug`); importing the `src/utils` barrel pulls the whole
  app (via `getPathMapping → routes.ts → pages`) into esbuild's config
  bundling, where `.module.css` fails to parse and the build breaks

# Notes for AI assistants

Read **[README.md](README.md)** first — it covers the stack, where to edit
(`src/contents/*`, `src/pages.ts`), the `yarn` commands, and the iGEM asset rules
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
- `yarn build` — `tsc && vite build`; type-check + bundle, must pass before
  committing
- `yarn lint` — eslint (`--max-warnings 0`, zero tolerance)
- `yarn format` — prettier across the project
- `git commit` is intercepted by the Claude Code PreToolUse hook, which runs
  `prettier --check` + `eslint` and blocks the commit on failure (run
  `yarn format` first)

## Architecture

- `src/pages.ts` — data-driven page registry: **both the Navbar and the routes
  are generated from it**; adding or adjusting pages only touches this file
  - `Page.layout: "fullscreen"` escapes the shared Header + container layout
    (`App.tsx` branches on it and toggles `fullscreen-page` on `<body>`,
    dropping the fixed navbar's 56px offset)
- `src/containers/App/App.tsx` — global layout: Navbar + layout-branched
  routes + Footer. Always read the current path from `useLocation()`, **never
  bare `location.pathname`** (SPA navigation does not re-render the component,
  so the body class and document title would go stale)
- `src/contents/home.tsx` — declares the `acts` array (id + scrollLength +
  Component) rendered by `HomeStage`; adding or reordering acts only touches
  this file; the other `src/contents/*` files are content pages
- `src/components/home/` — the multi-act home stage: one long scroll track +
  a single sticky viewport with all acts stacked; scrolling cross-fades
  neighbouring acts (master timeline in `HomeStage`)
  - `stage-math.ts` is the shared coordinate system: 1 time unit = 100svh of
    scroll; every scrub timeline uses the same stage trigger
    (`top top` → `bottom bottom`) and a pinned total duration, so acts place
    their tweens on their own time window — **never pixel start/end values**
  - act components resolve the stage element via
    `closest("[data-home-stage]")`, not the parent's `stageRef` (refs attach
    child-first, the ref is still null inside a child's layout effect)
  - `ActLanding` is the opening Carbotex scene (parallax via `data-depth`);
    `ActPlaceholder` is the skeleton for upcoming acts; reduced motion
    degrades the whole stage to a plain document flow
- `src/components/` — grouped by responsibility; see its `README.md`:
  `layout/` (Navbar/Header/Footer), `routing/` (loading/errors/scroll),
  `article/` (article structure/citations/math), `media/` (images/video),
  `ui/` (shared interaction primitives), `human-practices/` (page-specific
  presentation), and `home/` (the home stage and animations)

## Conventions

- **Animation**: GSAP 3.15 (ScrollTrigger/SplitText/DrawSVG are all bundled;
  no extra plugins needed). A single Lenis instance (created in `HomeStage`)
  shares the render loop with `ScrollTrigger.update` and `gsap.ticker`; do
  not add a second animation library or rAF loop. Layout changes that land
  after mount (e.g. the `fullscreen-page` body class, applied in a passive
  effect) need a follow-up `ScrollTrigger.refresh()` — see `HomeStage`
- **Styling**: CSS Modules (`*.module.css`) + native CSS nesting + custom
  properties as design tokens; Bootstrap/react-bootstrap is for content-page
  typography only — the home visual is fully custom
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
  app (via `getPathMapping → pages.ts → contents`) into esbuild's config
  bundling, where `.module.css` fails to parse and the build breaks

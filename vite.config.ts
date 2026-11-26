import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { readdirSync, readFileSync, rmSync } from "node:fs";
import { stringToSlug } from "./src/utils/stringToSlug";
import { generateReferences } from "./scripts/generate-references.mjs";

// The opening must paint before React, application CSS, or external assets load.
function openingScreen(): Plugin {
  const source = (file: string) =>
    readFileSync(
      new URL(
        `./src/components/routing/opening-screen/${file}`,
        import.meta.url,
      ),
      "utf8",
    );
  return {
    name: "inline-opening-screen",
    transformIndexHtml: {
      order: "pre",
      handler: (html) =>
        html
          .replace(
            "<!-- opening-style -->",
            () => `<style>${source("opening-screen.css")}</style>`,
          )
          .replace(
            "<!-- opening-script -->",
            () => `<script>${source("opening-screen.js")}</script>`,
          ),
    },
  };
}

// Keeps src/data/references.generated.ts in sync with src/data/references.bib:
// regenerates it on every build (so the deployed wiki is always up to date)
// and whenever the .bib file changes during `yarn dev`.
function references(): Plugin {
  let command: string;
  return {
    name: "igem-references",
    configResolved(config) {
      command = config.command;
    },
    buildStart() {
      // Fail fast if a direct Vite build is using a missing or stale generated
      // module.
      if (command === "build") {
        generateReferences({ strict: true, check: true });
      }
    },
    configureServer(server) {
      // Missing keys only warn during development so pages can be written
      // before their BibTeX entries are pasted in.
      generateReferences({ strict: false });
      const onFileChange = (file: string) => {
        if (file.endsWith("references.bib")) {
          generateReferences({ strict: false });
        }
      };
      server.watcher.on("change", onFileChange);
      server.watcher.on("add", onFileChange);
    },
  };
}

// KaTeX's stylesheet references .woff2/.woff/.ttf for the same faces. Every
// browser that can run the site picks woff2 (woff as the older fallback), so the
// .ttf copies are dead weight — and the iGEM GitLab instance caps job artifacts
// at 10 MiB, so the built site must stay lean.
function dropUnusedFontFormats(): Plugin {
  let outDir = "dist";
  return {
    name: "drop-unused-font-formats",
    apply: "build",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const assets = new URL(`./${outDir}/assets/`, import.meta.url);
      for (const file of readdirSync(assets)) {
        if (file.endsWith(".ttf")) rmSync(new URL(file, assets));
      }
    },
  };
}

// https://vitejs.dev/config/
export default () => {
  const env = loadEnv("dev", process.cwd());
  // `VITE_BASE` overrides the deploy path; `/` builds for a root deployment.
  const override = env.VITE_BASE?.replace(/^\/+|\/+$/g, "");
  const base = env.VITE_BASE
    ? override
      ? `/${override}/`
      : "/"
    : `/${stringToSlug(env.VITE_TEAM_NAME)}/`;
  return defineConfig({
    base,
    plugins: [
      openingScreen(),
      react(),
      svgr(),
      references(),
      dropUnusedFontFormats(),
    ],
    build: {
      rollupOptions: {
        input: {
          wiki: "index.html",
          dna: "activities/dna/index.html",
          fermentationMap: "activities/fermentation-map/index.html",
          esgGame: "activities/esg-game/index.html",
        },
        output: {
          // katex (~280 kB min) gets its own chunk so its hash stays stable
          // across app-code edits (repeat-visit cache hits) and it downloads
          // in parallel with the page that needs it. Math.tsx loads it via a
          // dynamic import, so only pages that actually render a formula
          // fetch this chunk.
          manualChunks: {
            katex: ["katex"],
          },
        },
      },
    },
  });
};

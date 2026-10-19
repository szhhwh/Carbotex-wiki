import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
// Import the leaf module directly: the barrel (./src/utils) would drag the whole
// app (via pages.ts) into esbuild's config bundling, which cannot parse CSS Modules.
import { stringToSlug } from "./src/utils/stringToSlug";
import { generateReferences } from "./scripts/generate-references.mjs";

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
      // Missing keys fail the deploy build; `yarn dev` only warns so pages
      // can be written before their bib entries are pasted in.
      generateReferences({ strict: command === "build" });
    },
    configureServer(server) {
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

// https://vitejs.dev/config/
export default () => {
  const env = loadEnv("dev", process.cwd());
  return defineConfig({
    base: `/${stringToSlug(env.VITE_TEAM_NAME)}/`,
    plugins: [react(), svgr(), references()],
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

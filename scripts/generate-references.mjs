// Parses src/data/references.bib into src/data/references.generated.ts.
//
// Run:
//   - by `yarn codegen` before type checking and production builds;
//   - by the Vite dev server when it starts or the .bib file changes.
//
// The generated module is the only thing the browser bundle sees — citation-js
// itself stays on the Node side, so nothing external is loaded at runtime
// (iGEM requires all assets to be served from iGEM infrastructure).

import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import Cite from "citation-js";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const BIB_PATH = join(ROOT, "src", "data", "references.bib");
const OUT_PATH = join(ROOT, "src", "data", "references.generated.ts");
const CONTENTS_DIR = join(ROOT, "src", "contents");

/** Collects every citation key used via <Cite k="..." /> under src/contents. */
function collectCiteKeys() {
  const keys = new Set();

  const visit = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) {
        visit(path);
        continue;
      }
      if (!entry.name.endsWith(".tsx")) continue;

      const source = readFileSync(path, "utf8");
      for (const tag of source.matchAll(/<Cite\b[^>]*>/g)) {
        for (const attr of tag[0].matchAll(
          /\bk\s*=\s*(?:"([^"]+)"|\{([^}]*)\})/g,
        )) {
          for (const key of attr[0].matchAll(/"([^"]+)"/g)) {
            keys.add(key[1]);
          }
        }
      }
    }
  };

  visit(CONTENTS_DIR);
  return keys;
}

/** Formats one CSL entry as APA-7-style HTML, without wrapper markup. */
function formatEntry(entry) {
  const formattedEntry = { ...entry };
  const author =
    entry.author?.length === 1
      ? (entry.author[0].literal ?? entry.author[0].family)
      : undefined;

  // APA omits a publisher that is also the sole author.
  if (entry.type === "report" && author && author === entry.publisher) {
    delete formattedEntry.publisher;
  }

  const html = new Cite(formattedEntry).format("bibliography", {
    format: "html",
    template: "apa",
    lang: "en-US",
  });
  return autolinkUrls(html.replace(/<\/?div[^>]*>/g, "")).trim();
}

/** Makes URLs in plain-text HTML nodes clickable without nesting <a> tags. */
function autolinkUrls(html) {
  let insideAnchor = false;

  return html
    .split(/(<[^>]+>)/g)
    .map((part) => {
      if (part.startsWith("<")) {
        if (/^<a(?:\s|>)/i.test(part)) insideAnchor = true;
        if (/^<\/a\s*>/i.test(part)) insideAnchor = false;
        return part;
      }

      if (insideAnchor) return part;
      return part.replace(/https?:\/\/[^\s<]+/g, (url) => {
        // Keep sentence punctuation outside the anchor, or the href carries it.
        const href = url.replace(/[.,;]+$/, "");
        const trailing = url.slice(href.length);
        return `<a href="${href}" target="_blank" rel="noopener noreferrer">${href}</a>${trailing}`;
      });
    })
    .join("");
}

/**
 * @param {{ strict?: boolean, check?: boolean }} [options]
 *   strict (default): a <Cite /> key missing from the .bib file fails the
 *   run — used for production builds, where a dropped citation must never go
 *   unnoticed. Non-strict only logs, so `yarn dev` keeps running while a page
 *   is being written (the <References /> list shows the gap in red).
 *   check: fail instead of writing when the generated file is stale.
 */
export function generateReferences({ strict = true, check = false } = {}) {
  if (!existsSync(BIB_PATH)) {
    console.warn(
      `[references] ${BIB_PATH} not found — ${
        check ? "generated output is missing" : "writing an empty list"
      }.`,
    );
    writeGenerated([], [], check);
    return;
  }

  const cite = new Cite(readFileSync(BIB_PATH, "utf8"));

  // Guard against duplicate BibTeX keys (they would silently shadow entries).
  const seen = new Set();
  for (const entry of cite.data) {
    if (seen.has(entry.id)) {
      throw new Error(
        `[references] duplicate BibTeX key "${entry.id}" in src/data/references.bib`,
      );
    }
    seen.add(entry.id);
  }

  const entries = cite.data.map((entry) => ({
    key: entry.id,
    html: formatEntry(entry),
  }));

  // Fail the build when a page cites a key that is missing from the .bib file,
  // so a typo can never silently drop a citation from the wiki.
  const usedKeys = collectCiteKeys();
  const missing = [...usedKeys].filter((key) => !seen.has(key));
  if (missing.length > 0) {
    const message = `[references] cited in <Cite /> but missing from src/data/references.bib: ${missing
      .map((key) => `"${key}"`)
      .join(", ")}`;
    if (strict) {
      throw new Error(message);
    }
    console.error(message);
  }

  const unused = entries.filter(({ key }) => !usedKeys.has(key));
  if (unused.length > 0 && !check) {
    console.info(
      `[references] present in .bib but not cited anywhere yet: ${unused
        .map(({ key }) => key)
        .join(", ")}`,
    );
  }

  writeGenerated(entries, [...usedKeys], check);
}

function writeGenerated(entries, usedKeys, check) {
  const lines = entries.map(
    ({ key, html }) =>
      `  { key: ${JSON.stringify(key)}, html: ${JSON.stringify(html)} },`,
  );
  const source = `// AUTO-GENERATED from src/data/references.bib by scripts/generate-references.mjs.
// Do not edit this file — edit the .bib file instead.

export interface ReferenceEntry {
  /** BibTeX citation key, e.g. "jinek2012" (what <Cite k="..." /> expects). */
  key: string;
  /** Formatted APA-7-style reference HTML. */
  html: string;
}

export const references: ReferenceEntry[] = [
${lines.join("\n")}
];

export const referenceByKey: Record<string, ReferenceEntry> = Object.fromEntries(
  references.map((reference) => [reference.key, reference]),
);
`;
  // Skip the write when nothing changed: an unconditional rewrite touches
  // the mtime on every `yarn dev` start and makes Vite restart the server.
  const current = existsSync(OUT_PATH) ? readFileSync(OUT_PATH, "utf8") : null;
  if (current === source) {
    if (!check) console.info(`[references] ${OUT_PATH} is already up to date`);
    return;
  }
  if (check) {
    throw new Error(
      `[references] ${OUT_PATH} is missing or stale; run \`yarn codegen\``,
    );
  }
  writeFileSync(OUT_PATH, source, "utf8");

  const cited = usedKeys.length;
  const total = entries.length;
  console.info(
    `[references] generated ${OUT_PATH} (${total} entr${total === 1 ? "y" : "ies"}, ${cited} cited on pages)`,
  );
}

// Allow `node scripts/generate-references.mjs` as well as import from Vite.
if (resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url)) {
  try {
    generateReferences({ check: process.argv.includes("--check") });
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}

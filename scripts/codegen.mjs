// Single entry point for generated TypeScript modules.
//
// `yarn codegen` writes them before tsc runs. `yarn codegen:check` verifies
// that committed outputs are current without modifying the worktree.

import { generateReferences } from "./generate-references.mjs";

const check = process.argv.includes("--check");

try {
  generateReferences({ check });
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}

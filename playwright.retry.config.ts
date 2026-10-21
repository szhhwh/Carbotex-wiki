import { defineConfig } from "@playwright/test";
import config from "./playwright.config";

const baseURL = "http://127.0.0.1:4176";

// Run yarn build first: these tests exercise minified production imports.
export default defineConfig({
  ...config,
  testMatch: "lazy-route-retry.spec.ts",
  use: { ...config.use, baseURL },
  webServer: {
    command: "yarn preview --host 127.0.0.1 --port 4176 --strictPort",
    url: `${baseURL}/ouc-haide/`,
    reuseExistingServer: false,
    timeout: 30_000,
  },
});

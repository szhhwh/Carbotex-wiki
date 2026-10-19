import { expect, test } from "@playwright/test";
import {
  collectPageErrors,
  openStandalone,
  stateOf,
  waitForMapIdle,
} from "./helpers";

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("province reveal settles without an animation", async ({
    page,
  }, testInfo) => {
    const errors = collectPageErrors(page);
    const map = await openStandalone(page);
    if (testInfo.project.name === "mobile") {
      await page.locator("#atlasPanelToggle").click();
    }
    await page.locator("#provinceSearch").fill("Sichuan");
    await page.locator(".atlas-region").first().click();
    await expect(page.locator("#detailPanel")).toHaveJSProperty("open", true);

    await expect
      .poll(async () => (await stateOf(map)).moving, { timeout: 2_000 })
      .toBe(false);
    await waitForMapIdle(map);
    const state = await stateOf(map);
    expect(state.zoom).toBeGreaterThan(state.baseZoom || 0);
    expect(state.selected).toBe("四川省");
    expect(errors).toEqual([]);
  });
});

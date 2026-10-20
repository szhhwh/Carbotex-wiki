import { expect, test } from "@playwright/test";

test.describe("shared image viewer", () => {
  test("opens without a document-wide transition and closes from blank space", async ({
    page,
  }) => {
    await page.goto("/ouc-haide/hardware");

    const figure = page.locator("#hardware-figure-4-1");
    await figure.scrollIntoViewIfNeeded();
    await expect(page.locator("[data-media-preview-hint]")).toHaveCount(0);

    await figure.locator('button[aria-haspopup="dialog"]').click();

    const dialog = page.locator("dialog[data-image-viewer]");
    await expect(dialog).toBeVisible();

    const rootState = await page.evaluate(() => ({
      animations: document.documentElement.getAnimations().length,
      transitionProperty: getComputedStyle(document.documentElement)
        .transitionProperty,
    }));
    expect(rootState.animations).toBe(0);
    expect(rootState.transitionProperty).not.toContain(
      "--image-viewer-gutter-color",
    );

    const box = await dialog.boundingBox();
    if (!box) throw new Error("Image viewer has no rendered bounds");
    await page.mouse.click(box.x + 8, box.y + 8);
    await expect(dialog).toHaveCount(0);
  });
});

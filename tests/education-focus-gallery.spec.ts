import { expect, test, type Locator, type Page } from "@playwright/test";

const GALLERY = '[aria-roledescription="carousel"]:has([data-focus-slide])';

/** Late image loads shift the page, so settle the scroll position repeatedly. */
async function openGallery(page: Page, nth = 0): Promise<Locator> {
  await page.goto("/ouc-haide/education#activities");
  const gallery = page.locator(GALLERY).nth(nth);
  await gallery.waitFor({ state: "attached", timeout: 10_000 });
  for (let attempt = 0; attempt < 4; attempt += 1) {
    await gallery.evaluate((element) =>
      element.scrollIntoView({ block: "center", behavior: "instant" }),
    );
    await page.waitForTimeout(400);
  }
  return gallery;
}

const slide = (gallery: Locator, position: string) =>
  gallery.locator(`[data-position="${position}"]`);
/** Click the part of a neighbour that is neither covered nor clipped. */
async function clickSide(page: Page, gallery: Locator, side: "left" | "right") {
  const stage = await gallery.locator("[id$='-stage']").boundingBox();
  const center = await slide(gallery, "center").boundingBox();
  const neighbour = await slide(gallery, side).boundingBox();
  if (!stage || !center || !neighbour) throw new Error("missing slide");
  const visible =
    side === "right"
      ? [
          center.x + center.width,
          Math.min(neighbour.x + neighbour.width, stage.x + stage.width),
        ]
      : [Math.max(neighbour.x, stage.x), center.x];
  await page.mouse.click(
    (visible[0] + visible[1]) / 2,
    neighbour.y + neighbour.height / 2,
  );
}
const centreLabel = (gallery: Locator) =>
  slide(gallery, "center").getAttribute("aria-label");

test("focus gallery centres the selected image between faded neighbours", async ({
  page,
}) => {
  const gallery = await openGallery(page);
  const stage = await gallery.locator("[id$='-stage']").boundingBox();
  const center = await slide(gallery, "center").boundingBox();
  const left = await slide(gallery, "left").boundingBox();
  const right = await slide(gallery, "right").boundingBox();
  if (!stage || !center || !left || !right) throw new Error("missing slide");

  const middle = stage.x + stage.width / 2;
  expect(center.x + center.width / 2).toBeCloseTo(middle, 0);
  expect(left.x + left.width / 2).toBeLessThan(middle);
  expect(right.x + right.width / 2).toBeGreaterThan(middle);
  expect(center.width).toBeGreaterThan(right.width);
  await expect(slide(gallery, "right")).toHaveCSS("opacity", "0.5");
  await expect(slide(gallery, "center")).toHaveCSS("opacity", "1");

  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test("a side image moves to the centre and the centre opens the image viewer", async ({
  page,
}) => {
  const gallery = await openGallery(page);
  expect(await centreLabel(gallery)).toMatch(/^1 of /);

  await clickSide(page, gallery, "right");
  await expect(slide(gallery, "center")).toHaveAttribute(
    "aria-label",
    /^2 of /,
  );

  await slide(gallery, "center").getByRole("button").click();
  const viewer = page.locator("dialog[data-image-viewer][open]");
  await expect(viewer).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(viewer).toHaveCount(0);
  expect(await centreLabel(gallery)).toMatch(/^2 of /);
});

test("arrow keys move only the focused gallery and wrap around", async ({
  page,
}) => {
  const gallery = await openGallery(page);
  const other = page.locator(GALLERY).nth(1);
  const otherBefore = await centreLabel(other);
  const total = (await centreLabel(gallery))!.split(" of ")[1];

  await slide(gallery, "center").getByRole("button").focus();
  await page.keyboard.press("ArrowRight");
  expect(await centreLabel(gallery)).toBe(`2 of ${total}`);
  await expect(slide(gallery, "center").getByRole("button")).toBeFocused();

  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("ArrowLeft");
  expect(await centreLabel(gallery)).toBe(`${total} of ${total}`);
  expect(await centreLabel(other)).toBe(otherBefore);
});

test("hidden slides are removed from assistive technology and tab order", async ({
  page,
}) => {
  const gallery = await openGallery(page);
  const hidden = gallery.locator('[data-position="hidden"]');
  const count = await hidden.count();
  for (let index = 0; index < count; index += 1) {
    await expect(hidden.nth(index)).toHaveAttribute("aria-hidden", "true");
    expect(await hidden.nth(index).evaluate((el) => el.inert)).toBe(true);
  }
  await expect(gallery.locator('[data-focus-slide][tabindex="0"]')).toHaveCount(
    1,
  );
});

test("chapter galleries omit per-slide captions but keep set captions", async ({
  page,
}) => {
  await page.goto("/ouc-haide/education#activities");

  const stickyMagicGallery = page.getByRole("region", {
    name: "Chapter 02 Sticky Magic activity photographs",
  });
  await expect(stickyMagicGallery).toBeVisible();
  await expect(stickyMagicGallery.locator("[data-caption]")).toHaveCount(0);

  const dnaGallery = page.getByRole("region", {
    name: "Records of our DNA learning activity",
  });
  const dnaCaption = dnaGallery.locator("[data-caption]");
  await expect(dnaCaption).toHaveCount(1);
  await expect(dnaCaption).toContainText("Figure 5.");
});

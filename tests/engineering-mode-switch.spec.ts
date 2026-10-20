import { expect, test, type Page } from "@playwright/test";

const openEngineering = async (page: Page) => {
  await page.goto("/ouc-haide/engineering");
  await expect(page.locator("#opening-screen")).toHaveCount(0);
  return page.getByRole("group", { name: "Engineering pathway" });
};

test("switches the outline and article between Hardware and Wet Lab", async ({
  page,
}) => {
  const switcher = await openEngineering(page);
  const hardware = switcher.getByRole("button", { name: "Hardware" });
  const wetLab = switcher.getByRole("button", { name: "Wet Lab" });
  const outline = page.locator("#article-outline");

  await expect(hardware).toHaveAttribute("aria-pressed", "true");
  await expect(hardware).toHaveAttribute("aria-controls", "article-body");
  await expect(page.locator("[data-article-lead]")).toHaveCount(0);
  await expect(page.locator("#engineering-overview")).toBeVisible();
  await expect(page.locator("#wet-engineering")).toHaveCount(0);
  await expect(outline.locator('a[href="#engineering-overview"]')).toHaveCount(
    1,
  );
  await expect(outline.locator('a[href="#wet-engineering"]')).toHaveCount(0);
  expect(
    await switcher.evaluate((element) =>
      Boolean(
        element.compareDocumentPosition(
          document.querySelector("#article-body")!,
        ) & Node.DOCUMENT_POSITION_FOLLOWING,
      ),
    ),
  ).toBe(true);

  const switchLayout = await switcher.evaluate((element) => {
    const switchRect = element.getBoundingClientRect();
    const rowRect = element.parentElement!.getBoundingClientRect();
    return {
      width: switchRect.width,
      leftGap: switchRect.left - rowRect.left,
      rightGap: rowRect.right - switchRect.right,
    };
  });
  expect(Math.abs(switchLayout.leftGap - switchLayout.rightGap)).toBeLessThan(
    1,
  );
  if ((page.viewportSize()?.width ?? 0) > 430) {
    expect(switchLayout.width).toBeCloseTo(480, 0);
  }

  const indicator = switcher.locator("[data-mode-indicator]");
  const hardwareTransform = await indicator.evaluate(
    (element) => getComputedStyle(element).transform,
  );
  expect(
    await indicator.evaluate(
      (element) => getComputedStyle(element).transitionDuration,
    ),
  ).not.toBe("0s");

  await wetLab.click();
  await expect(wetLab).toHaveAttribute("aria-pressed", "true");
  await expect(page).toHaveURL(/#wet-engineering$/);
  await expect(page.locator("#wet-engineering")).toBeVisible();
  await expect(page.locator("#engineering-overview")).toHaveCount(0);
  await expect(outline.locator('a[href="#wet-engineering"]')).toHaveCount(1);
  await expect(outline.locator('a[href="#engineering-overview"]')).toHaveCount(
    0,
  );
  await expect(page.locator("#references")).toBeVisible();
  await expect
    .poll(() =>
      indicator.evaluate((element) => getComputedStyle(element).transform),
    )
    .not.toBe(hardwareTransform);
  expect(
    await page
      .locator("#article-body")
      .evaluate((element) => getComputedStyle(element).animationDuration),
  ).not.toBe("0s");

  await hardware.click();
  await expect(hardware).toHaveAttribute("aria-pressed", "true");
  await expect(page).toHaveURL(/#engineering-overview$/);
  await expect(page.locator("#engineering-overview")).toBeVisible();
  await expect(page.locator("#wet-engineering")).toHaveCount(0);
  await expect(page.locator("#references")).toHaveCount(0);
});

test("a Wet Lab section hash opens the matching mode", async ({ page }) => {
  await page.goto("/ouc-haide/engineering#wet-engineering");
  await expect(page.locator("#opening-screen")).toHaveCount(0);

  const switcher = page.getByRole("group", { name: "Engineering pathway" });
  await expect(
    switcher.getByRole("button", { name: "Wet Lab" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#wet-engineering")).toBeVisible();
  await expect(page.locator("#engineering-overview")).toHaveCount(0);
});

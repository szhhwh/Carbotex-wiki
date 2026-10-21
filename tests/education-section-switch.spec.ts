import { expect, test, type Page } from "@playwright/test";

async function openEducation(page: Page) {
  await page.goto("/ouc-haide/education");
  await expect(page.locator("#opening-screen")).toHaveCount(0);
  return page.getByRole("group", { name: "Education sections" });
}

test("switches content, outline, and references between Education sections", async ({
  page,
}) => {
  const switcher = await openEducation(page);
  const overview = switcher.getByRole("button", { name: "Overview" });
  const activity = switcher.getByRole("button", { name: "Activity" });
  const resourceReuse = switcher.getByRole("button", {
    name: "Resource Reuse",
  });
  const conclusion = switcher.getByRole("button", { name: "Conclusion" });
  const outline = page.locator("#article-outline");
  const references = page.locator("#references");

  await expect(switcher.getByRole("button")).toHaveCount(4);
  await expect(overview).toHaveAttribute("aria-pressed", "true");
  await expect(overview).toHaveAttribute("aria-controls", "article-body");
  await expect(page.locator("#overview")).toBeVisible();
  await expect(page.locator("#principle")).toBeVisible();
  await expect(page.locator("#activities")).toHaveCount(0);
  await expect(outline.locator('a[href="#overview"]')).toHaveCount(1);
  await expect(outline.locator('a[href="#principle"]')).toHaveCount(1);
  await expect(outline.locator('a[href="#activities"]')).toHaveCount(0);
  await expect(
    page.locator("#article-body article > section").last(),
  ).toHaveAttribute("id", "references");
  await expect(
    references.getByRole("button", { name: "References", exact: true }),
  ).toBeVisible();

  const referenceToggle = references.getByRole("button", {
    name: "References",
    exact: true,
  });
  await referenceToggle.click();
  await expect(references.locator("li")).toHaveCount(2);
  await expect(references).toContainText("Hibino");
  await expect(references).toContainText("Jin");
  await referenceToggle.click();
  await expect(referenceToggle).toHaveAttribute("aria-expanded", "false");

  await activity.click();
  await expect(activity).toHaveAttribute("aria-pressed", "true");
  await expect(page).toHaveURL(/#activities$/);
  await expect(page.locator("#activities")).toBeVisible();
  await expect(page.locator("#chapter-01")).toBeVisible();
  await expect(page.locator("#overview")).toHaveCount(0);
  await expect(page.locator("#principle")).toHaveCount(0);
  await expect(outline.locator('a[href="#activities"]')).toHaveCount(1);
  await expect(outline.locator('a[href="#chapter-01"]')).toHaveCount(1);
  await expect(outline.locator('a[href="#overview"]')).toHaveCount(0);
  await expect(outline.locator('a[href="#principle"]')).toHaveCount(0);
  await expect(
    page.locator("#article-body article > section").last(),
  ).toHaveAttribute("id", "references");
  await expect(referenceToggle).toHaveAttribute("aria-expanded", "false");
  await expect(references.locator("li")).toHaveCount(2);
  await referenceToggle.click();
  await expect(references.locator("li")).toHaveCount(2);
  await expect(references).toContainText("Piaget");
  await expect(references).toContainText("Sweeney");
  await expect(references).not.toContainText("Hibino");
  await expect(references).not.toContainText("Jin");

  await resourceReuse.click();
  await expect(resourceReuse).toHaveAttribute("aria-pressed", "true");
  await expect(page).toHaveURL(/#resource-reuse$/);
  await expect(page.locator("#resource-reuse")).toBeVisible();
  await expect(page.locator("#references")).toHaveCount(0);
  await expect(outline.locator('a[href="#resource-reuse"]')).toHaveCount(1);
  await expect(outline.locator('a[href="#references"]')).toHaveCount(0);

  await conclusion.click();
  await expect(conclusion).toHaveAttribute("aria-pressed", "true");
  await expect(page).toHaveURL(/#conclusion$/);
  await expect(page.locator("#conclusion")).toBeVisible();
  await expect(page.locator("#references")).toHaveCount(0);
  await expect(outline.locator('a[href="#conclusion"]')).toHaveCount(1);
  await expect(outline.locator('a[href="#references"]')).toHaveCount(0);

  await overview.click();
  await expect(page).toHaveURL(/#overview$/);
  await expect(references.locator("li")).toHaveCount(2);
  await expect(references).toContainText("Hibino");
  await expect(references).toContainText("Jin");
  await expect(references).not.toContainText("Piaget");
  await expect(references).not.toContainText("Sweeney");
});

test("keeps the switch legible and responsive", async ({ page }) => {
  const switcher = await openEducation(page);
  const buttons = switcher.getByRole("button");
  const spacing = await switcher.evaluate((element) => {
    const contentControls = element.parentElement;
    const hero = contentControls?.previousElementSibling;
    const readingArea = document.getElementById("article-body");
    if (!hero || !readingArea) {
      throw new Error("Education layout landmarks are missing");
    }

    return {
      above:
        element.getBoundingClientRect().top -
        hero.getBoundingClientRect().bottom,
      below: Number.parseFloat(getComputedStyle(readingArea).paddingTop),
    };
  });
  expect(Math.abs(spacing.above - spacing.below)).toBeLessThan(1);

  const typography = await buttons.evaluateAll((elements) =>
    elements.map((element) => ({
      fontSize: Number.parseFloat(getComputedStyle(element).fontSize),
      height: element.getBoundingClientRect().height,
    })),
  );
  expect(typography.every(({ fontSize }) => fontSize >= 18)).toBe(true);
  expect(typography.every(({ height }) => height >= 60)).toBe(true);

  const layout = await buttons.evaluateAll((elements) => {
    const rects = elements.map((element) => element.getBoundingClientRect());
    return {
      sameRow: rects.every((rect) => Math.abs(rect.top - rects[0].top) < 1),
      rightEdge: Math.max(...rects.map((rect) => rect.right)),
      viewportWidth: innerWidth,
      documentWidth: document.documentElement.scrollWidth,
    };
  });
  expect(layout.rightEdge).toBeLessThanOrEqual(layout.viewportWidth + 1);
  expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth);
  expect(layout.sameRow).toBe((page.viewportSize()?.width ?? 0) > 900);

  await page.setViewportSize({ width: 320, height: 700 });
  const compactLayout = await buttons.evaluateAll((elements) => {
    const rects = elements.map((element) => element.getBoundingClientRect());
    return {
      rows: new Set(rects.map((rect) => Math.round(rect.top))).size,
      fontSize: Number.parseFloat(getComputedStyle(elements[0]).fontSize),
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: innerWidth,
    };
  });
  expect(compactLayout.rows).toBe(2);
  expect(compactLayout.fontSize).toBeGreaterThanOrEqual(18);
  expect(compactLayout.documentWidth).toBeLessThanOrEqual(
    compactLayout.viewportWidth,
  );

  await page.setViewportSize({ width: 901, height: 900 });
  const breakpointRows = await buttons.evaluateAll(
    (elements) =>
      new Set(
        elements.map((element) =>
          Math.round(element.getBoundingClientRect().top),
        ),
      ).size,
  );
  expect(breakpointRows).toBe(1);
});

test("opens the owning section for cross-links and direct chapter hashes", async ({
  page,
}) => {
  await openEducation(page);
  const chapterLink = page.locator('a[href="#chapter-01"]').first();
  await chapterLink.focus();
  await page.keyboard.press("Enter");

  const switcher = page.getByRole("group", { name: "Education sections" });
  await expect(
    switcher.getByRole("button", { name: "Activity" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page).toHaveURL(/#chapter-01$/);
  expect(new URL(page.url()).pathname).toBe("/ouc-haide/education");
  await expect(page.locator("#chapter-01")).toBeVisible();
  await expect(page.locator("#chapter-01")).toBeFocused();

  await page.goBack();
  await expect(
    switcher.getByRole("button", { name: "Overview" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#overview")).toBeVisible();

  await page.goForward();
  await expect(
    switcher.getByRole("button", { name: "Activity" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#chapter-01")).toBeVisible();

  await page.goto("/ouc-haide/education#chapter-05");
  await expect(page.locator("#opening-screen")).toHaveCount(0);
  await expect(
    switcher.getByRole("button", { name: "Activity" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#chapter-05")).toBeVisible();
  await expect(page.locator("#overview")).toHaveCount(0);
});

test("syncs the section when returning from an activity viewer", async ({
  page,
}) => {
  await page.goto("/ouc-haide/education?activity=dna");
  await expect(page.locator("#opening-screen")).toHaveCount(0);
  await page.getByRole("link", { name: "All activities" }).click();

  await expect(page).toHaveURL(/\/education#activities$/);
  await expect(
    page
      .getByRole("group", { name: "Education sections" })
      .getByRole("button", { name: "Activity" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#activities")).toBeVisible();
  await expect(page.locator("#overview")).toHaveCount(0);
});

test("opens the owning section for generated heading hashes", async ({
  page,
}) => {
  await page.goto("/ouc-haide/education#resource-reuse-heading");
  await expect(page.locator("#opening-screen")).toHaveCount(0);

  await expect(
    page
      .getByRole("group", { name: "Education sections" })
      .getByRole("button", { name: "Resource Reuse" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#resource-reuse-heading")).toBeVisible();
  await expect(page.locator("#overview")).toHaveCount(0);
});

test("preserves the active section for a reloaded citation deep link", async ({
  page,
}) => {
  await openEducation(page);
  const activity = page
    .getByRole("group", { name: "Education sections" })
    .getByRole("button", { name: "Activity" });

  await activity.click();
  await expect(page.locator("#chapter-02")).toBeVisible();
  await page.locator("#chapter-02 sup.cite-ref a").first().click();
  await expect(page).toHaveURL(/#ref-1$/);

  await page.reload();
  await expect(page.locator("#opening-screen")).toHaveCount(0);
  await expect(activity).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#activities")).toBeVisible();
  await expect(page.locator("#overview")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "References", exact: true }),
  ).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#ref-1")).toBeFocused();
});

test("shows a clear action label on every education detail collapse", async ({
  page,
}) => {
  await page.goto("/ouc-haide/education#activities");
  await expect(page.locator("#opening-screen")).toHaveCount(0);

  const titles = [
    "Scientific Depth details",
    "Language Style details",
    "Verification Aids details",
    "Read our peers' feedback",
    "Read our members' reflections",
  ];

  for (const title of titles) {
    const trigger = page.getByRole("button", { name: title, exact: true });
    await expect(trigger).toContainText("Show details");
    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(trigger).toContainText("Hide details");
  }
});

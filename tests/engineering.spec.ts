import { expect, test } from "@playwright/test";

test.describe("engineering success page", () => {
  test("cycle shortcuts navigate to the matching iteration", async ({
    page,
  }) => {
    await page.goto("/ouc-haide/engineering");

    const journey = page.getByRole("navigation", {
      name: "Engineering cycle shortcuts",
    });
    await expect(journey.getByRole("link")).toHaveCount(4);
    await expect(journey).toContainText("Initial Filtration");
    await expect(journey).toContainText("IoT Integration");

    await journey
      .locator('a[href="#engineering-cycle-2"]')
      .evaluate((element) => (element as HTMLAnchorElement).click());
    await expect(page).toHaveURL(/#engineering-cycle-2$/);
    await expect(page.locator("#engineering-cycle-2")).toBeVisible();
  });

  test("Cycle 4 preserves the automated operation procedure", async ({
    page,
  }) => {
    await page.goto("/ouc-haide/engineering");

    const build = page
      .locator("#engineering-cycle-4")
      .getByRole("region", { name: "Build phase" });

    await expect(build).toContainText("Pump drives effluent");
    await expect(build).toContainText("preset flush duration");
    await expect(build).toContainText("pH confirms completion");
    await expect(build).toContainText("cycle repeats automatically");
  });

  test("cycle figures follow their source phase", async ({ page }) => {
    await page.goto("/ouc-haide/engineering");

    const cycle1 = page.locator("#engineering-cycle-1");
    expect(
      await cycle1.evaluate((section) => {
        const build = section.querySelector('[aria-label="Build phase"]')!;
        const figure = section.querySelector("#engineering-figure-2")!;
        return Boolean(
          build.compareDocumentPosition(figure) &
          Node.DOCUMENT_POSITION_FOLLOWING,
        );
      }),
    ).toBe(true);

    for (const cycle of [2, 3, 4]) {
      const section = page.locator(`#engineering-cycle-${cycle}`);
      const design = section.getByRole("region", { name: "Design phase" });
      await expect(design.locator("figure")).toHaveCount(1);
    }
  });

  test("page remains inside the viewport and headings do not skip", async ({
    page,
  }) => {
    await page.goto("/ouc-haide/engineering");
    await page.locator("#engineering-summary").scrollIntoViewIfNeeded();

    const layout = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      page: document.documentElement.scrollWidth,
    }));
    expect(layout.page).toBeLessThanOrEqual(layout.viewport + 1);

    const levels = await page
      .locator("#article-body article")
      .locator("h1, h2, h3, h4, h5, h6")
      .evaluateAll((headings) =>
        headings.map((heading) => Number(heading.tagName.slice(1))),
      );

    for (let index = 1; index < levels.length; index += 1) {
      expect(
        levels[index] - levels[index - 1],
        `Heading ${index + 1} skips from h${levels[index - 1]} to h${levels[index]}`,
      ).toBeLessThanOrEqual(1);
    }
  });

  test("does not add references absent from the source document", async ({
    page,
  }) => {
    await page.goto("/ouc-haide/engineering");

    await expect(page.locator("sup.cite-ref")).toHaveCount(0);
    await expect(page.locator("#references")).toHaveCount(0);
  });
});

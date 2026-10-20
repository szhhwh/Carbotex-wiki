import { expect, test } from "@playwright/test";

const articleRoutes = [
  "/description",
  "/engineering",
  "/contribution",
  "/design",
  "/parts",
  "/experiments",
  "/protocols",
  "/notebook",
  "/results",
  "/safety-and-security",
  "/model",
  "/hardware",
  "/human-practices",
  "/attributions",
] as const;

test("every article page uses the shared reading shell", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "The viewport matrix covers both project sizes.",
  );

  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 768, height: 900 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);

    for (const route of articleRoutes) {
      await page.goto(`/ouc-haide${route}`);
      await expect(page.locator("#article-body")).toBeVisible();

      const layout = await page.evaluate(() => {
        const hero = document.querySelector("main > header");
        const reading = document.querySelector("#article-body");
        const article = reading?.querySelector("article");
        const main = document.querySelector("main[data-article-theme]");
        if (!hero || !reading || !article || !main) {
          throw new Error("Article shell is incomplete");
        }

        const rect = (element: Element) => {
          const bounds = element.getBoundingClientRect();
          return { left: bounds.left, width: bounds.width };
        };
        const clientWidth = (main as HTMLElement).clientWidth;
        const mainRect = main.getBoundingClientRect();
        const readingRect = reading.getBoundingClientRect();
        const expectedWidth =
          clientWidth <= 560
            ? clientWidth - 32
            : clientWidth <= 900
              ? Math.min(clientWidth - 40, 768)
              : Math.min(clientWidth * 0.88, 1408);

        return {
          hero: rect(hero),
          reading: rect(reading),
          article: rect(article),
          expectedWidth,
          articleMaxWidth: Number.parseFloat(
            getComputedStyle(article).maxWidth,
          ),
          insetDelta:
            readingRect.left -
            mainRect.left -
            (mainRect.right - readingRect.right),
          sectionSpace: getComputedStyle(main)
            .getPropertyValue("--article-space-section")
            .trim(),
          overflow: document.documentElement.scrollWidth - clientWidth,
        };
      });

      expect(layout.hero.left, `${route} hero alignment`).toBeCloseTo(
        layout.reading.left,
        1,
      );
      expect(layout.hero.width, `${route} hero width`).toBeCloseTo(
        layout.reading.width,
        1,
      );
      expect(layout.reading.width, `${route} reading width`).toBeCloseTo(
        layout.expectedWidth,
        1,
      );
      expect(layout.insetDelta, `${route} reading centering`).toBeCloseTo(0, 1);
      expect(
        layout.article.width,
        `${route} article width`,
      ).toBeLessThanOrEqual(layout.articleMaxWidth);
      expect(
        layout.article.left,
        `${route} article inset`,
      ).toBeGreaterThanOrEqual(layout.reading.left);
      expect(layout.sectionSpace).not.toBe("");
      expect(
        layout.overflow,
        `${route} horizontal overflow`,
      ).toBeLessThanOrEqual(1);
    }
  }
});

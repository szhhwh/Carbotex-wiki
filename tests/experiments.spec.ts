import { expect, test, type Page } from "@playwright/test";

async function openExperiments(page: Page) {
  await page.goto("/ouc-haide/experiments");
  await expect(page.locator("#article-body")).toBeVisible();
}

test("Experiments presents the complete module structure and linked methods", async ({
  page,
}) => {
  await openExperiments(page);

  await expect(page.locator("#article-body h2")).toHaveCount(8);
  await expect(page.locator("[data-protocol-link]")).toHaveCount(23);
  await expect(page.locator("table tbody tr")).toHaveCount(5);
  await expect(
    page.getByRole("heading", {
      name: "Chassis Preparation and Shared Genetic Workflows",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Adhesive Module" }),
  ).toBeVisible();

  const links = page.locator("[data-protocol-link]");
  expect(
    await links.evaluateAll((elements) =>
      elements.every(
        (element) =>
          element.getAttribute("target") === "_blank" &&
          element.getAttribute("rel") === "noopener noreferrer" &&
          element.getAttribute("href")?.endsWith(".pdf") === true,
      ),
    ),
  ).toBe(true);
});

test("Experiments stays within the viewport and keeps headings compact", async ({
  page,
}) => {
  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await openExperiments(page);

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow, `${width}px horizontal overflow`).toBeLessThanOrEqual(1);

    const headings = await page
      .locator("#article-body h2, #article-body h3, #article-body h4")
      .evaluateAll((elements) =>
        elements.map((element) => {
          const style = getComputedStyle(element);
          const lineHeight = Number.parseFloat(style.lineHeight);
          const tops: number[] = [];
          const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
          );
          let node = walker.nextNode();
          while (node) {
            const parent = node.parentElement;
            const text = node.textContent?.trim();
            if (parent && text) {
              const parentStyle = getComputedStyle(parent);
              if (
                parentStyle.display !== "none" &&
                parentStyle.visibility !== "hidden"
              ) {
                const range = document.createRange();
                range.selectNodeContents(node);
                tops.push(
                  ...Array.from(range.getClientRects(), (rect) => rect.top),
                );
              }
            }
            node = walker.nextNode();
          }
          tops.sort((a, b) => a - b);
          const lines = tops.filter(
            (top, index) =>
              index === 0 ||
              Math.abs(top - tops[index - 1]) > Math.max(2, lineHeight * 0.2),
          ).length;
          return {
            text: element.textContent?.trim().slice(0, 100) ?? "",
            lines,
          };
        }),
      );

    expect(
      headings.filter((heading) => heading.lines > 2),
      `${width}px`,
    ).toEqual([]);
  }
});

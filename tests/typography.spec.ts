import { expect, test } from "@playwright/test";

for (const route of ["hardware", "engineering"]) {
  test(`${route} component copy is not smaller than body copy`, async ({
    page,
  }) => {
    await page.goto(`/ouc-haide/${route}`);
    await page
      .locator("#article-body article > section > div[class*='_prose_']")
      .first()
      .waitFor();

    const result = await page.evaluate(() => {
      const prose = document.querySelector(
        "#article-body article > section > div[class*='_prose_']",
      );
      if (!prose) throw new Error("Article body typography was not found");

      const bodySize = Number.parseFloat(getComputedStyle(prose).fontSize);
      const minimumReadableSize = 14;
      const offenders: Array<{
        tag: string;
        text: string;
        size: number;
      }> = [];

      // Labels may be smaller than body copy, while running prose must keep the
      // article's body scale. Every visible string still has a 14px floor.
      for (const element of document.querySelectorAll("#article-body *")) {
        if (!(element instanceof Element) || !element.checkVisibility()) {
          continue;
        }
        if (element.closest("[aria-hidden='true'], svg, sup, sub, .cite-ref")) {
          continue;
        }

        const text = [...element.childNodes]
          .filter((node) => node.nodeType === Node.TEXT_NODE)
          .map((node) => node.textContent?.trim())
          .filter(Boolean)
          .join(" ");
        if (!text) continue;

        const size = Number.parseFloat(getComputedStyle(element).fontSize);
        const isRunningProse = element.matches("p, blockquote");
        if (
          size < minimumReadableSize - 0.15 ||
          (isRunningProse && size < bodySize - 0.15)
        ) {
          offenders.push({
            tag: element.tagName.toLowerCase(),
            text: text.slice(0, 80),
            size,
          });
        }
      }

      return {
        bodySize,
        offenders,
        horizontalOverflow:
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      };
    });

    expect(result.offenders).toEqual([]);
    expect(result.horizontalOverflow).toBeLessThanOrEqual(1);
  });
}

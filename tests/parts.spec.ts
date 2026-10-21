import { expect, test, type Page } from "@playwright/test";

const registryRowIds = [
  "BBa_26X6M2G5",
  "BBa_26K4GKDM",
  "BBa_265VC540",
  "BBa_26BY6BJU",
  "BBa_25QPWWAX",
  "BBa_260OK570",
  "BBa_26X6M2G5",
  "BBa_26K4GKDM",
  "BBa_26JGAV43",
  "BBa_26E5B9VX",
  "BBa_26ICD9HH",
  "BBa_26ECUEKG",
  "BBa_26IU3R0X",
  "BBa_26K3KXDO",
  "BBa_26B5K9XJ",
  "BBa_267N41A9",
  "BBa_265VC540",
  "BBa_26BY6BJU",
  "BBa_26WPAP5Y",
  "BBa_26BVWV01",
  "BBa_26603AT5",
  "BBa_26KHWZ9J",
  "BBa_260OK570",
  "BBa_261MMQ1L",
];

const registryIds = [...new Set(registryRowIds)].sort();

async function openParts(page: Page) {
  await page.goto("/ouc-haide/parts");
  await expect(
    page.getByRole("heading", { name: "Parts", level: 1 }),
  ).toBeVisible();
  await expect(page.locator("#root")).not.toHaveAttribute("aria-busy", "true");
}

async function outlineTypeMetrics(page: Page) {
  return page.evaluate(() => {
    const link = document.querySelector("#article-outline a");
    const toggle = document.querySelector(
      'button[aria-controls="article-outline"]',
    );
    if (!link || !toggle) throw new Error("Article outline was not found");

    return {
      link: getComputedStyle(link).fontSize,
      toggle: getComputedStyle(toggle).fontSize,
    };
  });
}

test.describe("parts page", () => {
  test("renders the complete supplied catalogue", async ({ page }) => {
    await openParts(page);

    await expect(
      page.getByRole("heading", {
        name: "Pentose-Regulation Part Collection",
        level: 2,
      }),
    ).toBeVisible();
    await expect(page.locator("[data-part-card]")).toHaveCount(24);

    const collectionCta = page.getByRole("link", {
      name: "Explore the Registry Collection",
    });
    await expect(collectionCta).toBeVisible();
    await expect(collectionCta).toHaveAttribute(
      "href",
      "https://registry.igem.org/collections/4e32e74e-e8d6-4539-8bc4-11eddbf2edf8",
    );
    await expect(collectionCta).toHaveAttribute("target", "_blank");
    await expect(
      page.locator(
        "#parts-pentose-regulation [data-registry-collection-cta] + p",
      ),
    ).toBeAttached();

    const cards = page.locator("[data-part-card]");
    const hrefs = await cards
      .locator("a")
      .evaluateAll((links) =>
        links.map((link) => (link as HTMLAnchorElement).href),
      );
    expect(hrefs).toHaveLength(24);
    for (const href of hrefs) {
      expect(href).toMatch(/^https:\/\/registry\.igem\.org\/parts\/bba-/);
    }
    expect(new Set(hrefs).size).toBe(19);
    expect(hrefs.map((href) => href.split("/").at(-1))).toEqual(
      registryRowIds.map((id) => id.toLowerCase().replace(/_/g, "-")),
    );

    const pageText = await page.locator("main").innerText();
    for (const id of registryIds) {
      expect(pageText).toContain(id);
    }
    expect(pageText).toContain(
      "RT-qPCR measurements of selected xylose-associated genes",
    );
    expect(pageText).toContain(
      "Mixed-sugar and corn-stover hydrolysate fermentations",
    );
    const firstCard = page
      .locator("#parts-core-parts [data-part-card]")
      .first();
    await expect(
      firstCard.getByRole("heading", { name: "A08 xlnR gene", level: 4 }),
    ).toBeVisible();
    await expect(
      firstCard.getByText(
        "Provides the native XlnR regulator gene for functional studies and expression-construct development.",
      ),
    ).toBeVisible();
    await expect(
      firstCard.getByRole("link", {
        name: "Open BBa_26X6M2G5 in the iGEM Registry",
      }),
    ).toHaveText("BBa_26X6M2G5");
  });

  test("part names lead and every card closes with its Registry ID", async ({
    page,
  }) => {
    await openParts(page);

    const cards = page.locator("[data-part-card]");
    await expect(cards).toHaveCount(24);

    const structures = await cards.evaluateAll((elements) =>
      elements.map((element) =>
        Array.from(element.children).map((child) => child.tagName),
      ),
    );
    for (const structure of structures) {
      expect(structure[0]).toMatch(/^H[34]$/);
      expect(structure.slice(1)).toEqual(["P", "DIV"]);
    }

    const firstCard = cards.first();
    await firstCard.scrollIntoViewIfNeeded();
    await expect(firstCard).toHaveCSS("opacity", "1");
    await expect(firstCard.getByRole("heading", { level: 4 })).toHaveText(
      "A08 xlnR gene",
    );
    await expect(firstCard.getByRole("link")).toHaveText("BBa_26X6M2G5");
  });

  test("removes decorative labels and zero-padded catalogue copy", async ({
    page,
  }) => {
    await openParts(page);

    const mainText = await page.locator("main").innerText();
    expect(mainText).toContain("Our 18 Registry entries");
    expect(mainText).toContain(
      "They are grouped below by function, with direct links to their Registry records.",
    );
    expect(mainText).not.toContain("Candidate set");
    expect(mainText).not.toContain("Shared backbone family");
    expect(mainText).not.toContain("Tool pairing");
    expect(mainText).not.toContain("Pair 01");
    expect(mainText).not.toContain("01 genes");
    expect(mainText).not.toContain("02 genes");
  });

  test("card grids adapt without horizontal overflow", async ({ page }) => {
    await openParts(page);
    await expect(
      page.getByRole("heading", {
        name: "Pentose-Regulation Part Collection",
        level: 2,
      }),
    ).toBeVisible();
    const cards = page.locator("#parts-core-parts [data-part-card]");
    await expect(cards).toHaveCount(4);

    const expectedColumns = [
      { width: 1440, columns: 2 },
      { width: 1024, columns: 1 },
      { width: 768, columns: 1 },
      { width: 390, columns: 1 },
    ];

    for (const viewport of expectedColumns) {
      await page.setViewportSize({ width: viewport.width, height: 900 });
      await expect
        .poll(() =>
          cards.evaluateAll((elements) => {
            const firstTop = elements[0].getBoundingClientRect().top;
            return elements.filter(
              (element) =>
                Math.abs(element.getBoundingClientRect().top - firstTop) < 2,
            ).length;
          }),
        )
        .toBe(viewport.columns);

      const overflow = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        page: document.documentElement.scrollWidth,
      }));
      expect(overflow.page).toBeLessThanOrEqual(overflow.viewport + 1);
    }
  });

  test("reduced motion keeps every card readable", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await openParts(page);

    const card = page.locator("#parts-core-parts [data-part-card]").first();
    await expect(card).toHaveCSS("opacity", "1");
  });

  test("touch exposes the complete static card", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile");
    await openParts(page);

    const card = page.locator("#parts-core-parts [data-part-card]").first();
    await card.scrollIntoViewIfNeeded();
    await expect(card).toHaveCSS("opacity", "1");
    await expect(card.getByRole("heading", { level: 4 })).toBeVisible();
    await expect(card.getByRole("link")).toBeVisible();
  });

  test("headings never skip a level", async ({ page }) => {
    await openParts(page);
    await expect(page.locator("#parts-connect")).toBeAttached();

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

  test("outline typography uses the shared article shell", async ({ page }) => {
    await openParts(page);
    const partsMetrics = await outlineTypeMetrics(page);

    await page.goto("/ouc-haide/hardware");
    await expect(
      page.getByRole("heading", { name: "Hardware", level: 1 }),
    ).toBeVisible();
    const sharedMetrics = await outlineTypeMetrics(page);

    expect(partsMetrics).toEqual(sharedMetrics);
  });

  test("catalogue copy and blocks use the shared article rhythm", async ({
    page,
  }) => {
    await openParts(page);

    const metrics = await page.evaluate(() => {
      const main = document.querySelector("main[data-article-theme]");
      const article = document.querySelector("#article-body article");
      const paragraph = article?.querySelector("section p");
      const partDescription = article?.querySelector("[data-part-card] p");
      const firstBlock = article?.querySelector("[class*='partsCollection']");
      if (!main || !article || !paragraph || !partDescription || !firstBlock) {
        throw new Error("Parts article measurements were not found");
      }

      const probe = document.createElement("div");
      probe.style.fontSize = "var(--article-text)";
      probe.style.marginBlock = "var(--article-space-block)";
      main.append(probe);

      const expected = getComputedStyle(probe);
      const paragraphStyle = getComputedStyle(paragraph);
      const partDescriptionStyle = getComputedStyle(partDescription);
      const blockStyle = getComputedStyle(firstBlock);
      const articleRect = article.getBoundingClientRect();
      const paragraphRect = paragraph.getBoundingClientRect();
      const result = {
        expectedFontSize: expected.fontSize,
        expectedBlockSpace: expected.marginTop,
        paragraphFontSize: paragraphStyle.fontSize,
        partDescriptionFontSize: partDescriptionStyle.fontSize,
        blockMarginTop: blockStyle.marginTop,
        blockMarginBottom: blockStyle.marginBottom,
        articleWidth: articleRect.width,
        paragraphWidth: paragraphRect.width,
      };
      probe.remove();
      return result;
    });

    expect(metrics.paragraphFontSize).toBe(metrics.expectedFontSize);
    expect(metrics.partDescriptionFontSize).toBe(metrics.expectedFontSize);
    expect(metrics.blockMarginTop).toBe(metrics.expectedBlockSpace);
    expect(metrics.blockMarginBottom).toBe(metrics.expectedBlockSpace);
    expect(metrics.paragraphWidth).toBeCloseTo(metrics.articleWidth, 1);
  });

  test("mobile outline links to the catalogue sections", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile");
    await openParts(page);

    await expect(
      page.getByRole("heading", {
        name: "Pentose-Regulation Part Collection",
        level: 2,
      }),
    ).toBeVisible();
    const toggle = page.getByRole("button", { name: "On this page" });
    const outline = page.getByRole("navigation", { name: "On this page" });

    await toggle.click();
    await expect(outline).toBeVisible();
    await outline
      .getByRole("link", { name: "Pyruvate Carboxylase Donor Genes" })
      .click();

    await expect(page).toHaveURL(/#parts-pyc-donor-genes$/);
    await expect(page.locator("#parts-pyc-donor-genes")).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(outline).toBeHidden();
  });
});

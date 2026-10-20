import { expect, test, type Page } from "@playwright/test";

const registryIds = [
  "BBa_25QPWWAX",
  "BBa_260OK570",
  "BBa_261MMQ1L",
  "BBa_265VC540",
  "BBa_26603AT5",
  "BBa_267N41A9",
  "BBa_26B5K9XJ",
  "BBa_26BVWV01",
  "BBa_26BY6BJU",
  "BBa_26E5B9VX",
  "BBa_26ECUEKG",
  "BBa_26ICD9HH",
  "BBa_26IU3R0X",
  "BBa_26JGAV43",
  "BBa_26K3KXDO",
  "BBa_26K4GKDM",
  "BBa_26KHWZ9J",
  "BBa_26WPAP5Y",
  "BBa_26X6M2G5",
];

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
      page.getByRole("heading", { name: "Parts", level: 1 }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        name: "Pentose-Regulation Part Collection",
        level: 2,
      }),
    ).toBeVisible();
    await expect(page.locator("[data-part-card]")).toHaveCount(24);

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

    const card = page.locator("#parts-core-parts [data-part-card]").first();
    await card.scrollIntoViewIfNeeded();
    await expect(card).toHaveAttribute("data-visible", "true");
    await expect(card).toHaveCSS("opacity", "1");

    const blocks = await card
      .locator(":scope > div > *")
      .evaluateAll((elements) =>
        elements.map((element) => ({
          tag: element.tagName,
          text: element.textContent?.trim() ?? "",
        })),
      );
    expect(blocks.map(({ tag }) => tag)).toEqual(["H4", "P", "DIV"]);
    expect(blocks[0].text).toBe("A08 xlnR gene");
    expect(blocks.at(-1)?.text).toContain("BBa_26X6M2G5");
  });

  test("removes decorative labels and zero-padded catalogue copy", async ({
    page,
  }) => {
    await openParts(page);

    const mainText = await page.locator("main").innerText();
    expect(mainText).toContain("24 part records covering 19 unique");
    expect(mainText).not.toContain("Our 18 Registry entries");
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
      { width: 1440, columns: 1 },
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
    await expect(card).toHaveAttribute("data-visible", "true");
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

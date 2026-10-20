import { expect, test } from "@playwright/test";

test.describe("hardware page", () => {
  test("budget explorer filters the ledger and recalculates totals", async ({
    page,
  }) => {
    await page.goto("/ouc-haide/hardware");

    const budget = page.locator("#hardware-budget");
    const items = budget.locator("[data-budget-item]");
    const total = budget.locator("[data-budget-total]");
    const status = budget.getByRole("status");

    await expect(total).toHaveAttribute("data-budget-total", "171.54");
    await expect(items).toHaveCount(20);
    await expect(status).toHaveText(
      "Showing 20 of 20 items for all subsystems",
    );

    await budget.getByRole("button", { name: /^Sensing/ }).click();

    await expect(items).toHaveCount(4);
    await expect(status).toHaveText("Showing 4 of 20 items for Sensing");
    await expect(
      budget.getByRole("button", { name: /^Sensing/ }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(budget.locator("[data-budget-visible-total]")).toHaveText(
      "$36.75",
    );

    await budget.getByRole("button", { name: /^All/ }).click();

    await expect(items).toHaveCount(20);
    await expect(status).toHaveText(
      "Showing 20 of 20 items for all subsystems",
    );
    await expect(budget.locator("[data-budget-visible-total]")).toHaveText(
      "$171.54",
    );
  });

  test("failure matrix disclosures open and close independently", async ({
    page,
  }) => {
    await page.goto("/ouc-haide/hardware");

    const failureItems = page.locator(
      "#hardware-ammonia-removal [data-failure-item]",
    );
    await expect(failureItems).toHaveCount(5);
    await expect(failureItems.nth(0)).toHaveAttribute("data-open", "true");

    const second = failureItems.nth(1);
    const secondToggle = second.getByRole("button");
    const secondPanel = second.locator("[data-failure-panel]");
    await expect(secondPanel).toHaveCSS("grid-template-rows", "0px");

    await secondToggle.click();
    await expect(second).toHaveAttribute("data-open", "true");
    await expect(secondToggle).toHaveAttribute("aria-expanded", "true");
    await expect(failureItems.nth(0)).toHaveAttribute("data-open", "true");
    await expect
      .poll(() =>
        secondPanel.evaluate(
          (element) => element.getBoundingClientRect().height,
        ),
      )
      .toBeGreaterThan(0);

    await secondToggle.click();
    await expect(second).toHaveAttribute("data-open", "false");
    await expect(secondToggle).toHaveAttribute("aria-expanded", "false");
    await expect(failureItems.nth(0)).toHaveAttribute("data-open", "true");
  });

  test("principle interpretation renders the source prose", async ({
    page,
  }) => {
    await page.goto("/ouc-haide/hardware");

    const section = page.locator("#hardware-ammonia-removal");
    const principle = section
      .locator("p")
      .filter({ hasText: "We use cation exchange resin as the adsorbent." });

    await expect(
      section.getByRole("heading", {
        name: "Principle Interpretation",
        level: 3,
      }),
    ).toBeVisible();
    await expect(principle).toHaveCount(1);
    await expect(principle).toContainText(
      "We use cation exchange resin as the adsorbent.",
    );
    await expect(principle).toContainText(
      "Once saturated, the resin can be regenerated through elution to recover its adsorption capacity for repeated use",
    );
    await expect(principle).toContainText(
      "After this treatment, the ammonia nitrogen concentration of the broth drops to a sufficiently low level, and the liquid can be sent to downstream sugar concentration and aerobic fermentation.",
    );
    await expect(principle.locator("sup.cite-ref a")).toHaveAttribute(
      "href",
      "#ref-1",
    );
    await expect(
      section.getByRole("heading", {
        name: "Capture ammonium. Release sodium or protons.",
      }),
    ).toHaveCount(0);
    await expect(page.locator("#hardware-figure-4-1")).toBeVisible();
  });

  test("component catalog uses balanced adaptive masonry columns", async ({
    page,
  }, testInfo) => {
    await page.goto("/ouc-haide/hardware");

    const catalog = page.locator("#hardware-components");
    const cards = catalog.locator("[data-catalog-group]");
    await expect(cards).toHaveCount(5);

    const layout = await cards.evaluateAll((elements) => ({
      positions: [
        ...new Set(
          elements.map((element) =>
            Math.round(element.getBoundingClientRect().x),
          ),
        ),
      ],
    }));

    expect(layout.positions).toHaveLength(
      testInfo.project.name === "mobile" ? 1 : 2,
    );
    await expect(catalog.locator("[class*='catalogGrid']")).toHaveAttribute(
      "aria-owns",
      "catalog-group-fluidic catalog-group-chemistry catalog-group-structure catalog-group-sensing catalog-group-control",
    );

    if (testInfo.project.name !== "mobile") {
      await expect
        .poll(() =>
          catalog.locator("[data-catalog-column]").evaluateAll((columns) => {
            const heights = columns.map(
              (column) => column.getBoundingClientRect().height,
            );
            return Math.max(...heights) - Math.min(...heights);
          }),
        )
        .toBeLessThan(200);
    }
  });

  test("IoT arrows sit on the gaps between cards", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name === "mobile");
    await page.goto("/ouc-haide/hardware");

    const alignment = await page
      .locator("#hardware-iot [data-iot-group]")
      .evaluateAll((groups) =>
        groups.slice(0, -1).map((group) => {
          const card = group.getBoundingClientRect();
          const next = group.nextElementSibling!.getBoundingClientRect();
          const connector = group
            .querySelector("[class*='iotConnector']")!
            .getBoundingClientRect();
          return {
            x:
              connector.x +
              connector.width / 2 -
              (card.right + (next.left - card.right) / 2),
            y:
              connector.y + connector.height / 2 - (card.top + card.height / 2),
            size: connector.width,
          };
        }),
      );

    for (const position of alignment) {
      expect(Math.abs(position.x)).toBeLessThanOrEqual(1.5);
      expect(Math.abs(position.y)).toBeLessThanOrEqual(1.5);
      expect(position.size).toBeGreaterThanOrEqual(34);
    }
  });

  test("references retain working links", async ({ page }) => {
    await page.goto("/ouc-haide/hardware");

    const toggle = page.getByRole("button", { name: /References$/ });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");

    const references = page.locator("#references");
    await expect(references.getByRole("region")).toBeVisible();
    await expect(references.locator("ol > li")).toHaveCount(4);
    await expect(
      references.getByRole("link", {
        name: "https://doi.org/10.1007/s10295-020-02308-1",
      }),
    ).toHaveAttribute("rel", "noopener noreferrer");
    await expect(
      references.getByRole("link", { name: "https://engineering.igem.org" }),
    ).toHaveAttribute("target", "_blank");
  });

  test("available iGEM videos render as embeds", async ({ page }) => {
    await page.goto("/ouc-haide/hardware");

    const videos = page.locator("iframe[title^='HARDWARE video']");
    await expect(videos).toHaveCount(2);
    await expect(videos.nth(0)).toHaveAttribute(
      "src",
      /video\.igem\.org\/videos\/embed\/qTd67URK3G5zPEptrTrRsQ/,
    );
    await expect(videos.nth(1)).toHaveAttribute(
      "src",
      /video\.igem\.org\/videos\/embed\/u6pTEWPWtHFk3WeDh5oU8t/,
    );
    for (const video of [videos.nth(0), videos.nth(1)]) {
      await expect(video).toHaveAttribute(
        "sandbox",
        "allow-same-origin allow-scripts allow-popups allow-forms",
      );
    }
  });

  test("in-text citations match the source reference ledger", async ({
    page,
  }) => {
    await page.goto("/ouc-haide/hardware");

    const ammoniaCitations = page.locator(
      "#hardware-ammonia-removal sup.cite-ref a",
    );
    await expect(ammoniaCitations.nth(0)).toHaveAttribute("href", "#ref-1");
    await expect(ammoniaCitations.nth(1)).toHaveAttribute("href", "#ref-2");
    await expect(
      page.locator("#hardware-iot sup.cite-ref a").first(),
    ).toHaveAttribute("href", "#ref-3");
    await page.getByRole("button", { name: /References$/ }).click();
    await expect(page.locator("#ref-1")).toContainText("Zhang");
    await expect(page.locator("#ref-2")).toContainText("Versteeg");
    await expect(page.locator("#ref-3")).toContainText("Gargalo");
  });

  test("page remains inside the viewport", async ({ page }) => {
    await page.goto("/ouc-haide/hardware");
    await page.getByRole("button", { name: /References$/ }).click();
    await expect(page.locator("#references [role='region']")).toBeVisible();
    await page.locator("#ref-1").scrollIntoViewIfNeeded();

    const overflow = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      page: document.documentElement.scrollWidth,
    }));

    expect(overflow.page).toBeLessThanOrEqual(overflow.viewport + 1);
  });

  test("mobile outline opens, navigates, and closes", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile");
    await page.goto("/ouc-haide/hardware");

    const toggle = page.getByRole("button", { name: "On this page" });
    const outline = page.getByRole("navigation", { name: "On this page" });

    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(outline).toBeHidden();

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(outline).toBeVisible();

    await outline.getByRole("link", { name: /Device Budget$/ }).click();
    await expect(page).toHaveURL(/#hardware-budget$/);
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(outline).toBeHidden();

    await expect
      .poll(async () => {
        const [heading, outlineToggle] = await Promise.all([
          page.locator("#hardware-budget-heading").boundingBox(),
          toggle.boundingBox(),
        ]);
        if (!heading || !outlineToggle) return false;
        return heading.y >= outlineToggle.y + outlineToggle.height - 1;
      })
      .toBe(true);
  });

  test("article headings never skip a level", async ({ page }) => {
    await page.goto("/ouc-haide/hardware");

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
});

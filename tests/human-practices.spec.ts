import { expect, test } from "@playwright/test";

const PAGE = "/ouc-haide/human-practices";

async function openIhp(page: import("@playwright/test").Page, hash = "") {
  await page.goto(`${PAGE}${hash}`);
  await expect(
    page.getByRole("heading", { level: 1, name: "Integrated Human Practices" }),
  ).toBeVisible();
  await expect(page.locator("#root")).not.toHaveAttribute("inert", "");
  if (hash) {
    await expect(page.locator(hash)).toHaveAttribute("data-open", "true");
  }
}

test.describe("integrated human practices", () => {
  test("renders the source structure with complete, unique anchors", async ({
    page,
  }) => {
    await openIhp(page);

    await expect(
      page.locator('section[id^="ihp-stakeholder-group-"]'),
    ).toHaveCount(6);
    await expect(
      page.getByRole("region", { name: /^TRACE cycle / }),
    ).toHaveCount(13);
    const cycle12 = page.getByRole("region", {
      name: "TRACE cycle 12",
      exact: true,
    });
    const cycle13 = page.getByRole("region", {
      name: "TRACE cycle 13",
      exact: true,
    });
    const cycle12Descriptors = [
      "From Material Development to Practical Application",
      "Exploring Commercialization Challenges at CCiC",
      "From Production Cost to Material Value",
      "Integrating Commercial Considerations into Technical Development",
      "Balancing Material Innovation with Manufacturing Feasibility",
    ];
    const cycle13Descriptors = [
      "When Material Development Raises New Safety Questions",
      "A New Perspective from Grand APiC",
      "Following Safety Through the Production Pathway",
      "Bringing Safety into Project Development",
      "Extending Responsibility Beyond the Laboratory",
    ];
    for (const descriptor of cycle12Descriptors) {
      await expect(cycle12).toContainText(descriptor);
    }
    for (const descriptor of cycle13Descriptors) {
      await expect(cycle13).toContainText(descriptor);
    }
    await expect(
      page.getByRole("region", { name: "TRACE cycle 1", exact: true }),
    ).not.toContainText("From Material Development to Practical Application");
    const descriptorPlacement = await page.evaluate(
      ({ cycle12, cycle13 }) => {
        const descriptors = [...cycle12, ...cycle13];
        return Array.from(
          document.querySelectorAll<HTMLElement>(
            'section[aria-label^="TRACE cycle "]',
          ),
        ).map((cycle) => {
          const text = cycle.textContent ?? "";
          return {
            label: cycle.getAttribute("aria-label"),
            counts: descriptors.map(
              (descriptor) => text.split(descriptor).length - 1,
            ),
          };
        });
      },
      {
        cycle12: cycle12Descriptors,
        cycle13: cycle13Descriptors,
      },
    );
    const allDescriptors = [...cycle12Descriptors, ...cycle13Descriptors];
    expect(descriptorPlacement).toHaveLength(13);
    for (const [index, cycle] of descriptorPlacement.entries()) {
      const expected = [
        ...(index === 11 ? cycle12Descriptors : []),
        ...(index === 12 ? cycle13Descriptors : []),
      ];
      expect(
        cycle.counts,
        `${cycle.label} must contain each descriptor only in its source cycle`,
      ).toEqual(
        allDescriptors.map((descriptor) =>
          expected.includes(descriptor) ? 1 : 0,
        ),
      );
    }
    await expect(
      page.locator("#ihp-journey h3").filter({
        hasText: /^Stakeholder Navigator$/,
      }),
    ).toHaveCount(1);
    await expect(
      page.locator("#ihp-biological-system h4").filter({
        hasText: /^Defining the Carbon Destination$/,
      }),
    ).toHaveCount(1);
    await expect(page.locator("#ihp-collaborators-title")).toBeVisible();

    const anchors = await page.evaluate(() => {
      const allIds = Array.from(document.querySelectorAll<HTMLElement>("[id]"))
        .map((element) => element.id)
        .filter(Boolean);
      const duplicates = allIds.filter(
        (id, index) => allIds.indexOf(id) !== index,
      );
      const missing = Array.from(
        document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'),
      )
        .map((link) => link.hash.slice(1))
        .filter((hash) => hash && !document.getElementById(hash));
      return { duplicates, missing: [...new Set(missing)] };
    });

    expect(anchors.duplicates).toEqual([]);
    expect(anchors.missing).toEqual([]);

    const figureNumbers = await page.evaluate(() =>
      Array.from(document.body.innerText.matchAll(/Figure\s+(\d+)\./g)).map(
        (match) => Number(match[1]),
      ),
    );
    const uniqueFigures = [...new Set(figureNumbers)].sort((a, b) => a - b);
    expect(uniqueFigures).toEqual(
      Array.from({ length: 43 }, (_, index) => index + 1),
    );

    const duplicateGalleryAlts = await page.evaluate(() =>
      Array.from(document.querySelectorAll("figure"))
        .map((figure) =>
          Array.from(figure.querySelectorAll("img")).map((image) => image.alt),
        )
        .filter(
          (alts) => alts.length > 1 && new Set(alts).size !== alts.length,
        ),
    );
    expect(duplicateGalleryAlts).toEqual([]);

    const firstCaption = page
      .locator("figure figcaption")
      .filter({ hasText: /^Figure 1\./ })
      .first();
    expect((await firstCaption.textContent())?.trim()).toMatch(
      /^Figure 1\. \S/,
    );
    await expect(
      page
        .locator(
          "#ihp-stakeholder-group-feedstock-and-agricultural-reality img",
        )
        .first(),
    ).toHaveAttribute("alt", /^Stakeholder portrait: /);
  });

  test("stakeholder details open in a modal and return focus", async ({
    page,
  }) => {
    await openIhp(page);

    const group = page.locator(
      "#ihp-stakeholder-group-feedstock-and-agricultural-reality",
    );
    const card = group.locator("article").first();
    const expand = card.locator("button[aria-expanded]").first();
    const details = page.locator("[data-stakeholder-details]");
    const close = details.getByRole("button", { name: /^Close details/ });

    await expect(expand).toHaveAccessibleName(/^View details for /);
    await expect(expand).toHaveAttribute("aria-expanded", "false");
    await expect(expand).toHaveAttribute("aria-haspopup", "dialog");
    await expect(details).toBeHidden();

    await expand.click();
    await expect(expand).toHaveAttribute("aria-expanded", "true");
    await expect(details).toBeVisible();
    await expect(details).toHaveAttribute("open", "");
    await expect(details).toHaveRole("dialog");
    await expect(close).toBeFocused();
    await expect(expand).toHaveAccessibleName(/^Hide details for /);

    await close.click();
    await expect(expand).toHaveAttribute("aria-expanded", "false");
    await expect(details).toBeHidden();
    await expect(expand).toBeFocused();

    await expand.click();
    await expect(details).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(details).toBeHidden();
    await expect(expand).toBeFocused();

    await expand.click();
    await expect(details).toBeVisible();
    const storyLink = details.getByRole("link", {
      name: /Read the full TRACE story/,
    });
    const storyHref = await storyLink.getAttribute("href");
    expect(storyHref).toMatch(/^#ihp-/);

    await storyLink.click();
    await expect(details).toBeHidden();
    await expect(page).toHaveURL(new RegExp(`${storyHref}$`));
    await expect(page.locator(storyHref!)).toBeVisible();
    await expect
      .poll(() =>
        page.locator(storyHref!).evaluate((target) => {
          const top = target.getBoundingClientRect().top;
          return top >= 0 && top < window.innerHeight;
        }),
      )
      .toBe(true);
    await expect(expand).not.toBeFocused();
  });

  test("stakeholder modal opening does not expose shell overflow", async ({
    page,
  }) => {
    await openIhp(page);

    const overflowingFrames = await page.evaluate(async () => {
      const samples: number[][] = [];
      const startedAt = performance.now();

      const sample = () => {
        const dialog = document.querySelector(
          "dialog[data-stakeholder-details]",
        );
        const scroller = dialog?.querySelector<HTMLElement>(
          "[data-stakeholder-scroller]",
        );

        if (dialog && scroller) {
          samples.push([
            dialog.scrollWidth - dialog.clientWidth,
            dialog.scrollHeight - dialog.clientHeight,
            scroller.scrollWidth - scroller.clientWidth,
          ]);
        }

        if (performance.now() - startedAt < 700) requestAnimationFrame(sample);
      };

      requestAnimationFrame(sample);
      document
        .querySelector<HTMLButtonElement>(
          "#ihp-stakeholder-group-feedstock-and-agricultural-reality article button[aria-expanded]",
        )
        ?.click();

      await new Promise((resolve) => setTimeout(resolve, 750));
      return {
        overflowingFrames: samples.filter((sizes) =>
          sizes.some((size) => size > 0),
        ),
        pageOverflow:
          document.documentElement.scrollWidth -
          document.documentElement.clientWidth,
      };
    });

    expect(overflowingFrames.overflowingFrames).toEqual([]);
    expect(overflowingFrames.pageOverflow).toBeLessThanOrEqual(1);
  });

  test("stakeholder portraits remain fully visible in cards and dialogs", async ({
    page,
  }) => {
    await openIhp(page);

    const cards = page.locator("[data-stakeholder-card]");
    const details = page.locator("[data-stakeholder-details]");
    const cardChecks: Array<Record<string, unknown>> = [];
    const dialogChecks: Array<Record<string, unknown>> = [];

    await expect(cards).toHaveCount(22);

    for (let index = 0; index < 22; index += 1) {
      const card = cards.nth(index);
      await card.scrollIntoViewIfNeeded();

      const cardImage = card.locator("img").first();
      await cardImage.evaluate(async (image) => {
        if (!image.complete) {
          await new Promise((resolve) => {
            image.addEventListener("load", resolve, { once: true });
            image.addEventListener("error", resolve, { once: true });
          });
        }
        await image.decode().catch(() => undefined);
      });

      cardChecks.push(
        await cardImage.evaluate((image) => {
          const frame = image.parentElement!.getBoundingClientRect();
          const box = image.getBoundingClientRect();
          const style = getComputedStyle(image);
          return {
            name: image.alt,
            complete: image.complete,
            naturalWidth: image.naturalWidth,
            objectFit: style.objectFit,
            withinFrame:
              box.left >= frame.left - 0.5 &&
              box.top >= frame.top - 0.5 &&
              box.right <= frame.right + 0.5 &&
              box.bottom <= frame.bottom + 0.5,
          };
        }),
      );

      await card.locator("button[aria-expanded]").click();
      await expect(details).toBeVisible();

      const dialogImage = details.locator("img").first();
      await dialogImage.evaluate(async (image) => {
        await image.decode().catch(() => undefined);
      });

      dialogChecks.push(
        await dialogImage.evaluate((image) => {
          const frame = image.parentElement!.getBoundingClientRect();
          const box = image.getBoundingClientRect();
          const style = getComputedStyle(image);
          return {
            name: image.alt,
            complete: image.complete,
            naturalWidth: image.naturalWidth,
            objectFit: style.objectFit,
            withinFrame:
              box.left >= frame.left - 0.5 &&
              box.top >= frame.top - 0.5 &&
              box.right <= frame.right + 0.5 &&
              box.bottom <= frame.bottom + 0.5,
          };
        }),
      );

      await page.keyboard.press("Escape");
      await expect(details).toBeHidden();
    }

    expect(cardChecks).toHaveLength(22);
    expect(dialogChecks).toHaveLength(22);
    expect(
      [...cardChecks, ...dialogChecks].filter(
        (image) =>
          !image.complete ||
          Number(image.naturalWidth) <= 0 ||
          image.objectFit !== "contain" ||
          image.withinFrame !== true,
      ),
    ).toEqual([]);
  });

  test("SDG cards stay compact and flip by keyboard", async ({ page }) => {
    await openIhp(page, "#ihp-trace-10");

    const cards = page.locator('section[aria-label="Three SDG lenses"]');
    const buttons = cards.getByRole("button");
    const firstCard = cards.locator("article").first();
    const firstButton = buttons.first();

    await expect(buttons).toHaveCount(3);
    const closedCards = await cards.locator("article").evaluateAll((articles) =>
      articles.map((card) => {
        const front = card.querySelector<HTMLElement>(
          'span[aria-hidden="false"]',
        );
        const icon = front?.querySelector("img");
        const action = front?.querySelector<HTMLElement>('[class*="action"]');
        if (!front || !icon || !action) {
          throw new Error("SDG card front is incomplete");
        }

        const cardRect = card.getBoundingClientRect();
        const frontRect = front.getBoundingClientRect();
        const iconRect = icon.getBoundingClientRect();
        const actionRect = action.getBoundingClientRect();
        return {
          height: cardRect.height,
          contentInside:
            iconRect.top >= frontRect.top - 0.5 &&
            iconRect.bottom <= frontRect.bottom + 0.5 &&
            actionRect.top >= frontRect.top - 0.5 &&
            actionRect.bottom <= frontRect.bottom + 0.5,
        };
      }),
    );
    const rootFontSize = await page.evaluate(() =>
      Number.parseFloat(getComputedStyle(document.documentElement).fontSize),
    );
    expect(Math.max(...closedCards.map((card) => card.height))).toBeLessThan(
      22 * rootFontSize,
    );
    expect(closedCards.every((card) => card.contentInside)).toBe(true);

    await expect(firstButton).toHaveAttribute("aria-pressed", "false");
    await firstButton.press("Enter");

    await expect(firstButton).toHaveAttribute("aria-pressed", "true");
    await expect(firstCard).toHaveAttribute("data-flipped", "true");
    await expect(firstButton).toBeFocused();

    await firstButton.press("Space");
    await expect(firstButton).toHaveAttribute("aria-pressed", "false");
    await expect(firstCard).toHaveAttribute("data-flipped", "false");
    await expect(firstButton).toBeFocused();
  });

  test("TRACE toggle closes with Escape and keeps focus", async ({ page }) => {
    await openIhp(page);

    await expect(page.locator("[data-trace-controls]")).toHaveCount(0);

    const cycle = page.getByRole("region", {
      name: "TRACE cycle 1",
      exact: true,
    });
    const toggle = cycle.locator("button[aria-expanded]").first();

    await toggle.focus();
    await toggle.press("Enter");
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(cycle).toHaveAttribute("data-open", "true");

    await toggle.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(cycle).toHaveAttribute("data-open", "false");
    await expect(toggle).toBeFocused();
  });

  test("TRACE fragments reveal cycle content beside the timeline rail", async ({
    page,
  }) => {
    await openIhp(page, "#ihp-trace-1");

    const readGeometry = () =>
      page.evaluate(() => {
        const cycle = document
          .querySelector<HTMLElement>('[data-trace-cycle="1"]')
          ?.getBoundingClientRect();
        const stage = document
          .querySelector<HTMLElement>(
            '[data-trace-cycle="1"] [data-stage="trigger"]',
          )
          ?.getBoundingClientRect();
        const body = document
          .querySelector<HTMLElement>(
            '[data-trace-cycle="1"] [data-stage="trigger"] p',
          )
          ?.getBoundingClientRect();
        return {
          cycleTop: cycle?.top ?? null,
          stageLeft: stage?.left ?? null,
          bodyLeft: body?.left ?? null,
        };
      });

    await expect
      .poll(async () => {
        const geometry = await readGeometry();
        return (
          (geometry.cycleTop ?? 0) >= 0 &&
          (geometry.bodyLeft ?? 0) > (geometry.stageLeft ?? 0) + 20
        );
      })
      .toBe(true);

    const geometry = await readGeometry();
    expect(geometry.cycleTop).not.toBeNull();
    expect(geometry.cycleTop ?? 0).toBeGreaterThanOrEqual(0);
    expect(geometry.stageLeft).not.toBeNull();
    expect(geometry.bodyLeft).not.toBeNull();
    expect(geometry.bodyLeft ?? 0).toBeGreaterThan(
      (geometry.stageLeft ?? 0) + 20,
    );
  });

  test("decision cards keep readable columns and clear CTAs", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop");
    await openIhp(page);

    const viewports = [
      { width: 1440, height: 1000 },
      { width: 1024, height: 900 },
      { width: 768, height: 900 },
      { width: 390, height: 844 },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      const firstCard = page.locator("[data-decision-card]").first();
      await firstCard.scrollIntoViewIfNeeded();

      const geometry = await page
        .locator("[data-decision-card]")
        .evaluateAll((cards) =>
          cards.map((card) => {
            const body = card.querySelector("p");
            const cta = card.querySelector(":scope > a");
            const area = card.querySelector("h3");
            const shift = area?.parentElement?.nextElementSibling;
            if (!body || !cta || !area || !shift) return null;
            const bodyBox = body.getBoundingClientRect();
            const ctaBox = cta.getBoundingClientRect();
            const areaBox = area.getBoundingClientRect();
            const shiftBox = shift.getBoundingClientRect();
            return {
              bodyWidth: bodyBox.width,
              ctaHeight: ctaBox.height,
              areaOverflow: area.scrollWidth - area.clientWidth,
              areaOverlapsShift:
                Math.abs(areaBox.top - shiftBox.top) < 6 &&
                areaBox.right > shiftBox.left,
              overlaps: !(
                ctaBox.right <= bodyBox.left ||
                ctaBox.left >= bodyBox.right ||
                ctaBox.bottom <= bodyBox.top ||
                ctaBox.top >= bodyBox.bottom
              ),
            };
          }),
        );

      expect(geometry).not.toContain(null);
      for (const card of geometry) {
        expect(
          card?.bodyWidth,
          `${viewport.width}px body width`,
        ).toBeGreaterThan(240);
        expect(
          card?.ctaHeight,
          `${viewport.width}px CTA height`,
        ).toBeGreaterThanOrEqual(44);
        expect(
          card?.areaOverflow,
          `${viewport.width}px decision-area overflow`,
        ).toBeLessThanOrEqual(1);
        expect(
          card?.areaOverlapsShift,
          `${viewport.width}px decision-area overlap`,
        ).toBe(false);
        expect(card?.overlaps, `${viewport.width}px CTA overlap`).toBe(false);
      }
    }
  });

  test("mobile TRACE previews expose the full trigger and impact text", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile");
    await openIhp(page);

    const clamped = await page
      .locator("[data-trace-preview]")
      .evaluateAll((previews) =>
        previews
          .map((preview) => {
            const style = getComputedStyle(preview);
            return {
              text: preview.textContent?.slice(0, 40) ?? "",
              clipped:
                preview.scrollHeight > preview.clientHeight + 1 ||
                style.webkitLineClamp !== "none",
            };
          })
          .filter((preview) => preview.clipped),
      );

    expect(clamped).toEqual([]);
  });

  test("collaborator links focus a named story target", async ({ page }) => {
    await openIhp(page);

    const targetNames = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll<HTMLAnchorElement>(
          'section[aria-labelledby="ihp-collaborators-title"] a[href^="#ihp-collab-"]',
        ),
      ).map((link) => {
        const target = document.getElementById(link.hash.slice(1));
        return target?.getAttribute("aria-label") ?? "";
      }),
    );
    expect(targetNames).toHaveLength(8);
    expect(new Set(targetNames).size).toBe(targetNames.length);
    expect(targetNames.every((name) => name && name !== "Related story")).toBe(
      true,
    );

    const link = page
      .locator(
        'section[aria-labelledby="ihp-collaborators-title"] a[href="#ihp-collab-ouc-china"]',
      )
      .first();
    await link.click();

    await expect
      .poll(() => page.evaluate(() => document.activeElement?.id ?? ""))
      .toBe("ihp-collab-ouc-china");
    await expect
      .poll(() =>
        page.evaluate(() => document.activeElement?.getAttribute("aria-label")),
      )
      .toContain("OUC-China");

    const genericLink = page
      .locator(
        'section[aria-labelledby="ihp-collaborators-title"] a[href="#ihp-collab-tianjin-exchange"]',
      )
      .first();
    await genericLink.click();
    await expect
      .poll(() => page.evaluate(() => document.activeElement?.id ?? ""))
      .toBe("ihp-collab-tianjin-exchange");
    const nextSiblingOutline = await page.evaluate(() => {
      const target = document.getElementById("ihp-collab-tianjin-exchange");
      return target?.nextElementSibling
        ? getComputedStyle(target.nextElementSibling).outlineStyle
        : null;
    });
    expect(nextSiblingOutline).toBe("solid");
  });

  test("citations reveal and focus their references", async ({ page }) => {
    await openIhp(page);

    const citation = page.locator('sup.cite-ref a[href="#ref-1"]').first();
    await expect(citation).toHaveAccessibleName("Reference 1");
    await citation.click();

    const toggle = page.getByRole("button", {
      name: "References",
      exact: true,
    });
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(page).toHaveURL(/#ref-1$/);
    await expect(page.locator("#ref-1")).toBeFocused();
  });

  test("uses the repository bibliography for the Tang citation", async ({
    page,
  }) => {
    await openIhp(page);

    const entry = page
      .locator("#references li")
      .filter({ hasText: "Tang, Y." })
      .first();
    await expect(entry).toContainText("818–821, 826");
    await expect(entry).not.toContainText("caod.oriprobe.com");
    await expect(
      entry.locator(
        'a[href="https://doi.org/10.13241/j.cnki.pmb.2020.05.004"]',
      ),
    ).toHaveAttribute("target", "_blank");
  });

  test("legacy reflection anchors resolve and headings never skip", async ({
    page,
  }) => {
    await page.goto(`${PAGE}#ihp-reflection-2`);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Integrated Human Practices",
      }),
    ).toBeVisible();
    await expect(page.locator("#ihp-reflection-2")).toHaveCount(1);

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

  test("page remains inside the viewport", async ({ page }) => {
    await openIhp(page);
    await page.evaluate(() => document.fonts.ready);
    await page.locator("#references").scrollIntoViewIfNeeded();

    const layout = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      page: document.documentElement.scrollWidth,
    }));
    expect(layout.page).toBeLessThanOrEqual(layout.viewport + 1);
  });

  test("stakeholder navigator uses six stage rows on desktop", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop");
    await openIhp(page);

    const navigator = page.locator("[data-stakeholder-navigator]");
    const stages = navigator.locator("[data-stakeholder-stage]");
    const topSpacing = await navigator.evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).marginBlockStart),
    );
    const stageColumnCounts = await stages.evaluateAll((elements) =>
      elements.map(
        (element) =>
          getComputedStyle(element).gridTemplateColumns.split(/\s+/).length,
      ),
    );

    expect(topSpacing).toBeGreaterThanOrEqual(20);
    expect(stageColumnCounts).toEqual([2, 2, 2, 2, 2, 2]);
    await expect(navigator.locator("[data-stakeholder-card]")).toHaveCount(22);
    await expect(
      navigator.getByText("View details", { exact: true }),
    ).toHaveCount(0);
    await expect(stages).toHaveCount(6);
    await expect(navigator.locator("[data-stakeholder-heading]")).toHaveCount(
      6,
    );
    await expect(navigator.locator("[data-stakeholder-heading] p")).toHaveCount(
      0,
    );
    await expect(navigator.getByText(/^\d{2} stakeholders$/)).toHaveCount(0);

    const firstCardGrid = stages.nth(0).locator("[data-stakeholder-card-grid]");
    const fourPersonCardGrid = stages
      .nth(2)
      .locator("[data-stakeholder-card-grid]");
    const sixPersonCardGrid = stages
      .nth(4)
      .locator("[data-stakeholder-card-grid]");
    const cardColumnCount = (locator: typeof firstCardGrid) =>
      locator.evaluate(
        (element) =>
          getComputedStyle(element).gridTemplateColumns.split(/\s+/).length,
      );

    await expect.poll(() => cardColumnCount(firstCardGrid)).toBe(3);
    await expect.poll(() => cardColumnCount(fourPersonCardGrid)).toBe(2);
    await expect.poll(() => cardColumnCount(sixPersonCardGrid)).toBe(3);

    const additionalCard = navigator.locator("[data-additional-collaborators]");
    const lastCardGrid = stages.nth(5).locator("[data-stakeholder-card-grid]");
    const lastGridColumns = await cardColumnCount(lastCardGrid);

    expect(lastGridColumns).toBe(3);
    await expect(additionalCard).toBeVisible();
    for (const title of [
      "Feedstock & Agricultural Reality",
      "Biomanufacturing Pathway",
      "Carbon Utilization & Engineering",
      "Material & Application Design",
      "Sustainable Manufacturing & Scale-up",
      "Evaluation & Community Engagement",
    ]) {
      await expect(
        navigator.getByRole("heading", { name: title, exact: true }),
      ).toBeVisible();
    }
    await expect(navigator).toContainText(
      "Qingdao Institute of Bioenergy and Bioprocess Technology (QIBEBT)",
    );
    await expect(
      navigator.getByRole("heading", {
        name: "Additional iGEM Teams & Collaborators",
      }),
    ).toBeVisible();
    await expect(navigator).toContainText("Prof. Ning Yan");
    await expect(navigator).toContainText(
      "Artistic Guidance & Science Communication",
    );
  });

  test("stakeholder navigator uses one card column on mobile", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile");
    await openIhp(page);

    const columnCount = await page
      .locator("[data-stakeholder-card-grid]")
      .first()
      .evaluate(
        (element) =>
          getComputedStyle(element).gridTemplateColumns.split(/\s+/).length,
      );
    const qibebtTypography = await page
      .locator("[data-stakeholder-card]")
      .filter({ hasText: "QIBEBT" })
      .locator("h4")
      .evaluate((element) => {
        const style = getComputedStyle(element);
        return {
          family: style.fontFamily,
          size: Number.parseFloat(style.fontSize),
        };
      });

    expect(columnCount).toBe(1);
    expect(qibebtTypography.family.toLowerCase()).not.toContain("impact");
    expect(qibebtTypography.size).toBeGreaterThanOrEqual(16);
  });

  test("stakeholder navigator reflows to two card columns on tablet", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop");
    await openIhp(page);
    await page.setViewportSize({ width: 768, height: 1024 });

    const columnCount = await page
      .locator("[data-stakeholder-card-grid]")
      .first()
      .evaluate(
        (element) =>
          getComputedStyle(element).gridTemplateColumns.split(/\s+/).length,
      );

    expect(columnCount).toBe(2);
  });

  test("mobile outline opens and navigates to a section", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile");
    await openIhp(page);

    const toggle = page.getByRole("button", { name: "On this page" });
    const outline = page.getByRole("navigation", { name: "On this page" });

    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(outline).toBeHidden();
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(outline).toBeVisible();

    await outline
      .getByRole("link", { name: /Understanding the Problem & Feedstock/ })
      .click();
    await expect(page).toHaveURL(/#ihp-feedstock$/);
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(outline).toBeHidden();
  });

  test("mobile outline yields to reading and returns on upward scroll", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile");
    await openIhp(page);

    const toggle = page.getByRole("button", { name: "On this page" });
    const outline = toggle.locator("..");

    await expect(outline).not.toHaveAttribute("data-hidden", "true");
    await page.evaluate(() => window.scrollTo(0, 900));
    await expect(outline).toHaveAttribute("data-hidden", "true");

    await toggle.evaluate((element) =>
      (element as HTMLElement).focus({ preventScroll: true }),
    );
    await expect(outline).toHaveCSS("opacity", "1");
    const navbar = page.locator("header").first();
    await expect(navbar).toBeVisible();
    await expect
      .poll(() =>
        navbar.evaluate((element) => element.getBoundingClientRect().top),
      )
      .toBeGreaterThanOrEqual(-1);
    const focusedGeometry = await outline.evaluate((element) => {
      const box = element.getBoundingClientRect();
      const navbar = document.querySelector("header");
      const navbarBox = navbar?.getBoundingClientRect();
      return {
        top: box.top,
        bottom: box.bottom,
        viewportHeight: window.innerHeight,
        navbarBottom: navbarBox?.bottom ?? 0,
        navAllowance:
          Number.parseFloat(getComputedStyle(document.body).paddingTop) || 0,
      };
    });
    expect(focusedGeometry.top).toBeGreaterThanOrEqual(
      focusedGeometry.navbarBottom + 1,
    );
    expect(focusedGeometry.top).toBeGreaterThanOrEqual(
      focusedGeometry.navAllowance,
    );
    expect(focusedGeometry.bottom).toBeLessThanOrEqual(
      focusedGeometry.viewportHeight,
    );

    await page.evaluate(() => window.scrollTo(0, 1000));
    await expect(outline).toHaveAttribute("data-hidden", "true");
    await page.evaluate(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    });
    await expect(outline).toHaveAttribute("data-hidden", "true");

    await page.evaluate(async () => {
      for (let step = 0; step < 8; step += 1) {
        window.scrollTo(0, window.scrollY - 5);
        await new Promise<void>((resolve) => {
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
        });
      }
    });
    expect(await page.evaluate(() => window.scrollY)).toBeLessThan(980);
    await expect(outline).not.toHaveAttribute("data-hidden", "true");

    await page.evaluate(() => window.scrollTo(0, 200));
    await expect(outline).not.toHaveAttribute("data-hidden", "true");
  });
});

test.describe("forced colors", () => {
  test.use({ forcedColors: "active" });

  test("mobile outline keeps a focus ring", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile");
    await openIhp(page);

    const toggle = page.getByRole("button", { name: "On this page" });
    await page.evaluate(() => window.scrollTo(0, 900));
    await toggle.focus();

    const focusRing = await toggle.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        style: style.outlineStyle,
        width: Number.parseFloat(style.outlineWidth),
      };
    });
    expect(focusRing.style).toBe("solid");
    expect(focusRing.width).toBeGreaterThanOrEqual(3);
  });
});

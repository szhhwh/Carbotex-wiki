import { expect, test, type Page } from "@playwright/test";

const puzzleLabel = "Science education theme puzzle";

async function openPuzzle(page: Page) {
  await page.goto("/ouc-haide/education");
  await expect(page.locator("#opening-screen")).toHaveCount(0);
  const tablist = page.getByRole("tablist", { name: puzzleLabel });
  await expect(tablist).toBeVisible();
  const panelId = await tablist
    .getByRole("tab")
    .first()
    .getAttribute("aria-controls");
  if (!panelId) throw new Error("Puzzle tab is missing aria-controls");
  const panel = page.locator(`[role="tabpanel"][id="${panelId}"]`);
  await expect(panel).toBeVisible();
  return {
    tablist,
    panel,
  };
}

test("switches all five puzzle pieces and preserves timeline structure", async ({
  page,
}) => {
  const { tablist, panel } = await openPuzzle(page);
  const tabs = tablist.getByRole("tab");

  await expect(tabs).toHaveCount(5);
  await expect(tabs.first()).toHaveAccessibleName(
    "Translating Synthetic Biology Through the Biomanufacturing Workflow",
  );
  await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
  await expect(tabs.first()).not.toHaveAttribute("data-lifted", "true");
  await expect(panel.getByRole("heading", { level: 4 }).first()).toHaveText(
    "Translating Synthetic Biology Through the Biomanufacturing Workflow",
  );

  const campaignLink = panel.getByRole("link", {
    name: "Science Outreach Campaign—Decoding Genes, Empowering via Synbio",
  });
  await expect(campaignLink).toHaveAttribute("href", "#chapter-01");
  await expect(campaignLink).toHaveCSS("text-decoration-line", "underline");
  await expect(panel.locator("ol > li")).toHaveCount(4);

  const socialTab = tabs.filter({
    hasText: "Fostering Social and Ethical Responsibility",
  });
  await socialTab.click();
  await expect(socialTab).toHaveAttribute("aria-selected", "true");
  await expect(socialTab).toHaveAttribute("data-lifted", "true");
  await expect(tabs.first()).not.toHaveAttribute("data-lifted", "true");
  await expect(panel.getByRole("heading", { level: 4 }).first()).toHaveText(
    "Fostering Social and Ethical Responsibility",
  );
  await expect(panel.locator("ol > li")).toHaveCount(3);
  await expect(
    panel.getByRole("link", { name: "traditional craft workshop" }),
  ).toHaveAttribute("href", "#chapter-06-2");

  const publicUnderstandingTab = tabs.filter({
    hasText:
      "Building Public Understanding for Synthetic biology and Biomanufacturing",
  });
  await publicUnderstandingTab.click();
  await expect(publicUnderstandingTab).toHaveAttribute("aria-selected", "true");
  await expect(panel.getByRole("heading", { level: 4 }).first()).toHaveText(
    "Building Public Understanding for Synthetic biology and Biomanufacturing",
  );
  await expect(panel).toContainText("WeChat Official Account");

  const inclusiveAccessTab = tabs.filter({
    hasText:
      "Expanding Access for Inclusive Participation and Future Decision-Making",
  });
  await inclusiveAccessTab.click();
  await expect(inclusiveAccessTab).toHaveAttribute("aria-selected", "true");
  await expect(panel.getByRole("heading", { level: 4 }).first()).toHaveText(
    "Expanding Access for Inclusive Participation and Future Decision-Making",
  );
  await expect(panel).toContainText("Luchun County, Yunnan Province");

  const principleTab = tabs.filter({
    hasText: "Stitching Technique: Our Principle",
  });
  const principleDisc = principleTab.locator("svg");
  await expect(principleDisc).toHaveAttribute("viewBox", "0 0 203 203");
  await expect(principleTab.locator("img")).toHaveCount(0);
  await expect(principleDisc.locator("image, use, text, style")).toHaveCount(0);
  await expect(principleDisc).toHaveCSS(
    "animation-name",
    /puzzle-center-assemble/,
  );
  await principleTab.click();
  await expect(principleTab).toHaveAttribute("aria-selected", "true");
  await expect(principleTab).toHaveAttribute("data-lifted", "true");
  await expect(principleTab).not.toHaveCSS("transform", "none");
  const principleTitle = panel.getByRole("heading", {
    level: 3,
    name: "Stitching Technique: Our Principle",
  });
  await expect(principleTitle).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Stitching Technique: Our Principle",
    }),
  ).toHaveCount(1);
  await expect(page.locator("section#principle")).toHaveCount(0);
  await expect(panel).toContainText(
    "Wonder, Explore, Action, Verify, and Echo",
  );

  const weaveTabs = panel.getByRole("tablist", { name: "WEAVE stages" });
  await expect(weaveTabs).toBeVisible();
  await expect(weaveTabs.getByRole("tab")).toHaveCount(5);
  const wonderTab = weaveTabs.getByRole("tab", { name: "Wonder" });
  await expect(wonderTab).toHaveAttribute("aria-selected", "true");
  await wonderTab.focus();
  await page.keyboard.press("ArrowRight");
  const exploreTab = weaveTabs.getByRole("tab", { name: "Explore" });
  await expect(exploreTab).toBeFocused();
  await expect(exploreTab).toHaveAttribute("aria-selected", "true");
  await expect(
    panel.getByRole("heading", {
      level: 4,
      name: "How can we design for meaningful learning?",
    }),
  ).toBeVisible();
  await expect(panel).toContainText("objective-driven design approach");
});

test("supports roving keyboard focus and visible focus feedback", async ({
  page,
}) => {
  const { tablist, panel } = await openPuzzle(page);
  const tabs = tablist.getByRole("tab");
  const firstTab = tabs.first();

  await firstTab.focus();
  await expect(firstTab).toBeFocused();
  await page.keyboard.press("End");
  await expect(tabs.last()).toBeFocused();
  await expect(tabs.last()).toHaveAttribute("aria-selected", "true");
  await expect(
    panel.getByRole("heading", {
      level: 3,
      name: "Stitching Technique: Our Principle",
    }),
  ).toBeVisible();

  await page.keyboard.press("Home");
  await expect(firstTab).toBeFocused();
  await expect(firstTab).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("ArrowRight");
  await expect(tabs.nth(1)).toBeFocused();
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");

  const focusStyle = await tabs.nth(1).evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      outlineStyle: style.outlineStyle,
      outlineWidth: Number.parseFloat(style.outlineWidth),
    };
  });
  expect(focusStyle.outlineStyle).not.toBe("none");
  expect(focusStyle.outlineWidth).toBeGreaterThanOrEqual(2);
});

test("matches the overall SVG and only lifts on hover or selection", async ({
  page,
}) => {
  const { tablist, panel } = await openPuzzle(page);
  const tabs = tablist.getByRole("tab");

  for (const tab of await tabs.all()) {
    await expect(tab).toHaveCSS("transform", "none");
  }

  const layout = await tablist.evaluate((board) => {
    const boardRect = board.getBoundingClientRect();
    return Array.from(board.querySelectorAll("button")).map((tab) => {
      const rect = tab.getBoundingClientRect();
      return {
        left: (rect.left - boardRect.left) / boardRect.width,
        top: (rect.top - boardRect.top) / boardRect.height,
        width: rect.width / boardRect.width,
        height: rect.height / boardRect.height,
      };
    });
  });

  const expectedLayout = [
    { left: 30 / 446, top: 4.8 / 446, width: 0.5, height: 0.5 },
    { left: 218 / 446, top: 29.8 / 446, width: 0.5, height: 0.5 },
    { left: 4.56 / 446, top: 192.8 / 446, width: 0.5, height: 0.5 },
    { left: 193 / 446, top: 217.8 / 446, width: 0.5, height: 0.5 },
    {
      left: 121.52 / 446,
      top: 121 / 446,
      width: 204 / 446,
      height: 204 / 446,
    },
  ];
  for (const [index, expected] of expectedLayout.entries()) {
    expect(layout[index].left).toBeCloseTo(expected.left, 2);
    expect(layout[index].top).toBeCloseTo(expected.top, 2);
    expect(layout[index].width).toBeCloseTo(expected.width, 2);
    expect(layout[index].height).toBeCloseTo(expected.height, 2);
  }

  const socialTab = tabs.nth(1);
  await socialTab.hover();
  const canHover = await page.evaluate(
    () => matchMedia("(hover: hover) and (pointer: fine)").matches,
  );
  if (canHover) {
    await expect(socialTab).not.toHaveCSS("transform", "none");
    await expect(socialTab).not.toHaveAttribute("data-lifted", "true");
    await page.mouse.move(0, 0);
  }
  await expect(socialTab).toHaveCSS("transform", "none");

  await socialTab.click();
  await expect(socialTab).toHaveAttribute("data-lifted", "true");
  await expect(socialTab).not.toHaveCSS("transform", "none");

  await expect
    .poll(async () =>
      panel.evaluate((element) => {
        const navHeight = Number.parseFloat(
          getComputedStyle(document.body).paddingTop,
        );
        return element.getBoundingClientRect().top - navHeight;
      }),
    )
    .toBeGreaterThanOrEqual(0);
  await expect
    .poll(async () =>
      panel.evaluate((element) => {
        const navHeight = Number.parseFloat(
          getComputedStyle(document.body).paddingTop,
        );
        return element.getBoundingClientRect().top - navHeight;
      }),
    )
    .toBeLessThanOrEqual(36);
});

test("keeps puzzle and panel within responsive layouts without overflow", async ({
  page,
}) => {
  const { tablist, panel } = await openPuzzle(page);
  const images = tablist.locator("img");

  for (const width of [1440, 981, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.waitForTimeout(80);

    const panelId = await panel.getAttribute("id");
    const metrics = await tablist.evaluate((board, activePanelId) => {
      const panelElement = document.getElementById(activePanelId ?? "");
      if (!panelElement) throw new Error("Puzzle tab panel is missing");
      const boardRect = board.getBoundingClientRect();
      const panelRect = panelElement.getBoundingClientRect();
      const root = document.documentElement;
      return {
        board: {
          top: boardRect.top,
          right: boardRect.right,
          bottom: boardRect.bottom,
          left: boardRect.left,
          width: boardRect.width,
        },
        panel: {
          top: panelRect.top,
          right: panelRect.right,
          bottom: panelRect.bottom,
          left: panelRect.left,
          width: panelRect.width,
        },
        clientWidth: root.clientWidth,
        scrollWidth: root.scrollWidth,
      };
    }, panelId);

    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth);
    expect(metrics.board.width).toBeGreaterThan(230);
    expect(metrics.board.right).toBeLessThanOrEqual(metrics.clientWidth);
    expect(metrics.panel.right).toBeLessThanOrEqual(metrics.clientWidth);

    expect(metrics.panel.top).toBeGreaterThan(metrics.board.bottom);
  }

  await expect(images).toHaveCount(4);
  const imageState = await images.evaluateAll((elements) =>
    elements.map((image) => ({
      complete: (image as HTMLImageElement).complete,
      naturalWidth: (image as HTMLImageElement).naturalWidth,
      renderedWidth: image.getBoundingClientRect().width,
    })),
  );
  for (const image of imageState) {
    expect(image.complete).toBe(true);
    expect(image.naturalWidth).toBeGreaterThan(0);
    expect(image.renderedWidth).toBeGreaterThan(100);
  }

  await expect(panel).toBeVisible();
});

test("reveals the principle inside the center puzzle for its deep link", async ({
  page,
}) => {
  await page.goto("/ouc-haide/education#principle");
  await expect(page.locator("#opening-screen")).toHaveCount(0);

  const tablist = page.getByRole("tablist", { name: puzzleLabel });
  const principleTab = tablist.getByRole("tab", {
    name: "Stitching Technique: Our Principle",
  });
  await expect(principleTab).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("#principle")).toBeVisible();
  await expect(
    page.getByRole("heading", {
      level: 3,
      name: "Stitching Technique: Our Principle",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("tablist", { name: "WEAVE stages" }),
  ).toBeVisible();
});

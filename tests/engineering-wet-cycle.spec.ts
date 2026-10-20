import { expect, test, type Page } from "@playwright/test";

const openConsole = async (page: Page) => {
  await page.goto("/ouc-haide/engineering");
  await expect(page.locator("#opening-screen")).toHaveCount(0);
  await page
    .getByRole("group", { name: "Engineering pathway" })
    .getByRole("button", { name: "Wet Lab" })
    .click();
  const console = page.locator("[data-wet-engineering-console]");
  await expect(console).toBeVisible();
  return console;
};

test("switches wet-lab cycles and DBTL phases as one coordinated control", async ({
  page,
}) => {
  const console = await openConsole(page);
  const tabs = console.getByRole("tab");
  const panel = console.getByRole("tabpanel");
  const design = console.getByRole("button", { name: "Design", exact: true });
  const testPhase = console.getByRole("button", { name: "Test", exact: true });

  await expect(tabs).toHaveCount(3);
  await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");
  await expect(design).toHaveAttribute("aria-pressed", "true");
  await expect(panel).toHaveAttribute("data-phase", "Design");
  await expect(
    console.getByRole("heading", {
      level: 3,
      name: "Regulator Engineering — Select a Production Background",
    }),
  ).toBeVisible();

  await testPhase.click();
  await expect(testPhase).toHaveAttribute("aria-pressed", "true");
  await expect(panel).toHaveAttribute("data-phase", "Test");
  await expect(
    console.getByRole("heading", {
      level: 4,
      name: "Cycle 1 of 3 · Test",
    }),
  ).toBeVisible();

  await panel.evaluate((element) => {
    element.scrollTop = element.scrollHeight;
  });
  await console.getByRole("tab", { name: "Cycle 2" }).click();
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(design).toHaveAttribute("aria-pressed", "true");
  await expect(panel).toHaveJSProperty("scrollTop", 0);

  await console.getByRole("button", { name: "Previous cycle" }).click();
  await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");
  await console.getByRole("button", { name: "Previous cycle" }).click();
  await expect(tabs.nth(2)).toHaveAttribute("aria-selected", "true");
  await console.getByRole("button", { name: "Next cycle" }).click();
  await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");
});

test("cycle tabs support roving keyboard navigation and source-order phases", async ({
  page,
}) => {
  const console = await openConsole(page);
  const tabs = console.getByRole("tab");

  await tabs.nth(0).focus();
  await page.keyboard.press("ArrowLeft");
  await expect(tabs.nth(2)).toBeFocused();
  await expect(tabs.nth(2)).toHaveAttribute("aria-selected", "true");

  await page.keyboard.press("Home");
  await expect(tabs.nth(0)).toBeFocused();
  await page.keyboard.press("End");
  await expect(tabs.nth(2)).toBeFocused();

  const phases = await console
    .getByRole("group", { name: "Design, Build, Test and Learn stages" })
    .getByRole("button")
    .evaluateAll((buttons) =>
      buttons
        .map((button) => button.textContent?.trim())
        .filter((label): label is string => Boolean(label)),
    );
  expect(phases).toEqual(["Design", "Build", "Test", "Learn"]);
});

test("the panel preserves viewport height and releases scroll to the page", async ({
  page,
}) => {
  const console = await openConsole(page);
  const panel = console.getByRole("tabpanel");
  const testPhase = console.getByRole("button", { name: "Test", exact: true });

  const initialHeight = (await panel.boundingBox())?.height;
  await testPhase.click();
  const testHeight = (await panel.boundingBox())?.height;
  expect(initialHeight).toBeGreaterThan(0);
  expect(testHeight).toBeCloseTo(initialHeight ?? 0, 0);

  await panel.evaluate((element) => {
    element.scrollTop = element.scrollHeight;
  });
  await panel.focus();
  const pageY = await page.evaluate(() => window.scrollY);
  await page.keyboard.press("PageDown");
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(pageY);
});

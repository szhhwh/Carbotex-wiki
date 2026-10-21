import { expect, test } from "@playwright/test";

const modules = ["gem", "software", "md"] as const;

test("Model hub reaches each module and returns without losing the site shell", async ({
  page,
}) => {
  for (const module of modules) {
    await page.goto("/ouc-haide/model");
    await expect(page.locator("#opening-screen")).toHaveCount(0);
    await page
      .locator(`#article-body a[href="/ouc-haide/model/${module}"]`)
      .first()
      .click();
    await expect(page).toHaveURL(new RegExp(`/ouc-haide/model/${module}$`));
    await expect(
      page.locator("main[data-article-theme] #article-body"),
    ).toBeVisible();
    await page.locator('main a[href="/ouc-haide/model"]').first().click();
    await expect(page).toHaveURL(/\/ouc-haide\/model$/);
    await expect(page.locator("#ov-en-sec-1")).toBeVisible();
  }
});

test("Model Engineering citations retain their pathway on reload and can switch to Wet Lab", async ({
  page,
}) => {
  await page.goto("/ouc-haide/engineering#dbtl-en-c2");
  await expect(page.locator("#opening-screen")).toHaveCount(0);
  const switcher = page.getByRole("group", { name: "Engineering pathway" });
  await expect(
    switcher.getByRole("button", { name: "Model", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#dbtl-en-c2")).toBeVisible();

  const cite = page.locator("#dbtl-en-c2 sup.cite-ref a").first();
  const target = await cite.getAttribute("href");
  expect(target).toMatch(/^#ref-\d+$/);
  await cite.click();
  const entry = page.locator(target!);
  await expect(entry).toBeVisible();
  await expect(entry).toBeFocused();
  const citedSource = await entry.textContent();

  await page.reload();
  await expect(
    switcher.getByRole("button", { name: "Model", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(entry).toBeVisible();
  await expect(entry).toHaveText(citedSource!);

  await switcher.getByRole("button", { name: "Wet Lab", exact: true }).click();
  await expect(page.locator("#wet-engineering")).toBeVisible();
  await expect(page.locator("#dbtl-en-c2")).toHaveCount(0);
  await expect(
    switcher.getByRole("button", { name: "Wet Lab", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.reload();
  await expect(
    switcher.getByRole("button", { name: "Wet Lab", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
});

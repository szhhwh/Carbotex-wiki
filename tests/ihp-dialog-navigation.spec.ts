import { expect, test } from "@playwright/test";

for (const reducedMotion of ["no-preference", "reduce"] as const) {
  test(`stakeholder dialog closes before navigating (${reducedMotion})`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion });
    await page.goto("/ouc-haide/human-practices");
    await expect(page.locator("#opening-screen")).toHaveCount(0);
    const trigger = page
      .locator("[data-stakeholder-card-grid] button[aria-expanded]")
      .first();
    const dialog = page.locator("[data-stakeholder-details]");

    await trigger.click();
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: /^Close details/ }).click();
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();

    await trigger.click();
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();

    for (let visit = 0; visit < 2; visit += 1) {
      await trigger.click();
      await expect(dialog).toBeVisible();
      const link = dialog.getByRole("link", {
        name: /Read the full TRACE story/,
      });
      const target = await link.getAttribute("href");
      expect(target).toMatch(/^#ihp-/);
      await link.click();
      await expect(dialog).toHaveCount(0);
      await expect.poll(() => new URL(page.url()).hash).toBe(target);
      await expect(page.locator(target!)).toBeFocused();
      await expect(page.locator(target!)).toBeVisible();
      await expect
        .poll(() =>
          page.locator(target!).evaluate((element) => {
            const top = element.getBoundingClientRect().top;
            return top >= 0 && top < window.innerHeight;
          }),
        )
        .toBe(true);
    }
  });
}

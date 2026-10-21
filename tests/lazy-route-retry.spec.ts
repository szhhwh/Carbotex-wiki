import { expect, test } from "@playwright/test";

const ihpModule =
  /\/(?:assets\/human-practices-[^/]+\.js|src\/contents\/human-practices\.tsx)(?:\?.*)?$/;
const ihpPath = "/ouc-haide/human-practices";

test("all page exports render from production chunks", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const path of [
    "",
    "description",
    "engineering",
    "parts",
    "contribution",
    "design",
    "experiments",
    "protocols",
    "notebook",
    "results",
    "safety-and-security",
    "model",
    "hardware",
    "human-practices",
    "education",
    "members",
    "attributions",
  ]) {
    await page.goto(`/ouc-haide/${path}`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("[data-route-ready]")).toHaveCount(1);
    await expect(page.locator("#opening-screen")).toHaveCount(0);
    await expect(page.locator("[data-route-error]")).toHaveCount(0);
  }
});

test("IHP recovers from a failed chunk on initial load and repeated refresh", async ({
  page,
}) => {
  const failures: string[] = [];
  const retries: string[] = [];
  const runtimeErrors: string[] = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  page.on("response", (response) => {
    if (
      ihpModule.test(response.url()) &&
      new URL(response.url()).searchParams.has("t")
    ) {
      expect(response.status()).toBe(200);
      retries.push(response.url());
    }
  });
  await page.route(ihpModule, async (route) => {
    if (!new URL(route.request().url()).searchParams.has("t")) {
      failures.push(route.request().url());
      await route.abort("failed");
    } else {
      await route.continue();
    }
  });

  for (let visit = 0; visit < 3; visit += 1) {
    const previousFailures = failures.length;
    const previousRetries = retries.length;
    if (visit === 0) {
      await page.goto(ihpPath, { waitUntil: "domcontentloaded" });
    } else {
      await page.reload({ waitUntil: "domcontentloaded" });
    }
    await expect(page.locator("[data-route-ready]")).toHaveCount(1);
    await expect(page.locator("#opening-screen")).toHaveCount(0);
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Integrated Human Practices",
        exact: true,
      }),
    ).toBeVisible();
    await expect(page.locator("[data-route-error]")).toHaveCount(0);
    await expect(page.locator("#root")).not.toHaveAttribute("inert");
    expect(failures.length).toBeGreaterThan(previousFailures);
    expect(retries).toHaveLength(previousRetries + 1);
  }

  expect(runtimeErrors).toEqual([]);
});

test("IHP stops retrying persistent failures and the reload button recovers", async ({
  page,
}) => {
  const attempts: string[] = [];
  let fail = true;
  await page.route(ihpModule, async (route) => {
    attempts.push(route.request().url());
    if (fail) await route.abort("failed");
    else await route.continue();
  });

  await page.goto(ihpPath, { waitUntil: "domcontentloaded" });
  await expect(page.locator("[data-route-error]")).toBeVisible({
    timeout: 15_000,
  });
  await expect(page.locator("#opening-screen")).toHaveCount(0);
  expect(
    attempts.filter((url) => new URL(url).searchParams.has("t")),
  ).toHaveLength(5);
  await expect(page.locator("[data-route-ready]")).toHaveCount(0);

  fail = false;
  await page.getByRole("button", { name: "Reload page", exact: true }).click();
  await expect(page.locator("[data-route-ready]")).toHaveCount(1);
  await expect(page.locator("[data-route-error]")).toHaveCount(0);
  await expect(page.locator("#opening-screen")).toHaveCount(0);
});

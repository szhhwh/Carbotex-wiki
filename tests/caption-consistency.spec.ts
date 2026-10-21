import { expect, test } from "@playwright/test";

/**
 * Caption contract: every media caption renders through the shared Caption
 * component, which owns the typography. These specs fail if a page adds its own
 * caption type, spacing-bordered variant, or hand-written figure caption.
 */

/** Routes that render captioned media inside the article body. */
const CAPTION_ROUTES = [
  "engineering",
  "design",
  "experiments",
  "results",
  "model/gem",
  "model/software",
  "model/md",
  "hardware",
  "contribution",
  "human-practices",
  "education",
];

const TYPOGRAPHY_PROPERTIES = [
  "fontFamily",
  "fontSize",
  "fontWeight",
  "fontStyle",
  "lineHeight",
  "letterSpacing",
  "color",
  "textTransform",
] as const;

async function settlePage(page: import("@playwright/test").Page) {
  await page.locator("#article-body").waitFor();
  // Mount lazily rendered media before reading computed styles.
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.8);
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 40));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(300);
}

test("every caption shares one typography signature across the wiki", async ({
  page,
}) => {
  const groups = new Map<string, string[]>();

  for (const route of CAPTION_ROUTES) {
    await page.goto(`/ouc-haide/${route}`);
    await settlePage(page);

    const captions = await page.evaluate((properties) => {
      return [...document.querySelectorAll("[data-caption]")]
        .filter((element) => element.checkVisibility())
        .map((element) => {
          const computed = getComputedStyle(element);
          return {
            text: (element.textContent ?? "").trim().slice(0, 60),
            style: Object.fromEntries(
              properties.map((property) => [property, computed[property]]),
            ),
            borderTopWidth: computed.borderTopWidth,
          };
        });
    }, TYPOGRAPHY_PROPERTIES);

    for (const caption of captions) {
      expect(
        caption.borderTopWidth,
        `${route}: "${caption.text}" draws a caption rule`,
      ).toBe("0px");

      const signature = JSON.stringify(caption.style);
      const members = groups.get(signature) ?? [];
      members.push(`${route}: ${caption.text}`);
      groups.set(signature, members);
    }
  }

  const signatures = [...groups.keys()];
  expect(
    signatures.length,
    `captions render in ${signatures.length} different styles:\n${[...groups]
      .map(
        ([signature, members]) =>
          `• ${signature}\n  ${members.slice(0, 4).join("\n  ")}`,
      )
      .join("\n")}`,
  ).toBe(1);
});

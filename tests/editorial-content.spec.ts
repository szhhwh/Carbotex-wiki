import { createHash } from "node:crypto";
import { expect, test, type Page } from "@playwright/test";

const articleRoutes = ["/design", "/results", "/protocols", "/notebook"];
const sourceThreeLineHeadings = new Set([
  "1.3 HPLC quantification of malic acid equivalents in acid-hydrolysed PMA",
]);
const protocol19ASourceUrl =
  "https://static.igem.wiki/teams/6147/wiki/wet-protocol/19a-pma-acid-hydrolysis-and-hplc-three-standards-en.pdf";
const protocol19ASourceSha256 =
  "7a89886812e0d8abb9dc1971edb9818eeb97fb4648fab64c3102cb0b1ca7fdf5";

async function openArticle(page: Page, route: string) {
  await page.goto(`/ouc-haide${route}`);
  await expect(page.locator("#article-body")).toBeVisible();
}

test("Protocols presents all 22 documents as flat editorial entries", async ({
  page,
}) => {
  await openArticle(page, "/protocols");

  const records = page.locator("[data-protocol-record]");
  await expect(records).toHaveCount(22);

  const result = await records.evaluateAll((documents) => ({
    numbers: documents.map((document) =>
      document.getAttribute("data-protocol-number"),
    ),
    linkCount: documents.reduce(
      (total, document) =>
        total + document.querySelectorAll('a[href$=".pdf"]').length,
      0,
    ),
    pdfUrls: documents.flatMap((document) =>
      Array.from(
        document.querySelectorAll<HTMLAnchorElement>('a[href$=".pdf"]'),
        (link) => link.href,
      ),
    ),
    cardStyles: documents.map((document) => {
      const computed = getComputedStyle(document);
      return {
        background: computed.backgroundColor,
        border: computed.borderTopWidth,
        radius: computed.borderRadius,
        shadow: computed.boxShadow,
      };
    }),
    summarySizes: documents.map((document) =>
      Number.parseFloat(
        getComputedStyle(document.querySelector("p")!).fontSize,
      ),
    ),
    horizontalOverflow:
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  }));

  expect(result.numbers).toHaveLength(22);
  expect(new Set(result.numbers).size).toBe(22);
  expect(result.linkCount).toBe(44);
  expect(new Set(result.pdfUrls).size).toBe(22);
  expect(result.summarySizes.every((size) => size >= 16)).toBe(true);
  expect(result.horizontalOverflow).toBeLessThanOrEqual(1);
  expect(result.cardStyles).toEqual(
    result.cardStyles.map(() => ({
      background: "rgba(0, 0, 0, 0)",
      border: "0px",
      radius: "0px",
      shadow: "none",
    })),
  );
});

test("Protocols 19A points to the source-specified PDF", async ({
  page,
  request,
}) => {
  await openArticle(page, "/protocols");

  const record = page.locator(
    '[data-protocol-record][data-protocol-number="19A"]',
  );
  await expect(record).toHaveCount(1);

  const pdfLinks = record.locator('a[href$=".pdf"]');
  await expect(pdfLinks).toHaveCount(2);
  expect(
    await pdfLinks.evaluateAll((links) =>
      links.map((link) => link.getAttribute("href")),
    ),
  ).toEqual([protocol19ASourceUrl, protocol19ASourceUrl]);

  const response = await request.get(protocol19ASourceUrl);
  expect(response.status()).toBe(200);

  // This source edition specifies a 2.00 mL final hydrolysate volume.
  const digest = createHash("sha256")
    .update(await response.body())
    .digest("hex");
  expect(digest).toBe(protocol19ASourceSha256);
});

test("Notebook keeps all 40 entries in a flat date-led timeline", async ({
  page,
}) => {
  await openArticle(page, "/notebook");

  const entries = page.locator("[data-notebook-entry]");
  await expect(entries).toHaveCount(40);

  const result = await entries.evaluateAll((items) =>
    items.map((item) => {
      const entry = item.querySelector("article");
      const date = item.querySelector("p");
      if (!entry || !date) throw new Error("Notebook entry is incomplete");

      const entryStyle = getComputedStyle(entry);
      const dateStyle = getComputedStyle(date);
      return {
        hasHeading: Boolean(entry.querySelector("h3")),
        background: entryStyle.backgroundColor,
        border: entryStyle.borderTopWidth,
        radius: entryStyle.borderRadius,
        shadow: entryStyle.boxShadow,
        dateBackground: dateStyle.backgroundColor,
        dateBorder: dateStyle.borderTopWidth,
      };
    }),
  );

  expect(
    result.every(
      (entry) =>
        entry.hasHeading &&
        entry.background === "rgba(0, 0, 0, 0)" &&
        entry.border === "0px" &&
        entry.radius === "0px" &&
        entry.shadow === "none" &&
        entry.dateBackground === "rgba(0, 0, 0, 0)" &&
        entry.dateBorder === "0px",
    ),
  ).toBe(true);
});

test("Design preserves the three source Experimental Design headings", async ({
  page,
}) => {
  await openArticle(page, "/design");

  const names = await page
    .locator("section[aria-labelledby]")
    .evaluateAll((sections) =>
      sections
        .map((section) => {
          const headingId = section.getAttribute("aria-labelledby");
          return headingId
            ? (document.getElementById(headingId)?.textContent?.trim() ?? "")
            : "";
        })
        .filter((name) => name === "Experimental Design"),
    );

  expect(names).toHaveLength(3);
});

test("Results preserves the HPLC heading and lap-shear clause from source", async ({
  page,
}) => {
  await openArticle(page, "/results");

  await expect(
    page.getByRole("heading", {
      name: "1.3 HPLC quantification of malic acid equivalents in acid-hydrolysed PMA",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByText("reflecting a very robust bond", { exact: false }),
  ).toBeVisible();
});

test("article headings stay within their source-preserving line limits", async ({
  page,
}) => {
  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({ width, height: 900 });

    for (const route of articleRoutes) {
      await openArticle(page, route);

      const headings = await page
        .locator(
          "main h1, #article-body h2, #article-body h3, #article-body h4, #article-body h5, #article-body h6",
        )
        .evaluateAll((elements) =>
          elements.map((element) => {
            const style = getComputedStyle(element);
            const lineHeight = Number.parseFloat(style.lineHeight);
            const tops: number[] = [];
            const walker = document.createTreeWalker(
              element,
              NodeFilter.SHOW_TEXT,
            );
            let node = walker.nextNode();
            while (node) {
              const parent = node.parentElement;
              const text = node.textContent?.trim();
              if (parent && text) {
                const parentStyle = getComputedStyle(parent);
                if (
                  parentStyle.display !== "none" &&
                  parentStyle.visibility !== "hidden" &&
                  parentStyle.clipPath === "none"
                ) {
                  const range = document.createRange();
                  range.selectNodeContents(node);
                  tops.push(
                    ...Array.from(range.getClientRects(), (rect) => rect.top),
                  );
                }
              }
              node = walker.nextNode();
            }
            tops.sort((a, b) => a - b);
            const lineTops = tops.filter(
              (top, index) =>
                index === 0 ||
                Math.abs(top - tops[index - 1]) > Math.max(2, lineHeight * 0.2),
            );
            return {
              text: element.textContent?.trim().slice(0, 100) ?? "",
              lineHeight,
              lines: lineTops.length,
            };
          }),
        );

      expect(
        headings.filter(
          (heading) =>
            heading.lines > (sourceThreeLineHeadings.has(heading.text) ? 3 : 2),
        ),
        `${route} at ${width}px`,
      ).toEqual([]);
    }
  }
});

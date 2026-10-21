// usage: node .tmp-crop.mjs out.png x y w h [click]  (artboard pt; renders fully drawn straw)
import { chromium } from "@playwright/test";
const [,, out, X, Y, W, H, click] = process.argv;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await p.goto("http://localhost:4173/ouc-haide/", { waitUntil: "networkidle" });
await p.waitForFunction(() => !document.getElementById("opening-screen"), null, { timeout: 30000 }).catch(() => {});
await p.waitForTimeout(1200);
const u = 1440 / 1366; // approx; refined below
// scroll until the camera centre reaches Y+H/2, then past it so the pen finishes
const target = +Y + +H / 2;
for (let y = 0; y < 30000; y += 600) {
  await p.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
  await p.waitForTimeout(40);
  const cam = await p.evaluate(() => { const t = getComputedStyle(document.querySelector("[data-home-canvas] > div > div")).transform; return -new DOMMatrix(t).m42; });
  const uu = await p.evaluate(() => parseFloat(getComputedStyle(document.querySelector("[data-home-canvas] > div > div")).getPropertyValue("--u")));
  if (cam / uu + 900 / uu / 2 >= target) break;
}
await p.waitForTimeout(2500);
if (click) { await p.locator('button[aria-label^="Click to open"]').click({ force: true }); await p.waitForTimeout(4000); }
const r = await p.evaluate(() => { const el = document.querySelector("[data-home-canvas] > div > div"); const b = el.getBoundingClientRect(); return { top: b.top, left: b.left, u: parseFloat(getComputedStyle(el).getPropertyValue("--u")) }; });
await p.screenshot({ path: out, clip: { x: r.left + +X * r.u, y: r.top + +Y * r.u, width: +W * r.u, height: +H * r.u } });
await b.close();

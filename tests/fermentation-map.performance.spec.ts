import { expect, test, type Locator } from "@playwright/test";
import { collectPageErrors, openStandalone, stateOf } from "./helpers";

// Keep Playwright's failure recorder from competing with the WebGL frame probe.
test.use({ trace: "off" });

type FrameMetrics = {
  frames: number;
  averageInterval: number;
  p95Interval: number;
  maxInterval: number;
  slowFrames: number;
  longTaskCount: number;
  longestTask: number;
  longTasks: Array<{ startTime: number; duration: number }>;
};

async function startFrameProbe(map: Locator) {
  await map.evaluate(() => {
    const probe = {
      frames: [] as number[],
      longTasks: [] as Array<{ startTime: number; duration: number }>,
      last: performance.now(),
      active: true,
      observer: null as PerformanceObserver | null,
    };
    probe.observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        probe.longTasks.push({
          startTime: entry.startTime,
          duration: entry.duration,
        });
      }
    });
    probe.observer.observe({ type: "longtask", buffered: false });
    const tick = (now: number) => {
      if (!probe.active) return;
      probe.frames.push(now - probe.last);
      probe.last = now;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    // The probe is test-only browser state.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__atlasFrameProbe = probe;
  });
}

async function stopFrameProbe(map: Locator): Promise<FrameMetrics> {
  return map.evaluate(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const probe = (window as any).__atlasFrameProbe as {
      frames: number[];
      longTasks: Array<{ startTime: number; duration: number }>;
      active: boolean;
      observer: PerformanceObserver | null;
    };
    probe.active = false;
    probe.observer?.disconnect();
    const intervals = probe.frames.filter((value) => value > 0);
    const sorted = [...intervals].sort((a, b) => a - b);
    const percentile = (value: number) =>
      sorted.length === 0
        ? 0
        : sorted[
            Math.min(sorted.length - 1, Math.floor(sorted.length * value))
          ];
    return {
      frames: intervals.length,
      averageInterval:
        intervals.reduce((sum, value) => sum + value, 0) / intervals.length,
      p95Interval: percentile(0.95),
      maxInterval: sorted.at(-1) || 0,
      slowFrames: intervals.filter((value) => value > 50).length,
      longTaskCount: probe.longTasks.length,
      longestTask: Math.max(
        0,
        ...probe.longTasks.map((entry) => entry.duration),
      ),
      longTasks: probe.longTasks,
    };
  });
}

test(
  "pan, wheel and dialog stay within the frame and long-task budget",
  {
    tag: "@performance",
  },
  async ({ page }, testInfo) => {
    const errors = collectPageErrors(page);
    const map = await openStandalone(page);
    const renderer = await page.evaluate(() => {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2");
      const extension = gl?.getExtension("WEBGL_debug_renderer_info");
      return extension
        ? String(gl?.getParameter(extension.UNMASKED_RENDERER_WEBGL))
        : "unknown";
    });
    const softwareRenderer = /SwiftShader|llvmpipe|Software/i.test(renderer);
    await map.scrollIntoViewIfNeeded();
    const box = await map.boundingBox();
    if (!box) throw new Error("Map has no bounding box");
    const center = {
      x: box.x + box.width * 0.5,
      y: box.y + box.height * 0.5,
    };

    await startFrameProbe(map);
    await page.mouse.move(center.x, center.y);
    await page.mouse.down();
    await page.mouse.move(center.x + 150, center.y + 70, { steps: 20 });
    await page.mouse.up();
    await page.waitForTimeout(450);
    const pan = await stopFrameProbe(map);
    const panState = await stateOf(map);
    expect(panState.center).not.toBeNull();

    await startFrameProbe(map);
    await page.mouse.move(center.x, center.y);
    await page.mouse.wheel(0, -500);
    await page.waitForTimeout(450);
    const wheel = await stopFrameProbe(map);

    if (testInfo.project.name === "mobile") {
      await page.locator("#atlasPanelToggle").click();
    }
    await startFrameProbe(map);
    await page.locator("#provinceSearch").fill("Sichuan");
    await page.locator(".atlas-region").first().click();
    await expect(page.locator("#detailPanel")).toHaveJSProperty("open", true);
    await page.waitForTimeout(350);
    const dialog = await stopFrameProbe(map);

    const metrics = { renderer, softwareRenderer, pan, wheel, dialog };
    await testInfo.attach("frame-metrics.json", {
      body: JSON.stringify(metrics, null, 2),
      contentType: "application/json",
    });
    const steadyBudget = softwareRenderer
      ? { average: 70, p95: 160, longestTask: 200 }
      : { average: 34, p95: 50, longestTask: 100 };
    // Opening the detail drawer is a one-off layout and map-fit transition,
    // rather than a steady gesture, so it gets a wider software-render budget.
    const dialogBudget = softwareRenderer
      ? { average: 100, p95: 260, longestTask: 300 }
      : steadyBudget;
    for (const [name, metricsForFlow] of Object.entries({
      pan,
      wheel,
      dialog,
    })) {
      const budget = name === "dialog" ? dialogBudget : steadyBudget;
      expect(metricsForFlow.frames, `${name}: frame count`).toBeGreaterThan(8);
      expect(
        metricsForFlow.averageInterval,
        `${name}: average frame interval`,
      ).toBeLessThan(budget.average);
      expect(
        metricsForFlow.p95Interval,
        `${name}: p95 frame interval`,
      ).toBeLessThan(budget.p95);
      expect(metricsForFlow.longestTask, `${name}: longest task`).toBeLessThan(
        budget.longestTask,
      );
    }
    expect(errors).toEqual([]);
  },
);

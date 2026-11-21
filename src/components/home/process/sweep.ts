/** Cross sections [ax, ay, bx, by, …] from a ribbon's start to its end. */
export type Sweep = readonly number[];

const outlines = new WeakMap<
  Sweep,
  { forward: string; backward: string; ends: number[]; starts: number[] }
>();

function getOutline(sweep: Sweep) {
  const cached = outlines.get(sweep);
  if (cached) return cached;
  const ends: number[] = [];
  const starts: number[] = [];
  let forward = "";
  let backward = "";
  for (let offset = 0; offset < sweep.length; offset += 4) {
    forward += `${offset ? "L" : ""}${sweep[offset]},${sweep[offset + 1]}`;
    ends.push(forward.length);
  }
  for (let offset = sweep.length - 4; offset >= 0; offset -= 4) {
    starts[offset / 4] = backward.length;
    backward += `${sweep[offset + 2]},${sweep[offset + 3]}${offset ? "L" : ""}`;
  }
  const outline = { forward, backward, ends, starts };
  outlines.set(sweep, outline);
  return outline;
}

/**
 * Mask outline revealing a ribbon from its start up to `progress` (0 → 1):
 * one edge out to an interpolated cut across the ribbon, the other edge
 * back. The paint thus advances along the ribbon's own course.
 */
export function sweepPath(sweep: Sweep, progress: number) {
  const count = sweep.length / 4;
  if (progress <= 0 || count < 2) return "";
  const k = Math.min(progress, 1) * (count - 1);
  const last = Math.min(Math.floor(k), count - 2);
  const f = k - last;
  const cut = (side: 0 | 2) => {
    const offset = last * 4 + side;
    const x0 = sweep[offset];
    const y0 = sweep[offset + 1];
    const x1 = sweep[offset + 4];
    const y1 = sweep[offset + 5];
    return `${(x0 + (x1 - x0) * f).toFixed(1)},${(y0 + (y1 - y0) * f).toFixed(1)}`;
  };
  const { forward, backward, ends, starts } = getOutline(sweep);
  return `M${forward.slice(0, ends[last])}L${cut(0)}L${cut(2)}L${backward.slice(starts[last])}Z`;
}

export function createSweepRenderer(root: Element, sweeps: readonly Sweep[]) {
  const paths = root.querySelectorAll<SVGPathElement>("[data-sweep]");
  const total = sweeps.reduce((sum, sweep) => sum + sweep.length, 0);
  let start = 0;
  const pieces = sweeps.map((sweep, index) => {
    const share = sweep.length / total;
    const from = start;
    start += share;
    let previous = NaN;
    return (progress: number) => {
      const local = Math.min(Math.max((progress - from) / share, 0), 1);
      if (local === previous) return;
      previous = local;
      paths[index].setAttribute("d", sweepPath(sweep, local));
    };
  });
  return (progress: number) => pieces.forEach((render) => render(progress));
}

/** Artwork y of the cut's centre at `progress` (for a camera to follow). */
export function sweepY(sweep: Sweep, progress: number) {
  const count = sweep.length / 4;
  const k = Math.min(Math.max(progress, 0), 1) * (count - 1);
  const i = Math.min(Math.floor(k), count - 2);
  const y = (j: number) => (sweep[j * 4 + 1] + sweep[j * 4 + 3]) / 2;
  return y(i) + (y(i + 1) - y(i)) * (k - i);
}

/** Cross sections [ax, ay, bx, by, …] from a ribbon's start to its end. */
export type Sweep = readonly number[];

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
  const at = (i: number, side: 0 | 2) => {
    const o = i * 4 + side;
    return [sweep[o], sweep[o + 1]];
  };
  const cut = (side: 0 | 2) => {
    const [x0, y0] = at(last, side);
    const [x1, y1] = at(last + 1, side);
    return `${(x0 + (x1 - x0) * f).toFixed(1)},${(y0 + (y1 - y0) * f).toFixed(1)}`;
  };
  const a: string[] = [];
  const b: string[] = [];
  for (let i = 0; i <= last; i++) {
    a.push(at(i, 0).join(","));
    b.push(at(i, 2).join(","));
  }
  return `M${a.join("L")}L${cut(0)}L${cut(2)}L${b.reverse().join("L")}Z`;
}

/** Artwork y of the cut's centre at `progress` (for a camera to follow). */
export function sweepY(sweep: Sweep, progress: number) {
  const count = sweep.length / 4;
  const k = Math.min(Math.max(progress, 0), 1) * (count - 1);
  const i = Math.min(Math.floor(k), count - 2);
  const y = (j: number) => (sweep[j * 4 + 1] + sweep[j * 4 + 3]) / 2;
  return y(i) + (y(i + 1) - y(i)) * (k - i);
}

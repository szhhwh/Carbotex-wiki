import { forwardRef, useRef, type CSSProperties } from "react";
import clsx from "clsx";
import { Layer } from "./art";
import { ramp, useFrame } from "./director";
import type { TextBlock } from "./texts";
import s from "./canvas.module.css";

interface Props {
  block: TextBlock;
  /** Heading level for assistive technology (rendered as plain text). */
  as?: "h2" | "p";
  /** Fade with the scroll position (default) or leave to the owner. */
  scrollFade?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** One text block of the canvas, set as SVG text on artboard baselines. */
export const CanvasText = forwardRef<SVGSVGElement, Props>(function CanvasText(
  { block, as = "p", scrollFade = true, className, style },
  forwarded,
) {
  const local = useRef<SVGSVGElement | null>(null);
  const first = block.lines[0].y;
  const last = block.lines[block.lines.length - 1].y;
  const top = first - block.size;
  const mid = (top + last) / 2;

  useFrame((f) => {
    const el = local.current;
    if (!el || !scrollFade) return;
    if (f.reduced) {
      el.style.opacity = "";
      el.style.transform = "";
      return;
    }
    const bottom = f.cam + f.view;
    const enter = ramp(bottom - mid, f.view * 0.02, f.view * 0.16);
    // Fully faded before the block's top slides under the fixed navbar;
    // fully shown at a rest stop (pages keep a 28 pt margin below it).
    const exit = ramp(top - f.cam, f.nav - 4, f.nav + 24);
    const o = Math.min(enter, exit);
    el.style.opacity = o.toFixed(3);
    const shift = (1 - enter) * 16 - (1 - exit) * 10;
    el.style.transform = `translate3d(0, ${(shift * f.u).toFixed(2)}px, 0)`;
  });

  const text = block.lines
    .map((line) =>
      line.runs.map((r) => (typeof r === "string" ? r : r.t)).join(""),
    )
    .join(" ");

  return (
    <Layer
      ref={(el) => {
        local.current = el;
        if (typeof forwarded === "function") forwarded(el);
        else if (forwarded) forwarded.current = el;
      }}
      box={[block.x, top, 1, 1]}
      className={clsx(s.text, className)}
      style={style}
    >
      <text
        role={as === "h2" ? "heading" : undefined}
        aria-level={as === "h2" ? 2 : undefined}
        aria-label={text}
        textAnchor={block.anchor}
        fontSize={block.size}
        fill={block.color}
        fontWeight={block.weight ?? 400}
        style={{ whiteSpace: "pre" }}
      >
        {block.lines.map((line, i) => (
          <tspan key={i} x={block.x} y={line.y}>
            {line.runs.map((run, j) =>
              typeof run === "string" ? (
                run
              ) : (
                <tspan
                  key={j}
                  fontWeight={run.weight ?? (run.bold ? 700 : undefined)}
                  fill={run.color}
                  fontSize={run.size}
                >
                  {run.t}
                </tspan>
              ),
            )}
          </tspan>
        ))}
      </text>
    </Layer>
  );
});

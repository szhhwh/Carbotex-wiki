import { useId, useRef } from "react";
import { Art, Frame, Layer } from "./art";
import { CanvasText } from "./CanvasText";
import { clamp01, ramp, useFrame } from "./director";
import { StrawStroke } from "./Straw";
import { P3_LITERATURE, P3_QUESTION, P3_WONDER, P3_WONDER_PILL } from "./texts";
import s from "./page-three.module.css";
import c from "./canvas.module.css";

type Shape = "hex" | "pent";

/**
 * Sugar fragments the yeast finds with its magnifier: [shape, x, y, radius,
 * fill]. They drift out of the straw under the lens and settle here.
 */
const SUGARS: readonly [Shape, number, number, number, string][] = [
  ["pent", 919.5, 3193, 24.5, "#F08A3C"],
  ["hex", 864, 3310, 27.5, "#F08A3C"],
  ["pent", 682.5, 3216.5, 9.5, "#F2B84B"],
  ["pent", 669.5, 3246.5, 7.5, "#FFFDF4"],
  ["pent", 777, 3243.5, 8.5, "#F2B84B"],
  ["pent", 804.5, 3234, 6.5, "#9CD38E"],
  ["hex", 836, 3276, 10.5, "#F2B84B"],
  ["pent", 802.5, 3286.5, 6.5, "#9CD38E"],
  ["pent", 910, 3273.5, 6.5, "#9CD38E"],
  ["hex", 907.5, 3305.5, 9.5, "#F2B84B"],
  ["pent", 890.5, 3262.5, 5.5, "#FFFDF4"],
  ["pent", 1046, 3135, 8.5, "#F2B84B"],
  ["pent", 1047, 3165, 6.5, "#9CD38E"],
  ["pent", 1064.5, 3172.5, 6, "#FFFDF4"],
  ["pent", 1029, 3201, 6.5, "#9CD38E"],
  ["pent", 1013, 3190, 5.5, "#FFFDF4"],
];

/** Where the sugars come from: under the magnifier lens. */
const LENS: readonly [number, number] = [1040, 3048];

function polygon(shape: Shape, r: number) {
  const n = shape === "hex" ? 6 : 5;
  const turn = shape === "hex" ? 0 : -Math.PI / 2;
  return Array.from({ length: n }, (_, i) => {
    const a = turn + (i * 2 * Math.PI) / n;
    return `${(Math.cos(a) * r).toFixed(2)},${(Math.sin(a) * r).toFixed(2)}`;
  }).join(" ");
}

/** P3 — the straw's adhesive potential; the yeast wonders, then gets an idea. */
export function PageThree() {
  const id = useId().replace(/:/g, "");
  const sugars = useRef<(SVGGElement | null)[]>([]);
  const ip = useRef<HTMLImageElement>(null);
  const question = useRef<SVGSVGElement>(null);
  const bulb = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLDivElement>(null);

  useFrame((f) => {
    // Camera centre on the artboard.
    const mid = f.cam + f.view / 2;
    // While the camera rests on P3 the sugars spill out, then the idea comes.
    const rest = f.stops.p3;
    const found = f.reduced ? 1 : ramp(rest, 0.04, 0.5);
    SUGARS.forEach(([, x, y], i) => {
      const g = sugars.current[i];
      if (!g) return;
      const t = clamp01(found * 1.5 - (i / SUGARS.length) * 0.5);
      const e = 1 - (1 - t) ** 3;
      const px = LENS[0] + (x - LENS[0]) * e;
      const py = LENS[1] + (y - LENS[1]) * e;
      g.setAttribute("transform", `translate(${px.toFixed(1)} ${py.toFixed(1)}) rotate(${((1 - e) * 140 * (i % 2 ? 1 : -1)).toFixed(1)}) scale(${(0.3 + 0.7 * e).toFixed(3)})`);
      g.style.opacity = String(Math.min(1, t * 2.2));
    });

    // The yeast arrives, peers through its lens, and the question mark
    // gives way to a light bulb as the reader reaches the question.
    const arrive = f.reduced ? 1 : ramp(mid, 2700, 2930);
    if (ip.current) {
      ip.current.style.setProperty("--in", arrive.toFixed(4));
    }
    const idea = f.reduced ? 1 : ramp(rest, 0.58, 0.84);
    const ask = (f.reduced ? 1 : ramp(mid, 2860, 2990)) * (1 - idea);
    question.current?.style.setProperty("--k", ask.toFixed(4));
    bulb.current?.style.setProperty("--k", idea.toFixed(4));
    pill.current?.style.setProperty("--k", (f.reduced ? 1 : ramp(mid, 2760, 2900)).toFixed(4));
  });

  const [qx, qy] = [1219, 2911];

  return (
    <>
      <Frame box={[0, 2606, 1366, 823]} className={c.paper} />
      <Layer box={[560, 2620, 806, 800]} className={s.shade}>
        <defs>
          <radialGradient id={`a${id}`} cx="1204" cy="2790" r="200" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#E2BF92" stopOpacity="0.55" />
            <stop offset="1" stopColor="#E2BF92" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`b${id}`} cx="905" cy="3170" r="190" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#E2BF92" stopOpacity="0.5" />
            <stop offset="1" stopColor="#E2BF92" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="1204" cy="2790" rx="170" ry="215" fill={`url(#a${id})`} />
        <ellipse cx="905" cy="3170" rx="215" ry="135" fill={`url(#b${id})`} />
      </Layer>
      <StrawStroke k="p3" width={32} box={[380, 2560, 986, 900]} />
      <Layer box={[600, 3080, 520, 280]}>
        {SUGARS.map(([shape, , , r, fill], i) => (
          <g
            key={i}
            ref={(el) => {
              sugars.current[i] = el;
            }}
            style={{ opacity: 0 }}
          >
            <polygon
              className={s.sugar}
              style={{ animationDelay: `${(-i * 0.37).toFixed(2)}s` }}
              points={polygon(shape, r)}
              fill={fill}
              strokeLinejoin="round"
              stroke={fill}
              strokeWidth={r * 0.35}
            />
          </g>
        ))}
      </Layer>
      <Art k="p3/ip" ref={ip} className={s.ip} />
      <Layer ref={question} box={[qx - 10, qy - 10, 62, 90]} className={s.question}>
        <g transform={`translate(${qx} ${qy}) rotate(6 20 35)`}>
          <path
            d="M6 19C6 8 14 2 22 2C32 2 38 9 38 17C38 26 31 30 26 34C22.5 37 21 41 21 48"
            fill="none"
            stroke="#F18C43"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="21" cy="63" r="6.2" fill="#F18C43" />
        </g>
      </Layer>
      <div ref={bulb} className={s.bulb}>
        <Layer box={[1180, 2880, 130, 140]} className={s.bulbGlow}>
          <defs>
            <radialGradient id={`g${id}`} cx="1240" cy="2935" r="62" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#FFF3B0" stopOpacity="0.95" />
              <stop offset="0.5" stopColor="#FFD166" stopOpacity="0.4" />
              <stop offset="1" stopColor="#FFD166" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="1240" cy="2935" r="62" fill={`url(#g${id})`} />
        </Layer>
        <Art k="p3/bulb" className={s.bulbArt} />
      </div>
      <CanvasText block={P3_LITERATURE} />
      <div ref={pill} className={s.pill}>
        <Frame box={P3_WONDER_PILL} className={s.pillBox} />
        <CanvasText block={P3_WONDER} scrollFade={false} />
      </div>
      <CanvasText block={P3_QUESTION} />
    </>
  );
}

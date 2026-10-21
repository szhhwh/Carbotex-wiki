import { useId, useRef } from "react";
import { Art, Frame, Layer } from "./art";
import { CanvasText } from "./CanvasText";
import { ramp, useFrame } from "./director";
import { StrawArt, StrawStroke } from "./Straw";
import { P4_BODY, P4_HEADER } from "./texts";
import s from "./page-four.module.css";
import c from "./canvas.module.css";

/** Soft contact shadows under the glucose block and the microbes. */
const SHADOWS: readonly [number, number, number, number][] = [
  [277, 4144, 100, 7],
  [330, 4152, 18, 7],
  [453, 4152, 24, 5],
  [527, 4148, 70, 9],
  [653, 4145, 60, 11],
  [735, 4149, 42, 8],
];

export function PageFour() {
  const id = useId().replace(/:/g, "");
  const light = useRef<HTMLImageElement>(null);
  const glow = useRef<SVGSVGElement>(null);

  // The lamp light is wiped in (top-left → bottom-right) while the camera
  // rests on P4, and wiped out again when scrolling back.
  useFrame((f) => {
    const wipe = f.reduced ? 1 : ramp(f.hold, 0.04, 0.92);
    light.current?.style.setProperty("--wipe", wipe.toFixed(4));
    if (glow.current) glow.current.style.opacity = String(f.reduced ? 1 : ramp(f.hold, 0, 0.12));
  });

  return (
    <>
      <Frame box={[0, 3429, 1366, 1640]} className={c.paper} />
      <Art k="p4/light" className={s.light} ref={light} />
      <Layer box={[150, 4113, 650, 50]}>
        {SHADOWS.map(([cx, cy, rx, ry], i) => (
          <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill="#8a6a3a" opacity={0.16} />
        ))}
      </Layer>
      <Art k="p4/xylose" className={s.xylose} />
      <Layer ref={glow} box={[40, 3463, 200, 180]} className={s.glow}>
        <defs>
          <radialGradient id={`l${id}`} cx="128" cy="3547" r="70" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#fff6c9" stopOpacity="0.95" />
            <stop offset="0.45" stopColor="#ffd86b" stopOpacity="0.45" />
            <stop offset="1" stopColor="#ffd86b" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="128" cy="3547" r="70" fill={`url(#l${id})`} />
      </Layer>
      <Art k="p4/lamp" className={s.lamp} />
      <Art k="p4/glucose" />
      <StrawStroke
        k="s3"
        width={31}
        box={[180, 3405, 640, 763]}
        paint={`url(#s${id})`}
        defs={
          <linearGradient id={`s${id}`} x1="0" y1="0" x2="1366" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset={540 / 1366} stopColor="#ffc647" />
            <stop offset={585 / 1366} stopColor="#d18311" />
            <stop offset={765 / 1366} stopColor="#d18311" />
            <stop offset={792 / 1366} stopColor="#ffc647" />
          </linearGradient>
        }
      />
      <StrawArt k="link" art="p5/straw-link" reveal={42} />
      <Art k="p4/ecoli" className={s.ecoli} />
      <Art k="p4/actinomyces" className={s.actino} />
      <Art k="p4/yeast" className={s.yeast} />
      <Art k="p4/thermocellum" className={s.thermo} />
      <Art k="p4/header-box" />
      <CanvasText block={P4_HEADER} />
      <CanvasText block={P4_BODY} />
    </>
  );
}

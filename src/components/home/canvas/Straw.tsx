import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import {
  ART,
  STRAW_INFO,
  STRAW_PATHS,
  type ArtKey,
  type StrawKey,
} from "../geometry";
import { artUrl, type Rect } from "./assets";
import { Layer } from "./art";
import { useFrame } from "./director";
import { StrawPenContext, StrawPenController, useStrawPen } from "./straw-pen";

export const STRAW_YELLOW = "#ffc647";
/**
 * Width of every code-drawn straw piece (pt). One width everywhere, matched
 * to the exported straws (front ≈ 30.5, link ≈ 30), so welded joins
 * (scripts weld.py: shared centre lines) show no step.
 */
export const STRAW_WIDTH = 31;

/** Provides the scroll-driven straw pen to every straw piece. */
export function StrawPen({ children }: { children: ReactNode }) {
  const pen = useMemo(() => new StrawPenController(), []);
  useEffect(() => () => pen.dispose(), [pen]);
  useFrame((frame) => pen.setFrame(frame));
  return (
    <StrawPenContext.Provider value={pen}>{children}</StrawPenContext.Provider>
  );
}

function useRegister(key: StrawKey, managed: boolean) {
  const pen = useStrawPen();
  const ref = useRef<SVGPathElement>(null);
  useLayoutEffect(() => {
    if (!managed || !ref.current) return;
    return pen.register(key, ref.current);
  }, [pen, key, managed]);
  return ref;
}

interface StrokeProps {
  k: StrawKey;
  width: number;
  /** Stroke paint; defaults to straw yellow. */
  paint?: string;
  /** Extra defs (e.g. a gradient referenced by `paint`). */
  defs?: ReactNode;
  /** Clip the layer to this rectangle instead of the line's bounds. */
  box?: Rect;
  /** Drawn by the scroll pen (default) or driven by its owner. */
  managed?: boolean;
  /**
   * Line cap. Round (default) so neighbouring pieces, whose ends meet at
   * slightly different angles, overlap without a notch or hairline seam.
   * Use "butt" where an end must stay a crisp fold (s2b → s2c).
   */
  cap?: "round" | "butt";
  pathRef?: (el: SVGPathElement | null) => void;
  className?: string;
}

/** A straw piece drawn in code as a stroke along its centre line. */
export function StrawStroke({
  k,
  width,
  paint = STRAW_YELLOW,
  defs,
  box,
  managed = true,
  cap = "round",
  pathRef,
  className,
}: StrokeProps) {
  const ref = useRegister(k, managed);
  const [x0, y0, x1, y1] = STRAW_INFO[k].bbox;
  const pad = width;
  const rect: Rect = box ?? [
    x0 - pad,
    y0 - pad,
    x1 - x0 + pad * 2,
    y1 - y0 + pad * 2,
  ];
  return (
    <Layer box={rect} className={className}>
      {defs && <defs>{defs}</defs>}
      <path
        ref={(el) => {
          (ref as { current: SVGPathElement | null }).current = el;
          pathRef?.(el);
        }}
        d={STRAW_PATHS[k]}
        fill="none"
        stroke={paint}
        strokeWidth={width}
        strokeLinecap={cap}
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray="1 2"
        strokeDashoffset={1}
        style={{ visibility: "hidden" }}
      />
    </Layer>
  );
}

interface MaskedProps {
  k: StrawKey;
  art: ArtKey;
  /** Width of the reveal stroke (wider than the straw). */
  reveal: number;
  managed?: boolean;
  pathRef?: (el: SVGPathElement | null) => void;
  /** Extra mask content (e.g. a wipe rectangle), in artboard pt. */
  extraMask?: ReactNode;
  /**
   * Welds a joint with a code-drawn piece: inside this circle (artboard pt)
   * the exported art, whose end is ragged or flared, is masked out and the
   * centre line is stroked at STRAW_WIDTH instead, so it meets the
   * neighbouring stroke piece edge to edge.
   */
  weld?: { cx: number; cy: number; r: number };
  className?: string;
}

/** An exported straw revealed along its centre line through a mask. */
export function StrawArt({
  k,
  art,
  reveal,
  managed = true,
  pathRef,
  extraMask,
  weld,
  className,
}: MaskedProps) {
  const ref = useRegister(k, managed);
  const weldRef = useRegister(k, managed && !!weld);
  const id = useId().replace(/:/g, "");
  const rect = ART[art];
  return (
    <Layer box={rect} className={className}>
      <defs>
        {weld && (
          <clipPath id={`w${id}`} clipPathUnits="userSpaceOnUse">
            {/* Overlaps the masked-out art slightly: no anti-aliased seam. */}
            <circle cx={weld.cx} cy={weld.cy} r={weld.r + 1.5} />
          </clipPath>
        )}
        <mask
          id={`m${id}`}
          maskUnits="userSpaceOnUse"
          x={rect[0] - reveal}
          y={rect[1] - reveal}
          width={rect[2] + reveal * 2}
          height={rect[3] + reveal * 2}
        >
          <path
            ref={(el) => {
              (ref as { current: SVGPathElement | null }).current = el;
              pathRef?.(el);
            }}
            d={STRAW_PATHS[k]}
            fill="none"
            stroke="#fff"
            strokeWidth={reveal}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray="1 2"
            strokeDashoffset={1}
            style={{ visibility: "hidden" }}
          />
          {extraMask}
          {weld && <circle cx={weld.cx} cy={weld.cy} r={weld.r} fill="#000" />}
        </mask>
      </defs>
      <image
        href={artUrl(art)}
        x={rect[0]}
        y={rect[1]}
        width={rect[2]}
        height={rect[3]}
        mask={`url(#m${id})`}
      />
      {weld && (
        <path
          ref={weldRef}
          d={STRAW_PATHS[k]}
          clipPath={`url(#w${id})`}
          fill="none"
          stroke={STRAW_YELLOW}
          strokeWidth={STRAW_WIDTH}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray="1 2"
          strokeDashoffset={1}
          style={{ visibility: "hidden" }}
        />
      )}
    </Layer>
  );
}

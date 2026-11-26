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
   * Welds a joint with a code-drawn piece (see STRAW_WELDS): the art's
   * flared or tapered end is masked out by `hide`, and `fill` (revealed
   * with the art) widens from the art's measured edges to STRAW_WIDTH on
   * the shared centre line, so both sides meet without a step.
   */
  weld?: { readonly fill: string; readonly hide: string };
  className?: string;
}

/** Margin (pt) around a welded art's box for the weld beyond it. */
const WELD_PAD = 40;

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
  const id = useId().replace(/:/g, "");
  const rect = ART[art];
  // The weld runs past the art's own box into the neighbouring piece.
  const box: Rect = weld
    ? [
        rect[0] - WELD_PAD,
        rect[1] - WELD_PAD,
        rect[2] + WELD_PAD * 2,
        rect[3] + WELD_PAD * 2,
      ]
    : rect;
  return (
    <Layer box={box} className={className}>
      <defs>
        {weld && (
          <mask
            id={`w${id}`}
            maskUnits="userSpaceOnUse"
            x={rect[0]}
            y={rect[1]}
            width={rect[2]}
            height={rect[3]}
          >
            <rect
              x={rect[0]}
              y={rect[1]}
              width={rect[2]}
              height={rect[3]}
              fill="#fff"
            />
            <path d={weld.hide} fill="#000" />
          </mask>
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
        </mask>
      </defs>
      <g mask={`url(#m${id})`}>
        <image
          href={artUrl(art)}
          x={rect[0]}
          y={rect[1]}
          width={rect[2]}
          height={rect[3]}
          mask={weld && `url(#w${id})`}
        />
        {weld && <path d={weld.fill} fill={STRAW_YELLOW} />}
      </g>
    </Layer>
  );
}

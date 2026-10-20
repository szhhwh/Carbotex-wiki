import type { TeamMember } from "./types";

export interface PlotPoint {
  id: string;
  x: number;
  y: number;
}

export interface MemberPoint extends PlotPoint {
  color: string;
}

export interface NetworkLine {
  from: PlotPoint;
  to: PlotPoint;
  path: string;
}

export interface NetworkGeometry {
  memberPoints: MemberPoint[];
  backgroundPoints: PlotPoint[];
  backgroundLines: NetworkLine[];
  mainLines: NetworkLine[];
}

export const NETWORK_START_VH = 45;
export const NETWORK_SPACING_VH = 45;
export const NETWORK_END_VH = 57;

const xPattern = [0.2, 0.7, 0.3, 0.8];
const xJitter = [
  0.018, -0.026, 0.012, -0.02, 0.028, -0.014, 0.022, -0.03, 0.016, -0.018,
  0.026, -0.024, 0.014, -0.028, 0.02, -0.012, 0.024, -0.022,
];
const yJitterVh = [
  3, -4, 5, -2, 4, -5, 2, -3, 5, -4, 3, -2, 4, -3, 2, -4, 3, -2,
];
const backgroundLaneOffsets = [
  [-0.24, 0.24],
  [0.24, -0.24],
  [-0.2, 0.2],
  [0.2, -0.2],
];
const backgroundYFractions = [0.34, 0.72];
const networkColors = [
  "#fdc007",
  "#fcb011",
  "#fb971e",
  "#fa8724",
  "#e64b41",
  "#ed4a8e",
  "#f04aa0",
  "#ea40d5",
  "#de61dc",
  "#c92adf",
  "#9428ac",
  "#352153",
];
const networkAspectRatio = 3.6;
const backgroundBendPattern = [1.8, 1.4, 2.1, 1.7, 1.5, 2];
const mainBendPattern = [2.6, -2.8, 2.4, -2.7, 2.8, -2.5];

export function getNetworkHeight(memberCount: number) {
  return (
    NETWORK_START_VH +
    Math.max(0, memberCount - 1) * NETWORK_SPACING_VH +
    NETWORK_END_VH
  );
}

function networkColor(index: number) {
  const patternLength = networkColors.length * 2 - 2;
  const position = index % patternLength;
  const colorIndex =
    position < networkColors.length ? position : patternLength - position;

  return networkColors[colorIndex];
}

function makeGentleCurvePath(
  from: PlotPoint,
  to: PlotPoint,
  bend: number,
  bendOutward = false,
) {
  const x1 = from.x * 100;
  const y1 = from.y * 100;
  const x2 = to.x * 100;
  const y2 = to.y * 100;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const screenLength = Math.hypot(dx, dy * networkAspectRatio);

  if (screenLength === 0) {
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  }

  const normalX = (-dy * networkAspectRatio) / screenLength;
  const normalY = dx / screenLength;
  const midpointX = (x1 + x2) / 2;
  const midpointY = (y1 + y2) / 2;
  let direction = Math.sign(bend) || 1;

  if (bendOutward) {
    const positiveDistance = Math.hypot(
      midpointX + normalX * Math.abs(bend) - 50,
      (midpointY + (normalY * Math.abs(bend)) / networkAspectRatio - 50) *
        networkAspectRatio,
    );
    const negativeDistance = Math.hypot(
      midpointX - normalX * Math.abs(bend) - 50,
      (midpointY - (normalY * Math.abs(bend)) / networkAspectRatio - 50) *
        networkAspectRatio,
    );

    direction = positiveDistance >= negativeDistance ? 1 : -1;
  }

  const signedBend = Math.abs(bend) * direction;
  const controlX = Math.min(98, Math.max(2, midpointX + normalX * signedBend));
  const controlY = Math.min(
    99,
    Math.max(1, midpointY + (normalY * signedBend) / networkAspectRatio),
  );

  return `M ${x1} ${y1} Q ${controlX} ${controlY} ${x2} ${y2}`;
}

function makeBackgroundPoints(memberPoints: MemberPoint[]) {
  return memberPoints.slice(0, -1).flatMap((point, index) => {
    const next = memberPoints[index + 1];
    const lane = backgroundLaneOffsets[index % backgroundLaneOffsets.length];
    const centerX = (point.x + next.x) / 2;
    const verticalSpan = next.y - point.y;

    return backgroundYFractions.map((fraction, offsetIndex) => {
      return {
        id: `background-${index}-${offsetIndex}`,
        x: Math.min(0.94, Math.max(0.06, centerX + lane[offsetIndex])),
        y: point.y + verticalSpan * fraction,
      };
    });
  });
}

function makeBackgroundLines(
  memberPoints: MemberPoint[],
  backgroundPoints: PlotPoint[],
) {
  return memberPoints.slice(0, -1).flatMap((point, index) => {
    const next = memberPoints[index + 1];
    const firstBackground = backgroundPoints[index * 2];
    const secondBackground = backgroundPoints[index * 2 + 1];
    const pairs = [
      [point, firstBackground],
      [firstBackground, secondBackground],
      [secondBackground, next],
    ] as const;

    return pairs.map(([from, to], pairIndex) => {
      const [upper, lower] = from.y <= to.y ? [from, to] : [to, from];
      const lineIndex = index * pairs.length + pairIndex;

      return {
        from: upper,
        to: lower,
        path: makeGentleCurvePath(
          upper,
          lower,
          backgroundBendPattern[lineIndex % backgroundBendPattern.length],
          true,
        ),
      };
    });
  });
}

function makeMainLines(memberPoints: MemberPoint[]) {
  return memberPoints.slice(0, -1).map((from, index) => {
    const to = memberPoints[index + 1];

    return {
      from,
      to,
      path: makeGentleCurvePath(
        from,
        to,
        mainBendPattern[index % mainBendPattern.length],
      ),
    };
  });
}

export function createNetworkGeometry(
  members: TeamMember[],
  networkHeightVh: number,
): NetworkGeometry {
  const memberPoints = members.map((member, index) => ({
    id: member.id,
    x: Math.min(
      0.94,
      Math.max(
        0.06,
        xPattern[index % xPattern.length] + xJitter[index % xJitter.length],
      ),
    ),
    y:
      (NETWORK_START_VH +
        index * NETWORK_SPACING_VH +
        yJitterVh[index % yJitterVh.length]) /
      networkHeightVh,
    color: networkColor(index),
  }));
  const backgroundPoints = makeBackgroundPoints(memberPoints);

  return {
    memberPoints,
    backgroundPoints,
    backgroundLines: makeBackgroundLines(memberPoints, backgroundPoints),
    mainLines: makeMainLines(memberPoints),
  };
}

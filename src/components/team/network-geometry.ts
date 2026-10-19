import type { TeamMember } from "./types";

export interface PlotPoint {
  id: string;
  x: number;
  y: number;
}

export type MemberPoint = PlotPoint;

export interface NetworkCurve {
  from: PlotPoint;
  to: PlotPoint;
  path: string;
}

export interface BackgroundNetworkCurve extends NetworkCurve {
  scrollAnchor: number;
}

export interface NetworkGeometry {
  memberPoints: MemberPoint[];
  backgroundPoints: PlotPoint[];
  backgroundLines: BackgroundNetworkCurve[];
  mainLines: NetworkCurve[];
}

const xPattern = [0.22, 0.76, 0.3, 0.8, 0.2, 0.73, 0.28, 0.78, 0.24, 0.72];
const pointSpacing = 0.46;
const backgroundXPatterns = [
  [0.08, 0.53, 0.9],
  [0.27, 0.61, 0.94],
  [0.1, 0.44, 0.84],
];
const backgroundYOffsets = [0.12, 0.31, 0.2];
// Keep curve bows visually even in the tall, non-uniform network viewBox.
const networkAspectRatio = 3.6;
const backgroundBendPattern = [3.4, 2.8, 4.1, 3.6, 3, 4.3];
const mainBendPattern = [4.8, -5.2, 4.4, -4.9, 5.3, -4.5];

function distance(a: PlotPoint, b: PlotPoint) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function makeCurvePath(
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
  let bendDirection = Math.sign(bend) || 1;

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

    bendDirection = positiveDistance >= negativeDistance ? 1 : -1;
  }

  const signedBend = Math.abs(bend) * bendDirection;
  const controlX = Math.min(98, Math.max(2, midpointX + normalX * signedBend));
  const controlY = Math.min(
    99,
    Math.max(1, midpointY + (normalY * signedBend) / networkAspectRatio),
  );

  return `M ${x1} ${y1} Q ${controlX} ${controlY} ${x2} ${y2}`;
}

function makeBackgroundPoints(memberPoints: MemberPoint[], yScale: number) {
  return memberPoints.slice(0, -1).flatMap((point, index) => {
    const pattern = backgroundXPatterns[index % backgroundXPatterns.length];

    return pattern.map((x, offsetIndex) => {
      const jitter = (((index * 7 + offsetIndex * 3) % 5) - 2) * 0.008;

      return {
        id: `background-${index}-${offsetIndex}`,
        x: Math.min(0.95, Math.max(0.05, x + jitter)),
        y: point.y + backgroundYOffsets[offsetIndex] * yScale,
      };
    });
  });
}

function nearestPoints(
  origin: PlotPoint,
  candidates: PlotPoint[],
  count: number,
) {
  return candidates
    .filter((point) => point.id !== origin.id)
    .map((point) => ({ point, distance: distance(origin, point) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, count)
    .map(({ point }) => point);
}

function makeBackgroundLines(
  memberPoints: MemberPoint[],
  backgroundPoints: PlotPoint[],
  networkHeight: number,
) {
  const lines = new Map<string, Omit<NetworkCurve, "path">>();

  const addLine = (from: PlotPoint, to: PlotPoint) => {
    const [first, second] = from.id < to.id ? [from, to] : [to, from];
    lines.set(`${first.id}:${second.id}`, { from: first, to: second });
  };

  backgroundPoints.forEach((backgroundPoint) => {
    nearestPoints(backgroundPoint, memberPoints, 2).forEach((member) => {
      addLine(backgroundPoint, member);
    });
    nearestPoints(backgroundPoint, backgroundPoints, 2).forEach((point) => {
      addLine(backgroundPoint, point);
    });
  });

  return [...lines.values()].map((line, index) => ({
    ...line,
    path: makeCurvePath(
      line.from,
      line.to,
      backgroundBendPattern[index % backgroundBendPattern.length],
      true,
    ),
    // Preserve the original scroll timeline's unnormalized vertical anchor.
    scrollAnchor: ((line.from.y + line.to.y) / 2) * (networkHeight / 100),
  }));
}

function makeMainLines(memberPoints: MemberPoint[]) {
  return memberPoints.slice(0, -1).map((from, index) => {
    const to = memberPoints[index + 1];

    return {
      from,
      to,
      path: makeCurvePath(
        from,
        to,
        mainBendPattern[index % mainBendPattern.length],
      ),
    };
  });
}

export function createNetworkGeometry(
  members: TeamMember[],
  networkHeight: number,
): NetworkGeometry {
  const yScale = 100 / networkHeight;
  const memberPoints = members.map((member, index) => ({
    id: member.id,
    x: xPattern[index % xPattern.length],
    y: (0.5 + index * pointSpacing) * yScale,
  }));
  const backgroundPoints = makeBackgroundPoints(memberPoints, yScale);

  return {
    memberPoints,
    backgroundPoints,
    backgroundLines: makeBackgroundLines(
      memberPoints,
      backgroundPoints,
      networkHeight,
    ),
    mainLines: makeMainLines(memberPoints),
  };
}

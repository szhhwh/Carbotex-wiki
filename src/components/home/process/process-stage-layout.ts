import {
  FIELD_SUGARS,
  FIELD_WIDTH,
  HAYSTACK_BASE,
  HAYSTACK_CLUSTERS,
} from "./process-field";
import { RIBBON_HEIGHT } from "./process-stage-data";

function offsetWithin(element: HTMLElement, ancestor: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = element;
  while (node && node !== ancestor) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

function queryAll<T extends Element = HTMLElement>(
  root: ParentNode,
  selector: string,
): T[] {
  return Array.from(root.querySelectorAll<T>(selector));
}

export function getStageTargets(track: HTMLElement) {
  const q = (name: string) =>
    track.querySelector<HTMLElement>(`[data-${name}]`)!;
  return {
    stage: q("stage"),
    world: q("world"),
    firstStage: q("first-stage"),
    secondStage: q("second-stage"),
    firstCopy: q("first-copy"),
    firstScene: q("first-scene"),
    hills: q("hills"),
    field: q("field"),
    thermo: q("thermo"),
    thermoBob: q("thermo-bob"),
    secondCopy: q("second-copy"),
    yeastRow: q("yeast-row"),
    slots: queryAll(track, "[data-yeast-slot]").map((slot) => ({
      slot,
      body: slot.firstElementChild as HTMLElement,
      poses: queryAll(slot, "[data-pose]"),
    })),
    ribbonGroup: q("ribbon-group"),
    ribbon: q("ribbon"),
    painter: q("painter"),
    painterBrush: q("painter-brush"),
    shadow: q("shadow"),
    bottle: q("bottle"),
    bottleRibbon: track.querySelector<SVGSVGElement>("[data-bottle-ribbon]")!,
    bag: q("bag"),
    bubbles: q("bubbles"),
    rising: queryAll(track, "[data-bubble]"),
    finalCopy: q("final-copy"),
    haystacks: queryAll(track, "[data-haystack]"),
    sugars: queryAll(track, "[data-sugar]").map((element, index) => ({
      element,
      art: element.firstElementChild as HTMLElement,
      data: FIELD_SUGARS[index],
    })),
  };
}

export type StageTargets = ReturnType<typeof getStageTargets>;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function measureStage(targets: StageTargets) {
  const {
    world,
    stage,
    firstCopy,
    firstStage,
    secondCopy,
    secondStage,
    yeastRow,
    ribbonGroup,
    ribbon,
    painter,
    field,
    slots,
    sugars,
    bubbles,
  } = targets;
  const height = stage.clientHeight;
  const maxCamera = Math.max(0, world.offsetHeight - height);
  const top = (el: HTMLElement) => offsetWithin(el, world).y;
  const bottom = (el: HTMLElement) => top(el) + el.offsetHeight;
  const frame = (from: number, to: number, within: HTMLElement) => {
    const start = top(within);
    const camera = Math.min((from + to - height) / 2, from - 88);
    return -clamp(
      clamp(
        camera,
        start,
        Math.max(start, start + within.offsetHeight - height),
      ),
      0,
      maxCamera,
    );
  };
  const fieldScale = field.offsetWidth / FIELD_WIDTH;
  const slotBoxes = slots.map(({ slot }) => ({
    ...offsetWithin(slot, world),
    width: slot.offsetWidth,
    height: slot.offsetHeight,
  }));
  const sugarPositions = new Map(
    sugars.map(({ element, data }) => {
      const cluster = HAYSTACK_CLUSTERS[data.cluster];
      const slot = slotBoxes[data.yeast];
      const from = offsetWithin(element, world);
      const halfWidth = element.offsetWidth / 2;
      const halfHeight = element.offsetHeight / 2;
      const spread = (data.fallOrder - 0.5) * slot.width * 0.3;
      return [
        element,
        {
          popX:
            ((cluster.x0 + cluster.x1) / 2) * fieldScale -
            element.offsetLeft -
            halfWidth,
          popY:
            HAYSTACK_BASE * 0.78 * fieldScale - element.offsetTop - halfHeight,
          fallX: slot.x + slot.width / 2 + spread - from.x - halfWidth,
          fallY: slot.y + slot.height * 0.45 - from.y - halfHeight,
        },
      ];
    }),
  );
  return {
    height,
    fieldHeight: field.offsetHeight,
    bubbleRise: -bubbles.offsetHeight * 0.9,
    cameraFirst: frame(top(firstCopy), bottom(firstStage), firstStage),
    cameraYeast: frame(
      top(secondCopy),
      bottom(yeastRow) + height * 0.06,
      secondStage,
    ),
    cameraPainter: frame(top(ribbonGroup), bottom(painter), secondStage),
    cameraEnd: -maxCamera,
    ribbonTop: top(ribbon),
    ribbonScale: ribbon.offsetHeight / RIBBON_HEIGHT,
    sugarPositions,
    slotBoxes,
  };
}

export type StageLayout = ReturnType<typeof measureStage>;

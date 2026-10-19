import { createAssemblyModel } from "../core/assembly-model.js";
import { getLocale } from "../../../shared/js/i18n.js";
import { SHADOW_FILTERS, SvgDrawing, svgNode } from "./svg-drawing.js";

// Soft drop shadows give lifted cards and dragged nucleotides some depth.
function shadowFilter(id, dy, blur, opacity) {
  const filter = svgNode("filter", {
    id,
    x: "-40%",
    y: "-40%",
    width: "180%",
    height: "180%",
    "color-interpolation-filters": "sRGB",
  });
  filter.append(
    svgNode("feDropShadow", {
      dx: 0,
      dy,
      stdDeviation: blur,
      "flood-color": "#123a5c",
      "flood-opacity": opacity,
    }),
  );
  return filter;
}

export function createAssemblyBoard(svg, redraw, onNotice) {
  const clipId = `${svg.id}-viewport-clip`;
  const clip = svgNode("clipPath", {
    id: clipId,
    clipPathUnits: "userSpaceOnUse",
  });
  const clipRect = svgNode("rect");
  const defs = svgNode("defs");
  clip.append(clipRect);
  defs.append(
    clip,
    shadowFilter(SHADOW_FILTERS.soft, 1.5, 1.8, 0.2),
    shadowFilter(SHADOW_FILTERS.lift, 5, 7, 0.24),
  );
  const scene = svgNode("g", { "clip-path": `url(#${clipId})` });
  svg.append(defs, scene);
  // Paint order: the bench, then the transient feedback on top of it.
  const layers = {};
  for (const name of [
    "static",
    "tray",
    "assembly",
    "interaction",
    "snap",
    "drag",
  ]) {
    layers[name] = svgNode("g", {
      "data-layer": name,
      "pointer-events": "none",
    });
    scene.append(layers[name]);
  }
  const model = createAssemblyModel(redraw, onNotice);
  const cache = {};
  let pointerId = null;

  function renderLayer(name) {
    const fragment = document.createDocumentFragment();
    model.render(new SvgDrawing(fragment), name);
    layers[name].replaceChildren(fragment);
  }
  function render() {
    const bounds = svg.viewBox.baseVal;
    for (const key of ["x", "y", "width", "height"])
      clipRect.setAttribute(key, bounds[key]);
    const state = model.getRenderState();
    const snapshot = model.getSnapshot();
    // Each layer key builds on the previous one, so a locale, layout or view
    // change repaints everything downstream of it.
    const presentation = `${getLocale()}:${snapshot.viewMode}:${state.layout}`;
    const assemblyKey = `${presentation}:${state.assembly}`;
    const trayKey = `${presentation}:${state.tray}`;
    const interactionKey = `${assemblyKey}:${state.interaction}`;
    // The transient key carries the frame clock while a tween or a rejected
    // drop is running, plus the slot the dragged base would snap into.
    const dragKey = state.drag
      ? `${assemblyKey}:${state.drag.type}:${state.drag.strand}:${state.snap}`
      : state.snap;
    const transientChanged = cache.dragKey !== dragKey;
    if (cache.presentation !== presentation) renderLayer("static");
    if (cache.trayKey !== trayKey) renderLayer("tray");
    if (cache.assemblyKey !== assemblyKey) renderLayer("assembly");
    if (cache.interactionKey !== interactionKey) renderLayer("interaction");
    if (transientChanged) {
      renderLayer("drag");
      // The ghost is drawn once and then carried by a layer transform, so
      // pointer movement does not rebuild its nodes.
      cache.dragOrigin = state.drag ? { ...state.drag.point } : null;
    }
    if (state.drag && cache.dragOrigin) {
      layers.drag.setAttribute(
        "transform",
        `translate(${state.drag.point.x - cache.dragOrigin.x} ${state.drag.point.y - cache.dragOrigin.y})`,
      );
    } else layers.drag.removeAttribute("transform");
    if (transientChanged) renderLayer("snap");
    cache.presentation = presentation;
    cache.trayKey = trayKey;
    cache.assemblyKey = assemblyKey;
    cache.interactionKey = interactionKey;
    cache.dragKey = dragKey;
    svg.style.cursor = model.getCursor();
  }
  function point(event) {
    const matrix = svg.getScreenCTM();
    if (!matrix) return null;
    const position = new DOMPoint(event.clientX, event.clientY).matrixTransform(
      matrix.inverse(),
    );
    return { x: position.x, y: position.y };
  }
  function insideViewport(position) {
    const bounds = svg.viewBox.baseVal;
    return (
      position &&
      position.x >= bounds.x &&
      position.x <= bounds.x + bounds.width &&
      position.y >= bounds.y &&
      position.y <= bounds.y + bounds.height
    );
  }
  const handlers = {
    pointerdown(event) {
      if (pointerId !== null || !event.isPrimary || event.button !== 0) return;
      const position = point(event);
      if (!insideViewport(position)) return;
      event.preventDefault();
      pointerId = event.pointerId;
      svg.setPointerCapture(pointerId);
      model.handlePointerDown(position);
    },
    pointermove(event) {
      if (pointerId !== null && event.pointerId !== pointerId) return;
      const position = point(event);
      if (pointerId === null && !insideViewport(position))
        model.handlePointerLeave();
      else if (position) model.handlePointerMove(position);
    },
    pointerup(event) {
      if (event.pointerId !== pointerId) return;
      const position = point(event);
      if (position) model.handlePointerUp(position);
      else model.handlePointerCancel();
      releasePointer();
    },
    pointercancel(event) {
      if (event.pointerId !== pointerId) return;
      model.handlePointerCancel();
      releasePointer();
    },
    lostpointercapture() {
      if (pointerId === null) return;
      pointerId = null;
      model.handlePointerCancel();
    },
    pointerleave() {
      if (pointerId === null) model.handlePointerLeave();
    },
  };
  function releasePointer() {
    const id = pointerId;
    pointerId = null;
    if (id !== null && svg.hasPointerCapture(id)) svg.releasePointerCapture(id);
  }
  for (const [name, handler] of Object.entries(handlers))
    svg.addEventListener(name, handler);
  return {
    ...model,
    setLayout(layout) {
      if (pointerId !== null) {
        model.handlePointerCancel();
        releasePointer();
      }
      model.setLayout(layout);
    },
    render,
    destroy() {
      releasePointer();
      for (const [name, handler] of Object.entries(handlers))
        svg.removeEventListener(name, handler);
      model.destroy();
    },
  };
}

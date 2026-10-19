import { createAssemblyBoard } from "./ui/assembly-board.js";
import { DNA_MESSAGES } from "./i18n.js";
import { getLocale, initActivityI18n, t } from "../../shared/js/i18n.js";
import "../../shared/css/accessibility.css";
import "../../shared/css/language-switcher.css";
import { mountActivityLegalFooter } from "../../shared/js/activity-footer.js";

mountActivityLegalFooter();

initActivityI18n({
  messages: DNA_MESSAGES,
  switcher: "[data-lang-switcher-host]",
  onChange() {
    selection.textContent = t("dna.selection.empty");
    showStatus("");
    draw();
  },
});

const assemblyBoard = document.getElementById("assembly-board");
const wrapper = document.querySelector(".assembly-wrapper");
const board = document.getElementById("board-stage");
const boardViewport = document.querySelector(".board-viewport");
const stage = document.getElementById("helix-stage");
const viewport = document.getElementById("helix-viewport");
const notice = document.getElementById("viewer-notice");
const status = document.getElementById("status");
// The entry renders no status UI: messages are announced to assistive tech and
// stay out of the visual layout.
function showStatus(message) {
  status.textContent = message;
}
const selection = document.getElementById("selection");
const controls = document.querySelector(".dna-app");
const buttonFor = (action) =>
  controls.querySelector(`[data-action="${action}"]`);
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
let visible = true;
let autoRotate = false;
let autoExtend = false;
let viewer = null;
let loading = null;
let destroyed = false;
let in3d = false;
let controlsState = "";
const model = createAssemblyBoard(assemblyBoard, draw, (message) => {
  showStatus(message);
});

function showNotice(text = "") {
  notice.textContent = text;
  notice.hidden = !text;
}

function syncControls(snapshot) {
  in3d = snapshot.sceneMode === "helix3d";
  const nextState = JSON.stringify([
    getLocale(),
    snapshot,
    autoRotate,
    autoExtend,
    Boolean(viewer),
  ]);
  // Pointer movement only changes SVG transforms, not the control panel.
  if (nextState === controlsState) return;
  controlsState = nextState;
  controls.dataset.scene = snapshot.sceneMode;
  // Both stages stay in the layout so the switch can cross-fade; the hidden
  // one is inert instead of removed.
  board.inert = in3d;
  stage.inert = !in3d;
  document.getElementById("instructions").textContent = in3d
    ? t("dna.instructions.helix")
    : t("dna.instructions.wide");
  document.querySelector(".three-d-controls").hidden = !in3d;
  const toggle = buttonFor("toggle3d");
  toggle.querySelector("span").textContent = in3d
    ? t("dna.view.back")
    : t("dna.view.enter3d");
  toggle.disabled = !snapshot.nucleotides.length;
  toggle.setAttribute("aria-pressed", String(in3d));
  buttonFor("toggleView").setAttribute(
    "aria-pressed",
    String(snapshot.viewMode === "structure"),
  );
  for (const action of [
    "toggleAutoRotate",
    "toggleAutoExtend",
    "resetCamera",
  ]) {
    buttonFor(action).disabled = !in3d || !viewer;
  }
  controls.querySelectorAll("[data-zoom]").forEach((button) => {
    button.disabled = !in3d || !viewer;
  });
  buttonFor("toggleAutoRotate").setAttribute(
    "aria-pressed",
    String(autoRotate),
  );
  buttonFor("toggleAutoExtend").setAttribute(
    "aria-pressed",
    String(autoExtend),
  );
}

async function loadViewer() {
  showNotice(t("dna.notice.loading"));
  try {
    const { createHelixViewer } = await import("./ui/helix-viewer.js");
    if (destroyed) return;
    viewer = createHelixViewer(viewport, {
      onSelect(base) {
        const origin = base.generated
          ? t("dna.selection.generated")
          : t("dna.selection.assembled");
        const position = base.generated
          ? ""
          : t("dna.selection.row", { row: base.row + 1 });
        selection.textContent = t("dna.selection.summary", {
          origin,
          strand: base.strand === "left" ? "I" : "II",
          position,
          type: base.type,
        });
      },
      onContextChange(restored) {
        showNotice(restored ? "" : t("dna.notice.contextLost"));
      },
    });
    showNotice();
    draw();
  } catch (error) {
    if (destroyed) return;
    viewer?.dispose();
    viewer = null;
    viewport.replaceChildren();
    showStatus(t("dna.error.webgl"));
    console.error("DNA WebGL viewer:", error);
    model.setSceneMode("board2d");
    showNotice();
  } finally {
    loading = null;
  }
}

function draw() {
  if (destroyed) return;
  const snapshot = model.getSnapshot();
  if (!snapshot.nucleotides.length) {
    autoRotate = false;
    autoExtend = false;
  }
  syncControls(snapshot);
  if (in3d) {
    if (viewer) {
      viewer.update(snapshot.nucleotides, snapshot.viewMode, autoExtend);
      viewer.setAutoRotate(autoRotate);
    } else if (!loading) {
      loading = loadViewer();
    }
  } else if (visible && !document.hidden) {
    model.render();
  }
  viewer?.setActive(in3d && visible && !document.hidden);
}

function resize() {
  const { width, height } = boardViewport.getBoundingClientRect();
  if (!width || !height) return;
  // The supply tray stays visible at every size because dragging or clicking a
  // tray card is the only way to add a nucleotide. Portrait containers stack the
  // tray above the bench so neither side is scaled down past legibility.
  const trayRow = height > width * 0.9;
  const scale = Math.min(
    width / (trayRow ? 400 : 752),
    height / (trayRow ? 700 : 552),
  );
  const layout = {
    width: width / scale,
    height: height / scale,
    showSupply: true,
    trayRow,
  };
  assemblyBoard.setAttribute("viewBox", `0 0 ${layout.width} ${layout.height}`);
  model.setLayout(layout);
  draw();
}

controls.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button || button.disabled) return;
  if (button.dataset.zoom) {
    viewer?.zoom(Number(button.dataset.zoom));
  } else {
    switch (button.dataset.action) {
      case "toggleAutoRotate":
        autoRotate = !autoRotate;
        break;
      case "toggleAutoExtend":
        autoExtend = !autoExtend;
        selection.textContent = t("dna.selection.empty");
        showStatus(
          autoExtend ? t("dna.status.extendOn") : t("dna.status.extendOff"),
        );
        break;
      case "resetCamera":
        viewer?.resetCamera();
        break;
      case "toggle3d":
        model.toggle3d();
        showStatus(in3d ? t("dna.status.entered3d") : t("dna.status.back2d"));
        break;
      case "toggleView":
        model.toggleView();
        break;
    }
    draw();
  }
});

function motionPreferenceChanged() {
  if (reducedMotion.matches) {
    autoRotate = false;
    draw();
  }
}
const observer = new ResizeObserver(resize);
observer.observe(boardViewport);
const visibility = new IntersectionObserver(([entry]) => {
  visible = entry.isIntersecting;
  draw();
});
visibility.observe(wrapper);
document.addEventListener("visibilitychange", draw);
reducedMotion.addEventListener("change", motionPreferenceChanged);
window.addEventListener("pagehide", (event) => {
  if (event.persisted) {
    viewer?.setActive(false);
    return;
  }
  destroyed = true;
  observer.disconnect();
  visibility.disconnect();
  document.removeEventListener("visibilitychange", draw);
  reducedMotion.removeEventListener("change", motionPreferenceChanged);
  model.destroy();
  viewer?.dispose();
});
window.addEventListener("pageshow", () => {
  if (!destroyed) draw();
});
resize();

import { t } from "./i18n.js";

// Label existing simulation controls without changing their educational content.
document.querySelectorAll("input, select").forEach((input) => {
  if (input.labels?.length || input.hasAttribute("aria-label")) return;
  const label = input.closest(".control-row")?.querySelector("label");
  if (label) {
    if (input.id) label.htmlFor = input.id;
  } else {
    input.setAttribute("aria-label", input.placeholder || input.id);
  }
});

document.querySelectorAll(".close-btn").forEach((button) => {
  button.setAttribute("aria-label", t("shared.close"));
});

document.querySelectorAll(".vote-option").forEach((control) => {
  control.setAttribute("role", "button");
  control.tabIndex = 0;
});

document.addEventListener("keydown", (event) => {
  if (event.repeat || !["Enter", " "].includes(event.key)) return;
  const control = event.target.closest('[role="button"][tabindex="0"]');
  if (!control) return;
  event.preventDefault();
  control.click();
});

let activeDialog = null;
let previousFocus = null;
const focusable =
  'button:not(:disabled), input:not(:disabled), select:not(:disabled), a[href], [tabindex="0"]';

function updateDialog() {
  const next =
    document.querySelector(".tutorial-tooltip") ||
    document.querySelector(".modal-overlay.active .modal-content");
  if (next === activeDialog) return;
  if (!next) {
    activeDialog = null;
    if (previousFocus?.isConnected)
      previousFocus.focus({ preventScroll: true });
    previousFocus = null;
    return;
  }
  if (!activeDialog) previousFocus = document.activeElement;
  activeDialog = next;
  next.setAttribute("role", "dialog");
  next.setAttribute("aria-modal", "true");
  next.setAttribute(
    "aria-label",
    next.querySelector("h2, h3")?.textContent || t("shared.dialog"),
  );
  next.tabIndex = -1;
  (next.querySelector(focusable) || next).focus({ preventScroll: true });
}

document.addEventListener("keydown", (event) => {
  if (!activeDialog) return;
  if (event.key === "Escape") {
    activeDialog.querySelector('[data-action="skip"], #trade-cancel')?.click();
  }
  if (event.key !== "Tab") return;
  const controls = [...activeDialog.querySelectorAll(focusable)].filter(
    (element) => element.getClientRects().length > 0,
  );
  const current = controls.indexOf(document.activeElement);
  if (!controls.length) {
    event.preventDefault();
    activeDialog.focus();
  } else if (
    current < 0 ||
    (event.shiftKey && current === 0) ||
    (!event.shiftKey && current === controls.length - 1)
  ) {
    event.preventDefault();
    controls[event.shiftKey ? controls.length - 1 : 0].focus();
  }
});

const dialogs = new MutationObserver(updateDialog);
dialogs.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ["class"],
});
window.addEventListener("pagehide", () => dialogs.disconnect());
updateDialog();

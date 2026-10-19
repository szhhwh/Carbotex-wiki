/** Start page entrances with the current opening fade, if one is playing. */
export function onOpeningReveal(play: () => void) {
  const opening = document.getElementById("opening-screen");
  if (opening?.dataset.state === "playing") {
    document.addEventListener("wiki:opening-reveal", play, { once: true });
    return () => document.removeEventListener("wiki:opening-reveal", play);
  }

  play();
  return () => {};
}

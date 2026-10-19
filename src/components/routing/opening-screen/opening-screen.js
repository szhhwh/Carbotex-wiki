(() => {
  const screen = document.getElementById("opening-screen");
  const root = document.getElementById("root");
  const turn = screen.querySelector(".opening-screen__turn");
  const recovery = screen.querySelector(".opening-screen__recovery");
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let played = false;
  let leaving = false;
  let reducedTimer;
  let exitTimer;
  let turnTimer;

  const cssTimeMs = (value, fallback) => {
    const match = /^([\d.]+)(ms|s)$/.exec(value.trim());
    return match ? Number(match[1]) * (match[2] === "s" ? 1000 : 1) : fallback;
  };
  const fadeDuration = () =>
    cssTimeMs(getComputedStyle(screen).transitionDuration.split(",")[0], 900);

  const showRecovery = () => {
    recovery.hidden = false;
  };
  document.addEventListener("wiki:bootstrap-error", showRecovery);

  const blockScroll = (event) => event.preventDefault();
  const blockKeys = (event) => {
    if (
      [
        " ",
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        "Home",
        "End",
      ].includes(event.key)
    ) {
      event.preventDefault();
    }
  };
  screen.addEventListener("wheel", blockScroll, { passive: false });
  screen.addEventListener("touchmove", blockScroll, { passive: false });
  document.addEventListener("keydown", blockKeys);

  const cleanup = () => {
    clearTimeout(exitTimer);
    clearTimeout(reducedTimer);
    clearTimeout(recoveryTimer);
    clearTimeout(turnTimer);
    observer.disconnect();
    motion.removeEventListener("change", onMotionChange);
    document.removeEventListener("keydown", blockKeys);
    document.removeEventListener("wiki:bootstrap-error", showRecovery);
    root.inert = false;
    root.removeAttribute("aria-busy");
    screen.remove();
    document.dispatchEvent(new Event("wiki:opening-complete"));
  };

  const finish = () => {
    // A committed route (or its error boundary) and a full turn are both required.
    if (
      leaving ||
      !played ||
      !root.querySelector("[data-route-ready], [data-route-error]")
    )
      return;
    leaving = true;
    observer.disconnect();
    screen.dataset.state = "leaving";
    document.dispatchEvent(new Event("wiki:opening-reveal"));
    screen.addEventListener("transitionend", (event) => {
      if (event.target === screen && event.propertyName === "opacity")
        cleanup();
    });
    exitTimer = window.setTimeout(cleanup, fadeDuration() + 100);
  };

  const onMotionChange = () => {
    if (motion.matches) {
      // Keep a brief opening even without rotation, including cached visits.
      reducedTimer = window.setTimeout(
        () => {
          played = true;
          finish();
        },
        cssTimeMs(
          getComputedStyle(screen).getPropertyValue(
            "--opening-reduced-hold-duration",
          ),
          450,
        ),
      );
    }
  };

  const observer = new MutationObserver(finish);
  observer.observe(root, { childList: true, subtree: true });
  turn.addEventListener(
    "animationiteration",
    () => {
      clearTimeout(turnTimer);
      played = true;
      finish();
    },
    { once: true },
  );
  if (!motion.matches) {
    turnTimer = window.setTimeout(
      () => {
        played = true;
        finish();
      },
      cssTimeMs(getComputedStyle(turn).animationDuration, 1000) + 100,
    );
  }
  motion.addEventListener("change", onMotionChange);
  onMotionChange();

  const recoveryTimer = window.setTimeout(showRecovery, 20000);
  screen
    .querySelector("button")
    .addEventListener("click", () => window.location.reload());
})();

import { useLayoutEffect, useState } from "react";
import { HomeMotion, HomeMotionContext } from "./motion";
import { HomeCanvas } from "./canvas/HomeCanvas";
import { ProcessSections } from "./process/ProcessSections";

/**
 * Carbotex home: the illustrated canvas (hero → P5) followed by P7–P10.
 * Owns the page's single Lenis instance; it shares the GSAP ticker with
 * ScrollTrigger so every scroll animation runs in one render loop.
 */
export function HomePage() {
  const [motion] = useState(() => new HomeMotion());
  useLayoutEffect(() => motion.start(), [motion]);

  return (
    <HomeMotionContext.Provider value={motion}>
      <div data-home-root>
        <HomeCanvas />
        <ProcessSections />
      </div>
    </HomeMotionContext.Provider>
  );
}

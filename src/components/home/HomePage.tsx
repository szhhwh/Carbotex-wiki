import "@fontsource-variable/noto-sans-sc";
import { useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { LenisContext } from "./lenis";
import { HomeCanvas } from "./canvas/HomeCanvas";
import { ProcessSections } from "./process/ProcessSections";

gsap.registerPlugin(ScrollTrigger);

/**
 * Carbotex home: the illustrated canvas (hero → P5) followed by P7–P10.
 * Owns the page's single Lenis instance; it shares the GSAP ticker with
 * ScrollTrigger so every scroll animation runs in one render loop.
 */
export function HomePage() {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useLayoutEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let instance: Lenis | null = null;
    const tick = (time: number) => instance?.raf(time * 1000);

    const start = () => {
      stop();
      if (motion.matches) return;
      instance = new Lenis({ lerp: 0.11, wheelMultiplier: 0.9 });
      instance.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      setLenis(instance);
    };
    const stop = () => {
      gsap.ticker.remove(tick);
      instance?.destroy();
      instance = null;
      setLenis(null);
    };

    gsap.ticker.lagSmoothing(0);
    start();
    motion.addEventListener("change", start);
    return () => {
      motion.removeEventListener("change", start);
      stop();
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      <div data-home-root>
        <HomeCanvas />
        <ProcessSections />
      </div>
    </LenisContext.Provider>
  );
}

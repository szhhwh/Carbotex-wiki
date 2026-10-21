import { createContext, useContext } from "react";
import type Lenis from "lenis";

/** The single Lenis instance of the home page (null with reduced motion). */
export const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

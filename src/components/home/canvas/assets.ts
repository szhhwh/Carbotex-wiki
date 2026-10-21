import type { CSSProperties } from "react";
import { staticHomeAsset } from "../../../utils/staticAsset";
import type { ArtKey } from "../geometry";

/**
 * Artwork that used to live in `src/assets/home/<key>.svg` is uploaded flat
 * into the wiki's `home/` folder, so its URL is the file name alone. Two
 * source folders shared the file name `thermocellum.svg`; the upload kept them
 * apart with a folder prefix, listed here.
 */
const UPLOAD_NAME_OVERRIDES: Record<string, string> = {
  "p4/thermocellum": "home__p4__thermocellum.svg",
  "p7/thermocellum": "home__p7__thermocellum.svg",
};

/** URL of the uploaded artwork for `<key>.svg` (key: `<folder>/<file name>`). */
export function artUrl(key: ArtKey | string): string {
  const override = UPLOAD_NAME_OVERRIDES[key];
  if (override) return staticHomeAsset(override);
  const slash = key.lastIndexOf("/");
  return staticHomeAsset(`${slash === -1 ? key : key.slice(slash + 1)}.svg`);
}

/** [x, y, width, height] on the artboard, in pt. */
export type Rect = readonly [number, number, number, number];

/** CSS variables placing an element at an artboard rectangle (pt). */
export function rectStyle(rect: Rect, extra?: CSSProperties): CSSProperties {
  return {
    "--x": rect[0],
    "--y": rect[1],
    "--w": rect[2],
    "--h": rect[3],
    ...extra,
  } as CSSProperties;
}

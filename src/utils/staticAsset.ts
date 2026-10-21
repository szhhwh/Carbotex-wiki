/**
 * Base URL of the CarboTex wiki media on the iGEM host. Project rule: images
 * and fonts are served from `static.igem.wiki`, never from a third-party CDN.
 */
const WIKI_ASSET_BASE = "https://static.igem.wiki/teams/6147/wiki";

/**
 * URL of a file published flat inside the wiki's `home/` upload folder. Every
 * artwork that used to be bundled from `src/assets/` is uploaded there under
 * its own file name — see `src/components/home/canvas/assets.ts` for the two
 * duplicates the uploader renamed with a folder prefix.
 */
export function staticHomeAsset(fileName: string): string {
  return `${WIKI_ASSET_BASE}/home/${fileName}`;
}

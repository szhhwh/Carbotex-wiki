/**
 * Site-absolute path for a route. `BASE_URL` is the vite `base` (the path the
 * wiki is deployed below, e.g. `/ouc-haide/`) and always ends with a slash.
 */
export function sitePath(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}

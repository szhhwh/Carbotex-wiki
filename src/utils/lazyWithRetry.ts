import { dynamicImportWithRetry } from "@fatso83/retry-dynamic-import";
import { lazy, type ComponentType } from "react";

type RouteModule = Record<string, unknown>;

function selectComponent(module: RouteModule, exportName: string) {
  const component = module[exportName];
  if (typeof component !== "function") {
    throw new TypeError(`Missing route component export: ${exportName}`);
  }
  return { default: component as ComponentType };
}

/**
 * React.lazy caches a failed module import. The package-backed helper retries
 * the failed route chunk with a cache-busting URL so a transient CDN request
 * failure can recover without trapping the route in the error boundary.
 */
export function lazyWithRetry<Module extends RouteModule>(
  load: () => Promise<Module>,
  exportName: keyof Module & string,
) {
  return lazy(() =>
    dynamicImportWithRetry(load).then((module) =>
      selectComponent(module, exportName),
    ),
  );
}

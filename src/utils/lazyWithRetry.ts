import { lazy, type ComponentType } from "react";

const MAX_ATTEMPTS = 3;
const RETRY_DELAY_MS = 250;

function isRetryableImportError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return /failed to fetch dynamically imported module|importing a module script failed|error loading dynamically imported module|chunkloaderror|loading chunk/i.test(
    message,
  );
}

function wait(milliseconds: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

/**
 * Give transient route-chunk failures a few chances before the error boundary
 * takes over. A failed dynamic import can succeed on a subsequent request when
 * the first request was interrupted by a slow or unstable connection.
 */
export function lazyWithRetry(load: () => Promise<{ default: ComponentType }>) {
  return lazy(async () => {
    let lastError: unknown;

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
      try {
        return await load();
      } catch (error) {
        lastError = error;
        if (!isRetryableImportError(error) || attempt === MAX_ATTEMPTS - 1) {
          throw error;
        }
        await wait(RETRY_DELAY_MS * 2 ** attempt);
      }
    }

    throw lastError;
  });
}

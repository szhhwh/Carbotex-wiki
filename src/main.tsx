// Keep application CSS out of the initial HTML's render-blocking resources.
// The inline opening can paint while this module and its dependencies download.
void import("./bootstrap.tsx").catch(() => {
  document.dispatchEvent(new Event("wiki:bootstrap-error"));
});

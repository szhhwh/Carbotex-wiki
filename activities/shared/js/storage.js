const fallback = new Map();

// Keep the activities usable when the browser blocks persistent storage.
export const storage = {
  getItem(key) {
    if (fallback.has(key)) return fallback.get(key);
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem(key, value) {
    fallback.set(key, String(value));
    try {
      localStorage.setItem(key, String(value));
    } catch {
      // This session still retains the value in memory.
    }
  },
  removeItem(key) {
    fallback.set(key, null);
    try {
      localStorage.removeItem(key);
    } catch {
      // The in-memory tombstone prevents old values from reappearing.
    }
  },
};

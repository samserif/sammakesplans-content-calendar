/**
 * useStorage — a drop-in localStorage hook that mirrors the window.storage
 * interface used in the original single-file component.
 *
 * To swap for Supabase later:
 *  1. Replace the get/set implementations below with Supabase calls.
 *  2. Change `initialValue` loading to an async useEffect if needed.
 *  3. Everything else in the app stays the same.
 */

const storage = {
  get: (key) => {
    try {
      const value = localStorage.getItem(key);
      return value ? { value } : null;
    } catch {
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // storage full or unavailable — fail silently
    }
  },
};

export default storage;

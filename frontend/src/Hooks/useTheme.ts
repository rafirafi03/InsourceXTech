import { useSyncExternalStore } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "insource-theme";
const THEME_COLORS: Record<Theme, string> = { dark: "#01030a", light: "#ffffff" };

const read = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";

const subscribe = (onChange: () => void) => {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
};

/** Switch theme, remember it, and fade colours briefly so the change isn't abrupt. */
export function setTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.add("theme-switching");
  root.setAttribute("data-theme", theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[theme]);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* storage unavailable (private mode): the choice just won't persist */
  }
  window.setTimeout(() => root.classList.remove("theme-switching"), 500);
}

/** Current theme; re-renders when it changes. The initial value is set in index.html. */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, read, () => "light");
}

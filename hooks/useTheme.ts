"use client";

import { useCallback, useEffect, useState } from "react";

export type ObaTheme = "sombre" | "clair";

const STORAGE_KEY = "oba-theme";

/** Inlined in <head> so the theme attribute is set before hydration (no flash). */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t!=="clair"&&t!=="sombre"){t="sombre"}document.documentElement.setAttribute("data-oba-t",t)}catch(e){document.documentElement.setAttribute("data-oba-t","sombre")}})();`;

export function useTheme() {
  const [theme, setTheme] = useState<ObaTheme>("sombre");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-oba-t");
    setTheme(current === "clair" ? "clair" : "sombre");
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: ObaTheme = prev === "sombre" ? "clair" : "sombre";
      document.documentElement.setAttribute("data-oba-t", next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {}
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}

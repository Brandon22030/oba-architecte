"use client";

import { useEffect } from "react";

/**
 * Writes --mx/--my (normalized mouse position, -1..1) and --sy/--prog
 * (scroll position) onto <html>, exactly like the original mockup's
 * brancherGlobal(). Decorative elements read these as CSS custom properties
 * for parallax translate3d(), so no re-render is needed on every frame.
 */
export function useParallax() {
  useEffect(() => {
    const root = document.documentElement;
    let ticking = false;

    function onMouseMove(e: MouseEvent) {
      const mx = (e.clientX / window.innerWidth) * 2 - 1;
      const my = (e.clientY / window.innerHeight) * 2 - 1;
      root.style.setProperty("--mx", mx.toFixed(4));
      root.style.setProperty("--my", my.toFixed(4));
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const h = document.body.scrollHeight - window.innerHeight;
        const prog = h > 0 ? window.scrollY / h : 0;
        root.style.setProperty("--sy", (window.scrollY / window.innerHeight).toFixed(4));
        root.style.setProperty("--prog", prog.toFixed(4));
        ticking = false;
      });
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}

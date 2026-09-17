"use client";

import { cloneElement, isValidElement, useEffect, useRef, type ReactElement } from "react";

/**
 * Wraps a single focusable child (link/button) and nudges it toward the
 * cursor on mousemove, matching the mockup's [data-magnet] behavior.
 */
export function Magnetic({ children }: { children: ReactElement }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      el!.style.transition = "none";
      el!.style.transform = `translate(${dx * 0.28}px, ${dy * 0.22}px)`;
    }

    function onLeave() {
      el!.style.transition = "transform .6s cubic-bezier(.18,.8,.24,1)";
      el!.style.transform = "none";
    }

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  if (!isValidElement(children)) return children;
  return cloneElement(children as ReactElement<{ ref?: React.Ref<HTMLElement> }>, { ref });
}

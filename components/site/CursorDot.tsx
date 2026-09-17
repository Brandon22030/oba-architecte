"use client";

import { useEffect, useRef } from "react";

/**
 * Fixed cursor-follow dot, ported from the mockup's data-oba="curseur":
 * lerps toward the real mouse position every frame, and grows on hover of
 * any link, button, or zoomable image.
 */
export function CursorDot() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2, cx: 0, cy: 0 };
    pos.cx = pos.x;
    pos.cy = pos.y;

    function onMove(e: MouseEvent) {
      pos.x = e.clientX;
      pos.y = e.clientY;
    }

    function onOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-zoom]")) {
        el!.style.width = "74px";
        el!.style.height = "74px";
        el!.style.margin = "-37px 0 0 -37px";
      }
    }

    function onOut(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-zoom]")) {
        el!.style.width = "26px";
        el!.style.height = "26px";
        el!.style.margin = "-13px 0 0 -13px";
      }
    }

    let raf = 0;
    function tick() {
      pos.cx += (pos.x - pos.cx) * 0.16;
      pos.cy += (pos.y - pos.cy) * 0.16;
      if (el) el.style.transform = `translate3d(${pos.cx}px, ${pos.cy}px, 0)`;
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      data-oba="curseur"
      ref={ref}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 26,
        height: 26,
        margin: "-13px 0 0 -13px",
        borderRadius: "50%",
        background: "#EF8B12",
        mixBlendMode: "difference",
        pointerEvents: "none",
        zIndex: 300,
        transition: "width .25s, height .25s, margin .25s",
      }}
    />
  );
}

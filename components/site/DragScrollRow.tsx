"use client";

import { useImperativeHandle, useRef, type ReactNode, type Ref } from "react";

/**
 * Horizontal drag-to-scroll strip, replacement for the mockup's
 * [data-strip] pointer-drag behavior.
 */
export function DragScrollRow({
  children,
  className,
  ref,
}: {
  children: ReactNode;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => innerRef.current as HTMLDivElement);
  const state = useRef({ down: false, startX: 0, startScroll: 0, moved: false });

  function onPointerDown(e: React.PointerEvent) {
    const el = innerRef.current;
    if (!el) return;
    state.current = { down: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    el.style.scrollSnapType = "none";
    el.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    const el = innerRef.current;
    if (!el || !state.current.down) return;
    const dx = e.clientX - state.current.startX;
    if (Math.abs(dx) > 4) state.current.moved = true;
    el.scrollLeft = state.current.startScroll - dx;
  }

  function endDrag(e: React.PointerEvent) {
    const el = innerRef.current;
    if (!el) return;
    state.current.down = false;
    el.style.scrollSnapType = "x mandatory";
    try {
      el.releasePointerCapture(e.pointerId);
    } catch {}
  }

  return (
    <div
      ref={innerRef}
      data-strip="1"
      className={`flex cursor-grab gap-7 overflow-x-auto pb-3.5 [scroll-snap-type:x_mandatory] active:cursor-grabbing ${className ?? ""}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onClickCapture={(e) => {
        if (state.current.moved) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      {children}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * React replacement for the mockup's data-compte counters: animates from a
 * starting value up to `end` over ~1.4s once scrolled into view.
 */
export function CountUp({ end, className, style }: { end: number; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [value, setValue] = useState(end);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const start = end <= 1000 ? 0 : end - 60;
    const duration = 1400;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(el);
          const startTime = performance.now();
          function tick(now: number) {
            const t = Math.min(1, (now - startTime) / duration);
            setValue(Math.round(start + (end - start) * easeOutCubic(t)));
            if (t < 1) requestAnimationFrame(tick);
          }
          setValue(start);
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  return (
    <p ref={ref} className={className} style={style}>
      {value}
    </p>
  );
}

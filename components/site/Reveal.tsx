"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** "up" fades + slides up (default), "clip" wipes in from the left. */
  variant?: "up" | "clip";
  /** delay in ms before the reveal transition starts, once in view. */
  delay?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
};

/**
 * React replacement for the mockup's data-rev/data-d scroll-reveal.
 * The original scanned the DOM on scroll/interval; here each instance owns
 * its own IntersectionObserver, which is the idiomatic React equivalent and
 * works correctly across client-side navigation.
 */
export function Reveal({ children, variant = "up", delay = 0, as: Tag = "div", className, style }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timer: number | undefined;

    // threshold 0: fires as soon as any part of the element enters the
    // viewport (mirrors the original's "top within 90% of viewport height"
    // check) rather than waiting for a fixed fraction of its area to be
    // visible, which fired far too late for tall elements (e.g. portraits).
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            timer = window.setTimeout(() => el.classList.add("oba-vu"), delay);
            observer.unobserve(el);
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [delay]);

  return (
    <Tag ref={ref} data-rev={variant} className={className} style={style}>
      {children}
    </Tag>
  );
}

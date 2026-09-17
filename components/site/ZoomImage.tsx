"use client";

import Image, { type ImageProps } from "next/image";
import { useRef } from "react";

/**
 * Hover-zoom image, replacement for the mockup's [data-zoom]: scales up and
 * drops the saturate/contrast/grayscale filter on hover.
 */
export function ZoomImage({
  filter = "saturate(.7) contrast(1.05)",
  wrapperClassName,
  className,
  ...props
}: ImageProps & { filter?: string; wrapperClassName?: string }) {
  const imgRef = useRef<HTMLImageElement>(null);

  return (
    <div
      className={wrapperClassName ?? "relative overflow-hidden"}
      onMouseEnter={() => {
        if (imgRef.current) {
          imgRef.current.style.transform = "scale(1.07)";
          imgRef.current.style.filter = "none";
        }
      }}
      onMouseLeave={() => {
        if (imgRef.current) {
          imgRef.current.style.transform = "scale(1)";
          imgRef.current.style.filter = filter;
        }
      }}
    >
      <Image
        ref={imgRef}
        className={`h-full w-full object-cover transition-[transform,filter] duration-[1.1s] ease-[cubic-bezier(.18,.8,.24,1)] ${className ?? ""}`}
        style={{ filter }}
        {...props}
      />
    </div>
  );
}

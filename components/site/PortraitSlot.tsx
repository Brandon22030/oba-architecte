import Image from "next/image";
import { ZoomImage } from "./ZoomImage";

/**
 * Portrait box: shows the real photo once avatarUrl is set from the admin
 * dashboard (Supabase Storage), otherwise a placeholder with the person's
 * name — replacement for the mockup's <image-slot> (a design-tool-only
 * component, not something to port as-is).
 */
export function PortraitSlot({
  src,
  label,
  className,
  grayscaleHover = false,
}: {
  src: string | null;
  label: string;
  className?: string;
  /** Team grid look: photo starts fully desaturated, reveals its real
   *  colors (+ a slight zoom) on hover — reuses ZoomImage's existing
   *  hover mechanics with a full grayscale filter. */
  grayscaleHover?: boolean;
}) {
  return (
    <div
      className={`relative aspect-3/4 border ${className ?? ""}`}
      style={{ background: "var(--nk)", borderColor: "rgba(var(--plr),.16)" }}
    >
      {src ? (
        grayscaleHover ? (
          <ZoomImage src={src} alt={label} fill filter="grayscale(1)" wrapperClassName="absolute inset-0 overflow-hidden" />
        ) : (
          <Image src={src} alt={label} fill className="object-cover" />
        )
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center px-4 text-center font-mono text-xs tracking-[.1em] uppercase"
          style={{ color: "rgba(var(--plr),.4)" }}
        >
          {label}
        </div>
      )}
    </div>
  );
}

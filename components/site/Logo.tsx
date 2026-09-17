import Image from "next/image";

export function Logo({ width = 188 }: { width?: number | string }) {
  return (
    <span
      className="relative block flex-none"
      style={{ width, aspectRatio: "1097 / 524" }}
    >
      <Image
        src="/assets/logo-oba-sombre.png"
        alt="OBA Architectes Firm"
        fill
        priority
        sizes={typeof width === "number" ? `${width}px` : "188px"}
        className="oba-logo-dark absolute inset-0 object-contain"
      />
      <Image
        src="/assets/logo-oba-clair.png"
        alt=""
        aria-hidden="true"
        fill
        sizes={`${width}px`}
        className="oba-logo-light absolute inset-0 object-contain"
      />
    </span>
  );
}

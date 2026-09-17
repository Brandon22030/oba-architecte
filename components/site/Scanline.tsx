export function Scanline() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 200,
        opacity: 0.5,
        background:
          "repeating-linear-gradient(180deg, rgba(var(--plr),.035) 0 1px, transparent 1px 3px)",
      }}
    />
  );
}

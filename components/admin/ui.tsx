import type { ReactNode } from "react";

export const inputClass =
  "w-full rounded border border-[#3a3733]/15 bg-admin-panel px-3.5 py-2.5 text-admin-text outline-none focus:border-admin-accent";
export const labelClass = "font-mono text-xs tracking-[.14em] uppercase text-admin-muted";
export const primaryButtonClass =
  "inline-flex items-center justify-center rounded bg-admin-text px-4 py-2.5 text-sm font-medium text-admin-bg transition-opacity hover:opacity-90 disabled:opacity-50";
export const secondaryButtonClass =
  "inline-flex items-center justify-center rounded border border-[#3a3733]/20 px-4 py-2.5 text-sm font-medium text-admin-text transition-colors hover:bg-[#3a3733]/5 disabled:opacity-50";
export const dangerButtonClass =
  "inline-flex items-center justify-center rounded border border-[#b3261e]/30 px-4 py-2.5 text-sm font-medium text-[#b3261e] transition-colors hover:bg-[#b3261e]/5 disabled:opacity-50";

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-lg bg-admin-panel p-6 ${className ?? ""}`}>{children}</div>;
}

export function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-2 ${className ?? ""}`}>
      <span className={labelClass}>{label}</span>
      {children}
    </label>
  );
}

export function Badge({ tone = "neutral", children }: { tone?: "neutral" | "warn" | "accent"; children: ReactNode }) {
  const colors =
    tone === "warn"
      ? "bg-admin-warn/10 text-admin-warn"
      : tone === "accent"
        ? "bg-admin-accent/10 text-admin-accent"
        : "bg-[#3a3733]/8 text-admin-muted";
  return (
    <span className={`inline-flex items-center rounded px-2.5 py-1 font-mono text-xs tracking-[.08em] uppercase ${colors}`}>
      {children}
    </span>
  );
}

export function KpiTile({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="border-t-2 border-admin-text pt-4">
      <p className="font-display m-0 text-4xl">{value}</p>
      <p className="mt-2 mb-0 text-sm text-admin-muted">{label}</p>
    </div>
  );
}

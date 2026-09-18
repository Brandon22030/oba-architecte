"use client";

import Link from "next/link";
import { Logo } from "./Logo";

const LINKS = [
  { href: "/", label: "Accueil", delay: 0.05 },
  { href: "/a-propos", label: "À propos", delay: 0.12 },
  { href: "/projets", label: "Projets", delay: 0.19 },
  { href: "/territoire", label: "Territoire", delay: 0.26 },
  { href: "/contact", label: "Contact", delay: 0.4 },
];

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-150 grid grid-rows-[auto_1fr_auto] overflow-y-auto"
      style={{ background: "var(--nk)", animation: "obaLineIn .6s cubic-bezier(.18,.8,.24,1) both" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(var(--plr),.06) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--plr),.06) 1px, transparent 1px)",
          backgroundSize: "140px 140px",
          animation: "obaGridPan 9s linear infinite",
        }}
      />

      <div
        className="relative flex items-center justify-between border-b px-10 py-[22px] max-[640px]:px-5"
        style={{ borderColor: "rgba(var(--plr),.12)" }}
      >
        <Logo width="clamp(120px,32vw,164px)" />
        <button
          onClick={onClose}
          aria-label="Fermer le menu"
          className="group flex h-12 w-12 flex-none items-center justify-center rounded-full border"
          style={{ borderColor: "rgba(var(--plr),.3)" }}
        >
          <span aria-hidden="true" className="relative block h-[19px] w-[19px]">
            <i className="absolute top-[9px] left-0 w-[19px] rotate-45 bg-current transition-transform duration-400 ease-[cubic-bezier(.18,.8,.24,1)] group-hover:rotate-[135deg]" style={{ height: 1.5 }} />
            <i className="absolute top-[9px] left-0 w-[19px] -rotate-45 bg-current transition-transform duration-400 ease-[cubic-bezier(.18,.8,.24,1)] group-hover:rotate-[45deg]" style={{ height: 1.5 }} />
          </span>
        </button>
      </div>

      <nav className="relative flex flex-col justify-center gap-[clamp(12px,1.6vw,22px)] px-10 py-10 max-[640px]:px-5">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="font-display leading-none transition-[font-variation-settings,color] duration-500"
            style={{
              fontSize: "clamp(30px,5.2vw,72px)",
              fontVariationSettings: "'wdth' 76,'wght' 500",
              animation: `obaLineIn .8s ${link.delay}s cubic-bezier(.18,.8,.24,1) both`,
            }}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div
        className="relative flex flex-wrap gap-x-10 gap-y-3 border-t px-10 py-6 font-mono text-[14.5px] tracking-[.12em] uppercase max-[640px]:px-5"
        style={{ borderColor: "rgba(var(--plr),.12)", color: "var(--pl)" }}
      >
        <span>Cotonou, Bénin</span>
        <span>Abidjan, Côte d&apos;Ivoire</span>
        <span>Instagram</span>
        <span>LinkedIn</span>
        <span>Facebook</span>
      </div>
    </div>
  );
}

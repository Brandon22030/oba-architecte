"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLiveClock } from "@/hooks/useLiveClock";
import { Logo } from "./Logo";
import { Magnetic } from "./Magnetic";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/projets", label: "Projets" },
  { href: "/territoire", label: "Territoire" },
  { href: "/contact", label: "Contact" },
];

/** Hides on scroll-down, reappears as soon as the user scrolls back up even slightly. */
function useHideOnScroll() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;
        if (y < 80) setHidden(false);
        else if (delta > 4) setHidden(true);
        else if (delta < -4) setHidden(false);
        lastY = y;
        ticking = false;
      });
    }

    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return hidden;
}

export function Header({ onOpenMenu }: { onOpenMenu: () => void }) {
  const time = useLiveClock();
  const hidden = useHideOnScroll();

  return (
    <header
      className="sticky top-0 z-100 border-b backdrop-blur-[14px] transition-transform duration-300 ease-out"
      style={{
        background: "rgba(var(--nkr),.72)",
        borderColor: "rgba(var(--plr),.1)",
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
      }}
    >
      <div className="mx-auto flex max-w-[1760px] items-center justify-between gap-7 px-10 py-[22px] max-[640px]:px-5 max-[640px]:py-[13px] max-[860px]:py-4">
        <Link href="/" className="flex items-center gap-3.5">
          <Logo width="clamp(126px,30vw,188px)" />
        </Link>

        <nav className="hidden items-center gap-[clamp(16px,2.2vw,34px)] font-mono text-[14.5px] tracking-[.16em] uppercase min-[1101px]:flex">
          {NAV_LINKS.map((link) => (
            <Magnetic key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </Magnetic>
          ))}
          <span className="tabular-nums" style={{ color: "var(--pl)" }}>
            {time}
          </span>
        </nav>

        <div className="flex items-center gap-4.5">
          <ThemeToggle />
          <button
            onClick={onOpenMenu}
            aria-label="Ouvrir le menu"
            className="flex h-[46px] w-[46px] flex-none items-center justify-center rounded-full border min-[1101px]:hidden"
            style={{ borderColor: "rgba(var(--plr),.3)" }}
          >
            <span aria-hidden="true" className="flex w-[19px] flex-col gap-[4.5px]">
              <i className="block h-[1.5px] bg-current" />
              <i className="block h-[1.5px] w-[13px] bg-current" />
              <i className="block h-[1.5px] bg-current" />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

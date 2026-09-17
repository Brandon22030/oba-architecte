"use client";

import { useState, type ReactNode } from "react";
import { useParallax } from "@/hooks/useParallax";
import { CursorDot } from "./CursorDot";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { MobileMenu } from "./MobileMenu";
import { Scanline } from "./Scanline";

export function SiteChrome({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  useParallax();

  return (
    <>
      <CursorDot />
      <Scanline />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <Header onOpenMenu={() => setMenuOpen(true)} />
      <main>{children}</main>
      <Footer />
    </>
  );
}

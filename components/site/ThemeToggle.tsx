"use client";

import { useTheme } from "@/hooks/useTheme";
import { Magnetic } from "./Magnetic";

export function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <Magnetic>
      <button
        onClick={toggleTheme}
        aria-label="Basculer clair / sombre"
        className="relative flex h-11 w-13 flex-none items-center justify-center"
      >
        <span
          aria-hidden="true"
          className="relative block h-[25px] w-[46px] rounded-full border transition-colors"
          style={{ borderColor: "rgba(var(--plr),.34)" }}
        >
          <b className="oba-tgl-knob absolute top-[3px] left-[3px] block h-[17px] w-[17px] rounded-full bg-[#EF8B12]" />
        </span>
      </button>
    </Magnetic>
  );
}

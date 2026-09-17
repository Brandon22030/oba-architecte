"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";

/**
 * Full-screen splash intro, ported from the reference's [data-ii="voile"]
 * overlay: header row (logo + "Entrer" skip), centered title block, footer
 * row (tagline + "Entrée dans le site" progress bar). Session-gated and
 * reduced-motion aware.
 *
 * Sequence: the logo first fades in large and centered, pauses, then travels
 * (translate + scale, computed live from its real header-row position) to
 * its resting spot top-left — only once it settles there does the rest of
 * the overlay (skip button, label, headline, rule, footer) fade in. Total
 * auto-dismiss after TOTAL_DURATION — the skip button or Escape end it early.
 *
 * Mount once on the homepage only; visibility is driven purely by the
 * "oba-intro-running" class on <html> (see app/globals.css) so the overlay
 * never flashes over already-seen sessions on a fresh SSR load — the class
 * is added synchronously in <head>, before hydration, by introInitScript.
 */

const SESSION_KEY = "oba-intro-v5";
const EXIT_DURATION = 750;

const LOGO = {
  fade: 550,
  pause: 650,
  travel: 750,
  initialWidth: 300,
  easing: "cubic-bezier(.45,0,.2,1)",
};
const SETTLED = LOGO.fade + LOGO.pause + LOGO.travel;

// Content stagger (ms from mount) — everything below waits for the logo to settle.
const DELAY = {
  skip: SETTLED,
  label: SETTLED + 120,
  lead: SETTLED + 260,
  title: SETTLED + 420,
  rule: SETTLED + 680,
  footer: SETTLED + 520,
};
const TOTAL_DURATION = DELAY.rule + 5500;

export const introInitScript = `(function(){try{if(location.pathname!=="/")return;if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;if(sessionStorage.getItem("${SESSION_KEY}")==="1")return;document.documentElement.classList.add("oba-intro-running")}catch(e){}})();`;

export function IntroController() {
  const [leaving, setLeaving] = useState(false);
  const dismissedRef = useRef(false);
  const logoRef = useRef<HTMLSpanElement>(null);
  const logoAnimationRef = useRef<Animation | null>(null);

  const dismiss = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    logoAnimationRef.current?.cancel();
    setLeaving(true);
    window.setTimeout(() => {
      document.documentElement.classList.remove("oba-intro-running");
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {}
    }, EXIT_DURATION);
  }, []);

  useEffect(() => {
    if (!document.documentElement.classList.contains("oba-intro-running")) return;

    const logo = logoRef.current;
    if (logo?.animate) {
      const bounds = logo.getBoundingClientRect();
      const width = Math.min(LOGO.initialWidth, innerWidth * 0.6, innerHeight * 0.55 * (bounds.width / bounds.height));
      const scale = width / bounds.width;
      const x = (innerWidth - width) / 2 - bounds.left;
      const y = (innerHeight - bounds.height * scale) / 2 - bounds.top;
      const centered = `translate(${x}px, ${y}px) scale(${scale})`;

      logoAnimationRef.current = logo.animate(
        [
          { opacity: 0, transform: centered, offset: 0, easing: "ease-out" },
          { opacity: 1, transform: centered, offset: LOGO.fade / SETTLED },
          { opacity: 1, transform: centered, offset: (LOGO.fade + LOGO.pause) / SETTLED, easing: LOGO.easing },
          { opacity: 1, transform: "translate(0px, 0px) scale(1)", offset: 1 },
        ],
        { duration: SETTLED, fill: "both" },
      );
    } else if (logo) {
      logo.style.opacity = "1";
      logo.style.transform = "none";
    }

    const timer = window.setTimeout(dismiss, TOTAL_DURATION);
    const onResize = () => dismiss();
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => {
      if (motion.matches) dismiss();
    };

    addEventListener("resize", onResize, { passive: true });
    addEventListener("keydown", onKeydown);
    motion.addEventListener("change", onMotionChange);

    return () => {
      clearTimeout(timer);
      removeEventListener("resize", onResize);
      removeEventListener("keydown", onKeydown);
      motion.removeEventListener("change", onMotionChange);
      // Cancel and drop the logo animation on every teardown (not just dismiss()) —
      // otherwise React StrictMode's dev-only mount→cleanup→mount double-invoke
      // leaves the first Animation active, so the second mount's
      // getBoundingClientRect() reads the already-transformed (centered) box
      // instead of the natural resting one, collapsing the travel into a no-op.
      logoAnimationRef.current?.cancel();
      logoAnimationRef.current = null;
    };
  }, [dismiss]);

  return (
    <div
      className="oba-intro-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 400,
        gridTemplateRows: "auto 1fr auto",
        overflow: "hidden",
        background: "var(--nk)",
        transition: "opacity .75s ease, transform .75s cubic-bezier(.62,.02,.3,1), filter .75s ease",
        opacity: leaving ? 0 : 1,
        transform: leaving ? "scale(1.05)" : "scale(1)",
        filter: leaving ? "blur(7px)" : "none",
        pointerEvents: leaving ? "none" : "auto",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 left-0 h-px"
        style={{ background: "rgba(var(--plr),.14)" }}
      />

      <div className="relative flex items-center justify-between gap-7 px-10 py-[22px] max-[640px]:px-5">
        <span
          ref={logoRef}
          data-intro-logo
          className="relative block flex-none"
          style={{ width: "clamp(128px,12vw,188px)", transformOrigin: "top left", willChange: "transform, opacity" }}
        >
          <Logo width="100%" />
        </span>

        <button
          type="button"
          onClick={dismiss}
          className="flex items-center gap-3 rounded-full border border-[rgba(var(--plr),.28)] px-5 py-3 font-mono text-[13.5px] tracking-[.18em] uppercase hover:border-[var(--ac)] hover:text-[var(--ac)]"
          style={{ color: "var(--pl)", animation: `obaLineIn .8s ${DELAY.skip}ms cubic-bezier(.18,.8,.24,1) both` }}
        >
          Entrer
          <span aria-hidden="true" className="block h-[1.5px] w-4 bg-current" />
        </button>
      </div>

      <div className="relative flex flex-col justify-center gap-[clamp(14px,2vw,26px)] px-10 max-[640px]:px-5">
        <p
          className="m-0 font-mono uppercase"
          style={{
            fontSize: "clamp(11.5px,1vw,14px)",
            letterSpacing: ".24em",
            opacity: 0.74,
            animation: `obaLineIn .8s ${DELAY.label}ms cubic-bezier(.18,.8,.24,1) both`,
          }}
        >
          Architecture · Conception · Espaces
        </p>
        <p
          className="font-display m-0"
          style={{
            fontSize: "clamp(26px,3.4vw,52px)",
            lineHeight: 1.08,
            fontVariationSettings: "'wdth' 108,'wght' 300",
            opacity: 0.88,
            animation: `obaLineIn .8s ${DELAY.lead}ms cubic-bezier(.18,.8,.24,1) both`,
          }}
        >
          Bonjour, nous sommes
        </p>
        <p
          className="font-display m-0"
          style={{
            fontSize: "clamp(42px,8.8vw,144px)",
            lineHeight: 0.94,
            letterSpacing: "-.02em",
            fontVariationSettings: "'wdth' 100,'wght' 700",
            animation: `obaLineIn .9s ${DELAY.title}ms cubic-bezier(.18,.8,.24,1) both`,
          }}
        >
          OBA ARCHITECTES
          <br />
          FIRM
        </p>
        <span
          aria-hidden="true"
          className="block h-0.5"
          style={{
            width: "clamp(96px,14vw,220px)",
            background: "var(--ac)",
            animation: `obaLineIn .8s ${DELAY.rule}ms cubic-bezier(.18,.8,.24,1) both`,
          }}
        />
      </div>

      <div
        className="relative flex items-end justify-between gap-8 px-10 pb-[38px] max-[640px]:px-5"
        style={{ animation: `obaLineIn .8s ${DELAY.footer}ms cubic-bezier(.18,.8,.24,1) both` }}
      >
        <p className="m-0 font-mono" style={{ fontSize: "clamp(13px,1.05vw,15.5px)", lineHeight: 1.75, opacity: 0.78 }}>
          Penser l&apos;espace.
          <br />
          Donner forme à l&apos;essentiel.
        </p>
        <div className="flex flex-col items-end gap-3" style={{ minWidth: "min(260px,52vw)" }}>
          <span
            className="font-mono uppercase"
            style={{ fontSize: 13, letterSpacing: ".18em", opacity: 0.68 }}
          >
            Entrée dans le site
          </span>
          <span aria-hidden="true" className="relative block h-[1.5px] w-full" style={{ background: "rgba(var(--plr),.2)" }}>
            <b
              className="absolute inset-0 block origin-left"
              style={{
                background: "var(--ac)",
                animation: `obaBarre ${TOTAL_DURATION - DELAY.footer}ms linear ${DELAY.footer}ms forwards`,
              }}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

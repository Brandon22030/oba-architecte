"use client";

import { useRef } from "react";
import type { Project } from "@/lib/data/project-constants";
import { DragScrollRow } from "./DragScrollRow";
import { ProjectCard } from "./ProjectCard";

/**
 * Header row (label, heading, hint) + horizontal drag-scroll strip of
 * featured projects, with a pair of round arrow buttons for anyone who
 * can't drag-scroll with a mouse.
 */
export function ProjectsScrollStrip({ featured }: { featured: Project[] }) {
  const rowRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const el = rowRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.9, 640) * direction;
    el.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <>
      <div className="mx-auto flex max-w-[1760px] flex-wrap items-end justify-between gap-6 px-10 max-[640px]:px-5">
        <div>
          <p className="m-0 mb-4 font-mono text-[14.5px] tracking-[.24em] uppercase" style={{ color: "var(--ac)" }}>
            01 — Projets
          </p>
          <h2 className="font-display m-0" style={{ fontSize: "clamp(38px,6.4vw,104px)", lineHeight: 0.96, fontVariationSettings: "'wdth' 88,'wght' 600" }}>
            Réalisations
          </h2>
        </div>
        <div className="flex items-center gap-6">
          <p className="m-0 font-mono text-[14.5px] tracking-[.14em] uppercase max-[640px]:hidden" style={{ color: "var(--pl)" }}>
            Faites défiler horizontalement →
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Projets précédents"
              className="flex h-11 w-11 flex-none items-center justify-center rounded-full border transition-colors hover:border-[var(--ac)] hover:text-[var(--ac)]"
              style={{ borderColor: "rgba(var(--plr),.3)" }}
            >
              <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M9 2 4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Projets suivants"
              className="flex h-11 w-11 flex-none items-center justify-center rounded-full border transition-colors hover:border-[var(--ac)] hover:text-[var(--ac)]"
              style={{ borderColor: "rgba(var(--plr),.3)" }}
            >
              <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <DragScrollRow ref={rowRef} className="mt-11 px-10 max-[640px]:px-5">
        {featured.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            badge={project.category}
            className="w-[min(640px,72vw)] flex-none [scroll-snap-align:center]"
          />
        ))}
      </DragScrollRow>
    </>
  );
}

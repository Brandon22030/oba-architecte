"use client";

import { useMemo, useState } from "react";
import { ProjectGridCard } from "@/components/site/ProjectCard";
import { CATEGORIES, type Project } from "@/lib/data/project-constants";

export function ProjetsClient({ projects }: { projects: Project[] }) {
  const [filtre, setFiltre] = useState<(typeof CATEGORIES)[number]>("Tout");

  const visibles = useMemo(
    () => (filtre === "Tout" ? projects : projects.filter((p) => p.category === filtre)),
    [projects, filtre],
  );

  return (
    <>
      <section className="mx-auto max-w-[1760px] px-10 pb-[clamp(30px,4vw,44px)] max-[640px]:px-5 max-[1400px]:px-8">
        <div className="flex flex-wrap gap-2.5">
          {CATEGORIES.map((cat) => {
            const active = cat === filtre;
            return (
              <button
                key={cat}
                onClick={() => setFiltre(cat)}
                className="inline-flex items-center rounded-full border px-5 py-2.75 font-mono text-[14.5px] tracking-[.14em] uppercase transition-colors hover:border-[var(--ac)] hover:text-[var(--ac)]"
                style={{
                  borderColor: active ? "var(--ac)" : "rgba(var(--plr),.28)",
                  color: active ? "var(--ac)" : "var(--pl)",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1760px] px-10 pb-[clamp(90px,12vw,150px)] max-[640px]:px-5 max-[1400px]:px-8">
        <div className="grid gap-[clamp(20px,2.4vw,36px)]" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))" }}>
          {visibles.map((project, i) => (
            <ProjectGridCard key={project.slug} project={project} number={String(i + 1).padStart(2, "0")} />
          ))}
        </div>
      </section>
    </>
  );
}

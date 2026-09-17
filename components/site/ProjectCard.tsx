import Link from "next/link";
import type { ReactNode } from "react";
import type { Project } from "@/lib/data/project-constants";
import { ZoomImage } from "./ZoomImage";

const PLACEHOLDER = (
  <div
    className="absolute inset-0 flex items-center justify-center font-mono text-xs uppercase tracking-[.14em]"
    style={{ color: "rgba(var(--plr),.5)" }}
  >
    Image à venir
  </div>
);

/** Featured card used in the homepage horizontal strip. */
export function ProjectCard({
  project,
  badge,
  filter = "saturate(.7) contrast(1.05)",
  className,
}: {
  project: Project;
  badge: ReactNode;
  filter?: string;
  className?: string;
}) {
  const cover = project.coverImageUrl;

  return (
    <article className={className}>
      <Link href={`/projets/${project.slug}`} className="block">
        <div className="relative aspect-4/3" style={{ background: "var(--nk)" }}>
          {cover ? (
            <ZoomImage src={cover} alt={project.title} fill filter={filter} wrapperClassName="absolute inset-0 overflow-hidden" />
          ) : (
            PLACEHOLDER
          )}
          <span
            className="absolute top-4.5 left-4.5 px-3 py-1.75 font-mono text-sm tracking-[.16em] uppercase"
            style={{ background: "#EF8B12", color: "#100F0C" }}
          >
            {badge}
          </span>
        </div>
        <div className="mt-4.5 flex items-baseline justify-between gap-5">
          <h3
            className="font-display m-0"
            style={{ fontSize: "clamp(22px,2.2vw,34px)", fontVariationSettings: "'wdth' 80,'wght' 500" }}
          >
            {project.title}
          </h3>
          <span className="font-mono text-[14.5px]" style={{ color: "var(--pl)" }}>
            {project.city}
          </span>
        </div>
      </Link>
    </article>
  );
}

/** Grid card used on the Projets index. */
export function ProjectGridCard({
  project,
  number,
  filter = "grayscale(.6) contrast(1.08)",
}: {
  project: Project;
  number: string;
  filter?: string;
}) {
  const cover = project.coverImageUrl;

  return (
    <article className="relative">
      <Link href={`/projets/${project.slug}`} className="block">
        <div className="relative aspect-4/3 border" style={{ background: "var(--nk3)", borderColor: "rgba(var(--plr),.12)" }}>
          {cover ? (
            <ZoomImage src={cover} alt={project.title} fill filter={filter} wrapperClassName="absolute inset-0 overflow-hidden" />
          ) : (
            PLACEHOLDER
          )}
          <span
            className="absolute top-0 left-0 px-3 py-2 font-mono text-sm tracking-[.14em] uppercase"
            style={{ background: "#EF8B12", color: "#100F0C" }}
          >
            {number}
          </span>
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <h2
            className="font-display m-0"
            style={{ fontSize: "clamp(20px,1.8vw,28px)", lineHeight: 1.1, fontVariationSettings: "'wdth' 80,'wght' 500" }}
          >
            {project.title}
          </h2>
          <span className="flex-none font-mono text-sm tracking-[.12em] uppercase" style={{ color: "var(--ac)" }}>
            {project.category}
          </span>
        </div>
        <p className="mt-1.5 mb-0 font-mono text-[14.5px]" style={{ color: "var(--pl)" }}>
          {project.city}
        </p>
      </Link>
    </article>
  );
}

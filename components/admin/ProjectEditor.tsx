"use client";

import Link from "next/link";
import { useState } from "react";
import { deleteProject, togglePublish } from "@/app/admin/(dashboard)/projets/actions";
import type { Project, ProjectImage } from "@/lib/data/project-constants";
import { CartoucheForm } from "./CartoucheForm";
import { DeleteButton } from "./DeleteButton";
import { GalerieManager } from "./GalerieManager";
import { primaryButtonClass, secondaryButtonClass } from "./ui";

type Tab = "cartouche" | "galerie";

export function ProjectEditor({
  project,
  images,
  villes,
}: {
  project: Project;
  images: ProjectImage[];
  villes: { id: string; nom: string }[];
}) {
  const [tab, setTab] = useState<Tab>("cartouche");

  return (
    <div className="flex flex-col gap-7">
      <Link href="/admin/projets" className="text-sm text-admin-muted hover:text-admin-text">
        ← Tous les projets
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display m-0 text-3xl">{project.title}</h1>
        <div className="flex flex-wrap gap-3">
          {project.publie && (
            <a href={`/projets/${project.slug}`} target="_blank" rel="noreferrer" className={secondaryButtonClass}>
              Voir la fiche publique
            </a>
          )}
          <form action={togglePublish.bind(null, project.id, !project.publie)}>
            <button type="submit" className={primaryButtonClass}>
              {project.publie ? "Dépublier" : "Publier"}
            </button>
          </form>
        </div>
      </div>

      <div className="flex gap-2 border-b border-[#3a3733]/12">
        {(["cartouche", "galerie"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="border-b-2 px-1 pb-3 text-sm font-medium capitalize"
            style={{ borderColor: tab === t ? "#3A3733" : "transparent", color: tab === t ? "#3A3733" : "#655B4E" }}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "cartouche" ? (
        <CartoucheForm project={project} villes={villes} />
      ) : (
        <GalerieManager project={project} images={images} />
      )}

      <div className="mt-6 border-t border-[#3a3733]/10 pt-6">
        <DeleteButton
          action={deleteProject.bind(null, project.id)}
          confirmText={`Supprimer définitivement « ${project.title} » ainsi que toutes ses images ?`}
          label="Supprimer ce projet"
          className="rounded border border-[#b3261e]/30 px-4 py-2.5 text-sm font-medium text-[#b3261e] hover:bg-[#b3261e]/5"
        />
      </div>
    </div>
  );
}

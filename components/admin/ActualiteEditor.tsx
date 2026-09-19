"use client";

import Link from "next/link";
import { useState } from "react";
import { deleteActualite, togglePublish } from "@/app/admin/(dashboard)/actualites/actions";
import type { Actualite, ActualiteImage } from "@/lib/data/actualite-constants";
import { ActualiteCartoucheForm } from "./ActualiteCartoucheForm";
import { ActualiteGalerieManager } from "./ActualiteGalerieManager";
import { DeleteButton } from "./DeleteButton";
import { primaryButtonClass, secondaryButtonClass } from "./ui";

type Tab = "cartouche" | "galerie";

export function ActualiteEditor({ actualite, images }: { actualite: Actualite; images: ActualiteImage[] }) {
  const [tab, setTab] = useState<Tab>("cartouche");

  return (
    <div className="flex flex-col gap-7">
      <Link href="/admin/actualites" className="text-sm text-admin-muted hover:text-admin-text">
        ← Toutes les actualités
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display m-0 text-3xl">{actualite.titre}</h1>
        <div className="flex flex-wrap gap-3">
          {actualite.publie && (
            <a href={`/actualite/${actualite.slug}`} target="_blank" rel="noreferrer" className={secondaryButtonClass}>
              Voir la fiche publique
            </a>
          )}
          <form action={togglePublish.bind(null, actualite.id, !actualite.publie)}>
            <button type="submit" className={primaryButtonClass}>
              {actualite.publie ? "Dépublier" : "Publier"}
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
        <ActualiteCartoucheForm actualite={actualite} />
      ) : (
        <ActualiteGalerieManager actualite={actualite} images={images} />
      )}

      <div className="mt-6 border-t border-[#3a3733]/10 pt-6">
        <DeleteButton
          action={deleteActualite.bind(null, actualite.id)}
          confirmText={`Supprimer définitivement « ${actualite.titre} » ainsi que toutes ses images ?`}
          label="Supprimer cette actualité"
          className="rounded border border-[#b3261e]/30 px-4 py-2.5 text-sm font-medium text-[#b3261e] hover:bg-[#b3261e]/5"
        />
      </div>
    </div>
  );
}

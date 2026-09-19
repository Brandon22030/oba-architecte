"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/admin/ui";
import { formatDateActualite, type Actualite } from "@/lib/data/actualite-constants";

export function ActualitesAdminClient({ actualites }: { actualites: Actualite[] }) {
  const [q, setQ] = useState("");
  const [categorie, setCategorie] = useState("Toutes les catégories");
  const [statut, setStatut] = useState("Tous les statuts");

  const filtered = actualites.filter((a) => {
    const matchesQ = !q.trim() || a.titre.toLowerCase().includes(q.toLowerCase());
    const matchesCategorie = categorie === "Toutes les catégories" || a.categorie === categorie;
    const matchesStatut = statut === "Tous les statuts" || (statut === "Publié" ? a.publie : !a.publie);
    return matchesQ && matchesCategorie && matchesStatut;
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher une actualité"
          className="min-w-[280px] flex-1 rounded border border-[#3a3733]/15 bg-admin-panel px-3.5 py-2.5 text-admin-text outline-none focus:border-admin-accent"
        />
        <select
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
          className="rounded border border-[#3a3733]/15 bg-admin-panel px-3.5 py-2.5 text-admin-text outline-none"
        >
          <option>Toutes les catégories</option>
          <option>Presse</option>
          <option>News</option>
        </select>
        <select
          value={statut}
          onChange={(e) => setStatut(e.target.value)}
          className="rounded border border-[#3a3733]/15 bg-admin-panel px-3.5 py-2.5 text-admin-text outline-none"
        >
          <option>Tous les statuts</option>
          <option>Publié</option>
          <option>Brouillon</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg bg-admin-panel">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[#3a3733]/10 text-xs tracking-[.1em] text-admin-muted uppercase">
              <th className="px-5 py-3.5 font-medium">Titre</th>
              <th className="px-5 py-3.5 font-medium">Catégorie</th>
              <th className="px-5 py-3.5 font-medium">Date</th>
              <th className="px-5 py-3.5 font-medium">État</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} className="border-b border-[#3a3733]/8 last:border-0 hover:bg-[#3a3733]/4">
                <td className="px-5 py-3.5">
                  <Link href={`/admin/actualites/${a.id}`} className="font-medium hover:underline">
                    {a.titre}
                  </Link>
                </td>
                <td className="px-5 py-3.5 text-admin-muted">{a.categorie}</td>
                <td className="px-5 py-3.5 text-admin-muted">{formatDateActualite(a.datePublication)}</td>
                <td className="px-5 py-3.5">
                  <Badge tone={a.publie ? "accent" : "warn"}>{a.publie ? "Publié" : "Brouillon"}</Badge>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-admin-muted">
                  Aucune actualité ne correspond à ces filtres.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge } from "@/components/admin/ui";
import type { Project } from "@/lib/data/project-constants";

export function ProjetsAdminClient({ projects }: { projects: Project[] }) {
  const [q, setQ] = useState("");
  const [famille, setFamille] = useState("Toutes les familles");
  const [statut, setStatut] = useState("Tous les statuts");

  const familles = useMemo(() => ["Toutes les familles", ...Array.from(new Set(projects.map((p) => p.famille)))], [projects]);

  const filtered = projects.filter((p) => {
    const matchesQ =
      !q.trim() ||
      p.title.toLowerCase().includes(q.toLowerCase()) ||
      p.city.toLowerCase().includes(q.toLowerCase());
    const matchesFamille = famille === "Toutes les familles" || p.famille === famille;
    const matchesStatut =
      statut === "Tous les statuts" || (statut === "Publié" ? p.publie : !p.publie);
    return matchesQ && matchesFamille && matchesStatut;
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher un projet, une ville, un maître d'ouvrage"
          className="min-w-[280px] flex-1 rounded border border-[#3a3733]/15 bg-admin-panel px-3.5 py-2.5 text-admin-text outline-none focus:border-admin-accent"
        />
        <select
          value={famille}
          onChange={(e) => setFamille(e.target.value)}
          className="rounded border border-[#3a3733]/15 bg-admin-panel px-3.5 py-2.5 text-admin-text outline-none"
        >
          {familles.map((f) => (
            <option key={f}>{f}</option>
          ))}
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
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[#3a3733]/10 text-xs tracking-[.1em] text-admin-muted uppercase">
              <th className="px-5 py-3.5 font-medium">Projet</th>
              <th className="px-5 py-3.5 font-medium">Famille</th>
              <th className="px-5 py-3.5 font-medium">Ville</th>
              <th className="px-5 py-3.5 font-medium">Image</th>
              <th className="px-5 py-3.5 font-medium">État</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-[#3a3733]/8 last:border-0 hover:bg-[#3a3733]/4">
                <td className="px-5 py-3.5">
                  <Link href={`/admin/projets/${p.id}`} className="font-medium hover:underline">
                    {p.title}
                  </Link>
                </td>
                <td className="px-5 py-3.5 text-admin-muted">{p.famille}</td>
                <td className="px-5 py-3.5 text-admin-muted">{p.city || "—"}</td>
                <td className="px-5 py-3.5 text-admin-muted">{p.coverImageUrl ? "Oui" : "Aucune"}</td>
                <td className="px-5 py-3.5">
                  <Badge tone={p.publie ? "accent" : "warn"}>{p.publie ? "Publié" : "Brouillon"}</Badge>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-admin-muted">
                  Aucun projet ne correspond à ces filtres.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

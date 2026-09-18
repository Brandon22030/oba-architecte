import { VilleCard } from "@/components/admin/VilleCard";
import { inputClass, primaryButtonClass } from "@/components/admin/ui";
import { getAllProjectsForAdmin } from "@/lib/data/projects";
import { getVillesForAdmin } from "@/lib/data/villes";
import { createVille } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminVillesPage() {
  const [villes, projects] = await Promise.all([getVillesForAdmin(), getAllProjectsForAdmin()]);
  const villeNameById = new Map(villes.map((v) => [v.id, v.nom]));

  return (
    <div className="flex flex-col gap-7">
      <h1 className="font-display m-0 text-3xl">
        {villes.length} ville{villes.length > 1 ? "s" : ""} rattachée{villes.length > 1 ? "s" : ""} à la carte
      </h1>

      <form action={createVille} className="flex flex-wrap items-end gap-3 rounded-lg bg-admin-panel p-5">
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-xs tracking-[.1em] uppercase text-admin-muted">Nom de la ville</span>
          <input name="nom" required className={inputClass} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-xs tracking-[.1em] uppercase text-admin-muted">Latitude</span>
          <input name="lat" type="text" inputMode="decimal" placeholder="ex. 6.365" required className={inputClass} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-xs tracking-[.1em] uppercase text-admin-muted">Longitude</span>
          <input name="lon" type="text" inputMode="decimal" placeholder="ex. 2.419" required className={inputClass} />
        </label>
        <button type="submit" className={primaryButtonClass}>
          Ajouter une ville
        </button>
      </form>

      <div className="grid grid-cols-3 gap-5 max-[640px]:grid-cols-1 max-[1100px]:grid-cols-2">
        {villes.map((ville) => (
          <VilleCard
            key={ville.id}
            ville={ville}
            otherProjects={projects
              .filter((p) => p.villeId !== ville.id)
              .map((p) => ({
                id: p.id,
                title: p.title,
                currentVille: p.villeId ? (villeNameById.get(p.villeId) ?? null) : null,
              }))}
          />
        ))}
      </div>
    </div>
  );
}

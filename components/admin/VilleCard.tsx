import Link from "next/link";
import { attachProjectToVille, createProject, detachProjectFromVille } from "@/app/admin/(dashboard)/projets/actions";
import { deleteVille, updateVille } from "@/app/admin/(dashboard)/villes/actions";
import type { VilleAdmin } from "@/lib/data/villes";
import { DeleteButton } from "./DeleteButton";
import { Badge, inputClass, primaryButtonClass, secondaryButtonClass } from "./ui";

type OtherProject = { id: string; title: string; currentVille: string | null };

export function VilleCard({ ville, otherProjects }: { ville: VilleAdmin; otherProjects: OtherProject[] }) {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-admin-panel p-5">
      <form action={updateVille.bind(null, ville.id)} className="grid grid-cols-3 gap-3">
        <label className="col-span-3 flex flex-col gap-1.5 max-[640px]:col-span-1">
          <span className="font-mono text-xs tracking-[.1em] uppercase text-admin-muted">Nom</span>
          <input name="nom" defaultValue={ville.nom} required className={`${inputClass} py-1.5 text-sm`} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-xs tracking-[.1em] uppercase text-admin-muted">Latitude</span>
          <input name="lat" type="text" inputMode="decimal" defaultValue={ville.lat} required className={`${inputClass} py-1.5 text-sm`} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-xs tracking-[.1em] uppercase text-admin-muted">Longitude</span>
          <input name="lon" type="text" inputMode="decimal" defaultValue={ville.lon} required className={`${inputClass} py-1.5 text-sm`} />
        </label>
        <div className="flex items-end">
          <button type="submit" className={`${secondaryButtonClass} w-full py-1.5 text-xs`}>
            Enregistrer
          </button>
        </div>
      </form>

      <div>
        <p className="m-0 mb-2 font-mono text-xs tracking-[.1em] uppercase text-admin-muted">
          {ville.projets.length} projet{ville.projets.length > 1 ? "s" : ""} rattaché{ville.projets.length > 1 ? "s" : ""}
        </p>
        {ville.projets.length > 0 && (
          <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
            {ville.projets.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-3">
                <Link href={`/admin/projets/${p.id}`} className="min-w-0 flex-1 truncate text-sm text-admin-text hover:underline">
                  {p.title}
                </Link>
                {!p.publie && <Badge>Brouillon</Badge>}
                <form action={detachProjectFromVille.bind(null, p.id)}>
                  <button
                    type="submit"
                    title="Détacher de cette ville"
                    className="shrink-0 text-xs text-admin-muted hover:text-[#b3261e]"
                  >
                    Détacher
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>

      {otherProjects.length > 0 && (
        <form action={attachProjectToVille.bind(null, ville.id)} className="flex items-center gap-2">
          <select name="project_id" defaultValue="" required className={`${inputClass} py-1.5 text-sm`}>
            <option value="" disabled>
              Rattacher un projet existant…
            </option>
            {otherProjects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
                {p.currentVille ? ` (actuellement à ${p.currentVille})` : ""}
              </option>
            ))}
          </select>
          <button type="submit" className={`${secondaryButtonClass} shrink-0 py-1.5 text-xs`}>
            Rattacher
          </button>
        </form>
      )}

      <div className="flex flex-wrap gap-2 border-t border-[#3a3733]/10 pt-4">
        <form action={createProject}>
          <input type="hidden" name="ville_id" value={ville.id} />
          <button type="submit" className={`${primaryButtonClass} px-3 py-1.5 text-xs`}>
            + Nouveau projet
          </button>
        </form>
        <DeleteButton
          action={deleteVille.bind(null, ville.id)}
          confirmText={
            ville.projets.length > 0
              ? `Supprimer ${ville.nom} ? Ses ${ville.projets.length} projet(s) resteront mais ne seront plus rattachés à une ville.`
              : `Supprimer ${ville.nom} ?`
          }
          label="Supprimer"
          className="rounded border border-[#b3261e]/30 px-3 py-1.5 text-xs text-[#b3261e] hover:bg-[#b3261e]/5"
        />
      </div>
    </div>
  );
}

import { updateProjectCartouche } from "@/app/admin/(dashboard)/projets/actions";
import type { Project } from "@/lib/data/project-constants";
import { Field, inputClass, primaryButtonClass } from "./ui";

const STATUTS = ["Étude", "Concours lauréat", "En chantier", "Livré"] as const;
const CATEGORIES_ADMIN = ["Culture", "Urbanisme", "Hôtellerie", "Loisirs", "Industrie", "Institution", "Tertiaire", "Réseaux", "Résidentiel"];
const FEATURED_POSITIONS = [1, 2, 3, 4, 5, 6];

export function CartoucheForm({ project, villes }: { project: Project; villes: { id: string; nom: string }[] }) {
  const action = updateProjectCartouche.bind(null, project.id);

  return (
    <form action={action} className="grid grid-cols-2 gap-6 max-[860px]:grid-cols-1">
      <Field label="Titre du projet">
        <input name="title" defaultValue={project.title} required className={inputClass} />
      </Field>
      <Field label="Identifiant d'URL (slug)">
        <input name="slug" defaultValue={project.slug} required className={inputClass} />
      </Field>

      <Field label="Description" className="col-span-2">
        <textarea name="description" defaultValue={project.description ?? ""} rows={4} className={inputClass} />
      </Field>

      <Field label="Maître d'ouvrage">
        <input name="maitre_ouvrage" defaultValue={project.maitreOuvrage ?? ""} className={inputClass} />
      </Field>
      <Field label="Mission">
        <input name="mission" defaultValue={project.mission ?? ""} className={inputClass} />
      </Field>

      <Field label="Étendue de la mission" className="col-span-2">
        <textarea name="mission_scope" defaultValue={project.missionScope ?? ""} rows={3} className={inputClass} />
      </Field>

      <Field label="Catégorie (filtre public)">
        <select name="category" defaultValue={project.category} className={inputClass}>
          {CATEGORIES_ADMIN.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </Field>
      <Field label="Famille (regroupement admin)">
        <input name="famille" defaultValue={project.famille} required className={inputClass} />
      </Field>

      <Field label="Statut">
        <select name="statut" defaultValue={project.statut} className={inputClass}>
          {STATUTS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </Field>
      <Field label="Mis en avant sur l'accueil">
        <select name="featured_home_position" defaultValue={project.featuredHomePosition ?? ""} className={inputClass}>
          <option value="">Non</option>
          {FEATURED_POSITIONS.map((p) => (
            <option key={p} value={p}>
              Oui, position {p}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Ville rattachée à la carte">
        <select name="ville_id" defaultValue={project.villeId ?? ""} className={inputClass}>
          <option value="">Aucune</option>
          {villes.map((v) => (
            <option key={v.id} value={v.id}>
              {v.nom}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Libellé de ville affiché (si réseau multi-villes)">
        <input name="city_label" defaultValue={project.city} placeholder="ex. Dix villes" className={inputClass} />
      </Field>

      <div className="col-span-2">
        <button type="submit" className={primaryButtonClass}>
          Enregistrer les modifications
        </button>
      </div>
    </form>
  );
}

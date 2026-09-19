import { updateActualiteCartouche } from "@/app/admin/(dashboard)/actualites/actions";
import { corpsToText, type Actualite } from "@/lib/data/actualite-constants";
import { Field, inputClass, primaryButtonClass } from "./ui";

const CATEGORIES = ["Presse", "News"];

export function ActualiteCartoucheForm({ actualite }: { actualite: Actualite }) {
  const action = updateActualiteCartouche.bind(null, actualite.id);

  return (
    <form action={action} className="grid grid-cols-2 gap-6 max-[860px]:grid-cols-1">
      <Field label="Titre">
        <input name="titre" defaultValue={actualite.titre} required className={inputClass} />
      </Field>
      <Field label="Identifiant d'URL (slug)">
        <input name="slug" defaultValue={actualite.slug} required className={inputClass} />
      </Field>

      <Field label="Catégorie">
        <select name="categorie" defaultValue={actualite.categorie} className={inputClass}>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </Field>
      <Field label="Date de publication">
        <input name="date_publication" type="date" defaultValue={actualite.datePublication} required className={inputClass} />
      </Field>

      <Field label="Extrait (liste des actualités)" className="col-span-2">
        <textarea name="extrait" defaultValue={actualite.extrait ?? ""} rows={3} className={inputClass} />
      </Field>

      <Field label="Sous-titre / chapô (optionnel, coupures de presse)" className="col-span-2">
        <input name="sujet" defaultValue={actualite.sujet ?? ""} className={inputClass} />
      </Field>

      <Field label="Contenu de l'article" className="col-span-2">
        <textarea
          name="corps"
          defaultValue={corpsToText(actualite.corps)}
          rows={12}
          className={`${inputClass} font-mono text-sm`}
          placeholder={"Un paragraphe par bloc, séparé par une ligne vide.\n\n## Un sous-titre\n\nUn autre paragraphe."}
        />
        <p className="m-0 mt-1.5 text-xs text-admin-muted">
          Séparez les paragraphes par une ligne vide. Faites commencer une ligne par <code>## </code> pour un sous-titre.
        </p>
      </Field>

      <div className="col-span-2">
        <button type="submit" className={primaryButtonClass}>
          Enregistrer les modifications
        </button>
      </div>
    </form>
  );
}

import { Field, inputClass, primaryButtonClass } from "@/components/admin/ui";
import { getSiteSettings } from "@/lib/data/settings";
import { updateSettings } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminReglagesPage() {
  const settings = await getSiteSettings();

  return (
    <div className="flex flex-col gap-7">
      <h1 className="font-display m-0 text-3xl">Réglages du site</h1>

      <form action={updateSettings} className="flex max-w-2xl flex-col gap-6">
        <Field label="Email de contact">
          <input name="contact_email" type="email" defaultValue={settings.contact_email} required className={inputClass} />
        </Field>
        <Field label="Adresse (une ligne par ligne)">
          <textarea name="contact_adresse" defaultValue={settings.contact_adresse} rows={3} className={inputClass} />
        </Field>

        <div className="grid grid-cols-3 gap-4 max-[640px]:grid-cols-1">
          <Field label="Facebook">
            <input name="reseau_facebook" defaultValue={settings.reseau_facebook} placeholder="URL ou identifiant" className={inputClass} />
          </Field>
          <Field label="Instagram">
            <input name="reseau_instagram" defaultValue={settings.reseau_instagram} placeholder="URL ou identifiant" className={inputClass} />
          </Field>
          <Field label="LinkedIn">
            <input name="reseau_linkedin" defaultValue={settings.reseau_linkedin} placeholder="URL ou identifiant" className={inputClass} />
          </Field>
        </div>

        <div className="grid grid-cols-3 gap-4 max-[640px]:grid-cols-1">
          <Field label="Année de création (Abidjan)">
            <input name="stat_annee_creation" defaultValue={settings.stat_annee_creation} className={inputClass} />
          </Field>
          <Field label="Année antenne Cotonou">
            <input name="stat_annee_cotonou" defaultValue={settings.stat_annee_cotonou} className={inputClass} />
          </Field>
          <Field label="Pays d'intervention">
            <input name="stat_pays_intervention" defaultValue={settings.stat_pays_intervention} className={inputClass} />
          </Field>
        </div>

        <p className="m-0 text-xs text-admin-muted">
          Le nombre de collaborateurs affiché sur l&apos;accueil est calculé automatiquement depuis l&apos;écran
          Équipe.
        </p>

        <div>
          <button type="submit" className={primaryButtonClass}>
            Enregistrer les réglages
          </button>
        </div>
      </form>
    </div>
  );
}

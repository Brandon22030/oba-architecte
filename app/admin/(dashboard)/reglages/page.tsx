import { Field, inputClass, primaryButtonClass } from "@/components/admin/ui";
import { UploadField } from "@/components/admin/UploadField";
import { getSiteSettings } from "@/lib/data/settings";
import { updateSettings, uploadGmPhoto } from "./actions";

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

        <hr className="my-2 border-admin-sidebar" />
        <h2 className="font-display m-0 text-xl">Mot du General Manager</h2>

        <div className="grid grid-cols-2 gap-4 max-[640px]:grid-cols-1">
          <Field label="Nom">
            <input name="gm_nom" defaultValue={settings.gm_nom} className={inputClass} />
          </Field>
          <Field label="Fonction">
            <input name="gm_role" defaultValue={settings.gm_role} className={inputClass} />
          </Field>
        </div>
        <Field label="Message (un paragraphe par bloc, séparés par une ligne vide)">
          <textarea name="gm_mot" defaultValue={settings.gm_mot} rows={6} className={inputClass} />
        </Field>
        <p className="m-0 text-xs text-admin-muted">
          Le premier paragraphe s&apos;affiche en grande citation, le dernier en phrase d&apos;accroche mise en
          avant, et ceux du milieu en texte courant.
        </p>

        <div>
          <button type="submit" className={primaryButtonClass}>
            Enregistrer les réglages
          </button>
        </div>
      </form>

      <div className="flex max-w-2xl flex-col gap-3 rounded-lg bg-admin-panel p-5">
        <span className="font-mono text-xs tracking-[.1em] uppercase text-admin-muted">Photo du General Manager</span>
        <UploadField action={uploadGmPhoto} currentUrl={settings.gm_photo_url || null} label={settings.gm_nom} />
      </div>
    </div>
  );
}

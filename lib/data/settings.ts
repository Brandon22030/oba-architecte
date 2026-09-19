import "server-only";
import { createClient } from "@/lib/supabase/server";

export type SiteSettings = {
  contact_email: string;
  contact_adresse: string;
  reseau_facebook: string;
  reseau_instagram: string;
  reseau_linkedin: string;
  stat_annee_creation: string;
  stat_annee_cotonou: string;
  stat_pays_intervention: string;
  gm_nom: string;
  gm_role: string;
  gm_mot: string;
  gm_photo_url: string;
};

const DEFAULTS: SiteSettings = {
  contact_email: "contact@obaarchitectes.com",
  contact_adresse: "OBA Architectes FIRM\nCotonou, Sègbèya, Rue Immeuble 03 étages.",
  reseau_facebook: "",
  reseau_instagram: "",
  reseau_linkedin: "",
  stat_annee_creation: "2012",
  stat_annee_cotonou: "2015",
  stat_pays_intervention: "5",
  gm_nom: "Armel Adigoun",
  gm_role: "General Manager",
  gm_mot:
    "Avec nous, votre cadre de vie et d'activités ne seront plus jamais les mêmes.\n\nDans une simplicité de formes pures, des percées visuelles et lumineuses, de confort naturel – éclairage, ventilation – nous savons redonner goûts et couleurs à votre milieu de vie et d'activités.\n\nPassez du rêve à la Réalité…….",
  gm_photo_url: "",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("site_settings").select("key, value");
  if (error) throw error;

  const settings = { ...DEFAULTS };
  for (const row of data ?? []) {
    if (row.key in settings && row.value !== null) {
      (settings as Record<string, string>)[row.key] = row.value;
    }
  }
  return settings;
}

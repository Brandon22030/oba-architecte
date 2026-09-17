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
};

const DEFAULTS: SiteSettings = {
  contact_email: "contact@obaarchitectes.com",
  contact_adresse: "OBA Architectes Firm\nAntenne BAA Cotonou\nCotonou, Bénin",
  reseau_facebook: "",
  reseau_instagram: "",
  reseau_linkedin: "",
  stat_annee_creation: "2012",
  stat_annee_cotonou: "2015",
  stat_pays_intervention: "5",
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

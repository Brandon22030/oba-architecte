"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { SiteSettings } from "@/lib/data/settings";

const KEYS: (keyof SiteSettings)[] = [
  "contact_email",
  "contact_adresse",
  "reseau_facebook",
  "reseau_instagram",
  "reseau_linkedin",
  "stat_annee_creation",
  "stat_annee_cotonou",
  "stat_pays_intervention",
];

export async function updateSettings(formData: FormData) {
  const supabase = await createClient();

  const rows = KEYS.map((key) => ({ key, value: String(formData.get(key) ?? "").trim() }));
  const { error } = await supabase.from("site_settings").upsert(rows, { onConflict: "key" });
  if (error) throw error;

  revalidatePath("/admin/reglages");
  revalidatePath("/");
  revalidatePath("/contact");
}

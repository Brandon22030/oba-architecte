"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { flash } from "@/lib/admin/flash";
import type { UploadState } from "@/lib/admin/upload-state";
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
  "gm_nom",
  "gm_role",
  "gm_mot",
];

export async function updateSettings(formData: FormData) {
  const supabase = await createClient();

  const rows = KEYS.map((key) => ({ key, value: String(formData.get(key) ?? "").trim() }));
  const { error } = await supabase.from("site_settings").upsert(rows, { onConflict: "key" });
  if (error) throw error;

  await flash("Enregistrement réussi");
  revalidatePath("/admin/reglages");
  revalidatePath("/");
  revalidatePath("/contact");
  revalidatePath("/a-propos");
}

export async function uploadGmPhoto(_prevState: UploadState, formData: FormData): Promise<UploadState> {
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "Aucun fichier sélectionné." };

  const supabase = await createClient();

  const ext = file.name.split(".").pop() || "jpg";
  const path = `general-manager/${randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage.from("team-avatars").upload(path, file, {
    contentType: file.type || "image/jpeg",
    cacheControl: "3600",
  });
  if (uploadError) return { error: uploadError.message };

  const {
    data: { publicUrl },
  } = supabase.storage.from("team-avatars").getPublicUrl(path);

  const { error } = await supabase.from("site_settings").upsert({ key: "gm_photo_url", value: publicUrl }, { onConflict: "key" });
  if (error) return { error: error.message };

  await flash("Enregistrement réussi");
  revalidatePath("/admin/reglages");
  revalidatePath("/a-propos");
  return { error: null };
}

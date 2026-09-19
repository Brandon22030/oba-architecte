"use server";

import { revalidatePath } from "next/cache";
import { flash } from "@/lib/admin/flash";
import { createClient } from "@/lib/supabase/server";

function field(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function numberField(formData: FormData, key: string): number | null {
  const raw = field(formData, key).replace(",", ".");
  if (!raw) return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}

export async function createVille(formData: FormData) {
  const nom = field(formData, "nom");
  const lat = numberField(formData, "lat");
  const lon = numberField(formData, "lon");
  if (!nom || lat === null || lon === null) return;

  const supabase = await createClient();
  const { count } = await supabase.from("villes").select("id", { count: "exact", head: true });

  const { error } = await supabase.from("villes").insert({ nom, lat, lon, sort_order: count ?? 0 });
  if (error) throw error;

  await flash("Enregistrement réussi");
  revalidatePath("/admin/villes");
  revalidatePath("/territoire");
}

export async function updateVille(id: string, formData: FormData) {
  const nom = field(formData, "nom");
  const lat = numberField(formData, "lat");
  const lon = numberField(formData, "lon");
  if (!nom || lat === null || lon === null) return;

  const supabase = await createClient();
  const { error } = await supabase.from("villes").update({ nom, lat, lon }).eq("id", id);
  if (error) throw error;

  await flash("Enregistrement réussi");
  revalidatePath("/admin/villes");
  revalidatePath("/admin/projets");
  revalidatePath("/territoire");
}

export async function deleteVille(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("villes").delete().eq("id", id);
  if (error) throw error;

  await flash("Suppression effectuée");
  revalidatePath("/admin/villes");
  revalidatePath("/admin/projets");
  revalidatePath("/territoire");
}

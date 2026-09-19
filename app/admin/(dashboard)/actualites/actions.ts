"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { flash } from "@/lib/admin/flash";
import type { UploadState } from "@/lib/admin/upload-state";
import { createClient } from "@/lib/supabase/server";
import { textToCorps } from "@/lib/data/actualite-constants";

function field(formData: FormData, key: string): string | null {
  const value = String(formData.get(key) ?? "").trim();
  return value || null;
}

function slugify(title: string): string {
  return title
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createActualite(formData: FormData) {
  const titre = field(formData, "titre") ?? "Nouvelle actualité";
  const supabase = await createClient();

  const baseSlug = slugify(titre) || "nouvelle-actualite";
  let slug = baseSlug;
  for (let i = 2; ; i++) {
    const { data } = await supabase.from("actualites").select("id").eq("slug", slug).maybeSingle();
    if (!data) break;
    slug = `${baseSlug}-${i}`;
  }

  const { data, error } = await supabase
    .from("actualites")
    .insert({ titre, slug, categorie: "News", publie: false })
    .select("id")
    .single();

  if (error) throw error;

  await flash("Enregistrement réussi");
  revalidatePath("/admin/actualites");
  redirect(`/admin/actualites/${data.id}`);
}

export async function updateActualiteCartouche(actualiteId: string, formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("actualites")
    .update({
      titre: field(formData, "titre"),
      slug: field(formData, "slug"),
      categorie: field(formData, "categorie"),
      date_publication: field(formData, "date_publication"),
      extrait: field(formData, "extrait"),
      sujet: field(formData, "sujet"),
      corps: textToCorps(String(formData.get("corps") ?? "")),
    })
    .eq("id", actualiteId);

  if (error) throw error;

  await flash("Enregistrement réussi");
  revalidatePath(`/admin/actualites/${actualiteId}`);
  revalidatePath("/admin/actualites");
  revalidatePath("/actualite");
}

export async function togglePublish(actualiteId: string, publie: boolean) {
  const supabase = await createClient();
  const { error } = await supabase.from("actualites").update({ publie }).eq("id", actualiteId);
  if (error) throw error;
  revalidatePath(`/admin/actualites/${actualiteId}`);
  revalidatePath("/admin/actualites");
  revalidatePath("/actualite");
}

function storagePathFromUrl(url: string): string | null {
  const marker = "/actualite-images/";
  const i = url.indexOf(marker);
  return i === -1 ? null : url.slice(i + marker.length);
}

export async function deleteActualite(actualiteId: string) {
  const supabase = await createClient();

  const { data: images } = await supabase.from("actualite_images").select("url").eq("actualite_id", actualiteId);
  if (images?.length) {
    const paths = images.map((i) => storagePathFromUrl(i.url)).filter((p): p is string => !!p);
    if (paths.length) await supabase.storage.from("actualite-images").remove(paths);
  }

  const { error } = await supabase.from("actualites").delete().eq("id", actualiteId);
  if (error) throw error;

  await flash("Suppression effectuée");
  revalidatePath("/admin/actualites");
  revalidatePath("/actualite");
  redirect("/admin/actualites");
}

export async function uploadActualiteImage(actualiteId: string, _prevState: UploadState, formData: FormData): Promise<UploadState> {
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "Aucun fichier sélectionné." };

  const supabase = await createClient();

  const ext = file.name.split(".").pop() || "jpg";
  const path = `${actualiteId}/${randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage.from("actualite-images").upload(path, file, {
    contentType: file.type || "image/jpeg",
    cacheControl: "3600",
  });
  if (uploadError) return { error: uploadError.message };

  const {
    data: { publicUrl },
  } = supabase.storage.from("actualite-images").getPublicUrl(path);

  const { count } = await supabase
    .from("actualite_images")
    .select("id", { count: "exact", head: true })
    .eq("actualite_id", actualiteId);

  const { error: insertError } = await supabase
    .from("actualite_images")
    .insert({ actualite_id: actualiteId, url: publicUrl, sort_order: count ?? 0 });
  if (insertError) return { error: insertError.message };

  const { data: actualite } = await supabase.from("actualites").select("cover_image_url").eq("id", actualiteId).maybeSingle();
  if (actualite && !actualite.cover_image_url) {
    await supabase.from("actualites").update({ cover_image_url: publicUrl }).eq("id", actualiteId);
  }

  await flash("Enregistrement réussi");
  revalidatePath(`/admin/actualites/${actualiteId}`);
  return { error: null };
}

export async function updateImageAlt(actualiteId: string, imageId: string, formData: FormData) {
  const alt = field(formData, "alt");
  const supabase = await createClient();
  const { error } = await supabase.from("actualite_images").update({ alt }).eq("id", imageId);
  if (error) throw error;
  revalidatePath(`/admin/actualites/${actualiteId}`);
}

export async function setCoverImage(actualiteId: string, url: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("actualites").update({ cover_image_url: url }).eq("id", actualiteId);
  if (error) throw error;
  revalidatePath(`/admin/actualites/${actualiteId}`);
}

export async function deleteActualiteImage(actualiteId: string, imageId: string, url: string) {
  const supabase = await createClient();

  const path = storagePathFromUrl(url);
  if (path) await supabase.storage.from("actualite-images").remove([path]);

  const { error } = await supabase.from("actualite_images").delete().eq("id", imageId);
  if (error) throw error;

  const { data: actualite } = await supabase.from("actualites").select("cover_image_url").eq("id", actualiteId).maybeSingle();
  if (actualite?.cover_image_url === url) {
    const { data: remaining } = await supabase
      .from("actualite_images")
      .select("url")
      .eq("actualite_id", actualiteId)
      .order("sort_order", { ascending: true })
      .limit(1)
      .maybeSingle();
    await supabase
      .from("actualites")
      .update({ cover_image_url: remaining?.url ?? null })
      .eq("id", actualiteId);
  }

  revalidatePath(`/admin/actualites/${actualiteId}`);
}

export async function moveActualiteImage(actualiteId: string, imageId: string, direction: "up" | "down") {
  const supabase = await createClient();
  const { data: images, error } = await supabase
    .from("actualite_images")
    .select("id, sort_order")
    .eq("actualite_id", actualiteId)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  if (!images) return;

  const index = images.findIndex((i) => i.id === imageId);
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapWith < 0 || swapWith >= images.length) return;

  const a = images[index];
  const b = images[swapWith];
  await supabase.from("actualite_images").update({ sort_order: b.sort_order }).eq("id", a.id);
  await supabase.from("actualite_images").update({ sort_order: a.sort_order }).eq("id", b.id);

  revalidatePath(`/admin/actualites/${actualiteId}`);
}

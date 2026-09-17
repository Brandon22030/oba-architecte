"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ProjectStatut } from "@/lib/data/project-constants";

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

export async function createProject(formData: FormData) {
  const title = field(formData, "title") ?? "Nouveau projet";
  const supabase = await createClient();

  const baseSlug = slugify(title) || "nouveau-projet";
  let slug = baseSlug;
  for (let i = 2; ; i++) {
    const { data } = await supabase.from("projects").select("id").eq("slug", slug).maybeSingle();
    if (!data) break;
    slug = `${baseSlug}-${i}`;
  }

  const { data, error } = await supabase
    .from("projects")
    .insert({ title, slug, category: "Tertiaire", famille: "Sièges et tertiaire", statut: "Étude", publie: false })
    .select("id")
    .single();

  if (error) throw error;

  revalidatePath("/admin/projets");
  redirect(`/admin/projets/${data.id}`);
}

export async function updateProjectCartouche(projectId: string, formData: FormData) {
  const supabase = await createClient();

  const featured = field(formData, "featured_home_position");

  const { error } = await supabase
    .from("projects")
    .update({
      title: field(formData, "title"),
      slug: field(formData, "slug"),
      description: field(formData, "description"),
      maitre_ouvrage: field(formData, "maitre_ouvrage"),
      mission: field(formData, "mission"),
      mission_scope: field(formData, "mission_scope"),
      famille: field(formData, "famille"),
      category: field(formData, "category"),
      statut: field(formData, "statut") as ProjectStatut,
      ville_id: field(formData, "ville_id"),
      city_label: field(formData, "city_label"),
      featured_home_position: featured ? Number(featured) : null,
    })
    .eq("id", projectId);

  if (error) throw error;

  revalidatePath(`/admin/projets/${projectId}`);
  revalidatePath("/admin/projets");
}

export async function togglePublish(projectId: string, publie: boolean) {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").update({ publie }).eq("id", projectId);
  if (error) throw error;
  revalidatePath(`/admin/projets/${projectId}`);
  revalidatePath("/admin/projets");
}

export async function deleteProject(projectId: string) {
  const supabase = await createClient();

  const { data: images } = await supabase.from("project_images").select("url").eq("project_id", projectId);
  if (images?.length) {
    const paths = images.map((i) => storagePathFromUrl(i.url)).filter((p): p is string => !!p);
    if (paths.length) await supabase.storage.from("project-images").remove(paths);
  }

  const { error } = await supabase.from("projects").delete().eq("id", projectId);
  if (error) throw error;

  revalidatePath("/admin/projets");
  redirect("/admin/projets");
}

function storagePathFromUrl(url: string): string | null {
  const marker = "/project-images/";
  const i = url.indexOf(marker);
  return i === -1 ? null : url.slice(i + marker.length);
}

export async function uploadProjectImage(projectId: string, formData: FormData) {
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return;

  const supabase = await createClient();

  const ext = file.name.split(".").pop() || "jpg";
  const path = `${projectId}/${randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage.from("project-images").upload(path, file, {
    contentType: file.type || "image/jpeg",
    cacheControl: "3600",
  });
  if (uploadError) throw uploadError;

  const {
    data: { publicUrl },
  } = supabase.storage.from("project-images").getPublicUrl(path);

  const { count } = await supabase
    .from("project_images")
    .select("id", { count: "exact", head: true })
    .eq("project_id", projectId);

  const { error: insertError } = await supabase
    .from("project_images")
    .insert({ project_id: projectId, url: publicUrl, sort_order: count ?? 0 });
  if (insertError) throw insertError;

  const { data: project } = await supabase.from("projects").select("cover_image_url").eq("id", projectId).maybeSingle();
  if (project && !project.cover_image_url) {
    await supabase.from("projects").update({ cover_image_url: publicUrl }).eq("id", projectId);
  }

  revalidatePath(`/admin/projets/${projectId}`);
}

export async function updateImageAlt(projectId: string, imageId: string, formData: FormData) {
  const alt = field(formData, "alt");
  const supabase = await createClient();
  const { error } = await supabase.from("project_images").update({ alt }).eq("id", imageId);
  if (error) throw error;
  revalidatePath(`/admin/projets/${projectId}`);
}

export async function setCoverImage(projectId: string, url: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").update({ cover_image_url: url }).eq("id", projectId);
  if (error) throw error;
  revalidatePath(`/admin/projets/${projectId}`);
}

export async function deleteProjectImage(projectId: string, imageId: string, url: string) {
  const supabase = await createClient();

  const path = storagePathFromUrl(url);
  if (path) await supabase.storage.from("project-images").remove([path]);

  const { error } = await supabase.from("project_images").delete().eq("id", imageId);
  if (error) throw error;

  const { data: project } = await supabase.from("projects").select("cover_image_url").eq("id", projectId).maybeSingle();
  if (project?.cover_image_url === url) {
    const { data: remaining } = await supabase
      .from("project_images")
      .select("url")
      .eq("project_id", projectId)
      .order("sort_order", { ascending: true })
      .limit(1)
      .maybeSingle();
    await supabase
      .from("projects")
      .update({ cover_image_url: remaining?.url ?? null })
      .eq("id", projectId);
  }

  revalidatePath(`/admin/projets/${projectId}`);
}

export async function moveProjectImage(projectId: string, imageId: string, direction: "up" | "down") {
  const supabase = await createClient();
  const { data: images, error } = await supabase
    .from("project_images")
    .select("id, sort_order")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  if (!images) return;

  const index = images.findIndex((i) => i.id === imageId);
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapWith < 0 || swapWith >= images.length) return;

  const a = images[index];
  const b = images[swapWith];
  await supabase.from("project_images").update({ sort_order: b.sort_order }).eq("id", a.id);
  await supabase.from("project_images").update({ sort_order: a.sort_order }).eq("id", b.id);

  revalidatePath(`/admin/projets/${projectId}`);
}

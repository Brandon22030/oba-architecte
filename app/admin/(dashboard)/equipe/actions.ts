"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { flash } from "@/lib/admin/flash";
import type { UploadState } from "@/lib/admin/upload-state";
import { createClient } from "@/lib/supabase/server";

function field(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function storagePathFromUrl(url: string): string | null {
  const marker = "/team-avatars/";
  const i = url.indexOf(marker);
  return i === -1 ? null : url.slice(i + marker.length);
}

export async function createTeamMember(formData: FormData) {
  const name = field(formData, "name");
  const role = field(formData, "role");
  if (!name || !role) return;

  const supabase = await createClient();
  const { count } = await supabase.from("team_members").select("id", { count: "exact", head: true });

  const { error } = await supabase.from("team_members").insert({ name, role, sort_order: count ?? 0 });
  if (error) throw error;

  await flash("Enregistrement réussi");
  revalidatePath("/admin/equipe");
}

export async function updateTeamMember(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("team_members")
    .update({ name: field(formData, "name"), role: field(formData, "role") })
    .eq("id", id);
  if (error) throw error;
  await flash("Enregistrement réussi");
  revalidatePath("/admin/equipe");
}

export async function deleteTeamMember(id: string, avatarUrl: string | null) {
  const supabase = await createClient();

  if (avatarUrl) {
    const path = storagePathFromUrl(avatarUrl);
    if (path) await supabase.storage.from("team-avatars").remove([path]);
  }

  const { error } = await supabase.from("team_members").delete().eq("id", id);
  if (error) throw error;

  await flash("Suppression effectuée");
  revalidatePath("/admin/equipe");
}

export async function uploadAvatar(id: string, _prevState: UploadState, formData: FormData): Promise<UploadState> {
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "Aucun fichier sélectionné." };

  const supabase = await createClient();

  const ext = file.name.split(".").pop() || "jpg";
  const path = `${id}/${randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage.from("team-avatars").upload(path, file, {
    contentType: file.type || "image/jpeg",
    cacheControl: "3600",
  });
  if (uploadError) return { error: uploadError.message };

  const {
    data: { publicUrl },
  } = supabase.storage.from("team-avatars").getPublicUrl(path);

  const { error } = await supabase.from("team_members").update({ avatar_url: publicUrl }).eq("id", id);
  if (error) return { error: error.message };

  await flash("Enregistrement réussi");
  revalidatePath("/admin/equipe");
  revalidatePath("/a-propos");
  return { error: null };
}

export async function moveTeamMember(id: string, direction: "up" | "down") {
  const supabase = await createClient();
  const { data: members, error } = await supabase
    .from("team_members")
    .select("id, sort_order")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  if (!members) return;

  const index = members.findIndex((m) => m.id === id);
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (index === -1 || swapWith < 0 || swapWith >= members.length) return;

  const a = members[index];
  const b = members[swapWith];
  await supabase.from("team_members").update({ sort_order: b.sort_order }).eq("id", a.id);
  await supabase.from("team_members").update({ sort_order: a.sort_order }).eq("id", b.id);

  revalidatePath("/admin/equipe");
}

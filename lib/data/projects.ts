import "server-only";
import { createClient } from "@/lib/supabase/server";
import { texteDemo } from "./text";
import type { Project, ProjectImage, ProjectStatut } from "./project-constants";

export type { Project, ProjectImage, ProjectStatut };

function mapProject(row: {
  id: string;
  slug: string;
  title: string;
  category: string;
  famille: string;
  ville_id: string | null;
  city_label: string | null;
  maitre_ouvrage: string | null;
  mission: string | null;
  mission_scope: string | null;
  statut: ProjectStatut;
  publie: boolean;
  featured_home_position: number | null;
  chapo: string | null;
  description: string | null;
  cover_image_url: string | null;
}): Project {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    famille: row.famille,
    villeId: row.ville_id,
    city: row.city_label ?? "",
    maitreOuvrage: row.maitre_ouvrage,
    mission: row.mission,
    missionScope: row.mission_scope,
    statut: row.statut,
    publie: row.publie,
    featuredHomePosition: row.featured_home_position,
    chapo: row.chapo,
    description: row.description,
    coverImageUrl: row.cover_image_url,
  };
}

/** Fallback text: real content once the admin fills it in, generic copy until then. */
export function projectDisplayText(project: Pick<Project, "category" | "city" | "chapo" | "description">) {
  if (project.description) {
    return { chapo: project.chapo || texteDemo(project).chapo, description: project.description, isDemo: false };
  }
  const demo = texteDemo(project);
  return { chapo: project.chapo || demo.chapo, description: demo.description, isDemo: true };
}

export async function getPublishedProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("publie", true)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(mapProject);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("publie", true)
    .not("featured_home_position", "is", null)
    .order("featured_home_position", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(mapProject);
}

async function getProjectWithGalleryBy(column: "slug" | "id", value: string): Promise<(Project & { gallery: ProjectImage[] }) | null> {
  const supabase = await createClient();
  const { data: row, error } = await supabase.from("projects").select("*").eq(column, value).maybeSingle();
  if (error) throw error;
  if (!row) return null;

  const { data: images, error: imgError } = await supabase
    .from("project_images")
    .select("id, url, alt, sort_order")
    .eq("project_id", row.id)
    .order("sort_order", { ascending: true });
  if (imgError) throw imgError;

  return {
    ...mapProject(row),
    gallery: (images ?? []).map((i) => ({ id: i.id, url: i.url, alt: i.alt, sortOrder: i.sort_order })),
  };
}

export async function getProjectBySlug(slug: string) {
  return getProjectWithGalleryBy("slug", slug);
}

/** Admin-only: a single project (any status) with its gallery, by id. */
export async function getProjectById(id: string) {
  return getProjectWithGalleryBy("id", id);
}

/** Admin-only: every project regardless of publication status. */
export async function getAllProjectsForAdmin(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("projects").select("*").order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(mapProject);
}

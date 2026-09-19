import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Actualite, ActualiteBlock, ActualiteImage } from "./actualite-constants";

export type { Actualite, ActualiteBlock, ActualiteImage };

function mapActualite(row: {
  id: string;
  slug: string;
  titre: string;
  categorie: string;
  date_publication: string;
  extrait: string | null;
  sujet: string | null;
  corps: ActualiteBlock[] | null;
  cover_image_url: string | null;
  publie: boolean;
}): Actualite {
  return {
    id: row.id,
    slug: row.slug,
    titre: row.titre,
    categorie: row.categorie,
    datePublication: row.date_publication,
    extrait: row.extrait,
    sujet: row.sujet,
    corps: row.corps ?? [],
    coverImageUrl: row.cover_image_url,
    publie: row.publie,
  };
}

export async function getPublishedActualites(): Promise<Actualite[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("actualites")
    .select("*")
    .eq("publie", true)
    .order("date_publication", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapActualite);
}

async function getActualiteWithGalleryBy(column: "slug" | "id", value: string): Promise<(Actualite & { gallery: ActualiteImage[] }) | null> {
  const supabase = await createClient();
  const { data: row, error } = await supabase.from("actualites").select("*").eq(column, value).maybeSingle();
  if (error) throw error;
  if (!row) return null;

  const { data: images, error: imgError } = await supabase
    .from("actualite_images")
    .select("id, url, alt, sort_order")
    .eq("actualite_id", row.id)
    .order("sort_order", { ascending: true });
  if (imgError) throw imgError;

  return {
    ...mapActualite(row),
    gallery: (images ?? []).map((i) => ({ id: i.id, url: i.url, alt: i.alt, sortOrder: i.sort_order })),
  };
}

export async function getActualiteBySlug(slug: string) {
  return getActualiteWithGalleryBy("slug", slug);
}

/** Admin-only: une actualité (tout statut) avec sa galerie, par id. */
export async function getActualiteById(id: string) {
  return getActualiteWithGalleryBy("id", id);
}

/** Admin-only: toutes les actualités quel que soit leur statut. */
export async function getAllActualitesForAdmin(): Promise<Actualite[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("actualites").select("*").order("date_publication", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapActualite);
}

/** Les 2 autres publications les plus récentes, pour "Autres publications" en pied de fiche. */
export async function getVoisinesActualite(excludeId: string, take = 2): Promise<Actualite[]> {
  const all = await getPublishedActualites();
  return all.filter((a) => a.id !== excludeId).slice(0, take);
}

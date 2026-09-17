import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Ville } from "./ville-types";

export type { Ville };

/** Villes + libellés des projets publiés qui leur sont rattachés (pour la carte Territoire). */
export async function getVillesAvecProjets(): Promise<Ville[]> {
  const supabase = await createClient();

  const { data: villes, error } = await supabase
    .from("villes")
    .select("id, nom, lat, lon")
    .order("sort_order", { ascending: true });
  if (error) throw error;

  const { data: projects, error: projError } = await supabase
    .from("projects")
    .select("title, ville_id")
    .eq("publie", true)
    .not("ville_id", "is", null);
  if (projError) throw projError;

  return (villes ?? []).map((v) => ({
    id: v.id,
    nom: v.nom,
    lat: Number(v.lat),
    lon: Number(v.lon),
    projets: (projects ?? []).filter((p) => p.ville_id === v.id).map((p) => p.title),
  }));
}

/** Toutes les villes, pour le <select> "Ville rattachée à la carte" de l'éditeur admin. */
export async function getVilles(): Promise<Pick<Ville, "id" | "nom">[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("villes").select("id, nom").order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getVillesCount(): Promise<number> {
  const supabase = await createClient();
  const { count, error } = await supabase.from("villes").select("id", { count: "exact", head: true });
  if (error) throw error;
  return count ?? 0;
}

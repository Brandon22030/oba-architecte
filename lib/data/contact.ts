import "server-only";
import { createClient } from "@/lib/supabase/server";

export type ContactRequest = {
  id: string;
  nom: string;
  societe: string | null;
  email: string;
  telephone: string | null;
  natureProjet: string | null;
  message: string;
  famille: string | null;
  mission: string | null;
  sites: string | null;
  villes: string | null;
  foncier: string | null;
  procedure: string | null;
  statut: "nouvelle" | "traitée";
  createdAt: string;
};

function mapRequest(row: {
  id: string;
  nom: string;
  societe: string | null;
  email: string;
  telephone: string | null;
  nature_projet: string | null;
  message: string;
  famille: string | null;
  mission: string | null;
  sites: string | null;
  villes: string | null;
  foncier: string | null;
  procedure: string | null;
  statut: "nouvelle" | "traitée";
  created_at: string;
}): ContactRequest {
  return {
    id: row.id,
    nom: row.nom,
    societe: row.societe,
    email: row.email,
    telephone: row.telephone,
    natureProjet: row.nature_projet,
    message: row.message,
    famille: row.famille,
    mission: row.mission,
    sites: row.sites,
    villes: row.villes,
    foncier: row.foncier,
    procedure: row.procedure,
    statut: row.statut,
    createdAt: row.created_at,
  };
}

export async function getContactRequests(): Promise<ContactRequest[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("contact_requests").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapRequest);
}

export async function getUntreatedContactRequestsCount(): Promise<number> {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("contact_requests")
    .select("id", { count: "exact", head: true })
    .eq("statut", "nouvelle");
  if (error) throw error;
  return count ?? 0;
}

export async function markContactRequestStatus(id: string, statut: "nouvelle" | "traitée") {
  const supabase = await createClient();
  const { error } = await supabase.from("contact_requests").update({ statut }).eq("id", id);
  if (error) throw error;
}

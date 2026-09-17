import "server-only";
import { createClient } from "@/lib/supabase/server";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  avatarUrl: string | null;
  sortOrder: number;
};

export async function getTeam(): Promise<TeamMember[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("team_members")
    .select("id, name, role, avatar_url, sort_order")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((m) => ({ id: m.id, name: m.name, role: m.role, avatarUrl: m.avatar_url, sortOrder: m.sort_order }));
}

export async function getTeamCount(): Promise<number> {
  const supabase = await createClient();
  const { count, error } = await supabase.from("team_members").select("id", { count: "exact", head: true });
  if (error) throw error;
  return count ?? 0;
}

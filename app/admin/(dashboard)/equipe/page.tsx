import { TeamMemberCard } from "@/components/admin/TeamMemberCard";
import { inputClass, primaryButtonClass } from "@/components/admin/ui";
import { getTeam } from "@/lib/data/team";
import { createTeamMember } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminEquipePage() {
  const team = await getTeam();

  return (
    <div className="flex flex-col gap-7">
      <h1 className="font-display m-0 text-3xl">
        {team.length} membre{team.length > 1 ? "s" : ""} d&apos;équipe
      </h1>

      <form action={createTeamMember} className="flex flex-wrap items-end gap-3 rounded-lg bg-admin-panel p-5">
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-xs tracking-[.1em] uppercase text-admin-muted">Nom</span>
          <input name="name" required className={inputClass} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-xs tracking-[.1em] uppercase text-admin-muted">Rôle</span>
          <input name="role" required className={inputClass} />
        </label>
        <button type="submit" className={primaryButtonClass}>
          Ajouter un membre
        </button>
      </form>

      <div className="grid grid-cols-4 gap-5 max-[640px]:grid-cols-1 max-[860px]:grid-cols-2 max-[1100px]:grid-cols-3">
        {team.map((member, i) => (
          <TeamMemberCard key={member.id} member={member} index={i} total={team.length} />
        ))}
      </div>
    </div>
  );
}

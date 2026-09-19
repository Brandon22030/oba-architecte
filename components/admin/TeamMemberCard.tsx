import { deleteTeamMember, moveTeamMember, updateTeamMember, uploadAvatar } from "@/app/admin/(dashboard)/equipe/actions";
import type { TeamMember } from "@/lib/data/team";
import { DeleteButton } from "./DeleteButton";
import { inputClass, secondaryButtonClass } from "./ui";
import { UploadField } from "./UploadField";

export function TeamMemberCard({ member, index, total }: { member: TeamMember; index: number; total: number }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-admin-bg p-4">
      <UploadField action={uploadAvatar.bind(null, member.id)} currentUrl={member.avatarUrl} label={member.name} />

      <form action={updateTeamMember.bind(null, member.id)} className="flex flex-col gap-2">
        <input name="name" defaultValue={member.name} required className={`${inputClass} py-1.5 text-sm`} placeholder="Nom" />
        <input name="role" defaultValue={member.role} required className={`${inputClass} py-1.5 text-sm`} placeholder="Rôle" />
        <button type="submit" className={`${secondaryButtonClass} py-1.5 text-xs`}>
          Enregistrer
        </button>
      </form>

      <div className="flex flex-wrap gap-1.5">
        <form action={moveTeamMember.bind(null, member.id, "up")}>
          <button type="submit" className={`${secondaryButtonClass} px-2.5 py-1.5 text-xs`} disabled={index === 0}>
            ↑
          </button>
        </form>
        <form action={moveTeamMember.bind(null, member.id, "down")}>
          <button type="submit" className={`${secondaryButtonClass} px-2.5 py-1.5 text-xs`} disabled={index === total - 1}>
            ↓
          </button>
        </form>
        <DeleteButton
          action={deleteTeamMember.bind(null, member.id, member.avatarUrl)}
          confirmText={`Retirer ${member.name} de l'équipe ?`}
          label="Retirer"
          className="rounded border border-[#b3261e]/30 px-2.5 py-1.5 text-xs text-[#b3261e] hover:bg-[#b3261e]/5"
        />
      </div>
    </div>
  );
}

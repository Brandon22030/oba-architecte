import { primaryButtonClass } from "@/components/admin/ui";
import { getAllProjectsForAdmin } from "@/lib/data/projects";
import { createProject } from "./actions";
import { ProjetsAdminClient } from "./ProjetsAdminClient";

export const dynamic = "force-dynamic";

export default async function AdminProjetsPage() {
  const projects = await getAllProjectsForAdmin();

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display m-0 text-3xl">
          {projects.length} fiche{projects.length > 1 ? "s" : ""}
        </h1>
        <form action={createProject}>
          <button type="submit" className={primaryButtonClass}>
            Nouveau projet
          </button>
        </form>
      </div>

      <ProjetsAdminClient projects={projects} />
    </div>
  );
}

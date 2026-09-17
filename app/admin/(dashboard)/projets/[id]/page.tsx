import { notFound } from "next/navigation";
import { ProjectEditor } from "@/components/admin/ProjectEditor";
import { getProjectById } from "@/lib/data/projects";
import { getVilles } from "@/lib/data/villes";

export const dynamic = "force-dynamic";

export default async function AdminProjectEditPage(props: PageProps<"/admin/projets/[id]">) {
  const { id } = await props.params;
  const [project, villes] = await Promise.all([getProjectById(id), getVilles()]);

  if (!project) notFound();

  return <ProjectEditor project={project} images={project.gallery} villes={villes} />;
}

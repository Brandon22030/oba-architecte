import { notFound } from "next/navigation";
import { ActualiteEditor } from "@/components/admin/ActualiteEditor";
import { getActualiteById } from "@/lib/data/actualites";

export const dynamic = "force-dynamic";

export default async function AdminActualiteEditPage(props: PageProps<"/admin/actualites/[id]">) {
  const { id } = await props.params;
  const actualite = await getActualiteById(id);

  if (!actualite) notFound();

  return <ActualiteEditor actualite={actualite} images={actualite.gallery} />;
}

import { primaryButtonClass } from "@/components/admin/ui";
import { getAllActualitesForAdmin } from "@/lib/data/actualites";
import { createActualite } from "./actions";
import { ActualitesAdminClient } from "./ActualitesAdminClient";

export const dynamic = "force-dynamic";

export default async function AdminActualitesPage() {
  const actualites = await getAllActualitesForAdmin();

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display m-0 text-3xl">
          {actualites.length} actualité{actualites.length > 1 ? "s" : ""}
        </h1>
        <form action={createActualite}>
          <button type="submit" className={primaryButtonClass}>
            Nouvelle actualité
          </button>
        </form>
      </div>

      <ActualitesAdminClient actualites={actualites} />
    </div>
  );
}

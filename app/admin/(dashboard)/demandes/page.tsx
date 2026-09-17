import Link from "next/link";
import { Badge, primaryButtonClass } from "@/components/admin/ui";
import { getContactRequests } from "@/lib/data/contact";
import { relativeTimeFr } from "@/lib/format";
import { toggleTraitee } from "./actions";

export const dynamic = "force-dynamic";

const DETAIL_FIELDS: { key: "famille" | "mission" | "sites" | "villes" | "foncier" | "procedure"; label: string }[] = [
  { key: "famille", label: "Famille" },
  { key: "mission", label: "Mission" },
  { key: "sites", label: "Sites" },
  { key: "villes", label: "Villes" },
  { key: "foncier", label: "Foncier" },
  { key: "procedure", label: "Procédure" },
];

export default async function AdminDemandesPage(props: PageProps<"/admin/demandes">) {
  const { id } = await props.searchParams;
  const requests = await getContactRequests();
  const untreated = requests.filter((r) => r.statut === "nouvelle").length;
  const selected = requests.find((r) => r.id === id) ?? requests[0] ?? null;

  return (
    <div className="flex flex-col gap-7">
      <h1 className="font-display m-0 text-3xl">
        {requests.length} demande{requests.length > 1 ? "s" : ""}
        {untreated > 0 ? `, dont ${untreated} non traitée${untreated > 1 ? "s" : ""}` : ""}
      </h1>

      <div className="grid grid-cols-[320px_1fr] gap-6 max-[1000px]:grid-cols-1">
        <ul className="m-0 flex list-none flex-col gap-2 p-0">
          {requests.map((req) => (
            <li key={req.id}>
              <Link
                href={`/admin/demandes?id=${req.id}`}
                className="block rounded-lg p-4"
                style={{ background: selected?.id === req.id ? "var(--color-admin-panel)" : "transparent" }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">{req.nom}</span>
                  <Badge tone={req.statut === "nouvelle" ? "accent" : "neutral"}>{req.statut}</Badge>
                </div>
                <p className="m-0 mt-1 text-sm text-admin-muted">
                  {req.natureProjet ?? "Projet"} · {relativeTimeFr(req.createdAt)}
                </p>
              </Link>
            </li>
          ))}
          {requests.length === 0 && <p className="text-sm text-admin-muted">Aucune demande pour l&apos;instant.</p>}
        </ul>

        {selected && (
          <div className="rounded-lg bg-admin-panel p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="font-display m-0 text-2xl">{selected.nom}</h2>
                <p className="m-0 mt-1.5 text-sm text-admin-muted">
                  {selected.email}
                  {selected.telephone ? ` · ${selected.telephone}` : ""}
                  {selected.societe ? ` · ${selected.societe}` : ""}
                </p>
              </div>
              <form action={toggleTraitee.bind(null, selected.id, selected.statut)}>
                <button type="submit" className={primaryButtonClass}>
                  {selected.statut === "nouvelle" ? "Marquer traitée" : "Marquer non traitée"}
                </button>
              </form>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4 max-[640px]:grid-cols-1 max-[860px]:grid-cols-2">
              {DETAIL_FIELDS.map((f) => (
                <div key={f.key}>
                  <p className="m-0 font-mono text-xs tracking-[.1em] uppercase text-admin-muted">{f.label}</p>
                  <p className="m-0 mt-1">{selected[f.key] ?? "—"}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <p className="m-0 font-mono text-xs tracking-[.1em] uppercase text-admin-muted">Message</p>
              <p className="m-0 mt-1.5 whitespace-pre-line">{selected.message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

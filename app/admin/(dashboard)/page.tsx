import Link from "next/link";
import { Badge, KpiTile, Panel } from "@/components/admin/ui";
import { getUntreatedContactRequestsCount, getContactRequests } from "@/lib/data/contact";
import { getAllProjectsForAdmin } from "@/lib/data/projects";
import { getVillesCount } from "@/lib/data/villes";
import { getTeam } from "@/lib/data/team";
import { relativeTimeFr } from "@/lib/format";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function DashboardHomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const prenom = user?.email?.split("@")[0]?.split(".")[0] ?? "";

  const [projects, villesCount, team, untreated, requests] = await Promise.all([
    getAllProjectsForAdmin(),
    getVillesCount(),
    getTeam(),
    getUntreatedContactRequestsCount(),
    getContactRequests(),
  ]);

  const publishedCount = projects.filter((p) => p.publie).length;
  const missingCover = projects.filter((p) => !p.coverImageUrl);

  const aFaire = [
    ...missingCover.map((p) => ({
      titre: p.title,
      description: p.publie ? "Fiche publiée sans image de couverture" : "Brouillon sans image de couverture",
      href: `/admin/projets/${p.id}`,
      tone: "warn" as const,
      badge: p.publie ? "Publié" : "Brouillon",
    })),
    ...team
      .filter((m) => !m.avatarUrl)
      .map((m) => ({
        titre: m.name,
        description: "Portrait à ajouter",
        href: "/admin/equipe",
        tone: "neutral" as const,
        badge: "Équipe",
      })),
  ].slice(0, 5);

  const dernieresDemandes = requests.slice(0, 5);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-display m-0 text-3xl">
          Bonjour{prenom ? ` ${prenom}` : ""}.{" "}
          {untreated > 0
            ? `${untreated} demande${untreated > 1 ? "s" : ""} attend${untreated > 1 ? "ent" : ""} une réponse.`
            : "Toutes les demandes sont traitées."}
        </h1>
      </div>

      <div className="grid grid-cols-4 gap-6 max-[640px]:grid-cols-1 max-[860px]:grid-cols-2">
        <KpiTile value={publishedCount} label="Projets publiés" />
        <KpiTile value={missingCover.length} label="Fiches sans image de couverture" />
        <KpiTile value={villesCount} label="Villes rattachées à la carte" />
        <KpiTile value={untreated} label="Demandes non traitées" />
      </div>

      <div className="grid grid-cols-2 gap-6 max-[1000px]:grid-cols-1">
        <Panel>
          <h2 className="font-display m-0 mb-5 text-xl">À compléter en priorité</h2>
          {aFaire.length === 0 ? (
            <p className="m-0 text-sm text-admin-muted">Rien à signaler — tout est complet.</p>
          ) : (
            <ul className="m-0 flex list-none flex-col gap-4 p-0">
              {aFaire.map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="flex items-center justify-between gap-3 hover:underline">
                    <span>
                      <span className="block font-medium">{item.titre}</span>
                      <span className="block text-sm text-admin-muted">{item.description}</span>
                    </span>
                    <Badge tone={item.tone}>{item.badge}</Badge>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel>
          <h2 className="font-display m-0 mb-5 text-xl">Dernières demandes</h2>
          {dernieresDemandes.length === 0 ? (
            <p className="m-0 text-sm text-admin-muted">Aucune demande pour l&apos;instant.</p>
          ) : (
            <ul className="m-0 flex list-none flex-col gap-4 p-0">
              {dernieresDemandes.map((req) => (
                <li key={req.id}>
                  <Link href={`/admin/demandes?id=${req.id}`} className="flex items-center justify-between gap-3 hover:underline">
                    <span>
                      <span className="block font-medium">{req.nom}</span>
                      <span className="block text-sm text-admin-muted">
                        {req.natureProjet ?? "Projet"} · {relativeTimeFr(req.createdAt)}
                      </span>
                    </span>
                    <Badge tone={req.statut === "nouvelle" ? "accent" : "neutral"}>{req.statut}</Badge>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </div>
  );
}

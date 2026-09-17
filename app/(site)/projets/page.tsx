import { getPublishedProjects } from "@/lib/data/projects";
import { pageMetadata } from "@/lib/site";
import { ProjetsClient } from "./ProjetsClient";

export const metadata = pageMetadata({
  title: "Projets",
  description:
    "Réalisations OBA Architectes Firm : architecture, architecture intérieure, paysagisme et urbanisme au Bénin, en Côte d'Ivoire et en Afrique de l'Ouest.",
});
export const dynamic = "force-dynamic";

export default async function ProjetsPage() {
  const projects = await getPublishedProjects();

  return (
    <div>
      <section className="relative mx-auto max-w-[1760px] px-10 pt-[clamp(110px,14vw,180px)] pb-[clamp(40px,5vw,60px)] max-[640px]:px-5 max-[1400px]:px-8">
        <p className="relative m-0 mb-5.5 font-mono text-[14.5px] tracking-[.24em] uppercase" style={{ color: "var(--ac)" }}>
          Projets — <span>{projects.length}</span> références
        </p>
        <h1
          className="font-display relative m-0"
          style={{ fontSize: "clamp(54px,13vw,190px)", lineHeight: 0.9, letterSpacing: "-.02em", fontVariationSettings: "'wdth' 94,'wght' 700" }}
        >
          Réalisations
        </h1>
      </section>

      <ProjetsClient projects={projects} />
    </div>
  );
}

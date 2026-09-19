import { getPublishedActualites } from "@/lib/data/actualites";
import { pageMetadata } from "@/lib/site";
import { ActualiteListClient } from "./ActualiteListClient";

export const metadata = pageMetadata({
  title: "Actualité",
  description: "Presse, chantiers et collaborations d'OBA Architectes Firm — le journal du cabinet.",
});
export const dynamic = "force-dynamic";

export default async function ActualitePage() {
  const actualites = await getPublishedActualites();

  return (
    <div>
      <section className="relative mx-auto max-w-[1760px] px-10 pt-[clamp(90px,11vw,150px)] pb-[clamp(40px,5vw,60px)] max-[640px]:px-5 max-[1400px]:px-8">
        <p className="relative m-0 mb-5.5 font-mono text-[14.5px] tracking-[.24em] uppercase" style={{ color: "var(--ac)" }}>
          Actualité — <span>{actualites.length}</span> publications
        </p>
        <h1
          className="font-display relative m-0"
          style={{ fontSize: "clamp(54px,13vw,190px)", lineHeight: 0.9, letterSpacing: "-.02em", fontVariationSettings: "'wdth' 94,'wght' 700" }}
        >
          Journal
        </h1>
        <p className="relative m-0 mt-7.5 max-w-[56ch] font-light" style={{ fontSize: "clamp(18px,1.55vw,23px)", color: "var(--pl)" }}>
          Presse, chantiers, collaborations.
        </p>
      </section>

      <ActualiteListClient actualites={actualites} />
    </div>
  );
}

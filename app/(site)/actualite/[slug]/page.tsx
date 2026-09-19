import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Magnetic } from "@/components/site/Magnetic";
import { Reveal } from "@/components/site/Reveal";
import { ZoomImage } from "@/components/site/ZoomImage";
import { formatDateActualite } from "@/lib/data/actualite-constants";
import { getActualiteBySlug, getVoisinesActualite } from "@/lib/data/actualites";
import { pageMetadata, SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata(props: PageProps<"/actualite/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const actualite = await getActualiteBySlug(slug);
  if (!actualite) return { title: "Actualité" };

  return pageMetadata({
    title: actualite.titre,
    description: actualite.extrait ?? actualite.sujet ?? "",
    images: actualite.coverImageUrl ? [actualite.coverImageUrl] : undefined,
  });
}

export default async function ActualiteDetailPage(props: PageProps<"/actualite/[slug]">) {
  const { slug } = await props.params;
  const actualite = await getActualiteBySlug(slug);
  if (!actualite || !actualite.publie) notFound();

  const voisines = await getVoisinesActualite(actualite.id);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Actualité", item: `${SITE_URL}/actualite` },
      { "@type": "ListItem", position: 3, name: actualite.titre, item: `${SITE_URL}/actualite/${actualite.slug}` },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="mx-auto max-w-[1100px] px-10 pt-[clamp(80px,10vw,140px)] pb-[clamp(30px,4vw,48px)] max-[640px]:px-5 max-[1400px]:px-8">
        <div className="flex flex-wrap items-center gap-x-6.5 gap-y-2.5 font-mono text-sm tracking-[.16em] uppercase" style={{ color: "var(--pl)" }}>
          <Magnetic>
            <Link href="/actualite" style={{ color: "var(--ac)" }}>
              Actualité
            </Link>
          </Magnetic>
          <span>{actualite.categorie}</span>
          <span>{formatDateActualite(actualite.datePublication)}</span>
        </div>
        <h1
          className="font-display m-0 mt-7"
          style={{ fontSize: "clamp(34px,5.6vw,80px)", lineHeight: 1, letterSpacing: "-.015em", fontVariationSettings: "'wdth' 88,'wght' 600" }}
        >
          {actualite.titre}
        </h1>
        {actualite.sujet && (
          <p className="m-0 mt-7.5 max-w-[46ch] font-light" style={{ fontSize: "clamp(19px,1.7vw,26px)", lineHeight: 1.4, color: "var(--ac)" }}>
            {actualite.sujet}
          </p>
        )}
      </section>

      <section className="mx-auto max-w-[1400px] px-10 pb-[clamp(40px,5vw,70px)] max-[640px]:px-5 max-[1400px]:px-8">
        {actualite.coverImageUrl ? (
          <div className="relative aspect-16/9 overflow-hidden border" style={{ background: "var(--nk3)", borderColor: "rgba(var(--plr),.12)" }}>
            <Image src={actualite.coverImageUrl} alt={actualite.titre} fill className="object-cover" style={{ filter: "grayscale(.35) contrast(1.06)" }} />
          </div>
        ) : (
          <div className="relative flex aspect-16/10 items-center justify-center border" style={{ background: "var(--nk)", borderColor: "rgba(var(--plr),.16)" }}>
            <p className="m-0 px-4 font-mono text-sm tracking-[.14em] uppercase" style={{ color: "rgba(var(--plr),.5)" }}>
              Coupure de presse — page scannée
            </p>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-[1100px] px-10 pb-[clamp(60px,8vw,110px)] max-[640px]:px-5 max-[1400px]:px-8">
        {actualite.corps.map((bloc, i) =>
          bloc.type === "titre" ? (
            <h2
              key={i}
              className="font-display m-0"
              style={{ marginTop: "clamp(40px,5vw,70px)", fontSize: "clamp(24px,2.6vw,40px)", lineHeight: 1.06, fontVariationSettings: "'wdth' 82,'wght' 500" }}
            >
              {bloc.texte}
            </h2>
          ) : (
            <p
              key={i}
              className="m-0 max-w-[68ch] font-light"
              style={{ marginTop: 24, fontSize: "clamp(17px,1.25vw,21px)", lineHeight: 1.65, color: "var(--pl)" }}
            >
              {bloc.texte}
            </p>
          ),
        )}
      </section>

      {actualite.gallery.length > 0 && (
        <section className="mx-auto max-w-[1760px] px-10 pb-[clamp(70px,9vw,120px)] max-[640px]:px-5 max-[1400px]:px-8">
          <div className="grid grid-cols-4 gap-3.5 max-[640px]:grid-cols-1 max-[860px]:grid-cols-2">
            {actualite.gallery.map((image, i) => (
              <Reveal key={image.id} variant="clip" delay={i * 70} className="relative aspect-3/4 overflow-hidden" style={{ background: "var(--nk3)" }}>
                <ZoomImage
                  src={image.url}
                  alt={image.alt ?? ""}
                  fill
                  filter="grayscale(.55) contrast(1.06)"
                  wrapperClassName="absolute inset-0 overflow-hidden"
                />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {voisines.length > 0 && (
        <section className="border-t" style={{ borderColor: "rgba(var(--plr),.12)", background: "var(--nk3)" }}>
          <div className="mx-auto max-w-[1760px] px-10 py-[clamp(60px,8vw,110px)] max-[640px]:px-5 max-[1400px]:px-8">
            <p className="m-0 mb-[clamp(26px,3vw,44px)] font-mono text-sm tracking-[.2em] uppercase" style={{ color: "var(--ac)" }}>
              Autres publications
            </p>
            <div className="grid grid-cols-2 gap-[clamp(20px,3vw,48px)] max-[860px]:grid-cols-1">
              {voisines.map((v) => (
                <Link key={v.slug} href={`/actualite/${v.slug}`} className="block border-t pt-5.5" style={{ borderColor: "rgba(var(--plr),.16)" }}>
                  <span className="block font-mono text-sm tracking-[.16em] uppercase" style={{ color: "var(--pl)" }}>
                    {v.categorie} — {formatDateActualite(v.datePublication)}
                  </span>
                  <span
                    className="mt-3.5 block font-display"
                    style={{ fontSize: "clamp(20px,2vw,30px)", lineHeight: 1.1, fontVariationSettings: "'wdth' 80,'wght' 500" }}
                  >
                    {v.titre}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-[1760px] px-10 py-[clamp(70px,9vw,130px)] max-[640px]:px-5 max-[1400px]:px-8">
        <Magnetic>
          <Link
            href="/actualite"
            className="font-display inline-flex items-center gap-4.5 transition-[font-variation-settings,color] duration-500 hover:text-[var(--ac)]"
            style={{ fontSize: "clamp(28px,4.6vw,76px)", lineHeight: 1, fontVariationSettings: "'wdth' 84,'wght' 500" }}
          >
            <span className="block h-px" style={{ width: "clamp(30px,5vw,80px)", background: "currentColor" }} />
            Toute l&apos;actualité
          </Link>
        </Magnetic>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Magnetic } from "@/components/site/Magnetic";
import { Reveal } from "@/components/site/Reveal";
import { ZoomImage } from "@/components/site/ZoomImage";
import { getProjectBySlug, projectDisplayText } from "@/lib/data/projects";
import { pageMetadata, SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata(props: PageProps<"/projets/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Projet" };

  const { chapo } = projectDisplayText(project);
  return pageMetadata({
    title: project.title,
    description: chapo,
    images: project.coverImageUrl ? [project.coverImageUrl] : undefined,
  });
}

export default async function ProjetPage(props: PageProps<"/projets/[slug]">) {
  const { slug } = await props.params;
  const project = await getProjectBySlug(slug);
  if (!project || !project.publie) notFound();

  const cover = project.coverImageUrl;
  const gallery = project.gallery;
  const { chapo, description, isDemo } = projectDisplayText(project);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Projets", item: `${SITE_URL}/projets` },
      { "@type": "ListItem", position: 3, name: project.title, item: `${SITE_URL}/projets/${project.slug}` },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <section className="mx-auto max-w-[1760px] px-10 pt-[clamp(90px,11vw,140px)] pb-[clamp(28px,3vw,40px)] max-[640px]:px-5 max-[1400px]:px-8">
        <Magnetic>
          <Link
            href="/projets"
            className="inline-flex items-center gap-3.5 font-mono text-sm tracking-[.16em] uppercase hover:text-[var(--ac)]"
            style={{ color: "var(--pl)" }}
          >
            <span className="block h-px w-8.5 bg-current" />
            Tous les projets
          </Link>
        </Magnetic>
      </section>

      <section className="mx-auto max-w-[1760px] px-10 pb-[clamp(40px,5vw,64px)] max-[640px]:px-5 max-[1400px]:px-8">
        <p className="m-0 mb-5 font-mono text-[15px] tracking-[.2em] uppercase" style={{ color: "var(--ac)" }}>
          {project.category}
        </p>
        <h1
          className="font-display m-0"
          style={{ fontSize: "clamp(42px,8.4vw,132px)", lineHeight: 0.94, letterSpacing: "-.02em", fontVariationSettings: "'wdth' 84,'wght' 700" }}
        >
          {project.title}
        </h1>
      </section>

      <section className="mx-auto max-w-[1760px] px-10 max-[640px]:px-5 max-[1400px]:px-8">
        <div className="relative aspect-16/9 overflow-hidden border" style={{ background: "var(--nk3)", borderColor: "rgba(var(--plr),.12)" }}>
          {cover ? (
            <Image src={cover} alt={project.title} fill className="object-cover" />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center font-mono text-sm uppercase tracking-[.14em]"
              style={{ color: "rgba(var(--plr),.5)" }}
            >
              Image à venir
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-[1760px] px-10 py-[clamp(50px,6vw,84px)] max-[640px]:px-5 max-[1400px]:px-8">
        <div
          className="grid gap-px max-[640px]:grid-cols-1 max-[860px]:grid-cols-2"
          style={{ gridTemplateColumns: "repeat(4,minmax(0,1fr))", background: "rgba(var(--plr),.14)" }}
        >
          {[
            { label: "Programme", value: project.category },
            { label: "Localisation", value: project.city },
            { label: "Maître d'œuvre", value: "OBA Architectes Firm" },
            { label: "Vues", value: String(1 + gallery.length) },
          ].map((item) => (
            <div key={item.label} className="px-6 pt-7 pb-9.5" style={{ background: "var(--nk)" }}>
              <p className="m-0 mb-3 font-mono text-[13.5px] tracking-[.16em] uppercase" style={{ color: "var(--ac)" }}>
                {item.label}
              </p>
              <p
                className="font-display m-0"
                style={{ fontSize: "clamp(22px,2vw,30px)", lineHeight: 1.1, fontVariationSettings: "'wdth' 80,'wght' 500" }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-[clamp(40px,5vw,70px)] grid gap-[clamp(30px,4vw,72px)] max-[1100px]:grid-cols-1" style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)" }}>
          <Reveal as="p" className="font-display m-0" style={{ fontSize: "clamp(24px,2.7vw,40px)", lineHeight: 1.2, fontVariationSettings: "'wdth' 80,'wght' 400" }}>
            {chapo}
          </Reveal>
          <div
            className="font-light"
            style={{ fontSize: "clamp(18px,1.55vw,23px)", color: "var(--pl)", whiteSpace: "pre-line" }}
          >
            {description}
          </div>
        </div>
        {isDemo && (
          <p className="mt-7 mb-0 font-mono text-[13.5px] tracking-[.1em]" style={{ color: "var(--ac)" }}>
            Textes de démonstration — à remplacer par les vrais descriptifs.
          </p>
        )}
      </section>

      {gallery.length > 0 && (
        <section className="mx-auto max-w-[1760px] px-10 pb-[clamp(90px,12vw,150px)] max-[640px]:px-5 max-[1400px]:px-8">
          <div className="grid gap-[clamp(18px,2.2vw,30px)]" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))" }}>
            {gallery.map((image, i) => (
              <Reveal
                key={image.id}
                variant="clip"
                delay={i * 70}
                className="relative aspect-4/3 overflow-hidden border"
                style={{ background: "var(--nk3)", borderColor: "rgba(var(--plr),.12)" }}
              >
                <ZoomImage
                  src={image.url}
                  alt={image.alt ?? ""}
                  fill
                  filter="grayscale(.45) contrast(1.05)"
                  wrapperClassName="absolute inset-0 overflow-hidden"
                />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-[1760px] px-10 pb-[clamp(90px,12vw,150px)] max-[640px]:px-5 max-[1400px]:px-8">
        <Magnetic>
          <Link
            href="/contact"
            className="font-display inline-flex items-center gap-4.5 transition-[font-variation-settings,color] duration-500 hover:text-[var(--ac)]"
            style={{ fontSize: "clamp(28px,4.4vw,72px)", lineHeight: 1, fontVariationSettings: "'wdth' 84,'wght' 500" }}
          >
            <span className="block h-px" style={{ width: "clamp(30px,5vw,80px)", background: "currentColor" }} />
            Un projet similaire ?
          </Link>
        </Magnetic>
      </section>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { CountUp } from "@/components/site/CountUp";
import { IntroController } from "@/components/site/IntroController";
import { Magnetic } from "@/components/site/Magnetic";
import { ProjectsScrollStrip } from "@/components/site/ProjectsScrollStrip";
import { Reveal } from "@/components/site/Reveal";
import { ZoomImage } from "@/components/site/ZoomImage";
import { getFeaturedProjects } from "@/lib/data/projects";
import { getSiteSettings } from "@/lib/data/settings";
import { getTeamCount } from "@/lib/data/team";

export const dynamic = "force-dynamic";

export default async function AccueilPage() {
  const [featured, teamCount, settings] = await Promise.all([
    getFeaturedProjects(),
    getTeamCount(),
    getSiteSettings(),
  ]);

  const STATS = [
    { value: Number(settings.stat_annee_creation), label: "Création à Abidjan", accent: false },
    { value: Number(settings.stat_annee_cotonou), label: "Antenne de Cotonou", accent: false },
    { value: teamCount, label: "Collaborateurs", accent: true },
    { value: Number(settings.stat_pays_intervention), label: "Pays d'intervention", accent: false },
  ];

  return (
    <>
      <IntroController />
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden border-b" style={{ borderColor: "rgba(var(--plr),.1)" }}>
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2"
          style={{
            width: "min(76vw,900px)",
            height: "min(76vw,900px)",
            margin: "calc(min(76vw,900px) / -2) 0 0 calc(min(76vw,900px) / -2)",
            transform: "translate3d(calc(var(--mx) * 30px), calc(var(--my) * 30px), 0)",
          }}
        >
          <div className="absolute inset-0 rounded-full border" style={{ borderColor: "rgba(239,139,18,.35)", animation: "obaSpin 34s linear infinite" }} />
          <div className="absolute rounded-full border border-dashed" style={{ inset: "11%", borderColor: "rgba(var(--plr),.22)", animation: "obaSpinRev 26s linear infinite" }} />
          <div className="absolute rounded-full border" style={{ inset: "24%", borderColor: "rgba(var(--plr),.14)", animation: "obaSpin 18s linear infinite" }} />
          <div className="absolute top-1/2 left-1/2 h-2.5 w-2.5 bg-[#EF8B12]" style={{ margin: -5, "--r": "calc(min(38vw,450px))", animation: "obaOrbit 11s linear infinite" } as React.CSSProperties} />
          <div className="absolute top-1/2 left-1/2 h-1.5 w-1.5" style={{ margin: -3, background: "var(--pl)", "--r": "calc(min(29vw,340px))", animation: "obaOrbit 7s linear infinite reverse" } as React.CSSProperties} />
        </div>

        <div className="relative mx-auto w-full max-w-[1760px] px-10 pt-35 pb-30 max-[640px]:px-5 max-[1400px]:px-8">
          <p
            className="m-0 mb-6.5 font-mono text-[14.5px] tracking-[.24em] uppercase"
            style={{ color: "var(--ac)" }}
          >
            Cabinet d&apos;architecture — Cotonou, Bénin
          </p>
          <h1
            className="font-display m-0"
            style={{
              fontSize: "clamp(46px,10.6vw,168px)",
              lineHeight: 0.9,
              letterSpacing: "-.02em",
              fontVariationSettings: "'wdth' 82,'wght' 700",
            }}
          >
            OBA
            <br />
            ARCHITECTES FIRM
          </h1>
          <div className="mt-9 flex flex-wrap items-end justify-between gap-9">
            <p className="m-0 max-w-[46ch] font-light" style={{ fontSize: "clamp(19px,1.65vw,25px)", color: "var(--pl)" }}>
              Architecture, architecture intérieure, paysagisme et urbanisme. Une architecture singulière et
              moderne, pilotée par une équipe jeune et dynamique.
            </p>
            <Magnetic>
              <a
                href="#projets"
                className="inline-flex items-center gap-4 rounded-full border px-8.5 py-5 font-mono text-[15px] tracking-[.16em] uppercase transition-colors hover:bg-[#EF8B12] hover:text-[#100F0C]"
                style={{ borderColor: "rgba(var(--plr),.34)" }}
              >
                Voir les projets
                <span className="block h-px w-8.5 bg-current" />
              </a>
            </Magnetic>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute bottom-6.5 left-1/2 -ml-px w-px h-11.5"
          style={{ background: "linear-gradient(#EF8B12, transparent)", animation: "obaDrop 1.8s ease-in-out infinite" }}
        />
      </section>

      {/* Marquee */}
      <section className="overflow-hidden border-b py-6.5" style={{ borderColor: "rgba(var(--plr),.1)", background: "var(--nk3)" }}>
        <div className="flex w-max" style={{ animation: "obaMarquee 26s linear infinite" }}>
          {[0, 1].map((i) => (
            <div
              key={i}
              aria-hidden={i === 1}
              className="font-display flex items-center gap-14 pr-14 whitespace-nowrap"
              style={{ fontSize: "clamp(30px,4.6vw,66px)", fontVariationSettings: "'wdth' 68,'wght' 500" }}
            >
              <span>Architecture</span>
              <MarqueeMark />
              <span>Urbanisme</span>
              <MarqueeMark />
              <span>Paysagisme</span>
              <MarqueeMark />
              <span>Suivi de projets</span>
              <MarqueeMark />
            </div>
          ))}
        </div>
      </section>

      {/* Projects strip */}
      <section id="projets" className="border-t border-b py-[clamp(70px,9vw,120px)]" style={{ borderColor: "rgba(var(--plr),.1)", background: "var(--nk3)" }}>
        <ProjectsScrollStrip featured={featured} />
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-[1760px] px-10 py-[clamp(90px,12vw,170px)] max-[640px]:px-5 max-[1400px]:px-8">
        <div className="grid grid-cols-4 gap-px max-[640px]:grid-cols-1 max-[860px]:grid-cols-2" style={{ background: "rgba(var(--plr),.14)" }}>
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 90} className="px-7 pt-9 pb-11" style={{ background: "var(--nk)" } as React.CSSProperties}>
              <CountUp
                end={stat.value}
                className="font-display m-0"
                style={{
                  fontSize: "clamp(46px,6vw,84px)",
                  lineHeight: 1,
                  fontVariationSettings: "'wdth' 92,'wght' 600",
                  color: stat.accent ? "var(--ac)" : undefined,
                }}
              />
              <p className="mt-3.5 mb-0 font-mono text-[14.5px] tracking-[.14em] uppercase" style={{ color: "var(--pl)" }}>
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Territoire teaser */}
      <section className="relative overflow-hidden border-t" style={{ borderColor: "rgba(var(--plr),.1)" }}>
        <div className="absolute inset-0" style={{ transform: "translate3d(0, calc(var(--sy) * -90px), 0)" }}>
          <ZoomImage
            src="/assets/img/ouidah-03.jpg"
            alt=""
            fill
            filter="grayscale(1) contrast(1.1) brightness(.5)"
            wrapperClassName="absolute inset-0 h-[118%]"
          />
        </div>
        <div className="relative mx-auto max-w-[1760px] px-10 py-[clamp(110px,16vw,240px)] text-center max-[640px]:px-5">
          <p className="m-0 mb-5.5 font-mono text-[14.5px] tracking-[.24em] uppercase" style={{ color: "#EF8B12" }}>
            02 — Territoire
          </p>
          <Reveal
            as="h2"
            className="font-display m-0"
            style={{ fontSize: "clamp(34px,5.4vw,86px)", lineHeight: 1.04, fontVariationSettings: "'wdth' 84,'wght' 500", color: "#efeae1" } as React.CSSProperties}
          >
            Côte d&apos;Ivoire · Ghana · Congo · Togo · Bénin
          </Reveal>
          <Magnetic>
            <Link
              href="/territoire"
              className="mt-9.5 inline-flex items-center gap-3.5 rounded-full border px-8 py-4.5 font-mono text-[15px] tracking-[.16em] uppercase transition-colors hover:bg-[#EF8B12] hover:text-[#100F0C]"
              style={{ borderColor: "rgba(239,234,225,.34)", color: "#efeae1" }}
            >
              Ouvrir la carte du Bénin
              <span className="block h-px w-7.5 bg-current" />
            </Link>
          </Magnetic>
        </div>
      </section>

      {/* Contact teaser */}
      <section id="contact" className="mx-auto max-w-[1760px] px-10 py-[clamp(90px,12vw,170px)] max-[640px]:px-5 max-[1400px]:px-8">
        <Magnetic>
          <Link href="/contact" className="block">
            <h2
              className="font-display m-0 transition-[font-variation-settings,color] duration-500 hover:text-[var(--ac)]"
              style={{ fontSize: "clamp(40px,9vw,150px)", lineHeight: 0.94, fontVariationSettings: "'wdth' 88,'wght' 600" }}
            >
              Parlons de votre projet
            </h2>
          </Link>
        </Magnetic>
        <div
          className="mt-11 grid grid-cols-4 gap-7 font-mono text-[15px] tracking-[.06em] max-[640px]:grid-cols-1 max-[860px]:grid-cols-2"
          style={{ color: "var(--pl)" }}
        >
          <p className="m-0" style={{ whiteSpace: "pre-line" }}>
            {settings.contact_adresse}
          </p>
          <p className="m-0">{settings.contact_email}</p>
          <p className="m-0">
            Instagram
            <br />
            LinkedIn
            <br />
            Facebook
          </p>
          <p className="m-0" style={{ color: "var(--ac)" }}>
            Passez du rêve à la Réalité…….
          </p>
        </div>
      </section>
    </>
  );
}

function MarqueeMark() {
  return (
    <span className="relative inline-block flex-none" style={{ width: "0.42em", height: "0.42em" }}>
      <Image src="/assets/b-oba-marque.png" alt="" aria-hidden="true" fill sizes="60px" className="object-contain" />
    </span>
  );
}

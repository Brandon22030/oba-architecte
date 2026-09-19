import Link from "next/link";
import { Magnetic } from "@/components/site/Magnetic";
import { PortraitSlot } from "@/components/site/PortraitSlot";
import { Reveal } from "@/components/site/Reveal";
import { ZoomImage } from "@/components/site/ZoomImage";
import { getSiteSettings } from "@/lib/data/settings";
import { getTeam } from "@/lib/data/team";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "À propos",
  description:
    "L'équipe OBA Architectes Firm : architecture, urbanisme, paysagisme et suivi de projets, depuis Cotonou pour le Bénin, la Côte d'Ivoire et l'Afrique de l'Ouest.",
});
export const dynamic = "force-dynamic";

const COMPETENCES = [
  {
    titre: "Études architecturales",
    description: "Conception de projets architecturaux alliant créativité, fonctionnalité, qualité technique et identité du lieu.",
  },
  {
    titre: "Études techniques",
    description: "Élaboration des études techniques garantissant la faisabilité, la sécurité et la conformité des projets.",
  },
  {
    titre: "Réhabilitation",
    description: "Valorisation et transformation du patrimoine bâti par des interventions adaptées aux usages contemporains.",
  },
  {
    titre: "Décoration d'intérieur",
    description: "Création d'espaces intérieurs esthétiques, fonctionnels et adaptés aux besoins ainsi qu'à l'image de leurs utilisateurs.",
  },
  {
    titre: "Infographie 3D",
    description: "Réalisation de visualisations photoréalistes permettant d'anticiper et de valoriser chaque projet avant sa réalisation.",
  },
  {
    titre: "Expertise immobilière",
    description: "Évaluation technique et analyse de biens immobiliers pour accompagner les décisions d'investissement et de gestion.",
  },
  {
    titre: "Planification urbaine",
    description: "Conception de stratégies d'aménagement durable favorisant un développement urbain cohérent, fonctionnel et inclusif.",
  },
  {
    titre: "Permis de construire",
    description: "Constitution et suivi des dossiers administratifs en vue de l'obtention des autorisations de construire.",
  },
];

const CLIENTS = [
  "Avesig",
  "MCVDD",
  "Ministère des Finances du Bénin",
  "PHP Afrique",
  "Sogea-Satom",
  "GAB",
  "St Goussman",
];

function ClientRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      aria-hidden={hidden}
      className="flex items-center gap-11 pr-11 font-mono whitespace-nowrap uppercase"
      style={{ fontSize: "clamp(13px,1.3vw,17px)", letterSpacing: ".16em", color: "var(--pl)" }}
    >
      {CLIENTS.map((client) => (
        <span key={client} className="flex items-center gap-11">
          {client}
          <span style={{ color: "var(--ac)" }}>/</span>
        </span>
      ))}
    </div>
  );
}

export default async function AProposPage() {
  const [team, settings] = await Promise.all([getTeam(), getSiteSettings()]);
  const gmParagraphes = settings.gm_mot
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const gmCitation = gmParagraphes[0] ?? "";
  const gmAccroche = gmParagraphes.length > 1 ? gmParagraphes[gmParagraphes.length - 1] : null;
  const gmCorps = gmParagraphes.length > 2 ? gmParagraphes.slice(1, -1) : [];

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[74svh] items-end overflow-hidden border-b" style={{ borderColor: "rgba(var(--plr),.1)" }}>
        <div
          aria-hidden="true"
          className="absolute"
          style={{
            right: "-6vw",
            top: "-10vh",
            width: "min(60vw,720px)",
            height: "min(60vw,720px)",
            transform: "translate3d(calc(var(--mx) * -34px), calc(var(--my) * -34px), 0)",
          }}
        >
          <div className="absolute inset-0 rounded-full border" style={{ borderColor: "rgba(239,139,18,.3)", animation: "obaSpin 40s linear infinite" }} />
          <div className="absolute rounded-full border border-dashed" style={{ inset: "16%", borderColor: "rgba(var(--plr),.2)", animation: "obaSpinRev 24s linear infinite" }} />
        </div>

        <div className="relative mx-auto w-full max-w-[1760px] px-10 pt-30 pb-12.5 max-[640px]:px-5 max-[1400px]:px-8">
          <p className="m-0 mb-6 font-mono text-[14.5px] tracking-[.24em] uppercase" style={{ color: "var(--ac)" }}>
            À propos
          </p>
          <h1
            className="font-display m-0"
            style={{ fontSize: "clamp(46px,10.2vw,160px)", lineHeight: 0.9, letterSpacing: "-.02em", fontVariationSettings: "'wdth' 94,'wght' 700" }}
          >
            OBA
            <br />
            ARCHITECTES FIRM
          </h1>
          <p
            className="font-display m-0"
            style={{
              marginTop: 34,
              fontSize: "clamp(18px,2.1vw,32px)",
              lineHeight: 1.25,
              fontVariationSettings: "'wdth' 72,'wght' 400",
              color: "var(--pl)",
            }}
          >
            Cabinet d&apos;Architectes - Architecture Intérieure - Paysagisme - Urbanisme
          </p>
        </div>
      </section>

      {/* Qui sommes-nous ? */}
      <section className="mx-auto max-w-[1760px] px-10 py-[clamp(80px,10vw,150px)] max-[640px]:px-5 max-[1400px]:px-8">
        <div className="grid grid-cols-[minmax(0,.55fr)_minmax(0,1.45fr)] items-start gap-[clamp(36px,5vw,90px)] max-[1100px]:grid-cols-1">
          <h2
            className="font-display sticky m-0 max-[1100px]:static"
            style={{ top: 140, fontSize: "clamp(30px,3.6vw,58px)", lineHeight: 1.02, fontVariationSettings: "'wdth' 82,'wght' 500" }}
          >
            Qui sommes-nous ?
          </h2>
          <div className="flex flex-col gap-7.5 font-light" style={{ fontSize: "clamp(18px,1.55vw,23px)", color: "var(--pl)" }}>
            <Reveal delay={0}>
              <p className="m-0">
                Créé en 2012 à Abidjan et basé depuis 2015 à Cotonou au Bénin,{" "}
                <strong className="font-medium" style={{ color: "var(--pl)" }}>
                  OBA Architectes Firm
                </strong>{" "}
                est un cabinet d&apos;architecture qui offre une synergie de compétences et de services tant à la
                fois diversifiés et complémentaires avec pour fondements{" "}
                <strong className="font-medium" style={{ color: "var(--ac)" }}>
                  l&apos;Excellence, l&apos;Innovation et une Vision Commune
                </strong>
                .
              </p>
            </Reveal>
            <Reveal delay={90}>
              <p className="m-0">
                L&apos;Antenne de Cotonou est dirigée par Armel ADIGOUN, Architecte-Urbaniste Diplômé depuis 2010
                de l&apos;Ecole Internationale d&apos;Architecture et d&apos;Urbanisme de Lomé (Togo). Trempé
                d&apos;une riche expérience de plus de dix années dans les études architecturales et le suivi de
                projets majeurs en Afrique (Côte d&apos;Ivoire, Ghana, Congo, Togo); il fut d&apos;abord
                co-fondateur en 2012 du cabinet{" "}
                <strong className="font-medium" style={{ color: "var(--pl)" }}>
                  B Architectes Associés (BAA)
                </strong>{" "}
                en Côte d&apos;Ivoire avant la création en 2015 de l&apos;Antenne BAA Cotonou{" "}
                <strong className="font-medium" style={{ color: "var(--pl)" }}>
                  (OBA Architectes Firm)
                </strong>{" "}
                dont il devient le General Manager depuis lors.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <p className="m-0">
                Aujourd&apos;hui le cabinet OBA Architectes Firm crayonne une architecture singulière et moderne à
                travers les différents projets qu&apos;il pilote autour d&apos;une équipe jeune et dynamique.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Domaines de compétences */}
      <section className="border-t border-b" style={{ borderColor: "rgba(var(--plr),.1)", background: "var(--nk3)" }}>
        <div className="mx-auto max-w-[1760px] px-10 py-[clamp(70px,9vw,130px)] max-[640px]:px-5 max-[1400px]:px-8">
          <h2
            className="font-display m-0 mb-[clamp(36px,5vw,64px)]"
            style={{ fontSize: "clamp(28px,3.4vw,54px)", lineHeight: 1.04, fontVariationSettings: "'wdth' 82,'wght' 500" }}
          >
            Domaines de compétences
          </h2>
          <div className="flex flex-col border-t" style={{ borderColor: "rgba(var(--plr),.14)" }}>
            {COMPETENCES.map((item, i) => (
              <Reveal
                key={item.titre}
                delay={i * 120}
                className="oba-domaine-row group relative grid grid-cols-[64px_minmax(0,.9fr)_minmax(0,1.3fr)] items-baseline gap-x-8 gap-y-2 border-b py-7.5 pl-6 transition-colors duration-500 max-[860px]:grid-cols-1 max-[860px]:gap-y-3 max-[860px]:pl-5"
                style={{ borderColor: "rgba(var(--plr),.14)" }}
              >
                <span aria-hidden="true" className="oba-domaine-tick absolute top-0 left-0 h-full w-[2px]" style={{ background: "#EF8B12" }} />
                <span className="oba-domaine-num font-mono text-[14.5px] tracking-[.16em]">{String(i + 1).padStart(2, "0")}</span>
                <h3
                  className="oba-domaine-title font-display m-0"
                  style={{ fontSize: "clamp(22px,2.2vw,32px)", lineHeight: 1.08, fontVariationSettings: "'wdth' 78,'wght' 500" }}
                >
                  {item.titre}
                </h3>
                <p className="oba-domaine-desc m-0 max-w-[52ch] font-light" style={{ fontSize: "clamp(15.5px,1.1vw,17.5px)", lineHeight: 1.55, color: "var(--pl)" }}>
                  {item.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Le mot du General Manager */}
      <section className="mx-auto max-w-[1760px] px-10 py-[clamp(80px,11vw,160px)] max-[640px]:px-5 max-[1400px]:px-8">
        <div className="grid grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] items-start gap-[clamp(36px,5vw,84px)] max-[1100px]:grid-cols-1">
          <Reveal variant="clip" className="relative max-w-[520px] border" style={{ background: "var(--nk3)", borderColor: "rgba(var(--plr),.16)", aspectRatio: "3/4" } as React.CSSProperties}>
            <PortraitSlot src={settings.gm_photo_url || null} label={`Portrait de ${settings.gm_nom}`} className="h-full w-full border-0" />
            <span
              className="absolute bottom-0 left-0 px-3.5 py-2.5 font-mono text-[15px] tracking-[.14em] uppercase"
              style={{ background: "#EF8B12", color: "#100F0C" }}
            >
              {settings.gm_nom}
            </span>
          </Reveal>
          <div className="flex max-w-[64ch] flex-col gap-7">
            <p className="m-0 font-mono text-base tracking-[.2em] uppercase" style={{ color: "var(--ac)" }}>
              Le mot du General Manager
            </p>
            {gmCitation && (
              <Reveal delay={0} as="p" className="font-display m-0 italic" style={{ fontSize: "clamp(26px,3vw,46px)", lineHeight: 1.18, fontVariationSettings: "'wdth' 80,'wght' 400" } as React.CSSProperties}>
                {gmCitation}
              </Reveal>
            )}
            {gmCorps.map((paragraphe, i) => (
              <Reveal key={i} delay={120 + i * 80} as="p" className="m-0 font-light italic" style={{ fontSize: "clamp(18px,1.6vw,24px)", color: "var(--pl)" } as React.CSSProperties}>
                {paragraphe}
              </Reveal>
            ))}
            {gmAccroche && (
              <Reveal
                delay={200 + gmCorps.length * 80}
                as="p"
                className="font-display m-0 italic"
                style={{ fontSize: "clamp(22px,2.4vw,36px)", fontVariationSettings: "'wdth' 70,'wght' 400", color: "var(--ac)" } as React.CSSProperties}
              >
                {gmAccroche}
              </Reveal>
            )}
            <Reveal delay={260 + gmCorps.length * 80} as="p" className="m-0 font-mono text-[15px] tracking-[.18em] uppercase" style={{ color: "var(--pl)" } as React.CSSProperties}>
              {settings.gm_nom} – {settings.gm_role}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Notre équipe */}
      <section className="border-t" style={{ borderColor: "rgba(var(--plr),.1)", background: "var(--nk3)" }}>
        <div className="mx-auto max-w-[1760px] px-10 py-[clamp(70px,9vw,130px)] max-[640px]:px-5 max-[1400px]:px-8">
          <div className="mb-[clamp(36px,5vw,64px)] flex flex-wrap items-end justify-between gap-5">
            <h2
              className="font-display m-0"
              style={{ fontSize: "clamp(28px,3.4vw,54px)", lineHeight: 1.04, fontVariationSettings: "'wdth' 82,'wght' 500" }}
            >
              Notre équipe
            </h2>
            <p className="m-0 font-mono text-[14.5px] tracking-[.14em] uppercase" style={{ color: "var(--pl)" }}>
              À la rencontre de notre équipe
            </p>
          </div>
          <div className="grid gap-[clamp(26px,3.4vw,54px)] max-[640px]:grid-cols-1 max-[1100px]:grid-cols-2 grid-cols-3">
            {team.map((member, i) => (
              <Reveal key={member.id} delay={(i % 3) * 90} as="article">
                <PortraitSlot src={member.avatarUrl} label={`Portrait — ${member.name}`} grayscaleHover />
                <h3
                  className="font-display m-0 mt-5 mb-1.5"
                  style={{ fontSize: "clamp(24px,2.2vw,34px)", lineHeight: 1.04, fontVariationSettings: "'wdth' 80,'wght' 500" }}
                >
                  {member.name}
                </h3>
                <p className="m-0 font-mono text-sm tracking-[.1em] uppercase" style={{ color: "var(--pl)" }}>
                  {member.role}
                </p>
              </Reveal>
            ))}
          </div>
          {team.some((m) => !m.avatarUrl) && (
            <p className="mt-5.5 mb-0 font-mono text-sm tracking-[.1em]" style={{ color: "var(--pl)" }}>
              Portraits à fournir — les vignettes sont des marqueurs provisoires.
            </p>
          )}
        </div>
      </section>

      {/* Nos bureaux */}
      <section className="mx-auto max-w-[1760px] px-10 py-[clamp(80px,10vw,150px)] max-[640px]:px-5 max-[1400px]:px-8">
        <h2
          className="font-display m-0 mb-[clamp(30px,4vw,56px)]"
          style={{ fontSize: "clamp(28px,3.4vw,54px)", lineHeight: 1.04, fontVariationSettings: "'wdth' 82,'wght' 500" }}
        >
          Nos bureaux
        </h2>
        <div className="grid grid-cols-4 gap-3.5 max-[640px]:grid-cols-1 max-[860px]:grid-cols-2">
          {["agence-01", "agence-02", "filaire-agence-01", "filaire-agence-02"].map((stem, i) => (
            <Reveal key={stem} variant="clip" delay={i * 110} className="relative aspect-3/4 overflow-hidden" style={{ background: "var(--nk3)" } as React.CSSProperties}>
              <ZoomImage
                src={`/assets/img/${stem}.jpg`}
                alt="Nos bureaux"
                fill
                filter="grayscale(.55) contrast(1.06)"
                wrapperClassName="absolute inset-0 overflow-hidden"
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Clients marquee */}
      <section className="overflow-hidden border-t border-b py-7.5" style={{ borderColor: "rgba(var(--plr),.1)", background: "var(--nk3)" }}>
        <div className="flex w-max" style={{ animation: "obaMarqueeRev 30s linear infinite" }}>
          <ClientRow />
          <ClientRow hidden />
        </div>
      </section>

      {/* Retour à l'accueil */}
      <section className="mx-auto max-w-[1760px] px-10 py-[clamp(80px,11vw,160px)] max-[640px]:px-5 max-[1400px]:px-8">
        <Magnetic>
          <Link
            href="/"
            className="font-display inline-flex items-center gap-4.5 transition-[font-variation-settings,color] duration-500 hover:text-[var(--ac)]"
            style={{ fontSize: "clamp(28px,4.6vw,76px)", lineHeight: 1, fontVariationSettings: "'wdth' 84,'wght' 500" }}
          >
            <span className="block h-px" style={{ width: "clamp(30px,5vw,80px)", background: "currentColor" }} />
            Retour à l&apos;accueil
          </Link>
        </Magnetic>
      </section>
    </div>
  );
}

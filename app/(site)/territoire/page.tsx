import { BeninMap } from "@/components/site/BeninMap";
import { Reveal } from "@/components/site/Reveal";
import { getVillesAvecProjets } from "@/lib/data/villes";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Territoire",
  description:
    "OBA Architectes Firm intervient au Bénin, en Côte d'Ivoire, au Togo, au Ghana et au Congo — cabinet basé à Cotonou, né à Abidjan en 2012.",
});
export const dynamic = "force-dynamic";

const STATS = [
  { value: "Bénin", label: "Base à Cotonou", accent: false },
  { value: "Côte d'Ivoire", label: "Origine, 2012", accent: false },
  { value: "Togo · Ghana", label: "Projets suivis", accent: true },
  { value: "Congo", label: "Projets suivis", accent: false },
];

export default async function TerritoirePage() {
  const villes = await getVillesAvecProjets();

  return (
    <div>
      <section className="relative mx-auto max-w-[1760px] px-10 pt-[clamp(110px,14vw,180px)] pb-[clamp(40px,5vw,64px)] max-[640px]:px-5 max-[1400px]:px-8">
        <div
          aria-hidden="true"
          className="absolute"
          style={{
            right: "4vw",
            top: "16%",
            width: "min(42vw,420px)",
            height: "min(42vw,420px)",
            transform: "translate3d(calc(var(--mx) * -30px), calc(var(--my) * -30px), 0)",
          }}
        >
          <div className="absolute inset-0 rounded-full border" style={{ borderColor: "rgba(239,139,18,.28)", animation: "obaSpin 36s linear infinite" }} />
          <div className="absolute rounded-full border border-dashed" style={{ inset: "20%", borderColor: "rgba(var(--plr),.18)", animation: "obaSpinRev 22s linear infinite" }} />
        </div>

        <p className="relative m-0 mb-5.5 font-mono text-[14.5px] tracking-[.24em] uppercase" style={{ color: "var(--ac)" }}>
          Territoire — Relevé
        </p>
        <h1
          className="font-display relative m-0"
          style={{ fontSize: "clamp(50px,12vw,180px)", lineHeight: 0.9, letterSpacing: "-.02em", fontVariationSettings: "'wdth' 94,'wght' 700" }}
        >
          Bénin
        </h1>
        <p className="relative m-0 mt-7.5 max-w-[56ch] font-light" style={{ fontSize: "clamp(18px,1.55vw,23px)", color: "var(--pl)" }}>
          Vingt villes couvertes, du littoral de Cotonou à Malanville. Survolez un point pour lire les projets
          rattachés et ses coordonnées.
        </p>
      </section>

      <section className="mx-auto max-w-[1760px] px-10 pb-[clamp(80px,10vw,140px)] max-[640px]:px-5 max-[1400px]:px-8">
        <BeninMap villes={villes} />
      </section>

      <section className="border-t" style={{ borderColor: "rgba(var(--plr),.1)", background: "var(--nk3)" }}>
        <div className="mx-auto max-w-[1760px] px-10 py-[clamp(70px,9vw,120px)] max-[640px]:px-5 max-[1400px]:px-8">
          <div
            className="grid gap-px max-[640px]:grid-cols-1 max-[860px]:grid-cols-2"
            style={{ gridTemplateColumns: "repeat(4,minmax(0,1fr))", background: "rgba(var(--plr),.14)" }}
          >
            {STATS.map((stat, i) => (
              <Reveal key={stat.value} delay={i * 90} className="px-6 pt-8 pb-11" style={{ background: "var(--nk3)" }}>
                <p
                  className="font-display m-0"
                  style={{
                    fontSize: "clamp(34px,4vw,58px)",
                    lineHeight: 1,
                    fontVariationSettings: "'wdth' 92,'wght' 600",
                    color: stat.accent ? "var(--ac)" : undefined,
                  }}
                >
                  {stat.value}
                </p>
                <p className="mt-3 mb-0 font-mono text-sm tracking-[.14em] uppercase" style={{ color: "var(--pl)" }}>
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

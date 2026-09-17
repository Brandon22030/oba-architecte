import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/site/Logo";
import { Magnetic } from "@/components/site/Magnetic";

export const metadata: Metadata = { title: "404 — OBA Architectes Firm" };

export default function NotFound() {
  return (
    <div className="relative grid min-h-screen overflow-hidden" style={{ background: "var(--nk)", color: "var(--pl)" }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(var(--plr),.05) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--plr),.05) 1px, transparent 1px)",
          backgroundSize: "140px 140px",
          animation: "obaGridPan 12s linear infinite",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full"
        style={{
          right: "-12vw",
          top: "-10vh",
          width: "52vw",
          height: "52vw",
          maxWidth: 760,
          maxHeight: 760,
          border: "1px solid rgba(var(--plr),.1)",
          animation: "obaSpin 64s linear infinite",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full"
        style={{
          right: "2vw",
          bottom: "-16vh",
          width: "30vw",
          height: "30vw",
          maxWidth: 420,
          maxHeight: 420,
          border: "1px dashed rgba(var(--plr),.12)",
          animation: "obaSpin 48s linear infinite reverse",
        }}
      />

      <main className="relative grid content-center px-10 py-[clamp(72px,10vh,132px)] max-[640px]:px-5 max-[1400px]:px-8">
        <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] items-end gap-[clamp(40px,6vw,96px)] max-[1100px]:grid-cols-1 max-[1100px]:gap-14">
          <div className="flex flex-col gap-[clamp(20px,2.4vw,34px)]">
            <Link href="/" className="block" style={{ animation: "obaFade 1s .05s ease both" }}>
              <Logo width="clamp(128px,12vw,188px)" />
            </Link>

            <p
              className="m-0 flex items-center gap-3 font-mono uppercase"
              style={{
                fontSize: "clamp(12px,1vw,14.5px)",
                letterSpacing: ".24em",
                opacity: 0.74,
                animation: "obaFade 1s .1s ease both",
              }}
            >
              <span
                aria-hidden="true"
                className="block h-2 w-2"
                style={{ background: "var(--ac)", animation: "obaBlip 2.4s ease-in-out infinite" }}
              />
              Erreur 404 · Adresse introuvable
            </p>

            <h1
              className="font-display m-0"
              style={{
                fontSize: "clamp(96px,22vw,340px)",
                lineHeight: 0.82,
                letterSpacing: "-.03em",
                fontVariationSettings: "'wdth' 82,'wght' 700",
                animation: "obaWdth 9s ease-in-out infinite",
              }}
            >
              404
            </h1>

            <span
              aria-hidden="true"
              className="block h-0.5 origin-left"
              style={{
                width: "clamp(120px,18vw,280px)",
                background: "var(--ac)",
                animation: "obaRule 1s .4s cubic-bezier(.18,.8,.24,1) both",
              }}
            />

            <span className="block overflow-hidden">
              <span
                className="font-display block"
                style={{
                  fontSize: "clamp(24px,3vw,46px)",
                  lineHeight: 1.12,
                  fontVariationSettings: "'wdth' 104,'wght' 300",
                  animation: "obaUp 1s .55s cubic-bezier(.18,.8,.24,1) both",
                }}
              >
                Cette page n&apos;existe pas.
              </span>
            </span>

            <p
              className="m-0 max-w-[46ch]"
              style={{
                fontSize: "clamp(15px,1.15vw,19px)",
                lineHeight: 1.75,
                opacity: 0.82,
                textWrap: "pretty",
                animation: "obaFade 1s .8s ease both",
              }}
            >
              L&apos;adresse demandée a peut-être changé, ou la page a été retirée. Reprenez par l&apos;accueil, ou allez
              directement aux projets et au contact.
            </p>

            <div
              className="flex flex-wrap gap-3.5 max-[640px]:flex-col max-[640px]:items-stretch"
              style={{ animation: "obaFade 1s 1s ease both" }}
            >
              <Magnetic>
                <Link
                  href="/"
                  className="flex items-center gap-3.5 rounded-full px-6.5 py-4 font-mono text-sm tracking-[.16em] uppercase transition-opacity hover:opacity-85 max-[640px]:justify-between"
                  style={{ background: "var(--ac)", color: "#100F0C" }}
                >
                  Retour à l&apos;accueil
                  <span aria-hidden="true" className="block h-[1.5px] w-5 bg-current" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/projets"
                  className="flex items-center gap-3.5 rounded-full border px-6.5 py-4 font-mono text-sm tracking-[.16em] uppercase transition-colors hover:border-[var(--ac)] hover:text-[var(--ac)] max-[640px]:justify-between"
                  style={{ borderColor: "rgba(var(--plr),.3)", color: "var(--pl)" }}
                >
                  Voir les projets
                  <span aria-hidden="true" className="block h-[1.5px] w-5 bg-current" />
                </Link>
              </Magnetic>
            </div>
          </div>

          <div className="flex flex-col gap-5.5" style={{ animation: "obaFade 1.2s 1.1s ease both" }}>
            <div
              aria-hidden="true"
              className="relative overflow-hidden"
              style={{ aspectRatio: "1 / 1", border: "1px solid rgba(var(--plr),.14)", background: "var(--nk2)" }}
            >
              <span
                className="absolute rounded-full"
                style={{ left: "50%", top: "50%", width: "64%", height: "64%", margin: "-32% 0 0 -32%", border: "1px solid rgba(var(--plr),.18)" }}
              />
              <span
                className="absolute rounded-full"
                style={{
                  left: "50%",
                  top: "50%",
                  width: "26%",
                  height: "26%",
                  margin: "-13% 0 0 -13%",
                  border: "1.5px solid var(--ac)",
                  animation: "obaBlip 3.2s ease-in-out infinite",
                }}
              />
              <span className="absolute" style={{ left: "50%", top: "14%", bottom: "14%", width: 1, background: "rgba(var(--plr),.16)" }} />
              <span className="absolute" style={{ top: "50%", left: "14%", right: "14%", height: 1, background: "rgba(var(--plr),.16)" }} />
              <span
                className="absolute"
                style={{ left: 14, top: 14, width: 16, height: 16, borderLeft: "1px solid rgba(var(--plr),.45)", borderTop: "1px solid rgba(var(--plr),.45)" }}
              />
              <span
                className="absolute"
                style={{ right: 14, bottom: 14, width: 16, height: 16, borderRight: "1px solid rgba(var(--plr),.45)", borderBottom: "1px solid rgba(var(--plr),.45)" }}
              />
              <span
                className="absolute font-mono uppercase"
                style={{ left: 16, bottom: 14, fontSize: 12, letterSpacing: ".2em", opacity: 0.6 }}
              >
                Signal perdu
              </span>
            </div>
            <p className="m-0" style={{ fontSize: "clamp(12.5px,1vw,14.5px)", lineHeight: 1.7, letterSpacing: ".06em", opacity: 0.6 }}>
              Cotonou, Bénin · Abidjan, Côte d&apos;Ivoire
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

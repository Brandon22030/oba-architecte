"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ZoomImage } from "@/components/site/ZoomImage";
import { CATEGORIES_ACTUALITE, formatDateActualite, type Actualite } from "@/lib/data/actualite-constants";

export function ActualiteListClient({ actualites }: { actualites: Actualite[] }) {
  const [filtre, setFiltre] = useState<(typeof CATEGORIES_ACTUALITE)[number]>("Tout");

  const visibles = useMemo(
    () => (filtre === "Tout" ? actualites : actualites.filter((a) => a.categorie === filtre)),
    [actualites, filtre],
  );

  return (
    <>
      <section className="mx-auto max-w-[1760px] px-10 pb-[clamp(26px,3vw,40px)] max-[640px]:px-5 max-[1400px]:px-8">
        <div className="flex flex-wrap gap-2.5">
          {CATEGORIES_ACTUALITE.map((cat) => {
            const active = cat === filtre;
            return (
              <button
                key={cat}
                onClick={() => setFiltre(cat)}
                className="inline-flex items-center rounded-full border px-5 py-2.75 font-mono text-[14.5px] tracking-[.14em] uppercase transition-colors hover:border-[var(--ac)] hover:text-[var(--ac)]"
                style={{
                  borderColor: active ? "var(--ac)" : "rgba(var(--plr),.28)",
                  color: active ? "var(--ac)" : "var(--pl)",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-[1760px] px-10 pb-[clamp(90px,12vw,150px)] max-[640px]:px-5 max-[1400px]:px-8">
        <div className="flex flex-col border-t" style={{ borderColor: "rgba(var(--plr),.14)" }}>
          {visibles.map((a, i) => (
            <article key={a.slug} className="border-b" style={{ borderColor: "rgba(var(--plr),.14)" }}>
              <Link
                href={`/actualite/${a.slug}`}
                className="grid items-start gap-[clamp(20px,3vw,48px)] py-[clamp(28px,3.6vw,52px)] max-[860px]:grid-cols-1"
                style={{ gridTemplateColumns: "110px minmax(0,1fr) 34%" }}
              >
                <div className="font-mono text-sm tracking-[.14em] uppercase max-[860px]:hidden" style={{ color: "var(--pl)" }}>
                  <span className="block" style={{ color: "var(--ac)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-2 block">{formatDateActualite(a.datePublication)}</span>
                </div>
                <div>
                  <p className="m-0 mb-3.5 font-mono text-sm tracking-[.16em] uppercase" style={{ color: "var(--ac)" }}>
                    {a.categorie}
                  </p>
                  <h2
                    className="font-display m-0 max-w-[22ch] transition-[font-variation-settings] duration-500"
                    style={{ fontSize: "clamp(24px,2.7vw,44px)", lineHeight: 1.04, fontVariationSettings: "'wdth' 80,'wght' 500" }}
                  >
                    {a.titre}
                  </h2>
                  {a.extrait && (
                    <p className="m-0 mt-4.5 max-w-[54ch] font-light" style={{ fontSize: "clamp(16px,1.15vw,19px)", color: "var(--pl)" }}>
                      {a.extrait}
                    </p>
                  )}
                  <span
                    className="mt-6 inline-flex items-center gap-3.5 font-mono text-sm tracking-[.16em] uppercase"
                    style={{ color: "var(--ac)" }}
                  >
                    Lire l&apos;article
                    <span className="block h-px w-9.5 bg-current" />
                  </span>
                </div>
                {a.coverImageUrl ? (
                  <div className="relative aspect-4/3 overflow-hidden border max-[860px]:hidden" style={{ background: "var(--nk3)", borderColor: "rgba(var(--plr),.12)" }}>
                    <ZoomImage
                      src={a.coverImageUrl}
                      alt={a.titre}
                      fill
                      filter="grayscale(.6) contrast(1.08)"
                      wrapperClassName="absolute inset-0 overflow-hidden"
                    />
                  </div>
                ) : (
                  <div
                    className="relative flex aspect-4/3 items-center justify-center border text-center max-[860px]:hidden"
                    style={{ background: "var(--nk)", borderColor: "rgba(var(--plr),.16)" }}
                  >
                    <p className="m-0 px-4 font-mono text-xs tracking-[.14em] uppercase" style={{ color: "rgba(var(--plr),.5)" }}>
                      Coupure de presse
                    </p>
                  </div>
                )}
              </Link>
            </article>
          ))}
          {visibles.length === 0 && (
            <p className="py-16 text-center font-mono text-sm uppercase tracking-[.14em]" style={{ color: "var(--pl)" }}>
              Aucune publication dans cette catégorie.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

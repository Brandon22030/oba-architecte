import type { Metadata } from "next";
import { ZoomImage } from "@/components/site/ZoomImage";
import { getSiteSettings } from "@/lib/data/settings";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = { title: "Contact — OBA Architectes Firm" };
export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <section className="relative overflow-hidden border-b" style={{ borderColor: "rgba(var(--plr),.1)" }}>
        <div className="absolute inset-0 h-[116%]" style={{ transform: "translate3d(0, calc(var(--sy) * -60px), 0)" }}>
          <ZoomImage
            src="/assets/img/contact-01.jpg"
            alt=""
            fill
            filter="grayscale(1) contrast(1.1) brightness(.34)"
            wrapperClassName="absolute inset-0 h-full overflow-hidden"
          />
        </div>
        <div className="relative mx-auto max-w-[1760px] px-10 pt-[clamp(110px,14vw,190px)] pb-[clamp(50px,6vw,80px)] max-[640px]:px-5 max-[1400px]:px-8">
          <p className="m-0 mb-5.5 font-mono text-[14.5px] tracking-[.24em] uppercase" style={{ color: "var(--ac)" }}>
            Contact
          </p>
          <h1
            className="font-display m-0"
            style={{ fontSize: "clamp(46px,11vw,168px)", lineHeight: 0.9, letterSpacing: "-.02em", fontVariationSettings: "'wdth' 94,'wght' 700" }}
          >
            Parlons
            <br />
            projet
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-[1760px] px-10 py-[clamp(70px,9vw,130px)] max-[640px]:px-5 max-[1400px]:px-8">
        <div className="grid items-start gap-[clamp(40px,6vw,100px)] max-[1100px]:grid-cols-1" style={{ gridTemplateColumns: "minmax(0,1.3fr) minmax(0,.7fr)" }}>
          <ContactForm />

          <aside className="flex flex-col gap-8.5 font-mono text-[15px] leading-[1.7]" style={{ color: "var(--pl)" }}>
            <div>
              <p className="m-0 mb-2.5 text-sm tracking-[.2em] uppercase" style={{ color: "var(--ac)" }}>
                Antenne de Cotonou
              </p>
              <p className="m-0" style={{ whiteSpace: "pre-line" }}>
                {settings.contact_adresse}
              </p>
            </div>
            <div>
              <p className="m-0 mb-2.5 text-sm tracking-[.2em] uppercase" style={{ color: "var(--ac)" }}>
                Écrire
              </p>
              <p className="m-0">{settings.contact_email}</p>
            </div>
            <div>
              <p className="m-0 mb-2.5 text-sm tracking-[.2em] uppercase" style={{ color: "var(--ac)" }}>
                Suivre
              </p>
              <p className="m-0">
                Facebook
                <br />
                Instagram
                <br />
                LinkedIn
              </p>
            </div>
            <div className="relative aspect-square border" style={{ borderColor: "rgba(var(--plr),.16)" }}>
              <div
                className="absolute rounded-full border"
                style={{ inset: "16%", borderColor: "rgba(239,139,18,.4)", animation: "obaSpin 28s linear infinite" }}
              />
              <div
                className="absolute rounded-full border border-dashed"
                style={{ inset: "34%", borderColor: "rgba(var(--plr),.2)", animation: "obaSpinRev 18s linear infinite" }}
              />
              <div className="absolute top-1/2 left-1/2 h-2 w-2 -m-1 rounded-full bg-[#EF8B12]" />
              <div
                className="absolute top-1/2 left-1/2 h-4 w-4 -m-2 rounded-full border border-[#EF8B12]"
                style={{ animation: "obaPulse 2.8s ease-out infinite" }}
              />
              <p className="absolute bottom-3 left-3.5 m-0 text-[12.5px] tracking-[.16em]" style={{ color: "var(--pl)" }}>
                6.366° N / 2.433° E
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

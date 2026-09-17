import { SiteChrome } from "@/components/site/SiteChrome";
import { getSiteSettings } from "@/lib/data/settings";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export default async function MarketingLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();

  const sameAs = [settings.reseau_instagram, settings.reseau_linkedin, settings.reseau_facebook].filter(Boolean);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/assets/logo-oba-clair.png`,
    description:
      "Cabinet d'architecture à Cotonou, Bénin — architecture, architecture intérieure, paysagisme et urbanisme.",
    email: settings.contact_email,
    address: { "@type": "PostalAddress", addressLocality: "Cotonou", addressCountry: "BJ" },
    areaServed: ["Bénin", "Côte d'Ivoire"],
    ...(sameAs.length > 0 && { sameAs }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <SiteChrome>{children}</SiteChrome>
    </>
  );
}

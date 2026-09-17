import type { Metadata } from "next";
import { introInitScript } from "@/components/site/IntroController";
import { themeInitScript } from "@/hooks/useTheme";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const DESCRIPTION =
  "Cabinet d'architecture à Cotonou, Bénin — architecture, architecture intérieure, paysagisme et urbanisme.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s — ${SITE_NAME}` },
  description: DESCRIPTION,
  keywords: [
    "architecte Cotonou",
    "cabinet d'architecture Bénin",
    "architecture intérieure",
    "paysagisme",
    "urbanisme",
    "OBA Architectes",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: data-oba-t is intentionally overwritten by the
    // inline script below (before hydration) from localStorage, so the client
    // attribute value legitimately differs from this static server-rendered one.
    <html lang="fr" data-oba-t="sombre" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anybody:wdth,wght@50..150,100..900&family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: introInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

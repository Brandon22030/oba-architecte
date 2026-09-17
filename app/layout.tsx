import type { Metadata } from "next";
import { introInitScript } from "@/components/site/IntroController";
import { themeInitScript } from "@/hooks/useTheme";
import "./globals.css";

export const metadata: Metadata = {
  title: "OBA Architectes Firm",
  description:
    "Cabinet d'architecture à Cotonou, Bénin — architecture, architecture intérieure, paysagisme et urbanisme.",
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

import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { GrainOverlay } from "@/components/effects/GrainOverlay";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { GlobalAmbientBackground } from "@/components/effects/GlobalAmbientBackground";
import { SectionDotNav } from "@/components/navigation/SectionDotNav";
import { JsonLd } from "@/components/seo/JsonLd";
import { brandAssets } from "@/content/assets";
import { getSiteUrl } from "@/lib/site-url";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  alternates: {
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  title: {
    default: "Firmenflow – Webdesign persönlich mit Manu | Wesel & Niederrhein",
    template: "%s | Firmenflow",
  },
  description:
    "Mehr Lokalpräsenz. Weniger Agenturtheater. Deine Website. Persönlich mit Manu. Persönliches Webdesign, Relaunch und Foto/Video vor Ort für Betriebe in Wesel und am Niederrhein.",
  icons: {
    icon: brandAssets.mark,
  },
  openGraph: {
    title: "Firmenflow – Webdesign persönlich mit Manu | Wesel & Niederrhein",
    description:
      "Mehr Lokalpräsenz. Weniger Agenturtheater. Deine Website. Persönlich mit Manu.",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <head>
        <JsonLd />
      </head>
      <body className="min-h-screen flex flex-col">
        <SmoothScrollProvider>
          <a className="skip-link" href="#main">
            Zum Inhalt springen
          </a>
          <ScrollProgress />
          <GlobalAmbientBackground />
          <SectionDotNav />
          <GrainOverlay />
          <SiteHeader />
          <div className="flex-1 relative z-10">{children}</div>
          <SiteFooter />
        </SmoothScrollProvider>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}.word-reveal{transform:none!important}`}</style>
        </noscript>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

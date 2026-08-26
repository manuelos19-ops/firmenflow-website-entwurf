import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { GrainOverlay } from "@/components/effects/GrainOverlay";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { GlobalParticleField } from "@/components/effects/GlobalParticleField";
import { SectionDotNav } from "@/components/navigation/SectionDotNav";
import { brandAssets } from "@/content/assets";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: "Firmenflow – Webdesign direkt mit Manu | Wesel & Niederrhein",
    template: "%s | Firmenflow",
  },
  description:
    "Mehr Lokalpräsenz. Weniger Agenturtheater. Deine Website. Direkt mit Manu. Persönliches Webdesign und Relaunches für Betriebe rund um Wesel und den Niederrhein.",
  icons: {
    icon: brandAssets.mark,
  },
  openGraph: {
    title: "Firmenflow – Webdesign direkt mit Manu | Wesel & Niederrhein",
    description:
      "Mehr Lokalpräsenz. Weniger Agenturtheater. Deine Website. Direkt mit Manu.",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body className="min-h-screen flex flex-col">
        <SmoothScrollProvider>
          <a className="skip-link" href="#main">
            Zum Inhalt springen
          </a>
          <ScrollProgress />
          <GlobalParticleField />
          <SectionDotNav />
          <GrainOverlay />
          <SiteHeader />
          <div className="flex-1 relative z-10">{children}</div>
          <SiteFooter />
        </SmoothScrollProvider>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}.word-reveal{transform:none!important}`}</style>
        </noscript>
      </body>
    </html>
  );
}

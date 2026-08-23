import { AboutManu } from "@/components/sections/AboutManu";
import { ConceptProjects } from "@/components/sections/ConceptProjects";
import { ContactChoice } from "@/components/sections/ContactChoice";
import { DirectWithManu } from "@/components/sections/DirectWithManu";
import { Faq } from "@/components/sections/Faq";
import { GoogleBusinessPilot } from "@/components/sections/GoogleBusinessPilot";
import { Hero } from "@/components/sections/Hero";
import { LiveProjects } from "@/components/sections/LiveProjects";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { Process } from "@/components/sections/Process";
import { ServiceOverview } from "@/components/sections/ServiceOverview";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function HomePage() {
  const whatsappUrl = buildWhatsAppUrl(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
    process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE
  );

  return (
    <main id="main">
      {/* 1. Hero mit Kernversprechen, Region, Foto & Marquee */}
      <Hero whatsappUrl={whatsappUrl} />

      {/* 2. Problembewusstsein */}
      <ProblemSection />

      {/* 3. Leistungen: Neue Website & Relaunch */}
      <ServiceOverview />

      {/* 4. Direkt mit Manu: 1 Ansprechpartner */}
      <DirectWithManu />

      {/* 5. Google Business 360° Pilot */}
      <GoogleBusinessPilot />

      {/* 6. Echte Live-Projekte */}
      <LiveProjects />

      {/* 7. Aktuelle Konzeptentwürfe */}
      <ConceptProjects />

      {/* 8. Ablauf in 4 Schritten */}
      <Process />

      {/* 9. Über Manu */}
      <AboutManu />

      {/* 10. FAQ */}
      <Faq />

      {/* 11. Kontaktabschluss & Interaktive Projektanfrage */}
      <ContactChoice whatsappUrl={whatsappUrl} />
    </main>
  );
}

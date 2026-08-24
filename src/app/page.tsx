import { AboutManu } from "@/components/sections/AboutManu";
import { ContactChoice } from "@/components/sections/ContactChoice";
import { DirectWithManu } from "@/components/sections/DirectWithManu";
import { Faq } from "@/components/sections/Faq";
import { GoogleBusinessPilot } from "@/components/sections/GoogleBusinessPilot";
import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { Process } from "@/components/sections/Process";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { ServiceOverview } from "@/components/sections/ServiceOverview";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function HomePage() {
  const whatsappUrl = buildWhatsAppUrl(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
    process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE
  );

  return (
    <main id="main">
      <Hero whatsappUrl={whatsappUrl} />
      <ProblemSection />
      <ServiceOverview />
      <DirectWithManu />
      <GoogleBusinessPilot />
      <ProjectsShowcase />
      <Process />
      <AboutManu />
      <Faq />
      <ContactChoice whatsappUrl={whatsappUrl} />
    </main>
  );
}

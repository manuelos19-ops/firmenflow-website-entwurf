import { ContactChoice } from "@/components/sections/ContactChoice";
import { DirectWithManu } from "@/components/sections/DirectWithManu";
import { Faq } from "@/components/sections/Faq";
import { GoogleBusinessPilot } from "@/components/sections/GoogleBusinessPilot";
import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { StorySection } from "@/components/sections/StorySection";
import { ServiceOverview } from "@/components/sections/ServiceOverview";
import { Process } from "@/components/sections/Process";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
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
      <StorySection />
      <ProjectsShowcase />
      <ServiceOverview />
      <DirectWithManu />
      <GoogleBusinessPilot />
      <Process />
      <Faq />
      <ContactChoice whatsappUrl={whatsappUrl} />
    </main>
  );
}

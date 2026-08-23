import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { ProjectInquiry } from "@/components/inquiry/ProjectInquiry";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { portraitAssets } from "@/content/assets";
import { homeContent } from "@/content/site";

export function ContactChoice({ whatsappUrl }: { whatsappUrl: string | null }) {
  const { contact } = homeContent;

  return (
    <section id="kontakt" className="py-24 sm:py-32">
      <Container className="space-y-16 sm:space-y-20">
        <Reveal>
          <SectionHeading
            eyebrow={contact.eyebrow}
            title={contact.title}
            body={contact.body}
            align="center"
          />
        </Reveal>

        {/* Dual Choice Bar: WhatsApp vs Inquiry */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Quick WhatsApp Box (if number configured) */}
          {whatsappUrl && (
            <Reveal direction="left" className="md:col-span-5 h-full">
              <div className="h-full bg-[var(--color-plum)] text-white p-8 sm:p-10 rounded-[2.5rem] shadow-xl flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6" />
                  </span>
                  <h3 className="text-2xl font-bold">Schneller Einstieg via WhatsApp</h3>
                  <p className="text-sm text-white/75 leading-relaxed">
                    Du hast eine kurze Frage oder möchtest direkt wissen, ob wir zusammenpassen? Schreib mir unkompliziert.
                  </p>
                </div>
                <div>
                  <ButtonLink href={whatsappUrl} external variant="primary" size="default" className="w-full sm:w-auto">
                    WhatsApp an Manu
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          )}

          {/* Contact Photo & Direct Message Info */}
          <Reveal direction="right" className={whatsappUrl ? "md:col-span-7" : "md:col-span-12"}>
            <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-[var(--color-line)] shadow-sm flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shrink-0 border-2 border-[var(--color-coral)] shadow-md">
                <Image
                  src={portraitAssets.contact.src}
                  alt={portraitAssets.contact.alt}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <h4 className="text-lg sm:text-xl font-bold text-[var(--color-ink)]">
                  Lieber detailliert anfragen?
                </h4>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                  Nutze das geführte Formular unten. Dauert nur 2 Minuten – ich melde mich persönlich mit einer klaren Ersteinschätzung.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Guided Interactive Form */}
        <div id="projektanfrage" className="max-w-4xl mx-auto pt-8">
          <Reveal>
            <ProjectInquiry whatsappUrl={whatsappUrl} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

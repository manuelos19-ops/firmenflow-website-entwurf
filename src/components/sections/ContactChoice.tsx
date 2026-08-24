"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { homeContent } from "@/content/site";
import { portraitAssets } from "@/content/assets";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ProjectInquiry } from "@/components/inquiry/ProjectInquiry";

interface ContactChoiceProps {
  whatsappUrl: string | null;
}

export function ContactChoice({ whatsappUrl }: ContactChoiceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.from(".contact-reveal", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        once: true,
      },
    });
  }, { scope: containerRef });

  const { contact } = homeContent;

  return (
    <section ref={containerRef} className="relative pt-24 pb-32 md:pt-32 md:pb-40 bg-plum text-paper overflow-hidden">
      {/* Wave Transition */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-12 md:h-16 text-paper fill-current">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-51.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>

      <Container className="relative z-20 mt-8">
        <div className="contact-reveal mb-16 text-center max-w-2xl mx-auto">
          <span className="text-coral font-semibold uppercase tracking-wider text-sm block mb-4">
            {contact.eyebrow}
          </span>
          <h2 className="font-editorial text-4xl md:text-5xl text-paper leading-tight mb-6">
            {contact.title}
          </h2>
          <p className="text-paper/80 text-lg leading-relaxed">
            {contact.body}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="flex flex-col gap-10 items-center lg:items-start justify-center">
            {/* WhatsApp Card */}
            <div className="contact-reveal bg-white/10 backdrop-blur-sm border border-coral rounded-3xl p-8 shadow-2xl w-full flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-coral/20 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-coral" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-2">WhatsApp</h3>
              <p className="text-paper/80 mb-8 max-w-xs">Schreib mir einfach kurz auf WhatsApp. Ich antworte schnell.</p>
              {whatsappUrl ? (
                <MagneticButton>
                  <ButtonLink href={whatsappUrl} external={true}>
                    Nachricht senden
                  </ButtonLink>
                </MagneticButton>
              ) : (
                <p className="text-paper/50 italic">WhatsApp aktuell nicht verfügbar</p>
              )}
            </div>
            
            {/* Manu Photo */}
            <div className="contact-reveal relative w-56 h-56 rounded-full p-2 border-2 border-coral/50 flex-shrink-0 self-center lg:self-start ml-0 lg:ml-8 mt-4 lg:mt-8">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src={portraitAssets.contact.src}
                  alt={portraitAssets.contact.alt}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  sizes="(max-width: 768px) 224px, 224px"
                />
              </div>
            </div>
          </div>

          <div className="contact-reveal bg-ink/30 border border-line/20 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-md">
            <h3 className="text-2xl font-editorial mb-6 text-paper text-center lg:text-left">Projektanfrage</h3>
            <div id="projektanfrage">
              <ProjectInquiry />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

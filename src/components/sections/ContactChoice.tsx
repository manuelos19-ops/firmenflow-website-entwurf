"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { homeContent } from "@/content/site";
import { portraitAssets } from "@/content/assets";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { ProjectInquiry } from "@/components/inquiry/ProjectInquiry";
import { MapPin, Clock } from "lucide-react";
import { BrandIcon } from "@/components/brand/BrandIcon";

interface ContactChoiceProps {
  whatsappUrl: string | null;
}

export function ContactChoice({ whatsappUrl }: ContactChoiceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      gsap.from(".contact-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: containerRef }
  );

  const { contact } = homeContent;

  return (
    <section 
      ref={containerRef} 
      id="kontakt" 
      className="relative pt-36 pb-36 md:pt-44 md:pb-44 bg-gradient-to-b from-transparent via-[var(--color-plum)] via-15% to-[var(--color-plum)] text-white overflow-hidden"
    >
      <Container className="relative z-20">
        {/* Section Header */}
        <div className="contact-reveal text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 text-sm sm:text-base font-bold text-white mb-6 border border-white/20 shadow-md backdrop-blur-md">
            <BrandIcon variant="light" className="w-4 h-3.5" />
            <span>{contact.eyebrow}</span>
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display leading-[1.05] mb-6">
            Kurz schreiben oder direkt das <br className="hidden sm:block" />
            <span className="font-editorial text-[var(--color-coral)]">Projekt einordnen.</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            {contact.body}
          </p>
        </div>

        {/* Quick Contact Bar */}
        <div className="contact-reveal grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          {/* WhatsApp Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center mb-5">
                <WhatsAppIcon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold font-sans text-white mb-2">Schnell via WhatsApp</h3>
              <p className="text-sm text-white/75 leading-relaxed mb-6">
                Unkompliziert und direkt: Schreib mir eine kurze Nachricht mit deinen Fragen oder Vorstellungen.
              </p>
            </div>
            
            {whatsappUrl ? (
              <MagneticButton>
                <ButtonLink 
                  href={whatsappUrl} 
                  external={true}
                  variant="whatsapp"
                  className="w-full justify-center shadow-lg shadow-[#25D366]/25"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white mr-1 shrink-0" />
                  <span>WhatsApp öffnen</span>
                </ButtonLink>
              </MagneticButton>
            ) : (
              <p className="text-xs text-white/50 italic">WhatsApp aktuell nicht konfiguriert</p>
            )}
          </div>

          {/* Manu Contact Info Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 sm:p-8 flex items-center gap-6 shadow-xl">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-white/30 shadow-md">
              <Image
                src={portraitAssets.contact.src}
                alt={portraitAssets.contact.alt}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
            <div className="space-y-1.5 text-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-coral)]">Dein Ansprechpartner</p>
              <h4 className="text-xl font-bold text-white">Manuel Landeck</h4>
              <p className="text-white/75 flex items-center gap-1.5 text-xs">
                <MapPin className="w-3.5 h-3.5 text-[var(--color-coral)]" />
                Wesel &amp; Niederrhein
              </p>
              <p className="text-white/60 flex items-center gap-1.5 text-xs">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                Antwort meist innerhalb 24h
              </p>
            </div>
          </div>
        </div>

        {/* 5-Step Project Inquiry Form - Full Width Container */}
        <div id="projektanfrage" className="contact-reveal max-w-4xl mx-auto">
          <div className="mb-6 text-center">
            <h3 className="text-2xl sm:text-3xl font-display text-white mb-2">
              Lass uns sprechen
            </h3>
            <p className="text-sm text-white/70">
              Unverbindlich in 2 Minuten: Wähle deinen Projekttyp und deine Ziele.
            </p>
          </div>

          {/* Form Component Container */}
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl">
            <ProjectInquiry />
          </div>
        </div>
      </Container>
    </section>
  );
}

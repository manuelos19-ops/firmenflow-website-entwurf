"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { homeContent } from "@/content/site";
import { portraitAssets } from "@/content/assets";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { ProjectInquiry } from "@/components/inquiry/ProjectInquiry";
import { WebsiteCheckInquiry } from "@/components/inquiry/WebsiteCheckInquiry";
import { MapPin, Clock, Phone, Mail, ChevronDown } from "lucide-react";
import { BrandIcon } from "@/components/brand/BrandIcon";

interface ContactChoiceProps {
  whatsappUrl: string | null;
}

export function ContactChoice({ whatsappUrl }: ContactChoiceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showDetailedForm, setShowDetailedForm] = useState(false);

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
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group">
            {/* Warm Glow Background */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-[var(--color-coral)]/15 rounded-full blur-2xl pointer-events-none" />

            <div>
              {/* Status Header */}
              <div className="flex items-center justify-between gap-2 mb-5">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-white/90">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Antwort garantiert innerhalb 24h</span>
                </span>
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-[var(--color-coral)] bg-[var(--color-coral)]/10 px-2.5 py-0.5 rounded-full border border-[var(--color-coral)]/20">
                  Inhaber
                </span>
              </div>

              {/* Photo & Identity Row */}
              <div className="flex items-center gap-4 sm:gap-5 mb-6">
                <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-2xl overflow-hidden shrink-0 border-2 border-white/30 shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/media/portraits/manu-contact-portrait.webp"
                    alt="Manuel Landeck – Dein persönlicher Ansprechpartner"
                    fill
                    className="object-cover object-center"
                    sizes="120px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-50" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl sm:text-2xl font-bold text-white font-sans">Manuel Landeck</h4>
                  <p className="text-xs sm:text-sm text-white/75 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[var(--color-coral)] shrink-0" />
                    <span>Wesel &amp; Niederrhein</span>
                  </p>
                  <p className="text-xs text-white/60 pt-0.5">
                    Webdesign &amp; Foto/Video vor Ort
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <a
                href="tel:015567277155"
                className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Phone className="w-3.5 h-3.5 text-[var(--color-coral)]" />
                <span>Anrufen</span>
              </a>
              <a
                href="mailto:manu@firmenflow.de"
                className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Mail className="w-3.5 h-3.5 text-white/80" />
                <span>E-Mail</span>
              </a>
            </div>
          </div>
        </div>

        {/* Prominente 1-Klick-Weiche: Website-Einschätzung & 30-Min. Erstgespräch */}
        <div id="projektanfrage" className="contact-reveal max-w-4xl mx-auto space-y-10">
          <WebsiteCheckInquiry />

          {/* Optionale geführte 5-Schritte-Projektanfrage */}
          <div className="pt-2 text-center">
            {!showDetailedForm ? (
              <button
                type="button"
                onClick={() => setShowDetailedForm(true)}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-xs sm:text-sm font-semibold text-white/90 hover:text-white transition-all cursor-pointer backdrop-blur-md shadow-md active:scale-95"
              >
                <span>Du planst ein großes Projekt? Zur geführten 5-Schritte-Projektanfrage</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            ) : (
              <div className="space-y-6 pt-6 text-left animate-in fade-in duration-500">
                <div className="text-center">
                  <h4 className="text-xl sm:text-2xl font-display text-white mb-2">
                    Geführte Projektanfrage
                  </h4>
                  <p className="text-xs sm:text-sm text-white/70">
                    Definiere dein Vorhaben, deine Ziele und deinen Zeitrahmen in 5 Schritten.
                  </p>
                </div>
                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl">
                  <ProjectInquiry whatsappUrl={whatsappUrl} />
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

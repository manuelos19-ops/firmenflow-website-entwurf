"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { siteIdentity } from "@/config/site";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { WebsiteCheckInquiry } from "@/components/inquiry/WebsiteCheckInquiry";
import { ArrowRight } from "lucide-react";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { FirmenflowIcon } from "@/components/brand/FirmenflowIcon";
import { trackMeetergoClick, trackWhatsAppClick } from "@/lib/track-inquiry";

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
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
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

  return (
    <section 
      ref={containerRef} 
      id="kontakt" 
      className="relative pt-32 pb-36 md:pt-40 md:pb-44 bg-gradient-to-b from-transparent via-[var(--color-plum)] via-15% to-[var(--color-plum)] text-white overflow-hidden scroll-mt-24"
    >
      <Container className="relative z-20">
        {/* Section Header */}
        <div className="contact-reveal text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <span className="badge-eyebrow-dark mb-5">
            <BrandIcon variant="light" className="w-4 h-3.5" />
            <span>Persönlich mit Manu</span>
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display leading-[1.08] mb-5">
            Wo verliert dein Betrieb <br className="hidden sm:block" />
            <span className="font-editorial text-[var(--color-coral)]">aktuell online Kunden?</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            Finde es in wenigen Minuten heraus: Lass deine Website kostenlos und unverbindlich per Video prüfen – oder sprich direkt persönlich mit mir.
          </p>
        </div>

        {/* Quick Contact Bar: WhatsApp & 30 Min. Erstgespräch */}
        <div className="contact-reveal grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {/* WhatsApp Card */}
          <div className="double-bezel-outer-dark p-1.5 sm:p-2 rounded-[2.25rem] shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="double-bezel-inner-dark rounded-[calc(2.25rem-0.375rem)] p-6 sm:p-8 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center">
                    <WhatsAppIcon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full border border-emerald-400/20">
                    Schnellster Weg
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-sans text-white mb-2">Schnell via WhatsApp</h3>
                <p className="text-sm text-white/75 leading-relaxed mb-6">
                  Unkompliziert und direkt: Schreib mir eine kurze Nachricht mit deinen Fragen oder deinem Website-Link.
                </p>
              </div>
              
              {whatsappUrl ? (
                <MagneticButton>
                  <ButtonLink 
                    href={whatsappUrl} 
                    external={true}
                    variant="whatsapp"
                    onClick={() => trackWhatsAppClick("contact_section")}
                    className="w-full justify-center shadow-lg shadow-[#25D366]/25"
                  >
                    <WhatsAppIcon className="w-5 h-5 text-white mr-1 shrink-0" />
                    <span>WhatsApp an Manu</span>
                  </ButtonLink>
                </MagneticButton>
              ) : (
                <p className="text-xs text-white/50 italic">WhatsApp aktuell nicht konfiguriert</p>
              )}
            </div>
          </div>

          {/* 30 Min. Erstgespräch via meetergo Card */}
          <div className="double-bezel-outer-dark p-1.5 sm:p-2 rounded-[2.25rem] shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
            <div className="double-bezel-inner-dark rounded-[calc(2.25rem-0.375rem)] p-6 sm:p-8 flex flex-col justify-between h-full relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-[var(--color-coral)]/15 rounded-full blur-2xl pointer-events-none" />

              <div>
                {/* Status & Identität */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <FirmenflowIcon name="termin" size={44} decorative />
                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-[var(--color-coral)] bg-[var(--color-coral)]/10 px-2.5 py-0.5 rounded-full border border-[var(--color-coral)]/20">
                    30 Min. Live
                  </span>
                </div>

                <div className="flex items-center gap-3.5 mb-4">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/25 shadow-md">
                    <Image
                      src="/media/portraits/manu-contact-portrait.webp"
                      alt="Manuel Landeck"
                      fill
                      className="object-cover object-center"
                      sizes="60px"
                    />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white font-sans">Erstgespräch mit Manu</h4>
                    <p className="text-xs text-white/70 flex items-center gap-1">
                      <FirmenflowIcon name="telefon" size={16} decorative />
                      <span>Telefon oder Videocall</span>
                    </p>
                  </div>
                </div>

                <p className="text-sm text-white/75 leading-relaxed mb-6">
                  Wir sprechen direkt: Schnelle Bestandsaufnahme deines Betriebs und ehrliche Antworten auf deine Fragen.
                </p>
              </div>

              <div className="space-y-2.5">
                <a
                  href={siteIdentity.meetergoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackMeetergoClick("contact_section")}
                  className="inline-flex items-center justify-center gap-2.5 w-full py-3 px-5 rounded-full bg-[var(--color-coral)] hover:bg-[#e44d39] text-white font-bold text-sm shadow-md transition-all hover:scale-[1.01]"
                  style={{ color: "#ffffff" }}
                >
                  <FirmenflowIcon name="termin" size={20} decorative />
                  <span className="!text-white text-white">30 Min. Wunschtermin sichern</span>
                  <ArrowRight className="w-4 h-4 text-white shrink-0" />
                </a>

                <div className="flex items-center justify-center gap-4 text-xs text-white/60 pt-1">
                  <a href="tel:015567277155" className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
                    <FirmenflowIcon name="telefon" size={16} decorative />
                    <span>0155 67277155</span>
                  </a>
                  <span>•</span>
                  <a href="mailto:manu@firmenflow.de" className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
                    <FirmenflowIcon name="email" size={16} decorative />
                    <span>manu@firmenflow.de</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DAS HAUPT-FORMULAR: Kostenlose Video-Prüfung */}
        <div id="projektanfrage" className="contact-reveal max-w-4xl mx-auto space-y-6 scroll-mt-28">
          <div className="flex items-center gap-3">
            <FirmenflowIcon name="video-website-check" size={56} decorative />
            <FirmenflowIcon name="formular" size={40} decorative />
          </div>
          <div className="double-bezel-outer-dark p-1 sm:p-1.5 rounded-[2.25rem] sm:rounded-[2.75rem] shadow-2xl">
            <WebsiteCheckInquiry />
          </div>

          {/* TEASER-BANNER ZUR DEDIZIERTEN PROJEKTANFRAGE (/anfrage) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left transition-colors hover:bg-white/[0.07]">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-coral)]">
                <FirmenflowIcon name="formular" size={20} decorative />
                <span>Planst du einen Relaunch oder eine komplette Neu-Entwicklung?</span>
              </div>
              <p className="text-xs sm:text-sm text-white/75 max-w-xl">
                Erfasse deine Anforderungen, Ziele und Wunsch-Leistungen in 5 Schritten – ideal für präzise Budget- und Zeitplan-Einschätzungen.
              </p>
            </div>

            <Link
              href="/anfrage"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm shrink-0 transition-all hover:scale-105 active:scale-95"
            >
              <span>Zur geführten Projektanfrage</span>
              <ArrowRight className="w-3.5 h-3.5 text-[var(--color-coral)]" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

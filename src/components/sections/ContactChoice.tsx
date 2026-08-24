"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { homeContent } from "@/content/site";
import { portraitAssets } from "@/content/assets";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ProjectInquiry } from "@/components/inquiry/ProjectInquiry";
import { MessageCircle, Mail, MapPin, Clock, Sparkles } from "lucide-react";

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
      className="relative pt-28 pb-36 md:pt-36 md:pb-44 bg-[var(--color-plum)] text-white overflow-hidden"
    >
      {/* Wave Transition at Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-12 md:h-20 fill-[var(--color-paper)]"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-51.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>

      <Container className="relative z-20">
        {/* Section Header */}
        <div className="contact-reveal text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider text-[var(--color-coral)] mb-4 border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            {contact.eyebrow}
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
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mb-5">
                <MessageCircle className="w-6 h-6" />
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
                  variant="primary"
                  className="w-full justify-center bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                >
                  WhatsApp öffnen
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
              Projekt in 2 Minuten anfragen
            </h3>
            <p className="text-sm text-white/70">
              Unverbindlich und geführt: Wähle deinen Projekttyp und deine Ziele.
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

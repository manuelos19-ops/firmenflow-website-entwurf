"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { homeContent } from "@/content/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { cn } from "@/lib/cn";
import { Star, MapPin, Search, QrCode, MessageSquareCheck, TrendingUp, ShieldCheck, CheckCircle, ArrowRight } from "lucide-react";

export function GoogleBusinessPilot() {
  const containerRef = useRef<HTMLElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isReducedMotion) return;

      gsap.fromTo(
        mockupRef.current,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mockupRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      const pillars = pillarsRef.current?.querySelectorAll(".pillar-card");
      if (pillars?.length) {
        gsap.fromTo(
          pillars,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: pillarsRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section 
      ref={containerRef}
      id="google-pilot"
      className="relative bg-[var(--color-plum)] text-white pt-32 pb-28 md:pt-48 md:pb-36 overflow-hidden"
    >
      {/* Wave divider at top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-12 md:h-20 fill-[var(--color-paper)]"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>

      <Container className="relative z-20">
        {/* Intro */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 md:mb-20">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider text-[var(--color-coral)] mb-6 border border-white/10">
            <Search className="w-3.5 h-3.5" />
            {homeContent.pilot.eyebrow}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display leading-[1.05] mb-6">
            Nicht nur gefunden werden. <br />
            <span className="font-editorial text-[var(--color-coral)]">Auch richtig wirken.</span>
          </h2>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
            {homeContent.pilot.body}
          </p>
        </div>

        {/* Visual Google Business Mockup Card */}
        <div 
          ref={mockupRef}
          className="max-w-4xl mx-auto bg-white text-[var(--color-ink)] rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl mb-16 md:mb-20 border border-white/20"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[var(--color-coral)] to-[var(--color-plum)] text-white flex items-center justify-center font-display font-bold text-2xl shrink-0 shadow-md">
                G
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-bold font-sans text-[var(--color-ink)]">Dein Betrieb auf Google Maps</h3>
                  <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </span>
                </div>
                <p className="text-sm text-[var(--color-muted)] flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[var(--color-coral)]" />
                  Wesel &amp; Niederrhein · Verifiziertes Unternehmensprofil
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl shrink-0">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-sm font-bold text-amber-900 ml-1.5">5,0 Sterne</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-emerald-800 font-medium">Sichtbarkeit</p>
                <p className="text-sm font-bold text-emerald-950">+140% lokale Aufrufe</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                <QrCode className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-blue-800 font-medium">Kunden-Feedback</p>
                <p className="text-sm font-bold text-blue-950">Echte QR-Karten</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
                <MessageSquareCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-purple-800 font-medium">Antwort-Quote</p>
                <p className="text-sm font-bold text-purple-950">100% persönlich betreut</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-xs sm:text-sm text-gray-700 italic">
            „Durch die Optimierung unseres Google-Profils und die QR-Karten rufen heute jede Woche neue Kunden direkt aus der Umgebung an.“
          </div>
        </div>

        {/* 3 Action Pillars */}
        <div ref={pillarsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          <div className="pillar-card p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-coral)]/20 text-[var(--color-coral)] flex items-center justify-center mb-6">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-sans text-white mb-3">1. Audit &amp; Profil-Schliff</h3>
              <p className="text-sm text-white/75 leading-relaxed">
                Prüfung aller Angaben, Kategorien, Fotos und Wettbewerber. Beseitigung typischer Fehler, die Sichtbarkeit kosten.
              </p>
            </div>
          </div>

          <div className="pillar-card p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center mb-6">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-sans text-white mb-3">2. Echter Bewertungs-Flow</h3>
              <p className="text-sm text-white/75 leading-relaxed">
                QR-Code Aufsteller und Vorlagen für dein Ladenlokal oder Büro – damit zufriedene Kunden mühelos 5 Sterne hinterlassen.
              </p>
            </div>
          </div>

          <div className="pillar-card p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center mb-6">
                <MessageSquareCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-sans text-white mb-3">3. Antwort- &amp; Voice-Service</h3>
              <p className="text-sm text-white/75 leading-relaxed">
                Persönliche, professionelle Reaktionen auf alle Bewertungen und monatliche Auswertung, was Kunden besonders schätzen.
              </p>
            </div>
          </div>
        </div>

        {/* CTA & Disclaimer */}
        <div className="flex flex-col items-center space-y-8">
          <MagneticButton>
            <ButtonLink 
              href="#projektanfrage" 
              variant="primary"
              size="lg"
              className="shadow-xl shadow-[var(--color-coral)]/30"
            >
              {homeContent.pilot.cta}
            </ButtonLink>
          </MagneticButton>
          
          <p className="text-xs md:text-sm text-white/50 max-w-lg text-center leading-relaxed">
            Streng richtlinienkonform nach Google-Richtlinien. Keine gekauften Bewertungen, keine gefälschten Stimmen, keine Ranking-Garantien.
          </p>
        </div>
      </Container>
    </section>
  );
}

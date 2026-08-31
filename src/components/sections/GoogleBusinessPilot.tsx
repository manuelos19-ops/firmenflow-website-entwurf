"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { homeContent } from "@/content/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { Star, MapPin, Search, QrCode, MessageSquareCheck, TrendingUp, CheckCircle } from "lucide-react";

export function GoogleBusinessPilot() {
  const containerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      
      if (isReducedMotion) {
        gsap.set(overlayRef.current, { clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set([bodyRef.current, mockupRef.current], { opacity: 1, y: 0, scale: 1 });
        const pillars = pillarsRef.current?.querySelectorAll(".pillar-card");
        if (pillars) gsap.set(pillars, { opacity: 1, y: 0 });
        return;
      }

      const pillars = pillarsRef.current?.querySelectorAll(".pillar-card");

      // Pinned Scroll-Stop Animation with Choreographed Inking & Element Reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=75%",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      // 1. Text Inking across the headline
      tl.fromTo(
        overlayRef.current,
        { clipPath: "inset(0% 100% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", ease: "none", duration: 0.45 }
      )
      // 2. Body text fade in
      .fromTo(
        bodyRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" },
        "-=0.1"
      )
      // 3. Mockup card scale in
      .fromTo(
        mockupRef.current,
        { opacity: 0, y: 40, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" },
        "-=0.1"
      );

      // 4. 3 Action pillars stagger in
      if (pillars?.length) {
        tl.fromTo(
          pillars,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.3, ease: "power2.out" },
          "-=0.15"
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section 
      ref={containerRef}
      id="google-pilot"
      className="relative min-h-screen flex flex-col justify-center bg-gradient-to-b from-transparent via-[var(--color-plum)] via-15% to-[var(--color-plum)] text-white pt-36 pb-28 md:pt-44 md:pb-36 overflow-hidden"
    >
      <Container className="relative z-20 my-auto">
        {/* Intro with Stop-Scroll Text Inking */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-sm sm:text-base font-bold text-[var(--color-coral)] mb-6 border border-white/20 shadow-md backdrop-blur-md">
            <Search className="w-4 h-4" />
            {homeContent.pilot.eyebrow}
          </span>

          {/* Huge Statement Title with Scroll-Fill Inking */}
          <h2 className="relative text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display leading-[1.06] mb-5 text-white/15">
            <span className="sr-only">Gefunden werden und direkt Vertrauen aufbauen.</span>
            <span aria-hidden="true" className="select-none">
              Gefunden werden und <br className="hidden sm:block" />
              <span className="font-editorial italic">direkt Vertrauen aufbauen.</span>
            </span>
            
            <span
              ref={overlayRef}
              className="absolute inset-0 text-white select-none pointer-events-none"
              aria-hidden="true"
            >
              Gefunden werden und <br className="hidden sm:block" />
              <span className="font-editorial text-[var(--color-coral)] italic">direkt Vertrauen aufbauen.</span>
            </span>
          </h2>

          <p ref={bodyRef} className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
            {homeContent.pilot.body}
          </p>
        </div>

        {/* Visual Google Business Mockup Card */}
        <div 
          ref={mockupRef}
          className="max-w-4xl mx-auto bg-white text-[var(--color-ink)] rounded-3xl p-5 sm:p-7 md:p-8 shadow-2xl mb-8 md:mb-12 border border-white/20"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[var(--color-coral)] to-[var(--color-plum)] text-white flex items-center justify-center font-display font-bold text-xl shrink-0 shadow-md">
                G
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold font-sans text-[var(--color-ink)]">Dein Betrieb auf Google Maps</h3>
                  <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0">
                    <CheckCircle className="w-3 h-3" />
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--color-muted)] flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[var(--color-coral)]" />
                  Wesel &amp; Niederrhein · Verifiziertes Unternehmensprofil
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-2xl shrink-0">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-bold text-amber-900 ml-1.5">5,0 Sterne</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center gap-3">
              <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-[11px] text-emerald-800 font-medium">Sichtbarkeit</p>
                <p className="text-xs sm:text-sm font-bold text-emerald-950">+140% lokale Aufrufe</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-100 flex items-center gap-3">
              <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                <QrCode className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-[11px] text-blue-800 font-medium">Kunden-Feedback</p>
                <p className="text-xs sm:text-sm font-bold text-blue-950">Echte QR-Karten</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-100 flex items-center gap-3">
              <div className="w-7 h-7 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
                <MessageSquareCheck className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-[11px] text-purple-800 font-medium">Antwort-Quote</p>
                <p className="text-xs sm:text-sm font-bold text-purple-950">100% persönlich</p>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-xs text-gray-700 italic">
            „Durch die Optimierung unseres Google-Profils und die QR-Karten rufen heute jede Woche neue Kunden direkt aus der Umgebung an.“
          </div>
        </div>

        {/* 3 Action Pillars */}
        <div ref={pillarsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto mb-10">
          <div className="pillar-card p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col justify-between transition-all duration-300 ease-[var(--ease-out)] hover:-translate-y-1.5 hover:scale-[1.02] hover:bg-white/15 hover:border-white/30 hover:shadow-xl active:scale-[0.985] cursor-pointer will-change-transform">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[var(--color-coral)]/20 text-[var(--color-coral)] flex items-center justify-center mb-4">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-sans text-white mb-2">1. Audit &amp; Profil-Schliff</h3>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                Prüfung aller Angaben, Kategorien, Fotos und Wettbewerber. Beseitigung typischer Fehler, die Sichtbarkeit kosten.
              </p>
            </div>
          </div>

          <div className="pillar-card p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col justify-between transition-all duration-300 ease-[var(--ease-out)] hover:-translate-y-1.5 hover:scale-[1.02] hover:bg-white/15 hover:border-white/30 hover:shadow-xl active:scale-[0.985] cursor-pointer will-change-transform">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center mb-4">
                <QrCode className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-sans text-white mb-2">2. Echter Bewertungs-Flow</h3>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                QR-Code Aufsteller und Vorlagen für dein Geschäft – damit zufriedene Kunden mühelos 5 Sterne hinterlassen.
              </p>
            </div>
          </div>

          <div className="pillar-card p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col justify-between transition-all duration-300 ease-[var(--ease-out)] hover:-translate-y-1.5 hover:scale-[1.02] hover:bg-white/15 hover:border-white/30 hover:shadow-xl active:scale-[0.985] cursor-pointer will-change-transform">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center mb-4">
                <MessageSquareCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-sans text-white mb-2">3. Antwort- &amp; Voice-Service</h3>
              <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                Persönliche, professionelle Reaktionen auf alle Bewertungen und monatliche Auswertung der Kundenstimmen.
              </p>
            </div>
          </div>
        </div>

        {/* CTA & Disclaimer */}
        <div className="flex flex-col items-center space-y-4">
          <MagneticButton>
            <ButtonLink 
              href="#projektanfrage" 
              variant="primary"
              size="lg"
              className="shadow-xl shadow-[var(--color-coral)]/30 text-sm sm:text-base px-7 py-3.5"
            >
              {homeContent.pilot.cta}
            </ButtonLink>
          </MagneticButton>
          
          <p className="text-xs text-white/50 max-w-lg text-center leading-relaxed">
            Streng richtlinienkonform nach Google-Richtlinien. Keine gekauften Bewertungen, keine gefälschten Stimmen, keine Ranking-Garantien.
          </p>
        </div>
      </Container>
    </section>
  );
}

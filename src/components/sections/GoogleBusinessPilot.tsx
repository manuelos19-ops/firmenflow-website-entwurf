"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { homeContent } from "@/content/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { FirmenflowIcon } from "@/components/brand/FirmenflowIcon";

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

      // Snappy Pinned Scroll-Stop Animation: no dead scroll, releases immediately when all elements are revealed
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=32%",
          pin: true,
          scrub: 0.35,
          anticipatePin: 1,
        },
      });

      // 1. Text Inking across the headline
      tl.fromTo(
        overlayRef.current,
        { clipPath: "inset(0% 100% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", ease: "none", duration: 0.5 }
      )
      // 2. Body text fade in
      .fromTo(
        bodyRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
        "-=0.2"
      )
      // 3. Mockup card scale in
      .fromTo(
        mockupRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power2.out" },
        "-=0.15"
      );

      // 4. 3 Action pillars stagger in
      if (pillars?.length) {
        tl.fromTo(
          pillars,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.35, ease: "power2.out" },
          "-=0.2"
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
          <div className="badge-eyebrow-dark mb-6">
            <FirmenflowIcon name="unternehmensprofil" size={20} decorative />
            <span>{homeContent.pilot.eyebrow}</span>
          </div>

          {/* Huge Statement Title with Scroll-Fill Inking */}
          <h2 className="relative text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display leading-[1.06] mb-5 text-white/15">
            <span className="sr-only">Gefunden werden ist das eine. Vertrauen das andere.</span>
            <span aria-hidden="true" className="select-none">
              Gefunden werden ist das eine. <br className="hidden sm:block" />
              <span className="font-editorial italic">Vertrauen das andere.</span>
            </span>

            <span
              ref={overlayRef}
              className="absolute inset-0 text-white select-none pointer-events-none"
              aria-hidden="true"
            >
              Gefunden werden ist das eine. <br className="hidden sm:block" />
              <span className="font-editorial text-[var(--color-coral)] italic">Vertrauen das andere.</span>
            </span>
          </h2>

          <p ref={bodyRef} className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
            {homeContent.pilot.body}
          </p>
        </div>

        {/* Visual Google Business Mockup Card */}
        <div 
          ref={mockupRef}
          className="max-w-4xl mx-auto double-bezel-outer-dark p-2 rounded-[2.5rem] mb-8 md:mb-12 shadow-2xl"
        >
          <div className="double-bezel-inner rounded-[calc(2.5rem-0.5rem)] bg-white text-[var(--color-ink)] p-5 sm:p-7 md:p-8 border border-white/40 shadow-inner">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3.5">
                <FirmenflowIcon name="unternehmensprofil" size={48} decorative />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-bold font-sans text-[var(--color-ink)]">Dein optimierter Brancheneintrag</h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold shrink-0">
                      Aktiv gepflegt
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--color-muted)] flex items-center gap-1.5 mt-0.5">
                    <FirmenflowIcon name="unternehmensprofil" size={20} decorative />
                    Wesel &amp; Niederrhein · Vollständiges Unternehmensprofil
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-2xl shrink-0">
                <FirmenflowIcon name="mehr-bewertungen" size={24} decorative />
                <span className="text-xs sm:text-sm font-bold text-amber-900 ml-1.5">5,0 Sterne</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center gap-3">
                <FirmenflowIcon name="profil-einrichten" size={36} decorative />
                <div>
                  <p className="text-[11px] text-emerald-800 font-medium">Lokale Sichtbarkeit</p>
                  <p className="text-xs sm:text-sm font-bold text-emerald-950">Vollständiges Maps-Profil</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-100 flex items-center gap-3">
                <FirmenflowIcon name="bewertungen-beantworten" size={36} decorative />
                <div>
                  <p className="text-[11px] text-blue-800 font-medium">Bewertungen</p>
                  <p className="text-xs sm:text-sm font-bold text-blue-950">Antwort in deinem Ton</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-100 flex items-center gap-3">
                <FirmenflowIcon name="monatsreport" size={36} decorative />
                <div>
                  <p className="text-[11px] text-purple-800 font-medium">Auswertung</p>
                  <p className="text-xs sm:text-sm font-bold text-purple-950">Monatsreport</p>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-xs text-gray-700 italic">
              „Google-Bewertungen sind mehr als Marketing – sie sind dein direkter Blick in die echte Zufriedenheit deiner Kunden.“
            </div>
          </div>
        </div>

        {/* 3 Action Pillars */}
        <div ref={pillarsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto mb-10">
          <div className="pillar-card double-bezel-outer-dark p-1 rounded-[2rem] hover:-translate-y-1.5 hover:scale-[1.01] transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]">
            <div className="double-bezel-inner-dark rounded-[calc(2rem-0.25rem)] p-6 flex flex-col justify-between h-full bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/20">
              <div>
                <FirmenflowIcon name="profil-einrichten" size={56} decorative className="mb-4" />
                <h3 className="text-lg font-bold font-sans text-white mb-2">1. Profil einrichten und aufräumen</h3>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                  Richtige Kategorien, vollständige Angaben, echte Fotos aus deinem Betrieb. Damit Google dein Angebot und deinen Standort korrekt einordnen kann.
                </p>
              </div>
            </div>
          </div>

          <div className="pillar-card double-bezel-outer-dark p-1 rounded-[2rem] hover:-translate-y-1.5 hover:scale-[1.01] transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]">
            <div className="double-bezel-inner-dark rounded-[calc(2rem-0.25rem)] p-6 flex flex-col justify-between h-full bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/20">
              <div>
                <FirmenflowIcon name="bewertungen-beantworten" size={56} decorative className="mb-4" />
                <h3 className="text-lg font-bold font-sans text-white mb-2">2. Bewertungen beantworten</h3>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                  Jede neue Bewertung bekommt eine Antwort in deinem Ton – auch die unangenehmen. Dazu ein Ablauf, mit dem zufriedene Kunden überhaupt erst eine schreiben.
                </p>
              </div>
            </div>
          </div>

          <div className="pillar-card double-bezel-outer-dark p-1 rounded-[2rem] hover:-translate-y-1.5 hover:scale-[1.01] transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]">
            <div className="double-bezel-inner-dark rounded-[calc(2rem-0.25rem)] p-6 flex flex-col justify-between h-full bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/20">
              <div>
                <FirmenflowIcon name="handlungsempfehlung" size={56} decorative className="mb-4" />
                <h3 className="text-lg font-bold font-sans text-white mb-2">3. Feedback nutzen &amp; Betrieb verbessern</h3>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                  Einmal im Monat werte ich dein Kundenfeedback aus: Welche Kritikpunkte und Wünsche auftauchen, woraus du Learnings für deinen Betrieb ziehst und wo du deine Mitarbeiter gezielt schulen kannst.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA & More Info Link */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
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

            <ButtonLink
              href="/lokalpraesenz-360"
              variant="ghost"
              size="lg"
              className="text-white hover:text-[var(--color-coral)] hover:bg-white/10 text-sm sm:text-base border border-white/20 px-6 py-3.5"
            >
              <span>Alle Details ansehen</span>
            </ButtonLink>
          </div>
          
          <p className="text-xs text-white/50 max-w-xl text-center leading-relaxed">
            Streng richtlinienkonform nach offiziellen Richtlinien. Keine gekauften Bewertungen, keine Ranking-Garantien.<br />
            <span className="text-[11px] opacity-75">Hinweis: Google, Google Maps und Google Unternehmensprofil sind Marken der Google LLC. Firmenflow ist ein unabhängiger Dienstleister.</span>
          </p>
        </div>
      </Container>
    </section>
  );
}

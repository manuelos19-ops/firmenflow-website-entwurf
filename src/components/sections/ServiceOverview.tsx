"use client";

import { useRef } from "react";
import { homeContent } from "@/content/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { Check, Smartphone, Zap, ShieldCheck, Search, Layout, Sparkles } from "lucide-react";

export function ServiceOverview() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isReduced) return;

      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const targetRotation = index % 2 === 0 ? -1.5 : 1.5;
        const startRotation = index % 2 === 0 ? -3.5 : 3.5;

        // Snappy, early reveal so cards are instantly visible even on fast scrolling
        gsap.fromTo(
          card,
          { opacity: 0.2, y: 30, rotation: startRotation },
          {
            opacity: 1,
            y: 0,
            rotation: targetRotation,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section 
      ref={containerRef} 
      id="leistungen" 
      className="py-24 md:py-36 bg-[var(--color-paper)] relative overflow-hidden"
    >
      <Container>
        <div className="mb-14 md:mb-20 max-w-3xl">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-coral)]/10 text-xs font-bold uppercase tracking-wider text-[var(--color-coral)] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Klarer Fokus · Kein Agentur-Schnickschnack</span>
          </span>
          <h2 className="text-4xl md:text-6xl font-display text-[var(--color-ink)] leading-tight mb-4">
            Zwei Wege zur starken Lokalpräsenz.
          </h2>
          <p className="text-base md:text-lg text-[var(--color-muted)] leading-relaxed">
            Ob Neuaufbau oder kontrollierter Relaunch: Jeder Betrieb erhält eine maßgeschneiderte Lösung, die Interessenten in zahlende Kunden verwandelt.
          </p>
        </div>

        <div className="flex flex-col gap-12 md:gap-18 relative max-w-5xl mx-auto">
          {/* Card 1: Neue Website */}
          <div
            ref={(el) => {
              cardsRef.current[0] = el;
            }}
            className={cn(
              "relative bg-white rounded-3xl p-8 sm:p-10 md:p-12 shadow-xl border border-[var(--color-line)]",
              "transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:rotate-0",
              "w-full md:w-[94%] self-start md:-rotate-1.5 overflow-hidden"
            )}
          >
            {/* Visual Browser Mockup Bar */}
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-rose-400" />
                <span className="w-3.5 h-3.5 rounded-full bg-amber-400" />
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-400" />
              </div>
              <div className="px-4 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-xs font-mono text-gray-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                https://dein-betrieb.de
              </div>
              <span className="text-xs font-bold text-[var(--color-coral)] bg-[var(--color-coral)]/10 px-3 py-1 rounded-full">
                Neuaufbau
              </span>
            </div>

            {/* Visual Feature Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              <div className="p-3.5 rounded-2xl bg-[var(--color-paper)] border border-[var(--color-line)]/40 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[var(--color-coral)]/10 text-[var(--color-coral)] flex items-center justify-center shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[var(--color-muted)] font-medium">Layout</p>
                  <p className="text-sm font-bold text-[var(--color-ink)]">Mobile-First</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[var(--color-paper)] border border-[var(--color-line)]/40 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[var(--color-muted)] font-medium">Ladezeit</p>
                  <p className="text-sm font-bold text-[var(--color-ink)]">&lt; 0.5s Turbo</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[var(--color-paper)] border border-[var(--color-line)]/40 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[var(--color-plum)]/10 text-[var(--color-plum)] flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[var(--color-muted)] font-medium">Ziel</p>
                  <p className="text-sm font-bold text-[var(--color-ink)]">Mehr Anfragen</p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display text-[var(--color-ink)] mb-4">
              {homeContent.services[0].title}
            </h3>
            <p className="text-base sm:text-lg text-[var(--color-muted)] mb-8 leading-relaxed">
              {homeContent.services[0].body}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-gray-100">
              {homeContent.services[0].points.map((point) => (
                <div key={point} className="flex items-center gap-2 text-sm font-semibold text-[var(--color-ink)]">
                  <div className="w-5 h-5 rounded-full bg-[var(--color-coral)] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Relaunch ohne Blindflug */}
          <div
            ref={(el) => {
              cardsRef.current[1] = el;
            }}
            className={cn(
              "relative bg-white rounded-3xl p-8 sm:p-10 md:p-12 shadow-xl border border-[var(--color-line)]",
              "transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:rotate-0",
              "w-full md:w-[94%] self-end md:rotate-1.5 overflow-hidden"
            )}
          >
            {/* Visual Browser Mockup Bar */}
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-rose-400" />
                <span className="w-3.5 h-3.5 rounded-full bg-amber-400" />
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-400" />
              </div>
              <div className="px-4 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-xs font-mono text-gray-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                https://dein-betrieb.de/relaunch-v2
              </div>
              <span className="text-xs font-bold text-[var(--color-plum)] bg-[var(--color-plum)]/10 px-3 py-1 rounded-full">
                Relaunch
              </span>
            </div>

            {/* Visual Feature Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              <div className="p-3.5 rounded-2xl bg-[var(--color-paper)] border border-[var(--color-line)]/40 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[var(--color-plum)]/10 text-[var(--color-plum)] flex items-center justify-center shrink-0">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[var(--color-muted)] font-medium">Audit</p>
                  <p className="text-sm font-bold text-[var(--color-ink)]">Bestands-Prüfung</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[var(--color-paper)] border border-[var(--color-line)]/40 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[var(--color-muted)] font-medium">Sicherheit</p>
                  <p className="text-sm font-bold text-[var(--color-ink)]">SEO-Rankings safe</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[var(--color-paper)] border border-[var(--color-line)]/40 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Layout className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[var(--color-muted)] font-medium">Struktur</p>
                  <p className="text-sm font-bold text-[var(--color-ink)]">Klare Führung</p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display text-[var(--color-ink)] mb-4">
              {homeContent.services[1].title}
            </h3>
            <p className="text-base sm:text-lg text-[var(--color-muted)] mb-8 leading-relaxed">
              {homeContent.services[1].body}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-gray-100">
              {homeContent.services[1].points.map((point) => (
                <div key={point} className="flex items-center gap-2 text-sm font-semibold text-[var(--color-ink)]">
                  <div className="w-5 h-5 rounded-full bg-[var(--color-plum)] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

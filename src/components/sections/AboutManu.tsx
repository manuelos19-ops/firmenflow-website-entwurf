"use client";

import { useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { homeContent } from "@/content/site";
import { Sparkles, MapPin, ShieldCheck, HeartHandshake, Coffee } from "lucide-react";

export function AboutManu() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { about } = homeContent;

  return (
    <section 
      ref={containerRef} 
      id="ueber-manu"
      className="py-24 md:py-36 overflow-hidden bg-transparent relative"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Authentic Nature Photo Column Left */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-md h-[460px] sm:h-[520px] md:h-[560px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
              <Image
                src="/media/portraits/manu-nature-seated.webp"
                alt="Manu Landeck – Persönlicher Webdesigner aus Wesel"
                fill
                priority
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 500px"
              />

              {/* Bottom Subtle Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent opacity-80" />

              {/* In-Photo Badge */}
              <div className="absolute bottom-5 left-5 right-5 z-10 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/60 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-[var(--color-ink)] leading-tight">
                    Manu Landeck
                  </h4>
                  <p className="text-xs text-[var(--color-coral)] font-semibold mt-0.5">
                    Gründer von Firmenflow
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-medium text-[var(--color-muted)] bg-[var(--color-paper)] px-2.5 py-1 rounded-full border border-[var(--color-line)]">
                  <MapPin className="w-3 h-3 text-[var(--color-coral)]" />
                  <span>Wesel &amp; Niederrhein</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Text Content Column Right */}
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-coral)]/10 border border-[var(--color-coral)]/20 text-sm sm:text-base font-bold text-[var(--color-coral)] mb-5 shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span>{about.eyebrow}</span>
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-[var(--color-ink)] font-bold leading-[1.15] mb-6">
              Websites mit <br />
              <span className="text-[var(--color-coral)] font-editorial italic font-normal">persönlicher Verantwortung.</span>
            </h2>

            <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed mb-8">
              {about.body}
            </p>

            {/* 3 Personal Principles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[var(--color-line)]">
              <div className="p-4 rounded-2xl bg-white border border-[var(--color-line)]/60 shadow-sm transition-all duration-300 ease-[var(--ease-out)] hover:-translate-y-1.5 hover:scale-[1.03] hover:shadow-md hover:border-[var(--color-coral)]/30 active:scale-[0.98] cursor-pointer will-change-transform">
                <div className="w-8 h-8 rounded-xl bg-[var(--color-coral)]/10 text-[var(--color-coral)] flex items-center justify-center mb-3">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-[var(--color-ink)] mb-1">
                  Auf Augenhöhe
                </h4>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  Kein Agentur-Fachchinesisch, sondern ehrliche Gespräche.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[var(--color-line)]/60 shadow-sm transition-all duration-300 ease-[var(--ease-out)] hover:-translate-y-1.5 hover:scale-[1.03] hover:shadow-md hover:border-[var(--color-plum)]/30 active:scale-[0.98] cursor-pointer will-change-transform">
                <div className="w-8 h-8 rounded-xl bg-[var(--color-plum)]/10 text-[var(--color-plum)] flex items-center justify-center mb-3">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-[var(--color-ink)] mb-1">
                  100% Verlässlich
                </h4>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  Feste Absprachen, pünktliche Umsetzung und sauberer Code.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[var(--color-line)]/60 shadow-sm transition-all duration-300 ease-[var(--ease-out)] hover:-translate-y-1.5 hover:scale-[1.03] hover:shadow-md hover:border-emerald-200 active:scale-[0.98] cursor-pointer will-change-transform">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                  <Coffee className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-[var(--color-ink)] mb-1">
                  Vor Ort da
                </h4>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  Aus Wesel, für den Niederrhein und persönlich erreichbar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

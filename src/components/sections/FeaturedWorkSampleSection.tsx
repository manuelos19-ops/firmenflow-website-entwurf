"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { FirmenflowIcon } from "@/components/brand/FirmenflowIcon";
import { ArrowRight } from "lucide-react";

export function FeaturedWorkSampleSection() {
  return (
    <section 
      id="arbeitsprobe" 
      className="py-16 sm:py-20 md:py-24 bg-transparent border-b border-[var(--color-line)]/50 scroll-mt-24"
    >
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="badge-eyebrow mb-4">
            <BrandIcon className="w-3.5 h-3" />
            <span>Greifbare Arbeitsprobe</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[var(--color-ink)] leading-tight mb-4">
            Schau dir an, wie ich arbeite.
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed max-w-2xl mx-auto">
            An dieser Arbeitsprobe siehst du, wie ich Leistungen verständlich strukturiere, Kontaktwege verkürze und einen Betrieb auf dem Smartphone professionell präsentiere.
          </p>
        </div>

        {/* Featured Card */}
        <div className="max-w-5xl mx-auto double-bezel-outer p-1.5 sm:p-2 rounded-[2.5rem] bg-black/[0.03] border border-black/[0.06] shadow-xl">
          <div className="double-bezel-inner rounded-[calc(2.5rem-0.5rem)] p-6 sm:p-10 md:p-12 bg-white border border-[var(--color-line)]/60">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Phone Mockup / Image Column */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border-4 border-stone-800 bg-stone-900">
                  <Image
                    src="/media/projects/eiscafe-orrico-phone.webp"
                    alt="Smartphone-Ansicht der Website Eiscafé Orrico"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 280px, 320px"
                  />
                  <div className="absolute inset-0 ring-1 ring-black/10 rounded-3xl pointer-events-none" />
                </div>
              </div>

              {/* Details Column */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-3">
                    <span className="px-3 py-1 text-xs font-bold bg-emerald-100 text-emerald-800 rounded-full inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live-Arbeitsprobe · Öffentlich erreichbar
                    </span>
                    <span className="text-xs text-[var(--color-muted)] font-medium">
                      Keine erfundene Fallstudie
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-[var(--color-ink)] leading-snug">
                    Eiscafé Orrico
                  </h3>
                  <p className="text-sm text-[var(--color-muted)] flex items-center gap-1.5 mt-1">
                    <FirmenflowIcon name="unternehmensprofil" size={18} decorative className="shrink-0" />
                    <span>Hamminkeln &amp; Niederrhein · Gastronomie &amp; Café</span>
                  </p>
                </div>

                <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
                  Ein echter, öffentlich zugänglicher Webauftritt für ein beliebtes regionales Eiscafé. Gebaut für Gäste am Smartphone, die schnell Speisekarte, Sorten oder Öffnungszeiten nachschauen wollen.
                </p>

                {/* Measurable & Verifiable Highlights */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <FirmenflowIcon name="mobile-first" size={32} decorative className="shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-[var(--color-ink)]">Mobil-first für echte Gäste</p>
                      <p className="text-xs text-[var(--color-muted)]">Digitale Karte, Eissorten und saisonale Highlights direkt mit dem Daumen erreichbar.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FirmenflowIcon name="ladezeit-performance" size={32} decorative className="shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-[var(--color-ink)]">Schnelle Ladezeit ohne Ballast</p>
                      <p className="text-xs text-[var(--color-muted)]">Moderne Web-Technik für blitzschnelle Ladezeiten auch im mobilen Mobilfunknetz vor Ort.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FirmenflowIcon name="unternehmensprofil" size={32} decorative className="shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-[var(--color-ink)]">Verlässliche Angaben</p>
                      <p className="text-xs text-[var(--color-muted)]">Adresse, Öffnungszeiten und Anbindung an Google Maps stimmen exakt überein.</p>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link
                    href="/projekte/eiscafe-orrico"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--color-coral)] hover:bg-[var(--color-coral-hover)] text-white font-bold text-sm shadow-md transition-all active:scale-95 text-center"
                  >
                    <span>Umsetzung im Detail</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="https://eiscafe-orrico.de/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] hover:bg-white text-[var(--color-ink)] font-semibold text-sm transition-all shadow-sm active:scale-95 text-center"
                  >
                    <span>Live-Website öffnen</span>
                    <FirmenflowIcon name="externer-link" size={16} decorative />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

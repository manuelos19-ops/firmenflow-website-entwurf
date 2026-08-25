"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { homeContent } from "@/content/site";
import { cn } from "@/lib/cn";
import { PhoneCall, Milestone, CheckCircle2, MapPin, Sparkles, ShieldCheck } from "lucide-react";

const bentoItems = [
  {
    title: "Persönlich erreichbar",
    desc: "Direkter Draht per Telefon & WhatsApp. Keine Warteschleifen, keine anonymen Agentur-Tickets.",
    icon: PhoneCall,
    gradient: "from-[var(--color-coral)]/20 via-[var(--color-coral)]/5 to-transparent",
    border: "border-[var(--color-coral)]/30 hover:border-[var(--color-coral)]",
    iconBg: "bg-[var(--color-coral)]/10 text-[var(--color-coral)]",
  },
  {
    title: "Klare nächste Schritte",
    desc: "Transparenter Fahrplan vom Kennenlernen über das Design bis zum reibungslosen Go-Live.",
    icon: Milestone,
    gradient: "from-[var(--color-plum)]/20 via-[var(--color-plum)]/5 to-transparent",
    border: "border-[var(--color-plum)]/30 hover:border-[var(--color-plum)]",
    iconBg: "bg-[var(--color-plum)]/10 text-[var(--color-plum)]",
  },
  {
    title: "Ehrliche Einschätzung",
    desc: "Kein technisches Kauderwelsch, kein unnötiges Upselling – nur was deinem Betrieb wirklich hilft.",
    icon: CheckCircle2,
    gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    border: "border-emerald-500/30 hover:border-emerald-500",
    iconBg: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Nah an Wesel & Niederrhein",
    desc: "Vor Ort am Niederrhein verwurzelt. Wir sprechen die gleiche Sprache wie deine Kunden.",
    icon: MapPin,
    gradient: "from-violet-500/20 via-violet-500/5 to-transparent",
    border: "border-violet-500/30 hover:border-violet-500",
    iconBg: "bg-violet-100 text-violet-700",
  },
];

export function DirectWithManu() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (isReducedMotion) return;

      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 25, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section 
      ref={containerRef}
      id="manu"
      className="py-24 md:py-36 bg-[var(--color-paper)] overflow-hidden relative border-t border-[var(--color-line)]/50"
    >
      <Container>
        {/* Editorial Split: Text on Left + Large Authentic Portrait on Right (Close & Prominent) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-16 md:mb-20">
          {/* Text Left */}
          <div className="lg:col-span-7 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-coral)]/10 text-xs font-bold uppercase tracking-wider text-[var(--color-coral)] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{homeContent.direct.eyebrow}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display text-[var(--color-ink)] leading-[1.08] mb-6">
              Ein Ansprechpartner. <br />
              <span className="text-[var(--color-coral)] font-editorial">Keine stille Post.</span>
            </h2>
            <p className="text-lg md:text-xl text-[var(--color-muted)] leading-relaxed mb-8">
              {homeContent.direct.body}
            </p>

            {/* Quick Trust Highlights */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-semibold text-[var(--color-ink)]">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[var(--color-line)] shadow-sm">
                <ShieldCheck className="w-4 h-4 text-[var(--color-coral)]" />
                <span>100% Inhabergeführt</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[var(--color-line)] shadow-sm">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Wesel &amp; Niederrhein</span>
              </div>
            </div>
          </div>

          {/* Large Authentic Manu Photo Right (Moved closer to text, large & crisp) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md h-[440px] sm:h-[500px] md:h-[540px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
              <Image
                src="/media/portraits/manu-green-door-vertical.webp"
                alt="Manu Landeck – Webdesigner und Inhaber Firmenflow"
                fill
                priority
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 500px"
              />

              {/* Bottom Subtle Gradient for Text Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80" />

              {/* Bottom Authentic Name & Location Badge */}
              <div className="absolute bottom-5 left-5 right-5 z-10 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/60 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-[var(--color-ink)] leading-tight">
                    Manu Landeck
                  </h4>
                  <p className="text-xs text-[var(--color-coral)] font-semibold mt-0.5">
                    Inhaber &amp; Webdesigner
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-medium text-[var(--color-muted)] bg-[var(--color-paper)] px-2.5 py-1 rounded-full border border-[var(--color-line)]">
                  <MapPin className="w-3 h-3 text-[var(--color-coral)]" />
                  <span>Wesel</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Glowing Neon-Gradient Bento Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bentoItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className={cn(
                  "group relative p-7 rounded-3xl bg-white border shadow-md transition-all duration-300",
                  "hover:-translate-y-2 hover:shadow-xl",
                  item.border
                )}
              >
                {/* Subtle top gradient glow inside card */}
                <div 
                  className={cn(
                    "absolute inset-0 rounded-3xl bg-gradient-to-b opacity-40 group-hover:opacity-80 transition-opacity pointer-events-none",
                    item.gradient
                  )} 
                />

                <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110", item.iconBg)}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[var(--color-ink)] mb-2 font-sans group-hover:text-[var(--color-coral)] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

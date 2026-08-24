"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { homeContent } from "@/content/site";
import { portraitAssets } from "@/content/assets";
import { cn } from "@/lib/cn";
import { PhoneCall, Milestone, CheckCircle2, MapPin, Sparkles } from "lucide-react";

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
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: "back.out(1.4)",
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
      className="py-28 md:py-36 bg-[var(--color-paper)] overflow-hidden relative"
    >
      <Container>
        {/* Top Header & Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16 md:mb-20">
          <div className="lg:col-span-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-coral)]/10 text-xs font-bold uppercase tracking-wider text-[var(--color-coral)] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{homeContent.direct.eyebrow}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display text-[var(--color-ink)] leading-[1.08] mb-6">
              Ein Ansprechpartner. <br />
              <span className="text-[var(--color-coral)] font-editorial">Keine stille Post.</span>
            </h2>
            <p className="text-lg md:text-xl text-[var(--color-muted)] leading-relaxed">
              {homeContent.direct.body}
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-tr from-[var(--color-coral)] via-[var(--color-plum)] to-[var(--color-coral)] shadow-2xl">
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white">
                <Image
                  src={portraitAssets.about.src}
                  alt={portraitAssets.about.alt}
                  fill
                  className="object-cover"
                  sizes="224px"
                />
              </div>
              <div className="absolute -bottom-2 right-2 px-3.5 py-1 rounded-full bg-white text-[var(--color-ink)] text-xs font-bold shadow-md border border-[var(--color-line)]">
                Manu Landeck
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

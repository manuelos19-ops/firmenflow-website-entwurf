"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { PhoneCall, Milestone, ShieldCheck, MapPin, Sparkles, Layers } from "lucide-react";
import { BrandIcon } from "@/components/brand/BrandIcon";

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
    icon: ShieldCheck,
    gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    border: "border-emerald-500/30 hover:border-emerald-500",
    iconBg: "bg-emerald-100 text-emerald-700",
  },
];

export function DirectWithManu() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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
          stagger: 0.12,
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
      className="py-24 md:py-36 bg-transparent overflow-hidden relative"
    >
      <Container>
        {/* Editorial Split: Text on Left + Interactive Dual-Card Photo Deck Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16 md:mb-20">
          
          {/* Text Left */}
          <div className="lg:col-span-7 max-w-2xl">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[var(--color-coral)]/10 border border-[var(--color-coral)]/20 text-sm sm:text-base font-bold text-[var(--color-coral)] mb-5 shadow-sm">
              <BrandIcon className="w-4 h-3.5" />
              <span>Direkt mit Manu</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display text-[var(--color-ink)] leading-[1.08] mb-6">
              Ein Ansprechpartner. <br />
              <span className="text-[var(--color-coral)] font-editorial">Keine stille Post.</span>
            </h2>
            
            <p className="text-lg md:text-xl text-[var(--color-muted)] leading-relaxed mb-6">
              Du sprichst vom ersten Gedanken bis zur fertigen Website direkt mit mir. Keine wechselnden Projektmanager, keine anonymen Tickets und kein Agenturtheater – nenn mich einfach Manu.
            </p>

            <p className="text-base text-[var(--color-muted)] leading-relaxed mb-8">
              Ich mag klare Gespräche, hochwertige Gestaltung und Lösungen, die im Alltag deines Betriebs funktionieren. Firmenflow ist bewusst persönlich aufgebaut: Du weißt immer genau, wer deine Website entwickelt und wer sich darum kümmert.
            </p>

            {/* Quick Trust Highlights */}
            <div className="flex flex-wrap items-center gap-3.5 text-xs sm:text-sm font-semibold text-[var(--color-ink)]">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[var(--color-line)] shadow-sm">
                <BrandIcon className="w-3.5 h-3" />
                <span>Gründer von Firmenflow</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[var(--color-line)] shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-[var(--color-coral)]" />
                <span>Wesel &amp; Niederrhein</span>
              </div>
            </div>
          </div>

          {/* Interactive Dual-Card Photo Deck Right */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center pt-6 lg:pt-0">
            <div 
              className="relative w-[280px] sm:w-[320px] md:w-[350px] h-[390px] sm:h-[430px] md:h-[460px] cursor-pointer select-none group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Photo Card 1: Manu Nature Seated */}
              <div
                onClick={() => setActiveCardIndex(0)}
                className={cn(
                  "absolute inset-0 rounded-3xl overflow-hidden border-4 border-white shadow-2xl transition-all duration-500 ease-[var(--ease-drawer)] will-change-transform",
                  activeCardIndex === 0
                    ? "z-20 scale-100 ring-2 ring-black/5"
                    : "z-10 scale-[0.96] opacity-90 hover:opacity-100"
                )}
                style={{
                  transform: activeCardIndex === 0
                    ? isHovered 
                      ? "rotate(-6deg) translateX(-24px) translateY(-10px)" 
                      : "rotate(-3deg) translateX(-6px)"
                    : isHovered 
                      ? "rotate(-10deg) translateX(-36px) translateY(8px)" 
                      : "rotate(-4deg) translateX(-8px)",
                }}
              >
                <Image
                  src="/media/portraits/manu-nature-seated.webp"
                  alt="Manu – Gründer von Firmenflow"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 280px, 350px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-bold text-sm sm:text-base tracking-tight">Manu</p>
                  <p className="text-white/80 text-xs">Gründer von Firmenflow</p>
                </div>
              </div>

              {/* Photo Card 2: Manu Modern Vertical Portrait */}
              <div
                onClick={() => setActiveCardIndex(1)}
                className={cn(
                  "absolute inset-0 rounded-3xl overflow-hidden border-4 border-white shadow-2xl transition-all duration-500 ease-[var(--ease-drawer)] will-change-transform",
                  activeCardIndex === 1
                    ? "z-20 scale-100 ring-2 ring-black/5"
                    : "z-10 scale-[0.96] opacity-90 hover:opacity-100"
                )}
                style={{
                  transform: activeCardIndex === 1
                    ? isHovered 
                      ? "rotate(6deg) translateX(24px) translateY(-10px)" 
                      : "rotate(4deg) translateX(8px)"
                    : isHovered 
                      ? "rotate(10deg) translateX(36px) translateY(8px)" 
                      : "rotate(5deg) translateX(12px)",
                }}
              >
                <Image
                  src="/media/portraits/manu-green-door-vertical.webp"
                  alt="Manu – Webdesign & Entwicklung aus Wesel"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 280px, 350px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-bold text-sm sm:text-base tracking-tight">Manu</p>
                  <p className="text-white/80 text-xs">Wesel &amp; Niederrhein</p>
                </div>
              </div>
            </div>

            {/* Subtle interactive tip */}
            <div className="flex items-center gap-1.5 text-xs text-[var(--color-muted)] mt-5 select-none">
              <Layers className="w-3.5 h-3.5 text-[var(--color-coral)]" />
              <span>Karten fächern auf Hover · Klicke zum Wechseln</span>
            </div>
          </div>
        </div>

        {/* 3 Clean, Grounded Bento Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bentoItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className={cn(
                  "group relative p-7 rounded-3xl bg-white border shadow-md transition-all duration-300 ease-[var(--ease-out)]",
                  "hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl active:scale-[0.985] cursor-pointer will-change-transform",
                  item.border
                )}
              >
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

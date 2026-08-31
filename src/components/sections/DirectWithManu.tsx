"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { PhoneCall, Milestone, ShieldCheck, MapPin, Camera } from "lucide-react";
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
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

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
        {/* Editorial Split: Text on Left + Floating Post-it / Polaroid Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center mb-16 md:mb-20">
          
          {/* Text Left */}
          <div className="lg:col-span-6 xl:col-span-7 max-w-2xl">
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
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold text-[var(--color-ink)]">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[var(--color-line)] shadow-sm">
                <BrandIcon className="w-3.5 h-3" />
                <span>Gründer von Firmenflow</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[var(--color-line)] shadow-sm">
                <Camera className="w-3.5 h-3.5 text-purple-600" />
                <span>Foto &amp; Video vor Ort</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[var(--color-line)] shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-[var(--color-coral)]" />
                <span>Wesel &amp; Niederrhein</span>
              </div>
            </div>
          </div>

          {/* Organic Floating Post-it / Polaroid Moodboard Canvas */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-center justify-center pt-4 lg:pt-0">
            <div className="relative w-full max-w-[360px] sm:max-w-[420px] h-[360px] sm:h-[400px] select-none">
              
              {/* Polaroid 1: Manu Nature Seated (Left & Floating) */}
              <div
                onClick={() => setActiveCardIndex(0)}
                onMouseEnter={() => setHoveredCardIndex(0)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                className={cn(
                  "absolute top-2 left-2 sm:left-4 w-[210px] sm:w-[240px] md:w-[250px] p-3 pb-4 bg-white rounded-2xl shadow-xl border border-black/5 cursor-pointer transition-all duration-300 ease-[var(--ease-out)] will-change-transform group",
                  hoveredCardIndex === null && "animate-float-postit-1",
                  (activeCardIndex === 0 || hoveredCardIndex === 0)
                    ? "z-30 scale-[1.06] shadow-2xl ring-2 ring-[var(--color-coral)]/30" 
                    : "z-10 scale-95 opacity-85 hover:opacity-100"
                )}
                style={{
                  transform: hoveredCardIndex === 0
                    ? "rotate(-2deg) translate(-10px, -8px) scale(1.08)"
                    : hoveredCardIndex === 1
                    ? "rotate(-6deg) translate(-14px, 4px) scale(0.94)"
                    : undefined,
                }}
              >
                {/* Washi Tape Accent Pin */}
                <div 
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-amber-100/90 border border-amber-300/40 rounded-sm shadow-sm backdrop-blur-sm -rotate-2 pointer-events-none z-30" 
                  aria-hidden="true"
                />

                {/* Photo */}
                <div className="relative w-full h-[180px] sm:h-[200px] rounded-xl overflow-hidden bg-stone-100">
                  <Image
                    src="/media/portraits/manu-nature-seated.webp"
                    alt="Manu – Gründer von Firmenflow"
                    fill
                    priority
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="250px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                </div>

                {/* Polaroid Caption Note */}
                <div className="pt-2.5 px-1 flex items-center justify-between">
                  <p className="font-editorial italic text-sm sm:text-base font-semibold text-[var(--color-ink)]">
                    Manu Landeck
                  </p>
                  <span className="text-[10px] font-mono font-bold text-[var(--color-coral)] bg-[var(--color-coral)]/10 px-2 py-0.5 rounded-full">
                    Wesel ☕
                  </span>
                </div>
              </div>

              {/* Polaroid 2: Manu Green Door Vertical (Right & Floating Counter-Rhythm) */}
              <div
                onClick={() => setActiveCardIndex(1)}
                onMouseEnter={() => setHoveredCardIndex(1)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                className={cn(
                  "absolute bottom-2 right-2 sm:right-4 w-[210px] sm:w-[240px] md:w-[250px] p-3 pb-4 bg-white rounded-2xl shadow-xl border border-black/5 cursor-pointer transition-all duration-300 ease-[var(--ease-out)] will-change-transform group",
                  hoveredCardIndex === null && "animate-float-postit-2",
                  (activeCardIndex === 1 || hoveredCardIndex === 1)
                    ? "z-30 scale-[1.06] shadow-2xl ring-2 ring-[var(--color-plum)]/30" 
                    : "z-10 scale-95 opacity-85 hover:opacity-100"
                )}
                style={{
                  transform: hoveredCardIndex === 1
                    ? "rotate(2deg) translate(10px, -8px) scale(1.08)"
                    : hoveredCardIndex === 0
                    ? "rotate(6deg) translate(14px, 4px) scale(0.94)"
                    : undefined,
                }}
              >
                {/* Washi Tape Accent Pin */}
                <div 
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-rose-100/90 border border-rose-300/40 rounded-sm shadow-sm backdrop-blur-sm rotate-3 pointer-events-none z-30" 
                  aria-hidden="true"
                />

                {/* Photo */}
                <div className="relative w-full h-[180px] sm:h-[200px] rounded-xl overflow-hidden bg-stone-100">
                  <Image
                    src="/media/portraits/manu-green-door-vertical.webp"
                    alt="Manu – Direkt mit Manu"
                    fill
                    priority
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="250px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                </div>

                {/* Polaroid Caption Note */}
                <div className="pt-2.5 px-1 flex items-center justify-between">
                  <p className="font-editorial italic text-sm sm:text-base font-semibold text-[var(--color-ink)]">
                    Gründer von Firmenflow
                  </p>
                  <span className="text-[10px] font-mono font-bold text-[var(--color-plum)] bg-[var(--color-plum)]/10 px-2 py-0.5 rounded-full">
                    Persönlich ✨
                  </span>
                </div>
              </div>

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

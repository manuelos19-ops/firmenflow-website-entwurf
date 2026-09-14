"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { ArrowUpRight, Briefcase, Camera, Handshake, PhoneCall, MessageSquare } from "lucide-react";
import { BrandIcon } from "@/components/brand/BrandIcon";

const bentoItems = [
  {
    title: "Selbst Unternehmer",
    desc: "Sechs Jahre eigenes Fitnessstudio, zwei Jahre Geschäftsführer einer selbst gebauten Lasertag-Arena, zuletzt Marketing und Aufbau von BattleKart Düsseldorf-Neuss. Ich kenne Rechnungen, Personal und Kundengespräche nicht aus der Beratung, sondern aus elf Jahren im Betrieb.",
    icon: Briefcase,
    gradient: "from-[var(--color-plum)]/20 via-[var(--color-plum)]/5 to-transparent",
    border: "border-[var(--color-plum)]/30 hover:border-[var(--color-plum)]",
    iconBg: "bg-[var(--color-plum)]/10 text-[var(--color-plum)]",
  },
  {
    title: "Blick für Bild & Wirkung",
    desc: "Ich stehe selbst vor der Kamera und weiß, wie unangenehm das ist. Hinter der Kamera habe ich unter anderem Videos für LaserTag Evolution Düsseldorf gemacht. Bei dir nehme ich dir die Scheu.",
    icon: Camera,
    gradient: "from-[var(--color-coral)]/20 via-[var(--color-coral)]/5 to-transparent",
    border: "border-[var(--color-coral)]/30 hover:border-[var(--color-coral)]",
    iconBg: "bg-[var(--color-coral)]/10 text-[var(--color-coral)]",
  },
  {
    title: "Handschlagqualität",
    desc: "Ein Wort gilt. Was wir besprechen, halte ich fest – und du erreichst mich per Telefon oder WhatsApp, nicht über ein Ticketsystem.",
    icon: Handshake,
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
            <div className="badge-eyebrow text-[var(--color-coral)] mb-6">
              <BrandIcon className="w-4 h-3.5" />
              <span>Persönlich mit Manu</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display text-[var(--color-ink)] leading-[1.08] mb-6">
              Du redest mit mir. <br />
              <span className="text-[var(--color-coral)] font-editorial">Vom Unternehmer für Unternehmer.</span>
            </h2>
            
            <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed mb-5">
              Ich kenne den Alltag von Selbstständigen: Rechnungen schreiben, Verantwortung tragen, den Betrieb am Laufen halten. Deshalb bekommst du von mir keine Präsentation mit Fachbegriffen, sondern zwei Sätze dazu, was es bringt und was es kostet.
            </p>

            <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed mb-8">
              Ich mag kurze Wege und Lösungen, die im Alltag funktionieren. Du hast meine Handynummer, und dein Projekt bleibt Chefsache.
            </p>

            {/* Quick Trust Highlights - High-End Frosted Pills */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-semibold text-[var(--color-ink)]">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[var(--color-line)] shadow-sm">
                <PhoneCall className="w-3.5 h-3.5 text-[var(--color-coral)]" />
                <span>Direkter Draht via WhatsApp &amp; Telefon</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[var(--color-line)] shadow-sm">
                <MessageSquare className="w-3.5 h-3.5 text-[var(--color-plum)]" />
                <span>Ein Ansprechpartner, keine Hotline</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[var(--color-line)] shadow-sm">
                <Handshake className="w-3.5 h-3.5 text-emerald-600" />
                <span>Persönliche Verantwortung</span>
              </div>
            </div>

            <Link
              href="/ueber-manu"
              className="inline-flex items-center gap-2 mt-6 font-semibold text-[var(--color-plum)] hover:text-[var(--color-coral)] underline decoration-[var(--color-plum)]/25 underline-offset-4 hover:decoration-[var(--color-coral)] transition-colors"
            >
              Mehr über mich und meinen Werdegang
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </Link>
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
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="250px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                </div>

                {/* Polaroid Caption Note */}
                <div className="pt-3 px-1 flex flex-col gap-2">
                  <p className="font-editorial italic text-xs sm:text-sm font-semibold text-[var(--color-ink)] leading-snug">
                    „Eine gute Website muss nicht kompliziert sein – sie muss funktionieren.“
                  </p>
                  <div className="flex items-center justify-center pt-1.5 border-t border-stone-100">
                    <span className="text-[10px] font-mono font-bold text-[var(--color-coral)] bg-[var(--color-coral)]/10 px-2.5 py-0.5 rounded-full">
                      Auf Augenhöhe ☕
                    </span>
                  </div>
                </div>
              </div>

              {/* Polaroid 2: Manu Green Door Vertical (Right & Floating Counter-Rhythm) */}
              <div
                onClick={() => setActiveCardIndex(1)}
                onMouseEnter={() => setHoveredCardIndex(1)}
                onMouseLeave={() => setHoveredCardIndex(null)}
                className={cn(
                  "absolute bottom-2 right-2 sm:right-4 w-[220px] sm:w-[250px] md:w-[265px] p-3 pb-4 bg-white rounded-2xl shadow-xl border border-black/5 cursor-pointer transition-all duration-300 ease-[var(--ease-out)] will-change-transform group",
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
                    alt="Manu – Persönlich mit Manu"
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="250px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                </div>

                {/* Polaroid Caption Note */}
                <div className="pt-3 px-1 flex flex-col gap-2">
                  <p className="font-editorial italic text-xs sm:text-sm font-semibold text-[var(--color-ink)] leading-snug">
                    „Ich denke wie ein Unternehmer: Klare Absprachen, echter Nutzen, kein Blabla.“
                  </p>
                  <div className="flex items-center justify-center pt-1.5 border-t border-stone-100">
                    <span className="text-[10px] font-mono font-bold text-[var(--color-plum)] bg-[var(--color-plum)]/10 px-2.5 py-0.5 rounded-full">
                      Handschlagqualität ✨
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 3 Clean, Grounded Bento Value Cards - Double-Bezel Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bentoItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="double-bezel-outer p-1.5 rounded-[2.25rem] bg-black/[0.03] border border-black/[0.06] shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 group cursor-pointer"
              >
                <div
                  className={cn(
                    "double-bezel-inner rounded-[calc(2.25rem-0.375rem)] p-7 sm:p-8 bg-white border border-[var(--color-line)]/50 relative overflow-hidden flex flex-col h-full justify-between gap-6 transition-all duration-300",
                    item.border
                  )}
                >
                  <div 
                    className={cn(
                      "absolute inset-0 bg-gradient-to-b opacity-30 group-hover:opacity-75 transition-opacity pointer-events-none",
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
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

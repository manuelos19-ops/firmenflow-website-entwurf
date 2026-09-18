"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { useGSAP, gsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { FirmenflowIcon } from "@/components/brand/FirmenflowIcon";
import type { FirmenflowIconName } from "@/content/firmenflow-icons";

interface StoryStep {
  number: string;
  tag: string;
  tagVariant: "problem" | "solution" | "success";
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  iconName: FirmenflowIconName;
  highlights: string[];
}

const storySteps: StoryStep[] = [
  {
    number: "01",
    tag: "01 · Ausgangslage",
    tagVariant: "problem",
    title: "Vor Ort geschätzt – aber online kaum zu finden.",
    body: "Seit Jahren läuft der Betrieb über Empfehlung. Die Website ist von damals, das Google-Profil hat nie jemand angefasst. Funktioniert – solange die Stammkunden bleiben.",
    image: "/media/story/story-1-unsichtbar.webp",
    imageAlt: "Inhaber steht vor seinem Betrieb, Passanten schauen auf Smartphones",
    iconName: "analyse",
    highlights: [
      "Veraltete oder fehlende Website",
      "Google-Maps-Profil ungenutzt",
      "Neue Kunden suchen woanders",
    ],
  },
  {
    number: "02",
    tag: "02 · Mit Manu",
    tagVariant: "solution",
    title: "Kein Agentur-Theater: Persönlich mit Manu an einem Tisch.",
    body: "Wir setzen uns zusammen – bei dir, im Café oder am Telefon. Du erzählst, was du machst und wer deine Kunden sind. Danach baue ich deine Seite um oder von Grund auf neu.",
    image: "/media/story/story-2-loesung-manu.webp",
    imageAlt: "Manu und Inhaber besprechen die neue Website am Laptop",
    iconName: "persoenlicher-ansprechpartner",
    highlights: [
      "Ein fester Ansprechpartner (Manu)",
      "Schnelle Website fürs Smartphone",
      "Google-Unternehmensprofil startklar",
    ],
  },
  {
    number: "03",
    tag: "03 · Das Ergebnis",
    tagVariant: "success",
    title: "Wer sucht, findet dich – und sieht sofort, was du kannst.",
    body: "Ein aktuelles Google-Profil, echte Fotos aus deinem Betrieb, eine Seite die auf dem Handy sofort lädt. Der Weg zum Anruf ist ein Klick lang.",
    image: "/media/story/story-3-voller-erfolg.webp",
    imageAlt: "Volles Café mit glücklichen Gästen, Inhaber und Manu freuen sich gemeinsam über den Erfolg",
    iconName: "mehr-anfragen",
    highlights: [
      "Sichtbar bei Google & Maps",
      "Direkter Kontakt per Anruf oder Klick",
      "Anfragen von neuen Kunden",
    ],
  },
];

export function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Snappy micro-glide without hiding cards
      gsap.fromTo(
        ".story-card",
        { y: 20 },
        {
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
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
      id="story"
      className="pt-8 sm:pt-12 md:pt-16 pb-24 sm:pb-32 bg-transparent text-[var(--color-ink)] overflow-hidden relative"
    >
      {/* Background ambient glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[var(--color-coral)]/5 rounded-full blur-[140px] pointer-events-none" 
        aria-hidden="true" 
      />

      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="badge-eyebrow mb-5">
            <BrandIcon className="w-3.5 h-3" />
            <span>Aus der Praxis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display text-[var(--color-ink)] leading-[1.08] mb-5">
            Vom Geheimtipp zum ersten Treffer bei Google.
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed max-w-2xl mx-auto">
            Ausgangslage, Zusammenarbeit, Ergebnis.
          </p>
        </div>

        {/* 3 Story Cards Grid (All 3 100% fully visible with large, legible images) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 xl:gap-8 items-stretch">
          {storySteps.map((step, idx) => {
            const isSelected = activeStep === idx;
            const Icon = step.iconName;

            return (
              <div
                key={step.number}
                onMouseEnter={() => setActiveStep(idx)}
                className={cn(
                  "story-card double-bezel-outer p-1.5 rounded-[2.25rem] bg-black/[0.03] border border-black/[0.06] shadow-xl",
                  "transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-2 hover:shadow-2xl active:scale-[0.99] cursor-pointer will-change-transform",
                  isSelected
                    ? "ring-2 ring-[var(--color-coral)]/40 shadow-[var(--color-coral)]/15"
                    : "hover:border-[var(--color-coral)]/30"
                )}
              >
                <div className="double-bezel-inner rounded-[calc(2.25rem-0.375rem)] flex flex-col justify-between bg-white border border-[var(--color-line)]/50 overflow-hidden h-full">
                {/* Visual Image Box: Optimized 4:5 aspect ratio on mobile so characters and details are 100% visible */}
                <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] md:h-[440px] overflow-hidden bg-[#e8e4df] shrink-0">
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className={cn(
                      "object-cover transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.04]",
                      idx === 0 ? "object-[center_35%]" : "object-center"
                    )}
                  />
                  
                  {/* Clean Status Tag on Image */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span 
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-full backdrop-blur-md shadow-md text-white",
                        step.tagVariant === "problem" && "bg-rose-600/90",
                        step.tagVariant === "solution" && "bg-[var(--color-plum)]/90",
                        step.tagVariant === "success" && "bg-emerald-600/90"
                      )}
                    >
                      <FirmenflowIcon name={Icon} size={20} decorative />
                      <span>{step.tag}</span>
                    </span>
                  </div>
                </div>

                {/* Card Content: Clean, direct, human */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-[var(--color-ink)] mb-3 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed mb-6">
                      {step.body}
                    </p>
                  </div>

                  {/* Feature Checkpoints */}
                  <ul className="space-y-2.5 pt-4 border-t border-[var(--color-line)]/50 text-xs sm:text-sm text-[var(--color-ink)]/85">
                    {step.highlights.map((h) => {
                      // Die Problem-Karte listet auf, was schiefgeht.
                      // Kleine reduzierte CSS-Marker bleiben bewusst bestehen,
                      // keine grossen 3D-Icons vor jedem Listeneintrag.
                      const isProblem = step.tagVariant === "problem";
                      return (
                        <li key={h} className="flex items-start gap-2">
                          <span
                            aria-hidden="true"
                            className={cn(
                              "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                              isProblem ? "bg-rose-500" : "bg-emerald-500"
                            )}
                          />
                          <span>{h}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Action Callout */}
        <div className="mt-14 sm:mt-20 max-w-2xl mx-auto text-center double-bezel-outer p-1.5 rounded-[2.25rem] bg-black/[0.03] border border-black/[0.06] shadow-lg">
          <div className="double-bezel-inner rounded-[calc(2.25rem-0.375rem)] p-8 sm:p-10 bg-white/95 border border-[var(--color-line)]/50">
            <p className="text-base sm:text-lg font-display font-bold text-[var(--color-ink)] mb-2">
              Passt das zu deinem Betrieb? Frag einfach nach.
            </p>
            <p className="text-xs sm:text-sm text-[var(--color-muted)] mb-6 max-w-lg mx-auto leading-relaxed">
              Schick mir deine Seite oder deinen Google-Eintrag per WhatsApp – ich sage dir ehrlich, ob sich etwas lohnt und was es kosten würde. Dauert keine zwei Minuten.
            </p>

            <div className="inline-block">
              <MagneticButton>
                <ButtonLink 
                  href="#projektanfrage" 
                  variant="primary"
                  size="lg"
                  className="shadow-xl shadow-[var(--color-coral)]/25 text-sm sm:text-base px-8 py-4"
                >
                  <span>Unverbindlich anfragen</span>
                </ButtonLink>
              </MagneticButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

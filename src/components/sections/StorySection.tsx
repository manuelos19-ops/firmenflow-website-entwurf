"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { useGSAP, gsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { 
  ArrowRight, 
  CheckCircle2, 
  Users,
  SearchX,
  Laptop
} from "lucide-react";

interface StoryStep {
  number: string;
  tag: string;
  tagVariant: "problem" | "solution" | "success";
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  icon: typeof SearchX;
  highlights: string[];
}

const storySteps: StoryStep[] = [
  {
    number: "01",
    tag: "01 · Ausgangslage",
    tagVariant: "problem",
    title: "Vor Ort geschätzt – aber online kaum zu finden.",
    body: "Stammkunden schätzen deinen Betrieb seit Jahren. Wer dich aber noch nicht kennt und auf dem Smartphone sucht, findet dich bei Google nicht oder landet auf einer veralteten Seite. Neue Kunden gehen zur Konkurrenz.",
    image: "/media/story/story-1-unsichtbar.webp",
    imageAlt: "Inhaber steht vor seinem Betrieb, Passanten schauen auf Smartphones",
    icon: SearchX,
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
    title: "Kein Agentur-Theater: Direkt mit Manu an einem Tisch.",
    body: "Wir setzen uns zusammen und besprechen dein Angebot. Deine vorhandene Website wird moderner gestaltet und für mehr Anfragen optimiert – oder wir bauen deinen Auftritt von Grund auf neu.",
    image: "/media/story/story-2-loesung-manu.webp",
    imageAlt: "Manu und Inhaber besprechen die neue Website am Laptop",
    icon: Laptop,
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
    title: "Kunden finden dich sofort und rufen an.",
    body: "Wer in deiner Region sucht, sieht deinen Betrieb ganz oben mit guten Bewertungen und echten Fotos. Ein Klick – und Interessenten nehmen sofort Kontakt auf oder stehen bei dir im Betrieb.",
    image: "/media/story/story-3-voller-erfolg.webp",
    imageAlt: "Volles Café mit glücklichen Gästen, Inhaber und Manu freuen sich gemeinsam über den Erfolg",
    icon: Users,
    highlights: [
      "Ganz oben bei Google & Maps",
      "Direkter Kontakt per Anruf oder Klick",
      "Verlässlich neue Kunden vor Ort",
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
          <span className="inline-flex items-center gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[var(--color-plum)]/10 border border-[var(--color-plum)]/20 text-xs sm:text-sm font-bold tracking-wide text-[var(--color-plum)] mb-5 shadow-sm">
            <BrandIcon className="w-4 h-3.5" />
            <span>Aus der Praxis · So funktioniert's</span>
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display text-[var(--color-ink)] leading-[1.08] mb-5">
            Vom unsichtbaren Laden zum vollen Betrieb.
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed max-w-2xl mx-auto">
            In drei einfachen Schritten zu mehr Sichtbarkeit und echten Kundenanfragen vor Ort.
          </p>
        </div>

        {/* 3 Story Cards Grid (All 3 100% fully visible with large, legible images) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 xl:gap-8 items-stretch">
          {storySteps.map((step, idx) => {
            const isSelected = activeStep === idx;
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                onMouseEnter={() => setActiveStep(idx)}
                className={cn(
                  "story-card flex flex-col justify-between bg-white rounded-3xl border-2 transition-all duration-300 ease-[var(--ease-out)] overflow-hidden shadow-lg group hover:-translate-y-2 hover:scale-[1.015] hover:shadow-2xl active:scale-[0.99] cursor-pointer will-change-transform",
                  isSelected
                    ? "border-[var(--color-coral)] shadow-2xl shadow-[var(--color-coral)]/20 ring-4 ring-[var(--color-coral)]/10"
                    : "border-[var(--color-line)] hover:border-[var(--color-coral)]/50"
                )}
              >
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
                      <Icon className="w-3.5 h-3.5 shrink-0" />
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
                    {step.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <CheckCircle2 
                          className={cn(
                            "w-4 h-4 mt-0.5 shrink-0",
                            step.tagVariant === "problem" && "text-rose-400",
                            step.tagVariant === "solution" && "text-[var(--color-coral)]",
                            step.tagVariant === "success" && "text-emerald-500"
                          )} 
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Action Callout */}
        <div className="mt-12 sm:mt-16 max-w-2xl mx-auto text-center bg-white/70 backdrop-blur-md border border-[var(--color-line)] rounded-3xl p-8 shadow-lg">
          <p className="text-base sm:text-lg font-display font-bold text-[var(--color-ink)] mb-2">
            Bereit für mehr Sichtbarkeit für deinen Betrieb?
          </p>
          <p className="text-xs sm:text-sm text-[var(--color-muted)] mb-6 max-w-lg mx-auto leading-relaxed">
            Lass uns kurz sprechen – ehrlich, unverbindlich und direkt mit Manu.
          </p>

          <div className="inline-block">
            <MagneticButton>
              <ButtonLink 
                href="#projektanfrage" 
                variant="primary"
                size="lg"
                className="shadow-xl shadow-[var(--color-coral)]/25 text-sm sm:text-base px-8 py-4"
              >
                <span>Lass uns sprechen</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </ButtonLink>
            </MagneticButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

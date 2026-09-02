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
  Star,
  Users,
  SearchX,
  Laptop
} from "lucide-react";

interface StoryStep {
  number: string;
  tag: string;
  tagVariant: "problem" | "solution" | "success";
  title: string;
  subtitle: string;
  body: string;
  image: string;
  imageAlt: string;
  icon: typeof SearchX;
  badge: {
    icon: typeof Star | typeof Users | typeof SearchX;
    text: string;
    sub: string;
  };
  highlights: string[];
}

const storySteps: StoryStep[] = [
  {
    number: "01",
    tag: "Das Dilemma",
    tagVariant: "problem",
    title: "Der Laden ist top. Aber online weiß es keiner.",
    subtitle: "Im Alltag unsichtbar",
    body: "Du lieferst erstklassige Arbeit und gibst jeden Tag alles für deine Kunden. Aber wer auf dem Smartphone nach deinem Angebot sucht, läuft an deinem Betrieb vorbei, weil er online nicht auftaucht.",
    image: "/media/story/story-1-unsichtbar.webp",
    imageAlt: "Inhaber steht mit Schild 'Hier ist meine Bäckerei' vor seinem Laden, Passanten schauen auf Smartphones",
    icon: SearchX,
    badge: {
      icon: SearchX,
      text: "0 Anfragen online",
      sub: "Kunden laufen vorbei",
    },
    highlights: [
      "Veraltete oder fehlende Website",
      "Kein optimiertes Google-Maps-Profil",
      "Kunden gehen zur Konkurrenz",
    ],
  },
  {
    number: "02",
    tag: "Die Lösung mit Manu",
    tagVariant: "solution",
    title: "Gemeinsam am Tisch: Website & Google 360°.",
    subtitle: "Direkt, ehrlich und ohne Fachchinesisch",
    body: "Ich setze mich mit dir zusammen, bringe dein echtes Angebot auf den Punkt und baue einen schnellen, modernen Auftritt mit klarem Fokus auf Google Maps und direkte Kundenanfragen.",
    image: "/media/story/story-2-loesung-manu.webp",
    imageAlt: "Manu zeigt dem Inhaber auf dem Laptop ein 3D-Hologramm der neuen Website und 5-Sterne-Google-Bewertung",
    icon: Laptop,
    badge: {
      icon: Star,
      text: "5.0 ★★★★★ Google 360°",
      sub: "Modernes Webdesign",
    },
    highlights: [
      "Fester Ansprechpartner (Manu)",
      "Schnelle Website fürs Smartphone",
      "Google-Profil mit 5 Sternen",
    ],
  },
  {
    number: "03",
    tag: "Der Erfolg",
    tagVariant: "success",
    title: "Kunden finden dich sofort und rufen an.",
    subtitle: "Echte Anfragen und ein voller Betrieb",
    body: "Wer in deiner Region sucht, sieht sofort deine guten Bewertungen, klickt auf deine Website und nimmt direkt Kontakt auf. Aus stiller Qualität werden planbar neue Kunden.",
    image: "/media/story/story-3-voller-erfolg.webp",
    imageAlt: "Volles Café mit glücklichen Gästen, Inhaber und Manu freuen sich gemeinsam über den Erfolg",
    icon: Users,
    badge: {
      icon: Users,
      text: "Voller Betrieb & Gäste",
      sub: "Echte Stammkunden",
    },
    highlights: [
      "Regelmäßige Anfragen über Google",
      "Starker erster Eindruck rund um die Uhr",
      "Spürbar mehr Umsatz vor Ort",
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
      className="py-24 sm:py-32 md:py-40 bg-transparent text-[var(--color-ink)] overflow-hidden relative"
    >
      {/* Background ambient glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[var(--color-coral)]/5 rounded-full blur-[140px] pointer-events-none" 
        aria-hidden="true" 
      />

      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[var(--color-plum)]/10 border border-[var(--color-plum)]/20 text-sm sm:text-base font-bold text-[var(--color-plum)] mb-5 shadow-sm">
            <BrandIcon className="w-5 h-3.5" />
            <span>Die Firmenflow-Story</span>
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display text-[var(--color-ink)] leading-[1.08] mb-5">
            Vom unsichtbaren Laden zum vollen Betrieb.
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed max-w-2xl mx-auto">
            Drei Schritte, wie aus stiller Qualität echte digitale Anziehungskraft wird – ohne Fachchinesisch, direkt auf den Punkt gebracht.
          </p>

          {/* Quick Jump Step Navigation (Pills) */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-8 flex-wrap">
            {storySteps.map((step, idx) => (
              <button
                key={step.number}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer",
                  activeStep === idx
                    ? "bg-[var(--color-plum)] text-white shadow-md shadow-[var(--color-plum)]/20 scale-105"
                    : "bg-white text-[var(--color-muted)] hover:text-[var(--color-ink)] border border-[var(--color-line)]"
                )}
              >
                <span className="text-[11px] opacity-75">{step.number}</span>
                <span>{step.tag}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3 Story Cards Grid (All 3 100% fully visible with large, legible images) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 xl:gap-8 items-stretch">
          {storySteps.map((step, idx) => {
            const isSelected = activeStep === idx;
            const Icon = step.icon;
            const BadgeIcon = step.badge.icon;

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
                {/* Visual Image Box: Generous height so signs and all characters are 100% visible & readable */}
                <div className="relative w-full h-[360px] sm:h-[420px] md:h-[460px] overflow-hidden bg-[#e8e4df] shrink-0">
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.04]"
                  />
                  
                  {/* Subtle top badge layer */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/30 text-white text-xs font-bold font-mono shadow-md">
                      {step.number}
                    </span>
                  </div>

                  {/* Top Status Tag */}
                  <div className="absolute top-3.5 right-3.5 z-10">
                    <span 
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full backdrop-blur-md shadow-md",
                        step.tagVariant === "problem" && "bg-rose-600/90 text-white",
                        step.tagVariant === "solution" && "bg-[var(--color-plum)]/90 text-white",
                        step.tagVariant === "success" && "bg-emerald-600/90 text-white"
                      )}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      {step.tag}
                    </span>
                  </div>
                </div>

                {/* Card Content Description */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Status Pill Badge inside content (does not cover the photo) */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--color-paper)] border border-[var(--color-line)] mb-4">
                      <div 
                        className={cn(
                          "w-6 h-6 rounded-lg flex items-center justify-center shrink-0",
                          step.tagVariant === "problem" && "bg-rose-100 text-rose-600",
                          step.tagVariant === "solution" && "bg-amber-100 text-amber-600",
                          step.tagVariant === "success" && "bg-emerald-100 text-emerald-600"
                        )}
                      >
                        <BadgeIcon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold text-[var(--color-ink)]">
                        {step.badge.text}
                      </span>
                    </div>

                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-coral)] mb-1 block">
                      {step.subtitle}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-[var(--color-ink)] mb-3 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-6">
                      {step.body}
                    </p>
                  </div>

                  {/* Feature Checkpoints */}
                  <ul className="space-y-2 pt-4 border-t border-[var(--color-line)]/50 text-xs sm:text-sm text-[var(--color-ink)]/85">
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
        <div className="mt-14 sm:mt-18 max-w-2xl mx-auto text-center bg-white/70 backdrop-blur-md border border-[var(--color-line)] rounded-3xl p-8 shadow-lg">
          <p className="text-base sm:text-lg font-display font-bold text-[var(--color-ink)] mb-2">
            Bereit für Schritt 2 &amp; 3 bei deinem Betrieb?
          </p>
          <p className="text-xs sm:text-sm text-[var(--color-muted)] mb-6 max-w-lg mx-auto leading-relaxed">
            Lass uns unverbindlich prüfen, was deiner Website oder deinem Google-Auftritt fehlt – direkt mit Manu, auf Augenhöhe.
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

"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { useGSAP, gsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
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
    title: "Gutes Handwerk, aber niemand schaut hin.",
    subtitle: "Online unsichtbar im Alltag",
    body: "Du stehst im Laden, gibst alles und lieferst erstklassige Qualität – doch potenzielle Kunden suchen auf dem Smartphone und laufen einfach vorbei, weil dein Betrieb digital nicht auffindbar ist.",
    image: "/media/story/story-1-unsichtbar.webp",
    imageAlt: "Inhaber steht mit Schild vor seinem Laden, Passanten schauen auf Smartphones",
    icon: SearchX,
    badge: {
      icon: SearchX,
      text: "0 Anfragen",
      sub: "Kunden laufen vorbei",
    },
    highlights: [
      "Veraltete oder fehlende Website",
      "Kein auffindbares Google-Maps-Profil",
      "Kunden wandern zur Konkurrenz ab",
    ],
  },
  {
    number: "02",
    tag: "Die Lösung mit Manu",
    tagVariant: "solution",
    title: "Gemeinsam am Tisch: Deine neue Website & Google 360°.",
    subtitle: "Direkt, verständlich & ohne Agenturtheater",
    body: "Keine unpersönliche Großagentur, keine leeren Versprechen: Wir setzen uns zusammen, bringen dein echtes Angebot auf den Punkt und bauen einen modernen, vertrauensvollen Auftritt mit Google-Maps-Fokus.",
    image: "/media/story/story-2-loesung-manu.webp",
    imageAlt: "Manu zeigt dem Inhaber auf dem Laptop ein 3D-Hologramm der neuen Website und 5-Sterne-Google-Bewertung",
    icon: Laptop,
    badge: {
      icon: Star,
      text: "5.0 ★★★★★",
      sub: "Google 360° & Webdesign",
    },
    highlights: [
      "Persönlicher Ansprechpartner (Manu)",
      "Individuelle, schnelle Website",
      "Google-Profil auf 5-Sterne-Niveau",
    ],
  },
  {
    number: "03",
    tag: "Der Erfolg",
    tagVariant: "success",
    title: "Interessenten werden Kunden – dein Laden lebt.",
    subtitle: "Messbare Anfragen & volle Tische",
    body: "Passanten finden deinen Betrieb sofort bei der Google-Suche, überzeugen sich auf deiner Website und kommen begeistert zu dir. Aus stiller Qualität wird echte lokale Anziehungskraft.",
    image: "/media/story/story-3-voller-erfolg.webp",
    imageAlt: "Volles Café mit glücklichen Gästen, Inhaber und Manu freuen sich gemeinsam über den Erfolg",
    icon: Users,
    badge: {
      icon: Users,
      text: "Voller Laden",
      sub: "Echte Stammkunden",
    },
    highlights: [
      "Regelmäßige Neukunden über Google",
      "Starker erster Eindruck rund um die Uhr",
      "Mehr Umsatz & spürbare Entlastung",
    ],
  },
];

export function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Smooth staggered entrance for story cards
      gsap.from(".story-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section 
      ref={containerRef}
      id="story"
      className="py-24 sm:py-32 md:py-40 bg-[var(--color-paper)] text-[var(--color-ink)] overflow-hidden relative border-t border-[var(--color-line)]/50"
    >
      {/* Background ambient glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[var(--color-coral)]/5 rounded-full blur-[140px] pointer-events-none" 
        aria-hidden="true" 
      />

      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-plum)]/5 border border-[var(--color-plum)]/10 text-xs font-semibold text-[var(--color-plum)] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[var(--color-coral)]" />
            Die Firmenflow-Story
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

        {/* 3 Story Cards Grid (Desktop: 3 Columns, Mobile: Stack with Highlights) */}
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
                  "story-card flex flex-col justify-between bg-white rounded-3xl border-2 transition-all duration-500 overflow-hidden shadow-xl group",
                  isSelected
                    ? "border-[var(--color-coral)] shadow-2xl shadow-[var(--color-coral)]/15 scale-[1.02] ring-4 ring-[var(--color-coral)]/10"
                    : "border-[var(--color-line)]/80 hover:border-[var(--color-plum)]/40 hover:shadow-2xl"
                )}
              >
                {/* Visual Image Box with 3D Pixar Illustration */}
                <div className="relative aspect-[16/11] sm:aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Subtle top/bottom gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Top Step Number Badge */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-bold font-mono">
                      {step.number}
                    </span>
                  </div>

                  {/* Top Status Tag */}
                  <div className="absolute top-3.5 right-3.5 z-10">
                    <span 
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-md shadow-sm",
                        step.tagVariant === "problem" && "bg-rose-500/90 text-white",
                        step.tagVariant === "solution" && "bg-[var(--color-plum)]/90 text-white",
                        step.tagVariant === "success" && "bg-emerald-500/90 text-white"
                      )}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      {step.tag}
                    </span>
                  </div>

                  {/* Floating Action Badge inside Image */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10">
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-white/50 flex items-center gap-3">
                      <div 
                        className={cn(
                          "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                          step.tagVariant === "problem" && "bg-rose-100 text-rose-600",
                          step.tagVariant === "solution" && "bg-amber-100 text-amber-600",
                          step.tagVariant === "success" && "bg-emerald-100 text-emerald-600"
                        )}
                      >
                        <BadgeIcon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-[var(--color-ink)] truncate leading-tight">
                          {step.badge.text}
                        </p>
                        <p className="text-[11px] text-[var(--color-muted)] truncate leading-tight mt-0.5">
                          {step.badge.sub}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Content Description */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
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

"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { useGSAP, gsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { BrandIcon } from "@/components/brand/BrandIcon";
import {
  ArrowLeft,
  CheckCircle2,
  Star,
  Search,
  MessageSquareCheck,
  LineChart,
  Users,
  AlertCircle,
  ArrowRight,
  MapPin,
  TrendingUp,
  ShieldCheck,
  ThumbsUp,
  AlertTriangle,
  Building2,
  Clock,
  Phone,
  BarChart3,
  ExternalLink,
} from "lucide-react";

interface GoogleBusinessViewProps {
  whatsappUrl: string;
}

export function GoogleBusinessView({ whatsappUrl }: GoogleBusinessViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [simulationMode, setSimulationMode] = useState<"before" | "after">("after");

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Hero timeline entrance
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".g360-hero-eyebrow",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          ".g360-hero-title",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.3"
        )
        .fromTo(
          ".g360-hero-body",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".g360-hero-cta",
          { opacity: 0, scale: 0.95, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.1 },
          "-=0.3"
        );

      // Scroll-triggered staggered reveal for feature cards
      const cards = gsap.utils.toArray<HTMLElement>(".g360-card-reveal");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <main ref={containerRef} id="main" className="pt-28 sm:pt-36 pb-28 overflow-hidden">
      <Container className="space-y-20 sm:space-y-32">
        {/* Back Navigation Bar */}
        <div className="flex items-center justify-between border-b border-[var(--color-line)] pb-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-muted)] hover:text-[var(--color-coral)] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Zurück zur Startseite</span>
          </Link>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-coral)] bg-[var(--color-coral)]/10 px-3 py-1 rounded-full border border-[var(--color-coral)]/20">
            Wesel &amp; Niederrhein
          </span>
        </div>

        {/* HERO SECTION with High-Impact Typography & Simulation Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="g360-hero-eyebrow inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-[var(--color-coral)]/15 to-[var(--color-plum)]/15 border border-[var(--color-coral)]/30 text-xs sm:text-sm font-bold text-[var(--color-coral)] shadow-sm backdrop-blur-sm">
              <BrandIcon size="xs" />
              <span>Google Business 360° · Persönlich mit Manu</span>
            </div>

            <h1 className="g360-hero-title text-4xl sm:text-6xl md:text-7xl font-display font-extrabold text-[var(--color-ink)] leading-[1.06] tracking-tight">
              Bei Google gefunden werden. <br className="hidden sm:block" />
              <span className="text-[var(--color-plum)]">Vertrauen aufbauen.</span> <br />
              <span className="text-[var(--color-coral)] font-editorial italic font-normal">
                Aus Feedback lernen.
              </span>
            </h1>

            <p className="g360-hero-body text-xl sm:text-2xl text-[var(--color-ink)] font-semibold leading-relaxed">
              Deine Google-Präsenz sollte mehr können, als nur deine Öffnungszeiten anzuzeigen.
            </p>

            <p className="g360-hero-body text-base sm:text-lg text-[var(--color-muted)] leading-relaxed max-w-2xl">
              Wenn Kunden in deiner Region nach einem Handwerker, Café, Friseur oder Dienstleister suchen, beginnt die Entscheidung fast immer bei Google Maps. Wie wirkt dein Betrieb dort? Wie frisch sind deine Bewertungen? Und vor allem: <strong>Nutzt du das Feedback deiner Kunden als wertvolle Erkenntnisse für deinen Betrieb?</strong>
            </p>

            {/* CTAs */}
            <div className="g360-hero-cta flex flex-wrap items-center gap-4 pt-2">
              <MagneticButton>
                <ButtonLink
                  href="/#kontakt"
                  variant="primary"
                  size="lg"
                  className="shadow-xl shadow-[var(--color-coral)]/30 text-sm sm:text-base px-8 py-4"
                >
                  <span>Google-Präsenz jetzt prüfen lassen</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </ButtonLink>
              </MagneticButton>

              <MagneticButton>
                <ButtonLink
                  href={whatsappUrl}
                  external={true}
                  variant="whatsapp"
                  size="lg"
                  className="shadow-lg shadow-[#25D366]/25 text-sm sm:text-base px-6 py-4"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white mr-2 shrink-0" />
                  <span>WhatsApp an Manu</span>
                </ButtonLink>
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: INTERACTIVE GOOGLE MAPS SIMULATION (Vorher vs. Nachher) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Simulation Tab Switcher */}
            <div className="w-full max-w-md bg-stone-100 p-1.5 rounded-2xl border border-[var(--color-line)] flex items-center justify-between mb-4 shadow-inner">
              <button
                type="button"
                onClick={() => setSimulationMode("before")}
                className={cn(
                  "flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer",
                  simulationMode === "before"
                    ? "bg-rose-500 text-white shadow-md"
                    : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                )}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Typischer Betrieb</span>
              </button>

              <button
                type="button"
                onClick={() => setSimulationMode("after")}
                className={cn(
                  "flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer",
                  simulationMode === "after"
                    ? "bg-[var(--color-plum)] text-white shadow-md"
                    : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                )}
              >
                <BrandIcon size="xs" variant={simulationMode === "after" ? "light" : "dark"} />
                <span>Mit Google 360°</span>
              </button>
            </div>

            {/* The Simulated Google Maps Card */}
            <div className="w-full max-w-md bg-white rounded-3xl border-2 border-[var(--color-line)] shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
              {/* Fake Google Header */}
              <div className="bg-gradient-to-r from-stone-50 to-stone-100 p-4 border-b border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[var(--color-coral)] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                    G
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                      Google Maps Vorschau
                    </span>
                    <span className="text-xs font-semibold text-[var(--color-ink)]">
                      {simulationMode === "before" ? "Nicht gepflegtes Profil" : "Top gepflegter 360°-Auftritt"}
                    </span>
                  </div>
                </div>
                {simulationMode === "after" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold border border-blue-200">
                    <CheckCircle2 className="w-3 h-3 text-blue-600" />
                    <span>Verifiziert</span>
                  </span>
                )}
              </div>

              {/* Profile Body */}
              <div className="p-6 space-y-4">
                <div>
                  <h4 className="text-xl font-bold font-sans text-[var(--color-ink)] flex items-center gap-2">
                    <span>Dein Betrieb</span>
                    {simulationMode === "after" && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        Aktiv betreut
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-[var(--color-muted)] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[var(--color-coral)]" />
                    Wesel &amp; Niederrhein · Fachbetrieb
                  </p>
                </div>

                {/* Stars & Reviews */}
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-100">
                  <div className="flex items-center text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-4 h-4",
                          simulationMode === "after"
                            ? "fill-amber-400 text-amber-400"
                            : i < 3
                            ? "fill-amber-400 text-amber-400"
                            : "text-stone-300"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-[var(--color-ink)]">
                    {simulationMode === "after" ? "5,0 Sterne (52 Bewertungen)" : "3,4 Sterne (5 Bewertungen)"}
                  </span>
                </div>

                {/* Status Indicator */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[var(--color-muted)] shrink-0" />
                    {simulationMode === "after" ? (
                      <span className="text-emerald-700 font-semibold">
                        Jetzt geöffnet · Schließt um 18:00 Uhr
                      </span>
                    ) : (
                      <span className="text-amber-700 font-semibold">
                        Öffnungszeiten können abweichen (vor 2 Jahren aktualisiert)
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <MessageSquareCheck className="w-4 h-4 text-[var(--color-muted)] shrink-0" />
                    {simulationMode === "after" ? (
                      <span className="text-blue-700 font-semibold">
                        100 % aller Bewertungen persönlich &amp; wertschätzend beantwortet
                      </span>
                    ) : (
                      <span className="text-rose-600 font-medium">
                        Keine Antworten auf Rezensionen vorhanden
                      </span>
                    )}
                  </div>
                </div>

                {/* Sample Review Snapshot */}
                <div className="pt-3 border-t border-stone-100 text-xs space-y-2">
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                    Letzte Kundenstimme:
                  </span>
                  {simulationMode === "after" ? (
                    <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
                      <p className="text-emerald-950 font-medium italic">
                        „Hervorragende Beratung und super freundliches Team! Man fühlt sich sofort gut aufgehoben.“
                      </p>
                      <div className="pl-2 border-l-2 border-emerald-600 text-[11px] text-emerald-800">
                        <strong>Antwort vom Inhaber:</strong> Vielen Dank für die lieben Worte! Es war uns eine echte Freude, euch zu unterstützen.
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl space-y-1">
                      <p className="text-rose-950 font-medium italic">
                        „Stand vor verschlossener Tür, obwohl online geöffnet stand. Schade...“
                      </p>
                      <p className="text-[11px] text-rose-600 italic">
                        (Unbeantwortet seit 7 Monaten)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2 AUSGANGSSITUATIONEN - Highlight Cards */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-coral)]">
              Ausgangslage
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-[var(--color-ink)] mt-2">
              Wo steht dein Betrieb aktuell?
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-muted)] mt-2">
              Ganz gleich, ob du ganz neu anfängst oder dein bestehendes Profil auf Vordermann bringen willst.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Noch kein Profil */}
            <div className="g360-card-reveal group relative bg-white rounded-3xl p-8 sm:p-10 border-2 border-[var(--color-line)] shadow-lg hover:shadow-2xl hover:border-amber-400/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/50 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />
              
              <div className="space-y-5 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold font-mono">
                  Szenario 01
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-bold text-[var(--color-ink)]">
                  Du hast noch kein Google-Profil?
                </h3>

                <p className="text-base font-semibold text-amber-800">
                  Dann starten wir gemeinsam bei null.
                </p>

                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                  Ich baue deine Präsenz in Google Suche und Google Maps von Grund auf auf – sauber, lückenlos und optimal vorbereitet:
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-[var(--color-ink)]">
                  {[
                    "Einrichtung oder saubere Übernahme deines Profils",
                    "Prüfung aller Unternehmensinformationen",
                    "Richtige Primär- und Nebenkategorien für mehr Treffer",
                    "Öffnungszeiten, Kontaktdaten & ansprechende Texte",
                    "Hochwertige Bilder & Verknüpfung mit deiner Website",
                  ].map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100 relative z-10">
                <span className="text-xs font-semibold text-amber-900 block">
                  Ergebnis: Dein Eintrag existiert nicht nur, sondern zieht aktiv Kunden an.
                </span>
              </div>
            </div>

            {/* Card 2: Profil existiert bereits */}
            <div className="g360-card-reveal group relative bg-white rounded-3xl p-8 sm:p-10 border-2 border-[var(--color-line)] shadow-lg hover:shadow-2xl hover:border-[var(--color-plum)]/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-plum)]/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />

              <div className="space-y-5 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-plum)]/15 text-[var(--color-plum)] text-xs font-bold font-mono">
                  Szenario 02
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-bold text-[var(--color-ink)]">
                  Du hast bereits ein Profil?
                </h3>

                <p className="text-base font-semibold text-[var(--color-plum)]">
                  Nutzt du sein volles Potenzial auch wirklich?
                </p>

                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                  Viele Betriebe sammeln über Jahre Bewertungen, beschäftigen sich aber im hektischen Alltag kaum damit:
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-[var(--color-ink)]">
                  {[
                    "Positive Bewertungen bleiben monatelang unkommentiert",
                    "Kritik wird übersehen, ignoriert oder zu spät beantwortet",
                    "Antworten wirken oft wie lieblose Copy-Paste-Standardfloskeln",
                    "Wertvolle Anregungen deiner Kunden versickern ungenutzt",
                  ].map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100 relative z-10">
                <span className="text-xs font-semibold text-[var(--color-plum)] block">
                  Lösung: Ich mache dieses Feedback zu einem echten Wettbewerbsvorteil für dich.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* DIE 3 KERNSÄULEN IM DETAIL (BENTO ARCHITECTURE) */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-coral)]">
              Leistungstiefe
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-[var(--color-ink)] mt-2">
              Die 3 Kernsäulen im Detail
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-muted)] mt-2">
              Kein Agentur-Fachchinesisch. Sondern drei greifbare Hebel für deinen Betrieb.
            </p>
          </div>

          {/* SÄULE 1: Professionelles Bewertungsmanagement */}
          <div className="g360-card-reveal bg-white rounded-3xl p-8 sm:p-12 border-2 border-[var(--color-line)] shadow-xl hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                <MessageSquareCheck className="w-4 h-4" />
                <span>Säule 01 · Reputationsschutz</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-display font-bold text-[var(--color-ink)]">
                Professionelles Bewertungsmanagement
              </h3>

              <p className="text-base text-[var(--color-muted)] leading-relaxed">
                Ich übernehme auf Wunsch die laufende Betreuung deiner Google-Rezensionen. Neue Bewertungen werden geprüft, eingeordnet und passend zu deinem Unternehmen beantwortet.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 hover:bg-stone-100/70 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs mb-2">
                    ✍️
                  </div>
                  <strong className="text-[var(--color-ink)] text-sm block mb-1">
                    Deine echte Sprache
                  </strong>
                  <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                    Keine generischen Standard-Bots. Jede Antwort ist individuell und spiegelt die Herzlichkeit deines Betriebs wider.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 hover:bg-stone-100/70 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs mb-2">
                    🛡️
                  </div>
                  <strong className="text-[var(--color-ink)] text-sm block mb-1">
                    Deeskalation bei Kritik
                  </strong>
                  <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                    Sensible Rezensionen werden professionell und besonnen beantwortet – damit negative Stimmen keine Neukunden abschrecken.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-br from-blue-50/80 via-white to-stone-50 rounded-2xl p-6 sm:p-8 border border-blue-200 shadow-sm space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-800">
                Qualitätsstandards
              </span>
              <p className="text-sm font-bold text-[var(--color-ink)]">
                Worauf ich bei jeder Antwort achte:
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                <li className="flex items-center gap-2">✓ Wertschätzung bei Lob &amp; Empfehlungen</li>
                <li className="flex items-center gap-2">✓ Eingehen auf konkrete Produkte &amp; Details</li>
                <li className="flex items-center gap-2">✓ Klare, deeskalierende Antworten bei Kritik</li>
                <li className="flex items-center gap-2">✓ Vorab-Rücksprache bei heiklen Vorfällen</li>
                <li className="flex items-center gap-2">✓ Einheitlicher Außenauftritt rund um die Uhr</li>
              </ul>
            </div>
          </div>

          {/* SÄULE 2: Systematischer Aufbau echter Bewertungen */}
          <div className="g360-card-reveal bg-white rounded-3xl p-8 sm:p-12 border-2 border-[var(--color-line)] shadow-xl hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 bg-gradient-to-br from-amber-50/80 via-white to-amber-50/40 rounded-2xl p-6 sm:p-8 border border-amber-200 shadow-sm space-y-4 order-2 lg:order-1">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md">
                <Star className="w-5 h-5 fill-white text-white" />
              </div>
              <h4 className="text-lg font-bold text-[var(--color-ink)]">
                Das Dilemma gelöst:
              </h4>
              <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                Zufriedene Kunden gehen oft nach Hause, ohne eine Rezension zu schreiben – einfach weil im Alltag der richtige Impuls fehlte.
              </p>
              <div className="p-3.5 bg-white border border-amber-300 rounded-xl text-xs text-amber-950 font-medium shadow-sm">
                <strong>100 % Richtlinienkonform:</strong> Keine gekauften Bewertungen, kein Drängen. Reale Kundenmeinungen, die Vertrauen stiften.
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>Säule 02 · Wachstums-Prozess</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-display font-bold text-[var(--color-ink)]">
                Systematischer Aufbau echter Bewertungen
              </h3>

              <p className="text-base text-[var(--color-muted)] leading-relaxed">
                Gute Leistungen allein führen selten automatisch zu vielen Rezensionen. Wir entwickeln gemeinsam einen unkomplizierten Prozess, mit dem du Kunden im passenden Moment erreichst:
              </p>

              <div className="space-y-3 pt-2">
                {[
                  {
                    title: "Smarte Kontaktpunkte im Kundenalltag",
                    desc: "Unkomplizierte Bewertungswege genau dort, wo deine Kunden begeistert sind (am Tresen, nach erledigtem Auftrag oder bei der Abholung).",
                  },
                  {
                    title: "Passende Formulierungen für dich & dein Team",
                    desc: "Keine plumpen Verkaufsfloskeln, sondern sympathische und natürliche Ansprachen.",
                  },
                  {
                    title: "Einbindung in Rechnungen & Bestätigungen",
                    desc: "Subtile, richtlinienkonforme Hinweise auf Rechnungen, Lieferscheinen oder Begleitdokumenten.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-100">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-coral)] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs sm:text-sm text-[var(--color-ink)] block">
                        {item.title}
                      </strong>
                      <span className="text-xs text-[var(--color-muted)]">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SÄULE 3: Customer Insights & Der monatliche Feedback-Report (Frühwarnsystem) */}
          <div className="g360-card-reveal bg-white rounded-3xl p-8 sm:p-12 border-2 border-[var(--color-line)] shadow-xl hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
                <LineChart className="w-4 h-4" />
                <span>Säule 03 · Unternehmerischer Mehrwert</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-display font-bold text-[var(--color-ink)]">
                Customer Insights &amp; Frühwarnsystem
              </h3>

              <p className="text-base text-[var(--color-muted)] leading-relaxed">
                Hier geht Google 360° entscheidend weiter: Aus einzelnen Kundenstimmen entsteht ein <strong>kontinuierliches Feedback-System</strong>. Wir erkennen wiederkehrende Muster, bevor Probleme teuer werden.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs mb-1">
                    <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Was Kunden loben:</span>
                  </div>
                  <p className="text-xs text-emerald-950 leading-relaxed">
                    Wir identifizieren Stärken, die Kunden immer wieder betonen (z. B. Freundlichkeit bestimmter Mitarbeiter, Atmosphäre, Qualität) – damit du sie bewusst beibehältst.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200">
                  <div className="flex items-center gap-2 text-rose-800 font-bold text-xs mb-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Frühwarnsystem:</span>
                  </div>
                  <p className="text-xs text-rose-950 leading-relaxed">
                    Eine Kritik kann Zufall sein. Wenn Wartezeiten oder Erreichbarkeit jedoch gehäuft auftauchen, erfährst du es sofort – bevor Kunden dauerhaft abwandern.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual MOCKUP of the Monthly Customer Report Card */}
            <div className="lg:col-span-5 bg-[var(--color-plum)] text-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 border border-white/15">
              <div className="flex items-center justify-between border-b border-white/20 pb-3">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[var(--color-coral)]" />
                  <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                    Monatsreport · Musteranalyse
                  </span>
                </div>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-white/80">
                  Beispiel
                </span>
              </div>

              {/* Sample Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm">
                  <span className="text-[10px] text-white/70 block">Bewertungen</span>
                  <span className="text-base font-bold text-white">+14 neu</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm">
                  <span className="text-[10px] text-white/70 block">Durchschnitt</span>
                  <span className="text-base font-bold text-amber-300">4,9 ★</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm">
                  <span className="text-[10px] text-white/70 block">Antwortrate</span>
                  <span className="text-base font-bold text-emerald-400">100 %</span>
                </div>
              </div>

              {/* Sample Insight Box */}
              <div className="p-3.5 rounded-xl bg-white/10 text-xs space-y-1.5 backdrop-blur-sm">
                <span className="text-[11px] font-bold text-[var(--color-coral)] uppercase tracking-wider block">
                  Erkannte Handlungsfelder:
                </span>
                <p className="text-white/90 leading-relaxed">
                  ✓ 9x Lob für Team-Freundlichkeit am Empfang. <br />
                  ⚠️ 2x Hinweis auf Wartezeiten bei Stoßzeiten am Samstag.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-xs text-white/90">
                <strong className="text-white block mb-0.5">💡 Konkrete Empfehlung für dich:</strong>
                Samstags zwischen 10:00 und 12:00 Uhr eine zusätzliche Kraft einteilen, um die Wartezeit an der Kasse zu halbieren.
              </div>
            </div>
          </div>
        </div>

        {/* OPTIONALES MODUL: Mitarbeiterschulung */}
        <div className="g360-card-reveal bg-gradient-to-r from-amber-50/80 via-orange-50/50 to-amber-50/80 rounded-3xl p-8 sm:p-12 border-2 border-amber-300/80 shadow-lg flex flex-col md:flex-row items-start md:items-center gap-8 max-w-5xl mx-auto hover:shadow-xl transition-all">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-500 text-white flex items-center justify-center shrink-0 shadow-lg">
            <Users className="w-8 h-8" />
          </div>
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-200/60 text-amber-900 text-xs font-bold font-mono">
              Optionales Modul
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-sans text-amber-950">
              Mitarbeiter vor Ort einbinden
            </h3>
            <p className="text-sm sm:text-base text-amber-900/85 leading-relaxed">
              Eine Bewertungsstrategie funktioniert erst dann, wenn sie von deinem Team ganz natürlich im Arbeitsalltag umgesetzt wird. In einer kurzen, praxistauglichen Schulung zeige ich deinen Mitarbeitern:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs sm:text-sm text-amber-950 font-medium">
              <span className="flex items-center gap-2">✓ Wann der perfekte Zeitpunkt für die Frage ist</span>
              <span className="flex items-center gap-2">✓ Wie Kunden sympathisch angesprochen werden</span>
              <span className="flex items-center gap-2">✓ Welche Sätze garantiert funktionieren</span>
              <span className="flex items-center gap-2">✓ Wie man souverän auf Kundenkritik reagiert</span>
            </div>
          </div>
        </div>

        {/* DIE 6 BAUSTEINE AUF EINEN BLICK (Hover-Glow Grid) */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-coral)]">
              Übersicht
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--color-ink)] mt-2">
              Die 6 Bausteine auf einen Blick
            </h2>
            <p className="text-sm text-[var(--color-muted)] mt-1">
              Du entscheidest flexibel, welche Bausteine für deinen Betrieb Sinn machen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Google-Präsenz aufbauen",
                desc: "Für Betriebe ohne Profil: Komplette Neuerstellung mit allen Angaben, Leistungen und Fotos.",
                icon: Building2,
                color: "text-blue-600 bg-blue-50 border-blue-200",
              },
              {
                num: "02",
                title: "Google-Präsenz optimieren",
                desc: "Für bestehende Profile: Fehler bereinigen, Rankingfaktoren stärken und Sichtbarkeit maximieren.",
                icon: Search,
                color: "text-amber-600 bg-amber-50 border-amber-200",
              },
              {
                num: "03",
                title: "Laufendes Bewertungsmanagement",
                desc: "Regelmäßige Überwachung und persönliche Beantwortung neuer Rezensionen in deinem Ton.",
                icon: MessageSquareCheck,
                color: "text-purple-600 bg-purple-50 border-purple-200",
              },
              {
                num: "04",
                title: "Echter Bewertungsaufbau",
                desc: "Ein durchdachter Prozess, damit zufriedene Kunden im richtigen Moment gerne 5 Sterne hinterlassen.",
                icon: Star,
                color: "text-emerald-600 bg-emerald-50 border-emerald-200",
              },
              {
                num: "05",
                title: "Customer Insights & Frühwarnsystem",
                desc: "Strukturierte Auswertung: Was Kunden besonders schätzen und wo betrieblicher Handlungsbedarf besteht.",
                icon: LineChart,
                color: "text-rose-600 bg-rose-50 border-rose-200",
              },
              {
                num: "06",
                title: "Monatsreport & Beratung",
                desc: "Verständliche Auswertungen, Vergleich zu den Vormonaten und konkrete Handlungsempfehlungen.",
                icon: ShieldCheck,
                color: "text-indigo-600 bg-indigo-50 border-indigo-200",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.num}
                  className="g360-card-reveal group p-7 rounded-3xl bg-white border-2 border-[var(--color-line)] shadow-md hover:shadow-2xl hover:border-[var(--color-coral)]/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center border font-bold", item.color)}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-stone-400 group-hover:text-[var(--color-coral)] transition-colors">
                        {item.num}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold font-sans text-[var(--color-ink)]">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CLOSING CTA CARD - High Converting Finish */}
        <div className="g360-card-reveal relative bg-gradient-to-b from-[var(--color-plum)] to-[#240632] text-white rounded-[2.5rem] p-8 sm:p-16 shadow-2xl text-center max-w-4xl mx-auto space-y-6 overflow-hidden border border-white/20">
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-[var(--color-coral)]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-5">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-xs font-bold text-white border border-white/20 shadow-md">
              <BrandIcon size="xs" variant="light" />
              <span>Unverbindlicher Google-Check</span>
            </span>

            <h3 className="text-3xl sm:text-5xl font-display font-bold leading-tight">
              Finden wir heraus, welches Potenzial in deiner Google-Präsenz steckt.
            </h3>

            <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
              Ich schaue mir deinen aktuellen Auftritt unverbindlich an und zeige dir, wo konkrete Verbesserungsmöglichkeiten für mehr Sichtbarkeit und echtes Kundenvertrauen liegen.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <MagneticButton>
                <ButtonLink
                  href="/#kontakt"
                  variant="primary"
                  size="lg"
                  className="shadow-xl shadow-[var(--color-coral)]/30 text-sm sm:text-base px-8 py-4"
                >
                  <span>Google-Präsenz jetzt prüfen lassen</span>
                </ButtonLink>
              </MagneticButton>

              <MagneticButton>
                <ButtonLink
                  href={whatsappUrl}
                  external={true}
                  variant="whatsapp"
                  size="lg"
                  className="shadow-lg shadow-[#25D366]/25 text-sm sm:text-base px-7 py-4"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white mr-2 shrink-0" />
                  <span>WhatsApp an Manu</span>
                </ButtonLink>
              </MagneticButton>
            </div>

            <p className="text-xs text-white/50 pt-2">
              Streng richtlinienkonform · Keine gekauften Bewertungen · Persönlich mit Manu
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}

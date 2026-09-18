"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { useGSAP, gsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { FirmenflowIcon } from "@/components/brand/FirmenflowIcon";
import {
  ArrowLeft,
  Clock,
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

      // Die Hero-Einblendung liegt in globals.css - siehe Kommentar dort.
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
              <span>Lokalpräsenz 360° · Persönlich mit Manu</span>
            </div>

            <h1 className="g360-hero-title text-4xl sm:text-6xl md:text-7xl font-display font-extrabold text-[var(--color-ink)] leading-[1.06] tracking-tight">
              Der erste Eindruck <br className="hidden sm:block" />
              <span className="text-[var(--color-plum)]">passiert bei Google.</span> <br />
              <span className="text-[var(--color-coral)] font-editorial italic font-normal">
                Nicht in deinem Betrieb.
              </span>
            </h1>

            <p className="g360-hero-body text-xl sm:text-2xl text-[var(--color-ink)] font-semibold leading-relaxed">
              Dein Google-Profil kann mehr als Öffnungszeiten anzeigen.
            </p>

            <p className="g360-hero-body text-base sm:text-lg text-[var(--color-muted)] leading-relaxed max-w-2xl">
              Egal ob Bäckerei, Handyladen oder Heizungsbauer: Wer am Niederrhein sucht, schaut zuerst auf Google Maps. Sterne, Fotos, letzte Bewertung – in drei Sekunden steht fest, wer angerufen wird. <strong>Ich sorge dafür, dass dein Auftritt vollständig, aktuell und vertrauenswürdig wirkt.</strong>
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
                  <span>Lokalpräsenz jetzt prüfen lassen</span>
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
                <FirmenflowIcon name="warnung" size={16} decorative />
                <span>Vorher: ungepflegt</span>
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
                <span>Nachher: sauber aufgesetzt</span>
              </button>
            </div>

            {/* The Simulated Local Presence Card */}
            <div className="w-full max-w-md bg-white rounded-3xl border-2 border-[var(--color-line)] shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
              {/* Local Business Profile Preview Header */}
              <div className="bg-gradient-to-r from-stone-50 to-stone-100 p-4 border-b border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FirmenflowIcon name="unternehmensprofil" size={32} decorative />
                  <div>
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                      Brancheneintrag-Vorschau
                    </span>
                    <span className="text-xs font-semibold text-[var(--color-ink)]">
                      {simulationMode === "before" ? "Ungepflegtes Profil mit Lücken" : "Sauber aufgesetzter & aktiv gepflegter Auftritt"}
                    </span>
                  </div>
                </div>
                {simulationMode === "after" && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                    <FirmenflowIcon name="profil-aufraeumen" size={16} decorative />
                    <span>Vollständig eingerichtet</span>
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
                    <FirmenflowIcon name="unternehmensprofil" size={20} decorative />
                    Wesel &amp; Niederrhein · Fachbetrieb
                  </p>
                </div>

                {/* Profile Completeness & Quality */}
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-100">
                  <FirmenflowIcon name="profil-aufraeumen" size={24} decorative />
                  <div>
                    <span className="text-xs font-bold text-[var(--color-ink)] block">
                      {simulationMode === "after" ? "Vollständige Angaben & verifizierte Kategorien" : "Lückenhafte Angaben & falsche Hauptkategorie"}
                    </span>
                    <span className="text-[11px] text-[var(--color-muted)]">
                      {simulationMode === "after" ? "Alle Kernbereiche, Leistungen & Kontaktwege gepflegt" : "Wichtige Suchbegriffe & Leistungen fehlen"}
                    </span>
                  </div>
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
                    <FirmenflowIcon name="bewertungen-beantworten" size={20} decorative />
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

                {/* Review Management Snapshot */}
                <div className="pt-3 border-t border-stone-100 text-xs space-y-2">
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                    Rezensions-Management:
                  </span>
                  {simulationMode === "after" ? (
                    <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1.5">
                      <p className="text-emerald-950 font-medium">
                        Aktiver Feedback-Prozess &amp; persönliche Antworten auf Kundenfeedback
                      </p>
                      <p className="text-[11px] text-emerald-800">
                        Zeigt potenziellen Kunden, dass der Betrieb aktiv erreichbar ist und Rückmeldungen ernst nimmt.
                      </p>
                    </div>
                  ) : (
                    <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl space-y-1">
                      <p className="text-rose-950 font-medium">
                        Keine Antworten auf Kundenfeedback oder Fragen
                      </p>
                      <p className="text-[11px] text-rose-600 italic">
                        (Letzte Rezensionen seit Monaten unkommentiert – wirkt inaktiv)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <p className="text-[11px] text-stone-400 text-center mt-2.5">
              Beispielhafte Profilvorschau – keine Kundenergebnisse oder Ranking-Zusage.
            </p>
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
                  Ich richte dein Profil für Google Suche und Maps ein. Das gehört dazu:
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-[var(--color-ink)]">
                  {[
                    "Profil einrichten oder ein vorhandenes übernehmen",
                    "Name, Adresse, Telefon überall identisch – Google mag Widersprüche nicht",
                    "Die richtige Hauptkategorie – wichtige Grundlage für die lokale Einordnung",
                    "Öffnungszeiten, die stimmen – Google wertet das inzwischen mit",
                    "Echte Fotos aus deinem Betrieb, keine Stockbilder",
                  ].map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5">
                      <FirmenflowIcon name="info-hinweis" size={20} decorative />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100 relative z-10">
                <span className="text-xs font-semibold text-amber-900 block">
                  Danach findet dich jemand, der deinen Namen nicht kennt.
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
                  Wann hast du zuletzt reingeschaut?
                </p>

                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                  Viele Betriebe sammeln über Jahre Bewertungen, beschäftigen sich aber im hektischen Alltag kaum damit:
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-[var(--color-ink)]">
                  {[
                    "Positive Bewertungen bleiben monatelang unkommentiert",
                    "Kritik bleibt unbeantwortet – oder kommt zu spät",
                    "Antworten klingen wie aus der Vorlage",
                    "Niemand wertet aus, was Kunden eigentlich sagen",
                  ].map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5">
                      <FirmenflowIcon name="warnung" size={20} decorative />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100 relative z-10">
                <span className="text-xs font-semibold text-[var(--color-plum)] block">
                  Ich kümmere mich drum – und sage dir, was drinsteht.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* DIE 3 KERNSÄULEN IM DETAIL (BENTO ARCHITECTURE) */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-coral)]">
              Die Leistung
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-[var(--color-ink)] mt-2">
              Drei Dinge, um die ich mich kümmere
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-muted)] mt-2">
              Bewertungen beantworten. Neue Bewertungen bekommen. Verstehen, was drinsteht.
            </p>
          </div>

          {/* SÄULE 1: Bewertungen beantworten */}
          <div className="g360-card-reveal bg-white rounded-3xl p-8 sm:p-12 border-2 border-[var(--color-line)] shadow-xl hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                <FirmenflowIcon name="bewertungen-beantworten" size={20} decorative />
                <span>01 · Bewertungen beantworten</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-display font-bold text-[var(--color-ink)]">
                Jede Bewertung bekommt eine Antwort
              </h3>

              <p className="text-base text-[var(--color-muted)] leading-relaxed">
                Auf Wunsch übernehme ich das komplett. Neue Bewertung kommt rein, ich lese sie, ich antworte – in deinem Namen und in deinem Ton.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 hover:bg-stone-100/70 transition-colors">
                  <FirmenflowIcon name="texte-copywriting" size={40} decorative className="mb-2" />
                  <strong className="text-[var(--color-ink)] text-sm block mb-1">
                    Klingt nach dir
                  </strong>
                  <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                    Wir legen vorher fest, wie du klingst. Danach liest niemand, dass da jemand anderes tippt.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 hover:bg-stone-100/70 transition-colors">
                  <FirmenflowIcon name="datenschutz" size={40} decorative className="mb-2" />
                  <strong className="text-[var(--color-ink)] text-sm block mb-1">
                    Ruhig bleiben, wenn&apos;s Ärger gibt
                  </strong>
                  <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                    Bei einer schlechten Bewertung zählt der Ton. Sachlich antworten wirkt auf die, die mitlesen, oft besser als die Bewertung selbst.
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
                <li className="flex items-center gap-2">✓ Bei Lob: danken, ohne floskelhaft zu werden</li>
                <li className="flex items-center gap-2">✓ Auf das eingehen, was der Kunde wirklich erwähnt hat</li>
                <li className="flex items-center gap-2">✓ Bei Kritik: sachlich, kurz, ohne Rechtfertigung</li>
                <li className="flex items-center gap-2">✓ Bei heiklen Fällen frage ich dich vorher</li>
                <li className="flex items-center gap-2">✓ Immer derselbe Ton – egal wer gerade schreibt</li>
              </ul>
            </div>
          </div>

          {/* SÄULE 2: Systematischer Aufbau echter Bewertungen */}
          <div className="g360-card-reveal bg-white rounded-3xl p-8 sm:p-12 border-2 border-[var(--color-line)] shadow-xl hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 bg-gradient-to-br from-amber-50/80 via-white to-amber-50/40 rounded-2xl p-6 sm:p-8 border border-amber-200 shadow-sm space-y-4 order-2 lg:order-1">
              <FirmenflowIcon name="mehr-bewertungen" size={48} decorative />
              <h4 className="text-lg font-bold text-[var(--color-ink)]">
                Warum so wenige schreiben:
              </h4>
              <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                Nicht aus Unzufriedenheit. Meistens fehlt im Moment einfach der Anstoß – und zu Hause denkt keiner mehr dran.
              </p>
              <div className="p-3.5 bg-white border border-amber-300 rounded-xl text-xs text-amber-950 font-medium shadow-sm">
                <strong>Regelkonform:</strong> Keine gekauften Bewertungen, kein Drängen. Nur echte Kunden, die von selbst schreiben.
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                <FirmenflowIcon name="mehr-bewertungen" size={20} decorative />
                <span>02 · Mehr Bewertungen bekommen</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-display font-bold text-[var(--color-ink)]">
                Zufriedene Kunden schreiben selten von allein
              </h3>

              <p className="text-base text-[var(--color-muted)] leading-relaxed">
                Gute Arbeit allein bringt keine Bewertungen. Es braucht jemanden, der im richtigen Moment fragt. Wir überlegen gemeinsam, wann das bei dir ist:
              </p>

              <div className="space-y-3 pt-2">
                {[
                  {
                    title: "Der richtige Moment",
                    desc: "Am Tresen. Nach dem Auftrag. Bei der Abholung. Da, wo der Kunde gerade zufrieden ist – nicht drei Tage später per Mail.",
                  },
                  {
                    title: "Sätze, die du wirklich sagen würdest",
                    desc: "Kein auswendig gelernter Spruch. Ein Satz, der zu dir passt und den dein Team sich merken kann.",
                  },
                  {
                    title: "Auf Rechnung und Lieferschein",
                    desc: "Ein kurzer Hinweis auf Papieren, die der Kunde ohnehin in der Hand hat.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-100">
                    <FirmenflowIcon name="mehr-bewertungen" size={24} decorative />
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

          {/* SÄULE 3: Verstehen, was drinsteht - der monatliche Report */}
          <div className="g360-card-reveal bg-white rounded-3xl p-8 sm:p-12 border-2 border-[var(--color-line)] shadow-xl hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
                <FirmenflowIcon name="monatsreport" size={20} decorative />
                <span>03 · Feedback nutzen &amp; Betrieb verbessern</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-display font-bold text-[var(--color-ink)]">
                Kundenfeedback als Chance: Wissen, wo du ansetzen kannst
              </h3>

              <p className="text-base text-[var(--color-muted)] leading-relaxed">
                Eine schlechte Bewertung ist ärgerlich. <strong>Wiederholte Kritik ist ein wertvoller Hinweis.</strong> Einmal im Monat werte ich alle Rezensionen für dich aus: Du erfährst konkret, welche Kritikpunkte und Kundenwünsche aufkommen, wo du deinen Betrieb verbessern und wo du dein Team gezielt schulen kannst.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs mb-1">
                    <FirmenflowIcon name="lob" size={24} decorative />
                    <span>Was Kunden begeistert:</span>
                  </div>
                  <p className="text-xs text-emerald-950 leading-relaxed">
                    Wenn Gäste und Kunden deine Beratung oder Zuverlässigkeit loben, weißt du genau, was dein Team auszeichnet und womit du werben solltest.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200">
                  <div className="flex items-center gap-2 text-rose-800 font-bold text-xs mb-1">
                    <FirmenflowIcon name="wiederkehrendes-problem" size={24} decorative />
                    <span>Kritikpunkte &amp; Schulungsbedarf:</span>
                  </div>
                  <p className="text-xs text-rose-950 leading-relaxed">
                    Taucht Kritik an Wartezeiten oder Service mehrfach auf, bekommst du ein klares Signal, wo Abläufe haken oder Mitarbeiter Unterstützung brauchen – bevor es dauerhaft Sterne kostet.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual MOCKUP of the Monthly Customer Report Card */}
            <div className="lg:col-span-5 bg-[var(--color-plum)] text-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 border border-white/15">
              <div className="flex items-center justify-between border-b border-white/20 pb-3">
                <div className="flex items-center gap-2">
                  <FirmenflowIcon name="monatsreport" size={28} decorative />
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
                  Was mir aufgefallen ist:
                </span>
                <div className="flex items-start gap-2 text-white/90 leading-relaxed">
                  <FirmenflowIcon name="lob" size={24} decorative />
                  <span>9x Lob für Team-Freundlichkeit am Empfang.</span>
                </div>
                <div className="flex items-start gap-2 text-white/90 leading-relaxed">
                  <FirmenflowIcon name="warnung" size={24} decorative />
                  <span>2x Hinweis auf Wartezeiten bei Stoßzeiten am Samstag.</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-xs text-white/90">
                <div className="mb-1 flex items-center gap-2">
                  <FirmenflowIcon name="handlungsempfehlung" size={24} decorative />
                  <strong className="text-white">Mein Vorschlag:</strong>
                </div>
                Samstags zwischen 10:00 und 12:00 Uhr eine zusätzliche Kraft einteilen, um die Wartezeit an der Kasse zu halbieren.
              </div>
            </div>
          </div>
        </div>

        {/* OPTIONALES MODUL: Mitarbeiterschulung */}
        <div className="g360-card-reveal bg-gradient-to-r from-amber-50/80 via-orange-50/50 to-amber-50/80 rounded-3xl p-8 sm:p-12 border-2 border-amber-300/80 shadow-lg flex flex-col md:flex-row items-start md:items-center gap-8 max-w-5xl mx-auto hover:shadow-xl transition-all">
          <FirmenflowIcon name="team-schulung" size={72} decorative />
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-200/60 text-amber-900 text-xs font-bold font-mono">
              Optional
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-sans text-amber-950">
              Dein Team macht mit
            </h3>
            <p className="text-sm sm:text-base text-amber-900/85 leading-relaxed">
              Am Ende fragt nicht du, sondern dein Team. In einer kurzen Schulung gehe ich mit deinen Leuten durch:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs sm:text-sm text-amber-950 font-medium">
              <span className="flex items-center gap-2">✓ Wann man fragt – und wann besser nicht</span>
              <span className="flex items-center gap-2">✓ Wie man es anspricht, ohne aufdringlich zu wirken</span>
              <span className="flex items-center gap-2">✓ Welche Sätze sich im Alltag bewährt haben</span>
              <span className="flex items-center gap-2">✓ Was man sagt, wenn sich jemand beschwert</span>
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
              Die sechs Bausteine
            </h2>
            <p className="text-sm text-[var(--color-muted)] mt-1">
              Du entscheidest, welche davon du brauchst.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {([
              {
                num: "01",
                title: "Profil aufbauen",
                desc: "Noch kein Google-Profil? Ich lege es an – mit allen Angaben, Leistungen und echten Fotos.",
                iconName: "profil-einrichten" as const,
              },
              {
                num: "02",
                title: "Profil aufräumen",
                desc: "Falsche Angaben raus, richtige Kategorien rein, Fotos und Texte auf Stand.",
                iconName: "profil-aufraeumen" as const,
              },
              {
                num: "03",
                title: "Bewertungen beantworten",
                desc: "Ich lese jede neue Bewertung und antworte in deinem Ton, ohne dass du dran denken musst.",
                iconName: "bewertungen-beantworten" as const,
              },
              {
                num: "04",
                title: "Mehr Bewertungen bekommen",
                desc: "Ein Ablauf, mit dem dein Team im richtigen Moment fragt. Ohne Drängen.",
                iconName: "mehr-bewertungen" as const,
              },
              {
                num: "05",
                title: "Auswertung",
                desc: "Was Kunden immer wieder loben – und was sich an Kritik häuft.",
                iconName: "lob" as const,
              },
              {
                num: "06",
                title: "Monatsreport",
                desc: "Einmal im Monat verständlich zusammengefasst, mit Vergleich zum Vormonat und einem konkreten Vorschlag.",
                iconName: "monatsreport" as const,
              },
            ] as const).map((item) => {
              return (
                <div
                  key={item.num}
                  className="g360-card-reveal group p-7 rounded-3xl bg-white border-2 border-[var(--color-line)] shadow-md hover:shadow-2xl hover:border-[var(--color-coral)]/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <FirmenflowIcon name={item.iconName} size={48} decorative />
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

        {/* PREISE */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-coral)]">
              Preise
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--color-ink)] mt-2">
              Was es kostet
            </h2>
            <p className="text-sm text-[var(--color-muted)] mt-1">
              Alle Preise netto. Keine Mindestlaufzeit, keine Einrichtungsgebühr obendrauf.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            <div className="g360-card-reveal p-7 sm:p-8 rounded-3xl bg-white border-2 border-[var(--color-line)] shadow-md space-y-5">
              <div className="flex items-center gap-3">
                <FirmenflowIcon name="profil-einrichten" size={44} decorative />
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-muted)]">
                    Einmalig
                  </span>
                  <h3 className="text-xl font-bold text-[var(--color-ink)] mt-1">Einrichtung</h3>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-baseline justify-between gap-3 pb-3 border-b border-[var(--color-line)]">
                  <span className="text-sm text-[var(--color-ink)]">Profil aufbauen</span>
                  <span className="text-2xl font-display font-bold text-[var(--color-ink)] shrink-0">290 €</span>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm text-[var(--color-ink)]">Profil aufräumen</span>
                  <span className="text-2xl font-display font-bold text-[var(--color-ink)] shrink-0">190 €</span>
                </div>
              </div>
              <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                Kategorien, Angaben, Leistungen, Beschreibung und Verifizierung. Bilder lieferst du – oder wir machen einen Fototermin.
              </p>
            </div>

            <div className="g360-card-reveal p-7 sm:p-8 rounded-3xl bg-[var(--color-plum)] text-white border-2 border-[var(--color-plum)] shadow-2xl space-y-5 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-52 h-52 bg-[var(--color-coral)]/25 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 space-y-5">
                <div className="flex items-center gap-3">
                  <FirmenflowIcon name="monatlich-kuendbar" size={44} decorative />
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-coral)]">
                      Monatlich
                    </span>
                    <h3 className="text-xl font-bold mt-1">Betreuung</h3>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-display font-bold">99 €</span>
                  <span className="text-sm text-white/70">/ Monat</span>
                </div>
                <ul className="space-y-2.5 text-sm text-white/90">
                  <li className="flex items-start gap-2.5">
                    <FirmenflowIcon name="bewertungen-beantworten" size={24} decorative />
                    <span>Jede neue Bewertung wird beantwortet</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <FirmenflowIcon name="monatsreport" size={24} decorative />
                    <span>Monatsreport mit konkretem Vorschlag</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <FirmenflowIcon name="profil-aufraeumen" size={24} decorative />
                    <span>Profil bleibt aktuell und gepflegt</span>
                  </li>
                </ul>
                <div className="p-3.5 rounded-2xl bg-white/10 border border-white/20 text-sm font-semibold">
                  Monatlich kündbar. Keine zwölf Monate Mindestlaufzeit.
                </div>
              </div>
            </div>

            <div className="g360-card-reveal p-7 sm:p-8 rounded-3xl bg-white border-2 border-[var(--color-line)] shadow-md space-y-5">
              <div className="flex items-center gap-3">
                <FirmenflowIcon name="angebot" size={44} decorative />
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-muted)]">
                    Wenn du willst
                  </span>
                  <h3 className="text-xl font-bold text-[var(--color-ink)] mt-1">Dazu buchbar</h3>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-baseline justify-between gap-3 pb-3 border-b border-[var(--color-line)]">
                  <span className="text-sm text-[var(--color-ink)]">Fototermin vor Ort</span>
                  <span className="text-2xl font-display font-bold text-[var(--color-ink)] shrink-0">350 €</span>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm text-[var(--color-ink)]">Team-Schulung</span>
                  <span className="text-2xl font-display font-bold text-[var(--color-ink)] shrink-0">150 €</span>
                </div>
              </div>
              <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                Echte Fotos aus deinem Betrieb statt Stockbildern. Und eine kurze Schulung, damit dein Team im richtigen Moment nach Bewertungen fragt.
              </p>
            </div>
          </div>
        </div>

        {/* CLOSING CTA CARD - High Converting Finish */}
        <div className="g360-card-reveal relative bg-gradient-to-b from-[var(--color-plum)] to-[#240632] text-white rounded-[2.5rem] p-8 sm:p-16 shadow-2xl text-center max-w-4xl mx-auto space-y-6 overflow-hidden border border-white/20">
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-[var(--color-coral)]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-5">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-xs font-bold text-white border border-white/20 shadow-md">
              <BrandIcon size="xs" variant="light" />
              <span>Unverbindlicher Lokalpräsenz-Check</span>
            </span>

            <h3 className="text-3xl sm:text-5xl font-display font-bold leading-tight">
              Ich schaue mir an, wie dein Betrieb bei Google dasteht.
            </h3>

            <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
              Kostet nichts und verpflichtet zu nichts. Ich sage dir, was ich sehe und was ich als Erstes ändern würde. Ob du das dann mit mir machst oder selbst, ist deine Sache.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <MagneticButton>
                <ButtonLink
                  href="/#kontakt"
                  variant="primary"
                  size="lg"
                  className="shadow-xl shadow-[var(--color-coral)]/30 text-sm sm:text-base px-8 py-4"
                >
                  <span>Lokalpräsenz jetzt prüfen lassen</span>
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

        {/* Rechtlicher Marken-Disclaimer */}
        <div className="max-w-3xl mx-auto text-center pt-8 border-t border-[var(--color-line)] text-xs text-[var(--color-muted)] leading-relaxed">
          <p>
            <strong>Rechtlicher Hinweis:</strong> Google, Google Maps, Google Search und Google Unternehmensprofil (Google Business Profile) sind eingetragene Marken der Google LLC. Firmenflow (Inh. Manuel Landeck) ist ein unabhängiger Dienstleister für Webdesign, lokale Auffindbarkeit und Suchmaschinenoptimierung und steht in keiner geschäftlichen, gesellschaftsrechtlichen oder offiziellen Partnerschaft oder Verbindung zur Google LLC.
          </p>
        </div>
      </Container>
    </main>
  );
}

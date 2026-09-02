import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Star, Search, MessageSquareCheck, LineChart, Users, AlertCircle, ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Google Business 360° – Profil, Bewertungsmanagement & Customer Insights",
  description:
    "Bei Google gefunden werden, Vertrauen aufbauen und aus Kundenfeedback lernen. Professionelles Google-Unternehmensprofil, Bewertungsmanagement & monatlicher Feedback-Report für Betriebe am Niederrhein.",
  alternates: {
    canonical: "/google-business-360",
  },
};

export default function GoogleBusiness360Page() {
  const whatsappUrl = buildWhatsAppUrl(
    undefined,
    "Hallo Manu, ich interessiere mich für Google Business 360° und möchte meine Google-Präsenz prüfen lassen."
  );

  return (
    <main id="main" className="pt-32 sm:pt-40 pb-28">
      <Container className="space-y-16 sm:space-y-24">
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-muted)] hover:text-[var(--color-plum)] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Zurück zur Startseite</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-coral)]/10 border border-[var(--color-coral)]/25 text-xs sm:text-sm font-bold text-[var(--color-coral)] shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span>Google Business 360° · Persönlich mit Manu</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-bold text-[var(--color-ink)] leading-[1.08] tracking-tight">
            Bei Google gefunden werden. <br className="hidden sm:block" />
            <span className="text-[var(--color-plum)]">Vertrauen aufbauen.</span> <br />
            <span className="text-[var(--color-coral)] font-editorial italic">Aus Kundenfeedback lernen.</span>
          </h1>

          <p className="text-xl sm:text-2xl text-[var(--color-ink)] font-semibold leading-relaxed pt-2">
            Deine Google-Präsenz sollte mehr können, als nur deine Öffnungszeiten anzuzeigen.
          </p>

          <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed max-w-3xl">
            Wenn Menschen heute nach einem Handwerker, Restaurant, Friseur oder Dienstleister suchen, beginnt die Entscheidung fast immer bei Google Maps und den Bewertungen. Wie wirkt dein Betrieb dort? Werden Rezensionen professionell beantwortet? Und vor allem: <strong>Nutzt du die wertvollen Rückmeldungen deiner Kunden überhaupt für dein Unternehmen?</strong>
          </p>

          {/* Quick Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <MagneticButton>
              <ButtonLink
                href="/#kontakt"
                variant="primary"
                size="lg"
                className="shadow-xl shadow-[var(--color-coral)]/25 text-sm sm:text-base px-7 py-3.5"
              >
                <span>Google-Präsenz prüfen lassen</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </ButtonLink>
            </MagneticButton>

            <MagneticButton>
              <ButtonLink
                href={whatsappUrl}
                external={true}
                variant="whatsapp"
                size="lg"
                className="shadow-lg shadow-[#25D366]/20 text-sm sm:text-base px-6 py-3.5"
              >
                <WhatsAppIcon className="w-5 h-5 text-white mr-1.5 shrink-0" />
                <span>WhatsApp an Manu</span>
              </ButtonLink>
            </MagneticButton>
          </div>
        </div>

        {/* Die 2 Ausgangssituationen */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-coral)]">
              Ausgangslage
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[var(--color-ink)] mt-2">
              Wo steht dein Betrieb aktuell?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Situation 1: Noch kein Profil */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[var(--color-line)] shadow-lg flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-[var(--color-plum)] transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xl">
                  01
                </div>
                <h3 className="text-2xl font-bold font-sans text-[var(--color-ink)]">
                  Du hast noch kein Google-Unternehmensprofil?
                </h3>
                <p className="text-sm font-semibold text-[var(--color-coral)]">
                  Dann starten wir gemeinsam bei null.
                </p>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                  Ich unterstütze dich beim professionellen Aufbau deiner Präsenz in Google Suche und Google Maps – sauber, vollständig und auf deinen Betrieb zugeschnitten:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--color-ink)]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Einrichtung oder saubere Übernahme deines Profils</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Prüfung und Optimierung aller Unternehmensinformationen</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Passende Primär- und Nebenkategorien sowie Leistungslisten</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Öffnungszeiten, Kontaktdaten &amp; ansprechende Beschreibung</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Hochwertige Bilder und nahtlose Verknüpfung mit deiner Website</span>
                  </li>
                </ul>
              </div>
              <p className="text-xs italic text-[var(--color-muted)] pt-4 border-t border-stone-100">
                Damit dein Google-Eintrag nicht einfach nur existiert, sondern aktiv Kunden anzieht.
              </p>
            </div>

            {/* Situation 2: Profil existiert bereits */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[var(--color-line)] shadow-lg flex flex-col justify-between space-y-6 relative overflow-hidden group hover:border-[var(--color-plum)] transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[var(--color-plum)]/10 text-[var(--color-plum)] flex items-center justify-center font-bold text-xl">
                  02
                </div>
                <h3 className="text-2xl font-bold font-sans text-[var(--color-ink)]">
                  Du hast bereits ein Google-Unternehmensprofil?
                </h3>
                <p className="text-sm font-semibold text-[var(--color-plum)]">
                  Dann stellt sich die Frage: Nutzt du das Potenzial wirklich?
                </p>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                  Viele Betriebe sammeln über Jahre Bewertungen, beschäftigen sich aber im stressigen Arbeitsalltag kaum damit:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--color-ink)]">
                  <li className="flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>Positive Rezensionen bleiben oft monatelang unbeantwortet</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>Kritik wird übersehen, zu spät oder emotional beantwortet</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>Antworten bestehen nur aus immer gleichen Copy-Paste-Floskeln</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>Wertvolle Rückmeldungen der Kunden versickern ungenutzt</span>
                  </li>
                </ul>
              </div>
              <p className="text-xs font-semibold text-[var(--color-plum)] pt-4 border-t border-stone-100">
                Dabei erzählen dir deine Kunden jeden Monat genau, was funktioniert – und was nicht. Ich mache diese Daten für dich nutzbar.
              </p>
            </div>
          </div>
        </div>

        {/* Die 3 Hauptsäulen im Detail */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-coral)]">
              Die 3 Kernsäulen
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-[var(--color-ink)] mt-2">
              Was Google Business 360° leistet
            </h2>
          </div>

          {/* Säule 1: Bewertungsmanagement */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[var(--color-line)] shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                <MessageSquareCheck className="w-3.5 h-3.5" />
                <span>Säule 1</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-[var(--color-ink)]">
                Professionelles Bewertungsmanagement
              </h3>
              <p className="text-base text-[var(--color-muted)] leading-relaxed">
                Ich übernehme auf Wunsch die laufende Betreuung deiner Google-Bewertungen. Neue Rezensionen werden zeitnah geprüft, eingeordnet und passend zu deinem Unternehmen beantwortet.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-100 text-xs sm:text-sm">
                  <strong className="text-[var(--color-ink)] block mb-1">Keine Copy-Paste-Roboter:</strong>
                  <span className="text-[var(--color-muted)]">Individuelle Formulierungen in deiner echten Unternehmenssprache.</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-100 text-xs sm:text-sm">
                  <strong className="text-[var(--color-ink)] block mb-1">Souveräner Umgang mit Kritik:</strong>
                  <span className="text-[var(--color-muted)]">Sensible Rezensionen werden deeskalierend und professionell behandelt.</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 bg-gradient-to-br from-[var(--color-plum)]/10 to-[var(--color-coral)]/10 rounded-2xl p-6 sm:p-8 border border-[var(--color-line)] space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-plum)]">Qualitätsgarantie</span>
              <p className="text-sm font-semibold text-[var(--color-ink)]">Jede Antwort orientiert sich an:</p>
              <ul className="space-y-2 text-xs sm:text-sm text-[var(--color-muted)]">
                <li className="flex items-center gap-2">✓ Deinem persönlichen Ton und Werten</li>
                <li className="flex items-center gap-2">✓ Dem konkreten Anliegen des Kunden</li>
                <li className="flex items-center gap-2">✓ Wertschätzung bei Lob &amp; Empfehlungen</li>
                <li className="flex items-center gap-2">✓ Rücksprache bei sensiblen Vorfällen</li>
              </ul>
            </div>
          </div>

          {/* Säule 2: Mehr echte Bewertungen */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[var(--color-line)] shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 bg-stone-50 rounded-2xl p-6 sm:p-8 border border-[var(--color-line)] space-y-4 order-2 lg:order-1">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              </div>
              <h4 className="text-lg font-bold text-[var(--color-ink)]">Das Kernproblem gelöst:</h4>
              <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                Zufriedene Kunden verlassen dein Geschäft oft, ohne zu bewerten – nicht weil sie unzufrieden waren, sondern weil im Alltag der passende Impuls fehlte.
              </p>
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-medium">
                100 % richtlinienkonform: Keine gekauften Bewertungen, kein Zwang – echte Stimmen realer Kunden.
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>Säule 2</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-[var(--color-ink)]">
                Systematischer Aufbau echter Bewertungen
              </h3>
              <p className="text-base text-[var(--color-muted)] leading-relaxed">
                Gute Arbeit allein führt selten automatisch zu vielen Bewertungen. Wir entwickeln gemeinsam einen unkomplizierten Prozess, mit dem du Kunden im richtigen Moment erreichst:
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--color-ink)]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-coral)] shrink-0 mt-0.5" />
                  <span>Smarte Bewertungswege an den idealen Kontaktpunkten im Kundenalltag</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-coral)] shrink-0 mt-0.5" />
                  <span>Natürliche Formulierungen &amp; Vorlagen für dich und dein Team</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-coral)] shrink-0 mt-0.5" />
                  <span>Einbindung in Angebote, Rechnungen oder digitale Nachrichten</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Säule 3: Insights & Frühwarnsystem */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[var(--color-line)] shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold">
                <LineChart className="w-3.5 h-3.5" />
                <span>Säule 3</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-[var(--color-ink)]">
                Customer Insights &amp; Frühwarnsystem
              </h3>
              <p className="text-base text-[var(--color-muted)] leading-relaxed">
                Genau hier geht Google 360° einen entscheidenden Schritt weiter als gewöhnliche Agenturen: Wir betrachten Rezensionen nicht nur einzeln, sondern <strong>erkennen Muster</strong>.
              </p>
              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                  <strong className="text-emerald-950 text-xs sm:text-sm block mb-1">Was deine Kunden besonders schätzen:</strong>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    Wir identifizieren Themen, die regelmäßig positiv erwähnt werden (z. B. Freundlichkeit bestimmter Mitarbeiter, Beratungsqualität, Atmosphäre, Zuverlässigkeit) – damit du deine Stärken kennst und bewahrst.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200">
                  <strong className="text-rose-950 text-xs sm:text-sm block mb-1">Frühwarnsystem für Reibungspunkte:</strong>
                  <p className="text-xs text-rose-900 leading-relaxed">
                    Eine einzelne Kritik ist Zufall. Wenn Wartezeiten, Erreichbarkeit oder organisatorische Abläufe jedoch wiederholt auftauchen, wird daraus eine wertvolle Information – bevor Kunden abwandern.
                  </p>
                </div>
              </div>
            </div>

            {/* Der monatliche Report Teaser */}
            <div className="lg:col-span-5 bg-[var(--color-plum)] text-white rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/15 pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-coral)]">Monats-Report</span>
                <span className="text-xs text-white/70">Erkenntnisse statt Zahlen</span>
              </div>
              <h4 className="text-xl font-bold font-sans">Dein Feedback-Report umfasst:</h4>
              <ul className="space-y-2.5 text-xs text-white/85">
                <li className="flex items-center gap-2">📊 Entwicklung der Rezensionen &amp; Sterne</li>
                <li className="flex items-center gap-2">💬 Wichtigste Lob- &amp; Kritik-Schwerpunkte</li>
                <li className="flex items-center gap-2">📈 Trendvergleich zu den Vormonaten</li>
                <li className="flex items-center gap-2">💡 Konkrete unternehmerische Handlungsempfehlungen</li>
              </ul>
              <p className="text-xs text-white/60 italic pt-2">
                Damit du immer genau weißt, wie dein Betrieb von außen wahrgenommen wird.
              </p>
            </div>
          </div>
        </div>

        {/* Optional: Mitarbeiterschulung */}
        <div className="bg-gradient-to-r from-amber-50/70 via-orange-50/50 to-amber-50/70 rounded-3xl p-8 sm:p-10 border border-amber-200/80 max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
            <Users className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800">Optionales Modul</span>
            <h3 className="text-xl sm:text-2xl font-bold font-sans text-amber-950">
              Mitarbeiter vor Ort einbinden
            </h3>
            <p className="text-xs sm:text-sm text-amber-900/80 leading-relaxed">
              Die beste Strategie wirkt erst, wenn dein Team sie mitträgt. In einer kurzen, praxistauglichen Einweisung zeige ich deinen Mitarbeitern, wann der richtige Zeitpunkt für die Bitte um Feedback ist und wie man Kunden ganz natürlich und ohne aufdringliche Floskeln anspricht.
            </p>
          </div>
        </div>

        {/* Die 6 Bausteine auf einen Blick */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--color-ink)]">
              Die 6 Bausteine auf einen Blick
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-1">
              Du entscheidest, wie viel Unterstützung dein Betrieb benötigt.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "1. Google-Präsenz aufbauen", desc: "Für Betriebe ohne Profil: Komplette Neuerstellung mit allen Angaben, Kategorien und Leistungen." },
              { title: "2. Google-Präsenz optimieren", desc: "Für bestehende Profile: Fehler bereinigen, Ranking-Faktoren stärken und Außenwirkung schärfen." },
              { title: "3. Laufendes Bewertungsmanagement", desc: "Überwachung und professionelle Beantwortung aller Rezensionen in deinem authentischen Unternehmenston." },
              { title: "4. Echter Bewertungsaufbau", desc: "Ein praxisnaher Ablauf, mit dem zufriedene Kunden im richtigen Moment unkompliziert bewerten." },
              { title: "5. Customer Insights", desc: "Mustererkennung aus Kundenstimmen: Wiederkehrendes Lob und Kritikpunkte strukturiert sichtbar machen." },
              { title: "6. Monatlicher Report & Beratung", desc: "Verständliche Auswertungen, Entwicklungs-Trends und klare Handlungsempfehlungen für deinen Alltag." },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl bg-white border border-[var(--color-line)] shadow-sm space-y-2">
                <h4 className="text-base font-bold text-[var(--color-ink)] font-sans">{item.title}</h4>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Abschluss CTA Card */}
        <div className="bg-[var(--color-plum)] text-white rounded-3xl p-8 sm:p-14 shadow-2xl text-center max-w-3xl mx-auto space-y-6 relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-60 h-60 bg-[var(--color-coral)]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-[var(--color-coral)] border border-white/15">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Unverbindlicher Check</span>
            </span>

            <h3 className="text-3xl sm:text-4xl font-display font-bold leading-tight">
              Finden wir heraus, welches Potenzial in deiner Google-Präsenz steckt.
            </h3>

            <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
              Ich schaue mir deinen aktuellen Auftritt unverbindlich an und zeige dir, an welchen Stellschrauben wir für mehr Sichtbarkeit, bessere Kundenbindung und echte Bewertungen drehen können.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <MagneticButton>
                <ButtonLink
                  href="/#kontakt"
                  variant="primary"
                  size="lg"
                  className="shadow-xl shadow-[var(--color-coral)]/30 text-sm sm:text-base px-7 py-3.5"
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
                  className="text-sm sm:text-base px-6 py-3.5"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white mr-1.5 shrink-0" />
                  <span>WhatsApp an Manu</span>
                </ButtonLink>
              </MagneticButton>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FirmenflowButton } from "@/components/ui/FirmenflowButton";
import { FirmenflowIcon } from "@/components/brand/FirmenflowIcon";

export function RatgeberTeaserSection() {
  return (
    <section
      id="selbst-checks"
      aria-label="Praxiswissen und interaktive Selbst-Checks"
      className="py-20 sm:py-28 bg-[var(--color-paper)] border-y border-[var(--color-line)] relative overflow-hidden"
    >
      {/* Sanfter Deko-Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 -left-48 -translate-y-1/2 w-96 h-96 rounded-full bg-[var(--color-coral)]/10 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 -right-48 -translate-y-1/2 w-96 h-96 rounded-full bg-[var(--color-plum)]/10 blur-3xl pointer-events-none"
      />

      <Container className="space-y-12 sm:space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[var(--color-line)] text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-coral)] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[var(--color-coral)] animate-pulse" />
            <span>Praxiswissen &amp; Selbst-Checks</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-bold text-[var(--color-ink)] leading-tight">
            Wie fit ist dein Betrieb digital?
          </h2>

          <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed">
            Finde in 2 Minuten spielerisch heraus, wo deine Website oder dein Google-Profil Neukunden verliert. Kostenlos, ohne Anmeldung und mit sofortiger Auswertung direkt im Beitrag.
          </p>
        </div>

        {/* 2 Conversion-Kacheln mit den interaktiven Checks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Karte 1: Website-Fehler */}
          <div className="rounded-[2.5rem] bg-white border border-[var(--color-line)] p-8 sm:p-10 shadow-sm hover:border-[var(--color-coral)]/40 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-[var(--color-paper)] text-xs font-mono font-bold text-[var(--color-plum)]">
                  Website &amp; Vertrauen
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--color-coral)] bg-[var(--color-coral)]/10 px-3 py-1 rounded-full border border-[var(--color-coral)]/20">
                  ⚡ 5 &amp; 10 Fragen Quiz
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-[var(--color-ink)] leading-snug">
                Die 5 typischen Website-Fehler lokaler Betriebe
              </h3>

              <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
                Deine Stammkunden kennen deine Qualität, Neukunden noch nicht. Fünf Stellen an deiner Website, die du in zwei Minuten am Handy selbst prüfen kannst.
              </p>

              <ul className="space-y-2.5 pt-2 text-sm text-[var(--color-ink)]">
                <li className="flex items-center gap-2.5">
                  <FirmenflowIcon name="erfolg" size={20} decorative />
                  <span>Jede Sekunde Ladezeit zählt (Messung der BBC)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <FirmenflowIcon name="erfolg" size={20} decorative />
                  <span>Anrufen mit einem Daumentipp</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <FirmenflowIcon name="erfolg" size={20} decorative />
                  <span>Echte Werkstattfotos statt Katalogbilder</span>
                </li>
              </ul>
            </div>

            <div className="pt-2 border-t border-[var(--color-line)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <FirmenflowButton
                href="/ratgeber/website-fehler-lokale-betriebe"
                buttonIcon="flowscreen"
                subline="Inkl. interaktivem Selbst-Check"
              >
                Website-Check starten
              </FirmenflowButton>

              <Link
                href="/ratgeber/website-fehler-lokale-betriebe"
                className="text-xs font-bold text-[var(--color-muted)] hover:text-[var(--color-coral)] transition-colors inline-flex items-center gap-1"
              >
                <span>Artikel lesen</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Karte 2: Google Maps nicht gefunden */}
          <div className="rounded-[2.5rem] bg-white border border-[var(--color-line)] p-8 sm:p-10 shadow-sm hover:border-[var(--color-plum)]/40 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-[var(--color-paper)] text-xs font-mono font-bold text-[var(--color-plum)]">
                  Lokale Sichtbarkeit
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--color-coral)] bg-[var(--color-coral)]/10 px-3 py-1 rounded-full border border-[var(--color-coral)]/20">
                  ⚡ 5 &amp; 10 Fragen Quiz
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-[var(--color-ink)] leading-snug">
                Warum dein Betrieb bei Google Maps nicht gefunden wird
              </h3>

              <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
                Ein Kunde steht 400 Meter entfernt und sucht deine Leistung, bekommt aber andere Betriebe angezeigt? Finde heraus, warum du fehlst und was du selbst ändern kannst.
              </p>

              <ul className="space-y-2.5 pt-2 text-sm text-[var(--color-ink)]">
                <li className="flex items-center gap-2.5">
                  <FirmenflowIcon name="erfolg" size={20} decorative />
                  <span>Die drei Faktoren, nach denen Google vor allem entscheidet</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <FirmenflowIcon name="erfolg" size={20} decorative />
                  <span>Selbsttest mit fünf Fragen zu deinem Google-Profil</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <FirmenflowIcon name="erfolg" size={20} decorative />
                  <span>Eigene Erhebung: 198 Betriebe im Raum Wesel</span>
                </li>
              </ul>
            </div>

            <div className="pt-2 border-t border-[var(--color-line)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <FirmenflowButton
                href="/ratgeber/google-maps-nicht-gefunden"
                buttonIcon="details"
                subline="Inkl. interaktivem Selbst-Check"
              >
                Google-Maps-Check starten
              </FirmenflowButton>

              <Link
                href="/ratgeber/google-maps-nicht-gefunden"
                className="text-xs font-bold text-[var(--color-muted)] hover:text-[var(--color-coral)] transition-colors inline-flex items-center gap-1"
              >
                <span>Artikel lesen</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer-Hinweis zur gesamten Ratgeber-Kategorie */}
        <div className="text-center pt-2">
          <Link
            href="/ratgeber"
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-plum)] hover:text-[var(--color-coral)] transition-colors"
          >
            <span>Alle Ratgeber-Beiträge &amp; Themen ansehen</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}

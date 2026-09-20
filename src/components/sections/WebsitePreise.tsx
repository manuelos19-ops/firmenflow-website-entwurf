import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FirmenflowIcon } from "@/components/brand/FirmenflowIcon";

export function WebsitePreise() {
  return (
    <section
      id="preise"
      aria-labelledby="preise-heading"
      className="py-24 md:py-36 bg-transparent relative overflow-hidden scroll-mt-24"
    >
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-coral)]">
            Deine Investition
          </span>
          <h2 id="preise-heading" className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[var(--color-ink)] mt-2 leading-tight">
            Was es kostet
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-muted)] mt-3 leading-relaxed">
            Deine Website ist kein Kostenfaktor, sondern ein digitaler Mitarbeiter, der rund um die Uhr für dich arbeitet. Drei transparente Modelle. Alle Preise netto.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch max-w-6xl mx-auto">
          <div className="p-7 sm:p-8 rounded-3xl bg-white border-2 border-[var(--color-line)] shadow-md space-y-5">
            <div className="flex items-center gap-3">
              <FirmenflowIcon name="neue-website" size={44} decorative />
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-muted)]">
                  Modell 1 · Starter
                </span>
                <h3 className="text-xl font-bold text-[var(--color-ink)] mt-1">Onepager</h3>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-[var(--color-muted)]">ab</span>
              <span className="text-5xl font-display font-bold text-[var(--color-ink)]">690 €</span>
              <span className="text-sm text-[var(--color-muted)]">netto</span>
            </div>
            <ul className="space-y-2.5 text-sm text-[var(--color-ink)]/85">
              <li className="flex items-start gap-2.5">
                <FirmenflowIcon name="struktur-wireframe" size={24} decorative />
                <span>Onepager: Aufbau, Struktur und Design</span>
              </li>
              <li className="flex items-start gap-2.5">
                <FirmenflowIcon name="texte-copywriting" size={24} decorative />
                <span>Texte geschrieben, Bilder eingebunden</span>
              </li>
              <li className="flex items-start gap-2.5">
                <FirmenflowIcon name="festpreis" size={24} decorative />
                <span>Mehrseiter nach Kennenlernen zum Festpreis</span>
              </li>
            </ul>
          </div>

          <div className="p-7 sm:p-8 rounded-3xl bg-[var(--color-plum)] text-white border-2 border-[var(--color-plum)] shadow-2xl space-y-5 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-52 h-52 bg-[var(--color-coral)]/25 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-5">
              <div className="flex items-center gap-3">
                <FirmenflowIcon name="monatlich-kuendbar" size={44} decorative />
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-coral)]">
                    Modell 2 · meine Empfehlung
                  </span>
                  <h3 className="text-xl font-bold mt-1">Sorglos-Partnerschaft</h3>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-white/70">ab</span>
                <span className="text-5xl font-display font-bold">690 €</span>
                <span className="text-sm text-white/70">netto einmalig</span>
              </div>
              <p className="text-sm text-white/85 leading-relaxed">
                Dazu 39 € im Monat: Ich kümmere mich um die Technik, du um deinen Betrieb.
              </p>
              <ul className="space-y-2.5 text-sm text-white/90">
                <li className="flex items-start gap-2.5">
                  <FirmenflowIcon name="code-uebergabe" size={24} decorative />
                  <span>Volles Eigentum an Design und Code</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <FirmenflowIcon name="unternehmensprofil" size={24} decorative />
                  <span>Premium-Hosting, Technik und SSL inklusive</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <FirmenflowIcon name="umsetzung-texte" size={24} decorative />
                  <span>30 Minuten Änderungen im Monat inklusive</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <FirmenflowIcon name="nachricht-senden" size={24} decorative />
                  <span>Änderungen per kurzer Nachricht</span>
                </li>
              </ul>
              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/20 text-sm font-semibold">
                Monatlich kündbar. Kein Risiko, volle Freiheit.
              </div>
            </div>
          </div>

          <div className="p-7 sm:p-8 rounded-3xl bg-white border-2 border-[var(--color-line)] shadow-md space-y-5">
            <div className="flex items-center gap-3">
              <FirmenflowIcon name="angebot" size={44} decorative />
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-muted)]">
                  Modell 3 · komplett abgedeckt
                </span>
                <h3 className="text-xl font-bold text-[var(--color-ink)] mt-1">Rundum-Sorglos</h3>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-[var(--color-muted)]">nach</span>
              <span className="text-4xl font-display font-bold text-[var(--color-ink)]">Absprache</span>
            </div>
            <p className="text-xs text-[var(--color-muted)] leading-relaxed">
              Damit du komplett abgedeckt bist: echte Fotos aus deinem Betrieb statt Stockbildern (ab 350 €). Oder dein Google-Profil einrichten lassen und monatlich betreuen (ab 99 €). Den genauen Umfang klären wir im Kennenlernen zum Festpreis.
            </p>
            <ButtonLink href="/lokalpraesenz-360" variant="secondary" size="default" className="w-full">
              Lokalpräsenz 360° ansehen
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

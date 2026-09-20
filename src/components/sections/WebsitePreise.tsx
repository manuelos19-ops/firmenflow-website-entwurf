import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FirmenflowButton } from "@/components/ui/FirmenflowButton";
import { FirmenflowIcon } from "@/components/brand/FirmenflowIcon";

const modelle = [
  {
    id: "starter",
    kicker: "Modell 1 · Starter",
    title: "Onepager",
    price: "690 €",
    priceNote: "netto einmalig",
    text: "Der schnelle Einstieg: eine Seite, die alles sagt. Aufbau, Texte und Bilder inklusive.",
    featured: false,
  },
  {
    id: "sorglos",
    kicker: "Modell 2 · meine Empfehlung",
    title: "Sorglos-Partnerschaft",
    price: "690 €",
    priceNote: "netto einmalig + 39 €/Monat",
    text: "Die Seite gehört dir, die Technik liegt bei mir. Du kümmerst dich um deinen Betrieb.",
    featured: true,
  },
  {
    id: "rundum",
    kicker: "Modell 3 · komplett abgedeckt",
    title: "Rundum-Sorglos",
    price: "Absprache",
    priceNote: "Foto ab 350 € · Profil ab 99 €",
    text: "Echte Fotos plus Google-Profil mit Betreuung. Umfang klären wir im Kennenlernen zum Festpreis.",
    featured: false,
  },
] as const;

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
            Drei Modelle. Ein Ziel: deine Seite arbeitet für dich.
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-muted)] mt-3 leading-relaxed">
            Deine Website ist kein Kostenfaktor, sondern ein digitaler Mitarbeiter, der rund um die Uhr für dich arbeitet. Drei transparente Modelle. Alle Preise netto.
          </p>
        </div>
        <ol className="relative max-w-3xl mx-auto">
          <span aria-hidden="true" className="absolute left-[27px] sm:left-[31px] top-4 bottom-4 w-px bg-[var(--color-line)]" />
          {modelle.map((modell, index) => (
            <li key={modell.id} className="relative flex gap-4 sm:gap-6 pb-8 last:pb-0">
              <span
                aria-hidden="true"
                className={"relative z-10 mt-1 flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl border-2 shadow-md " + (modell.featured ? "border-[var(--color-coral)] bg-[var(--color-plum)] text-white" : "border-[var(--color-line)] bg-white")}
              >
                <FirmenflowIcon
                  name={modell.id === "starter" ? "neue-website" : modell.id === "sorglos" ? "monatlich-kuendbar" : "angebot"}
                  size={32}
                  decorative
                />
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-coral)] text-[11px] font-bold text-white shadow">
                  {index + 1}
                </span>
              </span>
              <div
                className={"flex-1 rounded-3xl border-2 p-6 sm:p-8 shadow-md space-y-3 " + (modell.featured ? "border-[var(--color-plum)] bg-[var(--color-plum)] text-white shadow-2xl" : "border-[var(--color-line)] bg-white")}
              >
                <p className={"text-xs font-mono font-bold uppercase tracking-wider " + (modell.featured ? "text-[var(--color-coral)]" : "text-[var(--color-muted)]")}>
                  {modell.kicker}
                </p>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl sm:text-2xl font-bold">{modell.title}</h3>
                  <p>
                    <span className="text-3xl sm:text-4xl font-display font-bold">{modell.price}</span>{" "}
                    <span className={"text-xs " + (modell.featured ? "text-white/70" : "text-[var(--color-muted)]")}>{modell.priceNote}</span>
                  </p>
                </div>
                <p className={"text-sm leading-relaxed " + (modell.featured ? "text-white/85" : "text-[var(--color-muted)]")}>
                  {modell.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <div className="max-w-3xl mx-auto mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
          <FirmenflowButton href="/anfrage" buttonIcon="projekt-besprechen" subline="Unverbindlich \u00b7 klarer nächster Schritt">
            Projekt mit mir besprechen
          </FirmenflowButton>
          <ButtonLink href="/lokalpraesenz-360" variant="secondary" size="default">
            Lokalpräsenz 360° ansehen
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

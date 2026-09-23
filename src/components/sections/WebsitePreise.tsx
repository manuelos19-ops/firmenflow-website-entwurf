import { Container } from "@/components/ui/Container";
import { FirmenflowButton } from "@/components/ui/FirmenflowButton";
import { FirmenflowIcon } from "@/components/brand/FirmenflowIcon";
import type { FirmenflowIconName } from "@/content/firmenflow-icons";

type Modell = {
  id: "starter" | "sorglos" | "rundum";
  kicker: string;
  title: string;
  price: string;
  priceNote: string;
  claim: string;
  text: string;
  points: readonly string[];
  icons: readonly FirmenflowIconName[];
  featured: boolean;
};

const modelle: readonly Modell[] = [
  {
    id: "starter",
    kicker: "Starter",
    title: "Onepager",
    price: "690 €",
    priceNote: "einmalig",
    claim: "Eine Seite, die alles sagt.",
    text: "Ideal, wenn du neu startest oder deine alte Seite endlich ersetzen willst. Ich baue dir einen kompakten Auftritt, der auf dem Handy überzeugt, mit Texten, die nach dir klingen, und Bildern, die zu deinem Betrieb passen.",
    points: ["Aufbau, Struktur und Design aus einer Hand", "Texte geschrieben, Bilder eingebunden", "In 1 bis 2 Wochen live, ohne Baukasten-Look"],
    icons: ["struktur-wireframe", "texte-copywriting", "go-live"],
    featured: false,
  },
  {
    id: "sorglos",
    kicker: "Beliebt bei Betrieben",
    title: "Sorglos",
    price: "690 €",
    priceNote: "+ 39 €/Monat",
    claim: "Deine Seite gehört dir. Die Technik liegt bei mir.",
    text: "Du kümmerst dich um deinen Betrieb, ich halte dir den Rücken frei: Hosting, Updates, Backups und 30 Minuten Änderungen im Monat. Eine kurze Nachricht genügt, ich setze um.",
    points: ["Volles Eigentum an Design und Code", "Premium-Hosting, Technik und SSL inklusive", "Monatlich kündbar, kein Risiko"],
    icons: ["code-uebergabe", "umsetzung-texte", "monatlich-kuendbar"],
    featured: true,
  },
  {
    id: "rundum",
    kicker: "Rundum",
    title: "Rundum-Sorglos",
    price: "Individuell",
    priceNote: "nach Kennenlernen",
    claim: "Website, Fotos und Google-Auftritt in einer Hand.",
    text: "Ich komme zu dir, fotografiere Team und Betrieb und bringe parallel dein Google-Profil auf Stand. Dazu alles aus Sorglos: abgestimmt, aus einer Hand, zum Festpreis.",
    points: ["Alles aus Sorglos inklusive", "Echte Fotos statt Stockbilder", "Google-Profil einrichten und betreuen"],
    icons: ["foto", "mehr-bewertungen", "persoenlicher-ansprechpartner"],
    featured: false,
  },
];

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch max-w-6xl mx-auto">
          {modelle.map((modell) => (
            <article
              key={modell.id}
              className={"flex flex-col rounded-[2rem] border-2 p-7 sm:p-8 shadow-md space-y-5 " + (modell.featured ? "border-[var(--color-plum)] bg-[var(--color-plum)] text-white shadow-2xl relative overflow-hidden lg:-my-3 lg:py-11" : "border-[var(--color-line)] bg-white")}
            >
              {modell.featured ? <div aria-hidden="true" className="absolute -top-20 -right-20 w-52 h-52 bg-[var(--color-coral)]/25 rounded-full blur-3xl pointer-events-none" /> : null}
              <div className="relative z-10 flex flex-col h-full">
                <p className={"text-xs font-mono font-bold uppercase tracking-wider " + (modell.featured ? "text-[var(--color-coral)]" : "text-[var(--color-muted)]")}>
                  {modell.kicker}
                </p>
                <div className="mt-4">
                  <h3 className="text-2xl font-bold">{modell.title}</h3>
                  <p className={"font-editorial italic text-lg leading-snug mt-1 min-h-[3.5rem] " + (modell.featured ? "text-white/85" : "text-[var(--color-plum)]")}>
                    {modell.claim}
                  </p>
                </div>
                <p className="mt-4">
                  <span className="block text-4xl sm:text-5xl font-display font-bold leading-none">{modell.price}</span>
                  <span className={"mt-1 block text-xs font-semibold " + (modell.featured ? "text-white/70" : "text-[var(--color-muted)]")}>{modell.priceNote}</span>
                </p>
                <p className={"mt-4 text-sm leading-relaxed min-h-[7rem] " + (modell.featured ? "text-white/85" : "text-[var(--color-muted)]")}>
                  {modell.text}
                </p>
                <ul className="mt-4 space-y-2.5 pt-1">
                  {modell.points.map((punkt, i) => (
                    <li key={punkt} className="flex items-start gap-2.5 text-sm leading-snug min-h-[2.5rem]">
                      <FirmenflowIcon name={modell.icons[i]} size={22} decorative className="mt-0.5 shrink-0" />
                      <span className={modell.featured ? "text-white/90" : "text-[var(--color-ink)]/85"}>{punkt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <div className="max-w-3xl mx-auto mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
          <FirmenflowButton href="/anfrage" buttonIcon="projekt-besprechen" subline="Unverbindlich · klarer nächster Schritt">
            Projekt mit mir besprechen
          </FirmenflowButton>
          <FirmenflowButton
            href="/lokalpraesenz-360"
            buttonIcon="lokalpraesenz"
            size="compact"
          >
            Lokalpräsenz 360° ansehen
          </FirmenflowButton>
        </div>
      </Container>
    </section>
  );
}

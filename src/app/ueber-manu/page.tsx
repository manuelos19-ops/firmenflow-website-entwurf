import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { FirmenflowButton } from "@/components/ui/FirmenflowButton";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { FirmenflowIcon } from "@/components/brand/FirmenflowIcon";
import { portraitAssets } from "@/content/assets";
import { getSiteUrl } from "@/lib/site-url";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Über Manu – elf Jahre Betrieb, jetzt Websites für lokale Unternehmen",
  description:
    "Manuel Landeck: sechs Jahre eigenes Fitnessstudio, Geschäftsführer einer selbst gebauten Lasertag-Arena, Aufbau von BattleKart Düsseldorf-Neuss. Warum ich heute Websites für Betriebe am Niederrhein baue.",
  alternates: {
    canonical: "/ueber-manu",
  },
  openGraph: {
    title: "Über Manu – elf Jahre Betrieb, jetzt Websites | Firmenflow",
    description:
      "Warum ich vom eigenen Betrieb zu Websites für lokale Unternehmen gewechselt bin – und was das für dich bedeutet.",
    url: "/ueber-manu",
    locale: "de_DE",
    type: "profile",
  },
};

export default function UeberManuPage() {
  const baseUrl = getSiteUrl().origin;
  const whatsappUrl = buildWhatsAppUrl(
    undefined,
    "Hallo Manu, ich habe deine Seite gelesen und würde gerne sprechen."
  );

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#manu`,
    name: "Manuel Landeck",
    givenName: "Manuel",
    familyName: "Landeck",
    url: `${baseUrl}/ueber-manu`,
    image: `${baseUrl}${portraitAssets.about.src}`,
    jobTitle: "Webdesigner und Dienstleister für lokale Sichtbarkeit",
    description:
      "Elf Jahre Erfahrung im eigenen und fremden Betrieb: sechs Jahre Inhaber eines EMS-Fitnessstudios, zwei Jahre Geschäftsführer einer selbst gebauten Lasertag-Arena, zuletzt Marketing und Aufbau von BattleKart Düsseldorf-Neuss.",
    knowsAbout: [
      "Webdesign",
      "Google-Unternehmensprofil",
      "Lokale Suchmaschinenoptimierung",
      "Unternehmensfotografie",
    ],
    worksFor: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "Firmenflow",
      url: baseUrl,
    },
    // sameAs folgt, sobald die Social-Profile gefuellt sind. Ein verlinkter
    // leerer Kanal schadet mehr, als das Signal nuetzt.
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Über Manu", item: `${baseUrl}/ueber-manu` },
    ],
  };

  return (
    <main id="main" className="pt-36 sm:pt-44 pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Container className="max-w-4xl space-y-14 sm:space-y-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-xs sm:text-sm text-[var(--color-muted)]">
            <li>
              <Link href="/" className="hover:text-[var(--color-plum)] transition-colors">
                Startseite
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-[var(--color-ink)] font-semibold">Über Manu</li>
          </ol>
        </nav>

        {/* Porträt und Aufschlag */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 sm:gap-10 items-center">
          {/* Auf Mobil steht der Text zuerst, sonst liegt die Ueberschrift unter der Falz. */}
          <div className="order-2 sm:order-1 sm:col-span-5">
            <div className="relative aspect-[4/5] w-full rounded-[2rem] overflow-hidden border border-[var(--color-line)] shadow-xl bg-stone-100">
              <Image
                src={portraitAssets.about.src}
                alt={portraitAssets.about.alt}
                fill
                priority
                className="object-cover object-[50%_20%] scale-[1.12]"
                sizes="(max-width: 640px) 100vw, 40vw"
              />
            </div>
          </div>

          <div className="order-1 sm:order-2 sm:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--color-coral)]/10 border border-[var(--color-coral)]/25 text-xs font-bold text-[var(--color-coral)]">
              <BrandIcon className="w-4 h-3.5" />
              <span>Hi, ich bin Manu</span>
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-[var(--color-ink)] leading-[1.06] tracking-tight">
              Elf Jahre Betrieb. <br />
              <span className="text-[var(--color-coral)] font-editorial italic font-normal">
                Jetzt baue ich Websites dafür.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed">
              Manuel Landeck, Wesel und Niederrhein. Ich mache Websites und Google-Profile
              für kleine Betriebe – und weiß aus eigener Erfahrung, wie so ein Betrieb läuft.
            </p>
          </div>
        </div>

        {/* Die Geschichte */}
        <section className="space-y-5">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--color-ink)]">
            Wie ich hier gelandet bin
          </h2>
          <div className="space-y-4 text-base sm:text-lg text-[var(--color-muted)] leading-relaxed">
            <p>
              Selbstständig zu sein liegt mir einfach mehr. Das war beim eigenen Studio so,
              und nach den Jahren als Angestellter wollte ich zurück.
            </p>
            <p>
              Den Ausschlag gab aber etwas anderes. Durch die Arbeit hatte ich ständig mit
              Unternehmern zu tun – Lieferanten, Partner, Betriebe nebenan. Und mir ist immer
              wieder dasselbe aufgefallen: Da stecken Leute seit Jahren Arbeit in ihren Betrieb,
              und im Netz findet man sie kaum. Keine Website oder eine von vor zehn Jahren.
              Ein Google-Profil, das seit der Eröffnung niemand angefasst hat.
            </p>
            <p>
              Irgendwann war der Gedanke da: Denen kann ich helfen. Ich weiß, wie so ein Betrieb
              läuft, ich kann fotografieren, und den technischen Teil habe ich die letzten Jahre
              ohnehin gemacht.
            </p>
          </div>
        </section>

        {/* Der ehrliche Teil */}
        <section className="rounded-[2rem] border-2 border-[var(--color-line)] bg-white p-7 sm:p-10 shadow-lg space-y-5">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--color-ink)]">
            Firmenflow ist neu. Ich nicht.
          </h2>
          <div className="space-y-4 text-base sm:text-lg text-[var(--color-muted)] leading-relaxed">
            <p>
              Die Firma gibt es seit ein paar Monaten. Websites baue ich seit Kurzem
              hauptberuflich – vorher habe ich elf Jahre lang Betriebe geführt, aufgebaut
              und vermarktet.
            </p>
            <ul className="space-y-4 text-[var(--color-ink)]">
              <li className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-paper)] p-5 sm:p-6">
                <p className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-coral)] leading-none">
                  6 Jahre
                </p>
                <p className="mt-2 text-base sm:text-lg leading-relaxed">
                  Inhaber eines EMS-Fitnessstudios
                </p>
              </li>
              <li className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-paper)] p-5 sm:p-6">
                <p className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-coral)] leading-none">
                  2 Jahre
                </p>
                <p className="mt-2 text-base sm:text-lg leading-relaxed">
                  Geschäftsführer einer Lasertag-Arena, die ich selbst gebaut habe
                </p>
              </li>
              <li className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-paper)] p-5 sm:p-6">
                <p className="font-display text-2xl sm:text-3xl font-bold text-[var(--color-coral)] leading-none">
                  3 Jahre
                </p>
                <p className="mt-2 text-base sm:text-lg leading-relaxed">
                  Marketing, Personal, Foto und Video bei LaserTag Evolution Düsseldorf –
                  parallel dazu Aufbau von BattleKart Düsseldorf-Neuss
                </p>
              </li>
            </ul>
            <p>
              Was ich dort gemacht habe, ist ziemlich genau das, was ich heute u. a. anbiete:
              Marketing, Digitalisierung, Fotos und Videos, technische Abläufe, Kundengespräche.
              Der Unterschied ist, dass ich es jetzt für andere mache statt für den eigenen Laden.
            </p>
          </div>
        </section>

        {/* Risiko */}
        <section className="space-y-5">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--color-ink)]">
            Was du riskierst
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed">
            Wenig, und das ist Absicht.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {([
              {
                title: "Das erste Gespräch kostet nichts",
                body: "Etwa 30 Minuten, am Telefon oder bei einem Kaffee. Danach weißt du, was sinnvoll wäre und was es kostet. Natürlich kannst du es auch selbst versuchen – aber rechne ehrlich: Wochen an Abenden und Wochenenden, dazu Baukasten-Look und halbfertige Texte. Die meisten kommen nach so einem Versuch zu mir, nur mit weniger Geduld und mehr Frust im Gepäck.",
                iconName: "kennenlernen" as const,
              },
              {
                title: "Monatlich kündbar",
                body: "Keine Mindestlaufzeit, keine zwölf Monate. Du wirst merken, wie viel dir abgenommen wird – Hosting, Updates, kleine Änderungen per kurzer Nachricht. Die meisten fragen sich nach ein paar Wochen eher, warum sie das nicht schon früher abgegeben haben.",
                iconName: "monatlich-kuendbar" as const,
              },
              {
                title: "Die Domain läuft auf dich",
                body: "Nicht auf mich. Sie gehört dir, unabhängig davon, ob wir zusammenarbeiten.",
                iconName: "domain-eigentum" as const,
              },
              {
                title: "Den Code bekommst du",
                body: "Auf Wunsch händige ich dir das komplette Projekt aus. Wenn du woanders hosten willst, steht dir nichts im Weg.",
                iconName: "code-uebergabe" as const,
              },
            ] as const).map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-paper)] p-6"
              >
                <FirmenflowIcon
                  name={item.iconName}
                  size={48}
                  decorative
                  className="mb-3"
                />
                <h3 className="font-bold text-[var(--color-ink)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Grenzen */}
        <section className="space-y-5">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--color-ink)]">
            Was ich nicht mache
          </h2>
          <ul className="space-y-3 text-base sm:text-lg text-[var(--color-muted)] leading-relaxed">
            <li className="flex gap-3">
              <span className="text-[var(--color-coral)] font-bold shrink-0">—</span>
              <span>
                <strong className="text-[var(--color-ink)]">Keine Ranking-Garantien.</strong>{" "}
                Wer dir Platz eins bei Google verspricht, weiß es entweder nicht besser oder
                sagt bewusst die Unwahrheit.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--color-coral)] font-bold shrink-0">—</span>
              <span>
                <strong className="text-[var(--color-ink)]">Keine gekauften Bewertungen.</strong>{" "}
                Das verstößt gegen Googles Richtlinien und fliegt früher oder später auf.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--color-coral)] font-bold shrink-0">—</span>
              <span>
                <strong className="text-[var(--color-ink)]">Keine Jahresverträge.</strong>{" "}
                Wenn die Arbeit gut ist, brauche ich keine Laufzeit, die dich festhält.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-[var(--color-coral)] font-bold shrink-0">—</span>
              <span>
                <strong className="text-[var(--color-ink)]">Keine Projekte, die ich nicht kann.</strong>{" "}
                Große Portale oder Schnittstellen zu Warenwirtschaft – dafür sage ich
                dir lieber, wen du fragen solltest.
              </span>
            </li>
          </ul>
        </section>

        {/* Abschluss */}
        <section className="rounded-[2.5rem] bg-[var(--color-plum)] text-white p-8 sm:p-12 text-center space-y-5 shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-display font-bold leading-tight">
            Lass uns kurz sprechen.
          </h2>
          <p className="text-base sm:text-lg text-white/85 max-w-xl mx-auto leading-relaxed">
            Erzähl mir, was du vorhast. Ich sage dir ehrlich, ob ich der Richtige dafür bin –
            und wenn nicht, auch das.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <FirmenflowButton
              href="/#projektanfrage"
              buttonIcon="projekt-besprechen"
              subline="Persönlich mit mir"
            >
              Unverbindlich anfragen
            </FirmenflowButton>
            <FirmenflowButton
              href={whatsappUrl}
              external
              buttonIcon="whatsapp"
              subline="Direkter Chat mit mir"
            >
              Schreib mir per WhatsApp
            </FirmenflowButton>
          </div>
        </section>
      </Container>
    </main>
  );
}

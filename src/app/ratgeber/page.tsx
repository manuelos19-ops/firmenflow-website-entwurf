import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FirmenflowButton } from "@/components/ui/FirmenflowButton";
import { FirmenflowIcon } from "@/components/brand/FirmenflowIcon";
import { getAllRatgeberPosts } from "@/lib/ratgeber";
import { getSiteUrl } from "@/lib/site-url";
import { RatgeberHub } from "@/components/ratgeber/RatgeberHub";

export const metadata: Metadata = {
  title: "Ratgeber: Praxiswissen für lokale Betriebe in Wesel & NRW",
  description:
    "Der Firmenflow-Ratgeber: verständliches Praxiswissen zu Website, Google-Profil und Anfragen für lokale Betriebe. Persönlich mit Manu, ohne Agenturtheater.",
  alternates: {
    canonical: "/ratgeber",
  },
  openGraph: {
    title: "Firmenflow Ratgeber: Praxiswissen für lokale Betriebe | Firmenflow",
    description:
      "Verständliches Praxiswissen zu Website, Google-Profil und Anfragen. Persönlich mit Manu aus Wesel.",
    url: "/ratgeber",
    locale: "de_DE",
    type: "website",
  },
};

const themen = [
  {
    icon: "neue-website",
    title: "Website & Vertrauen",
    body: "Was deine Website über deinen Betrieb erzählt, bevor du ein Wort gesagt hast, und woran Besucher merken, ob sie dir vertrauen können.",
  },
  {
    icon: "unternehmensprofil",
    title: "Google-Profil & Bewertungen",
    body: "Wie dein Google-Auftritt wirkt, wenn jemand dich zum ersten Mal sucht, und was du selbst aktuell halten kannst.",
  },
  {
    icon: "mehr-anfragen",
    title: "Anfragen & Kontakt",
    body: "Warum manche Anfragen im Sande verlaufen und wie du es Interessenten leicht machst, bei dir anzurufen oder zu schreiben.",
  },
] as const;

export default function RatgeberPage() {
  const baseUrl = getSiteUrl().origin;
  const posts = getAllRatgeberPosts();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${baseUrl}/ratgeber#ratgeber`,
    name: "Firmenflow Ratgeber",
    description: "Praxiswissen für lokale Betriebe in Wesel und NRW.",
    url: `${baseUrl}/ratgeber`,
    inLanguage: "de-DE",
    isPartOf: { "@id": `${baseUrl}/#website` },
    about: { "@id": `${baseUrl}/#organization` },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Ratgeber", item: `${baseUrl}/ratgeber` },
    ],
  };

  return (
    <main id="main" className="pt-36 sm:pt-44 pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Container className="max-w-5xl space-y-12 sm:space-y-16">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-xs sm:text-sm text-[var(--color-muted)]">
            <li>
              <Link href="/" className="hover:text-[var(--color-plum)] transition-colors">
                Startseite
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-[var(--color-ink)] font-semibold">
              Ratgeber
            </li>
          </ol>
        </nav>

        <div className="space-y-4">
          <span className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--color-coral)]/10 border border-[var(--color-coral)]/25 text-xs font-bold text-[var(--color-coral)]">
            <FirmenflowIcon name="faq" size={20} decorative />
            <span>Firmenflow Ratgeber</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-[var(--color-ink)] leading-[1.1]">
            Praxiswissen für deinen Betrieb. Verständlich erklärt.
          </h1>
          <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed max-w-2xl">
            Hier erscheinen regelmäßig Beiträge zu Website, Google-Profil und Anfragen.
            Jeder Beitrag lässt sich ohne Vorkenntnisse lesen und direkt im Alltag nutzen.
          </p>
        </div>

        {/* Interaktiver Hub: Suche, Seitenmenü & Beitragsübersicht */}
        <RatgeberHub posts={posts} />

        {/* Themenschwerpunkte */}
        <section className="space-y-6 pt-4" aria-labelledby="ratgeber-themen">
          <SectionHeading
            eyebrow="Themen im Ratgeber"
            title="Darum wird es hier gehen."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {themen.map((thema) => (
              <div
                key={thema.title}
                className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-paper)] p-6 space-y-3"
              >
                <FirmenflowIcon name={thema.icon} size={48} decorative />
                <h3 className="font-bold text-[var(--color-ink)]">{thema.title}</h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">{thema.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dezent gestalteter Abschluss-Callout */}
        <section className="rounded-[2.5rem] bg-[var(--color-plum)] text-white p-8 sm:p-12 text-center space-y-5 shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-display font-bold leading-tight">
            Lieber persönlich klären als lange lesen?
          </h2>
          <p className="text-base sm:text-lg text-white/85 max-w-xl mx-auto leading-relaxed">
            Erzähl mir kurz, wo dein Betrieb steht. Ich sage dir ehrlich, was sich lohnt.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <FirmenflowButton href="/anfrage" buttonIcon="projekt-besprechen" size="compact">
              Projekt anfragen
            </FirmenflowButton>
            <FirmenflowButton href="/lokalpraesenz-360" buttonIcon="lokalpraesenz" size="compact">
              Lokalpräsenz 360° ansehen
            </FirmenflowButton>
          </div>
        </section>
      </Container>
    </main>
  );
}

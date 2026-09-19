import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FirmenflowIcon } from "@/components/brand/FirmenflowIcon";
import { getAllRatgeberPosts } from "@/lib/ratgeber";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Ratgeber – Praxiswissen für lokale Betriebe in Wesel & NRW",
  description:
    "Der Firmenflow-Ratgeber: verständliches Praxiswissen zu Website, Google-Profil und Anfragen für lokale Betriebe. Persönlich mit Manu, ohne Agenturtheater.",
  alternates: {
    canonical: "/ratgeber",
  },
  openGraph: {
    title: "Firmenflow Ratgeber – Praxiswissen für lokale Betriebe | Firmenflow",
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
    body: "Was deine Website über deinen Betrieb erzählt, bevor du ein Wort gesagt hast – und woran Besucher merken, ob sie dir vertrauen können.",
  },
  {
    icon: "unternehmensprofil",
    title: "Google-Profil & Bewertungen",
    body: "Wie dein Google-Auftritt wirkt, wenn jemand dich zum ersten Mal sucht – und was du selbst aktuell halten kannst.",
  },
  {
    icon: "mehr-anfragen",
    title: "Anfragen & Kontakt",
    body: "Warum manche Anfragen im Sande verlaufen und wie du es Interessenten leicht machst, bei dir anzurufen oder zu schreiben.",
  },
] as const;

const ablauf = [
  {
    icon: "analyse",
    title: "Verstehen",
    body: "Jeder Beitrag startet mit einer Situation aus dem Betriebsalltag und erklärt, was dahintersteckt – in einfachen Worten.",
  },
  {
    icon: "struktur-wireframe",
    title: "Einordnen",
    body: "Du erfährst, welche Folgen ein Problem haben kann und welche Stellschrauben es gibt – ehrlich, ohne Panikmache.",
  },
  {
    icon: "umsetzung-texte",
    title: "Selbst prüfen",
    body: "Konkrete Prüfpunkte zum Selbstmachen: Was du heute nachschauen kannst, steht immer direkt im Beitrag.",
  },
] as const;

export default function RatgeberPage() {
  const baseUrl = getSiteUrl().origin;
  const posts = getAllRatgeberPosts();
  const featured = posts[0];

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
      <Container className="max-w-4xl space-y-14 sm:space-y-20">
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
        <div className="space-y-5">
          <span className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--color-coral)]/10 border border-[var(--color-coral)]/25 text-xs font-bold text-[var(--color-coral)]">
            <FirmenflowIcon name="faq" size={20} decorative />
            <span>Firmenflow Ratgeber</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-[var(--color-ink)] leading-[1.1]">
            Praxiswissen für deinen Betrieb. Verständlich erklärt.
          </h1>
          <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed max-w-2xl">
            Hier erscheinen regelmäßig Beiträge zu Website, Google-Profil und Anfragen.
            Jeder Beitrag lässt sich auch ohne Vorkenntnisse lesen und direkt nutzen.
          </p>
        </div>

        <section
          aria-labelledby="ratgeber-status"
          className="rounded-[2rem] border border-[var(--color-line)] bg-white p-7 sm:p-10 shadow-sm space-y-4"
        >
          {featured ? (
            <Link href={`/ratgeber/${featured.slug}`} className="block group space-y-3">
              <div className="flex items-center gap-3">
                <FirmenflowIcon name="texte-copywriting" size={48} decorative />
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-coral)]">
                  Neu · {featured.category} · {featured.readingMinutes} Min. Lesezeit
                </p>
              </div>
              <h2 id="ratgeber-status" className="text-xl sm:text-3xl font-display font-bold text-[var(--color-ink)] leading-tight group-hover:text-[var(--color-coral)] transition-colors">
                {featured.title}
              </h2>
              <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed max-w-2xl">
                {featured.description}
              </p>
              <span className="inline-block text-sm font-bold text-[var(--color-plum)] group-hover:text-[var(--color-coral)] transition-colors">
                Beitrag lesen
              </span>
            </Link>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FirmenflowIcon name="texte-copywriting" size={48} decorative />
                <h2 id="ratgeber-status" className="text-xl sm:text-2xl font-display font-bold text-[var(--color-ink)]">
                  Die ersten Beiträge entstehen gerade.
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed max-w-2xl">
                Der Ratgeber ist neu. Sobald der erste Beitrag fertig geprüft ist, erscheint er hier
                mit Zusammenfassung und Lesezeit.
              </p>
            </div>
          )}
          <div className="flex flex-wrap gap-3 pt-1">
            <ButtonLink href="/anfrage" variant="primary" size="default">
              Projekt anfragen
            </ButtonLink>
            <ButtonLink href="/#kontakt" variant="secondary" size="default">
              Kostenlose Video-Einschätzung
            </ButtonLink>
          </div>
        </section>

        <section className="space-y-6" aria-labelledby="ratgeber-themen">
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

        <section className="space-y-6" aria-labelledby="ratgeber-lesen">
          <SectionHeading
            eyebrow="So lesen sich die Beiträge"
            title="Kurz, konkret, zum Selbstmachen."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {ablauf.map((schritt, index) => (
              <div
                key={schritt.title}
                className="rounded-3xl border border-[var(--color-line)] bg-white p-6 space-y-3 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <FirmenflowIcon name={schritt.icon} size={48} decorative />
                  <span className="text-xs font-mono font-bold text-[var(--color-muted)]">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="font-bold text-[var(--color-ink)]">{schritt.title}</h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">{schritt.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2.5rem] bg-[var(--color-plum)] text-white p-8 sm:p-12 text-center space-y-5 shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-display font-bold leading-tight">
            Lieber persönlich klären als lange lesen?
          </h2>
          <p className="text-base sm:text-lg text-white/85 max-w-xl mx-auto leading-relaxed">
            Erzähl mir kurz, wo dein Betrieb steht. Ich sage dir ehrlich, was sich lohnt.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <ButtonLink href="/anfrage" variant="primary" size="lg">
              Projekt anfragen
            </ButtonLink>
            <ButtonLink href="/lokalpraesenz-360" variant="secondary" size="lg">
              Lokalpräsenz 360° ansehen
            </ButtonLink>
          </div>
        </section>
      </Container>
    </main>
  );
}

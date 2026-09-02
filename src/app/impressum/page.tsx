import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { legalContent } from "@/content/legal";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von Firmenflow – Manuel Landeck.",
  alternates: {
    canonical: "/impressum",
  },
};

export default function ImpressumPage() {
  return (
    <main id="main" className="pt-36 sm:pt-44 pb-28">
      <Container className="max-w-3xl space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-muted)] hover:text-[var(--color-plum)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Zurück zur Startseite</span>
        </Link>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-ink)]">
          Impressum
        </h1>

        <div className="bg-white rounded-[2rem] p-8 sm:p-12 border border-[var(--color-line)] shadow-sm space-y-8 text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[var(--color-ink)]">Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)</h2>
            <p>
              {legalContent.legalName}
              <br />
              Firmenflow – Webdesign
              <br />
              {legalContent.street}
              <br />
              {legalContent.postalCode} {legalContent.city}
            </p>
            <div className="p-4 rounded-xl bg-[var(--color-paper)] border border-[var(--color-line)] text-xs sm:text-sm text-[var(--color-ink)] flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[var(--color-coral)] shrink-0 mt-0.5" />
              <span>
                <strong>Hinweis zum Servicegebiet:</strong> Rechtlicher Geschäftssitz ist Pulheim. Persönliche Vor-Ort-Betreuung und Termine für Kunden erfolgen direkt in Wesel, Dinslaken, Voerde, Moers und im gesamten Raum Niederrhein.
              </span>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[var(--color-ink)]">Kontakt</h2>
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-ink)] font-medium">E-Mail:</span>
              <span className="font-mono text-[var(--color-ink)] bg-[var(--color-paper)] px-3 py-1 rounded-lg border border-[var(--color-line)] select-all inline-flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[var(--color-coral)] shrink-0" />
                <span>manu@firmenflow.de</span>
              </span>
            </div>
            <p className="text-xs text-[var(--color-muted)]">
              (Zum Schutz vor automatisiertem Spam nicht direkt verlinkt)
            </p>
          </section>

          {legalContent.vatId && (
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-[var(--color-ink)]">Umsatzsteuer-ID</h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
                <br />
                {legalContent.vatId}
              </p>
            </section>
          )}

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[var(--color-ink)]">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
            <p>
              {legalContent.legalName}
              <br />
              {legalContent.street}
              <br />
              {legalContent.postalCode} {legalContent.city}
            </p>
          </section>

          <section className="space-y-3 pt-6 border-t border-[var(--color-line)] text-xs text-[var(--color-muted)]">
            <p>
              EU-Streitschlichtung: Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-[var(--color-ink)]"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              . Ich bin nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}

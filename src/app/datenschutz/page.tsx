import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { legalContent } from "@/content/legal";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung von Firmenflow – Informationen zur Datenverarbeitung.",
};

export default function DatenschutzPage() {
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
          Datenschutzerklärung
        </h1>

        <div className="bg-white rounded-[2rem] p-8 sm:p-12 border border-[var(--color-line)] shadow-sm space-y-8 text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[var(--color-ink)]">1. Verantwortliche Stelle</h2>
            <p>
              {legalContent.legalName}
              <br />
              Firmenflow – Webdesign
              <br />
              {legalContent.street}
              <br />
              {legalContent.postalCode} {legalContent.city}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[var(--color-ink)] font-medium">E-Mail:</span>
              <span className="font-mono text-[var(--color-ink)] bg-[var(--color-paper)] px-3 py-1 rounded-lg border border-[var(--color-line)] select-all inline-flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[var(--color-coral)] shrink-0" />
                <span>manu@firmenflow.de</span>
              </span>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[var(--color-ink)]">2. Hosting bei Vercel</h2>
            <p>
              Diese Website wird bei Vercel Inc. (440 N Barranca Ave #4133, Covina, CA 91723, USA) gehostet. Beim Aufruf der Seiten werden Server-Log-Dateien verarbeitet (z. B. gekürzte IP-Adresse, Datum, Uhrzeit, Browsertyp). Dies dient dem sicheren Betrieb der Website auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[var(--color-ink)]">3. Kontakt und Projektanfrage</h2>
            <p>
              Wenn du mir eine Nachricht oder Projektanfrage sendest, werden deine angegebenen Kontaktdaten und Projektdetails ausschließlich zur Bearbeitung und Beantwortung deiner Anfrage verarbeitet (Art. 6 Abs. 1 lit. b DSGVO). Die Daten werden vertraulich behandelt und nicht ohne deine Einwilligung an Dritte weitergegeben.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[var(--color-ink)]">4. Keine Tracking-Cookies</h2>
            <p>
              Diese Website verzichtet bewusst auf Analyse-Tools wie Google Analytics, Facebook-Pixel oder sonstige Tracking-Dienste von Drittanbietern. Es werden keine Profiling-Cookies eingesetzt.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[var(--color-ink)]">5. Deine Rechte</h2>
            <p>
              Du hast das Recht auf unentgeltliche Auskunft über deine gespeicherten personenbezogenen Daten, deren Berichtigung, Löschung oder Einschränkung der Verarbeitung sowie das Recht auf Datenübertragbarkeit und Beschwerde bei der zuständigen Datenschutzaufsichtsbehörde.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}

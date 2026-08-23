import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum von Firmenflow – Manuel Landeck, Webdesign aus Wesel.',
  robots: { index: true, follow: true },
};

export default function Impressum() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors mb-8 inline-block">← Zurück</Link>
        
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Impressum</h1>
        
        <div className="prose prose-lg max-w-none text-muted [&_h2]:text-foreground [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:mb-4 [&_p]:leading-relaxed">
          <h2>Angaben gemäß § 5 TMG</h2>
          <p>
            Manuel Landeck<br />
            Firmenflow – Webdesign<br />
            [Straße und Hausnummer]<br />
            [PLZ] Wesel
          </p>

          <h2>Kontakt</h2>
          <p>
            E-Mail: mail@firmenflow.de<br />
            [Telefonnummer]
          </p>

          <h2>Umsatzsteuer-ID</h2>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
            [USt-IdNr. eintragen]
          </p>

          <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p>
            Manuel Landeck<br />
            [Straße und Hausnummer]<br />
            [PLZ] Wesel
          </p>

          <h2>Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline"> https://ec.europa.eu/consumers/odr/</a>.
            Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>
      </div>
    </main>
  );
}

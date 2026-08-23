import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung von Firmenflow – Informationen zur Verarbeitung personenbezogener Daten.',
  robots: { index: true, follow: true },
};

export default function Datenschutz() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/" className="text-sm text-muted hover:text-foreground transition-colors mb-8 inline-block">← Zurück</Link>
        
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Datenschutzerklärung</h1>
        
        <div className="prose prose-lg max-w-none text-muted [&_h2]:text-foreground [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:mb-4 [&_p]:leading-relaxed">
          <h2>1. Verantwortlicher</h2>
          <p>
            Manuel Landeck<br />
            Firmenflow – Webdesign<br />
            [Straße und Hausnummer]<br />
            [PLZ] Wesel<br />
            E-Mail: mail@firmenflow.de
          </p>

          <h2>2. Hosting</h2>
          <p>
            Diese Website wird bei Vercel Inc. (440 N Barranca Ave #4133, Covina, CA 91723, USA) gehostet.
            Vercel verarbeitet bei jedem Seitenaufruf automatisch technische Daten (IP-Adresse, Browsertyp,
            Zeitstempel). Grundlage ist Art. 6 Abs. 1 lit. f DSGVO. Mehr Informationen finden Sie in der
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline"> Datenschutzerklärung von Vercel</a>.
          </p>

          <h2>3. Kontaktformular</h2>
          <p>
            Wenn Sie das Kontaktformular nutzen, werden Ihre Angaben (Name, E-Mail, Telefon, Nachricht)
            zur Bearbeitung Ihrer Anfrage verarbeitet. Grundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche
            Maßnahmen). Die Daten werden nicht an Dritte weitergegeben und nach Abschluss der Anfrage gelöscht,
            sofern keine gesetzlichen Aufbewahrungspflichten bestehen.
          </p>

          <h2>4. Cookies</h2>
          <p>
            Diese Website verwendet keine Tracking-Cookies und keine Analyse-Tools. Es werden ausschließlich
            technisch notwendige Cookies verwendet, sofern vom Hosting-Anbieter gesetzt.
          </p>

          <h2>5. Ihre Rechte</h2>
          <p>
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
            Datenübertragbarkeit und Widerspruch. Bei Beschwerden können Sie sich an die zuständige
            Aufsichtsbehörde wenden.
          </p>

          <h2>6. Externe Schriftarten</h2>
          <p>
            Diese Website lädt Schriftarten lokal (self-hosted) über Next.js Font Optimization. Es werden
            keine externen Anfragen an Google Fonts oder andere Drittanbieter gestellt.
          </p>
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { legalContent } from "@/content/legal";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung von Firmenflow – Informationen zur Verarbeitung deiner Daten bei Kontaktaufnahme, Online-Terminbuchung (meetergo) und E-Mail-Kommunikation.",
  alternates: {
    canonical: "/datenschutz",
  },
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

        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-coral)]/10 text-[var(--color-coral)] text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Datenschutz &amp; Transparenz</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--color-ink)] font-display">
            Datenschutzerklärung
          </h1>
          <p className="text-sm text-[var(--color-muted)]">
            Stand: September 2026 · Ich nehme den Schutz deiner persönlichen Daten sehr ernst.
          </p>
        </div>

        <div className="bg-white rounded-[2rem] p-8 sm:p-12 border border-[var(--color-line)] shadow-sm space-y-10 text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
          {/* 1. Verantwortlicher */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[var(--color-ink)]">1. Verantwortliche Stelle</h2>
            <p>
              Verantwortlicher für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
            </p>
            <div className="p-4 rounded-xl bg-[var(--color-paper)] border border-[var(--color-line)] text-[var(--color-ink)]">
              <strong>{legalContent.legalName}</strong>
              <br />
              Firmenflow – Webdesign &amp; Lokalpräsenz
              <br />
              {legalContent.street}
              <br />
              {legalContent.postalCode} {legalContent.city}
              <div className="flex items-center gap-2 pt-2 mt-2 border-t border-[var(--color-line)]/50">
                <span className="font-semibold text-xs">E-Mail:</span>
                <span className="font-mono text-xs text-[var(--color-ink)] select-all inline-flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[var(--color-coral)] shrink-0" />
                  <span>manu@firmenflow.de</span>
                </span>
              </div>
            </div>
          </section>

          {/* 2. SSL/TLS Verschlüsselung */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[var(--color-ink)]">2. SSL- bzw. TLS-Verschlüsselung</h2>
            <p>
              Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte (z. B. deiner Projektanfrage über das Formular) eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennst du daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in deiner Browserzeile.
            </p>
          </section>

          {/* 3. Hosting */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[var(--color-ink)]">3. Hosting bei Vercel</h2>
            <p>
              Diese Website wird bei <strong>Vercel Inc.</strong> (440 N Barranca Ave #4133, Covina, CA 91723, USA) gehostet. Beim Aufruf der Seiten werden durch den Hostinganbieter technisch notwendige Server-Log-Dateien verarbeitet (z. B. gekürzte IP-Adresse, Datum und Uhrzeit des Abrufs, Browsertyp, Betriebssystem). 
            </p>
            <p>
              Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Ich habe ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Stabilität meines Webangebots. Mit Vercel besteht eine Vereinbarung zur Auftragsverarbeitung (Data Processing Addendum) auf Basis von EU-Standardvertragsklauseln.
            </p>
          </section>

          {/* 4. Kontaktformular & Kontaktaufnahme */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[var(--color-ink)]">4. Kontaktformular und Projektanfrage</h2>
            <p>
              Wenn du mir über das geführte Anfrageformular eine Projektanfrage zukommen lässt oder mich per E-Mail bzw. Telefon kontaktierst, verarbeite ich deine Angaben (wie Name, E-Mail-Adresse, Telefonnummer, Betriebsname, Branche, Ort und gewünschte Leistungen) ausschließlich zur Bearbeitung und Beantwortung deiner Anfrage sowie für den Fall von Anschlussfragen.
            </p>
            <p>
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von <strong>Art. 6 Abs. 1 lit. b DSGVO</strong>, sofern deine Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf meinem berechtigten Interesse an einer schnellen und effektiven Beantwortung von Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf deiner Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), sofern diese über die Bestätigung im Formular abgefragt wurde.
            </p>
          </section>

          {/* 5. Brevo */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[var(--color-ink)]">5. E-Mail-Versand und Lead-Verwaltung via Brevo</h2>
            <p>
              Für den automatisierten, zuverlässigen Versand von transaktionalen Bestätigungs-E-Mails an dich (z. B. Eingangsbestätigung deiner Projektanfrage) sowie zur internen Benachrichtigung und Erfassung von Kundenanfragen nutze ich die Plattform <strong>Brevo</strong> (ehemals Sendinblue).
            </p>
            <p>
              Anbieter ist die <strong>Brevo SAS</strong>, 106 boulevard Haussmann, 75008 Paris, Frankreich.
            </p>
            <p>
              Sobald du eine Anfrage über das Formular abschickst, werden die von dir eingegebenen Kontaktdaten und Angaben über eine verschlüsselte Programmierschnittstelle (API) an die Server von Brevo übermittelt. Brevo versendet in meinem Auftrag die automatisierte Eingangsbestätigung an deine E-Mail-Adresse und leitet die Benachrichtigung an mein Postfach weiter.
            </p>
            <p>
              Die Nutzung von Brevo erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Durchführung vorvertraglicher Maßnahmen) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer technisch zuverlässigen, schnellen und professionellen E-Mail-Zustellung). Brevo speichert und verarbeitet Daten auf Servern innerhalb der Europäischen Union (u. a. in Deutschland). Ich habe mit Brevo einen Vertrag zur Auftragsverarbeitung (AVV) gemäß Art. 28 DSGVO abgeschlossen, in dem sich Brevo verpflichtet, die Daten meiner Nutzer streng nach den Vorgaben der DSGVO zu schützen.
            </p>
            <p className="text-xs text-[var(--color-muted)]">
              Weitere Informationen zum Datenschutz bei Brevo findest du in der Datenschutzerklärung des Anbieters unter:{" "}
              <a 
                href="https://www.brevo.com/de/legal/privacypolicy/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-[var(--color-plum)]"
              >
                https://www.brevo.com/de/legal/privacypolicy/
              </a>
            </p>
          </section>

          {/* 6. Zoho Mail */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[var(--color-ink)]">6. E-Mail-Postfächer und Kommunikation via Zoho Mail</h2>
            <p>
              Für den täglichen Empfang, die Bearbeitung und die persönliche Beantwortung deiner E-Mails (über Adressen wie <em>manu@firmenflow.de</em> oder <em>anfrage@firmenflow.de</em>) nutze ich den geschäftlichen E-Mail-Dienst <strong>Zoho Mail</strong>.
            </p>
            <p>
              Anbieter für Kunden im Europäischen Wirtschaftsraum ist die <strong>Zoho Corporation B.V.</strong>, Beneluxlaan 4B, 3527 HT Utrecht, Niederlande (Muttergesellschaft: Zoho Corporation Pvt. Ltd., Indien/USA).
            </p>
            <p>
              Wenn du mir eine E-Mail schreibst oder ich dir auf deine Anfrage antworte, werden deine Nachricht, deine E-Mail-Adresse sowie der E-Mail-Verlauf in den sicheren, ISO-zertifizierten Rechenzentren von Zoho innerhalb der Europäischen Union gespeichert und verwaltet.
            </p>
            <p>
              Die Rechtsgrundlage für diese Datenverarbeitung ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung bzw. Vertragserfüllung) und Art. 6 Abs. 1 lit. f DSGVO (mein berechtigtes Interesse an einer sicheren, ausfallsicheren und datenschutzkonformen geschäftlichen E-Mail-Kommunikation). Mit Zoho besteht ein entsprechender Vertrag zur Auftragsverarbeitung (AVV) gemäß Art. 28 DSGVO einschließlich der von der EU-Kommission genehmigten Standardvertragsklauseln.
            </p>
            <p className="text-xs text-[var(--color-muted)]">
              Nähere Informationen zur Datenverarbeitung und zum Datenschutz bei Zoho findest du unter:{" "}
              <a 
                href="https://www.zoho.com/de/privacy.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-[var(--color-plum)]"
              >
                https://www.zoho.com/de/privacy.html
              </a>
            </p>
          </section>

          {/* 7. Online-Terminbuchung via meetergo */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[var(--color-ink)]">7. Online-Terminbuchung via meetergo</h2>
            <p>
              Auf dieser Website habe ich das Online-Terminvergabe-Tool <strong>meetergo</strong> eingebunden. Anbieter ist die <strong>meetergo GmbH</strong>, Hauptstr. 44, 40789 Monheim am Rhein (nachfolgend „meetergo“).
            </p>
            <p>
              Wenn du online einen Termin mit mir vereinbarst, werden deine hierzu eingegebenen Daten (wie z. B. Name, E-Mail-Adresse, Telefonnummer, Wunschtermin und eventuelle Notizen) auf den Servern von meetergo in Deutschland gespeichert. Des Weiteren erfasst meetergo kurzfristig deine IP-Adresse, deine Referrer-URL, die Uhrzeit des Zugriffs und kann feststellen, dass du bei mir eine Anfrage bzw. Terminbuchung gestellt hast; diese Daten werden ausschließlich für die technische Bereitstellung des Dienstes verwendet und anschließend automatisch wieder gelöscht.
            </p>
            <p>
              Die Verwendung von meetergo erfolgt auf Grundlage von <strong>Art. 6 Abs. 1 lit. f DSGVO</strong>. Ich habe ein berechtigtes Interesse an einer möglichst unkomplizierten, zuverlässigen und zeitsparenden Terminvereinbarung. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von <strong>Art. 6 Abs. 1 lit. a DSGVO</strong> bzw. <strong>Art. 9 Abs. 2 lit. a DSGVO</strong>; die Einwilligung ist jederzeit mit Wirkung für die Zukunft widerrufbar.
            </p>
            <p>
              Zur technischen Fehlerdiagnose verarbeitet meetergo bei einem Anwendungsfehler außerdem die Fehlerart, eine bereinigte Fehlermeldung und einen Stacktrace sowie den technischen Seiten- und Browserkontext. E-Mail-Adressen und sensible URL-Bestandteile werden vor der Übermittlung automatisch entfernt. Die Fehlerdiagnose wird von meetergo selbst in der EU betrieben. Sie setzt keine Cookies, speichert nichts dauerhaft im Browser und erfasst keine Seitenaufrufe, Klicks, Mausbewegungen, Heatmaps, Dead Clicks oder Sitzungsaufzeichnungen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am sicheren und zuverlässigen Betrieb der Buchungsseite).
            </p>
            <p>
              Ich habe mit der meetergo GmbH einen Vertrag zur Auftragsverarbeitung (AVV) gemäß Art. 28 DSGVO abgeschlossen. Hierin verpflichtet sich meetergo, die Daten meiner Seitenbesucher streng nach den Vorgaben der europäischen DSGVO zu schützen und ausschließlich auf Servern in Deutschland zu verarbeiten.
            </p>
            <p className="text-xs text-[var(--color-muted)]">
              Weitere Informationen zum Datenschutz bei meetergo findest du unter:{" "}
              <a 
                href="https://my.meetergo.com/privacy-policy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-[var(--color-plum)]"
              >
                https://my.meetergo.com/privacy-policy
              </a>
            </p>
          </section>

          {/* 8. Keine Tracking Cookies */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[var(--color-ink)]">8. Keine Tracking-Cookies oder Werbe-Pixel</h2>
            <p>
              Ich verzichte auf dieser Website bewusst auf zustimmungspflichtige Analyse-Tools wie Google Analytics, Matomo, Meta-Pixel (Facebook-Pixel) oder ähnliche Tracking- und Profiling-Dienste von Drittanbietern. Es werden ausschließlich technisch notwendige Cookies eingesetzt, die für den sicheren Betrieb der Seite erforderlich sind. Daher benötige ich kein störendes Cookie-Banner.
            </p>
          </section>

          {/* 9. Speicherdauer */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[var(--color-ink)]">9. Speicherdauer</h2>
            <p>
              Deine personenbezogenen Daten verbleiben bei mir, bis der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung deiner Projektanfrage). Zwingende gesetzliche Bestimmungen – insbesondere steuer- und handelsrechtliche Aufbewahrungsfristen (z. B. nach HGB oder AO bei erteilten Aufträgen) – bleiben unberührt. Nach Ablauf dieser Fristen werden die Daten routinemäßig und datenschutzkonform gelöscht.
            </p>
          </section>

          {/* 10. Betroffenenrechte */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[var(--color-ink)]">10. Deine Rechte als betroffene Person</h2>
            <p>
              Du hast im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li><strong>Auskunft (Art. 15 DSGVO):</strong> Bestätigung darüber, ob dich betreffende personenbezogene Daten verarbeitet werden, sowie Auskunft über diese Daten.</li>
              <li><strong>Berichtigung (Art. 16 DSGVO):</strong> Unverzügliche Berichtigung unrichtiger oder Vervollständigung deiner bei mir gespeicherten Daten.</li>
              <li><strong>Löschung (Art. 17 DSGVO):</strong> Löschung deiner bei mir gespeicherten Daten, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</li>
              <li><strong>Einschränkung der Verarbeitung (Art. 18 DSGVO):</strong> Die Einschränkung der Verarbeitung deiner Daten zu verlangen.</li>
              <li><strong>Datenübertragbarkeit (Art. 20 DSGVO):</strong> Erhalt deiner Daten in einem strukturierten, gängigen und maschinenlesbaren Format.</li>
              <li><strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Aus Gründen, die sich aus deiner besonderen Situation ergeben, jederzeit gegen die Verarbeitung deiner Daten Widerspruch einzulegen.</li>
              <li><strong>Widerruf deiner Einwilligung (Art. 7 Abs. 3 DSGVO):</strong> Eine erteilte Einwilligung zur Datenverarbeitung jederzeit mit Wirkung für die Zukunft zu widerrufen.</li>
              <li><strong>Beschwerderecht (Art. 77 DSGVO):</strong> Bei der zuständigen Datenschutzaufsichtsbehörde (für NRW: Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen) Beschwerde einzulegen.</li>
            </ul>
            <p className="pt-2">
              Zur Ausübung deiner Rechte reicht eine formlose Mitteilung per E-Mail an:{" "}
              <a href="mailto:manu@firmenflow.de" className="text-[var(--color-plum)] font-semibold underline hover:text-[var(--color-coral)]">
                manu@firmenflow.de
              </a>
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}

import { getSiteUrl } from "@/lib/site-url";
import {
  FLOWSCREEN_OS_LABEL,
  FLOWSCREEN_RELEASES_URL,
  FLOWSCREEN_VERSION,
  getFlowscreenDirectUrl,
} from "@/lib/flowscreen";

const FAQ_ENTRIES = [
  {
    question: "Warum ist FlowScreen aktuell komplett kostenlos?",
    answer:
      "FlowScreen ist ursprünglich als internes Werkzeug bei Firmenflow entstanden, weil bestehende Tools wie Snagit teuer im Abo sind, ShareX mit Hunderten Submenüs überladen ist und das Windows Snipping Tool keine schönen Mockups für Kundenpräsentationen erzeugen kann. Aktuell stellen wir die Vollversion für Macher, Freelancer und Teams kostenlos zur Verfügung.",
  },
  {
    question: "Werden meine Screenshots oder Daten in die Cloud geladen?",
    answer:
      "Nein. Ausnahmslos 0 % Cloud. FlowScreen arbeitet zu 100 % lokal auf deinem Rechner. Es gibt keinen Telemetrie-Zwang, keinen Login-Account und keine externen Server, die deine Bilddaten sehen. Das macht FlowScreen absolut DSGVO-konform für sensible Betriebs- und Kundendaten.",
  },
  {
    question: "Wie funktionieren die Updates?",
    answer:
      "FlowScreen prüft im Hintergrund automatisch über unser öffentliches GitHub-Repository, ob eine neue Version veröffentlicht wurde. Wenn ein Update bereitsteht, wirst du direkt in der App informiert und kannst es mit einem Klick laden und installieren.",
  },
  {
    question: "Was bedeutet die Meldung beim ersten Start unter Windows?",
    answer:
      "Da FlowScreen eine neu veröffentlichte Software ohne ein tausende Euro teures Unternehmens-Signaturzertifikat ist, kann der Windows SmartScreen-Filter beim ersten Start anzeigen: 'Der Computer wurde durch Windows geschützt'. Klicke einfach auf 'Weitere Informationen' und danach auf 'Trotzdem ausführen'. Die App ist sauber, quelloffen verwaltet und enthält keinerlei Adware.",
  },
  {
    question: "Was ist der Unterschied zwischen Installer und Portable?",
    answer:
      "Die Installer-Version (Setup.exe) richtet FlowScreen mit Desktop- und Startmenü-Verknüpfung ein und unterstützt automatische Updates. Die Portable-Version läuft sofort ohne Installation – perfekt für Firmen-Laptops ohne Admin-Rechte oder direkt vom USB-Stick.",
  },
  {
    question: "Läuft FlowScreen auch unter Windows 10?",
    answer:
      "Ja. FlowScreen läuft auf Windows 11 und Windows 10 (64-Bit). Du brauchst für die Portable-Version keine Administratorrechte.",
  },
  {
    question: "Brauche ich Administratorrechte für die Installation?",
    answer:
      "Für die Portable-Version nicht – einfach herunterladen und starten. Nur die Setup-Version mit Startmenü-Eintrag und Drucktasten-Integration kann je nach Firmenrichtlinie Admin-Rechte erfordern.",
  },
];

/**
 * Strukturierte Daten für die FlowScreen-Downloadseite.
 * Wird bewusst auch bei noindex gerendert: unsichtbar für Nutzer,
 * aber beim Go-Live sofort gültig (Google Rich Results + LLMs).
 */
export function FlowscreenJsonLd() {
  const baseUrl = getSiteUrl().origin;
  const pageUrl = `${baseUrl}/flowscreen`;

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${pageUrl}#software`,
    name: "FlowScreen",
    alternateName: "FlowScreen Studio",
    url: pageUrl,
    applicationCategory: "MultimediaApplication",
    applicationSubCategory: "Screenshot-Software",
    operatingSystem: FLOWSCREEN_OS_LABEL,
    softwareVersion: FLOWSCREEN_VERSION,
    datePublished: "2026-09-01",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
    downloadUrl: getFlowscreenDirectUrl("setup"),
    installUrl: getFlowscreenDirectUrl("setup"),
    releaseNotes: FLOWSCREEN_RELEASES_URL,
    author: {
      "@type": "Person",
      "@id": `${baseUrl}/#manu`,
      name: "Manuel Landeck",
    },
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
    isAccessibleForFree: true,
    inLanguage: "de-DE",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: FAQ_ENTRIES.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Startseite",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "FlowScreen",
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

import { faqItems } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";

export function JsonLd() {
  const baseUrl = getSiteUrl().origin;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${baseUrl}/#organization`,
    name: "Firmenflow",
    legalName: "Manuel Landeck",
    alternateName: "Firmenflow Webdesign",
    url: baseUrl,
    logo: `${baseUrl}/brand/firmenflow-mark.png`,
    image: `${baseUrl}/opengraph-image`,
    description:
      "Persönliches Webdesign, Relaunch, Google Business 360° sowie Foto- und Videoaufnahmen vor Ort für Betriebe in Wesel, am Niederrhein und in NRW.",
    telephone: "+49 155 67277155",
    email: "manu@firmenflow.de",
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Küferweg 2a",
      addressLocality: "Pulheim",
      postalCode: "50259",
      addressCountry: "DE",
    },
    areaServed: [
      { "@type": "City", name: "Wesel" },
      { "@type": "City", name: "Dinslaken" },
      { "@type": "City", name: "Voerde" },
      { "@type": "City", name: "Moers" },
      { "@type": "AdministrativeArea", name: "Niederrhein" },
      { "@type": "AdministrativeArea", name: "Nordrhein-Westfalen" },
    ],
    founder: {
      "@type": "Person",
      "@id": `${baseUrl}/#manu`,
      name: "Manuel Landeck",
      alternateName: "Manu",
      jobTitle: "Gründer & Webdesigner",
      url: `${baseUrl}/#manu`,
    },
    knowsAbout: [
      "Webdesign",
      "Next.js",
      "Lokale Suchmaschinenoptimierung",
      "Google Business Profil",
      "Responsive Webdesign",
      "Fotografie vor Ort",
      "Videoproduktion & Imagefilme",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Webdesign & Lokalpräsenz Dienstleistungen",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Neue Website von Grund auf",
            description:
              "Maßgeschneiderte, moderne Website für lokale Betriebe inklusive Textierung und Smartphone-Optimierung.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website-Relaunch",
            description:
              "Modernisierung bestehender Websites mit gezieltem Schutz und nahtloser Übertragung bestehender Google-Sichtbarkeit.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Google Business 360°",
            description:
              "Optimierung des Google-Unternehmensprofils, professionelles Bewertungsmanagement und laufende Kundenfeedback-Analyse.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Foto- & Videoaufnahmen vor Ort",
            description:
              "Authentische Teamfotos, Räumlichkeiten und kurze Imagefilme direkt vor Ort beim Kunden.",
          },
        },
      ],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "Firmenflow – Webdesign persönlich mit Manu",
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
    inLanguage: "de-DE",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

export function FaqJsonLd() {
  const baseUrl = getSiteUrl().origin;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${baseUrl}/#faq`,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}

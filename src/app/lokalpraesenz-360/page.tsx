import type { Metadata } from "next";
import { GoogleBusinessView } from "@/components/views/GoogleBusinessView";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Lokalpräsenz 360° – Google-Unternehmensprofil & Bewertungen optimieren",
  description:
    "Ich richte dein Google-Profil ein, beantworte jede Bewertung in deinem Ton und berichte monatlich. Für Betriebe am Niederrhein. 99 €/Monat, monatlich kündbar.",
  alternates: {
    canonical: "/lokalpraesenz-360",
  },
  openGraph: {
    title: "Lokalpräsenz 360° – Google-Unternehmensprofil & Bewertungen optimieren | Firmenflow",
    description:
      "Ich richte dein Google-Profil ein, beantworte jede Bewertung in deinem Ton und berichte monatlich. Für Betriebe am Niederrhein. 99 €/Monat, monatlich kündbar.",
    url: "/lokalpraesenz-360",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lokalpräsenz 360° – Google-Unternehmensprofil & Bewertungen optimieren | Firmenflow",
    description:
      "Ich richte dein Google-Profil ein, beantworte jede Bewertung in deinem Ton und berichte monatlich. Für Betriebe am Niederrhein. 99 €/Monat, monatlich kündbar.",
  },
};

export default function Lokalpraesenz360Page() {
  const whatsappUrl = buildWhatsAppUrl(
    undefined,
    "Hallo Manu, ich interessiere mich für die Optimierung meiner lokalen Google-Präsenz."
  );

  return <GoogleBusinessView whatsappUrl={whatsappUrl} />;
}

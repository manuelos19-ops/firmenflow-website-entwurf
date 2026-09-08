import type { Metadata } from "next";
import { GoogleBusinessView } from "@/components/views/GoogleBusinessView";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Lokalpräsenz 360° – Google-Unternehmensprofil & Bewertungen optimieren",
  description:
    "Unabhängige Optimierung deines Google-Unternehmensprofils, professionelles Bewertungsmanagement & monatlicher Feedback-Report für Betriebe am Niederrhein. Persönlich mit Manu.",
  alternates: {
    canonical: "/lokalpraesenz-360",
  },
  openGraph: {
    title: "Lokalpräsenz 360° – Google-Unternehmensprofil & Bewertungen optimieren | Firmenflow",
    description:
      "Unabhängige Optimierung deines Google-Unternehmensprofils, professionelles Bewertungsmanagement & monatlicher Feedback-Report für Betriebe am Niederrhein. Persönlich mit Manu.",
    url: "/lokalpraesenz-360",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lokalpräsenz 360° – Google-Unternehmensprofil & Bewertungen optimieren | Firmenflow",
    description:
      "Unabhängige Optimierung deines Google-Unternehmensprofils, professionelles Bewertungsmanagement & monatlicher Feedback-Report für Betriebe am Niederrhein. Persönlich mit Manu.",
  },
};

export default function Lokalpraesenz360Page() {
  const whatsappUrl = buildWhatsAppUrl(
    undefined,
    "Hallo Manu, ich interessiere mich für die Optimierung meiner lokalen Google-Präsenz."
  );

  return <GoogleBusinessView whatsappUrl={whatsappUrl} />;
}

import type { Metadata } from "next";
import { GoogleBusinessView } from "@/components/views/GoogleBusinessView";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Google Business 360° – Profil, Bewertungsmanagement & Customer Insights | Firmenflow",
  description:
    "Bei Google gefunden werden, Vertrauen aufbauen und aus Kundenfeedback lernen. Professionelles Google-Unternehmensprofil, Bewertungsmanagement & monatlicher Feedback-Report für Betriebe am Niederrhein.",
  alternates: {
    canonical: "/google-business-360",
  },
};

export default function GoogleBusiness360Page() {
  const whatsappUrl = buildWhatsAppUrl(
    undefined,
    "Hallo Manu, ich interessiere mich für Google Business 360° und möchte meine Google-Präsenz prüfen lassen."
  );

  return <GoogleBusinessView whatsappUrl={whatsappUrl} />;
}

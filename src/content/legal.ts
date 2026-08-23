import { siteIdentity } from "@/config/site";

export const legalContent = {
  ready: process.env.LEGAL_CONTENT_READY === "true",
  legalName: siteIdentity.legalName,
  imprintNotice: "Diese Vorschau ist noch nicht zur Veröffentlichung freigegeben. Vollständige Pflichtangaben werden vor dem Livegang aus bestätigten Unternehmensdaten eingesetzt.",
  privacyNotice: "Diese Vorschau verwendet keine Analyse- oder Marketingtracker. Die endgültige Datenschutzerklärung wird anhand der tatsächlich aktivierten Hosting-, Kontakt- und E-Mail-Dienste geprüft.",
  street: process.env.LEGAL_STREET || "Musterstraße 1",
  postalCode: process.env.LEGAL_POSTAL_CODE || "46483",
  city: process.env.LEGAL_CITY || "Wesel",
  email: process.env.LEGAL_EMAIL || "mail@firmenflow.de",
  phone: process.env.LEGAL_PHONE || "",
  vatId: process.env.LEGAL_VAT_ID || "",
} as const;

export const missingLegalFields = [
  !process.env.LEGAL_STREET && "LEGAL_STREET",
  !process.env.LEGAL_POSTAL_CODE && "LEGAL_POSTAL_CODE",
  !process.env.LEGAL_CITY && "LEGAL_CITY",
  !process.env.LEGAL_EMAIL && "LEGAL_EMAIL",
].filter(Boolean) as string[];

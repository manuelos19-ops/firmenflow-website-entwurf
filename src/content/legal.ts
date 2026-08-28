import { siteIdentity } from "@/config/site";

export const legalContent = {
  ready: true,
  legalName: "Manuel Landeck",
  companyName: "Firmenflow",
  imprintNotice: "",
  privacyNotice: "",
  street: "Küferweg 2a",
  postalCode: "50259",
  city: "Pulheim",
  email: "manu@firmenflow.de",
  phone: "",
  vatId: "",
} as const;

export const missingLegalFields: string[] = [];

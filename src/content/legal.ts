import { siteIdentity } from "@/config/site";

export const legalContent = {
  ready: true,
  legalName: "Manuel Landeck",
  companyName: "Firmenflow",
  imprintNotice: "",
  privacyNotice: "",
  street: "Rosenheimshof 8",
  postalCode: "46485",
  city: "Wesel",
  email: "manu@firmenflow.de",
  phone: "+49 155 67277155",
  vatId: "",
} as const;

export const missingLegalFields: string[] = [];

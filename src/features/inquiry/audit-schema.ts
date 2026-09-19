import { z } from "zod";

const normalizedWebsite = z
  .string()
  .trim()
  .max(255, "Die Eingabe ist zu lang.")
  .transform((val) => {
    if (!val) return "";
    if (!/^https?:\/\//i.test(val) && val.includes(".")) {
      return `https://${val}`;
    }
    return val;
  })
  .refine(
    (val) => {
      if (!val) return true;
      if (/^https?:\/\//i.test(val)) {
        try {
          const url = new URL(val);
          return (
            url.hostname.includes(".") &&
            ["http:", "https:"].includes(url.protocol.toLowerCase())
          );
        } catch {
          return false;
        }
      }
      return val.length >= 2;
    },
    { message: "Bitte gib eine gültige Webadresse oder deinen Betriebsnamen ein." }
  );

export const auditInquirySchema = z
  .object({
    choice: z.enum(["flowray-video", "xray-video", "meetergo-call"]),
    websiteUrl: normalizedWebsite.optional().default(""),
    noWebsite: z.boolean().optional().default(false),
    name: z
      .string()
      .trim()
      .min(2, "Bitte gib deinen Namen oder Betriebsnamen an.")
      .max(120, "Der Name ist zu lang."),
    email: z
      .string()
      .trim()
      .min(3, "Bitte gib eine E-Mail-Adresse an.")
      .max(160, "Die E-Mail-Adresse ist zu lang.")
      .email("Bitte gib eine gültige E-Mail-Adresse an."),
    phone: z.string().trim().max(50, "Die Telefonnummer ist zu lang.").optional().default(""),
    notes: z.string().trim().max(1000, "Die Notiz darf maximal 1.000 Zeichen lang sein.").optional().default(""),
    honeypot: z.string().max(100).optional().default(""),
  })
  .refine(
    (data) => {
      if (data.noWebsite) return true;
      return Boolean(data.websiteUrl && data.websiteUrl.trim().length >= 2);
    },
    {
      message: "Bitte trage deine Webadresse oder deinen Betriebsnamen ein oder aktiviere 'Noch keine Website vorhanden'.",
      path: ["websiteUrl"],
    }
  );

export type AuditInquiryPayload = z.infer<typeof auditInquirySchema>;

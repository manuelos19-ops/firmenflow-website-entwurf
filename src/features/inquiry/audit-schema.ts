import { z } from "zod";

const normalizedWebsite = z
  .string()
  .trim()
  .max(255, "Die Webadresse ist zu lang.")
  .transform((val) => {
    if (!val) return "";
    return /^https?:\/\//i.test(val) ? val : `https://${val}`;
  })
  .refine(
    (val) => {
      if (!val) return true;
      try {
        const url = new URL(val);
        return (
          url.hostname.includes(".") &&
          ["http:", "https:"].includes(url.protocol.toLowerCase())
        );
      } catch {
        return false;
      }
    },
    { message: "Bitte gib eine gültige Webadresse ein (z. B. dein-betrieb.de)." }
  );

export const auditInquirySchema = z
  .object({
    choice: z.enum(["xray-video", "meetergo-call"]),
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
      return Boolean(data.websiteUrl && data.websiteUrl.trim().length >= 3);
    },
    {
      message: "Bitte trage deine Website-Adresse ein oder aktiviere 'Noch keine Website vorhanden'.",
      path: ["websiteUrl"],
    }
  );

export type AuditInquiryPayload = z.infer<typeof auditInquirySchema>;

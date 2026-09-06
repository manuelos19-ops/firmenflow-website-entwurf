import { z } from "zod";

export const auditInquirySchema = z.object({
  choice: z.enum(["xray-video", "meetergo-call"]),
  websiteUrl: z.string().trim().optional().default(""),
  noWebsite: z.boolean().optional().default(false),
  name: z.string().trim().min(2, "Bitte gib deinen Namen oder Betriebsnamen an."),
  email: z.string().trim().email("Bitte gib eine gültige E-Mail-Adresse an."),
  phone: z.string().trim().optional().default(""),
  notes: z.string().trim().max(1000).optional().default(""),
  honeypot: z.string().optional().default(""),
}).refine(
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

import { z } from "zod";

const optionalWebsite = z
  .string()
  .trim()
  .transform((val) => {
    if (!val) return "";
    return /^https?:\/\//i.test(val) ? val : `https://${val}`;
  })
  .refine(
    (val) => {
      if (!val) return true;
      try {
        const url = new URL(val);
        return url.hostname.includes(".");
      } catch {
        return false;
      }
    },
    { message: "Bitte prüfe deine Webadresse (z. B. dein-betrieb.de)." }
  );

const optionalPhone = z.union([
  z.literal(""),
  z.string().regex(/^[+0-9()\s/-]{6,40}$/, "Bitte prüfe deine Telefonnummer."),
]);

// Ziele je Leistung (kombinierbar): Website-Ziele, Lokalpräsenz-Ziele
const goalValues = [
  // Website
  "more-inquiries",
  "professional-presentation",
  "clear-offer",
  "easy-contact",
  // Lokalpräsenz 360°
  "better-findability",
  "profile-current",
  "reviews-handled",
  "less-daytoday",
] as const;

export const inquirySchema = z
  .object({
    submissionId: z.string().uuid(),
    // Leistungen: kombinierbar (Website + Lokalpräsenz 360°).
    services: z.array(z.enum(["website", "lokalpraesenz"])).max(2, "Bitte wähle maximal zwei Leistungen."),
    // true = "Noch unsicher, Empfehlung von Manu" (Beratungswunsch ohne Leistungsauswahl)
    guidance: z.boolean(),
    // Website-Vorhaben (nur relevant, wenn "website" gewählt)
    websiteScope: z.enum(["", "new", "relaunch", "unsure"]).default(""),
    businessName: z
      .string()
      .trim()
      .max(120, "Der Name ist zu lang.")
      .default(""),
    industry: z
      .string()
      .trim()
      .min(2, "Bitte nenne deine Branche.")
      .max(80, "Die Branchenbezeichnung ist zu lang."),
    place: z
      .string()
      .trim()
      .min(2, "Bitte nenne deinen Standort (z. B. Wesel).")
      .max(100, "Der Ort ist zu lang."),
    currentWebsite: optionalWebsite,
    goals: z
      .array(z.enum(goalValues))
      .min(1, "Bitte wähle mindestens ein Ziel aus.")
      .max(8),
    // Optionale Zusatzleistung (kein Geschäftsziel)
    supportPhotoVideo: z.boolean().default(false),
    goalDetails: z.string().trim().max(1_000, "Bitte fasse dein Anliegen in maximal 1.000 Zeichen zusammen."),
    name: z
      .string()
      .trim()
      .min(2, "Bitte gib deinen Vor- und Nachnamen an.")
      .max(120, "Der Name ist zu lang."),
    email: z
      .string()
      .trim()
      .min(1, "Bitte gib deine E-Mail-Adresse an.")
      .email("Bitte gib eine gültige E-Mail-Adresse ein (z. B. name@betrieb.de)."),
    phone: optionalPhone,
    preferredContact: z.enum(["email", "phone", "whatsapp"]),
    privacyAccepted: z.literal(true, {
      error: "Bitte bestätige den Datenschutzhinweis.",
    }),
    company: z.string().optional().default(""), // Honeypot (wird serverseitig in route.ts abgefangen)
  })
  .superRefine((value, context) => {
    // Mindestens eine Leistung ODER Beratungswunsch
    if (!value.guidance && value.services.length === 0) {
      context.addIssue({
        code: "custom",
        path: ["services"],
        message: "Bitte wähle mindestens eine Leistung aus oder klicke auf „Empfehlung von Manu“.",
      });
    }
    // Website-Vorhaben nur prüfen, wenn Website gewählt
    if (value.services.includes("website") && !value.websiteScope) {
      context.addIssue({
        code: "custom",
        path: ["websiteScope"],
        message: "Bitte gib an, ob es um eine neue Website oder deine bestehende Website geht.",
      });
    }
    // Telefonnummer nur prüfen, wenn Telefon/WhatsApp als Rückweg gewählt
    if (["phone", "whatsapp"].includes(value.preferredContact) && (!value.phone || value.phone.trim().length < 6)) {
      context.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Für den gewählten Rückweg per Telefon/WhatsApp wird deine Telefonnummer benötigt.",
      });
    }
  });

export type InquiryPayload = z.infer<typeof inquirySchema>;

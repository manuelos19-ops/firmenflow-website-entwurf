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

export const inquirySchema = z
  .object({
    submissionId: z.string().uuid(),
    projectType: z.enum(["new-site", "relaunch", "google-business"], {
      error: "Bitte wähle eine Projektart aus.",
    }),
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
      .array(
        z.enum([
          "more-inquiries",
          "better-local-presence",
          "modern-look",
          "clear-offer",
          "better-reviews",
          "photo-video",
        ])
      )
      .min(1, "Bitte wähle mindestens ein Ziel aus.")
      .max(6),
    goalDetails: z.string().trim().max(1_000, "Bitte fasse dein Anliegen in maximal 1.000 Zeichen zusammen."),
    timeframe: z.enum(["soon", "three-months", "six-months", "flexible"]),
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
    if (["phone", "whatsapp"].includes(value.preferredContact) && (!value.phone || value.phone.trim().length < 6)) {
      context.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Für den gewählten Rückweg per Telefon/WhatsApp wird deine Telefonnummer benötigt.",
      });
    }
  });

export type InquiryPayload = z.infer<typeof inquirySchema>;

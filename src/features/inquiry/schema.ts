import { z } from "zod";

const optionalUrl = z.union([
  z.literal(""),
  z.string().url("Bitte gib eine vollständige URL ein (z. B. https://dein-betrieb.de)."),
]);

const optionalEmail = z.union([
  z.literal(""),
  z.string().email("Bitte prüfe deine E-Mail-Adresse."),
]);

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
      .min(2, "Bitte gib den Namen deines Betriebs an.")
      .max(120, "Der Name ist zu lang."),
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
    currentWebsite: optionalUrl,
    goals: z
      .array(
        z.enum([
          "more-inquiries",
          "better-local-presence",
          "modern-look",
          "clear-offer",
          "better-reviews",
        ])
      )
      .min(1, "Bitte wähle mindestens ein Ziel aus.")
      .max(5),
    goalDetails: z.string().trim().max(1_000, "Bitte fasse dein Anliegen in maximal 1.000 Zeichen zusammen."),
    timeframe: z.enum(["soon", "three-months", "six-months", "flexible"]),
    budget: z.enum(["under-2000", "2000-4000", "4000-plus", "not-sure"]),
    name: z
      .string()
      .trim()
      .min(2, "Bitte gib deinen Namen an.")
      .max(120, "Der Name ist zu lang."),
    email: optionalEmail,
    phone: optionalPhone,
    preferredContact: z.enum(["email", "phone", "whatsapp"]),
    privacyAccepted: z.literal(true, {
      error: "Bitte bestätige den Datenschutzhinweis.",
    }),
    company: z.string().max(0, "Spam erkannt."), // Honeypot
  })
  .superRefine((value, context) => {
    if (!value.email && !value.phone) {
      context.addIssue({
        code: "custom",
        path: ["email"],
        message: "Bitte gib eine E-Mail-Adresse oder Telefonnummer an.",
      });
    }
    if (value.preferredContact === "email" && !value.email) {
      context.addIssue({
        code: "custom",
        path: ["preferredContact"],
        message: "Für Rückmeldung per E-Mail fehlt deine E-Mail-Adresse.",
      });
    }
    if (["phone", "whatsapp"].includes(value.preferredContact) && !value.phone) {
      context.addIssue({
        code: "custom",
        path: ["preferredContact"],
        message: "Für diesen Rückweg fehlt deine Telefonnummer.",
      });
    }
  });

export type InquiryPayload = z.infer<typeof inquirySchema>;

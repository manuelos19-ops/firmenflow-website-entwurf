import { Resend } from "resend";
import nodemailer from "nodemailer";
import type { InquiryPayload } from "../schema";
import { escapeHtml } from "./escape-html";

export type MailResult = { id: string };

export type InquiryMailer = {
  send(payload: InquiryPayload): Promise<MailResult>;
};

// Deutsche Bezeichnungen für das E-Mail-Template und CRM
const projectTypeLabels: Record<string, string> = {
  "new-site": "Neue Website (Erstauftritt oder Neugestaltung)",
  "relaunch": "Relaunch & Überarbeitung der bestehenden Website",
  "google-business": "Google Business & lokale Sichtbarkeit stärken",
  "photo-video": "Foto- & Videoaufnahmen",
};

const goalLabels: Record<string, string> = {
  "more-inquiries": "Mehr Kundenanfragen gewinnen",
  "better-local-presence": "Bessere Sichtbarkeit am Niederrhein & regional",
  "modern-look": "Zeitgemäßes & modernes Design",
  "clear-offer": "Leistungen verständlich auf den Punkt bringen",
  "better-reviews": "Google Bewertungen & Vertrauen stärken",
  "photo-video": "Fotos & Imagefilm (Team, Räumlichkeiten & Betrieb)",
};

const timeframeLabels: Record<string, string> = {
  "soon": "Möglichst zeitnah",
  "three-months": "In den nächsten 1–3 Monaten",
  "six-months": "In 3–6 Monaten",
  "flexible": "Flexibel / Erstmal orientieren",
};

const contactPreferenceLabels: Record<string, string> = {
  "email": "E-Mail",
  "phone": "Telefonischer Rückruf",
  "whatsapp": "WhatsApp Nachricht",
};

export const resendInquiryMailer: InquiryMailer = {
  async send(payload: InquiryPayload): Promise<MailResult> {
    const toEmail = process.env.INQUIRY_TO_EMAIL || "anfrage@firmenflow.de";
    const fromEmail = process.env.INQUIRY_FROM_EMAIL || "manu@firmenflow.de";
    const brevoApiKey = process.env.BREVO_API_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
    const smtpPort = Number(process.env.SMTP_PORT) || 465;

    // Deutsche Klartext-Werte
    const projectTypeGerman = projectTypeLabels[payload.projectType] || payload.projectType;
    const goalsGermanList = payload.goals.map((g) => goalLabels[g] || g);
    const goalsGermanFormatted = goalsGermanList.join(", ");
    const timeframeGerman = timeframeLabels[payload.timeframe] || payload.timeframe;
    const preferredContactGerman = contactPreferenceLabels[payload.preferredContact] || payload.preferredContact;

    const subject = `⚡ Neue Firmenflow-Anfrage: ${payload.businessName ? `${payload.businessName} (${payload.place})` : `${payload.name} (${payload.place})`}`;

    const internalHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #17131A; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #FCFAF7; border-radius: 16px; border: 1px solid #E5E0D8;">
        <div style="background-color: #3B0D4F; padding: 20px 24px; border-radius: 12px; margin-bottom: 24px;">
          <h1 style="color: #FFFFFF; font-size: 20px; margin: 0; font-weight: bold;">⚡ Neue Firmenflow Projektanfrage</h1>
          <p style="color: #FCFAF7; opacity: 0.85; margin: 4px 0 0 0; font-size: 13px;">Über firmenflow.de eingegangen</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 15px;">
          ${payload.businessName ? `<tr style="border-bottom: 1px solid #E5E0D8;"><td style="padding: 10px 0; font-weight: bold; width: 140px; color: #653683;">Betrieb:</td><td style="padding: 10px 0; font-weight: bold; color: #17131A;">${escapeHtml(payload.businessName)}</td></tr>` : ""}
          <tr style="border-bottom: 1px solid #E5E0D8;"><td style="padding: 10px 0; font-weight: bold; color: #653683;">Branche:</td><td style="padding: 10px 0;">${escapeHtml(payload.industry)}</td></tr>
          <tr style="border-bottom: 1px solid #E5E0D8;"><td style="padding: 10px 0; font-weight: bold; color: #653683;">Standort:</td><td style="padding: 10px 0;">${escapeHtml(payload.place)}</td></tr>
          ${payload.currentWebsite ? `<tr style="border-bottom: 1px solid #E5E0D8;"><td style="padding: 10px 0; font-weight: bold; color: #653683;">Website:</td><td style="padding: 10px 0;"><a href="${escapeHtml(payload.currentWebsite)}" style="color: #FF705D; text-decoration: none;">${escapeHtml(payload.currentWebsite)}</a></td></tr>` : ""}
          <tr style="border-bottom: 1px solid #E5E0D8;"><td style="padding: 10px 0; font-weight: bold; color: #653683;">Vorhaben:</td><td style="padding: 10px 0; font-weight: bold; color: #17131A;">${escapeHtml(projectTypeGerman)}</td></tr>
          <tr style="border-bottom: 1px solid #E5E0D8;"><td style="padding: 10px 0; font-weight: bold; color: #653683;">Ziele:</td><td style="padding: 10px 0;">${escapeHtml(goalsGermanFormatted)}</td></tr>
          <tr style="border-bottom: 1px solid #E5E0D8;"><td style="padding: 10px 0; font-weight: bold; color: #653683;">Zeitrahmen:</td><td style="padding: 10px 0; font-weight: bold; color: #17131A;">${escapeHtml(timeframeGerman)}</td></tr>
          <tr style="border-bottom: 1px solid #E5E0D8;"><td style="padding: 10px 0; font-weight: bold; color: #653683;">Ansprechpartner:</td><td style="padding: 10px 0; font-weight: bold;">${escapeHtml(payload.name)}</td></tr>
          ${payload.email ? `<tr style="border-bottom: 1px solid #E5E0D8;"><td style="padding: 10px 0; font-weight: bold; color: #653683;">E-Mail:</td><td style="padding: 10px 0;"><a href="mailto:${escapeHtml(payload.email)}" style="color: #FF705D; text-decoration: none; font-weight: bold;">${escapeHtml(payload.email)}</a></td></tr>` : ""}
          ${payload.phone ? `<tr style="border-bottom: 1px solid #E5E0D8;"><td style="padding: 10px 0; font-weight: bold; color: #653683;">Telefon:</td><td style="padding: 10px 0;"><a href="tel:${escapeHtml(payload.phone)}" style="color: #17131A; text-decoration: none; font-weight: bold;">${escapeHtml(payload.phone)}</a></td></tr>` : ""}
          <tr><td style="padding: 10px 0; font-weight: bold; color: #653683;">Wunsch-Kontakt:</td><td style="padding: 10px 0; font-weight: bold; color: #3B0D4F;">${escapeHtml(preferredContactGerman)}</td></tr>
        </table>

        ${
          payload.goalDetails
            ? `<div style="background: #FFFFFF; padding: 18px; border-radius: 12px; border: 1px solid #E5E0D8; margin-bottom: 24px;">
                <strong style="display: block; margin-bottom: 8px; color: #3B0D4F;">💬 Anmerkungen / Wünsche des Kunden:</strong>
                <p style="margin: 0; white-space: pre-wrap; font-size: 14px; color: #17131A;">${escapeHtml(payload.goalDetails)}</p>
              </div>`
            : ""
        }

        <p style="font-size: 12px; color: #746D76; border-top: 1px solid #E5E0D8; padding-top: 14px; margin: 0;">
          Anfrage-ID: ${escapeHtml(payload.submissionId)} · Empfänger: ${escapeHtml(toEmail)}
        </p>
      </div>
    `;

    const internalText = `
Neue Firmenflow Projektanfrage:
================================
${payload.businessName ? `Betrieb: ${payload.businessName}\n` : ""}Branche: ${payload.industry}
Standort: ${payload.place}
${payload.currentWebsite ? `Website: ${payload.currentWebsite}\n` : ""}Vorhaben: ${projectTypeGerman}
Ziele: ${goalsGermanFormatted}
Zeitrahmen: ${timeframeGerman}

Kontaktdaten:
-------------
Name: ${payload.name}
${payload.email ? `E-Mail: ${payload.email}\n` : ""}${payload.phone ? `Telefon: ${payload.phone}\n` : ""}Wunsch-Kontaktweg: ${preferredContactGerman}

${payload.goalDetails ? `Anmerkungen / Wünsche:\n${payload.goalDetails}\n\n` : ""}Anfrage-ID: ${payload.submissionId}
    `.trim();

    // 1. PRIORITÄT: Brevo API v3 (Transaktionale E-Mail + optionales Lead-Tracking)
    if (brevoApiKey) {
      try {
        // A. Benachrichtigungs-Mail an Manu senden
        const brevoEmailResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            "api-key": brevoApiKey,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            sender: {
              name: "Firmenflow Website",
              email: fromEmail,
            },
            to: [
              {
                email: toEmail,
                name: "Manu Landeck",
              },
            ],
            replyTo: payload.email
              ? {
                  email: payload.email,
                  name: payload.name,
                }
              : undefined,
            subject: subject,
            htmlContent: internalHtml,
            textContent: internalText,
          }),
        });

        if (!brevoEmailResponse.ok) {
          const errData = await brevoEmailResponse.json().catch(() => ({}));
          console.error("Brevo API Fehler beim Mailversand:", errData);
          throw new Error(`Brevo error: ${JSON.stringify(errData)}`);
        }

        const emailResult = await brevoEmailResponse.json();

        // B. (Optional) Kontakt als Lead in Brevo CRM speichern (wenn E-Mail vorhanden)
        if (payload.email) {
          try {
            const listIds = process.env.BREVO_LIST_ID
              ? [Number(process.env.BREVO_LIST_ID)]
              : undefined;

            await fetch("https://api.brevo.com/v3/contacts", {
              method: "POST",
              headers: {
                "api-key": brevoApiKey,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                email: payload.email,
                attributes: {
                  VORNAME: payload.name,
                  FIRMA: payload.businessName,
                  BRANCHE: payload.industry,
                  ORT: payload.place,
                  TELEFON: payload.phone || "",
                  PROJEKTART: projectTypeGerman,
                  ZIELE: goalsGermanFormatted,
                  ZEITRAHMEN: timeframeGerman,
                  KONTAKTWEG: preferredContactGerman,
                },
                listIds: listIds,
                updateEnabled: true,
              }),
            });
          } catch (crmErr) {
            console.warn("Brevo CRM Kontaktanlage fehlgeschlagen (nicht blockierend):", crmErr);
          }

          // C. Automatische Bestätigungsmail an den Kunden senden mit optimierter Signatur
          try {
            const customerHtml = `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #17131A; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #FCFAF7; border-radius: 16px; border: 1px solid #E5E0D8;">
                <div style="background-color: #3B0D4F; padding: 22px 24px; border-radius: 12px; margin-bottom: 24px;">
                  <h1 style="color: #FFFFFF; font-size: 20px; margin: 0; font-weight: bold; letter-spacing: -0.01em;">Deine Anfrage ist angekommen! ☕</h1>
                  <p style="color: #FCFAF7; opacity: 0.85; margin: 4px 0 0 0; font-size: 13px;">Firmenflow · Persönlich mit Manu</p>
                </div>

                <p style="font-size: 16px; margin-bottom: 16px;">Hi ${escapeHtml(payload.name)},</p>
                
                <p style="font-size: 15px; color: #4A454E; margin-bottom: 18px; line-height: 1.6;">
                  vielen Dank für deine Anfrage${payload.businessName ? ` zu <strong>${escapeHtml(payload.businessName)}</strong>` : ""}! Ich habe alle Details erhalten und schaue mir dein Vorhaben persönlich an.
                </p>

                <div style="background-color: #FFFFFF; padding: 18px 20px; border-radius: 12px; border: 1px solid #E5E0D8; margin-bottom: 22px;">
                  <strong style="color: #653683; font-size: 14px; display: block; margin-bottom: 8px;">Wie es jetzt weitergeht:</strong>
                  <p style="margin: 0; font-size: 14px; color: #17131A; line-height: 1.6;">
                    Ich melde mich innerhalb der nächsten <strong>24 Stunden</strong> persönlich bei dir über deinen gewünschten Kontaktweg (<strong>${escapeHtml(preferredContactGerman)}</strong>), um kurz die nächsten Schritte zu besprechen.
                  </p>
                </div>

                <p style="font-size: 14px; color: #4A454E; margin-bottom: 24px; line-height: 1.6;">
                  Falls du vorab schon eine dringende Frage hast oder noch Unterlagen nachreichen möchtest, antworte einfach direkt auf diese E-Mail oder schreibe mir bei WhatsApp.
                </p>

                <!-- Firmenflow Signatur-Banner -->
                <div style="border-top: 1px solid #E5E0D8; padding-top: 20px; margin-top: 24px;">
                  <p style="font-size: 15px; margin: 0 0 16px 0; color: #17131A;">
                    Beste Grüße aus Wesel,<br />
                    <strong>Manu</strong>
                  </p>
                  
                  <div style="margin: 0 0 16px 0;">
                    <a href="https://firmenflow.de" target="_blank" rel="noopener noreferrer" style="display: block; text-decoration: none; border: 0;">
                      <img 
                        src="https://www.firmenflow.de/media/firmenflow-email-signature.png" 
                        alt="Manuel Landeck · Inhaber Firmenflow · Webdesign & Lokalpräsenz aus Wesel · Telefon 0155 67277155 · manu@firmenflow.de · firmenflow.de" 
                        width="560" 
                        style="display: block; width: 100%; max-width: 560px; height: auto; border: 0; outline: none; border-radius: 12px;" 
                      />
                    </a>
                  </div>

                  <div style="font-size: 12px; color: #746D76; line-height: 1.6;">
                    <strong style="color: #17131A;">Firmenflow – Webdesign & Lokalpräsenz</strong> · Manuel Landeck<br />
                    Telefon: <a href="tel:015567277155" style="color: #653683; text-decoration: none; font-weight: bold;">0155 67277155</a> · E-Mail: <a href="mailto:manu@firmenflow.de" style="color: #653683; text-decoration: none; font-weight: bold;">manu@firmenflow.de</a> · Web: <a href="https://firmenflow.de" style="color: #FF705D; text-decoration: none; font-weight: bold;">firmenflow.de</a>
                  </div>
                </div>
              </div>
            `;

            await fetch("https://api.brevo.com/v3/smtp/email", {
              method: "POST",
              headers: {
                "api-key": brevoApiKey,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                sender: {
                  name: "Manu von Firmenflow",
                  email: fromEmail,
                },
                to: [
                  {
                    email: payload.email,
                    name: payload.name,
                  },
                ],
                replyTo: {
                  email: "manu@firmenflow.de",
                  name: "Manu Landeck",
                },
                subject: `Deine Projektanfrage bei Firmenflow ist angekommen, ${payload.name}!`,
                htmlContent: customerHtml,
              }),
            });
          } catch (autoReplyErr) {
            console.warn("Kunden-Bestätigungsmail fehlgeschlagen (nicht blockierend):", autoReplyErr);
          }
        }

        return { id: emailResult.messageId || payload.submissionId };
      } catch (brevoErr) {
        console.error("Brevo Versandfehler:", brevoErr);
        throw brevoErr;
      }
    }

    // 2. PRIORITÄT: SMTP (z.B. Zoho Mail)
    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const info = await transporter.sendMail({
          from: `"Firmenflow Website" <${smtpUser}>`,
          to: toEmail,
          replyTo: payload.email || undefined,
          subject: subject,
          html: internalHtml,
          text: internalText,
        });

        return { id: info.messageId || payload.submissionId };
      } catch (smtpErr) {
        console.error("SMTP Versandfehler:", smtpErr);
        throw smtpErr;
      }
    }

    // 3. PRIORITÄT: Resend API
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const fromEmailResend = process.env.INQUIRY_FROM_EMAIL || "onboarding@resend.dev";

      const response = await resend.emails.send(
        {
          from: fromEmailResend,
          to: toEmail,
          replyTo: payload.email || undefined,
          subject: subject,
          html: internalHtml,
          text: internalText,
        },
        {
          headers: {
            "Idempotency-Key": `firmenflow-inquiry/${payload.submissionId}`,
          },
        }
      );

      if (response.error) {
        throw new Error(`Resend error: ${response.error.message}`);
      }

      return { id: response.data?.id || payload.submissionId };
    }

    // Fallback Entwicklungsmodus
    console.warn("⚠️ Keine Mail-Konfiguration (BREVO_API_KEY, SMTP oder RESEND_API_KEY) gefunden!");
    console.log("=== Neue Firmenflow-Anfrage (Entwicklungsmodus) ===");
    console.log("ID:", payload.submissionId);
    console.log("Betrieb:", payload.businessName);
    console.log("Kontakt:", payload.name, payload.email || payload.phone);
    console.log("==================================================");

    return { id: `mock-${payload.submissionId}` };
  },
};

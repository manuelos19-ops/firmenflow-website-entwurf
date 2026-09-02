import { Resend } from "resend";
import nodemailer from "nodemailer";
import type { InquiryPayload } from "../schema";
import { escapeHtml } from "./escape-html";

export type MailResult = { id: string };

export type InquiryMailer = {
  send(payload: InquiryPayload): Promise<MailResult>;
};

export const resendInquiryMailer: InquiryMailer = {
  async send(payload: InquiryPayload): Promise<MailResult> {
    const toEmail = process.env.INQUIRY_TO_EMAIL || "manu@firmenflow.de";
    const resendApiKey = process.env.RESEND_API_KEY;
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
    const smtpPort = Number(process.env.SMTP_PORT) || 465;

    const subject = `Neue Firmenflow-Anfrage: ${payload.businessName} (${payload.place})`;

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #17131A; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #FCFAF7; border-radius: 16px; border: 1px solid #E5E0D8;">
        <div style="background-color: #3B0D4F; padding: 20px 24px; border-radius: 12px; margin-bottom: 24px;">
          <h1 style="color: #FFFFFF; font-size: 20px; margin: 0; font-weight: bold;">⚡ Neue Firmenflow Projektanfrage</h1>
          <p style="color: #FCFAF7; opacity: 0.85; margin: 4px 0 0 0; font-size: 13px;">Über firmenflow.de eingegangen</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 15px;">
          <tr style="border-bottom: 1px solid #E5E0D8;"><td style="padding: 10px 0; font-weight: bold; width: 140px; color: #653683;">Betrieb:</td><td style="padding: 10px 0; font-weight: bold; color: #17131A;">${escapeHtml(payload.businessName)}</td></tr>
          <tr style="border-bottom: 1px solid #E5E0D8;"><td style="padding: 10px 0; font-weight: bold; color: #653683;">Branche:</td><td style="padding: 10px 0;">${escapeHtml(payload.industry)}</td></tr>
          <tr style="border-bottom: 1px solid #E5E0D8;"><td style="padding: 10px 0; font-weight: bold; color: #653683;">Standort:</td><td style="padding: 10px 0;">${escapeHtml(payload.place)}</td></tr>
          ${payload.currentWebsite ? `<tr style="border-bottom: 1px solid #E5E0D8;"><td style="padding: 10px 0; font-weight: bold; color: #653683;">Website:</td><td style="padding: 10px 0;"><a href="${escapeHtml(payload.currentWebsite)}" style="color: #FF705D; text-decoration: none;">${escapeHtml(payload.currentWebsite)}</a></td></tr>` : ""}
          <tr style="border-bottom: 1px solid #E5E0D8;"><td style="padding: 10px 0; font-weight: bold; color: #653683;">Vorhaben:</td><td style="padding: 10px 0; font-weight: bold;">${escapeHtml(payload.projectType)}</td></tr>
          <tr style="border-bottom: 1px solid #E5E0D8;"><td style="padding: 10px 0; font-weight: bold; color: #653683;">Ziele:</td><td style="padding: 10px 0;">${escapeHtml(payload.goals.join(", "))}</td></tr>
          <tr style="border-bottom: 1px solid #E5E0D8;"><td style="padding: 10px 0; font-weight: bold; color: #653683;">Zeitrahmen:</td><td style="padding: 10px 0;">${escapeHtml(payload.timeframe)}</td></tr>
          <tr style="border-bottom: 1px solid #E5E0D8;"><td style="padding: 10px 0; font-weight: bold; color: #653683;">Ansprechpartner:</td><td style="padding: 10px 0; font-weight: bold;">${escapeHtml(payload.name)}</td></tr>
          ${payload.email ? `<tr style="border-bottom: 1px solid #E5E0D8;"><td style="padding: 10px 0; font-weight: bold; color: #653683;">E-Mail:</td><td style="padding: 10px 0;"><a href="mailto:${escapeHtml(payload.email)}" style="color: #FF705D; text-decoration: none; font-weight: bold;">${escapeHtml(payload.email)}</a></td></tr>` : ""}
          ${payload.phone ? `<tr style="border-bottom: 1px solid #E5E0D8;"><td style="padding: 10px 0; font-weight: bold; color: #653683;">Telefon:</td><td style="padding: 10px 0;"><a href="tel:${escapeHtml(payload.phone)}" style="color: #17131A; text-decoration: none; font-weight: bold;">${escapeHtml(payload.phone)}</a></td></tr>` : ""}
          <tr><td style="padding: 10px 0; font-weight: bold; color: #653683;">Wunsch-Kontakt:</td><td style="padding: 10px 0;">${escapeHtml(payload.preferredContact)}</td></tr>
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

    const textContent = `
Neue Firmenflow Projektanfrage:
================================
Betrieb: ${payload.businessName}
Branche: ${payload.industry}
Standort: ${payload.place}
${payload.currentWebsite ? `Website: ${payload.currentWebsite}\n` : ""}Vorhaben: ${payload.projectType}
Ziele: ${payload.goals.join(", ")}
Zeitrahmen: ${payload.timeframe}

Kontaktdaten:
-------------
Name: ${payload.name}
${payload.email ? `E-Mail: ${payload.email}\n` : ""}${payload.phone ? `Telefon: ${payload.phone}\n` : ""}Wunsch-Kontaktweg: ${payload.preferredContact}

${payload.goalDetails ? `Anmerkungen / Wünsche:\n${payload.goalDetails}\n\n` : ""}Anfrage-ID: ${payload.submissionId}
    `.trim();

    // 1. Priorität: Direkter Versand via SMTP (z.B. Zoho Mail)
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
          html: htmlContent,
          text: textContent,
        });

        return { id: info.messageId || payload.submissionId };
      } catch (smtpErr) {
        console.error("SMTP Versandfehler:", smtpErr);
        throw smtpErr;
      }
    }

    // 2. Priorität: Versand via Resend API
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const fromEmail = process.env.INQUIRY_FROM_EMAIL || "onboarding@resend.dev";

      const response = await resend.emails.send(
        {
          from: fromEmail,
          to: toEmail,
          replyTo: payload.email || undefined,
          subject: subject,
          html: htmlContent,
          text: textContent,
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

    // 3. Fallback: Keine Mail-Konfiguration in Environment Variables gefunden
    console.warn("⚠️ Keine Mail-Konfiguration (RESEND_API_KEY oder SMTP) in den Environment Variables gefunden!");
    console.log("=== Neue Firmenflow-Anfrage (Entwicklungsmodus) ===");
    console.log("ID:", payload.submissionId);
    console.log("Betrieb:", payload.businessName);
    console.log("Kontakt:", payload.name, payload.email || payload.phone);
    console.log("==================================================");

    return { id: `mock-${payload.submissionId}` };
  },
};

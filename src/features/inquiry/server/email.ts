import { Resend } from "resend";
import type { InquiryPayload } from "../schema";
import { escapeHtml } from "./escape-html";

export type MailResult = { id: string };

export type InquiryMailer = {
  send(payload: InquiryPayload): Promise<MailResult>;
};

export const resendInquiryMailer: InquiryMailer = {
  async send(payload: InquiryPayload): Promise<MailResult> {
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.INQUIRY_TO_EMAIL || "mail@firmenflow.de";
    const fromEmail = process.env.INQUIRY_FROM_EMAIL || "anfragen@firmenflow.de";

    if (!apiKey) {
      console.log("=== Neue Firmenflow-Anfrage (Lokale Vorschau / Ohne API-Key) ===");
      console.log("ID:", payload.submissionId);
      console.log("Betrieb:", payload.businessName);
      console.log("Branche:", payload.industry, "Ort:", payload.place);
      console.log("Art:", payload.projectType);
      console.log("Ziele:", payload.goals.join(", "));
      console.log("Zeitrahmen:", payload.timeframe, "Budget:", payload.budget);
      console.log("Kontakt:", payload.name, payload.email || payload.phone, `(${payload.preferredContact})`);
      console.log("Details:", payload.goalDetails);
      console.log("===============================================================");
      return { id: `mock-${payload.submissionId}` };
    }

    const resend = new Resend(apiKey);

    const htmlContent = `
      <div style="font-family: sans-serif; line-height: 1.6; color: #17131A; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #3B0D4F; margin-bottom: 20px;">Neue Firmenflow Projektanfrage</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Betrieb:</td><td>${escapeHtml(payload.businessName)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Branche:</td><td>${escapeHtml(payload.industry)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Ort:</td><td>${escapeHtml(payload.place)}</td></tr>
          ${payload.currentWebsite ? `<tr><td style="padding: 8px 0; font-weight: bold;">Website:</td><td><a href="${escapeHtml(payload.currentWebsite)}">${escapeHtml(payload.currentWebsite)}</a></td></tr>` : ""}
          <tr><td style="padding: 8px 0; font-weight: bold;">Vorhaben:</td><td>${escapeHtml(payload.projectType)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Ziele:</td><td>${escapeHtml(payload.goals.join(", "))}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Zeitrahmen:</td><td>${escapeHtml(payload.timeframe)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Budget:</td><td>${escapeHtml(payload.budget)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold;">Name:</td><td>${escapeHtml(payload.name)}</td></tr>
          ${payload.email ? `<tr><td style="padding: 8px 0; font-weight: bold;">E-Mail:</td><td><a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></td></tr>` : ""}
          ${payload.phone ? `<tr><td style="padding: 8px 0; font-weight: bold;">Telefon:</td><td>${escapeHtml(payload.phone)}</td></tr>` : ""}
          <tr><td style="padding: 8px 0; font-weight: bold;">Rückmeldekanal:</td><td>${escapeHtml(payload.preferredContact)}</td></tr>
        </table>
        ${
          payload.goalDetails
            ? `<div style="background: #FCFAF7; padding: 16px; border-radius: 12px; border: 1px solid #E5E0D8; margin-bottom: 20px;">
                <strong style="display: block; margin-bottom: 8px;">Anmerkungen / Wünsche:</strong>
                <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(payload.goalDetails)}</p>
              </div>`
            : ""
        }
        <p style="font-size: 12px; color: #746D76; border-top: 1px solid #E5E0D8; padding-top: 12px;">
          Anfrage-ID: ${escapeHtml(payload.submissionId)}
        </p>
      </div>
    `;

    const textContent = `
Neue Firmenflow Projektanfrage:
--------------------------------
Betrieb: ${payload.businessName}
Branche: ${payload.industry}
Ort: ${payload.place}
${payload.currentWebsite ? `Website: ${payload.currentWebsite}\n` : ""}Vorhaben: ${payload.projectType}
Ziele: ${payload.goals.join(", ")}
Zeitrahmen: ${payload.timeframe}
Budget: ${payload.budget}
Name: ${payload.name}
${payload.email ? `E-Mail: ${payload.email}\n` : ""}${payload.phone ? `Telefon: ${payload.phone}\n` : ""}Rückmeldekanal: ${payload.preferredContact}

${payload.goalDetails ? `Anmerkungen:\n${payload.goalDetails}\n\n` : ""}Anfrage-ID: ${payload.submissionId}
    `.trim();

    const response = await resend.emails.send(
      {
        from: fromEmail,
        to: toEmail,
        replyTo: payload.email || undefined,
        subject: `Neue Firmenflow-Anfrage: ${payload.businessName}`,
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
  },
};

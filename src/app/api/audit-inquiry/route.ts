import { NextResponse } from "next/server";
import { auditInquirySchema } from "@/features/inquiry/audit-schema";
import { sendAuditEmail } from "@/features/inquiry/server/email";
import { checkRateLimit } from "@/features/inquiry/server/rate-limit";
import { siteIdentity } from "@/config/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const json = await request.json().catch(() => null);
    if (!json || typeof json !== "object") {
      return NextResponse.json(
        { ok: false, error: "Ungültiges Datenformat." },
        { status: 400 }
      );
    }

    // 1. Honeypot check
    if (json.honeypot && String(json.honeypot).trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    // 2. Validation
    const parsed = auditInquirySchema.safeParse(json);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const path = issue.path[0];
        if (path) fieldErrors[String(path)] = issue.message;
      });
      return NextResponse.json(
        { ok: false, code: "invalid", fieldErrors },
        { status: 422 }
      );
    }

    // 3. Rate Limit Check
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "anonymous";

    const rateResult = checkRateLimit(clientIp);
    if (!rateResult.allowed) {
      return NextResponse.json(
        { ok: false, code: "rate_limited", error: "Zu viele Anfragen. Bitte warte kurz." },
        {
          status: 429,
          headers: { "Retry-After": String(rateResult.retryAfterSeconds) },
        }
      );
    }

    // 4. Send Notification & Customer Mail
    await sendAuditEmail(parsed.data);

    // 5. Construct meetergo URL with pre-filled query params
    const baseMeetergoUrl = siteIdentity.meetergoUrl;
    const meetergoParams = new URLSearchParams();
    if (parsed.data.name) meetergoParams.set("name", parsed.data.name);
    if (parsed.data.email) meetergoParams.set("email", parsed.data.email);
    if (parsed.data.phone) meetergoParams.set("phone", parsed.data.phone);
    if (parsed.data.websiteUrl && !parsed.data.noWebsite) {
      meetergoParams.set("website", parsed.data.websiteUrl);
    }

    const fullMeetergoUrl = meetergoParams.toString()
      ? `${baseMeetergoUrl}?${meetergoParams.toString()}`
      : baseMeetergoUrl;

    return NextResponse.json({
      ok: true,
      choice: parsed.data.choice,
      meetergoUrl: fullMeetergoUrl,
    });
  } catch (error) {
    console.error("Fehler bei audit-inquiry POST:", error);
    return NextResponse.json(
      { ok: false, error: "Interner Serverfehler beim Verarbeiten der Anfrage." },
      { status: 500 }
    );
  }
}

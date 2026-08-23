import { NextResponse } from "next/server";
import { inquirySchema } from "@/features/inquiry/schema";
import { resendInquiryMailer } from "@/features/inquiry/server/email";
import { normalizeRequest } from "@/features/inquiry/server/normalize-request";
import { checkRateLimit } from "@/features/inquiry/server/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { data, isFormPost } = await normalizeRequest(request);

    // 1. Honeypot Check
    if (data.company && String(data.company).trim().length > 0) {
      if (isFormPost) {
        return NextResponse.redirect(new URL("/anfrage/erhalten", request.url), 303);
      }
      return new NextResponse(null, { status: 204 });
    }

    // 2. Validation
    const parsed = inquirySchema.safeParse(data);
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

    // 3. Rate Limit Check (Client-IP Key)
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

    // 4. Send Email
    await resendInquiryMailer.send(parsed.data);

    // 5. Success
    if (isFormPost) {
      return NextResponse.redirect(new URL("/anfrage/erhalten", request.url), 303);
    }

    return NextResponse.json({ ok: true, id: parsed.data.submissionId });
  } catch (err) {
    console.error("Inquiry route error:", err instanceof Error ? err.message : "unknown");
    return NextResponse.json(
      { ok: false, code: "delivery_failed", error: "Übertragungsfehler. Bitte versuche es erneut." },
      { status: 502 }
    );
  }
}

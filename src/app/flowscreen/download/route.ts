import { NextResponse, type NextRequest } from "next/server";

const GITHUB_OWNER = "manuelos19-ops";
const GITHUB_REPO = "flowscreen-releases";
const FLOWSCREEN_VERSION = "1.1.1";

const ASSETS = {
  setup: `FlowScreen-Setup-${FLOWSCREEN_VERSION}.exe`,
  portable: `FlowScreen-Portable-${FLOWSCREEN_VERSION}.exe`,
} as const;

type DownloadVariant = keyof typeof ASSETS;

function isVariant(value: string | null): value is DownloadVariant {
  return value === "setup" || value === "portable";
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unbekannt";
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unbekannt";
}

/**
 * Schickt Manu eine kurze E-Mail bei jedem Download-Klick.
 * Fehlerfrei by Design: ein fehlender Mail-Provider blockiert NIEMALS den Download.
 * Drosselung: max. 1 Mail pro 5 Minuten (gegen Bot-Spam), Rest wird still gezählt.
 */
let lastMailAt = 0;
const MAIL_THROTTLE_MS = 5 * 60 * 1000;

async function notifyDownload(variant: DownloadVariant, request: NextRequest) {
  const now = Date.now();
  if (now - lastMailAt < MAIL_THROTTLE_MS) return;
  lastMailAt = now;

  const brevoApiKey = process.env.BREVO_API_KEY;
  if (!brevoApiKey) return;

  const toEmail = process.env.INQUIRY_TO_EMAIL || "manu@firmenflow.de";
  const fromEmail = process.env.INQUIRY_FROM_EMAIL || "manu@firmenflow.de";
  const referer = request.headers.get("referer") || "direkt / unbekannt";
  const userAgent = request.headers.get("user-agent") || "unbekannt";
  const ip = getClientIp(request);

  try {
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": brevoApiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Firmenflow Website", email: fromEmail },
        to: [{ email: toEmail, name: "Manu Landeck" }],
        subject: `📥 FlowScreen-Download: ${variant === "setup" ? "Setup" : "Portable"} (v${FLOWSCREEN_VERSION})`,
        htmlContent: `<p><strong>FlowScreen v${FLOWSCREEN_VERSION}</strong> wurde gerade angefordert.</p><ul><li>Variante: <strong>${variant}</strong> (${ASSETS[variant]})</li><li>Zeit: ${new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" })} Uhr</li><li>Seite: ${referer}</li><li>IP: ${ip}</li><li>Browser: ${userAgent.slice(0, 200)}</li></ul><p style="color:#888;font-size:12px;">Hinweis: max. 1 Mail pro 5 Min. (Spam-Schutz). Exakte Zahlen in Vercel Analytics → Event „flowscreen_download“.</p>`,
      }),
    });
  } catch {
    // Mail-Fehler dürfen den Download nie blockieren.
  }
}

export async function GET(request: NextRequest) {
  const variantParam = request.nextUrl.searchParams.get("typ");
  const variant: DownloadVariant = isVariant(variantParam) ? variantParam : "setup";

  // E-Mail an Manu (nicht abwarten – Download darf nie verzögert werden).
  void notifyDownload(variant, request);

  const target = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/releases/latest/download/${ASSETS[variant]}`;

  const response = NextResponse.redirect(target, { status: 302 });
  // Für Server-Logs / Vercel Analytics auswertbar, welche Variante gewählt wurde.
  response.headers.set("x-flowscreen-download", variant);
  response.headers.set("Cache-Control", "no-store");
  return response;
}

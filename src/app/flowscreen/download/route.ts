import { NextResponse, type NextRequest } from "next/server";

const GITHUB_OWNER = "manuelos19-ops";
const GITHUB_REPO = "flowscreen-releases";
const FLOWSCREEN_VERSION = "1.1.0";

const ASSETS = {
  setup: `FlowScreen-Setup-${FLOWSCREEN_VERSION}.exe`,
  portable: `FlowScreen-Portable-${FLOWSCREEN_VERSION}.exe`,
} as const;

type DownloadVariant = keyof typeof ASSETS;

function isVariant(value: string | null): value is DownloadVariant {
  return value === "setup" || value === "portable";
}

export function GET(request: NextRequest) {
  const variantParam = request.nextUrl.searchParams.get("typ");
  const variant: DownloadVariant = isVariant(variantParam) ? variantParam : "setup";

  const target = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/releases/latest/download/${ASSETS[variant]}`;

  const response = NextResponse.redirect(target, { status: 302 });
  // Für Server-Logs / Vercel Analytics auswertbar, welche Variante gewählt wurde.
  response.headers.set("x-flowscreen-download", variant);
  response.headers.set("Cache-Control", "no-store");
  return response;
}

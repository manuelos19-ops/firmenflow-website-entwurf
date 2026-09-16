export const FLOWSCREEN_VERSION = "1.1.0";
export const FLOWSCREEN_SIZE_LABEL = "~79 MB";
export const FLOWSCREEN_SIZE_LABEL_SHORT = "79 MB";
export const FLOWSCREEN_OS_LABEL = "Windows 11 & Windows 10 (64-Bit)";

export const FLOWSCREEN_GITHUB_OWNER = "manuelos19-ops";
export const FLOWSCREEN_GITHUB_REPO = "flowscreen-releases";
export const FLOWSCREEN_RELEASES_URL = `https://github.com/${FLOWSCREEN_GITHUB_OWNER}/${FLOWSCREEN_GITHUB_REPO}/releases`;
export const FLOWSCREEN_RELEASE_TAG_URL = `https://github.com/${FLOWSCREEN_GITHUB_OWNER}/${FLOWSCREEN_GITHUB_REPO}/releases/tag/v${FLOWSCREEN_VERSION}`;

/**
 * SHA256-Hashes der Release-Dateien v1.1.0.
 * Quelle: GitHub Releases API `digest`-Feld (Stand 15.09.2026).
 * Bei jedem neuen Release HIER + in der Verify-Seite aktualisieren.
 */
export const FLOWSCREEN_HASHES = {
  setup: "83982c012eb0a66e84479b006235f698c7595e1199098432e3882db8c3b16330",
  portable: "0f72376d8111182fae43e3271bc630f3a435d9bb1fa16a391b4f50707d952a81",
} as const;

export const FLOWSCREEN_FILE_NAMES = {
  setup: `FlowScreen-Setup-${FLOWSCREEN_VERSION}.exe`,
  portable: `FlowScreen-Portable-${FLOWSCREEN_VERSION}.exe`,
} as const;

export const FLOWSCREEN_FILE_SIZES = {
  setup: 82922919,
  portable: 82692520,
} as const;

/** VirusTotal-Analyseseite für einen Datei-Hash (Datei-Upload NICHT nötig zum Ansehen). */
export function getVirusTotalUrl(hash: string): string {
  return `https://www.virustotal.com/gui/file/${hash}`;
}

export function getFlowscreenVirusTotalUrl(variant: FlowscreenVariant): string {
  return getVirusTotalUrl(FLOWSCREEN_HASHES[variant]);
}

export type FlowscreenVariant = "setup" | "portable";

/** Interne Download-Route (trackbar) -> 302 auf GitHub Releases. */
export function getFlowscreenDownloadUrl(variant: FlowscreenVariant): string {
  return `/flowscreen/download?typ=${variant}`;
}

/** Direktlink als Fallback, falls die interne Route einmal nicht erreichbar ist. */
export function getFlowscreenDirectUrl(variant: FlowscreenVariant): string {
  return `https://github.com/${FLOWSCREEN_GITHUB_OWNER}/${FLOWSCREEN_GITHUB_REPO}/releases/latest/download/${FLOWSCREEN_FILE_NAMES[variant]}`;
}

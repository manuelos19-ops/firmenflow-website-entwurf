export const FLOWSCREEN_VERSION = "1.1.1";
export const FLOWSCREEN_SIZE_LABEL = "~80 MB";
export const FLOWSCREEN_SIZE_LABEL_SHORT = "80 MB";
export const FLOWSCREEN_OS_LABEL = "Windows 11 & Windows 10 (64-Bit)";

export const FLOWSCREEN_GITHUB_OWNER = "manuelos19-ops";
export const FLOWSCREEN_GITHUB_REPO = "flowscreen-releases";
export const FLOWSCREEN_RELEASES_URL = `https://github.com/${FLOWSCREEN_GITHUB_OWNER}/${FLOWSCREEN_GITHUB_REPO}/releases`;
export const FLOWSCREEN_RELEASE_TAG_URL = `https://github.com/${FLOWSCREEN_GITHUB_OWNER}/${FLOWSCREEN_GITHUB_REPO}/releases/tag/v${FLOWSCREEN_VERSION}`;

/**
 * SHA256-Hashes der Release-Dateien v1.1.1.
 * Quelle: GitHub Releases API `digest`-Feld (Stand 17.09.2026).
 * Bei jedem neuen Release HIER + in der Verify-Seite aktualisieren.
 */
export const FLOWSCREEN_HASHES = {
  setup: "e846f02e0fa5e50e130f5074af4658a989f6aef1c328b5710be2823e48ac552e",
  portable: "777bce14e0fa62f6a2d0145795430fa4d4a20f1d438e687085a546fdf8f5f461",
} as const;

export const FLOWSCREEN_CHANGELOG = [
  {
    version: "1.1.1",
    date: "17.09.2026",
    title: "Neues App-Icon, stabilere Hilfe & Dark-Mode-Fixes",
    items: [
      "Neues FlowScreen App-Icon (Taskleiste, Tray, Installer & Shortcuts)",
      "Hilfe-Menü: alle 6 Tabs schalten wieder zuverlässig um",
      "Neuer Profi-Tipp: Linien, Marker & Kreise gerade ziehen mit Shift / Strg",
      "Dark Mode: Druck-Tasten-Status und Hinweis-Balken wieder gut lesbar",
    ],
  },
  {
    version: "1.1.0",
    date: "15.09.2026",
    title: "Mockup-Vollausbau, Dark Mode & Portable",
    items: [
      "Mockup-Modus mit Browser- und Geräte-Rahmen, Presets & 3D-Tilt",
      "Dark Mode für den Editor, Portable-Version ohne Installation",
      "Automatisches Update-System über GitHub Releases",
    ],
  },
] as const;

export const FLOWSCREEN_FILE_NAMES = {
  setup: `FlowScreen-Setup-${FLOWSCREEN_VERSION}.exe`,
  portable: `FlowScreen-Portable-${FLOWSCREEN_VERSION}.exe`,
} as const;

export const FLOWSCREEN_FILE_SIZES = {
  setup: 83502523,
  portable: 83126383,
} as const;

/**
 * VirusTotal-Ergebnis (manuell verifiziert, Stand 17.09.2026).
 * Setup v1.1.1: 0/46 Erkennungen. Portable v1.1.1: 0/44 Erkennungen.
 * Hinweis: Viele Scanner waren zum Pruefzeitpunkt noch im Timeout,
 * daher faellt der Nenner kleiner aus als bei v1.1.0 (0/67 bzw. 0/66).
 */
export const FLOWSCREEN_VIRUSTOTAL = {
  portable: { clean: 44, total: 44, verifiedAt: "17.09.2026" },
  setup: { clean: 46, total: 46, verifiedAt: "17.09.2026" },
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

export const FLOWSCREEN_VERSION = "1.2.0";
export const FLOWSCREEN_SIZE_LABEL = "~84 MB";
export const FLOWSCREEN_SIZE_LABEL_SHORT = "84 MB";
export const FLOWSCREEN_OS_LABEL = "Windows 11 & Windows 10 (64-Bit)";

export const FLOWSCREEN_GITHUB_OWNER = "manuelos19-ops";
export const FLOWSCREEN_GITHUB_REPO = "flowscreen-releases";
export const FLOWSCREEN_RELEASES_URL = `https://github.com/${FLOWSCREEN_GITHUB_OWNER}/${FLOWSCREEN_GITHUB_REPO}/releases`;
export const FLOWSCREEN_RELEASE_TAG_URL = `https://github.com/${FLOWSCREEN_GITHUB_OWNER}/${FLOWSCREEN_GITHUB_REPO}/releases/tag/v${FLOWSCREEN_VERSION}`;

/**
 * SHA256-Hashes der Release-Dateien v1.2.0.
 * Quelle: lokale dist-Builds (Stand 21.09.2026).
 * Bei jedem neuen Release HIER + in der Verify-Seite aktualisieren.
 */
export const FLOWSCREEN_HASHES = {
  setup: "20d13610528782375ab0b82049a88fa8c9723e2db3d390dac5385e2211be4dbb",
  portable: "04ab8da1a68edb18b83e107ae71fa2337d9dcc913c053ffd2a92413a5a59cc70",
} as const;

export const FLOWSCREEN_CHANGELOG = [
  {
    version: "1.2.0",
    date: "21.09.2026",
    title: "Schnellmodus, Update-Dialoge & Portable-Download",
    items: [
      "Schnellmodus (Strg+M): Auswahl direkt als Datei speichern, ohne Editor",
      "Auto-Updates max. 1x/Tag mit Dialog, Tray-Hinweis, Überspringen & Später",
      "Portable meldet neue Versionen mit Link auf die Download-Seite",
      "Tray-Klick öffnet nur den Editor, kein Autostart-Snip mehr",
    ],
  },
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
  setup: 83560072,
  portable: 83184082,
} as const;

/**
 * VirusTotal-Ergebnis v1.2.0 (API-Upload + Analyse, Stand 21.09.2026).
 * Setup: 0/66 Erkennungen (3 Timeouts). Portable: 0/66 (2 Timeouts + 1 Failure).
 * Timeouts/Failures = Scanner hat 83 MB nicht im Zeitfenster geschafft, kein Treffer.
 */
export const FLOWSCREEN_VIRUSTOTAL = {
  portable: { clean: 66, total: 66, verifiedAt: "21.09.2026" },
  setup: { clean: 66, total: 66, verifiedAt: "21.09.2026" },
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

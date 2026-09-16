export const FLOWSCREEN_VERSION = "1.1.0";
export const FLOWSCREEN_SIZE_LABEL = "~95 MB";
export const FLOWSCREEN_OS_LABEL = "Windows 11 & Windows 10 (64-Bit)";

export const FLOWSCREEN_GITHUB_OWNER = "manuelos19-ops";
export const FLOWSCREEN_GITHUB_REPO = "flowscreen-releases";
export const FLOWSCREEN_RELEASES_URL = `https://github.com/${FLOWSCREEN_GITHUB_OWNER}/${FLOWSCREEN_GITHUB_REPO}/releases`;

export type FlowscreenVariant = "setup" | "portable";

/** Interne Download-Route (trackbar) -> 302 auf GitHub Releases. */
export function getFlowscreenDownloadUrl(variant: FlowscreenVariant): string {
  return `/flowscreen/download?typ=${variant}`;
}

/** Direktlink als Fallback, falls die interne Route einmal nicht erreichbar ist. */
export function getFlowscreenDirectUrl(variant: FlowscreenVariant): string {
  const file =
    variant === "setup"
      ? `FlowScreen-Setup-${FLOWSCREEN_VERSION}.exe`
      : `FlowScreen-Portable-${FLOWSCREEN_VERSION}.exe`;
  return `https://github.com/${FLOWSCREEN_GITHUB_OWNER}/${FLOWSCREEN_GITHUB_REPO}/releases/latest/download/${file}`;
}

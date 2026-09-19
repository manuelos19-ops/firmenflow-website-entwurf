import path from "node:path";

export const OUTPUT_DIR = path.resolve("outputs/og-social-pilot");
export const QA_DIR = path.resolve("work/og-social-pilot");

export const PILOT = {
  size: { width: 1200, height: 630 },
  safeZone: 64,
  colors: {
    paper: "#fcfaf7",
    ink: "#17131a",
    plum: "#482361",
    plumLight: "#653683",
    coral: "#ff705d",
    muted: "#746d76",
    flowDark: "#160f1a",
    mint: "#65d6c1",
  },
  cards: {
    firmenflow: {
      output: "firmenflow-og-social.png",
      eyebrow: "WEBDESIGN & LOKALPRÄSENZ",
      headline: "Mehr Lokalpräsenz. Weniger Agenturtheater.",
      primaryLine: "Mehr Lokalpräsenz.",
      editorialLine: "Weniger Agenturtheater.",
      subline: "Websites und Google-Profile persönlich mit Manu.",
      badge: "PERSÖNLICH MIT MANU",
    },
    flowscreen: {
      output: "flowscreen-og-social.png",
      headline: "Schluss mit hässlichen Screenshots.",
      lineOne: "Schluss mit hässlichen",
      accentLine: "Screenshots.",
      subline: "Das kostenlose Screenshot-Studio für Windows.",
      badge: "100 % LOKAL · WINDOWS 10 & 11",
    },
  },
} as const;

export type PilotVariant = keyof typeof PILOT.cards;

export const ASSET_PATHS = {
  firmenflowWordmark: "public/brand/firmenflow-wordmark.png",
  manuPortrait: "public/media/manu-hero.webp",
  flowscreenLogo: "public/media/flowscreen/flowscreen-logo.png",
  flowscreenEditor: "public/media/flowscreen/editor-preview.png",
  displayFont: "public/fonts/space-grotesk/SpaceGrotesk-Variable.woff2",
  sansFont: "public/fonts/switzer/Switzer-Variable.woff2",
  serifFont: "public/fonts/crimson/CrimsonText-Italic.woff2",
} as const;

export type PilotAssetPaths = { [K in keyof typeof ASSET_PATHS]: string };
export type PilotAssets = Record<keyof PilotAssetPaths, string>;

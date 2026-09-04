export type Project = {
  slug: string;
  name: string;
  sector: string;
  region: string;
  url: string;
  kind: "live" | "concept";
  badge: string;
  summary: string;
  factsApproved: boolean;
  image: string;
};

export const liveProjects: readonly Project[] = [
  {
    slug: "eiscafe-orrico",
    name: "Eiscafé Orrico",
    sector: "Gastronomie & Café",
    region: "Hamminkeln & Niederrhein",
    url: "https://eiscafe-orrico.de/",
    kind: "live",
    badge: "Echte Live-Website",
    summary: "Ein moderner, öffentlich erreichbarer Webauftritt für ein beliebtes regionales Eiscafé am Niederrhein mit digitaler Karte und Anfahrt.",
    factsApproved: false,
    image: "/media/projects/eiscafe-orrico.webp",
  },
  {
    slug: "autotransport-alex",
    name: "Autotransport Alex",
    sector: "Transportdienstleistung",
    region: "Nordrhein-Westfalen",
    url: "https://www.autotransport-alex.de/",
    kind: "live",
    badge: "Echte Live-Website",
    summary: "Ein kontaktorientierter, mobiler Webauftritt für zuverlässige Fahrzeugüberführungen und Transportdienstleistungen in NRW.",
    factsApproved: false,
    image: "/media/projects/autotransport-alex.webp",
  },
  {
    slug: "climanu-wetter",
    name: "cliManu – Wetter Web-App",
    sector: "Web-App & Dashboard",
    region: "Deutschlandweit",
    url: "https://climanu.de/",
    kind: "live",
    badge: "Echte Live Web-App",
    summary: "Eine interaktive, responsive Wetter-App & PWA mit DWD-Echtzeitdaten, 24h-Wetterkurve, Live-Regenradar und lokalem KI-Copilot.",
    factsApproved: true,
    image: "/media/projects/climanu-wetter.webp",
  },
] as const;

export const conceptProjects: readonly Project[] = [
  {
    slug: "baeckerei-goldkruste",
    name: "Bäckerei & Konditorei Goldkruste",
    sector: "Bäckerei & Konditorei",
    region: "Niederrhein",
    url: "https://handwerksbaeckerei-demo.vercel.app/",
    kind: "concept",
    badge: "Branchen-Showcase",
    summary: "Interaktiver Branchen-Showcase für eine moderne Handwerksbäckerei mit traditioneller 24h-Teigruhe, Torten-Konfigurator und regionaler Genusskultur.",
    factsApproved: true,
    image: "/media/projects/goldkruste-baeckerei.webp",
  },
  {
    slug: "kaesekuchen-manufaktur",
    name: "Käsekuchen Manufaktur",
    sector: "Café & Handwerksbackstube",
    region: "Spezialitäten-Gastronomie",
    url: "https://kaesekuchen-cafe-demo.vercel.app/",
    kind: "concept",
    badge: "Branchen-Showcase",
    summary: "Interaktiver Branchen-Showcase für ein traditionsreiches Spezialitäten-Café mit über 190 Rezepturen, digitaler Speisekarte und Tischreservierung.",
    factsApproved: true,
    image: "/media/projects/kaesekuchen-cafe.webp",
  },
] as const;

export const getLiveProject = (slug: string) => liveProjects.find((project) => project.slug === slug);

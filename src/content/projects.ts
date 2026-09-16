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
    image: "/media/projects/eiscafe-orrico-phone.webp",
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
    image: "/media/projects/autotransport-alex-phone.webp",
  },
  {
    slug: "climanu-wetter",
    name: "cliManu – Wetter Web-App",
    sector: "Web-App & Dashboard",
    region: "Deutschlandweit",
    url: "https://www.climanu.de/",
    kind: "live",
    badge: "Echte Live Web-App",
    summary: "Eine interaktive, responsive Wetter-App & PWA mit DWD-Echtzeitdaten, 24h-Wetterkurve, Live-Regenradar und lokalem KI-Copilot.",
    factsApproved: true,
    image: "/media/projects/climanu-wetter-phone.webp",
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
    badge: "Konzeptentwurf – kein Kundenauftrag",
    summary: "Ein frei gestalteter Konzeptentwurf für eine Handwerksbäckerei mit digitaler Auslage, Torten-Konfigurator und regionaler Bildsprache (fiktiver Betrieb).",
    factsApproved: true,
    image: "/media/projects/baeckerei-goldkruste-phone.webp",
  },
  {
    slug: "cafe-goldstueck",
    name: "Café Goldstück",
    sector: "Café & Spezialitätenkaffee",
    region: "Hamburger Speicherstadt",
    url: "https://kaesekuchen-cafe-demo.vercel.app/",
    kind: "concept",
    badge: "Konzeptentwurf – kein Kundenauftrag",
    summary: "Ein frei gestalteter Konzeptentwurf für ein Specialty-Coffee-Café mit digitaler Karte, Bewertungen und mobilem Fokus (fiktiver Betrieb).",
    factsApproved: true,
    image: "/media/projects/cafe-goldstueck-phone.webp",
  },
] as const;

export const allProjects: readonly Project[] = [...liveProjects, ...conceptProjects];

export const getProject = (slug: string) => allProjects.find((project) => project.slug === slug);
export const getLiveProject = (slug: string) => liveProjects.find((project) => project.slug === slug);

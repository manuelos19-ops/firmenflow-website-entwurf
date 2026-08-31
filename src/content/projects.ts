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
    sector: "Gastronomie",
    region: "Hamminkeln & Niederrhein",
    url: "https://eiscafe-orrico.de/",
    kind: "live",
    badge: "Echte Live-Website",
    summary: "Ein moderner, öffentlich erreichbarer Webauftritt für ein beliebtes regionales Eiscafé am Niederrhein.",
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
    summary: "Ein kontaktorientierter, mobiler Webauftritt für zuverlässige Fahrzeugüberführungen und Transportdienstleistungen.",
    factsApproved: false,
    image: "/media/projects/autotransport-alex.webp",
  },
] as const;

export const conceptProjects: readonly Project[] = [
  {
    slug: "baeckerei-buescher",
    name: "Bäckerei Konditorei Detlev Büscher",
    sector: "Bäckerei & Konditorei",
    region: "Niederrhein",
    url: "https://buescher-baeckerrei.vercel.app/",
    kind: "concept",
    badge: "Branchen-Showcase",
    summary: "Interaktiver Branchen-Showcase für einen modernen Handwerks- und Bäckereiauftritt am Niederrhein.",
    factsApproved: true,
    image: "/media/projects/buescher-baeckerei.webp",
  },
  {
    slug: "vincent-kaesekuchenbaeckerei",
    name: "Vincent – Café & Käsekuchenbäckerei",
    sector: "Café & Bäckerei",
    region: "Harz (Quedlinburg)",
    url: "https://kaesekuchenbaeckerei.vercel.app/",
    kind: "concept",
    badge: "Branchen-Showcase",
    summary: "Interaktiver Branchen-Showcase für ein gemütliches Café mit digitaler Speisekarte und Tischreservierung.",
    factsApproved: true,
    image: "/media/projects/vincent-kaesekuchen.webp",
  },
] as const;

export const getLiveProject = (slug: string) => liveProjects.find((project) => project.slug === slug);

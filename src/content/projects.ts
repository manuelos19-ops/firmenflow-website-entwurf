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
    badge: "Live-Website",
    summary: "Ein öffentlich erreichbarer Webauftritt für ein regionales Eiscafé. Weitere Projektaussagen werden erst nach Freigabe der tatsächlichen Rolle ergänzt.",
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
    badge: "Live-Website",
    summary: "Ein öffentlich erreichbarer, kontaktorientierter Auftritt für eine Transportdienstleistung. Weitere Projektaussagen folgen nur nach Faktenfreigabe.",
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
    badge: "Konzeptentwurf – noch nicht veröffentlicht",
    summary: "Ein unveröffentlichter Gestaltungsvorschlag für einen regionalen Betrieb. Die Darstellung behauptet weder Auftrag noch Zusammenarbeit.",
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
    badge: "Konzeptentwurf – noch nicht veröffentlicht",
    summary: "Ein unveröffentlichter Websiteentwurf. Die Darstellung wird klar von echten Kundenprojekten getrennt.",
    factsApproved: true,
    image: "/media/projects/vincent-kaesekuchen.webp",
  },
] as const;

export const getLiveProject = (slug: string) => liveProjects.find((project) => project.slug === slug);

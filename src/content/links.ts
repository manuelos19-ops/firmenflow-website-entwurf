export interface LinkItem {
  id: string;
  title: string;
  url: string;
  category: string;
  description: string;
  image?: string;
  tags: string[];
  badge?: string;
  ctaText: string;
  highlight?: boolean;
}

export interface QuickContact {
  label: string;
  url: string;
  icon: "whatsapp" | "phone" | "mail";
  ariaLabel: string;
}

export interface LinkProfile {
  name: string;
  handle: string;
  role: string;
  location: string;
  avatar: string;
  status: string;
  bio: string;
}

export const linkProfile: LinkProfile = {
  name: "Manuel Landeck (Manu)",
  handle: "@firmenflow",
  role: "Webdesigner, Entwickler & Gründer von Firmenflow",
  location: "Wesel & Niederrhein 📍",
  avatar: "/media/portraits/manu-contact-portrait.webp",
  status: "Verfügbar für neue Projekte & Austausch",
  bio: "Ich entwickle klare, schnelle Websites und smarte KI-Tools. Hier findest du meine aktuellen Web-Apps, Analyse-Tools und direkten Kontaktwege auf einen Blick.",
};

export const quickContacts: QuickContact[] = [
  {
    label: "WhatsApp",
    url: "https://wa.me/4915567277155?text=Hi%20Manu,%20ich%20habe%20deine%20Projekt-Links%20gesehen!",
    icon: "whatsapp",
    ariaLabel: "Manu direkt per WhatsApp kontaktieren",
  },
  {
    label: "0155 67277155",
    url: "tel:+4915567277155",
    icon: "phone",
    ariaLabel: "Manu telefonisch anrufen",
  },
  {
    label: "E-Mail",
    url: "mailto:hallo@firmenflow.de?subject=Hallo%20Manu",
    icon: "mail",
    ariaLabel: "E-Mail an hallo@firmenflow.de senden",
  },
];

export const primaryLinks: LinkItem[] = [
  {
    id: "xray-anfrage",
    title: "Kostenlose Website-Analyse anfordern",
    url: "https://analyse.firmenflow.de/anfrage",
    category: "Audit für deinen Betrieb",
    description: "Hol dir den echten Status Quo für deinen Webauftritt: Individuelles Website- & Conversion-Audit anfordern und sofort hebelstarke Optimierungspotenziale aufdecken.",
    tags: ["Kostenlos", "Umsatzhebel", "Individuell"],
    badge: "Empfohlen",
    ctaText: "Analyse anfordern",
    highlight: true,
  },
  {
    id: "climanu",
    title: "cliManu – Wetter Web-App & PWA",
    url: "https://climanu.de/",
    category: "Live Web-App & PWA",
    description: "Moderne, blitzschnelle Wetter-App mit DWD-Echtzeitdaten, 24h-Temperaturkurve, hochauflösendem Live-Regenradar und lokalem KI-Wettercopilot.",
    image: "/media/projects/climanu-wetter.webp",
    tags: ["DWD OpenData", "PWA", "Regenradar", "KI-Copilot"],
    badge: "Echte Live Web-App",
    ctaText: "cliManu.de öffnen",
    highlight: false,
  },
  {
    id: "vidalyzer",
    title: "VidAlyzer by Firmenflow",
    url: "https://vidalyzer-by-firmenflow.vercel.app",
    category: "KI Video-Analyse PWA",
    description: "Agentische Videoanalyse mit Google Gemini 3.8 Flash als PWA. Spart bis zu 88 % Token durch dynamische Zeitleistennavigation bei YouTube- & MP4-Audits.",
    image: "/media/projects/vidalyzer-icon.png",
    tags: ["Gemini 3.8 Flash", "PWA", "Token-Optimizer", "Video-KI"],
    badge: "KI-App",
    ctaText: "VidAlyzer öffnen",
    highlight: false,
  },
  {
    id: "xray",
    title: "Firmenflow X-Ray – Website-Analyse",
    url: "https://analyse.firmenflow.de/",
    category: "Audit-Tool & PWA",
    description: "Der Röntgenblick für Websites & Online-Shops: 15 verhaltenspsychologische Conversion-Bausteine, PageSpeed- & CrUX-Felddaten, Barrierefreiheit & DSGVO in unter 2 Minuten.",
    image: "/media/projects/xray-icon.png",
    tags: ["Conversion-Psychologie", "PageSpeed & CrUX", "DSGVO-Check"],
    badge: "Live-Tool",
    ctaText: "Website analysieren",
    highlight: false,
  },
  {
    id: "firmenflow-main",
    title: "Firmenflow – Offizielle Website",
    url: "https://firmenflow.de/",
    category: "Webdesign & Lokalpräsenz",
    description: "Mehr Lokalpräsenz. Weniger Agenturtheater. Deine Website persönlich mit Manu aus Wesel am Niederrhein.",
    image: "/brand/firmenflow-mark.png",
    tags: ["Webdesign", "Wesel & Niederrhein", "Persönlich mit Manu"],
    badge: "Hauptseite",
    ctaText: "firmenflow.de besuchen",
    highlight: false,
  },
];

export const showcaseLinks = [
  {
    name: "Eiscafé Orrico",
    sector: "Gastronomie & Café",
    url: "https://eiscafe-orrico.de/",
    type: "Echte Live-Website",
  },
  {
    name: "Autotransport Alex",
    sector: "Transportdienstleistung",
    url: "https://www.autotransport-alex.de/",
    type: "Echte Live-Website",
  },
  {
    name: "Bäckerei & Konditorei Goldkruste",
    sector: "Handwerksbäckerei Showcase",
    url: "https://handwerksbaeckerei-demo.vercel.app/",
    type: "Branchen-Showcase",
  },
  {
    name: "Käsekuchen Manufaktur",
    sector: "Café & Backstube Showcase",
    url: "https://kaesekuchen-cafe-demo.vercel.app/",
    type: "Branchen-Showcase",
  },
] as const;

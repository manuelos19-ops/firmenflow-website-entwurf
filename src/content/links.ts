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
  bio: "Ich entwickle klare, schnelle Websites und smarte Web-Apps & KI-Tools. Hier findest du meine aktuellen Plattformen, Analyse-Tools und direkten Kontaktwege auf einen Blick.",
};

export const quickContacts: QuickContact[] = [
  {
    label: "WhatsApp",
    url: "https://wa.me/4915567277155?text=Hi%20Manu,%20ich%20habe%20deine%20Projekt-Links%20gesehen!",
    icon: "whatsapp",
    ariaLabel: "Persönlich mit Manu per WhatsApp sprechen",
  },
  {
    label: "0155 67277155",
    url: "tel:+4915567277155",
    icon: "phone",
    ariaLabel: "Persönlich mit Manu telefonieren",
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
    id: "flowray-anfrage",
    title: "Kostenlose Website-Analyse anfordern",
    url: "https://analyse.firmenflow.de/anfrage",
    category: "Audit für deinen Betrieb",
    description: "Hol dir den echten Status Quo für deinen Webauftritt: Individuelles Website- & Conversion-Audit mit FlowRay anfordern und sofort hebelstarke Optimierungspotenziale aufdecken.",
    tags: ["Kostenlos", "Umsatzhebel", "FlowRay Scan"],
    badge: "Empfohlen",
    ctaText: "Analyse anfordern",
    highlight: true,
  },
  {
    id: "flowray",
    title: "FlowRay – Website- & Conversion-Analyse",
    url: "https://analyse.firmenflow.de/",
    category: "Website-Analyse PWA",
    description: "Der Röntgenblick für Websites & Online-Shops: 15 verhaltenspsychologische Conversion-Bausteine, PageSpeed- & CrUX-Felddaten, Barrierefreiheit & DSGVO-Check in unter 2 Minuten.",
    image: "/brand/flowray-mark.webp",
    tags: ["Conversion-Psychologie", "PageSpeed & CrUX", "DSGVO-Check", "PWA"],
    badge: "Live PWA",
    ctaText: "Website analysieren",
    highlight: false,
  },
  {
    id: "flowalyzer",
    title: "Flowalyzer by Firmenflow",
    url: "https://flowalyzer.firmenflow.de/",
    category: "Video Intelligence PWA",
    description: "Intelligente Videoanalyse mit Google Gemini als Progressive Web App (PWA): Verwandle YouTube-Videos, Meetings und Tutorials in Sekunden in fertige Schritt-für-Schritt SOPs und Notizen.",
    image: "/brand/flowalyzer-mark.webp",
    tags: ["Gemini KI", "PWA", "YouTube & Upload", "SOP-Generator"],
    badge: "Live PWA",
    ctaText: "flowalyzer.firmenflow.de öffnen",
    highlight: false,
  },
  {
    id: "foundersflow",
    title: "foundersflow – Solopreneur OS & CRM",
    url: "https://foundersflow.app/",
    category: "Solopreneur Dashboard PWA",
    description: "Das moderne All-in-One Cockpit & schlanke CRM für Solopreneure, Freelancer & Gründer: Pipeline, Lead-Tracking, Aufgaben und Umsatzhebel an einem Ort.",
    image: "/brand/foundersflow-mark.webp",
    tags: ["CRM", "Dashboard", "PWA", "Solopreneur Flow"],
    badge: "Live PWA",
    ctaText: "foundersflow.app öffnen",
    highlight: false,
  },
  {
    id: "gscflow",
    title: "GSCflow – Google Search & KI-Cockpit",
    url: "https://gscflow.vercel.app/",
    category: "Search Console PWA",
    description: "Google Search Console Cockpit mit Gemini KI: Automatische Erkennung von Keyword-Potenzialen (Position 8–18), CTR-Booster für Google-Snippets und 3-Minuten Chef-Report für lokale Betriebe.",
    image: "/brand/gscflow-mark.webp",
    tags: ["Search Console", "Gemini KI", "SEO-Cockpit", "PWA"],
    badge: "Live PWA",
    ctaText: "gscflow.vercel.app öffnen",
    highlight: false,
  },
  {
    id: "climanu",
    title: "cliManu – Wetter Web-App & PWA",
    url: "https://www.climanu.de/",
    category: "Live Web-App & PWA",
    description: "Moderne, blitzschnelle Wetter-App mit DWD-Echtzeitdaten, 24h-Temperaturkurve, hochauflösendem Live-Regenradar und lokalem KI-Wettercopilot.",
    image: "/media/projects/climanu-wetter.webp",
    tags: ["DWD OpenData", "PWA", "Regenradar", "KI-Copilot"],
    badge: "Live PWA",
    ctaText: "cliManu.de öffnen",
    highlight: false,
  },
  {
    id: "firmenflow-main",
    title: "Firmenflow – Offizielle Website",
    url: "https://www.firmenflow.de/",
    category: "Webdesign & Lokalpräsenz",
    description: "Mehr Lokalpräsenz. Weniger Agenturtheater. Deine Website persönlich mit Manu aus Wesel am Niederrhein.",
    image: "/brand/firmenflow-mark.webp",
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

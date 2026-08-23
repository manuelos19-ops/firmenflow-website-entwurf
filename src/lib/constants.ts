// Navigation
export const NAV_LINKS = [
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Projekte', href: '#projekte' },
  { label: 'Über Manu', href: '#ueber-manu' },
  { label: 'Kontakt', href: '#kontakt' },
] as const;

// Hero
export const HERO = {
  line1: 'Mehr Lokalpräsenz.',
  line2: 'Weniger Agenturtheater.',
  line3: 'Deine Website.',
  line4: 'Direkt mit Manu.',
  ctaPrimary: 'Projekt starten',
  ctaSecondary: 'Mehr erfahren',
  region: 'Wesel & Niederrhein',
} as const;

// Services
export interface Service {
  id: string;
  icon: 'globe' | 'refresh' | 'mapPin';
  title: string;
  subtitle: string;
  description: string;
  features: readonly string[];
  badge?: string;
}

export const SERVICES: readonly Service[] = [
  {
    id: 'neue-website',
    icon: 'globe',
    title: 'Neue Website',
    subtitle: 'Dein digitales Schaufenster',
    description: 'Für Betriebe ohne zeitgemäße eigene Website. Individueller Auftritt, verständliche Inhalte, mobile Nutzung und klare Kontaktmöglichkeit.',
    features: ['Individuelles Design', 'Mobil optimiert', 'Suchmaschinenfreundlich', 'Schnelle Ladezeiten'],
  },
  {
    id: 'website-relaunch',
    icon: 'refresh',
    title: 'Website-Relaunch',
    subtitle: 'Dein Neustart im Netz',
    description: 'Für Betriebe mit veralteter oder schlecht konvertierender Website. Bestandsanalyse, neues Design, überarbeitete Inhalte und kontrollierter Wechsel.',
    features: ['Bestandsanalyse', 'Neue Struktur & Design', 'Content-Überarbeitung', 'Kontrollierter Launch'],
  },
  {
    id: 'google-business',
    icon: 'mapPin',
    title: 'Google Business 360°',
    subtitle: 'Dein Auftritt bei Google',
    description: 'Limitiertes Pilotprogramm für wenige regionale Unternehmen. Profiloptimierung, Bewertungsmanagement und monatliche Auswertung.',
    features: ['Profil-Audit', 'Bewertungsmanagement', 'Monatliche Auswertung', 'Wettbewerbsvergleich'],
    badge: 'Pilot',
  },
] as const;

// Projects
export type Project = {
  id: string;
  title: string;
  industry: string;
  description: string;
  image: string;
  url?: string;
  status: 'live' | 'concept';
};

export const PROJECTS: Project[] = [
  // Platzhalter – werden durch echte Projekte ersetzt
  {
    id: 'projekt-1',
    title: 'Beispielprojekt',
    industry: 'Handwerk',
    description: 'Platzhalter für ein echtes Live-Projekt.',
    image: '/images/projects/placeholder-1.jpg',
    url: '#',
    status: 'live',
  },
  {
    id: 'konzept-1',
    title: 'Konzept Bäckerei',
    industry: 'Gastronomie',
    description: 'Entwurf – nicht umgesetztes Konzept zur Veranschaulichung.',
    image: '/images/projects/placeholder-2.jpg',
    status: 'concept',
  },
];

// Process Steps
export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Erstgespräch',
    description: 'Kurzes Kennenlernen – was brauchst du, wo stehst du, was ist dein Ziel?',
  },
  {
    number: '02',
    title: 'Konzept & Angebot',
    description: 'Individueller Vorschlag mit klarem Umfang, Zeitplan und Preis. Kein Baukastenpreis.',
  },
  {
    number: '03',
    title: 'Umsetzung',
    description: 'Design, Entwicklung, dein Feedback. Alles direkt mit Manu – kein Projektmanager dazwischen.',
  },
  {
    number: '04',
    title: 'Launch & Übergabe',
    description: 'Deine neue Seite geht live. Sauber übergeben, verständlich erklärt.',
  },
] as const;

// Branchen für Marquee
export const INDUSTRIES = [
  'Handwerk', 'Gastronomie', 'Bäckereien', 'Einzelhandel',
  'Dienstleister', 'Beauty & Wellness', 'Fitness', 'Freizeit',
  'Arztpraxen', 'Immobilien', 'Autohäuser',
] as const;

// About
export const ABOUT = {
  heading: 'Manu. Nicht Agentur.',
  text: 'Ich bin Manu – Webdesigner aus Wesel. Bei mir gibt es keinen Projektmanager, keinen Zwischenhändler und keine Warteschleife. Du redest direkt mit dem, der deine Website auch baut. Persönlich, verbindlich und auf Augenhöhe.',
  region: 'Wesel & Niederrhein',
} as const;

// Region
export const REGION = {
  heading: 'Webdesign aus Wesel.',
  subheading: 'Für den Niederrhein.',
  text: 'Persönliche Treffen statt Videocall-Marathon. Ich kenne die Region, verstehe lokale Unternehmen und bin da, wenn du mich brauchst. Nicht in einer anderen Stadt, nicht in einem anderen Land – hier vor Ort.',
} as const;

// Contact
export const CONTACT = {
  heading: 'Lass uns reden.',
  subtext: 'Erzähl mir von deinem Vorhaben. Ich melde mich innerhalb von 24 Stunden.',
  email: 'mail@firmenflow.de',
  services: ['Neue Website', 'Website-Relaunch', 'Google Business 360°', 'Anderes'],
} as const;

// CTA
export const CTA = {
  heading: 'Bereit für deine neue Website?',
  subtext: 'Direkt mit Manu. Ohne Umwege.',
  button: 'Projekt starten',
} as const;

// Footer
export const FOOTER = {
  brand: 'Manu',
  slogan: 'für deine Lokalpräsenz',
  copyright: `© ${new Date().getFullYear()} Manuel Landeck`,
  legalLinks: [
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutz', href: '/datenschutz' },
  ],
} as const;

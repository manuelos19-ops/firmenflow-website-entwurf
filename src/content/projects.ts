export type ProjectHighlight = {
  icon: "responsive-design" | "performance-ladezeit" | "unternehmensprofil" | "mehr-anfragen" | "foto" | "video" | "struktur-wireframe" | "analyse" | "formular" | "texte-copywriting" | "seo-schutz" | "go-live";
  title: string;
  body: string;
};

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
  nature: string;
  scope: string;
  verifiable: string;
  highlights: readonly [ProjectHighlight, ProjectHighlight, ProjectHighlight];
};

export const liveProjects: readonly Project[] = [
  {
    slug: "eiscafe-orrico",
    name: "Eiscafé Orrico",
    sector: "Gastronomie & Café",
    region: "Hamminkeln & Niederrhein",
    url: "https://eiscafe-orrico.de/",
    kind: "live",
    badge: "Live-Arbeitsprobe",
    summary: "Ein moderner, öffentlich erreichbarer Webauftritt für ein beliebtes regionales Eiscafé am Niederrhein mit Eissorten, Öffnungszeiten und Anfahrt.",
    factsApproved: false,
    image: "/media/projects/eiscafe-orrico-phone.webp",
    nature: "Ein regionaler Gastronomiebetrieb am Niederrhein.",
    scope: "Konzeption, mobiles Webdesign, Strukturierung des Angebots und Bereitstellung der Website.",
    verifiable: "Öffentlich erreichbare Website: Ladezeit, mobile Bedienung und klare Struktur direkt auf dem Smartphone prüfbar.",
    highlights: [
      {
        icon: "responsive-design",
        title: "Sorten & Zeiten im Daumenformat",
        body: "Eissorten und Öffnungszeiten ohne Zoomen erreichbar. Eine neue digitale Karte kommt in der nächsten Ausbaustufe.",
      },
      {
        icon: "foto",
        title: "Appetit auf den ersten Blick",
        body: "Echte Fotos von Eis und Theke statt austauschbarer Symbole. Dazu sichtbare Google-Bewertungen als Vertrauensbeweis.",
      },
      {
        icon: "unternehmensprofil",
        title: "Weg zum Eis verkürzt",
        body: "Anfahrt, Anruf und Google-Route direkt aus der Seite heraus.",
      },
    ],
  },
  {
    slug: "autotransport-alex",
    name: "Autotransport Alex",
    sector: "Transportdienstleistung",
    region: "Nordrhein-Westfalen",
    url: "https://www.autotransport-alex.de/",
    kind: "live",
    badge: "Live-Arbeitsprobe",
    summary: "Ein kontaktorientierter, mobiler Webauftritt für zuverlässige Fahrzeugüberführungen und Transportdienstleistungen in NRW.",
    factsApproved: false,
    image: "/media/projects/autotransport-alex-phone.webp",
    nature: "Ein regionaler Dienstleister für Fahrzeugüberführungen und Transporte.",
    scope: "Kompakter Auftritt mit direktem Fokus auf schnelle Kontaktaufnahme (Telefon, WhatsApp) und klare Leistungsübersicht.",
    verifiable: "Öffentlich erreichbare Website: Schnelle Orientierung, Barrierefreiheit und einfache Kontaktwege.",
    highlights: [
      {
        icon: "mehr-anfragen",
        title: "Anruf in zwei Sekunden",
        body: "Telefon und WhatsApp prominent platziert, kein Suchen nach Kontakt.",
      },
      {
        icon: "struktur-wireframe",
        title: "Leistung sofort erkennbar",
        body: "Überführung, Termine und Ablauf auf den Punkt erklärt.",
      },
      {
        icon: "performance-ladezeit",
        title: "Schnell auch unterwegs",
        body: "Schlanke Seite, die am Straßenrand ohne Warten lädt.",
      },
    ],
  },
  {
    slug: "climanu-wetter",
    name: "cliManu – Wetter Web-App",
    sector: "Web-App & Dashboard",
    region: "Deutschlandweit",
    url: "https://www.climanu.de/",
    kind: "live",
    badge: "Eigenes Projekt",
    summary: "Eine interaktive, responsive Wetter-App & PWA mit DWD-Echtzeitdaten, 24h-Wetterkurve, Live-Regenradar und lokalem KI-Copilot.",
    factsApproved: true,
    image: "/media/projects/climanu-wetter-phone.webp",
    nature: "Ein eigenständiges Software- und Web-App-Projekt von Manuel Landeck.",
    scope: "Vollständige Produktentwicklung: Frontend-Architektur, DWD-Echtzeitdaten-Anbindung und PWA-Installation.",
    verifiable: "Frei nutzbare Live-Web-App: Interaktivität, Performance, Datenvisualisierung und Interface-Design.",
    highlights: [
      {
        icon: "responsive-design",
        title: "App-Gefühl im Browser",
        body: "Installierbare PWA mit 24h-Kurve, Radar und Copilot auf jedem Gerät.",
      },
      {
        icon: "performance-ladezeit",
        title: "Echtzeit ohne Warten",
        body: "DWD-Daten, Karten und Vorhersagen flüssig und zwischengespeichert.",
      },
      {
        icon: "analyse",
        title: "Daten lesbar gemacht",
        body: "Komplexe Wetterdaten als klare Kurven und Karten statt Tabellen.",
      },
    ],
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
    nature: "Frei gestalteter Konzeptentwurf für einen fiktiven Handwerksbetrieb (kein realer Kundenauftrag).",
    scope: "Designstudie mit digitaler Auslage, Anfrage-Logik und handwerklich abgestimmter Bildsprache.",
    verifiable: "Funktionsfähige Demo: Layout, Komponenten, Farbstimmung und Benutzerführung auf Mobilgeräten.",
    highlights: [
      {
        icon: "foto",
        title: "Auslage zum Anbeißen",
        body: "Brot, Torten und Konfigurator in warmer Handwerks-Bildsprache.",
      },
      {
        icon: "formular",
        title: "Torte anfragen statt anrufen",
        body: "Konfigurator mit Wunschtermin führt direkt zur Anfrage.",
      },
      {
        icon: "seo-schutz",
        title: "Handwerkston ohne Kitsch",
        body: "Ehrliche Texte und Typografie, die zum Bäcker passen.",
      },
    ],
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
    nature: "Frei gestalteter Konzeptentwurf für einen fiktiven Gastronomiebetrieb (kein realer Kundenauftrag).",
    scope: "Designstudie mit Fokus auf Ästhetik, Speisekarte, Atmosphäre und mobile Lesbarkeit.",
    verifiable: "Funktionsfähige Demo: Responsive Typografie, ruhige Bildführung und mobile Übersicht.",
    highlights: [
      {
        icon: "video",
        title: "Atmosphäre vor Geschmack",
        body: "Ruhige Bildführung und Karte, die Lust auf den ersten Kaffee macht.",
      },
      {
        icon: "texte-copywriting",
        title: "Karte, die man versteht",
        body: "Spezialitäten, Preise und Story klar strukturiert statt PDF-Wust.",
      },
      {
        icon: "go-live",
        title: "Stammgäste willkommen",
        body: "Bewertungen, Anfahrt und Öffnungszeiten auf einen Blick.",
      },
    ],
  },
] as const;

export const allProjects: readonly Project[] = [...liveProjects, ...conceptProjects];

export const getProject = (slug: string) => allProjects.find((project) => project.slug === slug);
export const getLiveProject = (slug: string) => liveProjects.find((project) => project.slug === slug);

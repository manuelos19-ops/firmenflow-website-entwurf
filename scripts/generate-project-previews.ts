import sharp from "sharp";
import fs from "fs";
import path from "path";

const projectsDir = path.join(process.cwd(), "public/media/projects");
if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir, { recursive: true });
}

const mockups = [
  {
    name: "eiscafe-orrico.webp",
    title: "Eiscafé Orrico",
    subtitle: "Italienische Eistradition am Niederrhein",
    badge: "Live-Projekt · Gastronomie",
    accent: "#E2725B",
    bg: "#FAF6F0",
    headerBg: "#2C1810",
    url: "eiscafe-orrico.de",
    elements: `
      <rect x="60" y="140" width="480" height="240" rx="16" fill="#F4EDE4" />
      <circle cx="160" cy="220" r="50" fill="#E2725B" opacity="0.8" />
      <circle cx="240" cy="200" r="45" fill="#789F6B" opacity="0.8" />
      <circle cx="200" cy="260" r="55" fill="#D4A373" opacity="0.8" />
      <text x="320" y="210" font-family="sans-serif" font-size="28" font-weight="bold" fill="#2C1810">Echte Zutaten.</text>
      <text x="320" y="250" font-family="sans-serif" font-size="18" fill="#6B5E55">Hausgemachtes Gelato nach Originalrezept</text>
      <rect x="320" y="280" width="180" height="44" rx="22" fill="#E2725B" />
      <text x="360" y="308" font-family="sans-serif" font-size="15" font-weight="bold" fill="#FFFFFF">Eiskarte entdecken</text>
    `,
  },
  {
    name: "autotransport-alex.webp",
    title: "Autotransport Alex",
    subtitle: "Zuverlässiger Fahrzeugtransport NRW &amp; Europa",
    badge: "Live-Projekt · Logistik",
    accent: "#FF6B35",
    bg: "#0F172A",
    headerBg: "#1E293B",
    url: "autotransport-alex.de",
    elements: `
      <rect x="60" y="140" width="480" height="240" rx="16" fill="#1E293B" />
      <rect x="100" y="180" width="160" height="120" rx="12" fill="#334155" />
      <path d="M120 250 L180 200 L240 250 Z" fill="#FF6B35" opacity="0.9" />
      <text x="290" y="210" font-family="sans-serif" font-size="26" font-weight="bold" fill="#FFFFFF">Pünktlich &amp; Sicher.</text>
      <text x="290" y="245" font-family="sans-serif" font-size="16" fill="#94A3B8">Geschlossener &amp; offener Fahrzeugtransport</text>
      <rect x="290" y="275" width="200" height="44" rx="22" fill="#FF6B35" />
      <text x="330" y="303" font-family="sans-serif" font-size="15" font-weight="bold" fill="#FFFFFF">Direkt Anfragen</text>
    `,
  },
  {
    name: "buescher-baeckerei.webp",
    title: "Bäckerei Detlev Büscher",
    subtitle: "Traditionelles Handwerk &amp; Frische Backwaren",
    badge: "Konzeptentwurf · Handwerk",
    accent: "#D97706",
    bg: "#FCF9F2",
    headerBg: "#451A03",
    url: "buescher-baeckerrei.vercel.app",
    elements: `
      <rect x="60" y="140" width="480" height="240" rx="16" fill="#FBF3E4" />
      <circle cx="160" cy="240" r="60" fill="#D97706" opacity="0.3" />
      <path d="M120 260 Q160 180 200 260 Z" fill="#B45309" />
      <text x="260" y="210" font-family="sans-serif" font-size="26" font-weight="bold" fill="#451A03">Echtes Bäckerhandwerk.</text>
      <text x="260" y="245" font-family="sans-serif" font-size="16" fill="#78350F">Mit Liebe gebacken seit Generationen</text>
      <rect x="260" y="275" width="190" height="44" rx="22" fill="#D97706" />
      <text x="295" y="303" font-family="sans-serif" font-size="15" font-weight="bold" fill="#FFFFFF">Filialen &amp; Angebote</text>
    `,
  },
  {
    name: "vincent-kaesekuchen.webp",
    title: "Vincent Café &amp; Bäckerei",
    subtitle: "Spezialitäten rund um feinsten Käsekuchen",
    badge: "Konzeptentwurf · Café",
    accent: "#E11D48",
    bg: "#FFF5F7",
    headerBg: "#881337",
    url: "kaesekuchenbaeckerei.vercel.app",
    elements: `
      <rect x="60" y="140" width="480" height="240" rx="16" fill="#FFE4E6" />
      <circle cx="160" cy="240" r="55" fill="#FDA4AF" />
      <circle cx="160" cy="240" r="35" fill="#E11D48" opacity="0.8" />
      <text x="260" y="210" font-family="sans-serif" font-size="26" font-weight="bold" fill="#881337">Himmlischer Genuss.</text>
      <text x="260" y="245" font-family="sans-serif" font-size="16" fill="#9F1239">Über 12 hausgemachte Sorten täglich</text>
      <rect x="260" y="275" width="180" height="44" rx="22" fill="#E11D48" />
      <text x="295" y="303" font-family="sans-serif" font-size="15" font-weight="bold" fill="#FFFFFF">Kuchen bestellen</text>
    `,
  },
];

async function generate() {
  for (const m of mockups) {
    const svg = `
      <svg width="600" height="420" viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg">
        <!-- Window background -->
        <rect width="600" height="420" rx="20" fill="${m.bg}" />
        
        <!-- Browser Bar -->
        <rect width="600" height="48" rx="20" fill="${m.headerBg}" />
        <rect y="28" width="600" height="20" fill="${m.headerBg}" />
        
        <!-- Window controls -->
        <circle cx="28" cy="24" r="6" fill="#FF5F56" />
        <circle cx="48" cy="24" r="6" fill="#FFBD2E" />
        <circle cx="68" cy="24" r="6" fill="#27C93F" />
        
        <!-- URL pill -->
        <rect x="100" y="10" width="400" height="28" rx="14" fill="rgba(255,255,255,0.15)" />
        <text x="300" y="28" font-family="sans-serif" font-size="12" fill="#FFFFFF" text-anchor="middle" opacity="0.9">https://${m.url}</text>
        
        <!-- Top Banner inside website -->
        <rect y="48" width="600" height="60" fill="rgba(0,0,0,0.03)" />
        <text x="60" y="85" font-family="sans-serif" font-size="20" font-weight="bold" fill="${m.headerBg}">${m.title}</text>
        <rect x="420" y="66" width="120" height="26" rx="13" fill="${m.accent}" opacity="0.2" />
        <text x="480" y="83" font-family="sans-serif" font-size="11" font-weight="bold" fill="${m.accent}" text-anchor="middle">${m.badge}</text>
        
        <!-- Mockup elements -->
        ${m.elements}
        
        <!-- Bottom footer bar inside window -->
        <rect y="390" width="600" height="30" fill="rgba(0,0,0,0.05)" />
        <text x="60" y="408" font-family="sans-serif" font-size="10" fill="#888888">${m.subtitle}</text>
      </svg>
    `;

    const outPath = path.join(projectsDir, m.name);
    await sharp(Buffer.from(svg)).webp({ quality: 90 }).toFile(outPath);
    console.log("Generated mockup:", outPath);
  }
}

generate();

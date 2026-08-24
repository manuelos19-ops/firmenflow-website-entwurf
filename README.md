# Firmenflow Website Entwurf

> **„Mehr Lokalpräsenz. Weniger Agenturtheater. Deine Website. Direkt mit Manu.“**

Offizielle Website und digitaler Markenauftritt für **Firmenflow** – Webdesign & Lokalpräsenz aus Wesel und dem Niederrhein.

---

## 🌟 Überblick & Besonderheiten

Die Website wurde bewusst als **interaktives, handwerkliches Magazin-Erlebnis** konzipiert, um sich radikal von austauschbaren KI- und SaaS-Templates abzuheben.

### 🎨 Typografie-Trio (100% lokal selbstgehostet)
Inspiriert von führenden Design-Studios ([Studio Wemento auf Fonts In Use](https://fontsinuse.com/uses/76155/studiowemento-website)):
1. **`Atmosphere Grotesk`** (Display): Kraftvolle, charakterstarke Großbuchstaben für einprägsame Headlines.
2. **`Switzer`** (Sans/Body): Moderner, präziser Neo-Grotesk von Fontshare für Navigation, UI und Lesbarkeit.
3. **`Crimson Text`** (Editorial Serif): Warme, menschliche Kursivschrift für Zitate, Akzente und Sublines.

### ⚡ Interaktives Motion- & Scroll-System
- **Lenis Smooth Scroll:** Nicht-invasives, physikbasiertes Scroll-Momentum für ein seidiges Erlebnis (wie bei Apple).
- **GSAP 3 & ScrollTrigger:** Punktgenaue Choreografie, Text-Reveals, Scroll-Fill Inking und SVG-Pfad-Zeichnung.
- **Custom Cursor:** Minimalistischer Präzisionspunkt mit dynamischem Link- und CTA-Magnetismus (`gsap.quickTo`).
- **Subtiles Film-Grain:** Feine analoge Körnung mittels prozeduralem SVG-Turbulence-Filter (0 KB Asset-Größe).
- **Barrierefreiheit:** 100% konform mit `prefers-reduced-motion` (alle Animationen werden bei Bedarf deaktiviert).
- **SSR-First:** Die Seite bleibt bei deaktiviertem JavaScript zu 100% lesbar und voll funktionsfähig.

---

## 🛠️ Tech-Stack

| Schicht | Technologie | Zweck |
| :--- | :--- | :--- |
| **Framework** | **Next.js 16 (App Router + Turbopack + React 19)** | Maximale Performance, SSR & SSG |
| **Styling** | **Tailwind CSS 4** | Utility-first Designsystem & CSS-Variablen |
| **Smooth Scroll** | **Lenis (`lenis/react`)** | Flüssige Scroll-Physik |
| **Animationen** | **GSAP 3 + `@gsap/react` (`useGSAP`)** | ScrollTrigger, Stagger, QuickTo |
| **UI-Gestures** | **Motion (`motion/react`)** | Reaktive Layout-Transitionen |
| **Icons** | **Lucide React** | Vektor-Icons |
| **Validierung** | **Zod** | Typsichere Schema-Validierung |
| **E-Mail** | **Resend** | Serverless Anfrageübertragung mit Fallback |
| **Deployment** | **Vercel** | Edge-Infrastruktur, weltweites CDN |

---

## 📁 Projektstruktur

```
firmenflow-website/
├── public/
│   ├── brand/               # Marken-Assets (Wordmark, Mark SVG)
│   ├── fonts/               # 100% lokal gehostete WOFF2/OTF Schriften
│   │   ├── atmosphere/      # Atmosphere Grotesk (Bold, Regular)
│   │   ├── switzer/         # Switzer Variable & Statics
│   │   └── crimson/         # Crimson Text (Italic, Regular)
│   └── media/               # Optimierte WebP Fotos & Projekt-Mockups
│       └── projects/        # Echte hochauflösende Website-Screenshots
├── src/
│   ├── app/                 # Next.js App Router (Routen, Layout, SEO)
│   │   ├── api/inquiry/     # API Route Handler für Projektanfragen
│   │   ├── projekte/[slug]/ # SSG Case Studies für Live-Projekte
│   │   ├── globals.css      # Design-Tokens, @font-face, Animationen
│   │   └── layout.tsx       # Root Layout mit ScrollProvider & Cursor
│   ├── components/
│   │   ├── effects/         # CustomCursor, MagneticButton, GrainOverlay
│   │   ├── inquiry/         # 5-stufiges interaktives Anfrageformular
│   │   ├── layout/          # SiteHeader (Floating Navbar), SiteFooter
│   │   ├── sections/        # Hero, Problem, Services, Direct, Pilot, etc.
│   │   └── ui/              # Container, ButtonLink, BrandMark
│   ├── content/             # Strukturierte Text- & Projektdaten
│   ├── features/inquiry/    # Zod-Schema, State Reducer, Rate Limiting
│   └── lib/                 # GSAP Central Config, WhatsApp Helper, Utils
└── next.config.ts           # Security Headers, Image Optimization
```

---

## 🚀 Lokale Entwicklung

### 1. Repository klonen & Abhängigkeiten installieren
```bash
git clone https://github.com/manuelos19-ops/firmenflow-website-entwurf.git
cd firmenflow-website-entwurf
npm install
```

### 2. Umgebungsvariablen anlegen (`.env.local`)
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=491701234567
NEXT_PUBLIC_WHATSAPP_MESSAGE=Hi Manu, ich interessiere mich für eine Website von Firmenflow.
RESEND_API_KEY=re_your_api_key_here
INQUIRY_NOTIFICATION_EMAIL=manu@firmenflow.de
```

### 3. Entwicklungsserver starten
```bash
npm run dev
```
Die Website ist erreichbar unter: **`http://localhost:3000`**

### 4. Produktions-Build testen
```bash
npm run build
npm run start
```

---

## 🔒 Rechtliche & Marken-Vorgaben
- **Sichtbarer Markenname:** Immer **„Manu“**; **„Manuel Landeck“** erscheint ausschließlich in rechtlich vorgeschriebenen Kontexten (Impressum, Datenschutz).
- **Slogan:** *„für deine Lokalpräsenz“*
- **Kernversprechen:** *„Mehr Lokalpräsenz. Weniger Agenturtheater. Deine Website. Direkt mit Manu.“*
- **Fokusregion:** Wesel und der Niederrhein.

---

## 📄 Lizenz
© 2026 Firmenflow – Manuel Landeck. Alle Rechte vorbehalten.

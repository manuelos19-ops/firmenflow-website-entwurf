# Firmenflow Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eine vollständige, persönliche Firmenflow-Website für lokale Unternehmen rund um Wesel bauen – mit Awake-inspirierten Animationen, echten und korrekt gekennzeichneten Projekten, WhatsApp-Einstieg und einer belastbaren interaktiven Projektanfrage.

**Architecture:** Die Website wird als Next.js-App im vorhandenen Repository-Root umgesetzt. Statische Inhalte bleiben in typisierten Content-Dateien, visuelle Server Components werden nur dort um kleine Client-Komponenten ergänzt, wo Navigation, Motion, FAQ oder Formularzustand Interaktivität benötigen. Projektanfragen laufen ohne Datenbank über einen Route Handler, Zod-Validierung, Honeypot, anwendungsseitige Drosselung und Resend; Produktionsschutz wird zusätzlich durch eine Vercel-WAF-Regel abgesichert.

**Tech Stack:** Aktuelles Next.js mit App Router, React, TypeScript strict, Tailwind CSS, Motion for React, Zod, Resend, Lucide React, Vitest und Testing Library, Playwright mit Axe, Lighthouse CI, GitHub und Vercel.

**Spec:** `docs/superpowers/specs/2026-08-23-firmenflow-website-design.md`

**Primary implementation references:** [Next.js App Router and testing](https://nextjs.org/docs/app/guides/testing), [Tailwind CSS with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs), [Motion scroll animations](https://motion.dev/docs/react-scroll-animations), [Resend with Next.js](https://resend.com/docs/send-with-nextjs), [Vercel environments](https://vercel.com/docs/deployments/environments), [Vercel WAF custom rules](https://vercel.com/docs/vercel-firewall/vercel-waf/custom-rules).

## Global Constraints

- Sichtbarer Markenname ist immer „Manu“; „Manuel Landeck“ erscheint nur in rechtlich oder vertraglich erforderlichen Zusammenhängen.
- Slogan exakt: „für deine Lokalpräsenz“.
- Kernversprechen exakt: „Mehr Lokalpräsenz. Weniger Agenturtheater. Deine Website. Direkt mit Manu.“
- Zielregion zum Start: Wesel und Niederrhein; die Architektur darf eine spätere NRW-Ausweitung nicht blockieren.
- Farben exakt: `#FCFAF7`, `#17131A`, `#3B0D4F`, `#FF705D`.
- Schriften: Instrument Sans und Instrument Serif Italic, ohne Laufzeitabruf von Google Fonts.
- Live-Projekte und Konzeptentwürfe müssen visuell und semantisch getrennt bleiben; keine erfundenen Kennzahlen, Stimmen, Rollen oder Erfolge.
- Keine öffentliche Preistabelle im ersten Release.
- Kein Supabase, CMS, Login, Blog, Tracking, Google-Maps-Embed oder WhatsApp-Widget im ersten Release.
- WhatsApp wird nur nach bewusstem Klick extern geöffnet.
- Motion-Tokens: große Reveals 600–850 ms, normale Einblendungen 450–650 ms, Mikrointeraktionen 160–240 ms, `cubic-bezier(0.22, 1, 0.36, 1)`.
- `prefers-reduced-motion` muss Verschiebungen, Laufschriften und Flow-Line-Zeichnung abschalten.
- Inhalte, Navigation und ein einfaches Formular bleiben ohne JavaScript nutzbar.
- Zielwerte unter realistischen Testbedingungen: Lighthouse-Kategorien mindestens 95, LCP < 2,5 s, CLS < 0,1, INP < 200 ms.
- Secrets liegen nur in Bitwarden und Vercel-Umgebungsvariablen; `.env.local` wird nie committed.
- Kein Push, keine Vercel-Verknüpfung und keine Produktionsveröffentlichung ohne Manus ausdrückliche Freigabe am jeweiligen Übergabepunkt.

## Geplante Dateistruktur

```text
.
├─ src/
│  ├─ app/
│  │  ├─ api/inquiry/route.ts
│  │  ├─ anfrage/erhalten/page.tsx
│  │  ├─ datenschutz/page.tsx
│  │  ├─ impressum/page.tsx
│  │  ├─ projekte/[slug]/page.tsx
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  ├─ not-found.tsx
│  │  ├─ opengraph-image.tsx
│  │  ├─ page.tsx
│  │  ├─ robots.ts
│  │  └─ sitemap.ts
│  ├─ components/
│  │  ├─ brand/BrandMark.tsx
│  │  ├─ inquiry/ProjectInquiry.tsx
│  │  ├─ inquiry/InquiryProgress.tsx
│  │  ├─ inquiry/steps/ProjectTypeStep.tsx
│  │  ├─ inquiry/steps/BusinessStep.tsx
│  │  ├─ inquiry/steps/GoalsStep.tsx
│  │  ├─ inquiry/steps/FrameStep.tsx
│  │  ├─ inquiry/steps/ContactStep.tsx
│  │  ├─ layout/SiteHeader.tsx
│  │  ├─ layout/SiteFooter.tsx
│  │  ├─ motion/Reveal.tsx
│  │  ├─ motion/Stagger.tsx
│  │  ├─ motion/Marquee.tsx
│  │  ├─ motion/FlowLine.tsx
│  │  ├─ sections/Hero.tsx
│  │  ├─ sections/ProblemSection.tsx
│  │  ├─ sections/ServiceOverview.tsx
│  │  ├─ sections/DirectWithManu.tsx
│  │  ├─ sections/GoogleBusinessPilot.tsx
│  │  ├─ sections/LiveProjects.tsx
│  │  ├─ sections/ConceptProjects.tsx
│  │  ├─ sections/Process.tsx
│  │  ├─ sections/AboutManu.tsx
│  │  ├─ sections/Faq.tsx
│  │  ├─ sections/ContactChoice.tsx
│  │  ├─ ui/ButtonLink.tsx
│  │  ├─ ui/Container.tsx
│  │  ├─ ui/ProjectCard.tsx
│  │  └─ ui/SectionHeading.tsx
│  ├─ config/site.ts
│  ├─ content/assets.ts
│  ├─ content/legal.ts
│  ├─ content/projects.ts
│  ├─ content/site.ts
│  ├─ features/inquiry/schema.ts
│  ├─ features/inquiry/types.ts
│  ├─ features/inquiry/reducer.ts
│  ├─ features/inquiry/server/email.ts
│  ├─ features/inquiry/server/escape-html.ts
│  ├─ features/inquiry/server/normalize-request.ts
│  ├─ features/inquiry/server/rate-limit.ts
│  ├─ lib/cn.ts
│  ├─ lib/inquiry-response.ts
│  ├─ lib/site-url.ts
│  └─ lib/whatsapp.ts
├─ public/brand/
├─ public/media/
├─ e2e/
├─ scripts/
├─ docs/superpowers/specs/
├─ docs/superpowers/plans/
└─ Projekt- und Testkonfigurationen im Repository-Root
```

---

### Task 1: Next.js-Grundgerüst und Testharness

**Files:**
- Create: `package.json`
- Create: `package-lock.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `next-env.d.ts`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `playwright.config.ts`
- Create: `.env.example`
- Create: `src/config/site.ts`
- Test: `src/config/site.test.ts`

**Interfaces:**
- Produces: `siteIdentity: { brandName: "Firmenflow"; publicName: "Manu"; legalName: "Manuel Landeck"; slogan: "für deine Lokalpräsenz" }`.
- Produces: Standardbefehle `npm run lint`, `npm run typecheck`, `npm test`, `npm run test:e2e`, `npm run build`.
- Consumes: keine Anwendungsdateien; das vorhandene `docs/`-Verzeichnis bleibt unangetastet.

- [ ] **Step 1: Node- und npm-Version protokollieren**

Run:

```powershell
node --version
npm --version
```

Expected: Node `v24.18.0` oder eine mit dem installierten aktuellen Next.js kompatible neuere Version; npm `11.16.0` oder neuer.

- [ ] **Step 2: Paketmanifest und Abhängigkeiten erzeugen**

Run:

```powershell
npm init -y
npm install next@latest react@latest react-dom@latest motion@latest zod@latest resend@latest lucide-react@latest clsx@latest tailwind-merge@latest @fontsource-variable/instrument-sans@latest @fontsource/instrument-serif@latest
npm install -D typescript@latest @types/node@latest @types/react@latest @types/react-dom@latest tailwindcss@latest @tailwindcss/postcss@latest postcss@latest eslint@latest eslint-config-next@latest vitest@latest jsdom@latest @vitejs/plugin-react@latest @testing-library/react@latest @testing-library/jest-dom@latest @testing-library/user-event@latest @playwright/test@latest @axe-core/playwright@latest @lhci/cli@latest sharp@latest satori@latest tsx@latest
npm pkg set private=true --json
npm pkg set scripts.dev="next dev"
npm pkg set scripts.build="next build"
npm pkg set scripts.start="next start"
npm pkg set scripts.lint="eslint ."
npm pkg set scripts.typecheck="tsc --noEmit"
npm pkg set scripts.test="vitest run"
npm pkg set scripts.test:watch="vitest"
npm pkg set scripts.test:e2e="playwright test"
npm pkg set scripts.check="npm run lint && npm run typecheck && npm test && npm run build"
npx playwright install chromium
```

Expected: `package-lock.json` wird erzeugt und hält die konkret installierten Versionen fest.

- [ ] **Step 3: TypeScript-, Next-, PostCSS- und ESLint-Konfiguration anlegen**

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

Create `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  typedRoutes: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
```

Create `postcss.config.mjs`:

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

Create `eslint.config.mjs`:

```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  globalIgnores([".next/**", "coverage/**", "playwright-report/**", "test-results/**"]),
]);
```

- [ ] **Step 4: Vitest und Playwright konfigurieren**

Create `vitest.config.ts`:

```ts
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    coverage: { reporter: ["text", "html"] },
  },
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
});
```

Create `vitest.setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

Create `playwright.config.ts`:

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["iPhone 13"] } },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
  },
});
```

- [ ] **Step 5: Zuerst den Identitätstest schreiben**

Create `src/config/site.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { siteIdentity } from "./site";

describe("siteIdentity", () => {
  it("trennt öffentlichen und rechtlichen Namen", () => {
    expect(siteIdentity.publicName).toBe("Manu");
    expect(siteIdentity.legalName).toBe("Manuel Landeck");
    expect(siteIdentity.slogan).toBe("für deine Lokalpräsenz");
  });
});
```

- [ ] **Step 6: Test ausführen und erwartetes Scheitern prüfen**

Run: `npm test -- src/config/site.test.ts`

Expected: FAIL, weil `src/config/site.ts` noch nicht existiert.

- [ ] **Step 7: Minimale Identitätskonfiguration implementieren**

Create `src/config/site.ts`:

```ts
export const siteIdentity = {
  brandName: "Firmenflow",
  publicName: "Manu",
  legalName: "Manuel Landeck",
  slogan: "für deine Lokalpräsenz",
  region: "Wesel & Niederrhein",
} as const;
```

Create `.env.example`:

```dotenv
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_WHATSAPP_MESSAGE=Hallo Manu, ich möchte über meine Website sprechen.
INQUIRY_TO_EMAIL=
INQUIRY_FROM_EMAIL=
RESEND_API_KEY=
LEGAL_CONTENT_READY=false
```

- [ ] **Step 8: Grundgerüst verifizieren**

Run:

```powershell
npm test -- src/config/site.test.ts
npm run typecheck
npm run lint
```

Expected: alle drei Befehle PASS.

- [ ] **Step 9: Task committen**

```powershell
git add package.json package-lock.json tsconfig.json next-env.d.ts next.config.ts postcss.config.mjs eslint.config.mjs vitest.config.ts vitest.setup.ts playwright.config.ts .env.example src/config
git commit -m "chore: bootstrap Firmenflow Next.js app"
```

---

### Task 2: Echte Marken- und Bildassets vorbereiten

**Files:**
- Create: `scripts/render-brand-assets.tsx`
- Create: `scripts/prepare-images.ts`
- Create: `src/content/assets.ts`
- Create: `public/brand/firmenflow-wordmark.svg`
- Create: `public/brand/firmenflow-mark.svg`
- Create: `public/media/manu-hero.webp`
- Create: `public/media/manu-about.webp`
- Create: `public/media/manu-contact.webp`
- Test: `scripts/assets.test.ts`

**Interfaces:**
- Produces: `brandAssets.wordmark`, `brandAssets.mark`, `portraitAssets.hero`, `portraitAssets.about`, `portraitAssets.contact`.
- Consumes: freigegebene Logo-Richtung 3 aus `.superpowers/brainstorm/1813-1787484831/content/firmenflow-logo-3.png` und die drei Originalfotos aus Manus Download-Ordner.
- Produces: echte SVG- und WebP-Dateien; keine Platzhalter, CSS-Zeichnungen oder erfundenen Stockbilder.

- [ ] **Step 1: Asset-Test vor den Generatoren schreiben**

Create `scripts/assets.test.ts`:

```ts
import { readFile, stat } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("Firmenflow assets", () => {
  it.each([
    "public/brand/firmenflow-wordmark.svg",
    "public/brand/firmenflow-mark.svg",
    "public/media/manu-hero.webp",
    "public/media/manu-about.webp",
    "public/media/manu-contact.webp",
  ])("liefert %s als echte Datei", async (path) => {
    expect((await stat(path)).size).toBeGreaterThan(1_000);
  });

  it("liefert die Wortmarke als Pfad-Vektor statt als verlinktes Rasterbild", async () => {
    const svg = await readFile("public/brand/firmenflow-wordmark.svg", "utf8");
    expect(svg).toContain("<svg");
    expect(svg).toContain("<path");
    expect(svg).not.toContain("<image");
  });
});
```

- [ ] **Step 2: Asset-Test ausführen und erwartetes Scheitern prüfen**

Run: `npm test -- scripts/assets.test.ts`

Expected: FAIL mit nicht gefundenen Dateien.

- [ ] **Step 3: Typografische Wortmarke mit echter Fontdatei und Lucide-Wellenmotiv rendern**

Create `scripts/render-brand-assets.tsx`:

```tsx
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { Waves } from "lucide-react";
import satori from "satori";

const fontPath = fileURLToPath(
  import.meta.resolve("@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff"),
);
const fontData = await readFile(fontPath);

await mkdir("public/brand", { recursive: true });

const fonts = [{ name: "Instrument Serif", data: fontData, weight: 400 as const, style: "italic" as const }];

const wordmark = await satori(
  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", gap: 36, color: "#3B0D4F", background: "transparent" }}>
    <div style={{ display: "flex", fontFamily: "Instrument Serif", fontSize: 164, lineHeight: 1 }}>Firmenflow</div>
    <Waves aria-label="Flow-Linie" width={148} height={148} strokeWidth={1.8} color="#FF705D" />
  </div>,
  { width: 1240, height: 240, fonts },
);

const mark = await satori(
  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#FCFAF7", background: "#3B0D4F", borderRadius: 64, fontFamily: "Instrument Serif", fontSize: 210 }}>ff</div>,
  { width: 320, height: 320, fonts },
);

await writeFile("public/brand/firmenflow-wordmark.svg", wordmark);
await writeFile("public/brand/firmenflow-mark.svg", mark);
```

Die Ausgabe wird visuell gegen `firmenflow-logo-3.png` geprüft. Wenn Satori die Fontdatei unter einem abweichenden Fontsource-Dateinamen installiert, wird der tatsächlich vorhandene `instrument-serif-latin-400-italic.woff`-Pfad verwendet; es wird keine Ersatzschrift akzeptiert.

- [ ] **Step 4: Bildpipeline mit festem Zuschnitt und Metadatenbereinigung implementieren**

Create `scripts/prepare-images.ts`:

```ts
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const required = (name: string) => {
  const value = process.env[name];
  if (!value) throw new Error(`Fehlende Quellbild-Variable: ${name}`);
  return value;
};

const jobs = [
  { source: required("FIRMENFLOW_HERO_SOURCE"), target: "public/media/manu-hero.webp", width: 1400, height: 1700 },
  { source: required("FIRMENFLOW_ABOUT_SOURCE"), target: "public/media/manu-about.webp", width: 1200, height: 1440 },
  { source: required("FIRMENFLOW_CONTACT_SOURCE"), target: "public/media/manu-contact.webp", width: 1200, height: 1440 },
] as const;

await mkdir("public/media", { recursive: true });

for (const job of jobs) {
  await sharp(job.source)
    .rotate()
    .resize(job.width, job.height, { fit: "cover", position: "attention", withoutEnlargement: true })
    .webp({ quality: 84, smartSubsample: true })
    .withMetadata({ orientation: undefined })
    .toFile(job.target);
}
```

- [ ] **Step 5: Generatoren mit den freigegebenen Quellen ausführen**

Run:

```powershell
npx tsx scripts/render-brand-assets.tsx
$env:FIRMENFLOW_HERO_SOURCE='C:\Users\manue\Downloads\Firmenflow website\IMG-20260423-WA0068.jpg'
$env:FIRMENFLOW_ABOUT_SOURCE='C:\Users\manue\Downloads\Firmenflow website\20260118-Manu-21_Haerdle.jpg'
$env:FIRMENFLOW_CONTACT_SOURCE='C:\Users\manue\Downloads\Firmenflow website\20250815-_FWR0143.jpg'
npx tsx scripts/prepare-images.ts
```

Expected: zwei SVGs und drei WebPs werden erzeugt; die Originaldateien bleiben unverändert.

- [ ] **Step 6: Typisiertes Assetmanifest anlegen**

Create `src/content/assets.ts`:

```ts
export const brandAssets = {
  wordmark: "/brand/firmenflow-wordmark.svg",
  mark: "/brand/firmenflow-mark.svg",
} as const;

export const portraitAssets = {
  hero: { src: "/media/manu-hero.webp", alt: "Manu lächelt mit seinem Smartphone in der Hand" },
  about: { src: "/media/manu-about.webp", alt: "Manu im persönlichen Gesprächsporträt" },
  contact: { src: "/media/manu-contact.webp", alt: "Manu in entspannter Haltung im Außenbereich" },
} as const;
```

- [ ] **Step 7: Assets strukturell und visuell prüfen**

Run:

```powershell
npm test -- scripts/assets.test.ts
Get-FileHash public\brand\*.svg,public\media\*.webp -Algorithm SHA256
```

Expected: Tests PASS; anschließend Wortmarke, Favicon und alle drei Bildzuschnitte im Bildbetrachter prüfen. Kein Gesicht darf angeschnitten oder unnatürlich nachgeschärft sein.

- [ ] **Step 8: Task committen**

```powershell
git add scripts public/brand public/media src/content/assets.ts
git commit -m "feat: add Firmenflow brand and portrait assets"
```

---

### Task 3: Inhaltssystem und nachprüfbare Projektdaten

**Files:**
- Create: `src/content/site.ts`
- Create: `src/content/projects.ts`
- Create: `src/content/legal.ts`
- Test: `src/content/content.test.ts`

**Interfaces:**
- Produces: `homeContent`, `faqItems`, `liveProjects`, `conceptProjects`, `legalContent`.
- Produces: `Project` mit `kind: "live" | "concept"` und `factsApproved: boolean`.
- Consumes: `siteIdentity` aus Task 1.

- [ ] **Step 1: Inhaltsregeln als fehlenden Test formulieren**

Create `src/content/content.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { liveProjects, conceptProjects } from "./projects";
import { homeContent } from "./site";

describe("Firmenflow content", () => {
  it("hält Live-Projekte und Entwürfe getrennt", () => {
    expect(liveProjects.every((project) => project.kind === "live")).toBe(true);
    expect(conceptProjects.every((project) => project.kind === "concept")).toBe(true);
    expect(conceptProjects.every((project) => /noch nicht veröffentlicht/i.test(project.badge))).toBe(true);
  });

  it("spricht sichtbar von Manu und zeigt keine Paketpreise", () => {
    const serialized = JSON.stringify(homeContent);
    expect(serialized).toContain("Manu");
    expect(serialized).not.toContain("Manuel Landeck");
    expect(serialized).not.toMatch(/€|\/Monat|Paketpreis/);
  });

  it("enthält keine unbelegten Erfolgszahlen oder Kundenstimmen", () => {
    const serialized = JSON.stringify({ liveProjects, conceptProjects });
    expect(serialized).not.toMatch(/%|Kundenstimme|mehr Anfragen seit|Platz 1/i);
  });
});
```

- [ ] **Step 2: Test ausführen und erwartetes Scheitern prüfen**

Run: `npm test -- src/content/content.test.ts`

Expected: FAIL, weil die Content-Dateien fehlen.

- [ ] **Step 3: Startseiteninhalte vollständig und ohne Agenturfloskeln anlegen**

Create `src/content/site.ts`:

```ts
export const homeContent = {
  hero: {
    eyebrow: "Webdesign & Lokalpräsenz aus Wesel",
    title: ["Mehr Lokalpräsenz.", "Weniger Agenturtheater."],
    accent: "Deine Website. Direkt mit Manu.",
    body: "Ich entwickle Websites für lokale Unternehmen, die gut aussehen, verständlich funktionieren und den direkten Weg zur Anfrage frei machen.",
    primaryCta: "WhatsApp an Manu",
    secondaryCta: "Projekt in 2 Minuten anfragen",
  },
  problem: {
    eyebrow: "Kommt dir bekannt vor?",
    title: "Dein Betrieb läuft. Online merkt man es nur zu wenig.",
    body: "Eine fehlende oder veraltete Website macht einen starken Betrieb kleiner, als er ist. Interessenten suchen weiter, weil Leistungen, Vertrauen oder der nächste Schritt nicht sofort klar werden.",
  },
  services: [
    {
      slug: "neue-website",
      title: "Eine Website, die endlich zu deinem Betrieb passt",
      body: "Für Unternehmen ohne zeitgemäßen Auftritt: individuell gestaltet, mobil stark, regional verständlich und mit einem klaren Weg zur Kontaktaufnahme.",
      points: ["Individuelles Design", "Verständliche Inhalte", "Mobile Umsetzung", "Lokale Grundlagen"],
    },
    {
      slug: "relaunch",
      title: "Relaunch ohne Blindflug",
      body: "Ich prüfe, was bleiben darf, ordne Inhalte neu und führe deinen bestehenden Auftritt kontrolliert in eine moderne Website über.",
      points: ["Bestandsanalyse", "Neue Struktur", "Modernes Design", "Kontrollierter Wechsel"],
    },
  ],
  direct: {
    eyebrow: "Direkt mit Manu",
    title: "Ein Ansprechpartner. Keine stille Post.",
    body: "Du sprichst vom ersten Gedanken bis zur fertigen Website mit mir. Keine wechselnden Zuständigkeiten, keine langen Schleifen und kein Rätselraten darüber, wer gerade Bescheid weiß.",
    points: ["Persönlich erreichbar", "Klare nächste Schritte", "Ehrliche Einschätzung", "Nah an Wesel und dem Niederrhein"],
  },
  pilot: {
    eyebrow: "Google Business 360° – Pilot",
    title: "Nicht nur gefunden werden. Auch richtig wirken.",
    body: "Im Pilotprogramm verbinde ich Profilprüfung, Bewertungsmanagement und echte Kundenstimmen zu einem nachvollziehbaren Gesamtbild – richtlinienkonform und ohne Rankingversprechen.",
    modules: ["Profil- und Reputations-Audit", "Wettbewerbsvergleich", "Persönliches Antwortmanagement", "Echte Bewertungswege mit QR-Code", "Monatliche Customer-Voice-Auswertung"],
    cta: "Pilotplatz anfragen",
  },
  process: [
    { number: "01", title: "Kennenlernen", body: "Wir klären, was dein Betrieb anbietet, wen du erreichen willst und wo die heutige Website bremst." },
    { number: "02", title: "Richtung", body: "Du bekommst eine klare Struktur, eine visuelle Richtung und verständliche Inhalte statt eines überraschenden Endergebnisses." },
    { number: "03", title: "Umsetzung", body: "Ich baue, teste und zeige dir nachvollziehbare Zwischenstände. Rückfragen landen direkt bei mir." },
    { number: "04", title: "Sauber online", body: "Nach deiner Freigabe geht die Website kontrolliert live. Danach prüfen wir gemeinsam den echten Auftritt." },
  ],
  about: {
    eyebrow: "Hi, ich bin Manu",
    title: "Websites mit persönlicher Verantwortung.",
    body: "Ich mag klare Gespräche, gute Gestaltung und Lösungen, die im Alltag funktionieren. Firmenflow ist bewusst persönlich aufgebaut: Du weißt, wer deine Website entwickelt, wen du erreichst und wer sich darum kümmert, dass aus Ideen ein stimmiger Auftritt wird.",
  },
  contact: {
    eyebrow: "Lass uns deinen nächsten Schritt klären",
    title: "Kurz schreiben oder direkt das Projekt einordnen.",
    body: "Du entscheidest, was besser passt: eine schnelle WhatsApp an mich oder die geführte Projektanfrage in ungefähr zwei Minuten.",
  },
} as const;

export const faqItems = [
  { question: "Arbeitest du nur rund um Wesel?", answer: "Mein aktueller Schwerpunkt liegt auf Wesel und dem Niederrhein. Projekte aus dem restlichen NRW sind ebenfalls möglich, wenn die Zusammenarbeit fachlich und menschlich passt." },
  { question: "Was kostet eine Website?", answer: "Das hängt von Ausgangslage, Umfang und Zielen ab. Statt künstlicher Paketpreise bekommst du nach unserem ersten Austausch ein individuelles, nachvollziehbares Angebot." },
  { question: "Kannst du auch eine vorhandene Website überarbeiten?", answer: "Ja. Bei einem Relaunch prüfe ich zuerst, welche Inhalte, Technik und Sichtbarkeit bereits vorhanden sind. Danach planen wir den Wechsel so, dass nichts Wichtiges versehentlich verloren geht." },
  { question: "Muss ich alle Texte und Bilder fertig haben?", answer: "Nein. Wir sortieren gemeinsam, was vorhanden ist und was noch fehlt. Ich unterstütze bei Struktur und Texten; bei Bildern klären wir früh, welche Motive wirklich gebraucht werden." },
  { question: "Was ist Google Business 360°?", answer: "Ein limitiertes Pilotangebot für lokale Unternehmen: Profilprüfung, richtlinienkonformes Bewertungsmanagement und eine regelmäßige Auswertung echter Kundenstimmen. Es gibt keine gekauften Bewertungen und keine Rankinggarantie." },
  { question: "Mit wem spreche ich während des Projekts?", answer: "Direkt mit Manu – vom ersten Gespräch bis zur Veröffentlichung und bei vereinbarten Folgeschritten auch danach." },
] as const;
```

- [ ] **Step 4: Projektdaten mit belastbarer Statuslogik implementieren**

Create `src/content/projects.ts`:

```ts
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
  },
  {
    slug: "vincent-kaesekuchenbaeckerei",
    name: "Vincent – Café & Käsekuchenbäckerei",
    sector: "Café & Bäckerei",
    region: "Nordrhein-Westfalen",
    url: "https://kaesekuchenbaeckerei.vercel.app/",
    kind: "concept",
    badge: "Konzeptentwurf – noch nicht veröffentlicht",
    summary: "Ein unveröffentlichter Websiteentwurf. Die Darstellung wird klar von echten Kundenprojekten getrennt.",
    factsApproved: true,
  },
] as const;

export const getLiveProject = (slug: string) => liveProjects.find((project) => project.slug === slug);
```

- [ ] **Step 5: Rechtliche Entwurfslogik ohne erfundene Pflichtangaben anlegen**

Create `src/content/legal.ts`:

```ts
import { siteIdentity } from "@/config/site";

export const legalContent = {
  ready: process.env.LEGAL_CONTENT_READY === "true",
  legalName: siteIdentity.legalName,
  imprintNotice: "Diese Vorschau ist noch nicht zur Veröffentlichung freigegeben. Vollständige Pflichtangaben werden vor dem Livegang aus bestätigten Unternehmensdaten eingesetzt.",
  privacyNotice: "Diese Vorschau verwendet keine Analyse- oder Marketingtracker. Die endgültige Datenschutzerklärung wird anhand der tatsächlich aktivierten Hosting-, Kontakt- und E-Mail-Dienste geprüft.",
} as const;
```

- [ ] **Step 6: Inhaltstests ausführen**

Run: `npm test -- src/content/content.test.ts`

Expected: PASS; insbesondere keine Vermischung der Projektarten und keine erfundenen Zahlen.

- [ ] **Step 7: Task committen**

```powershell
git add src/content
git commit -m "feat: add verified Firmenflow content model"
```

---

### Task 4: Design-Tokens, App-Shell und Navigation

**Files:**
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/lib/cn.ts`
- Create: `src/components/brand/BrandMark.tsx`
- Create: `src/components/ui/Container.tsx`
- Create: `src/components/ui/ButtonLink.tsx`
- Create: `src/components/ui/SectionHeading.tsx`
- Create: `src/components/layout/SiteHeader.tsx`
- Create: `src/components/layout/SiteFooter.tsx`
- Test: `src/components/layout/SiteHeader.test.tsx`

**Interfaces:**
- Produces: `Container`, `ButtonLink`, `SectionHeading`, `BrandMark`, `SiteHeader`, `SiteFooter`.
- Consumes: `siteIdentity`, `homeContent`, `brandAssets`.
- Produces: die globalen CSS-Variablen `--color-paper`, `--color-ink`, `--color-plum`, `--color-coral` und die Motion-Dauern.

- [ ] **Step 1: Zuerst einen zugänglichen Navigationstest schreiben**

Create `src/components/layout/SiteHeader.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "./SiteHeader";

describe("SiteHeader", () => {
  it("zeigt Marke und alle primären Sprungziele", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: /Firmenflow – für deine Lokalpräsenz/i })).toHaveAttribute("href", "/");
    for (const name of ["Leistungen", "Projekte", "Über Manu", "Ablauf", "Kontakt"]) {
      expect(screen.getByRole("link", { name })).toBeInTheDocument();
    }
  });

  it("öffnet und schließt das mobile Menü per Tastatur", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);
    const trigger = screen.getByRole("button", { name: /menü öffnen/i });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{Escape}");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });
});
```

- [ ] **Step 2: Test ausführen und erwartetes Scheitern prüfen**

Run: `npm test -- src/components/layout/SiteHeader.test.tsx`

Expected: FAIL, weil `SiteHeader` fehlt.

- [ ] **Step 3: Design-Tokens und globale Grundregeln implementieren**

Create `src/app/globals.css`:

```css
@import "tailwindcss";
@import "@fontsource-variable/instrument-sans";
@import "@fontsource/instrument-serif/400-italic.css";

:root {
  --color-paper: #fcfaf7;
  --color-ink: #17131a;
  --color-plum: #3b0d4f;
  --color-coral: #ff705d;
  --color-muted: #746d76;
  --color-line: color-mix(in srgb, var(--color-plum) 16%, transparent);
  --font-sans: "Instrument Sans Variable", system-ui, sans-serif;
  --font-serif: "Instrument Serif", Georgia, serif;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --motion-lg: 760ms;
  --motion-md: 560ms;
  --motion-sm: 200ms;
  --radius-card: 1.75rem;
  --shadow-card: 0 1.5rem 4rem rgb(59 13 79 / 0.1);
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; background: var(--color-paper); }
body { margin: 0; overflow-x: clip; background: var(--color-paper); color: var(--color-ink); font-family: var(--font-sans); }
a { color: inherit; text-decoration: none; }
button, input, select, textarea { font: inherit; }
img { max-width: 100%; height: auto; }
::selection { background: var(--color-coral); color: var(--color-ink); }
:focus-visible { outline: 3px solid var(--color-coral); outline-offset: 4px; }
.font-editorial { font-family: var(--font-serif); font-style: italic; }
.text-balance { text-wrap: balance; }
.skip-link { position: fixed; left: 1rem; top: 1rem; z-index: 100; transform: translateY(-160%); background: var(--color-ink); color: white; padding: .75rem 1rem; border-radius: 999px; }
.skip-link:focus { transform: translateY(0); }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; scroll-behavior: auto !important; }
}
```

- [ ] **Step 4: Gemeinsame UI-Bausteine implementieren**

Create `src/lib/cn.ts`:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...values: ClassValue[]) => twMerge(clsx(values));
```

Create `src/components/ui/Container.tsx`:

```tsx
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export function Container({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-12", className)} {...props} />;
}
```

Create `src/components/ui/ButtonLink.tsx` with variants `primary`, `secondary`, `dark` and a `data-arrow` span. External links receive `target="_blank" rel="noreferrer"`; interne Sprungziele nicht.

Create `src/components/ui/SectionHeading.tsx` with props:

```ts
type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  accent?: string;
  body?: string;
  align?: "left" | "center";
};
```

- [ ] **Step 5: Wortmarke sowie Desktop- und Mobilnavigation implementieren**

Create `src/components/brand/BrandMark.tsx`:

```tsx
import Image from "next/image";
import Link from "next/link";
import { brandAssets } from "@/content/assets";

export function BrandMark() {
  return (
    <Link href="/" aria-label="Firmenflow – für deine Lokalpräsenz" className="inline-flex items-center">
      <Image src={brandAssets.wordmark} width={310} height={60} alt="Firmenflow – für deine Lokalpräsenz" priority />
    </Link>
  );
}
```

Create `src/components/layout/SiteHeader.tsx` as a Client Component. It uses this exact navigation:

```ts
const navigation = [
  { label: "Leistungen", href: "/#leistungen" },
  { label: "Projekte", href: "/#projekte" },
  { label: "Über Manu", href: "/#manu" },
  { label: "Ablauf", href: "/#ablauf" },
  { label: "Kontakt", href: "/#kontakt" },
] as const;
```

Requirements: sticky bei `top: 0`, transparenter Start, ab 24 Pixel Scroll eine warmweiße Fläche mit feiner Linie; Mobilmenü mit `aria-expanded`, Escape-Schließen, Rückgabe des Fokus an den Menüknopf und Body-Scroll-Lock nur solange geöffnet.

- [ ] **Step 6: Layout, Footer und vorläufig vollständige Basisseite anlegen**

Create `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export const metadata: Metadata = {
  title: { default: "Firmenflow – Webdesign direkt mit Manu", template: "%s | Firmenflow" },
  description: "Persönliches Webdesign und Lokalpräsenz für Unternehmen rund um Wesel und den Niederrhein.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>
        <a className="skip-link" href="#main">Zum Inhalt springen</a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <noscript><style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style></noscript>
      </body>
    </html>
  );
}
```

Create `src/app/page.tsx` zunächst als semantisch echte Seite mit `main#main`, dem Hero-Text aus `homeContent.hero` und den Abschnittsankern. Task 6 und 7 ersetzen diese Basisausgabe durch die finalen Sektionen, ohne Text zu ändern.

Create `SiteFooter` with Firma/Slogan, Sprunglinks, Kontaktanker, Links zu `/impressum` und `/datenschutz`, sowie dynamischem aktuellen Jahr. Keine Social-Links ohne bestätigte Profile.

- [ ] **Step 7: Navigation und Grundlayout prüfen**

Run:

```powershell
npm test -- src/components/layout/SiteHeader.test.tsx
npm run typecheck
npm run lint
npm run build
```

Expected: PASS; Build erzeugt `/` ohne fehlende Route.

- [ ] **Step 8: Task committen**

```powershell
git add src/app src/components/brand src/components/layout src/components/ui src/lib
git commit -m "feat: add Firmenflow design system and app shell"
```

---

### Task 5: Awake-inspiriertes Motion-System mit Sicherheitsnetz

**Files:**
- Create: `src/components/motion/motion-tokens.ts`
- Create: `src/components/motion/Reveal.tsx`
- Create: `src/components/motion/Stagger.tsx`
- Create: `src/components/motion/Marquee.tsx`
- Create: `src/components/motion/FlowLine.tsx`
- Test: `src/components/motion/motion-tokens.test.ts`
- Test: `src/components/motion/Reveal.test.tsx`

**Interfaces:**
- Produces: `Reveal({ direction, delay, children })`, `Stagger({ children })`, `Marquee({ children })`, `FlowLine()`.
- Consumes: Motion for React und die CSS-Tokens aus Task 4.
- Garantie: Inhalte werden spätestens nach 1.400 ms zwangsweise sichtbar, falls eine Reveal-Animation nicht abschließt.

- [ ] **Step 1: Motion-Grenzen als Test schreiben**

Create `src/components/motion/motion-tokens.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { motionTokens, revealVariants } from "./motion-tokens";

describe("Firmenflow motion tokens", () => {
  it("bleibt innerhalb der freigegebenen Dauer- und Weggrenzen", () => {
    expect(motionTokens.duration.large).toBeGreaterThanOrEqual(0.6);
    expect(motionTokens.duration.large).toBeLessThanOrEqual(0.85);
    expect(motionTokens.distance.project).toBeLessThanOrEqual(48);
    expect(revealVariants.up.hidden.opacity).toBe(0);
    expect(revealVariants.up.visible.y).toBe(0);
  });
});
```

- [ ] **Step 2: Motion-Tokens minimal implementieren**

Create `src/components/motion/motion-tokens.ts`:

```ts
export const motionTokens = {
  ease: [0.22, 1, 0.36, 1] as const,
  duration: { large: 0.76, normal: 0.56, micro: 0.2 },
  distance: { heading: 64, item: 28, project: 48 },
  viewport: { once: true, amount: 0.18 } as const,
} as const;

const visible = { opacity: 1, x: 0, y: 0, scale: 1 };

export const revealVariants = {
  up: { hidden: { opacity: 0, y: 64 }, visible },
  left: { hidden: { opacity: 0, x: -48, y: 32 }, visible },
  right: { hidden: { opacity: 0, x: 48, y: 32 }, visible },
  image: { hidden: { opacity: 0, scale: 1.035 }, visible },
} as const;
```

- [ ] **Step 3: Reveal-Komponententest zuerst schreiben**

Create `src/components/motion/Reveal.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Reveal } from "./Reveal";

vi.mock("motion/react", () => ({
  motion: { div: ({ children, ...props }: React.ComponentProps<"div">) => <div {...props}>{children}</div> },
  useReducedMotion: () => true,
}));

describe("Reveal", () => {
  it("lässt den Inhalt bei reduzierter Bewegung sofort zugänglich", () => {
    render(<Reveal><p>Direkt mit Manu</p></Reveal>);
    expect(screen.getByText("Direkt mit Manu")).toBeVisible();
  });
});
```

- [ ] **Step 4: Progressive Reveal-Komponente implementieren**

Create `src/components/motion/Reveal.tsx`:

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { motionTokens, revealVariants } from "./motion-tokens";

type RevealProps = {
  children: ReactNode;
  direction?: keyof typeof revealVariants;
  delay?: number;
  className?: string;
};

export function Reveal({ children, direction = "up", delay = 0, className }: RevealProps) {
  const reduced = useReducedMotion();
  const [forceVisible, setForceVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setForceVisible(true), 1_400);
    return () => window.clearTimeout(timer);
  }, []);

  if (reduced || forceVisible) return <div className={className}>{children}</div>;

  return (
    <motion.div
      data-reveal
      className={className}
      variants={revealVariants[direction]}
      initial="hidden"
      whileInView="visible"
      viewport={motionTokens.viewport}
      transition={{ duration: motionTokens.duration.large, ease: motionTokens.ease, delay }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 5: Stagger, Laufschrift und Flow-Linie implementieren**

`Stagger` verwendet `motion.div` mit `staggerChildren: 0.08` und `delayChildren: 0.04`. Die Kindkomponente `StaggerItem` nutzt 28 Pixel vertikalen Weg und `motionTokens.duration.normal`.

`Marquee` dupliziert exakt seine übergebenen Inhalte für eine lückenlose CSS-Laufschrift, setzt das zweite Set auf `aria-hidden="true"`, pausiert bei `:hover` und `:focus-within` und rendert bei reduzierter Bewegung nur das erste statische Set.

`FlowLine` ist ein dekorativer, mit `aria-hidden="true"` markierter vertikaler Layoutstrich. Motion skaliert ausschließlich `scaleY` von 0 auf 1; bei reduzierter Bewegung ist die Linie sofort vollständig sichtbar. Es wird kein handgezeichnetes Ersatzlogo oder SVG-Motiv erzeugt.

- [ ] **Step 6: Motion-Tests und Typecheck ausführen**

Run:

```powershell
npm test -- src/components/motion
npm run typecheck
npm run lint
```

Expected: PASS; keine Testwarnung wegen ungültiger DOM-Attribute.

- [ ] **Step 7: Task committen**

```powershell
git add src/components/motion
git commit -m "feat: add accessible Firmenflow motion system"
```

---

### Task 6: Startseite – Hero, Problem, Leistungen, Manu und Pilot

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Create: `src/components/sections/ProblemSection.tsx`
- Create: `src/components/sections/ServiceOverview.tsx`
- Create: `src/components/sections/DirectWithManu.tsx`
- Create: `src/components/sections/GoogleBusinessPilot.tsx`
- Create: `src/lib/whatsapp.ts`
- Modify: `src/app/page.tsx`
- Test: `src/lib/whatsapp.test.ts`
- Test: `src/components/sections/Hero.test.tsx`

**Interfaces:**
- Produces: `buildWhatsAppUrl(number, message): string | null`.
- Produces: fünf semantische Homepage-Sektionen mit den IDs `home`, `problem`, `leistungen`, `direkt`, `google-business`.
- Consumes: `homeContent`, `portraitAssets.hero`, `Reveal`, `Stagger`, `ButtonLink`.

- [ ] **Step 1: WhatsApp-Linkverhalten zuerst testen**

Create `src/lib/whatsapp.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl } from "./whatsapp";

describe("buildWhatsAppUrl", () => {
  it("entfernt Nichtziffern und codiert die Nachricht", () => {
    expect(buildWhatsAppUrl("+49 171 234 5678", "Hallo Manu & Firmenflow"))
      .toBe("https://wa.me/491712345678?text=Hallo%20Manu%20%26%20Firmenflow");
  });

  it("liefert ohne bestätigte Nummer keinen externen Link", () => {
    expect(buildWhatsAppUrl("", "Hallo Manu")).toBeNull();
  });
});
```

- [ ] **Step 2: WhatsApp-Builder implementieren**

Create `src/lib/whatsapp.ts`:

```ts
export function buildWhatsAppUrl(number: string | undefined, message: string | undefined) {
  const digits = number?.replace(/\D/g, "") ?? "";
  if (!digits) return null;
  const text = encodeURIComponent(message?.trim() || "Hallo Manu, ich möchte über meine Website sprechen.");
  return `https://wa.me/${digits}?text=${text}`;
}
```

- [ ] **Step 3: Hero-Test vor der visuellen Umsetzung schreiben**

Create `src/components/sections/Hero.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("zeigt Kernversprechen, Region und beide Kontaktwege", () => {
    render(<Hero whatsappUrl={null} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Mehr Lokalpräsenz");
    expect(screen.getByText(/Wesel/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Projekt in 2 Minuten anfragen/i })).toHaveAttribute("href", "#projektanfrage");
    expect(screen.queryByRole("link", { name: /WhatsApp an Manu/i })).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 4: Hero als gestaffelte, persönliche Bühne bauen**

Implement `Hero` als zweispaltiges Desktop-Layout und einspaltiges Mobil-Layout:

- links Eyebrow, H1 mit zwei maskierten Zeilen und Serif-Akzent, Fließtext, CTAs und die sachliche Zeile „Persönlich · Erreichbar · Rund um Wesel“;
- rechts `manu-hero.webp` in einem violetten, weich gerundeten Bildrahmen mit Korallakzent;
- H1, Text, CTAs und Foto erhalten eigene Reveal-Delays zwischen 0 und 0,32 Sekunden;
- direkt unter dem Hero läuft `Marquee` langsam mit den echten Begriffen „Websites · Relaunch · Google Business 360° · Wesel · Niederrhein · Direkter Draht“; bei Fokus, Hover und reduzierter Bewegung steht die Zeile still;
- wenn `whatsappUrl === null`, wird kein kaputter WhatsApp-Link gezeigt; der Projektanfrage-CTA bleibt sichtbar;
- `priority` nur für das Hero-Bild; alle Maße über `sizes` definieren.

- [ ] **Step 5: Problem- und Leistungssektionen implementieren**

`ProblemSection` erhält viel warmweißen Raum, eine übergroße, maximal dreizeilige Überschrift und drei echte Problemkarten: „Nicht auffindbar“, „Nicht mehr zeitgemäß“, „Kein klarer nächster Schritt“. Die Karten formulieren keine erfundenen Statistiken.

`ServiceOverview` rendert exakt die zwei Einträge aus `homeContent.services` in asymmetrischen Karten. Die Website-Karte nutzt Pflaume, der Relaunch eine helle Fläche; beide haben semantische Listen und keine Preiszeile.

- [ ] **Step 6: Persönlichkeits- und Pilotsektionen implementieren**

`DirectWithManu` zeigt vier Vorteile und eine direkt formulierte Zwischenüberschrift „Du erklärst dein Geschäft einmal. Mir.“. Kein Teamraster und keine Agenturzahl.

`GoogleBusinessPilot` nutzt eine dunkle Fläche mit Korallakzent, die fünf bestätigten Pilotmodule und zwei klare Grenzen: „Keine gekauften Bewertungen“ und „Keine Rankinggarantie“. CTA-Ziel ist `#projektanfrage` mit vorgewählter Projektart `google-business` über `?type=google-business#projektanfrage`.

- [ ] **Step 7: Obere Homepage in `page.tsx` zusammensetzen**

```tsx
const whatsappUrl = buildWhatsAppUrl(
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE,
);

export default function HomePage() {
  return (
    <main id="main">
      <Hero whatsappUrl={whatsappUrl} />
      <ProblemSection />
      <ServiceOverview />
      <DirectWithManu />
      <GoogleBusinessPilot />
    </main>
  );
}
```

Task 7 ergänzt die restlichen Sektionen innerhalb desselben `main`.

- [ ] **Step 8: Tests und responsiven Build ausführen**

Run:

```powershell
npm test -- src/lib/whatsapp.test.ts src/components/sections/Hero.test.tsx
npm run typecheck
npm run build
```

Expected: PASS; ohne WhatsApp-Nummer kein toter externer Link.

- [ ] **Step 9: Task committen**

```powershell
git add src/app/page.tsx src/components/sections src/lib/whatsapp*
git commit -m "feat: build Firmenflow homepage story"
```

---

### Task 7: Startseite – Projekte, Ablauf, Über Manu und FAQ

**Files:**
- Create: `src/components/sections/LiveProjects.tsx`
- Create: `src/components/sections/ConceptProjects.tsx`
- Create: `src/components/sections/Process.tsx`
- Create: `src/components/sections/AboutManu.tsx`
- Create: `src/components/sections/Faq.tsx`
- Create: `src/components/ui/ProjectCard.tsx`
- Modify: `src/app/page.tsx`
- Test: `src/components/sections/Projects.test.tsx`
- Test: `src/components/sections/Faq.test.tsx`

**Interfaces:**
- Produces: Homepage-IDs `projekte`, `konzepte`, `ablauf`, `manu`, `faq`.
- Consumes: `liveProjects`, `conceptProjects`, `homeContent.process`, `homeContent.about`, `faqItems`, `portraitAssets.about`, `portraitAssets.contact`.
- Produces: `ProjectCard({ project, direction })` mit strikt unterschiedlicher Ausgabe für Live und Konzept.

- [ ] **Step 1: Trennung der Projektarten als Komponententest schreiben**

Create `src/components/sections/Projects.test.tsx`:

```tsx
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LiveProjects } from "./LiveProjects";
import { ConceptProjects } from "./ConceptProjects";

describe("Projektbereiche", () => {
  it("stellt Entwürfe nicht als Kundenreferenzen dar", () => {
    render(<><LiveProjects /><ConceptProjects /></>);
    const live = screen.getByRole("region", { name: /Live-Projekte/i });
    const concepts = screen.getByRole("region", { name: /Konzeptentwürfe/i });
    expect(within(live).getAllByText("Live-Website")).toHaveLength(2);
    expect(within(concepts).getAllByText(/noch nicht veröffentlicht/i)).toHaveLength(2);
    expect(within(concepts).queryByText(/Kundenstimme|Ergebnis/i)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Projektkarten und Awake-artigen Rasteraufbau implementieren**

`ProjectCard` zeigt Badge, Name, Branche, Region, Zusammenfassung und Link. Live-Projekte erhalten zusätzlich einen internen Link zur Detailroute; Konzeptkarten ausschließlich den externen Vorschau-Link. Jede externe URL hat einen zugänglichen Hinweis „öffnet in neuem Tab“.

`LiveProjects` nutzt ein zweispaltiges Raster. Die linke Karte startet mit `Reveal direction="left"`, die rechte mit `direction="right"`.

`ConceptProjects` steht in einem klar abgesetzten Bereich mit der Einleitung: „Diese Ideen wurden als Entwürfe gezeigt. Sie sind nicht veröffentlicht und werden hier nicht als Kundenprojekte ausgegeben.“

- [ ] **Step 3: Ablauf und Über-Manu-Sektion implementieren**

`Process` rendert die vier Schritte entlang der animierten `FlowLine`. Die Schritte bleiben ohne Linie vollständig verständlich.

`AboutManu` kombiniert `manu-about.webp`, die freigegebene Copy und eine kleine Liste: „Direkter Draht“, „Verständliche Entscheidungen“, „Verantwortung aus einer Hand“. Keine Lebenslaufdetails werden erfunden.

- [ ] **Step 4: FAQ zuerst als native, robuste Interaktion testen**

Create `src/components/sections/Faq.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Faq } from "./Faq";

describe("Faq", () => {
  it("liefert jede Frage als nativ bedienbares Detail", () => {
    render(<Faq />);
    expect(screen.getAllByRole("group")).toHaveLength(6);
    expect(screen.getByText(/Direkt mit Manu/)).toBeInTheDocument();
  });
});
```

Implement `Faq` mit nativen `<details>`/`<summary>`-Elementen. CSS animiert nur Pfeil und Inhaltshülle; ohne JavaScript bleiben alle Fragen bedienbar. Bei reduzierter Bewegung gibt es keine Höhenanimation.

- [ ] **Step 5: Untere Homepage bis zum FAQ zusammensetzen**

Nach `GoogleBusinessPilot` in `src/app/page.tsx` ergänzen:

```tsx
<LiveProjects />
<ConceptProjects />
<Process />
<AboutManu />
<Faq />
```

Der vollständige Kontaktabschluss wird in Task 11 gemeinsam mit dem bereits getesteten Anfrageformular integriert, damit kein Zwischenzustand mit angekündigter, aber fehlender Funktion entsteht.

- [ ] **Step 6: Tests, Semantik und Build prüfen**

Run:

```powershell
npm test -- src/components/sections
npm run typecheck
npm run lint
npm run build
```

Expected: PASS; jede Abschnitts-ID kommt exakt einmal vor.

- [ ] **Step 7: Task committen**

```powershell
git add src/app/page.tsx src/components/sections src/components/ui/ProjectCard.tsx
git commit -m "feat: complete Firmenflow homepage sections"
```

---

### Task 8: Projektseiten, Rechtstexte im Entwurfsmodus und 404

**Files:**
- Create: `src/app/projekte/[slug]/page.tsx`
- Create: `src/app/impressum/page.tsx`
- Create: `src/app/datenschutz/page.tsx`
- Create: `src/app/not-found.tsx`
- Create: `src/components/legal/LegalDraftNotice.tsx`
- Modify: `src/content/legal.ts`
- Modify: `.env.example`
- Test: `src/app/projekte/project-page.test.tsx`
- Test: `src/app/legal-pages.test.tsx`

**Interfaces:**
- Produces: `generateStaticParams()` für exakt `eiscafe-orrico` und `autotransport-alex`.
- Consumes: `getLiveProject(slug)`; unbekannte Slugs rufen `notFound()` auf.
- Produces: rechtliche Vorschauseiten, die keine Vollständigkeit behaupten; der Produktions-Gate in Task 13 verhindert einen Livegang ohne bestätigte Angaben.

- [ ] **Step 1: Projektrouten-Test schreiben**

Create `src/app/projekte/project-page.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { generateStaticParams } from "./[slug]/page";

describe("project routes", () => {
  it("erzeugt ausschließlich die zwei echten Live-Projektrouten", () => {
    expect(generateStaticParams()).toEqual([
      { slug: "eiscafe-orrico" },
      { slug: "autotransport-alex" },
    ]);
  });
});
```

- [ ] **Step 2: Statische Projektseite implementieren**

Create `src/app/projekte/[slug]/page.tsx` with:

```tsx
export function generateStaticParams() {
  return liveProjects.map(({ slug }) => ({ slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getLiveProject(slug);
  if (!project) notFound();

  return (
    <main id="main">
      <Container className="py-28 sm:py-36">
        <p>{project.badge}</p>
        <h1>{project.name}</h1>
        <p>{project.sector} · {project.region}</p>
        <p>{project.summary}</p>
        {!project.factsApproved && (
          <p>Ich ergänze Ausgangslage, Rolle und Ergebnisse erst, sobald alle Aussagen gemeinsam freigegeben sind.</p>
        )}
        <ButtonLink href={project.url} external>Live-Website ansehen</ButtonLink>
      </Container>
    </main>
  );
}
```

Zusätzlich `generateMetadata` mit Projektname und sachlicher Beschreibung implementieren. Es werden keine Screenshots der Kundenseiten als eigene Assets gespeichert, solange Nutzungsrechte dafür nicht bestätigt sind.

- [ ] **Step 3: Rechtliche Vorschau-Konfiguration erweitern**

Add to `.env.example`:

```dotenv
LEGAL_STREET=
LEGAL_POSTAL_CODE=
LEGAL_CITY=
LEGAL_EMAIL=
LEGAL_PHONE=
LEGAL_VAT_ID=
LEGAL_PRIVACY_REVIEW_DATE=
```

Modify `src/content/legal.ts` so `ready` only becomes true when `LEGAL_CONTENT_READY === "true"` and all mandatory fields except `LEGAL_VAT_ID` are present. Export `missingLegalFields: string[]` for the release gate.

- [ ] **Step 4: Rechtliche Seiten zuerst auf Ehrlichkeit testen**

Create `src/app/legal-pages.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("legal preview pages", () => {
  it("behauptet ohne bestätigte Daten kein vollständiges Impressum", async () => {
    vi.stubEnv("LEGAL_CONTENT_READY", "false");
    vi.resetModules();
    const { default: ImpressumPage } = await import("./impressum/page");
    render(<ImpressumPage />);
    expect(screen.getByText(/noch nicht zur Veröffentlichung freigegeben/i)).toBeInTheDocument();
    expect(screen.getByText("Manuel Landeck")).toBeInTheDocument();
  });
});
```

- [ ] **Step 5: Impressum und Datenschutz im sicheren Vorschau-/Freigabemodus bauen**

`LegalDraftNotice` rendert die bestätigte Person „Manuel Landeck“, den klaren Vorschauhinweis und keine leeren Feldbezeichnungen.

Wenn `legalContent.ready` true ist, rendert `/impressum` die bestätigten Felder. `/datenschutz` rendert erst nach `LEGAL_PRIVACY_REVIEW_DATE` eine veröffentlichungsfähige Fassung; bis dahin bleibt der sachliche Vorschauhinweis sichtbar. Die finale Textprüfung erfolgt in Task 13 gegen tatsächlich aktivierte Dienste und aktuelle Primärquellen.

- [ ] **Step 6: Markengerechte 404-Seite bauen**

Create `src/app/not-found.tsx` with H1 „Hier ist der Flow kurz abgebogen.“, Erklärung ohne Schuldzuweisung und Links „Zur Startseite“ sowie „Projekt anfragen“.

- [ ] **Step 7: Routen und Build prüfen**

Run:

```powershell
npm test -- src/app/projekte/project-page.test.tsx src/app/legal-pages.test.tsx
npm run typecheck
npm run build
```

Expected: PASS; Build listet beide Projektseiten, Impressum, Datenschutz und die Not-Found-Ausgabe.

- [ ] **Step 8: Task committen**

```powershell
git add .env.example src/app/projekte src/app/impressum src/app/datenschutz src/app/not-found.tsx src/components/legal src/content/legal.ts
git commit -m "feat: add project and legal preview routes"
```

---

### Task 9: Typisierte Mehrschritt-Projektanfrage

**Files:**
- Create: `src/features/inquiry/schema.ts`
- Create: `src/features/inquiry/types.ts`
- Create: `src/features/inquiry/reducer.ts`
- Create: `src/components/inquiry/ProjectInquiry.tsx`
- Create: `src/components/inquiry/InquiryProgress.tsx`
- Create: `src/components/inquiry/steps/ProjectTypeStep.tsx`
- Create: `src/components/inquiry/steps/BusinessStep.tsx`
- Create: `src/components/inquiry/steps/GoalsStep.tsx`
- Create: `src/components/inquiry/steps/FrameStep.tsx`
- Create: `src/components/inquiry/steps/ContactStep.tsx`
- Test: `src/features/inquiry/schema.test.ts`
- Test: `src/features/inquiry/reducer.test.ts`
- Test: `src/components/inquiry/ProjectInquiry.test.tsx`

**Interfaces:**
- Produces: `InquiryPayload`, `inquirySchema`, `inquiryReducer`, `initialInquiryState`.
- Produces: fünf sichtbare Schritte, wobei ohne JavaScript alle fünf Feldgruppen als normales Formular erscheinen.
- Consumes: Queryparameter `type=google-business`, `type=relaunch` oder `type=new-site` als erlaubte Vorwahl.

- [ ] **Step 1: Payload-Schema als failing test definieren**

Create `src/features/inquiry/schema.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { inquirySchema } from "./schema";

const valid = {
  submissionId: "0e6f6f14-f4d8-4f1d-9616-27e363fa8a54",
  projectType: "new-site",
  businessName: "Beispielbetrieb",
  industry: "Handwerk",
  place: "Wesel",
  currentWebsite: "",
  goals: ["more-inquiries"],
  goalDetails: "",
  timeframe: "three-months",
  budget: "not-sure",
  name: "Anna Beispiel",
  email: "anna@example.de",
  phone: "",
  preferredContact: "email",
  privacyAccepted: true,
  company: "",
};

describe("inquirySchema", () => {
  it("akzeptiert eine vollständige, datensparsame Anfrage", () => {
    expect(inquirySchema.safeParse(valid).success).toBe(true);
  });

  it("verlangt mindestens E-Mail oder Telefon", () => {
    expect(inquirySchema.safeParse({ ...valid, email: "", phone: "" }).success).toBe(false);
  });

  it("lehnt nicht erlaubte Projektarten und zu lange Freitexte ab", () => {
    expect(inquirySchema.safeParse({ ...valid, projectType: "ranking-garantie" }).success).toBe(false);
    expect(inquirySchema.safeParse({ ...valid, goalDetails: "x".repeat(1_001) }).success).toBe(false);
  });
});
```

- [ ] **Step 2: Zod-Schema und Typen implementieren**

Create `src/features/inquiry/schema.ts`:

```ts
import { z } from "zod";

const optionalUrl = z.union([z.literal(""), z.string().url("Bitte gib eine vollständige URL ein.")]);
const optionalEmail = z.union([z.literal(""), z.string().email("Bitte prüfe deine E-Mail-Adresse.")]);
const optionalPhone = z.union([z.literal(""), z.string().regex(/^[+0-9()\s/-]{6,40}$/, "Bitte prüfe deine Telefonnummer.")]);

export const inquirySchema = z.object({
  submissionId: z.string().uuid(),
  projectType: z.enum(["new-site", "relaunch", "google-business"]),
  businessName: z.string().trim().min(2).max(120),
  industry: z.string().trim().min(2).max(80),
  place: z.string().trim().min(2).max(100),
  currentWebsite: optionalUrl,
  goals: z.array(z.enum(["more-inquiries", "better-local-presence", "modern-look", "clear-offer", "better-reviews"])).min(1).max(5),
  goalDetails: z.string().trim().max(1_000),
  timeframe: z.enum(["soon", "three-months", "six-months", "flexible"]),
  budget: z.enum(["under-2000", "2000-4000", "4000-plus", "not-sure"]),
  name: z.string().trim().min(2).max(120),
  email: optionalEmail,
  phone: optionalPhone,
  preferredContact: z.enum(["email", "phone", "whatsapp"]),
  privacyAccepted: z.literal(true, { error: "Bitte bestätige den Datenschutzhinweis." }),
  company: z.string().max(0),
}).superRefine((value, context) => {
  if (!value.email && !value.phone) {
    context.addIssue({ code: "custom", path: ["email"], message: "Bitte gib eine E-Mail-Adresse oder Telefonnummer an." });
  }
  if (value.preferredContact === "email" && !value.email) {
    context.addIssue({ code: "custom", path: ["preferredContact"], message: "Für Rückmeldung per E-Mail fehlt deine E-Mail-Adresse." });
  }
  if (["phone", "whatsapp"].includes(value.preferredContact) && !value.phone) {
    context.addIssue({ code: "custom", path: ["preferredContact"], message: "Für diesen Rückweg fehlt deine Telefonnummer." });
  }
});

export type InquiryPayload = z.infer<typeof inquirySchema>;
```

- [ ] **Step 3: Getrennten Entwurfszustand für noch unvollständige Eingaben definieren**

Create `src/features/inquiry/types.ts`:

```ts
import type { InquiryPayload } from "./schema";

export type InquiryDraft = Omit<InquiryPayload, "projectType" | "privacyAccepted"> & {
  projectType: InquiryPayload["projectType"] | "";
  privacyAccepted: boolean;
};
```

Damit kann der Browser vor der Auswahl bewusst leere Werte halten, während nur `InquiryPayload` an den Server gesendet wird.

- [ ] **Step 4: Reducer-Zustände zuerst testen**

Create `src/features/inquiry/reducer.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { inquiryReducer, initialInquiryState } from "./reducer";

describe("inquiryReducer", () => {
  it("behält Eingaben beim Vor- und Zurückgehen", () => {
    const edited = inquiryReducer(initialInquiryState(), { type: "patch", value: { place: "Wesel" } });
    const forward = inquiryReducer(edited, { type: "next" });
    const back = inquiryReducer(forward, { type: "back" });
    expect(back.data.place).toBe("Wesel");
    expect(back.step).toBe(0);
  });

  it("begrenzt den Fortschritt auf fünf Schritte", () => {
    let state = initialInquiryState();
    for (let index = 0; index < 10; index += 1) state = inquiryReducer(state, { type: "next" });
    expect(state.step).toBe(4);
  });
});
```

- [ ] **Step 5: Reducer mit stabiler Datenform implementieren**

Create `src/features/inquiry/reducer.ts` exporting:

```ts
import type { InquiryDraft } from "./types";

export type InquiryState = {
  step: 0 | 1 | 2 | 3 | 4;
  status: "idle" | "submitting" | "success" | "error";
  data: InquiryDraft;
  fieldErrors: Record<string, string>;
};

export type InquiryAction =
  | { type: "patch"; value: Partial<InquiryDraft> }
  | { type: "next" }
  | { type: "back" }
  | { type: "errors"; value: Record<string, string> }
  | { type: "submitting" }
  | { type: "success" }
  | { type: "error" };
```

`initialInquiryState(projectType?)` setzt `submissionId` und `projectType` ohne erlaubte Vorwahl auf `""`, alle übrigen Textfelder auf `""`, `goals` auf `[]`, `timeframe` auf `"flexible"`, `budget` auf `"not-sure"`, `preferredContact` auf `"email"` und `privacyAccepted` auf `false`.

- [ ] **Step 6: Fünf echte Feldgruppen bauen**

Die Schrittkomponenten besitzen keine eigene Businesslogik; sie erhalten `data`, `errors` und `onPatch`.

- Schritt 1: drei große Radiokarten „Neue Website“, „Website-Relaunch“, „Google Business 360° – Pilot“.
- Schritt 2: Betrieb, Branche, Ort, optionale aktuelle Website.
- Schritt 3: mindestens ein Ziel als Checkbox; optionaler Freitext bis 1.000 Zeichen.
- Schritt 4: Zeitraum und optionaler Budgetrahmen, wobei die Option „Noch unsicher“ vorausgewählt bleibt.
- Schritt 5: Name, E-Mail, Telefon, Rückweg, Datenschutzbestätigung und verstecktes Honeypot-Feld `company`.

Alle Inputs haben echte `<label>`-Beziehungen, `aria-describedby` für Fehler und einen `name`, der dem Zod-Feld entspricht. Die Datenschutzbestätigung verlinkt sichtbar auf `/datenschutz` und öffnet keinen eingebetteten Drittanbieterinhalt.

- [ ] **Step 7: ProjectInquiry als progressive Mehrschrittansicht implementieren**

`ProjectInquiry` akzeptiert `whatsappUrl: string | null` und rendert immer ein echtes `<form action="/api/inquiry" method="post">`. Vor der Hydrierung sind alle fünf `<fieldset>` sichtbar. Nach `useEffect(() => setEnhanced(true), [])` erzeugt die Client-Ansicht einmalig `crypto.randomUUID()` für eine noch leere `submissionId`, zeigt nur das aktive Feldset, eine Fortschrittsanzeige „Schritt X von 5“ und Vor-/Zurück-Schaltflächen. Der Submit-Button heißt „Anfrage an Manu senden“.

Clientseitige Schrittvalidierung verwendet aus `inquirySchema` abgeleitete Teilprüfungen. Vor dem Versand wird `inquirySchema.safeParse(state.data)` ausgeführt; nur dessen erfolgreiche `InquiryPayload` wird übertragen. Beim Zurückgehen werden keine Daten gelöscht. `sessionStorage` speichert nur bis zum Tab-Schließen und erst nach Hydrierung; nach Erfolg wird es geleert.

- [ ] **Step 8: Formularinteraktion testen**

Create `src/components/inquiry/ProjectInquiry.test.tsx` with tests that:

1. Schritt 1 mit drei Radiokarten zeigt;
2. ohne Projektart nicht fortschreitet;
3. Auswahl und Ort nach Vor/Zurück erhält;
4. bei `?type=google-business` die Pilotoption vorwählt;
5. Fehler mit dem betroffenen Feld verknüpft.

Run:

```powershell
npm test -- src/features/inquiry src/components/inquiry
npm run typecheck
```

Expected: PASS.

- [ ] **Step 9: Task committen**

```powershell
git add src/features/inquiry src/components/inquiry
git commit -m "feat: add interactive Firmenflow inquiry flow"
```

---

### Task 10: Anfrage-API, Spam-Schutz und E-Mail-Versand

**Files:**
- Create: `src/features/inquiry/server/normalize-request.ts`
- Create: `src/features/inquiry/server/rate-limit.ts`
- Create: `src/features/inquiry/server/email.ts`
- Create: `src/features/inquiry/server/escape-html.ts`
- Create: `src/app/api/inquiry/route.ts`
- Test: `src/features/inquiry/server/rate-limit.test.ts`
- Test: `src/app/api/inquiry/route.test.ts`

**Interfaces:**
- Consumes: JSON und `application/x-www-form-urlencoded` mit derselben `InquiryPayload`-Form.
- Produces: JSON `{ ok: true }` oder `{ ok: false, code, fieldErrors? }`; native Formposts werden bei Erfolg mit HTTP 303 zu `/anfrage/erhalten` weitergeleitet.
- Produces: best-effort In-Process-Limit von 5 Anfragen je 10 Minuten und zusätzlich einen Vercel-WAF-Produktionsschritt in Task 13.
- Consumes: `RESEND_API_KEY`, `INQUIRY_TO_EMAIL`, `INQUIRY_FROM_EMAIL` ausschließlich serverseitig.

- [ ] **Step 1: Rate-Limiter als failing test definieren**

Create `src/features/inquiry/server/rate-limit.test.ts`:

```ts
import { beforeEach, describe, expect, it } from "vitest";
import { checkRateLimit, resetRateLimitsForTests } from "./rate-limit";

describe("inquiry rate limit", () => {
  beforeEach(resetRateLimitsForTests);

  it("blockiert die sechste Anfrage im gleichen Zeitfenster", () => {
    for (let index = 0; index < 5; index += 1) expect(checkRateLimit("client-a", 1_000).allowed).toBe(true);
    expect(checkRateLimit("client-a", 1_001)).toEqual(expect.objectContaining({ allowed: false }));
  });

  it("isoliert verschiedene Clients", () => {
    for (let index = 0; index < 5; index += 1) checkRateLimit("client-a", 1_000);
    expect(checkRateLimit("client-b", 1_001).allowed).toBe(true);
  });
});
```

- [ ] **Step 2: Begrenzten In-Memory-Limiter implementieren**

Create `src/features/inquiry/server/rate-limit.ts`:

```ts
const WINDOW_MS = 10 * 60 * 1_000;
const LIMIT = 5;
const buckets = new Map<string, number[]>();

export function checkRateLimit(key: string, now = Date.now()) {
  const recent = (buckets.get(key) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);
  if (recent.length >= LIMIT) return { allowed: false, retryAfterSeconds: Math.ceil((WINDOW_MS - (now - recent[0])) / 1_000) };
  recent.push(now);
  buckets.set(key, recent);
  return { allowed: true, retryAfterSeconds: 0 };
}

export function resetRateLimitsForTests() {
  buckets.clear();
}
```

Dokumentierte Grenze: Diese Sperre schützt einzelne warme Function-Instanzen, ersetzt aber keinen globalen Serverless-Limiter. Deshalb ist die WAF-Regel vor Produktion verpflichtend.

- [ ] **Step 3: Request-Normalisierung und HTML-Escaping implementieren**

`normalize-request.ts` erkennt den Content-Type. Bei JSON nutzt es `request.json()`. Bei Formdaten wandelt es Mehrfachwerte von `goals` in ein Array und `privacyAccepted` in boolean um. Fehlt bei einem nativen No-JavaScript-Post die `submissionId`, erzeugt ausschließlich der Server mit `crypto.randomUUID()` eine neue; ein ungültiger nichtleerer Wert wird weiterhin abgelehnt.

`escape-html.ts` ersetzt mindestens `&`, `<`, `>`, `"` und `'`. Kein Feld wird unescaped in HTML-E-Mails eingesetzt.

- [ ] **Step 4: E-Mail-Adapter mit idempotentem Leadversand implementieren**

Create `src/features/inquiry/server/email.ts` exporting:

```ts
export type MailResult = { id: string };
export type InquiryMailer = { send(payload: InquiryPayload): Promise<MailResult> };
export const resendInquiryMailer: InquiryMailer;
```

`resendInquiryMailer` erzeugt den Resend-Client erst innerhalb von `send`, prüft die drei Servervariablen und sendet an `INQUIRY_TO_EMAIL` mit Betreff `Neue Firmenflow-Anfrage: ${businessName}`. Reply-to wird nur bei vorhandener, validierter E-Mail gesetzt. Der Idempotency-Key lautet `firmenflow-inquiry/${submissionId}`. Die Mail enthält alle Antworten als escaped HTML und Plaintext, aber weder IP-Adresse noch Rate-Limit-Key. Eine optionale Eingangsbestätigung wird nur bei vorhandener E-Mail versendet; ihr Fehler ändert einen bereits erfolgreichen Leadversand nicht in einen Fehlstatus.

- [ ] **Step 5: Route-Handler zuerst mit injizierbarem Mailer testen**

Create `src/app/api/inquiry/route.test.ts` covering:

```ts
it("returns 422 with field errors for invalid input")
it("silently accepts the filled honeypot without sending mail")
it("returns 429 after the configured request limit")
it("sends one lead email for a valid JSON payload")
it("redirects a valid native form post with status 303")
it("returns 502 without exposing provider details when mail delivery fails")
```

Der Test injiziert einen `InquiryMailer` über die exportierte Factory `createInquiryHandler({ mailer, identifyClient })` und prüft, dass keine personenbezogenen Daten in `console.error` geschrieben werden.

- [ ] **Step 6: Route-Handler implementieren**

Create `src/app/api/inquiry/route.ts` with these exact branches:

1. Payload normalisieren;
2. Honeypot gefüllt → `204 No Content`, kein Versand;
3. Zod ungültig → `422` plus flache Feldfehler;
4. Clientkennung aus gehashtem Forwarded-IP-Signal ableiten; Roh-IP nie speichern oder loggen;
5. Limit überschritten → `429` plus `Retry-After`;
6. Mailversand erfolgreich → JSON `200` oder Form-Redirect `303`;
7. Mailversand fehlgeschlagen → neutrale Antwort `502` mit Code `delivery_failed`.

Set `export const runtime = "nodejs";` und `export const dynamic = "force-dynamic";`.

- [ ] **Step 7: Serverpfad vollständig testen**

Run:

```powershell
npm test -- src/features/inquiry/server src/app/api/inquiry/route.test.ts
npm run typecheck
npm run lint
```

Expected: PASS; kein Test benötigt einen echten Resend-Schlüssel.

- [ ] **Step 8: Task committen**

```powershell
git add src/features/inquiry/server src/app/api/inquiry
git commit -m "feat: add secure Firmenflow inquiry delivery"
```

---

### Task 11: Anfrage integrieren, Fehlerzustände und No-JavaScript-Fallback

**Files:**
- Modify: `src/components/inquiry/ProjectInquiry.tsx`
- Create: `src/components/sections/ContactChoice.tsx`
- Modify: `src/app/page.tsx`
- Create: `src/app/anfrage/erhalten/page.tsx`
- Create: `src/lib/inquiry-response.ts`
- Test: `src/lib/inquiry-response.test.ts`
- Test: `e2e/inquiry.spec.ts`

**Interfaces:**
- Consumes: `POST /api/inquiry` aus Task 10.
- Produces: Clientzustände `idle`, `submitting`, `success`, `error` und wiederholbaren Versand mit derselben `submissionId`.
- Produces: No-JavaScript-Post → `303 /anfrage/erhalten`.
- Produces: Fehlerausgabe mit „Erneut versuchen“ und, sofern konfiguriert, „Stattdessen WhatsApp an Manu“.

- [ ] **Step 1: Antwortparser als failing test schreiben**

Create `src/lib/inquiry-response.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { parseInquiryResponse } from "./inquiry-response";

describe("parseInquiryResponse", () => {
  it("normalisiert Feldfehler", () => {
    expect(parseInquiryResponse({ ok: false, code: "invalid", fieldErrors: { email: ["Bitte prüfen"] } }))
      .toEqual({ ok: false, code: "invalid", fieldErrors: { email: "Bitte prüfen" } });
  });

  it("verwirft unbekannte Serverformen als neutralen Fehler", () => {
    expect(parseInquiryResponse({ detail: "provider stack trace" })).toEqual({ ok: false, code: "unknown", fieldErrors: {} });
  });
});
```

- [ ] **Step 2: Sicheren Antwortparser implementieren**

`parseInquiryResponse(value: unknown)` akzeptiert nur `ok`, erlaubte Codes und stringbasierte Feldfehler. Unbekannte Providertexte werden nicht an die Oberfläche weitergereicht.

- [ ] **Step 3: Clientversand in `ProjectInquiry` integrieren**

Beim Submit im Enhanced-Modus:

```ts
const response = await fetch("/api/inquiry", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(state.data),
});
const result = parseInquiryResponse(await response.json().catch(() => null));
```

- `submitting`: Button deaktiviert und Text „Wird an Manu gesendet …“;
- `success`: Formular wird durch „Danke – deine Anfrage ist bei Manu angekommen.“ und die in der Content-Freigabe bestätigte Antwortzeit ersetzt;
- `invalid`: erster fehlerhafter Schritt wird geöffnet und der Fokus auf die Fehlerzusammenfassung gesetzt;
- `delivery_failed`, `429` oder Netzwerkfehler: Eingaben bleiben erhalten, Button „Erneut versuchen“, plus WhatsApp-Fallback falls URL vorhanden;
- doppelter Klick wird verhindert; dieselbe `submissionId` bleibt für Retry erhalten.

- [ ] **Step 4: Kontaktabschluss vollständig und ohne Zwischenhinweis integrieren**

`ContactChoice` kombiniert `manu-contact.webp`, den WhatsApp-CTA nur bei bestätigter Nummer, den sekundären Sprung zum Formular und `<ProjectInquiry whatsappUrl={whatsappUrl} />`. Der äußere Bereich hat `id="kontakt"`, die Formhülle `id="projektanfrage"`. `src/app/page.tsx` endet mit diesem vollständigen Kontaktbereich; es wird kein unfunktionaler Zwischenzustand erzeugt.

- [ ] **Step 5: Native Erfolgsseite implementieren**

Create `/anfrage/erhalten` with `noindex` metadata, H1 „Danke – deine Anfrage ist angekommen.“ und Link zur Startseite. Wenn `NEXT_PUBLIC_RESPONSE_TIME` gesetzt ist, lautet die zweite Zeile `Manu meldet sich ${process.env.NEXT_PUBLIC_RESPONSE_TIME}.`; andernfalls erscheint in der Preview der ehrliche Hinweis, dass die konkrete Antwortzeit vor Livegang bestätigt wird. Der Release-Gate prüft das Feld.

Add to `.env.example`:

```dotenv
NEXT_PUBLIC_RESPONSE_TIME=
```

- [ ] **Step 6: E2E-Tests für Erfolg, Fehler und Datenerhalt schreiben**

Create `e2e/inquiry.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

test("sendet die fünfstufige Anfrage und zeigt Erfolg", async ({ page }) => {
  await page.route("**/api/inquiry", (route) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) }));
  await page.goto("/#projektanfrage");
  await page.getByLabel("Neue Website").check();
  await page.getByRole("button", { name: "Weiter" }).click();
  await page.getByLabel("Betrieb").fill("Musterbetrieb");
  await page.getByLabel("Branche").fill("Handwerk");
  await page.getByLabel("Ort").fill("Wesel");
  await page.getByRole("button", { name: "Weiter" }).click();
  await page.getByLabel("Mehr Anfragen").check();
  await page.getByRole("button", { name: "Weiter" }).click();
  await page.getByRole("button", { name: "Weiter" }).click();
  await page.getByLabel("Name").fill("Anna Beispiel");
  await page.getByLabel("E-Mail").fill("anna@example.de");
  await page.getByLabel(/Datenschutzhinweis/).check();
  await page.getByRole("button", { name: "Anfrage an Manu senden" }).click();
  await expect(page.getByRole("heading", { name: /Anfrage ist bei Manu angekommen/i })).toBeVisible();
});
```

Weitere Tests mocken `502` und Netzwerkabbruch, gehen zurück und vor und prüfen, dass `Ort: Wesel` erhalten bleibt.

- [ ] **Step 7: No-JavaScript-Fallback testen**

Im selben Testfile einen Browserkontext mit `{ javaScriptEnabled: false }` erzeugen. Prüfen:

- alle fünf Feldgruppen sind gleichzeitig sichtbar;
- Navigation und Projektlinks funktionieren;
- der Formpost wird mit einem gemockten Erfolgs-Endpoint auf `/anfrage/erhalten` weitergeleitet;
- WhatsApp ist als normaler externer Link verfügbar, sofern die Testumgebung eine Nummer setzt.

- [ ] **Step 8: Gesamten Anfrageweg prüfen**

Run:

```powershell
npm test -- src/lib/inquiry-response.test.ts src/components/inquiry src/features/inquiry
npx playwright test e2e/inquiry.spec.ts
npm run build
```

Expected: PASS auf Desktop und Mobile; kein Datenverlust bei Fehlerversand.

- [ ] **Step 9: Task committen**

```powershell
git add .env.example src/app src/components/inquiry src/components/sections/ContactChoice.tsx src/lib/inquiry-response* e2e/inquiry.spec.ts
git commit -m "feat: integrate resilient Firmenflow inquiry flow"
```

---

### Task 12: SEO, Social Preview, Sicherheitsheader und Performance-Budgets

**Files:**
- Create: `src/lib/site-url.ts`
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Create: `src/app/opengraph-image.tsx`
- Create: `lighthouserc.cjs`
- Modify: `src/app/layout.tsx`
- Modify: `next.config.ts`
- Test: `src/lib/site-url.test.ts`
- Test: `src/app/metadata.test.ts`

**Interfaces:**
- Produces: `getSiteUrl(): URL` aus `NEXT_PUBLIC_SITE_URL`, `VERCEL_PROJECT_PRODUCTION_URL` oder lokalem sicheren Fallback.
- Produces: `robots` mit `noindex, nofollow`, solange `SITE_READY !== "true"`.
- Produces: Sitemap nur mit Startseite, zwei echten Projektseiten und Rechtsseiten.
- Consumes: keine Analyse-, Karten- oder Social-Skripte.

- [ ] **Step 1: URL-Auflösung zuerst testen**

Create `src/lib/site-url.test.ts`:

```ts
import { afterEach, describe, expect, it, vi } from "vitest";
import { getSiteUrl } from "./site-url";

describe("getSiteUrl", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("bevorzugt die bestätigte öffentliche URL", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://firmenflow.de");
    expect(getSiteUrl().href).toBe("https://firmenflow.de/");
  });

  it("verwendet eine Vercel-URL mit https", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "firmenflow.vercel.app");
    expect(getSiteUrl().href).toBe("https://firmenflow.vercel.app/");
  });
});
```

- [ ] **Step 2: URL-Helfer und vollständige Metadata API implementieren**

`src/app/layout.tsx` erhält:

- `metadataBase: getSiteUrl()`;
- Titeltemplate, freigegebene Description, Canonical `/`;
- Open Graph mit deutscher Locale, `siteName: "Firmenflow"` und `/opengraph-image`;
- Twitter Card `summary_large_image` ohne erfundenen Account;
- Icons aus `firmenflow-mark.svg`.

- [ ] **Step 3: Sitemap und vorsichtige Robots-Regel implementieren**

Add to `.env.example`:

```dotenv
SITE_READY=false
```

`robots.ts`:

```ts
export default function robots(): MetadataRoute.Robots {
  const ready = process.env.SITE_READY === "true";
  return {
    rules: ready ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: ready ? new URL("/sitemap.xml", getSiteUrl()).href : undefined,
  };
}
```

`sitemap.ts` erzeugt Einträge für `/`, `/projekte/eiscafe-orrico`, `/projekte/autotransport-alex`, `/impressum`, `/datenschutz`. Konzeptentwürfe haben keine eigene Route.

- [ ] **Step 4: Echtes OG-Bild aus Markenassets erzeugen**

`opengraph-image.tsx` verwendet `ImageResponse`, die Firmenflow-Farben, Wortmarke, Slogan und die Herozeile. Keine erfundene Auszeichnung oder Kundenanzahl. Größe `1200 × 630`, Alttext „Firmenflow – für deine Lokalpräsenz. Direkt mit Manu.“.

- [ ] **Step 5: Sitemap- und Robots-Verhalten testen**

Create `src/app/metadata.test.ts`:

```ts
import { afterEach, describe, expect, it, vi } from "vitest";
import robots from "./robots";
import sitemap from "./sitemap";

describe("crawl metadata", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("sperrt Crawling im Vorschauzustand", () => {
    vi.stubEnv("SITE_READY", "false");
    expect(robots().rules).toEqual({ userAgent: "*", disallow: "/" });
  });

  it("führt nur veröffentlichbare Seiten in der Sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls.some((url) => url.includes("eiscafe-orrico"))).toBe(true);
    expect(urls.some((url) => url.includes("autotransport-alex"))).toBe(true);
    expect(urls.some((url) => url.includes("baeckerei-buescher"))).toBe(false);
  });
});
```

- [ ] **Step 6: Sicherheitsheader ergänzen**

Modify `next.config.ts` with `async headers()` for all routes:

```ts
[
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
]
```

Eine Content-Security-Policy wird erst nach Analyse des finalen Next.js-Builds gesetzt; keine ungetestete CSP darf Hydration, Fonts oder Motion blockieren.

- [ ] **Step 7: Lighthouse-Budgets konfigurieren**

Create `lighthouserc.cjs`:

```js
module.exports = {
  ci: {
    collect: { startServerCommand: "npm run start", startServerReadyPattern: "Ready", url: ["http://127.0.0.1:3000/"] },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.95 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 0.95 }],
        "largest-contentful-paint": ["error", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
      },
    },
    upload: { target: "temporary-public-storage" },
  },
};
```

Add script: `npm pkg set scripts.lighthouse="lhci autorun"`.

- [ ] **Step 8: Metadaten, Header und Produktionsbuild prüfen**

Run:

```powershell
npm test -- src/lib/site-url.test.ts src/app/metadata.test.ts
npm run build
npm run start
```

In einem zweiten Terminal: `npm run lighthouse`.

Expected: alle Kategorien ≥ 0,95; LCP ≤ 2.500 ms; CLS ≤ 0,1. Falls der lokale Rechner ein Ergebnis knapp verfehlt, den konkreten Engpass beheben und den Lauf wiederholen; Schwellen nicht absenken.

- [ ] **Step 9: Task committen**

```powershell
git add .env.example src/app src/lib/site-url* next.config.ts lighthouserc.cjs package.json package-lock.json
git commit -m "feat: add Firmenflow SEO and performance safeguards"
```

---

### Task 13: End-to-End-QA, Release-Gate, GitHub und Vercel-Vorschau

**Files:**
- Create: `e2e/homepage.spec.ts`
- Create: `e2e/accessibility.spec.ts`
- Create: `scripts/check-release-readiness.ts`
- Create: `docs/release-checklist.md`
- Modify: `package.json`

**Interfaces:**
- Produces: `npm run check:release`, das bei unbestätigten Rechts-, Kontakt-, Bild- oder Projektangaben fehlschlägt.
- Consumes: sämtliche Seiten, API- und Motion-Funktionen aus Task 1–12.
- Produces: eine verifizierte Vercel-Preview; Produktion bleibt bis zur gesonderten Freigabe unangetastet.

- [ ] **Step 1: Homepage- und Linkfluss als E2E-Test schreiben**

Create `e2e/homepage.spec.ts` covering:

```ts
test("zeigt das persönliche Firmenflow-Versprechen und navigiert durch die Startseite")
test("trennt zwei Live-Projekte von zwei Konzeptentwürfen")
test("öffnet externe Projektlinks in einem neuen Tab")
test("öffnet und schließt die mobile Navigation")
test("liefert alle internen Routen und die markengerechte 404")
test("zeigt bei fehlender WhatsApp-Nummer keinen kaputten WhatsApp-Link")
test("reduziert Animationen bei prefers-reduced-motion")
```

Der Reduced-Motion-Test setzt `page.emulateMedia({ reducedMotion: "reduce" })` und prüft, dass Marquee und Flow-Linie keine laufende CSS-Animation haben.

- [ ] **Step 2: Axe-Prüfung für jede Kernroute schreiben**

Create `e2e/accessibility.spec.ts`:

```ts
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const route of ["/", "/projekte/eiscafe-orrico", "/projekte/autotransport-alex", "/impressum", "/datenschutz"]) {
  test(`hat keine bestätigten Axe-Verstöße auf ${route}`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}
```

- [ ] **Step 3: Release-Gate mit allen bestätigungspflichtigen Feldern implementieren**

Create `scripts/check-release-readiness.ts` that exits non-zero unless all conditions are true:

```ts
const required = [
  "NEXT_PUBLIC_SITE_URL",
  "NEXT_PUBLIC_WHATSAPP_NUMBER",
  "NEXT_PUBLIC_RESPONSE_TIME",
  "INQUIRY_TO_EMAIL",
  "INQUIRY_FROM_EMAIL",
  "RESEND_API_KEY",
  "LEGAL_STREET",
  "LEGAL_POSTAL_CODE",
  "LEGAL_CITY",
  "LEGAL_EMAIL",
  "LEGAL_PHONE",
  "LEGAL_PRIVACY_REVIEW_DATE",
] as const;
```

Additional required booleans: `LEGAL_CONTENT_READY=true`, `SITE_READY=true`, `PHOTO_RIGHTS_CONFIRMED=true`, `PROJECT_FACTS_CONFIRMED=true`. Das Script importiert `liveProjects` und schlägt zusätzlich fehl, solange ein Eintrag `factsApproved: false` enthält. Es gibt nur Variablennamen und Projektslugs aus, niemals Werte oder personenbezogene Inhalte.

Add to `.env.example`:

```dotenv
PHOTO_RIGHTS_CONFIRMED=false
PROJECT_FACTS_CONFIRMED=false
```

Add script: `npm pkg set scripts.check:release="tsx scripts/check-release-readiness.ts"`.

- [ ] **Step 4: Vollständige lokale Qualitätsprüfung ausführen**

Run:

```powershell
npm run lint
npm run typecheck
npm test
npm run build
npx playwright test
npm run lighthouse
git diff --check
```

Expected: alle Befehle PASS. `npm run check:release` darf im Vorschauzustand gezielt FAIL melden, solange echte Stammdaten/Freigaben fehlen; das ist kein Softwarefehler, sondern die Produktionssperre.

- [ ] **Step 5: Visuelle QA gegen die freigegebenen Referenzen durchführen**

Im vom Nutzer gewählten Browser bei identischem Viewport vergleichen:

1. Firmenflow-Preview gegen `.superpowers/brainstorm/1813-1787484831/content/firmenflow-option-3.png` für Palette, Typohierarchie, Fotowirkung und Kartenradien;
2. Firmenflow-Motion gegen `https://awakeagency.webflow.io/` für Hero-Reveal, vertikale Überschriften-Reveals, Laufschrift und diagonalen Projektaufbau;
3. Viewports 1440 × 900, 768 × 1024 und 390 × 844;
4. normale Bewegung und `prefers-reduced-motion`;
5. Zustände: Hero, Projektbereich, geöffnetes FAQ, jeder Formularschritt, Validierungsfehler, Versandfehler und Erfolg.

Referenz und Preview-Screenshot werden jeweils gemeinsam betrachtet. Sichtbare Abweichungen bei Crop, Abständen, Typogewicht, Fokus, Border-Radius oder Animation werden behoben und erneut verglichen.

- [ ] **Step 6: Produktionsreife fachlich auditieren**

Invoke the `web-production-audit` skill. Verify dependency audit, secret scan, security headers, external links, image dimensions, dead code, build output, API failure handling, robots state, legal preview state and Vercel compatibility. Keine automatische Bereinigung, kein Push und kein Deploy innerhalb dieses Audits.

- [ ] **Step 7: QA-Ergebnis dokumentieren und committen**

Create `docs/release-checklist.md` mit datierten Ergebnissen für Struktur, visuelle Prüfung, Formular, Motion, Performance, Recht/Freigaben und offene Produktionsdaten. Klar unterscheiden zwischen PASS, BLOCKIERT DURCH FEHLENDE FREIGABE und NICHT GEPRÜFT.

```powershell
git add e2e scripts/check-release-readiness.ts docs/release-checklist.md package.json package-lock.json .env.example
git commit -m "test: add Firmenflow release gates and end-to-end QA"
```

- [ ] **Step 8: Vor GitHub-Veröffentlichung Freigabe von Manu einholen**

Stop. Zeige lokalen Status, letzte Commits, Secret-Scan-Ergebnis und Ziel-Repository. Erst nach ausdrücklicher Zustimmung:

```powershell
gh repo create firmenflow-website --private --source . --remote origin --push
```

Wenn ein bestehendes Repository verwendet werden soll, Remote-URL zuerst anzeigen und bestätigen lassen.

- [ ] **Step 9: Vercel-Projekt per CLI verbinden und nur Preview bereitstellen**

Nach Manus Freigabe das Projekt zunächst per CLI verbinden; die GitHub-Automatik bleibt bis zur Produktionsfreigabe getrennt, damit der Push auf `main` keine ungewollte Production Deployment auslöst. Preview-Variablen in Vercel/Bitwarden setzen, nie in Dateien committen. Preview erzeugen:

```powershell
vercel link
vercel env ls
$firmenflowPreviewUrl = vercel deploy
$firmenflowPreviewUrl
```

Expected: eindeutige Preview-URL, erfolgreicher Build, keine Production-Domain-Zuordnung.

- [ ] **Step 10: Globalen Formularschutz in Vercel konfigurieren**

Im Vercel Firewall Dashboard zunächst als Log-Regel testen:

- Bedingung: Request Path `/api/inquiry` UND Methode `POST`;
- Rate Limit: 5 Requests pro 10 Minuten pro Client;
- Folgeaktion nach Beobachtung: HTTP 429;
- Bot-Protection-Regel zunächst in Log-Modus prüfen, bevor Challenge aktiviert wird.

Das Speichern/Veröffentlichen der Firewall-Regel ist eine externe Zustandsänderung und benötigt unmittelbar davor Manus Bestätigung.

- [ ] **Step 11: Preview vollständig verifizieren**

Run against the Preview URL:

```powershell
vercel logs --deployment $firmenflowPreviewUrl --level error
```

Dann Homepage, beide Projektseiten, Rechtsseiten, 404, WhatsApp-Link, erfolgreiche Testanfrage, 429-Verhalten, E-Mail-Eingang und mobile Motion visuell prüfen. Eine echte Testanfrage wird nur nach Manus Bestätigung versendet, weil sie Kontakt- und Projektdaten an Resend und Manus Zielpostfach übermittelt.

- [ ] **Step 12: Produktion separat freigeben und smoke-testen**

Produktion ist erst erlaubt, wenn:

- `npm run check:release` PASS;
- Rechts- und Bildfreigaben dokumentiert sind;
- Projektrollen und Aussagen bestätigt sind;
- Preview von Manu visuell und funktional abgenommen ist;
- Domainname bestätigt ist.

Dann erneut ausdrückliche Freigabe einholen, GitHub-Automatik mit der bestätigten Production Branch verbinden oder gezielt `vercel deploy --prod` ausführen, Domain verbinden und Smoke-Test auf der echten Domain durchführen. Bei irgendeinem offenen Gate bleibt die Preview bestehen und Produktion unangetastet.

---

## Spec-Coverage-Matrix

| Spezifikationsbereich | Umsetzung |
|---|---|
| Ziel, Positionierung, Name, Region | Tasks 1, 3, 4, 6 |
| Website, Relaunch, Google-Business-Pilot | Tasks 3, 6, 9 |
| Farben, Typografie, Logo, Fotos | Tasks 2, 4 |
| Awake-inspirierte Motion | Tasks 5, 6, 7, 13 |
| Hybrid-Startseite und Routen | Tasks 4, 6, 7, 8 |
| Live-Projekte vs. Konzeptentwürfe | Tasks 3, 7, 8, 13 |
| WhatsApp und Fünfschritt-Anfrage | Tasks 6, 9, 10, 11 |
| Kein Supabase/CMS/Tracking | Tasks 1, 10, 12 |
| Fehlerbehandlung und No-JS | Tasks 5, 9, 10, 11 |
| SEO und lokale Metadaten | Task 12 |
| Datenschutz, Impressum, Freigaben | Tasks 8, 13 |
| Barrierefreiheit und Performance | Tasks 4, 5, 12, 13 |
| GitHub, Vercel Preview, Produktionsgate | Task 13 |

## Ausführungsreihenfolge

Die Tasks werden strikt in Reihenfolge umgesetzt. Nach jedem Commit erfolgen die im Task genannten Tests und eine kurze Review. Task 13 darf keine externen Veröffentlichungen ohne die dort genannten Zustimmungen ausführen.

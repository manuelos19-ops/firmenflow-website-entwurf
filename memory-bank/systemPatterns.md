# Systemmuster

## Architektur

- **Next.js 16 App Router + React 19 + TypeScript**, `src/app/` (Routen), `src/components/` (sections/views/ui/brand/consent/analytics/inquiry), `src/content/` (Texte, Projekte, Icon-Zuordnung), `src/lib/`, `src/config/`.
- **Styling:** Tailwind CSS 4, CSS-Variablen/Design-Tokens in `globals.css` (Farben: paper/ink/plum/coral; Fonts: Atmosphere Grotesk, Switzer, Crimson Text — 100 % lokal).
- **Motion:** Lenis Smooth Scroll + GSAP ScrollTrigger (`@/lib/gsap`), `prefers-reduced-motion`-Fallbacks, SSR-first lesbar.
- **Bilder:** `next/image` mit `sizes`, feste Breite/Höhe, `object-contain` bei Icons, Lazy Loading außer bewussten Preloads.

## Schlüsselentscheidungen

- **Icon-System:** `src/content/firmenflow-icons.ts` (Pfade) + `src/components/brand/FirmenflowIcon.tsx` (`FirmenflowIcon`, `FlowscreenIcon`); Standard `decorative` (leerer Alt), nur explizite `alt` sind informativ.
- **Analytics/Consent:** `GoogleAnalytics.tsx` lädt `gtag.js` nur nach Einwilligung (CustomEvent `cookie-consent-updated`); `CookieConsent.tsx` speichert in `localStorage` (`firmenflow_consent`), Consent Mode v2 Defaults `denied`, Update auf `granted` nur bei Opt-in; Widerruf löscht `_ga*`.
- **Sicherheit:** strikte CSP in `next.config.ts` (inkl. GA-Domains), HSTS, `X-Frame-Options: DENY`, Referrer-Policy.
- **Formulare:** Zod-Schemas + Reducer (`features/inquiry/`), API-Routen `/api/inquiry`, `/api/audit-inquiry`, Brevo-Versand.
- **SEO:** `JsonLd`, Sitemap/Robots, Canonicals, Projekt-SSG (`/projekte/[slug]`).

## Kritische Pfade

- `layout.tsx` bindet Consent + GA + Vercel Analytics/SpeedInsights + UtmCleaner ein.
- `SiteFooter` + `/datenschutz` enthalten die Widerrufs-Buttons (`open-cookie-settings`).
- `public/images/icons/firmenflow/` (60× 512px PNG, RGBA) — Dateinamen/Pfade stabil halten.

# Tech-Kontext

## Stack

- Next.js 16.3.5 (Turbopack), React 19.2.8, TypeScript 5, Tailwind CSS 4, GSAP 3, Lenis, Motion, lucide-react, Zod, Nodemailer/Resend, Vercel Analytics + Speed Insights.
- Dev: ESLint 9, Vitest, Playwright, tsx, sharp.

## Setup

- Install: `npm install`; Dev: `npm run dev` (Standardport 3000; Sandbox-Ports 3100+ binden hier nicht); Build: `npm run build`; Start: `npm start`; Lint: `npm run lint` (Einzeldateien timen oft aus → JSON-Lauf mit `--output-file` nutzen); Typcheck: `npx tsc --noEmit --incremental false`.
- Env-Beispiel: `.env.example` (Brevo, Inquiry-Mail, WhatsApp/Meetergo via `NEXT_PUBLIC_*`).

## Constraints

- GA4-ID: `G-EKM1716MWN` (in `src/config/analytics.ts`).
- CSP muss Google-Domains enthalten (script/connect), sonst lädt GA trotz Consent nicht.
- Icons: 1/1-Seitenverhältnis, Transparenz erhalten, keine Filter/Einfärbung, keine externen URLs, kein Base64.
- Commits/Deploy-Infos auf Deutsch; Tracking-Änderungen immer mit `/datenschutz`-Sync.
- Kein manuelles `vercel deploy --prod` aus dieser Windows-Sandbox (wiederholte 30-s-Timeouts).

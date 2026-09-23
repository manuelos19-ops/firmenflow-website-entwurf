<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Projekt-Regeln (Firmenflow)
- **Tonalität & Marke:** Niemals „direkt mit Manu“ verwenden. Der Claim **„Persönlich mit Manu“** darf gelegentlich als Claim auftauchen (z. B. Hero, Finale, Footer), aber nicht ständig wiederholt werden. In allen weiteren Texten spricht Manu selbst in der Ich-Form und redet den Leser direkt an (z. B. **„persönlich mit mir“**, „ich übernehme“, „schreib mir“) – hier schreibt Manu selbst, niemand schreibt über ihn. Keine dritte Person („Manu macht…“) für Manus eigene Aussagen.
- **Sprache:** Alle Git-Commits, Vercel- und Deployment-Infos immer auf Deutsch verfassen.
- **Tracking & Legal Consistency:** Sobald Tracking-, Analytics- oder Consent-Tools (wie Google Analytics, Pixel, Cookie-Banner) geändert werden, muss zwingend im selben Zug die Datenschutzerklärung (`/datenschutz`) synchronisiert, veraltete Klauseln entfernt und der interaktive Widerrufs-Button eingebunden werden.
- **Copy-Humanizer & Anti-AI-Writing:** Alle geschriebenen Texte (Social Media, Blog, Landingpages) müssen menschlich, direkt und ohne typische KI-Floskeln („Nicht X, sondern Y“, Staging, erzwungene Triaden, Em-Dashes) formuliert sein.
- **Ratgeber-Quiz-Standard:** Jeder Ratgeber-Artikel (`/ratgeber/<slug>`) MUSS zwingend ein maßgeschneidertes Wissens-Quiz unter `content/ratgeber/quizzes/<slug>.json` mit mindestens 30 Fragen (mind. 10 Basis-Fragen für 5-Fragen-Kompakt-Check / mind. 20 Profi-Fragen für 10-Fragen-Meister-Check) mit dynamischer Antwort-Rotation, Lese-Tipp-Banner über dem Text und Vercel Custom Event Tracking enthalten. Quizfragen nur mit Aussagen, die so im Artikel stehen und belegt sind.
- **Ratgeber-Regeln:** Verbindlich ist `docs/blog/REDAKTIONSLEITFADEN.md` (Quellen, Markdown-Bausteine, Formulierungen, Freigabe). Alles in `docs/blog/archiv/` ist alter Stand.
- **Social-Grafiken:** Instagram-Karussells, Storys und WhatsApp-Status entstehen nur mit `D:\KI Projekte\01_Marke_und_Websites\Instagram Firmenflow\vorlagen\render.js` nach den Vorgaben in `vorlagen/FORMAT_SPEZIFIKATIONEN.md`. Keine eigenen Grafik-Generatoren oder HTML-Vorlagen dafür im Website-Projekt anlegen.

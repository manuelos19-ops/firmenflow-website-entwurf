# Aktiver Kontext

## Aktueller Fokus

- Cookie-/GA-Thema ist geklärt: Verhalten ist korrekt (Consent-Gate), keine Codeänderung nötig — siehe `analytics-consent.md`.
- Memory Bank ist neu eingerichtet (`.clinerules/memory-bank.md` + `memory-bank/`).

## Letzte Änderungen (Stand 17.09.2026)

- `d76df31` fix(icons): doppelte/deplatzierte Firmenflow-Icons entfernt (Ablauf nur `go-live`, Kontakt-Formular-Icons und Über-Manu-Intro-Icons entfernt).
- `f8ba9b7` feat(icons): Firmenflow-Iconbibliothek integriert (zentrale `FirmenflowIcon`-/`FlowscreenIcon`-Komponente, 60× 512px-PNG-Derivate, dekorative Alt-Texte, TS fehlerfrei, Build ok).
- Live-Verifikation: GA4 `G-EKM1716MWN` lädt erst nach „Alle akzeptieren“; CSP erlaubt GA-Endpunkte; Datenschutz dokumentiert Consent sauber.

## Nächste Schritte

- Echte Browser-Sichtprüfung (Desktop ~1440 / Mobil ~390) für alle Icon-Seiten nachholen.
- `Faq.tsx`-Altlast (`categories`/`activeCategory`) separat entscheiden.
- `set-state-in-effect`-Errors (`ProjectInquiry.tsx`, `CookieConsent.tsx`) separat beauftragen.
- Deployment nur via freigegebenen Push (Vercel Auto-Deploy), kein manuelles `vercel deploy --prod` aus der Sandbox.

## Laufende Entscheidungen / Learnings

- Listen-Häkchen in langen Listen bleiben reduzierte CSS-Punkte (keine großen 3D-Icons pro Eintrag).
- Firmenflow-Icons neben gleichbedeutendem Text sind `decorative` (kein `Icon: ...`-Alt-Text).
- Scanner (z. B. CCM19), die nur Cookies/HTML lesen, melden GA fälschlich als fehlend — Einwilligung liegt in `localStorage`, GA lädt erst nach Klick (False-Negative durch Design).
- `npx eslint` auf Einzeldateien timet in dieser Umgebung oft aus (30 s); JSON-Lauf mit `--output-file` funktioniert.
- Dev-/Prod-Server binden in der Sandbox keine Ports; Verifikation über statischen Build + Live-Fetch statt localhost.

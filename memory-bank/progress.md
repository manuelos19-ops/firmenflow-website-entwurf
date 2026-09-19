# Fortschritt

## Was funktioniert (verifiziert 17.09.2026)

- Firmenflow-Iconintegration auf allen Seiten (Start, Lokalpräsenz 360°, Über Manu, Anfrage + erhalten, 5 Projektseiten, FlowScreen).
- TypeScript fehlerfrei, Produktionsbuild erfolgreich (25 Routen).
- Gezielter ESLint ohne neue Icon-Fehler.
- GA4 + Consent live verifiziert: kein Laden vor Einwilligung, Laden nach „Alle akzeptieren“, Widerruf löscht `_ga*`, CSP erlaubt GA, Datenschutz dokumentiert alles.
- Commits `f8ba9b7` + `d76df31` gepusht, Arbeitsbaum sauber.

## Was noch offen ist

- [ ] Echte Browser-Sichtprüfung Desktop/Mobil (Icons, Transparenz, Beschnitt, Formulare).
- [ ] `Faq.tsx`: ungenutzte `categories`/`activeCategory`/`setActiveCategory` entscheiden/entfernen.
- [ ] `react-hooks/set-state-in-effect` in `ProjectInquiry.tsx` + `CookieConsent.tsx` separat fixen (Logik nicht ohne Auftrag ändern).
- [ ] Optional: CMP-Erkennbarkeit erhöhen (technisches Consent-Cookie zusätzlich zu `localStorage`) — nur auf Wunsch, inkl. Datenschutz-Sync.

## Bekannte Probleme

- Einzeldatei-ESLint timet in dieser Umgebung oft nach 30 s aus.
- Dev-/Prod-Server binden lokal keine Ports (Sandbox-Limit); Live-Verifikation via Fetch + statischem Build.
- Manuelles Vercel-Deploy aus der Sandbox hängt in Timeouts → nur Auto-Deploy via Push.
- Scanner ohne Consent-Klick melden GA/CMP fälschlich als fehlend (erwartbar, kein Bug).

## Entscheidungs-Historie

- 16.09.2026: Iconbibliothek (72 Icons + FlowScreen-Paket) bereitgestellt; Vorgabe: nur verwendete Icons kopieren, keine Platzhalter.
- 17.09.2026: 60 Icons als 512px-Derivate übernommen (~58 MB → ~11,8 MB); Originale unangetastet.
- 17.09.2026: Alt-Strategie auf `decorative`-Standard umgestellt (keine Slug-Vorlesung).
- 17.09.2026: GA/Cookie-Prüfung → Verhalten korrekt, keine Änderung.
- 19.09.2026: Memory Bank eingerichtet (diese Dateien).

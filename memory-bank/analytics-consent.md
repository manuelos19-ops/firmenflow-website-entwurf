# Analytics & Consent (GA4 + Cookie-Banner)

Stand: 17.09.2026 live verifiziert gegen `https://www.firmenflow.de/`.

## Implementierung

- GA4-Property: `G-EKM1716MWN` (`src/config/analytics.ts`).
- `GoogleAnalytics.tsx` lädt `gtag.js` **nur nach Einwilligung** (dynamisches Script, `id="ga-script"`).
- Consent Mode v2 Defaults: alles `denied` (`wait_for_update: 500`); Update auf `granted` nur bei Opt-in.
- `CookieConsent.tsx`: Banner + Einstellungs-Modal, Speicherung in `localStorage["firmenflow_consent"]` (Version `1.0`), Event `cookie-consent-updated`, Widerruf löscht `_ga*`-Cookies.
- Einstiegspunkte: `layout.tsx` (Banner + GA), Footer-`CookieSettingsButton` (`open-cookie-settings`), `/datenschutz`-Widerrufs-Button.
- CSP (`next.config.ts`) erlaubt `googletagmanager.com` (script/connect) und `*.google-analytics.com` / `*.analytics.google.com` (connect). Ohne diese würde GA trotz Consent blockiert (früherer Audit-Befund, seit Commit `82f092f` behoben).
- Datenschutz Abschnitt 8 dokumentiert GA (Consent-Gate, IP-Anonymisierung, DPF/SCC, 14 Monate, Opt-out-Link).

## Erwartetes Verhalten (kein Bug)

- Vor „Alle akzeptieren“: **kein** `googletagmanager`-/`collect`-Request, keine `_ga`-Cookies, kein `gtag`-Objekt.
- Nach „Alle akzeptieren“: `gtag/js?id=G-EKM1716MWN` + `collect`-Hits + `_ga`/`_ga_EKM1716MWN`.
- Nach „Alle ablehnen“/Widerruf: `_ga*` werden gelöscht, keine weiteren Hits.
- Scanner (z. B. CCM19), die nur HTML/Cookies ohne aktiven Consent-Klick prüfen, melden GA/CMP fälschlich als fehlend — die Einwilligung liegt in `localStorage`, nicht in einem Cookie.

## Selbsttest

1. `localStorage["firmenflow_consent"]` löschen → Reload → Banner erscheint.
2. Network-Filter `googletagmanager`/`google-analytics`: vor Klick 0 Requests.
3. „Alle akzeptieren“ → `gtag/js` + `collect` erscheinen, `_ga`-Cookies vorhanden.
4. „Cookie-Einstellungen“ → „Alle ablehnen“ → `_ga*` weg, keine weiteren Hits.
5. GA4-Echtzeit zeigt `page_view` (1–2 Min. warten, keine Adblocker/Filter).

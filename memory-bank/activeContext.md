# Aktiver Kontext (Stand: 23.09.2026)

## Aktueller Fokus

- Social Media (Instagram und WhatsApp-Status) läuft über einen eigenen Ordner: `D:\KI Projekte\01_Marke_und_Websites\Instagram Firmenflow`. Maßgeblich sind dort `README.md`, `vorlagen/FORMAT_SPEZIFIKATIONEN.md` und `vorlagen/render.js`. Seit 23.09.2026 gilt ein neuer Stil (3:4, Glaskacheln, erste und letzte Folie kräftiges Plum, dazwischen hell). Alte Vorlagen und Generatoren liegen dort in `_archiv/` und werden nicht mehr genutzt.
- Ratgeber- und Blog-Plattform auf `firmenflow.de` ist live, mit 3 Artikeln, individuellem Wissens-Quiz-System und Vercel Custom Event Tracking.
- Alle Marken- und Tonalitätsrichtlinien sind im Code und im Content synchronisiert („Persönlich mit Manu“, keine KI-Phrasen, saubere mobile Typografie).

## Zuletzt umgesetzte Änderungen an der Website (September 2026)

### 1. Ratgeber-Plattform & Content-Hub (`/ratgeber`)
- **3 vollständige Fachartikel mit echten Quellen veröffentlicht:**
  - `/ratgeber/google-maps-nicht-gefunden` (BrightLocal-, Google- und Vor-Ort-Daten)
  - `/ratgeber/website-fehler-lokale-betriebe` (Google- & BBC-Ladezeitwerte, Destatis)
  - `/ratgeber/azubis-finden-handwerk` (JIM-Studie 2025, Ausbildungsmarktbilanz der Bundesagentur für Arbeit 2024/25, Berufsbildungsbericht 2025)
- **Interaktives Wissens-Quiz-System:**
  - Alle 3 Ratgeber-Seiten besitzen nun ein maßgeschneidertes Quiz (Kompakt-Check: 5 Fragen / Profi-Meistercheck: 10 Fragen).
  - Fragenpool mit Zufallsauswahl und vollständigem Antworten-Shuffle (dynamische Rotation der Optionen 1–3 bei jedem Durchgang).
  - Lese-Tipp-Banner über dem geöffneten Artikel mit Anker-Sprungmarke direkt zum Quiz.
  - Native Web Share API und WhatsApp-Teilen-Buttons mit integriertem Kampagnen-Tracking.
- **Typografie- & Layout-Härtung:**
  - Kachel `54.000` im Azubi-Artikel bricht mobil nicht mehr aus dem Container aus (`min-w-0`, responsive Schriftgröße).
  - Kacheln rechts und links auf exakt gleicher Höhe ausbalanciert (`grid items-stretch`).
  - Optischer Freiraum vor Zwischenüberschriften (z. B. „Vier Fragen, die vor der Bewerbung...“) vergrößert.
  - Titelbilder aller drei Artikel seit 23.09.2026 im Social-Stil (drei Glaskarten mit 3D-Objekten), `public/images/ratgeber/<slug>-titel.webp`, erzeugt mit `Instagram Firmenflow/vorlagen/render.js`.

### 2. Visuelles System & Autoren-Präsenz
- **Echte Fotos statt 3D-Avatare:**
  - Aktualisierung des Manu-Hero-Fotos und der Autoren-Boxen unter allen Ratgeber-Artikeln mit 3 abwechselnden, authentischen Fotos.
  - Cache-Busting für Porträt-Assets implementiert.
- **Button-System mit 3D-Icons:**
  - Neue interaktive Buttons mit Gradient-Rand, Glas-Container und hochauflösenden 3D-Icons.

### 3. Instagram-Landingpage & Vanity-Redirects
- **Dedizierte Bio-Seite `/start`:**
  - Schlanker, extrem schneller Mobile-First-Hub für Instagram-Besucher mit Vorstellung von Manu, Direktzugriff auf Ratgeber, Wissens-Quiz und Kontakt.
- **Redirects in `next.config.ts`:**
  - `/start` ist die einzige Bio-Seite (Entscheidung Manu, 23.09.2026). Weiterleitungen: `/bio` → `/start?utm_source=instagram&utm_medium=bio&utm_campaign=bio_hub`, `/links` und `/linktree` → `/start`, `/tipps` → `/ratgeber?…&utm_campaign=bio_ratgeber_hub`. Die frühere Seite `/links` ist entfernt.

### 4. Tracking & Kampagnen-Infrastruktur
- **`UtmCleaner`-Komponente:**
  - Erfasst `utm_source`, `utm_medium`, `utm_campaign` für Vercel Analytics und GA4 und entfernt sie nach 600 ms optisch aus der URL-Leiste.
- **Vercel Custom Events:**
  - Tracking für Ratgeber-Klicks, Teilen-Aktionen, Quiz-Starts und Quiz-Abschlüsse.
- **Instagram 2026 Hashtag-Grenze:**
  - Für alle Posts gilt die Obergrenze von 3 bis maximal 5 hochrelevanten Hashtags (Meta AI-Search & Anti-Spam-Standard).

## Nächste Schritte

- Teil 3 (Azubis) ist fertig gerendert in `Instagram Firmenflow/posts/03_azubis/` und wartet auf Freigabe zum Posten.
- Vercel Analytics Dashboard auf eingehende Custom Events und Quiz-Abschlüsse prüfen.
- Feedback zur Bio-Seite `/start` sammeln und Konversionsrate über UTM-Parameter analysieren.

## Laufende Entscheidungen & Guardrails

- **Wortwahl:** Ausnahmslos **„Persönlich mit Manu“** bzw. **„persönlich mit mir“**. Niemals „direkt mit Manu“.
- **Hashtags:** Instagram erlaubt seit Dezember 2025 höchstens 5 Hashtags pro Beitrag. Wir nutzen 3 bis 5.
- **Social-Grafiken:** nur über `Instagram Firmenflow/vorlagen/render.js`. Keine eigenen Generatoren im Website-Projekt.
- **Ratgeber:** Regeln in `docs/blog/REDAKTIONSLEITFADEN.md`. Nicht committen oder pushen, bevor Manu es sagt.
- **Tracking & Datenschutz:** Jede Tracking-Änderung verlangt sofortige Synchronisation der `/datenschutz` und Erhalt des Widerrufs-Buttons.
- **Auto-Deploy:** Produktives Deployment läuft ausschließlich automatisiert über Git-Pushes auf den `master`-Branch via Vercel.

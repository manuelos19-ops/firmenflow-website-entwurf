# Aktiver Kontext (Stand: 23.09.2026)

## Aktueller Fokus

- Instagram-Content-Engine: Teil 1 (Google Maps) und Teil 2 (Website-Fehler) mit jeweils 7 Karussell-Slides (4:5) und 3 Begleit-Storys (9:16) sowie Posting-Dokumenten fertiggestellt.
- Ratgeber- und Blog-Plattform auf `firmenflow.de` ist live, mit 3 Artikeln, individuellem Wissens-Quiz-System und Vercel Custom Event Tracking.
- Alle Marken- und Tonalitätsrichtlinien sind im Code und im Content synchronisiert („Persönlich mit Manu“, keine KI-Phrasen, saubere mobile Typografie).

## Zuletzt umgesetzte Änderungen an der Website (September 2026)

### 1. Ratgeber-Plattform & Content-Hub (`/ratgeber`)
- **3 vollständige Fachartikel mit echten Quellen veröffentlicht:**
  - `/ratgeber/google-maps-nicht-gefunden` (BrightLocal-, Google- und Vor-Ort-Daten)
  - `/ratgeber/website-fehler-lokale-betriebe` (Google- & BBC-Ladezeitwerte, Destatis)
  - `/ratgeber/azubis-finden-handwerk` (Handwerkskammer, Destatis, 60-Sekunden-Bewerbung)
- **Interaktives Wissens-Quiz-System:**
  - Alle 3 Ratgeber-Seiten besitzen nun ein maßgeschneidertes Quiz (Kompakt-Check: 5 Fragen / Profi-Meistercheck: 10 Fragen).
  - Fragenpool mit Zufallsauswahl und vollständigem Antworten-Shuffle (dynamische Rotation der Optionen 1–3 bei jedem Durchgang).
  - Lese-Tipp-Banner über dem geöffneten Artikel mit Anker-Sprungmarke direkt zum Quiz.
  - Native Web Share API und WhatsApp-Teilen-Buttons mit integriertem Kampagnen-Tracking.
- **Typografie- & Layout-Härtung:**
  - Kachel `54.000` im Azubi-Artikel bricht mobil nicht mehr aus dem Container aus (`min-w-0`, responsive Schriftgröße).
  - Kacheln rechts und links auf exakt gleicher Höhe ausbalanciert (`grid items-stretch`).
  - Optischer Freiraum vor Zwischenüberschriften (z. B. „Vier Fragen, die vor der Bewerbung...“) vergrößert.
  - Eigenes 3D-Cover-Bild für den Azubi-Artikel (`azubis_handwerk_1790109695860.jpg`).

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
  - `/bio`, `/tipps` leiten 307-temporär auf `/start`.

### 4. Tracking & Kampagnen-Infrastruktur
- **`UtmCleaner`-Komponente:**
  - Erfasst `utm_source`, `utm_medium`, `utm_campaign` für Vercel Analytics und GA4 und entfernt sie nach 600 ms optisch aus der URL-Leiste.
- **Vercel Custom Events:**
  - Tracking für Ratgeber-Klicks, Teilen-Aktionen, Quiz-Starts und Quiz-Abschlüsse.
- **Instagram 2026 Hashtag-Grenze:**
  - Für alle Posts gilt die Obergrenze von 3 bis maximal 5 hochrelevanten Hashtags (Meta AI-Search & Anti-Spam-Standard).

## Nächste Schritte

- Teil 3 des Instagram-Contents (Azubis finden im Handwerk) vorbereiten.
- Vercel Analytics Dashboard auf eingehende Custom Events und Quiz-Abschlüsse prüfen.
- Feedback zur Bio-Seite `/start` sammeln und Konversionsrate über UTM-Parameter analysieren.

## Laufende Entscheidungen & Guardrails

- **Wortwahl:** Ausnahmslos **„Persönlich mit Manu“** bzw. **„persönlich mit mir“**. Niemals „direkt mit Manu“.
- **Hashtags:** Maximal 3 bis 5 gezielte Hashtags pro Instagram-Beitrag (2026 Standard).
- **Tracking & Datenschutz:** Jede Tracking-Änderung verlangt sofortige Synchronisation der `/datenschutz` und Erhalt des Widerrufs-Buttons.
- **Auto-Deploy:** Produktives Deployment läuft ausschließlich automatisiert über Git-Pushes auf den `master`-Branch via Vercel.

# Fortschritt (Stand: 23.09.2026)

## Was funktioniert & live ist

- **Ratgeber- und Blog-Plattform:**
  - 3 fertige Artikel online (`google-maps-nicht-gefunden`, `website-fehler-lokale-betriebe`, `azubis-finden-handwerk`).
  - Maßgeschneiderte Wissens-Quizzes (5 & 10 Fragen) mit dynamischer Antwort-Rotation und Zufallsfragen pro Durchgang.
  - Native Web Share API und WhatsApp-Teilen mit automatischen UTM-Parametern.
  - Lese-Tipp-Banner über Artikeln mit Direkt-Sprungmarke zum Quiz.
  - Kachel- und Typografie-Polish (54.000 Zahl bricht nicht mehr aus, ausgerichtete Kachelhöhen, vergrößerte Abstände).
  - 3 echte Autoren-Porträts von Manu abwechselnd im Einsatz.
- **Social Media & Landingpages:**
  - Bio-Seite `/start` (Ziel von `/bio`, `/links`, `/linktree`), dazu `/tipps` → `/ratgeber`.
  - `UtmCleaner`-Infrastruktur (Vercel & GA4 erfassen Daten, Adresszeile wird nach 600 ms bereinigt).
  - Post 01 (Google Maps) und Post 02 (Website-Fehler) sind im alten Stil online (4:5). Seit 23.09.2026 neuer Stil und ein gemeinsamer Renderer in `Instagram Firmenflow/vorlagen/render.js`. Post 03 (Azubis) und die WhatsApp-Status für Post 02 sind im neuen Stil fertig.
  - Hashtag-Strategie auf den offiziellen 2026-Standard begrenzt (ausnahmslos 3–5 gezielte Tags).
- **Technischer Unterbau & Performance:**
  - Next.js 16 App Router mit statischem Export/SSG und Turbopack-Kompatibilität.
  - Vercel Custom Event Tracking für Ratgeber- und Quiz-Interaktionen.
  - DSGVO-Consent-Gate verifiziert (kein GA4 vor Klick auf „Alle akzeptieren“, vollständige Synchronisation in `/datenschutz`).
  - Neue Micro-UI Buttons mit 3D-Glas-Icons und Gradient-Rahmen.

## Zuletzt abgeschlossene Meilensteine

- `23.09.2026`: Instagram Post 02 Karussell (7 Slides) & 3 Storys inkl. Umfrage-Sticker-Feld gerendert; 2026 Hashtag-Obergrenze (3–5 Tags) etabliert.
- `22.09.2026`: Helles Manu-Hero-Foto mit Cache-Busting eingepflegt; Azubi-Cover & Autorenfotos in Ratgeber eingebunden.
- `22.09.2026`: Dynamisches Ratgeber-Quiz mit Zufalls-Rotation und vollständigem Antwort-Shuffle ausgerollt.
- `21.09.2026`: Instagram Bio-Landingpage `/start` und Vanity-Redirects integriert; Vercel Custom Events aktiviert.
- `19.09.2026`: Memory Bank und Redaktionsrichtlinien angelegt.
- `17.09.2026`: 60 Firmenflow 3D-Icons (512px Derivate) integriert und GA4-Consent verifiziert.

## Was noch offen ist

- [ ] Teil 3 der Instagram-Serie („Azubis finden“) posten, Grafiken liegen in `Instagram Firmenflow/posts/03_azubis/`.
- [ ] Langzeit-Monitoring der Vercel- und GA4-Custom-Events (Quiz-Starts vs. Abschlüsse).
- [ ] Weitere regionale Fallstudien oder Praxisbeispiele für zukünftige Ratgeber vorbereiten.
- [ ] Regelmäßige Prüfung der externen Quellenlinks auf Aktualität.

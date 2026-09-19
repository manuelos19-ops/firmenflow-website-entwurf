# Icon-System (Firmenflow-Iconbibliothek)

## Quelle & Ablage

- Originalbibliothek (unangetastet): `Firmenflow website daten/Icons Firmenflow - GPT 16.09.26` (+ FlowScreen-Pakete).
- Projektkopien (nur verwendete): `public/images/icons/firmenflow/` (51 PNG) + `public/images/icons/firmenflow/flowscreen/` (9 PNG).
- Alle 60 Dateien sind 512×512-PNG-Derivate (RGBA, ~11,8 MB gesamt, war ~58 MB bei 1254px). `app-icon-512.png` war bereits 512.
- Dateinamen/Pfade stabil halten; keine Duplikate; keine externen URLs; kein Base64.

## Code

- `src/content/firmenflow-icons.ts`: `FirmenflowIconName` + `firmeflowIconPaths`, `FlowscreenIconName` + `flowscreenIconPaths`.
- `src/components/brand/FirmenflowIcon.tsx`: `FirmenflowIcon` + `FlowscreenIcon` auf `next/image`-Basis (1/1, `object-contain`, feste Größe, Lazy außer `priority`, keine Filter).
- Standard ist `decorative` (leerer Alt + `aria-hidden`); nur explizite `alt`-Texte sind informativ (z. B. `alt="FlowScreen"` fürs Produktlogo).
- Icons neben gleichbedeutendem sichtbarem Text sind immer `decorative` (kein `Icon: ...`).
- Kleine Häkchen in langen Listen bleiben reduzierte CSS-Punkte (keine 3D-Icons pro Eintrag).
- FlowScreen-App-Logo nur auf `/flowscreen`; Firmenflow-Nav-/Footer-Logos, Fotos und Porträts nie ersetzen.

## Zuordnung (Kurzreferenz)

- Start/Leistungen: `neue-website`, `relaunch`, `foto`, `video`, `mobile-first`, `ladezeit-performance`, `mehr-anfragen`, `analyse`, `seo-schutz`, `struktur-wireframe`, `texte-copywriting`, `festpreis`.
- Ablauf: `kennenlernen`, `designentwurf`, `umsetzung-texte`, `go-live` (Schritt 4 nur `go-live`, kein Doppel-Icon).
- Vertrauen: `persoenlicher-ansprechpartner`, `monatlich-kuendbar`, `domain-eigentum`, `code-uebergabe`, `beratung`, `angebot`.
- Projekte: `responsive-design`, `performance-ladezeit`, `unternehmensprofil`, `referenzen-portfolio`, `externer-link`.
- Kontakt/FAQ/Formulare: `telefon`, `email`, `termin`, `nachricht-senden`, `formular`, `faq`, `faq-plus`, `video-website-check`, `erfolg`, `fehler`.
- Lokalpräsenz 360°: `profil-einrichten`, `profil-aufraeumen`, `bewertungen-beantworten`, `mehr-bewertungen`, `lob`, `wiederkehrendes-problem`, `handlungsempfehlung`, `team-schulung`, `monatsreport`, `vorher-nachher-upgrade`, `info-hinweis`, `warnung`, `datenschutz`.
- FlowScreen: `canvas-mockup`, `schrittzaehler`, `dsgvo-verpixelung`, `lupe-zoom`, `vektor-editor`, `screenshot-aufnahme`, `lokal-ohne-cloud`, `app-logo`, `app-icon-512`.

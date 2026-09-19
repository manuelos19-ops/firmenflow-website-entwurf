# Firmenflow-Website – Projektbrief

Quelle der Wahrheit für Scope, Stil und Arbeitsweise. Alle Memory-Bank-Dateien bauen darauf auf.

## Kern

- **Projekt:** Offizielle Website und digitaler Markenauftritt für **Firmenflow** (Webdesign & Lokalpräsenz, Wesel & Niederrhein).
- **Kernversprechen:** „Mehr Lokalpräsenz. Weniger Agenturtheater. Deine Website. Persönlich mit Manu.“
- **Charakter:** Interaktives, handwerkliches Magazin-Erlebnis — kein austauschbares KI-/SaaS-Template.
- **Repo:** `firmenflow-website/` (Branch `master`, Remote `origin/master`).
- **Live:** `https://www.firmenflow.de/` (Vercel, Auto-Deploy per GitHub-Push).

## Anforderungen

1. Persönlicher Ton: In UI, Navigation und Leistungsbeschreibungen gilt **„Persönlich mit Manu“** (niemals „direkt mit Manu“). Dort, wo Manu selbst als Autor/Erzähler spricht (z. B. Ratgeber-Artikel), gilt die Ich-Form, z. B. **„persönlich mit mir“** – dort schreibt Manu selbst, niemand schreibt über ihn.
2. Sichtbarer Markenname **„Manu“**; „Manuel Landeck“ nur in rechtlich vorgeschriebenen Kontexten (Impressum, Datenschutz).
3. Slogan: „für deine Lokalpräsenz“. Fokusregion: Wesel & Niederrhein (+ NRW).
4. Alle Git-Commits sowie Vercel-/Deployment-Infos **auf Deutsch**.
5. **Tracking & Legal Consistency:** Bei jeder Änderung an Tracking/Analytics/Consent (GA, Pixel, Cookie-Banner) im selben Zug `/datenschutz` synchronisieren, veraltete Klauseln entfernen, interaktiven Widerrufs-Button einbinden.
6. Keine Fotos/Porträts durch Icons ersetzen. Keine Texte/Preise/Kontaktdaten ohne Grund ändern. Keine Seiten entfernen. Kein Deployment ohne Freigabe (ausgenommen Auto-Deploy nach freigegebenem Push).

## Nicht-Ziele

- Kein Relaunch ohne Auftrag, keine neuen KI-Icons erzeugen, keine Quellbilder überschreiben/löschen.
- Keine unrelated Lint-Reparaturen im Gesamtrepo.
- Keine manuellen `vercel deploy --prod` aus dieser Sandbox (hängt in Timeouts); Deployment läuft über freigegebenen Push + Vercel Auto-Deploy.

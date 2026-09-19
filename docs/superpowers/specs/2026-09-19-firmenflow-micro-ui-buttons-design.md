# Firmenflow Mikro-UI und Buttons – Design

## Ziel

Die verbliebenen generischen UI-Symbole der Firmenflow-Website werden durch ein eigenes, leichtes SVG-System ersetzt. Das bestehende Buttonsystem bleibt semantisch und responsiv, erhält aber eine eindeutige Firmenflow-Handschrift durch die neue Flow-Pfeil-Glyphe, eine dezente Lichtspur und konsistente Fokuszustände.

## Umfang

- Ein zentraler SVG-Komponentensatz ersetzt die aktuell verwendeten Lucide-Symbole.
- Die 27 benötigten Semantiken bleiben vertraut: Navigation, Kontakt, Formular, Status, Medien und Systemaktionen.
- `ButtonLink` verwendet die eigene Flow-Pfeil-Glyphe und erhält eine zurückhaltende, GPU-sichere Hover-Lichtspur.
- Alle bestehenden sichtbaren Texte, Links, Formulare, Preise, Logos, Fotos und Seitenstrukturen bleiben unverändert.
- Die großen 3D-PNGs bleiben Inhaltsillustrationen. Sie werden nicht für 14–24-Pixel-Bedienelemente verkleinert.

## Visuelle Regeln

- 24 × 24 ViewBox, runde Linienenden und weiche Kurven.
- Grundstrich 1,65 px; bestehende Tailwind-Klassen dürfen die Strichstärke gezielt überschreiben.
- Symbole erben `currentColor` und funktionieren damit auf Koralle, Pflaume, Weiß, Grün und neutralen Flächen.
- Die Pfeile erhalten eine leicht geschwungene Flow-Linie statt eines rein technischen Standardschafts.
- Universelle Bedeutungen bleiben sofort erkennbar. Branding verändert die Formsprache, nicht die Bedienlogik.

## Barrierefreiheit

- Symbole sind standardmäßig dekorativ und erhalten `aria-hidden="true"`.
- Falls ein Symbol ohne sichtbaren Begleittext eingesetzt wird, kann die Komponente über `label` eine zugängliche Bezeichnung und `role="img"` erhalten.
- Bestehende `aria-label`-Werte, Buttontexte, Fokusreihenfolge und Tastaturbedienung bleiben bestehen.
- `ButtonLink` erhält einen gut sichtbaren `focus-visible`-Ring mit ausreichendem Abstand.
- Animationen respektieren weiterhin die vorhandenen Reduced-Motion-Regeln; die neue Lichtspur verändert nur Transform und Opazität.

## Architektur

- `src/components/brand/FirmenflowUiIcon.tsx` enthält den typisierten Katalog und kompatible benannte Exporte für die bestehenden Symbolnamen.
- Die bestehenden Komponenten importieren danach aus diesem Firmenflow-Modul statt aus `lucide-react`.
- Der Wechsel bleibt bewusst API-kompatibel (`className`, `style` und weitere SVG-Props), damit keine Bedienlogik verändert wird.
- Vitest-Vertragstests prüfen Katalog, Barrierefreiheit, Buttonintegration und das vollständige Entfernen direkter Lucide-Imports.

## Nicht Bestandteil dieses Durchgangs

- Keine neuen großen 3D-Icons.
- Keine Produkt-Wordmarks, OG-Karten oder weiteren Logos. Diese bleiben ein eigener, späterer Markenbaustein.
- Kein Deployment, Commit oder Push.

## Abnahme

- Keine direkten `lucide-react`-Imports mehr unter `src`.
- Alle 27 benötigten Symbolnamen werden vom Firmenflow-Komponentensatz bereitgestellt.
- Buttons bleiben als echte Links oder Buttons mit editierbarem Text umgesetzt.
- TypeScript, gezielter ESLint-Lauf, Vitest und Produktionsbuild laufen erfolgreich.
- Visuelle Prüfung auf Desktop und Mobilgerät zeigt keine abgeschnittenen Symbole, Fokusprobleme oder Layoutsprünge.

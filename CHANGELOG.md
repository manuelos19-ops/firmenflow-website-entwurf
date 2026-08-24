# Änderungshistorie (Changelog)

Alle wesentlichen Änderungen am Projekt **Firmenflow Website Entwurf** werden in dieser Datei chronologisch auf Deutsch dokumentiert.

---

## [v0.3.0] – 2026-08-24 (Catchy Design-Upgrade & Typografie-Trio)

### 🎨 Typografie
- **Schriften-Trio (Studio Wemento Inspiration):**
  - **`Atmosphere Grotesk`** (Bold & Regular) als Display-Schriftart für ausdrucksstarke Überschriften.
  - **`Switzer`** (Variable WOFF2) von Fontshare für UI, Navigation, Fließtext und Buttons.
  - **`Crimson Text`** (Italic & Regular) für feine, edle Kursiv-Akzente und Unterzeilen.
- Sämtliche Schriften sind **100% lokal auf dem Server** unter `/public/fonts/` installiert (keine externen Verbindungen, DSGVO-konform).

### ✨ Design & Interaktion
- **Hero-Sektion:**
  - Dramatischer Auftritt des Kernversprechens in `Atmosphere Grotesk` mit `Crimson Text`-Akzent.
  - Deutlich vergrößerte Abstände zwischen Subtext, Buttons und dem Laufband.
  - Rotierendes SVG-Kreisbadge (*„Wesel • Niederrhein • Manu“*).
- **Leistungen (Neue Website & Relaunch):**
  - Ergänzt um interaktive **Browser-Window-Kopfzeilen** mit Ampel-Punkten (`● ● ●`) und Live-URL.
  - Visuelle **Live-Kennzahlen-Kacheln** (*Mobile-First*, *< 0.5s Ladezeit*, *SEO-Rankings safe*) und Checkmark-Listen.
- **„Direkt mit Manu“:**
  - Umwandlung der Aufzählung in **4 auffällige Bento-Kacheln mit Neon-Glow-Effekt** (*Persönlich erreichbar*, *Klare nächste Schritte*, *Ehrliche Einschätzung*, *Nah an Wesel & Niederrhein*).
- **Google Business 360° – Pilot:**
  - Visuelle **Google-Suchprofil-Karte** (5,0 Sterne ⭐⭐⭐⭐⭐, *Verifiziertes Unternehmensprofil*, Score-Badges).
  - 3 grafische Säulen (*Audit*, *QR-Bewertungsflow*, *Antwortservice*).
- **Projekte Showcase:**
  - Echte **hochauflösende Website-Mockup-Screenshots** (`Eiscafé Orrico`, `Autotransport Alex`, `Bäckerei Büscher`, `Vincent Käsekuchen`), die beim Cursor-Hover flüssig eingeblendet werden (kein Platzhalter-Kasten mehr).
- **Header & Navigation:**
  - Feste Freiräume verhindern Überlappungen des CTA-Buttons.
  - Kompaktes, schwebendes Mobil-Menü.
- **Projektanfrage:**
  - Vollbreiten-Layout (`max-w-4xl`) für das 5-Schritt-Anfrageformular für optimale Lesbarkeit und ungestauchte Kacheln.

---

## [v0.2.0] – 2026-08-24 (Komplettes Scrollytelling-Redesign)

### 🚀 Neu
- **Lenis Smooth Scroll:** Integration der seidenweichen Scroll-Physik mit GSAP-ScrollTrigger-Synchronisation.
- **Custom Cursor:** GPU-beschleunigter Verfolger-Punkt mit `gsap.quickTo` und reaktiver Vergrößerung auf interaktiven Elementen.
- **Subtiles Film-Grain Overlay:** Prozedurale Körnung mittels SVG-Filter.
- **Scroll-Fill Statement (Problem-Sektion):** Großflächige Typografie mit dynamischem Tinte-Fülleffekt über `clip-path: inset()`.
- **Ablauf Timeline:** Animierte vertikale SVG-Linie mit Scroll-Zeichnung und pulsierenden Meilensteinen.
- **FAQ Accordion:** GSAP-Höhenanimation mit sanfter Easing-Kurve.

---

## [v0.1.0] – 2026-08-23 (Initialer Prototyp)

### 🚀 Neu
- Grundaufbau mit Next.js 16 App Router, React 19, TypeScript und Tailwind CSS.
- Porträt-Assets von Manu und Marken-Vektoren generiert.
- 5-stufiges interaktives Projektanfrageformular mit Zod-Validierung und serverlosem Route-Handler (`/api/inquiry`).
- SSG-Detailseiten für Live-Projekte (`/projekte/eiscafe-orrico`, `/projekte/autotransport-alex`).
- Rechtssichere Unterseiten (`/impressum`, `/datenschutz`, `/anfrage/erhalten`, `404`).

# Änderungshistorie (Changelog)

Alle wesentlichen Änderungen am Projekt **Firmenflow Website Entwurf** werden in dieser Datei chronologisch auf Deutsch dokumentiert.

---

## [v0.5.0] – 2026-09-23 (Ratgeber-Plattform, Dynamisches Quiz-System, Social Hub & Micro-UI)

### 🚀 Ratgeber & Content-Hub (`/ratgeber`)
- **3 fundierte Ratgeber online:** Google Maps Sichtbarkeit, Website-Fehler & Azubi-Gewinnung im Handwerk.
- **Interaktives Wissens-Quiz-System:** Dynamischer Fragenpool mit Zufallsauswahl (5 vs. 10 Fragen) und vollständigem Antwort-Shuffle (keine feste Antwortposition).
- **Lese-Tipp-Banner:** Oben in Artikeln platziert mit Sprungmarke direkt zum Quiz.
- **Native Web Share API & WhatsApp-Buttons:** Schnelles Teilen inklusive automatischer UTM-Kampagnen-Parameter.
- **Mobile Polish:** Horizontales Überlaufen von Großzahlen (z. B. 54.000) behoben, Kachelhöhen ausbalanciert, typografische Abstände für Untertitel optimiert.
- **Bild-Assets:** Echtes 3D-Cover für Azubis-Artikel und 3 abwechselnde Autorenfotos von Manu eingebunden.

### 📱 Social Media, Instagram Hub & Tracking
- **Bio-Landingpage (`/start`):** Schnelle, fokussierte Profilseite für Social-Media-Besucher mit 1-Klick-Links zu Ratgebern, Quiz und Erstgespräch.
- **Vanity-Redirects:** `/bio` und `/tipps` leiten nahtlos auf `/start`.
- **`UtmCleaner`:** Automatische optische Bereinigung der Adresszeile von `utm_*`-Parametern nach 600 ms bei voller Erfassung in Vercel Analytics & GA4.
- **Vercel Custom Events:** Tracking für Ratgeber-Klicks, Teilen-Aktionen und Quiz-Interaktionen.
- **Hashtag-Standard 2026:** Obergrenze von 3 bis maximal 5 hochrelevanten Tags in allen Content-Dokumenten implementiert.

### 💎 Design & Micro-UI
- **Neue 3D-Icon-Buttons:** Buttons mit dynamischem Gradient-Rahmen und Glascontainer für 3D-Icons eingeführt.
- **Tonalitäts-Harmonisierung:** Konsequente Durchsetzung von **„Persönlich mit Manu“** / **„persönlich mit mir“** auf allen Ebenen.

---

## [v0.4.0] – 2026-09-17 (Firmenflow 3D-Iconbibliothek & Consent-Härtung)
- **3D-Icon-Integration:** 60 optimierte 512px-PNG-Derivate integriert via `FirmenflowIcon` & `FlowscreenIcon`.
- **Consent-Gate:** Google Analytics lädt erst nach ausdrücklicher Einwilligung; Widerrufs-Button im Fließtext der Datenschutzerklärung eingebunden.

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
- **„Persönlich mit Manu“:**
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

# SEO-Aktionsplan für firmenflow.de

Stand: 31.08.2026

## P0 – sofort / heute

### 1. Crawling freigeben

**Problem:** `robots.txt` blockiert mit `Disallow: /` alle Crawler.  
**Ziel:** Google, Bing und gewünschte KI-Suchcrawler dürfen die Website lesen.

```txt
User-agent: *
Allow: /

Sitemap: https://www.firmenflow.de/sitemap.xml
```

**Abnahme:**

- `/robots.txt` liefert HTTP 200 und genau die freigegebene Produktionsregel.
- Google Search Console robots.txt-Test zeigt die 5 Sitemap-URLs als erlaubt.
- Sitemap in GSC und Bing Webmaster Tools einreichen.
- Homepage und beide Projektseiten per URL-Prüfung kontrollieren; Indexierung anstoßen.

### 2. Defekte WhatsApp-CTAs korrigieren

**Problem:** `whatsappUrl` ist im Live-Datenstand `null`; die sichtbaren Buttons versprechen einen nicht verfügbaren Kontaktweg.  
**Maßnahme:** Entweder korrekte `wa.me`-URL aus einer geschützten Konfiguration setzen oder alle WhatsApp-Buttons bis dahin entfernen. Telefonnummer nicht als Geheimnis behandeln, aber nicht in diesem Audit erfinden.

**Abnahme:** Jeder sichtbare WhatsApp-Button öffnet mobil und desktop dieselbe korrekte Zielnummer mit sinnvoller vorbefüllter Nachricht.

### 3. Lokale Identität klären

**Problem:** Marke/Angebot betonen Wesel, das Impressum nennt Pulheim.  
**Maßnahme:** Wahrheitsgemäß zwischen Geschäftssitz und Servicegebiet unterscheiden, zum Beispiel `Geschäftssitz Pulheim · persönliche Betreuung für Betriebe in Wesel und am Niederrhein`, falls das sachlich korrekt ist.

**Abnahme:** Homepage, Footer, Impressum, Schema, Google-Unternehmensprofil und Verzeichnisse widersprechen sich nicht.

### 4. Unbelegte Versprechen bereinigen

Betroffen sind unter anderem:

- `SEO-Rankings safe`
- `< 0.5s Turbo`
- `+140% lokale Aufrufe`
- `spürbar mehr Umsatz`
- `bestehende Rankings bleiben sicher erhalten`

**Maßnahme:** Mit Kunde, Ausgangswert, Messzeitraum und Datenquelle belegen oder vorsichtiger formulieren.

## P1 – innerhalb einer Woche

### 5. Canonicals setzen

Auf jeder indexierbaren Seite im initialen `<head>`:

```html
<link rel="canonical" href="https://www.firmenflow.de/EXAKTER-PFAD">
```

**Abnahme:** Canonical ist absolut, selbstreferenziell, entspricht Redirect-/Sitemap-Ziel und wird nicht durch JavaScript verändert.

### 6. Projektseiten reparieren

- Titles korrigieren:
  - `Eiscafé Orrico – Webdesign Case Study | Firmenflow`
  - `Autotransport Alex – Webdesign Case Study | Firmenflow`
- Projektkarten auf der Startseite intern verlinken.
- Externe Kundenseite erst auf der Case Study anbieten.
- Je Case Study mindestens: Ausgangslage, Ziel, Umfang, Vorgehen, Entscheidungen, Resultat, Datenquelle/Status, Bilder, CTA.

**Abnahme:** Jede Case Study hat mindestens 4–6 substanzielle Abschnitte, eigene Social-Metadaten, einen internen Eingang und Links zur passenden Leistung.

### 7. Schema-Grundlage ergänzen

Homepage:

- `Organization`
- `Person` für Manuel Landeck / Manu
- `WebSite`
- `WebPage`
- `Service`

Projektseiten:

- `BreadcrumbList`
- `CreativeWork` oder `Article` erst bei sichtbarem, substanziellen Bericht

**Abnahme:** Schema Markup Validator fehlerfrei; Google Rich Results Test ohne kritische Fehler; keine erfundenen Bewertungen, Adressen, Telefonnummern oder Qualifikationen.

### 8. FAQ und Überschriften-DOM korrigieren

- Alle FAQ-Antworten im initialen HTML/DOM ausgeben.
- Akkordeon nur visuell ein-/ausklappen.
- Doppelte H2-Texte aus Animationen semantisch deduplizieren; dekorative Textkopien `aria-hidden="true"` und außerhalb der Heading-Struktur.

### 9. Social-Metadaten je Seite

- individuelle `og:title`, `og:description`, `twitter:title`, `twitter:description`
- absolute `og:url`
- projektspezifisches 1200×630-Bild für Case Studies

## P2 – innerhalb eines Monats

### 10. Leistungsseiten aufbauen

Priorität:

1. Website erstellen lassen
2. Website-Relaunch
3. Google-Unternehmensprofil / lokale Sichtbarkeit

Jede Seite braucht Suchintention, Zielgruppe, Leistungsumfang, Ablauf, Preis-/Angebotslogik, Belege, passende Case Study, FAQ und CTA.

### 11. Hero-Suchbezug schärfen

Die emotionale Headline behalten, aber direkt sichtbar ergänzen:

> Persönliches Webdesign für lokale Betriebe in Wesel und am Niederrhein.

Keine erzwungene Keyword-Wiederholung; Klarheit vor Dichte.

### 12. Performance-Preloads reduzieren

- Nur `manu-hero.webp` als wahrscheinliches LCP-Bild priorisieren.
- `fetchpriority="high"` für das LCP-Bild.
- Story-, Projekt-, Porträt- und Footer-Bilder nicht preloaden.
- Unterhalb des Folds lazy laden.

**Abnahme:** Wiederholter mobiler Lighthouse-Test und anschließend echte 28-Tage-CrUX-/GSC-Daten; Ziel LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1 am 75. Perzentil.

### 13. Touch-Ziele verbessern

- mobiler Menübutton auf mindestens ca. 48×48 px Klickfläche
- Carousel-/Projektbuttons auf komfortable Ziele vergrößern
- Desktop-Punktnavigation mit unsichtbarer, aber echter größerer Klickfläche versehen

### 14. Rechtstexte fachlich prüfen

- `§ 5 TMG` gegen aktuelle DDG-Angabe prüfen
- `RStV`-Verweis prüfen
- Hinweis/Link zur eingestellten EU-OS-Plattform entfernen oder aktualisieren

Keine Rechtsberatung; Freigabe durch fachkundige Stelle.

## P3 – 30 bis 90 Tage

### 15. E-E-A-T und lokale Autorität

- echte freigegebene Kundenstimmen mit Projektbezug
- nachvollziehbare Qualifikationen, Arbeitsweise und Verantwortlichkeit
- regionale Partnerschaften, Kundenlinks, lokale Presse/Netzwerke
- konsistente Bing-Places- und Apple-Business-Connect-Profile
- GBP nur bei tatsächlicher Berechtigung und mit korrektem Servicegebiet

### 16. Content-Cluster

Erst nach technischer Freigabe und starken Leistungsseiten:

- Was kostet eine Website für einen lokalen Betrieb?
- Website-Relaunch ohne vermeidbare Rankingverluste
- Google-Unternehmensprofil für Betriebe am Niederrhein
- Welche Inhalte braucht eine Handwerker-Website?

Jeder Beitrag soll eigene Erfahrung, Beispiele, Quellen, Autor und Aktualisierungsdatum enthalten und auf eine passende Leistung verlinken.

### 17. GEO / KI-Suche

- zitierfähige 80–160-Wort-Antwortblöcke zu Kernfragen
- Case-Study-Tabellen mit Ausgangslage, Maßnahme, Zeitraum, Ergebnis und Quelle
- klare Organization-/Person-Entität
- optional `llms.txt` erst nach Crawling-Freigabe und Inhaltsausbau
- gewünschte Suchcrawler getrennt von Trainingscrawlern steuern

## Messplan

### Direkt nach Deployment

- robots.txt, Sitemap, Canonicals, Statuscodes und Schema erneut live prüfen
- alle primären CTAs anklicken
- mobile/desktop Screenshots vergleichen

### Nach 7 Tagen

- GSC URL Inspection für 5 Kern-URLs
- Sitemap-Status und Crawlfehler
- erste Brand- und Non-Brand-Impressionen

### Nach 28 Tagen

- GSC: Impressionen, Klicks, CTR, Position nach Seite und Suchanfrage
- CrUX/GSC: LCP, INP, CLS am 75. Perzentil
- GBP: Profilaufrufe, Anrufe, Websiteklicks, Routenanfragen, falls berechtigt
- Conversion: Formular, Telefon, E-Mail und WhatsApp separat messen

### Nach 90 Tagen

- Sichtbarkeit für `Webdesign Wesel`, `Webdesigner Wesel`, `Webdesign Niederrhein`
- Case-Study-Einstiege und unterstützte Conversions
- neue verweisende Domains und lokale Erwähnungen
- KI-/Brand-Abfragen mit dokumentierter Stichprobe

## Definition of Done

Der erste SEO-Release ist abgeschlossen, wenn:

- Crawling erlaubt und Sitemap referenziert ist.
- alle 5 Kernseiten korrekte Canonicals besitzen.
- Projektseiten intern verlinkt und substanziell ausgebaut sind.
- doppelte Titles und generische Social-Metadaten korrigiert sind.
- Organization-/Person-/Website-/Service-Schema validiert ist.
- WhatsApp bzw. alternative Direktkontakte funktionieren.
- Sitz und Servicegebiet konsistent erklärt sind.
- keine unbelegten absoluten Ranking-/Ergebnisversprechen übrig sind.
- eine erste GSC-Baseline und ein 28-Tage-CWV-Messplan existieren.

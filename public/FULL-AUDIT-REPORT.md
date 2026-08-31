# Vollständiger SEO-Audit: firmenflow.de

**Prüfdatum:** 31. August 2026  
**Ziel:** `https://www.firmenflow.de/`  
**Erkannter Seitentyp:** persönliche Webdesign-Marke / lokale Dienstleistung für Wesel, Niederrhein und NRW  
**Geprüfter Umfang:** alle 5 URLs der XML-Sitemap, Homepage in Mobil- und Desktop-Browser, HTTP-Header, Redirects, robots.txt, Sitemap, 404, Quelltext, Metadaten, Bilder, strukturierte Daten, lokaler Suchmarkt und Markenauffindbarkeit

## Executive Summary

### SEO Health Score: 47/100 – kritisch

| Kategorie | Gewicht | Score | Kurzurteil |
|---|---:|---:|---|
| Technisches SEO | 22 % | 35/100 | Starke Infrastruktur, aber vollständige Crawlersperre |
| Content-Qualität | 23 % | 58/100 | Gute persönliche Positionierung, zu wenig belastbare Belege |
| Onpage SEO | 20 % | 52/100 | Homepage solide, Projektseiten dünn und intern kaum erschlossen |
| Schema | 10 % | 0/100 | Auf keiner Seite vorhanden |
| Performance | 10 % | 75/100* | Browser-Labtest ordentlich; Felddaten fehlen |
| KI-Suchbereitschaft | 10 % | 35/100 | SSR positiv, Crawling und Zitierfähigkeit schwach |
| Bilder | 5 % | 82/100 | Gute Formate und Alt-Texte, zu viele Preloads |

\*Provisorisch. Die PageSpeed-API antwortete mit HTTP 429; GSC/CrUX-Felddaten waren nicht verfügbar.

**Wichtig:** Der gewichtete Score beschreibt die Qualität der einzelnen Bausteine. Die praktische organische Sichtbarkeit ist aktuell wesentlich schlechter, weil `robots.txt` als harter Gatekeeper alle Crawler blockiert.

### Die fünf wichtigsten Probleme

1. **Kritisch: Alle Suchmaschinen- und KI-Crawler werden ausgesperrt.** [robots.txt](https://www.firmenflow.de/robots.txt) liefert `User-Agent: *` und `Disallow: /`. Google dokumentiert genau diese Regel als vollständigen Block aller Crawler; eine `Sitemap:`-Zeile fehlt ebenfalls. [Google robots.txt-Dokumentation](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt)
2. **Keine Canonicals auf irgendeiner der fünf Seiten.** Die HTTPS-/www-Weiterleitung ist korrekt, aber selbstreferenzielle Canonicals fehlen. Google empfiehlt sie als klares, starkes Kanonisierungssignal. [Google Canonical-Dokumentation](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
3. **Projektseiten sind extrem dünn und faktisch verwaist.** Die individuellen Hauptinhalte umfassen nur ungefähr 80–90 Wörter. Die Startseite verlinkt die Projektkarten direkt auf externe Kundenseiten statt auf die eigenen Case Studies.
4. **Keine strukturierten Daten.** Weder JSON-LD noch Microdata oder Schema.org-RDFa wurden gefunden. Organisation, Person, Website, Leistungen und Projekt-Breadcrumbs sind für Suchmaschinen nicht explizit verbunden.
5. **Vertrauens- und Conversion-Lücken.** WhatsApp ist im gerenderten Datenmodell `null` bzw. nicht konfiguriert, eine Telefonnummer fehlt, der rechtliche Sitz Pulheim steht einer starken Wesel-Positionierung unklar gegenüber, und mehrere Ergebnis-/Rankingbehauptungen sind nicht belegt.

### Die fünf schnellsten Verbesserungen

1. robots.txt noch heute freigeben und Sitemap referenzieren.
2. WhatsApp korrekt konfigurieren oder sämtliche WhatsApp-Buttons vorübergehend entfernen.
3. Selbstreferenzielle Canonicals auf allen indexierbaren Seiten setzen.
4. Doppelte Projekt-Title-Suffixe entfernen und Projektkarten intern auf die Case Studies verlinken.
5. Nur das tatsächliche LCP-/Hero-Bild priorisieren; Preloads für Bilder unterhalb des Folds entfernen.

---

## 1. Crawlbarkeit und Indexierbarkeit

### Kritischer robots.txt-Fehler

Live-Inhalt:

```txt
User-Agent: *
Disallow: /
```

Das blockiert Googlebot, Bingbot, CCBot und die automatischen Suchcrawler von KI-Diensten. Die Sitemap existiert zwar unter [sitemap.xml](https://www.firmenflow.de/sitemap.xml), wird in robots.txt aber nicht angegeben.

Minimal sichere Produktionsfassung:

```txt
User-agent: *
Allow: /

Sitemap: https://www.firmenflow.de/sitemap.xml
```

Wenn Modelltraining bewusst ausgeschlossen werden soll, Such- und Nutzerzugriffe aber erlaubt bleiben sollen, sollten die jeweiligen Bot-Gruppen getrennt behandelt werden. Die genauen, aktuellen Tokens müssen vor Deployment aus den offiziellen Anbieter-Dokumentationen übernommen werden: [OpenAI Bots](https://platform.openai.com/docs/bots), [Anthropic Crawler](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler), [Perplexity Bots](https://docs.perplexity.ai/guides/bots).

### Index-Signale

- Eine aktuelle `site:firmenflow.de`-Websuche lieferte keine Firmenflow-Seite. Das ist ein Warnsignal, aber kein vollständiger Ersatz für die Google Search Console.
- Der aktuelle Common-Crawl-Index `CC-MAIN-2026-34` meldete für `firmenflow.de/*`: `No Captures found`.
- Die Markenabfrage „Firmenflow Wesel“ wurde von Treffern zur gleichnamigen Ideal-Standard-Armaturen-Technik dominiert. Dadurch besteht zusätzlich ein Entity-Disambiguierungsproblem.
- Ohne GSC-URL-Prüfung kann nicht endgültig bestätigt werden, welche URLs bereits indexiert, ausgeschlossen oder nur bekannt sind.

### Sitemap

Die XML-Datei ist syntaktisch valide und enthält 5 URLs:

- `/`
- `/impressum`
- `/datenschutz`
- `/projekte/eiscafe-orrico`
- `/projekte/autotransport-alex`

Alle Einträge tragen denselben `lastmod`-Zeitpunkt. Das wirkt wie ein Build-Zeitstempel, nicht wie eine seitenbezogene Inhaltsänderung. Besser: `lastmod` nur ändern, wenn sich der relevante Seiteninhalt wirklich geändert hat.

### Canonicals

Auf keiner geprüften Seite wurde `<link rel="canonical">` gefunden. Empfohlen sind absolute, selbstreferenzielle URLs, zum Beispiel:

```html
<link rel="canonical" href="https://www.firmenflow.de/">
```

### Redirects und 404

Positiv:

- `https://firmenflow.de/` leitet permanent auf `https://www.firmenflow.de/` weiter.
- `http://firmenflow.de/` benötigt zwei 308-Hops: HTTP → HTTPS ohne www → HTTPS mit www. Funktional korrekt; ein direkter Hop wäre sauberer.
- URLs mit abschließendem Slash werden permanent auf die Variante ohne Slash normalisiert.
- Eine zufällige nicht vorhandene URL liefert einen echten HTTP-404-Status, keinen Soft-404.

## 2. Technische Auslieferung und Sicherheit

### Positiv verifiziert

- HTTPS ist erzwungen.
- HSTS: `max-age=63072000; includeSubDomains; preload`.
- `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy` und `Permissions-Policy` sind vorhanden.
- Vercel liefert die Seiten als vorgerendertes Next.js-HTML aus (`X-Nextjs-Prerender: 1`).
- Normaler Browser- und Googlebot-Abruf hatten identische HTML-Größe; kein verdächtiges Cloaking oder abweichendes Prerendering.
- Kritischer Text, Titel, H1 und Meta-Description stehen im initialen HTML und hängen nicht von Client-JavaScript ab.

### Verbesserbar

- Die CSP erlaubt bei Scripts sowohl `'unsafe-inline'` als auch `'unsafe-eval'`. Das ist primär ein Security-Hardening-Thema, kein direkter SEO-Fehler.
- `Access-Control-Allow-Origin: *` wird auch auf HTML-Antworten gesetzt; prüfen, ob diese Freigabe wirklich benötigt wird.
- Eine IndexNow-Implementierung wurde nicht erkannt. Für die kleine Website ist das optional und deutlich nachrangig gegenüber robots.txt und Search Console.

## 3. Onpage SEO

### Startseite

Positiv:

- Title: `Firmenflow – Webdesign direkt mit Manu | Wesel & Niederrhein` – 60 Zeichen, passend zur lokalen kommerziellen Suchintention.
- Meta-Description: 160 Zeichen, inhaltlich klar, aber am oberen Snippet-Limit.
- Genau ein H1: `Mehr Lokalpräsenz. Weniger Agenturtheater.`
- Rund 1.690 sichtbare Wörter im Parser; genügend Substanz für eine Homepage.
- Vollständige Open-Graph- und Twitter-Bildangaben; OG-Bild 1200 × 630, ca. 55 KB.

Probleme:

- Das H1 nennt weder `Webdesign` noch `Wesel`; der Suchbezug kommt erst über Title, Fließtext und Unterzeile. Die emotionale Headline kann bleiben, sollte aber direkt mit einer klaren semantischen Aussage wie `Webdesign für lokale Betriebe in Wesel und am Niederrhein` verbunden werden.
- Zwei H2 werden im DOM textlich doppelt ausgegeben, vermutlich durch einen Animationseffekt. Der zugängliche Überschriftentext sollte nur einmal vorhanden sein.
- Die FAQ enthält im initialen HTML nur die erste Antwort; weitere Fragen erscheinen ohne Antworttext. Sämtliche Antworten sollten dauerhaft im DOM stehen, auch wenn das Akkordeon optisch geschlossen ist.

### Projektseiten

| URL | Titel | Wörter im Haupt-/Seiteninhalt | Hauptproblem |
|---|---|---:|---|
| `/projekte/eiscafe-orrico` | `Eiscafé Orrico – Webdesign Projekt | Firmenflow | Firmenflow` | ca. 85 | dünn, Brand doppelt, keine Belege |
| `/projekte/autotransport-alex` | `Autotransport Alex – Webdesign Projekt | Firmenflow | Firmenflow` | ca. 82 | dünn, Brand doppelt, keine Belege |

Es fehlen Ausgangslage, Ziel, Umfang, eigene Rolle, Vorgehen, Design-/Technikentscheidungen, Vorher/Nachher, Resultate mit Zeitraum und Quelle, Kundenstimme und Projektstatus. Google empfiehlt Inhalte, die echte Erfahrung zeigen und das Thema substanziell behandeln. [People-first Content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

Empfohlener Case-Study-Aufbau:

1. Kunde, Branche, Region und Projektstatus
2. Ausgangslage und konkretes Problem
3. Ziele und vereinbarter Leistungsumfang
4. Vorgehen, wichtige Entscheidungen und eigene Rolle
5. Vorher/Nachher mit freigegebenem Bildmaterial
6. Ergebnis mit Messzeitraum und Datenquelle – oder transparent `noch keine belastbaren Daten`
7. Kundenstimme mit Einwilligung
8. CTA zur passenden Leistung

### Interne Verlinkung

Die Startseite verlinkt die sichtbaren Projektkarten direkt auf externe Kundendomains. Die beiden internen Projektseiten erscheinen nur in der Sitemap und sind damit im normalen Linkgraphen faktisch verwaist. Besser:

- Projektkarte → interne Case Study
- Innerhalb der Case Study → `Live-Website ansehen`
- Case Study → passende Leistungsseite
- Leistungsseite → relevante Case Studies

### Social-Metadaten

Alle Unterseiten übernehmen denselben OG-/Twitter-Titel und dieselbe Beschreibung der Homepage; `og:url` fehlt. Damit erzeugen Projekt- und Rechteseiten beim Teilen unpassende Vorschauen. Jede inhaltliche Seite sollte eigene Social-Metadaten und eine absolute `og:url` erhalten.

## 4. Content, E-E-A-T und Vertrauen

### Stärken

- Manu ist als konkrete Person mit mehreren eigenen Fotos sichtbar.
- Der Ablauf ist in nachvollziehbaren Phasen beschrieben.
- Tonalität, Zielgruppe und Leistungsversprechen sind konsistent.
- Impressum und Datenschutz sind erreichbar.
- Projekte und regionale Ausrichtung zeigen grundsätzlich echte Erfahrung.

### Schwächen

- Keine echten Kundenstimmen, Fachquellen, Mitgliedschaften, Presseerwähnungen oder verifizierbaren Qualifikationen.
- Die Projektseiten dokumentieren die behauptete Erfahrung nicht.
- Aussagen wie `SEO-Rankings safe`, `< 0.5s Turbo`, `+140% lokale Aufrufe`, `spürbar mehr Umsatz vor Ort` oder `regelmäßige Anfragen über Google` brauchen Kunde, Ausgangswert, Messzeitraum und Quelle – oder müssen vorsichtiger formuliert werden.
- `bestehende Google-Rankings bleiben sicher erhalten` ist als absolute Zusage nicht haltbar. Besser: `Wir sichern URLs, Weiterleitungen und wichtige SEO-Signale, um vermeidbare Sichtbarkeitsverluste zu reduzieren.`
- Der sichtbare Marken-/Servicefokus Wesel steht dem im Impressum genannten Geschäftssitz `Küferweg 2a, 50259 Pulheim` ohne Erklärung gegenüber. Wenn Wesel das Servicegebiet und Pulheim der Sitz ist, sollte das überall explizit so formuliert werden.
- WhatsApp-CTAs sind sichtbar, aber der Serverdatenstand enthält `whatsappUrl: null`; ein nicht funktionierender primärer Kontaktweg kostet Vertrauen und Anfragen.
- Eine Telefonnummer fehlt.

### Rechtliche Aktualität als Vertrauenssignal

Im Impressum wurden noch Verweise auf `§ 5 TMG`, `§ 55 Abs. 2 RStV` und die EU-OS-Plattform gefunden. Das aktuelle DDG enthält die allgemeinen Informationspflichten in [§ 5 DDG](https://www.gesetze-im-internet.de/ddg/__5.html). Die EU-Kommission bestätigt, dass die ODR-/OS-Plattform seit 20. Juli 2025 eingestellt ist. [EU-Kommission](https://consumer-redress.ec.europa.eu/site-relocation_en)

Das ist keine Rechtsberatung. Der Text sollte fachlich/rechtlich geprüft und aktualisiert werden.

## 5. Strukturierte Daten

Auf allen 5 Seiten wurden **0 Schema-Blöcke** gefunden. Open-Graph-Metadaten sind vorhanden, ersetzen Schema.org aber nicht. Google erläutert, dass strukturierte Daten den Seiteninhalt explizit beschreiben und für unterstützte Suchdarstellungen nutzbar machen können. [Google Structured Data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)

Empfohlene Reihenfolge:

1. Homepage: `Organization`, `Person`, `WebSite`, `WebPage`, `Service`
2. Case Studies: `BreadcrumbList`; `CreativeWork` oder `Article` erst bei echtem, sichtbarem Projektbericht
3. Keine erfundenen `Review`-/`AggregateRating`-Werte
4. Kein `HowTo`
5. `FAQPage` nicht für einen erwarteten Google-Rich-Result-Vorteil einbauen; bei kommerziellen Seiten ist dieser stark eingeschränkt. Sichtbare FAQs bleiben unabhängig davon nützlich.

Vor Veröffentlichung: Schema Markup Validator und Google Rich Results Test verwenden.

## 6. Performance und Core Web Vitals

### Datenlage

- Google PageSpeed Insights API: HTTP 429 / Tagesquote nicht verfügbar.
- Kein API-Key für PageSpeed/CrUX und kein GSC-/GA4-Zugang.
- Deshalb keine verifizierten 75.-Perzentil-Felddaten und kein belastbarer INP-Wert.
- Google bewertet als gute Schwellen LCP ≤ 2,5 s, INP ≤ 200 ms und CLS ≤ 0,1 am 75. Perzentil. Labordaten ersetzen Felddaten nicht. [Web Vitals](https://web.dev/articles/vitals)

### Eigener Browser-Labtest

| Messung | Mobil | Desktop |
|---|---:|---:|
| HTTP-Status | 200 | 200 |
| Initiale Requests | 35 | 35 |
| Übertragene Ressourcen | ca. 718 KB | ca. 728 KB |
| Warm-Lab TTFB | 56 ms | 49 ms |
| Warm-Lab LCP | ca. 0,27 s | ca. 0,31 s |
| Warm-Lab CLS | 0,00 | ca. 0,05 |
| INP | nicht messbar | nicht messbar |

Ein erster kalter mobiler Lauf lag dagegen bei ca. 2,86 s TTFB und 3,29 s LCP. Diese Spannweite zeigt, warum echte CrUX-/RUM-Daten benötigt werden. Die warmen Werte sind positiv, dürfen aber nicht als reales Nutzerergebnis beworben werden.

### Performance-Hebel

- Die Startseite preloaded 9 Bilder gleichzeitig. Darunter befinden sich Story-, Projekt-, Porträt- und Footer-Bilder weit unterhalb des Folds.
- Nur das wahrscheinliche LCP-Bild `manu-hero.webp` sollte priorisiert und mit `fetchpriority="high"` versehen werden.
- Bilder unterhalb des Folds lazy laden und deren Preload entfernen.
- Origin-Dateigrößen der Stichprobe sind gut: Hero ca. 144 KB, Story-Bild ca. 65 KB, Projektbild ca. 61 KB; Next Image liefert responsive Varianten und AVIF an geeignete Browser.
- Vercel Speed Insights ist eingebunden. Falls Einwilligung und Datenschutz sauber gelöst sind, sollten echte CWV-Werte dort oder über eigenes RUM beobachtet werden.

## 7. Mobile und visuelle Prüfung

Positiv:

- H1 und beide Haupt-CTAs sind auf 390 × 844 px ohne Scrollen sichtbar.
- Kein horizontaler Overflow auf Mobil oder Desktop.
- Lesbare Hierarchie, starker persönlicher Hero, klare Handlungsoptionen.
- Desktop und Mobil rendern ohne sichtbare Layoutbrüche.

Verbesserbar:

- Der mobile Menübutton misst ungefähr 40 × 36 px und liegt unter der empfohlenen komfortablen Zielgröße von etwa 48 × 48 px.
- Mehrere Carousel-/Projektsteuerungen liegen bei 20–44 px.
- Die sehr kleinen Desktop-Punktnavigationselemente sind nur 8–10 px breit und als echte Buttons schwer bedienbar. Mindestens die unsichtbare Klickfläche sollte vergrößert werden.
- Viele Textelemente nutzen weniger als 16 px. Das ist nicht automatisch unzulässig, sollte aber auf Kontrast und Lesbarkeit geprüft werden.

Screenshots:

- [Mobil – Above the Fold](screenshots/firmenflow-mobile-above-fold.png)
- [Desktop – Above the Fold](screenshots/firmenflow-desktop-above-fold.png)
- [Mobil – Ganzseite](screenshots/firmenflow-mobile-full.png)
- [Desktop – Ganzseite](screenshots/firmenflow-desktop-full.png)

## 8. Bild-SEO

Positiv:

- 24 Bild-Elemente auf der Homepage, siteweit 32 Vorkommen.
- Kein fehlendes Alt-Attribut gefunden.
- Aussagekräftige Alt-Texte bei Story- und Personenbildern.
- Verständliche, kleingeschriebene Dateinamen.
- WebP-Quellen, responsive `srcset`/`sizes` und AVIF-Auslieferung über Next Image.
- OG-Bild korrekt dimensioniert und vollständig beschrieben.

Verbesserbar:

- Wiederholte dekorative Marken-Icons mit `alt="Firmenflow"` erzeugen redundanten Screenreader-Text. Dekorative Instanzen sollten `alt=""` und gegebenenfalls `aria-hidden="true"` verwenden.
- Nur ein Bild hat direkte width-/height-Attribute. Next-`fill` ist okay, wenn der Elterncontainer zuverlässig Platz reserviert. Der Labtest zeigte kein kritisches CLS, dennoch alle Wrapper prüfen.
- Projekt-Alt-Texte sollten den tatsächlichen Bildinhalt beschreiben, nicht nur den Projektnamen.
- Optional eine Image-Sitemap-Erweiterung verwenden, wenn Google Images strategisch relevant wird. [Google Bild-SEO](https://developers.google.com/search/docs/appearance/google-images)

## 9. Local SEO

### Local SEO Score: 21/100

| Dimension | Score |
|---|---:|
| Google-Unternehmensprofil-Signale | 3/25 |
| Bewertungen/Reputation | 1/20 |
| Lokales Onpage SEO | 12/20 |
| NAP/Citations | 3/15 |
| Lokales Schema | 0/10 |
| Lokale Autorität/Links | 2/10 |

Vermuteter Typ: **Service Area Business**, nicht abschließend bestätigt.

Verifiziert:

- Klare Ausrichtung auf Wesel/Niederrhein im Title und Inhalt.
- Genannt werden Wesel, Dinslaken, Voerde, Moers, NRW und Deutschland.
- Rechtlicher Sitz im Impressum: Pulheim.
- E-Mail vorhanden, aber keine Telefonnummer, Öffnungszeiten, Karte oder einheitlich erklärte Standort-/Servicegebietslogik.
- Keine öffentlich eindeutig auffindbaren Bewertungen oder unabhängigen Markennachweise in der Stichprobe.

Offen, weil kein GBP-/GSC-/Maps-Zugriff vorhanden war:

- Existenz und Berechtigung eines Google-Unternehmensprofils
- Kategorien, Servicegebiet, Bewertungen, Aktualität und Antworten
- Local-Pack-Positionen und Geo-Grid
- NAP-Konsistenz in Verzeichnissen

Empfehlung: Ein Google-Unternehmensprofil nur entsprechend den tatsächlichen Berechtigungskriterien und realen Kundenkontakten führen. Website, GBP, Bing Places und Apple Business Connect müssen dieselben Kernangaben verwenden.

## 10. SXO und Wettbewerbsvergleich

### SXO-Score: 53/100

Primär untersuchte Suchintention: `Webdesign Wesel` / `Webdesigner Wesel`.

Die aktuelle SERP-Stichprobe wurde von lokalen kommerziellen Service-/Agenturseiten dominiert, unter anderem [Webdesign Tepaß](https://www.webdesign-tepass.de/), [WT Webdesign Tillmann](https://webdesigntillmann.de/), [CommuniBIT](https://www.communibit.com/), [WebGen](https://web-gen.de/) und [Webdesigner Kleve](https://webdesigner-kleve.de/). Wiederkehrende Erwartungen:

- klarer Orts- und Leistungsbezug
- konkrete Zielgruppen
- Leistungen als eigene Seiten oder klar getrennte Bereiche
- Preisrahmen oder Angebotslogik
- Referenzen, Projektzahlen, Bewertungen oder Kundenstimmen
- direkte Kontaktoption

Firmenflow hat den richtigen Seitentyp und eine stärkere persönliche Gestaltung als viele Wettbewerber, fällt aber bei Preisorientierung, Referenzbelegen, Kundenstimmen, lokaler Identität und funktionierendem Direktkontakt zurück.

### Persona-Scores

| Persona | Score | Größte Lücke |
|---|---:|---|
| Lokaler Betrieb mit neuer Website | 68/100 | Vertrauen und konkrete Referenzen |
| Preisbewusster Entscheider | 54/100 | kein Preisrahmen trotz Preissicherheitsversprechen |
| Referenz- und Vertrauensprüfer | 55/100 | kaum belegte Case-Study-Daten |
| Relaunch-Kunde mit Ranking-Sorge | 57/100 | absolute SEO-Sicherheit statt nachvollziehbarem Migrationsprozess |

## 11. GEO / KI-Suchbereitschaft

### Heuristischer Score: 35/100

Positiv:

- Vollständiger serverseitiger Inhalt
- klare H1/H2/H3-Struktur
- FAQ-Fragen und Prozessschritte
- eindeutige Person-/Markenzuordnung im sichtbaren Text

Negativ:

- Crawlersperre
- keine strukturierten Daten
- keine Quellen, Autoren-/Aktualisierungsdaten oder belegten First-Party-Zahlen
- sehr kurze Marketingabsätze statt zitierfähiger Fachpassagen
- dünne Case Studies
- keine Aufnahme im aktuellen Common-Crawl-Snapshot
- `/llms.txt` liefert 404

`llms.txt` ist optional und kein bestätigter Google-Rankingfaktor. Es sollte erst nach der Crawling-Freigabe, guten Case Studies und klarer Entity-Struktur umgesetzt werden. Googles aktuelle Empfehlung für klassische und generative Suche bleibt einzigartiger, hilfreicher, belastbarer Inhalt. [Google AI Search Guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)

## 12. Empfohlene Informationsarchitektur

```text
/
├── leistungen/
│   ├── website-erstellen-lassen/
│   ├── website-relaunch/
│   └── google-unternehmensprofil/
├── webdesign-wesel/
├── projekte/
│   ├── eiscafe-orrico/
│   └── autotransport-alex/
├── ueber-manu/
└── kontakt/
```

Entscheidung: Entweder die Homepage wird die zentrale Seite für `Webdesign Wesel`, oder sie bleibt Marken-/Übersichtsseite und verlinkt eine eigenständige starke lokale Landingpage. Keine fast identischen Seiten für jede Keyword-Variante.

Weitere Ortsseiten für Dinslaken, Voerde oder Moers erst erstellen, wenn echte ortsspezifische Belege vorliegen: lokale Projekte, Testimonials, Betreuungsmodell, Bilder und FAQs. Reine Stadtnamen-Tauschseiten vermeiden.

## 13. Mess- und Zugriffsgrenzen

- robots.txt blockiert den normalen automatischen Crawl; für diesen Eigentümer-Audit wurden die 5 öffentlich in der Sitemap genannten URLs einzeln diagnostisch abgerufen.
- Kein Zugriff auf Google Search Console, GA4, Google-Unternehmensprofil oder Vercel-Projektmetriken.
- Keine Moz-/Bing-/DataForSEO-Backlinkdaten; Common Crawl lieferte keine aktuelle Erfassung.
- PageSpeed Insights API war wegen Quote nicht verfügbar; Performance ist daher nur als Browser-Labmessung bewertet.
- Kein neutraler, standortgenauer Google-DE-SERP-Datensatz; Suchmarkt-Analyse basiert auf aktuellen Web-Suchergebnissen.
- `site:`-Abfragen sind Indikatoren, keine vollständige Indexprüfung.
- Keine Rechtsberatung; rechtliche Hinweise dienen nur als Aktualitäts-/Vertrauenssignal.

## Gesamturteil

Firmenflow hat eine starke visuelle und persönliche Grundlage, gute technische Auslieferung und eine klare Zielgruppe. Die Website scheitert momentan nicht an Design oder Textmenge, sondern an Auffindbarkeit und Belegbarkeit: Der vollständige robots.txt-Block macht organische Sichtbarkeit praktisch unmöglich; danach folgen dünne/verwaiste Case Studies, fehlende Canonicals und Schema-Daten, unklare lokale Identität sowie schwache externe Vertrauenssignale.

Die richtige Reihenfolge ist zwingend: **Crawling freigeben → Kontakt und lokale Identität korrigieren → Canonicals/Schema/Linkgraph reparieren → Case Studies und Leistungsseiten ausbauen → danach Autorität, Local SEO und Content-Cluster skalieren.**

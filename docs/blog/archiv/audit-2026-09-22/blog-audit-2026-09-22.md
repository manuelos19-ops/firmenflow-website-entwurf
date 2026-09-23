# Blog-Audit Firmenflow Ratgeber

**Datum:** 22. September 2026
**Geprüfter Ordner:** `content/ratgeber`
**Artikel:** 3 (davon 2 live, 1 unveröffentlicht)
**Durchschnitt:** 94,7 / 100

## Überblick

| Kennzahl | Anzahl |
|---|---|
| Artikel 90+ (exzellent) | 3 |
| Artikel 70–89 (gut) | 0 |
| Artikel 50–69 (nachbessern) | 0 |
| Artikel unter 50 | 0 |
| Verwaiste Seiten (keine eingehenden Links) | 1 |
| Sackgassen (keine ausgehenden Links) | 0 |
| Keyword-Überschneidungen | 1 (beobachten) |
| Veraltete Inhalte | 0 |
| Fehlende Beitragsbilder | 1 |

## Bewertung je Artikel

| Artikel | Gesamt | Inhalt /30 | SEO /25 | E-E-A-T /15 | Technik /15 | KI-Zitierbarkeit /15 |
|---|---|---|---|---|---|---|
| google-maps-nicht-gefunden | 98 | 29 | 25 | 14 | 15 | 15 |
| website-fehler-lokale-betriebe | 94 | 25 | 25 | 14 | 15 | 15 |
| azubis-finden-handwerk (Entwurf) | 92 | 28 | 24 | 14 | 11 | 15 |

## Messwerte

| Artikel | Wörter | Lesbarkeit (Amstad) | H2/H3 | Interne Links | Externe | Quellen | Grafiken | Bild |
|---|---|---|---|---|---|---|---|---|
| azubis-finden-handwerk | 1.018 | 64,4 | 8/0 | 3 | 3 | 3 | 3 | fehlt |
| google-maps-nicht-gefunden | 1.638 | 58,1 | 8/5 | 3 | 4 | 5 | 2 | vorhanden |
| website-fehler-lokale-betriebe | 1.103 | 59,1 | 7/0 | 4 | 4 | 4 | 2 | vorhanden |

Meta-Titel liegen bei 53, 57 und 60 Zeichen, Meta-Descriptions bei 153 bis 157. Alle unter den Kürzungsgrenzen. Keine Gedankenstriche in allen drei Artikeln.

## Maßnahmen nach Dringlichkeit

| # | Artikel | Befund | Maßnahme |
|---|---|---|---|
| 1 | azubis-finden-handwerk | Kein Beitragsbild, dadurch auch kein `og:image` | Bild anlegen unter `public/images/ratgeber/azubis-finden-handwerk.webp`, `image:` ins Frontmatter. Alt-Text steht schon |
| 2 | azubis-finden-handwerk | Verwaist: null eingehende interne Links | Nach Veröffentlichung aus beiden bestehenden Artikeln verlinken. Anknüpfpunkte: Fehler 3 (echte Fotos) in Artikel 1, Grund 4 (Fotos im Profil) in Artikel 2 |
| 3 | website-fehler-lokale-betriebe | Keine Kurzfassung am Anfang | „Kurz gesagt" mit drei Zeilen ergänzen, wie in den anderen beiden |
| 4 | azubis-finden-handwerk | 8 H2, keine H3 | Die drei Fälle unter „Was ein Bewerber macht" von fetten Absätzen zu H3 machen |
| 5 | alle drei | Autorenangabe ohne Kurzbiografie auf der Seite | Zwei Sätze zu Manus Hintergrund unter den Artikel, das ist der einzige verbliebene E-E-A-T-Abzug |

## Keyword-Überschneidung

| Thema | Betroffene Artikel | Bewertung |
|---|---|---|
| Google Maps / Unternehmensprofil | website-fehler-lokale-betriebe (Fehler 4), google-maps-nicht-gefunden (ganzer Artikel) | Unterschiedliche Suchabsicht: der eine behandelt die Website, der andere das Profil. Bereits gegenseitig verlinkt. Beobachten, kein Zusammenlegen |

## Verlinkung

| Artikel | Eingehend | Ausgehend |
|---|---|---|
| azubis-finden-handwerk | keine | google-maps-nicht-gefunden, website-fehler-lokale-betriebe |
| google-maps-nicht-gefunden | azubis, website-fehler | website-fehler |
| website-fehler-lokale-betriebe | azubis, google-maps | google-maps |

## Aktualität

| Artikel | Stand | Tage | Dringlichkeit |
|---|---|---|---|
| azubis-finden-handwerk | 22.09.2026 | 0 | keine |
| google-maps-nicht-gefunden | 22.09.2026 | 0 | keine |
| website-fehler-lokale-betriebe | 19.09.2026 | 3 | keine |

Wiedervorlage ergibt sich aus den Quellen, nicht aus dem Kalender: Die Ausbildungsmarktbilanz der Bundesagentur erscheint jährlich Ende Oktober, die JIM-Studie im November, der Berufsbildungsbericht im Frühjahr. Die eigene Wesel-Erhebung lässt sich jederzeit wiederholen und wäre als Jahresvergleich mehr wert als die Einzelmessung.

## Technik und Crawler

| Prüfung | Ergebnis |
|---|---|
| robots.txt | Erlaubt ausdrücklich GPTBot, ClaudeBot, PerplexityBot, ChatGPT-User, Google-Extended, Applebot-Extended |
| Sitemap | Enthält beide veröffentlichten Artikel mit korrektem `lastmod` |
| Schema | Alle Artikel liefern BlogPosting, Person, Organization und BreadcrumbList |
| Rendering | Serverseitig, Inhalte und Tabellen stehen im ausgelieferten HTML |
| Ladezeit | Mobil gemessen am 22.09.2026: LCP 1,9 s, Performance 99/100 |

## Nicht geprüft

Search Console und GA4 sind nicht angebunden, daher keine Aussagen zu Indexierung, Impressionen, Klickraten oder Content-Decay. Core Web Vitals liegen nur als Labormessung vor, für Felddaten aus CrUX fehlt der Seite noch der Traffic.

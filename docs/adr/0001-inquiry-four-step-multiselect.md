# ADR 0001: Anfrage-Formular – 4 Schritte mit kombinierbaren Leistungen

Status: vorgeschlagen (18.09.2026)

## Kontext

Das Kontaktformular `/anfrage` zwingt über `projectType: "new-site" | "relaunch" | "google-business"`
zu einer Einzelauswahl. Website und Lokalpräsenz 360° sind aber kombinierbare Leistungen.
Zudem: 5 Schritte für wenig Inhalt, native Browser-Validierung feuert auf versteckte
`required`-Felder (Enter-Taste, „Fülle dieses Feld aus“ auf Schritt 4→5 reproduzierbar),
Telefonnummer wird trotz pflichtabhängigem Kontaktweg statisch „optional“ gelabelt,
Prozentanzeige zeigt 100 % vor dem Absenden.

## Entscheidung

1. **Datenmodell:** `projectType` wird ersetzt durch
   - `services: ("website" | "lokalpraesenz")[]` (min. 1)
   - `websiteScope: "new" | "relaunch" | "unsure"` (nur relevant, wenn `services` „website“ enthält)
   - `goals` wird konditional je gewählter Leistung validiert (zwei Zielsätze)
   - `photoVideo` wandert aus `goals` in ein separates optionales „Unterstützung“-Feld
2. **Abfolge (4 Schritte):** Leistungen (+ Bedarfs-Nachfrage) → Ziele (konditional) →
   Betrieb + Zeitrahmen → Kontakt (Weg zuerst, Pflichtfelder konditional, Zusammenfassung).
3. **Validierung:** `noValidate` auf dem Formular; einzig gültige Instanz ist die eigene
   `validateCurrentStep`-Logik + Zod (`inquirySchema`). Keine nativen
   Browser-Constraint-Meldungen mehr auf versteckten Feldern.
4. **Kompatibilität:** URL-Preselect `?type=new-site|relaunch|google-business` wird gemappt
   (new-site → services[website], websiteScope new; relaunch analog; google-business →
   services[lokalpraesenz]). `sessionStorage`-Drafts im alten Format werden beim Restore gemappt.
5. **Unsicher-Fall:** kein drittes Auswahl-Karte-Element, sondern Textlink unterhalb der
   Karten; markiert Anfrage als Beratungswunsch (beide Leistungen unausgewählt → Ziel: Empfehlung).
6. **Progress:** „Schritt X von 4“ ohne Prozentbalken-100 %-Problem.

## Konsequenzen

- `email.ts`/`route.ts` müssen das neue Format auflösen (alte Mails mit projectType sind
  historisch, kein Rollback nötig).
- Ziele-Metriken (GA-Tracking `track-inquiry`) sind vor/nach dem Umbau nicht 1:1 vergleichbar.
- „Ca. 2 Minuten“-Angabe erst nach echtem Ausfülltest ergänzen; 24-h-Versprechen vorab
  auf reale Erreichbarkeit prüfen.

## Glossar (Auszug)

- **Leistung (service):** website | lokalpraesenz – kombinierbar, Grundlage aller Folgefragen.
- **websiteScope:** Zustand der Website-Anfrage (neu / Relaunch / unsicher), separat von der Leistung.
- **Zielsatz:** konditionale Auswahlliste in Schritt 2; abhängig von gewählten Leistungen.
- **Rückweg (preferredContact):** email | phone | whatsapp; bestimmt, welche Kontaktdaten pflichtig sind.

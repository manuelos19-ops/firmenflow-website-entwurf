export const homeContent = {
  hero: {
    eyebrow: "Webdesign & Lokalpräsenz aus Wesel",
    title: ["Mehr Lokalpräsenz.", "Weniger Agenturtheater."],
    accent: "Deine Website. Persönlich mit Manu.",
    body: "Wer am Niederrhein sucht, entscheidet bei Google. Ich baue deine Website, fotografiere bei dir vor Ort und bringe dein Google-Profil in Ordnung – damit dein Betrieb online so gut aussieht, wie er arbeitet.",
    primaryCta: "WhatsApp an Manu",
    secondaryCta: "Lass uns sprechen",
  },
  problem: {
    eyebrow: "Die Realität vor Ort",
    title: "Deine Stammkunden kennen deine Arbeit. Alle anderen sehen nur, was Google zeigt.",
    body: "Wer dich noch nicht kennt, sucht am Smartphone. Findet er dich nicht – oder landet auf einer Seite, die aussieht wie von 2015 – wischt er mit dem Daumen weiter zur Konkurrenz. Du merkst davon nichts. Das ist das Tückische daran.",
  },
  services: [
    {
      slug: "neue-website",
      title: "Neue Website von Grund auf",
      body: "Vom leeren Bildschirm bis zur fertigen Seite: Struktur, Texte, Bilder, Technik. Du schaust dir den Entwurf an und sagst, was du anders willst. Wenn es passt, geht sie live.",
      points: ["Kein Text-Stress für dich", "Kein Baukasten-Look", "Schnell auf dem Handy", "Transparenter Festpreis"],
    },
    {
      slug: "relaunch",
      title: "Bestehende Website modernisieren",
      body: "Alte Seite entrümpeln, ohne die gewachsene Google-Sichtbarkeit zu verlieren. Ich übernehme deine bewährten Inhalte, ordne Struktur und Design neu und richte saubere Weiterleitungen ein – damit niemand auf einer Fehlerseite landet.",
      points: ["Bestandsanalyse & Relaunch", "Google-Sichtbarkeit schützen", "Neue, klare Struktur", "Schlüsselfertig in deinem Tempo"],
    },
    {
      slug: "foto-video",
      title: "Foto- & Videoaufnahmen vor Ort",
      body: "Echte Gesichter, echte Handgriffe, deine Räume. Keine Stockfotos mit lächelnden Models, die noch nie einen Betrieb von innen gesehen haben. Ich komme mit Kamera zu dir und fotografiere, wie es bei dir wirklich aussieht.",
      points: ["Team- & Mitarbeiter-Shootings", "Räumlichkeiten & Atmosphäre", "Kurzer Imagefilm & Video-Reels", "Direkt bei dir vor Ort"],
    },
  ],
  direct: {
    eyebrow: "Persönlich mit Manu",
    title: "Ein Partner auf Augenhöhe. Vom Unternehmer für Unternehmer.",
    body: "Ich kenne den Alltag von Selbstständigen: Rechnungen schreiben, Verantwortung tragen und den Betrieb am Laufen halten. Deshalb rede ich nicht im Agentur-Jargon, sondern in klaren Fakten: Was bringt deinem Betrieb echte Anfragen? Wo sparen wir uns überflüssigen Schnickschnack? Du hast meine direkte Handynummer und das Versprechen, dass dein Projekt Chefsache bleibt.",
    points: ["Persönlich erreichbar", "Feste Absprachen", "Ehrliche Beratung", "Vor Ort am Niederrhein"],
  },
  pilot: {
    eyebrow: "Lokalpräsenz 360°",
    // Die Ueberschrift steht bewusst in GoogleBusinessPilot.tsx, weil sie fuer
    // den Tinten-Effekt dreifach gerendert wird. Hier kein title-Feld anlegen -
    // es wuerde nicht ausgespielt.
    body: "Wer dich bei Google Maps sucht, sieht zuerst Sterne, Fotos und die letzte Bewertung. Steht da nichts – oder etwas von 2022 – nützt die beste Website wenig. Ich kümmere mich darum, laufend, für 99 Euro im Monat.",
    cta: "Lokalpräsenz prüfen lassen",
  },
  process: [
    { 
      number: "01", 
      title: "Kostenfreies Kennenlernen (ca. 30 Min.)", 
      body: "Ich bespreche mit dir am Telefon oder bei einem Kaffee unverbindlich und kostenfrei deinen nächsten Schritt. Du kennst deinen Betrieb am besten: Bring einfach deine wichtigsten Gedanken mit, den Rest klären wir gemeinsam." 
    },
    { 
      number: "02", 
      title: "Struktur & Design-Entwurf", 
      body: "Ich erstelle die Seitenstruktur und den ersten interaktiven Entwurf. Du siehst genau, wie die Seite auf dem Smartphone wirkt, bevor alles final gebaut wird." 
    },
    { 
      number: "03", 
      title: "Umsetzung & Texterstellung", 
      body: "Ich formuliere verständliche Texte, binde deine Fotos ein und programmiere deine Website zügig und datenschutzkonform." 
    },
    { 
      number: "04", 
      title: "Schlüsselfertig online", 
      body: "Nach deiner finalen Freigabe schalte ich die Website live. Ich prüfe alle Buttons, richte SSL ein und verknüpfe dein Google-Maps-Profil." 
    },
  ],
  about: {
    eyebrow: "Hi, ich bin Manu",
    title: "Websites mit persönlicher Verantwortung.",
    body: "Ich mag kurze Wege, klare Absprachen und Lösungen, die im echten Alltag funktionieren. Bei Firmenflow gibt es keine Agentur-Bürokratie: Du weißt genau, wer an deiner Website sitzt, hast meine direkte Handynummer und kannst dich darauf verlassen, dass aus deinen Ideen ein starker Auftritt wird.",
  },
  contact: {
    eyebrow: "Lass uns sprechen",
    title: "Kurze WhatsApp oder geführte Anfrage.",
    body: "Du entscheidest, was dir lieber ist: Schreib mir eine kurze WhatsApp oder sende mir mit wenigen Klicks deine unverbindliche Projektanfrage.",
  },
} as const;

export const faqItems = [
  { 
    question: "Arbeitest du nur in Wesel und am Niederrhein?", 
    answer: "Mein Schwerpunkt liegt auf Wesel, Dinslaken, Voerde, Moers und dem Niederrhein – hier bin ich auch schnell persönlich bei dir vor Ort. Ich unterstütze aber genauso gerne Betriebe aus ganz NRW und deutschlandweit, ganz unkompliziert per Telefon und Video-Call." 
  },
  { 
    question: "Was kostet eine Website bei Firmenflow?", 
    answer: "Ein Onepager startet bei 690 Euro netto – Aufbau, Texte und die Einbindung deiner Bilder inklusive. Ein mehrseitiger Auftritt mit eigenen Leistungsseiten liegt darüber; den genauen Betrag nenne ich dir nach dem Kennenlernen als verbindlichen Festpreis, ohne versteckte Zusatzkosten. Dazu kommen 39 Euro im Monat für Hosting, Updates und 30 Minuten Änderungen – monatlich kündbar, keine Mindestlaufzeit."
  },
  { 
    question: "Machst du auch Fotos und Videos für meinen Betrieb?", 
    answer: "Ja. Viele Betriebe haben veraltete Bilder oder gar keine. Ich komme mit Kamera zu dir nach Wesel und Umgebung und fotografiere dein Team, deine Räume und deine Arbeit – auf Wunsch auch ein kurzes Video für Website und Social Media. Der Fototermin kostet 350 Euro und lässt sich mit jedem Website-Projekt kombinieren."
  },
  { 
    question: "Wie viel Zeit muss ich selbst in das Projekt investieren?", 
    answer: "Sehr wenig. Nach unserem ersten Kennenlernen habe ich in der Regel alles, was ich brauche. Ich formuliere verständliche Texte, strukturiere die Angebote und bereite den Entwurf schlüsselfertig vor. Du gibst mir dein Feedback, wir feilen am Feinschliff – und ansonsten kannst du dich voll auf dein Tagesgeschäft konzentrieren." 
  },
  { 
    question: "Wie lange dauert es, bis meine neue Website live ist?", 
    answer: "Das richtet sich flexibel nach deinen Anforderungen und geht ohne träge Agenturschleifen: Viele Websites sind schon nach 1 bis 2 Wochen schlüsselfertig online. Wenn es bei dir eilt (z. B. wegen einer Neueröffnung oder Kampagne), können wir das Projekt nach Absprache auch kurzfristig vorziehen." 
  },
  { 
    question: "Kannst du meine alte Website überarbeiten?", 
    answer: "Ja, genau dafür ist der Relaunch da. Ich prüfe gemeinsam mit dir, welche Inhalte und Google-Rankings erhalten bleiben sollen, und modernisiere Design, mobile Ladezeit und Struktur komplett." 
  },
  { 
    question: "Was genau beinhaltet Lokalpräsenz 360°?", 
    answer: "Drei Dinge: Ich richte dein Google-Profil ein oder räume ein bestehendes auf, beantworte jede neue Bewertung in deinem Ton und sage dir einmal im Monat, was in den Bewertungen steht und was sich wiederholt. Einrichtung ab 190 Euro, Betreuung 99 Euro im Monat – monatlich kündbar.",
    link: {
      text: "Alle Details & Leistungen zu Lokalpräsenz 360° ansehen",
      href: "/lokalpraesenz-360",
    },
  },
  { 
    question: "Wer kümmert sich nach dem Start um Hosting, Updates und Änderungen?", 
    answer: "Das läuft über die monatliche Betreuung für 39 Euro: Hosting, Backups, technische Updates und 30 Minuten Änderungen im Monat. Öffnungszeiten anpassen, neue Fotos einbinden, ein Angebot aktualisieren – du schreibst mir kurz per WhatsApp, ich setze es um. Monatlich kündbar, keine Mindestlaufzeit."
  },
] as const;

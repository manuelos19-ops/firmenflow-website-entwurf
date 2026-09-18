export const homeContent = {
  hero: {
    eyebrow: "Webdesign & Lokalpräsenz aus Wesel",
    title: ["Websites und Google-Profile,", "die deinen Betrieb vor Ort sichtbar machen."],
    accent: "Deine Website. Persönlich mit Manu.",
    body: "Ich bin Manu. Ich übernehme Struktur, Texte und Technik, fotografiere auf Wunsch bei dir vor Ort und bringe dein Google-Profil auf Stand. Persönlich mit Manu, mit einem festen Ansprechpartner und einem klaren Preis vor dem Start.",
    primaryCta: "Kostenlose Website-Einschätzung",
    secondaryCta: "Manu anrufen",
    whatsappCta: "WhatsApp-Chat",
    phone: "0155 67277155",
    phoneTel: "tel:015567277155",
    microcopy: "Kostenlose 3–5-Minuten-Videoanalyse · Direkter Anruf ohne Termin · Klarer Festpreis vor dem Start",
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
      points: ["Bestandsanalyse & Relaunch", "Google-Sichtbarkeit schützen", "Neue, klare Struktur", "In deinem Tempo"],
    },
    {
      slug: "foto-video",
      title: "Foto- & Videoaufnahmen vor Ort",
      body: "Echte Gesichter, echte Handgriffe, deine Räume. Keine Stockfotos mit lächelnden Models, die noch nie einen Betrieb von innen gesehen haben. Ich komme mit Kamera zu dir und fotografiere, wie es bei dir wirklich aussieht.",
      points: ["Team- & Mitarbeiter-Shootings", "Räumlichkeiten & Atmosphäre", "Kurzer Imagefilm & Video-Reels", "Direkt bei dir vor Ort"],
    },
  ],
  // Die Texte des Abschnitts "Persönlich mit Manu" stehen in
  // DirectWithManu.tsx, nicht hier. Kein direct-Feld anlegen.
  pilot: {
    eyebrow: "Lokalpräsenz 360°",
    // Die Ueberschrift steht bewusst in GoogleBusinessPilot.tsx, weil sie fuer
    // den Tinten-Effekt dreifach gerendert wird. Hier kein title-Feld anlegen -
    // es wuerde nicht ausgespielt.
    body: "Konkret heißt das: Dein Google-Profil wird eingerichtet und gepflegt, neue Bewertungen bekommen eine Antwort in deinem Ton, und einmal im Monat erhältst du eine Auswertung zu Kundenfeedback, Kritik und Verbesserungswünschen – als direktes Learning, wo du deinen Betrieb verbessern oder dein Team gezielt schulen kannst. Einrichtung ab 190 Euro, Betreuung 99 Euro im Monat – monatlich kündbar.",
    cta: "Lokalpräsenz prüfen lassen",
  },
  process: [
    { 
      number: "01", 
      title: "Kostenfreies Kennenlernen (ca. 30 Min.)", 
      body: "Am Telefon oder bei einem Kaffee. Du erzählst, was du vorhast, ich sage dir, was sinnvoll ist und was es kostet. Bring einfach deine wichtigsten Gedanken mit."
    },
    { 
      number: "02", 
      title: "Struktur & Design-Entwurf", 
      body: "Ich baue die Struktur und einen ersten klickbaren Entwurf. Du siehst auf deinem Handy, wie die Seite wirkt – bevor ich sie fertig baue."
    },
    { 
      number: "03", 
      title: "Umsetzung und Texte",
      body: "Ich schreibe die Texte, binde deine Fotos ein und baue die Seite fertig – datenschutzkonform, mit allem, was rechtlich dazugehört."
    },
    { 
      number: "04", 
      title: "Live geschaltet",
      body: "Erst nach deiner Freigabe geht die Seite online. Ich prüfe jeden Button, richte das SSL-Zertifikat ein und verknüpfe dein Google-Profil."
    },
  ],
  contact: {
    eyebrow: "Lass uns sprechen",
    // Die Ueberschrift steht in ContactChoice.tsx, nicht hier.
    // Kein title-Feld anlegen - es wuerde nicht ausgespielt.
    body: "Du entscheidest. Eine WhatsApp reicht völlig – oder du gehst das Formular durch, wenn du gleich alles loswerden willst. Beides unverbindlich.",
  },
} as const;

export const faqItems = [
  {
    question: "Firmenflow ist noch jung – warum sollte ich dir vertrauen?",
    answer: "Faire Frage. Deshalb sage ich es offen: Die Firma ist neu, meine Erfahrung nicht. Ich habe elf Jahre Betriebe geführt und vermarktet – sechs Jahre eigenes Studio, zwei Jahre Geschäftsführung einer selbst gebauten Arena, danach Marketing und Aufbau im größeren Maßstab. Was ich dort gemacht habe – Texte, Fotos, Abläufe, Kundengespräche – mache ich heute für andere. Dazu: Festpreis vor dem Start, monatlich kündbare Betreuung, Domain und Code gehören dir. Wenn es nicht passt, bist du in keinem Vertrag gefangen."
  },
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
    question: "Was passiert, wenn mir der Entwurf nicht gefällt?", 
    answer: "Dann sagst du es mir – dafür ist der Entwurf da. Du siehst die Seite auf deinem Handy, bevor sie fertig gebaut wird, und wir passen sie an, bis sie zu dir passt. Erst nach deiner Freigabe geht sie live. Und falls wir grundsätzlich nicht zusammenpassen, merkst du das schon im kostenlosen Kennenlernen, nicht erst auf der Rechnung." 
  },
  { 
    question: "Wie viel Zeit muss ich selbst in das Projekt investieren?", 
    answer: "Sehr wenig. Nach unserem ersten Kennenlernen habe ich in der Regel alles, was ich brauche. Ich schreibe die Texte, ordne die Leistungen und lege dir den fertigen Entwurf vor. Du sagst, was du anders willst – ansonsten kannst du dich um dein Tagesgeschäft kümmern."
  },
  { 
    question: "Wie lange dauert es, bis meine neue Website live ist?", 
    answer: "Das hängt vom Umfang ab. Ein Onepager steht oft nach ein bis zwei Wochen, größere Auftritte brauchen länger. Wenn es bei dir eilt – Neueröffnung, Saison, Kampagne – sag Bescheid, dann ziehen wir es vor."
  },
  { 
    question: "Kannst du meine alte Website überarbeiten?", 
    answer: "Ja, genau dafür ist der Relaunch da. Ich prüfe gemeinsam mit dir, welche Inhalte und Google-Rankings erhalten bleiben sollen, und modernisiere Design, mobile Ladezeit und Struktur komplett." 
  },
  { 
    question: "Was genau beinhaltet Lokalpräsenz 360°?", 
    answer: "Drei Dinge: Ich richte dein Google-Profil ein oder räume ein bestehendes auf, beantworte jede neue Bewertung in deinem Ton und fasse dir einmal im Monat zusammen, welche Kritikpunkte und Kundenwünsche aufkommen – als direktes Feedback, wo du Prozesse optimieren oder Mitarbeiter gezielt schulen kannst. Einrichtung ab 190 Euro, Betreuung 99 Euro im Monat – monatlich kündbar.",
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

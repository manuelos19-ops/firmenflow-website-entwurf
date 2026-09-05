export const homeContent = {
  hero: {
    eyebrow: "Webdesign & Lokalpräsenz aus Wesel",
    title: ["Mehr Lokalpräsenz.", "Weniger Agenturtheater."],
    accent: "Deine Website. Persönlich mit Manu.",
    body: "Wenn Kunden am Niederrhein nach deinem Angebot oder Handwerk suchen, zählt der erste Klick: Eine gestochen scharfe Website, echte Fotos aus deinem Betrieb und ein Google-Profil, das sofort Vertrauen weckt. Ohne Agentur-Warteschleifen, direkt auf den Punkt.",
    primaryCta: "WhatsApp an Manu",
    secondaryCta: "Lass uns sprechen",
  },
  problem: {
    eyebrow: "Die Realität vor Ort",
    title: "Dein Betrieb leistet erstklassige Arbeit. Aber online gewinnt der lautere Mitbewerber.",
    body: "Du stehst früh im Betrieb, gibst alles für saubere Qualität – doch auf dem Smartphone sucht deine Kundschaft vergebens. Wer dich online nicht sofort versteht oder auf einer veralteten Seite landet, wischt mit dem Daumen weiter zur Konkurrenz. Aus erstklassiger Arbeit wird stille Unsichtbarkeit.",
  },
  services: [
    {
      slug: "neue-website",
      title: "Neue Website von Grund auf",
      body: "Vom leeren Bildschirm zum bezugsfertigen Firmenauftritt: Ich übernehme Struktur, verständliche Texte und mobile Ladezeiten unter einer Sekunde. Du prüfst den Entwurf, gibst dein Feedback – und dein Betrieb steht online stark da.",
      points: ["Kein Text-Stress für dich", "Modernes, klares Design", "Optimiert fürs Smartphone", "Transparenter Festpreis"],
    },
    {
      slug: "relaunch",
      title: "Bestehende Website modernisieren",
      body: "Alte Seite entrümpeln, gewachsene Google-Sichtbarkeit behalten: Ich übernehme deine bewährten Inhalte, poliere Struktur und Design auf Hochglanz und richte saubere Weiterleitungen ein, damit kein Kunde verloren geht.",
      points: ["Bestandsanalyse & Relaunch", "Google-Sichtbarkeit schützen", "Neue, klare Struktur", "Schlüsselfertig in deinem Tempo"],
    },
    {
      slug: "foto-video",
      title: "Foto- & Videoaufnahmen vor Ort",
      body: "Echte Gesichter, Handgriffe und die Atmosphäre deines Betriebs im Bild: Keine anonymen Stockfotos mit künstlich lächelnden Models. Ich komme mit professionellem Foto- und Video-Equipment direkt zu dir vor Ort und fange deine echte Arbeitswelt authentisch ein.",
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
    eyebrow: "Google Business 360°",
    title: "Gefunden werden und direkt Vertrauen aufbauen.",
    body: "Wer lokal nach einem Betrieb sucht, entscheidet oft direkt bei Google. Ich optimiere dein Unternehmensprofil, übernehme das professionelle Bewertungsmanagement und mache das Feedback deiner Kunden als wertvolle Erkenntnisse für deinen Betrieb nutzbar.",
    modules: [
      "Google-Unternehmensprofil komplett optimieren",
      "Laufendes Bewertungsmanagement (echte Antworten)",
      "Systematischer Prozess für neue Kundenbewertungen",
      "Customer Insights & monatlicher Feedback-Report",
      "Frühwarnsystem für betriebliche Schwachstellen",
    ],
    cta: "Google-Präsenz prüfen lassen",
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
    answer: "100 % transparent und ohne Agenturaufschläge: Eine kompakte digitale Web-Visitenkarte für kleinere Vorhaben startet bereits ab 490 Euro. Ein schlüsselfertiger, mehrseitiger Firmenauftritt inklusive Texten, Google-Einbindung und Foto-Option liegt fair im bezahlbaren Rahmen – weit unter dem, was klassische Agenturen verlangen. Nach unserem kurzen Kennenlernen nenne ich dir sofort einen garantierten Festpreis – ohne versteckte Zusatzkosten und ohne laufende Knebelverträge." 
  },
  { 
    question: "Machst du auch Fotos und Videos für meinen Betrieb?", 
    answer: "Ja, sehr gerne! Viele kleine Unternehmen haben veraltete oder gar keine passenden Bilder. Ich bringe professionelles Foto- und Video-Equipment mit und komme direkt bei dir in Wesel und Umgebung vorbei. Ich erstelle sympathische Teamfotos, Aufnahmen deiner Räume und deines Handwerks oder einen kurzen, wirkungsvollen Imagefilm für deine Website und Social Media." 
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
    question: "Was genau beinhaltet Google Business 360°?", 
    answer: "Vom professionellen Aufbau deines Google-Unternehmensprofils über das laufende Beantworten von Rezensionen bis zur monatlichen Analyse deines Kundenfeedbacks: Ich sorge dafür, dass dein Betrieb auf Google Maps top dasteht, Kunden dir vertrauen und du aus Bewertungen konkrete Erkenntnisse für dein Unternehmen gewinnst.",
    link: {
      text: "Alle Details & Leistungen zu Google Business 360° ansehen",
      href: "/google-business-360",
    },
  },
  { 
    question: "Wer kümmert sich nach dem Start um Hosting, Updates und Änderungen?", 
    answer: "Genau dafür gibt es mein Rundum-Sorglos-Paket: Ich übernehme schnelles, sicheres Hosting, regelmäßige Backups und alle technischen Updates. Wenn du Öffnungszeiten ändern möchtest, neue Fotos hast oder ein Angebot aktualisieren willst, schreibst du mir einfach kurz per WhatsApp – und ich setze es zeitnah für dich um. So bleibt deine Website immer aktuell, ohne dass du selbst Zeit investieren musst." 
  },
] as const;

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { FlowscreenDownloadButton } from "@/components/flowscreen/FlowscreenDownloadButton";
import { FlowscreenStickyCta } from "@/components/flowscreen/FlowscreenStickyCta";
import { FlowscreenTrustSection } from "@/components/flowscreen/FlowscreenTrustSection";
import { cn } from "@/lib/cn";
import { brandAssets } from "@/content/assets";
import { FirmenflowIcon, FlowscreenIcon } from "@/components/brand/FirmenflowIcon";
import {
  FLOWSCREEN_CHANGELOG,
  FLOWSCREEN_OS_LABEL,
  FLOWSCREEN_RELEASES_URL,
  FLOWSCREEN_SIZE_LABEL,
  FLOWSCREEN_VERSION,
} from "@/lib/flowscreen";
import {
  ArrowLeft,
  Download,
  Check,
  X,
  ChevronDown,
  Monitor,
  HardDrive,
  ExternalLink,
} from "@/components/brand/FirmenflowUiIcon";

const RELEASES_PAGE_URL = FLOWSCREEN_RELEASES_URL;

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Warum ist FlowScreen aktuell komplett kostenlos?",
    answer:
      "FlowScreen ist ursprünglich als internes Werkzeug bei Firmenflow entstanden: Snagit steckt heute im Camtasia-Abo (ca. 40 €/Jahr), ShareX erschlägt Einsteiger mit seinen unzähligen Menüs und das Windows Snipping Tool kann keine ansehnlichen Mockups für Kundenpräsentationen erzeugen. Aktuell stellen wir die Vollversion für Macher, Freelancer und Teams kostenlos zur Verfügung.",
  },
  {
    question: "Werden meine Screenshots oder Daten in die Cloud geladen?",
    answer:
      "Nein. Ausnahmslos 0 % Cloud. FlowScreen arbeitet zu 100 % lokal auf deinem Rechner. Es gibt keinen Telemetrie-Zwang, keinen Login-Account und keine externen Server, die deine Bilddaten sehen. Das macht FlowScreen absolut DSGVO-konform für sensible Betriebs- und Kundendaten.",
  },
  {
    question: "Wie funktionieren die Updates?",
    answer:
      "FlowScreen prüft im Hintergrund automatisch über unser öffentliches GitHub-Repository, ob eine neue Version veröffentlicht wurde. Wenn ein Update bereitsteht, wirst du direkt in der App informiert und kannst es mit einem Klick laden und installieren.",
  },
  {
    question: "Was bedeutet die Meldung beim ersten Start unter Windows?",
    answer:
      "Da FlowScreen eine neu veröffentlichte Software ohne ein tausende Euro teures Unternehmens-Signaturzertifikat ist, kann der Windows SmartScreen-Filter beim ersten Start anzeigen: 'Der Computer wurde durch Windows geschützt'. Klicke einfach auf 'Weitere Informationen' und danach auf 'Trotzdem ausführen'. Die App wird sauber über unser öffentliches GitHub-Repository verteilt und enthält keinerlei Adware.",
  },
  {
    question: "Was ist der Unterschied zwischen Installer und Portable?",
    answer:
      "Die Installer-Version (Setup.exe) richtet FlowScreen mit Desktop- und Startmenü-Verknüpfung ein und unterstützt automatische Updates. Die Portable-Version läuft sofort ohne Installation – perfekt für Firmen-Laptops ohne Admin-Rechte oder direkt vom USB-Stick.",
  },
  {
    question: "Läuft FlowScreen auch unter Windows 10?",
    answer:
      "Ja. FlowScreen läuft auf Windows 11 und Windows 10 (64-Bit). Für die Portable-Version brauchst du keine Administratorrechte – einfach herunterladen und starten.",
  },
  {
    question: "Brauche ich Administratorrechte für die Installation?",
    answer:
      "Für die Portable-Version nicht. Nur die Setup-Version mit Startmenü-Eintrag und Drucktasten-Integration kann je nach Firmenrichtlinie Admin-Rechte erfordern.",
  },
];

export function FlowscreenView() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main id="main" className="pt-28 sm:pt-36 pb-28 overflow-hidden bg-[var(--color-paper)]">
      <Container className="space-y-24 sm:space-y-36">
        {/* Navigation & Status Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-line)] pb-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-muted)] hover:text-[var(--color-coral)] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Zurück zur Firmenflow Startseite</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-coral)] bg-[var(--color-coral)]/10 px-3 py-1 rounded-full border border-[var(--color-coral)]/20">
              <span className="w-2 h-2 rounded-full bg-[var(--color-coral)] animate-pulse" />
              Windows 11 &amp; 10 · v{FLOWSCREEN_VERSION}
            </span>
          </div>
{/* Creator Badge - Personal connection */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[var(--color-line)]/50 text-xs font-semibold text-[var(--color-ink)] shadow-sm mb-6">
            <Image
              src={brandAssets.markLight}
              alt="Firmenflow Markenzeichen"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <span className="text-[var(--color-coral)] font-bold">vom Inhaber Manu</span>
            <span className="text-[var(--color-muted)]">· FlowScreen {FLOWSCREEN_VERSION}</span>
          </div>
        </div>

        {/* HERO SECTION */}
        <div className="space-y-12 text-center max-w-5xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-[var(--color-coral)]/15 via-[var(--color-plum)]/10 to-[var(--color-coral)]/15 border border-[var(--color-coral)]/30 text-xs sm:text-sm font-bold text-[var(--color-plum)] shadow-sm backdrop-blur-sm">
            <FlowscreenIcon name="app-logo" size={28} alt="FlowScreen" />
            <span>FlowScreen · Entwickelt von Manuel Landeck</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold text-[var(--color-ink)] leading-[1.04] tracking-tight">
            Schluss mit hässlichen <br className="hidden sm:block" />
            <span className="text-[var(--color-plum)]">Screenshots.</span> <br />
            <span className="text-[var(--color-coral)] font-editorial italic font-normal">
              Präsentieren statt nur knipsen.
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg sm:text-2xl text-[var(--color-muted)] font-normal leading-relaxed max-w-3xl mx-auto">
            Snipping Tool ist zu basic, ShareX für Einsteiger schnell überfordernd und Web-Tools laden deine
            Screenshots in fremde Clouds.{" "}
            <strong className="text-[var(--color-ink)] font-semibold">FlowScreen</strong> vereint blitzschnelle
            Bildschirmfotos mit 1-Klick-Canvas-Mockups, automatischem Schrittzähler, DSGVO-Zensur und Vektor-Editor –{" "}
            <span className="text-[var(--color-coral)] font-semibold">100 % lokal und kostenlos</span>.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <MagneticButton>
              <FlowscreenDownloadButton
                variant="setup"
                placement="hero"
                buttonVariant="primary"
                size="lg"
                className="shadow-xl shadow-[var(--color-coral)]/25 text-base sm:text-lg px-8 py-4.5"
              >
                <Download className="w-5 h-5 mr-2 shrink-0" />
                <span>FlowScreen kostenlos laden · {FLOWSCREEN_SIZE_LABEL}</span>
              </FlowscreenDownloadButton>
            </MagneticButton>

            <MagneticButton>
              <FlowscreenDownloadButton
                variant="portable"
                placement="hero"
                buttonVariant="secondary"
                size="lg"
                className="text-base sm:text-lg px-7 py-4.5"
              >
                <HardDrive className="w-5 h-5 mr-2 shrink-0 text-[var(--color-plum)]" />
                <span>Portable Version (.exe)</span>
              </FlowscreenDownloadButton>
            </MagneticButton>
          </div>

          <p className="text-xs sm:text-sm text-[var(--color-muted)] max-w-xl mx-auto">
            Kein Konto · Keine Cloud · {FLOWSCREEN_OS_LABEL} · {FLOWSCREEN_SIZE_LABEL} Download. Beim ersten Start einmal: SmartScreen
            → „Weitere Informationen“ → „Trotzdem ausführen“.
          </p>

          {/* Trust Pills */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-4 text-xs sm:text-sm font-medium text-[var(--color-muted)]">
            <span className="inline-flex items-center gap-1.5">
              <FlowscreenIcon name="lokal-ohne-cloud" size={24} decorative />
              100 % Offline &amp; Kein Cloud-Zwang
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FlowscreenIcon name="screenshot-aufnahme" size={24} decorative />
              Druck-Taste &amp; Tastenkürzel
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FirmenflowIcon name="monatsreport" size={24} decorative />
              Automatische GitHub-Updates
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FirmenflowIcon name="erfolg" size={24} decorative />
              Kein Account / Kein Abo
            </span>
          </div>

          {/* App Window Preview Mockup */}
          <div className="pt-8 relative">
            <div
              className="absolute inset-0 -top-12 bg-gradient-to-tr from-[var(--color-coral)]/20 via-[var(--color-plum)]/15 to-transparent blur-3xl rounded-3xl -z-10 pointer-events-none"
              aria-hidden="true"
            />

            <div className="rounded-3xl border border-black/10 bg-white/70 backdrop-blur-md shadow-2xl shadow-[var(--color-plum)]/15 overflow-hidden p-2 sm:p-4">
              <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-black/5 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-3 text-xs font-mono text-[var(--color-muted)] hidden sm:inline">
                    FlowScreen v{FLOWSCREEN_VERSION} · Canvas Mockup Mode
                  </span>
                </div>
                <div className="text-xs font-semibold text-[var(--color-plum)] bg-[var(--color-plum)]/10 px-3 py-0.5 rounded-full">
                  Live Editor Preview
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-black/5 bg-gradient-to-br from-slate-900 to-slate-800">
                <Image
                  src="/media/flowscreen/flowscreen-mockup.webp"
                  alt="FlowScreen Benutzeroberfläche und Mockup-Editor"
                  width={2536}
                  height={1520}
                  priority
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 text-left">
              <div className="p-4 rounded-2xl bg-white/90 border border-[var(--color-line)] shadow-sm">
                <div className="mb-2 flex items-center gap-2">
                  <FlowscreenIcon name="canvas-mockup" size={40} decorative />
                  <span className="text-[var(--color-coral)] font-bold text-sm">1-Klick Mockup Canvas</span>
                </div>
                <p className="text-xs text-[var(--color-muted)]">
                  Fügt edle Farbverläufe, Eckenrundungen und weiche Schlagschatten direkt um deinen Screenshot.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/90 border border-[var(--color-line)] shadow-sm">
                <div className="mb-2 flex items-center gap-2">
                  <FlowscreenIcon name="schrittzaehler" size={40} decorative />
                  <span className="text-[var(--color-plum)] font-bold text-sm">Automatischer Schrittzähler</span>
                </div>
                <p className="text-xs text-[var(--color-muted)]">
                  Klicke auf Elemente – FlowScreen generiert aufsteigende Zahlenkreise (1, 2, 3...) für Tutorials.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/90 border border-[var(--color-line)] shadow-sm">
                <div className="mb-2 flex items-center gap-2">
                  <FlowscreenIcon name="dsgvo-verpixelung" size={40} decorative />
                  <span className="text-emerald-600 font-bold text-sm">DSGVO Zensur &amp; Blur</span>
                </div>
                <p className="text-xs text-[var(--color-muted)]">
                  Verpixelung oder solide Schwärzung mit einer Mausbewegung. Keine Kundendaten mehr leaken.
                </p>
              </div>
            </div>
          </div>

          {/* ECHTE EINBLICKE intro */}
          <div className="pt-10 max-w-5xl mx-auto text-left">
            <div className="text-center max-w-3xl mx-auto space-y-3 pb-8">
              <p className="text-xs sm:text-sm font-bold tracking-wide text-[var(--color-coral)] uppercase">
                Echte Einblicke
              </p>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[var(--color-ink)] leading-tight">
                So sieht Arbeiten mit FlowScreen aus.
              </h2>
              <p className="text-base sm:text-lg text-[var(--color-muted)]">
                Keine Stockfotos – echte Screenshots aus dem laufenden Editor.
              </p>
            </div>

            {/* 01 Mockup */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center rounded-3xl border border-[var(--color-line)] bg-white p-6 sm:p-8 shadow-sm">
              <div className="relative rounded-2xl overflow-hidden border border-black/10 shadow-xl">
                <Image
                  src="/media/flowscreen/flowscreen-mockup.webp"
                  alt="FlowScreen Mockup-Modus mit iPhone-Rahmen, Presets und Hintergrund-Reglern"
                  width={1400}
                  height={900}
                  loading="lazy"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="space-y-4">
                <p className="text-xs sm:text-sm font-bold tracking-wide text-[var(--color-coral)] uppercase">
                  01 · Mockup-Modus
                </p>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[var(--color-ink)] leading-tight">
                  Vom Screenshot zum Kunden-Wow in einem Klick.
                </h3>
                <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
                  Rechts das Mockup-Panel: <strong>Presets</strong> wie Social, Clean oder Phone,
                  dazu <strong>Browser- und Geräte-Rahmen</strong> (Safari, Chrome, iPhone,
                  Android, Tablet). Hintergrund als Verlauf, eigene Farbe oder Bild – Feinschliff
                  über Padding, Ecken, Winkel und Schatten, optional mit 3D-Tilt.
                </p>
              </div>
            </div>

            {/* 02 Annotationen */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center rounded-3xl border border-[var(--color-line)] bg-white p-6 sm:p-8 shadow-sm">
              <div className="space-y-4 order-2 lg:order-1">
                <p className="text-xs sm:text-sm font-bold tracking-wide text-[var(--color-coral)] uppercase">
                  02 · Erklären &amp; Markieren
                </p>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[var(--color-ink)] leading-tight">
                  Pfeile, Rahmen, Kreise – alles bleibt verschiebbar.
                </h3>
                <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
                  Vektor statt Pixel: <strong>Pfeile</strong> zeigen wohin,{" "}
                  <strong>Rahmen</strong> fassen Wichtiges ein, <strong>Kreise</strong> heben
                  Details hervor. Dazu der <strong>Schrittzähler</strong> für nummerierte
                  Anleitungen (1, 2, 3 …) – jedes Element lässt sich anklicken, verschieben und
                  umfärben, bis zum Export.
                </p>
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-black/10 shadow-xl order-1 lg:order-2">
                <Image
                  src="/media/flowscreen/flowscreen-annotationen.webp"
                  alt="FlowScreen Editor mit Pfeil-, Rahmen- und Kreis-Markierungen plus Schrittzähler"
                  width={1400}
                  height={900}
                  loading="lazy"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* 03 Zensur + Texte */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center rounded-3xl border border-[var(--color-line)] bg-white p-6 sm:p-8 shadow-sm">
              <div className="relative rounded-2xl overflow-hidden border border-black/10 shadow-xl">
                <Image
                  src="/media/flowscreen/flowscreen-zensur-texte.webp"
                  alt="FlowScreen Zensur mit Mosaik, Blur und Schwarz plus Text-Annotationen"
                  width={1400}
                  height={900}
                  loading="lazy"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="space-y-4">
                <p className="text-xs sm:text-sm font-bold tracking-wide text-[var(--color-coral)] uppercase">
                  03 · Zensur &amp; Texte
                </p>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-[var(--color-ink)] leading-tight">
                  Sensibles schwärzen, Wichtiges beschriften.
                </h3>
                <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
                  Unten die <strong>Zensur-Leiste</strong>: <strong>Mosaik</strong> (echtes
                  Verpixeln), <strong>Blur</strong> oder <strong>Schwarz</strong> – Namen und
                  Kundendaten sind unwiderruflich weg, ideal für die DSGVO. Dazu{" "}
                  <strong>Textblöcke</strong> in allen Farben, Größen und Schriften.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* COMPARISON TABLE: Why FlowScreen is better */}
        <div className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <p className="text-xs sm:text-sm font-bold tracking-wide text-[var(--color-coral)] uppercase">
              Vergleich &amp; Mehrwert
            </p>
            <div className="flex items-center justify-center gap-3 pt-1">
              <FlowscreenIcon name="app-icon-512" size={56} alt="FlowScreen App-Icon" priority />
              <span className="text-sm font-bold text-[var(--color-plum)]">FlowScreen v{FLOWSCREEN_VERSION}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[var(--color-ink)] leading-tight">
              Warum FlowScreen andere Tools alt aussehen lässt.
            </h2>
            <p className="text-base sm:text-lg text-[var(--color-muted)]">
              Entwickelt, um die Lücke zwischen zu simplen Systemtools und überfrachteten Monster-Programmen zu schließen.
            </p>
          </div>

          <div className="overflow-x-auto md:overflow-visible">
            <div className="min-w-[720px] md:min-w-0 rounded-3xl border border-[var(--color-line)] bg-white shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-line)] bg-stone-50/70 text-xs sm:text-sm font-semibold text-[var(--color-ink)]">
                    <th className="py-4 px-6 w-1/3">Funktion / Kriterium</th>
                    <th className="py-4 px-4 w-1/5 text-center text-[var(--color-muted)]">
                      Windows Snipping Tool
                    </th>
                    <th className="py-4 px-4 w-1/5 text-center text-[var(--color-muted)]">ShareX</th>
                    <th className="py-4 px-6 w-1/4 text-center bg-[var(--color-plum)]/5 text-[var(--color-plum)] font-bold">
                      <span className="inline-flex items-center justify-center gap-2">
                        <FlowscreenIcon name="app-icon-512" size={28} alt="FlowScreen App-Icon" />
                        FlowScreen
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-line)] text-xs sm:text-sm">
                  <tr>
                    <td className="py-4 px-6 font-semibold text-[var(--color-ink)]">
                      Canvas-Mockups &amp; Farbverläufe
                      <span className="block text-xs font-normal text-[var(--color-muted)]">
                        Macht Screenshots repräsentativ für Kunden
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center text-rose-500">
                      <X className="w-5 h-5 mx-auto" />
                    </td>
                    <td className="py-4 px-4 text-center text-rose-500">
                      <X className="w-5 h-5 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center bg-[var(--color-plum)]/5 text-emerald-600 font-bold">
                      <Check className="w-6 h-6 mx-auto text-emerald-600" />
                    </td>
                  </tr>

                  <tr>
                    <td className="py-4 px-6 font-semibold text-[var(--color-ink)]">
                      Automatischer Schrittzähler (1, 2, 3...)
                      <span className="block text-xs font-normal text-[var(--color-muted)]">
                        Für Schritt-für-Schritt-Anleitungen &amp; Bugreports
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center text-rose-500">
                      <X className="w-5 h-5 mx-auto" />
                    </td>
                    <td className="py-4 px-4 text-center text-amber-500 text-xs">
                      Kompliziert
                    </td>
                    <td className="py-4 px-6 text-center bg-[var(--color-plum)]/5 text-emerald-600 font-bold">
                      <Check className="w-6 h-6 mx-auto text-emerald-600" />
                    </td>
                  </tr>

                  <tr>
                    <td className="py-4 px-6 font-semibold text-[var(--color-ink)]">
                      DSGVO-Zensur (Pixel-Blur &amp; Balken)
                      <span className="block text-xs font-normal text-[var(--color-muted)]">
                        Kundendaten &amp; Passwörter unkenntlich machen
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center text-rose-500">
                      <X className="w-5 h-5 mx-auto" />
                    </td>
                    <td className="py-4 px-4 text-center text-emerald-600">
                      <Check className="w-5 h-5 mx-auto text-emerald-600" />
                    </td>
                    <td className="py-4 px-6 text-center bg-[var(--color-plum)]/5 text-emerald-600 font-bold">
                      <Check className="w-6 h-6 mx-auto text-emerald-600" />
                    </td>
                  </tr>

                  <tr>
                    <td className="py-4 px-6 font-semibold text-[var(--color-ink)]">
                      Bedienung ohne Einarbeitung
                      <span className="block text-xs font-normal text-[var(--color-muted)]">
                        Sofort starten statt lange konfigurieren
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center text-emerald-600">
                      <Check className="w-5 h-5 mx-auto text-emerald-600" />
                    </td>
                    <td className="py-4 px-4 text-center text-rose-500">
                      <X className="w-5 h-5 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center bg-[var(--color-plum)]/5 text-emerald-600 font-bold">
                      <Check className="w-6 h-6 mx-auto text-emerald-600" />
                    </td>
                  </tr>

                  <tr>
                    <td className="py-4 px-6 font-semibold text-[var(--color-ink)]">
                      100 % lokal (kein Cloud-Zwang)
                      <span className="block text-xs font-normal text-[var(--color-muted)]">
                        Screenshots verlassen deinen PC nicht
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center text-emerald-600">
                      <Check className="w-5 h-5 mx-auto text-emerald-600" />
                    </td>
                    <td className="py-4 px-4 text-center text-amber-500 text-xs">
                      Je nach Config
                    </td>
                    <td className="py-4 px-6 text-center bg-[var(--color-plum)]/5 text-emerald-600 font-bold">
                      <Check className="w-6 h-6 mx-auto text-emerald-600" />
                    </td>
                  </tr>

                  <tr>
                    <td className="py-4 px-6 font-semibold text-[var(--color-ink)]">
                      Kostenlose Vollversion &amp; Updates
                      <span className="block text-xs font-normal text-[var(--color-muted)]">
                        Kein Camtasia-Abo (ca. 40 €/Jahr) wie für Snagit nötig
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center text-emerald-600">
                      <Check className="w-5 h-5 mx-auto text-emerald-600" />
                    </td>
                    <td className="py-4 px-4 text-center text-emerald-600">
                      <Check className="w-5 h-5 mx-auto text-emerald-600" />
                    </td>
                    <td className="py-4 px-6 text-center bg-[var(--color-plum)]/5 text-[var(--color-coral)] font-bold">
                      Kostenlos (v{FLOWSCREEN_VERSION})
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* BENTO FEATURE GRID */}
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <p className="text-xs sm:text-sm font-bold tracking-wide text-[var(--color-plum)] uppercase">
              Alles an Bord
            </p>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[var(--color-ink)] leading-tight">
              Die Werkzeuge, die du täglich brauchst.
            </h2>
            <p className="text-base sm:text-lg text-[var(--color-muted)]">
              Kein Schnickschnack. Jedes Feature löst ein konkretes Problem beim Erklären, Zeigen und Dokumentieren.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl bg-white border border-[var(--color-line)] shadow-sm hover:shadow-md transition-shadow space-y-4">
              <FlowscreenIcon name="canvas-mockup" size={72} decorative />
              <h3 className="text-xl font-display font-bold text-[var(--color-ink)]">
                1-Klick Canvas-Mockup
              </h3>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                Macht aus jedem öden Programmfenster ein Magazin-reifes Design. Wähle aus edlen Farbverläufen, bestimme
                die Eckenabrundung und setze weiche Schlagschatten für den modernen Look.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-[var(--color-line)] shadow-sm hover:shadow-md transition-shadow space-y-4">
              <FlowscreenIcon name="schrittzaehler" size={72} decorative />
              <h3 className="text-xl font-display font-bold text-[var(--color-ink)]">
                Automatischer Schrittzähler
              </h3>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                Klicke auf den Button, dann auf das Eingabefeld, dann auf Speichern. FlowScreen setzt automatisch
                aufsteigende Nummernbubbles (1, 2, 3...) – ohne dass du jedes Mal die Zahl tippen musst.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-[var(--color-line)] shadow-sm hover:shadow-md transition-shadow space-y-4">
              <FlowscreenIcon name="dsgvo-verpixelung" size={72} decorative />
              <h3 className="text-xl font-display font-bold text-[var(--color-ink)]">
                DSGVO-Zensur &amp; Mosaik
              </h3>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                Ein Ziehen genügt: Verpixle Kundennamen, Adressen, Bankverbindungen oder Passwörter sicher und
                unwiderruflich vor dem Teilen in Slack, Microsoft Teams oder WhatsApp.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-[var(--color-line)] shadow-sm hover:shadow-md transition-shadow space-y-4">
              <FlowscreenIcon name="lupe-zoom" size={72} decorative />
              <h3 className="text-xl font-display font-bold text-[var(--color-ink)]">
                Lupen-Werkzeug &amp; Zoom
              </h3>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                Kleine Menüeinträge, Schriftzüge oder UI-Details sofort ins Auge stechen lassen. Die Lupe hebt wichtige
                Bereiche mit einem runden Zoom-Spotlight und Kontur hervor.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-[var(--color-line)] shadow-sm hover:shadow-md transition-shadow space-y-4">
              <FlowscreenIcon name="vektor-editor" size={72} decorative />
              <h3 className="text-xl font-display font-bold text-[var(--color-ink)]">
                Voller Vektor-Editor
              </h3>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                Keine festen Pixel-Striche: Pfeile, Rechtecke, Notizen und Text bleiben jederzeit anklickbar,
                verschiebbar, skalierbar und farblich anpassbar – bis du final exportierst.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-[var(--color-line)] shadow-sm hover:shadow-md transition-shadow space-y-4">
              <FlowscreenIcon name="screenshot-aufnahme" size={72} decorative />
              <h3 className="text-xl font-display font-bold text-[var(--color-ink)]">
                Druck-Taste &amp; Autostart
              </h3>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                Ersetze das träge Standard-Tool: Mit der Druck-Taste oder globalem Tastenkürzel schnappt sich FlowScreen
                sofort den Bildschirminhalt und öffnet sich schwebend im Vordergrund.
              </p>
            </div>
          </div>
        </div>

        {/* 3-STEP WORKFLOW */}
        <div className="rounded-3xl bg-stone-900 text-white p-8 sm:p-14 lg:p-16 space-y-12 shadow-xl">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--color-coral)]">
              Workflow in Sekundenschnelle
            </p>
            <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight">
              In 3 Schritten zum Kunden-Wow.
            </h2>
            <p className="text-sm sm:text-base text-stone-300">
              Vom einfachen Schnappschuss zur professionellen Dokumentation in unter fünf Sekunden.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4 bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-4xl font-display font-extrabold text-[var(--color-coral)]">01</div>
              <h3 className="text-lg font-bold text-white">Aufnehmen</h3>
              <p className="text-sm text-stone-300 leading-relaxed">
                Drücke die Druck-Taste oder wähle mit der Maus den exakten Fensterbereich oder Desktop-Ausschnitt.
              </p>
            </div>

            <div className="space-y-4 bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-4xl font-display font-extrabold text-[var(--color-plum-light)]">02</div>
              <h3 className="text-lg font-bold text-white">Veredeln</h3>
              <p className="text-sm text-stone-300 leading-relaxed">
                Aktiviere das Canvas-Mockup, klicke 1-2 Schritte ein und verpixle vertrauliche Zahlen mit der Zensur.
              </p>
            </div>

            <div className="space-y-4 bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-4xl font-display font-extrabold text-emerald-400">03</div>
              <h3 className="text-lg font-bold text-white">Kopieren &amp; Teilen</h3>
              <p className="text-sm text-stone-300 leading-relaxed">
                Mit einem Klick in die Zwischenablage kopieren und direkt in Slack, E-Mail oder Angebot einfügen.
              </p>
            </div>
          </div>
        </div>

        {/* DOWNLOAD OPTIONS & SYSTEM REQS */}
        <div id="download" className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <p className="text-xs sm:text-sm font-bold tracking-wide text-[var(--color-coral)] uppercase">
              Download &amp; Installation
            </p>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[var(--color-ink)] leading-tight">
              Wähle deine Version für Windows 11 &amp; 10.
            </h2>
            <p className="text-base sm:text-lg text-[var(--color-muted)]">
              Aktuell 100 % kostenlos verfügbar. Keine Registrierung oder E-Mail-Adresse erforderlich.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Card 1: Setup Installer */}
            <div className="rounded-3xl border-2 border-[var(--color-plum)] bg-white p-8 sm:p-10 shadow-lg relative flex flex-col justify-between space-y-8">
              <div className="absolute -top-3.5 left-8 bg-[var(--color-plum)] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                Empfohlen
              </div>

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-plum)]/10 text-[var(--color-plum)] flex items-center justify-center">
                    <Monitor className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold text-[var(--color-muted)]">v{FLOWSCREEN_VERSION} · {FLOWSCREEN_SIZE_LABEL}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-display font-bold text-[var(--color-ink)]">
                    FlowScreen Setup Installer
                  </h3>
                  <p className="text-sm text-[var(--color-muted)]">
                    Für deinen festen Arbeitsplatz. Richtet sich nahtlos im Startmenü und auf dem Desktop ein.
                  </p>
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--color-ink)]">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Inklusive automatischer GitHub-Update-Prüfung</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Optionale Windows-Drucktasten-Integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Sauberer Uninstaller über die Windows-Systemsteuerung</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{FLOWSCREEN_OS_LABEL}</span>
                  </li>
                </ul>
              </div>

              <FlowscreenDownloadButton
                variant="setup"
                placement="download-card"
                buttonVariant="primary"
                size="lg"
                className="w-full justify-center shadow-lg shadow-[var(--color-coral)]/20"
              >
                <Download className="w-5 h-5 mr-2 shrink-0" />
                <span>Installer herunterladen</span>
              </FlowscreenDownloadButton>
            </div>

            {/* Card 2: Portable Version */}
            <div className="rounded-3xl border border-[var(--color-line)] bg-white p-8 sm:p-10 shadow-sm relative flex flex-col justify-between space-y-8">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-stone-100 text-[var(--color-ink)] flex items-center justify-center">
                    <HardDrive className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold text-[var(--color-muted)]">v{FLOWSCREEN_VERSION} · {FLOWSCREEN_SIZE_LABEL}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-display font-bold text-[var(--color-ink)]">
                    FlowScreen Portable
                  </h3>
                  <p className="text-sm text-[var(--color-muted)]">
                    Keine Installation nötig. Läuft direkt aus dem Download-Ordner oder vom Firmen-USB-Stick.
                  </p>
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--color-ink)]">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Keine Windows-Administratorrechte erforderlich</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Perfekt für restriktive Firmen-Laptops</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Hinterlässt keine Einträge in der Registry</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Direkt startbar nach dem Download</span>
                  </li>
                </ul>
              </div>

              <FlowscreenDownloadButton
                variant="portable"
                placement="download-card"
                buttonVariant="secondary"
                size="lg"
                className="w-full justify-center"
              >
                <Download className="w-5 h-5 mr-2 shrink-0" />
                <span>Portable .exe herunterladen</span>
              </FlowscreenDownloadButton>
            </div>
          </div>

          <div className="text-center pt-2 space-y-2">
            <p className="text-xs sm:text-sm text-[var(--color-muted)] max-w-xl mx-auto">
              <strong className="text-[var(--color-ink)]">Für wen ist was?</strong> Fester Büro-PC → Setup. Laptop
              ohne Admin-Rechte oder USB-Stick → Portable. Beim ersten Start einmal: „Weitere Informationen“ →{" "}
              „Trotzdem ausführen“.
            </p>
            <FlowscreenTrustSection />
            <a
              href={RELEASES_PAGE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[var(--color-muted)] hover:text-[var(--color-coral)] font-medium transition-colors"
            >
              <span>Alle Versionen &amp; Release Notes im GitHub Repository einsehen</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* CHANGELOG: Was ist neu? */}
        <div className="space-y-10 max-w-3xl mx-auto">
          <div className="text-center space-y-3">
            <p className="text-xs sm:text-sm font-bold tracking-wide text-[var(--color-coral)] uppercase">
              Changelog
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[var(--color-ink)]">
              Was ist neu in FlowScreen?
            </h2>
            <p className="text-base sm:text-lg text-[var(--color-muted)]">
              Jede Version wird vom Inhaber persönlich gebaut, geprüft und virenfrei veröffentlicht.
            </p>
          </div>

          <div className="space-y-4">
            {FLOWSCREEN_CHANGELOG.map((entry) => (
              <div
                key={entry.version}
                className="rounded-3xl border border-[var(--color-line)] bg-white p-6 sm:p-8 shadow-sm space-y-4"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <FlowscreenIcon name="app-icon-512" size={40} alt="FlowScreen App-Icon" />
                  <div>
                    <p className="text-base sm:text-lg font-bold text-[var(--color-ink)]">
                      v{entry.version} · {entry.title}
                    </p>
                    <p className="text-xs sm:text-sm text-[var(--color-muted)]">{entry.date}</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm sm:text-base text-[var(--color-muted)]">
                  {entry.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-1 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ ACCORDION */}
        <div className="space-y-10 max-w-3xl mx-auto">
          <div className="text-center space-y-3">
            <p className="text-xs sm:text-sm font-bold tracking-wide text-[var(--color-plum)] uppercase">
              Häufige Fragen
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[var(--color-ink)]">
              FAQ zu FlowScreen
            </h2>
          </div>

          <div className="divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx;
              const panelId = `flowscreen-faq-panel-${idx}`;
              const buttonId = `flowscreen-faq-button-${idx}`;
              return (
                <div key={idx} className="py-5">
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left gap-4 font-semibold text-base sm:text-lg text-[var(--color-ink)] hover:text-[var(--color-coral)] transition-colors cursor-pointer"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 shrink-0 text-[var(--color-muted)] transition-transform duration-200",
                        isOpen && "rotate-180 text-[var(--color-coral)]"
                      )}
                    />
                  </button>
                  {isOpen && (
                    <p
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="mt-3 text-sm sm:text-base text-[var(--color-muted)] leading-relaxed animate-in fade-in duration-200"
                    >
                      {item.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM FINAL CTA */}
        <div className="rounded-3xl bg-gradient-to-br from-[var(--color-plum)] to-[#2f1342] text-white p-8 sm:p-14 lg:p-16 text-center space-y-8 shadow-2xl relative overflow-hidden">
          <div
            className="absolute -right-20 -bottom-20 w-80 h-80 bg-[var(--color-coral)]/20 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="space-y-4 max-w-2xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-semibold text-white/90 border border-white/20">
              <FlowscreenIcon name="app-logo" size={24} alt="FlowScreen" />
              <span>Persönlich mit Manu · Firmenflow</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white leading-tight">
              Mach deine Screenshots zum Aushängeschild.
            </h2>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed">
              Lade FlowScreen jetzt herunter und spare täglich wertvolle Minuten beim Dokumentieren, Erklären und
              Präsentieren.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <MagneticButton>
              <FlowscreenDownloadButton
                variant="setup"
                placement="final-cta"
                buttonVariant="primary"
                size="lg"
                className="shadow-xl shadow-black/20 text-base sm:text-lg px-8 py-4.5"
              >
                <Download className="w-5 h-5 mr-2 shrink-0" />
                <span>FlowScreen jetzt kostenlos laden</span>
              </FlowscreenDownloadButton>
            </MagneticButton>

            <MagneticButton>
              <FlowscreenDownloadButton
                variant="portable"
                placement="final-cta"
                buttonVariant="secondary"
                size="lg"
                className="text-base sm:text-lg px-7 py-4.5 bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-white/50 shadow-lg shadow-black/20"
              >
                <span>Portable ohne Installation</span>
              </FlowscreenDownloadButton>
            </MagneticButton>
          </div>
        </div>
      </Container>
      <FlowscreenStickyCta />
    </main>
  );
}

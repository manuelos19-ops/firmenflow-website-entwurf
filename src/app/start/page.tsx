import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { ManuPhotoSlider } from "@/components/start/ManuPhotoSlider";

export const metadata: Metadata = {
  title: "Firmenflow · Instagram Startseite",
  description:
    "Webdesign und Google Maps für Handwerker und Betriebe am Niederrhein. Persönlich mit Manu. Erstgespräch, Video-Check, WhatsApp und kostenlose Ratgeber.",
  robots: {
    index: false,
    follow: true,
  },
};

const guides = [
  {
    title: "Google Maps nicht gefunden",
    sub: "5 typische Fehler lokaler Betriebe",
    href: "/ratgeber/google-maps-nicht-gefunden",
    icon: "/3D_Icons/04_Lokalpraesenz_360/01-profil-einrichten.webp",
  },
  {
    title: "Website-Fehler lokaler Betriebe",
    sub: "Warum Besucher abspringen statt anzurufen",
    href: "/ratgeber/website-fehler-lokale-betriebe",
    icon: "/3D_Icons/01_Prozess_und_Website/02-mobile-first.webp",
  },
  {
    title: "Azubis & Mitarbeiter im Handwerk",
    sub: "Warum PDFs scheitern und was wirklich zieht",
    href: "/ratgeber/azubis-finden-handwerk",
    icon: "/3D_Icons/01_Prozess_und_Website/04-persoenlicher-ansprechpartner.webp",
  },
];

export default function StartPage() {
  return (
    <main className="min-h-screen bg-[#FCFAF7] text-[#17131A] pt-20 sm:pt-24 pb-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Sanfter Ambient-Hintergrund */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#FF705D]/8 via-[#653683]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-lg mx-auto space-y-6">
        {/* 1. Profil-Kopfbereich */}
        <section className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-[#E7E2DC] shadow-sm text-center relative transition-all duration-300 hover:shadow-md">
          <div className="relative inline-block mx-auto mb-4">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-4 ring-white shadow-md relative bg-stone-100">
              <Image
                src="/media/portraits/manu-contact-portrait.webp"
                alt="Manuel Landeck"
                fill
                priority
                sizes="(max-width: 640px) 96px, 112px"
                className="object-cover object-top"
              />
            </div>
            {/* Online-Puls Indikator */}
            <div
              className="absolute bottom-1 right-1 flex items-center justify-center p-1 bg-white rounded-full shadow-sm"
              title="Erreichbar am Niederrhein"
            >
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500" />
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#17131A] font-heading">
            Manuel Landeck
          </h1>
          <p className="text-sm font-semibold text-[#653683] mt-1">
            Persönlich mit Manu • Webdesign & Google Maps
          </p>
          <p className="text-xs text-[#746D76] font-medium mt-1">
            Wesel, Dinslaken, Moers & Niederrhein
          </p>

          <p className="text-sm text-[#746D76] leading-relaxed mt-3.5 max-w-md mx-auto">
            Ich baue Websites und Google-Profile für Betriebe am Niederrhein. Damit dich die Leute finden, die gerade nach dir suchen, und dann auch anrufen.
          </p>
        </section>

        {/* 2. Direkte Kontakt-Aktionen */}
        <section className="space-y-3.5">
          {/* WhatsApp Direkt-Chat (High Conversion) */}
          <a
            href="https://wa.me/4915567277155?text=Hi%20Manu,%20ich%20habe%20deine%20Instagram-Seite%20gesehen!"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-4 sm:p-4.5 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 hover:border-[#25D366] hover:bg-[#25D366]/15 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm shadow-[#25D366]/30 group-hover:scale-105 transition-transform">
              <WhatsAppIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-emerald-950 transition-colors">
                Schreib mir auf WhatsApp
              </div>
              <div className="text-xs text-stone-600 mt-0.5">
                Kurze Frage oder konkretes Projekt • Ich antworte selbst
              </div>
            </div>
            <span className="text-stone-400 group-hover:text-emerald-700 transition-colors text-lg pr-1">
              ➔
            </span>
          </a>

          {/* Erstgespräch buchen (Signature Button) */}
          <Link
            href="/#direkt"
            className="group block relative rounded-2xl p-0.5 bg-gradient-to-r from-[#FF8878] via-[#CF5CC2] to-[#8B62CF] shadow-md shadow-[#482361]/15 hover:shadow-lg hover:shadow-[#482361]/25 hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-[calc(1rem-2px)] bg-gradient-to-r from-[#4E2338] to-[#3A1C28] text-white">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 p-1.5 group-hover:scale-105 transition-transform">
                <Image
                  src="/3D_Icons/01_Prozess_und_Website/04-persoenlicher-ansprechpartner.webp"
                  alt="Erstgespräch"
                  width={44}
                  height={44}
                  className="object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm sm:text-base font-bold leading-tight">
                  Erstgespräch vereinbaren
                </div>
                <div className="text-xs text-rose-100/80 mt-0.5">
                  30 Minuten • Kostenlos und unverbindlich
                </div>
              </div>
              <span className="text-[#FF8878] text-lg font-bold pr-2 group-hover:translate-x-1 transition-transform">
                ➔
              </span>
            </div>
          </Link>
        </section>

        {/* 3. Kostenloser Video-Check */}
        <section>
          <Link
            href="/#videoanalyse"
            className="group block p-5 rounded-2xl bg-white border border-[#E7E2DC] hover:border-[#FF705D]/50 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF705D]/15 to-[#653683]/10 border border-[#E7E2DC] flex items-center justify-center shrink-0 p-1.5 group-hover:scale-105 transition-transform">
                <Image
                  src="/3D_Icons/05_Marketing/01-video.webp"
                  alt="Video-Check"
                  width={44}
                  height={44}
                  className="object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm sm:text-base font-bold text-[#17131A] group-hover:text-[#653683] transition-colors">
                    Video-Check für deinen Betrieb
                  </h2>
                  <span className="text-xs text-[#FF705D] font-bold">Gratis</span>
                </div>
                <p className="text-xs sm:text-sm text-[#746D76] leading-relaxed mt-1">
                  Schick mir deine Website oder deinen Firmennamen. Ich nehme ein 5-Minuten-Video von meinem Bildschirm auf und zeige dir, wo du bei Google Maps oder auf deiner Website Anfragen verlierst.
                </p>
                <div className="mt-3 text-xs font-bold text-[#FF705D] flex items-center gap-1 group-hover:text-[#653683] transition-colors">
                  <span>Video-Check anfordern</span>
                  <span>➔</span>
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* 4. Wer ich bin (Über Manu mit Foto-Slider) */}
        <section className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E7E2DC] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-[#17131A] font-heading">
              Wer ich bin
            </h2>
            <Link
              href="/ueber-manu"
              className="text-xs font-bold text-[#653683] hover:text-[#FF705D] transition-colors"
            >
              Mein Weg ➔
            </Link>
          </div>

          {/* Interaktiver Foto-Slider */}
          <ManuPhotoSlider />

          <p className="text-xs sm:text-sm text-[#17131A] font-semibold leading-relaxed pt-1">
            Bevor ich Websites gebaut habe, war ich elf Jahre im Betrieb:
          </p>

          <ul className="space-y-2 text-xs sm:text-sm text-[#746D76] leading-relaxed">
            <li className="flex gap-2.5">
              <span className="text-[#FF705D] font-bold shrink-0 w-12">6 Jahre</span>
              <span>Inhaber eines EMS-Fitnessstudios</span>
            </li>
            <li className="flex gap-2.5">
              <span className="text-[#FF705D] font-bold shrink-0 w-12">2 Jahre</span>
              <span>Geschäftsführer meiner selbst aufgebauten Lasertag-Arena in Leverkusen</span>
            </li>
            <li className="flex gap-2.5">
              <span className="text-[#FF705D] font-bold shrink-0 w-12">3 Jahre</span>
              <span>Teil der Geschäftsführung bei Lasertag Evolution Düsseldorf und BattleKart Düsseldorf-Neuss</span>
            </li>
          </ul>

          <p className="text-xs sm:text-sm text-[#746D76] leading-relaxed">
            Ich weiß, wie es ist, wenn das Telefon still bleibt und am Monatsende trotzdem Miete und Löhne rausgehen. Deshalb frage ich bei jeder Website zuerst: Ruft danach jemand an?
          </p>

          <p className="text-xs sm:text-sm text-[#746D76] leading-relaxed">
            Heute baue ich Websites und Google-Profile für Betriebe in Wesel und am Niederrhein, ob Friseur, Heizungsbauer oder Eiscafé. Du sprichst dabei die ganze Zeit mit mir, von der ersten Nachricht bis zur fertigen Seite.
          </p>

          <div className="pt-1">
            <Link
              href="/ueber-manu"
              className="text-xs font-semibold text-[#653683] hover:text-[#FF705D] transition-colors inline-flex items-center gap-1"
            >
              <span>Mehr über meine Stationen lesen</span>
              <span>➔</span>
            </Link>
          </div>
        </section>

        {/* 5. Handwerker-Ratgeber & Checklisten */}
        <section className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E7E2DC] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#17131A] font-heading">
                Kostenlose Ratgeber & Checklisten
              </h2>
              <p className="text-xs text-[#746D76]">
                Zum Nachlesen und Selbermachen
              </p>
            </div>
            <Link
              href="/ratgeber"
              className="text-xs font-bold text-[#653683] hover:text-[#FF705D] transition-colors"
            >
              Alle ansehen ➔
            </Link>
          </div>

          <div className="space-y-2.5">
            {guides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group flex items-center gap-3.5 p-3 rounded-xl bg-[#FCFAF7] border border-[#E7E2DC] hover:border-[#653683]/40 hover:bg-white transition-all duration-150"
              >
                <div className="w-10 h-10 rounded-lg bg-white border border-[#E7E2DC] flex items-center justify-center shrink-0 p-1 group-hover:scale-105 transition-transform">
                  <Image
                    src={guide.icon}
                    alt={guide.title}
                    width={34}
                    height={34}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-[#17131A] group-hover:text-[#653683] transition-colors truncate">
                    {guide.title}
                  </div>
                  <div className="text-[11px] text-[#746D76] truncate">
                    {guide.sub}
                  </div>
                </div>
                <span className="text-xs text-stone-400 group-hover:text-[#653683] group-hover:translate-x-0.5 transition-all">
                  ➔
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 6. FlowScreen Windows 11 App */}
        <section>
          <Link
            href="/flowscreen"
            className="group block p-4.5 sm:p-5 rounded-2xl bg-white border border-[#E7E2DC] hover:border-[#653683]/50 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200/60 flex items-center justify-center shrink-0 p-1.5 group-hover:scale-105 transition-transform">
                <Image
                  src="/brand/app-icons/flowscreen-app-icon-3d.png"
                  alt="FlowScreen für Windows 11"
                  width={44}
                  height={44}
                  className="object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm sm:text-base font-bold text-[#17131A] group-hover:text-[#653683] transition-colors">
                    FlowScreen • Windows 11 App
                  </h2>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Kostenlos
                  </span>
                </div>
                <p className="text-xs text-[#746D76] leading-relaxed mt-0.5">
                  Meine Screenshot-App für Windows 11: aufnehmen, beschriften, teilen. Läuft lokal, ohne Konto und ohne Cloud.
                </p>
              </div>
              <span className="text-stone-400 group-hover:text-[#653683] text-lg pr-1">
                ➔
              </span>
            </div>
          </Link>
        </section>

        {/* 7. Footer & Rechtliches */}
        <footer className="pt-6 pb-4 text-center space-y-3 border-t border-[#E7E2DC] text-xs text-[#746D76]">
          <Link
            href="/"
            className="inline-block font-semibold text-[#17131A] hover:text-[#FF705D] transition-colors"
          >
            ← Zur Firmenflow Startseite
          </Link>
          <div className="flex items-center justify-center gap-4 text-xs font-medium">
            <Link href="/impressum" className="hover:text-[#17131A] transition-colors">
              Impressum
            </Link>
            <span>•</span>
            <Link href="/datenschutz" className="hover:text-[#17131A] transition-colors">
              Datenschutz
            </Link>
          </div>
          <p className="text-[11px] text-[#746D76]/80">
            Firmenflow • Manuel Landeck • Webdesign aus Wesel
          </p>
        </footer>
      </div>
    </main>
  );
}

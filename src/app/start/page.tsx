import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

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

const showcases = [
  {
    name: "Eiscafé Orrico",
    sector: "Gastronomie & Eiscafé",
    href: "/projekte/eiscafe-orrico",
  },
  {
    name: "Autotransport Alex",
    sector: "Logistik & Fahrzeugtransport",
    href: "/projekte/autotransport-alex",
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
            Ich helfe Handwerkern und lokalen Betrieben dabei, online gefunden zu werden und echte Kundenanfragen zu gewinnen.
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
                Kurze Frage oder Projekt besprechen • Unverbindlich
              </div>
            </div>
            <span className="text-stone-400 group-hover:text-emerald-700 transition-colors text-lg pr-1">
              ➔
            </span>
          </a>

          {/* Erstgespräch buchen (Signature Button) */}
          <Link
            href="/#kontakt"
            className="group block relative rounded-2xl p-0.5 bg-gradient-to-r from-[#FF8878] via-[#CF5CC2] to-[#8B62CF] shadow-md shadow-[#482361]/15 hover:shadow-lg hover:shadow-[#482361]/25 hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-[calc(1rem-2px)] bg-gradient-to-r from-[#4E2338] to-[#3A1C28] text-white">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 p-1.5 group-hover:scale-105 transition-transform">
                <Image
                  src="/3D_Icons/01_Prozess_und_Website/04-persoenlicher-ansprechpartner.webp"
                  alt="Persönlich mit Manu"
                  width={44}
                  height={44}
                  className="object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm sm:text-base font-bold leading-tight">
                  Persönlich mit Manu
                </div>
                <div className="text-xs text-rose-100/80 mt-0.5">
                  30 Min. Erstgespräch sichern • Kostenlos
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
            href="/#kontakt"
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
                    Kostenloser Video-Check für deinen Betrieb
                  </h2>
                  <span className="text-xs text-[#FF705D] font-bold">Gratis</span>
                </div>
                <p className="text-xs sm:text-sm text-[#746D76] leading-relaxed mt-1">
                  Nenne mir deine Website oder deinen Firmennamen. Ich nehme ein 5-Minuten-Screenvideo für dich auf und zeige dir ehrlich, wo du bei Google Maps oder auf deiner Website Anfragen verlierst.
                </p>
                <div className="mt-3 text-xs font-bold text-[#FF705D] flex items-center gap-1 group-hover:text-[#653683] transition-colors">
                  <span>Video-Check unverbindlich anfordern</span>
                  <span>➔</span>
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* 4. Handwerker-Ratgeber & Checklisten */}
        <section className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E7E2DC] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#17131A] font-heading">
                Kostenlose Ratgeber & Checklisten
              </h2>
              <p className="text-xs text-[#746D76]">
                Praxis-Wissen für Handwerker & Betriebe am Niederrhein
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

        {/* 5. FlowScreen Windows-Tool */}
        <section>
          <Link
            href="/flowscreen"
            className="group block p-4.5 sm:p-5 rounded-2xl bg-white border border-[#E7E2DC] hover:border-[#653683]/50 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200/60 flex items-center justify-center shrink-0 p-1.5 group-hover:scale-105 transition-transform">
                <Image
                  src="/brand/app-icons/flowscreen-app-icon-3d.png"
                  alt="FlowScreen"
                  width={44}
                  height={44}
                  className="object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm sm:text-base font-bold text-[#17131A] group-hover:text-[#653683] transition-colors">
                    FlowScreen für Windows
                  </h2>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Kostenlos
                  </span>
                </div>
                <p className="text-xs text-[#746D76] leading-relaxed mt-0.5">
                  Screenshots blitzschnell erfassen, beschriften und teilen. Ohne Konto und ohne Cloud.
                </p>
              </div>
              <span className="text-stone-400 group-hover:text-[#653683] text-lg pr-1">
                ➔
              </span>
            </div>
          </Link>
        </section>

        {/* 6. Regionale Showcases */}
        <section className="space-y-2.5 pt-2">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#746D76]">
              Referenzen am Niederrhein
            </h2>
            <Link
              href="/#projekte"
              className="text-xs font-bold text-[#653683] hover:text-[#FF705D] transition-colors"
            >
              Mehr Projekte ➔
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {showcases.map((project) => (
              <Link
                key={project.href}
                href={project.href}
                className="group p-3 rounded-xl bg-white border border-[#E7E2DC] hover:border-[#FF705D]/40 hover:bg-[#FCFAF7] transition-all shadow-sm"
              >
                <div className="text-xs font-bold text-[#17131A] group-hover:text-[#653683] transition-colors truncate">
                  {project.name}
                </div>
                <div className="text-[11px] text-[#746D76] truncate mt-0.5">
                  {project.sector}
                </div>
              </Link>
            ))}
          </div>
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

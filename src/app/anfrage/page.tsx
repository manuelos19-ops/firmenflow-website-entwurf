import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProjectInquiry } from "@/components/inquiry/ProjectInquiry";
import { siteIdentity } from "@/config/site";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { ArrowLeft, ArrowRight } from "@/components/brand/FirmenflowUiIcon";
import { FirmenflowIcon } from "@/components/brand/FirmenflowIcon";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Anfrage – In 4 kurzen Schritten zum klaren nächsten Schritt",
  description:
    "Unverbindliche Anfrage für Website und Lokalpräsenz 360° in Wesel & am Niederrhein. Frei kombinierbar, persönlich mit Manu, ohne Verpflichtung.",
  alternates: {
    canonical: "/anfrage",
  },
};

export default function AnfragePage() {
  const whatsappUrl = buildWhatsAppUrl(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
    process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE
  );

  return (
    <main id="main" className="pt-32 sm:pt-40 pb-24 md:pb-32 bg-gradient-to-b from-transparent via-[var(--color-plum)]/5 to-[var(--color-paper)] min-h-screen text-[var(--color-ink)]">
      <Container className="max-w-4xl space-y-10 sm:space-y-12">
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[var(--color-muted)] hover:text-[var(--color-plum)] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Zurück zur Startseite</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center sm:text-left space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-plum)]/10 text-[var(--color-plum)] text-xs font-bold tracking-wide">
            <BrandIcon size="xs" variant="dark" />
            <span>Persönlich mit Manu · Webdesign aus Wesel</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[var(--color-ink)] leading-[1.12]">
            Was soll sich für deinen{" "}
            <span className="font-editorial text-[var(--color-coral)]">Betrieb verbessern?</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[var(--color-muted)] leading-relaxed">
            Sag mir kurz, was du vorhast. Ich schaue mir deine Angaben persönlich an und melde
            mich mit einer ersten Einschätzung und dem passenden nächsten Schritt.
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-[var(--color-muted)] pt-1">
            <span className="inline-flex items-center gap-1.5">
              <FirmenflowIcon name="nachricht-senden" size={20} decorative />
              <span>Kostenlos & unverbindlich</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FirmenflowIcon name="termin" size={20} decorative />
              <span>Persönlich mit Manu</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FirmenflowIcon name="termin" size={20} decorative />
              <span>Rückmeldung i. d. R. innerhalb eines Werktags</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FirmenflowIcon name="formular" size={20} decorative />
              <span>Noch kein fertiger Plan nötig</span>
            </span>
          </div>
        </div>

        {/* The 5-Step Configurator */}
        <div className="double-bezel-outer p-1 sm:p-1.5 rounded-[2.25rem] sm:rounded-[2.75rem] shadow-2xl">
          <ProjectInquiry whatsappUrl={whatsappUrl} />
        </div>

        {/* Direct Contact Alternative */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[var(--color-line)] shadow-sm space-y-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <FirmenflowIcon name="termin" size={28} decorative />
                <h3 className="text-base sm:text-lg font-bold text-[var(--color-ink)] font-sans">
                  Du möchtest nicht tippen, sondern lieber direkt sprechen?
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[var(--color-muted)]">
                Ruf mich an, sichere dir einen freien 30-Minuten-Termin in meinem Kalender oder schreib mir unkompliziert per WhatsApp.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href="tel:015567277155"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-[var(--color-ink)] text-xs sm:text-sm font-semibold shadow-sm transition-all hover:scale-105 active:scale-95"
              >
                <FirmenflowIcon name="telefon" size={18} decorative className="shrink-0" />
                <span>Anrufen</span>
              </a>

              <a
                href={siteIdentity.meetergoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-plum)] hover:bg-[var(--color-plum-light)] !text-white text-white text-xs sm:text-sm font-semibold shadow-sm transition-all hover:scale-105 active:scale-95"
                style={{ color: "#ffffff" }}
              >
                <FirmenflowIcon name="termin" size={20} decorative />
                <span className="!text-white text-white">30 Min. Call buchen</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </a>

              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all hover:scale-105 active:scale-95"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>WhatsApp</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

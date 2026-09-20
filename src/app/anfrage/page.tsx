import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProjectInquiry } from "@/components/inquiry/ProjectInquiry";
import { siteIdentity } from "@/config/site";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { ArrowLeft } from "@/components/brand/FirmenflowUiIcon";
import { FirmenflowIcon } from "@/components/brand/FirmenflowIcon";
import { FirmenflowButton } from "@/components/ui/FirmenflowButton";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Anfrage – In 4 kurzen Schritten zum klaren nächsten Schritt",
  description:
    "Unverbindliche Anfrage für Website und Lokalpräsenz 360° in Wesel & am Niederrhein. Frei kombinierbar und persönlich mit mir, ohne Verpflichtung.",
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
    <main id="main" className="relative min-h-screen overflow-hidden bg-gradient-to-b from-transparent via-[var(--color-plum)]/5 to-[var(--color-paper)] pb-24 pt-32 text-[var(--color-ink)] sm:pt-40 md:pb-32">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-[var(--color-coral)]/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-[42rem] h-[30rem] w-[30rem] rounded-full bg-[var(--color-plum-light)]/10 blur-3xl" />
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
        <div className="relative max-w-2xl space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-plum)]/10 text-[var(--color-plum)] text-xs font-bold tracking-wide">
            <BrandIcon size="xs" variant="dark" />
            <span>Persönlich mit mir · Webdesign aus Wesel</span>
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
              <span>Rückmeldung i. d. R. innerhalb eines Werktags</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FirmenflowIcon name="formular" size={20} decorative />
              <span>Noch kein fertiger Plan nötig</span>
            </span>
          </div>
        </div>

        {/* Der geführte 4-Schritte-Konfigurator */}
        <div className="double-bezel-outer relative rounded-[2.25rem] p-1 shadow-2xl sm:rounded-[2.75rem] sm:p-1.5">
          <ProjectInquiry whatsappUrl={whatsappUrl} />
        </div>

        {/* Direct Contact Alternative */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[var(--color-line)] shadow-sm space-y-4 text-center sm:text-left">
          <div className="space-y-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <FirmenflowIcon name="termin" size={28} decorative />
                <h3 className="text-base sm:text-lg font-bold text-[var(--color-ink)] font-sans">
                  Du möchtest lieber einen direkten Weg?
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[var(--color-muted)]">
                Ruf mich an, buch dir einen Termin, schreib mir per WhatsApp oder hol dir eine kostenlose Video-Einschätzung.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <FirmenflowButton
                href="tel:015567277155"
                buttonIcon="anrufen"
                size="compact"
                subline="Ohne Termin"
                className="w-full"
              >
                Ruf mich an
              </FirmenflowButton>

              <FirmenflowButton
                href={siteIdentity.meetergoUrl}
                external
                buttonIcon="kennenlernen"
                size="compact"
                subline="30 Minuten mit mir"
                className="w-full"
              >
                Termin mit mir buchen
              </FirmenflowButton>

              {whatsappUrl && (
                <FirmenflowButton
                  href={whatsappUrl}
                  external
                  buttonIcon="whatsapp"
                  size="compact"
                  subline="Direkter Chat mit mir"
                  className="w-full"
                >
                  Schreib mir per WhatsApp
                </FirmenflowButton>
              )}

              <FirmenflowButton
                href="/#website-check"
                buttonIcon="video-einschaetzung"
                size="compact"
                subline="3–5 Minuten · per E-Mail"
                className="w-full"
              >
                Kostenlose Video-Einschätzung für Website &amp; Google-Profil
              </FirmenflowButton>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

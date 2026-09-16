import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ProjectInquiry } from "@/components/inquiry/ProjectInquiry";
import { siteIdentity } from "@/config/site";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { ArrowLeft, Clock, Phone, Calendar, ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Projektanfrage – In 5 Schritten zum klaren Angebot",
  description:
    "Geführte Projektanfrage für Webdesign, Relaunch und Lokalpräsenz in Wesel & am Niederrhein. Unverbindlich, transparent und persönlich mit Manu.",
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
            Lass uns dein Vorhaben <br />
            <span className="font-editorial text-[var(--color-coral)]">auf den Punkt bringen.</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[var(--color-muted)] leading-relaxed">
            Egal ob neue Website, Relaunch oder stärkere Google-Lokalpräsenz: In 5 einfachen Schritten klären wir Ziele, Umfang und Zeitplan – für ein transparentes, verlässliches Angebot ohne Agenturtheater.
          </p>

          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-[var(--color-muted)] pt-1">
            <Clock className="w-4 h-4 text-[var(--color-plum)]" />
            <span>Rückmeldung i. d. R. innerhalb von 24 Stunden</span>
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
              <h3 className="text-base sm:text-lg font-bold text-[var(--color-ink)] font-sans">
                Du möchtest nicht tippen, sondern lieber direkt sprechen?
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-muted)]">
                Schnapp dir direkt einen freien 30-Minuten-Termin in Manus Kalender oder schreib unkompliziert per WhatsApp.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <a
                href={siteIdentity.meetergoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-plum)] hover:bg-[var(--color-plum-light)] !text-white text-white text-xs sm:text-sm font-semibold shadow-sm transition-all hover:scale-105 active:scale-95"
                style={{ color: "#ffffff" }}
              >
                <Calendar className="w-4 h-4 text-white" />
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

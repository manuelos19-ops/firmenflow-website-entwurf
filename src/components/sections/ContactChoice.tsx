"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { siteIdentity } from "@/config/site";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { ProjectInquiry } from "@/components/inquiry/ProjectInquiry";
import { WebsiteCheckInquiry } from "@/components/inquiry/WebsiteCheckInquiry";
import { ArrowRight, ChevronDown } from "lucide-react";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { FirmenflowIcon } from "@/components/brand/FirmenflowIcon";
import { trackMeetergoClick, trackWhatsAppClick } from "@/lib/track-inquiry";
import { cn } from "@/lib/cn";

interface ContactChoiceProps {
  whatsappUrl: string | null;
}

export function ContactChoice({ whatsappUrl }: ContactChoiceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      gsap.from(".contact-reveal", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section 
      ref={containerRef} 
      id="kontakt" 
      className="relative pt-32 pb-36 md:pt-40 md:pb-44 bg-gradient-to-b from-transparent via-[var(--color-plum)] via-15% to-[var(--color-plum)] text-white overflow-hidden scroll-mt-24"
    >
      <Container className="relative z-20">
        {/* Section Header */}
        <div className="contact-reveal text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <span className="badge-eyebrow-dark mb-5">
            <BrandIcon variant="light" className="w-4 h-3.5" />
            <span>Persönlich mit Manu</span>
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display leading-[1.08] mb-5">
            Was soll sich für deinen Betrieb verbessern?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            Sag mir kurz, was du vorhast. Ich schaue mir deine Angaben persönlich an und melde mich mit einer ersten Einschätzung und dem passenden nächsten Schritt.
          </p>
        </div>

        {/* HAUPT-FORMULAR: 4-Stufen-Anfrage direkt auf der Startseite */}
        <div id="projektanfrage" className="contact-reveal max-w-4xl mx-auto space-y-6 scroll-mt-28">
          <div className="double-bezel-outer-dark p-1 sm:p-1.5 rounded-[2.25rem] sm:rounded-[2.75rem] shadow-2xl">
            <ProjectInquiry whatsappUrl={whatsappUrl} />
          </div>
          {/* Direkt-Alternative (wie auf /anfrage) */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-4 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <FirmenflowIcon name="termin" size={28} decorative />
                  <h3 className="text-base sm:text-lg font-bold text-white font-sans">
                    Du möchtest nicht tippen, sondern lieber direkt sprechen?
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-white/75">
                  Schnapp dir direkt einen freien 30-Minuten-Termin in Manus Kalender oder schreib unkompliziert per WhatsApp.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                <a
                  href={siteIdentity.meetergoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackMeetergoClick("contact_section")}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--color-coral)] hover:bg-[#e44d39] !text-white text-white text-xs sm:text-sm font-semibold shadow-sm transition-all hover:scale-105 active:scale-95"
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
                    onClick={() => trackWhatsAppClick("contact_section")}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all hover:scale-105 active:scale-95"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            </div>
          </div>
          {/* Video-Analyse: gleiche Box-Optik wie Direkt-Alternative, Formular aufklappbar */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-4 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <FirmenflowIcon name="video-website-check" size={28} decorative />
                  <h3 className="text-base sm:text-lg font-bold text-white font-sans">
                    Lieber erst eine kostenlose Video-Einschätzung deiner Website?
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-white/75">
                  Ich schaue mir deine aktuelle Website an und schicke dir eine 3–5-Minuten-Video-Auswertung – unverbindlich per E-Mail.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setVideoOpen((v) => !v)}
                aria-expanded={videoOpen}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
              >
                <span>{videoOpen ? "Formular schließen" : "Video-Analyse anfordern"}</span>
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 text-white/80 transition-transform duration-300",
                    videoOpen && "rotate-180"
                  )}
                />
              </button>
            </div>
            {videoOpen && (
              <div className="pt-2">
                <WebsiteCheckInquiry />
                <p className="text-center text-xs text-white/50 pt-3 pb-1">
                  Nur eine kurze Ersteinschätzung{" "}
                  <Link href="/anfrage" className="underline hover:text-white transition-colors">
                    für konkrete Projekte nutze die Anfrage oben
                  </Link>.
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

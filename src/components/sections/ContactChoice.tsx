"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { siteIdentity } from "@/config/site";
import { FirmenflowButton } from "@/components/ui/FirmenflowButton";
import { ProjectInquiry } from "@/components/inquiry/ProjectInquiry";
import { WebsiteCheckInquiry } from "@/components/inquiry/WebsiteCheckInquiry";
import { ChevronDown } from "@/components/brand/FirmenflowUiIcon";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { FirmenflowIcon } from "@/components/brand/FirmenflowIcon";
import { trackMeetergoClick, trackWhatsAppClick } from "@/lib/track-inquiry";
import { scrollToId } from "@/lib/scroll";
import { cn } from "@/lib/cn";

interface ContactChoiceProps {
  whatsappUrl: string | null;
}

export function ContactChoice({ whatsappUrl }: ContactChoiceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      if (hash === "#website-check" || hash === "#videoanalyse") {
        setVideoOpen(true);
        setTimeout(() => {
          scrollToId("website-check");
          const el = document.getElementById("website-check");
          if (el) {
            const firstInput = el.querySelector<HTMLInputElement>("input:not([type=hidden]):not([disabled])");
            if (firstInput) {
              firstInput.focus({ preventScroll: true });
            }
          }
        }, 200);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

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
        <div className="contact-reveal text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <span className="badge-eyebrow-dark mb-4">
            <BrandIcon variant="light" className="w-4 h-3.5" />
            <span>Lass uns sprechen</span>
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display leading-[1.08] mb-4">
            Lass uns sprechen. Wie es für dich am besten passt.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            Ganz gleich, ob du kurz anrufst, mir eine WhatsApp schreibst oder dir eine Video-Einschätzung holst: Du sprichst immer persönlich mit mir – transparent, auf Augenhöhe und ohne Verkaufsdruck.
          </p>
        </div>

        {/* 4-Stufen-Anfrage direkt auf der Startseite */}
        <div id="projektanfrage" className="contact-reveal max-w-4xl mx-auto space-y-6 scroll-mt-28">
          <div className="double-bezel-outer-dark p-1 sm:p-1.5 rounded-[2.25rem] sm:rounded-[2.75rem] shadow-2xl">
            <ProjectInquiry whatsappUrl={whatsappUrl} />
          </div>

          {/* Alternative Optionen: Direktkontakt & Video-Check */}
          <div className="pt-2 space-y-4">
            <div className="flex items-center gap-4 my-2">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-xs uppercase tracking-widest text-white/50 font-semibold font-mono">
                Oder direkt ohne Formular
              </span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Option A: Direkt sprechen */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <FirmenflowIcon name="termin" size={24} decorative />
                    <h3 className="text-base font-bold text-white font-sans">
                      Lieber direkt sprechen?
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                    Ruf mich an, sichere dir einen freien 30-Minuten-Termin in meinem Kalender oder schreib mir unkompliziert per WhatsApp.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-2.5 pt-1 sm:grid-cols-3 md:grid-cols-1 xl:grid-cols-3">
                  <FirmenflowButton
                    href="tel:015567277155"
                    buttonIcon="anrufen"
                    size="compact"
                    subline="Ohne Termin"
                    className="w-full"
                  >
                    Mich anrufen
                  </FirmenflowButton>
                  <FirmenflowButton
                    href={siteIdentity.meetergoUrl}
                    external
                    buttonIcon="kennenlernen"
                    size="compact"
                    subline="30 Minuten mit mir"
                    onClick={() => trackMeetergoClick("contact_section")}
                    className="w-full"
                  >
                    Kostenlos kennenlernen
                  </FirmenflowButton>
                  {whatsappUrl && (
                    <FirmenflowButton
                      href={whatsappUrl}
                      external
                      buttonIcon="whatsapp"
                      size="compact"
                      subline="Direkter Chat mit mir"
                      onClick={() => trackWhatsAppClick("contact_section")}
                      className="w-full"
                    >
                      Mir per WhatsApp schreiben
                    </FirmenflowButton>
                  )}
                </div>
              </div>

              {/* Option B: Video-Einschätzung */}
              <div id="website-check" className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col justify-between gap-4 scroll-mt-28">
                <div id="videoanalyse" className="sr-only" />
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <FirmenflowIcon name="video-website-check" size={24} decorative />
                    <h3 className="text-base font-bold text-white font-sans">
                      Kostenlose Video-Einschätzung
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-white/75 leading-relaxed">
                    Ich schaue mir deine Website und dein Google-Unternehmensprofil an und schicke dir eine 3–5-Minuten-Video-Auswertung – unverbindlich per E-Mail.
                  </p>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => setVideoOpen((v) => !v)}
                    aria-expanded={videoOpen}
                    aria-controls="website-check-form-wrapper"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-semibold shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
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
              </div>
            </div>

            {/* Video-Check Formular (aufgeklappt) */}
            {videoOpen && (
              <div id="website-check-form-wrapper" className="pt-2 animate-in fade-in duration-300">
                <WebsiteCheckInquiry />
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

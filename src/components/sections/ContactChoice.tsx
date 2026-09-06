"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { homeContent } from "@/content/site";
import { portraitAssets } from "@/content/assets";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { ProjectInquiry } from "@/components/inquiry/ProjectInquiry";
import { WebsiteCheckInquiry } from "@/components/inquiry/WebsiteCheckInquiry";
import { MapPin, Clock, Phone, Mail, Sliders } from "lucide-react";
import { BrandIcon } from "@/components/brand/BrandIcon";

interface ContactChoiceProps {
  whatsappUrl: string | null;
}

export function ContactChoice({ whatsappUrl }: ContactChoiceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"check" | "project">("check");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const search = window.location.search;
      const hash = window.location.hash;
      if (search.includes("type=") || hash === "#gefuellte-anfrage" || hash === "#projekt-konfigurator") {
        setActiveTab("project");
      }
    }
  }, []);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      gsap.from(".contact-reveal", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
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

  const { contact } = homeContent;

  return (
    <section 
      ref={containerRef} 
      id="kontakt" 
      className="relative pt-36 pb-36 md:pt-44 md:pb-44 bg-gradient-to-b from-transparent via-[var(--color-plum)] via-15% to-[var(--color-plum)] text-white overflow-hidden"
    >
      <Container className="relative z-20">
        {/* Section Header */}
        <div className="contact-reveal text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 text-sm sm:text-base font-bold text-white mb-6 border border-white/20 shadow-md backdrop-blur-md">
            <BrandIcon variant="light" className="w-4 h-3.5" />
            <span>{contact.eyebrow}</span>
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display leading-[1.05] mb-6">
            Kurz schreiben oder direkt das <br className="hidden sm:block" />
            <span className="font-editorial text-[var(--color-coral)]">Projekt einordnen.</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            {contact.body}
          </p>
        </div>

        {/* Quick Contact Bar */}
        <div className="contact-reveal grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          {/* WhatsApp Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center mb-5">
                <WhatsAppIcon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold font-sans text-white mb-2">Schnell via WhatsApp</h3>
              <p className="text-sm text-white/75 leading-relaxed mb-6">
                Unkompliziert und direkt: Schreib mir eine kurze Nachricht mit deinen Fragen oder Vorstellungen.
              </p>
            </div>
            
            {whatsappUrl ? (
              <MagneticButton>
                <ButtonLink 
                  href={whatsappUrl} 
                  external={true}
                  variant="whatsapp"
                  className="w-full justify-center shadow-lg shadow-[#25D366]/25"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white mr-1 shrink-0" />
                  <span>WhatsApp öffnen</span>
                </ButtonLink>
              </MagneticButton>
            ) : (
              <p className="text-xs text-white/50 italic">WhatsApp aktuell nicht konfiguriert</p>
            )}
          </div>

          {/* Manu Contact Info Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group">
            {/* Warm Glow Background */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-[var(--color-coral)]/15 rounded-full blur-2xl pointer-events-none" />

            <div>
              {/* Status Header */}
              <div className="flex items-center justify-between gap-2 mb-5">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-white/90">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Antwort garantiert innerhalb 24h</span>
                </span>
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-[var(--color-coral)] bg-[var(--color-coral)]/10 px-2.5 py-0.5 rounded-full border border-[var(--color-coral)]/20">
                  Inhaber
                </span>
              </div>

              {/* Photo & Identity Row */}
              <div className="flex items-center gap-4 sm:gap-5 mb-6">
                <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-2xl overflow-hidden shrink-0 border-2 border-white/30 shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/media/portraits/manu-contact-portrait.webp"
                    alt="Manuel Landeck – Dein persönlicher Ansprechpartner"
                    fill
                    className="object-cover object-center"
                    sizes="120px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-50" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl sm:text-2xl font-bold text-white font-sans">Manuel Landeck</h4>
                  <p className="text-xs sm:text-sm text-white/75 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[var(--color-coral)] shrink-0" />
                    <span>Wesel &amp; Niederrhein</span>
                  </p>
                  <p className="text-xs text-white/60 pt-0.5">
                    Webdesign &amp; Foto/Video vor Ort
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <a
                href="tel:015567277155"
                className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Phone className="w-3.5 h-3.5 text-[var(--color-coral)]" />
                <span>Anrufen</span>
              </a>
              <a
                href="mailto:manu@firmenflow.de"
                className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Mail className="w-3.5 h-3.5 text-white/80" />
                <span>E-Mail</span>
              </a>
            </div>
          </div>
        </div>

        {/* INTERAKTIVE FORMULAR-WEICHE (Tabs / Segmented Control) */}
        <div id="projektanfrage" className="contact-reveal max-w-4xl mx-auto space-y-6 scroll-mt-28">
          {/* Segmented Switcher Header */}
          <div className="bg-white/10 backdrop-blur-md p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* Tab 1: Schnell-Check */}
            <button
              type="button"
              onClick={() => setActiveTab("check")}
              className={cn(
                "p-4 sm:p-5 rounded-xl sm:rounded-2xl text-left transition-all duration-300 relative flex flex-col justify-between group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-coral)]",
                activeTab === "check"
                  ? "bg-white text-[var(--color-ink)] shadow-xl scale-[1.01]"
                  : "text-white/80 hover:text-white hover:bg-white/5"
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors",
                      activeTab === "check"
                        ? "bg-[var(--color-coral)]/10 text-[var(--color-coral)]"
                        : "bg-white/15 text-white"
                    )}
                  >
                    <BrandIcon size="xs" variant={activeTab === "check" ? "dark" : "light"} />
                    <span>1-Klick-Check · 1 Min.</span>
                  </span>
                  <span
                    className={cn(
                      "text-[10px] font-semibold px-2 py-0.5 rounded-full transition-colors",
                      activeTab === "check"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-white/10 text-white/70"
                    )}
                  >
                    Beliebt für Erstkontakt
                  </span>
                </div>
                <h3
                  className={cn(
                    "text-base sm:text-lg font-bold font-sans transition-colors",
                    activeTab === "check" ? "text-[var(--color-ink)]" : "text-white"
                  )}
                >
                  Website-Check &amp; Erstgespräch
                </h3>
                <p
                  className={cn(
                    "text-xs leading-relaxed mt-1 transition-colors",
                    activeTab === "check" ? "text-[var(--color-muted)]" : "text-white/70"
                  )}
                >
                  Kostenlose Video-Einschätzung deiner aktuellen Seite oder 30-Min. Live-Termin.
                </p>
              </div>
            </button>

            {/* Tab 2: Geführte Projektanfrage */}
            <button
              type="button"
              onClick={() => setActiveTab("project")}
              className={cn(
                "p-4 sm:p-5 rounded-xl sm:rounded-2xl text-left transition-all duration-300 relative flex flex-col justify-between group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-coral)]",
                activeTab === "project"
                  ? "bg-white text-[var(--color-ink)] shadow-xl scale-[1.01]"
                  : "text-white/80 hover:text-white hover:bg-white/5"
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors",
                      activeTab === "project"
                        ? "bg-[var(--color-plum)]/10 text-[var(--color-plum)]"
                        : "bg-white/15 text-white"
                    )}
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>5-Schritte-Konfigurator</span>
                  </span>
                  <span
                    className={cn(
                      "text-[10px] font-semibold px-2 py-0.5 rounded-full transition-colors",
                      activeTab === "project"
                        ? "bg-[var(--color-plum)]/15 text-[var(--color-plum)]"
                        : "bg-white/10 text-white/70"
                    )}
                  >
                    Für Relaunches &amp; Neubau
                  </span>
                </div>
                <h3
                  className={cn(
                    "text-base sm:text-lg font-bold font-sans transition-colors",
                    activeTab === "project" ? "text-[var(--color-ink)]" : "text-white"
                  )}
                >
                  Geführte Projektanfrage
                </h3>
                <p
                  className={cn(
                    "text-xs leading-relaxed mt-1 transition-colors",
                    activeTab === "project" ? "text-[var(--color-muted)]" : "text-white/70"
                  )}
                >
                  Detaillierte Abfrage von Zielen, Zeitplan und Leistungsumfang in 5 Schritten.
                </p>
              </div>
            </button>
          </div>

          {/* Aktives Formular mit sanfter Animation */}
          <div className="transition-all duration-300">
            {activeTab === "check" ? (
              <div className="space-y-4">
                <WebsiteCheckInquiry />
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("project");
                      document.getElementById("projektanfrage")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors cursor-pointer"
                  >
                    <span>Du möchtest dein Vorhaben direkt im Detail planen?</span>
                    <span className="underline font-semibold text-[var(--color-coral)]">Zur geführten 5-Schritte-Projektanfrage →</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl bg-white">
                  <ProjectInquiry whatsappUrl={whatsappUrl} />
                </div>
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("check");
                      document.getElementById("projektanfrage")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors cursor-pointer"
                  >
                    <span>Lieber erst eine schnelle Video-Einschätzung deiner Website?</span>
                    <span className="underline font-semibold text-[var(--color-coral)]">Zum 1-Klick-Check wechseln →</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

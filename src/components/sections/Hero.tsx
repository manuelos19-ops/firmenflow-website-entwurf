"use client";

import Image from "next/image";
import { FirmenflowButton } from "@/components/ui/FirmenflowButton";
import { Container } from "@/components/ui/Container";
import { portraitAssets } from "@/content/assets";
import { homeContent } from "@/content/site";

interface HeroProps {
  whatsappUrl: string | null;
}

export function Hero({ whatsappUrl }: HeroProps) {
  const { hero } = homeContent;
  const resolvedWhatsappUrl = whatsappUrl || "https://wa.me/4915567277155";

  return (
    <section 
      id="hero"
      className="relative min-h-[85vh] flex flex-col justify-between pt-24 pb-6 lg:pt-32 lg:pb-10 bg-transparent text-[var(--color-ink)] overflow-hidden"
    >
      <Container className="relative z-10 flex-grow flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 my-auto">
        
        {/* Left Side: Copy & CTAs */}
        <div className="flex-1 flex flex-col items-start w-full z-10 max-w-2xl lg:max-w-none">
          
          {/* Microscopic High-End Eyebrow Tag */}
          <div className="badge-eyebrow mb-4 sm:mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-coral)] animate-pulse" />
            <span>{hero.eyebrow}</span>
          </div>

          {/* Calm, Stable, High-End Editorial Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl leading-[1.12] tracking-tight mb-4 sm:mb-5 select-none font-display font-extrabold text-[var(--color-ink)]">
            <span className="block">{hero.title[0]}</span>
            <span className="text-[var(--color-plum)] block">
              die deinen Betrieb <span className="font-editorial italic font-normal text-[var(--color-coral)]">vor Ort sichtbar machen.</span>
            </span>
          </h1>

          {/* Body Text */}
          <p className="hero-body text-base sm:text-lg text-[var(--color-muted)] max-w-xl leading-relaxed mb-6 sm:mb-8">
            {hero.body}
          </p>

          {/* CTAs: Primär oben (mobil volle Breite), darunter Anrufen & WhatsApp IMMER nebeneinander */}
          <div className="flex flex-col items-stretch gap-4 mb-2 sm:mb-4 w-full sm:w-auto max-w-xl">
            <div className="hero-cta-wrap w-full">
              <FirmenflowButton
                href="#website-check"
                buttonIcon="video-einschaetzung"
                subline="3 bis 5 Minuten · meine Einschätzung für dich"
                className="w-full"
              >
                Kostenlose Video-Einschätzung
              </FirmenflowButton>
            </div>

            {/* Feste 2er-Gruppe: Anruf & WhatsApp auf JEDER Bildschirmgröße garantiert nebeneinander */}
            <div className="grid grid-cols-2 items-stretch gap-3 w-full">
              <FirmenflowButton
                href={hero.phoneTel}
                buttonIcon="anrufen"
                size="compact"
                subline="Lass uns kurz sprechen"
              >
                Ruf mich an
              </FirmenflowButton>
              <FirmenflowButton
                href={resolvedWhatsappUrl}
                external
                buttonIcon="whatsapp"
                size="compact"
                subline="Schnell & einfach"
              >
                Schreib mir per WhatsApp
              </FirmenflowButton>
            </div>
          </div>

          {/* MOBILE ONLY: Hero Portrait direkt unter den CTAs */}
          <div className="lg:hidden w-full max-w-[340px] sm:max-w-sm my-6 sm:my-8 relative self-center">
            <div className="double-bezel-outer p-1.5 rounded-[2.25rem] bg-black/[0.03]">
              <div className="hero-photo-wrap relative aspect-[4/4.9] rounded-[calc(2.25rem-0.375rem)] overflow-hidden shadow-xl border border-white/60">
                <Image
                  src={portraitAssets.hero.src}
                  alt={portraitAssets.hero.alt}
                  fill
                  priority
                  fetchPriority="high"
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 340px"
                />
                
                {/* Gradient bottom overlay on photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/55 via-transparent to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium backdrop-blur-md bg-black/40 p-2.5 rounded-xl border border-white/20 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white text-sm tracking-tight">Manu</p>
                      <p className="text-white/80 text-[11px]">Gründer von Firmenflow · Wesel</p>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[10px] font-semibold text-emerald-300 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-90" />
                      <span>Online</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Rotating Badge */}
            <div className="hero-badge-float absolute -top-3 -right-3 sm:-right-4 w-22 h-22 sm:w-26 sm:h-26 rounded-full bg-white/95 text-[var(--color-ink)] shadow-xl border-2 border-[var(--color-line)] flex items-center justify-center p-1.5 z-20 backdrop-blur-md">
              <div className="w-full h-full relative flex items-center justify-center rotating-badge">
                <svg viewBox="0 0 120 120" className="w-full h-full select-none">
                  <path
                    id="heroCirclePathMobile"
                    d="M 60, 60 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
                    fill="none"
                  />
                  <circle cx="15" cy="60" r="2.2" fill="var(--color-coral)" />
                  <circle cx="105" cy="60" r="2.2" fill="var(--color-coral)" />
                  <text className="text-[9.5px] uppercase font-extrabold tracking-[0.28em] fill-[var(--color-plum)]" textAnchor="middle">
                    <textPath href="#heroCirclePathMobile" startOffset="25%">
                      FIRMENFLOW
                    </textPath>
                  </text>
                  <text className="text-[9.5px] uppercase font-extrabold tracking-[0.32em] fill-[var(--color-plum)]" textAnchor="middle">
                    <textPath href="#heroCirclePathMobile" startOffset="75%">
                      WEBDESIGN
                    </textPath>
                  </text>
                </svg>
              </div>
              <div className="absolute w-4 h-7 sm:w-5 sm:h-8 flex items-center justify-center pointer-events-none">
                <Image
                  src="/brand/firmenflow-mark.webp"
                  alt="Firmenflow Signet"
                  fill
                  className="object-contain drop-shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Portrait + Floating Badges (DESKTOP ONLY) */}
        <div className="hidden lg:block flex-1 w-full relative max-w-md lg:max-w-none">
          <div className="double-bezel-outer p-2 rounded-[2.75rem] bg-black/[0.03]">
            <div className="hero-photo-wrap relative aspect-[4/5] rounded-[calc(2.75rem-0.5rem)] overflow-hidden shadow-2xl border border-white/60">
              <Image
                src={portraitAssets.hero.src}
                alt={portraitAssets.hero.alt}
                fill
                priority
                fetchPriority="high"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            
            {/* Gradient bottom overlay on photo */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/50 via-transparent to-transparent" />
            
            <div className="absolute bottom-5 left-5 right-5 text-white text-sm font-medium backdrop-blur-md bg-black/40 p-3.5 rounded-2xl border border-white/20 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-white text-sm sm:text-base tracking-tight">Manu</p>
                  <p className="text-white/80 text-xs">Gründer von Firmenflow · Wesel</p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[11px] font-semibold text-emerald-300 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 opacity-90" />
                  <span>Online</span>
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* Modern Editorial Floating Rotating Badge (Frosted White + Legible Text + Official FF Mark) */}
          <div className="hero-badge-float absolute -top-5 -right-5 md:-right-7 w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-white/95 text-[var(--color-ink)] shadow-2xl border-2 border-[var(--color-line)] flex items-center justify-center p-2 z-20 backdrop-blur-md">
            <div className="w-full h-full relative flex items-center justify-center rotating-badge">
              <svg viewBox="0 0 120 120" className="w-full h-full select-none">
                <path
                  id="heroCirclePath"
                  d="M 60, 60 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
                  fill="none"
                />
                {/* 100% symmetrische Trennpunkte auf 9 Uhr und 3 Uhr (exakt 180° gegenüber) */}
                <circle cx="15" cy="60" r="2.2" fill="var(--color-coral)" />
                <circle cx="105" cy="60" r="2.2" fill="var(--color-coral)" />

                {/* FIRMENFLOW - zentriert auf oberem Bogen (12 Uhr) */}
                <text className="text-[9.5px] uppercase font-extrabold tracking-[0.28em] fill-[var(--color-plum)]" textAnchor="middle">
                  <textPath href="#heroCirclePath" startOffset="25%">
                    FIRMENFLOW
                  </textPath>
                </text>

                {/* WEBDESIGN - zentriert auf unterem Bogen (6 Uhr) */}
                <text className="text-[9.5px] uppercase font-extrabold tracking-[0.32em] fill-[var(--color-plum)]" textAnchor="middle">
                  <textPath href="#heroCirclePath" startOffset="75%">
                    WEBDESIGN
                  </textPath>
                </text>
              </svg>
            </div>
            {/* Official Firmenflow FF Signet (proportional verkleinert fuer perfekte Passung) */}
            <div className="absolute w-5 h-8 sm:w-6 sm:h-9 md:w-7 md:h-10 flex items-center justify-center pointer-events-none">
              <Image
                src="/brand/firmenflow-mark.webp"
                alt="Firmenflow Signet"
                fill
                className="object-contain drop-shadow-sm"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* 100% Mathematically Seamless Infinite Marquee */}
      <div className="marquee-container mt-8 sm:mt-12 py-3.5 border-y border-[var(--color-line)] bg-white/50 backdrop-blur-sm overflow-hidden select-none w-full">
        <div className="flex w-max">
          {/* Track 1 */}
          <div className="flex shrink-0 items-center gap-8 pr-8 animate-marquee text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--color-ink)]/75">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="flex items-center gap-8">
                <span>Websites für lokale Unternehmen</span>
                <span className="w-2 h-2 rounded-full bg-[var(--color-coral)]" />
                <span>100% Persönlich mit Manu</span>
                <span className="w-2 h-2 rounded-full bg-[var(--color-plum)]" />
                <span>Wesel &amp; Niederrhein</span>
                <span className="w-2 h-2 rounded-full bg-[var(--color-coral)]" />
                <span>Lokalpräsenz 360°</span>
                <span className="w-2 h-2 rounded-full bg-[var(--color-plum)]" />
                <span>Kein Agentur-Theater</span>
                <span className="w-2 h-2 rounded-full bg-[var(--color-coral)]" />
              </span>
            ))}
          </div>

          {/* Track 2 (Exact Duplicate for 0-jump seamless infinite loop) */}
          <div className="flex shrink-0 items-center gap-8 pr-8 animate-marquee text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--color-ink)]/75" aria-hidden="true">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="flex items-center gap-8">
                <span>Websites für lokale Unternehmen</span>
                <span className="w-2 h-2 rounded-full bg-[var(--color-coral)]" />
                <span>100% Persönlich mit Manu</span>
                <span className="w-2 h-2 rounded-full bg-[var(--color-plum)]" />
                <span>Wesel &amp; Niederrhein</span>
                <span className="w-2 h-2 rounded-full bg-[var(--color-coral)]" />
                <span>Lokalpräsenz 360°</span>
                <span className="w-2 h-2 rounded-full bg-[var(--color-plum)]" />
                <span>Kein Agentur-Theater</span>
                <span className="w-2 h-2 rounded-full bg-[var(--color-coral)]" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

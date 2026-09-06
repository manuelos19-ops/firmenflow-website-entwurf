"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP, gsap, prefersReducedMotion } from "@/lib/gsap";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Container } from "@/components/ui/Container";
import { portraitAssets } from "@/content/assets";
import { homeContent } from "@/content/site";
import { Sparkles } from "lucide-react";

interface HeroProps {
  whatsappUrl: string | null;
}

export function Hero({ whatsappUrl }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { hero } = homeContent;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".hero-title-line",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }
      )
        .fromTo(
          ".hero-accent",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        )
        .fromTo(
          ".hero-body",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".hero-cta-wrap",
          { opacity: 0, scale: 0.95, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.1 },
          "-=0.3"
        )
        .fromTo(
          ".hero-photo-wrap",
          { opacity: 0, scale: 0.96, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "power3.out" },
          "-=0.8"
        )
        .fromTo(
          ".hero-badge-float",
          { opacity: 0, scale: 0, rotation: -30 },
          { opacity: 1, scale: 1, rotation: 0, duration: 0.7, ease: "back.out(1.5)" },
          "-=0.6"
        );
    },
    { scope: containerRef }
  );

  return (
    <section 
      ref={containerRef} 
      id="hero"
      className="relative min-h-[85vh] flex flex-col justify-between pt-28 pb-4 lg:pt-36 lg:pb-8 bg-transparent text-[var(--color-ink)] overflow-hidden"
    >
      <Container className="relative z-10 flex-grow flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 my-auto">
        
        {/* Left Side: Copy */}
        <div className="flex-1 flex flex-col items-start w-full z-10 max-w-2xl lg:max-w-none">
          
          {/* Calm, Stable, High-End Editorial Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight mb-6 select-none">
            {/* Line 1 */}
            <span className="hero-title-line block font-display font-extrabold text-[var(--color-ink)]">
              Mehr Lokalpräsenz.
            </span>
            {/* Line 2 */}
            <span className="hero-title-line block font-display font-extrabold text-[var(--color-plum)]">
              Weniger <span className="font-editorial italic font-normal text-[var(--color-coral)]">Agenturtheater.</span>
            </span>
          </h1>

          {/* Accent in Crimson Text Italic */}
          <div className="hero-accent text-2xl sm:text-3xl md:text-4xl font-editorial italic text-[var(--color-coral)] mb-6">
            {hero.accent}
          </div>

          {/* Body Text */}
          <p className="hero-body text-base sm:text-lg md:text-xl text-[var(--color-muted)] max-w-xl leading-relaxed mb-8 sm:mb-10">
            {hero.body}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <div className="hero-cta-wrap">
              <MagneticButton>
                <ButtonLink 
                  href={whatsappUrl || "#"} 
                  external={Boolean(whatsappUrl)}
                  variant="whatsapp"
                  size="lg"
                  className="shadow-lg shadow-[#25D366]/25 text-sm sm:text-base px-6 py-3.5"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white mr-1 shrink-0" />
                  <span>{hero.primaryCta}</span>
                </ButtonLink>
              </MagneticButton>
            </div>

            <div className="hero-cta-wrap">
              <MagneticButton>
                <ButtonLink 
                  href="#projektanfrage" 
                  variant="secondary"
                  size="lg"
                  className="hover:border-[var(--color-plum)] text-sm sm:text-base px-6 py-3.5"
                >
                  {hero.secondaryCta}
                </ButtonLink>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Right Side: Portrait + Floating Badges */}
        <div className="flex-1 w-full relative max-w-md lg:max-w-none">
          <div className="hero-photo-wrap relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src={portraitAssets.hero.src}
              alt={portraitAssets.hero.alt}
              fill
              priority
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

          {/* Modern Editorial Floating Rotating Badge (Frosted White + Legible Text + Official FF Mark) */}
          <div className="hero-badge-float absolute -top-5 -right-5 md:-right-7 w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-white/95 text-[var(--color-ink)] shadow-2xl border-2 border-[var(--color-line)] flex items-center justify-center p-2 z-20 backdrop-blur-md">
            <div className="w-full h-full relative flex items-center justify-center rotating-badge">
              <svg viewBox="0 0 120 120" className="w-full h-full">
                <path
                  id="circlePath"
                  d="M 60, 60 m -45, 0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
                  fill="none"
                />
                <text className="text-[10px] sm:text-[10.5px] uppercase font-bold tracking-[0.38em] fill-[var(--color-plum)]">
                  <textPath href="#circlePath" startOffset="0%">
                    FIRMENFLOW • WEBDESIGN • 
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
                <span>Google Business 360°</span>
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
                <span>Google Business 360°</span>
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

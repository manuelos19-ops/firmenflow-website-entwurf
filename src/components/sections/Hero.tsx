"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP, gsap, prefersReducedMotion } from "@/lib/gsap";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { portraitAssets } from "@/content/assets";
import { homeContent } from "@/content/site";
import { cn } from "@/lib/cn";
import { MessageCircle, Sparkles, MapPin } from "lucide-react";

interface HeroProps {
  whatsappUrl: string | null;
}

export function Hero({ whatsappUrl }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { hero } = homeContent;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Initial state
      gsap.set(".hero-eyebrow", { opacity: 0, y: -15 });
      gsap.set(".hero-title-line", { opacity: 0, y: 35, skewY: 2 });
      gsap.set(".hero-accent", { opacity: 0, scale: 0.95, y: 20 });
      gsap.set(".hero-body", { opacity: 0, y: 25 });
      gsap.set(".hero-cta-wrap", { opacity: 0, y: 20 });
      gsap.set(".hero-photo-wrap", { scale: 0.94, opacity: 0 });
      gsap.set(".hero-badge-float", { scale: 0, rotation: -45 });

      // Choreographed timeline
      tl.to(".hero-eyebrow", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.1,
      })
      .to(".hero-title-line", {
        opacity: 1,
        y: 0,
        skewY: 0,
        stagger: 0.15,
        duration: 1,
        ease: "back.out(1.2)",
      }, "-=0.4")
      .to(".hero-accent", {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
      }, "-=0.5")
      .to(".hero-body", {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, "-=0.4")
      .to(".hero-cta-wrap", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
      }, "-=0.4")
      .to(".hero-photo-wrap", {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      }, 0.2)
      .to(".hero-badge-float", {
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(1.6)",
      }, "-=0.4");
    },
    { scope: containerRef }
  );

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-12 lg:pt-40 lg:pb-16 bg-[var(--color-paper)] text-[var(--color-ink)] overflow-hidden"
    >
      <Container className="flex-grow flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 my-auto">
        
        {/* Left Side: Copy */}
        <div className="flex-1 flex flex-col items-start w-full z-10 max-w-2xl lg:max-w-none">
          
          {/* Eyebrow */}
          <div className="hero-eyebrow inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--color-plum)]/5 border border-[var(--color-plum)]/10 text-xs font-semibold text-[var(--color-plum)] mb-6">
            <MapPin className="w-3.5 h-3.5 text-[var(--color-coral)]" />
            <span>{hero.eyebrow}</span>
          </div>

          {/* Punchy Title in Atmosphere Grotesk */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-display text-[var(--color-ink)] leading-[1.02] tracking-tight mb-5">
            <span className="hero-title-line block text-[var(--color-ink)]">
              {hero.title[0]}
            </span>
            <span className="hero-title-line block text-[var(--color-plum)]">
              {hero.title[1]}
            </span>
          </h1>

          {/* Accent in Crimson Text Italic */}
          <div className="hero-accent text-2xl sm:text-3xl md:text-4xl font-editorial text-[var(--color-coral)] mb-8">
            {hero.accent}
          </div>

          {/* Body Text */}
          <p className="hero-body text-base sm:text-lg md:text-xl text-[var(--color-muted)] max-w-xl leading-relaxed mb-12">
            {hero.body}
          </p>

          {/* CTAs with generous margin */}
          <div className="flex flex-wrap items-center gap-5">
            <div className="hero-cta-wrap">
              <MagneticButton>
                <ButtonLink 
                  href={whatsappUrl || "#"} 
                  external={Boolean(whatsappUrl)}
                  variant="primary"
                  size="lg"
                  className="shadow-lg shadow-[var(--color-coral)]/25"
                >
                  <MessageCircle className="w-5 h-5 mr-1" />
                  {hero.primaryCta}
                </ButtonLink>
              </MagneticButton>
            </div>

            <div className="hero-cta-wrap">
              <MagneticButton>
                <ButtonLink 
                  href="#projektanfrage" 
                  variant="secondary"
                  size="lg"
                  className="hover:border-[var(--color-plum)]"
                >
                  {hero.secondaryCta}
                </ButtonLink>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Right Side: Portrait + Floating Badges */}
        <div className="flex-1 w-full relative max-w-lg lg:max-w-none">
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
            
            <div className="absolute bottom-6 left-6 right-6 text-white text-sm font-medium backdrop-blur-md bg-black/30 p-4 rounded-2xl border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-white text-base">Manuel Landeck</p>
                  <p className="text-white/80 text-xs">Webdesigner &amp; Entwickler aus Wesel</p>
                </div>
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              </div>
            </div>
          </div>

          {/* Rotating Circular Badge */}
          <div className="hero-badge-float absolute -top-6 -right-6 md:-right-8 w-28 h-28 md:w-32 md:h-32 rounded-full bg-[var(--color-plum)] text-white shadow-xl flex items-center justify-center p-2 z-20">
            <div className="w-full h-full relative flex items-center justify-center rotating-badge">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
                <text className="text-[10.5px] uppercase font-bold tracking-[0.22em] fill-[var(--color-paper)]">
                  <textPath href="#circlePath" startOffset="0%">
                    WESEL • NIEDERRHEIN • MANU •
                  </textPath>
                </text>
              </svg>
            </div>
            <Sparkles className="w-6 h-6 text-[var(--color-coral)] absolute" />
          </div>
        </div>
      </Container>

      {/* Marquee Ticker at Bottom with generous spacing */}
      <div className="mt-20 pt-8 pb-4 border-y border-[var(--color-line)] bg-white/40 backdrop-blur-sm overflow-hidden select-none">
        <div className="marquee-track flex whitespace-nowrap gap-10 text-xs sm:text-sm font-bold uppercase tracking-widest text-[var(--color-ink)]/70">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-10">
              <span>Websites für lokale Unternehmen</span>
              <span className="w-2 h-2 rounded-full bg-[var(--color-coral)]"></span>
              <span>100% Persönlich mit Manu</span>
              <span className="w-2 h-2 rounded-full bg-[var(--color-plum)]"></span>
              <span>Wesel &amp; Niederrhein</span>
              <span className="w-2 h-2 rounded-full bg-[var(--color-coral)]"></span>
              <span>Google Business 360°</span>
              <span className="w-2 h-2 rounded-full bg-[var(--color-plum)]"></span>
              <span>Kein Agentur-Theater</span>
              <span className="w-2 h-2 rounded-full bg-[var(--color-coral)]"></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

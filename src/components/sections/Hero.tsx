"use client";

import { useEffect, useRef, useState } from "react";
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

  // Typographic typing & font-morphing state
  const [line1Text, setLine1Text] = useState("");
  const [line2Text, setLine2Text] = useState("");
  const [line1Morphed, setLine1Morphed] = useState(false);
  const [line2Morphed, setLine2Morphed] = useState(false);
  const [isTypingDone, setIsTypingDone] = useState(false);

  const fullLine1 = hero.title[0]; // "Mehr Lokalpräsenz."
  const fullLine2 = hero.title[1]; // "Weniger Agenturtheater."

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLine1Text(fullLine1);
      setLine2Text(fullLine2);
      setLine1Morphed(true);
      setLine2Morphed(true);
      setIsTypingDone(true);
      return;
    }

    let l1Index = 0;
    let l2Index = 0;

    // Start typing line 1
    const typeLine1 = () => {
      const interval1 = setInterval(() => {
        l1Index++;
        setLine1Text(fullLine1.slice(0, l1Index));

        if (l1Index >= fullLine1.length) {
          clearInterval(interval1);
          // Morph line 1 to Atmosphere Grotesk after short pause
          setTimeout(() => {
            setLine1Morphed(true);
            // Start line 2
            setTimeout(typeLine2, 180);
          }, 140);
        }
      }, 42);
    };

    const typeLine2 = () => {
      const interval2 = setInterval(() => {
        l2Index++;
        setLine2Text(fullLine2.slice(0, l2Index));

        if (l2Index >= fullLine2.length) {
          clearInterval(interval2);
          // Morph line 2 to Atmosphere Grotesk
          setTimeout(() => {
            setLine2Morphed(true);
            setIsTypingDone(true);
          }, 140);
        }
      }, 38);
    };

    const initialTimeout = setTimeout(typeLine1, 200);

    return () => {
      clearTimeout(initialTimeout);
    };
  }, [fullLine1, fullLine2]);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Initial state for non-typing elements
      gsap.set(".hero-eyebrow", { opacity: 0, y: -15 });
      gsap.set(".hero-accent", { opacity: 0, scale: 0.95, y: 15 });
      gsap.set(".hero-body", { opacity: 0, y: 20 });
      gsap.set(".hero-cta-wrap", { opacity: 0, y: 20 });
      gsap.set(".hero-photo-wrap", { scale: 0.94, opacity: 0 });
      gsap.set(".hero-badge-float", { scale: 0, rotation: -45 });

      // Choreographed entrance alongside the typing
      tl.to(".hero-eyebrow", {
        opacity: 1,
        y: 0,
        duration: 0.7,
      })
      .to(".hero-photo-wrap", {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      }, 0.1)
      .to(".hero-badge-float", {
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(1.6)",
      }, 0.5)
      .to(".hero-accent", {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }, 1.2)
      .to(".hero-body", {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, 1.4)
      .to(".hero-cta-wrap", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
      }, 1.6);
    },
    { scope: containerRef }
  );

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[85vh] flex flex-col justify-between pt-28 pb-6 lg:pt-36 lg:pb-10 bg-[var(--color-paper)] text-[var(--color-ink)] overflow-hidden"
    >
      <Container className="flex-grow flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 my-auto">
        
        {/* Left Side: Copy */}
        <div className="flex-1 flex flex-col items-start w-full z-10 max-w-2xl lg:max-w-none">
          
          {/* Eyebrow */}
          <div className="hero-eyebrow inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--color-plum)]/5 border border-[var(--color-plum)]/10 text-xs font-semibold text-[var(--color-plum)] mb-5">
            <MapPin className="w-3.5 h-3.5 text-[var(--color-coral)]" />
            <span>{hero.eyebrow}</span>
          </div>

          {/* Interactive Typing & Font-Morphing Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.04] tracking-tight mb-5 min-h-[120px] sm:min-h-[140px] md:min-h-[160px] lg:min-h-[180px]">
            {/* Line 1 */}
            <span 
              className={cn(
                "block transition-all duration-500",
                line1Morphed 
                  ? "font-display text-[var(--color-ink)]" 
                  : "font-editorial text-[var(--color-coral)] italic tracking-normal"
              )}
            >
              {line1Text || "\u00A0"}
              {!line1Morphed && (
                <span className="inline-block w-[3px] h-[0.9em] bg-[var(--color-coral)] ml-1 animate-pulse align-middle" />
              )}
            </span>

            {/* Line 2 */}
            <span 
              className={cn(
                "block transition-all duration-500",
                line2Morphed 
                  ? "font-display text-[var(--color-plum)]" 
                  : "font-editorial text-[var(--color-plum-light)] italic tracking-normal"
              )}
            >
              {line2Text || (line1Morphed && !line2Morphed ? "" : "")}
              {line1Morphed && !line2Morphed && (
                <span className="inline-block w-[3px] h-[0.9em] bg-[var(--color-plum)] ml-1 animate-pulse align-middle" />
              )}
            </span>
          </h1>

          {/* Accent in Crimson Text Italic */}
          <div className="hero-accent text-2xl sm:text-3xl md:text-4xl font-editorial text-[var(--color-coral)] mb-6">
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
                  variant="primary"
                  size="lg"
                  className="shadow-lg shadow-[var(--color-coral)]/25 text-sm sm:text-base px-6 py-3.5"
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
            
            <div className="absolute bottom-5 left-5 right-5 text-white text-sm font-medium backdrop-blur-md bg-black/30 p-3.5 rounded-2xl border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-white text-sm sm:text-base">Manuel Landeck</p>
                  <p className="text-white/80 text-xs">Webdesigner &amp; Entwickler aus Wesel</p>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
            </div>
          </div>

          {/* Rotating Circular Badge */}
          <div className="hero-badge-float absolute -top-5 -right-5 md:-right-7 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-[var(--color-plum)] text-white shadow-xl flex items-center justify-center p-2 z-20">
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
            <Sparkles className="w-5 h-5 text-[var(--color-coral)] absolute" />
          </div>
        </div>
      </Container>

      {/* Marquee Ticker at Bottom with fast, dynamic animation */}
      <div className="mt-8 sm:mt-12 pt-4 pb-3 border-y border-[var(--color-line)] bg-white/50 backdrop-blur-sm overflow-hidden select-none">
        <div className="marquee-track flex whitespace-nowrap gap-8 text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--color-ink)]/75">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-8">
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

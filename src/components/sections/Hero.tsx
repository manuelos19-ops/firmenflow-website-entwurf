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

const WORDS = [
  { text: "Mehr", line: 1, colorClass: "text-[var(--color-ink)]", morphColor: "text-[var(--color-ink)]" },
  { text: "Lokalpräsenz.", line: 1, colorClass: "text-[var(--color-ink)]", morphColor: "text-[var(--color-ink)]" },
  { text: "Weniger", line: 2, colorClass: "text-[var(--color-plum)]", morphColor: "text-[var(--color-plum)]" },
  { text: "Agenturtheater.", line: 2, colorClass: "text-[var(--color-plum)]", morphColor: "text-[var(--color-plum)]" },
];

export function Hero({ whatsappUrl }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { hero } = homeContent;

  // Word-by-word typed text and morph state
  const [typedWords, setTypedWords] = useState<string[]>(["", "", "", ""]);
  const [morphedWords, setMorphedWords] = useState<boolean[]>([false, false, false, false]);
  const [activeWordIndex, setActiveWordIndex] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypedWords(WORDS.map((w) => w.text));
      setMorphedWords([true, true, true, true]);
      setActiveWordIndex(4);
      return;
    }

    let currentWord = 0;
    let currentChar = 0;

    const typeNextChar = () => {
      if (currentWord >= WORDS.length) {
        setActiveWordIndex(4);
        return;
      }

      const targetWord = WORDS[currentWord].text;

      if (currentChar < targetWord.length) {
        currentChar++;
        setTypedWords((prev) => {
          const next = [...prev];
          next[currentWord] = targetWord.slice(0, currentChar);
          return next;
        });
        setTimeout(typeNextChar, 40);
      } else {
        // Current word finished typing -> trigger morph
        const finishedWordIdx = currentWord;
        setTimeout(() => {
          setMorphedWords((prev) => {
            const next = [...prev];
            next[finishedWordIdx] = true;
            return next;
          });

          // Move to next word after a short pause
          currentWord++;
          currentChar = 0;
          setActiveWordIndex(currentWord);
          setTimeout(typeNextChar, 120);
        }, 100);
      }
    };

    const timer = setTimeout(typeNextChar, 250);
    return () => clearTimeout(timer);
  }, []);

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

      // Choreographed entrance
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

          {/* Stable, Jump-Free Headline with Word-by-Word Typing & Morphing */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.06] tracking-tight mb-5 select-none">
            {/* Line 1: Mehr Lokalpräsenz. */}
            <span className="block mb-1 sm:mb-2">
              {/* Word 0: Mehr */}
              <span 
                className={cn(
                  "inline-block mr-2 sm:mr-3 transition-all duration-300",
                  morphedWords[0] 
                    ? "font-display text-[var(--color-ink)]" 
                    : "font-editorial text-[var(--color-coral)] italic tracking-normal"
                )}
              >
                {typedWords[0] || (activeWordIndex === 0 ? "" : "")}
                {activeWordIndex === 0 && !morphedWords[0] && (
                  <span className="inline-block w-[3px] h-[0.85em] bg-[var(--color-coral)] ml-0.5 animate-pulse align-middle" />
                )}
              </span>

              {/* Word 1: Lokalpräsenz. */}
              <span 
                className={cn(
                  "inline-block transition-all duration-300",
                  morphedWords[1] 
                    ? "font-display text-[var(--color-ink)]" 
                    : "font-editorial text-[var(--color-coral)] italic tracking-normal"
                )}
              >
                {typedWords[1]}
                {activeWordIndex === 1 && !morphedWords[1] && (
                  <span className="inline-block w-[3px] h-[0.85em] bg-[var(--color-coral)] ml-0.5 animate-pulse align-middle" />
                )}
              </span>
            </span>

            {/* Line 2: Weniger Agenturtheater. (Pre-structured so mobile never breaks unexpectedly) */}
            <span className="block">
              {/* Word 2: Weniger */}
              <span 
                className={cn(
                  "inline-block mr-2 sm:mr-3 transition-all duration-300",
                  morphedWords[2] 
                    ? "font-display text-[var(--color-plum)]" 
                    : "font-editorial text-[var(--color-plum-light)] italic tracking-normal"
                )}
              >
                {typedWords[2]}
                {activeWordIndex === 2 && !morphedWords[2] && (
                  <span className="inline-block w-[3px] h-[0.85em] bg-[var(--color-plum)] ml-0.5 animate-pulse align-middle" />
                )}
              </span>

              {/* Word 3: Agenturtheater. (Separate inline-block / block on very small screens to prevent mid-typing wrap) */}
              <span 
                className={cn(
                  "inline-block transition-all duration-300",
                  morphedWords[3] 
                    ? "font-display text-[var(--color-plum)]" 
                    : "font-editorial text-[var(--color-plum-light)] italic tracking-normal"
                )}
              >
                {typedWords[3]}
                {activeWordIndex === 3 && !morphedWords[3] && (
                  <span className="inline-block w-[3px] h-[0.85em] bg-[var(--color-plum)] ml-0.5 animate-pulse align-middle" />
                )}
              </span>
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

      {/* Marquee Ticker at Bottom */}
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

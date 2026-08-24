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

interface HeroProps {
  whatsappUrl: string | null;
}

export function Hero({ whatsappUrl }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { hero } = homeContent;

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        return; // Skip animations, elements are already visible by default
      }

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      // Initial state setup to avoid FOUC and ensure SSR visibility without JS
      gsap.set(".word-inner", { y: "110%" });
      gsap.set(".hero-eyebrow", { opacity: 0, x: -20 });
      gsap.set(".hero-accent", { opacity: 0, y: 20 });
      gsap.set(".hero-body", { opacity: 0, y: 20 });
      gsap.set(".hero-ctas", { opacity: 0, y: 20 });
      gsap.set(".hero-photo", { scale: 1.05, opacity: 0 });

      // Eyebrow
      tl.to(
        ".hero-eyebrow",
        { opacity: 1, x: 0, duration: 1, delay: 0.1 }
      )
      // Titles
      .to(".word-line-0 .word-inner", {
        y: "0%",
        duration: 1,
        stagger: 0.06,
      }, "<0.1")
      .to(".word-line-1 .word-inner", {
        y: "0%",
        duration: 1,
        stagger: 0.06,
      }, "<0.15")
      // Accent
      .to(".hero-accent", {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, ">-0.3")
      // Body
      .to(".hero-body", {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, "<0.1")
      // CTAs
      .to(".hero-ctas", {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, "<0.1")
      // Photo
      .to(".hero-photo", {
        scale: 1,
        opacity: 1,
        duration: 1.5,
      }, 0.2); // Start early alongside the rest

    },
    { scope: containerRef }
  );

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex flex-col pt-32 pb-16 lg:pt-40 lg:pb-24 bg-[var(--color-paper)] text-[var(--color-ink)] overflow-hidden"
    >
      <Container className="flex-grow flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left Side: Content */}
        <div className="flex-1 flex flex-col items-start w-full z-10">
          <div className="hero-eyebrow flex items-center gap-4 mb-8">
            <span className="w-8 h-[2px] bg-[var(--color-coral)]"></span>
            <span className="text-sm font-medium tracking-wide uppercase text-[var(--color-muted)]">
              {hero.eyebrow}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium tracking-tight leading-[1.05] mb-6">
            {hero.title.map((line, lineIndex) => (
              <span 
                key={lineIndex} 
                className={cn("block word-line-" + lineIndex, lineIndex > 0 && "mt-2")}
              >
                {line.split(" ").map((word, wordIndex) => (
                  <span 
                    key={wordIndex} 
                    className="inline-block overflow-hidden mr-[0.3em] pb-1"
                  >
                    <span className="word-inner inline-block">
                      {word}
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <div className="hero-accent text-3xl md:text-4xl font-editorial text-[var(--color-plum)] mb-6">
            {hero.accent}
          </div>

          <p className="hero-body text-lg md:text-xl text-[var(--color-muted)] max-w-xl mb-10 leading-relaxed">
            {hero.body}
          </p>

          <div className="hero-ctas flex flex-wrap items-center gap-6">
            <MagneticButton>
              <ButtonLink 
                href={whatsappUrl || "#"} 
                external={Boolean(whatsappUrl)}
                variant="primary"
              >
                {hero.primaryCta}
              </ButtonLink>
            </MagneticButton>

            <MagneticButton>
              <ButtonLink 
                href="#projektanfrage" 
                variant="secondary"
              >
                {hero.secondaryCta}
              </ButtonLink>
            </MagneticButton>
          </div>
        </div>

        {/* Right Side: Photo */}
        <div className="flex-1 w-full relative mt-12 lg:mt-0 max-w-2xl lg:max-w-none mx-auto">
          <div className="hero-photo relative aspect-[4/5] rounded-[2rem] overflow-hidden">
            <Image
              src={portraitAssets.hero.src}
              alt={portraitAssets.hero.alt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
          </div>
          
          {/* Rotating Badge */}
          <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 w-32 h-32 md:w-40 md:h-40 z-20">
            <div className="w-full h-full bg-[var(--color-paper)] rounded-full flex items-center justify-center p-2 shadow-xl">
              <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
                <path
                  id="textPath"
                  d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                  fill="none"
                />
                <text className="text-[11.5px] uppercase font-bold tracking-widest fill-[var(--color-plum)]">
                  <textPath href="#textPath" startOffset="0%">
                    Wesel &amp; Niederrhein • Wesel &amp; Niederrhein •
                  </textPath>
                </text>
              </svg>
            </div>
          </div>
        </div>
      </Container>

      {/* Marquee Ticker */}
      <div className="mt-20 lg:mt-auto w-full border-y border-[var(--color-line)] py-4 overflow-hidden bg-white/50 backdrop-blur-sm group">
        <div className="flex whitespace-nowrap animate-marquee group-hover:pause-animation">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-4 text-sm font-medium tracking-wider uppercase text-[var(--color-ink)]">
              <span>Webdesign</span>
              <span className="w-2 h-2 rounded-full bg-[var(--color-coral)]"></span>
              <span>Lokalpräsenz</span>
              <span className="w-2 h-2 rounded-full bg-[var(--color-coral)]"></span>
              <span>Relaunch</span>
              <span className="w-2 h-2 rounded-full bg-[var(--color-coral)]"></span>
              <span>Google Business</span>
              <span className="w-2 h-2 rounded-full bg-[var(--color-coral)]"></span>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .pause-animation {
          animation-play-state: paused;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}} />
    </section>
  );
}

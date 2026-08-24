"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { homeContent } from "@/content/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MagneticButton } from "@/components/effects/MagneticButton";
import { cn } from "@/lib/cn";

export function GoogleBusinessPilot() {
  const containerRef = useRef<HTMLElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) return;

    const pills = pillsRef.current?.querySelectorAll(".module-pill");
    if (pills?.length) {
      gsap.fromTo(
        pills,
        { 
          opacity: 0, 
          y: 40,
          rotation: () => gsap.utils.random(-15, 15)
        },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          stagger: 0.1,
          ease: "back.out(1.5)",
          duration: 0.8,
          scrollTrigger: {
            trigger: pillsRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative bg-[var(--color-plum)] text-white pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden"
    >
      {/* Wave divider at top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-12 md:h-24 fill-[var(--color-paper)] drop-shadow-sm"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>

      <Container>
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <span className="text-[var(--color-coral)] font-medium tracking-wider uppercase text-sm mb-6">
            {homeContent.pilot.eyebrow}
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-8">
            Nicht nur gefunden werden. Auch <span className="font-editorial text-[var(--color-coral)]">richtig wirken.</span>
          </h2>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
            {homeContent.pilot.body}
          </p>
        </div>

        <div ref={pillsRef} className="flex flex-wrap justify-center gap-4 md:gap-6 mb-20 md:mb-28 max-w-5xl mx-auto">
          {homeContent.pilot.modules.map((module, index) => {
            // Slightly offset vertically to give a scattered appearance naturally
            const offsetClass = index % 3 === 0 ? "md:translate-y-4" : index % 2 === 0 ? "md:-translate-y-2" : "md:translate-y-1";
            return (
              <div 
                key={index} 
                className={cn(
                  "module-pill group px-5 py-2.5 md:px-6 md:py-3.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/5",
                  "transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/20 hover:border-white/20 cursor-default",
                  offsetClass
                )}
              >
                <span className="text-sm md:text-base font-medium whitespace-nowrap text-white/90 group-hover:text-white transition-colors">
                  {module}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col items-center space-y-10">
          <MagneticButton>
            <ButtonLink href="#projektanfrage" className="bg-[var(--color-coral)] text-white hover:bg-[var(--color-coral)]/90 border-transparent">
              {homeContent.pilot.cta}
            </ButtonLink>
          </MagneticButton>
          
          <p className="text-xs md:text-sm text-white/40 max-w-xl text-center">
            Keine gekauften Bewertungen. Keine Rankinggarantie. Echte Kundenstimmen, richtlinienkonform aufgebaut.
          </p>
        </div>
      </Container>
    </section>
  );
}

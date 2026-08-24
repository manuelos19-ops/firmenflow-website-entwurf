"use client";

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { Container } from '@/components/ui/Container';
import { homeContent } from '@/content/site';

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  // Use process steps from site content, with fallback
  const processSteps = homeContent?.process || [
    { number: "01", title: "Kennenlernen", body: "Wir klären, was dein Betrieb anbietet..." },
    { number: "02", title: "Richtung", body: "Du bekommst eine klare Struktur..." },
    { number: "03", title: "Umsetzung", body: "Ich baue, teste und zeige dir..." },
    { number: "04", title: "Sauber online", body: "Nach deiner Freigabe..." },
  ];

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      // SVG Line Drawing Animation using pathLength and strokeDashoffset
      if (lineRef.current) {
        gsap.set(lineRef.current, { strokeDasharray: 100, strokeDashoffset: 100 });

        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".process-track",
            start: "top center",
            end: "bottom center",
            scrub: true,
          }
        });
      }

      // Steps reveal and nodes pulse
      const steps = gsap.utils.toArray('.process-step');
      
      steps.forEach((step: any) => {
        const node = step.querySelector('.process-node');
        const content = step.querySelector('.process-content');
        const number = step.querySelector('.process-number');
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: "top center+=100",
            end: "bottom center",
            scrub: true,
          }
        });

        // Node fill color pop
        tl.to(node, {
          backgroundColor: 'var(--color-coral)',
          scale: 1.1,
          duration: 0.5,
          ease: 'power2.out'
        }, 0);

        // Content fade in staggered
        gsap.fromTo(content, 
          { opacity: 0, x: -30 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 0.8, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
              once: true
            }
          }
        );

        // Subtle Parallax for the large background number
        gsap.fromTo(number,
          { y: -40 },
          {
            y: 40,
            ease: "none",
            scrollTrigger: {
              trigger: step,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
      });
    } else {
      // Reduced motion fallback state
      if (lineRef.current) gsap.set(lineRef.current, { strokeDasharray: 'none', strokeDashoffset: 0 });
      gsap.set('.process-content', { opacity: 1, x: 0 });
      gsap.set('.process-node', { backgroundColor: 'var(--color-coral)' });
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 bg-[var(--color-paper)] text-[var(--color-ink)] relative overflow-hidden" data-component="process-timeline">
      <Container>
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold font-sans tracking-tight max-w-2xl">
            Der Weg zur Website.
          </h2>
        </div>

        <div className="process-track relative flex max-w-4xl mx-auto">
          {/* Connecting Line Track */}
          <div className="absolute left-[19px] md:left-[27px] top-4 bottom-4 w-1 flex flex-col items-center z-0">
            <svg 
              className="h-full w-[2px]" 
              preserveAspectRatio="none" 
              viewBox="0 0 2 100" 
              height="100%"
            >
              {/* Background line */}
              <line 
                x1="1" 
                y1="0" 
                x2="1" 
                y2="100" 
                stroke="var(--color-line)" 
                strokeWidth="2" 
                vectorEffect="non-scaling-stroke"
              />
              {/* Animated fill line */}
              <path 
                ref={lineRef}
                d="M 1 0 L 1 100"
                pathLength="100"
                stroke="var(--color-coral)" 
                strokeWidth="2"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          <div className="flex flex-col gap-16 md:gap-32 w-full pt-4 pb-12">
            {processSteps.map((step, idx) => (
              <div key={idx} className="process-step relative flex gap-8 md:gap-12 w-full z-10 group">
                {/* Visual Node */}
                <div className="relative mt-2 md:mt-3 flex-shrink-0">
                  <div className="process-node w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-[var(--color-line)] bg-[var(--color-paper)] z-10 relative flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[var(--color-line)] group-hover:bg-[var(--color-paper)] transition-colors duration-300" />
                  </div>
                </div>

                {/* Step Content */}
                <div className="process-content relative pt-1 md:pt-3 w-full max-w-2xl">
                  {/* Decorative Background Number */}
                  <div className="process-number absolute -top-8 md:-top-16 -left-4 md:-left-8 text-8xl md:text-[12rem] font-editorial text-[var(--color-plum)] opacity-[0.03] select-none pointer-events-none -z-10 leading-none">
                    {step.number}
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-display text-[var(--color-ink)] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

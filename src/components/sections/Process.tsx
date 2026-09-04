"use client";

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { Container } from '@/components/ui/Container';
import { homeContent } from '@/content/site';
import { BrandIcon } from '@/components/brand/BrandIcon';

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  // Use process steps from site content, with fallback
  const processSteps = homeContent?.process || [
    { number: "01", title: "Kostenfreies Kennenlernen (ca. 30 Min.)", body: "Ich bespreche mit dir unverbindlich und kostenfrei deinen nächsten Schritt. Du kennst deinen Betrieb am besten: Bring einfach deine wichtigsten Gedanken mit, den Rest klären wir gemeinsam." },
    { number: "02", title: "Struktur & Design-Entwurf", body: "Ich erstelle die Seitenstruktur und den ersten interaktiven Entwurf. Du siehst genau, wie die Seite auf dem Smartphone wirkt, bevor alles final gebaut wird." },
    { number: "03", title: "Umsetzung & Texterstellung", body: "Ich formuliere verständliche Texte, binde deine Fotos ein und programmiere deine Website zügig und datenschutzkonform." },
    { number: "04", title: "Schlüsselfertig online", body: "Nach deiner finalen Freigabe schalte ich die Website live. Ich prüfe alle Buttons, richte SSL ein und verknüpfe dein Google-Maps-Profil." },
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
    <section ref={containerRef} id="ablauf" className="py-24 sm:py-32 md:py-40 bg-transparent text-[var(--color-ink)] relative overflow-hidden" data-component="process-timeline">
      <Container>
        <div className="mb-14 sm:mb-20 max-w-3xl">
          <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[var(--color-plum)]/10 border border-[var(--color-plum)]/20 text-sm sm:text-base font-bold text-[var(--color-plum)] mb-5 shadow-sm">
            <BrandIcon className="w-4 h-3.5" />
            <span>Ablauf · In 4 klaren Schritten</span>
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-[var(--color-ink)] mb-4">
            Der Weg zu deiner neuen Website.
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed">
            Keine monatelangen Wartezeiten: Flexibel und zügig in deinem Tempo – oft schon nach 1 bis 2 Wochen schlüsselfertig online. Wenn es eilt, nach Absprache auch schneller.
          </p>
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

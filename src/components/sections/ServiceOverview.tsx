"use client";

import { useRef } from "react";
import { homeContent } from "@/content/site";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

export function ServiceOverview() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (isReduced) {
        gsap.set(cardsRef.current, { autoAlpha: 1, y: 0 });
        return;
      }

      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 50, rotation: index % 2 === 0 ? -10 : 10 },
          {
            autoAlpha: 1,
            y: 0,
            rotation: index % 2 === 0 ? -2 : 1.5,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-[var(--color-paper)] relative overflow-hidden">
      <Container>
        <div className="mb-16 md:mb-24">
          <span className="text-sm font-semibold tracking-widest uppercase text-[var(--color-muted)]">
            Leistungen
          </span>
        </div>

        <div className="flex flex-col gap-12 md:gap-24 relative max-w-4xl mx-auto">
          {homeContent.services.map((service, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={service.slug}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className={cn(
                  "relative bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-[var(--color-line)]/20",
                  "transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:rotate-0 cursor-default",
                  "w-full md:w-[85%]",
                  isEven ? "self-start md:-rotate-2" : "self-end md:rotate-[1.5deg]"
                )}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-ink)] mb-4">
                  {service.title}
                </h3>
                <p className="text-lg text-[var(--color-muted)] mb-8 leading-relaxed">
                  {service.body}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.points.map((point) => (
                    <span
                      key={point}
                      className="inline-flex items-center rounded-full bg-[var(--color-paper)] px-4 py-1.5 text-sm font-medium text-[var(--color-ink)] border border-[var(--color-line)]/50"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

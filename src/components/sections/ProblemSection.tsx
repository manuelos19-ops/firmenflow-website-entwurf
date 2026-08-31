"use client";

import { useRef } from "react";
import { homeContent } from "@/content/site";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";

import { BrandIcon } from "@/components/brand/BrandIcon";

export function ProblemSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const overlayRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (isReduced) {
        gsap.set(overlayRef.current, { clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set(bodyRef.current, { opacity: 1, y: 0 });
        return;
      }

      // Pinned stop-scroll animation: freezes viewport while text fills with ink
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=65%",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        overlayRef.current,
        { clipPath: "inset(0% 100% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", ease: "none", duration: 1 }
      ).fromTo(
        bodyRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
        "-=0.15"
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="problem"
      className="relative min-h-screen flex items-center justify-center py-20 bg-transparent overflow-hidden"
    >
      <Container className="flex flex-col items-center text-center max-w-5xl w-full my-auto">
        <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[var(--color-coral)]/10 border border-[var(--color-coral)]/25 text-sm sm:text-base font-bold text-[var(--color-coral)] tracking-wide mb-8 shadow-sm">
          <BrandIcon className="w-4 h-3.5" />
          <span>{homeContent.problem.eyebrow}</span>
        </span>

        <h2
          ref={textRef}
          className="relative text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display text-[var(--color-muted)]/15 leading-[1.06] mb-10"
        >
          <span className="sr-only">{homeContent.problem.title}</span>
          <span aria-hidden="true" className="select-none">
            {homeContent.problem.title}
          </span>
          <span
            ref={overlayRef}
            className="absolute inset-0 text-[var(--color-ink)] select-none pointer-events-none"
            aria-hidden="true"
          >
            {homeContent.problem.title}
          </span>
        </h2>

        <p
          ref={bodyRef}
          className="text-base sm:text-lg md:text-xl text-[var(--color-muted)] max-w-2xl leading-relaxed"
        >
          {homeContent.problem.body}
        </p>
      </Container>
    </section>
  );
}

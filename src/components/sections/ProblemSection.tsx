"use client";

import { useRef } from "react";
import { homeContent } from "@/content/site";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";

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
          end: "+=120%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        overlayRef.current,
        { clipPath: "inset(0% 100% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", ease: "none", duration: 1 }
      ).fromTo(
        bodyRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
        "-=0.15"
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-20 bg-[var(--color-paper)] overflow-hidden"
    >
      <Container className="flex flex-col items-center text-center max-w-5xl w-full my-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-coral)] mb-8 block">
          {homeContent.problem.eyebrow}
        </span>

        <h2
          ref={textRef}
          className="relative text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display text-[var(--color-muted)]/15 leading-[1.06] mb-10"
        >
          {homeContent.problem.title}
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

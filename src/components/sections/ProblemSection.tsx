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
        gsap.set(bodyRef.current, { autoAlpha: 1 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
        },
      });

      tl.fromTo(
        overlayRef.current,
        { clipPath: "inset(0% 100% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", ease: "none", duration: 1 }
      ).fromTo(
        bodyRef.current,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.3 },
        "-=0.2"
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-24 md:py-32 bg-[var(--color-paper)] overflow-hidden"
    >
      <Container className="flex flex-col items-center text-center max-w-5xl w-full">
        <span className="text-sm font-semibold tracking-widest uppercase text-[var(--color-muted)] mb-8">
          {homeContent.problem.eyebrow}
        </span>

        <h2
          ref={textRef}
          className="relative text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[var(--color-muted)]/15 leading-[1.1] mb-12"
        >
          {homeContent.problem.title}
          <span
            ref={overlayRef}
            className="absolute inset-0 text-[var(--color-ink)] [clip-path:inset(0%_100%_0%_0%)] z-10"
            aria-hidden="true"
          >
            {homeContent.problem.title}
          </span>
        </h2>

        <p
          ref={bodyRef}
          className="text-lg md:text-xl text-[var(--color-muted)] max-w-2xl opacity-0"
        >
          {homeContent.problem.body}
        </p>
      </Container>
    </section>
  );
}

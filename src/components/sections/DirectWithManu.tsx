"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { homeContent } from "@/content/site";
import { portraitAssets } from "@/content/assets";
import { cn } from "@/lib/cn";

export function DirectWithManu() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const pointsRef = useRef<HTMLUListElement>(null);

  useGSAP(() => {
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) return;

    // Title word-by-word reveal
    const titleWords = textRef.current?.querySelectorAll(".word");
    if (titleWords?.length) {
      gsap.fromTo(
        titleWords,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
        }
      );
    }

    // Points stagger
    const points = pointsRef.current?.querySelectorAll("li");
    if (points?.length) {
      gsap.fromTo(
        points,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: pointsRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }

    // Image Parallax
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { y: -30 },
        {
          y: 30,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="py-20 md:py-32 bg-[var(--color-paper)] overflow-hidden"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div ref={textRef} className="max-w-2xl">
            <span className="text-[var(--color-coral)] font-medium tracking-wide uppercase text-sm mb-6 block">
              {homeContent.direct.eyebrow}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[var(--color-ink)] leading-tight mb-8">
              {homeContent.direct.title.split(" ").map((word, i) => (
                <span key={i} className="word inline-block mr-[0.25em]">{word}</span>
              ))}
            </h2>
            <p className="text-lg md:text-xl text-[var(--color-muted)] leading-relaxed mb-10">
              {homeContent.direct.body}
            </p>
            <ul ref={pointsRef} className="space-y-4">
              {homeContent.direct.points.map((point, index) => (
                <li key={index} className="flex items-center text-[var(--color-ink)] text-lg">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-coral)] mr-4 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative aspect-square md:aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ borderRadius: "60% 40% 45% 55% / 50% 60% 40% 50%" }}
            >
              <Image
                ref={imageRef}
                src={portraitAssets.about.src}
                alt={portraitAssets.about.alt}
                fill
                className="object-cover scale-110 origin-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { homeContent } from "@/content/site";
import { portraitAssets } from "@/content/assets";
import { cn } from "@/lib/cn";

export function AboutManu() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Ken-Burns effect on scroll
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { scale: 1 },
        {
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }

    // Text stagger reveal
    if (textRef.current && textRef.current.children) {
      gsap.from(textRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
          once: true,
        },
      });
    }
  }, { scope: containerRef });

  const { about } = homeContent;

  return (
    <section ref={containerRef} className="py-24 md:py-32 overflow-hidden bg-paper">
      <Container>
        <div className="flex flex-col lg:flex-row items-center relative">
          {/* Image Column */}
          <div className="w-full lg:w-[60%] relative z-0">
            <div 
              className="relative aspect-[4/5] w-full overflow-hidden" 
              style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
            >
              <Image
                ref={imageRef}
                src={portraitAssets.about.src}
                alt={portraitAssets.about.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
          </div>
          
          {/* Text Content Column */}
          <div 
            ref={textRef}
            className="w-full lg:w-[50%] lg:-ml-[10%] relative z-10 mt-12 lg:mt-0 bg-white p-8 md:p-14 shadow-xl rounded-2xl border border-line/20"
          >
            <span className="text-coral font-semibold uppercase tracking-wider text-sm block mb-4">
              {about.eyebrow}
            </span>
            <h2 className="font-editorial text-4xl md:text-5xl lg:text-6xl text-ink leading-tight mb-6">
              {about.title}
            </h2>
            <p className="text-muted text-lg leading-relaxed">
              {about.body}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

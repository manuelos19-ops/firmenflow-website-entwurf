"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Container } from "@/components/ui/Container";
import { faqItems } from "@/content/site";
import { cn } from "@/lib/cn";

export function Faq() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.from(".faq-item", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        once: true,
      },
    });
  }, { scope: containerRef });

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-paper">
      <Container>
        <div className="max-w-3xl mx-auto">
          <span className="text-coral font-semibold uppercase tracking-wider text-sm block mb-4 text-center">
            Häufige Fragen
          </span>
          <div className="mt-12 flex flex-col gap-4">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;
              
              return (
                <div 
                  key={index} 
                  className={cn(
                    "faq-item border-b border-line overflow-hidden transition-colors duration-300",
                    isOpen && "border-coral"
                  )}
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg font-semibold text-ink group-hover:text-coral transition-colors duration-200 pr-8">
                      {item.question}
                    </span>
                    <span className="relative flex-shrink-0 w-6 h-6 flex items-center justify-center">
                      <span className={cn("absolute w-full h-[2px] bg-ink transition-all duration-300", isOpen && "bg-coral rotate-180")} />
                      <span className={cn("absolute w-full h-[2px] bg-ink transition-all duration-300 rotate-90", isOpen && "rotate-180 bg-coral opacity-0")} />
                    </span>
                  </button>
                  <FaqAnswer isOpen={isOpen} answer={item.answer} />
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

function FaqAnswer({ isOpen, answer }: { isOpen: boolean; answer: string }) {
  const answerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    if (answerRef.current) {
      if (isOpen) {
        gsap.to(answerRef.current, {
          height: "auto",
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(answerRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    }
  }, [isOpen]);

  // Fallback inline styles handle the non-JS / reduced motion rendering instantly
  return (
    <div 
      ref={answerRef} 
      className="h-0 opacity-0 overflow-hidden"
      style={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }} 
    >
      <div className="pb-6 text-base text-muted">
        {answer}
      </div>
    </div>
  );
}

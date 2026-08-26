"use client";

import { useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { faqItems } from "@/content/site";
import { cn } from "@/lib/cn";
import { Sparkles, Plus, Minus, HelpCircle, MessageCircle, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MagneticButton } from "@/components/effects/MagneticButton";

const categories = ["Alle Fragen", "Ablauf & Betreuung", "Kosten & Leistung", "Google Business 360°"];

export function Faq() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First FAQ open by default
  const [activeCategory, setActiveCategory] = useState("Alle Fragen");

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      ref={containerRef} 
      id="faq"
      className="py-24 sm:py-32 md:py-40 bg-transparent text-[var(--color-ink)] relative overflow-hidden"
    >
      {/* Subtle ambient light */}
      <div 
        className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[var(--color-coral)]/5 rounded-full blur-[120px] pointer-events-none" 
        aria-hidden="true" 
      />

      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-coral)]/10 border border-[var(--color-coral)]/20 text-sm sm:text-base font-bold text-[var(--color-coral)] mb-5 shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span>Häufige Fragen</span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-[var(--color-ink)] font-bold leading-[1.15] mb-4">
              Klartext vor dem Projektstart.
            </h2>
            <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed max-w-2xl mx-auto">
              Hier findest du direkte Antworten auf die wichtigsten Fragen zu Ablauf, Kosten und Zusammenarbeit – ehrlich und ohne Kleingedrucktes.
            </p>
          </div>

          {/* Modern Interactive Accordion Cards */}
          <div className="flex flex-col gap-4">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;
              
              return (
                <div 
                  key={index} 
                  className={cn(
                    "bg-white rounded-2xl sm:rounded-3xl border transition-all duration-300 ease-[var(--ease-out)] overflow-hidden shadow-sm hover:-translate-y-1 hover:scale-[1.01] hover:shadow-md active:scale-[0.99] will-change-transform",
                    isOpen 
                      ? "border-[var(--color-coral)] shadow-lg shadow-[var(--color-coral)]/10 ring-2 ring-[var(--color-coral)]/10" 
                      : "border-[var(--color-line)] hover:border-[var(--color-coral)]/40"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    className="w-full flex items-center justify-between p-6 sm:p-7 text-left focus:outline-none cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 pr-4 min-w-0">
                      <div 
                        className={cn(
                          "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200",
                          isOpen 
                            ? "bg-[var(--color-coral)] text-white" 
                            : "bg-[var(--color-paper)] text-[var(--color-muted)] group-hover:text-[var(--color-coral)]"
                        )}
                      >
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <h3 className={cn(
                        "text-base sm:text-lg font-bold font-sans transition-colors duration-200 leading-snug",
                        isOpen ? "text-[var(--color-coral)]" : "text-[var(--color-ink)] group-hover:text-[var(--color-coral)]"
                      )}>
                        {item.question}
                      </h3>
                    </div>

                    <div 
                      className={cn(
                        "w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 shadow-sm",
                        isOpen 
                          ? "bg-[var(--color-coral)] text-white rotate-180" 
                          : "bg-[var(--color-paper)] text-[var(--color-ink)] border border-[var(--color-line)] group-hover:border-[var(--color-coral)]"
                      )}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  {/* Expandable Answer */}
                  {isOpen && (
                    <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-1 text-sm sm:text-base text-[var(--color-muted)] leading-relaxed border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Direct Question Contact Box */}
          <div className="mt-12 sm:mt-16 bg-white rounded-3xl border border-[var(--color-line)] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mx-auto sm:mx-0 shadow-sm">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-[var(--color-ink)] font-sans">
                  Deine Frage war nicht dabei?
                </h4>
                <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-0.5">
                  Schreib mir einfach direkt auf WhatsApp – ich antworte meist innerhalb weniger Stunden.
                </p>
              </div>
            </div>

            <div className="shrink-0 w-full sm:w-auto">
              <MagneticButton>
                <ButtonLink
                  href="#kontakt"
                  variant="primary"
                  size="default"
                  className="w-full sm:w-auto text-xs sm:text-sm px-6 py-3 shadow-md shadow-[var(--color-coral)]/20"
                >
                  <span>WhatsApp an Manu</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </ButtonLink>
              </MagneticButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

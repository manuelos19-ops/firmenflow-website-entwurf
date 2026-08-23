import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { faqItems } from "@/content/site";

export function Faq() {
  return (
    <section id="faq" className="py-24 sm:py-32 bg-[var(--color-paper)]">
      <Container className="space-y-16 sm:space-y-20 max-w-4xl">
        <Reveal>
          <SectionHeading
            eyebrow="Häufige Fragen"
            title="Klarheit vorab."
            accent="Ohne Umschweife."
            body="Hier findest du Antworten auf die wichtigsten Fragen rund um Zusammenarbeit, Ablauf und Kosten."
            align="center"
          />
        </Reveal>

        <div className="space-y-4">
          {faqItems.map((item) => (
            <Reveal key={item.question}>
              <details
                role="group"
                className="group bg-white rounded-2xl border border-[var(--color-line)] p-6 sm:p-8 transition-colors [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer font-bold text-lg sm:text-xl text-[var(--color-ink)] select-none list-none group-open:text-[var(--color-plum)]">
                  <span>{item.question}</span>
                  <span className="w-8 h-8 rounded-full bg-[var(--color-paper)] flex items-center justify-center text-[var(--color-plum)] shrink-0 transition-transform duration-300 group-open:rotate-180">
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </summary>
                <div className="pt-4 text-sm sm:text-base text-[var(--color-muted)] leading-relaxed border-t border-[var(--color-line)] mt-4">
                  {item.answer}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

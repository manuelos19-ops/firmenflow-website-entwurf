import { Check, ShieldAlert } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { homeContent } from "@/content/site";

export function GoogleBusinessPilot() {
  const { pilot } = homeContent;

  return (
    <section id="google-business" className="py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="bg-[var(--color-ink)] text-white rounded-[2.5rem] p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden space-y-12">
            {/* Header */}
            <div className="space-y-4 max-w-3xl">
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-[var(--color-coral)]/20 text-xs font-semibold uppercase tracking-wider text-[var(--color-coral)]">
                {pilot.eyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                {pilot.title}
              </h2>
              <p className="text-base sm:text-lg text-white/70 leading-relaxed">
                {pilot.body}
              </p>
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 border-t border-white/10">
              {pilot.modules.map((module) => (
                <div
                  key={module}
                  className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-start gap-4"
                >
                  <span className="w-6 h-6 rounded-full bg-[var(--color-coral)] flex items-center justify-center text-white shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </span>
                  <span className="text-sm sm:text-base font-medium text-white/90">
                    {module}
                  </span>
                </div>
              ))}
            </div>

            {/* Fair Play Box + CTA */}
            <div className="pt-8 border-t border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="flex items-start gap-3.5 text-xs sm:text-sm text-white/60 max-w-xl">
                <ShieldAlert className="w-5 h-5 text-[var(--color-coral)] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-white/90 block mb-0.5">Echtes Vertrauen statt Tricks:</strong>
                  Keine gekauften Bewertungen, kein Review-Gating und keine unrealistischen Rankinggarantien. Nur saubere, richtlinienkonforme Methoden für deinen Betrieb.
                </p>
              </div>

              <ButtonLink href="/#projektanfrage?type=google-business" variant="primary" size="lg">
                {pilot.cta}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

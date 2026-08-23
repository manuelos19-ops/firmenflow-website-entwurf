import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { homeContent } from "@/content/site";

export function ServiceOverview() {
  const { services } = homeContent;

  return (
    <section id="leistungen" className="py-24 sm:py-32">
      <Container className="space-y-16 sm:space-y-20">
        <Reveal>
          <SectionHeading
            eyebrow="Leistungen"
            title="Was ich für deinen Betrieb"
            accent="konkret umsetze."
            body="Kein anonymer Baukasten und keine unnötigen Extras. Du bekommst genau das, was für deine lokale Auffindbarkeit und neue Kundenanfragen zählt."
            align="center"
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Card 1: Neue Website (Plum Theme) */}
          <Reveal direction="left" className="h-full">
            <div className="h-full bg-[var(--color-plum)] text-white p-8 sm:p-12 rounded-[2.5rem] shadow-xl flex flex-col justify-between space-y-8 relative overflow-hidden">
              <div className="space-y-6">
                <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider text-[var(--color-coral)]">
                  Neuer Auftritt
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                  {services[0].title}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {services[0].body}
                </p>

                <ul className="space-y-3 pt-4 border-t border-white/15 text-sm sm:text-base text-white/90">
                  {services[0].points.map((point) => (
                    <li key={point} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-[var(--color-coral)] flex items-center justify-center text-white shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4">
                <ButtonLink href="/#projektanfrage" variant="primary" size="default">
                  Neue Website anfragen
                </ButtonLink>
              </div>
            </div>
          </Reveal>

          {/* Card 2: Relaunch (Light Theme) */}
          <Reveal direction="right" className="h-full">
            <div className="h-full bg-white p-8 sm:p-12 rounded-[2.5rem] border border-[var(--color-line)] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <span className="inline-block px-3.5 py-1.5 rounded-full bg-[var(--color-plum)]/5 text-xs font-semibold uppercase tracking-wider text-[var(--color-plum)]">
                  Modernisierung
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-ink)] leading-tight">
                  {services[1].title}
                </h3>
                <p className="text-[var(--color-muted)] leading-relaxed">
                  {services[1].body}
                </p>

                <ul className="space-y-3 pt-4 border-t border-[var(--color-line)] text-sm sm:text-base text-[var(--color-ink)]">
                  {services[1].points.map((point) => (
                    <li key={point} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-[var(--color-plum)]/10 flex items-center justify-center text-[var(--color-plum)] shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4">
                <ButtonLink href="/#projektanfrage" variant="secondary" size="default">
                  Relaunch anfragen
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

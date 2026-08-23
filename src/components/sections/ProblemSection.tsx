import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { homeContent } from "@/content/site";

const problems = [
  {
    number: "01",
    title: "Nicht auffindbar",
    description:
      "Kunden suchen in Wesel und am Niederrhein nach deinen Leistungen, finden aber zuerst die Konkurrenz. Ohne klare Google-Präsenz gehen wertvolle Aufträge verloren.",
  },
  {
    number: "02",
    title: "Nicht mehr zeitgemäß",
    description:
      "Deine aktuelle Website spiegelt die echte Qualität deines Betriebs nicht mehr wider. Auf dem Smartphone wirkt sie unübersichtlich oder veraltet.",
  },
  {
    number: "03",
    title: "Kein klarer nächster Schritt",
    description:
      "Besucher schauen sich um, wissen aber nicht, wie sie schnell und unkompliziert Kontakt aufnehmen können. Das kostet echte Anfragen.",
  },
] as const;

export function ProblemSection() {
  const { problem } = homeContent;

  return (
    <section id="problem" className="py-24 sm:py-32 bg-[var(--color-paper)]">
      <Container className="space-y-16 sm:space-y-20">
        <Reveal>
          <SectionHeading
            eyebrow={problem.eyebrow}
            title="Dein Betrieb läuft."
            accent="Online merkt man es nur zu wenig."
            body={problem.body}
            align="center"
          />
        </Reveal>

        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((item) => (
            <StaggerItem key={item.number}>
              <div className="h-full bg-white p-8 sm:p-10 rounded-[2rem] border border-[var(--color-line)] shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="font-editorial text-3xl text-[var(--color-coral)] block">
                    {item.number}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-ink)]">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

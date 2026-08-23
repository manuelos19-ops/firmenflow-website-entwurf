import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FlowLine } from "@/components/motion/FlowLine";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { homeContent } from "@/content/site";

export function Process() {
  const { process } = homeContent;

  return (
    <section id="ablauf" className="py-24 sm:py-32 bg-[var(--color-paper)]">
      <Container className="space-y-16 sm:space-y-20">
        <Reveal>
          <SectionHeading
            eyebrow="Arbeitsweise"
            title="So läuft die Zusammenarbeit"
            accent="Schritt für Schritt."
            body="Kein Blindflug und keine bösen Überraschungen. Du weißt zu jedem Zeitpunkt, woran gearbeitet wird und was als Nächstes passiert."
            align="center"
          />
        </Reveal>

        <div className="relative max-w-4xl mx-auto">
          {/* Flow line connector in background */}
          <div className="hidden md:block absolute left-1/2 top-8 bottom-8 -translate-x-1/2 z-0">
            <FlowLine className="h-full" />
          </div>

          <Stagger className="space-y-8 md:space-y-12 relative z-10">
            {process.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <StaggerItem key={step.number}>
                  <div
                    className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 ${
                      isEven ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Content Card */}
                    <div className="w-full md:w-1/2 bg-white p-8 sm:p-10 rounded-[2rem] border border-[var(--color-line)] shadow-sm">
                      <span className="font-editorial text-2xl text-[var(--color-coral)] block mb-2">
                        {step.number}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-ink)] mb-3">
                        {step.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
                        {step.body}
                      </p>
                    </div>

                    {/* Step Bubble */}
                    <div className="w-12 h-12 rounded-full bg-[var(--color-plum)] text-white flex items-center justify-center font-bold text-sm shrink-0 border-4 border-[var(--color-paper)] shadow-md">
                      {step.number}
                    </div>

                    {/* Empty placeholder for alignment */}
                    <div className="hidden md:block w-1/2" />
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}

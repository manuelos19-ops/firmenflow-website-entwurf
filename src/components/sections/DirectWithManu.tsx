import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { homeContent } from "@/content/site";

export function DirectWithManu() {
  const { direct } = homeContent;

  return (
    <section id="direkt" className="py-24 sm:py-32 bg-[var(--color-paper)]">
      <Container className="space-y-16 sm:space-y-20">
        <Reveal>
          <SectionHeading
            eyebrow={direct.eyebrow}
            title={direct.title}
            accent="Du erklärst dein Geschäft einmal. Mir."
            body={direct.body}
            align="center"
          />
        </Reveal>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {direct.points.map((point, index) => (
            <StaggerItem key={point}>
              <div className="h-full bg-white p-6 sm:p-8 rounded-3xl border border-[var(--color-line)] shadow-sm hover:border-[var(--color-coral)]/40 transition-colors">
                <span className="font-editorial text-2xl text-[var(--color-plum)] block mb-4">
                  0{index + 1}
                </span>
                <p className="text-base font-bold text-[var(--color-ink)]">{point}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

import Image from "next/image";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { portraitAssets } from "@/content/assets";
import { homeContent } from "@/content/site";

const highlights = [
  "Direkter Draht vom ersten Gespräch an",
  "Verständliche Entscheidungen statt Fachchinesisch",
  "Verantwortung und Umsetzung aus einer Hand",
  "Vor Ort ansprechbar für Wesel & den Niederrhein",
] as const;

export function AboutManu() {
  const { about } = homeContent;

  return (
    <section id="manu" className="py-24 sm:py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Photo */}
          <div className="lg:col-span-5">
            <Reveal direction="image">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div
                  aria-hidden="true"
                  className="absolute -inset-4 rounded-[2.5rem] bg-[var(--color-plum)]/10 blur-xl -z-10"
                />
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border-4 border-white shadow-xl bg-[var(--color-plum)]">
                  <Image
                    src={portraitAssets.about.src}
                    alt={portraitAssets.about.alt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-7 space-y-8">
            <Reveal>
              <div className="space-y-4">
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[var(--color-coral)]">
                  {about.eyebrow}
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-ink)] leading-tight">
                  {about.title}
                </h2>
                <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed pt-2">
                  {about.body}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="pt-6 border-t border-[var(--color-line)]">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {highlights.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm sm:text-base text-[var(--color-ink)] font-medium">
                      <span className="w-5 h-5 rounded-full bg-[var(--color-coral)]/20 text-[var(--color-coral)] flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

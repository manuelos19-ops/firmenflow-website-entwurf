import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Marquee } from "@/components/motion/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { portraitAssets } from "@/content/assets";
import { homeContent } from "@/content/site";

export function Hero({ whatsappUrl }: { whatsappUrl: string | null }) {
  const { hero } = homeContent;

  return (
    <section id="home" className="pt-32 sm:pt-40 lg:pt-44 pb-12 overflow-hidden">
      <Container className="space-y-16 sm:space-y-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-8">
            <Reveal delay={0}>
              <p className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-plum)]/5 border border-[var(--color-plum)]/10 text-xs sm:text-sm font-semibold uppercase tracking-widest text-[var(--color-coral)]">
                <span className="w-2 h-2 rounded-full bg-[var(--color-coral)] animate-pulse" />
                {hero.eyebrow}
              </p>
            </Reveal>

            <div className="space-y-3">
              <Reveal delay={0.08}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--color-ink)] leading-[1.1]">
                  <span className="block">{hero.title[0]}</span>
                  <span className="block text-[var(--color-plum)]">{hero.title[1]}</span>
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-editorial text-[var(--color-coral)] font-normal pt-2">
                  {hero.accent}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.24}>
              <p className="text-lg sm:text-xl text-[var(--color-muted)] leading-relaxed max-w-xl">
                {hero.body}
              </p>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                {whatsappUrl && (
                  <ButtonLink href={whatsappUrl} external variant="primary" size="lg">
                    {hero.primaryCta}
                  </ButtonLink>
                )}
                <ButtonLink href="#projektanfrage" variant="secondary" size="lg">
                  {hero.secondaryCta}
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={0.36}>
              <div className="flex items-center gap-6 pt-4 text-xs sm:text-sm font-medium text-[var(--color-muted)]">
                <span>✓ Persönlich</span>
                <span>✓ Direkt erreichbar</span>
                <span>✓ Wesel & Niederrhein</span>
              </div>
            </Reveal>
          </div>

          {/* Hero Image */}
          <div className="lg:col-span-5 relative">
            <Reveal direction="image" delay={0.2}>
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Background decorative blob */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-[var(--color-plum)] to-[var(--color-coral)]/30 opacity-70 blur-2xl -z-10"
                />

                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl bg-[var(--color-plum)]">
                  <Image
                    src={portraitAssets.hero.src}
                    alt={portraitAssets.hero.alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 42vw, 90vw"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-plum)]/40 via-transparent to-transparent pointer-events-none" />

                  {/* Badge on photo */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[var(--color-line)] shadow-lg">
                    <p className="text-sm font-bold text-[var(--color-ink)]">Direkt mit Manu</p>
                    <p className="text-xs text-[var(--color-muted)]">Kein Agenturtheater · Webdesign für Wesel</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Marquee Ticker */}
        <div className="pt-8">
          <Marquee>
            <span className="flex items-center gap-4">
              <span>Websites</span>
              <span className="text-[var(--color-coral)]">✦</span>
              <span>Relaunch</span>
              <span className="text-[var(--color-coral)]">✦</span>
              <span>Google Business 360°</span>
              <span className="text-[var(--color-coral)]">✦</span>
              <span>Wesel</span>
              <span className="text-[var(--color-coral)]">✦</span>
              <span>Niederrhein</span>
              <span className="text-[var(--color-coral)]">✦</span>
              <span>Direkter Draht</span>
              <span className="text-[var(--color-coral)]">✦</span>
            </span>
          </Marquee>
        </div>
      </Container>
    </section>
  );
}

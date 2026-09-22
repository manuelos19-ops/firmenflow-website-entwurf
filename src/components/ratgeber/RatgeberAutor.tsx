import Image from "next/image";
import Link from "next/link";

/**
 * Autorenbox unter jedem Ratgeber-Artikel. Belegt die Erfahrung mit konkreten
 * Jahren und Stationen, statt sie zu behaupten. Text bewusst identisch zur
 * Seite "Über Manu", damit beide nicht auseinanderlaufen.
 */
type RatgeberAutorProps = {
  slug?: string;
};

export function RatgeberAutor({ slug }: RatgeberAutorProps) {
  return (
    <section
      aria-labelledby="autor-ueberschrift"
      className="rounded-3xl bg-white border border-[var(--color-line)] shadow-sm p-6 sm:p-8"
    >
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 sm:items-start">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border border-[var(--color-line)] shadow-sm bg-[var(--color-paper)]">
          <Image
            src="/media/manu-hero.webp"
            alt="Manuel Landeck, Inhaber von Firmenflow"
            fill
            sizes="(max-width: 640px) 80px, 96px"
            className="object-cover"
            style={{ objectPosition: "center 20%" }}
          />
        </div>
        <div className="space-y-2">
          <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--color-coral)]">
            Über den Autor
          </p>
          <h2 id="autor-ueberschrift" className="font-display font-bold text-xl text-[var(--color-ink)]">
            Manuel Landeck
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-ink)] leading-relaxed">
            Elf Jahre im Betrieb, bevor ich Websites gebaut habe: sechs Jahre Inhaber eines
            EMS-Fitnessstudios, zwei Jahre Geschäftsführer meiner selbst aufgebauten Lasertag-Arena
            in Leverkusen, drei Jahre Teil der Geschäftsführung bei Lasertag Evolution Düsseldorf
            und BattleKart Düsseldorf-Neuss. Heute baue ich Websites und Google-Profile für
            Betriebe in Wesel und am Niederrhein.
          </p>
          <p className="text-sm">
            <Link
              href="/ueber-manu"
              className="text-[var(--color-plum)] font-semibold underline underline-offset-4 decoration-[var(--color-coral)]/60 hover:text-[var(--color-coral)] transition-colors"
            >
              Mehr über mich
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

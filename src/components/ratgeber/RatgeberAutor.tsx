import Image from "next/image";
import Link from "next/link";

/**
 * Autorenbox unter jedem Ratgeber-Artikel. Belegt die Erfahrung mit konkreten
 * Jahren und Stationen, statt sie zu behaupten. Text bewusst identisch zur
 * Seite "Über Manu", damit beide nicht auseinanderlaufen.
 */
export function RatgeberAutor() {
  return (
    <section
      aria-labelledby="autor-ueberschrift"
      className="rounded-3xl bg-white border border-[var(--color-line)] shadow-sm p-6 sm:p-8"
    >
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 sm:items-start">
        <Image
          src="/media/avatars/manu-avatar-portrait.webp"
          alt="Manuel Landeck, Inhaber von Firmenflow"
          width={96}
          height={96}
          className="rounded-2xl object-cover w-20 h-20 sm:w-24 sm:h-24 shrink-0"
        />
        <div className="space-y-2">
          <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--color-coral)]">
            Über den Autor
          </p>
          <h2 id="autor-ueberschrift" className="font-display font-bold text-xl text-[var(--color-ink)]">
            Manuel Landeck
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-ink)] leading-relaxed">
            Elf Jahre im Betrieb, bevor ich Websites gebaut habe: sechs Jahre Inhaber eines
            EMS-Fitnessstudios, zwei Jahre Geschäftsführer einer selbst gebauten Lasertag-Arena,
            danach Marketing, Digitalisierung, Foto und Video im größeren Maßstab. Heute mache ich
            das für lokale Betriebe in Wesel und am Niederrhein.
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

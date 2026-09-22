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

// Echte Fotos von Manuel Landeck für die Autorenbox
const authorPhotos: { src: string; alt: string; objectPosition?: string }[] = [
  {
    src: "/media/authors/manu-smartphone.jpg",
    alt: "Manuel Landeck, Inhaber von Firmenflow, mit Smartphone",
    objectPosition: "center 20%",
  },
  {
    src: "/media/authors/manu-portrait-arms-crossed.jpg",
    alt: "Manuel Landeck, Inhaber von Firmenflow",
    objectPosition: "center 20%",
  },
  {
    src: "/media/authors/manu-camera-hasselblad.jpg",
    alt: "Manuel Landeck, Inhaber von Firmenflow, mit Kamera",
    objectPosition: "center 25%",
  },
];

const photoBySlug: Record<string, number> = {
  "azubis-finden-handwerk": 0, // Foto 1: Manu mit Smartphone (perfekt zum Smartphone-Thema)
  "google-maps-nicht-gefunden": 1, // Foto 2: Manu im Sakko (seriös & lokal)
  "website-fehler-lokale-betriebe": 2, // Foto 3: Manu mit Hasselblad-Kamera (perfekt zum Thema echte Fotos statt Stock-Bilder)
};

export function RatgeberAutor({ slug }: RatgeberAutorProps) {
  let photoIndex = 0;
  if (slug && typeof photoBySlug[slug] === "number") {
    photoIndex = photoBySlug[slug];
  } else if (slug) {
    let hash = 0;
    for (let i = 0; i < slug.length; i++) {
      hash = (hash + slug.charCodeAt(i)) % authorPhotos.length;
    }
    photoIndex = hash;
  }
  const photo = authorPhotos[photoIndex] ?? authorPhotos[0];

  return (
    <section
      aria-labelledby="autor-ueberschrift"
      className="rounded-3xl bg-white border border-[var(--color-line)] shadow-sm p-6 sm:p-8"
    >
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 sm:items-start">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border border-[var(--color-line)] shadow-sm bg-[var(--color-paper)]">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 640px) 80px, 96px"
            className="object-cover"
            style={{ objectPosition: photo.objectPosition || "center 20%" }}
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

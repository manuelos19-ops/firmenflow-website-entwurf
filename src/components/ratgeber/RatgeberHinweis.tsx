import path from "node:path";
import Image from "next/image";
import sharp from "sharp";
import { FirmenflowIcon } from "@/components/brand/FirmenflowIcon";
import type { RatgeberNoteImage } from "@/lib/ratgeber";

type RatgeberHinweisProps = {
  title: string;
  paragraphs: string[];
  image?: RatgeberNoteImage;
};

/** Bildmaße beim Rendern auslesen, damit der Platz vor dem Laden reserviert ist. */
async function readSize(src: string): Promise<{ width: number; height: number }> {
  try {
    const meta = await sharp(path.join(process.cwd(), "public", src)).metadata();
    if (meta.width && meta.height) return { width: meta.width, height: meta.height };
  } catch {
    // Fallback unten
  }
  return { width: 800, height: 1000 };
}

/**
 * Hinweisbox im Artikel, z. B. für eigene Beobachtungen mit Datum und Gerät.
 * Titel und Absätze kommen als HTML aus dem Parser (escaped, mit Fett/Kursiv/Links).
 */
export async function RatgeberHinweis({ title, paragraphs, image }: RatgeberHinweisProps) {
  const size = image ? await readSize(image.src) : null;

  return (
    <aside className="rounded-3xl bg-[var(--color-paper)] border border-[var(--color-line)] p-6 sm:p-8">
      <div className={image ? "grid gap-6 sm:grid-cols-[minmax(0,1fr)_15rem] sm:items-start" : ""}>
        <div className="space-y-3">
          <p className="flex items-center gap-2.5 font-display font-bold text-lg sm:text-xl text-[var(--color-ink)]">
            <FirmenflowIcon name="info-hinweis" size={24} decorative />
            <span dangerouslySetInnerHTML={{ __html: title }} />
          </p>
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-sm sm:text-base text-[var(--color-ink)] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: p }}
            />
          ))}
        </div>
        {image && size && (
          <figure className="m-0 mx-auto w-full max-w-[15rem]">
            <Image
              src={image.src}
              alt={image.alt}
              width={size.width}
              height={size.height}
              sizes="240px"
              className="w-full h-auto rounded-2xl border border-[var(--color-line)] shadow-sm"
            />
            {image.caption && (
              <figcaption
                className="mt-3 text-xs text-[var(--color-muted)] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: image.caption }}
              />
            )}
          </figure>
        )}
      </div>
    </aside>
  );
}

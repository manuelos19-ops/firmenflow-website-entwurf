import { FirmenflowIcon } from "@/components/brand/FirmenflowIcon";
import { firmenflowIconPaths } from "@/content/firmenflow-icons";
import type { FirmenflowIconName } from "@/content/firmenflow-icons";

type RatgeberFehlerProps = {
  id: string;
  number: number;
  title: string;
  icon: string;
  problem: string[];
  solution: string[];
  solutionList: string[];
};

/**
 * Fehler-Karte im Artikel: farbiger Kopf mit Icon, Nummer und Überschrift,
 * darunter das Problem und eine Kachel „So sollte es sein“ mit der Lösung.
 * Texte kommen als HTML aus dem Parser (escaped, mit Fett/Kursiv/Links).
 */
export function RatgeberFehler({ id, number, title, icon, problem, solution, solutionList }: RatgeberFehlerProps) {
  const iconName = (icon in firmenflowIconPaths ? icon : "fehler") as FirmenflowIconName;

  return (
    <article className="rounded-[2rem] bg-white border border-[var(--color-line)] shadow-sm overflow-hidden">
      <header className="flex items-center gap-4 sm:gap-5 bg-gradient-to-r from-[var(--color-coral)]/15 via-[var(--color-coral)]/[0.07] to-transparent px-5 py-5 sm:px-8 sm:py-6 border-b border-[var(--color-line)]">
        <span className="flex shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm border border-[var(--color-line)] w-16 h-16 sm:w-20 sm:h-20">
          <FirmenflowIcon name={iconName} size={52} decorative />
        </span>
        <div className="min-w-0 space-y-1">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-coral)] px-3 py-0.5 text-xs font-mono font-bold uppercase tracking-wider text-white">
            Fehler {number}
          </p>
          <h3
            id={id}
            className="scroll-mt-28 text-xl sm:text-2xl font-display font-bold leading-snug text-[var(--color-ink)]"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </div>
      </header>

      <div className="space-y-5 px-5 py-5 sm:px-8 sm:py-7">
        {problem.map((p, i) => (
          <p
            key={i}
            className="text-base sm:text-lg leading-relaxed text-[var(--color-ink)] [&_a]:text-[var(--color-plum)]"
            dangerouslySetInnerHTML={{ __html: p }}
          />
        ))}

        <div className="rounded-2xl bg-[var(--color-plum)]/[0.06] border border-[var(--color-plum)]/20 p-5 sm:p-6 space-y-3">
          <p className="flex items-center gap-2.5 font-display font-bold text-lg text-[var(--color-plum)]">
            <FirmenflowIcon name="erfolg" size={26} decorative />
            So sollte es sein
          </p>
          {solution.map((p, i) => (
            <p
              key={i}
              className="text-sm sm:text-base leading-relaxed text-[var(--color-ink)]"
              dangerouslySetInnerHTML={{ __html: p }}
            />
          ))}
          {solutionList.length > 0 && (
            <ul className="space-y-2.5">
              {solutionList.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base leading-relaxed text-[var(--color-ink)]">
                  <span
                    aria-hidden="true"
                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-plum)] text-[0.7rem] font-bold text-white"
                  >
                    ✓
                  </span>
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
}

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
  solutionOrdered?: boolean;
  solutionAfter?: string[];
};

function Haken({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full bg-emerald-600 font-bold text-white ${className}`}
    >
      ✓
    </span>
  );
}

/**
 * Fehler-Karte im Artikel: Kopf im Markenverlauf mit Icon, Nummer und Überschrift,
 * darunter „Woran es hakt“ und eine Kachel „So sollte es sein“ mit der Lösung.
 * Texte kommen als HTML aus dem Parser (escaped, mit Fett/Kursiv/Links).
 */
export function RatgeberFehler({ id, number, title, icon, problem, solution, solutionList, solutionOrdered = false, solutionAfter = [] }: RatgeberFehlerProps) {
  const iconName = (icon in firmenflowIconPaths ? icon : "fehler") as FirmenflowIconName;
  const Liste = solutionOrdered ? "ol" : "ul";

  return (
    <article className="rounded-[2rem] bg-white border border-[var(--color-line)] shadow-md overflow-hidden">
      <header className="relative flex items-center gap-4 sm:gap-5 bg-gradient-to-br from-[var(--color-plum)] via-[var(--color-plum)] to-[var(--color-coral)] px-5 py-5 sm:px-8 sm:py-6">
        <span className="flex shrink-0 items-center justify-center rounded-2xl bg-white shadow-lg w-16 h-16 sm:w-20 sm:h-20 rotate-[-4deg]">
          <FirmenflowIcon name={iconName} size={56} decorative />
        </span>
        <div className="min-w-0 space-y-1.5">
          <p className="inline-flex items-center rounded-full bg-white/20 px-3 py-0.5 text-xs font-mono font-bold uppercase tracking-wider text-white ring-1 ring-white/30">
            Fehler {number}
          </p>
          <h3
            id={id}
            className="scroll-mt-28 text-xl sm:text-2xl font-display font-bold leading-snug text-white"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </div>
      </header>

      <div className="space-y-5 px-5 py-5 sm:px-8 sm:py-7">
        <div className="space-y-2">
          <p className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-coral)]">
            <span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-coral)] text-[0.7rem] font-bold text-white">
              !
            </span>
            Woran es hakt
          </p>
          {problem.map((p, i) => (
            <p
              key={i}
              className="text-base sm:text-lg leading-relaxed text-[var(--color-ink)]"
              dangerouslySetInnerHTML={{ __html: p }}
            />
          ))}
        </div>

        <div className="rounded-2xl bg-emerald-50 border border-emerald-600/25 p-5 sm:p-6 space-y-3">
          <p className="flex items-center gap-2.5 font-display font-bold text-lg text-emerald-800">
            <Haken className="h-7 w-7 text-sm" />
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
            <Liste className="space-y-2.5">
              {solutionList.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base leading-relaxed text-[var(--color-ink)]">
                  {solutionOrdered ? (
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[0.7rem] font-bold text-white"
                    >
                      {i + 1}
                    </span>
                  ) : (
                    <Haken className="mt-0.5 h-5 w-5 text-[0.7rem]" />
                  )}
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </Liste>
          )}
          {solutionAfter.map((p, i) => (
            <p
              key={i}
              className="text-sm sm:text-base leading-relaxed text-[var(--color-ink)]"
              dangerouslySetInnerHTML={{ __html: p }}
            />
          ))}
        </div>
      </div>
    </article>
  );
}

import { Check } from "@/components/brand/FirmenflowUiIcon";
import { FirmenflowIcon } from "@/components/brand/FirmenflowIcon";
import type { FirmenflowIconName } from "@/content/firmenflow-icons";
import { cn } from "@/lib/cn";

const steps: ReadonlyArray<{ label: string; icon: FirmenflowIconName }> = [
  { label: "Leistungen", icon: "beratung" },
  { label: "Ziele", icon: "handlungsempfehlung" },
  { label: "Betrieb", icon: "unternehmensprofil" },
  { label: "Kontakt", icon: "nachricht-senden" },
];

export function InquiryProgress({ step }: { step: number }) {
  return (
    <nav aria-label="Fortschritt der Anfrage" className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs sm:text-sm font-semibold text-[var(--color-muted)]">
          Schritt {step + 1} von {steps.length}
        </p>
        <p className="text-xs sm:text-sm font-bold text-[var(--color-plum)]">
          {steps[step]?.label}
        </p>
      </div>

      <ol className="grid grid-cols-4 gap-2 sm:gap-3">
        {steps.map((item, index) => {
          const state = index < step ? "complete" : index === step ? "current" : "upcoming";

          return (
            <li
              key={item.label}
              data-inquiry-step={index + 1}
              data-state={state}
              aria-current={state === "current" ? "step" : undefined}
              className="relative min-w-0"
            >
              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-[calc(50%+1.55rem)] right-[calc(-50%+1.55rem)] top-6 h-px transition-colors duration-300",
                    index < step
                      ? "bg-gradient-to-r from-[var(--color-coral)] to-[var(--color-plum-light)]"
                      : "bg-[var(--color-line)]",
                  )}
                />
              )}

              <div className="relative z-10 flex flex-col items-center gap-2 text-center">
                <span
                  className={cn(
                    "grid h-12 w-12 place-items-center rounded-2xl border transition-all duration-300 sm:h-14 sm:w-14",
                    state === "current" &&
                      "border-[var(--color-coral)] bg-[linear-gradient(145deg,#351146,#1d082a)] shadow-[0_0_0_2px_rgba(239,57,216,0.18),0_10px_24px_rgba(72,35,97,0.22)]",
                    state === "complete" &&
                      "border-[var(--color-plum)]/30 bg-[var(--color-plum)] text-white shadow-sm",
                    state === "upcoming" &&
                      "border-[var(--color-line)] bg-white text-[var(--color-muted)]",
                  )}
                >
                  {state === "complete" ? (
                    <Check className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <FirmenflowIcon
                      name={item.icon}
                      size={state === "current" ? 42 : 34}
                      decorative
                      className={cn(state === "upcoming" && "opacity-55 grayscale-[0.2]")}
                    />
                  )}
                </span>
                <span
                  className={cn(
                    "hidden truncate text-[11px] font-semibold sm:block sm:text-xs",
                    state === "current" ? "text-[var(--color-plum)]" : "text-[var(--color-muted)]",
                  )}
                >
                  {item.label}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

import { Globe, RefreshCw, Star } from "lucide-react";
import type { InquiryDraft } from "@/features/inquiry/types";
import { cn } from "@/lib/cn";

type StepProps = {
  data: InquiryDraft;
  errors: Record<string, string>;
  onPatch: (value: Partial<InquiryDraft>) => void;
};

const options = [
  {
    value: "new-site",
    title: "Neue Website",
    description: "Für deinen Betrieb ohne moderne Website. Individuell, mobilfreundlich und lokal auffindbar.",
    icon: Globe,
  },
  {
    value: "relaunch",
    title: "Website-Relaunch",
    description: "Deine vorhandene Website wird neu strukturiert, moderner gestaltet und für mehr Anfragen optimiert.",
    icon: RefreshCw,
  },
  {
    value: "google-business",
    title: "Google Business 360° – Pilot",
    description: "Limitiertes Pilotprogramm für Profil-Audit, echtes Bewertungsmanagement und monatliche Auswertung.",
    icon: Star,
  },
] as const;

export function ProjectTypeStep({ data, errors, onPatch }: StepProps) {
  return (
    <fieldset className="space-y-6">
      <legend className="text-xl sm:text-2xl font-bold text-[var(--color-ink)] mb-2">
        Was ist dein wichtigstes Vorhaben?
      </legend>
      <p className="text-sm text-[var(--color-muted)]">
        Wähle den passenden Schwerpunkt. Alle Details kläre ich direkt im persönlichen Gespräch mit dir.
      </p>

      {errors.projectType && (
        <p className="text-xs font-semibold text-rose-600" role="alert">
          {errors.projectType}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = data.projectType === opt.value;

          return (
            <label
              key={opt.value}
              className={cn(
                "relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl border-2 cursor-pointer transition-all duration-200",
                isSelected
                  ? "border-[var(--color-coral)] bg-[var(--color-coral)]/5 shadow-md"
                  : "border-[var(--color-line)] bg-white hover:border-[var(--color-plum)]/30 hover:bg-[var(--color-paper)]/50"
              )}
            >
              <input
                type="radio"
                name="projectType"
                value={opt.value}
                checked={isSelected}
                onChange={() => onPatch({ projectType: opt.value })}
                className="sr-only"
                aria-describedby={errors.projectType ? "projectType-error" : undefined}
              />
              <div className="space-y-4">
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                    isSelected
                      ? "bg-[var(--color-coral)] text-white"
                      : "bg-[var(--color-plum)]/10 text-[var(--color-plum)]"
                  )}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[var(--color-ink)]">{opt.title}</h3>
                <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                  {opt.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-[var(--color-line)] flex items-center gap-2">
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                    isSelected ? "border-[var(--color-coral)]" : "border-[var(--color-line)]"
                  )}
                >
                  {isSelected && <div className="w-2 h-2 rounded-full bg-[var(--color-coral)]" />}
                </div>
                <span className="text-xs font-semibold text-[var(--color-ink)]">
                  {isSelected ? "Ausgewählt" : "Auswählen"}
                </span>
              </div>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

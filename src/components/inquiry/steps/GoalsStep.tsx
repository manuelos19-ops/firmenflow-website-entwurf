import type { InquiryDraft } from "@/features/inquiry/types";
import { cn } from "@/lib/cn";

type StepProps = {
  data: InquiryDraft;
  errors: Record<string, string>;
  onPatch: (value: Partial<InquiryDraft>) => void;
};

// Ziele konditional: nur die Sätze zeigen, die zu den gewählten Leistungen passen
const websiteGoals = [
  { value: "more-inquiries", label: "Mehr passende Anfragen erhalten" },
  { value: "professional-presentation", label: "Meinen Betrieb professioneller präsentieren" },
  { value: "clear-offer", label: "Leistungen verständlicher erklären" },
  { value: "easy-contact", label: "Kontaktaufnahme erleichtern" },
] as const;

const lokalGoals = [
  { value: "better-findability", label: "Bei Google und Maps besser auffindbar sein" },
  { value: "profile-current", label: "Mein Profil aktuell halten" },
  { value: "reviews-handled", label: "Bewertungen zuverlässig beantworten lassen" },
  { value: "less-daytoday", label: "Im Alltag weniger selbst erledigen müssen" },
] as const;

export function GoalsStep({ data, errors, onPatch }: StepProps) {
  const services = data.services || [];
  const showWebsiteGoals = services.includes("website") || data.guidance;
  const showLokalGoals = services.includes("lokalpraesenz") || data.guidance;
  const options = [
    ...(showWebsiteGoals ? websiteGoals : []),
    ...(showLokalGoals ? lokalGoals : []),
  ];

  const toggleGoal = (goal: InquiryDraft["goals"][number]) => {
    const current = data.goals || [];
    const exists = current.includes(goal);
    const updated = exists ? current.filter((g) => g !== goal) : [...current, goal];
    onPatch({ goals: updated });
  };

  return (
    <fieldset className="space-y-6">
      <legend className="text-xl sm:text-2xl font-bold text-[var(--color-ink)] mb-2">
        Was soll sich für deinen Betrieb verbessern?
      </legend>
      <p className="text-sm text-[var(--color-muted)]">
        Wähle alles aus, was für dich im Vordergrund steht.
        {data.guidance && (
          <>
            {" "}
            <span className="font-medium text-[var(--color-ink)]">
              Das möchte ich gemeinsam mit dir herausfinden.
            </span>
          </>
        )}
      </p>

      {errors.goals && (
        <p className="text-xs font-semibold text-rose-600" role="alert">
          {errors.goals}
        </p>
      )}

      <div className="space-y-3">
        {options.map((opt) => {
          const isChecked = data.goals?.includes(opt.value);

          return (
            <label
              key={opt.value}
              className={cn(
                "flex items-center gap-3.5 p-4 rounded-xl border cursor-pointer transition-all",
                isChecked
                  ? "border-[var(--color-coral)] bg-[var(--color-coral)]/5 text-[var(--color-ink)] font-medium"
                  : "border-[var(--color-line)] bg-white hover:border-[var(--color-plum)]/30 text-[var(--color-muted)]"
              )}
            >
              <input
                type="checkbox"
                name="goals"
                value={opt.value}
                checked={isChecked}
                onChange={() => toggleGoal(opt.value)}
                className="w-5 h-5 rounded border-[var(--color-line)] text-[var(--color-coral)] focus:ring-[var(--color-coral)]"
              />
              <span className="text-sm sm:text-base text-[var(--color-ink)]">{opt.label}</span>
            </label>
          );
        })}
      </div>

      {/* Optionale Zusatzleistung (kein Geschäftsziel) */}
      <div className="pt-4 border-t border-[var(--color-line)] space-y-3">
        <p className="block text-xs sm:text-sm font-semibold text-[var(--color-ink)]">
          Dabei wünsche ich mir Unterstützung <span className="text-[var(--color-muted)] font-normal">(optional)</span>
        </p>
        <label
          className={cn(
            "flex items-center gap-3.5 p-4 rounded-xl border cursor-pointer transition-all",
            data.supportPhotoVideo
              ? "border-[var(--color-coral)] bg-[var(--color-coral)]/5 text-[var(--color-ink)] font-medium"
              : "border-[var(--color-line)] bg-white hover:border-[var(--color-plum)]/30 text-[var(--color-muted)]"
          )}
        >
          <input
            type="checkbox"
            name="supportPhotoVideo"
            checked={data.supportPhotoVideo}
            onChange={(e) => onPatch({ supportPhotoVideo: e.target.checked })}
            className="w-5 h-5 rounded border-[var(--color-line)] text-[var(--color-coral)] focus:ring-[var(--color-coral)]"
          />
          <span className="text-sm sm:text-base text-[var(--color-ink)]">
            Fotos & Imagefilm (Team, Räumlichkeiten & Betrieb)
          </span>
        </label>
      </div>

      {/* Goal Details */}
      <div className="pt-4">
        <label htmlFor="goalDetails" className="block text-xs sm:text-sm font-semibold text-[var(--color-ink)] mb-1.5">
          Gibt es Besonderheiten oder Wünsche? <span className="text-[var(--color-muted)] font-normal">(optional)</span>
        </label>
        <textarea
          id="goalDetails"
          name="goalDetails"
          rows={3}
          value={data.goalDetails}
          onChange={(e) => onPatch({ goalDetails: e.target.value })}
          placeholder="Erzähle mir kurz, was dir besonders am Herzen liegt..."
          className="w-full px-4 py-3.5 rounded-xl border border-[var(--color-line)] bg-white text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/50 focus:border-[var(--color-coral)] focus:ring-2 focus:ring-[var(--color-coral)]/20 transition-all text-sm sm:text-base outline-none resize-none"
          aria-describedby={errors.goalDetails ? "goalDetails-error" : undefined}
        />
        {errors.goalDetails && (
          <p id="goalDetails-error" className="text-xs font-semibold text-rose-600 mt-1" role="alert">
            {errors.goalDetails}
          </p>
        )}
      </div>
    </fieldset>
  );
}

import type { InquiryDraft } from "@/features/inquiry/types";
import { FirmenflowIcon } from "@/components/brand/FirmenflowIcon";
import { InquiryChoiceCard } from "@/components/inquiry/InquiryChoiceCard";

type StepProps = {
  data: InquiryDraft;
  errors: Record<string, string>;
  onPatch: (value: Partial<InquiryDraft>) => void;
};

// Ziele konditional: nur die Sätze zeigen, die zu den gewählten Leistungen passen
const websiteGoals = [
  { value: "more-inquiries", label: "Mehr passende Anfragen erhalten", icon: "mehr-anfragen" },
  { value: "professional-presentation", label: "Meinen Betrieb professioneller präsentieren", icon: "referenzen-portfolio" },
  { value: "clear-offer", label: "Leistungen verständlicher erklären", icon: "texte-copywriting" },
  { value: "easy-contact", label: "Kontaktaufnahme erleichtern", icon: "nachricht-senden" },
] as const;

const lokalGoals = [
  { value: "better-findability", label: "Bei Google und Maps besser auffindbar sein", icon: "unternehmensprofil" },
  { value: "profile-current", label: "Mein Profil aktuell halten", icon: "profil-aufraeumen" },
  { value: "reviews-handled", label: "Bewertungen zuverlässig beantworten lassen", icon: "bewertungen-beantworten" },
  { value: "less-daytoday", label: "Im Alltag weniger selbst erledigen müssen", icon: "monatlich-kuendbar" },
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
      <legend className="mb-2 w-full text-xl font-bold text-[var(--color-ink)] sm:text-2xl">
        <span className="flex items-center gap-3">
          <span className="grid h-14 w-14 place-items-center rounded-2xl border border-[var(--color-plum)]/10 bg-[var(--color-plum)]/[0.04]">
            <FirmenflowIcon name="handlungsempfehlung" size={50} decorative />
          </span>
          <span>Was soll sich für deinen Betrieb verbessern?</span>
        </span>
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
        <p className="flex items-center gap-2 text-xs font-semibold text-rose-700" role="alert">
          <FirmenflowIcon name="warnung" size={22} decorative />
          <span>{errors.goals}</span>
        </p>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((opt) => {
          const isChecked = data.goals?.includes(opt.value);

          return (
            <InquiryChoiceCard
              key={opt.value}
              selected={Boolean(isChecked)}
              title={opt.label}
              icon={opt.icon}
            >
              <input
                type="checkbox"
                name="goals"
                value={opt.value}
                checked={isChecked}
                onChange={() => toggleGoal(opt.value)}
                className="sr-only"
                aria-checked={Boolean(isChecked)}
              />
            </InquiryChoiceCard>
          );
        })}
      </div>

      {/* Optionale Zusatzleistung (kein Geschäftsziel) */}
      <div className="pt-4 border-t border-[var(--color-line)] space-y-3">
        <p className="block text-xs sm:text-sm font-semibold text-[var(--color-ink)]">
          Dabei wünsche ich mir Unterstützung <span className="text-[var(--color-muted)] font-normal">(optional)</span>
        </p>
        <InquiryChoiceCard
          selected={data.supportPhotoVideo}
          title="Fotos und Imagefilm"
          description="Team, Räumlichkeiten und Betrieb authentisch zeigen"
          icon="foto"
        >
          <input
            type="checkbox"
            name="supportPhotoVideo"
            checked={data.supportPhotoVideo}
            onChange={(e) => onPatch({ supportPhotoVideo: e.target.checked })}
            className="sr-only"
            aria-checked={data.supportPhotoVideo}
          />
        </InquiryChoiceCard>
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
          className="w-full resize-none rounded-2xl border border-[var(--color-line)] bg-[var(--color-paper)]/45 px-4 py-3.5 text-sm text-[var(--color-ink)] outline-none transition-all placeholder:text-[var(--color-muted)]/50 focus:border-[var(--color-plum)] focus:bg-white focus:ring-4 focus:ring-[var(--color-coral)]/10 sm:text-base"
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

import type { InquiryDraft } from "@/features/inquiry/types";
import { cn } from "@/lib/cn";
import { FirmenflowIcon } from "@/components/brand/FirmenflowIcon";

type StepProps = {
  data: InquiryDraft;
  errors: Record<string, string>;
  onPatch: (value: Partial<InquiryDraft>) => void;
};

const serviceOptions = [
  {
    value: "website",
    title: "Website erstellen oder verbessern",
    description:
      "Zeig, was deinen Betrieb ausmacht, und mach Interessenten den Weg zur Anfrage leicht.",
    iconName: "neue-website",
  },
  {
    value: "lokalpraesenz",
    title: "Lokalpräsenz 360°",
    description:
      "Ein gepflegtes Google-Profil, persönlich beantwortete Bewertungen und regelmäßige Betreuung.",
    iconName: "unternehmensprofil",
  },
] as const;

const websiteScopes = [
  {
    value: "new",
    label: "Neue Website erstellen",
    hint: "Dein Betrieb hat noch keine (moderne) Website.",
  },
  {
    value: "relaunch",
    label: "Bestehende Website überarbeiten",
    hint: "Deine aktuelle Seite soll frischer und wirksamer werden.",
  },
  {
    value: "unsure",
    label: "Noch unsicher",
    hint: "Wir schauen gemeinsam, was am meisten bringt.",
  },
] as const;

export function ServicesStep({ data, errors, onPatch }: StepProps) {
  const toggleService = (service: "website" | "lokalpraesenz") => {
    const current = data.services || [];
    const exists = current.includes(service);
    const updated = exists ? current.filter((s) => s !== service) : [...current, service];
    const patch: Partial<InquiryDraft> = { services: updated };
    if (updated.length > 0 && data.guidance) {
      patch.guidance = false;
    }
    if (!updated.includes("website") && data.websiteScope) {
      patch.websiteScope = "";
    }
    onPatch(patch);
  };

  const websiteSelected = data.services?.includes("website");

  return (
    <fieldset className="space-y-6">
      <legend className="text-xl sm:text-2xl font-bold text-[var(--color-ink)] mb-2">
        Wobei darf ich dich unterstützen?
      </legend>
      <p className="text-sm text-[var(--color-muted)]">
        Du kannst beides auswählen – viele Betriebe kombinieren Website und Google-Präsenz.
      </p>

      {errors.services && (
        <p className="text-xs font-semibold text-rose-600" role="alert">
          {errors.services}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {serviceOptions.map((opt) => {
          const isSelected = data.services?.includes(opt.value);

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
                type="checkbox"
                name="services"
                value={opt.value}
                checked={isSelected}
                onChange={() => toggleService(opt.value)}
                className="sr-only"
                aria-describedby={errors.services ? "services-error" : undefined}
              />
              <div className="space-y-4">
                <FirmenflowIcon name={opt.iconName} size={56} decorative />
                <h3 className="text-lg font-bold text-[var(--color-ink)]">{opt.title}</h3>
                <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
                  {opt.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-[var(--color-line)] flex items-center gap-2">
                <div
                  className={cn(
                    "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors",
                    isSelected ? "border-[var(--color-coral)] bg-[var(--color-coral)]" : "border-[var(--color-line)]"
                  )}
                >
                  {isSelected && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="m5 12 5 5 9-9" />
                    </svg>
                  )}
                </div>
                <span className="text-xs font-semibold text-[var(--color-ink)]">
                  {isSelected ? "Ausgewählt" : "Auswählen"}
                </span>
              </div>
            </label>
          );
        })}
      </div>

      {/* Beratungswunsch als dezente Alternative unterhalb der Karten */}
      <div className="pt-1">
        <label className="flex items-center gap-3 p-4 rounded-xl border border-dashed border-[var(--color-line)] bg-[var(--color-paper)]/40 cursor-pointer transition-all hover:border-[var(--color-plum)]/40">
          <input
            type="checkbox"
            name="guidance"
            checked={data.guidance}
            onChange={(e) => {
              const patch: Partial<InquiryDraft> = { guidance: e.target.checked };
              if (e.target.checked) {
                patch.services = [];
                patch.websiteScope = "";
              }
              onPatch(patch);
            }}
            className="w-4 h-4 rounded border-[var(--color-line)] text-[var(--color-coral)] focus:ring-[var(--color-coral)]"
          />
          <span className="text-sm text-[var(--color-muted)]">
            Ich bin noch unsicher und möchte{" "}
            <span className="font-semibold text-[var(--color-ink)]">deine Empfehlung</span> – gemeinsam finden wir das Passende.
          </span>
        </label>
      </div>

      {/* Bedarfs-Nachfrage: nur wenn Website gewählt */}
      {websiteSelected && (
        <div className="space-y-3 pt-2">
          <p className="block text-xs sm:text-sm font-semibold text-[var(--color-ink)]">
            Und was gilt für deine Website? *
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {websiteScopes.map((scope) => {
              const isSelected = data.websiteScope === scope.value;

              return (
                <label
                  key={scope.value}
                  className={cn(
                    "flex flex-col gap-1 p-4 rounded-xl border cursor-pointer transition-all",
                    isSelected
                      ? "border-[var(--color-coral)] bg-[var(--color-coral)]/5 font-semibold text-[var(--color-ink)]"
                      : "border-[var(--color-line)] bg-white hover:border-[var(--color-plum)]/30 text-[var(--color-muted)]"
                  )}
                >
                  <input
                    type="radio"
                    name="websiteScope"
                    value={scope.value}
                    checked={isSelected}
                    onChange={() => onPatch({ websiteScope: scope.value })}
                    className="w-4 h-4 text-[var(--color-coral)] focus:ring-[var(--color-coral)]"
                  />
                  <span className="text-sm">{scope.label}</span>
                  <span className="text-xs font-normal text-[var(--color-muted)]">{scope.hint}</span>
                </label>
              );
            })}
          </div>
          {errors.websiteScope && (
            <p id="websiteScope-error" className="text-xs font-semibold text-rose-600 flex items-center gap-1" role="alert">
              <span>⚠️</span>
              <span>{errors.websiteScope}</span>
            </p>
          )}
        </div>
      )}
    </fieldset>
  );
}
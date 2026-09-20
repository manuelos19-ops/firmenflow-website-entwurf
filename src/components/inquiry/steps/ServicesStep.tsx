import type { InquiryDraft } from "@/features/inquiry/types";
import { cn } from "@/lib/cn";
import { FirmenflowIcon } from "@/components/brand/FirmenflowIcon";
import { Check } from "@/components/brand/FirmenflowUiIcon";
import { InquiryChoiceCard } from "@/components/inquiry/InquiryChoiceCard";

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
      <legend className="mb-2 w-full text-xl font-bold text-[var(--color-ink)] sm:text-2xl">
        <span className="flex items-center gap-3">
          <span className="grid h-14 w-14 place-items-center rounded-2xl border border-[var(--color-plum)]/10 bg-[var(--color-plum)]/[0.04]">
            <FirmenflowIcon name="beratung" size={50} decorative />
          </span>
          <span>Wobei darf ich dich unterstützen?</span>
        </span>
      </legend>
      <p className="text-sm text-[var(--color-muted)]">
        Du kannst beides auswählen. Viele Betriebe kombinieren Website und Google-Präsenz.
      </p>

      {errors.services && (
        <p id="services-error" className="flex items-center gap-2 text-xs font-semibold text-rose-700" role="alert">
          <FirmenflowIcon name="warnung" size={22} decorative />
          <span>{errors.services}</span>
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {serviceOptions.map((opt) => {
          const isSelected = data.services?.includes(opt.value);

          return (
            <InquiryChoiceCard
              key={opt.value}
              selected={Boolean(isSelected)}
              title={opt.title}
              description={opt.description}
              icon={opt.iconName}
              className="md:min-h-52 md:flex-col md:items-start"
            >
              <input
                type="checkbox"
                name="services"
                value={opt.value}
                checked={isSelected}
                onChange={() => toggleService(opt.value)}
                className="sr-only"
                aria-checked={Boolean(isSelected)}
                aria-describedby={errors.services ? "services-error" : undefined}
              />
            </InquiryChoiceCard>
          );
        })}
      </div>

      {/* Beratungswunsch als dezente Alternative unterhalb der Karten */}
      <div className="pt-1">
        <label
          className={cn(
            "flex cursor-pointer items-center gap-3 rounded-xl border border-dashed p-4 transition-all",
            data.guidance
              ? "border-[var(--color-coral)] bg-[var(--color-coral)]/5"
              : "border-[var(--color-line)] bg-[var(--color-paper)]/40 hover:border-[var(--color-plum)]/40",
          )}
        >
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
            className="sr-only"
          />
          <span
            aria-hidden="true"
            className={cn(
              "grid h-6 w-6 shrink-0 place-items-center rounded-lg border-2",
              data.guidance
                ? "border-[var(--color-coral)] bg-[var(--color-coral)] text-white"
                : "border-[var(--color-plum)]/20 bg-white",
            )}
          >
            {data.guidance ? <Check className="h-3.5 w-3.5" /> : null}
          </span>
          <FirmenflowIcon name="beratung" size={34} decorative />
          <span className="text-sm text-[var(--color-muted)]">
            Ich bin noch unsicher und möchte{" "}
            <span className="font-semibold text-[var(--color-ink)]">deine Empfehlung</span>. Gemeinsam finden wir das Passende.
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
                    "relative flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all",
                    isSelected
                      ? "border-[var(--color-coral)] bg-[var(--color-coral)]/5 text-[var(--color-ink)] shadow-sm"
                      : "border-[var(--color-line)] bg-white hover:border-[var(--color-plum)]/30 text-[var(--color-muted)]"
                  )}
                >
                  <input
                    type="radio"
                    name="websiteScope"
                    value={scope.value}
                    checked={isSelected}
                    onChange={() => onPatch({ websiteScope: scope.value })}
                    className="sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2",
                      isSelected
                        ? "border-[var(--color-coral)] bg-[var(--color-coral)] text-white"
                        : "border-[var(--color-plum)]/20 bg-white",
                    )}
                  >
                    {isSelected ? <Check className="h-3 w-3" /> : null}
                  </span>
                  <span className="space-y-1">
                    <span className="block text-sm font-semibold">{scope.label}</span>
                    <span className="block text-xs font-normal text-[var(--color-muted)]">{scope.hint}</span>
                  </span>
                </label>
              );
            })}
          </div>
          {errors.websiteScope && (
            <p id="websiteScope-error" className="text-xs font-semibold text-rose-700 flex items-center gap-2" role="alert">
              <FirmenflowIcon name="warnung" size={22} decorative />
              <span>{errors.websiteScope}</span>
            </p>
          )}
        </div>
      )}
    </fieldset>
  );
}

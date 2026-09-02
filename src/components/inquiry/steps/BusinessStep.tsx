import type { InquiryDraft } from "@/features/inquiry/types";
import { cn } from "@/lib/cn";

type StepProps = {
  data: InquiryDraft;
  errors: Record<string, string>;
  onPatch: (value: Partial<InquiryDraft>) => void;
};

export function BusinessStep({ data, errors, onPatch }: StepProps) {
  return (
    <fieldset className="space-y-6">
      <legend className="text-xl sm:text-2xl font-bold text-[var(--color-ink)] mb-2">
        Erzähl kurz von deinem Betrieb
      </legend>
      <p className="text-sm text-[var(--color-muted)]">
        Damit ich mich gezielt auf deine Branche und Region vorbereiten kann.
      </p>

      <div className="space-y-4">
        {/* Business Name */}
        <div>
          <label htmlFor="businessName" className="block text-xs sm:text-sm font-semibold text-[var(--color-ink)] mb-1.5">
            Name deines Betriebs *
          </label>
          <input
            id="businessName"
            name="businessName"
            type="text"
            required
            value={data.businessName}
            onChange={(e) => onPatch({ businessName: e.target.value })}
            placeholder="z. B. Bäckerei Müller oder Schreinerei Schmidt"
            className={cn(
              "w-full px-4 py-3.5 rounded-xl border bg-white text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/50 focus:ring-2 transition-all text-sm sm:text-base outline-none",
              errors.businessName
                ? "border-rose-500 bg-rose-50/30 focus:border-rose-600 focus:ring-rose-200"
                : "border-[var(--color-line)] focus:border-[var(--color-coral)] focus:ring-[var(--color-coral)]/20"
            )}
            aria-describedby={errors.businessName ? "businessName-error" : undefined}
          />
          {errors.businessName && (
            <p id="businessName-error" className="text-xs font-semibold text-rose-600 mt-1 flex items-center gap-1" role="alert">
              <span>⚠️</span>
              <span>{errors.businessName}</span>
            </p>
          )}
        </div>

        {/* Industry & Place Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="industry" className="block text-xs sm:text-sm font-semibold text-[var(--color-ink)] mb-1.5">
              Branche *
            </label>
            <input
              id="industry"
              name="industry"
              type="text"
              required
              value={data.industry}
              onChange={(e) => onPatch({ industry: e.target.value })}
              placeholder="z. B. Handwerk, Gastronomie, Dienstleistung"
              className={cn(
                "w-full px-4 py-3.5 rounded-xl border bg-white text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/50 focus:ring-2 transition-all text-sm sm:text-base outline-none",
                errors.industry
                  ? "border-rose-500 bg-rose-50/30 focus:border-rose-600 focus:ring-rose-200"
                  : "border-[var(--color-line)] focus:border-[var(--color-coral)] focus:ring-[var(--color-coral)]/20"
              )}
              aria-describedby={errors.industry ? "industry-error" : undefined}
            />
            {errors.industry && (
              <p id="industry-error" className="text-xs font-semibold text-rose-600 mt-1 flex items-center gap-1" role="alert">
                <span>⚠️</span>
                <span>{errors.industry}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="place" className="block text-xs sm:text-sm font-semibold text-[var(--color-ink)] mb-1.5">
              Standort / Ort *
            </label>
            <input
              id="place"
              name="place"
              type="text"
              required
              value={data.place}
              onChange={(e) => onPatch({ place: e.target.value })}
              placeholder="z. B. Wesel, Dinslaken, Hamminkeln"
              className={cn(
                "w-full px-4 py-3.5 rounded-xl border bg-white text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/50 focus:ring-2 transition-all text-sm sm:text-base outline-none",
                errors.place
                  ? "border-rose-500 bg-rose-50/30 focus:border-rose-600 focus:ring-rose-200"
                  : "border-[var(--color-line)] focus:border-[var(--color-coral)] focus:ring-[var(--color-coral)]/20"
              )}
              aria-describedby={errors.place ? "place-error" : undefined}
            />
            {errors.place && (
              <p id="place-error" className="text-xs font-semibold text-rose-600 mt-1 flex items-center gap-1" role="alert">
                <span>⚠️</span>
                <span>{errors.place}</span>
              </p>
            )}
          </div>
        </div>

        {/* Current Website */}
        <div>
          <label htmlFor="currentWebsite" className="block text-xs sm:text-sm font-semibold text-[var(--color-ink)] mb-1.5">
            Bestehende Website <span className="text-[var(--color-muted)] font-normal">(optional)</span>
          </label>
          <input
            id="currentWebsite"
            name="currentWebsite"
            type="text"
            inputMode="url"
            value={data.currentWebsite}
            onChange={(e) => onPatch({ currentWebsite: e.target.value })}
            placeholder="z. B. deine-aktuelle-seite.de"
            className={cn(
              "w-full px-4 py-3.5 rounded-xl border bg-white text-[var(--color-ink)] placeholder:text-[var(--color-muted)]/50 focus:ring-2 transition-all text-sm sm:text-base outline-none",
              errors.currentWebsite
                ? "border-rose-500 bg-rose-50/30 focus:border-rose-600 focus:ring-rose-200"
                : "border-[var(--color-line)] focus:border-[var(--color-coral)] focus:ring-[var(--color-coral)]/20"
            )}
            aria-describedby={errors.currentWebsite ? "currentWebsite-error" : undefined}
          />
          {errors.currentWebsite && (
            <p id="currentWebsite-error" className="text-xs font-semibold text-rose-600 mt-1 flex items-center gap-1" role="alert">
              <span>⚠️</span>
              <span>{errors.currentWebsite}</span>
            </p>
          )}
        </div>
      </div>
    </fieldset>
  );
}

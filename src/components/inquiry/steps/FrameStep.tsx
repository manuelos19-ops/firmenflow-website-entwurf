import type { InquiryDraft } from "@/features/inquiry/types";
import { cn } from "@/lib/cn";

type StepProps = {
  data: InquiryDraft;
  errors: Record<string, string>;
  onPatch: (value: Partial<InquiryDraft>) => void;
};

const timeframes = [
  { value: "soon", label: "So schnell wie möglich" },
  { value: "three-months", label: "In den nächsten 1–3 Monaten" },
  { value: "six-months", label: "In 3–6 Monaten" },
  { value: "flexible", label: "Flexibel / Erstmal orientieren" },
] as const;

const budgets = [
  { value: "under-2000", label: "Bis 2.000 €" },
  { value: "2000-4000", label: "2.000 € – 4.000 €" },
  { value: "4000-plus", label: "Ab 4.000 €" },
  { value: "not-sure", label: "Noch unsicher / Angebot abwarten" },
] as const;

export function FrameStep({ data, errors, onPatch }: StepProps) {
  return (
    <fieldset className="space-y-8">
      <legend className="text-xl sm:text-2xl font-bold text-[var(--color-ink)] mb-2">
        Zeitlicher und finanzieller Rahmen
      </legend>
      <p className="text-sm text-[var(--color-muted)]">
        Damit ich die Machbarkeit und den Umfang direkt passend einordnen kann.
      </p>

      {/* Timeframe */}
      <div className="space-y-3">
        <label className="block text-xs sm:text-sm font-semibold text-[var(--color-ink)]">
          Wann soll die Website fertig sein? *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {timeframes.map((tf) => {
            const isSelected = data.timeframe === tf.value;

            return (
              <label
                key={tf.value}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all",
                  isSelected
                    ? "border-[var(--color-coral)] bg-[var(--color-coral)]/5 font-semibold text-[var(--color-ink)]"
                    : "border-[var(--color-line)] bg-white hover:border-[var(--color-plum)]/30 text-[var(--color-muted)]"
                )}
              >
                <input
                  type="radio"
                  name="timeframe"
                  value={tf.value}
                  checked={isSelected}
                  onChange={() => onPatch({ timeframe: tf.value })}
                  className="w-4 h-4 text-[var(--color-coral)] focus:ring-[var(--color-coral)]"
                />
                <span className="text-sm">{tf.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Budget */}
      <div className="space-y-3 pt-4 border-t border-[var(--color-line)]">
        <label className="block text-xs sm:text-sm font-semibold text-[var(--color-ink)]">
          Hast du bereits ein ungefähres Budget eingeplant?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {budgets.map((b) => {
            const isSelected = data.budget === b.value;

            return (
              <label
                key={b.value}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all",
                  isSelected
                    ? "border-[var(--color-coral)] bg-[var(--color-coral)]/5 font-semibold text-[var(--color-ink)]"
                    : "border-[var(--color-line)] bg-white hover:border-[var(--color-plum)]/30 text-[var(--color-muted)]"
                )}
              >
                <input
                  type="radio"
                  name="budget"
                  value={b.value}
                  checked={isSelected}
                  onChange={() => onPatch({ budget: b.value })}
                  className="w-4 h-4 text-[var(--color-coral)] focus:ring-[var(--color-coral)]"
                />
                <span className="text-sm">{b.label}</span>
              </label>
            );
          })}
        </div>
      </div>
    </fieldset>
  );
}

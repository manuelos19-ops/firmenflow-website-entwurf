import type { InquiryDraft } from "@/features/inquiry/types";
import { cn } from "@/lib/cn";

type StepProps = {
  data: InquiryDraft;
  errors: Record<string, string>;
  onPatch: (value: Partial<InquiryDraft>) => void;
};

const timeframes = [
  { value: "soon", label: "Möglichst zeitnah" },
  { value: "three-months", label: "In den nächsten 1–3 Monaten" },
  { value: "six-months", label: "In 3–6 Monaten" },
  { value: "flexible", label: "Flexibel / Erstmal orientieren" },
] as const;

export function FrameStep({ data, errors, onPatch }: StepProps) {
  return (
    <fieldset className="space-y-6">
      <legend className="text-xl sm:text-2xl font-bold text-[var(--color-ink)] mb-2">
        Wann soll das Projekt starten?
      </legend>
      <p className="text-sm text-[var(--color-muted)]">
        Damit ich die Fertigstellung und Kapazitäten direkt passend für deinen Betrieb einplanen kann.
      </p>

      {/* Timeframe */}
      <div className="space-y-3">
        <label className="block text-xs sm:text-sm font-semibold text-[var(--color-ink)]">
          Gewünschter Zeitrahmen *
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
                <span className="text-sm sm:text-base">{tf.label}</span>
              </label>
            );
          })}
        </div>
        {errors.timeframe && (
          <p className="text-xs font-semibold text-rose-600 mt-1 flex items-center gap-1" role="alert">
            <span>⚠️</span>
            <span>{errors.timeframe}</span>
          </p>
        )}
      </div>
    </fieldset>
  );
}

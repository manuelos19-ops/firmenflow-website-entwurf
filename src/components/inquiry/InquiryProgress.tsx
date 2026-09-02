export function InquiryProgress({ step }: { step: number }) {
  const steps = ["Vorhaben", "Betrieb", "Ziele", "Zeitrahmen", "Kontakt"];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-[var(--color-muted)]">
        <span>
          Schritt {step + 1} von {steps.length}: <strong className="text-[var(--color-plum)]">{steps[step]}</strong>
        </span>
        <span>{Math.round(((step + 1) / steps.length) * 100)}%</span>
      </div>

      <div className="w-full h-2 bg-[var(--color-line)] rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--color-coral)] transition-all duration-300 ease-out"
          style={{ width: `${((step + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
}

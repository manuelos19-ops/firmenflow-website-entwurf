import type { ReactNode } from "react";
import { Check } from "@/components/brand/FirmenflowUiIcon";
import { FirmenflowIcon } from "@/components/brand/FirmenflowIcon";
import type { FirmenflowIconName } from "@/content/firmenflow-icons";
import { cn } from "@/lib/cn";

type InquiryChoiceCardProps = {
  selected: boolean;
  title: string;
  description?: string;
  icon: FirmenflowIconName;
  marker?: "checkbox" | "radio";
  children: ReactNode;
  className?: string;
};

export function InquiryChoiceCard({
  selected,
  title,
  description,
  icon,
  marker = "checkbox",
  children,
  className,
}: InquiryChoiceCardProps) {
  return (
    <label
      data-inquiry-choice={title}
      data-selected={selected}
      className={cn(
        "group relative flex min-h-28 cursor-pointer items-center gap-4 overflow-hidden rounded-2xl border-2 p-4 transition-all duration-300 sm:p-5",
        selected
          ? "border-[var(--color-coral)] bg-[linear-gradient(145deg,#351146_0%,#21082f_58%,#2b0d3a_100%)] text-white shadow-[0_14px_35px_rgba(72,35,97,0.22),0_0_0_2px_rgba(239,57,216,0.12)]"
          : "border-[var(--color-line)] bg-white text-[var(--color-ink)] hover:-translate-y-0.5 hover:border-[var(--color-plum)]/35 hover:shadow-[0_12px_30px_rgba(72,35,97,0.09)]",
        className,
      )}
    >
      {children}

      <span
        aria-hidden="true"
        className={cn(
          "relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl border transition-transform duration-300 group-hover:scale-[1.03]",
          selected
            ? "border-white/20 bg-white/8 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_20px_rgba(0,0,0,0.25)]"
            : "border-[var(--color-plum)]/10 bg-[var(--color-plum)]/[0.035]",
        )}
      >
        <FirmenflowIcon name={icon} size={58} decorative />
      </span>

      <span className="min-w-0 flex-1 space-y-1.5">
        <span className="block text-sm font-bold leading-snug sm:text-base">{title}</span>
        {description ? (
          <span
            className={cn(
              "block text-xs leading-relaxed sm:text-sm",
              selected ? "text-white/68" : "text-[var(--color-muted)]",
            )}
          >
            {description}
          </span>
        ) : null}
      </span>

      <span
        aria-hidden="true"
        className={cn(
          "grid h-6 w-6 shrink-0 place-items-center border-2 transition-all",
          marker === "radio" ? "rounded-full" : "rounded-lg",
          selected
            ? "border-[var(--color-coral)] bg-[var(--color-coral)] text-white shadow-[0_0_14px_rgba(255,112,93,0.45)]"
            : "border-[var(--color-plum)]/20 bg-white",
        )}
      >
        {selected ? <Check className="h-3.5 w-3.5" /> : null}
      </span>
    </label>
  );
}

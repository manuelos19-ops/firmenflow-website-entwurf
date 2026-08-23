import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  accent?: string;
  body?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  accent,
  body,
  align = "left",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div className={cn("space-y-4", isCenter && "text-center mx-auto max-w-3xl", className)}>
      <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[var(--color-coral)]">
        {eyebrow}
      </p>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-ink)] leading-[1.15]">
        {title}{" "}
        {accent && (
          <span className="font-editorial text-[var(--color-plum)] font-normal">
            {accent}
          </span>
        )}
      </h2>
      {body && (
        <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed max-w-2xl">
          {body}
        </p>
      )}
    </div>
  );
}

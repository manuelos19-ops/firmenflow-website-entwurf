import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonLinkProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "dark" | "ghost" | "whatsapp";
  size?: "default" | "lg";
  className?: string;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  showArrow?: boolean;
} & Omit<ComponentPropsWithoutRef<"button">, "type">;

export function ButtonLink({
  children,
  href,
  variant = "primary",
  size = "default",
  className,
  external = false,
  type = "button",
  disabled = false,
  onClick,
  showArrow = true,
  ...props
}: ButtonLinkProps) {
  const baseStyles =
    "group inline-flex items-center justify-center gap-3 font-medium tracking-tight rounded-full select-none transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] cursor-pointer text-center will-change-transform";

  // Keine "!"-Prefixe fuer Textfarben hier: tailwind-merge 3 erkennt die
  // alte Tailwind-v3-Schreibweise nicht als Farbklasse, laesst sie stehen und
  // haengt die Farbe vom Aufrufort zusaetzlich an. Ergebnis war ein schwarzer
  // Button-Text auf dunklem Grund (Google-Sektion, ghost-Variante).
  const variants = {
    primary:
      "bg-[var(--color-coral)] text-white hover:bg-[var(--color-coral-hover)] shadow-md shadow-[var(--color-coral)]/20 hover:shadow-xl hover:shadow-[var(--color-coral)]/30 ring-1 ring-white/20",
    secondary:
      "bg-white text-[var(--color-ink)] hover:bg-[var(--color-paper)] border border-[var(--color-line)] shadow-sm hover:border-[var(--color-plum)]/30 font-semibold ring-1 ring-black/[0.03]",
    dark: "bg-[var(--color-plum)] text-white hover:bg-[var(--color-plum-light)] shadow-md shadow-[var(--color-plum)]/20 ring-1 ring-white/15",
    ghost: "bg-transparent text-[var(--color-ink)] hover:text-[var(--color-coral)] underline-offset-4 hover:underline",
    whatsapp:
      "bg-[#25D366] text-white hover:bg-[#20ba5a] shadow-md shadow-[#25D366]/25 hover:shadow-xl hover:shadow-[#25D366]/35 font-semibold ring-1 ring-white/20",
  };

  const arrowBgVariants = {
    primary: "bg-white/20 text-white group-hover:bg-white/30",
    secondary: "bg-black/[0.06] text-[var(--color-ink)] group-hover:bg-black/[0.1]",
    dark: "bg-white/15 text-white group-hover:bg-white/25",
    ghost: "bg-black/[0.05] text-inherit group-hover:bg-[var(--color-coral)]/15 group-hover:text-[var(--color-coral)]",
    whatsapp: "bg-white/20 text-white group-hover:bg-white/30",
  };

  const sizes = {
    default: "pl-6 pr-5 py-3 text-sm md:text-base",
    lg: "pl-7 pr-6 py-3.5 sm:pl-8 sm:pr-6 sm:py-4 text-sm sm:text-base md:text-lg",
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], disabled && "opacity-50 pointer-events-none", className);

  const arrow = showArrow ? (
    <span
      data-arrow
      className={cn(
        "inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full shrink-0 -mr-1 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105",
        arrowBgVariants[variant]
      )}
    >
      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </span>
  ) : null;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noreferrer" className={classes} onClick={onClick}>
          <span className="inline-flex items-center gap-2 text-inherit">{children}</span>
          {arrow}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={onClick}>
        <span className="inline-flex items-center gap-2 text-inherit">{children}</span>
        {arrow}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes} {...props}>
      <span className="inline-flex items-center gap-2">{children}</span>
      {arrow}
    </button>
  );
}

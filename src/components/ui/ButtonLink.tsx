import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonLinkProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "dark" | "ghost";
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
    "group inline-flex items-center justify-center gap-2.5 font-medium tracking-tight rounded-full select-none transition-all duration-300 ease-out cursor-pointer";

  const variants = {
    primary:
      "bg-[var(--color-coral)] text-white hover:bg-[var(--color-coral-hover)] active:scale-[0.98] shadow-md shadow-[var(--color-coral)]/20 hover:shadow-lg hover:shadow-[var(--color-coral)]/30",
    secondary:
      "bg-white text-[var(--color-ink)] hover:bg-[var(--color-paper)] border border-[var(--color-line)] active:scale-[0.98] shadow-sm hover:border-[var(--color-plum)]/30",
    dark: "bg-[var(--color-plum)] text-white hover:bg-[var(--color-plum-light)] active:scale-[0.98] shadow-md shadow-[var(--color-plum)]/20",
    ghost: "bg-transparent text-[var(--color-ink)] hover:text-[var(--color-coral)] underline-offset-4 hover:underline",
  };

  const sizes = {
    default: "px-6 py-3.5 text-sm md:text-base",
    lg: "px-8 py-4 text-base md:text-lg",
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], disabled && "opacity-50 pointer-events-none", className);

  const arrow = showArrow ? (
    <span
      data-arrow
      className="inline-flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
    </span>
  ) : null;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noreferrer" className={classes}>
          <span>{children}</span>
          {arrow}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        <span>{children}</span>
        {arrow}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes} {...props}>
      <span>{children}</span>
      {arrow}
    </button>
  );
}

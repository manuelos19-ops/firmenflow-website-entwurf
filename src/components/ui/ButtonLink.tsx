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
    "group inline-flex items-center justify-center gap-2.5 font-medium tracking-tight rounded-full select-none transition-all duration-150 active:scale-[0.97] cursor-pointer text-center will-change-transform";

  const variants = {
    primary:
      "bg-[var(--color-coral)] text-white hover:bg-[var(--color-coral-hover)] shadow-md shadow-[var(--color-coral)]/20 hover:shadow-lg hover:shadow-[var(--color-coral)]/30",
    secondary:
      "bg-[var(--color-paper)] text-[#17131a] !text-[#17131a] hover:bg-white border border-[var(--color-line)] shadow-sm hover:border-[var(--color-plum)]/40 font-semibold",
    dark: "bg-[var(--color-plum)] text-white hover:bg-[var(--color-plum-light)] shadow-md shadow-[var(--color-plum)]/20",
    ghost: "bg-transparent text-[#17131a] !text-[#17131a] hover:text-[var(--color-coral)] underline-offset-4 hover:underline",
    whatsapp:
      "bg-[#25D366] text-white hover:bg-[#20ba5a] shadow-md shadow-[#25D366]/25 hover:shadow-lg hover:shadow-[#25D366]/35 font-semibold",
  };

  const sizes = {
    default: "px-6 py-3.5 text-sm md:text-base",
    lg: "px-7 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base md:text-lg",
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], disabled && "opacity-50 pointer-events-none", className);

  const arrow = showArrow ? (
    <span
      data-arrow
      className="inline-flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 text-inherit"
    >
      <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
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

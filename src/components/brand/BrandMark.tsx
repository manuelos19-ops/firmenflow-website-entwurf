import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

interface BrandMarkProps {
  variant?: "dark" | "light";
  className?: string;
}

export function BrandMark({ variant = "dark", className }: BrandMarkProps) {
  const isLight = variant === "light";

  return (
    <Link 
      href="/" 
      aria-label="Firmenflow – für deine Lokalpräsenz" 
      className={cn("inline-flex items-center gap-2.5 sm:gap-3 group focus-visible:outline-none select-none", className)}
    >
      {/* Authentic 3D Ribbon Monogram */}
      <div className="relative h-8 sm:h-9 md:h-10 w-8 sm:w-9 md:w-10 shrink-0 transition-transform duration-300 group-hover:scale-105">
        <Image
          src="/brand/firmenflow-mark.webp"
          alt="Firmenflow Logo"
          width={80}
          height={80}
          priority
          className="h-full w-full object-contain"
        />
      </div>

      {/* Vector-Sharp Typography */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-baseline tracking-tight">
          <span 
            className={cn(
              "font-display font-black text-base sm:text-lg md:text-xl tracking-wider transition-colors duration-200",
              isLight ? "text-white" : "text-[var(--color-ink)]"
            )}
          >
            FIRMEN
          </span>
          <span className="font-editorial italic font-medium text-base sm:text-lg md:text-xl text-[var(--color-coral)] ml-0.5">
            flow
          </span>
        </div>
        <span 
          className={cn(
            "text-[9px] sm:text-[10px] md:text-[10.5px] font-sans tracking-wide mt-0.5 transition-colors duration-200",
            isLight ? "text-white/70" : "text-[var(--color-ink)]/75"
          )}
        >
          für deine Lokalpräsenz.
        </span>
      </div>
    </Link>
  );
}

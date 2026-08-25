import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

interface BrandMarkProps {
  variant?: "dark" | "light";
  className?: string;
  showAvatar?: boolean;
}

export function BrandMark({ variant = "dark", className, showAvatar = true }: BrandMarkProps) {
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

      {/* Friendly 3D Manu Thumbs-Up Avatar USP Badge */}
      {showAvatar && (
        <div 
          className={cn(
            "hidden md:flex items-center gap-1.5 pl-1.5 py-0.5 pr-2.5 rounded-full border transition-all duration-300 group-hover:border-[var(--color-coral)]/40 ml-1.5 shadow-sm",
            isLight 
              ? "bg-white/10 border-white/15 text-white" 
              : "bg-[var(--color-plum)]/5 border-[var(--color-plum)]/10 text-[var(--color-plum)]"
          )}
        >
          <div className="relative w-5 h-5 rounded-full overflow-hidden border border-[var(--color-coral)] shrink-0 shadow-sm">
            <Image
              src="/media/avatars/manu-avatar-thumbsup.webp"
              alt="Manu 3D Avatar"
              fill
              className="object-cover object-top"
            />
          </div>
          <span className="text-[10px] font-bold tracking-tight">
            mit Manu 👍
          </span>
        </div>
      )}
    </Link>
  );
}

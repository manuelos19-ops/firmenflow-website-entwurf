import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

interface BrandMarkProps {
  variant?: "dark" | "light";
  size?: "default" | "md" | "lg" | "xl";
  className?: string;
  imageWrapperClassName?: string;
}

export function BrandMark({ 
  variant = "dark", 
  size = "default", 
  className,
  imageWrapperClassName,
}: BrandMarkProps) {
  const isLight = variant === "light";
  const logoSrc = isLight 
    ? "/brand/firmenflow-wordmark-light.webp" 
    : "/brand/firmenflow-wordmark.webp";

  const sizeClasses = {
    default: "h-10 sm:h-11 md:h-12",
    md: "h-11 sm:h-12 md:h-14",
    lg: "h-13 sm:h-15 md:h-16",
    xl: "h-16 sm:h-18 md:h-20",
  }[size];

  return (
    <Link 
      href="/" 
      aria-label="Firmenflow – für deine Lokalpräsenz" 
      className={cn("inline-flex items-center group focus-visible:outline-none select-none", className)}
    >
      <div className={cn(
        "relative w-auto aspect-[3.89/1] shrink-0 transition-transform duration-300 group-hover:scale-[1.02]",
        sizeClasses,
        imageWrapperClassName
      )}>
        <Image
          src={logoSrc}
          alt="Firmenflow – für deine Lokalpräsenz."
          fill
          priority
          className="object-contain object-left"
          sizes={size === "lg" || size === "xl" ? "(max-width: 640px) 260px, 340px" : "(max-width: 640px) 200px, 260px"}
        />
      </div>
    </Link>
  );
}

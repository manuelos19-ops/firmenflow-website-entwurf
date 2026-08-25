import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

interface BrandMarkProps {
  variant?: "dark" | "light";
  className?: string;
}

export function BrandMark({ variant = "dark", className }: BrandMarkProps) {
  const isLight = variant === "light";
  const logoSrc = isLight 
    ? "/brand/firmenflow-wordmark-light.webp" 
    : "/brand/firmenflow-wordmark.webp";

  return (
    <Link 
      href="/" 
      aria-label="Firmenflow – für deine Lokalpräsenz" 
      className={cn("inline-flex items-center group focus-visible:outline-none select-none", className)}
    >
      <div className="relative h-9 sm:h-10 md:h-11 w-auto aspect-[3.5/1] shrink-0 transition-transform duration-300 group-hover:scale-[1.02]">
        <Image
          src={logoSrc}
          alt="FIRMENflow – für deine Lokalpräsenz"
          fill
          priority
          className="object-contain object-left"
          sizes="220px"
        />
      </div>
    </Link>
  );
}

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
      <div className="relative h-10 sm:h-11 md:h-12 w-auto aspect-[4.25/1] shrink-0 transition-transform duration-300 group-hover:scale-[1.02]">
        <Image
          src={logoSrc}
          alt="FIRMENflow – für deine Lokalpräsenz"
          fill
          priority
          className="object-contain object-left"
          sizes="(max-width: 640px) 190px, 250px"
        />
      </div>
    </Link>
  );
}

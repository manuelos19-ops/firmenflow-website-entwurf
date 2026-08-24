import Image from "next/image";
import Link from "next/link";
import { brandAssets } from "@/content/assets";
import { cn } from "@/lib/cn";

interface BrandMarkProps {
  variant?: "dark" | "light";
  className?: string;
}

export function BrandMark({ variant = "dark", className }: BrandMarkProps) {
  const src = variant === "light" ? brandAssets.wordmarkLight : brandAssets.wordmark;

  return (
    <Link href="/" aria-label="Firmenflow – für deine Lokalpräsenz" className={cn("inline-flex items-center group", className)}>
      <Image
        src={src}
        width={300}
        height={90}
        alt="Firmenflow – für deine Lokalpräsenz"
        priority
        className="h-10 sm:h-11 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
      />
    </Link>
  );
}

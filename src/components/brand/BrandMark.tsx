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
        width={942}
        height={231}
        alt="Firmenflow – für deine Lokalpräsenz"
        priority
        className="h-9 sm:h-10 md:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
      />
    </Link>
  );
}

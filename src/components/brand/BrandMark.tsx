import Image from "next/image";
import Link from "next/link";
import { brandAssets } from "@/content/assets";

export function BrandMark() {
  return (
    <Link href="/" aria-label="Firmenflow – für deine Lokalpräsenz" className="inline-flex items-center">
      <Image
        src={brandAssets.wordmark}
        width={260}
        height={48}
        alt="Firmenflow – für deine Lokalpräsenz"
        priority
        className="h-8 sm:h-9 md:h-10 w-auto"
      />
    </Link>
  );
}

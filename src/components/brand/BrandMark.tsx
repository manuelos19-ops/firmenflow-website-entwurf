import Image from "next/image";
import Link from "next/link";
import { brandAssets } from "@/content/assets";

export function BrandMark() {
  return (
    <Link href="/" aria-label="Firmenflow – für deine Lokalpräsenz" className="inline-flex items-center">
      <Image
        src={brandAssets.wordmark}
        width={220}
        height={44}
        alt="Firmenflow – für deine Lokalpräsenz"
        priority
        className="h-9 sm:h-11 w-auto"
      />
    </Link>
  );
}

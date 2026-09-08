"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation";

function UtmCleanerInner() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    if (!searchParams) return;
    const hasUtm =
      searchParams.has("utm_source") ||
      searchParams.has("utm_medium") ||
      searchParams.has("utm_campaign") ||
      searchParams.has("utm_content") ||
      searchParams.has("utm_term");

    if (hasUtm) {
      // Allow analytics trackers (GA4, Vercel Analytics) 600ms to register parameters
      const timer = setTimeout(() => {
        const cleanUrl = pathname || "/";
        window.history.replaceState({}, "", cleanUrl);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [searchParams, pathname]);

  return null;
}

export function UtmCleaner() {
  return (
    <Suspense fallback={null}>
      <UtmCleanerInner />
    </Suspense>
  );
}

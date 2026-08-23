import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const ready = process.env.SITE_READY === "true";
  return {
    rules: ready ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: ready ? new URL("/sitemap.xml", getSiteUrl()).href : undefined,
  };
}

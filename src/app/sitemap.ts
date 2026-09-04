import type { MetadataRoute } from "next";
import { liveProjects } from "@/content/projects";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl().origin;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: "2026-09-04",
    },
    {
      url: `${baseUrl}/google-business-360`,
      lastModified: "2026-09-04",
    },
    {
      url: `${baseUrl}/impressum`,
      lastModified: "2026-09-01",
    },
    {
      url: `${baseUrl}/datenschutz`,
      lastModified: "2026-09-01",
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = liveProjects.map((project) => ({
    url: `${baseUrl}/projekte/${project.slug}`,
    lastModified: "2026-09-04",
  }));

  return [...staticRoutes, ...projectRoutes];
}

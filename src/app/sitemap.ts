import type { MetadataRoute } from "next";
import { allProjects } from "@/content/projects";
import { getAllRatgeberPosts } from "@/lib/ratgeber";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl().origin;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: "2026-09-04",
    },
    {
      url: `${baseUrl}/ratgeber`,
      lastModified: "2026-09-19",
    },
    {
      url: `${baseUrl}/lokalpraesenz-360`,
      lastModified: "2026-09-08",
    },
    {
      url: `${baseUrl}/flowscreen`,
      lastModified: "2026-09-18",
    },
    {
      url: `${baseUrl}/ueber-manu`,
      lastModified: "2026-09-14",
    },
    {
      url: `${baseUrl}/anfrage`,
      lastModified: "2026-09-16",
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

  const projectRoutes: MetadataRoute.Sitemap = allProjects.map((project) => ({
    url: `${baseUrl}/projekte/${project.slug}`,
    lastModified: "2026-09-04",
  }));

  const ratgeberRoutes: MetadataRoute.Sitemap = getAllRatgeberPosts().map((post) => ({
    url: `${baseUrl}/ratgeber/${post.slug}`,
    lastModified: post.updated ?? post.date,
  }));

  return [...staticRoutes, ...projectRoutes, ...ratgeberRoutes];
}

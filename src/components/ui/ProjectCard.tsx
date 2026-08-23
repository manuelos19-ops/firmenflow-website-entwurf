import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";

export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const isLive = project.kind === "live";

  return (
    <div
      className={cn(
        "group h-full bg-white rounded-[2rem] p-8 sm:p-10 border border-[var(--color-line)] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between space-y-8",
        className
      )}
    >
      <div className="space-y-6">
        {/* Badge & Sector */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <span
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider",
              isLive
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-amber-50 text-amber-800 border border-amber-200"
            )}
          >
            {project.badge}
          </span>
          <span className="text-xs font-medium text-[var(--color-muted)]">
            {project.sector} · {project.region}
          </span>
        </div>

        {/* Project Name */}
        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-ink)] group-hover:text-[var(--color-plum)] transition-colors">
            {project.name}
          </h3>
          <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
            {project.summary}
          </p>
        </div>
      </div>

      {/* Action Links */}
      <div className="pt-6 border-t border-[var(--color-line)] flex items-center justify-between gap-4 flex-wrap">
        {isLive ? (
          <>
            <Link
              href={`/projekte/${project.slug}`}
              className="text-sm font-bold text-[var(--color-plum)] hover:text-[var(--color-coral)] transition-colors"
            >
              Einblicke ansehen →
            </Link>
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
              aria-label={`${project.name} – Live-Website ansehen (öffnet in neuem Tab)`}
            >
              <span>Website besuchen</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </>
        ) : (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-plum)] hover:text-[var(--color-coral)] transition-colors"
            aria-label={`${project.name} – Entwurfsvorschau ansehen (öffnet in neuem Tab)`}
          >
            <span>Vorschau ansehen</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}

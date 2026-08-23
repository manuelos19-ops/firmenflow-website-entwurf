import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { getLiveProject, liveProjects } from "@/content/projects";

export function generateStaticParams() {
  return liveProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getLiveProject(slug);
  if (!project) return {};

  return {
    title: `${project.name} – Webdesign Projekt | Firmenflow`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getLiveProject(slug);
  if (!project) notFound();

  return (
    <main id="main" className="pt-36 sm:pt-44 pb-28">
      <Container className="max-w-4xl space-y-12">
        <div>
          <Link
            href="/#projekte"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-muted)] hover:text-[var(--color-plum)] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zurück zur Übersicht</span>
          </Link>

          <div className="space-y-4">
            <span className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold uppercase tracking-wider">
              {project.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--color-ink)]">
              {project.name}
            </h1>
            <p className="text-lg text-[var(--color-coral)] font-medium">
              {project.sector} · {project.region}
            </p>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-[2rem] p-8 sm:p-12 border border-[var(--color-line)] shadow-sm space-y-8">
          <div className="space-y-4 text-base sm:text-lg text-[var(--color-muted)] leading-relaxed">
            <p className="text-[var(--color-ink)] font-medium text-xl">
              {project.summary}
            </p>
            {!project.factsApproved && (
              <div className="p-4 rounded-xl bg-[var(--color-paper)] border border-[var(--color-line)] text-sm text-[var(--color-muted)]">
                Ausgangslage, konkrete Projektrolle und Detailergebnisse werden nach der gemeinsamen Freigabe vollständig aufgeführt.
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-[var(--color-line)] flex flex-col sm:flex-row gap-4">
            <ButtonLink href={project.url} external variant="primary" size="lg">
              Live-Website ansehen
            </ButtonLink>
            <ButtonLink href="/#projektanfrage" variant="secondary" size="lg">
              Ähnliches Projekt starten
            </ButtonLink>
          </div>
        </div>
      </Container>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Smartphone, Zap, MapPin, Sparkles, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { allProjects, getProject } from "@/content/projects";
import { getSiteUrl } from "@/lib/site-url";
import { cn } from "@/lib/cn";

export function generateStaticParams() {
  return allProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const kindLabel = project.kind === "live" ? "Webdesign Case Study" : "Webdesign Konzeptentwurf";

  return {
    title: `${project.name} – ${kindLabel}`,
    description: project.summary,
    alternates: {
      canonical: `/projekte/${project.slug}`,
    },
    openGraph: {
      title: `${project.name} – ${kindLabel} | Firmenflow`,
      description: project.summary,
      // Kein eigenes OG-Bild: die Projektbilder sind Handy-Screenshots im
      // Hochformat und wuerden in der 1200x630-Vorschau beschnitten. Ohne
      // Angabe greift die opengraph-image aus src/app.
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const baseUrl = getSiteUrl().origin;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Startseite",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projekte",
        item: `${baseUrl}/#projekte`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.name,
        item: `${baseUrl}/projekte/${project.slug}`,
      },
    ],
  };

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${baseUrl}/projekte/${project.slug}#case`,
    url: `${baseUrl}/projekte/${project.slug}`,
    name: `${project.name} – Webdesign & Lokalpräsenz`,
    headline:
      project.kind === "live"
        ? `${project.name} – Case Study`
        : `${project.name} – Konzeptentwurf (kein Kundenauftrag)`,
    description: project.summary,
    image: `${baseUrl}${project.image}`,
    inLanguage: "de-DE",
    mainEntityOfPage: `${baseUrl}/projekte/${project.slug}`,
    author: {
      "@type": "Person",
      "@id": `${baseUrl}/#manu`,
      name: "Manuel Landeck",
      url: `${baseUrl}/#manu`,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "Firmenflow",
      url: baseUrl,
    },
  };

  return (
    <main id="main" className="pt-36 sm:pt-44 pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />

      <Container className="max-w-4xl space-y-12">
        {/* Breadcrumb Navigation */}
        <div>
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs sm:text-sm text-[var(--color-muted)]">
              <li>
                <Link href="/" className="hover:text-[var(--color-plum)] transition-colors">
                  Startseite
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/#projekte" className="hover:text-[var(--color-plum)] transition-colors">
                  Projekte
                </Link>
              </li>
              <li>/</li>
              <li className="text-[var(--color-ink)] font-semibold truncate">{project.name}</li>
            </ol>
          </nav>

          <div className="space-y-4">
            <span
              className={cn(
                "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider",
                project.kind === "live"
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                  : "bg-[var(--color-plum)]/10 text-[var(--color-plum)] border-[var(--color-plum)]/20"
              )}
            >
              <span
                className={cn(
                  "w-2 h-2 rounded-full",
                  project.kind === "live" ? "bg-emerald-500 animate-pulse" : "bg-[var(--color-coral)]"
                )}
              />
              {project.badge}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-[var(--color-ink)]">
              {project.name}
            </h1>
            <p className="text-lg sm:text-xl text-[var(--color-coral)] font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{project.sector} · {project.region}</span>
            </p>
          </div>
        </div>

        {project.kind === "concept" && (
          <aside
            role="note"
            className="flex gap-4 rounded-3xl border-2 border-[var(--color-plum)]/25 bg-[var(--color-plum)]/[0.06] p-6 sm:p-7"
          >
            <Sparkles className="w-6 h-6 shrink-0 text-[var(--color-plum)]" aria-hidden="true" />
            <div className="space-y-2">
              <h2 className="font-bold text-base sm:text-lg text-[var(--color-ink)]">
                Konzeptentwurf – kein realer Kundenauftrag
              </h2>
              <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
                &bdquo;{project.name}&ldquo; ist ein von mir frei gestalteter Entwurf, um zu zeigen,
                wie ein Auftritt in dieser Branche aussehen kann. Der Betrieb existiert nicht, alle
                Inhalte sind Beispielinhalte. Es gab keinen Auftrag und keine Zusammenarbeit.
              </p>
            </div>
          </aside>
        )}

        {/* Handy-Screenshot der echten Seite. object-contain, weil der
            Geraeterahmen sonst links und rechts angeschnitten wird. */}
        <div className="relative w-full h-[420px] sm:h-[520px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-[var(--color-line)] bg-gradient-to-b from-[var(--color-plum)]/[0.06] via-[var(--color-paper)] to-white">
          <Image
            src={project.image}
            alt={`${project.name} auf dem Smartphone`}
            fill
            priority
            className="object-contain p-6 sm:p-8"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </div>

        {/* Substantive Case Study Body */}
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-[var(--color-line)] shadow-xl space-y-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[var(--color-ink)] mb-4">
              Projektübersicht &amp; Zielsetzung
            </h2>
            <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Key Deliverables Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
            <div className="p-4 rounded-2xl bg-[var(--color-paper)] border border-[var(--color-line)]/50">
              <Smartphone className="w-6 h-6 text-[var(--color-coral)] mb-2" />
              <h3 className="font-bold text-sm sm:text-base text-[var(--color-ink)]">Mobile First</h3>
              <p className="text-xs text-[var(--color-muted)] mt-1">Klar lesbar auf allen Smartphones.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--color-paper)] border border-[var(--color-line)]/50">
              <Zap className="w-6 h-6 text-emerald-600 mb-2" />
              <h3 className="font-bold text-sm sm:text-base text-[var(--color-ink)]">Schnelle Ladezeit</h3>
              <p className="text-xs text-[var(--color-muted)] mt-1">Optimierte Ladezeiten &amp; Bildkomprimierung.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--color-paper)] border border-[var(--color-line)]/50">
              <ShieldCheck className="w-6 h-6 text-[var(--color-plum)] mb-2" />
              <h3 className="font-bold text-sm sm:text-base text-[var(--color-ink)]">Lokale Präsenz</h3>
              <p className="text-xs text-[var(--color-muted)] mt-1">Direkte Kontaktwege &amp; Google-Verknüpfung.</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-8 border-t border-[var(--color-line)] flex flex-col sm:flex-row gap-4">
            <ButtonLink href={project.url} external variant="primary" size="lg" className="flex items-center justify-center gap-2">
              <span>{project.kind === "live" ? "Live-Website ansehen" : "Live-Demo ansehen"}</span>
            </ButtonLink>
            <ButtonLink href="/#kontakt" variant="secondary" size="lg" className="flex items-center justify-center gap-2">
              <span>Eigenes Projekt besprechen</span>
            </ButtonLink>
          </div>
        </div>
      </Container>
    </main>
  );
}

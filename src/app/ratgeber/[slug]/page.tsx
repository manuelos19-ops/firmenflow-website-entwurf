import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FirmenflowIcon } from "@/components/brand/FirmenflowIcon";
import { getAllRatgeberPosts, getRatgeberPost } from "@/lib/ratgeber";
import type { RatgeberSection } from "@/lib/ratgeber";
import { getSiteUrl } from "@/lib/site-url";

export function generateStaticParams() {
  return getAllRatgeberPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getRatgeberPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/ratgeber/${post.slug}` },
    openGraph: {
      title: `${post.title} | Firmenflow`,
      description: post.description,
      url: `/ratgeber/${post.slug}`,
      locale: "de_DE",
      type: "article",
      publishedTime: post.date,
      authors: ["Manuel Landeck"],
    },
  };
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function RatgeberBlock({ section }: { section: RatgeberSection }) {
  if (section.kind === "lead") {
    return (
      <p
        className="text-lg sm:text-xl font-medium text-[var(--color-ink)] leading-relaxed border-l-4 border-[var(--color-coral)] pl-4 sm:pl-5"
        dangerouslySetInnerHTML={{ __html: section.html.replace(/^<p[^>]*>|<\/p>$/g, "") }}
      />
    );
  }
  if (section.kind === "heading") {
    const isError = /^Fehler \d+/.test(section.text);
    return (
      <div className="pt-4">
        <div className="rounded-3xl bg-white border border-[var(--color-line)] shadow-sm p-6 sm:p-8 space-y-2">
          <h2 id={section.id} className="text-2xl sm:text-3xl font-display font-bold text-[var(--color-ink)] leading-tight scroll-mt-28">
            {section.text}
          </h2>
          {isError && (
            <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--color-coral)]">
              {section.text.split(":")[0]}
            </p>
          )}
        </div>
      </div>
    );
  }
  if (section.kind === "list") {
    if (section.variant === "check") {
      return (
        <ul className="grid gap-3">
          {section.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-2xl bg-[var(--color-paper)] border border-[var(--color-line)] p-4 sm:p-5 text-sm sm:text-base text-[var(--color-ink)] leading-relaxed"
            >
              <FirmenflowIcon name="erfolg" size={24} decorative className="mt-0.5" />
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
      );
    }
    return (
      <ul className="grid gap-3">
        {section.items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 rounded-2xl bg-white border border-[var(--color-line)] p-4 sm:p-5 text-sm sm:text-base text-[var(--color-ink)] leading-relaxed shadow-sm"
          >
            <FirmenflowIcon name="info-hinweis" size={24} decorative className="mt-0.5" />
            <span dangerouslySetInnerHTML={{ __html: item }} />
          </li>
        ))}
      </ul>
    );
  }
  if (section.kind === "quote") {
    return (
      <blockquote className="rounded-3xl bg-[var(--color-plum)]/[0.06] border border-[var(--color-plum)]/20 p-6 sm:p-8">
        <div
          className="font-editorial italic text-lg sm:text-xl text-[var(--color-plum)] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: section.html.replace(/^<blockquote>|<\/blockquote>$/g, "") }}
        />
      </blockquote>
    );
  }
  return <div className="blog-body text-base sm:text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: section.html }} />;
}

export default async function RatgeberPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getRatgeberPost(slug);
  if (!post) notFound();
  const baseUrl = getSiteUrl().origin;
  const related = getAllRatgeberPosts().filter((p) => p.slug !== post.slug).slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${baseUrl}/ratgeber/${post.slug}#article`,
    headline: post.title,
    description: post.description,
    url: `${baseUrl}/ratgeber/${post.slug}`,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: "de-DE",
    author: {
      "@type": "Person",
      "@id": `${baseUrl}/#manu`,
      name: "Manuel Landeck",
      alternateName: "Manu",
      url: `${baseUrl}/ueber-manu`,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "Firmenflow",
      url: baseUrl,
    },
    mainEntityOfPage: `${baseUrl}/ratgeber/${post.slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Ratgeber", item: `${baseUrl}/ratgeber` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${baseUrl}/ratgeber/${post.slug}` },
    ],
  };

  return (
    <main id="main" className="pt-36 sm:pt-44 pb-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Container className="max-w-3xl space-y-10">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-xs sm:text-sm text-[var(--color-muted)]">
            <li><Link href="/" className="hover:text-[var(--color-plum)] transition-colors">Startseite</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/ratgeber" className="hover:text-[var(--color-plum)] transition-colors">Ratgeber</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-[var(--color-ink)] font-semibold truncate max-w-[40vw]">{post.title}</li>
          </ol>
        </nav>
        <header className="space-y-4">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-coral)]">{post.category} · {post.readingMinutes} Min. Lesezeit</p>
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-[var(--color-ink)] leading-[1.1]">{post.title}</h1>
          <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed">{post.description}</p>
          <p className="text-sm text-[var(--color-muted)]">Von mir · {formatDate(post.date)}</p>
        </header>
        <article className="space-y-8">
          {post.sections.map((section, i) => (
            <RatgeberBlock key={i} section={section} />
          ))}
        </article>
        <section className="rounded-[2rem] bg-[var(--color-plum)] text-white p-8 sm:p-10 text-center space-y-4 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-display font-bold">Lieber direkt umsetzen als lesen?</h2>
          <p className="text-white/85 max-w-xl mx-auto">Erzähl mir kurz, wo dein Betrieb steht. Ich sage dir ehrlich, was sich lohnt.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <ButtonLink href="/anfrage" variant="primary" size="lg">Projekt anfragen</ButtonLink>
            <ButtonLink href="/lokalpraesenz-360" variant="secondary" size="lg">Lokalpräsenz 360° ansehen</ButtonLink>
          </div>
        </section>
      </Container>
    </main>
  );
}


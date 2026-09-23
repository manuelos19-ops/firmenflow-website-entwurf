import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { FirmenflowButton } from "@/components/ui/FirmenflowButton";
import { FirmenflowIcon } from "@/components/brand/FirmenflowIcon";
import { RatgeberQuiz } from "@/components/ratgeber/RatgeberQuiz";
import { RatgeberChart } from "@/components/ratgeber/RatgeberChart";
import { RatgeberKarten } from "@/components/ratgeber/RatgeberKarten";
import { RatgeberZahlen } from "@/components/ratgeber/RatgeberZahlen";
import { RatgeberAutor } from "@/components/ratgeber/RatgeberAutor";
import { RatgeberHinweis } from "@/components/ratgeber/RatgeberHinweis";
import { RatgeberShareButton } from "@/components/ratgeber/RatgeberShareButton";
import { RatgeberViewTracker } from "@/components/ratgeber/RatgeberViewTracker";
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
  const metaTitle = post.metaTitle ?? post.title;
  const baseUrl = getSiteUrl().origin;
  const imageUrl = post.image ? (post.image.startsWith("http") ? post.image : `${baseUrl}${post.image}`) : undefined;
  return {
    title: metaTitle,
    description: post.description,
    alternates: { canonical: `/ratgeber/${post.slug}` },
    openGraph: {
      title: `${metaTitle} | Firmenflow`,
      description: post.description,
      url: `/ratgeber/${post.slug}`,
      locale: "de_DE",
      type: "article",
      publishedTime: post.date,
      authors: ["Manuel Landeck"],
      images: imageUrl ? [{ url: imageUrl, alt: post.imageAlt }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${metaTitle} | Firmenflow`,
      description: post.description,
      images: imageUrl ? [{ url: imageUrl, alt: post.imageAlt }] : undefined,
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
  if (section.kind === "chart") {
    return <RatgeberChart head={section.head} rows={section.rows} caption={section.caption} />;
  }
  if (section.kind === "stats") {
    return <RatgeberZahlen head={section.head} rows={section.rows} caption={section.caption} />;
  }
  if (section.kind === "cards") {
    return <RatgeberKarten head={section.head} rows={section.rows} caption={section.caption} />;
  }
  if (section.kind === "note") {
    return <RatgeberHinweis title={section.title} paragraphs={section.paragraphs} image={section.image} />;
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
    "@type": "BlogPosting",
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
    image: post.image ? `${baseUrl}${post.image}` : undefined,
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
      <RatgeberViewTracker slug={post.slug} title={post.title} category={post.category} />
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
          <div className="flex flex-wrap items-center gap-2.5 text-sm text-[var(--color-muted)]">
            <span>Von Manu · {formatDate(post.date)}{post.updated && post.updated !== post.date ? ` · aktualisiert am ${formatDate(post.updated)}` : ""}</span>
            <span aria-hidden="true" className="text-[var(--color-line)]">·</span>
            <RatgeberShareButton
              title={post.title}
              description={post.description}
              url={`${baseUrl}/ratgeber/${post.slug}`}
            />
          </div>
        </header>

        {post.image && (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-paper)] shadow-sm">
            <Image
              src={post.image}
              alt={post.imageAlt || post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}

        {post.quiz && (
          <div className="rounded-2xl bg-[var(--color-paper)] border border-[var(--color-line)] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm shadow-sm">
            <div className="flex items-start gap-3">
              <FirmenflowIcon name="info-hinweis" size={24} decorative className="mt-0.5 shrink-0" />
              <p className="text-[var(--color-ink)] leading-snug">
                <strong className="text-[var(--color-plum)]">Tipp zum Mitmachen:</strong> Lies den Artikel in Ruhe durch und teste dein Wissen am Ende im interaktiven Selbst-Check.
              </p>
            </div>
            <a
              href="#selbst-check"
              className="inline-flex items-center gap-1 shrink-0 self-end sm:self-center text-xs font-mono font-bold text-[var(--color-coral)] hover:text-[var(--color-plum)] hover:underline whitespace-nowrap transition-colors pl-9 sm:pl-0"
            >
              <span>Direkt zum Quiz</span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        )}

        <article className="space-y-8">
          {post.sections.map((section, i) => (
            <RatgeberBlock key={i} section={section} />
          ))}
        </article>

        {post.quiz && <RatgeberQuiz quiz={post.quiz} />}

        {related.length > 0 && (
          <section className="space-y-4 pt-6 border-t border-[var(--color-line)]">
            <h2 className="text-xl font-display font-bold text-[var(--color-ink)]">
              Weitere Beiträge
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/ratgeber/${rel.slug}`}
                  className="rounded-2xl border border-[var(--color-line)] bg-white p-5 hover:border-[var(--color-coral)]/50 transition-colors space-y-2 block shadow-sm"
                >
                  <p className="text-xs font-mono font-bold text-[var(--color-muted)]">{rel.category}</p>
                  <h3 className="text-base font-bold text-[var(--color-ink)] line-clamp-2">
                    {rel.title}
                  </h3>
                  <span className="text-xs font-bold text-[var(--color-coral)] inline-flex items-center gap-1">
                    Beitrag lesen →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <RatgeberAutor slug={post.slug} />

        <section className="rounded-[2rem] bg-[var(--color-plum)] text-white p-8 sm:p-10 text-center space-y-4 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-display font-bold">Lieber direkt umsetzen als lesen?</h2>
          <p className="text-white/85 max-w-xl mx-auto">Erzähl mir kurz, wo dein Betrieb steht. Ich sage dir ehrlich, was sich lohnt.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <FirmenflowButton href="/anfrage" buttonIcon="projekt-besprechen" size="compact">
              Projekt anfragen
            </FirmenflowButton>
            <FirmenflowButton href="/lokalpraesenz-360" buttonIcon="lokalpraesenz" size="compact">
              Lokalpräsenz 360° ansehen
            </FirmenflowButton>
          </div>
        </section>
      </Container>
    </main>
  );
}


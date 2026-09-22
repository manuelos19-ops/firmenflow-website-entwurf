"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { FirmenflowIcon } from "@/components/brand/FirmenflowIcon";
import { FirmenflowButton } from "@/components/ui/FirmenflowButton";
import type { RatgeberPostMeta } from "@/lib/ratgeber";

type RatgeberHubProps = {
  posts: RatgeberPostMeta[];
};

function formatDate(iso: string): string {
  try {
    return new Date(`${iso}T00:00:00`).toLocaleDateString("de-DE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function RatgeberHub({ posts }: RatgeberHubProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Alle");

  // Kategorien aus den Beiträgen extrahieren + Standard-Themen für Übersicht
  const categoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = { Alle: posts.length };
    // Vorab-Themen, die Firmenflow bedient
    const standardCategories = [
      "Website & Vertrauen",
      "Google-Profil & Bewertungen",
      "Anfragen & Kontakt",
    ];
    for (const cat of standardCategories) {
      counts[cat] = 0;
    }
    for (const p of posts) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
    return Object.entries(counts);
  }, [posts]);

  // Filter-Logik
  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesCategory =
        selectedCategory === "Alle" || p.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!q) return true;

      const inTitle = p.title.toLowerCase().includes(q);
      const inDesc = p.description.toLowerCase().includes(q);
      const inCategory = p.category.toLowerCase().includes(q);
      const inTags = p.tags.some((t) => t.toLowerCase().includes(q));

      return inTitle || inDesc || inCategory || inTags;
    });
  }, [posts, searchQuery, selectedCategory]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 sm:gap-10 items-start">
      {/* Seitenmenü: Kategorien & Alle Artikel */}
      <aside className="space-y-6 lg:sticky lg:top-28">
        {/* Box 1: Kategorien / Themen */}
        <div className="rounded-3xl border border-[var(--color-line)] bg-white p-5 sm:p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-coral)]">
            <FirmenflowIcon name="struktur-wireframe" size={20} decorative />
            <span>Kategorien</span>
          </div>

          <nav aria-label="Kategorien-Navigation" className="space-y-1">
            {categoriesWithCounts.map(([cat, count]) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-sm transition-all ${
                    isActive
                      ? "bg-[var(--color-plum)] text-white font-bold shadow-sm"
                      : "text-[var(--color-ink)] hover:bg-[var(--color-paper)] font-medium"
                  }`}
                >
                  <span className="truncate">{cat}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-[var(--color-paper)] text-[var(--color-muted)]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Box 2: Schnellübersicht aller Beiträge */}
        <div className="rounded-3xl border border-[var(--color-line)] bg-white p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-coral)]">
              Alle Beiträge ({posts.length})
            </span>
          </div>

          <div className="space-y-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/ratgeber/${post.slug}`}
                className="group block p-2.5 -mx-1.5 rounded-xl hover:bg-[var(--color-paper)] transition-all"
              >
                <p className="text-xs text-[var(--color-muted)]">
                  {formatDate(post.date)} · {post.readingMinutes} Min.
                </p>
                <h4 className="text-sm font-bold text-[var(--color-ink)] group-hover:text-[var(--color-coral)] transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </aside>

      {/* Hauptspalte: Suche + Artikel-Ansicht */}
      <section className="space-y-6">
        {/* Feature-Banner: Interaktive Quizzes */}
        <div className="rounded-3xl border border-[var(--color-line)] bg-gradient-to-r from-[var(--color-plum)]/[0.05] via-[var(--color-coral)]/[0.08] to-transparent p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[var(--color-line)] text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-coral)] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[var(--color-coral)] animate-pulse" />
              Neu: Interaktive Selbst-Checks
            </span>
            <p className="text-sm sm:text-base font-bold text-[var(--color-ink)] leading-snug">
              Praxiswissen zum Mitmachen: In jedem Beitrag steckt ein interaktiver Kompakt- &amp; Meister-Check mit wechselnden Fragen.
            </p>
          </div>
          <span className="shrink-0 text-xs font-mono font-bold text-[var(--color-plum)] bg-white px-3.5 py-2 rounded-xl border border-[var(--color-line)] shadow-sm">
            Kostenlos &amp; ohne Anmeldung
          </span>
        </div>

        {/* Suchleiste */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--color-muted)]">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Beiträge durchsuchen (z. B. Ladezeit, Google Maps, Handwerker)..."
            aria-label="Ratgeber-Beiträge durchsuchen"
            className="w-full pl-11 pr-12 py-3.5 sm:py-4 rounded-2xl sm:rounded-full bg-white border border-[var(--color-line)] text-sm sm:text-base text-[var(--color-ink)] placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-plum)] focus:ring-2 focus:ring-[var(--color-plum)]/10 shadow-sm transition-all [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
              aria-label="Suche zurücksetzen"
              title="Suche zurücksetzen"
            >
              <span className="w-7 h-7 rounded-full bg-[var(--color-paper)] hover:bg-[var(--color-line)] flex items-center justify-center text-xs font-bold transition-colors">
                ✕
              </span>
            </button>
          )}
        </div>

        {/* Aktive Filter-Anzeige */}
        {(selectedCategory !== "Alle" || searchQuery.trim() !== "") && (
          <div className="flex flex-wrap items-center justify-between gap-3 px-1 text-sm text-[var(--color-muted)]">
            <div>
              <span>Gefiltert nach: </span>
              {selectedCategory !== "Alle" && (
                <span className="font-semibold text-[var(--color-ink)] mr-2">
                  Kategorie „{selectedCategory}“
                </span>
              )}
              {searchQuery.trim() !== "" && (
                <span className="font-semibold text-[var(--color-ink)]">
                  Suchbegriff „{searchQuery}“
                </span>
              )}
              <span> · {filteredPosts.length} {filteredPosts.length === 1 ? "Treffer" : "Treffer"}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("Alle");
                setSearchQuery("");
              }}
              className="text-xs font-bold text-[var(--color-coral)] hover:underline"
            >
              Filter löschen
            </button>
          </div>
        )}

        {/* Beitrags-Liste */}
        {filteredPosts.length > 0 ? (
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="rounded-3xl border border-[var(--color-line)] bg-white overflow-hidden shadow-sm hover:border-[var(--color-coral)]/40 transition-all group"
              >
                {post.image && (
                  <Link
                    href={`/ratgeber/${post.slug}`}
                    className="block relative aspect-[16/9] w-full overflow-hidden bg-[var(--color-paper)]"
                  >
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border border-white/50 text-[var(--color-ink)] font-mono text-xs font-bold shadow-md">
                        <span className="w-2 h-2 rounded-full bg-[var(--color-coral)] animate-pulse" />
                        Inkl. interaktivem Quiz
                      </span>
                    </div>
                    <Image
                      src={post.image}
                      alt={post.imageAlt || post.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 680px"
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                    />
                  </Link>
                )}
                <div className="p-7 sm:p-9 space-y-4">
                  {/* Prägnante Meta-Leiste: Datum · von Manu · Lesezeit */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-medium text-[var(--color-muted)]">
                    <span className="px-2.5 py-0.5 rounded-full bg-[var(--color-paper)] text-[var(--color-plum)] font-bold">
                      {post.category}
                    </span>
                    <span>·</span>
                    <span>{formatDate(post.date)}</span>
                    <span>·</span>
                    <span>von Manu</span>
                    <span>·</span>
                    <span>{post.readingMinutes} Min. Lesezeit</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-display font-bold text-[var(--color-ink)] leading-tight">
                    <Link
                      href={`/ratgeber/${post.slug}`}
                      className="hover:text-[var(--color-coral)] transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
                    {post.description}
                  </p>

                  {/* 3D-Button: zum Lesen & Quiz starten! */}
                  <div className="pt-2">
                    <FirmenflowButton
                      href={`/ratgeber/${post.slug}`}
                      buttonIcon="flowscreen"
                      size="compact"
                      subline="Inkl. interaktivem Selbst-Check"
                    >
                      Beitrag lesen &amp; Quiz starten
                    </FirmenflowButton>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-[var(--color-line)] bg-white p-10 text-center space-y-4">
            <FirmenflowIcon name="info-hinweis" size={48} decorative className="mx-auto" />
            <h3 className="text-lg font-bold text-[var(--color-ink)]">
              Kein passender Beitrag gefunden
            </h3>
            <p className="text-sm text-[var(--color-muted)] max-w-md mx-auto">
              Zu deiner Suche nach „{searchQuery}“ gibt es aktuell keinen Eintrag. Versuch es mit einem allgemeineren Begriff wie „Website“ oder „Google“.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Alle");
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-paper)] text-sm font-bold text-[var(--color-ink)] hover:bg-[var(--color-coral)] hover:text-white transition-all"
            >
              Alle Beiträge anzeigen
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

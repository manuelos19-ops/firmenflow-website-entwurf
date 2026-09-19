"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FirmenflowIcon } from "@/components/brand/FirmenflowIcon";
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

        {/* Box 3: Dezent persönliche Box zu Manu */}
        <div className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-paper)] p-5 space-y-3">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-coral)]">
            Persönlich mit Manu
          </p>
          <p className="text-xs text-[var(--color-ink)] leading-relaxed">
            Fragen zu deiner Website oder deinem Google-Profil? Schreib mir einfach kurz per WhatsApp oder ruf an.
          </p>
          <div className="pt-1 flex flex-col gap-1.5 text-xs font-bold text-[var(--color-plum)]">
            <a
              href="https://wa.me/4915567277155"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-coral)] transition-colors inline-flex items-center gap-1.5"
            >
              <span>WhatsApp-Nachricht senden</span>
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="tel:015567277155"
              className="hover:text-[var(--color-coral)] transition-colors inline-flex items-center gap-1.5"
            >
              <span>0155 67277155 anrufen</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </aside>

      {/* Hauptspalte: Suche + Artikel-Ansicht */}
      <section className="space-y-6">
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
            className="w-full pl-11 pr-10 py-3.5 sm:py-4 rounded-2xl sm:rounded-full bg-white border border-[var(--color-line)] text-sm sm:text-base text-[var(--color-ink)] placeholder-[var(--color-muted)] focus:outline-none focus:border-[var(--color-plum)] focus:ring-2 focus:ring-[var(--color-plum)]/10 shadow-sm transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-bold text-[var(--color-muted)] hover:text-[var(--color-ink)]"
              aria-label="Suche zurücksetzen"
            >
              Zurücksetzen
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
                className="rounded-3xl border border-[var(--color-line)] bg-white p-7 sm:p-9 shadow-sm hover:border-[var(--color-coral)]/40 transition-all space-y-4"
              >
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

                {/* Nur ein einziger Button: zum Lesen! */}
                <div className="pt-2">
                  <Link
                    href={`/ratgeber/${post.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-coral)] text-white font-bold text-sm shadow-sm hover:bg-[var(--color-plum)] transition-all"
                  >
                    <span>Beitrag lesen</span>
                    <span aria-hidden="true">→</span>
                  </Link>
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

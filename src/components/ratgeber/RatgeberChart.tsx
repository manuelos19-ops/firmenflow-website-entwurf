"use client";

import { useEffect, useRef, useState } from "react";

type RatgeberChartProps = {
  head: string[];
  rows: string[][];
  caption?: string;
};

/** Zellen kommen als HTML aus dem Parser (escaped, mit Fett/Kursiv/Links). */
function plain(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');
}

function toNumber(value: string): number {
  const cleaned = plain(value).replace(/\./g, "").replace(",", ".").replace(/[^\d.-]/g, "");
  const n = Number.parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
}

export function RatgeberChart({ head, rows, caption }: RatgeberChartProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);
  const [inView, setInView] = useState(false);

  // Erst im nächsten Frame beobachten, damit die Startposition (scaleX 0)
  // sicher einen eigenen Paint bekommt. Sonst landen "is-js" und "is-in" im
  // selben Render und der Browser überspringt die Animation.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setAnimate(true);
  }, []);

  useEffect(() => {
    if (!animate) return;
    const el = wrapRef.current;
    if (!el) return;
    let io: IntersectionObserver | undefined;
    const raf = requestAnimationFrame(() => {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            setInView(true);
            io?.disconnect();
          }
        },
        { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
      );
      io.observe(el);
    });
    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [animate]);

  const valueIndex = head.length - 1;
  const items = rows.map((r) => ({
    label: r[0] ?? "",
    meta: r.slice(1, valueIndex).join(" · "),
    raw: r[valueIndex] ?? "",
    value: toNumber(r[valueIndex] ?? ""),
  }));
  const max = Math.max(...items.map((i) => i.value), 1);

  return (
    <figure
      ref={wrapRef}
      className={["ff-chart m-0 my-6 sm:my-8", animate ? "is-js" : "", inView ? "is-in" : ""].filter(Boolean).join(" ")}
    >
      <style>{`
        @keyframes ffGrow { from { transform: scaleX(0) } to { transform: scaleX(1) } }
        .ff-chart .ff-bar { transform-origin: left center; }
        .ff-chart.is-js .ff-bar { transform: scaleX(0); }
        .ff-chart.is-js.is-in .ff-bar { animation: ffGrow .85s cubic-bezier(.22,1,.36,1) both; }
        .ff-chart.is-js .ff-val { opacity: 0; transition: opacity .3s ease; }
        .ff-chart.is-js.is-in .ff-val { opacity: 1; }
      `}</style>
      {caption && (
        <figcaption className="mb-4 sm:mb-6 text-sm sm:text-base font-medium text-[var(--color-muted)] leading-relaxed flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-coral)] shrink-0" aria-hidden="true" />
          <span>{caption}</span>
        </figcaption>
      )}
      <div className="rounded-3xl bg-white border border-[var(--color-line)] shadow-sm p-6 sm:p-8">
        <div
          className="flex items-baseline justify-between gap-4 pb-4 mb-4 border-b border-[var(--color-line)]"
        >
          <span className="font-display font-bold text-[var(--color-ink)]" dangerouslySetInnerHTML={{ __html: head[0] }} />
          <span
            className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-coral)]"
            dangerouslySetInnerHTML={{ __html: head[valueIndex] }}
          />
        </div>

        <div
          role="img"
          aria-label={`${head[valueIndex].replace(/<[^>]*>/g, "")} nach ${head[0].replace(/<[^>]*>/g, "")}: ${items
            .map((i) => `${i.label.replace(/<[^>]*>/g, "")} ${i.raw.replace(/<[^>]*>/g, "")}`)
            .join(", ")}.`}
          className="grid gap-3"
        >
          {items.map((item, i) => {
            const pct = Math.max((item.value / max) * 100, 1.5);
            const mix = Math.round((item.value / max) * 100);
            return (
              <div key={plain(item.label)} className="grid grid-cols-[minmax(0,1fr)] sm:grid-cols-[11rem_minmax(0,1fr)] sm:items-center gap-x-4 gap-y-1">
                <div className="min-w-0">
                  <span
                    className="block text-sm sm:text-base font-semibold text-[var(--color-ink)] leading-snug"
                    dangerouslySetInnerHTML={{ __html: item.label }}
                  />
                  {item.meta && (
                    <span
                      className="block text-xs text-[var(--color-muted)]"
                      dangerouslySetInnerHTML={{ __html: `${item.meta} ${head[1]}` }}
                    />
                  )}
                </div>
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-3 flex-1 rounded-full bg-[var(--color-line)] overflow-hidden">
                    <div
                      className="ff-bar h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        animationDelay: `${i * 55}ms`,
                        background: `color-mix(in srgb, var(--color-coral) ${mix}%, var(--color-plum))`,
                      }}
                    />
                  </div>
                  <span
                    className="ff-val font-display font-bold text-sm sm:text-base tabular-nums text-[var(--color-ink)] w-10 text-right shrink-0"
                    style={{ transitionDelay: `${i * 55 + 400}ms` }}
                    dangerouslySetInnerHTML={{ __html: item.raw }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <details className="mt-6 pt-4 border-t border-[var(--color-line)]">
          <summary className="cursor-pointer list-none text-sm font-semibold text-[var(--color-plum)] underline underline-offset-4 decoration-[var(--color-coral)]/60 hover:text-[var(--color-coral)] transition-colors">
            Zahlen als Tabelle
          </summary>
          <div className="overflow-x-auto mt-4">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    {head.map((h) => (
                      <th
                        key={plain(h)}
                        className="text-left align-top font-display font-bold text-[var(--color-ink)] border-b-2 border-[var(--color-line)] py-2 pr-4 last:pr-0"
                        dangerouslySetInnerHTML={{ __html: h }}
                      />
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={plain(r[0])}>
                      {r.map((c, ci) => (
                        <td
                          key={ci}
                          className="align-top text-[var(--color-ink)] border-b border-[var(--color-line)] py-2 pr-4 last:pr-0 tabular-nums"
                          dangerouslySetInnerHTML={{ __html: c }}
                        />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
        </details>
      </div>
    </figure>
  );
}

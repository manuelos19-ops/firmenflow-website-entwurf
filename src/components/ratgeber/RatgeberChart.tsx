"use client";

import { useEffect, useRef, useState } from "react";

type RatgeberChartProps = {
  head: string[];
  rows: string[][];
  caption?: string;
};

function toNumber(value: string): number {
  const cleaned = value.replace(/\./g, "").replace(",", ".").replace(/[^\d.-]/g, "");
  const n = Number.parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
}

export function RatgeberChart({ head, rows, caption }: RatgeberChartProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setAnimate(true);
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const valueIndex = head.length - 1;
  const items = rows.map((r) => ({
    label: r[0] ?? "",
    meta: r.slice(1, valueIndex).join(" · "),
    raw: r[valueIndex] ?? "",
    value: toNumber(r[valueIndex] ?? ""),
  }));
  const max = Math.max(...items.map((i) => i.value), 1);

  return (
    <figure className="ff-chart m-0" ref={wrapRef}>
      <style>{`
        @keyframes ffGrow { from { transform: scaleX(0) } to { transform: scaleX(1) } }
        .ff-chart .ff-bar { transform-origin: left center; }
        .ff-chart.is-js .ff-bar { transform: scaleX(0); }
        .ff-chart.is-js.is-in .ff-bar { animation: ffGrow .85s cubic-bezier(.22,1,.36,1) both; }
        .ff-chart.is-js .ff-val { opacity: 0; transition: opacity .3s ease; }
        .ff-chart.is-js.is-in .ff-val { opacity: 1; }
      `}</style>
      <div
        className={[
          "rounded-3xl bg-white border border-[var(--color-line)] shadow-sm p-6 sm:p-8",
          animate ? "is-js" : "",
          inView ? "is-in" : "",
        ].join(" ")}
      >
        <div
          className="flex items-baseline justify-between gap-4 pb-4 mb-4 border-b border-[var(--color-line)]"
        >
          <span className="font-display font-bold text-[var(--color-ink)]">{head[0]}</span>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-coral)]">
            {head[valueIndex]}
          </span>
        </div>

        <div
          role="img"
          aria-label={`${head[valueIndex]} nach ${head[0]}: ${items
            .map((i) => `${i.label} ${i.raw}`)
            .join(", ")}.`}
          className="grid gap-3"
        >
          {items.map((item, i) => {
            const pct = Math.max((item.value / max) * 100, 1.5);
            const mix = Math.round((item.value / max) * 100);
            return (
              <div key={item.label} className="grid grid-cols-[minmax(0,1fr)] sm:grid-cols-[11rem_minmax(0,1fr)] sm:items-center gap-x-4 gap-y-1">
                <div className="min-w-0">
                  <span className="block text-sm sm:text-base font-semibold text-[var(--color-ink)] leading-snug">
                    {item.label}
                  </span>
                  {item.meta && (
                    <span className="block text-xs text-[var(--color-muted)]">
                      {item.meta} {head[1]}
                    </span>
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
                  >
                    {item.raw}
                  </span>
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
                        key={h}
                        className="text-left align-top font-display font-bold text-[var(--color-ink)] border-b-2 border-[var(--color-line)] py-2 pr-4 last:pr-0"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r[0]}>
                      {r.map((c, ci) => (
                        <td
                          key={ci}
                          className="align-top text-[var(--color-ink)] border-b border-[var(--color-line)] py-2 pr-4 last:pr-0 tabular-nums"
                        >
                          {c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
        </details>
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-[var(--color-muted)]">{caption}</figcaption>
      )}
    </figure>
  );
}

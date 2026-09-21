"use client";

import { useEffect, useRef, useState } from "react";

type RatgeberKartenProps = {
  head: string[];
  rows: string[][];
  caption?: string;
};

/** Eine Zelle, die ausdrücklich "nichts" sagt, wird als nicht beeinflussbar markiert. */
const LEER = /^(nichts|nichts\.|keine|–|-|—)$/i;

export function RatgeberKarten({ head, rows, caption }: RatgeberKartenProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);
  const [inView, setInView] = useState(false);

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

  const lastIndex = head.length - 1;

  return (
    <figure className="ff-karten m-0" ref={wrapRef}>
      <style>{`
        @keyframes ffRise { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: none } }
        .ff-karten.is-js .ff-karte { opacity: 0; }
        .ff-karten.is-js.is-in .ff-karte { animation: ffRise .6s cubic-bezier(.22,1,.36,1) both; }
      `}</style>
      <div className={["grid gap-4 sm:grid-cols-3", animate ? "is-js" : "", inView ? "is-in" : ""].join(" ")}>
        {rows.map((row, i) => {
          const wirkung = row[lastIndex] ?? "";
          const ohneEinfluss = LEER.test(wirkung.trim());
          return (
            <div
              key={row[0] ?? i}
              className="ff-karte flex flex-col rounded-3xl bg-white border border-[var(--color-line)] shadow-sm p-5 sm:p-6"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--color-coral)]">
                {head[0]}
              </p>
              <h3 className="font-display font-bold text-xl text-[var(--color-ink)] mt-1 mb-3">
                {row[0]}
              </h3>
              <p className="text-sm text-[var(--color-ink)] leading-relaxed grow">{row[1]}</p>
              {lastIndex > 1 && (
                <div className="mt-4 pt-4 border-t border-[var(--color-line)]">
                  <p className="text-[11px] uppercase tracking-wider text-[var(--color-muted)] mb-1">
                    {head[lastIndex]}
                  </p>
                  <p
                    className={
                      ohneEinfluss
                        ? "text-sm font-semibold text-[var(--color-muted)]"
                        : "text-sm font-semibold text-[var(--color-plum)]"
                    }
                  >
                    {wirkung}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-[var(--color-muted)]">{caption}</figcaption>
      )}
    </figure>
  );
}

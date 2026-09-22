"use client";

import { useEffect, useRef, useState } from "react";

type RatgeberZahlenProps = {
  head: string[];
  rows: string[][];
  caption?: string;
};

/** Zellen kommen als HTML aus dem Parser. */
function plain(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');
}

/** Trennt "97 %" in die Zahl 97 und den Rest " %". */
function splitWert(raw: string): { zahl: number | null; prefix: string; suffix: string } {
  const m = plain(raw).match(/^(\D*?)([\d.,]+)(.*)$/);
  if (!m) return { zahl: null, prefix: "", suffix: raw };
  const zahl = Number.parseFloat(m[2].replace(/\./g, "").replace(",", "."));
  if (!Number.isFinite(zahl)) return { zahl: null, prefix: "", suffix: raw };
  return { zahl, prefix: m[1], suffix: m[3] };
}

function Kachel({ raw, text, delay, run, armed }: { raw: string; text: string; delay: number; run: boolean; armed: boolean }) {
  const { zahl, prefix, suffix } = splitWert(raw);
  const [wert, setWert] = useState<number | null>(null);

  // Ein einziger Effekt fuer den ganzen Lebenszyklus: ohne Animation bleibt
  // der Endwert stehen, mit Animation erst 0 und beim Hereinscrollen hoch.
  useEffect(() => {
    if (zahl === null) return;
    if (!armed) {
      setWert(null);
      return;
    }
    if (!run) {
      setWert(0);
      return;
    }
    const t0 = performance.now() + delay;
    const dauer = 900;
    let id = 0;
    const tick = () => {
      const p = Math.min(Math.max((performance.now() - t0) / dauer, 0), 1);
      setWert(Math.round(zahl * (1 - Math.pow(1 - p, 3))));
      if (p < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [armed, run, zahl, delay]);

  // Tausenderpunkte erhalten: "54.000" darf beim Zaehlen nicht zu "54000" werden.
  const formatiert = wert === null ? "" : wert.toLocaleString("de-DE");
  const anzeige = zahl === null || wert === null ? raw : `${prefix}${formatiert}${suffix}`;

  return (
    <div className="flex flex-col rounded-3xl bg-white border border-[var(--color-line)] shadow-sm p-5 sm:p-6">
      <span className="font-display font-bold leading-none tabular-nums text-[var(--color-coral)] text-[clamp(2.75rem,9vw,3.75rem)]">
        {anzeige}
      </span>
      <span
        className="mt-3 text-sm sm:text-base text-[var(--color-ink)] leading-relaxed"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
}

export function RatgeberZahlen({ head, rows, caption }: RatgeberZahlenProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setArmed(true);
    const el = wrapRef.current;
    if (!el) return;
    let io: IntersectionObserver | undefined;
    const raf = requestAnimationFrame(() => {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            setRun(true);
            io?.disconnect();
          }
        },
        { threshold: 0.3 },
      );
      io.observe(el);
    });
    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, []);

  const spalten = rows.length === 2 ? "sm:grid-cols-2" : rows.length >= 3 ? "sm:grid-cols-3" : "";

  return (
    <figure className="m-0" ref={wrapRef}>
      <div
        className={`grid gap-4 ${spalten}`}
        role="img"
        aria-label={rows.map((r) => `${plain(r[0] ?? "")}: ${plain(r[1] ?? "")}`).join(". ")}
      >
        {rows.map((row, i) => (
          <Kachel
            key={plain(row[0] ?? "") || i}
            raw={row[0] ?? ""}
            text={row[1] ?? ""}
            delay={i * 140}
            run={run}
            armed={armed}
          />
        ))}
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-[var(--color-muted)]">{caption}</figcaption>
      )}
      <span className="sr-only">
        {head.map(plain).join(", ")}: {rows.map((r) => r.map(plain).join(" ")).join("; ")}
      </span>
    </figure>
  );
}

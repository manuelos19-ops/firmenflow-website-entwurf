"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

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
function splitWert(raw: string): {
  zahl: number | null;
  prefix: string;
  suffix: string;
  nachkomma: number;
} {
  const m = plain(raw).match(/^(\D*?)([\d.,]+)(.*)$/);
  if (!m) return { zahl: null, prefix: "", suffix: raw, nachkomma: 0 };
  const zahl = Number.parseFloat(m[2].replace(/\./g, "").replace(",", "."));
  if (!Number.isFinite(zahl)) return { zahl: null, prefix: "", suffix: raw, nachkomma: 0 };
  const komma = m[2].split(",")[1];
  return { zahl, prefix: m[1], suffix: m[3], nachkomma: komma ? komma.length : 0 };
}

function Kachel({ raw, text, delay, run, armed }: { raw: string; text: string; delay: number; run: boolean; armed: boolean }) {
  const { zahl, prefix, suffix, nachkomma } = splitWert(raw);
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
      setWert(zahl * (1 - Math.pow(1 - p, 3)));
      if (p < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [armed, run, zahl, delay]);

  // Deutsche Schreibweise erhalten: "54.000" behaelt den Tausenderpunkt,
  // "4,52" behaelt die zwei Nachkommastellen.
  const formatiert =
    wert === null
      ? ""
      : wert.toLocaleString("de-DE", {
          minimumFractionDigits: nachkomma,
          maximumFractionDigits: nachkomma,
        });
  const anzeige = zahl === null || wert === null ? raw : `${prefix}${formatiert}${suffix}`;

  const isLong = anzeige.length >= 6;
  const isMedium = anzeige.length >= 4;

  return (
    <div className="flex flex-col min-w-0 rounded-3xl bg-white border border-[var(--color-line)] shadow-sm p-5 sm:p-6 overflow-hidden">
      <span
        className={cn(
          "font-display font-bold leading-none tabular-nums text-[var(--color-coral)] tracking-tight truncate",
          isLong
            ? "text-[clamp(1.75rem,4vw,2.4rem)]"
            : isMedium
            ? "text-[clamp(2.15rem,5.5vw,3rem)]"
            : "text-[clamp(2.5rem,7vw,3.5rem)]"
        )}
      >
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
    <figure className="m-0 my-6 sm:my-8" ref={wrapRef}>
      {caption && (
        <figcaption className="mb-4 sm:mb-6 text-xs sm:text-sm font-medium text-[var(--color-muted)] leading-relaxed flex items-start sm:items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-coral)] shrink-0 mt-1 sm:mt-0" aria-hidden="true" />
          <span>{caption}</span>
        </figcaption>
      )}
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
      <span className="sr-only">
        {head.map(plain).join(", ")}: {rows.map((r) => r.map(plain).join(" ")).join("; ")}
      </span>
    </figure>
  );
}

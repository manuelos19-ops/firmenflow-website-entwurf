import { Check, X } from "@/components/brand/FirmenflowUiIcon";
import { FlowscreenIcon } from "@/components/brand/FirmenflowIcon";
import { FLOWSCREEN_VERSION } from "@/lib/flowscreen";

interface CompareRow {
  title: string;
  sub: string;
  snip: "yes" | "no" | "partial";
  sharex: "yes" | "no" | "partial";
  sharexNote?: string;
  highlight?: boolean;
}

const COMPARE_ROWS: CompareRow[] = [
  { title: "Canvas-Mockups", sub: "Repraesentativ fuer Kunden", snip: "no", sharex: "no" },
  { title: "Schrittzaehler 1-2-3", sub: "Anleitungen und Bugreports", snip: "no", sharex: "partial", sharexNote: "kompliziert" },
  { title: "DSGVO-Zensur", sub: "Blur und Balken", snip: "no", sharex: "yes" },
  { title: "Ohne Einarbeitung", sub: "Sofort starten", snip: "yes", sharex: "no" },
  { title: "100 % lokal", sub: "Kein Cloud-Zwang", snip: "yes", sharex: "partial", sharexNote: "je nach Config" },
  { title: "Kostenlos", sub: "Vollversion und Updates", snip: "yes", sharex: "yes", highlight: true },
];

function CompareMark({ state, note, label }: { state: "yes" | "no" | "partial"; note?: string; label: string }) {
  if (state === "yes") {
    return (
      <li className="flex items-center gap-2 text-[var(--color-muted)]">
        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>{label}</span>
      </li>
    );
  }
  if (state === "partial") {
    return (
      <li className="flex items-center gap-2 text-[var(--color-muted)]">
        <span className="text-amber-600 text-xs font-bold">{note ?? "teils"}:</span>
        <span>{label}</span>
      </li>
    );
  }
  return (
    <li className="flex items-center gap-2 text-[var(--color-muted)]">
      <X className="w-4 h-4 text-rose-500 shrink-0" />
      <span>{label}</span>
    </li>
  );
}

export function FlowscreenCompareCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {COMPARE_ROWS.map((row) => (
        <div
          key={row.title}
          className={
            row.highlight
              ? "rounded-3xl border border-[var(--color-coral)]/30 bg-gradient-to-br from-[var(--color-coral)]/[0.07] to-white p-6 shadow-sm space-y-4"
              : "rounded-3xl border border-[var(--color-line)] bg-white p-6 shadow-sm space-y-4"
          }
        >
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[var(--color-ink)]">{row.title}</h3>
            <p className="text-xs sm:text-sm text-[var(--color-muted)]">{row.sub}</p>
          </div>
          <ul className="space-y-2 text-sm">
            <CompareMark state={row.snip} label="Snipping Tool" />
            <CompareMark state={row.sharex} note={row.sharexNote} label="ShareX" />
            <li className="flex items-center gap-2 rounded-xl bg-[var(--color-plum)]/5 border border-[var(--color-plum)]/15 px-3 py-2 font-bold text-[var(--color-plum)]">
              <Check className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="inline-flex items-center gap-2">
                <FlowscreenIcon name="app-icon-512" size={20} alt="FlowScreen App-Icon" />
                {row.highlight ? `Kostenlos (v${FLOWSCREEN_VERSION})` : "FlowScreen"}
              </span>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}

import fs from "node:fs";
import path from "node:path";

export type RatgeberPostMeta = {
  slug: string;
  title: string;
  metaTitle?: string;
  description: string;
  date: string;
  updated?: string;
  category: string;
  tags: string[];
  image: string;
  imageAlt: string;
  readingMinutes: number;
  featured?: boolean;
};

export type RatgeberQuizQuestion = {
  id: string;
  level: "basis" | "profi";
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type RatgeberQuizData = {
  title: string;
  description: string;
  questions: RatgeberQuizQuestion[];
};

export type RatgeberPost = RatgeberPostMeta & {
  html: string;
  headings: { id: string; text: string; level: 2 | 3 }[];
  sections: RatgeberSection[];
  quiz?: RatgeberQuizData;
};

export type RatgeberSection =
  | { kind: "lead"; html: string }
  | { kind: "text"; html: string }
  | { kind: "heading"; id: string; text: string; index: number }
  | { kind: "list"; items: string[]; variant: "check" | "bullet" }
  | { kind: "quote"; html: string }
  | { kind: "chart"; head: string[]; rows: string[][]; caption?: string }
  | { kind: "cards"; head: string[]; rows: string[][]; caption?: string }
  | { kind: "stats"; head: string[]; rows: string[][]; caption?: string }
  | { kind: "note"; title: string; paragraphs: string[]; image?: RatgeberNoteImage }
  | { kind: "fault"; id: string; number: number; title: string; icon: string; problem: string[]; solution: string[]; solutionList: string[] }
  | { kind: "cta"; html: string };

export type RatgeberNoteImage = { src: string; alt: string; caption?: string };

const RATGEBER_DIR = "content/ratgeber";


function slugify(value: string): string {
  const ascii = value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9 ]+/g, "");
  return ascii
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  const data: Record<string, string> = {};
  if (!match) return { data, body: raw };
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }
  return { data, body: match[2] };
}

function parseList(value: string | undefined): string[] {
  if (!value) return [];
  const cleaned = value.trim().replace(/^\[|\]$/g, "");
  return cleaned
    .split(",")
    .map((v) => v.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
}

function inlineMarkdown(value: string): string {
  let out = escapeHtml(value);
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\*([^*\n]+)\*/g, "<em>$1</em>");
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_match, text, href) => {
    const isExternal = /^https?:\/\//.test(href) && !href.includes("firmenflow.de");
    const extAttrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `<a href="${href}" class="text-[var(--color-plum)] font-semibold underline underline-offset-4 decoration-[var(--color-coral)]/60 hover:decoration-[var(--color-coral)] hover:text-[var(--color-coral)] transition-colors"${extAttrs}>${text}</a>`;
  });
  return out;
}

function markdownToHtml(body: string): { html: string; headings: RatgeberPost["headings"]; sections: RatgeberSection[] } {
  const lines = body.split(/\r?\n/);
  const html: string[] = [];
  const headings: RatgeberPost["headings"] = [];
  const sections: RatgeberSection[] = [];
  let inList = false;
  let listItems: string[] = [];
  let paraBuffer: string[] = [];
  let tableRows: string[][] = [];
  let chartNext: string | null = null;
  let cardsNext: string | null = null;
  let statsNext: string | null = null;
  let headingCount = 0;
  let leadDone = false;
  // Hinweisbox: ::hinweis: Titel:: ... ::/hinweis::, darin Absaetze und
  // optional ein Bild als ![Alt](/pfad.webp "Bildunterschrift").
  let note: { title: string; paragraphs: string[]; buffer: string[]; image?: RatgeberNoteImage } | null = null;

  // Fehler-Karte: ::fehler: Titel | icon-name:: … Problem … ::loesung:: … Lösung … ::/fehler::
  // Die Lösung darf Absätze und eine Aufzählung enthalten. Karten werden fortlaufend nummeriert.
  let fault: {
    title: string;
    icon: string;
    problem: string[];
    solution: string[];
    solutionList: string[];
    buffer: string[];
    inSolution: boolean;
  } | null = null;
  let faultCount = 0;

  const flushFaultPara = () => {
    if (!fault || fault.buffer.length === 0) return;
    const p = inlineMarkdown(fault.buffer.join(" ").trim());
    (fault.inSolution ? fault.solution : fault.problem).push(p);
    fault.buffer = [];
  };

  const closeFault = () => {
    if (!fault) return;
    flushFaultPara();
    const { title, icon, problem, solution, solutionList } = fault;
    fault = null;
    faultCount += 1;
    const id = slugify(title);
    headings.push({ id, text: title, level: 3 });
    html.push(
      `<section><h3 id="${id}">${inlineMarkdown(title)}</h3>${problem.map((t) => `<p>${t}</p>`).join("")}` +
        `<p><strong>So sollte es sein:</strong></p>${solution.map((t) => `<p>${t}</p>`).join("")}` +
        (solutionList.length ? `<ul>${solutionList.map((t) => `<li>${t}</li>`).join("")}</ul>` : "") +
        `</section>`,
    );
    sections.push({ kind: "fault", id, number: faultCount, title: inlineMarkdown(title), icon, problem, solution, solutionList });
  };

  const flushNotePara = () => {
    if (!note || note.buffer.length === 0) return;
    note.paragraphs.push(inlineMarkdown(note.buffer.join(" ").trim()));
    note.buffer = [];
  };

  const closeNote = () => {
    if (!note) return;
    flushNotePara();
    const { title, paragraphs, image } = note;
    note = null;
    const figure = image
      ? `<figure><img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}" loading="lazy" />${
          image.caption ? `<figcaption>${image.caption}</figcaption>` : ""
        }</figure>`
      : "";
    html.push(`<aside><p><strong>${inlineMarkdown(title)}</strong></p>${paragraphs.map((t) => `<p>${t}</p>`).join("")}${figure}</aside>`);
    sections.push({ kind: "note", title: inlineMarkdown(title), paragraphs, image });
  };

  const flushPara = () => {
    if (paraBuffer.length === 0) return;
    const text = paraBuffer.join(" ").trim();
    paraBuffer = [];
    if (!text) return;
    if (!leadDone) {
      leadDone = true;
      const p = `<p class="ratgeber-lead">${inlineMarkdown(text)}</p>`;
      html.push(p);
      sections.push({ kind: "lead", html: p });
      return;
    }
    if (/^(Alles unverbindlich|Persönlich mit Manu)/.test(text)) {
      const p = `<p class="ratgeber-fine">${inlineMarkdown(text)}</p>`;
      html.push(p);
      sections.push({ kind: "text", html: p });
      return;
    }
    const p = `<p>${inlineMarkdown(text)}</p>`;
    html.push(p);
    sections.push({ kind: "text", html: p });
  };

  const closeList = () => {
    if (inList) {
      html.push("</ul>");
      const isChecklist = listItems.some((i) => /\?$/.test(i.replace(/<[^>]+>/g, "").trim()));
      sections.push({ kind: "list", items: listItems, variant: isChecklist ? "check" : "bullet" });
      inList = false;
      listItems = [];
    }
  };

  const resetCustomTable = () => {
    chartNext = null;
    cardsNext = null;
    statsNext = null;
  };

  const closeTable = () => {
    if (tableRows.length === 0) return;
    const [head, ...rest] = tableRows;
    const body = rest.filter((r) => !r.every((c) => /^:?-{2,}:?$/.test(c)));
    tableRows = [];
    if (body.length === 0) {
      resetCustomTable();
      return;
    }
    const th =
      'class="text-left align-top font-display font-bold text-[var(--color-ink)] border-b-2 border-[var(--color-line)] py-3 pr-4 last:pr-0"';
    const td =
      'class="align-top text-[var(--color-ink)] border-b border-[var(--color-line)] py-3 pr-4 last:pr-0"';
    const thead = `<thead><tr>${head.map((c) => `<th ${th}>${inlineMarkdown(c)}</th>`).join("")}</tr></thead>`;
    const tbody = `<tbody>${body
      .map((r) => `<tr>${r.map((c) => `<td ${td}>${inlineMarkdown(c)}</td>`).join("")}</tr>`)
      .join("")}</tbody>`;
    const table = `<div class="overflow-x-auto rounded-3xl bg-white border border-[var(--color-line)] shadow-sm p-6 sm:p-8"><table class="w-full border-collapse text-sm sm:text-base">${thead}${tbody}</table></div>`;
    html.push(table);
    // Zellen fuer die Komponenten durch inlineMarkdown schicken: das escaped
    // HTML und setzt Fett, Kursiv und Links um. Die Komponenten rendern sie
    // deshalb via dangerouslySetInnerHTML.
    const headHtml = head.map((c) => inlineMarkdown(c));
    const bodyHtml = body.map((r) => r.map((c) => inlineMarkdown(c)));
    if (chartNext !== null) {
      sections.push({ kind: "chart", head: headHtml, rows: bodyHtml, caption: chartNext || undefined });
      chartNext = null;
      return;
    }
    if (cardsNext !== null) {
      sections.push({ kind: "cards", head: headHtml, rows: bodyHtml, caption: cardsNext || undefined });
      cardsNext = null;
      return;
    }
    if (statsNext !== null) {
      sections.push({ kind: "stats", head: headHtml, rows: bodyHtml, caption: statsNext || undefined });
      statsNext = null;
      return;
    }
    sections.push({ kind: "text", html: table });
  };
  for (const line of lines) {
    const trimmed = line.trim();
    if (note) {
      if (/^::\/hinweis::$/.test(trimmed)) {
        closeNote();
        continue;
      }
      if (!trimmed) {
        flushNotePara();
        continue;
      }
      const img = trimmed.match(/^!\[([^\]]*)\]\((\S+)(?:\s+"([^"]*)")?\)$/);
      if (img) {
        flushNotePara();
        note.image = { src: img[2], alt: img[1], caption: img[3] ? inlineMarkdown(img[3]) : undefined };
        continue;
      }
      note.buffer.push(trimmed);
      continue;
    }
    if (fault) {
      if (/^::\/fehler::$/.test(trimmed)) {
        closeFault();
        continue;
      }
      if (/^::loesung::$/.test(trimmed)) {
        flushFaultPara();
        fault.inSolution = true;
        continue;
      }
      if (!trimmed) {
        flushFaultPara();
        continue;
      }
      if (fault.inSolution && /^[-*]\s+/.test(trimmed)) {
        flushFaultPara();
        fault.solutionList.push(inlineMarkdown(trimmed.replace(/^[-*]\s+/, "")));
        continue;
      }
      fault.buffer.push(trimmed);
      continue;
    }
    const faultMark = trimmed.match(/^::fehler:\s*(.+?)(?:\s*\|\s*([a-z-]+))?::$/);
    if (faultMark) {
      flushPara();
      closeList();
      closeTable();
      fault = { title: faultMark[1].trim(), icon: faultMark[2] || "fehler", problem: [], solution: [], solutionList: [], buffer: [], inSolution: false };
      continue;
    }
    const noteMark = trimmed.match(/^::hinweis(?::\s*(.*?))?::$/);
    if (noteMark) {
      flushPara();
      closeList();
      closeTable();
      note = { title: (noteMark[1] || "").trim(), paragraphs: [], buffer: [] };
      continue;
    }
    if (!trimmed || trimmed === "---") {
      flushPara();
      closeList();
      closeTable();
      continue;
    }
    const h2 = trimmed.match(/^##\s+(.+)/);
    const h3 = trimmed.match(/^###\s+(.+)/);
    if (h2) {
      flushPara();
      closeList();
      closeTable();
      headingCount += 1;
      const id = slugify(h2[1]);
      headings.push({ id, text: h2[1], level: 2 });
      html.push(`<h2 id="${id}">${inlineMarkdown(h2[1])}</h2>`);
      sections.push({ kind: "heading", id, text: h2[1], index: headingCount });
      continue;
    }
    if (h3) {
      flushPara();
      closeList();
      closeTable();
      const id = slugify(h3[1]);
      headings.push({ id, text: h3[1], level: 3 });
      const h = `<h3 id="${id}" class="text-xl sm:text-2xl font-display font-bold text-[var(--color-ink)] scroll-mt-28 pt-5 sm:pt-7 pb-1.5">${inlineMarkdown(h3[1])}</h3>`;
      html.push(h);
      sections.push({ kind: "text", html: h });
      continue;
    }
    const chartMark = trimmed.match(/^::chart(?::\s*(.*?))?::$/);
    if (chartMark) {
      flushPara();
      closeList();
      closeTable();
      chartNext = (chartMark[1] || "").trim();
      continue;
    }
    const statsMark = trimmed.match(/^::zahlen(?::\s*(.*?))?::$/);
    if (statsMark) {
      flushPara();
      closeList();
      closeTable();
      statsNext = (statsMark[1] || "").trim();
      continue;
    }
    const cardsMark = trimmed.match(/^::karten(?::\s*(.*?))?::$/);
    if (cardsMark) {
      flushPara();
      closeList();
      closeTable();
      cardsNext = (cardsMark[1] || "").trim();
      continue;
    }
    if (/^\|/.test(trimmed)) {
      flushPara();
      closeList();
      tableRows.push(
        trimmed
          .replace(/^\|/, "")
          .replace(/\|$/, "")
          .split("|")
          .map((c) => c.trim()),
      );
      continue;
    }
    if (/^[-*]\s+/.test(trimmed)) {
      flushPara();
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      const item = inlineMarkdown(trimmed.replace(/^[-*]\s+/, ""));
      listItems.push(item);
      html.push(`<li>${item}</li>`);
      continue;
    }
    if (/^>\s?/.test(trimmed)) {
      flushPara();
      closeList();
      closeTable();
      const quote = `<blockquote>${inlineMarkdown(trimmed.replace(/^>\s?/, ""))}</blockquote>`;
      html.push(quote);
      sections.push({ kind: "quote", html: quote });
      continue;
    }
    if (/^\d+[.)]\s+/.test(trimmed)) {
      flushPara();
      closeList();
      closeTable();
      const p = `<p>${inlineMarkdown(trimmed)}</p>`;
      html.push(p);
      sections.push({ kind: "text", html: p });
      continue;
    }
    if (/^Autor:/.test(trimmed)) {
      flushPara();
      closeList();
      closeTable();
      const p = `<p class="ratgeber-fine">${inlineMarkdown(trimmed)}</p>`;
      html.push(p);
      sections.push({ kind: "text", html: p });
      continue;
    }
    closeList();
      closeTable();
    if (
      trimmed.startsWith("*„") ||
      trimmed.startsWith("*\"") ||
      (trimmed.startsWith("*") && trimmed.endsWith("?"))
    ) {
      flushPara();
      const quote = `<blockquote>${inlineMarkdown(trimmed.replace(/^\*|\*$/g, ""))}</blockquote>`;
      html.push(quote);
      sections.push({ kind: "quote", html: quote });
      continue;
    }
    paraBuffer.push(trimmed);
  }
  flushPara();
  closeList();
      closeTable();
  closeNote();
  closeFault();
  return { html: html.join("\n"), headings, sections };
}

function readPostFile(file: string): RatgeberPost {
  const raw = fs.readFileSync(path.join(process.cwd(), RATGEBER_DIR, file), "utf8");
  const { data, body } = parseFrontmatter(raw);
  const slug = path.basename(file, ".md");
  const words = body.split(/\s+/).filter(Boolean).length;
  const { html, headings, sections } = markdownToHtml(body);

  const quizPath = path.join(process.cwd(), RATGEBER_DIR, "quizzes", `${slug}.json`);
  let quiz: RatgeberQuizData | undefined = undefined;
  if (fs.existsSync(quizPath)) {
    try {
      quiz = JSON.parse(fs.readFileSync(quizPath, "utf8"));
    } catch (e) {
      console.error(`Fehler beim Laden des Quiz für ${slug}:`, e);
    }
  }

  return {
    slug,
    title: data.title ?? slug,
    metaTitle: data.metaTitle,
    description: data.description ?? "",
    date: data.date ?? "2026-09-19",
    updated: data.updated,
    category: data.category ?? "Website & Vertrauen",
    tags: parseList(data.tags),
    image: data.image ?? "",
    imageAlt: data.imageAlt ?? data.title ?? slug,
    readingMinutes: Math.max(2, Math.round(words / 200)),
    featured: data.featured === "true",
    html,
    headings,
    sections,
    quiz,
  };
}

export function getAllRatgeberPosts(): RatgeberPost[] {
  const dir = path.join(process.cwd(), RATGEBER_DIR);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map(readPostFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getRatgeberPost(slug: string): RatgeberPost | null {
  const file = path.join(process.cwd(), RATGEBER_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  return readPostFile(`${slug}.md`);
}


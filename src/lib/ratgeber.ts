import fs from "node:fs";
import path from "node:path";

export type RatgeberPostMeta = {
  slug: string;
  title: string;
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

export type RatgeberPost = RatgeberPostMeta & {
  html: string;
  headings: { id: string; text: string; level: 2 | 3 }[];
};

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
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
  return out;
}

function markdownToHtml(body: string): { html: string; headings: RatgeberPost["headings"] } {
  const lines = body.split(/\r?\n/);
  const html: string[] = [];
  const headings: RatgeberPost["headings"] = [];
  let inList = false;
  const closeList = () => {
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
  };
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed === "---") {
      closeList();
      continue;
    }
    const h2 = trimmed.match(/^##\s+(.+)/);
    const h3 = trimmed.match(/^###\s+(.+)/);
    if (h2) {
      closeList();
      const id = slugify(h2[1]);
      headings.push({ id, text: h2[1], level: 2 });
      html.push(`<h2 id="${id}">${inlineMarkdown(h2[1])}</h2>`);
      continue;
    }
    if (h3) {
      closeList();
      const id = slugify(h3[1]);
      headings.push({ id, text: h3[1], level: 3 });
      html.push(`<h3 id="${id}">${inlineMarkdown(h3[1])}</h3>`);
      continue;
    }
    if (/^[-*]\s+/.test(trimmed)) {
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${inlineMarkdown(trimmed.replace(/^[-*]\s+/, ""))}</li>`);
      continue;
    }
    if (/^\d+[.)]\s+/.test(trimmed)) {
      closeList();
      html.push(`<p>${inlineMarkdown(trimmed)}</p>`);
      continue;
    }
    closeList();
    html.push(`<p>${inlineMarkdown(trimmed)}</p>`);
  }
  closeList();
  return { html: html.join("\n"), headings };
}

function readPostFile(file: string): RatgeberPost {
  const raw = fs.readFileSync(path.join(process.cwd(), RATGEBER_DIR, file), "utf8");
  const { data, body } = parseFrontmatter(raw);
  const slug = path.basename(file, ".md");
  const words = body.split(/\s+/).filter(Boolean).length;
  const { html, headings } = markdownToHtml(body);
  return {
    slug,
    title: data.title ?? slug,
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


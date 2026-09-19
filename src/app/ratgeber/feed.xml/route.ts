import { getAllRatgeberPosts } from "@/lib/ratgeber";
import { getSiteUrl } from "@/lib/site-url";

export async function GET() {
  const baseUrl = getSiteUrl().origin;
  const posts = getAllRatgeberPosts();
  const items = posts
    .map(
      (p) => `    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${baseUrl}/ratgeber/${p.slug}</link>
      <guid>${baseUrl}/ratgeber/${p.slug}</guid>
      <pubDate>${new Date(`${p.date}T00:00:00`).toUTCString()}</pubDate>
      <description><![CDATA[${p.description}]]></description>
    </item>`
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Firmenflow Ratgeber</title>
    <link>${baseUrl}/ratgeber</link>
    <description>Praxiswissen zu Website, Google-Profil und Anfragen. Persönlich mit Manu.</description>
    <language>de-DE</language>
${items}
  </channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}

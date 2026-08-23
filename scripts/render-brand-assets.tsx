import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import satori from "satori";

async function main() {
  const fontPath = path.resolve(
    process.cwd(),
    "node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff"
  );
  const fontData = await readFile(fontPath);

  await mkdir("public/brand", { recursive: true });

  const fonts = [{ name: "Instrument Serif", data: fontData, weight: 400 as const, style: "italic" as const }];

  const wordmark = await satori(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", gap: 36, color: "#3B0D4F", background: "transparent" }}>
      <div style={{ display: "flex", fontFamily: "Instrument Serif", fontSize: 164, lineHeight: 1 }}>Firmenflow</div>
      <svg width="148" height="148" viewBox="0 0 24 24" fill="none" stroke="#FF705D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
        <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
        <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      </svg>
    </div>,
    { width: 1240, height: 240, fonts },
  );

  const mark = await satori(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#FCFAF7", background: "#3B0D4F", borderRadius: 64, fontFamily: "Instrument Serif", fontSize: 210 }}>ff</div>,
    { width: 320, height: 320, fonts },
  );

  await writeFile("public/brand/firmenflow-wordmark.svg", wordmark);
  await writeFile("public/brand/firmenflow-mark.svg", mark);
  console.log("Brand SVGs generated successfully.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

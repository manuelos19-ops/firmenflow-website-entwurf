import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

async function main() {
  console.log("Generating Firmenflow Logo Assets...");

  // Load font files to embed in SVGs for 100% fidelity in Sharp rendering
  const crimsonItalicPath = path.resolve(process.cwd(), "public/fonts/crimson/CrimsonText-Italic.woff2");
  const crimsonRegularPath = path.resolve(process.cwd(), "public/fonts/crimson/CrimsonText-Regular.woff2");
  const switzerPath = path.resolve(process.cwd(), "public/fonts/switzer/Switzer-Regular.woff2");
  
  let crimsonBase64 = "";
  let switzerBase64 = "";
  try {
    const crimsonBuf = await readFile(crimsonRegularPath);
    crimsonBase64 = crimsonBuf.toString("base64");
  } catch (e) {
    console.log("Using standard font fallback");
  }

  // 1. FULL WORDMARK (Dark for Light Paper Backgrounds)
  const wordmarkDarkSvg = `
<svg width="600" height="180" viewBox="0 0 600 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&amp;family=Plus+Jakarta+Sans:wght@500;600&amp;display=swap');
      .brand-title {
        font-family: 'Playfair Display', 'Crimson Text', 'Times New Roman', serif;
        font-size: 78px;
        font-weight: 700;
        letter-spacing: -1.5px;
      }
      .brand-sub {
        font-family: 'Plus Jakarta Sans', 'Switzer', -apple-system, sans-serif;
        font-size: 16px;
        font-weight: 600;
        letter-spacing: 0.22em;
      }
    </style>
  </defs>

  <!-- Main Wordmark Text: Firmenflow -->
  <g>
    <!-- Base text in Deep Plum -->
    <text x="35" y="92" class="brand-title" fill="#3B0D4F">
      F<tspan fill="transparent">i</tspan>rmenflow
    </text>
    
    <!-- Letter 'i' base stem without the default dot -->
    <!-- Custom stem for i -->
    <path d="M96 55 H108 V92 H96 Z" fill="#3B0D4F" />
    <path d="M93 55 H111 V58 H93 Z" fill="#3B0D4F" />
    <path d="M93 89 H111 V92 H93 Z" fill="#3B0D4F" />

    <!-- Signature Coral Dot for the letter 'i' -->
    <circle cx="102" cy="44" r="8.5" fill="#FF705D" />

    <!-- Signature Neon Magenta Wave Swash: loops from dot, over irmen, under flow -->
    <path 
      d="M 108 43 C 130 36, 175 32, 210 46 C 240 58, 245 98, 290 106 C 340 115, 430 115, 535 90" 
      stroke="#FF2ED1" 
      stroke-width="4.5" 
      stroke-linecap="round" 
      stroke-linejoin="round"
      fill="none" 
    />
  </g>

  <!-- Tagline: für deine Lokalpräsenz -->
  <text x="300" y="138" class="brand-sub" fill="#3B0D4F" text-anchor="middle">
    für deine Lokalpräsenz
  </text>
</svg>
`;

  // 2. FULL WORDMARK (Light for Dark Backgrounds)
  const wordmarkLightSvg = `
<svg width="600" height="180" viewBox="0 0 600 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&amp;family=Plus+Jakarta+Sans:wght@500;600&amp;display=swap');
      .brand-title {
        font-family: 'Playfair Display', 'Crimson Text', 'Times New Roman', serif;
        font-size: 78px;
        font-weight: 700;
        letter-spacing: -1.5px;
      }
      .brand-sub {
        font-family: 'Plus Jakarta Sans', 'Switzer', -apple-system, sans-serif;
        font-size: 16px;
        font-weight: 600;
        letter-spacing: 0.22em;
      }
    </style>
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#E8DEEE" />
    </linearGradient>
  </defs>

  <!-- Main Wordmark Text: Firmenflow in Light/Pearl -->
  <g>
    <text x="35" y="92" class="brand-title" fill="url(#textGrad)">
      F<tspan fill="transparent">i</tspan>rmenflow
    </text>
    
    <!-- Custom stem for i -->
    <path d="M96 55 H108 V92 H96 Z" fill="url(#textGrad)" />
    <path d="M93 55 H111 V58 H93 Z" fill="url(#textGrad)" />
    <path d="M93 89 H111 V92 H93 Z" fill="url(#textGrad)" />

    <!-- Signature Coral Dot for the letter 'i' -->
    <circle cx="102" cy="44" r="8.5" fill="#FF705D" />

    <!-- Signature Neon Magenta Wave Swash -->
    <path 
      d="M 108 43 C 130 36, 175 32, 210 46 C 240 58, 245 98, 290 106 C 340 115, 430 115, 535 90" 
      stroke="#FF2ED1" 
      stroke-width="4.5" 
      stroke-linecap="round" 
      stroke-linejoin="round"
      fill="none" 
    />
  </g>

  <!-- Tagline: für deine Lokalpräsenz -->
  <text x="300" y="138" class="brand-sub" fill="#FFFFFF" opacity="0.95" text-anchor="middle">
    für deine Lokalpräsenz
  </text>
</svg>
`;

  // 3. SHORT MONOGRAM MARK (.ff) - Dark
  const markDarkSvg = `
<svg width="240" height="200" viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700;1,800&amp;display=swap');
      .mark-text {
        font-family: 'Playfair Display', 'Crimson Text', 'Times New Roman', serif;
        font-size: 110px;
        font-style: italic;
        font-weight: 700;
      }
    </style>
  </defs>

  <!-- Leading dot on the left -->
  <circle cx="52" cy="118" r="9" fill="#FF705D" />

  <!-- Double ff -->
  <text x="80" y="138" class="mark-text" fill="#3B0D4F">
    ff
  </text>

  <!-- Flow Wave looping from dot under ff -->
  <path 
    d="M 52 118 C 65 138, 90 148, 125 138 C 160 128, 185 134, 205 124" 
    stroke="#FF2ED1" 
    stroke-width="5" 
    stroke-linecap="round" 
    stroke-linejoin="round"
    fill="none" 
  />
</svg>
`;

  // 4. SHORT MONOGRAM MARK (.ff) - Light
  const markLightSvg = `
<svg width="240" height="200" viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700;1,800&amp;display=swap');
      .mark-text {
        font-family: 'Playfair Display', 'Crimson Text', 'Times New Roman', serif;
        font-size: 110px;
        font-style: italic;
        font-weight: 700;
      }
    </style>
  </defs>

  <!-- Leading dot on the left -->
  <circle cx="52" cy="118" r="9" fill="#FF705D" />

  <!-- Double ff in pearl white -->
  <text x="80" y="138" class="mark-text" fill="#FFFFFF">
    ff
  </text>

  <!-- Flow Wave looping from dot under ff -->
  <path 
    d="M 52 118 C 65 138, 90 148, 125 138 C 160 128, 185 134, 205 124" 
    stroke="#FF2ED1" 
    stroke-width="5" 
    stroke-linecap="round" 
    stroke-linejoin="round"
    fill="none" 
  />
</svg>
`;

  // Save SVGs
  await writeFile("public/brand/firmenflow-wordmark.svg", wordmarkDarkSvg.trim());
  await writeFile("public/brand/firmenflow-wordmark-light.svg", wordmarkLightSvg.trim());
  await writeFile("public/brand/firmenflow-mark.svg", markDarkSvg.trim());
  await writeFile("public/brand/firmenflow-mark-light.svg", markLightSvg.trim());

  // Render Transparent PNGs at High-Resolution
  await sharp(Buffer.from(wordmarkDarkSvg))
    .resize(1200, 360, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile("public/brand/firmenflow-wordmark.png");

  await sharp(Buffer.from(wordmarkLightSvg))
    .resize(1200, 360, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile("public/brand/firmenflow-wordmark-light.png");

  await sharp(Buffer.from(markDarkSvg))
    .resize(480, 400, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile("public/brand/firmenflow-mark.png");

  await sharp(Buffer.from(markLightSvg))
    .resize(480, 400, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile("public/brand/firmenflow-mark-light.png");

  console.log("Successfully generated all transparent PNGs and SVGs in public/brand/!");
}

main().catch(console.error);

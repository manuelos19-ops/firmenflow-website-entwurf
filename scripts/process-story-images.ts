import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

async function processStoryImages() {
  const targetDir = "public/media/story";
  await fs.mkdir(targetDir, { recursive: true });

  const images = [
    {
      source: "C:/Users/manue/.gemini/antigravity/brain/3631f3ac-4436-4487-b05e-241e82eb8265/.user_uploaded/media_1787615660448.jpg",
      name: "story-1-unsichtbar",
    },
    {
      source: "C:/Users/manue/.gemini/antigravity/brain/3631f3ac-4436-4487-b05e-241e82eb8265/.user_uploaded/media_1787615660424.jpg",
      name: "story-2-loesung-manu",
    },
    {
      source: "C:/Users/manue/.gemini/antigravity/brain/3631f3ac-4436-4487-b05e-241e82eb8265/.user_uploaded/media_1787615660423.jpg",
      name: "story-3-voller-erfolg",
    },
  ];

  for (const img of images) {
    const webpPath = path.join(targetDir, `${img.name}.webp`);
    const jpgPath = path.join(targetDir, `${img.name}.jpg`);

    // WebP
    await sharp(img.source)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 88, effort: 6 })
      .toFile(webpPath);

    // JPG
    await sharp(img.source)
      .resize({ width: 1200, withoutEnlargement: true })
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(jpgPath);

    const stats = await fs.stat(webpPath);
    console.log(`Saved ${img.name}.webp (${Math.round(stats.size / 1024)} KB)`);
  }
}

processStoryImages().catch(console.error);

import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

async function processNaturePhoto() {
  const targetDir = "public/media/portraits";
  await fs.mkdir(targetDir, { recursive: true });

  const inputPath = "C:/Users/manue/.gemini/antigravity/brain/3631f3ac-4436-4487-b05e-241e82eb8265/.user_uploaded/media_1787618497629.jpg";

  // 1. Full photo
  await sharp(inputPath)
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 92 })
    .toFile(path.join(targetDir, "manu-nature-full.webp"));

  // 2. Focused crop on Manuel sitting relaxed in nature (aspect ~4:5)
  const meta = await sharp(inputPath).metadata();
  const width = meta.width || 682;
  const height = meta.height || 1024;

  // Extract from top: 380 to 980 (focusing on Manuel sitting on the blanket)
  await sharp(inputPath)
    .extract({
      left: 0,
      top: Math.round(height * 0.38),
      width: width,
      height: Math.round(height * 0.60),
    })
    .resize({ width: 700, height: 850, fit: "cover" })
    .webp({ quality: 92 })
    .toFile(path.join(targetDir, "manu-nature-seated.webp"));

  console.log("Nature photos processed successfully!");
}

processNaturePhoto().catch(console.error);

import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

async function processAvatars() {
  const targetDir = "public/media/avatars";
  await fs.mkdir(targetDir, { recursive: true });

  const streetInput = "C:/Users/manue/.gemini/antigravity/brain/3631f3ac-4436-4487-b05e-241e82eb8265/.user_uploaded/media_1787616733982.jpg";
  const studioInput = "C:/Users/manue/.gemini/antigravity/brain/3631f3ac-4436-4487-b05e-241e82eb8265/.user_uploaded/media_1787616831929.jpg";

  // 1. Street full
  await sharp(streetInput)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 90 })
    .toFile(path.join(targetDir, "manu-avatar-street.webp"));

  // 2. Thumbs-up close-up avatar (crop out top text, focus on face & thumbs-up)
  const metadata = await sharp(streetInput).metadata();
  const width = metadata.width || 1024;
  const height = metadata.height || 1024;

  // Crop around avatar face and thumbs up (y from 15% to 85%)
  await sharp(streetInput)
    .extract({
      left: Math.round(width * 0.25),
      top: Math.round(height * 0.14),
      width: Math.round(width * 0.55),
      height: Math.round(height * 0.72),
    })
    .resize({ width: 500, height: 500, fit: "cover" })
    .webp({ quality: 90 })
    .toFile(path.join(targetDir, "manu-avatar-thumbsup.webp"));

  // 3. Studio Avatar (full & portrait)
  await sharp(studioInput)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 90 })
    .toFile(path.join(targetDir, "manu-avatar-studio.webp"));

  // Close-up portrait crop for badge / logo integration
  const studioMeta = await sharp(studioInput).metadata();
  const sWidth = studioMeta.width || 800;
  const sHeight = studioMeta.height || 1000;

  await sharp(studioInput)
    .extract({
      left: Math.round(sWidth * 0.2),
      top: Math.round(sHeight * 0.04),
      width: Math.round(sWidth * 0.6),
      height: Math.round(sWidth * 0.6),
    })
    .resize({ width: 300, height: 300, fit: "cover" })
    .webp({ quality: 92 })
    .toFile(path.join(targetDir, "manu-avatar-portrait.webp"));

  console.log("All avatar variations processed successfully!");
}

processAvatars().catch(console.error);

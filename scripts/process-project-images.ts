import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

async function processProjectImages() {
  const images = [
    {
      src: "C:/Users/manue/.gemini/antigravity/brain/3631f3ac-4436-4487-b05e-241e82eb8265/.user_uploaded/media_1787604906349.png",
      name: "autotransport-alex",
    },
    {
      src: "C:/Users/manue/.gemini/antigravity/brain/3631f3ac-4436-4487-b05e-241e82eb8265/.user_uploaded/media_1787604906362.png",
      name: "buescher-baeckerei",
    },
    {
      src: "C:/Users/manue/.gemini/antigravity/brain/3631f3ac-4436-4487-b05e-241e82eb8265/.user_uploaded/media_1787604906363.jpg",
      name: "eiscafe-orrico",
    },
    {
      src: "C:/Users/manue/.gemini/antigravity/brain/3631f3ac-4436-4487-b05e-241e82eb8265/.user_uploaded/media_1787604906390.jpg",
      name: "vincent-kaesekuchen",
    },
  ];

  const targetDir = "public/media/projects";
  await fs.mkdir(targetDir, { recursive: true });

  for (const img of images) {
    const webpPath = path.join(targetDir, `${img.name}.webp`);
    const jpgPath = path.join(targetDir, `${img.name}.jpg`);

    // Compress to 800px width WebP (quality: 82)
    await sharp(img.src)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(webpPath);

    // Fallback JPEG
    await sharp(img.src)
      .resize({ width: 800, withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(jpgPath);

    const stats = await fs.stat(webpPath);
    console.log(`Saved ${img.name}.webp (${Math.round(stats.size / 1024)} KB)`);
  }
}

processProjectImages().catch(console.error);

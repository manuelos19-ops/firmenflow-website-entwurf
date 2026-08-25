import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

async function saveAvatar() {
  const inputPath = "C:/Users/manue/.gemini/antigravity/brain/3631f3ac-4436-4487-b05e-241e82eb8265/.user_uploaded/media_1787609367874.jpg";
  const targetDir = "public/media/avatars";
  await fs.mkdir(targetDir, { recursive: true });

  const jpgTarget = path.join(targetDir, "manu-3d-avatar.jpg");
  const webpTarget = path.join(targetDir, "manu-3d-avatar.webp");

  // Save optimized webp
  await sharp(inputPath)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 88, effort: 6 })
    .toFile(webpTarget);

  // Save optimized jpg
  await sharp(inputPath)
    .resize({ width: 1200, withoutEnlargement: true })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(jpgTarget);

  console.log("Avatar saved successfully in public/media/avatars/!");
}

saveAvatar().catch(console.error);

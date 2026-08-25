import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

async function saveGeneratedAvatars() {
  const targetDir = "public/media/avatars";
  await fs.mkdir(targetDir, { recursive: true });

  const deskImg = "C:/Users/manue/.gemini/antigravity/brain/3631f3ac-4436-4487-b05e-241e82eb8265/manu_avatar_desk_1787617477030.jpg";
  const tabletImg = "C:/Users/manue/.gemini/antigravity/brain/3631f3ac-4436-4487-b05e-241e82eb8265/manu_avatar_tablet_1787617494002.jpg";

  await sharp(deskImg)
    .resize({ width: 1000 })
    .webp({ quality: 90 })
    .toFile(path.join(targetDir, "manu-avatar-desk.webp"));

  await sharp(tabletImg)
    .resize({ width: 1000 })
    .webp({ quality: 90 })
    .toFile(path.join(targetDir, "manu-avatar-tablet.webp"));

  console.log("Generated avatars saved to public/media/avatars/!");
}

saveGeneratedAvatars().catch(console.error);

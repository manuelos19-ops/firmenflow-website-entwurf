import sharp from "sharp";
import path from "node:path";

async function checkImage() {
  const inputPath = "C:/Users/manue/.gemini/antigravity/brain/3631f3ac-4436-4487-b05e-241e82eb8265/.user_uploaded/media_1787591911028.png";
  const meta = await sharp(inputPath).metadata();
  console.log("Metadata:", meta);

  // Let's sample pixels to see if the checkerboard is baked in or true alpha
  const raw = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  console.log("Channels:", raw.info.channels);
  // Check top-left corner (0,0)
  console.log("Pixel 0,0:", raw.data.slice(0, 4));
}

checkImage().catch(console.error);

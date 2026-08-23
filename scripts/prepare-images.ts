import { mkdir } from "node:fs/promises";
import sharp from "sharp";

async function main() {
  const defaultHeroSource = "C:\\Users\\manue\\Downloads\\Firmenflow website\\IMG-20260423-WA0068.jpg";
  const defaultAboutSource = "C:\\Users\\manue\\Downloads\\Firmenflow website\\20260118-Manu-21_Haerdle.jpg";
  const defaultContactSource = "C:\\Users\\manue\\Downloads\\Firmenflow website\\20250815-_FWR0143.jpg";

  const heroSource = process.env.FIRMENFLOW_HERO_SOURCE || defaultHeroSource;
  const aboutSource = process.env.FIRMENFLOW_ABOUT_SOURCE || defaultAboutSource;
  const contactSource = process.env.FIRMENFLOW_CONTACT_SOURCE || defaultContactSource;

  const jobs = [
    { source: heroSource, target: "public/media/manu-hero.webp", width: 1400, height: 1700 },
    { source: aboutSource, target: "public/media/manu-about.webp", width: 1200, height: 1440 },
    { source: contactSource, target: "public/media/manu-contact.webp", width: 1200, height: 1440 },
  ] as const;

  await mkdir("public/media", { recursive: true });

  for (const job of jobs) {
    console.log(`Processing ${job.source} -> ${job.target}...`);
    await sharp(job.source)
      .rotate()
      .resize(job.width, job.height, { fit: "cover", position: "attention", withoutEnlargement: true })
      .webp({ quality: 84, smartSubsample: true })
      .withMetadata({ orientation: undefined })
      .toFile(job.target);
  }

  console.log("Images prepared successfully.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

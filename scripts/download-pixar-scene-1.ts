import fs from "node:fs";
import path from "node:path";
import https from "node:https";

async function downloadFile(url: string, dest: string) {
  await fs.promises.mkdir(path.dirname(dest), { recursive: true });
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on("finish", () => {
        file.close(resolve);
      });
    }).on("error", (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function main() {
  const url = "https://d8j0ntlcm91z4.cloudfront.net/user_3Bj09CTS0LAwGOoFCyKScI03uvb/hf_20260824_221608_b0ee9222-dbea-4045-b6bb-2d9e0c8dbcf8.mp4";
  const target = "public/media/higgsfield/scene-1-pixar-problem.mp4";
  console.log("Downloading 3D Pixar Scene 1...");
  await downloadFile(url, target);
  console.log("Downloaded successfully to", target);
}

main().catch(console.error);

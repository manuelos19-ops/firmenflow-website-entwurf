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
  const url = "https://d8j0ntlcm91z4.cloudfront.net/user_3Bj09CTS0LAwGOoFCyKScI03uvb/hf_20260824_221901_f11f0fa1-32c3-4cdc-aa6e-608dab7ee9a2.mp4";
  const target = "public/media/higgsfield/scene-1-pixar-owner-sign.mp4";
  console.log("Downloading improved Scene 1...");
  await downloadFile(url, target);
  console.log("Downloaded successfully to", target);
}

main().catch(console.error);

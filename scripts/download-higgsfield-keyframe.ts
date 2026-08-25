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
  const url = "https://d8j0ntlcm91z4.cloudfront.net/user_3Bj09CTS0LAwGOoFCyKScI03uvb/hf_20260824_213813_85d8f9ba-0179-499f-a484-5fc57d48a6fa.png";
  const target = "public/media/higgsfield/scene-cafe-keyframe.png";
  console.log("Downloading keyframe from Higgsfield...");
  await downloadFile(url, target);
  console.log("Downloaded successfully to", target);
}

main().catch(console.error);

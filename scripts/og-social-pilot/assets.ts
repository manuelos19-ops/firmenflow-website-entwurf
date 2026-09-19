import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  ASSET_PATHS,
  type PilotAssetPaths,
  type PilotAssets,
} from "./spec";

const mimeByExtension: Record<string, string> = {
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

async function asDataUri(relativePath: string): Promise<string> {
  const absolutePath = path.resolve(relativePath);
  let data: Buffer;
  try {
    data = await readFile(absolutePath);
  } catch {
    throw new Error(`Quellasset fehlt: ${relativePath.split(path.sep).join("/")}`);
  }

  if (data.byteLength === 0) {
    throw new Error(`Quellasset ist leer: ${relativePath.split(path.sep).join("/")}`);
  }

  const mime = mimeByExtension[path.extname(relativePath).toLowerCase()];
  if (!mime) {
    throw new Error(`Nicht unterstütztes Quellformat: ${relativePath}`);
  }
  return `data:${mime};base64,${data.toString("base64")}`;
}

export async function loadPilotAssets(
  paths: PilotAssetPaths = ASSET_PATHS,
): Promise<PilotAssets> {
  const entries = await Promise.all(
    Object.entries(paths).map(async ([key, relativePath]) => [
      key,
      await asDataUri(relativePath),
    ]),
  );
  return Object.fromEntries(entries) as PilotAssets;
}

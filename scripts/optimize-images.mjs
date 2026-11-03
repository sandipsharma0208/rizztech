import fs from "node:fs/promises";
import sharp from "sharp";

const pngTargets = [
  { file: "public/industries-grid.png", width: 1800 },
  { file: "public/data-centre-corridor.png", width: 1800 },
  { file: "public/server-room-hero.png", width: 1800 },
  { file: "public/router-hero.png", width: 1600 },
  { file: "public/logo-mark.png", width: 720 },
];

const jpegTargets = [
  "public/cable-tray-fitted.jpg",
  "public/connecting-network-cables-in-server-room.jpg",
];

async function replaceOptimized(file, processor) {
  const tempPath = `${file}.tmp`;
  await processor(tempPath);
  await fs.rename(tempPath, file);
  const stats = await fs.stat(file);
  console.log(`Optimized ${file} to ${(stats.size / 1024).toFixed(2)} KB`);
}

async function optimizePng({ file, width }) {
  await replaceOptimized(file, async (tempPath) => {
    await sharp(file)
      .resize({ width, withoutEnlargement: true, fit: "inside" })
      .png({
        compressionLevel: 9,
        adaptiveFiltering: true,
        quality: 80,
        palette: true,
        effort: 10,
      })
      .toFile(tempPath);
  });
}

async function optimizeJpeg(file) {
  await replaceOptimized(file, async (tempPath) => {
    await sharp(file)
      .jpeg({ quality: 72, mozjpeg: true, progressive: true })
      .toFile(tempPath);
  });
}

async function createIndustryImages() {
  const source = "public/industries-grid.png";
  const { width, height } = await sharp(source).metadata();
  const tileWidth = Math.floor(width / 4);
  const tileHeight = Math.floor(height / 2);

  for (let index = 0; index < 7; index += 1) {
    await sharp(source)
      .extract({
        left: (index % 4) * tileWidth,
        top: Math.floor(index / 4) * tileHeight,
        width: tileWidth,
        height: tileHeight,
      })
      .resize(1200, 480, {
        fit: "cover",
        position: sharp.strategy.attention,
      })
      .webp({ quality: 82, effort: 6 })
      .toFile(`public/industry-${index}.webp`);
  }
}

async function main() {
  if (process.argv.includes("--industry-crops")) {
    await createIndustryImages();
    return;
  }

  for (const target of pngTargets) {
    await optimizePng(target);
  }

  for (const file of jpegTargets) {
    await optimizeJpeg(file);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

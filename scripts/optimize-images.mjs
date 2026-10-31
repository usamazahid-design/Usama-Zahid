import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve('public/images');
const MAX_EDGE = 1800;
const PORTRAIT_EDGE = 900;
const QUALITY = 78;

/** Never convert or delete these files. */
const SKIP = new Set(['favicon.png', 'favicon.ico', 'favicon.svg']);

/**
 * Keep the original as well as WebP.
 * Open Graph / Twitter still prefer a JPEG share image.
 */
const KEEP_ORIGINAL = new Set(['og-image.jpg']);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

function isRaster(file) {
  return /\.(webp|png|jpe?g)$/i.test(file);
}

function webpPathFor(file) {
  return file.replace(/\.(png|jpe?g|webp)$/i, '.webp');
}

async function optimize() {
  const files = (await walk(ROOT))
    .filter(isRaster)
    .filter((file) => !SKIP.has(path.basename(file).toLowerCase()));

  const rows = [];

  for (const file of files) {
    const original = await fs.readFile(file);
    const before = original.length;
    const base = path.basename(file);
    const ext = path.extname(file).toLowerCase();

    try {
      let pipeline = sharp(original, { failOn: 'none' }).rotate();
      const meta = await pipeline.metadata();
      const width = meta.width ?? MAX_EDGE;
      const height = meta.height ?? MAX_EDGE;
      const longest = Math.max(width, height);
      const isPortrait = /usamazahidPic/i.test(base);
      const isOg = /og-image/i.test(base);
      const maxEdge = isPortrait ? PORTRAIT_EDGE : MAX_EDGE;

      pipeline = sharp(original, { failOn: 'none' }).rotate();

      if (isOg) {
        pipeline = pipeline.resize(1200, 630, { fit: 'cover' });
      } else if (longest > maxEdge) {
        pipeline = pipeline.resize({
          width: width >= height ? maxEdge : undefined,
          height: height > width ? maxEdge : undefined,
          withoutEnlargement: true,
        });
      }

      const webp = await pipeline.webp({ quality: QUALITY, effort: 6, smartSubsample: true }).toBuffer();
      const dest = webpPathFor(file);
      await fs.writeFile(dest, webp);

      const converted = ext !== '.webp';
      const keepOriginal = KEEP_ORIGINAL.has(base.toLowerCase());
      if (converted && !keepOriginal) {
        await fs.unlink(file);
      }

      rows.push({
        file: path.relative(ROOT, dest),
        from: converted ? ext.replace('.', '') : 'webp',
        before,
        after: webp.length,
      });
    } catch (error) {
      console.error(`Failed ${file}:`, error.message);
    }
  }

  const totalBefore = rows.reduce((sum, row) => sum + row.before, 0);
  const totalAfter = rows.reduce((sum, row) => sum + row.after, 0);
  for (const row of rows.sort((a, b) => b.before - a.before)) {
    const kb = (n) => `${(n / 1024).toFixed(0)}KB`;
    const tag = row.from === 'webp' ? 'webp' : `${row.from}→webp`;
    console.log(`${kb(row.before).padStart(7)} → ${kb(row.after).padStart(6)}  [${tag}]  ${row.file}`);
  }
  console.log(
    `\nTotal ${(totalBefore / 1024 / 1024).toFixed(2)}MB → ${(totalAfter / 1024 / 1024).toFixed(2)}MB`
  );
}

await optimize();

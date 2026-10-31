/**
 * Hostinger/cPanel often fails to serve folders that start with "_".
 * Rename out/_next -> out/nxt and rewrite every /_next/ reference.
 */
import {
  existsSync,
  renameSync,
  rmSync,
  cpSync,
  readFileSync,
  writeFileSync,
  readdirSync,
  statSync,
} from 'fs';
import { join, extname } from 'path';

const root = process.cwd();
const outDir = join(root, 'out');
const fromDir = join(outDir, '_next');
const toName = 'nxt';
const toDir = join(outDir, toName);
const fromPath = '/_next/';
const toPath = `/${toName}/`;

const TEXT_EXT = new Set([
  '.html',
  '.js',
  '.css',
  '.json',
  '.txt',
  '.xml',
  '.map',
  '.svg',
]);

function fail(msg) {
  console.error(`\n[rewrite-next-dir] ${msg}\n`);
  process.exit(1);
}

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, files);
    else files.push(p);
  }
  return files;
}

if (!existsSync(outDir)) fail('Missing ./out — run `npm run build` first.');

if (existsSync(toDir) && existsSync(fromDir)) {
  try {
    rmSync(toDir, { recursive: true, force: true });
  } catch (err) {
    // ignore
  }
}

if (!existsSync(fromDir) && !existsSync(toDir)) {
  fail('Missing ./out/_next — incomplete export.');
}

if (existsSync(fromDir)) {
  try {
    renameSync(fromDir, toDir);
    console.log(`[rewrite-next-dir] Renamed _next -> ${toName}`);
  } catch (err) {
    if (err.code === 'EPERM' || err.code === 'EACCES') {
      cpSync(fromDir, toDir, { recursive: true });
      try {
        rmSync(fromDir, { recursive: true, force: true });
      } catch (rmErr) {
        // ignore
      }
      console.log(`[rewrite-next-dir] Copied _next -> ${toName}`);
    } else {
      throw err;
    }
  }
} else {
  console.log(`[rewrite-next-dir] ${toName}/ already present — rewriting refs only`);
}

let changed = 0;
let scanned = 0;
for (const file of walk(outDir)) {
  const ext = extname(file).toLowerCase();
  if (!TEXT_EXT.has(ext)) continue;
  scanned += 1;
  let text;
  try {
    text = readFileSync(file, 'utf8');
  } catch {
    continue;
  }
  if (!text.includes(fromPath) && !text.includes('\\/_next\\/') && !text.includes('"_next"')) {
    // still replace common escaped / encoded forms below
  }
  const next = text
    .replaceAll('/_next/', toPath)
    .replaceAll('\\/_next\\/', `\\/${toName}\\/`)
    .replaceAll('"_next/', `"${toName}/`)
    .replaceAll("'_next/", `'${toName}/`);
  if (next !== text) {
    writeFileSync(file, next, 'utf8');
    changed += 1;
  }
}

if (!existsSync(join(toDir, 'static', 'css'))) {
  fail(`Missing ./${toName}/static/css after rewrite.`);
}

console.log(`[rewrite-next-dir] Scanned ${scanned} text files, updated ${changed}`);
console.log(`[rewrite-next-dir] Assets now at /${toName}/static/…\n`);

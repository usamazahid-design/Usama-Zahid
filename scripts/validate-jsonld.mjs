import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('out');
const bad = [];
const scriptRegex = /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;

function walk(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walk(full);
      continue;
    }
    if (!entry.endsWith('.html')) continue;

    const html = fs.readFileSync(full, 'utf8');
    let match;
    let idx = 0;
    while ((match = scriptRegex.exec(html)) !== null) {
      idx += 1;
      try {
        JSON.parse(match[1]);
      } catch (error) {
        bad.push({
          file: path.relative(process.cwd(), full),
          index: idx,
          error: String(error?.message || error),
          snippet: match[1].slice(0, 220),
        });
      }
    }
  }
}

walk(root);

if (bad.length > 0) {
  console.log(JSON.stringify(bad, null, 2));
  process.exit(1);
}

console.log('OK');

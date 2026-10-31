/**
 * Packs ./out into deploy.zip for Hostinger public_html.
 * Expects rewrite-next-dir.mjs to have renamed _next -> nxt.
 */
import { existsSync, cpSync, rmSync, statSync } from 'fs';
import { join } from 'path';
import { execFileSync } from 'child_process';

const root = process.cwd();
const outDir = join(root, 'out');
const assetDir = join(outDir, 'nxt');
const legacyNext = join(outDir, '_next');
const zipPath = join(root, 'deploy.zip');
const htaccessSrc = join(root, '.htaccess');

function fail(msg) {
  console.error(`\n[deploy:zip] ${msg}\n`);
  process.exit(1);
}

if (!existsSync(outDir)) {
  fail('Missing ./out — run `npm run build` first.');
}

if (existsSync(legacyNext) && !existsSync(assetDir)) {
  console.log('[deploy:zip] Running rewrite-next-dir…');
  execFileSync(process.execPath, [join(root, 'scripts', 'rewrite-next-dir.mjs')], {
    cwd: root,
    stdio: 'inherit',
  });
}

if (!existsSync(assetDir)) {
  fail('Missing ./out/nxt — run `npm run build` (rewrites _next for Hostinger).');
}
if (!existsSync(join(assetDir, 'static', 'css'))) {
  fail('Missing ./out/nxt/static/css — incomplete build.');
}

if (existsSync(htaccessSrc)) {
  cpSync(htaccessSrc, join(outDir, '.htaccess'));
}

if (existsSync(zipPath)) rmSync(zipPath);

const isWin = process.platform === 'win32';
try {
  if (isWin) {
    const ps = `
      $out = '${outDir.replace(/'/g, "''")}';
      $zip = '${zipPath.replace(/'/g, "''")}';
      if (Test-Path $zip) { Remove-Item $zip -Force }
      $items = Get-ChildItem -LiteralPath $out -Force
      Compress-Archive -LiteralPath $items.FullName -DestinationPath $zip -Force
    `;
    execFileSync('powershell.exe', ['-NoProfile', '-Command', ps], { stdio: 'inherit' });
  } else {
    execFileSync('zip', ['-r', zipPath, '.'], { cwd: outDir, stdio: 'inherit' });
  }
} catch (e) {
  fail(`Could not create zip: ${e.message}`);
}

const mb = (statSync(zipPath).size / (1024 * 1024)).toFixed(1);
console.log(`\n[deploy:zip] Wrote deploy.zip (${mb} MB)`);
console.log('[deploy:zip] Extract INTO public_html (not public_html/out):');
console.log('  public_html/index.html');
console.log('  public_html/nxt/     ← styles + JS (NOT _next)');
console.log('  public_html/images/');
console.log('  public_html/.htaccess');
console.log('[deploy:zip] Purge LiteSpeed cache, then open:');
console.log('  https://usamazahid.design/nxt/static/css/  (must list/download, not 404)\n');

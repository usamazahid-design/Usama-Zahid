import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcPath = path.join(__dirname, '../components/home/authenticHomeHtml.ts');
const outPath = path.join(__dirname, '../components/home/HomeView.tsx');

const src = fs.readFileSync(srcPath, 'utf8');
const m = src.match(/export const AUTHENTIC_HTML = `([\s\S]*)`;\s*$/);
if (!m) throw new Error('AUTHENTIC_HTML not found');
let html = m[1];

// Fix mojibake quotes
html = html
  .replace(/â€œ/g, '“')
  .replace(/â€/g, '”')
  .replace(/â€™/g, '’')
  .replace(/Â©/g, '©')
  .replace(/Â·/g, '·');

function cssKeyToCamel(key) {
  if (key.startsWith('--')) return key;
  return key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function styleToJsx(styleStr) {
  const entries = [];
  for (const part of styleStr.split(';')) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const idx = trimmed.indexOf(':');
    if (idx < 0) continue;
    const key = trimmed.slice(0, idx).trim();
    const val = trimmed.slice(idx + 1).trim();
    const camel = cssKeyToCamel(key);
    if (camel.startsWith('--')) {
      entries.push(`'${camel}': '${val.replace(/'/g, "\\'")}'`);
    } else {
      entries.push(`${camel}: '${val.replace(/'/g, "\\'")}'`);
    }
  }
  return `{{ ${entries.join(', ')} }}`;
}

// style="..." → style={{...}}
html = html.replace(/\sstyle="([^"]*)"/g, (_, s) => ` style=${styleToJsx(s)}`);

// SVG / HTML attrs with dashes → camelCase (common set)
const attrMap = [
  ['stroke-width', 'strokeWidth'],
  ['stroke-linecap', 'strokeLinecap'],
  ['stroke-linejoin', 'strokeLinejoin'],
  ['fill-rule', 'fillRule'],
  ['clip-path', 'clipPath'],
  ['clip-rule', 'clipRule'],
  ['stroke-dasharray', 'strokeDasharray'],
  ['stroke-dashoffset', 'strokeDashoffset'],
  ['font-size', 'fontSize'],
  ['font-family', 'fontFamily'],
  ['font-weight', 'fontWeight'],
  ['text-anchor', 'textAnchor'],
  ['stop-color', 'stopColor'],
  ['stop-opacity', 'stopOpacity'],
  ['xlink:href', 'href'],
];
for (const [from, to] of attrMap) {
  html = html.replace(new RegExp(`\\b${from}=`, 'g'), `${to}=`);
}

html = html
  .replace(/\bclass=/g, 'className=')
  .replace(/\bfor=/g, 'htmlFor=')
  .replace(/aria-hidden="true"/g, 'aria-hidden={true}')
  .replace(/&amp;/g, '&')
  .replace(/&middot;/g, '·')
  .replace(/&rarr;/g, '→')
  .replace(/&larr;/g, '←')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"');

// void / self-closing cleanup for JSX
html = html.replace(/<(img|input|br|hr|meta|link|source|area|col|embed|track|wbr)([^>]*?)(?<!\/)>/gi, '<$1$2 />');

// Fix double slash if already self-closed
html = html.replace(/\s*\/>\s*\/>/g, ' />');

// data attributes with numbers are fine
// Convert internal <a href="/..."> to <Link> later via post-pass markers

const file = `import Link from 'next/link';
import Image from 'next/image';

/**
 * Home page — Next.js server component (JSX).
 * Interactions stay in HomeClient + authenticHomeRuntime.
 */
export default function HomeView() {
  return (
    <>
${html
  .split('\n')
  .map((line) => (line.length ? `      ${line}` : ''))
  .join('\n')}
    </>
  );
}
`;

// Prefer Next Link for internal routes (simple pass on common patterns)
let out = file
  .replace(
    /<a className="([^"]*)" href="(\/[^"]*)"((?:\s[^>]*)?)>/g,
    '<Link className="$1" href="$2"$3>'
  )
  .replace(/<\/a>/g, (match, offset, str) => {
    // This naive replace will break external/mailto anchors' closing tags too if we opened Link
    // Better: only replace pairs — skip global </a> replace
    return match;
  });

// Revert the broken approach — do Link conversion carefully
out = file;

// Convert specific internal anchors to Link by replacing open+close for known patterns
function wrapInternalLinks(jsx) {
  // Match <a ... href="/...">...</a> non-greedy, skip mailto/http
  return jsx.replace(
    /<a(\s[^>]*?)href="(\/[^"]*)"([^>]*)>([\s\S]*?)<\/a>/g,
    (full, pre, href, post, children) => {
      // Keep hash-only or external-looking alone
      return `<Link${pre}href="${href}"${post}>${children}</Link>`;
    }
  );
}

out = wrapInternalLinks(out);

// Convert img tags with src/alt/width/height to next/image where possible
out = out.replace(
  /<img\s+className="([^"]*)"\s+src="([^"]*)"\s+alt="([^"]*)"\s+width="(\d+)"\s+height="(\d+)"\s+(?:loading="lazy"\s+)?(?:decoding="async"\s+)?\/>/g,
  (_f, cls, src, alt, w, h) =>
    `<Image className="${cls}" src="${src}" alt="${alt}" width={${w}} height={${h}} sizes="(max-width: 900px) 100vw, 50vw" />`
);

out = out.replace(
  /<img\s+src="([^"]*)"\s+alt="([^"]*)"\s+width="(\d+)"\s+height="(\d+)"\s+(?:loading="lazy"\s+)?(?:decoding="async"\s+)?\/>/g,
  (_f, src, alt, w, h) =>
    `<Image src="${src}" alt="${alt}" width={${w}} height={${h}} sizes="(max-width: 900px) 100vw, 40vw" />`
);

// Brands row imgs without decoding
out = out.replace(
  /<img\s+src="([^"]*)"\s+alt="([^"]*)"\s+width="(\d+)"\s+height="(\d+)"\s+loading="lazy"\s*\/>/g,
  (_f, src, alt, w, h) =>
    `<Image src="${src}" alt="${alt}" width={${w}} height={${h}} className="h-10 w-auto" />`
);

fs.writeFileSync(outPath, out, 'utf8');
console.log('Wrote', outPath, 'chars', out.length);

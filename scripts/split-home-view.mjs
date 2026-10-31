/**
 * One-shot: split HomeView.tsx into section components (Exact pattern).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const homeDir = path.join(root, 'components/home');
const src = fs.readFileSync(path.join(homeDir, 'HomeView.tsx'), 'utf8').replace(/\r\n/g, '\n');

// Extract return body between <> and </>
const startMarker = 'return (\n    <>';
const endMarker = '</>\n  );';
const start = src.indexOf(startMarker);
const end = src.lastIndexOf(endMarker);
if (start < 0 || end < 0) throw new Error('HomeView body not found');
let body = src.slice(start + startMarker.length, end);

// Strip outer main wrap — sections own themselves; we re-add main in composer
body = body.replace(/^\s*<main id="top">\s*/, '').replace(/\s*<\/main>\s*/, '\n');

const sections = [
  {
    name: 'HomeMarkDefs',
    file: 'HomeMarkDefs.tsx',
    start: '<svg width="0"',
    end: '<a className="skip"',
    includeEnd: true,
    wrap: (inner) => `import { sx } from './sx';\n\nexport default function HomeMarkDefs() {\n  return (\n    <>\n${inner}\n      <div className="prog" id="prog" />\n    </>\n  );\n}\n`,
    post: (s) => {
      // Rebuild cleanly from known pieces
      return null;
    },
  },
];

// Manual clean split by markers
const markers = [
  { name: 'HomeHeroExact', start: '<section className="hero pad"', end: '<div className="mq"' },
  { name: 'HomeMarqueeExact', start: '<div className="mq"', end: '<section className="pad" id="services"' },
  { name: 'HomeServicesExact', start: '<section className="pad" id="services"', end: '<section id="work">' },
  { name: 'HomeWorkExact', start: '<section id="work">', end: '<section className="pad prx" id="process">' },
  { name: 'HomeProcessExact', start: '<section className="pad prx" id="process"', end: '<section className="pad pq" id="quote">' },
  { name: 'HomeQuoteExact', start: '<section className="pad pq" id="quote"', end: '<section className="tsx" id="praise">' },
  { name: 'HomePraiseExact', start: '<section className="tsx" id="praise"', end: '<section className="pad abx" id="about">' },
  { name: 'HomeAboutExact', start: '<section className="pad abx" id="about"', end: '<section className="pad faqx" id="faq">' },
  { name: 'HomeFaqExact', start: '<section className="pad faqx" id="faq"', end: '<section className="cta pad" id="contact">' },
  { name: 'HomeCtaExact', start: '<section className="cta pad" id="contact"', end: '<footer className="ft">' },
  { name: 'HomeFooterExact', start: '<footer className="ft">', end: null },
];

function needsImport(code, what) {
  return code.includes(what);
}

function buildFile(name, chunk) {
  const imports = new Set();
  if (chunk.includes('<Link') || chunk.includes('</Link>')) imports.add("import Link from 'next/link';");
  if (chunk.includes('<Image') || chunk.includes('Image ')) imports.add("import Image from 'next/image';");
  if (chunk.includes('sx(')) imports.add("import { sx } from './sx';");

  // indent chunk consistently
  const indented = chunk
    .split('\n')
    .map((l) => (l.trim() ? `    ${l.replace(/^\s{0,6}/, '')}` : ''))
    .join('\n');

  // Better: keep chunk as-is with 4-space base
  const lines = chunk.replace(/^\n+/, '').replace(/\n+$/, '').split('\n');
  const content = lines.map((l) => `    ${l}`).join('\n');

  return `${[...imports].join('\n')}${imports.size ? '\n\n' : ''}export default function ${name}() {
  return (
${content}
  );
}
`;
}

const written = [];
for (const m of markers) {
  const i0 = body.indexOf(m.start);
  if (i0 < 0) throw new Error(`start not found: ${m.name} / ${m.start}`);
  let i1 = body.length;
  if (m.end) {
    i1 = body.indexOf(m.end, i0);
    if (i1 < 0) throw new Error(`end not found: ${m.name}`);
  }
  const chunk = body.slice(i0, i1).trim();
  const file = path.join(homeDir, `${m.name}.tsx`);
  fs.writeFileSync(file, buildFile(m.name, chunk), 'utf8');
  written.push(m.name);
  console.log('wrote', m.name, chunk.length);
}

// HomeMarkDefs
const defs = `import { sx } from './sx';

export default function HomeMarkDefs() {
  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
        <defs>
          <g id="logo">
            <rect x="0" y="328" width="938" height="2724" fill="currentColor" />
            <path d="M3380 328H4318V784.5A3206 3206 0 0 1 3380 3052Z" fill="currentColor" />
            <path d="M939 3052H3380A3206 3206 0 0 1 1112 3990H939Z" fill="currentColor" />
            <rect x="3380" y="3052" width="938" height="938" style={sx({ fill: 'var(--sq,#4B3FFF)' })} />
          </g>
        </defs>
      </svg>
      <div className="prog" id="prog" />
      <a className="skip" href="#services">
        Skip to content
      </a>
    </>
  );
}
`;
fs.writeFileSync(path.join(homeDir, 'HomeMarkDefs.tsx'), defs, 'utf8');
written.unshift('HomeMarkDefs');
console.log('done', written.join(', '));

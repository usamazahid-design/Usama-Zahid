import fs from 'fs';

const p = new URL('../components/home/HomeView.tsx', import.meta.url);
let t = fs.readFileSync(p, 'utf8');

if (!t.includes('function sx(')) {
  t = t.replace(
    `import Link from 'next/link';
import Image from 'next/image';`,
    `import Link from 'next/link';
import Image from 'next/image';
import type { CSSProperties } from 'react';

function sx(styles: CSSProperties & Record<string, string | number>): CSSProperties {
  return styles as CSSProperties;
}`
  );
}

t = t.replace(/style=\{\{([\s\S]*?)\}\}/g, (m, inner) => {
  if (!String(inner).includes('--')) return m;
  return `style={sx({${inner}})}`;
});

fs.writeFileSync(p, t);
console.log('patched HomeView styles');

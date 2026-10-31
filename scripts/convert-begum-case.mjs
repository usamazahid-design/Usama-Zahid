/**
 * Convert Begum brand identity HTML → Exact Next case components.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const html = fs
  .readFileSync(path.join(root, 'Begum brand identity case study _ Usama Zahid.html'), 'utf8')
  .replace(/\r\n/g, '\n');

const mainStart = html.indexOf('<main id="main">');
const mainEnd = html.indexOf('</main>', mainStart);
if (mainStart < 0 || mainEnd < 0) throw new Error('main not found');
let main = html.slice(mainStart, mainEnd + 7);
main = main.replace(/<script[\s\S]*?<\/script>/gi, '');

function styleToJsx(styleStr) {
  const parts = styleStr.split(';').map((p) => p.trim()).filter(Boolean);
  const entries = [];
  for (const p of parts) {
    const i = p.indexOf(':');
    if (i < 0) continue;
    let k = p.slice(0, i).trim();
    let v = p.slice(i + 1).trim();
    if (k.startsWith('--')) {
      entries.push(`['${k}']: '${v.replace(/'/g, "\\'")}'`);
    } else {
      k = k.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      if (/^-?\d+(\.\d+)?$/.test(v)) entries.push(`${k}: ${v}`);
      else entries.push(`${k}: '${v.replace(/'/g, "\\'")}'`);
    }
  }
  return `style={{ ${entries.join(', ')} }}`;
}

function toJsx(chunk) {
  return chunk
    .replace(/\bclass=/g, 'className=')
    .replace(/\bfor=/g, 'htmlFor=')
    .replace(/aria-hidden="true"/g, 'aria-hidden={true}')
    .replace(/aria-hidden="false"/g, 'aria-hidden={false}')
    .replace(/&rarr;/g, '→')
    .replace(/&mdash;/g, '—')
    .replace(/&nbsp;/g, '\u00a0')
    .replace(/style="([^"]*)"/g, (_, s) => styleToJsx(s))
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/stroke-dasharray=/g, 'strokeDasharray=')
    .replace(/text-anchor=/g, 'textAnchor=')
    .replace(/font-size=/g, 'fontSize=')
    .replace(/font-weight=/g, 'fontWeight=')
    .replace(/font-family=/g, 'fontFamily=')
    .replace(/letter-spacing=/g, 'letterSpacing=')
    .replace(/stop-color=/g, 'stopColor=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/clip-path=/g, 'clipPath=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/xlink:href=/g, 'href=')
    .replace(/xmlns:xlink="[^"]*"/g, '')
    .replace(/<br>/g, '<br />')
    .replace(/https:\/\/claude\.ai\/artifact\/7PENy1SaHKJvzr1bCEnD6D/g, '/services/')
    .replace(
      /https:\/\/claude\.ai\/artifact\/HPXsy9gabwCcD7rszk2vz1#book/g,
      'https://cal.com/usama-zahid-haadwj/15min'
    )
    .replace(/https:\/\/claude\.ai\/artifact\/HPXsy9gabwCcD7rszk2vz1/g, '/contact/')
    .replace(/https:\/\/claude\.ai\/artifact\/6GN3CYnZXova6ZskNoqjii/g, '/branding/')
    .replace(/https:\/\/claude\.ai\/artifact\/ULVsvH2WfVuvcNM6hvhtXE[^"]*/g, '/about/')
    .replace(/https:\/\/claude\.ai\/artifact\/F5g9wwYJdmnpPiKDSCNL4Y/g, '/services/identity/')
    .replace(/https:\/\/claude\.ai\/artifact\/8aP13XES94PzmhNxBmYB2v/g, '/about/');
}

// Extract from after <div id="top"></div> through before CTA, keep hero+chn+sections
const top = main.indexOf('<div id="top"></div>');
const cta = main.indexOf('<section class="cta pad" id="contact">');
if (top < 0 || cta < 0) throw new Error('begum bounds not found');
let body = main.slice(top + '<div id="top"></div>'.length, cta).trim();
body = toJsx(body);

// Fix internal hash nav links stay as <a href="#...">
// Convert Services-style links in fo if any
body = body.replace(
  /<a href="\/services\/" style=\{\{([^}]*)\}\}>Services<\/a>/g,
  '<Link href="/services/" style={{$1}}>Services</Link>'
);
body = body.replace(
  /<a className="btn" href="https:\/\/cal\.com\/usama-zahid-haadwj\/15min">/g,
  '<a className="btn" href="https://cal.com/usama-zahid-haadwj/15min" target="_blank" rel="noopener" data-cur="Calendar">'
);
body = body.replace(
  /<a className="go" href="(\/[^"]*)">([\s\S]*?)<\/a>/g,
  '<Link className="go" href="$1">$2</Link>'
);

const outDir = path.join(root, 'components/branding');
fs.mkdirSync(outDir, { recursive: true });

const component = `'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

/**
 * Begum brand identity case — Exact translation of the Authentic HTML design.
 */
export default function BegumCaseExact() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.add('ready');
      });
    });

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rvs = Array.from(root.querySelectorAll<HTMLElement>('.rv, .sh, .bh, .card2, .bd, .sg, .web, .cap3'));
    rvs.forEach((item, i) => {
      item.classList.add('rv');
      item.style.setProperty('--d', \`\${(i % 4) * 0.06}s\`);
    });

    if (reduce) {
      rvs.forEach((item) => item.classList.add('vis'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('vis');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
    );
    rvs.forEach((item) => io.observe(item));

    // Chapter nav active state
    const chn = root.querySelectorAll<HTMLAnchorElement>('.chn a');
    const sections = Array.from(chn)
      .map((a) => {
        const id = a.getAttribute('href')?.slice(1);
        return id ? document.getElementById(id) : null;
      })
      .filter(Boolean) as HTMLElement[];

    const onScroll = () => {
      const y = window.scrollY + 120;
      let active = sections[0];
      for (const s of sections) {
        if (s.offsetTop <= y) active = s;
      }
      chn.forEach((a) => {
        const id = a.getAttribute('href')?.slice(1);
        a.classList.toggle('on', id === active?.id);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div ref={rootRef}>
${body
  .split('\n')
  .map((l) => `      ${l}`)
  .join('\n')}
    </div>
  );
}
`;

fs.writeFileSync(path.join(outDir, 'BegumCaseExact.tsx'), component, 'utf8');
console.log('wrote BegumCaseExact.tsx', component.length);

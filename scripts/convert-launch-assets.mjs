/**
 * Convert Launch assets HTML → Exact Next section components.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const html = fs
  .readFileSync(path.join(root, 'Launch assets _ Usama Zahid.html'), 'utf8')
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
    .replace(/xlink:href=/g, 'href=')
    .replace(/<br>/g, '<br />')
    .replace(/https:\/\/claude\.ai\/artifact\/7PENy1SaHKJvzr1bCEnD6D/g, '/services/')
    .replace(
      /https:\/\/claude\.ai\/artifact\/HPXsy9gabwCcD7rszk2vz1#book/g,
      'https://cal.com/usama-zahid-haadwj/15min'
    )
    .replace(/https:\/\/claude\.ai\/artifact\/HPXsy9gabwCcD7rszk2vz1/g, '/contact/')
    .replace(
      /https:\/\/claude\.ai\/artifact\/6GN3CYnZXova6ZskNoqjii/g,
      '/portfolio/begum-bridal-couture-website/'
    )
    .replace(/https:\/\/claude\.ai\/artifact\/ULVsvH2WfVuvcNM6hvhtXE[^"]*/g, '/blog/')
    .replace(/https:\/\/claude\.ai\/artifact\/F5g9wwYJdmnpPiKDSCNL4Y/g, '/services/identity/')
    .replace(/https:\/\/claude\.ai\/artifact\/8aP13XES94PzmhNxBmYB2v/g, '/about/');
}

const sections = [
  {
    file: 'LaunchAssetsHeroExact.tsx',
    start: '<section class="hero pad"',
    end: '<section class="pad prx" id="inside"',
    kind: 'hero',
  },
  {
    file: 'LaunchAssetsInsideExact.tsx',
    start: '<section class="pad prx" id="inside"',
    end: '<section class="pad" id="receive"',
    kind: 'inside',
  },
  {
    file: 'LaunchAssetsReceiveExact.tsx',
    start: '<section class="pad" id="receive"',
    end: '<section class="pad" id="proof"',
    kind: 'reveal',
  },
  {
    file: 'LaunchAssetsProofExact.tsx',
    start: '<section class="pad" id="proof"',
    end: '<section class="pad" id="together"',
    kind: 'proof',
  },
  {
    file: 'LaunchAssetsScopeExact.tsx',
    start: '<section class="pad" id="together"',
    end: '<section class="pad" id="faq"',
    kind: 'scope',
  },
  {
    file: 'LaunchAssetsFAQExact.tsx',
    start: '<section class="pad" id="faq"',
    end: '<section class="cta pad" id="contact"',
    kind: 'reveal',
  },
];

function postProcess(jsx, kind) {
  let out = jsx;

  out = out.replace(
    /<a href="\/services\/" style=\{\{([^}]*)\}\}>Services<\/a>/,
    '<Link href="/services/" style={{$1}}>Services</Link>'
  );

  out = out.replace(
    /<a className="btn" href="https:\/\/cal\.com\/usama-zahid-haadwj\/15min">/,
    '<a className="btn" href="https://cal.com/usama-zahid-haadwj/15min" target="_blank" rel="noopener" data-cur="Calendar">'
  );

  if (kind === 'proof') {
    out = out.replace(
      /<a className="csc" href="(\/[^"]*)"([^>]*)>([\s\S]*?)<\/a>/g,
      '<Link className="csc" href="$1"$2>$3</Link>'
    );
  }

  if (kind === 'scope') {
    out = out.replace(
      /<a className="go" href="(\/[^"]*)">([\s\S]*?)<\/a>/,
      '<Link className="go" href="$1">$2</Link>'
    );
  }

  return out;
}

function wrap(fnName, jsx, kind) {
  const needsLink = jsx.includes('<Link') || jsx.includes('</Link>');
  const imports = ["'use client';", '', "import React, { useEffect, useRef" + (kind === 'inside' ? ', useState' : '') + " } from 'react';"];
  if (needsLink) imports.push("import Link from 'next/link';");

  let hooks = '';
  let body = jsx;

  if (kind === 'hero') {
    body = body.replace('<section className="hero pad"', '<section ref={heroRef} className="hero pad"');
    hooks = `
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.add('ready');
      });
    });

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mv2 = Array.from(el.querySelectorAll<HTMLElement>('.mv2'));
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;
    let animId = 0;

    const onMouseMove = (e: MouseEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const tick = () => {
      mx += (tx - mx) * 0.06;
      my += (ty - my) * 0.06;
      if (!reduce) {
        mv2.forEach((t) => {
          const k = +(t.dataset.k || 0);
          t.style.setProperty('--bx', \`\${(mx * k).toFixed(1)}px\`);
          t.style.setProperty('--by', \`\${(my * k).toFixed(1)}px\`);
        });
      }
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);

    const counters = Array.from(el.querySelectorAll<HTMLElement>('[data-n]'));
    let io: IntersectionObserver | undefined;
    if (!reduce) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            io?.unobserve(en.target);
            const target = en.target as HTMLElement;
            const to = +(target.dataset.n || 0);
            const s = target.dataset.s || '';
            const dec = +(target.dataset.d || 0);
            const sc = dec ? Math.pow(10, dec) : 1;
            const t0 = performance.now();
            const counterTick = (t: number) => {
              const p = Math.min(1, (t - t0) / 1400);
              const v = (to * (1 - Math.pow(1 - p, 3))) / sc;
              target.textContent = (dec ? v.toFixed(dec) : Math.round(v)) + s;
              if (p < 1) requestAnimationFrame(counterTick);
            };
            requestAnimationFrame(counterTick);
          });
        },
        { threshold: 0.3 }
      );
      counters.forEach((c) => io?.observe(c));
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      io?.disconnect();
    };
  }, []);
`;
  } else if (kind === 'inside') {
    body = body.replace(
      '<section className="pad prx" id="inside"',
      '<section ref={sectionRef} className="pad prx" id="inside"'
    );
    hooks = `
  const sectionRef = useRef<HTMLElement>(null);
  const [, setActiveStep] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pvc = el.querySelector<HTMLElement>('#pvc');
    const pn = el.querySelector<HTMLElement>('#pn');
    const pw = el.querySelector<HTMLElement>('#pw');
    const pt = el.querySelector<HTMLElement>('#pt');
    const pss = Array.from(el.querySelectorAll<HTMLElement>('.ps'));
    const pips = Array.from(el.querySelectorAll<HTMLButtonElement>('.pips button'));
    const pxs = el.querySelector<HTMLElement>('.px');
    if (!pvc || !pn || !pw || !pt || !pxs || !pss.length) return;

    const WK = ['Part one', 'Part two', 'Part three', 'Part four', 'Part five'];
    const TT = [
      'Launch plan',
      'Social templates',
      'Print collateral',
      'One system, everywhere',
      'Ready-to-use files',
    ];

    let lastG = -1;
    let animId = 0;
    const cl = (x: number) => Math.max(0, Math.min(1, x));

    function scrub() {
      if (!pvc || !pn || !pw || !pt || !pxs) return;
      const vh = window.innerHeight;
      const r0 = pxs.getBoundingClientRect();
      if (r0.bottom < -100 || r0.top > vh + 100) return;
      const c = vh * 0.47;
      let gi = 4;
      for (let i = 0; i < pss.length; i++) {
        const r = pss[i].getBoundingClientRect();
        const mid = (r.top + r.bottom) / 2;
        if (mid > c) {
          gi = i;
          cl((c - r.top) / Math.max(1, r.height));
          break;
        }
      }
      if (gi !== lastG) {
        lastG = gi;
        setActiveStep(gi);
        pvc.dataset.step = String(gi + 1);
        pn.textContent = '0' + (gi + 1);
        pw.textContent = WK[gi];
        pt.textContent = TT[gi];
        pss.forEach((p, i) => p.classList.toggle('act', i === gi));
        pips.forEach((b, i) => b.classList.toggle('on', i === gi));
      }
    }

    const onScroll = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(scrub);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    const onPip = pips.map((b, i) => {
      const handler = () =>
        pss[i]?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      b.addEventListener('click', handler);
      return () => b.removeEventListener('click', handler);
    });
    scrub();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      onPip.forEach((off) => off());
    };
  }, []);
`;
  } else {
    body = body.replace(/^<section/, '<section ref={sectionRef}');
    hooks = `
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rvs = Array.from(
      el.querySelectorAll<HTMLElement>('.rv, .csc, .sh, .bh, .fq, .br2 > div, .rcv > div')
    );
    rvs.forEach((item, i) => {
      item.classList.add('rv');
      item.style.setProperty('--d', \`\${(i % 3) * 0.08}s\`);
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
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    );
    rvs.forEach((item) => io.observe(item));
    return () => io.disconnect();
  }, []);
`;
  }

  const indented = body
    .split('\n')
    .map((l) => `    ${l}`)
    .join('\n');

  return `${imports.join('\n')}

export default function ${fnName}() {${hooks}
  return (
${indented}
  );
}
`;
}

const outDir = path.join(root, 'components/services');
const written = [];

for (const s of sections) {
  const i0 = main.indexOf(s.start);
  if (i0 < 0) throw new Error('missing start: ' + s.start);
  const i1 = main.indexOf(s.end, i0);
  if (i1 < 0) throw new Error('missing end: ' + s.end);
  const chunk = main.slice(i0, i1).trim();
  const jsx = postProcess(toJsx(chunk), s.kind);
  const fn = s.file.replace('.tsx', '');
  fs.writeFileSync(path.join(outDir, s.file), wrap(fn, jsx, s.kind), 'utf8');
  written.push(s.file);
  console.log('wrote', s.file, chunk.length);
}

const page = `import React from 'react';
import LaunchAssetsHeroExact from './LaunchAssetsHeroExact';
import LaunchAssetsInsideExact from './LaunchAssetsInsideExact';
import LaunchAssetsReceiveExact from './LaunchAssetsReceiveExact';
import LaunchAssetsProofExact from './LaunchAssetsProofExact';
import LaunchAssetsScopeExact from './LaunchAssetsScopeExact';
import LaunchAssetsFAQExact from './LaunchAssetsFAQExact';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import SeoBreadcrumbs from '@/components/SeoBreadcrumbs';
import { JsonLd, BreadcrumbSchema, FAQPageSchema, WebPageSchema } from '@/lib/seo';

const launchFaqs = [
  {
    q: 'What do I receive at the end?',
    a: 'A launch plan, social media templates, print collateral and the files to reuse them, all built from the same system as your brand and website.',
  },
  {
    q: 'Do I need an existing brand identity?',
    a: 'The assets are built from your identity. If you do not have one yet, the identity and the assets can be designed together as one system.',
  },
  {
    q: 'Which channels do you cover?',
    a: 'Social media and print. We agree the exact channels and formats on a call, based on where your launch needs to show up.',
  },
  {
    q: 'How long does it take?',
    a: 'It depends on how many assets you need, so we scope the timeline together on a call.',
  },
];

export default function LaunchAssetsPageExact() {
  return (
    <main
      id="main"
      className="relative w-full"
      style={{ background: 'var(--bg)', color: 'var(--ink)', overflowX: 'clip' }}
    >
      <JsonLd
        data={WebPageSchema({
          name: 'Launch assets | Usama Zahid, brand and product designer',
          url: 'https://usamazahid.design/services/strategy/',
        })}
      />
      <JsonLd
        data={BreadcrumbSchema([
          { name: 'Home', url: 'https://usamazahid.design/' },
          { name: 'Services', url: 'https://usamazahid.design/services/' },
          { name: 'Launch assets', url: 'https://usamazahid.design/services/strategy/' },
        ])}
      />
      <JsonLd data={FAQPageSchema(launchFaqs)} />
      <SeoBreadcrumbs
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services/' },
          { name: 'Launch assets' },
        ]}
      />

      <LaunchAssetsHeroExact />
      <LaunchAssetsInsideExact />
      <LaunchAssetsReceiveExact />
      <LaunchAssetsProofExact />
      <LaunchAssetsScopeExact />
      <LaunchAssetsFAQExact />

      <CTA
        id="contact"
        title="Four weeks from brand to live URL."
        subtitle="Social and print pieces built from the same system as your brand and your website. So launch day looks as considered as the product."
        buttonText="Book Strategy Call"
        buttonHref="https://cal.com/usama-zahid-haadwj/15min"
        statusText="Available for 2 new projects this quarter"
      />
      <Footer />
    </main>
  );
}
`;

fs.writeFileSync(path.join(outDir, 'LaunchAssetsPageExact.tsx'), page, 'utf8');
written.push('LaunchAssetsPageExact.tsx');
console.log('done', written.join(', '));

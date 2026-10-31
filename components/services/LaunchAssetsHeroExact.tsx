'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function LaunchAssetsHeroExact() {
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
          t.style.setProperty('--bx', `${(mx * k).toFixed(1)}px`);
          t.style.setProperty('--by', `${(my * k).toFixed(1)}px`);
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

  return (
    <section ref={heroRef} className="hero pad" style={{ paddingTop: '110px' }}>
    <div className="fo"><span><Link href="/services/" style={{ textDecoration: 'underline', textUnderlineOffset: '4px' }}>Services</Link> / Launch assets</span><span>Brand and product designer</span><span>usamazahid.design</span></div>
    <div className="hg">
    <div className="ht">
    <h1><span className="ln"><span style={{ ['--d' as string]: '.05s' } as React.CSSProperties}>Launch assets that</span></span><span className="ln it2"><span style={{ ['--d' as string]: '.17s' } as React.CSSProperties}>look like one brand,</span></span><span className="ln it2"><span style={{ ['--d' as string]: '.29s' } as React.CSSProperties}>everywhere.</span></span></h1>
    <p className="sub"><b>Social and print pieces built from the same system as your brand and your website.</b> So launch day looks as considered as the product.</p>
    <a className="btn" href="https://cal.com/usama-zahid-haadwj/15min" target="_blank" rel="noopener" data-cur="Calendar">Book a call <span aria-hidden={true}>→</span></a>
    </div>
    <div className="hl" aria-hidden={true}><div className="wvs"><svg viewBox="0 0 600 500">
    <g className="wg" style={{ ['--d' as string]: '.1s' } as React.CSSProperties}><g className="mv2" data-k="-10"><rect x="36" y="50" width="200" height="200" fill="#4B3FFF"/><circle cx="136" cy="130" r="40" fill="#fff"/><rect x="70" y="196" width="130" height="10" rx="5" fill="#fff"/><rect x="70" y="214" width="84" height="7" rx="3" fill="#fff" opacity=".7"/></g></g>
    <g className="wg" style={{ ['--d' as string]: '.3s' } as React.CSSProperties}><g className="mv2" data-k="8"><rect x="262" y="30" width="140" height="250" style={{ fill: 'var(--ink)' }}/><rect x="282" y="56" width="48" height="48" fill="#4B3FFF"/><rect x="282" y="226" width="96" height="10" rx="5" style={{ fill: 'var(--bg)' }}/><rect x="282" y="244" width="64" height="7" rx="3" style={{ fill: 'var(--mute)' }}/></g></g>
    <g className="wg" style={{ ['--d' as string]: '.5s' } as React.CSSProperties}><g className="mv2" data-k="14"><g transform="rotate(-6 150 340)"><rect x="50" y="290" width="200" height="124" style={{ fill: 'var(--bg)', stroke: 'var(--ink)', strokeWidth: 1.6 }}/><rect x="68" y="310" width="28" height="28" style={{ fill: 'var(--ink)' }}/><rect x="82" y="326" width="18" height="18" fill="#4B3FFF"/><rect x="68" y="366" width="110" height="8" rx="4" style={{ fill: 'var(--ink)' }}/><rect x="68" y="382" width="70" height="6" rx="3" style={{ fill: 'var(--mute)' }}/></g></g></g>
    <g className="wg" style={{ ['--d' as string]: '.7s' } as React.CSSProperties}><g className="mv2" data-k="20"><rect x="420" y="90" width="150" height="210" style={{ fill: 'var(--bg)', stroke: 'var(--ink)', strokeWidth: 1.6 }}/><rect x="420" y="90" width="150" height="90" fill="#4B3FFF"/><circle cx="495" cy="135" r="24" fill="#fff"/><rect x="436" y="198" width="100" height="8" rx="4" style={{ fill: 'var(--ink)' }}/><rect x="436" y="216" width="116" height="6" rx="3" style={{ fill: 'var(--mute)' }}/><rect x="436" y="230" width="90" height="6" rx="3" style={{ fill: 'var(--mute)' }}/><rect x="436" y="262" width="60" height="22" style={{ fill: 'var(--ink)' }}/></g></g>
    <g className="wg" style={{ ['--d' as string]: '.9s' } as React.CSSProperties}><g className="mv2" data-k="26"><rect x="330" y="340" width="220" height="42" style={{ fill: 'var(--ink)' }}/><rect x="344" y="352" width="18" height="18" fill="#4B3FFF"/><text x="374" y="367" style={{ fontSize: '15px', fontWeight: 700, fill: 'var(--bg)' }}>One system, everywhere</text></g></g>
    </svg></div></div>
    </div>
    <div className="pf" aria-label="Results from identity projects">
    <div><b data-n="127" data-s="%">127%</b><span className="mono">increase in brand recognition, Codestreaks</span></div>
    <div><b data-n="48" data-d="1" data-s="/5">4.8/5</b><span className="mono">trust score, Codestreaks</span></div>
    <div><b data-n="38">38</b><span className="mono">slides of brand guidelines, Begum</span></div>
    <div><b data-n="1">1</b><span className="mono">system, from brand to live URL, Begum</span></div>
    </div>
    </section>
  );
}

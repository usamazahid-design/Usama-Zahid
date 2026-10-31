'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function LaunchAssetsInsideExact() {
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

  return (
    <section ref={sectionRef} className="pad prx" id="inside" style={{ paddingTop: 'clamp(80px,12vw,170px)' }}>
    <div className="sh"><span className="lab">What is inside</span><span className="lab">Five parts, from plan to ready files</span></div>
    <div className="px">
    <div className="pv"><div className="pvc" id="pvc" data-step="1">
    <div className="pvn"><b id="pn">01</b><span className="lab" id="pw">Part one</span><span className="pvt" id="pt">Launch plan</span></div>
    <div className="pips" role="group" aria-label="Parts"><button className="on" type="button" aria-label="Go to part 1: Launch plan"></button><button type="button" aria-label="Go to part 2: Social templates"></button><button type="button" aria-label="Go to part 3: Print collateral"></button><button type="button" aria-label="Go to part 4: One system everywhere"></button><button type="button" aria-label="Go to part 5: Ready-to-use files"></button></div>
    <svg viewBox="0 0 400 400" role="img" aria-label="Illustration of the current part of the launch assets work">
    <g className="v v1">
    <text x="50" y="108" style={{ fontSize: '13px', fill: 'var(--mute)' }}>Where the brand shows up</text>
    <g className="ck1"><rect x="50" y="128" width="22" height="22" style={{ fill: 'none', stroke: 'var(--ink)', strokeWidth: 1.6 }}/><rect className="tk" x="50" y="128" width="22" height="22" fill="#4B3FFF"/><path className="tk" d="M55 139l5 5 9-10" fill="none" stroke="#fff" strokeWidth="2.4"/><text x="88" y="145" style={{ fontSize: '16px', fill: 'var(--ink)' }}>Social profiles</text></g>
    <g className="ck1"><rect x="50" y="172" width="22" height="22" style={{ fill: 'none', stroke: 'var(--ink)', strokeWidth: 1.6 }}/><rect className="tk" x="50" y="172" width="22" height="22" fill="#4B3FFF"/><path className="tk" d="M55 183l5 5 9-10" fill="none" stroke="#fff" strokeWidth="2.4"/><text x="88" y="189" style={{ fontSize: '16px', fill: 'var(--ink)' }}>Posts and stories</text></g>
    <g className="ck1"><rect x="50" y="216" width="22" height="22" style={{ fill: 'none', stroke: 'var(--ink)', strokeWidth: 1.6 }}/><rect className="tk" x="50" y="216" width="22" height="22" fill="#4B3FFF"/><path className="tk" d="M55 227l5 5 9-10" fill="none" stroke="#fff" strokeWidth="2.4"/><text x="88" y="233" style={{ fontSize: '16px', fill: 'var(--ink)' }}>Business cards and stationery</text></g>
    <g className="ck1"><rect x="50" y="260" width="22" height="22" style={{ fill: 'none', stroke: 'var(--ink)', strokeWidth: 1.6 }}/><rect className="tk" x="50" y="260" width="22" height="22" fill="#4B3FFF"/><path className="tk" d="M55 271l5 5 9-10" fill="none" stroke="#fff" strokeWidth="2.4"/><text x="88" y="277" style={{ fontSize: '16px', fill: 'var(--ink)' }}>Flyers and posters</text></g>
    <g className="ck1"><rect x="50" y="304" width="22" height="22" style={{ fill: 'none', stroke: 'var(--ink)', strokeWidth: 1.6 }}/><rect className="tk" x="50" y="304" width="22" height="22" fill="#4B3FFF"/><path className="tk" d="M55 315l5 5 9-10" fill="none" stroke="#fff" strokeWidth="2.4"/><text x="88" y="321" style={{ fontSize: '16px', fill: 'var(--ink)' }}>Launch announcement</text></g>
    </g>
    <g className="v v2">
    <g className="sc2"><rect x="40" y="124" width="112" height="112" fill="#4B3FFF"/><circle cx="96" cy="170" r="22" fill="#fff"/><rect x="58" y="206" width="60" height="7" rx="3" fill="#fff"/><text x="40" y="256" style={{ fontSize: '12px', fill: 'var(--mute)' }}>Post</text></g>
    <g className="sc2"><rect x="170" y="110" width="84" height="150" style={{ fill: 'var(--ink)' }}/><rect x="184" y="126" width="32" height="32" fill="#4B3FFF"/><rect x="184" y="222" width="54" height="7" rx="3" style={{ fill: 'var(--bg)' }}/><text x="170" y="280" style={{ fontSize: '12px', fill: 'var(--mute)' }}>Story</text></g>
    <g className="sc2"><rect x="300" y="130" width="76" height="100" style={{ fill: 'var(--mute)' }}/><rect x="288" y="120" width="76" height="100" style={{ fill: 'var(--bg)', stroke: 'var(--ink)' }}/><rect x="276" y="110" width="76" height="100" fill="#4B3FFF"/><rect x="286" y="124" width="40" height="8" rx="4" fill="#fff"/><text x="276" y="240" style={{ fontSize: '12px', fill: 'var(--mute)' }}>Carousel</text></g>
    <g className="sc2"><circle cx="76" cy="326" r="22" style={{ fill: 'var(--ink)' }}/><rect x="62" y="312" width="12" height="12" fill="#4B3FFF"/><rect x="116" y="304" width="250" height="44" style={{ fill: 'none', stroke: 'var(--ink)' }}/><rect x="128" y="318" width="90" height="8" rx="4" style={{ fill: 'var(--ink)' }}/><text x="116" y="372" style={{ fontSize: '12px', fill: 'var(--mute)' }}>Profile and cover images</text></g>
    </g>
    <g className="v v3">
    <g className="pr3"><rect x="50" y="130" width="150" height="92" style={{ fill: 'var(--bg)', stroke: 'var(--ink)', strokeWidth: 1.5 }}/><rect x="64" y="146" width="22" height="22" style={{ fill: 'var(--ink)' }}/><rect x="76" y="158" width="14" height="14" fill="#4B3FFF"/><rect x="64" y="190" width="84" height="6" rx="3" style={{ fill: 'var(--ink)' }}/><rect x="64" y="202" width="56" height="5" rx="2" style={{ fill: 'var(--mute)' }}/><text x="50" y="244" style={{ fontSize: '12px', fill: 'var(--mute)' }}>Business card</text></g>
    <g className="pr3"><rect x="236" y="110" width="104" height="146" style={{ fill: 'var(--bg)', stroke: 'var(--ink)', strokeWidth: 1.5 }}/><rect x="248" y="126" width="22" height="22" style={{ fill: 'var(--ink)' }}/><rect x="248" y="164" width="76" height="5" rx="2" style={{ fill: 'var(--mute)' }}/><rect x="248" y="178" width="80" height="5" rx="2" style={{ fill: 'var(--mute)' }}/><rect x="248" y="192" width="64" height="5" rx="2" style={{ fill: 'var(--mute)' }}/><text x="236" y="276" style={{ fontSize: '12px', fill: 'var(--mute)' }}>Letterhead</text></g>
    <g className="pr3"><rect x="70" y="282" width="120" height="90" fill="#4B3FFF"/><circle cx="130" cy="318" r="22" fill="#fff"/><rect x="88" y="346" width="84" height="8" rx="4" fill="#fff"/><text x="206" y="330" style={{ fontSize: '12px', fill: 'var(--mute)' }}>Flyer</text></g>
    </g>
    <g className="v v4">
    <line className="sp" pathLength="1" x1="200" y1="215" x2="200" y2="124"/><line className="sp" pathLength="1" x1="200" y1="215" x2="296" y2="168"/><line className="sp" pathLength="1" x1="200" y1="215" x2="296" y2="274"/><line className="sp" pathLength="1" x1="200" y1="215" x2="104" y2="274"/><line className="sp" pathLength="1" x1="200" y1="215" x2="104" y2="168"/>
    <g className="hb"><circle cx="200" cy="215" r="40" style={{ fill: 'var(--ink)' }}/><svg x="176" y="198" width="48" height="41" viewBox="0 328 4319 3662" style={{ color: 'var(--bg)', ['--sq' as string]: '#4B3FFF' } as React.CSSProperties}><use href="#logo"/></svg></g>
    <g className="sn"><rect x="178" y="100" width="44" height="32" fill="#4B3FFF"/><text x="200" y="92" textAnchor="middle" style={{ fontSize: '12px', fill: 'var(--ink)' }}>Social</text></g>
    <g className="sn"><rect x="274" y="152" width="44" height="32" style={{ fill: 'var(--ink)' }}/><text x="296" y="144" textAnchor="middle" style={{ fontSize: '12px', fill: 'var(--ink)' }}>Print</text></g>
    <g className="sn"><rect x="274" y="258" width="44" height="32" fill="#4B3FFF"/><text x="296" y="312" textAnchor="middle" style={{ fontSize: '12px', fill: 'var(--ink)' }}>Web</text></g>
    <g className="sn"><rect x="82" y="258" width="44" height="32" style={{ fill: 'var(--ink)' }}/><text x="104" y="312" textAnchor="middle" style={{ fontSize: '12px', fill: 'var(--ink)' }}>Slides</text></g>
    <g className="sn"><rect x="82" y="152" width="44" height="32" fill="#4B3FFF"/><text x="104" y="144" textAnchor="middle" style={{ fontSize: '12px', fill: 'var(--ink)' }}>Profile</text></g>
    <text className="sn" x="200" y="372" textAnchor="middle" style={{ fontSize: '14px', fontWeight: 700, fill: 'var(--ink)' }}>One system, everywhere</text>
    </g>
    <g className="v v5">
    <g className="tp5"><rect x="44" y="150" width="120" height="120" fill="#4B3FFF"/><circle cx="104" cy="196" r="24" fill="#fff"/><rect x="66" y="234" width="76" height="8" rx="4" fill="#fff"/><text x="44" y="290" style={{ fontSize: '12px', fill: 'var(--mute)' }}>One template</text></g>
    <line className="ar5" pathLength="1" x1="176" y1="210" x2="220" y2="210" style={{ stroke: 'var(--ink)', strokeWidth: 2, strokeDasharray: '1 1' }}/>
    <g className="vr5"><rect x="232" y="120" width="130" height="52" fill="#4B3FFF"/><rect x="244" y="134" width="70" height="8" rx="4" fill="#fff"/><rect x="244" y="150" width="46" height="6" rx="3" fill="#fff"/></g>
    <g className="vr5"><rect x="232" y="184" width="130" height="52" fill="#4B3FFF"/><rect x="244" y="198" width="90" height="8" rx="4" fill="#fff"/><rect x="244" y="214" width="60" height="6" rx="3" fill="#fff"/></g>
    <g className="vr5"><rect x="232" y="248" width="130" height="52" fill="#4B3FFF"/><rect x="244" y="262" width="54" height="8" rx="4" fill="#fff"/><rect x="244" y="278" width="80" height="6" rx="3" fill="#fff"/></g>
    <text className="vr5" x="44" y="350" style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-.5px', fill: 'var(--ink)' }}>Same layout, new words.</text>
    </g>
    </svg></div></div>
    <div className="pl"><h2>What launch assets include.</h2>
    <article className="ps act" data-i="1"><span className="lab">Part one</span><h3>Launch plan</h3><p>A short list of the places the brand has to show up on launch day, so nothing important is missing.</p><ul><li>Channels and surfaces listed</li><li>Priorities set</li><li>Launch announcement planned</li></ul></article>
    <article className="ps" data-i="2"><span className="lab">Part two</span><h3>Social templates</h3><p>Post, story and carousel layouts built from your identity, plus profile and cover images.</p><ul><li>Post, story and carousel layouts</li><li>Profile and cover images</li></ul><span className="pr">Begum: social delivered together with web, print and development.</span></article>
    <article className="ps" data-i="3"><span className="lab">Part three</span><h3>Print collateral</h3><p>Business cards, stationery and flyers that carry the same colour, type and pattern as the website.</p><ul><li>Business cards and stationery</li><li>Flyers and posters</li></ul><span className="pr">Begum: print delivered as part of one Brand-to-URL project.</span></article>
    <article className="ps" data-i="4"><span className="lab">Part four</span><h3>One system, everywhere</h3><p>Every asset is built from the same system as the brand and the website, so the launch looks considered on every surface.</p><ul><li>Same colour, type and pattern</li><li>Consistent layouts across channels</li></ul><span className="pr">Codestreaks: a 127% increase in brand recognition.</span></article>
    <article className="ps" data-i="5"><span className="lab">Part five</span><h3>Ready-to-use files</h3><p>Templates that your team can reuse, so the next post or flyer keeps the same layout and only the words change.</p><ul><li>Reusable template files</li><li>Print-ready files</li></ul></article>
    </div></div>
    </section>
  );
}

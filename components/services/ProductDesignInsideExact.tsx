'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function ProductDesignInsideExact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(1);
  const [partLabel, setPartLabel] = useState('Part one');
  const [partTitle, setPartTitle] = useState('Audit');

  const titles = [
    'Flow and friction audit',
    'Flow design',
    'Interface design',
    'Design system',
    'Measured outcomes',
  ];

  const partLabels = [
    'Part one',
    'Part two',
    'Part three',
    'Part four',
    'Part five',
  ];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const pvc = el.querySelector<HTMLElement>('#pvc');
    const pn = el.querySelector<HTMLElement>('#pn');
    const pw = el.querySelector<HTMLElement>('#pw');
    const pt = el.querySelector<HTMLElement>('#pt');
    const pss = Array.from(el.querySelectorAll<HTMLElement>('.ps'));
    const pips = Array.from(el.querySelectorAll<HTMLButtonElement>('.pips button'));
    const pxs = el.querySelector<HTMLElement>('.px');
    if (!pxs || !pvc) return;

    let lastG = -1;
    const WK = partLabels;
    const V = [1, 2, 3, 4, 5].map((n) => el.querySelector<HTMLElement>(`.v${n}`));

    const pl1 = V[0]?.querySelector<SVGPolylineElement>('.pl1');
    const mk1 = V[0] ? Array.from(V[0].querySelectorAll<SVGCircleElement>('.mk1')) : [];
    const lb1 = V[0] ? Array.from(V[0].querySelectorAll<SVGTextElement>('.lb1')) : [];
    const thr = el.querySelector<SVGLineElement>('#thr');

    const bf = V[1] ? Array.from(V[1].querySelectorAll<SVGRectElement>('.bf')) : [];
    const af = V[1] ? Array.from(V[1].querySelectorAll<SVGElement>('.af')) : [];

    const v3 = V[2] ? Array.from(V[2].children) as SVGElement[] : [];
    const cp = V[3] ? Array.from(V[3].querySelectorAll<SVGGElement>('.cp')) : [];

    const oData = [
      {
        b: el.querySelector<SVGRectElement>('#o1b'),
        a: el.querySelector<SVGRectElement>('#o1a'),
        v: el.querySelector<SVGTextElement>('#o1v'),
        d: el.querySelector<SVGTextElement>('#o1d'),
        f: 0.42,
      },
      {
        b: el.querySelector<SVGRectElement>('#o2b'),
        a: el.querySelector<SVGRectElement>('#o2a'),
        v: el.querySelector<SVGTextElement>('#o2v'),
        d: el.querySelector<SVGTextElement>('#o2d'),
        f: 0.54,
      },
    ];

    const cl = (x: number) => Math.max(0, Math.min(1, x));
    const eo = (x: number) => 1 - Math.pow(1 - x, 3);
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const scrub = () => {
      const vh = window.innerHeight;
      const r0 = pxs.getBoundingClientRect();
      if (r0.bottom < -100 || r0.top > vh + 100) return;

      const c = vh * 0.47;
      let gi = 4;
      let gt = 1;

      for (let i = 0; i < pss.length; i++) {
        const r = pss[i].getBoundingClientRect();
        if (c < r.top) {
          gi = i ? i - 1 : 0;
          gt = i ? 1 : 0;
          break;
        }
        if (c < r.bottom) {
          gi = i;
          gt = (c - r.top) / r.height;
          break;
        }
      }

      const G = gi + gt;

      if (gi !== lastG) {
        lastG = gi;
        pvc.dataset.step = String(gi + 1);
        if (pn) pn.textContent = `0${gi + 1}`;
        if (pw) pw.textContent = WK[gi];
        if (pt) {
          const h3 = pss[gi]?.querySelector('h3');
          if (h3) pt.textContent = h3.textContent || '';
        }
        pips.forEach((b, j) => b.classList.toggle('on', j === gi));
        pss.forEach((x, j) => x.classList.toggle('act', j === gi));
        setActiveStep(gi + 1);
        setPartLabel(WK[gi]);
        setPartTitle(titles[gi] || '');
      }

      for (let s = 0; s < 5; s++) {
        const currentV = V[s];
        if (!currentV) continue;

        const u = G - s;
        const op = (s ? cl((u + 0.15) / 0.25) : 1) * (s < 4 ? 1 - cl((u - 0.85) / 0.25) : 1);
        const b = cl((u + (s ? 0 : 0.35)) / 0.55);

        currentV.style.opacity = op.toFixed(3);
        currentV.style.transform = 'none';

        if (op < 0.01) continue;

        if (s === 0) {
          if (pl1) pl1.style.strokeDashoffset = (1 - eo(cl(b * 2))).toFixed(3);
          if (thr) thr.style.opacity = (0.5 * eo(cl(b * 2 - 0.6))).toFixed(3);
          mk1.forEach((m, k) => {
            m.style.transform = `scale(${eo(cl(b * 2.2 - 0.9 - k * 0.25)).toFixed(3)})`;
          });
          lb1.forEach((t) => {
            t.style.opacity = eo(cl(b * 2.2 - 1.1)).toFixed(3);
          });
        } else if (s === 1) {
          bf.forEach((elem, k) => {
            const e = eo(cl(b * 3 - k * 0.2));
            elem.style.opacity = e.toFixed(3);
            elem.style.transform = `scale(${(0.6 + 0.4 * e).toFixed(3)})`;
          });
          af.forEach((elem, k) => {
            const e = eo(cl(b * 2 - 0.7 - k * 0.12));
            elem.style.opacity = e.toFixed(3);
          });
        } else if (s === 2) {
          v3.forEach((elem, k) => {
            const e = eo(cl(b * 1.9 - k / v3.length));
            elem.style.opacity = String(e);
            elem.style.transform = `translateY(${((1 - e) * 12).toFixed(1)}px)`;
          });
        } else if (s === 3) {
          cp.forEach((elem, k) => {
            const e = eo(cl(b * 2 - k * 0.18));
            elem.style.opacity = e.toFixed(3);
            elem.style.transform = `scale(${(0.7 + 0.3 * e).toFixed(3)})`;
          });
        } else if (s === 4) {
          const ap = eo(cl(b * 4 - 0.15));
          const g = eo(cl((b - 0.3) * 2.4));
          oData.forEach((o) => {
            const sc = lerp(1, o.f, g);
            if (o.b) o.b.style.transform = `scaleY(${ap})`;
            if (o.a) o.a.style.transform = `scaleY(${ap * sc})`;
            if (o.v) {
              o.v.textContent = String(Math.round(100 * sc));
              o.v.setAttribute('y', (330 - 160 * sc * ap - 12).toFixed(1));
              o.v.style.opacity = String(ap);
            }
            if (o.d) {
              o.d.style.opacity = cl((b - 0.7) * 6).toFixed(3);
            }
          });
        }
      }
    };

    let animId: number;
    const loop = () => {
      try {
        scrub();
      } catch (_) {}
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    // Pip click listeners
    const onPipClick = (index: number) => {
      pss[index]?.scrollIntoView({
        behavior: reduce ? 'auto' : 'smooth',
        block: 'center',
      });
    };

    pips.forEach((btn, index) => {
      btn.onclick = () => onPipClick(index);
    });

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section ref={containerRef} className="pad prx" id="inside" style={{ paddingTop: 'clamp(80px, 12vw, 170px)' }}>
      <div className="sh">
        <span className="lab">What is inside</span>
        <span className="lab">Five parts, from friction to result</span>
      </div>

      <div className="px">
        {/* Sticky Canvas on Left */}
        <div className="pv">
          <div className="pvc" id="pvc" data-step={activeStep}>
            <div className="pvn">
              <b id="pn">0{activeStep}</b>
              <span className="lab" id="pw">
                {partLabel}
              </span>
              <span className="pvt" id="pt">
                {partTitle}
              </span>
            </div>

            <div className="pips" role="group" aria-label="Parts">
              <button
                className={activeStep === 1 ? 'on' : ''}
                type="button"
                aria-label="Go to part 1: Flow and friction audit"
              />
              <button
                className={activeStep === 2 ? 'on' : ''}
                type="button"
                aria-label="Go to part 2: Flow design"
              />
              <button
                className={activeStep === 3 ? 'on' : ''}
                type="button"
                aria-label="Go to part 3: Interface design"
              />
              <button
                className={activeStep === 4 ? 'on' : ''}
                type="button"
                aria-label="Go to part 4: Design system"
              />
              <button
                className={activeStep === 5 ? 'on' : ''}
                type="button"
                aria-label="Go to part 5: Measured outcomes"
              />
            </div>

            <svg viewBox="0 0 400 400" role="img" aria-label="Illustration of the current part of the product design work">
              {/* Scene 1: Friction by Step Graph */}
              <g className="v v1">
                <text x="50" y="108" style={{ fontSize: '13px', fill: 'var(--mute)' }}>
                  Friction by step
                </text>
                <line
                  x1="40"
                  y1="330"
                  x2="360"
                  y2="330"
                  style={{ stroke: 'var(--ink)', strokeWidth: 1.5, opacity: 0.5 }}
                />
                <line
                  id="thr"
                  x1="40"
                  y1="200"
                  x2="360"
                  y2="200"
                  style={{ stroke: 'var(--ink)', strokeWidth: 1, strokeDasharray: '5 4', opacity: 0.5 }}
                />
                <polyline
                  className="pl1"
                  pathLength={1}
                  points="50,290 100,250 150,170 200,260 250,140 300,230 350,200"
                />
                <circle className="mk1" cx="150" cy="170" r="11" fill="#4B3FFF" />
                <circle className="mk1" cx="250" cy="140" r="11" fill="#4B3FFF" />
                <text
                  className="lb1"
                  x="150"
                  y="146"
                  textAnchor="middle"
                  style={{ fontSize: '12px', fontWeight: 700, fill: 'var(--ink)' }}
                >
                  Extra step
                </text>
                <text
                  className="lb1"
                  x="250"
                  y="116"
                  textAnchor="middle"
                  style={{ fontSize: '12px', fontWeight: 700, fill: 'var(--ink)' }}
                >
                  Unclear label
                </text>
                <text className="lb1" x="40" y="192" style={{ fontSize: '11px', fill: 'var(--mute)' }}>
                  Where users slow down
                </text>
                <text x="50" y="350" style={{ fontSize: '11px', fill: 'var(--mute)' }}>1</text>
                <text x="100" y="350" style={{ fontSize: '11px', fill: 'var(--mute)' }}>2</text>
                <text x="150" y="350" style={{ fontSize: '11px', fill: 'var(--mute)' }}>3</text>
                <text x="200" y="350" style={{ fontSize: '11px', fill: 'var(--mute)' }}>4</text>
                <text x="250" y="350" style={{ fontSize: '11px', fill: 'var(--mute)' }}>5</text>
                <text x="300" y="350" style={{ fontSize: '11px', fill: 'var(--mute)' }}>6</text>
                <text x="350" y="350" style={{ fontSize: '11px', fill: 'var(--mute)' }}>7</text>
              </g>

              {/* Scene 2: Flow Design (Before vs After) */}
              <g className="v v2">
                <text x="44" y="136" style={{ fontSize: '13px', fill: 'var(--mute)' }}>
                  Before
                </text>
                <rect className="bf" x="44" y="146" width="40" height="40" style={{ fill: 'var(--mute)' }} />
                <rect className="bf" x="96" y="146" width="40" height="40" style={{ fill: 'var(--mute)' }} />
                <rect className="bf" x="148" y="146" width="40" height="40" style={{ fill: 'var(--mute)' }} />
                <rect className="bf" x="200" y="146" width="40" height="40" style={{ fill: 'var(--mute)' }} />
                <rect className="bf" x="252" y="146" width="40" height="40" style={{ fill: 'var(--mute)' }} />
                <rect className="bf" x="304" y="146" width="40" height="40" style={{ fill: 'var(--mute)' }} />

                <text className="af" x="44" y="236" style={{ fontSize: '13px', fill: 'var(--mute)' }}>
                  After
                </text>
                <rect className="af" x="44" y="246" width="72" height="40" fill="#4B3FFF" />
                <rect className="af" x="136" y="246" width="72" height="40" fill="#4B3FFF" />
                <rect className="af" x="228" y="246" width="72" height="40" fill="#4B3FFF" />
                <line
                  className="af"
                  x1="116"
                  y1="266"
                  x2="136"
                  y2="266"
                  style={{ stroke: 'var(--ink)', strokeWidth: 2 }}
                />
                <line
                  className="af"
                  x1="208"
                  y1="266"
                  x2="228"
                  y2="266"
                  style={{ stroke: 'var(--ink)', strokeWidth: 2 }}
                />
                <text
                  className="af"
                  x="44"
                  y="340"
                  style={{
                    fontSize: '30px',
                    fontWeight: 700,
                    letterSpacing: '-1px',
                    fill: 'var(--ink)',
                  }}
                >
                  Fewer steps, same goal.
                </text>
              </g>

              {/* Scene 3: Interface Design Layout */}
              <g className="v v3">
                <rect
                  x="30"
                  y="104"
                  width="340"
                  height="250"
                  style={{ fill: 'var(--bg)', stroke: 'var(--ink)', strokeWidth: 1.6 }}
                />
                <rect x="30" y="104" width="64" height="250" style={{ fill: 'var(--ink)' }} />
                <rect x="42" y="120" width="16" height="16" fill="#4B3FFF" />
                <rect
                  x="42"
                  y="156"
                  width="40"
                  height="6"
                  rx="3"
                  style={{ fill: 'var(--bg)', opacity: 0.6 }}
                />
                <rect
                  x="42"
                  y="176"
                  width="34"
                  height="6"
                  rx="3"
                  style={{ fill: 'var(--bg)', opacity: 0.6 }}
                />
                <rect
                  x="42"
                  y="196"
                  width="40"
                  height="6"
                  rx="3"
                  style={{ fill: 'var(--bg)', opacity: 0.6 }}
                />
                <rect x="110" y="120" width="100" height="10" rx="5" style={{ fill: 'var(--mute)' }} />
                <rect
                  x="108"
                  y="146"
                  width="76"
                  height="52"
                  style={{ fill: 'none', stroke: 'var(--line)' }}
                />
                <rect
                  x="194"
                  y="146"
                  width="76"
                  height="52"
                  style={{ fill: 'none', stroke: 'var(--line)' }}
                />
                <rect
                  x="280"
                  y="146"
                  width="76"
                  height="52"
                  style={{ fill: 'none', stroke: 'var(--line)' }}
                />
                <rect x="118" y="160" width="40" height="14" style={{ fill: 'var(--ink)' }} />
                <rect x="204" y="160" width="40" height="14" style={{ fill: 'var(--ink)' }} />
                <rect x="290" y="160" width="40" height="14" style={{ fill: 'var(--ink)' }} />
                <rect x="118" y="182" width="24" height="6" rx="3" fill="#4B3FFF" />
                <rect
                  x="108"
                  y="214"
                  width="150"
                  height="124"
                  style={{ fill: 'none', stroke: 'var(--line)' }}
                />
                <rect x="120" y="300" width="16" height="30" style={{ fill: 'var(--line)' }} />
                <rect x="144" y="280" width="16" height="50" style={{ fill: 'var(--line)' }} />
                <rect x="168" y="290" width="16" height="40" style={{ fill: 'var(--line)' }} />
                <rect x="192" y="262" width="16" height="68" style={{ fill: 'var(--line)' }} />
                <rect x="216" y="240" width="16" height="90" fill="#4B3FFF" />
                <rect
                  x="268"
                  y="214"
                  width="88"
                  height="124"
                  style={{ fill: 'none', stroke: 'var(--line)' }}
                />
                <rect x="278" y="228" width="60" height="6" rx="3" style={{ fill: 'var(--mute)' }} />
                <rect x="278" y="250" width="68" height="6" rx="3" style={{ fill: 'var(--mute)' }} />
                <rect x="278" y="272" width="52" height="6" rx="3" style={{ fill: 'var(--mute)' }} />
                <rect x="278" y="294" width="64" height="6" rx="3" style={{ fill: 'var(--mute)' }} />
              </g>

              {/* Scene 4: Design System Components & Tokens */}
              <g className="v v4">
                <g className="cp">
                  <rect x="44" y="116" width="100" height="78" style={{ fill: 'none', stroke: 'var(--line)' }} />
                  <rect x="62" y="144" width="64" height="22" fill="#4B3FFF" />
                  <rect x="78" y="152" width="32" height="6" rx="3" fill="#fff" />
                </g>
                <g className="cp">
                  <rect x="156" y="116" width="100" height="78" style={{ fill: 'none', stroke: 'var(--line)' }} />
                  <rect
                    x="170"
                    y="144"
                    width="72"
                    height="22"
                    style={{ fill: 'none', stroke: 'var(--ink)' }}
                  />
                  <rect x="176" y="149" width="2" height="12" style={{ fill: 'var(--ink)' }} />
                </g>
                <g className="cp">
                  <rect x="268" y="116" width="100" height="78" style={{ fill: 'none', stroke: 'var(--line)' }} />
                  <rect x="290" y="146" width="56" height="20" rx="10" fill="#4B3FFF" />
                  <circle cx="336" cy="156" r="7" fill="#fff" />
                </g>
                <g className="cp">
                  <rect x="44" y="206" width="100" height="78" style={{ fill: 'none', stroke: 'var(--line)' }} />
                  <rect x="58" y="220" width="72" height="50" style={{ fill: 'var(--ink)' }} />
                  <rect x="66" y="230" width="36" height="6" rx="3" style={{ fill: 'var(--bg)' }} />
                  <rect x="66" y="246" width="52" height="5" rx="2" style={{ fill: 'var(--mute)' }} />
                </g>
                <g className="cp">
                  <rect x="156" y="206" width="100" height="78" style={{ fill: 'none', stroke: 'var(--line)' }} />
                  <rect x="170" y="236" width="36" height="16" rx="8" style={{ fill: 'var(--ink)' }} />
                  <rect x="212" y="236" width="30" height="16" rx="8" fill="#4B3FFF" />
                </g>
                <g className="cp">
                  <rect x="268" y="206" width="100" height="78" style={{ fill: 'none', stroke: 'var(--line)' }} />
                  <circle cx="294" cy="245" r="14" fill="#4B3FFF" />
                  <rect x="316" y="238" width="40" height="6" rx="3" style={{ fill: 'var(--ink)' }} />
                  <rect x="316" y="250" width="28" height="5" rx="2" style={{ fill: 'var(--mute)' }} />
                </g>
                <g className="cp">
                  <text x="44" y="316" style={{ fontSize: '13px', fill: 'var(--mute)' }}>
                    Tokens
                  </text>
                  <rect x="44" y="326" width="30" height="30" style={{ fill: 'var(--ink)' }} />
                  <rect x="82" y="326" width="30" height="30" fill="#4B3FFF" />
                  <rect x="120" y="326" width="30" height="30" style={{ fill: 'var(--mute)' }} />
                  <rect
                    x="158"
                    y="326"
                    width="30"
                    height="30"
                    style={{ fill: 'var(--bg)', stroke: 'var(--ink)' }}
                  />
                </g>
              </g>

              {/* Scene 5: Measured Outcomes Before vs After */}
              <g className="v v5">
                <text x="40" y="108" style={{ fontSize: '13px', fill: 'var(--mute)' }}>
                  Index, before = 100
                </text>
                <line
                  x1="40"
                  y1="330"
                  x2="360"
                  y2="330"
                  style={{ stroke: 'var(--ink)', strokeWidth: 1.5, opacity: 0.5 }}
                />
                <rect id="o1b" className="bar5" x="70" y="170" width="52" height="160" style={{ fill: 'var(--mute)' }} />
                <rect id="o1a" className="bar5" x="132" y="170" width="52" height="160" fill="#4B3FFF" />
                <rect id="o2b" className="bar5" x="226" y="170" width="52" height="160" style={{ fill: 'var(--mute)' }} />
                <rect id="o2a" className="bar5" x="288" y="170" width="52" height="160" fill="#4B3FFF" />

                <text
                  id="o1v"
                  x="158"
                  y="158"
                  textAnchor="middle"
                  style={{ fontSize: '18px', fontWeight: 700, fill: 'var(--ink)' }}
                >
                  100
                </text>
                <text
                  id="o2v"
                  x="314"
                  y="158"
                  textAnchor="middle"
                  style={{ fontSize: '18px', fontWeight: 700, fill: 'var(--ink)' }}
                >
                  100
                </text>

                <text x="96" y="350" textAnchor="middle" style={{ fontSize: '12px', fill: 'var(--ink)' }}>
                  Before
                </text>
                <text x="158" y="350" textAnchor="middle" style={{ fontSize: '12px', fill: 'var(--ink)' }}>
                  After
                </text>
                <text x="252" y="350" textAnchor="middle" style={{ fontSize: '12px', fill: 'var(--ink)' }}>
                  Before
                </text>
                <text x="314" y="350" textAnchor="middle" style={{ fontSize: '12px', fill: 'var(--ink)' }}>
                  After
                </text>

                <text x="70" y="376" style={{ fontSize: '12px', fill: 'var(--mute)' }}>
                  Accounting errors
                </text>
                <text x="226" y="376" style={{ fontSize: '12px', fill: 'var(--mute)' }}>
                  Invoice entry time
                </text>

                <text
                  id="o1d"
                  x="158"
                  y="126"
                  textAnchor="middle"
                  style={{ fontSize: '20px', fontWeight: 700, fill: '#4B3FFF' }}
                >
                  −58%
                </text>
                <text
                  id="o2d"
                  x="314"
                  y="126"
                  textAnchor="middle"
                  style={{ fontSize: '20px', fontWeight: 700, fill: '#4B3FFF' }}
                >
                  −46%
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* 5 Step Articles on Right */}
        <div className="pl">
          <h2>What product and UX design includes.</h2>

          <article className="ps act" data-i="1">
            <span className="lab">Part one</span>
            <h3>Flow and friction audit</h3>
            <p>
              A map of the journey, with the steps where users slow down, hesitate or give up marked clearly.
            </p>
            <ul>
              <li>Journey and flow map</li>
              <li>Friction points ranked</li>
              <li>Decision points reviewed</li>
            </ul>
          </article>

          <article className="ps" data-i="2">
            <span className="lab">Part two</span>
            <h3>Flow design</h3>
            <p>
              The same goal reached in fewer steps. Every choice that does not help the user finish is removed or
              simplified.
            </p>
            <ul>
              <li>Redesigned flows</li>
              <li>Simpler choices</li>
              <li>Clear next steps</li>
            </ul>
            <span className="pr">
              Strong Rental Cars Qatar: six booking steps cut to three.
            </span>
          </article>

          <article className="ps" data-i="3">
            <span className="lab">Part three</span>
            <h3>Interface design</h3>
            <p>
              Screens for web and mobile that make the new flows easy to follow, in your brand.
            </p>
            <ul>
              <li>Screen design for web and mobile</li>
              <li>Interaction details</li>
              <li>States and edge cases</li>
            </ul>
          </article>

          <article className="ps" data-i="4">
            <span className="lab">Part four</span>
            <h3>Design system</h3>
            <p>
              A shared set of components and tokens, so the product stays consistent as the team grows it.
            </p>
            <ul>
              <li>Component library</li>
              <li>Colour, type and spacing tokens</li>
            </ul>
          </article>

          <article className="ps" data-i="5">
            <span className="lab">Part five</span>
            <h3>Measured outcomes</h3>
            <p>
              Results are checked against the friction you started with, so the change shows up in the numbers.
            </p>
            <ul>
              <li>A baseline to compare against</li>
              <li>Measures that track the result</li>
            </ul>
            <span className="pr">
              Petrozen ERP: 58% fewer accounting errors, 46% less time on invoice entry.
            </span>
          </article>
        </div>
      </div>
    </section>
  );
}

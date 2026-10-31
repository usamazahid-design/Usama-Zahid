'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function WebEngineeringInsideExact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(1);
  const [partLabel, setPartLabel] = useState('Part one');
  const [partTitle, setPartTitle] = useState('Structure');

  const titles = [
    'Structure and copy direction',
    'Responsive design',
    'Components and flows',
    'Development',
    'Launch',
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

    const v1l = V[0] ? Array.from(V[0].querySelectorAll<SVGLineElement>('.ln2')) : [];
    const v1n = V[0] ? Array.from(V[0].querySelectorAll<SVGGElement>('.nn')) : [];
    const cpy1 = el.querySelector<SVGTextElement>('#cpy1');
    const v2 = V[1] ? Array.from(V[1].querySelectorAll<SVGElement>('.fr2')) : [];

    const FN = [0, 1, 2, 3, 4, 5].map((i) => el.querySelector<SVGGElement>(`#f${i}`));
    const FX0 = [50, 110, 170, 230, 290, 350];
    const FK = [0, 3, 5];
    const FX1 = [100, 200, 300];
    const fl3 = el.querySelector<SVGLineElement>('#fl3');
    const fbig = el.querySelector<SVGTextElement>('#fbig');

    const b4Container = V[3]?.querySelector('.b4');
    const b4 = b4Container ? Array.from(b4Container.children) as SVGElement[] : [];
    const pb4 = el.querySelector<SVGRectElement>('#pb4');
    const lv4 = el.querySelector<SVGGElement>('#lv4');

    const cur5 = el.querySelector<SVGRectElement>('#cur5');
    const ck = V[4] ? Array.from(V[4].querySelectorAll<SVGGElement>('.ck')) : [];
    const lv5 = el.querySelector<SVGGElement>('#lv5');

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
          v1l.forEach((l, k) => {
            l.style.strokeDashoffset = (1 - eo(cl(b * 2 - 0.3 - k * 0.15))).toFixed(3);
          });
          v1n.forEach((n, k) => {
            n.style.transform = `scale(${eo(cl(b * 2.2 - k * 0.2)).toFixed(3)})`;
          });
          if (cpy1) cpy1.style.opacity = cl(b * 2 - 1).toFixed(3);
        } else if (s === 1) {
          v2.forEach((elem, k) => {
            const e = eo(cl(b * 2 - k * 0.25));
            elem.style.opacity = e.toFixed(3);
            elem.style.transform = `translateY(${((1 - e) * 24).toFixed(1)}px)`;
          });
        } else if (s === 2) {
          const ap = eo(cl(b * 4));
          const t = eo(cl((b - 0.3) * 2));
          FN.forEach((n, k) => {
            if (!n) return;
            const q = FK.indexOf(k);
            if (q > -1) {
              n.style.transform = `translate(${((FX1[q] - FX0[k]) * t).toFixed(1)}px, 0)`;
              n.style.opacity = String(ap);
              const txt = n.querySelector('text');
              if (txt) txt.textContent = String(t > 0.5 ? q + 1 : k + 1);
            } else {
              n.style.transform = `scale(${1 - cl(t * 1.6)})`;
              n.style.transformBox = 'fill-box';
              n.style.transformOrigin = 'center';
              n.style.opacity = String(ap * (1 - cl(t * 1.6)));
            }
          });
          if (fl3) {
            fl3.setAttribute('x1', String(lerp(50, 100, t)));
            fl3.setAttribute('x2', String(lerp(350, 300, t)));
          }
          if (fbig) {
            fbig.textContent = t > 0.5 ? '3 steps' : '6 steps';
            fbig.style.opacity = String(ap);
          }
        } else if (s === 3) {
          b4.forEach((elem, k) => {
            const e = eo(cl(b * 1.9 - k / b4.length));
            elem.style.opacity = String(e);
            elem.style.transform = `translateY(${((1 - e) * 14).toFixed(1)}px)`;
          });
          if (pb4) {
            pb4.style.transform = `scaleX(${eo(cl((b - 0.35) * 1.6)).toFixed(3)})`;
          }
          if (lv4) {
            lv4.style.opacity = cl((b - 0.85) * 7).toFixed(3);
          }
        } else if (s === 4) {
          if (cur5) {
            cur5.setAttribute('width', (230 * eo(cl(b * 2))).toFixed(1));
          }
          ck.forEach((elem, k) => {
            const e = eo(cl(b * 2.2 - 0.5 - k * 0.3));
            elem.style.opacity = e.toFixed(3);
            elem.style.transform = `translateX(${((1 - e) * 20).toFixed(1)}px)`;
          });
          if (lv5) {
            lv5.style.opacity = eo(cl((b - 0.8) * 5)).toFixed(3);
          }
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
        <span className="lab">Five parts, from structure to go-live</span>
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
                aria-label="Go to part 1: Structure and copy direction"
              />
              <button
                className={activeStep === 2 ? 'on' : ''}
                type="button"
                aria-label="Go to part 2: Responsive design"
              />
              <button
                className={activeStep === 3 ? 'on' : ''}
                type="button"
                aria-label="Go to part 3: Components and flows"
              />
              <button
                className={activeStep === 4 ? 'on' : ''}
                type="button"
                aria-label="Go to part 4: Development"
              />
              <button
                className={activeStep === 5 ? 'on' : ''}
                type="button"
                aria-label="Go to part 5: Launch"
              />
            </div>

            <svg viewBox="0 0 400 400" role="img" aria-label="Illustration of the current part of the website build">
              {/* Scene 1: Structure Sitemap */}
              <g className="v v1">
                <line className="ln2" pathLength="1" x1="200" y1="130" x2="70" y2="190" />
                <line className="ln2" pathLength="1" x1="200" y1="130" x2="150" y2="190" />
                <line className="ln2" pathLength="1" x1="200" y1="130" x2="230" y2="190" />
                <line className="ln2" pathLength="1" x1="200" y1="130" x2="310" y2="190" />
                <line className="ln2" pathLength="1" x1="70" y1="220" x2="57" y2="280" />
                <line className="ln2" pathLength="1" x1="70" y1="220" x2="138" y2="280" />
                <g className="nn">
                  <rect x="160" y="100" width="80" height="30" fill="#4B3FFF" />
                  <text x="200" y="120" textAnchor="middle" style={{ fontSize: '12px', fontWeight: 700, fill: '#fff' }}>
                    Home
                  </text>
                </g>
                <g className="nn">
                  <rect x="30" y="190" width="80" height="30" style={{ fill: 'var(--ink)' }} />
                  <text
                    x="70"
                    y="210"
                    textAnchor="middle"
                    style={{ fontSize: '12px', fontWeight: 600, fill: 'var(--bg)' }}
                  >
                    Services
                  </text>
                </g>
                <g className="nn">
                  <rect x="110" y="190" width="80" height="30" style={{ fill: 'var(--ink)' }} />
                  <text
                    x="150"
                    y="210"
                    textAnchor="middle"
                    style={{ fontSize: '12px', fontWeight: 600, fill: 'var(--bg)' }}
                  >
                    Work
                  </text>
                </g>
                <g className="nn">
                  <rect x="190" y="190" width="80" height="30" style={{ fill: 'var(--ink)' }} />
                  <text
                    x="230"
                    y="210"
                    textAnchor="middle"
                    style={{ fontSize: '12px', fontWeight: 600, fill: 'var(--bg)' }}
                  >
                    About
                  </text>
                </g>
                <g className="nn">
                  <rect x="270" y="190" width="80" height="30" style={{ fill: 'var(--ink)' }} />
                  <text
                    x="310"
                    y="210"
                    textAnchor="middle"
                    style={{ fontSize: '12px', fontWeight: 600, fill: 'var(--bg)' }}
                  >
                    Contact
                  </text>
                </g>
                <g className="nn">
                  <rect x="22" y="280" width="70" height="28" style={{ fill: 'none', stroke: 'var(--ink)' }} />
                  <text
                    x="57"
                    y="298"
                    textAnchor="middle"
                    style={{ fontSize: '11px', fill: 'var(--ink)' }}
                  >
                    Brand
                  </text>
                </g>
                <g className="nn">
                  <rect x="100" y="280" width="76" height="28" style={{ fill: 'none', stroke: 'var(--ink)' }} />
                  <text
                    x="138"
                    y="298"
                    textAnchor="middle"
                    style={{ fontSize: '11px', fill: 'var(--ink)' }}
                  >
                    Website
                  </text>
                </g>
                <text id="cpy1" x="210" y="296" style={{ fontSize: '12px', fill: 'var(--mute)' }}>
                  Pages, order and words
                </text>
              </g>

              {/* Scene 2: Responsive Design Devices */}
              <g className="v v2">
                <g className="fr2">
                  <rect
                    x="40"
                    y="130"
                    width="190"
                    height="125"
                    style={{ fill: 'var(--bg)', stroke: 'var(--ink)', strokeWidth: 1.6 }}
                  />
                  <rect x="54" y="148" width="90" height="12" style={{ fill: 'var(--ink)' }} />
                  <rect x="54" y="170" width="120" height="6" style={{ fill: 'var(--mute)' }} />
                  <rect x="54" y="206" width="52" height="22" fill="#4B3FFF" />
                  <rect x="150" y="190" width="64" height="46" style={{ fill: 'var(--ink)' }} />
                </g>
                <g className="fr2">
                  <rect
                    x="200"
                    y="190"
                    width="110"
                    height="150"
                    rx="8"
                    style={{ fill: 'var(--bg)', stroke: 'var(--ink)', strokeWidth: 1.6 }}
                  />
                  <rect x="212" y="206" width="60" height="10" style={{ fill: 'var(--ink)' }} />
                  <rect x="212" y="226" width="86" height="6" style={{ fill: 'var(--mute)' }} />
                  <rect x="212" y="256" width="86" height="40" fill="#4B3FFF" />
                </g>
                <g className="fr2">
                  <rect
                    x="318"
                    y="236"
                    width="56"
                    height="110"
                    rx="10"
                    style={{ fill: 'var(--bg)', stroke: 'var(--ink)', strokeWidth: 1.6 }}
                  />
                  <rect x="326" y="250" width="30" height="8" style={{ fill: 'var(--ink)' }} />
                  <rect x="326" y="268" width="40" height="30" fill="#4B3FFF" />
                </g>
                <text className="fr2" x="40" y="280" style={{ fontSize: '12px', fill: 'var(--mute)' }}>
                  Desktop
                </text>
                <text className="fr2" x="200" y="362" style={{ fontSize: '12px', fill: 'var(--mute)' }}>
                  Tablet
                </text>
                <text className="fr2" x="318" y="362" style={{ fontSize: '12px', fill: 'var(--mute)' }}>
                  Phone
                </text>
              </g>

              {/* Scene 3: Booking Steps Reduction (6 to 3) */}
              <g className="v v3">
                <text x="50" y="130" style={{ fontSize: '13px', fill: 'var(--mute)' }}>
                  Booking steps
                </text>
                <line
                  id="fl3"
                  x1="50"
                  y1="190"
                  x2="350"
                  y2="190"
                  style={{ stroke: 'var(--ink)', strokeWidth: 1.5, opacity: 0.5 }}
                />
                <g id="f0" className="fn3">
                  <circle cx="50" cy="190" r="18" style={{ fill: 'var(--ink)' }} />
                  <text
                    x="50"
                    y="195"
                    textAnchor="middle"
                    style={{ fontSize: '14px', fontWeight: 700, fill: 'var(--bg)' }}
                  >
                    1
                  </text>
                </g>
                <g id="f1" className="fn3">
                  <circle cx="110" cy="190" r="18" style={{ fill: 'var(--ink)' }} />
                  <text
                    x="110"
                    y="195"
                    textAnchor="middle"
                    style={{ fontSize: '14px', fontWeight: 700, fill: 'var(--bg)' }}
                  >
                    2
                  </text>
                </g>
                <g id="f2" className="fn3">
                  <circle cx="170" cy="190" r="18" style={{ fill: 'var(--ink)' }} />
                  <text
                    x="170"
                    y="195"
                    textAnchor="middle"
                    style={{ fontSize: '14px', fontWeight: 700, fill: 'var(--bg)' }}
                  >
                    3
                  </text>
                </g>
                <g id="f3" className="fn3">
                  <circle cx="230" cy="190" r="18" style={{ fill: 'var(--ink)' }} />
                  <text
                    x="230"
                    y="195"
                    textAnchor="middle"
                    style={{ fontSize: '14px', fontWeight: 700, fill: 'var(--bg)' }}
                  >
                    4
                  </text>
                </g>
                <g id="f4" className="fn3">
                  <circle cx="290" cy="190" r="18" style={{ fill: 'var(--ink)' }} />
                  <text
                    x="290"
                    y="195"
                    textAnchor="middle"
                    style={{ fontSize: '14px', fontWeight: 700, fill: 'var(--bg)' }}
                  >
                    5
                  </text>
                </g>
                <g id="f5" className="fn3">
                  <circle cx="350" cy="190" r="18" fill="#4B3FFF" />
                  <text
                    x="350"
                    y="195"
                    textAnchor="middle"
                    style={{ fontSize: '14px', fontWeight: 700, fill: '#fff' }}
                  >
                    6
                  </text>
                </g>
                <text
                  id="fbig"
                  x="46"
                  y="310"
                  style={{
                    fontSize: '56px',
                    fontWeight: 700,
                    letterSpacing: '-2px',
                    fill: 'var(--ink)',
                  }}
                >
                  6 steps
                </text>
              </g>

              {/* Scene 4: Development & Deployment Progress */}
              <g className="v v4">
                <g className="b4">
                  <rect
                    x="30"
                    y="104"
                    width="340"
                    height="250"
                    style={{ fill: 'var(--bg)', stroke: 'var(--ink)', strokeWidth: 1.6 }}
                  />
                  <rect x="42" y="116" width="7" height="7" style={{ fill: 'var(--ink)' }} />
                  <rect x="54" y="116" width="7" height="7" style={{ fill: 'var(--ink)' }} />
                  <rect x="66" y="116" width="7" height="7" fill="#4B3FFF" />
                  <rect x="46" y="146" width="14" height="14" style={{ fill: 'var(--ink)' }} />
                  <rect x="46" y="180" width="150" height="16" style={{ fill: 'var(--ink)' }} />
                  <rect x="46" y="204" width="110" height="16" style={{ fill: 'var(--ink)' }} />
                  <rect x="46" y="234" width="130" height="6" rx="3" style={{ fill: 'var(--mute)' }} />
                  <rect x="46" y="266" width="92" height="28" fill="#4B3FFF" />
                  <path d="M210 300V176A124 124 0 0 1 334 300Z" style={{ fill: 'var(--ink)' }} />
                  <rect x="296" y="262" width="38" height="38" fill="#4B3FFF" />
                  <rect x="46" y="312" width="96" height="30" style={{ fill: 'var(--ink)' }} />
                  <rect x="152" y="312" width="96" height="30" fill="#4B3FFF" />
                  <rect x="258" y="312" width="96" height="30" style={{ fill: 'var(--ink)' }} />
                </g>
                <rect
                  x="30"
                  y="368"
                  width="340"
                  height="6"
                  style={{ fill: 'none', stroke: 'var(--ink)' }}
                />
                <rect
                  id="pb4"
                  x="30"
                  y="368"
                  width="340"
                  height="6"
                  fill="#4B3FFF"
                  style={{ transformBox: 'fill-box', transformOrigin: '0 50%' }}
                />
                <g id="lv4">
                  <circle cx="48" cy="394" r="5" fill="#2BD97C" />
                  <text x="60" y="398" style={{ fontSize: '12px', fontWeight: 700, fill: 'var(--ink)' }}>
                    Deployed
                  </text>
                </g>
              </g>

              {/* Scene 5: Launch & Checklist */}
              <g className="v v5">
                <rect
                  x="60"
                  y="120"
                  width="280"
                  height="34"
                  rx="17"
                  style={{ fill: 'none', stroke: 'var(--ink)', strokeWidth: 1.6 }}
                />
                <clipPath id="cu5">
                  <rect id="cur5" x="60" y="110" width="0" height="54" />
                </clipPath>
                <text
                  x="84"
                  y="143"
                  clipPath="url(#cu5)"
                  style={{ fontSize: '18px', fontWeight: 600, fill: 'var(--ink)' }}
                >
                  yourbrand.com
                </text>
                <g className="ck">
                  <rect x="60" y="200" width="20" height="20" fill="#4B3FFF" />
                  <path d="M64 210l4 4 8-9" fill="none" stroke="#fff" strokeWidth="2.4" />
                  <text x="94" y="216" style={{ fontSize: '16px', fill: 'var(--ink)' }}>
                    Tested across devices
                  </text>
                </g>
                <g className="ck">
                  <rect x="60" y="240" width="20" height="20" fill="#4B3FFF" />
                  <path d="M64 250l4 4 8-9" fill="none" stroke="#fff" strokeWidth="2.4" />
                  <text x="94" y="256" style={{ fontSize: '16px', fill: 'var(--ink)' }}>
                    Fixes and final polish
                  </text>
                </g>
                <g className="ck">
                  <rect x="60" y="280" width="20" height="20" fill="#4B3FFF" />
                  <path d="M64 290l4 4 8-9" fill="none" stroke="#fff" strokeWidth="2.4" />
                  <text x="94" y="296" style={{ fontSize: '16px', fill: 'var(--ink)' }}>
                    Go-live
                  </text>
                </g>
                <g id="lv5">
                  <rect x="60" y="326" width="110" height="38" style={{ fill: 'var(--ink)' }} />
                  <circle cx="82" cy="345" r="7" fill="#2BD97C" />
                  <text
                    x="98"
                    y="351"
                    style={{ fontSize: '16px', fontWeight: 700, fill: 'var(--bg)' }}
                  >
                    Live
                  </text>
                </g>
              </g>
            </svg>
          </div>
        </div>

        {/* 5 Step Articles on Right */}
        <div className="pl">
          <h2>What a production-ready website includes.</h2>

          <article className="ps act" data-i="1">
            <span className="lab">Part one</span>
            <h3>Structure and copy direction</h3>
            <p>The pages, the order of the story and the words each page needs, settled before any layout is drawn.</p>
            <ul>
              <li>Site map</li>
              <li>Page structure</li>
              <li>Copy direction</li>
            </ul>
          </article>

          <article className="ps" data-i="2">
            <span className="lab">Part two</span>
            <h3>Responsive design</h3>
            <p>One layout system that works on a phone, a tablet and a desktop, designed screen by screen.</p>
            <ul>
              <li>Layouts for every screen size</li>
              <li>Type and spacing scale</li>
              <li>Touch-friendly interactions</li>
            </ul>
          </article>

          <article className="ps" data-i="3">
            <span className="lab">Part three</span>
            <h3>Components and flows</h3>
            <p>Reusable components and flows that remove steps, so visitors finish what they came to do.</p>
            <ul>
              <li>Component kit</li>
              <li>Flow design</li>
              <li>Forms and calls to action</li>
            </ul>
            <span className="pr">
              Strong Rental Cars Qatar: six booking steps cut to three, 58% more completed bookings.
            </span>
          </article>

          <article className="ps" data-i="4">
            <span className="lab">Part four</span>
            <h3>Development</h3>
            <p>Built by the same person who designed it, so what ships matches what was designed.</p>
            <ul>
              <li>Front-end development</li>
              <li>Brand colour, type and pattern applied</li>
              <li>Content added and checked</li>
            </ul>
            <span className="pr">
              Begum: web and development delivered together with identity, social and print.
            </span>
          </article>

          <article className="ps" data-i="5">
            <span className="lab">Part five</span>
            <h3>Launch</h3>
            <p>Testing, fixes and go-live, so the site goes out finished instead of nearly there.</p>
            <ul>
              <li>Cross-device testing</li>
              <li>Fixes and final polish</li>
              <li>Go-live</li>
            </ul>
            <span className="pr">
              Four weeks from the first conversation to a live URL.
            </span>
          </article>
        </div>
      </div>
    </section>
  );
}

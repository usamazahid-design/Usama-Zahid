'use client';

import React, { useEffect, useRef, useState } from 'react';

const PART_LABELS = ['Part one', 'Part two', 'Part three', 'Part four', 'Part five'];
const PART_TITLES = [
  'Positioning and messaging',
  'Logo system',
  'Colour and type',
  'Custom pattern',
  'Brand guidelines',
];

export default function BrandIdentityInsideExact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

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
    if (!pvc || !pn || !pw || !pt || !pxs || pss.length === 0) return;

    const V = [1, 2, 3, 4, 5].map((n) => el.querySelector<SVGGraphicsElement>('.v' + n));
    if (V.some((v) => !v)) return;

    // V1 elements
    const v1l = Array.from(V[0]!.querySelectorAll<SVGLineElement>('.ax'));
    const v1g = Array.from(V[0]!.querySelectorAll<SVGCircleElement>('.gd'));
    const bdot = V[0]!.querySelector<SVGCircleElement>('#bdot');
    const bring = V[0]!.querySelector<SVGCircleElement>('#bring');
    const blab = V[0]!.querySelector<SVGTextElement>('#blab');
    const v1t = Array.from(V[0]!.querySelectorAll<SVGTextElement>('text:not(#blab)'));

    // V2 elements
    const v2p = Array.from(V[1]!.querySelectorAll<SVGGraphicsElement>('.lp'));
    const v2s = Array.from(V[1]!.querySelectorAll<SVGGraphicsElement>('.sm'));

    // V3 elements
    const v3s = Array.from(V[2]!.querySelectorAll<SVGGraphicsElement>('.sw3'));
    const v3t = Array.from(V[2]!.querySelectorAll<SVGGraphicsElement>('.ty'));

    // V4 elements
    const cpc = V[3]!.querySelector<SVGCircleElement>('#cpc');
    const bpl = V[3]!.querySelector<SVGTextElement>('#bpl');

    // V5 elements
    const v5 = Array.from(V[4]!.querySelectorAll<SVGGraphicsElement>('.sl5'));

    function cl(x: number) {
      return Math.max(0, Math.min(1, x));
    }
    function eo(x: number) {
      return 1 - Math.pow(1 - x, 3);
    }
    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    let lastG = -1;
    let animId: number;

    function scrub() {
      if (!pxs || !pvc || !pn || !pw || !pt) return;
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
        pn.textContent = `0${gi + 1}`;
        pw.textContent = PART_LABELS[gi];
        const heading = pss[gi].querySelector('h3');
        pt.textContent = heading ? heading.textContent : PART_TITLES[gi];
        pips.forEach((b, j) => b.classList.toggle('on', j === gi));
        pss.forEach((x, j) => x.classList.toggle('act', j === gi));
        setActiveStep(gi);
      }

      if (reduce) return;

      for (let s = 0; s < 5; s++) {
        const currentV = V[s];
        if (!currentV) continue;
        const u = G - s;
        const op =
          (s ? cl((u + 0.15) / 0.25) : 1) * (s < 4 ? 1 - cl((u - 0.85) / 0.25) : 1);
        const b = cl((u + (s ? 0 : 0.35)) / 0.55);

        currentV.style.opacity = op.toFixed(3);
        currentV.style.transform = 'none';

        if (op < 0.01) continue;

        if (s === 0) {
          v1l.forEach((l, k) => {
            l.style.strokeDashoffset = (1 - eo(cl(b * 2 - k * 0.2))).toFixed(3);
          });
          v1t.forEach((t) => {
            t.style.opacity = eo(cl(b * 2 - 0.3)).toFixed(3);
          });
          v1g.forEach((g, k) => {
            g.style.transform = `scale(${eo(cl(b * 2 - 0.4 - k * 0.12)).toFixed(3)})`;
          });
          const e = eo(cl((b - 0.45) * 2));
          if (bdot) {
            bdot.setAttribute('cx', lerp(200, 300, e).toFixed(1));
            bdot.setAttribute('cy', lerp(250, 170, e).toFixed(1));
          }
          if (bring) {
            bring.setAttribute('r', (16 + 16 * e).toFixed(1));
            bring.style.opacity = e.toFixed(3);
          }
          if (blab) {
            blab.style.opacity = cl((b - 0.75) * 5).toFixed(3);
          }
        } else if (s === 1) {
          v2p.forEach((p, k) => {
            const e = eo(cl(b * 1.8 - k * 0.25));
            p.style.opacity = e.toFixed(3);
            const dx = +(p.dataset.dx || 0);
            const dy = +(p.dataset.dy || 0);
            p.style.transform = `translate(${((1 - e) * dx).toFixed(0)}px, ${((1 - e) * dy).toFixed(0)}px)`;
          });
          v2s.forEach((x, k) => {
            x.style.opacity = eo(cl(b * 2 - 1 - k * 0.2)).toFixed(3);
          });
        } else if (s === 2) {
          v3s.forEach((x, k) => {
            const e = eo(cl(b * 2 - k * 0.18));
            x.style.opacity = e.toFixed(3);
            x.style.transform = `translateY(${((1 - e) * 14).toFixed(1)}px)`;
          });
          v3t.forEach((x, k) => {
            x.style.opacity = eo(cl(b * 2 - 0.8 - k * 0.15)).toFixed(3);
          });
        } else if (s === 3) {
          if (cpc) {
            cpc.setAttribute('r', (260 * eo(cl(b * 1.6))).toFixed(1));
          }
          if (bpl) {
            bpl.style.opacity = cl((b - 0.6) * 4).toFixed(3);
          }
        } else {
          v5.forEach((x, k) => {
            const e = eo(cl(b * 2 - k * 0.35));
            x.style.opacity = e.toFixed(3);
            x.style.transform = `translate(${((1 - e) * 50).toFixed(1)}px, 0)`;
          });
        }
      }
    }

    const tick = () => {
      try {
        scrub();
      } catch (err) {}
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  const goToStep = (index: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const pss = Array.from(el.querySelectorAll<HTMLElement>('.ps'));
    if (pss[index]) {
      pss[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="pad prx"
      id="inside"
      style={{ paddingTop: 'clamp(80px, 12vw, 170px)' }}
    >
      <div className="sh">
        <span className="lab">What is inside</span>
        <span className="lab">Five parts, built in order</span>
      </div>

      <div className="px">
        {/* Left Sticky Preview Canvas */}
        <div className="pv">
          <div className="pvc" id="pvc" data-step={activeStep + 1}>
            <div className="pvn">
              <b id="pn">{`0${activeStep + 1}`}</b>
              <span className="lab" id="pw">
                {PART_LABELS[activeStep]}
              </span>
              <span className="pvt" id="pt">
                {PART_TITLES[activeStep]}
              </span>
            </div>

            <div className="pips" role="group" aria-label="Parts">
              {PART_TITLES.map((title, idx) => (
                <button
                  key={idx}
                  className={idx === activeStep ? 'on' : ''}
                  type="button"
                  aria-label={`Go to part ${idx + 1}: ${title}`}
                  onClick={() => goToStep(idx)}
                />
              ))}
            </div>

            <svg
              viewBox="0 0 400 400"
              role="img"
              aria-label="Illustration of the current part of the identity"
            >
              {/* V1: Positioning */}
              <g className="v v1">
                <line className="ax" pathLength={1} x1="40" y1="250" x2="360" y2="250" />
                <line className="ax" pathLength={1} x1="200" y1="110" x2="200" y2="390" />
                <text x="40" y="270">
                  Established
                </text>
                <text x="360" y="270" textAnchor="end">
                  New
                </text>
                <text x="206" y="124">
                  Simple
                </text>
                <text x="206" y="386">
                  Complex
                </text>
                <circle className="gd" cx="100" cy="190" r="10" style={{ fill: 'var(--mute)' }} />
                <circle className="gd" cx="130" cy="330" r="10" style={{ fill: 'var(--mute)' }} />
                <circle className="gd" cx="290" cy="340" r="10" style={{ fill: 'var(--mute)' }} />
                <circle className="gd" cx="150" cy="215" r="10" style={{ fill: 'var(--mute)' }} />
                <circle
                  id="bring"
                  cx="300"
                  cy="170"
                  r="16"
                  fill="none"
                  stroke="#4B3FFF"
                  strokeWidth="2"
                />
                <circle id="bdot" cx="200" cy="250" r="14" fill="#4B3FFF" />
                <text
                  id="blab"
                  x="236"
                  y="150"
                  style={{ fill: 'var(--ink)', fontSize: '13px', fontWeight: 600 }}
                >
                  Open space
                </text>
              </g>

              {/* V2: Logo System */}
              <g className="v v2">
                <svg
                  x="60"
                  y="92"
                  width="230"
                  height="195"
                  viewBox="0 328 4319 3662"
                  style={{ overflow: 'visible' }}
                >
                  <rect
                    className="lp"
                    data-dx="-1400"
                    data-dy="0"
                    x="0"
                    y="328"
                    width="938"
                    height="2724"
                    style={{ fill: 'var(--ink)' }}
                  />
                  <path
                    className="lp"
                    data-dx="900"
                    data-dy="-1000"
                    d="M3380 328H4318V784.5A3206 3206 0 0 1 3380 3052Z"
                    style={{ fill: 'var(--ink)' }}
                  />
                  <path
                    className="lp"
                    data-dx="0"
                    data-dy="1300"
                    d="M939 3052H3380A3206 3206 0 0 1 1112 3990H939Z"
                    style={{ fill: 'var(--ink)' }}
                  />
                  <rect
                    className="lp"
                    data-dx="1200"
                    data-dy="1200"
                    x="3380"
                    y="3052"
                    width="938"
                    height="938"
                    fill="#4B3FFF"
                  />
                </svg>
                <svg
                  className="sm"
                  x="60"
                  y="318"
                  width="64"
                  height="54"
                  viewBox="0 328 4319 3662"
                  style={{ color: 'var(--ink)' }}
                >
                  <rect x="0" y="328" width="938" height="2724" fill="currentColor" />
                  <path d="M3380 328H4318V784.5A3206 3206 0 0 1 3380 3052Z" fill="currentColor" />
                  <path d="M939 3052H3380A3206 3206 0 0 1 1112 3990H939Z" fill="currentColor" />
                  <rect x="3380" y="3052" width="938" height="938" fill="#4B3FFF" />
                </svg>
                <svg
                  className="sm"
                  x="150"
                  y="330"
                  width="40"
                  height="34"
                  viewBox="0 328 4319 3662"
                  style={{ color: 'var(--ink)' }}
                >
                  <rect x="0" y="328" width="938" height="2724" fill="currentColor" />
                  <path d="M3380 328H4318V784.5A3206 3206 0 0 1 3380 3052Z" fill="currentColor" />
                  <path d="M939 3052H3380A3206 3206 0 0 1 1112 3990H939Z" fill="currentColor" />
                  <rect x="3380" y="3052" width="938" height="938" fill="#4B3FFF" />
                </svg>
                <svg
                  className="sm"
                  x="216"
                  y="338"
                  width="22"
                  height="19"
                  viewBox="0 328 4319 3662"
                  style={{ color: 'var(--ink)' }}
                >
                  <rect x="0" y="328" width="938" height="2724" fill="currentColor" />
                  <path d="M3380 328H4318V784.5A3206 3206 0 0 1 3380 3052Z" fill="currentColor" />
                  <path d="M939 3052H3380A3206 3206 0 0 1 1112 3990H939Z" fill="currentColor" />
                  <rect x="3380" y="3052" width="938" height="938" fill="#4B3FFF" />
                </svg>
                <text
                  className="sm"
                  x="270"
                  y="352"
                  style={{ fontSize: '12px', fill: 'var(--mute)', fontFamily: 'var(--sans)' }}
                >
                  Every size
                </text>
              </g>

              {/* V3: Colour and Type */}
              <g className="v v3">
                <rect className="sw3" x="50" y="110" width="50" height="90" style={{ fill: 'var(--ink)' }} />
                <rect className="sw3" x="108" y="110" width="50" height="90" fill="#4B3FFF" />
                <rect className="sw3" x="166" y="110" width="50" height="90" style={{ fill: 'var(--mute)' }} />
                <rect
                  className="sw3"
                  x="224"
                  y="110"
                  width="50"
                  height="90"
                  style={{ fill: 'var(--bg)', stroke: 'var(--ink)' }}
                />
                <rect className="sw3" x="282" y="110" width="50" height="90" fill="#A9A9B3" />
                <text
                  className="ty"
                  x="50"
                  y="300"
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: '96px',
                    fontWeight: 700,
                    fill: 'var(--ink)',
                    letterSpacing: '-4px',
                  }}
                >
                  Aa
                </text>
                <text
                  className="ty"
                  x="190"
                  y="300"
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: '96px',
                    fontStyle: 'italic',
                    fill: 'var(--ink)',
                  }}
                >
                  Aa
                </text>
                <text
                  className="ty"
                  x="52"
                  y="336"
                  style={{ fontSize: '13px', fill: 'var(--mute)', fontFamily: 'var(--sans)' }}
                >
                  Sans-serif, bold
                </text>
                <text
                  className="ty"
                  x="192"
                  y="336"
                  style={{ fontSize: '13px', fill: 'var(--mute)', fontFamily: 'var(--sans)' }}
                >
                  Serif, italic
                </text>
              </g>

              {/* V4: Custom Pattern */}
              <g className="v v4">
                <defs>
                  <pattern id="pt4" width="40" height="40" patternUnits="userSpaceOnUse">
                    <rect width="40" height="40" fill="#4B3FFF" />
                    <path d="M20 3L37 20L20 37L3 20Z" fill="none" stroke="#fff" strokeWidth="1.6" />
                    <circle cx="20" cy="20" r="4" fill="#fff" />
                    <rect width="5" height="5" fill="#fff" opacity="0.55" />
                  </pattern>
                  <clipPath id="cp4">
                    <circle id="cpc" cx="200" cy="215" r="0" />
                  </clipPath>
                </defs>
                <rect
                  x="60"
                  y="110"
                  width="280"
                  height="210"
                  style={{ fill: 'none', stroke: 'var(--line)' }}
                />
                <rect x="60" y="110" width="280" height="210" fill="url(#pt4)" clipPath="url(#cp4)" />
                <text
                  id="bpl"
                  x="60"
                  y="352"
                  style={{ fontSize: '13px', fill: 'var(--mute)', fontFamily: 'var(--sans)' }}
                >
                  Drawn for one brand
                </text>
              </g>

              {/* V5: Brand Guidelines */}
              <g className="v v5">
                <g className="sl5">
                  <rect
                    x="50"
                    y="118"
                    width="250"
                    height="170"
                    style={{ fill: 'var(--bg)', stroke: 'var(--ink)', strokeWidth: 1.5 }}
                  />
                  <rect x="66" y="136" width="110" height="14" style={{ fill: 'var(--ink)' }} />
                  <rect x="66" y="160" width="170" height="6" style={{ fill: 'var(--mute)' }} />
                  <rect x="66" y="172" width="140" height="6" style={{ fill: 'var(--mute)' }} />
                  <rect x="66" y="238" width="40" height="34" fill="#4B3FFF" />
                </g>
                <g className="sl5">
                  <rect
                    x="72"
                    y="140"
                    width="250"
                    height="170"
                    style={{ fill: 'var(--bg)', stroke: 'var(--ink)', strokeWidth: 1.5 }}
                  />
                  <rect x="88" y="158" width="26" height="26" style={{ fill: 'var(--ink)' }} />
                  <rect x="120" y="158" width="26" height="26" fill="#4B3FFF" />
                  <rect x="152" y="158" width="26" height="26" style={{ fill: 'var(--mute)' }} />
                  <rect x="88" y="200" width="150" height="6" style={{ fill: 'var(--mute)' }} />
                </g>
                <g className="sl5">
                  <rect
                    x="94"
                    y="162"
                    width="250"
                    height="170"
                    style={{ fill: 'var(--bg)', stroke: 'var(--ink)', strokeWidth: 1.5 }}
                  />
                  <svg
                    x="110"
                    y="180"
                    width="70"
                    height="59"
                    viewBox="0 328 4319 3662"
                    style={{ color: 'var(--ink)' }}
                  >
                    <rect x="0" y="328" width="938" height="2724" fill="currentColor" />
                    <path d="M3380 328H4318V784.5A3206 3206 0 0 1 3380 3052Z" fill="currentColor" />
                    <path d="M939 3052H3380A3206 3206 0 0 1 1112 3990H939Z" fill="currentColor" />
                    <rect x="3380" y="3052" width="938" height="938" fill="#4B3FFF" />
                  </svg>
                  <rect
                    x="196"
                    y="182"
                    width="100"
                    height="56"
                    style={{ fill: 'none', stroke: 'var(--ink)', strokeDasharray: '4 3' }}
                  />
                  <rect x="110" y="262" width="170" height="6" style={{ fill: 'var(--mute)' }} />
                </g>
                <g className="sl5">
                  <rect
                    x="116"
                    y="184"
                    width="250"
                    height="170"
                    style={{ fill: 'var(--bg)', stroke: 'var(--ink)', strokeWidth: 1.5 }}
                  />
                  <rect x="132" y="200" width="70" height="70" fill="#4B3FFF" />
                  <rect x="132" y="200" width="70" height="70" fill="url(#pt1)" />
                  <text
                    x="222"
                    y="258"
                    style={{
                      fontFamily: 'var(--sans)',
                      fontSize: '44px',
                      fontWeight: 700,
                      fill: 'var(--ink)',
                    }}
                  >
                    Aa
                  </text>
                  <rect x="132" y="296" width="190" height="6" style={{ fill: 'var(--mute)' }} />
                </g>
              </g>
            </svg>
          </div>
        </div>

        {/* Right Scrollable Articles */}
        <div className="pl">
          <h2>What a brand identity includes.</h2>

          <article className="ps act" data-i="1" id="part-1">
            <span className="lab">Part one</span>
            <h3>Positioning and messaging</h3>
            <p>
              The idea the brand stands for, who it is for, and the words it uses. Everything visual is built on top of it.
            </p>
            <ul>
              <li>Positioning statement</li>
              <li>Audience and competitor map</li>
              <li>Messaging and voice</li>
            </ul>
          </article>

          <article className="ps" data-i="2" id="part-2">
            <span className="lab">Part two</span>
            <h3>Logo system</h3>
            <p>
              A mark that works at every size, with the lockups, spacing and colour versions a team needs.
            </p>
            <ul>
              <li>Primary mark and lockups</li>
              <li>Icon and favicon versions</li>
              <li>Clear space and minimum sizes</li>
            </ul>
          </article>

          <article className="ps" data-i="3" id="part-3">
            <span className="lab">Part three</span>
            <h3>Colour and type</h3>
            <p>
              A palette and a type pairing chosen for contrast, accessibility and the voice of the brand.
            </p>
            <ul>
              <li>Colour palette with usage rules</li>
              <li>Type pairing and scale</li>
            </ul>
            <span className="pr">Codestreaks: a 4.8 out of 5 trust score.</span>
          </article>

          <article className="ps" data-i="4" id="part-4">
            <span className="lab">Part four</span>
            <h3>Custom pattern</h3>
            <p>
              A pattern drawn for the brand, so surfaces, packaging and social posts look like only this brand.
            </p>
            <ul>
              <li>Pattern design</li>
              <li>Usage on surfaces and backgrounds</li>
            </ul>
            <span className="pr">Begum: a custom Mughal-inspired pattern.</span>
          </article>

          <article className="ps" data-i="5" id="part-5">
            <span className="lab">Part five</span>
            <h3>Brand guidelines</h3>
            <p>
              A slide-format guide that explains how to use everything, so any designer or developer applies it correctly.
            </p>
            <ul>
              <li>Slide-format guidelines</li>
              <li>Do and do not examples</li>
            </ul>
            <span className="pr">Begum: 38-slide brand guidelines.</span>
          </article>
        </div>
      </div>
    </section>
  );
}

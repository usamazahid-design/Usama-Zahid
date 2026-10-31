'use client';

import React, { useEffect, useRef, useState } from 'react';

const WEEKS_DATA = [
  {
    num: '01',
    week: 'Week one',
    title: 'Strategy',
    description: 'Positioning, audience and the friction your customers hit. We settle the one idea that the brand and the website both carry.',
    bullets: ['Positioning and messaging', 'Site map'],
    proof: null,
  },
  {
    num: '02',
    week: 'Week two',
    title: 'Identity',
    description: 'Logo, colour, type and a custom pattern, built as a system instead of a folder of files.',
    bullets: ['Logo system', 'Colour and type', 'Custom pattern and guidelines'],
    proof: 'Begum: a custom Mughal-inspired pattern and 38-slide guidelines.',
  },
  {
    num: '03',
    week: 'Week three',
    title: 'Interface',
    description: 'The website designed from the identity: layouts, components and the flows that matter most, on every screen size.',
    bullets: ['Page designs', 'Component kit', 'Responsive layouts'],
    proof: 'Strong Rental Cars Qatar: six booking steps cut to three.',
  },
  {
    num: '04',
    week: 'Week four',
    title: 'Build and launch',
    description: 'Production-ready development, testing and go-live, with the brand guidelines finished alongside the site.',
    bullets: ['Development', 'Testing and fixes', 'Launch'],
    proof: 'Four weeks from the first conversation to a live URL.',
  },
];

export default function BrandToUrlWeeksExact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pvcRef = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<(HTMLElement | null)[]>([]);
  const v1Ref = useRef<SVGGElement>(null);
  const v2Ref = useRef<SVGGElement>(null);
  const v3Ref = useRef<SVGGElement>(null);
  const v4Ref = useRef<SVGGElement>(null);
  const cur4Ref = useRef<SVGRectElement>(null);
  const pb4Ref = useRef<SVGRectElement>(null);
  const lv4Ref = useRef<SVGGElement>(null);

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const pxs = containerRef.current;
    const pvc = pvcRef.current;
    if (!pxs || !pvc) return;

    const pss = articlesRef.current.filter(Boolean) as HTMLElement[];
    const V = [v1Ref.current, v2Ref.current, v3Ref.current, v4Ref.current];

    if (!V[0] || !V[1] || !V[2] || !V[3]) return;

    const v1l = Array.from(V[0].querySelectorAll('line')) as SVGLineElement[];
    const v1n = Array.from(V[0].querySelectorAll('.nd')) as (SVGCircleElement | SVGRectElement)[];
    const v1t = Array.from(V[0].querySelectorAll('text')) as SVGTextElement[];

    const v2p = Array.from(V[1].querySelectorAll('.lp')) as (SVGRectElement | SVGPathElement)[];
    const v2s = Array.from(V[1].querySelectorAll('.sw')) as SVGRectElement[];
    const v2a = V[1].querySelector('.aa') as SVGTextElement | null;

    const b3Container = V[2].querySelector('.b3');
    const b3 = b3Container ? (Array.from(b3Container.children) as SVGGraphicsElement[]) : [];

    const cur4 = cur4Ref.current;
    const pb4 = pb4Ref.current;
    const ck4 = Array.from(V[3].querySelectorAll('.ck4')) as SVGGElement[];
    const lv4 = lv4Ref.current;

    let lastG = -1;

    const cl = (x: number) => Math.max(0, Math.min(1, x));
    const eo = (x: number) => 1 - Math.pow(1 - x, 3);

    function scrub() {
      if (!pxs) return;
      const vh = window.innerHeight;
      const r0 = pxs.getBoundingClientRect();
      if (r0.bottom < -100 || r0.top > vh + 100) return;

      const c = vh * 0.47;
      let gi = 3;
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
        setActiveStep(gi);
      }

      for (let s = 0; s < 4; s++) {
        const targetV = V[s];
        if (!targetV) continue;

        const u = G - s;
        const op = (s ? cl((u + 0.15) / 0.25) : 1) * (s < 3 ? 1 - cl((u - 0.85) / 0.25) : 1);
        const b = cl((u + (s ? 0 : 0.35)) / 0.55);

        targetV.style.opacity = op.toFixed(3);
        targetV.style.transform = 'none';

        if (op < 0.01) continue;

        if (s === 0) {
          v1l.forEach((l, k) => {
            l.style.strokeDashoffset = (1 - eo(cl(b * 1.7 - k * 0.22))).toFixed(3);
          });
          v1n.forEach((n, k) => {
            n.style.transform = 'scale(' + eo(cl(b * 2 - 0.45 - k * 0.12)).toFixed(3) + ')';
          });
          v1t.forEach((t) => {
            t.style.opacity = cl(b * 2 - 0.9).toFixed(3);
          });
        } else if (s === 1) {
          v2p.forEach((p, k) => {
            const dx = parseFloat(p.dataset.dx || '0');
            const dy = parseFloat(p.dataset.dy || '0');
            const e = eo(cl(b * 1.8 - k * 0.25));
            p.style.opacity = e.toFixed(3);
            p.style.transform =
              'translate(' + ((1 - e) * dx).toFixed(0) + 'px,' + ((1 - e) * dy).toFixed(0) + 'px)';
          });
          v2s.forEach((x, k) => {
            x.style.opacity = eo(cl(b * 2 - 0.6 - k * 0.15)).toFixed(3);
          });
          if (v2a) {
            v2a.style.opacity = cl(b * 2 - 1).toFixed(3);
          }
        } else if (s === 2) {
          b3.forEach((el, k) => {
            const e = eo(cl(b * 1.9 - k / (b3.length || 1)));
            el.style.opacity = String(e);
            el.style.transform = 'translateY(' + ((1 - e) * 14).toFixed(1) + 'px)';
          });
        } else if (s === 3) {
          if (cur4) {
            cur4.setAttribute('width', (230 * eo(cl(b * 2))).toFixed(1));
          }
          if (pb4) {
            pb4.style.transform = 'scaleX(' + eo(cl((b - 0.3) * 1.8)).toFixed(3) + ')';
          }
          ck4.forEach((el, k) => {
            const e = eo(cl(b * 2.2 - 0.7 - k * 0.3));
            el.style.opacity = e.toFixed(3);
            el.style.transform = 'translateX(' + ((1 - e) * 20).toFixed(1) + 'px)';
          });
          if (lv4) {
            lv4.style.opacity = eo(cl((b - 0.8) * 5)).toFixed(3);
          }
        }
      }
    }

    let animId: number;
    const loop = () => {
      scrub();
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  const handlePipClick = (index: number) => {
    const el = articlesRef.current[index];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const currentMeta = WEEKS_DATA[activeStep] || WEEKS_DATA[0];

  return (
    <section className="pad prx" id="weeks" style={{ paddingTop: 'clamp(80px, 12vw, 170px)' }}>
      <div className="sh">
        <span className="lab">The four weeks</span>
        <span className="lab">From first conversation to live URL</span>
      </div>

      <div ref={containerRef} className="px">
        <div className="pv">
          <div ref={pvcRef} className="pvc" id="pvc" data-step={activeStep + 1}>
            <div className="pvn">
              <b id="pn">{currentMeta.num}</b>
              <span className="lab" id="pw">
                {currentMeta.week}
              </span>
              <span className="pvt" id="pt">
                {currentMeta.title}
              </span>
            </div>

            <div className="pips" role="group" aria-label="Weeks">
              {WEEKS_DATA.map((w, idx) => (
                <button
                  key={w.num}
                  className={idx === activeStep ? 'on' : ''}
                  type="button"
                  aria-label={`Go to week ${idx + 1}: ${w.title}`}
                  onClick={() => handlePipClick(idx)}
                />
              ))}
            </div>

            <svg viewBox="0 0 400 400" role="img" aria-label="Illustration of the current week of the build">
              {/* WEEK 1 */}
              <g ref={v1Ref} className="v v1">
                <line pathLength={1} x1="200" y1="250" x2="90" y2="175" />
                <line pathLength={1} x1="200" y1="250" x2="310" y2="162" />
                <line pathLength={1} x1="200" y1="250" x2="120" y2="335" />
                <line pathLength={1} x1="200" y1="250" x2="302" y2="322" />
                <circle className="nd" cx="90" cy="175" r="14" style={{ fill: 'var(--ink)' }} />
                <rect className="nd" x="296" y="148" width="28" height="28" style={{ fill: '#4B3FFF' }} />
                <circle className="nd" cx="120" cy="335" r="14" style={{ fill: 'var(--ink)' }} />
                <rect className="nd" x="288" y="308" width="28" height="28" style={{ fill: 'var(--ink)' }} />
                <circle className="nd" cx="200" cy="250" r="26" style={{ fill: '#4B3FFF' }} />
                <text className="tx" x="62" y="152">Founder</text>
                <text className="tx" x="276" y="140">Customer</text>
                <text className="tx" x="94" y="368">Brand</text>
                <text className="tx" x="266" y="360">Product</text>
                <text className="tx" x="171" y="296">System</text>
              </g>

              {/* WEEK 2 */}
              <g ref={v2Ref} className="v v2">
                <svg x="50" y="88" width="300" height="254" viewBox="0 328 4319 3662" style={{ overflow: 'visible' }}>
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
                <rect className="sw" x="50" y="354" width="26" height="26" style={{ fill: 'var(--ink)' }} />
                <rect className="sw" x="90" y="354" width="26" height="26" fill="#4B3FFF" />
                <rect className="sw" x="130" y="354" width="26" height="26" style={{ fill: 'var(--mute)' }} />
                <rect className="sw" x="170" y="354" width="26" height="26" style={{ fill: 'var(--bg)', stroke: 'var(--ink)' }} />
                <text
                  className="aa"
                  x="236"
                  y="380"
                  style={{ fill: 'var(--ink)', fontFamily: 'var(--sans)', fontSize: '34px', fontWeight: 700 }}
                >
                  Aa
                </text>
              </g>

              {/* WEEK 3 */}
              <g ref={v3Ref} className="v v3">
                <g className="b3">
                  <rect x="30" y="104" width="340" height="250" style={{ fill: 'var(--bg)', stroke: 'var(--ink)', strokeWidth: 1.6 }} />
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
              </g>

              {/* WEEK 4 */}
              <g ref={v4Ref} className="v v4">
                <rect x="60" y="120" width="280" height="34" rx="17" style={{ fill: 'none', stroke: 'var(--ink)', strokeWidth: 1.6 }} />
                <clipPath id="cu4">
                  <rect ref={cur4Ref} id="cur4" x="60" y="110" width="0" height="54" />
                </clipPath>
                <text x="84" y="143" clipPath="url(#cu4)" style={{ fontSize: '18px', fontWeight: 600, fill: 'var(--ink)' }}>
                  yourbrand.com
                </text>
                <rect x="60" y="190" width="280" height="6" style={{ fill: 'none', stroke: 'var(--ink)' }} />
                <rect
                  ref={pb4Ref}
                  id="pb4"
                  x="60"
                  y="190"
                  width="280"
                  height="6"
                  fill="#4B3FFF"
                  style={{ transformBox: 'fill-box', transformOrigin: '0 50%' }}
                />
                <g className="ck4">
                  <rect x="60" y="226" width="20" height="20" fill="#4B3FFF" />
                  <path d="M64 236l4 4 8-9" fill="none" stroke="#fff" strokeWidth={2.4} />
                  <text x="94" y="242" style={{ fontSize: '16px', fill: 'var(--ink)' }}>
                    Brand identity delivered
                  </text>
                </g>
                <g className="ck4">
                  <rect x="60" y="266" width="20" height="20" fill="#4B3FFF" />
                  <path d="M64 276l4 4 8-9" fill="none" stroke="#fff" strokeWidth={2.4} />
                  <text x="94" y="282" style={{ fontSize: '16px', fill: 'var(--ink)' }}>
                    Website tested and launched
                  </text>
                </g>
                <g ref={lv4Ref} id="lv4">
                  <rect x="60" y="316" width="110" height="38" style={{ fill: 'var(--ink)' }} />
                  <circle cx="82" cy="335" r="7" fill="#2BD97C" />
                  <text x="98" y="341" style={{ fontSize: '16px', fontWeight: 700, fill: 'var(--bg)' }}>
                    Live
                  </text>
                </g>
              </g>
            </svg>
          </div>
        </div>

        <div className="pl">
          <h2>What happens each week.</h2>
          {WEEKS_DATA.map((w, idx) => (
            <article
              key={w.num}
              ref={(el) => {
                articlesRef.current[idx] = el;
              }}
              className={`ps ${idx === activeStep ? 'act' : ''}`}
              data-i={idx + 1}
            >
              <span className="lab">{w.week}</span>
              <h3>{w.title}</h3>
              <p>{w.description}</p>
              <ul>
                {w.bullets.map((b, bIdx) => (
                  <li key={bIdx}>{b}</li>
                ))}
              </ul>
              {w.proof && <span className="pr">{w.proof}</span>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

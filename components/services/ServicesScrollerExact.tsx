'use client';

import React, { useEffect, useRef, useState } from 'react';

const SERVICE_LABELS = ['Service one', 'Service two', 'Service three', 'Service four'];
const SERVICE_TITLES = [
  'Brand identity',
  'Production-ready website',
  'Product and UX design',
  'Launch assets',
];

export default function ServicesScrollerExact() {
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

    const V = [1, 2, 3, 4].map((n) => el.querySelector<SVGGraphicsElement>('.v' + n));
    if (V.some((v) => !v)) return;

    const v1p = Array.from(V[0]!.querySelectorAll<SVGGraphicsElement>('.lp'));
    const v1s = Array.from(V[0]!.querySelectorAll<SVGGraphicsElement>('.sw'));
    const v1a = V[0]!.querySelector<SVGGraphicsElement>('.aa');
    const v2e = Array.from(V[1]!.children) as SVGGraphicsElement[];
    const ph3 = V[2]!.querySelector<SVGGElement>('.ph3');
    const v3p = ph3 ? (Array.from(ph3.children) as SVGGraphicsElement[]) : [];
    const v3f = Array.from(V[2]!.querySelectorAll<SVGGraphicsElement>('.fr'));
    const v3o = V[2]!.querySelector<SVGGraphicsElement>('.ok');
    const v4e = Array.from(V[3]!.children) as SVGGraphicsElement[];

    function cl(x: number) {
      return Math.max(0, Math.min(1, x));
    }
    function eo(x: number) {
      return 1 - Math.pow(1 - x, 3);
    }
    function stag(arr: SVGGraphicsElement[], b: number) {
      arr.forEach((item, i) => {
        const e = eo(cl(b * 1.9 - i / arr.length));
        item.style.opacity = String(e);
        item.style.transform = `translateY(${((1 - e) * 12).toFixed(1)}px)`;
      });
    }

    let lastG = -1;
    let animId: number;

    function scrub() {
      if (!pxs || !pvc || !pn || !pw || !pt) return;
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
        pvc.dataset.step = String(gi + 1);
        pn.textContent = `0${gi + 1}`;
        pw.textContent = SERVICE_LABELS[gi];
        const heading = pss[gi].querySelector('h3');
        pt.textContent = heading ? heading.textContent : SERVICE_TITLES[gi];
        pips.forEach((b, j) => b.classList.toggle('on', j === gi));
        pss.forEach((x, j) => x.classList.toggle('act', j === gi));
        setActiveStep(gi);
      }

      if (reduce) return;

      for (let s = 0; s < 4; s++) {
        const currentV = V[s];
        if (!currentV) continue;
        const u = G - s;
        const op =
          (s ? cl((u + 0.15) / 0.25) : 1) * (s < 3 ? 1 - cl((u - 0.85) / 0.25) : 1);
        const b = cl((u + (s ? 0 : 0.35)) / 0.55);

        currentV.style.opacity = op.toFixed(3);
        currentV.style.transform = 'none';

        if (op < 0.01) continue;

        if (s === 0) {
          v1p.forEach((p, k) => {
            const e = eo(cl(b * 1.8 - k * 0.25));
            p.style.opacity = e.toFixed(3);
            const dx = +(p.dataset.dx || 0);
            const dy = +(p.dataset.dy || 0);
            p.style.transform = `translate(${((1 - e) * dx).toFixed(0)}px, ${((1 - e) * dy).toFixed(0)}px)`;
          });
          v1s.forEach((x, k) => {
            x.style.opacity = eo(cl(b * 2 - 0.6 - k * 0.15)).toFixed(3);
          });
          if (v1a) {
            v1a.style.opacity = cl(b * 2 - 1).toFixed(3);
          }
        } else if (s === 1) {
          stag(v2e, b);
        } else if (s === 2) {
          stag(v3p, b);
          const fe = eo(cl((b - 0.55) * 3));
          v3f.forEach((f, k) => {
            const e = cl(fe * 1.6 - k * 0.2);
            f.style.opacity = (1 - e).toFixed(3);
            f.style.transform = `scaleX(${(1 - e).toFixed(3)})`;
            f.style.transformBox = 'fill-box';
            f.style.transformOrigin = '0 50%';
          });
          if (v3o) {
            v3o.style.opacity = eo(cl((b - 0.7) * 3.5)).toFixed(3);
          }
        } else {
          v4e.forEach((item, k) => {
            const e = eo(cl(b * 1.9 - k * 0.18));
            item.style.opacity = String(e);
            item.style.transform = `translateY(${((1 - e) * 20).toFixed(1)}px) rotate(${((1 - e) * (k % 2 ? 6 : -6)).toFixed(1)}deg)`;
            item.style.transformBox = 'fill-box';
            item.style.transformOrigin = '50% 50%';
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
      className="pad prx sv2"
      id="services"
      style={{ paddingTop: 'clamp(80px, 12vw, 170px)' }}
    >
      <div className="sh">
        <span className="lab">Four services</span>
        <span className="lab">One strategy underneath all of them</span>
      </div>

      <div className="px">
        {/* Left Sticky Visualization Showcase */}
        <div className="pv">
          <div className="pvc" id="pvc" data-step={activeStep + 1}>
            <div className="pvn">
              <b id="pn">{`0${activeStep + 1}`}</b>
              <span className="lab" id="pw">
                {SERVICE_LABELS[activeStep]}
              </span>
              <span className="pvt" id="pt">
                {SERVICE_TITLES[activeStep]}
              </span>
            </div>

            <div className="pips" role="group" aria-label="Services">
              {SERVICE_TITLES.map((title, idx) => (
                <button
                  key={idx}
                  className={idx === activeStep ? 'on' : ''}
                  type="button"
                  aria-label={`Go to service ${idx + 1}: ${title}`}
                  onClick={() => goToStep(idx)}
                />
              ))}
            </div>

            <svg viewBox="0 0 400 400" role="img" aria-label="Illustration of the current service">
              {/* V1: Brand Identity */}
              <g className="v v1">
                <svg
                  x="50"
                  y="88"
                  width="300"
                  height="254"
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
                <rect className="sw" x="50" y="354" width="26" height="26" style={{ fill: 'var(--ink)' }} />
                <rect className="sw" x="90" y="354" width="26" height="26" fill="#4B3FFF" />
                <rect className="sw" x="130" y="354" width="26" height="26" style={{ fill: 'var(--mute)' }} />
                <rect
                  className="sw"
                  x="170"
                  y="354"
                  width="26"
                  height="26"
                  style={{ fill: 'var(--bg)', stroke: 'var(--ink)' }}
                />
                <text
                  className="aa"
                  x="236"
                  y="380"
                  style={{
                    fill: 'var(--ink)',
                    fontFamily: 'var(--sans)',
                    fontSize: '34px',
                    fontWeight: 700,
                  }}
                >
                  Aa
                </text>
              </g>

              {/* V2: Production-Ready Website */}
              <g className="v v2">
                <rect
                  x="30"
                  y="104"
                  width="340"
                  height="272"
                  style={{ fill: 'var(--bg)', stroke: 'var(--ink)', strokeWidth: 1.6 }}
                />
                <rect x="42" y="116" width="7" height="7" style={{ fill: 'var(--ink)' }} />
                <rect x="54" y="116" width="7" height="7" style={{ fill: 'var(--ink)' }} />
                <rect x="66" y="116" width="7" height="7" fill="#4B3FFF" />
                <rect
                  x="86"
                  y="113"
                  width="170"
                  height="14"
                  rx="7"
                  style={{ fill: 'none', stroke: 'var(--ink)', strokeWidth: 0.8 }}
                />
                <text
                  x="96"
                  y="123"
                  style={{ fontSize: '9px', fill: 'var(--ink)', fontFamily: 'var(--sans)' }}
                >
                  yourbrand.com
                </text>
                <circle cx="318" cy="120" r="5" fill="#2BD97C" />
                <text
                  x="328"
                  y="123"
                  style={{ fontSize: '9px', fill: 'var(--ink)', fontFamily: 'var(--sans)' }}
                >
                  Live
                </text>
                <rect x="46" y="150" width="14" height="14" style={{ fill: 'var(--ink)' }} />
                <rect x="46" y="190" width="150" height="16" rx="2" style={{ fill: 'var(--ink)' }} />
                <rect x="46" y="214" width="110" height="16" rx="2" style={{ fill: 'var(--ink)' }} />
                <rect x="46" y="244" width="130" height="6" rx="3" style={{ fill: 'var(--mute)' }} />
                <rect x="46" y="256" width="100" height="6" rx="3" style={{ fill: 'var(--mute)' }} />
                <rect x="46" y="278" width="92" height="28" fill="#4B3FFF" />
                <rect x="62" y="289" width="48" height="6" rx="3" fill="#fff" />
                <path d="M200 306V176A130 130 0 0 1 330 306Z" style={{ fill: 'var(--ink)' }} />
                <rect x="292" y="268" width="38" height="38" fill="#4B3FFF" />
                <rect x="46" y="326" width="96" height="36" rx="4" style={{ fill: 'var(--ink)' }} />
                <rect x="152" y="326" width="96" height="36" rx="4" fill="#4B3FFF" />
                <rect x="258" y="326" width="96" height="36" rx="4" style={{ fill: 'var(--ink)' }} />
              </g>

              {/* V3: Product and UX Design */}
              <g className="v v3">
                <g className="ph3">
                  <rect
                    x="130"
                    y="100"
                    width="140"
                    height="276"
                    rx="18"
                    style={{ fill: 'var(--bg)', stroke: 'var(--ink)', strokeWidth: 1.6 }}
                  />
                  <rect x="144" y="120" width="52" height="8" rx="4" style={{ fill: 'var(--ink)' }} />
                  <circle cx="252" cy="124" r="8" fill="#4B3FFF" />
                  <rect x="144" y="142" width="112" height="76" rx="6" fill="#4B3FFF" />
                  <circle cx="174" cy="180" r="18" fill="#fff" />
                  <rect x="200" y="168" width="42" height="7" rx="3.5" fill="#fff" />
                  <rect x="200" y="182" width="30" height="6" rx="3" fill="#fff" />
                  <rect x="144" y="232" width="22" height="22" style={{ fill: 'var(--ink)' }} />
                  <rect x="174" y="235" width="70" height="8" rx="4" style={{ fill: 'var(--ink)' }} />
                  <rect x="174" y="247" width="46" height="6" rx="3" style={{ fill: 'var(--mute)' }} />
                  <circle cx="155" cy="277" r="11" fill="#4B3FFF" />
                  <rect x="174" y="270" width="70" height="8" rx="4" style={{ fill: 'var(--ink)' }} />
                  <rect x="174" y="282" width="46" height="6" rx="3" style={{ fill: 'var(--mute)' }} />
                  <rect x="144" y="328" width="112" height="30" rx="6" fill="#4B3FFF" />
                  <rect x="172" y="340" width="56" height="6" rx="3" fill="#fff" />
                </g>
                <text
                  x="20"
                  y="136"
                  style={{ fontSize: '12px', fill: 'var(--mute)', fontFamily: 'var(--sans)' }}
                >
                  Friction
                </text>
                <rect
                  className="fr"
                  x="20"
                  y="150"
                  width="92"
                  height="22"
                  style={{ fill: 'none', stroke: 'var(--ink)', strokeDasharray: '4 3' }}
                />
                <rect
                  className="fr"
                  x="20"
                  y="190"
                  width="92"
                  height="22"
                  style={{ fill: 'none', stroke: 'var(--ink)', strokeDasharray: '4 3' }}
                />
                <rect
                  className="fr"
                  x="20"
                  y="230"
                  width="92"
                  height="22"
                  style={{ fill: 'none', stroke: 'var(--ink)', strokeDasharray: '4 3' }}
                />
                <g className="ok">
                  <circle cx="330" cy="236" r="26" fill="#4B3FFF" />
                  <path
                    d="M318 236l9 9 17-18"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </g>

              {/* V4: Launch Assets */}
              <g className="v v4">
                <g className="as">
                  <rect x="40" y="110" width="140" height="140" fill="#4B3FFF" />
                  <circle cx="110" cy="170" r="30" fill="#fff" />
                  <rect x="62" y="218" width="76" height="8" rx="4" fill="#fff" />
                </g>
                <g className="as">
                  <rect x="204" y="100" width="92" height="164" style={{ fill: 'var(--ink)' }} />
                  <rect x="220" y="118" width="40" height="40" fill="#4B3FFF" />
                  <rect x="220" y="232" width="60" height="8" rx="4" style={{ fill: 'var(--bg)' }} />
                </g>
                <g className="as">
                  <rect x="316" y="120" width="56" height="120" style={{ fill: 'var(--mute)' }} />
                </g>
                <g className="as">
                  <rect
                    x="48"
                    y="282"
                    width="168"
                    height="94"
                    style={{ fill: 'var(--bg)', stroke: 'var(--ink)', strokeWidth: 1.6 }}
                  />
                  <rect x="62" y="298" width="20" height="20" style={{ fill: 'var(--ink)' }} />
                  <rect x="74" y="310" width="12" height="12" fill="#4B3FFF" />
                  <rect x="62" y="342" width="84" height="7" rx="3" style={{ fill: 'var(--ink)' }} />
                </g>
                <g className="as">
                  <rect x="236" y="290" width="136" height="86" style={{ fill: 'var(--ink)' }} />
                  <rect x="250" y="306" width="60" height="10" rx="3" fill="#4B3FFF" />
                  <rect
                    x="250"
                    y="326"
                    width="100"
                    height="6"
                    rx="3"
                    style={{ fill: 'var(--bg)', opacity: 0.6 }}
                  />
                  <rect
                    x="250"
                    y="340"
                    width="76"
                    height="6"
                    rx="3"
                    style={{ fill: 'var(--bg)', opacity: 0.6 }}
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>

        {/* Right Scrollable Service Description Articles */}
        <div className="pl">
          <h2>What I design, and what you get.</h2>

          <article className="ps act" data-i="1" id="s1">
            <span className="lab">Service one</span>
            <h3>Brand identity</h3>
            <p>Positioning, a logo system, colour, type and a custom pattern, documented so any team can use it.</p>
            <p className="who2">For founders whose brand no longer matches the product.</p>
            <ul>
              <li>Positioning and messaging</li>
              <li>Logo and visual system</li>
              <li>Custom pattern</li>
              <li>Brand guidelines</li>
            </ul>
            <span className="pr">Codestreaks: 127% increase in brand recognition. Begum: 38-slide guidelines.</span>
          </article>

          <article className="ps" data-i="2" id="s2">
            <span className="lab">Service two</span>
            <h3>Production-ready website</h3>
            <p>Designed from the identity and built to launch, so the site never drifts away from the brand.</p>
            <p className="who2">For founders who need to go live, not to hand off a design file.</p>
            <ul>
              <li>Structure and copy direction</li>
              <li>Responsive design</li>
              <li>Development and launch</li>
            </ul>
            <span className="pr">Strong Rental Cars Qatar: booking cut from six steps to three.</span>
          </article>

          <article className="ps" data-i="3" id="s3">
            <span className="lab">Service three</span>
            <h3>Product and UX design</h3>
            <p>Interfaces for web and mobile products that remove the friction users never report.</p>
            <p className="who2">For teams whose product works but costs users effort.</p>
            <ul>
              <li>Flow and friction audit</li>
              <li>Interface design</li>
              <li>Design system</li>
            </ul>
            <span className="pr">Petrozen ERP: 58% fewer accounting errors, 46% less time on invoice entry.</span>
          </article>

          <article className="ps" data-i="4" id="s4">
            <span className="lab">Service four</span>
            <h3>Launch assets</h3>
            <p>Social and print pieces built from the same system as the brand and the site.</p>
            <p className="who2">For brands that are about to go public and need to look consistent on day one.</p>
            <ul>
              <li>Social media templates</li>
              <li>Print collateral</li>
            </ul>
            <span className="pr">Begum: web, social, print and development in one delivery.</span>
          </article>
        </div>
      </div>
    </section>
  );
}

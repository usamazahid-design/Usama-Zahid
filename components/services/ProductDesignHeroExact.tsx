'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function ProductDesignHeroExact() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    // Trigger hero line reveals
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.add('ready');
      });
    });

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Parallax motion on dashboard layers with .mv2
    const mv2 = Array.from(el.querySelectorAll<HTMLElement>('.mv2'));
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;
    let animId: number;

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

    // Number counters with animation
    const counters = Array.from(el.querySelectorAll<HTMLElement>('[data-n]'));
    if (!reduce) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            io.unobserve(en.target);
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
      counters.forEach((c) => io.observe(c));

      // Magnetic hover on button
      const btn = el.querySelector<HTMLElement>('.btn');
      const onBtnMouseMove = (e: MouseEvent) => {
        if (!btn) return;
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        if (Math.hypot(dx, dy) < r.width / 2 + 90) {
          btn.style.transform = `translate(${(dx * 0.12).toFixed(1)}px, ${(dy * 0.25).toFixed(1)}px)`;
        } else {
          btn.style.transform = '';
        }
      };
      window.addEventListener('mousemove', onBtnMouseMove, { passive: true });

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mousemove', onBtnMouseMove);
        io.disconnect();
      };
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <section ref={heroRef} className="hero pad" style={{ paddingTop: '110px' }}>
      <div className="fo">
        <span>
          <Link href="/services/" style={{ textDecoration: 'underline', textUnderlineOffset: '4px' }}>
            Services
          </Link>{' '}
          / Product and UX design
        </span>
        <span>Brand and product designer</span>
        <span>usamazahid.design</span>
      </div>

      <div className="hg">
        <div className="ht">
          <h1>
            <span className="ln">
              <span style={{ '--d': '.05s' } as React.CSSProperties}>Products that ask</span>
            </span>
            <span className="ln it2">
              <span style={{ '--d': '.17s' } as React.CSSProperties}>less effort of the</span>
            </span>
            <span className="ln it2">
              <span style={{ '--d': '.29s' } as React.CSSProperties}>people using them.</span>
            </span>
          </h1>
          <p className="sub">
            <b>Interfaces and flows for web and mobile products that remove the friction users never report.</b>{' '}
            Designed on the same system as your brand.
          </p>
          <Link className="btn" href="/contact/">
            Book a call <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="hl" aria-hidden="true">
          <div className="wvs">
            <svg viewBox="0 0 600 500">
              {/* Product Dashboard Window */}
              <g className="wg" style={{ '--d': '.1s' } as React.CSSProperties}>
                <g className="mv2" data-k="-8">
                  <rect
                    x="30"
                    y="50"
                    width="470"
                    height="340"
                    style={{ fill: 'var(--bg)', stroke: 'var(--ink)', strokeWidth: 1.6 }}
                  />
                  <rect x="30" y="50" width="86" height="340" style={{ fill: 'var(--ink)' }} />
                  <rect x="46" y="70" width="20" height="20" fill="#4B3FFF" />
                  <rect
                    x="46"
                    y="116"
                    width="54"
                    height="7"
                    rx="3"
                    style={{ fill: 'var(--bg)', opacity: 0.6 }}
                  />
                  <rect
                    x="46"
                    y="140"
                    width="44"
                    height="7"
                    rx="3"
                    style={{ fill: 'var(--bg)', opacity: 0.6 }}
                  />
                  <rect
                    x="46"
                    y="164"
                    width="52"
                    height="7"
                    rx="3"
                    style={{ fill: 'var(--bg)', opacity: 0.6 }}
                  />
                  <rect
                    x="136"
                    y="70"
                    width="140"
                    height="12"
                    rx="6"
                    style={{ fill: 'var(--mute)' }}
                  />
                  <rect
                    x="134"
                    y="100"
                    width="108"
                    height="66"
                    style={{ fill: 'none', stroke: 'var(--line)' }}
                  />
                  <rect
                    x="254"
                    y="100"
                    width="108"
                    height="66"
                    style={{ fill: 'none', stroke: 'var(--line)' }}
                  />
                  <rect
                    x="374"
                    y="100"
                    width="108"
                    height="66"
                    style={{ fill: 'none', stroke: 'var(--line)' }}
                  />
                  <rect x="146" y="120" width="56" height="18" style={{ fill: 'var(--ink)' }} />
                  <rect x="266" y="120" width="56" height="18" style={{ fill: 'var(--ink)' }} />
                  <rect x="386" y="120" width="56" height="18" style={{ fill: 'var(--ink)' }} />
                </g>
              </g>

              {/* Data & Analytics Chart Layer */}
              <g className="wg" style={{ '--d': '.35s' } as React.CSSProperties}>
                <g className="mv2" data-k="8">
                  <rect
                    x="134"
                    y="186"
                    width="220"
                    height="186"
                    style={{ fill: 'none', stroke: 'var(--line)' }}
                  />
                  <rect x="150" y="320" width="22" height="36" style={{ fill: 'var(--line)' }} />
                  <rect x="182" y="296" width="22" height="60" style={{ fill: 'var(--line)' }} />
                  <rect x="214" y="308" width="22" height="48" style={{ fill: 'var(--line)' }} />
                  <rect x="246" y="276" width="22" height="80" style={{ fill: 'var(--line)' }} />
                  <rect x="278" y="250" width="22" height="106" fill="#4B3FFF" />
                  <polyline
                    points="161,300 193,276 225,288 257,252 289,228 330,214"
                    fill="none"
                    stroke="#4B3FFF"
                    strokeWidth="3.5"
                  />
                  <rect
                    x="366"
                    y="186"
                    width="116"
                    height="186"
                    style={{ fill: 'none', stroke: 'var(--line)' }}
                  />
                  <rect x="378" y="204" width="80" height="7" rx="3" style={{ fill: 'var(--mute)' }} />
                  <rect x="378" y="228" width="92" height="7" rx="3" style={{ fill: 'var(--mute)' }} />
                  <rect x="378" y="252" width="70" height="7" rx="3" style={{ fill: 'var(--mute)' }} />
                  <rect x="378" y="276" width="86" height="7" rx="3" style={{ fill: 'var(--mute)' }} />
                </g>
              </g>

              {/* Journey Spline Line */}
              <g className="wg" style={{ '--d': '.55s' } as React.CSSProperties}>
                <g className="mv2" data-k="16">
                  <path
                    d="M70 430C170 430 200 380 300 390S470 440 560 360"
                    fill="none"
                    stroke="#4B3FFF"
                    strokeWidth="3"
                    strokeDasharray="7 6"
                  />
                  <circle cx="560" cy="360" r="9" fill="#4B3FFF" />
                </g>
              </g>

              {/* Friction Removed Badge */}
              <g className="wg" style={{ '--d': '.75s' } as React.CSSProperties}>
                <g className="mv2" data-k="22">
                  <rect x="380" y="420" width="190" height="40" style={{ fill: 'var(--ink)' }} />
                  <rect x="392" y="432" width="16" height="16" fill="#2BD97C" />
                  <path d="M396 440l4 4 7-8" fill="none" stroke="#fff" strokeWidth="2.2" />
                  <text
                    x="418"
                    y="446"
                    style={{ fontSize: '14px', fontWeight: 700, fill: 'var(--bg)' }}
                  >
                    Friction removed
                  </text>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Proof Stats Row */}
      <div className="pf" aria-label="Results from product projects">
        <div>
          <b data-n="58" data-s="%">
            58%
          </b>
          <span className="mono">fewer accounting errors, Petrozen ERP</span>
        </div>
        <div>
          <b data-n="46" data-s="%">
            46%
          </b>
          <span className="mono">less time on invoice entry, Petrozen ERP</span>
        </div>
        <div>
          <b data-n="58" data-s="%">
            58%
          </b>
          <span className="mono">more completed bookings, Strong Rental Cars Qatar</span>
        </div>
        <div>
          <b data-n="41" data-s="%">
            41%
          </b>
          <span className="mono">less time to book, Strong Rental Cars Qatar</span>
        </div>
      </div>
    </section>
  );
}

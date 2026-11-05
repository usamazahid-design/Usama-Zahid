'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function BrandToUrlHeroExact() {
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

    // Parallax motion on visual layers with .mv2
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
          / Brand-to-URL
        </span>
        <span>Brand and product designer</span>
        <span>usamazahid.design</span>
      </div>

      <div className="hg">
        <div className="ht">
          <h1>
            <span className="ln">
              <span style={{ '--d': '.05s' } as React.CSSProperties}>Brand-to-URL.</span>
            </span>
            <span className="ln it2">
              <span style={{ '--d': '.17s' } as React.CSSProperties}>Brand Identity & User-Centric UX,</span>
            </span>
            <span className="ln it2">
              <span style={{ '--d': '.29s' } as React.CSSProperties}>live Next.js site in 4 weeks.</span>
            </span>
          </h1>
          <p className="sub">
            <b>Brand-to-URL</b> is a fixed 4-week design and web engineering sprint by independent designer Usama Zahid. It delivers brand strategy, visual identity systems, user-centric product UI/UX, and a production Next.js website from one operator with zero handoff translation loss. Fixed investment: $24,000.
          </p>
          <Link className="btn" href="/contact/">
            Book a call <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="hl" aria-hidden="true">
          <div className="wvs">
            <svg viewBox="0 0 600 500">
              {/* Brand Identity Tile */}
              <g className="wg" style={{ '--d': '.1s' } as React.CSSProperties}>
                <g className="mv2" data-k="-10">
                  <rect x="30" y="130" width="190" height="190" style={{ fill: 'var(--ink)' }} />
                  <svg
                    x="62"
                    y="162"
                    width="126"
                    height="107"
                    viewBox="0 328 4319 3662"
                    style={{ color: 'var(--bg)', fill: 'currentColor' }}
                  >
                    <rect x="0" y="328" width="938" height="2724" fill="currentColor" />
                    <path
                      d="M3380 328H4318V784.5A3206 3206 0 0 1 3380 3052Z"
                      fill="currentColor"
                    />
                    <path
                      d="M939 3052H3380A3206 3206 0 0 1 1112 3990H939Z"
                      fill="currentColor"
                    />
                    <rect x="3380" y="3052" width="938" height="938" fill="#4B3FFF" />
                  </svg>
                  <text x="30" y="346" style={{ fontSize: '14px', fill: 'var(--mute)' }}>
                    Brand identity
                  </text>
                </g>
              </g>

              {/* Connecting Flow Arrow */}
              <g className="wg" style={{ '--d': '.35s' } as React.CSSProperties}>
                <g className="mv2" data-k="6">
                  <path d="M232 225H292" stroke="#4B3FFF" strokeWidth="3" fill="none" />
                  <path d="M282 213L296 225L282 237" stroke="#4B3FFF" strokeWidth="3" fill="none" />
                </g>
              </g>

              {/* Production Website Browser Frame */}
              <g className="wg" style={{ '--d': '.55s' } as React.CSSProperties}>
                <g className="mv2" data-k="14">
                  <rect
                    x="304"
                    y="90"
                    width="270"
                    height="260"
                    style={{ fill: 'var(--bg)', stroke: 'var(--ink)', strokeWidth: 1.6 }}
                  />
                  <rect x="316" y="102" width="7" height="7" style={{ fill: 'var(--ink)' }} />
                  <rect x="328" y="102" width="7" height="7" style={{ fill: 'var(--ink)' }} />
                  <rect x="340" y="102" width="7" height="7" fill="#4B3FFF" />
                  <rect
                    x="360"
                    y="99"
                    width="120"
                    height="13"
                    rx="6"
                    style={{ fill: 'none', stroke: 'var(--ink)', strokeWidth: 0.8 }}
                  />
                  <text x="370" y="109" style={{ fontSize: '9px', fill: 'var(--ink)' }}>
                    yourbrand.com
                  </text>
                  <rect x="320" y="136" width="12" height="12" style={{ fill: 'var(--ink)' }} />
                  <rect x="320" y="176" width="120" height="16" style={{ fill: 'var(--ink)' }} />
                  <rect x="320" y="198" width="90" height="16" style={{ fill: 'var(--ink)' }} />
                  <rect x="320" y="228" width="100" height="6" rx="3" style={{ fill: 'var(--mute)' }} />
                  <rect x="320" y="258" width="70" height="24" fill="#4B3FFF" />
                  <path d="M470 300V190A100 100 0 0 1 570 300Z" style={{ fill: 'var(--ink)' }} />
                  <rect x="538" y="266" width="32" height="32" fill="#4B3FFF" />
                  <circle className="wlive" cx="540" cy="124" r="5" fill="#2BD97C" />
                  <text
                    x="550"
                    y="128"
                    style={{ fontSize: '11px', fontWeight: 700, fill: 'var(--ink)' }}
                  >
                    Live
                  </text>
                </g>
              </g>

              {/* 4-Week Timeline Track */}
              <g className="wg" style={{ '--d': '.8s' } as React.CSSProperties}>
                <g className="mv2" data-k="22">
                  <line
                    x1="60"
                    y1="430"
                    x2="540"
                    y2="430"
                    style={{ stroke: 'var(--ink)', strokeWidth: 1.6, opacity: 0.5 }}
                  />
                  <line x1="60" y1="430" x2="540" y2="430" stroke="#4B3FFF" strokeWidth="4" />
                  <circle cx="60" cy="430" r="9" style={{ fill: 'var(--ink)' }} />
                  <circle cx="220" cy="430" r="9" style={{ fill: 'var(--ink)' }} />
                  <circle cx="380" cy="430" r="9" style={{ fill: 'var(--ink)' }} />
                  <circle cx="540" cy="430" r="11" fill="#4B3FFF" />
                  <text x="60" y="462" textAnchor="middle" style={{ fontSize: '12px', fill: 'var(--ink)' }}>
                    Week 1
                  </text>
                  <text x="220" y="462" textAnchor="middle" style={{ fontSize: '12px', fill: 'var(--ink)' }}>
                    Week 2
                  </text>
                  <text x="380" y="462" textAnchor="middle" style={{ fontSize: '12px', fill: 'var(--ink)' }}>
                    Week 3
                  </text>
                  <text
                    x="540"
                    y="462"
                    textAnchor="middle"
                    style={{ fontSize: '12px', fill: 'var(--ink)', fontWeight: 700 }}
                  >
                    Week 4
                  </text>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Proof / Numbers Row */}
      <div className="pf" aria-label="The offer in numbers">
        <div>
          <b data-n="4">4</b>
          <span className="mono">weeks from first conversation to live URL</span>
        </div>
        <div>
          <b data-n="1">1</b>
          <span className="mono">invoice for the brand and the website</span>
        </div>
        <div>
          <b data-n="0">0</b>
          <span className="mono">handoffs between brand and website</span>
        </div>
        <div>
          <b data-n="50" data-s="+">
            50+
          </b>
          <span className="mono">projects delivered</span>
        </div>
      </div>
    </section>
  );
}

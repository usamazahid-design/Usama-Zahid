'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function WebEngineeringHeroExact() {
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

    // Parallax motion on browser visual layers with .mv2
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
          / Production-ready website
        </span>
        <span>Brand and product designer</span>
        <span>usamazahid.design</span>
      </div>

      <div className="hg">
        <div className="ht">
          <h1>
            <span className="ln">
              <span style={{ '--d': '.05s' } as React.CSSProperties}>Startup Website Design</span>
            </span>
            <span className="ln it2">
              <span style={{ '--d': '.17s' } as React.CSSProperties}>& Production Next.js</span>
            </span>
            <span className="ln it2">
              <span style={{ '--d': '.29s' } as React.CSSProperties}>Web Engineering.</span>
            </span>
          </h1>
          <p className="sub">
            <b>Usama Zahid</b> designs and develops high-conversion marketing websites for startups in Next.js, TypeScript, and Tailwind CSS. Built directly from design tokens by the same designer with 95+ Core Web Vitals, accessible semantics, and zero handoff loss. Investment starts at $14,000.
          </p>
          <Link className="btn" href="/contact/">
            Book a call <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="hl" aria-hidden="true">
          <div className="wvs">
            <svg viewBox="0 0 600 500">
              {/* Desktop Browser Window */}
              <g className="wg" style={{ '--d': '.1s' } as React.CSSProperties}>
                <g className="mv2" data-k="-8">
                  <rect
                    x="30"
                    y="40"
                    width="440"
                    height="330"
                    style={{ fill: 'var(--bg)', stroke: 'var(--ink)', strokeWidth: 1.6 }}
                  />
                  <rect x="44" y="54" width="8" height="8" style={{ fill: 'var(--ink)' }} />
                  <rect x="58" y="54" width="8" height="8" style={{ fill: 'var(--ink)' }} />
                  <rect x="72" y="54" width="8" height="8" fill="#4B3FFF" />
                  <rect
                    x="96"
                    y="51"
                    width="190"
                    height="14"
                    rx="7"
                    style={{ fill: 'none', stroke: 'var(--ink)', strokeWidth: 0.8 }}
                  />
                  <text x="108" y="62" style={{ fontSize: '9px', fill: 'var(--ink)' }}>
                    yourbrand.com
                  </text>
                  <rect x="48" y="92" width="16" height="16" style={{ fill: 'var(--ink)' }} />
                  <rect x="330" y="97" width="30" height="6" rx="3" style={{ fill: 'var(--mute)' }} />
                  <rect x="372" y="97" width="30" height="6" rx="3" style={{ fill: 'var(--mute)' }} />
                  <rect x="414" y="97" width="30" height="6" rx="3" style={{ fill: 'var(--mute)' }} />
                  <rect x="48" y="140" width="200" height="22" style={{ fill: 'var(--ink)' }} />
                  <rect x="48" y="170" width="150" height="22" style={{ fill: 'var(--ink)' }} />
                  <rect x="48" y="206" width="170" height="7" rx="3" style={{ fill: 'var(--mute)' }} />
                  <rect x="48" y="220" width="130" height="7" rx="3" style={{ fill: 'var(--mute)' }} />
                  <rect x="48" y="246" width="110" height="32" fill="#4B3FFF" />
                  <rect x="68" y="259" width="70" height="6" rx="3" fill="#fff" />
                  <path d="M270 290V150A140 140 0 0 1 410 290Z" style={{ fill: 'var(--ink)' }} />
                  <rect x="368" y="248" width="42" height="42" fill="#4B3FFF" />
                </g>
              </g>

              {/* Cards row below */}
              <g className="wg" style={{ '--d': '.35s' } as React.CSSProperties}>
                <g className="mv2" data-k="8">
                  <rect x="48" y="304" width="120" height="50" style={{ fill: 'var(--ink)' }} />
                  <rect x="178" y="304" width="120" height="50" fill="#4B3FFF" />
                  <rect x="308" y="304" width="120" height="50" style={{ fill: 'var(--ink)' }} />
                </g>
              </g>

              {/* Mobile Device Mockup */}
              <g className="wg" style={{ '--d': '.55s' } as React.CSSProperties}>
                <g className="mv2" data-k="16">
                  <rect
                    x="395"
                    y="150"
                    width="160"
                    height="320"
                    rx="26"
                    style={{ fill: 'var(--bg)', stroke: 'var(--ink)', strokeWidth: 1.8 }}
                  />
                  <rect x="415" y="176" width="56" height="8" rx="4" style={{ fill: 'var(--ink)' }} />
                  <circle cx="531" cy="180" r="9" fill="#4B3FFF" />
                  <rect x="415" y="204" width="120" height="86" rx="8" fill="#4B3FFF" />
                  <circle cx="447" cy="247" r="20" fill="#fff" />
                  <rect x="478" y="236" width="46" height="8" rx="4" fill="#fff" />
                  <rect x="478" y="252" width="32" height="6" rx="3" fill="#fff" />
                  <rect x="415" y="308" width="24" height="24" style={{ fill: 'var(--ink)' }} />
                  <rect x="448" y="311" width="76" height="8" rx="4" style={{ fill: 'var(--ink)' }} />
                  <rect x="448" y="324" width="50" height="6" rx="3" style={{ fill: 'var(--mute)' }} />
                  <rect x="415" y="410" width="120" height="34" rx="6" fill="#4B3FFF" />
                  <rect x="445" y="423" width="60" height="7" rx="3" fill="#fff" />
                </g>
              </g>

              {/* Live Status Badge */}
              <g className="wg" style={{ '--d': '.75s' } as React.CSSProperties}>
                <g className="mv2" data-k="22">
                  <rect x="420" y="46" width="130" height="34" style={{ fill: 'var(--ink)' }} />
                  <circle className="wlive" cx="440" cy="63" r="6" fill="#2BD97C" />
                  <text
                    x="454"
                    y="68"
                    style={{ fontSize: '14px', fontWeight: 700, fill: 'var(--bg)' }}
                  >
                    Live
                  </text>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Proof Stats Row */}
      <div className="pf" aria-label="Results from website projects">
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
        <div>
          <b>6 to 3</b>
          <span className="mono">booking steps, Strong Rental Cars Qatar</span>
        </div>
        <div>
          <b data-n="4">4</b>
          <span className="mono">weeks from first conversation to live URL</span>
        </div>
      </div>
    </section>
  );
}

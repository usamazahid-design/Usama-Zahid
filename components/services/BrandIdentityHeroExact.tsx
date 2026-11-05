'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function BrandIdentityHeroExact() {
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

    // Parallax motion on brand board tiles with .mv2
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

    // Number counters with decimal support
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
      const onBtnMove = (e: MouseEvent) => {
        if (!btn) return;
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        if (Math.hypot(dx, dy) < r.width / 2 + 80) {
          btn.style.transform = `translate(${(dx * 0.12).toFixed(1)}px, ${(dy * 0.25).toFixed(1)}px)`;
        } else {
          btn.style.transform = '';
        }
      };
      window.addEventListener('mousemove', onBtnMove, { passive: true });

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mousemove', onBtnMove);
        cancelAnimationFrame(animId);
        io.disconnect();
      };
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section ref={heroRef} className="hero pad" style={{ paddingTop: '110px' }} id="top">
      {/* Pattern definitions used across board */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <pattern id="pt1" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20 3L37 20L20 37L3 20Z" fill="none" stroke="#fff" strokeWidth="1.6" />
            <circle cx="20" cy="20" r="4" fill="#fff" />
            <rect width="5" height="5" fill="#fff" opacity="0.55" />
          </pattern>
        </defs>
      </svg>

      {/* Folio top meta bar */}
      <div className="fo">
        <span>
          <Link href="/services/" style={{ textDecoration: 'underline', textUnderlineOffset: '4px' }}>
            Services
          </Link>{' '}
          / Brand identity
        </span>
        <span>Brand and product designer</span>
        <span>usamazahid.design</span>
      </div>

      {/* Main hero grid */}
      <div className="hg">
        <div className="ht">
          <h1>
            <span className="ln">
              <span style={{ '--d': '.05s' } as React.CSSProperties}>Brand Identity Systems</span>
            </span>
            <span className="ln it2">
              <span style={{ '--d': '.17s' } as React.CSSProperties}>& Design Tokens</span>
            </span>
            <span className="ln it2">
              <span style={{ '--d': '.29s' } as React.CSSProperties}>for SaaS Startups.</span>
            </span>
          </h1>

          <p className="sub">
            <b>Usama Zahid</b> engineers mathematical brand identity systems and Figma design token libraries for high-growth tech startups. From positioning and logo marks to WCAG-tested color scales and typographic grids, every asset is built to scale across marketing sites and complex product interfaces. Investment starts at $12,000.
          </p>

          <a
            className="btn"
            href="https://cal.com/usama-zahid-haadwj/15min"
            target="_blank"
            rel="noopener noreferrer"
            data-cur="Calendar"
          >
            Book a call <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

        {/* Brand Board Grid */}
        <div className="hl" aria-hidden="true">
          <div className="bb">
            <div className="bt L mv2" data-k="-10" style={{ '--d': '.1s' } as React.CSSProperties}>
              <svg viewBox="0 328 4319 3662">
                <rect x="0" y="328" width="938" height="2724" fill="currentColor" />
                <path d="M3380 328H4318V784.5A3206 3206 0 0 1 3380 3052Z" fill="currentColor" />
                <path d="M939 3052H3380A3206 3206 0 0 1 1112 3990H939Z" fill="currentColor" />
                <rect x="3380" y="3052" width="938" height="938" style={{ fill: '#4B3FFF' }} />
              </svg>
            </div>

            <div className="bt C" style={{ '--d': '.2s' } as React.CSSProperties}>
              <i style={{ background: 'var(--ink)' }} />
              <i style={{ background: '#4B3FFF' }} />
              <i style={{ background: 'var(--mute)' }} />
              <i style={{ background: 'var(--card)' }} />
              <i style={{ background: 'var(--bg)' }} />
            </div>

            <div className="bt T mv2" data-k="8" style={{ '--d': '.3s' } as React.CSSProperties}>
              Aa
            </div>

            <div className="bt P mv2" data-k="-6" style={{ '--d': '.4s' } as React.CSSProperties}>
              <svg viewBox="0 0 120 240" preserveAspectRatio="xMidYMid slice">
                <rect width="120" height="240" fill="url(#pt1)" />
              </svg>
            </div>

            <div className="bt S" style={{ '--d': '.5s' } as React.CSSProperties}>
              <span className="a" />
              <span className="b" />
              <span className="c" />
              <span className="b" />
            </div>

            <div className="bt K mv2" data-k="10" style={{ '--d': '.6s' } as React.CSSProperties}>
              <div>
                <svg className="mk" viewBox="0 328 4319 3662" aria-hidden="true">
                  <rect x="0" y="328" width="938" height="2724" fill="currentColor" />
                  <path d="M3380 328H4318V784.5A3206 3206 0 0 1 3380 3052Z" fill="currentColor" />
                  <path d="M939 3052H3380A3206 3206 0 0 1 1112 3990H939Z" fill="currentColor" />
                  <rect x="3380" y="3052" width="938" height="938" style={{ fill: '#4B3FFF' }} />
                </svg>
                <span />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Proof results from past projects */}
      <div className="pf" aria-label="Results from identity projects">
        <div>
          <b data-n="127" data-s="%">
            127%
          </b>
          <span className="mono">increase in brand recognition, Codestreaks</span>
        </div>
        <div>
          <b data-n="48" data-d="1" data-s="/5">
            4.8/5
          </b>
          <span className="mono">trust score, Codestreaks</span>
        </div>
        <div>
          <b data-n="38">
            38
          </b>
          <span className="mono">slides of brand guidelines, Begum</span>
        </div>
        <div>
          <b data-n="1">
            1
          </b>
          <span className="mono">custom Mughal-inspired pattern, Begum</span>
        </div>
      </div>
    </section>
  );
}

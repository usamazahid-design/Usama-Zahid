'use client';

import React, { useEffect, useRef } from 'react';

export default function ContactHeroExact() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    // Add .ready class to trigger initial entrance animations
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.add('ready');
      });
    });

    // Check prefers-reduced-motion
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const mvs = Array.from(el.querySelectorAll<HTMLElement>('.mv'));
    const svgEl = el.querySelector<SVGSVGElement>('.hl svg');
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
      const sy = window.scrollY;
      const vh = window.innerHeight;

      // Dispersion smoothly scales from 0 (at hero top) to 1 (scrolled past hero)
      // When reverse-scrolling back to top, dispersion returns smoothly to 0.
      const scrollProgress = Math.min(1, Math.max(0, sy / (vh * 0.72)));
      const dispersion = scrollProgress * scrollProgress * (3 - 2 * scrollProgress);

      // Subtle dynamic float on the entire assembled logo under the mouse cursor
      if (svgEl) {
        svgEl.style.transform = `translate(${(mx * 10).toFixed(1)}px, ${(my * 10).toFixed(1)}px)`;
      }

      mvs.forEach((g) => {
        const k = +(g.dataset.k || 0);
        // At sy === 0 or on reverse scroll to top, dispersion = 0.
        // Piece translations become exactly 0px, gathering all pieces
        // (including the indigo square k=260) into the complete assembled logo mark.
        const pieceX = dispersion * (k * 0.85 + mx * k * 0.12);
        const pieceY = dispersion * (-Math.abs(k) * 0.38 + my * k * 0.12);

        g.style.transform = `translate(${pieceX.toFixed(1)}px, ${pieceY.toFixed(1)}px)`;
      });

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    // Magnetic button hover
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

    // Stagger reveal on the metadata strip
    const fn2Items = Array.from(el.querySelectorAll<HTMLElement>('.fn2 > div'));
    fn2Items.forEach((item, i) => {
      item.classList.add('rv');
      item.style.setProperty('--d', `${(i % 3) * 0.08}s`);
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('vis');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    fn2Items.forEach((item) => io.observe(item));

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousemove', onBtnMove);
      cancelAnimationFrame(animId);
      io.disconnect();
    };
  }, []);

  return (
    <section ref={heroRef} className="hero pad" style={{ paddingTop: '110px' }} id="top">
      {/* Folio top meta bar */}
      <div className="fo">
        <span>Contact, 2026 edition</span>
        <span>Brand and product designer</span>
        <span>usamazahid.design</span>
      </div>

      {/* Main hero grid */}
      <div className="hg">
        <div className="ht">
          <h1>
            <span className="ln">
              <span style={{ '--d': '.05s' } as React.CSSProperties}>Start with a</span>
            </span>
            <span className="ln it2">
              <span style={{ '--d': '.17s' } as React.CSSProperties}>conversation,</span>
            </span>
            <span className="ln it2">
              <span style={{ '--d': '.29s' } as React.CSSProperties}>not a form.</span>
            </span>
          </h1>
          <p className="sub">
            <b>Pick a time, or write to me directly.</b> It is a solo practice, so the person you reach is the person who designs and builds.
          </p>
          <a className="btn" href="#book" data-cur="Calendar">
            Book a call <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

        {/* Kinetic deconstructed monogram SVG */}
        <div className="hl" aria-hidden="true">
          <svg viewBox="0 328 4319 3662">
            <g className="in" style={{ '--fx': '-1400px', '--fy': '0px', '--d': '.1s' } as React.CSSProperties}>
              <g className="mv" data-k="-120">
                <rect x="0" y="328" width="938" height="2724" style={{ fill: 'var(--ink)' }} />
              </g>
            </g>
            <g className="in" style={{ '--fx': '900px', '--fy': '-1000px', '--d': '.25s' } as React.CSSProperties}>
              <g className="mv" data-k="150">
                <path d="M3380 328H4318V784.5A3206 3206 0 0 1 3380 3052Z" style={{ fill: 'var(--ink)' }} />
              </g>
            </g>
            <g className="in" style={{ '--fx': '0px', '--fy': '1300px', '--d': '.4s' } as React.CSSProperties}>
              <g className="mv" data-k="-200">
                <path d="M939 3052H3380A3206 3206 0 0 1 1112 3990H939Z" style={{ fill: 'var(--ink)' }} />
              </g>
            </g>
            <g className="in" style={{ '--fx': '1200px', '--fy': '1200px', '--d': '.55s' } as React.CSSProperties}>
              <g className="mv" data-k="260">
                <rect x="3380" y="3052" width="938" height="938" fill="#4B3FFF" />
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* Proof metadata strip */}
      <div className="fn2">
        <div>
          <span>Delivery</span>
          <b>Brand and website in four weeks</b>
        </div>
        <div>
          <span>Invoices</span>
          <b>One, with no handoff</b>
        </div>
        <div>
          <span>Who you brief</span>
          <b>The person who builds</b>
        </div>
      </div>
    </section>
  );
}

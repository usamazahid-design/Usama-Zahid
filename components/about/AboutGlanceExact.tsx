'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function AboutGlanceExact() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const counters = Array.from(el.querySelectorAll<HTMLElement>('[data-n]'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          io.unobserve(en.target);
          const targetEl = en.target as HTMLElement;
          const to = +(targetEl.dataset.n || 0);
          const s = targetEl.dataset.s || '';
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / 1400);
            targetEl.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + s;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.3 }
    );

    counters.forEach((c) => io.observe(c));

    // Scroll reveal observation for glance elements
    const rvs = Array.from(el.querySelectorAll<HTMLElement>('.rv'));
    rvs.forEach((item, i) => {
      item.style.setProperty('--d', `${(i % 4) * 0.08}s`);
    });

    if (reduce) {
      rvs.forEach((item) => item.classList.add('vis'));
      return () => io.disconnect();
    }

    const ioReveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('vis');
            ioReveal.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );

    rvs.forEach((item) => ioReveal.observe(item));

    return () => {
      io.disconnect();
      ioReveal.disconnect();
    };
  }, []);

  return (
    <section ref={containerRef} className="pad" id="glance" style={{ paddingBottom: 0 }}>
      <div className="sh rv">
        <span className="lab">At a glance</span>
        <span className="lab">Practice and proof</span>
      </div>

      <div className="facts">
        <div className="rv">
          <b data-n="50" data-s="+">
            50+
          </b>
          <span className="mono">projects</span>
        </div>
        <div className="rv">
          <b data-n="30" data-s="+">
            30+
          </b>
          <span className="mono">clients</span>
        </div>
        <div className="rv">
          <b data-n="4">4</b>
          <span className="mono">weeks per build</span>
        </div>
      </div>

      <div className="gl">
        <Link className="pj rv" href="/portfolio/">
          <h3>Petrozen ERP</h3>
          <p>58% fewer accounting errors. 46% less time on invoice entry.</p>
          <span aria-hidden="true">&rarr;</span>
        </Link>
        <Link className="pj rv" href="/portfolio/">
          <h3>Strong Rental Cars Qatar</h3>
          <p>58% more completed bookings. Six steps cut to three.</p>
          <span aria-hidden="true">&rarr;</span>
        </Link>
        <Link className="pj rv" href="/portfolio/">
          <h3>Codestreaks</h3>
          <p>127% increase in brand recognition. A 4.8 out of 5 trust score.</p>
          <span aria-hidden="true">&rarr;</span>
        </Link>
        <Link className="pj rv" href="/portfolio/">
          <h3>Begum</h3>
          <p>Identity, pattern, 38-slide guidelines, web, social and print.</p>
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  );
}

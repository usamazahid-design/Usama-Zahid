'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

interface PortfolioHeroExactProps {
  projectCount: number;
  categoryCount: number;
}

export default function PortfolioHeroExact({
  projectCount,
  categoryCount,
}: PortfolioHeroExactProps) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.add('ready');
      });
    });

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const counters = Array.from(el.querySelectorAll<HTMLElement>('[data-n]'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          io.unobserve(en.target);
          const target = en.target as HTMLElement;
          const to = +(target.dataset.n || 0);
          const s = target.dataset.s || '';
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / 1200);
            target.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + s;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.3 }
    );
    counters.forEach((c) => io.observe(c));

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
      io.disconnect();
      window.removeEventListener('mousemove', onBtnMove);
    };
  }, []);

  const scrollToIndex = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('work-index')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section ref={heroRef} className="hero pad" style={{ paddingTop: '110px' }} id="top">
      <div className="fo">
        <span>Portfolio, 2026 edition</span>
        <span>Case studies with the numbers</span>
        <span>usamazahid.design</span>
      </div>

      <div className="hg">
        <div className="ht">
          <h1>
            <span className="ln">
              <span style={{ '--d': '.05s' } as React.CSSProperties}>Selected work,</span>
            </span>
            <span className="ln it2">
              <span style={{ '--d': '.17s' } as React.CSSProperties}>documented as</span>
            </span>
            <span className="ln it2">
              <span style={{ '--d': '.29s' } as React.CSSProperties}>real systems.</span>
            </span>
          </h1>
          <p className="sub">
            <b>Brand-to-URL and product case studies from a solo practice.</b> Each project maps
            the friction, the decisions, and the shipped outcome — not a gallery of screenshots.
          </p>
          <a className="btn" href="#work-index" onClick={scrollToIndex} data-cur="Index">
            Browse the index <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

        <div className="hl">
          <nav className="toc" aria-label="On this page">
            <p>In this page</p>
            <a href="#work-index" onClick={scrollToIndex}>
              <span>01</span>
              <b>Case study index</b>
              <i aria-hidden="true">&rarr;</i>
            </a>
            <Link href="/branding/">
              <span>02</span>
              <b>Brand identity cases</b>
              <i aria-hidden="true">&rarr;</i>
            </Link>
            <Link href="/contact/">
              <span>03</span>
              <b>Start a project</b>
              <i aria-hidden="true">&rarr;</i>
            </Link>
            <a
              href="https://cal.com/usama-zahid-haadwj/15min"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>04</span>
              <b>Book a strategy call</b>
              <i aria-hidden="true">&rarr;</i>
            </a>
          </nav>
        </div>
      </div>

      <div className="pf" aria-label="Portfolio overview">
        <div>
          <b data-n={projectCount} data-s="">
            {projectCount}
          </b>
          <span>Case studies</span>
          <em>in the index</em>
        </div>
        <div>
          <b data-n={categoryCount} data-s="">
            {categoryCount}
          </b>
          <span>Disciplines</span>
          <em>across product and brand</em>
        </div>
        <div>
          <b>1</b>
          <span>Operator</span>
          <em>from brief to live URL</em>
        </div>
        <div>
          <b>4</b>
          <span>Weeks</span>
          <em>for a Brand-to-URL build</em>
        </div>
      </div>
    </section>
  );
}

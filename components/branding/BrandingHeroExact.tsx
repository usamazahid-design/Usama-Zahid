'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

interface BrandingHeroExactProps {
  projectCount: number;
  categoryCount: number;
}

export default function BrandingHeroExact({
  projectCount,
  categoryCount,
}: BrandingHeroExactProps) {
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
    document.getElementById('brand-index')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section ref={heroRef} className="hero pad" style={{ paddingTop: '110px' }} id="top">
      <div className="fo">
        <span>Branding, 2026 edition</span>
        <span>Identity systems with proof</span>
        <span>usamazahid.design</span>
      </div>

      <div className="hg">
        <div className="ht">
          <h1>
            <span className="ln">
              <span style={{ '--d': '.05s' } as React.CSSProperties}>Identity systems,</span>
            </span>
            <span className="ln it2">
              <span style={{ '--d': '.17s' } as React.CSSProperties}>built to hold</span>
            </span>
            <span className="ln it2">
              <span style={{ '--d': '.29s' } as React.CSSProperties}>in product.</span>
            </span>
          </h1>
          <p className="sub">
            <b>Brand strategy, marks, and guidelines from a solo Brand-to-URL practice.</b> Each
            case shows the tension, the decision, and how the system ships across web and print.
          </p>
          <a className="btn" href="#brand-index" onClick={scrollToIndex} data-cur="Index">
            Browse the index <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

        <div className="hl">
          <nav className="toc" aria-label="On this page">
            <p>In this page</p>
            <a href="#brand-index" onClick={scrollToIndex}>
              <span>01</span>
              <b>Brand case index</b>
              <i aria-hidden="true">&rarr;</i>
            </a>
            <Link href="/portfolio/">
              <span>02</span>
              <b>Product case studies</b>
              <i aria-hidden="true">&rarr;</i>
            </Link>
            <Link href="/services/identity/">
              <span>03</span>
              <b>Brand identity service</b>
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

      <div className="pf" aria-label="Branding overview">
        <div>
          <b data-n={projectCount} data-s="">
            {projectCount}
          </b>
          <span>Case studies</span>
          <em>in the brand index</em>
        </div>
        <div>
          <b data-n={categoryCount} data-s="">
            {categoryCount}
          </b>
          <span>Categories</span>
          <em>identity, rebrand, system</em>
        </div>
        <div>
          <b>1</b>
          <span>Operator</span>
          <em>strategy through guidelines</em>
        </div>
        <div>
          <b>1</b>
          <span>System</span>
          <em>brand and website together</em>
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { cv } from '@/lib/cv-data';

export default function CVHero() {
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

  return (
    <section ref={heroRef} className="hero pad" style={{ paddingTop: '110px' }} id="cv-hero">
      <div className="fo">
        <span>CV, 2026 edition</span>
        <span>Brand & product designer</span>
        <span>usamazahid.design</span>
      </div>

      <div className="hg">
        <div className="ht">
          <h1>
            <span className="ln">
              <span style={{ '--d': '.05s' } as React.CSSProperties}>Seven years of</span>
            </span>
            <span className="ln it2">
              <span style={{ '--d': '.17s' } as React.CSSProperties}>shipped design,</span>
            </span>
            <span className="ln it2">
              <span style={{ '--d': '.29s' } as React.CSSProperties}>one operator.</span>
            </span>
          </h1>
          <p className="sub">
            <b>Brand & Product Designer based in Lahore.</b> {cv.summary}
          </p>
          <div className="cta-actions" style={{ marginTop: 0 }}>
            <a className="btn" href={cv.pdfUrl} download={cv.pdfLabel} data-cur="CV">
              Download CV <span aria-hidden="true">&rarr;</span>
            </a>
            <a className="btn btn-ghost" href={`mailto:${cv.email}`} data-cur="Email">
              Email <span aria-hidden="true">&rarr;</span>
            </a>
            <Link className="btn btn-ghost" href="/hire/" data-cur="Hire">
              Hire profile <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        <div className="hl">
          <nav className="toc" aria-label="On this CV">
            <p>In this CV</p>
            <a href="#cv-summary">
              <span>01</span>
              <b>Summary</b>
              <i aria-hidden="true">&rarr;</i>
            </a>
            <a href="#cv-experience">
              <span>02</span>
              <b>Experience</b>
              <i aria-hidden="true">&rarr;</i>
            </a>
            <a href="#cv-skills">
              <span>03</span>
              <b>Capabilities</b>
              <i aria-hidden="true">&rarr;</i>
            </a>
            <a href="#cv-projects">
              <span>04</span>
              <b>Selected work</b>
              <i aria-hidden="true">&rarr;</i>
            </a>
          </nav>
        </div>
      </div>

      <div className="pf" aria-label="CV overview">
        <div>
          <b data-n="7" data-s="+">
            7+
          </b>
          <span>Years</span>
          <em>in design practice</em>
        </div>
        <div>
          <b data-n="3" data-s="+">
            3+
          </b>
          <span>Years</span>
          <em>UI/UX and product</em>
        </div>
        <div>
          <b data-n={cv.projectsShipped} data-s="+">
            {cv.projectsShipped}+
          </b>
          <span>Projects</span>
          <em>shipped to production</em>
        </div>
        <div>
          <b data-n={cv.clientsShipped} data-s="+">
            {cv.clientsShipped}+
          </b>
          <span>Clients</span>
          <em>Lahore · remote ready</em>
        </div>
      </div>
    </section>
  );
}

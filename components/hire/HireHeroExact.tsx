'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { cv } from '@/lib/cv-data';

export default function HireHeroExact() {
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
    <section ref={heroRef} className="hero pad" style={{ paddingTop: '110px' }} id="top">
      <div className="fo">
        <span>Hire, 2026 edition</span>
        <span>Recruiter-ready profile</span>
        <span>usamazahid.design</span>
      </div>

      <div className="hg">
        <div className="ht">
          <h1>
            <span className="ln">
              <span style={{ '--d': '.05s' } as React.CSSProperties}>Brand and product,</span>
            </span>
            <span className="ln it2">
              <span style={{ '--d': '.17s' } as React.CSSProperties}>one designer,</span>
            </span>
            <span className="ln it2">
              <span style={{ '--d': '.29s' } as React.CSSProperties}>ready to hire.</span>
            </span>
          </h1>
          <p className="sub">
            <b>Brand & Product Designer, open to senior and remote roles.</b> {cv.summary}
          </p>
          <div className="cta-actions" style={{ marginTop: 0 }}>
            <a
              className="btn"
              href="https://cal.com/usama-zahid-haadwj/15min"
              target="_blank"
              rel="noopener noreferrer"
              data-cur="Calendar"
            >
              Book intro call <span aria-hidden="true">&rarr;</span>
            </a>
            <a className="btn btn-ghost" href={cv.pdfUrl} download={cv.pdfLabel} data-cur="CV">
              Download CV <span aria-hidden="true">&rarr;</span>
            </a>
            <Link className="btn btn-ghost" href="/cv/" data-cur="CV">
              Full CV <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        <div className="hl">
          <nav className="toc" aria-label="On this page">
            <p>In this page</p>
            <a href="#hire-work">
              <span>01</span>
              <b>Selected work</b>
              <i aria-hidden="true">&rarr;</i>
            </a>
            <a href="#hire-experience">
              <span>02</span>
              <b>Experience</b>
              <i aria-hidden="true">&rarr;</i>
            </a>
            <a href="#hire-faq">
              <span>03</span>
              <b>Recruiter FAQ</b>
              <i aria-hidden="true">&rarr;</i>
            </a>
            <a href="#contact">
              <span>04</span>
              <b>Start the conversation</b>
              <i aria-hidden="true">&rarr;</i>
            </a>
          </nav>
        </div>
      </div>

      <div className="pf" aria-label="Hiring overview">
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

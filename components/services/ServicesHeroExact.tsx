'use client';

import React, { useEffect, useRef } from 'react';

export default function ServicesHeroExact() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    // Trigger hero line transitions
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.add('ready');
      });
    });

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Counter animation for proof stats
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
            const t0 = performance.now();
            const tick = (t: number) => {
              const p = Math.min(1, (t - t0) / 1400);
              target.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + s;
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          });
        },
        { threshold: 0.3 }
      );
      counters.forEach((c) => io.observe(c));

      // Magnetic hover on hero button
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
    }
  }, []);

  const scrollToService = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section ref={heroRef} className="hero pad" style={{ paddingTop: '110px' }} id="top">
      {/* Folio top meta bar */}
      <div className="fo">
        <span>Services, 2026 edition</span>
        <span>Brand and product designer</span>
        <span>usamazahid.design</span>
      </div>

      {/* Main hero grid */}
      <div className="hg">
        <div className="ht">
          <h1>
            <span className="ln">
              <span style={{ '--d': '.05s' } as React.CSSProperties}>Brand and product</span>
            </span>
            <span className="ln it2">
              <span style={{ '--d': '.17s' } as React.CSSProperties}>design, built as</span>
            </span>
            <span className="ln it2">
              <span style={{ '--d': '.29s' } as React.CSSProperties}>one system.</span>
            </span>
          </h1>

          <p className="sub">
            <b>Brand identity and a production-ready website, together in four weeks.</b> Product design and launch assets on the same system.
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

        {/* Table of contents navigation card */}
        <div className="hl">
          <nav className="toc" aria-label="Services">
            <p>In this page</p>
            <a href="#s1" onClick={(e) => scrollToService(e, 's1')}>
              <span>01</span>
              <b>Brand identity</b>
              <i aria-hidden="true">&rarr;</i>
            </a>
            <a href="#s2" onClick={(e) => scrollToService(e, 's2')}>
              <span>02</span>
              <b>Production-ready website</b>
              <i aria-hidden="true">&rarr;</i>
            </a>
            <a href="#s3" onClick={(e) => scrollToService(e, 's3')}>
              <span>03</span>
              <b>Product and UX design</b>
              <i aria-hidden="true">&rarr;</i>
            </a>
            <a href="#s4" onClick={(e) => scrollToService(e, 's4')}>
              <span>04</span>
              <b>Launch assets</b>
              <i aria-hidden="true">&rarr;</i>
            </a>
          </nav>
        </div>
      </div>

      {/* Proof results from past projects */}
      <div className="pf" aria-label="Results from past projects">
        <div>
          <b data-n="58" data-s="%">
            58%
          </b>
          <span className="mono">fewer accounting errors, Petrozen ERP</span>
        </div>
        <div>
          <b data-n="58" data-s="%">
            58%
          </b>
          <span className="mono">more completed bookings, Strong Rental Cars Qatar</span>
        </div>
        <div>
          <b data-n="127" data-s="%">
            127%
          </b>
          <span className="mono">increase in brand recognition, Codestreaks</span>
        </div>
        <div>
          <b data-n="46" data-s="%">
            46%
          </b>
          <span className="mono">less time on invoice entry, Petrozen ERP</span>
        </div>
      </div>
    </section>
  );
}

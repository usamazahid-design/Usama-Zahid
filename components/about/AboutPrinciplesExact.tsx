'use client';

import React, { useEffect, useRef } from 'react';

export default function AboutPrinciplesExact() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Number counter animation
    const counter = el.querySelector<HTMLElement>('[data-n]');
    if (counter && !reduce) {
      const ioCounter = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            ioCounter.unobserve(en.target);
            const targetEl = en.target as HTMLElement;
            const to = +(targetEl.dataset.n || 0);
            const t0 = performance.now();
            const tick = (t: number) => {
              const p = Math.min(1, (t - t0) / 1200);
              targetEl.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 3))));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          });
        },
        { threshold: 0.3 }
      );
      ioCounter.observe(counter);
    }

    // Scroll reveal observation for sticky header elements and 4 principle articles
    const rvs = Array.from(el.querySelectorAll<HTMLElement>('.rv'));
    rvs.forEach((item, i) => {
      item.style.setProperty('--d', `${(i % 4) * 0.08}s`);
    });

    if (reduce) {
      rvs.forEach((item) => item.classList.add('vis'));
      return;
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
      ioReveal.disconnect();
    };
  }, []);

  return (
    <section ref={containerRef} className="pad" id="principles">
      <div className="sv">
        {/* Sticky left column */}
        <div className="sv-l">
          <h2 className="rv">Principles</h2>
          <p className="rv">Four rules I design by, each backed by work I can point to.</p>
          <span className="big rv" data-n="4">
            4
          </span>
          <span className="mono rv">rules, no exceptions</span>
        </div>

        {/* 4 interactive principle articles */}
        <div>
          <article className="svc rv">
            <div>
              <svg viewBox="0 0 100 100" aria-hidden="true">
                <path className="r" d="M0 100V0A100 100 0 0 1 100 100Z" fill="currentColor" />
              </svg>
              <h3>Friction before polish</h3>
            </div>
            <div>
              <p>
                I look for the friction a founder cannot see before I touch a visual: the extra step, the unclear label, the page that asks for too much.
              </p>
              <ul>
                <li>Flow audit</li>
                <li>Decision points</li>
                <li>Removal first</li>
              </ul>
              <span className="pr">Strong Rental Cars Qatar: six booking steps cut to three.</span>
            </div>
          </article>

          <article className="svc rv">
            <div>
              <svg viewBox="0 0 100 100" aria-hidden="true">
                <rect x="0" y="0" width="60" height="60" fill="currentColor" />
                <rect className="r" x="60" y="60" width="40" height="40" fill="#4B3FFF" />
              </svg>
              <h3>One system, not two deliverables</h3>
            </div>
            <div>
              <p>
                Brand and website are designed against the same strategy, so nothing is translated between teams and nothing drifts apart.
              </p>
              <ul>
                <li>One strategy</li>
                <li>One timeline</li>
                <li>One invoice</li>
              </ul>
              <span className="pr">Begum: identity, pattern, 38-slide guidelines, web, social and print.</span>
            </div>
          </article>

          <article className="svc rv">
            <div>
              <svg viewBox="0 0 100 100" aria-hidden="true">
                <path className="r" d="M0 100A100 100 0 0 1 100 0V40A60 60 0 0 0 40 100Z" fill="currentColor" />
              </svg>
              <h3>Design as infrastructure</h3>
            </div>
            <div>
              <p>
                A design is judged by what it changes in the business: fewer errors, faster work, a brand people recognise.
              </p>
              <ul>
                <li>Measured outcomes</li>
                <li>Plain language</li>
              </ul>
              <span className="pr">Petrozen ERP: 58% fewer accounting errors.</span>
            </div>
          </article>

          <article className="svc rv">
            <div>
              <svg viewBox="0 0 100 100" aria-hidden="true">
                <circle className="r" cx="50" cy="50" r="50" fill="currentColor" />
                <rect x="50" y="50" width="50" height="50" fill="#4B3FFF" />
              </svg>
              <h3>Proof over claims</h3>
            </div>
            <div>
              <p>
                I show results from the work instead of adjectives, and I only report numbers I can source.
              </p>
              <ul>
                <li>Sourced numbers</li>
                <li>Named projects</li>
              </ul>
              <span className="pr">Codestreaks: 127% increase in brand recognition.</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

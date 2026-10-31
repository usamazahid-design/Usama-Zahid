'use client';

import React, { useEffect, useRef } from 'react';

export default function AboutLensExact() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const rvs = Array.from(el.querySelectorAll<HTMLElement>('.rv'));
    rvs.forEach((item, i) => {
      item.style.setProperty('--d', `${(i % 4) * 0.08}s`);
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add('vis');
          io.unobserve(en.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );

    rvs.forEach((item) => io.observe(item));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="pad" id="lens">
      <div className="sh">
        <span className="lab">The physics lens</span>
        <span className="lab">Three ideas I use daily</span>
      </div>

      <h2 className="lh">Physics, applied to brands and websites.</h2>

      <div className="lens">
        {/* Card 1: Systems thinking */}
        <div className="lc rv">
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <line x1="20" y1="70" x2="50" y2="26" stroke="currentColor" strokeWidth="2" />
            <line x1="50" y1="26" x2="82" y2="70" stroke="currentColor" strokeWidth="2" />
            <line x1="20" y1="70" x2="82" y2="70" stroke="currentColor" strokeWidth="2" />
            <circle cx="20" cy="70" r="12" fill="currentColor" />
            <rect x="38" y="14" width="24" height="24" fill="#4B3FFF" />
            <circle cx="82" cy="70" r="12" fill="currentColor" />
          </svg>
          <h3>Systems thinking</h3>
          <p>
            A brand, a website and a product are one system. I draw it before I design any part of it.
          </p>
        </div>

        {/* Card 2: Decision entropy */}
        <div className="lc rv">
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <g fill="currentColor">
              <rect x="4" y="4" width="24" height="24" />
              <rect x="38" y="4" width="24" height="24" />
              <rect x="72" y="4" width="24" height="24" />
              <rect x="4" y="38" width="24" height="24" />
              <rect x="72" y="38" width="24" height="24" />
              <rect x="4" y="72" width="24" height="24" />
              <rect x="38" y="72" width="24" height="24" />
              <rect x="72" y="72" width="24" height="24" />
            </g>
            <rect x="38" y="38" width="24" height="24" fill="#4B3FFF" />
          </svg>
          <h3>Decision entropy</h3>
          <p>
            Every extra choice on a page raises the cost of deciding. I remove choices until the next step is obvious.
          </p>
        </div>

        {/* Card 3: Friction reduction */}
        <div className="lc rv">
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <path
              d="M0 70H22L30 40H46L54 70H72L80 40H100"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
            <rect x="0" y="86" width="100" height="6" fill="#4B3FFF" />
          </svg>
          <h3>Friction reduction</h3>
          <p>
            Friction is any step that costs the customer effort and gives nothing back. I find it, then remove it.
          </p>
        </div>
      </div>
    </section>
  );
}

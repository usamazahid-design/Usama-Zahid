'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function BrandIdentityScopeExact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rvs = Array.from(el.querySelectorAll<HTMLElement>('.rv'));

    rvs.forEach((item, i) => {
      item.style.setProperty('--d', `${(i % 3) * 0.08}s`);
    });

    if (reduce) {
      rvs.forEach((item) => item.classList.add('vis'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('vis');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    );

    rvs.forEach((item) => io.observe(item));

    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pad"
      id="together"
      style={{ paddingTop: 'clamp(80px, 12vw, 170px)' }}
    >
      <div className="sh rv">
        <span className="lab">Scope</span>
        <span className="lab">Identity alone, or with the website</span>
      </div>

      <h2 className="bh rv">Start with the identity, or build the whole thing.</h2>

      <div className="br2">
        <div className="rv">
          <span className="lab">The identity</span>
          <h3>Brand identity</h3>
          <p>
            Positioning, logo system, colour, type, pattern and guidelines. We scope the timeline together on a call.
          </p>
        </div>

        <div className="rv">
          <span className="lab">The full build</span>
          <h3>Brand-to-URL</h3>
          <p>
            The identity and a production-ready website, designed and built together. Four weeks, one invoice, no handoff.
          </p>
          <Link className="go" href="/services/">
            See all services <b aria-hidden="true">&rarr;</b>
          </Link>
        </div>
      </div>
    </section>
  );
}

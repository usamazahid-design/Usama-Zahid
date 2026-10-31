'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function WebEngineeringScopeExact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const rvs = Array.from(el.querySelectorAll<HTMLElement>('.br2 > div, .sh, .bh'));
    rvs.forEach((item, i) => {
      item.classList.add('rv');
      item.style.setProperty('--d', `${(i % 3) * 0.08}s`);
    });

    const rio = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('vis');
            obs.unobserve(en.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    );

    rvs.forEach((item) => rio.observe(item));

    return () => {
      rio.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="pad" id="together" style={{ paddingTop: 'clamp(80px, 12vw, 170px)' }}>
      <div className="sh">
        <span className="lab">Scope</span>
        <span className="lab">The website alone, or with the identity</span>
      </div>

      <h2 className="bh">Start with the site, or build the whole thing.</h2>

      <div className="br2">
        <div>
          <span className="lab">The website</span>
          <h3>Production-ready website</h3>
          <p>
            Structure, responsive design, components, development and launch. We scope the timeline together on a call.
          </p>
        </div>

        <div>
          <span className="lab">The full build</span>
          <h3>Brand-to-URL</h3>
          <p>The identity and the website, designed and built together. Four weeks, one invoice, no handoff.</p>
          <Link className="go" href="/services/identity/">
            See brand identity <b>&rarr;</b>
          </Link>
        </div>
      </div>
    </section>
  );
}

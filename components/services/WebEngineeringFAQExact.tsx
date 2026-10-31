'use client';

import React, { useEffect, useRef } from 'react';

export default function WebEngineeringFAQExact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const rvs = Array.from(el.querySelectorAll<HTMLElement>('.fq, .sh, .bh'));
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
    <section ref={sectionRef} className="pad" id="faq" style={{ paddingTop: 'clamp(80px, 12vw, 170px)' }}>
      <div className="sh">
        <span className="lab">Before you write</span>
        <span className="lab">Short answers</span>
      </div>

      <h2 className="bh">Questions about the website.</h2>

      <details className="fq">
        <summary>What do I receive at the end?</summary>
        <p>
          A live, production-ready website: the site map and copy direction, responsive design, a component kit and
          flows, the built site, and testing and launch.
        </p>
      </details>

      <details className="fq">
        <summary>Do you design and build it?</summary>
        <p>
          Yes. The website is designed and built by the same person, so what ships matches what was designed and
          nothing is lost in a handoff.
        </p>
      </details>

      <details className="fq">
        <summary>How long does it take?</summary>
        <p>
          The website is the second half of a four-week Brand-to-URL build, delivered together with the identity. If you
          need the website on its own, we scope the timeline on a call.
        </p>
      </details>

      <details className="fq">
        <summary>What if I already have a brand?</summary>
        <p>
          Then the site is designed from your existing identity. If the brand needs work first, the two can be built
          together as one system.
        </p>
      </details>
    </section>
  );
}

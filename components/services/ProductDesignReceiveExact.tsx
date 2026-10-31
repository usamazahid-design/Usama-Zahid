'use client';

import React, { useEffect, useRef } from 'react';

export default function ProductDesignReceiveExact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const rvs = Array.from(el.querySelectorAll<HTMLElement>('.rcv > div, .sh, .bh'));
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
    <section ref={sectionRef} className="pad" id="receive" style={{ paddingTop: 'clamp(80px, 12vw, 170px)' }}>
      <div className="sh">
        <span className="lab">What you receive</span>
        <span className="lab">At the end of the engagement</span>
      </div>

      <h2 className="bh">A product that is easier to use, and the proof.</h2>

      <div className="rcv">
        <div>
          <i />
          <b>Flow and friction audit</b>
          <span>The journey mapped, with the friction points ranked.</span>
        </div>
        <div>
          <i />
          <b>Redesigned flows</b>
          <span>The same goals, reached in fewer steps.</span>
        </div>
        <div>
          <i />
          <b>Interface designs</b>
          <span>Web and mobile screens in your brand.</span>
        </div>
        <div>
          <i />
          <b>Design system</b>
          <span>Components and tokens your team can build with.</span>
        </div>
        <div>
          <i />
          <b>A baseline and measures</b>
          <span>A way to see the change in the numbers.</span>
        </div>
      </div>
    </section>
  );
}

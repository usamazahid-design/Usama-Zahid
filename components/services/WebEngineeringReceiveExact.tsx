'use client';

import React, { useEffect, useRef } from 'react';

export default function WebEngineeringReceiveExact() {
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
        <span className="lab">At go-live</span>
      </div>

      <h2 className="bh">A live site, not a design file.</h2>

      <div className="rcv">
        <div>
          <i />
          <b>Site map and copy direction</b>
          <span>The pages, the order and the words each one needs.</span>
        </div>
        <div>
          <i />
          <b>Responsive design</b>
          <span>Layouts for phone, tablet and desktop.</span>
        </div>
        <div>
          <i />
          <b>Component kit and flows</b>
          <span>Reusable parts and flows that remove steps.</span>
        </div>
        <div>
          <i />
          <b>A built, production-ready website</b>
          <span>Developed from the design, with your brand applied.</span>
        </div>
        <div>
          <i />
          <b>Testing and launch</b>
          <span>Cross-device checks, fixes and go-live.</span>
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function LaunchAssetsScopeExact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rvs = Array.from(
      el.querySelectorAll<HTMLElement>('.rv, .csc, .sh, .bh, .fq, .br2 > div, .rcv > div')
    );
    rvs.forEach((item, i) => {
      item.classList.add('rv');
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
    <section ref={sectionRef} className="pad" id="together" style={{ paddingTop: 'clamp(80px,12vw,170px)' }}>
    <div className="sh"><span className="lab">Scope</span><span className="lab">The assets alone, or with the brand</span></div>
    <h2 className="bh">Launch with what you have, or build it all.</h2>
    <div className="br2">
    <div><span className="lab">The assets</span><h3>Launch assets</h3><p>Social and print pieces built from your existing identity, so the launch looks as considered as the product. We scope the timeline on a call.</p></div>
    <div><span className="lab">The full build</span><h3>Brand-to-URL</h3><p>The identity and a production-ready website, designed and built together. Four weeks, one invoice, no handoff.</p><Link className="go" href="/services/identity/">See brand identity <b>→</b></Link></div>
    </div>
    </section>
  );
}

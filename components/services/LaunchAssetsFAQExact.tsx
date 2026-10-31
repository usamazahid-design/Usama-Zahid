'use client';

import React, { useEffect, useRef } from 'react';

export default function LaunchAssetsFAQExact() {
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
    <section ref={sectionRef} className="pad" id="faq" style={{ paddingTop: 'clamp(80px,12vw,170px)' }}>
    <div className="sh"><span className="lab">Before you write</span><span className="lab">Short answers</span></div>
    <h2 className="bh">Questions about launch assets.</h2>
    <details className="fq"><summary>What do I receive at the end?</summary><p>A launch plan, social media templates, print collateral and the files to reuse them, all built from the same system as your brand and website.</p></details>
    <details className="fq"><summary>Do I need an existing brand identity?</summary><p>The assets are built from your identity. If you do not have one yet, the identity and the assets can be designed together as one system.</p></details>
    <details className="fq"><summary>Which channels do you cover?</summary><p>Social media and print. We agree the exact channels and formats on a call, based on where your launch needs to show up.</p></details>
    <details className="fq"><summary>How long does it take?</summary><p>It depends on how many assets you need, so we scope the timeline together on a call.</p></details>
    </section>
  );
}

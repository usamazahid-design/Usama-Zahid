'use client';

import React, { useEffect, useRef } from 'react';

export default function LaunchAssetsReceiveExact() {
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
    <section ref={sectionRef} className="pad" id="receive" style={{ paddingTop: 'clamp(80px,12vw,170px)' }}>
    <div className="sh"><span className="lab">What you receive</span><span className="lab">For launch day and after</span></div>
    <h2 className="bh">A launch that looks like one brand, everywhere.</h2>
    <div className="rcv">
    <div><i></i><b>Launch plan</b><span>The surfaces the brand has to show up on, in order.</span></div>
    <div><i></i><b>Social media templates</b><span>Post, story and carousel layouts, plus profile and cover images.</span></div>
    <div><i></i><b>Print collateral</b><span>Business cards, stationery, flyers and posters.</span></div>
    <div><i></i><b>Consistent layouts</b><span>Every asset built from the same system as your brand and website.</span></div>
    <div><i></i><b>Ready-to-use files</b><span>Reusable templates and print-ready files for your team.</span></div>
    </div>
    </section>
  );
}

'use client';

import React, { useEffect, useRef } from 'react';

const DELIVERABLES = [
  {
    title: 'Positioning and messaging',
    desc: 'The idea, the audience and the voice, written down.',
  },
  {
    title: 'Logo system',
    desc: 'Primary mark, lockups, icon and favicon versions.',
  },
  {
    title: 'Colour and type system',
    desc: 'A palette and a type pairing with clear usage rules.',
  },
  {
    title: 'Custom pattern',
    desc: 'A pattern drawn for the brand and ready to use on any surface.',
  },
  {
    title: 'Brand guidelines',
    desc: 'A slide-format guide for any designer or developer.',
  },
  {
    title: 'Social and print templates',
    desc: 'Optional, as part of Launch assets.',
  },
];

export default function BrandIdentityReceiveExact() {
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
      id="receive"
      style={{ paddingTop: 'clamp(80px, 12vw, 170px)' }}
    >
      <div className="sh rv">
        <span className="lab">What you receive</span>
        <span className="lab">At the end of the build</span>
      </div>

      <h2 className="bh rv">A working identity, not a folder of logos.</h2>

      <div className="rcv">
        {DELIVERABLES.map((item, idx) => (
          <div key={idx} className="rv">
            <i aria-hidden="true" />
            <b>{item.title}</b>
            <span>{item.desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

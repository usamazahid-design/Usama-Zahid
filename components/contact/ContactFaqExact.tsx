'use client';

import React, { useEffect, useRef } from 'react';

const FAQS = [
  {
    q: 'Who do you work with?',
    a: 'Founders, startups, and growing brands that need an identity, website, and product experience that belong together.',
  },
  {
    q: 'How long does a build take?',
    a: 'Four weeks, from the first conversation to a live URL. Brand identity and website are delivered together.',
  },
  {
    q: 'How many invoices and handoffs?',
    a: 'One invoice and no handoff. The identity and the website are designed against the same strategy by the same person.',
  },
  {
    q: 'Do I work with a team or with you?',
    a: 'With me. It is a solo practice, so the person you brief is the person who designs and builds.',
  },
];

export default function ContactFaqExact() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const rvs = Array.from(el.querySelectorAll<HTMLElement>('.sh, .dh, .fq'));
    rvs.forEach((item, i) => {
      item.classList.add('rv');
      item.style.setProperty('--d', `${(i % 3) * 0.08}s`);
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('vis');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
    );

    rvs.forEach((item) => io.observe(item));
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className="pad"
      id="faq"
      style={{ paddingTop: 'clamp(80px, 12vw, 170px)', paddingBottom: 0 }}
    >
      <div className="sh">
        <span className="lab">Before you write</span>
        <span className="lab">Short answers</span>
      </div>

      <h2 className="dh">Questions founders ask first.</h2>

      {FAQS.map((faq, index) => (
        <details key={index} className="fq">
          <summary>{faq.q}</summary>
          <p>{faq.a}</p>
        </details>
      ))}
    </section>
  );
}

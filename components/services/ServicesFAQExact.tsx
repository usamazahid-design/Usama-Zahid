'use client';

import React, { useEffect, useRef } from 'react';

const FAQS = [
  {
    q: 'Who do you work with?',
    a: 'Founders, startups, and growing brands that need an identity, website, and product experience that belong together.',
  },
  {
    q: 'How long does a build take?',
    a: 'Four weeks, from the first conversation to a live URL.',
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

export default function ServicesFAQExact() {
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
      id="faq"
      style={{ paddingTop: 'clamp(80px, 12vw, 170px)' }}
    >
      <div className="sh rv">
        <span className="lab">Before you write</span>
        <span className="lab">Short answers</span>
      </div>

      <h2 className="wh2 rv">Questions founders ask first.</h2>

      {FAQS.map((faq, idx) => (
        <details key={idx} className="fq rv">
          <summary>{faq.q}</summary>
          <p>{faq.a}</p>
        </details>
      ))}
    </section>
  );
}

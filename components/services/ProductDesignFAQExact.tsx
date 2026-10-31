'use client';

import React, { useEffect, useRef } from 'react';

export default function ProductDesignFAQExact() {
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

      <h2 className="bh">Questions about product design.</h2>

      <details className="fq">
        <summary>What do I receive at the end?</summary>
        <p>
          A friction audit, redesigned flows, interface designs for web and mobile, a design system, and a baseline with
          measures so the change can be seen in the numbers.
        </p>
      </details>

      <details className="fq">
        <summary>Which products do you work on?</summary>
        <p>
          Web and mobile digital products, customer-facing platforms, and internal tools such as ERPs. The best fit is a
          product that already works but costs its users effort.
        </p>
      </details>

      <details className="fq">
        <summary>How long does it take?</summary>
        <p>
          It depends on the size of the product and the flows involved, so we scope the timeline together on a call.
        </p>
      </details>

      <details className="fq">
        <summary>Do I work with a team or with you?</summary>
        <p>
          With me. It is a solo practice, so the person you brief is the person who designs the product.
        </p>
      </details>
    </section>
  );
}

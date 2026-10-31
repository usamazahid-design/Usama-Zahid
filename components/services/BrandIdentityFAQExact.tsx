'use client';

import React, { useEffect, useRef } from 'react';

const BRAND_FAQS = [
  {
    q: 'What is a brand identity system (and how is it different from just a logo)?',
    a: 'A logo is a single mark; a brand identity system is the complete operating layer that governs how your company looks and communicates everywhere. It combines brand positioning, primary and secondary logo lockups, WCAG-tested color tokens, typography hierarchy, custom geometric patterns, and a 38-slide brand guidelines book so your website, product UI, and marketing stay cohesive.',
  },
  {
    q: 'What do I receive at the end of a logo & identity systems project?',
    a: 'Positioning and messaging, a complete logo & identity system (primary mark, wordmark, monochrome and dark/light variants), colour and type tokens, a custom brand pattern, and a 38-slide brand guidelines deck alongside production-ready SVG/PNG/Figma files.',
  },
  {
    q: 'How long does it take?',
    a: 'The identity is the first half of a four-week Brand-to-URL build, delivered together with the website. If you need the identity on its own, we scope the timeline on a call.',
  },
  {
    q: 'Do you also build the website?',
    a: 'Yes. The website is designed from the identity and built to launch, so the two never drift apart. One invoice covers both.',
  },
  {
    q: 'Who do you work with?',
    a: 'Founders, startups, and growing brands that need an identity people recognise and trust. It is a solo practice, so you work directly with me.',
  },
];

export default function BrandIdentityFAQExact() {
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

      <h2 className="bh rv">Questions about brand identity.</h2>

      {BRAND_FAQS.map((faq, idx) => (
        <details key={idx} className="fq rv">
          <summary>{faq.q}</summary>
          <p>{faq.a}</p>
        </details>
      ))}
    </section>
  );
}

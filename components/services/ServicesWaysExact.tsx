'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function ServicesWaysExact() {
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
      id="ways"
      style={{ paddingTop: 'clamp(80px, 12vw, 170px)' }}
    >
      <div className="sh rv">
        <span className="lab">Ways to work together</span>
        <span className="lab">Pick the one that fits</span>
      </div>

      <h2 className="wh2 rv">Start with the build, or with the part that hurts.</h2>

      <div className="ways">
        <div className="wc rv">
          <span className="lab">Most complete</span>
          <h3>Brand-to-URL</h3>
          <p>
            Brand identity and a production-ready website, designed and built together. Four weeks, one invoice, no handoff.
          </p>
          <ul>
            <li>Brand identity</li>
            <li>Production-ready website</li>
            <li>One system, one timeline</li>
          </ul>
        </div>

        <div className="wc rv">
          <span className="lab">For an existing product</span>
          <h3>Product design</h3>
          <p>
            A friction audit and interface redesign for a SaaS or AI product that already works but costs users effort.
          </p>
          <ul>
            <li>Flow and friction audit</li>
            <li>Interface design</li>
            <li>Design system</li>
          </ul>
        </div>

        <div className="wc rv">
          <span className="lab">For launch week</span>
          <h3>Launch assets</h3>
          <p>
            Social and print pieces built from your existing identity, so the launch looks as considered as the product.
          </p>
          <ul>
            <li>Social media templates</li>
            <li>Print collateral</li>
          </ul>
        </div>
      </div>

      <div className="wk4">
        <div className="rv">
          <span>Week one</span>
          <b>Strategy</b>
        </div>
        <div className="rv">
          <span>Week two</span>
          <b>Identity</b>
        </div>
        <div className="rv">
          <span>Week three</span>
          <b>Interface</b>
        </div>
        <div className="rv">
          <span>Week four</span>
          <b>Build and launch</b>
        </div>
      </div>

      <Link className="go rv" href="/brand-to-url/">
        See the four-week process <b aria-hidden="true">&rarr;</b>
      </Link>
    </section>
  );
}

'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function BrandIdentityProofExact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rvs = Array.from(el.querySelectorAll<HTMLElement>('.rv'));

    rvs.forEach((item, i) => {
      item.style.setProperty('--d', `${(i % 2) * 0.1}s`);
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
      id="proof"
      style={{ paddingTop: 'clamp(80px, 12vw, 170px)' }}
    >
      <div className="sh rv">
        <span className="lab">In practice</span>
        <span className="lab">Identity projects</span>
      </div>

      <div className="cs">
        {/* Case 1: Codestreaks */}
        <Link className="csc rv" href="/branding/" data-cur="View">
          <div className="cv">
            <Image
              src="/images/branding/codestreaks/codestreaks-hero.webp"
              alt="Codestreaks brand identity design system"
              width={800}
              height={500}
              className="w-full h-full object-cover"
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
          <div className="cb2">
            <span className="lab">Brand identity</span>
            <h3>Codestreaks</h3>
            <p>A brand identity designed to be recognised quickly and trusted on first contact.</p>
            <div className="st2">
              <div>
                <b>127%</b>
                <span>increase in brand recognition</span>
              </div>
              <div>
                <b>4.8/5</b>
                <span>trust score</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Case 2: Begum */}
        <Link className="csc rv" href="/portfolio/begum-bridal-couture-website" data-cur="View">
          <div className="cv">
            <Image
              src="/images/portfolio/Begum/hero-begum.webp"
              alt="Begum bridal brand identity, custom pattern and guidelines"
              width={800}
              height={500}
              className="w-full h-full object-cover"
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
          <div className="cb2">
            <span className="lab">Brand identity</span>
            <h3>Begum</h3>
            <p>A Pakistani bridal brand: identity, a custom Mughal-inspired pattern and 38-slide brand guidelines.</p>
            <div className="st2">
              <div>
                <b>38</b>
                <span>slides of brand guidelines</span>
              </div>
              <div>
                <b>1</b>
                <span>cohesive identity system</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

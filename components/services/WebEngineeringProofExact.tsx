'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function WebEngineeringProofExact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rvs = Array.from(el.querySelectorAll<HTMLElement>('.csc, .sh'));

    rvs.forEach((item, i) => {
      item.classList.add('rv');
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
      <div className="sh">
        <span className="lab">In practice</span>
        <span className="lab">Website projects</span>
      </div>

      <div className="cs">
        {/* Strong Rental Cars Qatar Case Study Card */}
        <Link className="csc" href="/portfolio/" data-cur="View">
          <div className="cv">
            <Image
              src="/images/portfolio/strong-rental-hero.jpg"
              alt="Strong Rental Cars Qatar luxury vehicle booking website"
              width={800}
              height={500}
              className="w-full h-full object-cover"
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
          <div className="cb2">
            <span className="lab">Website and booking flow</span>
            <h3>Strong Rental Cars Qatar</h3>
            <p>A car rental website where the booking journey was rebuilt from six steps down to three.</p>
            <div className="st2">
              <div>
                <b>58%</b>
                <span>more completed bookings</span>
              </div>
              <div>
                <b>41%</b>
                <span>less time to book</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Begum Case Study Card */}
        <Link className="csc" href="/portfolio/begum-bridal-couture-website" data-cur="View">
          <div className="cv">
            <Image
              src="/images/portfolio/Begum/live-begum.webp"
              alt="Begum bridal couture live production website"
              width={800}
              height={500}
              className="w-full h-full object-cover"
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
          <div className="cb2">
            <span className="lab">Brand-to-URL</span>
            <h3>Begum</h3>
            <p>A Pakistani bridal brand: identity, custom pattern, guidelines, web, social, print, and production development.</p>
            <div className="st2">
              <div>
                <b>38</b>
                <span>slides of brand guidelines</span>
              </div>
              <div>
                <b>1</b>
                <span>system, brand to URL</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

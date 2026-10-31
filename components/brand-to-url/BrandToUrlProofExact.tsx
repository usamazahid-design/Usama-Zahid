'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function BrandToUrlProofExact() {
  return (
    <section className="pad" id="proof" style={{ paddingTop: 'clamp(80px, 12vw, 170px)' }}>
      <div className="sh">
        <span className="lab">In practice</span>
        <span className="lab">Where the work shows</span>
      </div>
      <div className="cs3">
        {/* BEGUM */}
        <Link className="csc" href="/portfolio/begum-bridal-couture-website/" data-cur="View">
          <div className="cv">
            <Image
              src="/images/portfolio/Begum/hero-begum.webp"
              alt="Begum bridal brand, custom pattern and web experience"
              width={800}
              height={500}
              className="w-full h-full object-cover"
              sizes="(max-width: 900px) 100vw, 33vw"
            />
          </div>
          <div className="cb2">
            <span className="lab">Brand-to-URL</span>
            <h3>Begum</h3>
            <p>A Pakistani bridal brand: identity, a custom pattern, guidelines, web, social, print and development.</p>
            <div className="st2">
              <div>
                <b>38</b>
                <span>slides of guidelines</span>
              </div>
              <div>
                <b>1</b>
                <span>system, brand to URL</span>
              </div>
            </div>
          </div>
        </Link>

        {/* CODESTREAKS */}
        <Link className="csc" href="/branding/" data-cur="View">
          <div className="cv">
            <Image
              src="/images/branding/codestreaks/codestreaks-hero.webp"
              alt="Codestreaks brand identity design system"
              width={800}
              height={500}
              className="w-full h-full object-cover"
              sizes="(max-width: 900px) 100vw, 33vw"
            />
          </div>
          <div className="cb2">
            <span className="lab">Brand identity</span>
            <h3>Codestreaks</h3>
            <p>An identity designed to be recognised quickly and trusted on first contact.</p>
            <div className="st2">
              <div>
                <b>127%</b>
                <span>brand recognition</span>
              </div>
              <div>
                <b>4.8/5</b>
                <span>trust score</span>
              </div>
            </div>
          </div>
        </Link>

        {/* STRONG RENTAL CARS */}
        <Link className="csc" href="/portfolio/" data-cur="View">
          <div className="cv">
            <Image
              src="/images/portfolio/strong-rental-hero.jpg"
              alt="Strong Rental Cars Qatar three-step booking flow redesign"
              width={800}
              height={500}
              className="w-full h-full object-cover"
              sizes="(max-width: 900px) 100vw, 33vw"
            />
          </div>
          <div className="cb2">
            <span className="lab">Website and booking flow</span>
            <h3>Strong Rental Cars Qatar</h3>
            <p>A booking journey rebuilt from six steps down to three.</p>
            <div className="st2">
              <div>
                <b>58%</b>
                <span>more bookings completed</span>
              </div>
              <div>
                <b>41%</b>
                <span>less time to book</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

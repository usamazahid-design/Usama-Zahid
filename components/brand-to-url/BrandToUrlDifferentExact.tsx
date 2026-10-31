'use client';

import React, { useEffect, useRef } from 'react';

export default function BrandToUrlDifferentExact() {
  const cmpRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cmpRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('vis');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="pad" id="different" style={{ paddingTop: 'clamp(80px, 12vw, 170px)' }}>
      <div className="sh">
        <span className="lab">The problem</span>
        <span className="lab">Why one system matters</span>
      </div>
      <h2 className="bh">Customers feel the gap between a brand and a website made apart.</h2>
      <div
        ref={cmpRef}
        className="cmp"
        id="cmp"
        role="img"
        aria-label="Two lanes: the usual way has a handoff gap and two invoices between brand and website, while Brand-to-URL is one continuous line with one invoice"
      >
        <svg viewBox="0 0 800 300">
          <text x="20" y="34" style={{ fontSize: '15px', fontWeight: 700, fill: 'var(--ink)' }}>
            The usual way
          </text>
          <rect x="20" y="52" width="260" height="56" style={{ fill: 'var(--ink)' }} />
          <text x="40" y="86" style={{ fontSize: '16px', fontWeight: 700, fill: 'var(--bg)' }}>
            Brand, made by one person
          </text>
          <line
            className="gd2"
            pathLength={1}
            x1="284"
            y1="80"
            x2="516"
            y2="80"
            style={{ stroke: 'var(--mute)', strokeWidth: 2, strokeDasharray: '6 6' }}
          />
          <g className="fd" style={{ ['--d' as any]: '.9s' }}>
            <rect x="344" y="62" width="112" height="36" style={{ fill: 'var(--bg)', stroke: 'var(--ink)' }} />
            <text x="400" y="85" textAnchor="middle" style={{ fontSize: '14px', fontWeight: 700, fill: 'var(--ink)' }}>
              Handoff gap
            </text>
          </g>
          <rect x="520" y="52" width="260" height="56" style={{ fill: 'var(--mute)' }} />
          <text x="540" y="86" style={{ fontSize: '16px', fontWeight: 700, fill: 'var(--bg)' }}>
            Website, made by another
          </text>
          <text className="fd" style={{ ['--d' as any]: '1s', fontSize: '13px', fill: 'var(--mute)' }} x="20" y="132">
            Invoice one
          </text>
          <text className="fd" style={{ ['--d' as any]: '1s', fontSize: '13px', fill: 'var(--mute)' }} x="520" y="132">
            Invoice two
          </text>
          <text x="20" y="196" style={{ fontSize: '15px', fontWeight: 700, fill: 'var(--ink)' }}>
            Brand-to-URL
          </text>
          <rect className="gx" x="20" y="214" width="380" height="56" fill="#4B3FFF" style={{ ['--d' as any]: '.2s' }} />
          <rect className="gx" x="400" y="214" width="380" height="56" fill="#4B3FFF" style={{ ['--d' as any]: '.6s' }} />
          <text className="fd" x="40" y="248" style={{ ['--d' as any]: '1.2s', fontSize: '16px', fontWeight: 700, fill: '#fff' }}>
            Brand identity
          </text>
          <text className="fd" x="420" y="248" style={{ ['--d' as any]: '1.4s', fontSize: '16px', fontWeight: 700, fill: '#fff' }}>
            Production-ready website
          </text>
          <rect className="fd" style={{ ['--d' as any]: '1.2s', fill: 'var(--bg)' }} x="399" y="214" width="2" height="56" />
          <text className="fd" x="20" y="292" style={{ ['--d' as any]: '1.5s', fontSize: '13px', fill: 'var(--mute)' }}>
            One invoice, one system, no handoff
          </text>
        </svg>
        <div className="cmpn">
          <p>
            <b>The usual way</b>A brand is made, then handed to a developer who has to interpret it. Two people, two invoices, and a gap that customers notice.
          </p>
          <p>
            <b>Brand-to-URL</b>The identity and the website are designed against the same strategy by the same person, so nothing is translated and nothing drifts apart.
          </p>
        </div>
      </div>
    </section>
  );
}

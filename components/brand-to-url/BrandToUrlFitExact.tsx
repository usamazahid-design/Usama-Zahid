'use client';

import React from 'react';
import Link from 'next/link';

export default function BrandToUrlFitExact() {
  return (
    <section className="pad" id="fit" style={{ paddingTop: 'clamp(80px, 12vw, 170px)' }}>
      <div className="sh">
        <span className="lab">Is it right for you</span>
        <span className="lab">A quick check</span>
      </div>
      <h2 className="bh">Who Brand-to-URL is for.</h2>
      <div className="qual">
        <div>
          <h3>A good fit</h3>
          <ul>
            <li>You are a founder or team launching or rebranding.</li>
            <li>You need a brand and a website at the same time.</li>
            <li>You want one person accountable for both.</li>
            <li>You want to go live in weeks, not months.</li>
          </ul>
        </div>
        <div>
          <h3>Something else fits better</h3>
          <ul>
            <li>
              You only need an identity: <Link href="/services/identity/">see brand identity</Link>.
            </li>
            <li>
              You only need a site: <Link href="/services/engineering/">see the website service</Link>.
            </li>
            <li>
              You need to fix a live product: <Link href="/services/product/">see product design</Link>.
            </li>
            <li>
              You need launch pieces: <Link href="/services/strategy/">see launch assets</Link>.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

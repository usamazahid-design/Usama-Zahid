'use client';

import React from 'react';

export default function BrandToUrlStartExact() {
  return (
    <section className="pad" id="start" style={{ paddingTop: 'clamp(80px, 12vw, 170px)' }}>
      <div className="sh">
        <span className="lab">How to start</span>
        <span className="lab">Three steps</span>
      </div>
      <h2 className="bh">From a call to week one.</h2>
      <div className="start">
        <div>
          <b>1</b>
          <h3>Book a call</h3>
          <p>Tell me what you are building and where the brand and website stand today.</p>
        </div>
        <div>
          <b>2</b>
          <h3>Agree the scope</h3>
          <p>We agree what is included, the price and a start date before any work begins.</p>
        </div>
        <div>
          <b>3</b>
          <h3>Week one begins</h3>
          <p>Strategy first, then identity, the website and launch, over four weeks.</p>
        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';

export default function BrandToUrlIncludedExact() {
  return (
    <section className="pad" id="included" style={{ paddingTop: 'clamp(80px, 12vw, 170px)' }}>
      <div className="sh">
        <span className="lab">What is included</span>
        <span className="lab">One offer, two halves</span>
      </div>
      <h2 className="bh">Everything between a first conversation and a live URL.</h2>
      <div className="inc">
        <div>
          <span className="lab">The brand</span>
          <h3>Brand identity</h3>
          <ul>
            <li>Positioning and messaging</li>
            <li>Logo system</li>
            <li>Colour and type</li>
            <li>Custom pattern</li>
            <li>Brand guidelines</li>
          </ul>
        </div>
        <div>
          <span className="lab">The website</span>
          <h3>Production-ready website</h3>
          <ul>
            <li>Structure and copy direction</li>
            <li>Responsive design</li>
            <li>Component kit and flows</li>
            <li>Development</li>
            <li>Testing and launch</li>
          </ul>
        </div>
      </div>
      <div className="promise">
        <div>
          <b>One strategy</b>
          <span>Both halves are built on the same idea.</span>
        </div>
        <div>
          <b>One invoice</b>
          <span>A single invoice for the brand and the website.</span>
        </div>
        <div>
          <b>No handoff</b>
          <span>The person who designs it also builds it.</span>
        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';

const FAQ_ITEMS = [
  {
    q: 'What is Brand-to-URL?',
    a: 'A single offer that covers the brand identity and a production-ready website, designed and built together over four weeks, with one invoice and no handoff between the two.',
  },
  {
    q: 'Why does doing both together matter?',
    a: 'When one person designs the identity and the site against the same strategy, nothing has to be translated between teams, and the website never drifts away from the brand.',
  },
  {
    q: 'What if I only need part of it?',
    a: 'You can start with the identity, the website, product design or launch assets on their own. We scope the timeline for each on a call.',
  },
  {
    q: 'How much does it cost?',
    a: 'It depends on the scope, so we agree the price on a call before any work begins.',
  },
  {
    q: 'Who do you work with?',
    a: 'Founders, startups, and growing brands that need an identity and website built as one system. It is a solo practice, so you work directly with me.',
  },
];

export default function BrandToUrlFAQExact() {
  return (
    <section className="pad" id="faq" style={{ paddingTop: 'clamp(80px, 12vw, 170px)' }}>
      <div className="sh">
        <span className="lab">Before you write</span>
        <span className="lab">Short answers</span>
      </div>
      <h2 className="bh">Questions about Brand-to-URL.</h2>
      {FAQ_ITEMS.map((item, idx) => (
        <details key={idx} className="fq">
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </section>
  );
}

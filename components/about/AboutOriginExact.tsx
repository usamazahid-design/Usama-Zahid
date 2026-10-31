'use client';

import React, { useEffect, useRef } from 'react';

const HEADLINE_TEXT = 'I failed a physics exam. Then I passed by drawing the system first.';
const WORDS = HEADLINE_TEXT.split(' ');

export default function AboutOriginExact() {
  const litRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = litRef.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>('.w'));

    if (reduce) {
      spans.forEach((s) => s.classList.add('on'));
      return;
    }

    let lastNum = -1;

    const onScroll = () => {
      const vh = window.innerHeight;
      const r = el.getBoundingClientRect();
      const pg = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.3)));
      const nw = Math.round(pg * spans.length);

      if (nw !== lastNum) {
        lastNum = nw;
        spans.forEach((s, idx) => {
          s.classList.toggle('on', idx < nw);
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section className="pad org" id="origin">
      <div className="sh">
        <span className="lab">Origin</span>
        <span className="lab">Where the method comes from</span>
      </div>

      <h2 className="lit" id="lit" ref={litRef}>
        {WORDS.map((w, i) => (
          <React.Fragment key={i}>
            <span className="w">{w}</span>
            {i < WORDS.length - 1 ? ' ' : ''}
          </React.Fragment>
        ))}
      </h2>

      <div className="cols">
        <p>
          That habit never left. Physics taught me to look for the structure under a problem before touching it, and I carry that into every brand and every website: before I design a logo or a layout, I draw the system the business actually runs on.
        </p>
        <p>
          Most of the founders I work with share one problem. The brand was made by one person and the website by another, and customers feel the gap between them. I deliver the identity and a production-ready website together, as one system and one invoice, with no handoff between the two.
        </p>
        <p>
          I treat design as business infrastructure, not aesthetics. The work I value most removes friction nobody reported, and I measure it by what changes for the business.
        </p>
      </div>
    </section>
  );
}

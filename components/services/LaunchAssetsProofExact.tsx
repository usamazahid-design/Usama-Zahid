'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function LaunchAssetsProofExact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rvs = Array.from(
      el.querySelectorAll<HTMLElement>('.rv, .csc, .sh, .bh, .fq, .br2 > div, .rcv > div')
    );
    rvs.forEach((item, i) => {
      item.classList.add('rv');
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
    <section ref={sectionRef} className="pad" id="proof" style={{ paddingTop: 'clamp(80px,12vw,170px)' }}>
    <div className="sh"><span className="lab">In practice</span><span className="lab">Assets built on one system</span></div>
    <div className="cs">
    <Link className="csc" href="/branding/begum/" data-cur="View"><div className="cv"><svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden={true}><defs><pattern id="pt5" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M30 4L56 30L30 56L4 30Z" fill="none" stroke="#fff" strokeWidth="2"/><circle cx="30" cy="30" r="7" fill="#fff"/><rect width="8" height="8" fill="#fff" opacity=".55"/></pattern></defs><rect width="800" height="500" style={{ fill: 'var(--ink)' }}/>
    <rect x="60" y="60" width="290" height="380" fill="#4B3FFF"/><rect x="60" y="60" width="290" height="380" fill="url(#pt5)" opacity=".9"/>
    <g transform="rotate(-5 560 250)"><rect x="410" y="110" width="310" height="200" style={{ fill: 'var(--bg)', stroke: 'var(--line)' }}/></g><g transform="rotate(3 560 250)"><rect x="420" y="130" width="310" height="200" style={{ fill: 'var(--mute)' }}/></g>
    <rect x="410" y="150" width="330" height="210" style={{ fill: 'var(--bg)' }}/><rect x="432" y="174" width="120" height="14" rx="3" fill="#4B3FFF"/><rect x="432" y="198" width="200" height="8" rx="4" style={{ fill: 'var(--ink)', opacity: '.5' }}/><rect x="432" y="214" width="160" height="8" rx="4" style={{ fill: 'var(--ink)', opacity: '.5' }}/><rect x="432" y="258" width="76" height="76" fill="#4B3FFF"/><text x="530" y="326" fontSize="64" fontWeight="700" style={{ fill: 'var(--ink)', fontFamily: 'var(--sans)' }}>Aa</text></svg></div><div className="cb2"><span className="lab">Brand-to-URL for a Pakistani bridal brand</span><h3>Begum</h3><p>A complete delivery: identity, a custom Mughal-inspired pattern, guidelines, web, social, print and development.</p><div className="st2"><div><b>38</b><span>slides of brand guidelines</span></div><div><b>1</b><span>system, from brand to live URL</span></div></div></div></Link>
    <Link className="csc" href="/blog/" data-cur="View"><div className="cv"><svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden={true}><rect width="800" height="500" fill="#040404"/><rect x="60" y="64" width="40" height="40" fill="#4B3FFF"/><text x="60" y="190" style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '64px', fill: '#F6F6F6' }}>Friction you</text><text x="60" y="262" style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '64px', fill: '#F6F6F6' }}>cannot see costs</text><text x="60" y="334" style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '64px', fill: '#F6F6F6' }}>the most.</text><text x="60" y="440" style={{ fontFamily: 'var(--sans)', fontSize: '20px', fill: '#A0A0AA' }}>Usama Zahid</text></svg></div><div className="cb2"><span className="lab">Studio content</span><h3>LinkedIn posts</h3><p>Case studies, branding philosophy, process reveals and motivational posts, designed as one post system with a consistent look.</p><div className="st2"><div><b>1</b><span>post system, many posts</span></div><div><b>4</b><span>content themes, one look</span></div></div></div></Link>
    </div>
    </section>
  );
}

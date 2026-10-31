'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { cv } from '@/lib/cv-data';

const shapes = [
  <svg key="1" viewBox="0 0 100 100" aria-hidden="true">
    <path className="r" d="M0 100V0A100 100 0 0 1 100 100Z" fill="currentColor" />
  </svg>,
  <svg key="2" viewBox="0 0 100 100" aria-hidden="true">
    <rect x="0" y="0" width="60" height="60" fill="currentColor" />
    <rect className="r" x="60" y="60" width="40" height="40" fill="#4B3FFF" />
  </svg>,
  <svg key="3" viewBox="0 0 100 100" aria-hidden="true">
    <circle className="r" cx="50" cy="50" r="50" fill="currentColor" />
    <rect x="50" y="50" width="50" height="50" fill="#4B3FFF" />
  </svg>,
];

export default function HireExperienceExact() {
  const sectionRef = useRef<HTMLElement>(null);
  const roles = cv.experience.slice(0, 3);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    document.documentElement.classList.add('js');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rvs = Array.from(el.querySelectorAll<HTMLElement>('.rv'));
    rvs.forEach((item, i) => item.style.setProperty('--d', `${(i % 4) * 0.08}s`));
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
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    rvs.forEach((item) => io.observe(item));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="pad" id="hire-experience">
      <div className="sv">
        <div className="sv-l">
          <h2 className="rv">Experience</h2>
          <p className="rv">Recent roles recruiters ask about first — full timeline on the CV.</p>
          <span className="big rv" data-n={roles.length}>
            {roles.length}
          </span>
          <span className="mono rv">roles highlighted</span>
          <Link className="btn svc-all-btn rv" href="/cv/" data-cur="CV">
            <span>Open full CV</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div>
          {roles.map((item, i) => (
            <article key={`${item.company}-${item.year}`} className="svc rv">
              <div>
                {shapes[i % shapes.length]}
                <h3>{item.role.replace(/_/g, ' ')}</h3>
              </div>
              <div>
                <p>{item.description}</p>
                <ul>
                  {item.highlights.slice(0, 3).map((h) => (
                    <li key={h.slice(0, 40)}>{h}</li>
                  ))}
                </ul>
                <span className="pr">
                  {item.company.replace(/_/g, ' ')} · {item.location.replace(/ · /g, ', ')} ·{' '}
                  {item.year}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useEffect, useRef } from 'react';
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
    <path className="r" d="M0 100A100 100 0 0 1 100 0V40A60 60 0 0 0 40 100Z" fill="currentColor" />
  </svg>,
  <svg key="4" viewBox="0 0 100 100" aria-hidden="true">
    <circle className="r" cx="50" cy="50" r="50" fill="currentColor" />
    <rect x="50" y="50" width="50" height="50" fill="#4B3FFF" />
  </svg>,
];

function pretty(s: string) {
  return s.replace(/_/g, ' ');
}

export default function CVExperience() {
  const sectionRef = useRef<HTMLElement>(null);

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
    <section ref={sectionRef} className="pad" id="cv-experience">
      <div className="sv">
        <div className="sv-l">
          <h2 className="rv">Experience</h2>
          <p className="rv">Roles across agency and product work, each tied to shipped outcomes.</p>
          <span className="big rv" data-n={cv.experience.length}>
            {cv.experience.length}
          </span>
          <span className="mono rv">roles · {cv.yearsActive} years</span>
        </div>

        <div>
          {cv.experience.map((job, i) => (
            <article key={job.company} className="svc rv">
              <div>
                {shapes[i % shapes.length]}
                <h3>{pretty(job.role)}</h3>
              </div>
              <div>
                <p>{job.description}</p>
                <ul>
                  {job.highlights.slice(0, 3).map((h) => (
                    <li key={h.slice(0, 48)}>{h}</li>
                  ))}
                </ul>
                <span className="pr">
                  {pretty(job.company)} · {pretty(job.location)} · {job.year}
                  {job.current ? ' · Current' : ''}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

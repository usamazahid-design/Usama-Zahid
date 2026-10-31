'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Project } from '@/lib/portfolio-data';
import { BrandingCase } from '@/lib/branding-data';
import { formatBrandingCategory } from '@/lib/branding-utils';

interface HireWorkExactProps {
  projects: Project[];
  branding: BrandingCase[];
}

const PLACEHOLDER = '/images/portfolio/placeholders/';

function projectCover(project: Project) {
  const hook = project.hook.image.content;
  if (hook.type === 'image' && !hook.src.includes(PLACEHOLDER)) {
    return { src: hook.src, alt: hook.alt };
  }
  return null;
}

function shortTitle(title: string) {
  return title.split(/\s[-–—]\s/)[0]?.trim() || title;
}

export default function HireWorkExact({ projects, branding }: HireWorkExactProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const panels = [
    ...projects.map((p, i) => ({
      key: p.slug,
      href: `/portfolio/${p.slug}/`,
      tone: i % 2 === 0 ? 'is-ind' : 'is-ink',
      fig: `Fig. ${i + 1}. Product · ${p.client}`,
      title: shortTitle(p.title),
      body: p.hook.outcomeLine,
      meta: `${p.role} · Shipped ${p.year}`,
      cover: projectCover(p),
    })),
    ...branding.map((b, i) => ({
      key: b.slug,
      href: `/branding/${b.slug}/`,
      tone: (projects.length + i) % 2 === 0 ? 'is-ind' : 'is-ink',
      fig: `Fig. ${projects.length + i + 1}. ${formatBrandingCategory(b.category)} · ${b.client}`,
      title: shortTitle(b.title),
      body: b.overview?.trim() || b.descriptor?.trim() || '',
      meta: `${b.role} · Shipped ${b.year}`,
      cover: { src: b.heroImage.src, alt: b.heroImage.alt },
    })),
  ];

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = Array.from(root.querySelectorAll<HTMLElement>('.panel'));
    let tops: number[] = [];
    let rafId = 0;

    const meas = () => {
      tops = els.map((p) => {
        const val = parseFloat(getComputedStyle(p).top);
        return !isNaN(val) && val > 0 ? val : window.innerHeight * 0.11;
      });
    };
    meas();
    window.addEventListener('resize', meas);

    if (reduce || els.length === 0) {
      return () => window.removeEventListener('resize', meas);
    }

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      els.forEach((p, i) => {
        const rr = Math.max(-600, Math.min(600, p.getBoundingClientRect().top - (tops[i] || 0)));
        p.style.setProperty('--py', (-rr * 0.08).toFixed(1));
        p.style.setProperty('--pr', (rr * 0.015).toFixed(2));
        const n = els[i + 1];
        if (!n) {
          p.style.transform = '';
          return;
        }
        const top = tops[i] || 0;
        const q = Math.min(
          1,
          Math.max(0, 1 - (n.getBoundingClientRect().top - top) / p.offsetHeight)
        );
        p.style.transform = `scale(${(1 - q * 0.05).toFixed(3)})`;
      });
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', meas);
      els.forEach((p) => {
        p.style.removeProperty('--py');
        p.style.removeProperty('--pr');
        p.style.transform = '';
      });
    };
  }, [panels.length]);

  return (
    <section ref={sectionRef} id="hire-work">
      <div className="pad wh">
        <div>
          <h2>Selected work</h2>
          <span className="lab">Product cases and brand systems with outcomes</span>
        </div>
        <Link className="see-all-link" href="/portfolio/" data-cur="Portfolio">
          All work <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      <div className="stack">
        {panels.map((item) => (
          <a key={item.key} className={`panel ${item.tone}`} href={item.href} data-cur="View Case">
            <div className="tx">
              <div className="tx-top">
                <span className="lab">{item.fig}</span>
                <span className="view-tag">
                  Case Study <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <span className="meta-tag">{item.meta}</span>
              </div>
            </div>
            <div className="pa">
              {item.cover ? (
                <img
                  className="panel-img"
                  src={item.cover.src}
                  alt={item.cover.alt}
                  loading="lazy"
                />
              ) : (
                <span className="lab">Image pending</span>
              )}
            </div>
          </a>
        ))}
      </div>

      <div className="pad work-footer">
        <div className="work-footer-inner">
          <div>
            <span className="lab">More proof</span>
            <p className="work-footer-sub">
              Full product case studies and brand identity systems, documented end to end.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link className="btn work-btn" href="/portfolio/" data-cur="Portfolio">
              <span>Portfolio</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link className="btn btn-ghost" href="/branding/" data-cur="Branding">
              Branding <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  BrandingCase,
  BrandingCategory,
  brandingCategories,
} from '@/lib/branding-data';
import { formatBrandingCategory } from '@/lib/branding-utils';

interface BrandingIndexExactProps {
  projects: BrandingCase[];
}

function shortTitle(title: string) {
  const cut = title.split(/\s[-–—]\s/)[0]?.trim();
  return cut || title;
}

function outcomeLine(project: BrandingCase) {
  const overview = project.overview?.trim() || project.descriptor?.trim() || '';
  return overview.length > 140 ? `${overview.slice(0, 137)}…` : overview;
}

export default function BrandingIndexExact({ projects }: BrandingIndexExactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<BrandingCategory | 'ALL'>('ALL');

  const filtered = useMemo(() => {
    if (activeCategory === 'ALL') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory, projects]);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const panels = Array.from(root.querySelectorAll<HTMLElement>('.panel'));
    let tops: number[] = [];
    let rafId = 0;

    const meas = () => {
      tops = panels.map((p) => {
        const val = parseFloat(getComputedStyle(p).top);
        return !isNaN(val) && val > 0 ? val : window.innerHeight * 0.11;
      });
    };
    meas();
    window.addEventListener('resize', meas);

    if (reduce || panels.length === 0) {
      return () => window.removeEventListener('resize', meas);
    }

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      panels.forEach((p, i) => {
        const rr = Math.max(-600, Math.min(600, p.getBoundingClientRect().top - (tops[i] || 0)));
        p.style.setProperty('--py', (-rr * 0.08).toFixed(1));
        p.style.setProperty('--pr', (rr * 0.015).toFixed(2));
        const n = panels[i + 1];
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
      panels.forEach((p) => {
        p.style.removeProperty('--py');
        p.style.removeProperty('--pr');
        p.style.transform = '';
      });
    };
  }, [filtered]);

  return (
    <section ref={sectionRef} id="brand-index">
      <div className="pad wh">
        <div>
          <h2>Brand case index</h2>
          <span className="lab">
            {String(filtered.length).padStart(2, '0')} projects
            {activeCategory !== 'ALL'
              ? ` · ${formatBrandingCategory(activeCategory)}`
              : ' · filter by category'}
          </span>
        </div>
        <Link className="see-all-link" href="/portfolio/" data-cur="Portfolio">
          Product cases <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      <div className="pad pf-filters">
        <div className="t-pills" role="tablist" aria-label="Filter by category">
          {brandingCategories.map((cat) => {
            const label = cat.value === 'ALL' ? 'All' : cat.label;
            const on = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                role="tab"
                aria-selected={on}
                className={`t-pill${on ? ' on' : ''}`}
                onClick={() => setActiveCategory(cat.value)}
                data-cur={label}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="stack">
          {filtered.map((project, i) => {
            const tone = i % 2 === 0 ? 'is-ind' : 'is-ink';
            const fig = `Fig. ${i + 1}. ${formatBrandingCategory(project.category)} · ${project.client}`;
            return (
              <a
                key={project.slug}
                className={`panel ${tone}`}
                href={`/branding/${project.slug}/`}
                data-cur="View Case"
              >
                <div className="tx">
                  <div className="tx-top">
                    <span className="lab">{fig}</span>
                    <span className="view-tag">
                      Case Study <span aria-hidden="true">&rarr;</span>
                    </span>
                  </div>
                  <div>
                    <h3>{shortTitle(project.title)}</h3>
                    <p>{outcomeLine(project)}</p>
                    <span className="meta-tag">
                      {project.role} · Shipped {project.year}
                    </span>
                  </div>
                </div>
                <div className="pa">
                  <img
                    className="panel-img"
                    src={project.heroImage.src}
                    alt={project.heroImage.alt}
                    loading="lazy"
                  />
                </div>
              </a>
            );
          })}
        </div>
      ) : (
        <div className="pad pf-empty">
          <p className="ser">No brand cases in this category yet.</p>
        </div>
      )}

      <div className="pad work-footer">
        <div className="work-footer-inner">
          <div>
            <span className="lab">Next step</span>
            <p className="work-footer-sub">
              Need an identity that survives product, web, and print? Brief the person who will
              design the full system.
            </p>
          </div>
          <a
            className="btn work-btn"
            href="https://cal.com/usama-zahid-haadwj/15min"
            target="_blank"
            rel="noopener noreferrer"
            data-cur="Calendar"
          >
            <span>Book a strategy call</span>
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}

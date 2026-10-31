'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

type HeroAction = {
  label: string;
  href: string;
  primary?: boolean;
};

type HeroStat = {
  label: string;
  value: string;
};

type HeroInsight = {
  label: string;
  value: string;
};

interface SimplePageHeroProps {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  meta?: string;
  folioLeft?: string;
  folioCenter?: string;
  folioRight?: string;
  actions?: HeroAction[];
  stats?: HeroStat[];
  insights?: HeroInsight[];
}

function splitTitle(title: string): string[] {
  const parts = title
    .split(/\n|,(?=\s)|(?<=\.)\s+/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length >= 2) return parts.slice(0, 3);
  const words = title.trim().split(/\s+/);
  if (words.length <= 4) return [title];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
}

export default function SimplePageHero({
  id,
  eyebrow,
  title,
  description,
  meta,
  folioLeft,
  folioCenter,
  folioRight = 'usamazahid.design',
  actions = [],
  stats = [],
  insights = [],
}: SimplePageHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const lines = splitTitle(title);

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.add('ready');
      });
    });
  }, []);

  const primary = actions.find((a) => a.primary) || actions[0];
  const secondary = actions.filter((a) => a !== primary);

  return (
    <section ref={heroRef} className="hero pad" style={{ paddingTop: '110px' }} id={id || 'top'}>
      <div className="fo">
        <span>{folioLeft || eyebrow.replace(/[\[\]]/g, '').trim()}</span>
        <span>{folioCenter || meta || 'Usama Zahid'}</span>
        <span>{folioRight}</span>
      </div>

      <div className="hg">
        <div className="ht">
          <h1>
            {lines.map((line, i) => (
              <span key={line} className={i === 0 ? 'ln' : 'ln it2'}>
                <span style={{ '--d': `${0.05 + i * 0.12}s` } as React.CSSProperties}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="sub">{description}</p>
          {primary ? (
            <div className="cta-actions" style={{ marginTop: 0 }}>
              {primary.href.startsWith('http') || primary.href.startsWith('mailto:') ? (
                <a
                  className="btn"
                  href={primary.href}
                  target={primary.href.startsWith('http') ? '_blank' : undefined}
                  rel={primary.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  data-cur={primary.label}
                >
                  {primary.label} <span aria-hidden="true">&rarr;</span>
                </a>
              ) : (
                <Link className="btn" href={primary.href} data-cur={primary.label}>
                  {primary.label} <span aria-hidden="true">&rarr;</span>
                </Link>
              )}
              {secondary.map((action) =>
                action.href.startsWith('http') || action.href.startsWith('mailto:') ? (
                  <a
                    key={`${action.href}-${action.label}`}
                    className="btn btn-ghost"
                    href={action.href}
                    target={action.href.startsWith('http') ? '_blank' : undefined}
                    rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    data-cur={action.label}
                  >
                    {action.label} <span aria-hidden="true">&rarr;</span>
                  </a>
                ) : (
                  <Link
                    key={`${action.href}-${action.label}`}
                    className="btn btn-ghost"
                    href={action.href}
                    data-cur={action.label}
                  >
                    {action.label} <span aria-hidden="true">&rarr;</span>
                  </Link>
                )
              )}
            </div>
          ) : null}
        </div>

        {insights.length > 0 ? (
          <div className="hl">
            <nav className="toc" aria-label="On this page">
              <p>Focus</p>
              {insights.slice(0, 4).map((item, i) => (
                <div key={item.label} className="toc-static">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <b>{item.label}</b>
                  <em>{item.value}</em>
                </div>
              ))}
            </nav>
          </div>
        ) : null}
      </div>

      {stats.length > 0 ? (
        <div className="pf" aria-label="Page overview">
          {stats.slice(0, 4).map((item) => (
            <div key={item.label}>
              <b>{item.value}</b>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}

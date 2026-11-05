'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { BrandingCase } from '@/lib/branding-data';
import { formatBrandingCategory } from '@/lib/branding-utils';

interface BrandingCaseExactProps {
  project: BrandingCase;
  nextCase?: BrandingCase | null;
}

function shortTitle(title: string) {
  return title.split(/\s[-–—]\s/)[0]?.trim() || title;
}

function firstSentence(text: string) {
  const trimmed = text.trim();
  const match = trimmed.match(/^[^.!?]+[.!?]?/);
  return match?.[0]?.trim() || trimmed;
}

function splitPositioning(text: string): string[] {
  const clean = text.replace(/\.$/, '').trim();
  if (!clean) return [];
  const comma = clean.indexOf(',');
  if (comma > 8 && comma < clean.length - 4) {
    return [`${clean.slice(0, comma + 1)}`, `${clean.slice(comma + 1).trim()}.`];
  }
  const words = clean.split(/\s+/);
  if (words.length <= 6) return [`${clean}.`];
  const mid = Math.ceil(words.length / 2);
  return [`${words.slice(0, mid).join(' ')}`, `${words.slice(mid).join(' ')}.`];
}

function briefHead(text: string, maxWords = 5) {
  const clean = firstSentence(text).replace(/\.$/, '');
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return clean;
  return words.slice(0, maxWords).join(' ');
}

function italicPunch(text: string): string {
  const clean = firstSentence(text).replace(/\.$/, '').trim();
  if (!clean) return 'A system that holds.';
  return `${clean}.`;
}

function nameLines(title: string): string[] {
  const n = shortTitle(title).trim();
  const parts = n.split(/\s+/);
  if (parts.length <= 2) return [`${n}.`];
  const mid = Math.ceil(parts.length / 2);
  return [parts.slice(0, mid).join(' '), `${parts.slice(mid).join(' ')}.`];
}

function SectionHead({ title, lab }: { title: string; lab: string }) {
  return (
    <div className="wh">
      <div>
        <h2>{title}</h2>
        <span className="lab">{lab}</span>
      </div>
    </div>
  );
}

const PLATE = ['ivo', 'cr', 'ink', 'ind'] as const;

export default function BrandingCaseExact({ project, nextCase }: BrandingCaseExactProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const appsRef = useRef<HTMLElement>(null);
  const name = shortTitle(project.title);
  const contextParts = project.context.split('\n\n').filter(Boolean);
  const lockups = project.visualSystem.lockups.filter((l) => l.src);
  const logoFigure =
    project.identityFigures.find((f) => /logo|lockup/i.test(`${f.label} ${f.caption}`)) ||
    project.identityFigures[0];
  const colourFigure = project.identityFigures.find((f) =>
    /color|colour|palette/i.test(`${f.label} ${f.caption}`)
  );
  const patternFigure = project.identityFigures.find((f) =>
    /pattern|grid/i.test(`${f.label} ${f.caption}`)
  );

  const positionLines = useMemo(
    () =>
      splitPositioning(
        project.strategyBlock?.heading || firstSentence(project.descriptor) || 'A system that holds.'
      ),
    [project.strategyBlock?.heading, project.descriptor]
  );

  const chapters = useMemo(() => {
    const items = [
      { id: 'overview', label: 'Overview' },
      { id: 'strategy', label: 'Strategy' },
      { id: 'logo', label: 'Logo' },
      { id: 'colour', label: 'Colour & type' },
    ];
    if (patternFigure) items.push({ id: 'pattern', label: 'Pattern' });
    items.push({ id: 'apps', label: 'Applications' }, { id: 'results', label: 'Close' });
    return items;
  }, [patternFigure]);

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => document.documentElement.classList.add('ready'));
    });
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const chn = root.querySelector<HTMLElement>('.chn');
    const links = Array.from(root.querySelectorAll<HTMLAnchorElement>('.chn a'));
    const sections = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!chn || !links.length || !sections.length) return;

    const setActive = (id: string) => {
      links.forEach((a) => a.classList.toggle('on', a.getAttribute('href') === `#${id}`));
    };

    const scrollOffset = () => 64 + chn.offsetHeight + 12;

    const spy = () => {
      const y = window.scrollY + scrollOffset();
      let current = sections[0].id;
      for (const section of sections) {
        const top = section.getBoundingClientRect().top + window.scrollY;
        if (top <= y) current = section.id;
      }
      setActive(current);
    };

    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link || !chn.contains(link)) return;
      const id = link.getAttribute('href')?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      e.stopPropagation();

      const top = el.getBoundingClientRect().top + window.scrollY - scrollOffset();
      const lenis = window.__lenis;
      if (lenis) {
        lenis.scrollTo(top, { duration: 0.8, easing: (t: number) => 1 - Math.pow(1 - t, 3) });
      } else {
        window.scrollTo({ top, behavior: 'smooth' });
      }
      history.replaceState(null, '', `#${id}`);
      setActive(id);
    };

    chn.addEventListener('click', onClick);
    window.addEventListener('scroll', spy, { passive: true });
    spy();

    return () => {
      chn.removeEventListener('click', onClick);
      window.removeEventListener('scroll', spy);
    };
  }, [chapters, project.slug]);

  useEffect(() => {
    const root = appsRef.current;
    if (!root) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cards = Array.from(root.querySelectorAll<HTMLElement>('.apps-card'));
    let tops: number[] = [];
    let rafId = 0;

    const meas = () => {
      tops = cards.map((card) => {
        const val = parseFloat(getComputedStyle(card).top);
        return !isNaN(val) && val > 0 ? val : window.innerHeight * 0.11;
      });
    };
    meas();
    window.addEventListener('resize', meas);

    if (reduce || cards.length === 0) {
      return () => window.removeEventListener('resize', meas);
    }

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      cards.forEach((card, i) => {
        const rr = Math.max(
          -600,
          Math.min(600, card.getBoundingClientRect().top - (tops[i] || 0))
        );
        card.style.setProperty('--py', (-rr * 0.08).toFixed(1));
        card.style.setProperty('--pr', (rr * 0.015).toFixed(2));
        const next = cards[i + 1];
        if (!next) {
          card.style.transform = '';
          return;
        }
        const top = tops[i] || 0;
        const q = Math.min(
          1,
          Math.max(0, 1 - (next.getBoundingClientRect().top - top) / card.offsetHeight)
        );
        card.style.transform = `scale(${(1 - q * 0.05).toFixed(3)})`;
      });
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', meas);
      cards.forEach((card) => {
        card.style.removeProperty('--py');
        card.style.removeProperty('--pr');
        card.style.transform = '';
      });
    };
  }, [project.brandInUse.length, project.slug]);

  const punch = italicPunch(
    project.strategyBlock?.heading || project.descriptor || 'A system that holds.'
  );
  const heroLines = nameLines(name);
  const accent = project.accentColor || 'var(--ind)';

  return (
    <div
      ref={rootRef}
      className="brand-case work-case"
      style={{ ['--case-accent' as string]: accent }}
    >
      <section className="hero pad brand-case-hero work-case-hero" id="top">
        <div className="fo">
          <span>
            <Link href="/branding/" style={{ textDecoration: 'underline', textUnderlineOffset: 4 }}>
              Branding
            </Link>
            {' / '}
            {name}
          </span>
          <span>Brand identity case study</span>
          <span>usamazahid.design</span>
        </div>

        <div className="work-hero-top">
          <h1>
            {heroLines.map((line, i) => (
              <span key={line} className="ln">
                <span style={{ '--d': `${0.05 + i * 0.1}s` } as React.CSSProperties}>{line}</span>
              </span>
            ))}
            <span className="ln it2">
              <span
                style={
                  { '--d': `${0.05 + heroLines.length * 0.1 + 0.05}s` } as React.CSSProperties
                }
              >
                {punch}
              </span>
            </span>
          </h1>
          <div className="work-hero-side">
            <p className="sub">
              <b>
                {formatBrandingCategory(project.category)} for {project.client}.
              </b>{' '}
              {project.platform}.
            </p>
            <div className="work-hero-actions">
              <a className="btn" href="#apps" data-cur="Apps">
                See applications <span aria-hidden="true">&rarr;</span>
              </a>
              {project.liveUrl ? (
                <a
                  className="btn btn-ghost"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cur="Live"
                >
                  Live brand
                </a>
              ) : null}
            </div>
          </div>
        </div>

        <div className="stage work-hero-stage" style={{ background: accent }}>
          <div className="full">
            <img src={project.heroImage.src} alt={project.heroImage.alt} />
          </div>
        </div>

        <div className="cm">
          <div>
            <span>Role</span>
            <b>{project.role}</b>
          </div>
          <div>
            <span>Client</span>
            <b>{project.client}</b>
          </div>
          <div>
            <span>Scope</span>
            <b>{project.platform}</b>
          </div>
          <div>
            <span>Timeline</span>
            <b>
              {project.timeline} · {project.year}
            </b>
          </div>
        </div>
      </section>

      <nav className="chn" aria-label="Case study chapters">
        {chapters.map((c) => (
          <a key={c.id} href={`#${c.id}`}>
            {c.label}
          </a>
        ))}
      </nav>

      {/* Overview */}
      <section className="pad work-overview" id="overview">
        <SectionHead title="Overview" lab="Context & the brief" />
        <div className="ovw">
          <h2>{firstSentence(project.overview)}</h2>
          <dl className="info2">
            <dt>Role</dt>
            <dd>{project.role}</dd>
            <dt>Platform</dt>
            <dd>{project.platform}</dd>
            <dt>Team</dt>
            <dd>{project.team}</dd>
            <dt>Tools</dt>
            <dd>{project.tools.slice(0, 4).join(', ')}</dd>
            <dt>Year</dt>
            <dd>{project.year}</dd>
          </dl>
        </div>
        <div className="pc3">
          <div>
            <span className="lab">The challenge</span>
            <h3>{briefHead(contextParts[0] || project.descriptor, 5)}</h3>
            <p>{firstSentence(contextParts[0] || project.descriptor)}</p>
          </div>
          <div>
            <span className="lab">The idea</span>
            <h3>{briefHead(project.strategyBlock?.heading || 'One idea, held hard', 6)}</h3>
            <p>
              {project.strategyBlock?.body
                ? firstSentence(project.strategyBlock.body)
                : firstSentence(project.brandGoals[0]?.text || 'A system the team can run.')}
            </p>
          </div>
          <div>
            <span className="lab">In scope</span>
            <h3>{project.tags[0] || 'Brand system'}</h3>
            <p>
              {project.tags.length > 1
                ? project.tags.slice(0, 4).join(' · ')
                : 'Identity, rules, and applications the team can run without a designer in the room.'}
            </p>
          </div>
        </div>
      </section>

      {/* Strategy */}
      <section className="pad work-sec" id="strategy">
        <SectionHead title="Strategy" lab="Where the brand sits" />
        <p className="dh2">
          {briefHead(project.strategyBlock?.heading || positionLines[0] || punch, 7)}
        </p>
        {project.tags.length > 0 ? (
          <ul className="kw">
            {project.tags.slice(0, 5).map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : null}
        {project.strategyBlock?.body ? (
          <p className="cap3 work-body">{firstSentence(project.strategyBlock.body)}</p>
        ) : null}
        {project.strategyBlock?.image ? (
          <figure className="work-plate work-media-band">
            <div className="bd cr" style={{ background: accent }}>
              <img
                src={project.strategyBlock.image.src}
                alt={project.strategyBlock.image.alt}
                loading="lazy"
              />
            </div>
            <figcaption className="cap3">
              <b>{project.strategyBlock.heading || 'Strategy'}</b>
              <span>{project.strategyBlock.image.alt}</span>
            </figcaption>
          </figure>
        ) : null}
        {project.keyInsights.length > 0 ? (
          <div className="work-insight-list" style={{ marginTop: 'clamp(36px,5vw,64px)' }}>
            {project.keyInsights.slice(0, 4).map((item, i) => (
              <article key={item.num} className="work-insight">
                <span className="lab">{String(i + 1).padStart(2, '0')}</span>
                <h3>{briefHead(item.text, 6)}</h3>
                <p>{firstSentence(item.text)}</p>
              </article>
            ))}
          </div>
        ) : null}
      </section>

      {/* Logo */}
      <section className="pad work-sec" id="logo">
        <SectionHead title="Logo" lab="The mark and its variations" />
        <p className="dh2">
          {briefHead(logoFigure?.caption || 'The mark that carries the system.', 7)}
        </p>
        {logoFigure ? (
          <figure className="work-plate">
            <div className="bd ivo">
              <img src={logoFigure.image.src} alt={logoFigure.image.alt} loading="lazy" />
            </div>
            <figcaption className="cap3">
              <b>{logoFigure.label || 'Primary mark'}</b>
              {logoFigure.caption ? <span>{logoFigure.caption}</span> : null}
            </figcaption>
          </figure>
        ) : null}
        {project.logoEvolution ? (
          <div className="evo-grid">
            <figure className="fig">
              <div
                className={`lock-plate evo-plate${
                  (project.logoEvolution.oldSurface ?? 'dark') === 'dark' ? ' is-dark' : ''
                }`}
              >
                <img
                  src={project.logoEvolution.oldLogo.src}
                  alt={project.logoEvolution.oldLogo.alt}
                  loading="lazy"
                />
              </div>
              <figcaption>
                <b>Before</b>
                {project.logoEvolution.oldLogo.alt}
              </figcaption>
            </figure>
            <figure className="fig">
              <div
                className={`lock-plate evo-plate${
                  (project.logoEvolution.newSurface ?? 'dark') === 'dark' ? ' is-dark' : ''
                }`}
              >
                <img
                  src={project.logoEvolution.newLogo.src}
                  alt={project.logoEvolution.newLogo.alt}
                  loading="lazy"
                />
              </div>
              <figcaption>
                <b>After</b>
                {project.logoEvolution.newLogo.alt}
              </figcaption>
            </figure>
          </div>
        ) : null}
        {lockups.length > 0 ? (
          <div className="lock-grid">
            {lockups.map((lockup) => {
              const onDark = (lockup.surface ?? 'light') === 'dark';
              return (
                <figure key={lockup.name}>
                  <div className={`lock-plate${onDark ? ' is-dark' : ''}`}>
                    <img src={lockup.src} alt={lockup.alt || lockup.name} loading="lazy" />
                  </div>
                  <figcaption>
                    <b>{lockup.name}</b>
                    {lockup.usage}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        ) : null}
        {project.brandGoals.length > 0 ? (
          <div className="pc3 work-token-strip">
            {project.brandGoals.slice(0, 3).map((goal, i) => (
              <div key={goal.num}>
                <span className="lab">Goal {String(i + 1).padStart(2, '0')}</span>
                <h3>{briefHead(goal.text, 5)}</h3>
                <p>{firstSentence(goal.text)}</p>
              </div>
            ))}
          </div>
        ) : null}
      </section>

      {/* Colour & type */}
      <section className="pad work-sec" id="colour">
        <SectionHead title="Colour & type" lab="Palette and voice" />
        <p className="dh2">A palette with reserved power.</p>
        {colourFigure ? (
          <figure className="work-plate">
            <div className="bd cr">
              <img src={colourFigure.image.src} alt={colourFigure.image.alt} loading="lazy" />
            </div>
            <figcaption className="cap3">
              <b>{colourFigure.label || 'Colour system'}</b>
              {colourFigure.caption ? <span>{colourFigure.caption}</span> : null}
            </figcaption>
          </figure>
        ) : null}
        <div className="swatch-grid">
          {project.visualSystem.palette.map((swatch) => (
            <div key={swatch.hex} className="swatch">
              <i style={{ background: swatch.hex }} />
              <b>{swatch.name}</b>
              <code>{swatch.hex}</code>
              <span>{swatch.usage}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'clamp(48px, 7vw, 88px)' }}>
          <SectionHead title="Typography" lab="How the voice is set" />
          <p className="dh2">Type that holds at every size.</p>
          <div className="type-board">
            {project.visualSystem.typography.map((spec) => {
              const stack =
                spec.stack ||
                (spec.mono ? 'mono' : /display|headline/i.test(spec.role) ? 'display' : 'body');
              return (
                <article key={spec.role} className={`type-spec is-${stack}`}>
                  <div className="type-spec-head">
                    <span className="lab">{spec.role}</span>
                    <code>{spec.family}</code>
                  </div>
                  <p className="type-sample">{spec.sample}</p>
                  <p className="type-usage">{spec.usage}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {patternFigure ? (
        <section className="pad work-sec" id="pattern">
          <SectionHead title="Pattern" lab="Graphic language" />
          <p className="dh2">{briefHead(patternFigure.caption, 7)}</p>
          <figure className="work-plate">
            <div className="bd ivo">
              <img src={patternFigure.image.src} alt={patternFigure.image.alt} loading="lazy" />
            </div>
            <figcaption className="cap3">
              <b>{patternFigure.label || 'Pattern'}</b>
              {patternFigure.description ? <span>{patternFigure.description}</span> : null}
            </figcaption>
          </figure>
        </section>
      ) : null}

      {/* Applications */}
      <section ref={appsRef} className="pad work-sec" id="apps">
        <SectionHead title="Applications" lab="The system in use" />
        <p className="dh2">Where the rules meet production.</p>
        <div className="apps-stack">
          {project.brandInUse.map((figure, i) => {
            const tone = PLATE[i % PLATE.length];
            return (
              <article key={figure.id} className="apps-card">
                <div
                  className={`bd apps-plate ${tone}`}
                  style={tone === 'ind' ? { background: accent } : undefined}
                >
                  <img src={figure.image.src} alt={figure.image.alt} loading="lazy" />
                </div>
                <p className="cap3 apps-card-cap">
                  <b
                    style={{
                      display: 'block',
                      fontFamily: 'var(--sans)',
                      fontStyle: 'normal',
                      color: 'var(--ink)',
                      marginBottom: 4,
                    }}
                  >
                    {figure.caption}
                  </b>
                  {figure.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Close */}
      <section className="pad work-sec" id="results">
        <SectionHead title="Close" lab="What guided it" />
        <div className="pc3">
          {project.brandGoals.slice(0, 3).map((goal, i) => (
            <div key={goal.num}>
              <span className="lab">Principle {String(i + 1).padStart(2, '0')}</span>
              <h3>{briefHead(goal.text, 5)}</h3>
              <p>{firstSentence(goal.text)}</p>
            </div>
          ))}
        </div>
        <div className="work-footer">
          <div className="work-footer-inner">
            <div>
              <span className="lab">Brand archive</span>
              <p className="work-footer-sub">
                {project.liveUrl
                  ? 'Open the live brand, or browse every identity in the archive.'
                  : 'Browse every identity system in the archive.'}
              </p>
            </div>
            <div className="work-footer-actions">
              {project.liveUrl ? (
                <a
                  className="btn work-btn"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cur="Live"
                >
                  <span>{project.liveLabel || 'View live brand'}</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
              ) : null}
              <Link className="btn btn-ghost" href="/branding/" data-cur="Index">
                All brand cases <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pad work-sec" id="next">
        <SectionHead
          title="Next project"
          lab={nextCase ? formatBrandingCategory(nextCase.category) : 'Brand index'}
        />
        {nextCase ? (
          <a className="nx" href={`/branding/${nextCase.slug}/`} data-cur="Next">
            <div className="cv">
              <img src={nextCase.heroImage.src} alt={nextCase.heroImage.alt} loading="lazy" />
            </div>
            <div className="t">
              <span className="lab">{formatBrandingCategory(nextCase.category)}</span>
              <h3>{shortTitle(nextCase.title)}</h3>
              <p>{firstSentence(nextCase.overview)}</p>
              <span className="go">
                Open case <b>&rarr;</b>
              </span>
            </div>
          </a>
        ) : (
          <Link className="nx" href="/branding/" data-cur="Index">
            <div className="cv nx-empty" aria-hidden="true" />
            <div className="t">
              <span className="lab">Index</span>
              <h3>All branding cases</h3>
              <p>Browse every identity system in the archive.</p>
              <span className="go">
                Open index <b>&rarr;</b>
              </span>
            </div>
          </Link>
        )}
      </section>
    </div>
  );
}

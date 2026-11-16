'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
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

type BrandFigure = {
  src: string;
  alt: string;
  title: string;
  caption?: string;
};

type LightboxState = {
  figures: BrandFigure[];
  index: number;
} | null;

function BrandLightbox({
  state,
  onChangeIndex,
  onClose,
}: {
  state: LightboxState;
  onChangeIndex: (index: number) => void;
  onClose: () => void;
}) {
  const total = state?.figures.length ?? 0;
  const current = state ? state.figures[state.index] : null;

  useEffect(() => {
    if (!state) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && total > 1) onChangeIndex((state.index + 1) % total);
      if (e.key === 'ArrowLeft' && total > 1) onChangeIndex((state.index - 1 + total) % total);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [state, total, onChangeIndex, onClose]);

  if (!state || !current) return null;
  return (
    <div
      className="uz-lightbox-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={current.title}
      onClick={onClose}
    >
      <div className="uz-lightbox-panel" onClick={(e) => e.stopPropagation()}>
        <div className="uz-lightbox-bar">
          <div>
            <span className="lab">
              Plate {String(state.index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <strong>{current.title}</strong>
          </div>
          <div className="uz-lightbox-actions">
            {total > 1 ? (
              <>
                <button
                  type="button"
                  className="uz-lightbox-nav"
                  onClick={() => onChangeIndex((state.index - 1 + total) % total)}
                  aria-label="Previous plate"
                >
                  ← Prev
                </button>
                <button
                  type="button"
                  className="uz-lightbox-nav"
                  onClick={() => onChangeIndex((state.index + 1) % total)}
                  aria-label="Next plate"
                >
                  Next →
                </button>
              </>
            ) : null}
            <button type="button" className="uz-lightbox-close" onClick={onClose} aria-label="Close preview">
              ESC · Close ×
            </button>
          </div>
        </div>
        <div className="uz-lightbox-img-wrap">
          <img src={current.src} alt={current.alt} />
        </div>
        {current.caption ? <p className="uz-lightbox-cap">{current.caption}</p> : null}
      </div>
    </div>
  );
}

export default function BrandingCaseExact({ project, nextCase }: BrandingCaseExactProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const appsRef = useRef<HTMLElement>(null);
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [lockSurface, setLockSurface] = useState<'default' | 'light' | 'dark' | 'accent'>('default');
  const [showGrid, setShowGrid] = useState(false);
  const [liveType, setLiveType] = useState('');
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

      const bar = document.getElementById('uz-brand-progress');
      if (bar) {
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docH > 0 ? Math.min(1, Math.max(0, window.scrollY / docH)) : 0;
        bar.style.transform = `scaleX(${pct.toFixed(4)})`;
      }
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

  const gallery = useMemo<BrandFigure[]>(() => {
    const items: BrandFigure[] = [
      { src: project.heroImage.src, alt: project.heroImage.alt, title: name, caption: punch },
    ];
    if (project.strategyBlock?.image) {
      items.push({
        src: project.strategyBlock.image.src,
        alt: project.strategyBlock.image.alt,
        title: project.strategyBlock.heading || 'Brand Strategy',
        caption: project.strategyBlock.image.alt,
      });
    }
    if (logoFigure) {
      items.push({
        src: logoFigure.image.src,
        alt: logoFigure.image.alt,
        title: logoFigure.label || 'Primary mark',
        caption: logoFigure.caption,
      });
    }
    if (colourFigure) {
      items.push({
        src: colourFigure.image.src,
        alt: colourFigure.image.alt,
        title: colourFigure.label || 'Colour system',
        caption: colourFigure.caption,
      });
    }
    if (patternFigure) {
      items.push({
        src: patternFigure.image.src,
        alt: patternFigure.image.alt,
        title: patternFigure.label || 'Pattern system',
        caption: patternFigure.description,
      });
    }
    project.brandInUse.forEach((f) => {
      items.push({
        src: f.image.src,
        alt: f.image.alt,
        title: f.caption,
        caption: f.description,
      });
    });
    return items;
  }, [project, name, punch, logoFigure, colourFigure, patternFigure]);

  const openInspect = (figure: BrandFigure) => {
    const idx = gallery.findIndex((g) => g.src === figure.src);
    setLightbox({
      figures: idx >= 0 ? gallery : [figure],
      index: idx >= 0 ? idx : 0,
    });
  };

  const copySwatch = (hex: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      void navigator.clipboard.writeText(hex).catch(() => undefined);
    }
    setCopiedHex(hex);
    window.setTimeout(() => {
      setCopiedHex((prev) => (prev === hex ? null : prev));
    }, 1500);
  };

  return (
    <div
      ref={rootRef}
      className="brand-case work-case"
      style={{ ['--case-accent' as string]: accent }}
    >
      <div className="uz-scroll-progress" aria-hidden="true">
        <span id="uz-brand-progress" />
      </div>
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
          <div className="work-hero-lead">
            <h1>
              {heroLines.map((line, i) => (
                <span key={line} className="ln">
                  <span style={{ '--d': `${0.05 + i * 0.1}s` } as React.CSSProperties}>{line}</span>
                </span>
              ))}
            </h1>
            <p className="work-hero-punch">{punch}</p>
          </div>
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

        <div
          className="stage work-hero-stage is-zoomable"
          style={{ background: accent }}
          onClick={() =>
            openInspect({
              src: project.heroImage.src,
              alt: project.heroImage.alt,
              title: name,
              caption: punch,
            })
          }
          data-cur="Zoom"
        >
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
            <dt>Team</dt>
            <dd>{project.team}</dd>
            <dt>Tools</dt>
            <dd>{project.tools.slice(0, 4).join(', ')}</dd>
            <dt>Deliverables</dt>
            <dd>{project.tags.slice(0, 3).join(', ') || 'Brand identity system'}</dd>
            <dt>Focus</dt>
            <dd>{project.platform}</dd>
          </dl>
        </div>
        <div className="pc3">
          <div>
            <span className="lab">The challenge</span>
            <h3>{briefHead(contextParts[0] || project.descriptor, 5)}</h3>
            <p>{contextParts[0] || project.descriptor}</p>
          </div>
          <div>
            <span className="lab">The idea</span>
            <h3>{briefHead(project.strategyBlock?.heading || 'One idea, held hard', 6)}</h3>
            <p>
              {project.strategyBlock?.body ||
                project.brandGoals[0]?.text ||
                'A system the team can run.'}
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
                <span className="lab">Insight {String(i + 1).padStart(2, '0')}</span>
                <p>{item.text}</p>
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
            <div
              className="bd ivo is-zoomable"
              onClick={() =>
                openInspect({
                  src: logoFigure.image.src,
                  alt: logoFigure.image.alt,
                  title: logoFigure.label || 'Primary mark',
                  caption: logoFigure.caption,
                })
              }
              data-cur="Zoom"
            >
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
          <div className="brand-lockup-wrap">
            <div className="brand-lockup-toolbar" role="group" aria-label="Logo surface and grid tester">
              <div className="brand-tool-pills">
                <span className="lab">Surface</span>
                {(['default', 'light', 'dark', 'accent'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`brand-tool-btn${lockSurface === s ? ' is-on' : ''}`}
                    onClick={() => setLockSurface(s)}
                  >
                    {s === 'default' ? 'Auto' : s === 'light' ? 'Light' : s === 'dark' ? 'Dark' : 'Brand'}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className={`brand-tool-btn${showGrid ? ' is-on' : ''}`}
                onClick={() => setShowGrid((g) => !g)}
              >
                {showGrid ? '✓ Clearspace Grid' : 'Show Grid'}
              </button>
            </div>
            <div className={`lock-grid${showGrid ? ' has-grid' : ''}`}>
              {lockups.map((lockup) => {
                const onDark =
                  lockSurface === 'dark' ||
                  (lockSurface === 'default' && (lockup.surface ?? 'light') === 'dark');
                const onAccent = lockSurface === 'accent';
                return (
                  <figure key={lockup.name}>
                    <div
                      className={`lock-plate${onDark ? ' is-dark' : ''}${onAccent ? ' is-accent' : ''}`}
                      style={onAccent ? { background: accent } : undefined}
                    >
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
            <div
              className="bd cr is-zoomable"
              onClick={() =>
                openInspect({
                  src: colourFigure.image.src,
                  alt: colourFigure.image.alt,
                  title: colourFigure.label || 'Colour system',
                  caption: colourFigure.caption,
                })
              }
              data-cur="Zoom"
            >
              <img src={colourFigure.image.src} alt={colourFigure.image.alt} loading="lazy" />
            </div>
            <figcaption className="cap3">
              <b>{colourFigure.label || 'Colour system'}</b>
              {colourFigure.caption ? <span>{colourFigure.caption}</span> : null}
            </figcaption>
          </figure>
        ) : null}
        <div className="swatch-grid">
          {project.visualSystem.palette.map((swatch) => {
            const isCopied = copiedHex === swatch.hex;
            return (
              <button
                key={swatch.hex}
                type="button"
                className={`swatch swatch-btn${isCopied ? ' is-copied' : ''}`}
                onClick={() => copySwatch(swatch.hex)}
                title={`Copy ${swatch.hex}`}
              >
                <i style={{ background: swatch.hex }} />
                <b>{swatch.name}</b>
                <code>{isCopied ? 'COPIED ✓' : swatch.hex}</code>
                <span>{swatch.usage}</span>
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 'clamp(48px, 7vw, 88px)' }}>
          <SectionHead title="Typography" lab="How the voice is set" />
          <p className="dh2">Type that holds at every size.</p>
          <div className="brand-type-tester">
            <label htmlFor="uz-live-type" className="lab">
              Live Type Tester
            </label>
            <input
              id="uz-live-type"
              type="text"
              value={liveType}
              onChange={(e) => setLiveType(e.target.value)}
              placeholder={`Type anything to test ${name}’s typography...`}
              className="brand-type-input"
            />
            {liveType ? (
              <button type="button" className="brand-tool-btn" onClick={() => setLiveType('')}>
                Reset
              </button>
            ) : null}
          </div>
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
                  <p className="type-sample">{liveType.trim() || spec.sample}</p>
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
                  className={`bd apps-plate ${tone} is-zoomable`}
                  style={tone === 'ind' ? { background: accent } : undefined}
                  onClick={() =>
                    openInspect({
                      src: figure.image.src,
                      alt: figure.image.alt,
                      title: figure.caption,
                      caption: figure.description,
                    })
                  }
                  data-cur="Zoom"
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

      <section className="pad work-cta-band" aria-label="Work with Usama Zahid">
        <div className="work-cta-inner">
          <div>
            <span className="lab">Open to roles &amp; select brand builds</span>
            <h3>Need a cohesive brand identity system or a senior designer on your team?</h3>
          </div>
          <div className="work-cta-actions">
            <a
              className="btn"
              href="https://cal.com/usama-zahid-haadwj/secret"
              target="_blank"
              rel="noopener noreferrer"
              data-cur="Calendar"
            >
              Book a 15-min call <span aria-hidden="true">&rarr;</span>
            </a>
            <Link className="btn btn-ghost" href="/cv/" data-cur="CV">
              View CV &amp; resume <span aria-hidden="true">&rarr;</span>
            </Link>
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
      <BrandLightbox
        state={lightbox}
        onChangeIndex={(index) => setLightbox((prev) => (prev ? { ...prev, index } : null))}
        onClose={() => setLightbox(null)}
      />
    </div>
  );
}

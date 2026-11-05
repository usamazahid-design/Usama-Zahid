'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  CaseMedia,
  CaseStudyProject,
  Project,
  UIUXProject,
  categoryLabels,
} from '@/lib/portfolio-data';

interface PortfolioCaseExactProps {
  project: Project;
  nextProject?: Project | null;
}

type PlateTone = (typeof PLATE)[number];

type Figure = {
  src: string;
  alt: string;
  title: string;
  caption?: string;
};

const PLATE = ['ivo', 'cr', 'ink', 'ind'] as const;

function shortTitle(title: string) {
  return title.split(/\s[-–—]\s/)[0]?.trim() || title;
}

function firstSentence(text: string) {
  const trimmed = text.trim();
  const match = trimmed.match(/^[^.!?]+[.!?]?/);
  return match?.[0]?.trim() || trimmed;
}

function nameLines(title: string): string[] {
  const n = shortTitle(title)
    .replace(/\s+app$/i, '')
    .replace(/\s+website$/i, '')
    .trim();
  const parts = n.split(/\s+/);
  if (parts.length <= 2) return [`${n}.`];
  const mid = Math.ceil(parts.length / 2);
  return [parts.slice(0, mid).join(' '), `${parts.slice(mid).join(' ')}.`];
}

function italicPunch(text: string): string {
  const clean = firstSentence(text).replace(/\.$/, '').trim();
  if (!clean) return 'Clarity over clutter.';
  return `${clean}.`;
}

function briefHead(text: string, maxWords = 5) {
  const clean = firstSentence(text).replace(/\.$/, '');
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return clean;
  return words.slice(0, maxWords).join(' ');
}

function isUIUX(project: Project): project is UIUXProject {
  return project.template === 'ui-ux';
}

function imageOf(media?: CaseMedia | null): Figure | null {
  if (!media || media.content.type !== 'image') return null;
  return {
    src: media.content.src,
    alt: media.content.alt,
    title: media.title,
    caption: media.caption,
  };
}

function imagesOf(items: CaseMedia[] = []): Figure[] {
  return items.map(imageOf).filter(Boolean) as Figure[];
}

function categoryDisplay(category: Project['category']) {
  const map: Record<Project['category'], string> = {
    'ai-saas': 'Product design',
    fintech: 'Fintech product',
    operations: 'Operations product',
    'ui-ux': 'UI / UX',
  };
  return map[category] || categoryLabels[category].replace(/_/g, ' ');
}

function useChapterNav(
  rootRef: React.RefObject<HTMLDivElement | null>,
  chapters: { id: string; label: string }[],
  slug: string
) {
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
  }, [rootRef, chapters, slug]);
}

function useStickyStack(stackRef: React.RefObject<HTMLElement | null>, deps: unknown[]) {
  useEffect(() => {
    const root = stackRef.current;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

function MediaStack({ figures, accent }: { figures: Figure[]; accent: string }) {
  if (figures.length === 0) return null;
  return (
    <div className="apps-stack">
      {figures.map((figure, i) => {
        const tone = PLATE[i % PLATE.length] as PlateTone;
        return (
          <article key={`${figure.src}-${i}`} className="apps-card">
            <div
              className={`bd apps-plate ${tone}`}
              style={tone === 'ind' ? { background: accent || 'var(--ind)' } : undefined}
            >
              <img src={figure.src} alt={figure.alt} loading="lazy" />
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
                {figure.title}
              </b>
              {figure.caption}
            </p>
          </article>
        );
      })}
    </div>
  );
}

function Plate({
  figure,
  tone,
  accent,
}: {
  figure: Figure;
  tone: PlateTone;
  accent: string;
}) {
  return (
    <figure className="work-plate">
      <div
        className={`bd ${tone}`}
        style={tone === 'ind' ? { background: accent || 'var(--ind)' } : undefined}
      >
        <img src={figure.src} alt={figure.alt} loading="lazy" />
      </div>
      <figcaption className="cap3">
        <b>{figure.title}</b>
        {figure.caption ? <span>{figure.caption}</span> : null}
      </figcaption>
    </figure>
  );
}

function WorkPanels({
  figures,
  accent,
  startFig = 1,
}: {
  figures: Figure[];
  accent: string;
  startFig?: number;
}) {
  if (figures.length === 0) return null;
  return (
    <div className="work-stack stack">
      {figures.map((figure, i) => {
        const ink = i % 2 === 1;
        return (
          <article
            key={`${figure.src}-${i}`}
            className={`panel ${ink ? 'is-ink' : 'is-ind'}`}
            style={
              ink
                ? undefined
                : ({
                    ['--pb' as string]: accent || '#4B3FFF',
                    ['--pc' as string]: '#FDFDFD',
                  } as React.CSSProperties)
            }
          >
            <div className="tx">
              <div className="tx-top">
                <span className="lab">
                  Fig. {startFig + i}. {figure.title}
                </span>
              </div>
              <div>
                <h3>{briefHead(figure.title, 4)}</h3>
                <p>{figure.caption || figure.alt}</p>
              </div>
            </div>
            <div className="pa">
              <img className="panel-img" src={figure.src} alt={figure.alt} loading="lazy" />
            </div>
          </article>
        );
      })}
    </div>
  );
}

function InsightRows({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="work-insight-list">
      {items.map((item, i) => (
        <article key={item} className="work-insight">
          <span className="lab">{String(i + 1).padStart(2, '0')}</span>
          <h3>{briefHead(item, 6)}</h3>
          <p>{firstSentence(item)}</p>
        </article>
      ))}
    </div>
  );
}

function NextCaseLink({ project }: { project: Project }) {
  const cover = imageOf(project.hook.image);
  return (
    <a className="nx" href={`/portfolio/${project.slug}/`} data-cur="Next">
      <div className="cv">{cover ? <img src={cover.src} alt={cover.alt} loading="lazy" /> : null}</div>
      <div className="t">
        <span className="lab">{categoryDisplay(project.category)}</span>
        <h3>{shortTitle(project.title)}</h3>
        <p>{firstSentence(project.subtitle || project.excerpt)}</p>
        <span className="go">
          Open case <b>&rarr;</b>
        </span>
      </div>
    </a>
  );
}

function SectionHead({
  title,
  lab,
  aside,
}: {
  title: string;
  lab: string;
  aside?: React.ReactNode;
}) {
  return (
    <div className="wh">
      <div>
        <h2>{title}</h2>
        <span className="lab">{lab}</span>
      </div>
      {aside}
    </div>
  );
}

function CaseHero({
  kind,
  name,
  punch,
  client,
  category,
  platform,
  duration,
  year,
  role,
  liveUrl,
  hero,
  accent,
}: {
  kind: 'UI / UX case study' | 'Product case study';
  name: string;
  punch: string;
  client: string;
  category: string;
  platform: string;
  duration: string;
  year: string;
  role: string;
  liveUrl?: string;
  hero: Figure | null;
  accent: string;
}) {
  const lines = nameLines(name);
  return (
    <section className="hero pad work-case-hero" id="top">
      <div className="fo">
        <span>
          <Link href="/portfolio/" style={{ textDecoration: 'underline', textUnderlineOffset: 4 }}>
            Work
          </Link>
          {' / '}
          {shortTitle(name).replace(/\s+app$/i, '')}
        </span>
        <span>{kind}</span>
        <span>usamazahid.design</span>
      </div>

      <div className="work-hero-top">
        <h1>
          {lines.map((line, i) => (
            <span key={line} className="ln">
              <span style={{ '--d': `${0.05 + i * 0.1}s` } as React.CSSProperties}>{line}</span>
            </span>
          ))}
          <span className="ln it2">
            <span style={{ '--d': `${0.05 + lines.length * 0.1 + 0.05}s` } as React.CSSProperties}>
              {punch}
            </span>
          </span>
        </h1>
        <div className="work-hero-side">
          <p className="sub">
            <b>
              {category} for {client}.
            </b>{' '}
            {platform}.
          </p>
          <div className="work-hero-actions">
            <a className="btn" href="#visual" data-cur="Design">
              See the UI <span aria-hidden="true">&rarr;</span>
            </a>
            {liveUrl ? (
              <a
                className="btn btn-ghost"
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cur="Live"
              >
                Live product
              </a>
            ) : null}
          </div>
        </div>
      </div>

      {hero ? (
        <div className="stage work-hero-stage" style={{ background: accent }}>
          <div className="full">
            <img src={hero.src} alt={hero.alt} />
          </div>
        </div>
      ) : null}

      <div className="cm">
        <div>
          <span>Role</span>
          <b>{role}</b>
        </div>
        <div>
          <span>Client</span>
          <b>{client}</b>
        </div>
        <div>
          <span>Platform</span>
          <b>{platform}</b>
        </div>
        <div>
          <span>Timeline</span>
          <b>
            {duration} · {year}
          </b>
        </div>
      </div>
    </section>
  );
}

function NumberedList({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ol className="work-num-list">
      {items.map((item, i) => (
        <li key={item}>
          <span className="lab">{String(i + 1).padStart(2, '0')}</span>
          <p>{item}</p>
        </li>
      ))}
    </ol>
  );
}

function CaseOverview({
  lead,
  problem,
  goals,
  scope,
  role,
  platform,
  team,
  tools,
  year,
  goalLab = 'The goal',
}: {
  lead: string;
  problem: string;
  goals: string[];
  scope: string[];
  role: string;
  platform: string;
  team: string;
  tools: string[];
  year: string;
  goalLab?: string;
}) {
  const goalHead = goals[0] ? briefHead(goals[0], 6) : 'Clarity first';
  const goalBody =
    goals.length > 1
      ? goals
          .slice(0, 3)
          .map((g) => firstSentence(g).replace(/\.$/, ''))
          .join(' · ')
      : goals[0]
        ? firstSentence(goals[0])
        : 'Ship a path people can finish without help.';
  const scopeHead = scope[0] || 'End-to-end UI/UX';
  const scopeBody =
    scope.length > 1
      ? scope.slice(0, 4).join(' · ')
      : scope[0] || 'Research through visual UI.';

  return (
    <section className="pad work-overview" id="overview" style={{ paddingTop: 'clamp(64px,9vw,130px)' }}>
      <SectionHead title="Overview" lab="Context & the problem" />
      <div className="ovw">
        <h2>{firstSentence(lead)}</h2>
        <dl className="info2">
          <dt>Role</dt>
          <dd>{role}</dd>
          <dt>Platform</dt>
          <dd>{platform}</dd>
          <dt>Team</dt>
          <dd>{team}</dd>
          <dt>Tools</dt>
          <dd>{tools.slice(0, 4).join(', ')}</dd>
          <dt>Year</dt>
          <dd>{year}</dd>
        </dl>
      </div>
      <div className="pc3">
        <div>
          <span className="lab">The problem</span>
          <h3>{briefHead(problem, 5)}</h3>
          <p>{firstSentence(problem)}</p>
        </div>
        <div>
          <span className="lab">{goalLab}</span>
          <h3>{goalHead}</h3>
          <p>{goalBody}</p>
        </div>
        <div>
          <span className="lab">In scope</span>
          <h3>{scopeHead}</h3>
          <p>{scopeBody}</p>
        </div>
      </div>
    </section>
  );
}

function MediaPair({
  figures,
  accent,
}: {
  figures: Figure[];
  accent: string;
}) {
  if (figures.length === 0) return null;
  return (
    <div className={`work-media-pair ${figures.length === 1 ? 'is-one' : ''}`}>
      {figures.slice(0, 2).map((figure, i) => {
        const tone = PLATE[i % PLATE.length];
        return (
          <figure key={figure.src} className="work-media-item">
            <div
              className={`bd ${tone}`}
              style={tone === 'ind' ? { background: accent || 'var(--ind)' } : undefined}
            >
              <img src={figure.src} alt={figure.alt} loading="lazy" />
            </div>
            <figcaption className="cap3">
              <b
                style={{
                  display: 'block',
                  fontFamily: 'var(--sans)',
                  fontStyle: 'normal',
                  color: 'var(--ink)',
                  marginBottom: 4,
                }}
              >
                {figure.title}
              </b>
              {figure.caption}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

function UIUXCaseExact({
  project,
  nextProject,
}: {
  project: UIUXProject;
  nextProject?: Project | null;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLElement>(null);
  const name = shortTitle(project.title);
  const hero = imageOf(project.hook.image);
  const accent = project.accentColor || 'var(--ind)';

  const researchMedia = imagesOf(project.research.artifacts);
  const flowMedia = imagesOf(project.flows.diagrams);
  const wireMedia = imagesOf(project.wireframes.frames);
  const visualMedia = imagesOf([
    ...project.visualDesign.screens,
    ...project.outcome.screens,
  ]);
  const chapters = useMemo(
    () => [
      { id: 'overview', label: 'Overview' },
      { id: 'research', label: 'Research' },
      { id: 'flows', label: 'Flows' },
      { id: 'wireframes', label: 'Wireframes' },
      { id: 'visual', label: 'Visual UI' },
      { id: 'outcome', label: 'Outcome' },
      { id: 'reflection', label: 'Reflection' },
    ],
    []
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => document.documentElement.classList.add('ready'));
    });
  }, []);

  useChapterNav(rootRef, chapters, project.slug);
  useStickyStack(visualRef, [visualMedia.length, project.slug]);

  return (
    <div
      ref={rootRef}
      className="brand-case work-case"
      style={{ ['--case-accent' as string]: accent }}
    >
      <CaseHero
        kind="UI / UX case study"
        name={name}
        punch={italicPunch(project.hook.outcomeLine)}
        client={project.client}
        category={categoryDisplay(project.category)}
        platform={project.platform}
        duration={project.duration}
        year={project.year}
        role={project.role}
        liveUrl={project.outcome.liveUrl}
        hero={hero}
        accent={accent}
      />

      <nav className="chn" aria-label="Case study chapters">
        {chapters.map((c) => (
          <a key={c.id} href={`#${c.id}`}>
            {c.label}
          </a>
        ))}
      </nav>

      <CaseOverview
        lead={project.overview.summary}
        problem={project.problem.statement}
        goals={project.problem.goals}
        scope={project.scope}
        role={project.role}
        platform={project.platform}
        team={project.team}
        tools={project.tools}
        year={project.year}
      />

      {/* Research — home services rhythm */}
      <section className="pad work-sec" id="research">
        <SectionHead title="Research" lab="Methods before pixels" />
        <div className="work-sv">
          <div className="work-sv-l">
            <p className="dh2">
              {project.research.insights[0]
                ? firstSentence(project.research.insights[0])
                : 'What users actually needed.'}
            </p>
            <span className="big" data-n={String(project.research.methods.length || 0)}>
              {String(project.research.methods.length || 0).padStart(2, '0')}
            </span>
            <span className="mono">methods before pixels</span>
            {project.research.methods.length > 0 ? (
              <ul className="kw">
                {project.research.methods.slice(0, 4).map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            ) : null}
          </div>
          <InsightRows items={project.research.insights.slice(0, 4)} />
        </div>
        {researchMedia.length > 0 ? (
          <div className="work-media-band">
            <MediaPair figures={researchMedia} accent={accent} />
          </div>
        ) : null}
      </section>

      {/* Flows */}
      <section className="pad work-sec" id="flows">
        <SectionHead title="Flows" lab="Information architecture" />
        <p className="dh2">
          {project.flows.summary
            ? briefHead(project.flows.summary, 7)
            : 'One primary path.'}
        </p>
        <p className="cap3 work-body">
          {firstSentence(
            project.flows.summary ||
              'One primary path from intent to completion — filters attached to the task, not floating as decoration.'
          )}
        </p>
        {flowMedia.length > 0 ? (
          <div className="work-media-band">
            {flowMedia.length === 1 ? (
              <Plate figure={flowMedia[0]} tone="cr" accent={accent} />
            ) : (
              <MediaPair figures={flowMedia} accent={accent} />
            )}
          </div>
        ) : null}
      </section>

      {/* Wireframes — home selected-work panels */}
      <section className="work-sec work-sec-bleed" id="wireframes">
        <div className="pad">
          <SectionHead title="Wireframes" lab="Low to mid-fidelity" />
          <p className="dh2">Structure before skin.</p>
          {project.wireframes.summary ? (
            <p className="cap3 work-body">{firstSentence(project.wireframes.summary)}</p>
          ) : null}
        </div>
        <WorkPanels figures={wireMedia} accent={accent} startFig={1} />
      </section>

      {/* Visual UI */}
      <section ref={visualRef} className="pad work-sec" id="visual">
        <SectionHead title="Visual UI" lab="The interface system" />
        <p className="dh2">
          {project.visualDesign.summary
            ? briefHead(project.visualDesign.summary, 6)
            : 'Screens that hold.'}
        </p>
        {project.visualDesign.styleTokens.length > 0 ? (
          <div className="pc3 work-token-strip">
            {project.visualDesign.styleTokens.slice(0, 3).map((token) => (
              <div key={token.token}>
                <span className="lab">{token.token}</span>
                <h3>{briefHead(token.detail, 5)}</h3>
                <p>{firstSentence(token.detail)}</p>
              </div>
            ))}
          </div>
        ) : null}
        <MediaStack figures={visualMedia} accent={accent} />
      </section>

      {/* Outcome */}
      <section className="work-sec work-sec-bleed" id="outcome">
        <div className="pad">
          <SectionHead title="Outcome" lab="What shipped" />
          <p className="dh2">{italicPunch(project.hook.outcomeLine)}</p>
        </div>
        {imagesOf(project.outcome.screens).length > 0 ? (
          <WorkPanels
            figures={imagesOf(project.outcome.screens)}
            accent={accent}
            startFig={wireMedia.length + 1}
          />
        ) : null}
        <div className="pad">
          <div className="work-footer">
            <div className="work-footer-inner">
              <div>
                <span className="lab">Live product</span>
                <p className="work-footer-sub">
                  {project.outcome.liveUrl
                    ? 'Open the shipped interface, or browse the full archive.'
                    : 'Browse the full archive of product and brand work.'}
                </p>
              </div>
              <div className="work-footer-actions">
                {project.outcome.liveUrl ? (
                  <a
                    className="btn work-btn"
                    href={project.outcome.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cur="Live"
                  >
                    <span>View live</span>
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                ) : null}
                <Link className="btn btn-ghost" href="/portfolio/" data-cur="Index">
                  All work <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reflection — home quote rhythm */}
      <section className="pad work-sec work-reflect pq" id="reflection">
        <SectionHead title="Reflection" lab="Honest takeaways" />
        <blockquote>{firstSentence(project.reflection.narrative)}</blockquote>
        {project.reflection.nextMoves.length > 0 ? (
          <div className="pc3">
            {project.reflection.nextMoves.slice(0, 3).map((move, i) => (
              <div key={move}>
                <span className="lab">Next {String(i + 1).padStart(2, '0')}</span>
                <h3>{briefHead(move, 5)}</h3>
                <p>{firstSentence(move)}</p>
              </div>
            ))}
          </div>
        ) : null}
      </section>

      <section className="pad work-sec" id="next">
        <SectionHead
          title="Next project"
          lab={nextProject ? categoryDisplay(nextProject.category) : 'Work index'}
        />
        {nextProject ? (
          <NextCaseLink project={nextProject} />
        ) : (
          <Link className="btn" href="/portfolio/" data-cur="Index">
            Browse work <span aria-hidden="true">&rarr;</span>
          </Link>
        )}
      </section>
    </div>
  );
}

function ProductCaseExact({
  project,
  nextProject,
}: {
  project: CaseStudyProject;
  nextProject?: Project | null;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLElement>(null);
  const name = shortTitle(project.title);
  const hero = imageOf(project.hook.image);
  const accent = project.accentColor || 'var(--ind)';

  const researchMedia = imagesOf([...project.uxResearch.artifacts, ...project.mentalModels.maps]);
  const processMedia = imagesOf([...project.designDecisions.sketches, ...project.theWork.midFi]);
  const patternMedia = imagesOf(project.aiUxPatterns.components);
  const hiFiMedia = imagesOf([...project.theWork.hiFi, ...project.outcome.screens]);

  const chapters = useMemo(
    () => [
      { id: 'overview', label: 'Overview' },
      { id: 'research', label: 'Research' },
      { id: 'framing', label: 'Framing' },
      { id: 'decisions', label: 'Decisions' },
      { id: 'process', label: 'Process' },
      { id: 'patterns', label: 'Patterns' },
      { id: 'outcome', label: 'Outcome' },
      { id: 'reflection', label: 'Reflection' },
    ],
    []
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => document.documentElement.classList.add('ready'));
    });
  }, []);

  useChapterNav(rootRef, chapters, project.slug);
  useStickyStack(workRef, [hiFiMedia.length, project.slug]);

  return (
    <div
      ref={rootRef}
      className="brand-case work-case"
      style={{ ['--case-accent' as string]: accent }}
    >
      <CaseHero
        kind="Product case study"
        name={name}
        punch={italicPunch(project.hook.outcomeLine)}
        client={project.client}
        category={categoryDisplay(project.category)}
        platform={project.platform}
        duration={project.duration}
        year={project.year}
        role={project.role}
        liveUrl={project.outcome.liveUrl}
        hero={hero}
        accent={accent}
      />

      <nav className="chn" aria-label="Case study chapters">
        {chapters.map((c) => (
          <a key={c.id} href={`#${c.id}`}>
            {c.label}
          </a>
        ))}
      </nav>

      <CaseOverview
        lead={project.context.summary}
        problem={project.aiProblem.statement}
        goals={
          project.aiProblem.quotes.length > 0
            ? project.aiProblem.quotes
                .slice(0, 3)
                .map((q) => firstSentence(q.replace(/^["'\u201C]|["'\u201D]$/g, '')))
            : project.scope.slice(0, 3)
        }
        goalLab={project.aiProblem.quotes.length > 0 ? 'The signal' : 'The goal'}
        scope={project.scope}
        role={project.role}
        platform={project.platform}
        team={project.team}
        tools={project.tools}
        year={project.year}
      />

      <section className="pad" id="research" style={{ paddingTop: 'clamp(80px,12vw,170px)' }}>
        <SectionHead title="Research" lab="Methods & findings" />
        <p className="work-lead">What users actually needed.</p>
        <div className="pc3" style={{ marginBottom: 'clamp(28px,4vw,48px)' }}>
          <div>
            <span className="lab">Methods</span>
            <h3>How we learned</h3>
            <ul className="kw" style={{ marginTop: 12 }}>
              {project.uxResearch.methods.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>
          {project.uxResearch.findings.slice(0, 2).map((finding, i) => (
            <div key={finding}>
              <span className="lab">Finding {String(i + 1).padStart(2, '0')}</span>
              <h3>{firstSentence(finding).replace(/\.$/, '')}</h3>
              <p>{finding}</p>
            </div>
          ))}
        </div>
        {researchMedia.slice(0, 3).map((figure, i) => (
          <Plate key={figure.src} figure={figure} tone={PLATE[i % PLATE.length]} accent={accent} />
        ))}
      </section>

      <section className="pad" id="framing" style={{ paddingTop: 'clamp(80px,12vw,170px)' }}>
        <SectionHead title="Framing" lab="Mental models" />
        <p className="work-lead">{firstSentence(project.problemFraming.statement)}</p>
        {project.problemFraming.expectationGap ? (
          <p className="cap3" style={{ maxWidth: '46em', marginBottom: 'clamp(24px,3vw,40px)' }}>
            {project.problemFraming.expectationGap}
          </p>
        ) : null}
        {project.mentalModels.summary ? (
          <p className="cap3" style={{ maxWidth: '46em', marginBottom: 'clamp(24px,3vw,40px)' }}>
            {project.mentalModels.summary}
          </p>
        ) : null}
        {imageOf(project.problemFraming.gapDiagram) ? (
          <Plate
            figure={imageOf(project.problemFraming.gapDiagram)!}
            tone="ivo"
            accent={accent}
          />
        ) : null}
      </section>

      <section className="pad" id="decisions" style={{ paddingTop: 'clamp(80px,12vw,170px)' }}>
        <SectionHead title="Decisions" lab="Trade-offs we made" />
        <p className="work-lead">Chosen paths, with reasons.</p>
        {project.designDecisions.options.length > 0 ? (
          <div className="pc3" style={{ marginBottom: 'clamp(28px,4vw,48px)' }}>
            {project.designDecisions.options.slice(0, 3).map((opt, i) => (
              <div key={`${opt.chosen}-${i}`}>
                <span className="lab">Decision {String(i + 1).padStart(2, '0')}</span>
                <h3>{firstSentence(opt.chosen).replace(/\.$/, '')}</h3>
                <p>{opt.reasoning || `Chose over: ${opt.rejected}`}</p>
              </div>
            ))}
          </div>
        ) : null}
        {imagesOf(project.designDecisions.sketches)
          .slice(0, 2)
          .map((figure, i) => (
            <Plate key={figure.src} figure={figure} tone={PLATE[i % PLATE.length]} accent={accent} />
          ))}
      </section>

      <section className="pad" id="process" style={{ paddingTop: 'clamp(80px,12vw,170px)' }}>
        <SectionHead title="Process" lab="Mid-fi to hi-fi" />
        <p className="work-lead">Building the interface in layers.</p>
        {processMedia.map((figure, i) => (
          <Plate key={figure.src} figure={figure} tone={PLATE[(i + 1) % PLATE.length]} accent={accent} />
        ))}
        {project.theWork.designSystem.length > 0 ? (
          <div className="pc3" style={{ marginTop: 'clamp(28px,4vw,48px)' }}>
            {project.theWork.designSystem.slice(0, 3).map((token) => (
              <div key={token.token}>
                <span className="lab">{token.token}</span>
                <h3>{firstSentence(token.detail).replace(/\.$/, '')}</h3>
                <p>{token.detail}</p>
              </div>
            ))}
          </div>
        ) : null}
      </section>

      <section className="pad" id="patterns" style={{ paddingTop: 'clamp(80px,12vw,170px)' }}>
        <SectionHead title="Patterns" lab="States & edge cases" />
        <p className="work-lead">Patterns that keep the product honest.</p>
        {project.aiUxPatterns.states.length > 0 ? (
          <div className="pc3" style={{ marginBottom: 'clamp(28px,4vw,48px)' }}>
            {project.aiUxPatterns.states.slice(0, 3).map((state) => (
              <div key={state.name}>
                <span className="lab">{state.name}</span>
                <h3>{firstSentence(state.behavior).replace(/\.$/, '')}</h3>
                <p>{state.behavior}</p>
              </div>
            ))}
          </div>
        ) : null}
        {patternMedia.map((figure, i) => (
          <Plate key={figure.src} figure={figure} tone={PLATE[i % PLATE.length]} accent={accent} />
        ))}
        {project.usabilityTesting.beforeAfter.length > 0 ? (
          <div className="pc3" style={{ marginTop: 'clamp(28px,4vw,48px)' }}>
            {project.usabilityTesting.beforeAfter.slice(0, 3).map((row, i) => (
              <div key={`${row.change}-${i}`}>
                <span className="lab">Shift {String(i + 1).padStart(2, '0')}</span>
                <h3>{firstSentence(row.change).replace(/\.$/, '')}</h3>
                <p>{row.change}</p>
              </div>
            ))}
          </div>
        ) : null}
      </section>

      <section
        ref={workRef}
        className="pad"
        id="outcome"
        style={{ paddingTop: 'clamp(80px,12vw,170px)' }}
      >
        <SectionHead title="Outcome" lab="What shipped" />
        <p className="work-lead">{project.hook.outcomeLine}</p>
        <MediaStack figures={hiFiMedia} accent={accent} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 'clamp(28px,4vw,48px)' }}>
          {project.outcome.liveUrl ? (
            <a
              className="btn"
              href={project.outcome.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cur="Live"
            >
              View live product <span aria-hidden="true">&rarr;</span>
            </a>
          ) : null}
          <Link className="btn btn-ghost" href="/portfolio/" data-cur="Index">
            All work <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>

      <section className="pad" id="reflection" style={{ paddingTop: 'clamp(80px,12vw,170px)' }}>
        <SectionHead title="Reflection" lab="Honest takeaways" />
        <p className="work-lead">{firstSentence(project.reflection.narrative)}</p>
        <p className="cap3" style={{ maxWidth: '46em', marginBottom: 'clamp(28px,4vw,48px)' }}>
          {project.reflection.narrative}
        </p>
        {project.reflection.nextMoves.length > 0 ? (
          <div className="pc3">
            {project.reflection.nextMoves.slice(0, 3).map((move, i) => (
              <div key={move}>
                <span className="lab">Next {String(i + 1).padStart(2, '0')}</span>
                <h3>{firstSentence(move).replace(/\.$/, '')}</h3>
                <p>{move}</p>
              </div>
            ))}
          </div>
        ) : null}
      </section>

      <section className="pad" id="next" style={{ paddingTop: 'clamp(80px,12vw,170px)' }}>
        <SectionHead
          title="Next project"
          lab={nextProject ? categoryDisplay(nextProject.category) : 'Work index'}
        />
        {nextProject ? (
          <NextCaseLink project={nextProject} />
        ) : (
          <Link className="btn" href="/portfolio/" data-cur="Index">
            Browse work <span aria-hidden="true">&rarr;</span>
          </Link>
        )}
      </section>
    </div>
  );
}

export default function PortfolioCaseExact({ project, nextProject }: PortfolioCaseExactProps) {
  if (isUIUX(project)) {
    return <UIUXCaseExact project={project} nextProject={nextProject} />;
  }
  return <ProductCaseExact project={project} nextProject={nextProject} />;
}

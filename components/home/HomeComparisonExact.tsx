'use client';

import { useState } from 'react';
import Link from 'next/link';

type Mode = 'direct' | 'fragmented';

const DATA: Record<
  Mode,
  {
    badge: string;
    headline: string;
    summary: string;
    rows: { label: string; value: string; note: string }[];
  }
> = {
  direct: {
    badge: 'HOW I WORK · END-TO-END',
    headline: 'One designer who thinks in systems and ships production code.',
    summary:
      'Whether joining a product team or partnering directly with a founder, I bridge brand, UX architecture, and Next.js engineering so nothing gets lost in handoff.',
    rows: [
      { label: 'Ownership', value: 'Brand to Code', note: 'Strategy, Figma systems, and Next.js / TypeScript UI' },
      { label: 'Handoff Gap', value: 'Zero (0%)', note: 'Design tokens & components map 1:1 to production' },
      { label: 'Speed', value: '4-Week Sprints', note: 'Rapid iteration for teams and client launches' },
      { label: 'Availability', value: 'Roles & Clients', note: 'Open to full-time teams or select project builds' },
    ],
  },
  fragmented: {
    badge: 'THE USUAL PROBLEM · SILOED TEAMS',
    headline: 'Brand, product UX, and engineering working in separate silos.',
    summary:
      'When brand identity, product design, and front-end code are split across disconnected handoffs, user trust and shipping velocity suffer.',
    rows: [
      { label: 'Ownership', value: 'Fragmented', note: 'Separate brand, UI, and dev handoff layers' },
      { label: 'Handoff Gap', value: 'High Drift', note: 'Static Figma files ≠ production code reality' },
      { label: 'Speed', value: '14–20 Weeks', note: 'Translation delays between design and engineering' },
      { label: 'Outcome', value: 'Inconsistent UX', note: 'Brand promise doesn’t match the shipped product' },
    ],
  },
};

export default function HomeComparisonExact() {
  const [mode, setMode] = useState<Mode>('direct');
  const active = DATA[mode];

  return (
    <section className="pad cmp-sec" aria-label="How I work comparison">
      <div className="sh">
        <span className="lab">How I work</span>
        <span className="lab">For hiring teams &amp; clients</span>
      </div>

      <div className="cmp-wrap">
        <div className="cmp-left">
          <div className="cmp-tabs" role="tablist" aria-label="Compare working models">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'direct'}
              className={`cmp-tab${mode === 'direct' ? ' is-on' : ''}`}
              onClick={() => setMode('direct')}
            >
              <span>01</span> Working with Me
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'fragmented'}
              className={`cmp-tab${mode === 'fragmented' ? ' is-on' : ''}`}
              onClick={() => setMode('fragmented')}
            >
              <span>02</span> Siloed Handoffs
            </button>
          </div>

          <span className="cmp-badge">{active.badge}</span>
          <h2 className="cmp-h">{active.headline}</h2>
          <p className="cmp-p">{active.summary}</p>

          <div className="cmp-tools">
            <Link href="/cv/" className="cmp-tool-link" data-cur="CV">
              View full CV &amp; experience <span>→</span>
            </Link>
            <Link href="/contact/" className="cmp-tool-link" data-cur="Contact">
              Start a conversation <span>→</span>
            </Link>
          </div>
        </div>

        <div className="cmp-grid" role="tabpanel">
          {active.rows.map((r, i) => (
            <div key={r.label} className={`cmp-cell${mode === 'direct' ? ' is-sprint' : ''}`}>
              <div className="cmp-cell-top">
                <span className="lab">{r.label}</span>
                <span className="cmp-cell-idx">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <strong>{r.value}</strong>
              <p>{r.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

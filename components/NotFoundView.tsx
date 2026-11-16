'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const ROUTES = [
  { n: '01', label: 'Home', href: '/', desc: 'Back to the portfolio index' },
  { n: '02', label: 'Selected Work', href: '/portfolio/', desc: 'Product & UI/UX case studies' },
  { n: '03', label: 'Branding', href: '/branding/', desc: 'Identity systems & guidelines' },
  { n: '04', label: 'Contact', href: '/contact/', desc: 'Roles & project inquiries' },
];

export default function NotFoundView() {
  const [time, setTime] = useState('--:--:--');
  const [path, setPath] = useState('/unknown');

  useEffect(() => {
    const tick = () => setTime(new Date().toUTCString().split(' ')[4] ?? '--:--:--');
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setPath(window.location.pathname || '/unknown');
  }, []);

  return (
    <section className="hero pad nf-page" style={{ paddingTop: '110px', paddingBottom: 'clamp(48px, 6vw, 88px)' }}>
      <div className="fo">
        <span>Usama Zahid · HTTP 404</span>
        <span className="hero-avail">
          <i className="hero-avail-dot" aria-hidden="true" />
          Route missing · Portfolio online
        </span>
        <span>usamazahid.design</span>
      </div>

      <div className="hg nf-hg">
        <div className="ht">
          <h1>
            <span className="ln">
              <span style={{ '--d': '.05s' } as React.CSSProperties}>
                4<span style={{ color: 'var(--ind)' }}>0</span>4.
              </span>
            </span>
            <span className="ln">
              <span style={{ '--d': '.15s' } as React.CSSProperties}>Route not</span>
            </span>
            <span className="ln it2">
              <span style={{ '--d': '.25s' } as React.CSSProperties}>in the system.</span>
            </span>
          </h1>
          <p className="sub">
            <b>The page you requested doesn’t exist, moved, or was retired.</b> Pick a live route below or head back to the home page.
          </p>
          <div className="hero-actions">
            <Link className="btn" href="/" data-cur="Home">
              Back to home <span aria-hidden="true">→</span>
            </Link>
            <Link className="btn btn-ghost" href="/portfolio/" data-cur="Work">
              Explore selected work <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="hl in">
          <div className="stg nf-stage">
            <div className="stg-t">
              <span className="nf-stage-title">Diagnostic · 404</span>
              <span className="stg-p">UTC {time}</span>
            </div>

            <svg
              viewBox="0 0 400 220"
              role="img"
              aria-label="Geometric diagram showing a missing route node"
              className="nf-svg"
            >
              <g stroke="var(--line)" strokeWidth="1" strokeDasharray="4 4">
                <line x1="40" y1="36" x2="360" y2="36" />
                <line x1="40" y1="110" x2="360" y2="110" />
                <line x1="40" y1="184" x2="360" y2="184" />
                <line x1="110" y1="20" x2="110" y2="200" />
                <line x1="200" y1="20" x2="200" y2="200" />
                <line x1="290" y1="20" x2="290" y2="200" />
              </g>
              <line x1="110" y1="110" x2="200" y2="110" stroke="var(--ink)" strokeWidth="2" />
              <line x1="200" y1="110" x2="290" y2="110" stroke="#4B3FFF" strokeWidth="2" strokeDasharray="6 6" />
              <rect x="98" y="98" width="24" height="24" fill="var(--ink)" />
              <circle cx="200" cy="110" r="14" fill="var(--bg)" stroke="var(--ink)" strokeWidth="2" />
              <rect x="278" y="98" width="24" height="24" fill="#4B3FFF" />
              <line x1="284" y1="104" x2="296" y2="116" stroke="#F7F9E1" strokeWidth="2" />
              <line x1="296" y1="104" x2="284" y2="116" stroke="#F7F9E1" strokeWidth="2" />
            </svg>

            <div className="nf-readout">
              <div>
                <span>Status</span>
                <b>404 · Not Found</b>
              </div>
              <div>
                <span>Path</span>
                <code>{path}</code>
              </div>
              <div>
                <span>Index</span>
                <b>Unmatched</b>
              </div>
            </div>

            <div className="stg-b">
              <span>Fig. 404. Missing route node</span>
              <span className="nf-live-pill">System Active</span>
            </div>
          </div>
        </div>
      </div>

      <div className="nf-routes-wrap">
        <div className="sh">
          <span className="lab">Live routes</span>
          <span className="lab">Pick a destination</span>
        </div>
        <div className="nf-routes">
          {ROUTES.map((item) => (
            <Link key={item.href} href={item.href} className="nf-route-card" data-cur="Open">
              <div className="nf-route-top">
                <span className="lab">{item.n}</span>
                <span className="nf-arrow" aria-hidden="true">→</span>
              </div>
              <h3>{item.label}</h3>
              <p>{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
const recovery = [
  { n: '01', label: 'Home', href: '/', desc: 'Back to the index' },
  { n: '02', label: 'Work', href: '/portfolio/', desc: 'Product case studies' },
  { n: '03', label: 'Services', href: '/services/', desc: 'Four tracks, three packages' },
  { n: '04', label: 'Contact', href: '/contact/', desc: '15-min diagnosis' },
];

export default function NotFoundView() {
  const [time, setTime] = useState('');
  const [path, setPath] = useState('/unknown');

  useEffect(() => {
    const tick = () => setTime(new Date().toUTCString().split(' ')[4] ?? '');
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setPath(window.location.pathname || '/unknown');
  }, []);

  return (
    <section
      className="relative w-full bg-uz-black overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      <div className="absolute inset-0 hero-grid-overlay pointer-events-none" />
      <div className="scan-lines" />
      <div className="vignette" />

      <div className="edge-marker tl" style={{ position: 'absolute' }} />
      <div className="edge-marker tr" style={{ position: 'absolute' }} />
      <div className="edge-marker bl" style={{ position: 'absolute' }} />
      <div className="edge-marker br" style={{ position: 'absolute' }} />

      <div className="absolute top-0 left-0 right-0 z-20 pt-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20 flex items-center justify-between font-mono text-[10px] text-uz-slate tracking-[0.2em] uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-uz-indigo pulse-square" />
            <span>STATUS · HTTP_404</span>
          </div>
          <div className="hidden md:block">FILE_NOT_FOUND</div>
          <div className="tabular-nums">UTC {time || '--:--:--'}</div>
        </div>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-20 pt-40 md:pt-48 pb-24 min-h-screen flex flex-col justify-center">
        <div
          className="flex items-center gap-3 mb-8"
        >
          <span className="w-1.5 h-1.5 bg-uz-indigo pulse-square" />
          <span className="font-mono text-[10px] text-uz-indigo tracking-[0.3em] uppercase">
            [ ERR.404 / SIGNAL_LOST ]
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-end">
          <div className="md:col-span-8">
            <h1
              className="font-display text-uz-white leading-[0.82] tracking-[-0.06em]"
              style={{ fontSize: 'clamp(96px, 18vw, 240px)' }}
            >
              4<span className="text-uz-indigo">0</span>4
            </h1>

            <p
              className="font-display text-uz-white text-[clamp(28px,4vw,48px)] tracking-[-0.04em] leading-[1.05] mt-6 max-w-2xl"
            >
              This route is not
              <br />
              in the system.
            </p>

            <p
              className="text-uz-silver text-[16px] md:text-[18px] leading-[1.6] max-w-lg mt-6"
            >
              The page you requested does not exist, moved, or never shipped.
              Pick a live route below or go back to the index.
            </p>
          </div>

          <aside
            className="md:col-span-4 border border-uz-graphite p-6 bg-uz-graphite/30"
          >
            <div className="font-mono text-[10px] text-uz-indigo tracking-[0.3em] uppercase mb-5 pb-3 border-b border-uz-graphite">
              [ SYSTEM_READOUT ]
            </div>
            <ReadoutRow label="HTTP" value="404" />
            <ReadoutRow label="CODE" value="FILE_NOT_FOUND" />
            <ReadoutRow label="PATH" value={path} />
            <ReadoutRow label="INDEX" value="NO" />
            <div className="mt-5 pt-4 border-t border-uz-graphite flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-uz-indigo pulse-square" />
              <span className="font-mono text-[10px] text-uz-silver tracking-[0.2em] uppercase">
                CHANNEL_STILL_OPEN
              </span>
            </div>
          </aside>
        </div>

        <div
          className="mt-16 md:mt-24"
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-uz-graphite">
            <span className="font-mono text-[10px] text-uz-indigo tracking-[0.3em] uppercase">
              LIVE_ROUTES Â· 04
            </span>
            <span className="font-mono text-[9px] text-uz-slate tracking-[0.2em] uppercase">
              PICK_A_SIGNAL
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-uz-graphite">
            {recovery.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-cursor="hover"
                data-cursor-text="GO"
                className="group bg-uz-black p-6 md:p-8 hover:bg-uz-graphite transition-colors duration-500"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-[10px] text-uz-indigo tracking-[0.3em] uppercase">
                    [ {item.n} ]
                  </span>
                  <span className="font-mono text-[10px] text-uz-slate tracking-[0.2em] uppercase group-hover:text-uz-indigo transition-colors">
                    â†’
                  </span>
                </div>
                <div className="font-display text-uz-white text-[clamp(22px,2.4vw,32px)] tracking-[-0.03em] leading-[1.1] group-hover:text-uz-indigo transition-colors duration-500">
                  {item.label}
                </div>
                <div className="font-mono text-[10px] text-uz-slate tracking-[0.15em] uppercase mt-3">
                  {item.desc}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/"
              data-cursor="hover"
              data-cursor-text="HOME"
              className="group relative inline-flex items-center gap-3 h-14 px-8 bg-uz-white text-uz-black font-mono text-[12px] tracking-[0.15em] uppercase overflow-hidden"
            >
              <span className="relative z-10 group-hover:text-uz-white transition-colors duration-500">
                Return to index
              </span>
              <span className="relative z-10 group-hover:text-uz-white transition-colors duration-500 inline-block group-hover:translate-x-1">
                â†’
              </span>
              <span
                className="absolute inset-0 bg-uz-indigo -translate-x-full group-hover:translate-x-0 transition-transform duration-500"
                style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReadoutRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5 border-b border-uz-graphite last:border-b-0">
      <span className="font-mono text-[9px] text-uz-slate tracking-[0.3em] uppercase flex-shrink-0">
        {label}
      </span>
      <span className="font-mono text-[11px] text-uz-white tracking-[0.05em] text-right break-all">
        {value}
      </span>
    </div>
  );
}


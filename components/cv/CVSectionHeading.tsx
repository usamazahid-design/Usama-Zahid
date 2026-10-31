'use client';

import type { ReactNode } from 'react';

export default function CVSectionHeading({
  number,
  kicker,
  title,
  rightMeta,
  subtitle,
  className = 'mb-16',
}: {
  number: string;
  kicker: string;
  title: ReactNode;
  rightMeta?: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 bg-uz-indigo" />
          <span className="font-mono text-[10px] text-uz-slate tracking-[0.3em] uppercase">{kicker}</span>
        </div>
        {rightMeta ? (
          <div className="font-mono text-[10px] text-uz-silver tracking-[0.2em] uppercase">{rightMeta}</div>
        ) : null}
      </div>

      <div
        className="relative overflow-hidden border border-uz-graphite/70 bg-uz-black/70 px-5 md:px-7 pt-5 pb-6"
        style={{ backgroundImage: 'linear-gradient(112deg, rgba(75,63,255,0.15), transparent 45%)' }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 -bottom-4 font-display text-[70px] md:text-[100px] leading-none tracking-[-0.06em] opacity-[0.09] text-uz-indigo"
        >
          {number}
        </span>
        <div className="flex items-baseline gap-5 md:gap-7">
          <span className="font-mono text-uz-indigo text-[clamp(22px,2.6vw,34px)] tracking-[-0.02em] tabular-nums">
            {number}
          </span>
          <div className="min-w-0">
            <h2 className="font-display text-uz-white text-[clamp(40px,6vw,96px)] tracking-[-0.045em] leading-[0.9]">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-5 text-uz-silver text-[16px] md:text-[18px] leading-[1.6] max-w-3xl">{subtitle}</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
